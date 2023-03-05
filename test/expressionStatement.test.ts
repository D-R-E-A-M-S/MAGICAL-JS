import { describe, expect, it } from "vitest";
import { getAST } from "./Shared";

describe( "expressionStatement", () => {

    const AST = getAST(
        'MAGICAL_JS + 16'
    );

    it( "should return a program tree with an expressionStatement", () => {

        expect( AST ).toEqual( {

            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        left: {
                            type: "Identifier",
                            name: "MAGICAL_JS"
                        },
                        operator: {
                            type: "AdditiveOperator",
                            value: "+"
                        },
                        right: {
                            type: "NumberLiteral",
                            value: 16
                        }
                    }
                }
            ]

        } );

    } );

} );