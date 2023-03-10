import { describe, expect, it } from "vitest";
import { getAST } from "./Shared";

describe( 'binaryExpressions', () => {

    const AST = getAST(
        '16 + 1 -  48'
    );

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
                                type: 'BinaryExpression',
                                left: {
                                    type: 'NumberLiteral',
                                    value: 16
                                },
                                operator: {
                                    type: 'AdditiveOperator',
                                    value: '+'
                                },
                                right: {
                                    type: 'NumberLiteral',
                                    value: 1
                                }
                            },
                            operator: {
                                type: 'AdditiveOperator',
                                value: '-'
                            },
                            right: {
                                type: 'NumberLiteral',
                                value: 48
                            }
                        }
                    }
                ]
            }

        );

    } );

} );