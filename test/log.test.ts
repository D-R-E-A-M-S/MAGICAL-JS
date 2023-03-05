import { describe, it } from "vitest";
import { getAST } from "./Shared";

describe( 'manual test', () => {

    console.log( JSON.stringify( getAST( `code` ), null, 2 ) );
    it( '' );

} );

