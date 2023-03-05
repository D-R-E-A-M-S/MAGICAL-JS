import { describe, expect, it } from "vitest";
import { getAST } from "./Shared";

describe( 'ParenthesizedExpression', () => {

    const AST = getAST( `(2 + 2 )` );

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
                                operator: {
                                    type: 'AdditiveOperator',
                                    value: '+'
                                },
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