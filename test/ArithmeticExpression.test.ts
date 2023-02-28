import { Parser } from "MAGICAL-JS";
import { describe, expect, it } from "vitest";

describe( 'binaryExpressions', () => {

    const AST = Parser.parse( '16 + 1 -  48' );

    it( 'should return a program tree with a binaryExpression', () => {

        expect( AST ).toEqual(
            {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'BinaryExpression',
                            left: {
                                type: 'NumberLiteral',
                                value: 16
                            },
                            operator: '+',
                            right: {
                                type: 'BinaryExpression',
                                left: {
                                    type: 'NumberLiteral',
                                    value: 1
                                },
                                operator: '-',
                                right: {
                                    type: 'NumberLiteral',
                                    value: 48
                                }
                            },
                        }
                    }
                ]
            }
        );

    } );

} );