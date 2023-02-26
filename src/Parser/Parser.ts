export class Parser {

    private sourceCode: string = '';

    constructor ( sourceCode: string ) {

        this.sourceCode = sourceCode;
        console.log( 'Parser initialized' );

    }

    parse () {

        console.log( `parsing ${ this.sourceCode }` );

        return this.program();

    }

    program () {

        return {
            type: 'Program',
            body: []
        };
    }

}