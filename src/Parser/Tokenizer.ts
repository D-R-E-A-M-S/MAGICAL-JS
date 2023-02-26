export class Tokenizer {

    private tokens: string = '';
    private position: number = 0;

    read ( token: string ) {

        this.tokens = token;
        console.log( `read token: ${ token }` );

    }

    endOfFile () {

        console.log( 'end of file' );

    }

    analyze () {

        console.log( 'analyze' );

    }

}