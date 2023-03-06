import {
    AdditiveExpression, AssignmentExpression, BlockStatement, EmptyStatement, Expression, ExpressionStatement, Identifier,
    IfStatement, Literal, MultiplicativeExpression, NumberLiteral, ParenthesizedExpression, PrimaryExpression, Program,
    Statement, StatementList, StringLiteral, Token, TokenType, VariableDeclaration, VariableDeclarationList, VariableInitializer, VariableStatement
} from "./types";
import { Tokenizer } from "./Tokenizer";


export class Parser {

    static sourceCode: string;
    private static tokenizer: Tokenizer = new Tokenizer();
    private static lookahead: Token;

    static parse ( sourceCode: string ) {

        Parser.sourceCode = sourceCode;
        Parser.tokenizer.read( sourceCode );
        Parser.lookahead = Parser.tokenizer.analyze();

        return Parser.program();

    }

    private static eat ( tokenType: TokenType ): Token {

        const token: Token = Parser.lookahead;

        if ( token.type === 'EndOfFile' )
            throw new SyntaxError( `Unexpected end of file, expected: ${ tokenType }` );

        if ( token.type !== tokenType )
            throw new SyntaxError( `Unexpected token: ${ token.value }, expected: ${ tokenType }` );

        Parser.lookahead = Parser.tokenizer.analyze();

        return token;

    }

    private static numberLiteral (): NumberLiteral {

        const token: Token = Parser.eat( 'Number' );

        return {
            type: 'NumberLiteral',
            value: Number( token.value )
        };

    }

    private static stringLiteral (): StringLiteral {

        const token: Token = Parser.eat( 'String' );

        return {
            type: 'StringLiteral',
            value: token.value.slice( 1, -1 )
        };
    }

    private static literal (): Literal {

        switch ( Parser.lookahead?.type ) {

            case 'Number':
                return Parser.numberLiteral();
            case 'String':
                return Parser.stringLiteral();
            default:
                throw new SyntaxError( `Unexpected token: ${ Parser.lookahead.value }` );
        }

    }

    private static parenthesizedExpression (): ParenthesizedExpression {

        Parser.eat( 'OpenParenthesis' );

        const expression: Expression = Parser.expression();

        Parser.eat( 'CloseParenthesis' );

        return {
            type: 'ParenthesizedExpression',
            expression
        };


    }

    private static identifier (): Identifier {

        const reservedKeywords = [
            'if',
            'else',
            'function',
            'var',
            'const',
            'let',
            'for',
            'while',
            'do',
            'break',
            'continue',
        ];

        if ( reservedKeywords.includes( Parser.lookahead.value ) )
            throw new SyntaxError( `Unexpected identifier: ${ Parser.lookahead.value }, is a reserved keyword` );

        const token: Token = Parser.eat( 'Identifier' );

        return {
            type: 'Identifier',
            name: token.value
        };

    }

    private static primaryExpression (): PrimaryExpression {

        switch ( Parser.lookahead.type ) {

            case 'Number':
            case 'String':
                return Parser.literal();
            case 'OpenParenthesis':
                return Parser.parenthesizedExpression();
            case 'Identifier':
                return Parser.identifier();
            default:
                throw new SyntaxError( `Unexpected token: ${ Parser.lookahead.value }` );

        }

    }

    private static multiplicativeExpression (): MultiplicativeExpression {

        let left: MultiplicativeExpression = Parser.primaryExpression();

        while ( Parser.lookahead.type === 'MultiplicativeOperator' ) {

            const operator: Token = Parser.eat( 'MultiplicativeOperator' );

            const right: PrimaryExpression = Parser.primaryExpression();

            left = {
                type: 'BinaryExpression',
                left,
                operator,
                right
            };

        }

        return left;

    }

    private static additiveExpression (): AdditiveExpression {

        let left: AdditiveExpression = Parser.multiplicativeExpression();

        while ( Parser.lookahead.type === 'AdditiveOperator' ) {

            const operator = Parser.eat( 'AdditiveOperator' );

            const right = Parser.multiplicativeExpression();

            left = {
                type: 'BinaryExpression',
                left,
                operator,
                right
            };

        }

        return left;

    }

    private static checkIdentifier ( node: Expression ): Identifier {

        if ( node.type === 'Identifier' ) return node;

        throw new SyntaxError( `Unexpected token: ${ node.type }, expected: Identifier` );

    }

    private static assignmentExpression (): AssignmentExpression {

        const left: AdditiveExpression = Parser.additiveExpression();

        if ( Parser.lookahead.type === 'AssignmentOperator' ) {

            const operator: Token = Parser.eat( 'AssignmentOperator' );

            const right: AssignmentExpression = Parser.assignmentExpression();

            return {
                type: 'AssignmentExpression',
                left: Parser.checkIdentifier( left ),
                operator,
                right
            };

        }

        return left;

    }

    private static expression (): Expression {

        return Parser.assignmentExpression();

    }

    private static expressionStatement (): ExpressionStatement {

        const expression: Expression = Parser.expression();
        false && Parser.eat( 'Semicolon' ); //TODO: keep for compiler options 
        return {
            type: 'ExpressionStatement',
            expression
        };

    }

    private static emptyStatement (): EmptyStatement {

        const value: Token = Parser.eat( 'Semicolon' );
        return {
            type: 'EmptyStatement',
            value: value.value
        };
    }

    private static blockStatement (): BlockStatement {

        Parser.eat( 'OpenCurlyBrace' );

        const statement: Statement[] = [];

        while ( Parser.lookahead.type !== 'CloseCurlyBrace' ) {

            statement.push( Parser.statement() );

        }

        Parser.eat( 'CloseCurlyBrace' );

        false && Parser.eat( 'Semicolon' ); //TODO: keep for compiler options

        return {
            type: 'BlockStatement',
            block: statement
        };
    }

    private static variableInitializer (): VariableInitializer {

        if ( Parser.lookahead.type === 'AssignmentOperator' )
            Parser.eat( 'AssignmentOperator' );

        return Parser.assignmentExpression();

    }

    private static variableDeclaration (): VariableDeclaration {

        const identifier: Identifier = Parser.identifier();
        let operator: Token = null as unknown as Token;
        let initializer: VariableInitializer = null as unknown as VariableInitializer;

        if ( Parser.lookahead.type === 'AssignmentOperator' ) {

            operator = Parser.eat( 'AssignmentOperator' );
            initializer = Parser.variableInitializer();

        }

        return {
            type: 'VariableDeclarator',
            identifier,
            operator,
            initializer,
        };

    }

    private static variableDeclarationList (): VariableDeclarationList {

        const declarationList: VariableDeclarationList = [ Parser.variableDeclaration() ];

        while ( Parser.lookahead.type === 'Comma' ) {

            Parser.eat( 'Comma' );
            declarationList.push( Parser.variableDeclaration() );

        }

        return declarationList;

    }

    private static variableStatement (): VariableStatement {

        if ( Parser.lookahead.value === 'var' )
            throw new SyntaxError( `unsupported var keyword, use let instead` );

        const kind: Token = Parser.eat( 'VariableKeyword' );

        const declarations: VariableDeclarationList = Parser.variableDeclarationList();

        false && Parser.eat( 'Semicolon' ); //TODO: keep for compiler options

        return {
            type: 'VariableStatement',
            kind: kind,
            declarations,
        };

    }

    private static ifStatement (): IfStatement {

        Parser.eat( 'IfKeyword' );

        const condition: ParenthesizedExpression = Parser.parenthesizedExpression();

        let thenStatement: Statement = Parser.lookahead.type === 'OpenCurlyBrace' ?
            Parser.blockStatement() :
            Parser.statement();


        let elseKeyword: Statement = Parser.lookahead.type === 'ElseKeyword' ?
            Parser.eat( 'ElseKeyword' ) &&
            Parser.statement() :
            undefined as unknown as Statement;

        return {
            type: 'IfStatement',
            condition,
            thenStatement,
            elseKeyword
        };

    }

    private static statement (): Statement {

        switch ( Parser.lookahead.type ) {

            case 'Semicolon':
                return Parser.emptyStatement();
            case 'IfKeyword':
                return Parser.ifStatement();
            case 'OpenCurlyBrace':
                return Parser.blockStatement();
            case 'VariableKeyword':
                return Parser.variableStatement();
            default:
                return Parser.expressionStatement();

        }
    }

    private static statementList ( stopLookAhead?: TokenType ): StatementList {

        const statementList: StatementList = [ Parser.statement() ];

        while ( Parser.lookahead.type !== 'EndOfFile' && Parser.lookahead.type !== stopLookAhead )
            statementList.push( Parser.statement() );

        return statementList;

    }

    private static program (): Program {

        return {
            type: 'Program',
            body: Parser.statementList()
        };

    }

}