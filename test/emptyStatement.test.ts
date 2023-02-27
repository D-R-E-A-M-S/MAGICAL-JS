import { Parser } from "MAGICAL-JS";
import { describe, expect, it } from "vitest";

describe( "emptyStatement", () => {


    it( "should return a program tree with an emptyStatement", () => {

        const AST = Parser.parse( ";" );

        expect( AST ).toEqual( {

            type: "Program",
            body: [
                {
                    type: "EmptyStatement"
                }
            ]

        } );

    } );

    it( ' should return a program tree with an expressionStatement with an empty statement at end', () => {

        const AST = Parser.parse(
            `
            "MAGICAL-JS";
            16;
            `
        );

        expect( AST ).toEqual( {

            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "StringLiteral",
                        value: "MAGICAL-JS"
                    }
                },
                {
                    type: "EmptyStatement"
                },
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "NumberLiteral",
                        value: 16
                    }
                },
                {
                    type: "EmptyStatement"
                }
            ]

        } );

    } );

} );