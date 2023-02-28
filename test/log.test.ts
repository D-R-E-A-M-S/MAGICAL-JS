import { Parser } from "MAGICAL-JS";
import { describe, it } from "vitest";

describe( 'manual test', () => {

    const AST = Parser.parse(
        `
        ( 2 + 3 * "What ?" ) / 4 * 5;
        `
    );

    console.log( JSON.stringify( AST, null, 2 ) );
    it( '' );

} );