import { Parser } from "MAGICAL-JS";
import { describe, expect, it } from "vitest";

describe( 'ParenthesizedExpression', () => {

    const AST = Parser.parse( `(2 + 2 )` );

    it( 'should return a program tree with a ParenthesizedExpression', () => {

        expect( AST ).toEqual(
            {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'ParenthesizedExpression',
                            expression: {
                                type: 'BinaryExpression',
                                left: {
                                    type: 'NumberLiteral',
                                    value: 2
                                },
                                operator: '+',
                                right: {
                                    type: 'NumberLiteral',
                                    value: 2
                                }
                            }
                        }
                    }
                ]
            }
        );

    } );

} );