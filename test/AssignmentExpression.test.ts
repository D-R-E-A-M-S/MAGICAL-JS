import { describe, expect, it } from "vitest";
import { getAST } from "./Shared";

describe( "AssignmentExpression", () => {



    it( "should return an AST of an Assignment Expression", () => {

        const AST = getAST(
            `power = 'magic'`
        );

        expect( AST ).toEqual(

            {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'AssignmentExpression',
                            left: {
                                type: 'Identifier',
                                name: 'power'
                            },
                            operator: {
                                type: 'AssignmentOperator',
                                value: '='
                            },
                            right: {
                                type: 'StringLiteral',
                                value: 'magic'
                            }
                        }
                    }
                ]
            }

        );


    } );

    it( "should return an AST of an Assignment Expression with parenthesized expression", () => {

        const AST = getAST(
            `
             SpringForce  = (SpringForce + DampingForce) / mass
            `
        );

        expect( AST ).toEqual(

            {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'AssignmentExpression',
                            left: {
                                type: 'Identifier',
                                name: 'SpringForce'
                            },
                            operator: {
                                type: 'AssignmentOperator',
                                value: '='
                            },
                            right: {
                                type: 'BinaryExpression',
                                left: {
                                    type: 'ParenthesizedExpression',
                                    expression: {
                                        type: 'BinaryExpression',
                                        left: {
                                            type: 'Identifier',
                                            name: 'SpringForce'
                                        },
                                        operator: {
                                            type: 'AdditiveOperator',
                                            value: '+'
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'DampingForce'
                                        }
                                    }
                                },
                                operator: {
                                    type: 'MultiplicativeOperator',
                                    value: '/'
                                },
                                right: {
                                    type: 'Identifier',
                                    name: 'mass'
                                }
                            }
                        }
                    }
                ]
            }

        );

    } );

} );