import { describe, it } from "vitest";
import { getAST } from "./Shared";

describe( 'manual test', () => {

    console.log( JSON.stringify( getAST( `
    {






        
    }` ), null, 2 ) );
    it( '' );

} );