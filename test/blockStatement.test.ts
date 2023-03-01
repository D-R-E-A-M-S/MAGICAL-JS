import { Parser } from "MAGICAL-JS";
import { describe, expect, it } from "vitest";

describe( "blockStatement", () => {


    it( "should return a BlockStatement", () => {


        const AST = Parser.parse(
            `
            {
                {}
                ''
            }
            `
        );

        expect( AST ).toEqual( {
            type: 'Program',
            body: [
                {
                    type: 'BlockStatement',
                    block: [
                        {
                            type: 'BlockStatement',
                            block: []
                        },
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'StringLiteral',
                                value: ""
                            }
                        }
                    ]
                }
            ]
        } );

    } );

    it( "should return a BlockStatement with an emptyStatement", () => {

        const AST = Parser.parse(
            `
            {
                
            };
            `
        );

        expect( AST ).toEqual( {
            type: 'Program',
            body: [
                {
                    type: 'BlockStatement',
                    block: []
                },
                {
                    type: 'EmptyStatement',
                    value: ';'
                }
            ]
        } );

    } );

    it( "should return a BlockStatement with multiple expressionStatement", () => {

        const AST = Parser.parse(
            `
            {
                "MAGICAL-JS";
                16;
                // Ignore this line;
                'Merlin the Wizard';
            }
            `
        );

        expect( AST ).toEqual(

            {
                type: 'Program',
                body: [
                    {
                        type: 'BlockStatement',
                        block: [
                            {
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'StringLiteral',
                                    value: 'MAGICAL-JS'
                                }
                            },
                            {
                                type: 'EmptyStatement',
                                value: ';'
                            },
                            {
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'NumberLiteral',
                                    value: 16
                                }
                            },
                            {
                                type: 'EmptyStatement',
                                value: ';'
                            },
                            {
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'StringLiteral',
                                    value: 'Merlin the Wizard'
                                }
                            },
                            {
                                type: 'EmptyStatement',
                                value: ';'
                            }
                        ]
                    }
                ]
            }

        );

    } );


    it( "should return a BlockStatement with multiple expressionStatement, an emptyStatement and nested blocks", () => {

        const AST = Parser.parse(

            `
            {
                {
                    "MAGICAL-JS";
                    'it"s a magical world';
                    "being a wizard is all about nested blocks";
                }
            }
            `

        );

        expect( AST ).toEqual(

            {
                type: 'Program',
                body: [
                    {
                        type: 'BlockStatement',
                        block: [
                            {
                                type: 'BlockStatement',
                                block: [
                                    {
                                        type: 'ExpressionStatement',
                                        expression: {
                                            type: 'StringLiteral',
                                            value: 'MAGICAL-JS'
                                        }
                                    },
                                    {
                                        type: 'EmptyStatement',
                                        value: ';'
                                    },
                                    {
                                        type: 'ExpressionStatement',
                                        expression: {
                                            type: 'StringLiteral',
                                            value: 'it"s a magical world'
                                        }
                                    },
                                    {
                                        type: 'EmptyStatement',
                                        value: ';'
                                    },
                                    {
                                        type: 'ExpressionStatement',
                                        expression: {
                                            type: 'StringLiteral',
                                            value: 'being a wizard is all about nested blocks'
                                        }
                                    },
                                    {
                                        type: 'EmptyStatement',
                                        value: ';'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }

        );

    } );

} );