import { describe, it } from "vitest";
import { getAST } from "./Shared";

describe( 'manual test', () => {

    console.log( JSON.stringify( getAST( `
    let m
    let n;
    let p,q = 1
    let r = 2
    s = 3
    ` ), null, 2 ) );
    it( '' );

} );