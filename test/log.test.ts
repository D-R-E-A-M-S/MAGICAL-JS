import { Parser } from "MAGICAL-JS";
import { describe, it } from "vitest";

describe( 'manual test', () => {

    const AST = Parser.parse(
        `
        $merlin = 'magic';
        `
    );

    console.log( JSON.stringify( AST, null, 2 ) );
    it( '' );

} );