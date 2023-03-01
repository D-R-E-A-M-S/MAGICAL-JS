import { Parser } from "MAGICAL-JS";
import { describe, it } from "vitest";

describe( 'manual test', () => {

    const AST = Parser.parse(
        `
        3 - 2 * 2;
        m += 1;
        `
    );

    console.log( JSON.stringify( AST, null, 2 ) );
    it( '' );

} );