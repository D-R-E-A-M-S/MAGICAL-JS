import { Parser } from "MAGICAL-JS";
import { describe, it } from "vitest";

describe( 'manual test', () => {

    const AST = Parser.parse(
        `
        x += 1;
        `
    );

    console.log( JSON.stringify( AST, null, 2 ) );
    it( '' );

} );