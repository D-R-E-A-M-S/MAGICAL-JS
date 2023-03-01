import { ArithmeticExpression, AssignmentExpression, BlockStatement, EmptyStatement, Expression, ExpressionStatement, Identifier, Literal, NumberLiteral, ParenthesizedExpression, PrimaryExpression, Program, Statement, StatementList, StringLiteral, Token, TokenTypes } from "./types";
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

    private static eat ( tokenType: TokenTypes ): Token {

        const token = Parser.lookahead;

        if ( token.type === 'EndOfFile' )
            throw new SyntaxError( `Unexpected end of file, expected: ${ tokenType }` );

        if ( token.type !== tokenType )
            throw new SyntaxError( `Unexpected token: ${ token.value }, expected: ${ tokenType }` );

        Parser.lookahead = Parser.tokenizer.analyze();

        return token as Token;

    }

    private static numberLiteral (): NumberLiteral {

        const token = Parser.eat( 'Number' );

        return {
            type: 'NumberLiteral',
            value: Number( token.value )
        };

    }

    private static stringLiteral (): StringLiteral {

        const token = Parser.eat( 'String' );

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

        const expression = Parser.expression();

        Parser.eat( 'CloseParenthesis' );

        return {
            type: 'ParenthesizedExpression',
            expression
        };


    }

    private static identifier (): Identifier {

        const token = Parser.eat( 'Identifier' );

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

    private static arithmeticExpression (): ArithmeticExpression {

        const left = Parser.primaryExpression();

        if ( Parser.lookahead.type === 'ArithmeticOperator' ) {

            const operator = Parser.eat( 'ArithmeticOperator' );

            const right = Parser.arithmeticExpression();

            return {
                type: 'BinaryExpression',
                left,
                operator,
                right
            };

        }

        return left;

    }

    private static checkIdentifier ( node: any ): Identifier {

        if ( node.type === 'Identifier' ) return node;

        throw new SyntaxError( `Unexpected token: ${ node.type }, expected: Identifier` );

    }

    private static assignmentExpression (): AssignmentExpression {

        const left = Parser.arithmeticExpression();

        if ( Parser.lookahead.type === 'AssignmentOperator' ) {

            const operator = Parser.eat( 'AssignmentOperator' );

            const right = Parser.assignmentExpression();

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

        const expression = Parser.expression();
        false && Parser.eat( 'Semicolon' ); //TODO: keep for compiler options 
        return {
            type: 'ExpressionStatement',
            expression
        };

    }

    private static emptyStatement (): EmptyStatement {

        const value = Parser.eat( 'Semicolon' );
        return {
            type: 'EmptyStatement',
            value: value.value
        };
    }

    private static blockStatement (): BlockStatement {

        Parser.eat( 'OpenCurlyBrace' );

        const statement = [];

        while ( Parser.lookahead.type !== 'CloseCurlyBrace' ) {

            statement.push( Parser.statement() );

        }

        Parser.eat( 'CloseCurlyBrace' );

        return {
            type: 'BlockStatement',
            block: statement
        };
    }

    private static statement (): Statement {

        switch ( Parser.lookahead.type ) {

            case 'Semicolon':
                return Parser.emptyStatement();
            case 'OpenCurlyBrace':
                return Parser.blockStatement();
            default:
                return Parser.expressionStatement();

        }
    }

    private static statementList ( stopLookAhead?: TokenTypes ): StatementList {

        const statementList = [ Parser.statement() ];

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