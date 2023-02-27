import { EmptyStatement, Expression, ExpressionStatement, Literal, NumberLiteral, Program, Statement, StatementList, StringLiteral, Token, TokenTypes } from "./types";
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

        if ( token === null )
            throw new Error( `Unexpected end of file, expected: ${ tokenType }` );

        if ( typeof token !== 'string' && token.type !== tokenType )
            throw new Error( `Unexpected token: ${ token.type }, expected: ${ tokenType }` );

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

    private static expression (): Expression {

        return Parser.literal();

    }

    private static expressionStatement (): ExpressionStatement {
        const expression = Parser.expression();
        !true && Parser.eat( 'Semicolon' ); //TODO: keep for compiler options 
        return {
            type: 'ExpressionStatement',
            expression
        };

    }

    private static emptyStatement (): EmptyStatement {

        Parser.eat( 'Semicolon' );
        return {
            type: 'EmptyStatement'
        };
    }

    private static statement (): Statement {

        switch ( Parser.lookahead.type ) {

            case 'Semicolon':
                return Parser.emptyStatement();
            default:
                return Parser.expressionStatement();

        }
    }

    private static statementList (): StatementList {

        const statementList = [ Parser.statement() ];

        while ( Parser.lookahead.type !== 'EndOfFile' )
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