import { Parser } from "MAGICAL-JS";
import { describe, expect, it } from "vitest";

describe( "expressionStatement", () => {

    const AST = Parser.parse( "16" );

    it( "should return a program tree with an expressionStatement", () => {

        expect( AST ).toEqual( {

            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "NumberLiteral",
                        value: 16
                    }
                }
            ]

        } );

    } );

} );