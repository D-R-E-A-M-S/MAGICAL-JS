import libName from 'MAGICAL-JS';
import { describe, it, expect } from 'vitest';


describe( 'test', () => {

    const name = libName( 'MAGICAL-JS' );

    it( 'should return name MAGICAL-JS', () => {

        expect( name ).toBe( 'MAGICAL-JS' );

    } );

} );