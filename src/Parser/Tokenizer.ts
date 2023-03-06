import { RegexSpec } from "./regexSpecs";
import { Token, TokenType } from "./types";

export class Tokenizer {

    private token: string = '';
    private position: number = 0;

    read ( token: string ) {

        this.token = token;
        this.position = 0;

    }

    endOfFile (): boolean {

        return this.position >= this.token.length;

    }

    hasMoreToken () {

        return this.position < this.token.length;

    }

    validator ( regex: RegExp ): string | null {

        const token = regex.exec( this.token.slice( this.position ) );

        if ( token !== null ) {

            this.position += token[ 0 ].length;

            return token[ 0 ];
        }

        return null;
    }

    analyze (): Token {
        if ( this.hasMoreToken() ) {

            for ( const [ tokenType, regex ] of Object.entries( RegexSpec ) ) {

                const ignoredToked = [
                    'Comment',
                    'Whitespace',
                ];
                const value = this.validator( regex );

                if ( value !== null ) {

                    // Some value might pass this test, but it's not a valid token
                    // Eg - Whitespace, Newline, Comment, etc
                    // In that case, we should ignore it and move on to the next token
                    if ( ignoredToked.includes( tokenType ) )
                        return this.analyze();


                    return {
                        type: tokenType as TokenType,
                        value
                    };

                }

            }

        }

        return {
            type: 'EndOfFile',
            value: this.token
        };

    }

}