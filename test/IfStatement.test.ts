import { describe, expect, it } from "vitest";
import { getAST } from "./Shared";


describe( 'IfStatement', () => {

    const AST = getAST( `
    if (condition) "do something"
    else "do something else"
    ` );

    it( 'should return an IfStatement', () => {

        expect( AST ).toEqual(

            {
                "type": "Program",
                "body": [
                    {
                        "type": "IfStatement",
                        "condition": {
                            "type": "ParenthesizedExpression",
                            "expression": {
                                "type": "Identifier",
                                "name": "condition"
                            }
                        },
                        "thenStatement": {
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "StringLiteral",
                                "value": "do something"
                            }
                        },
                        "elseKeyword": {
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "StringLiteral",
                                "value": "do something else"
                            }
                        }
                    }
                ]
            }

        );

    } );

    it( 'should support nested if and else', () => {

        const AST = getAST( `
        
        if (condition) {
            if (condition) "do something"
            else {
                if (condition) "do nested something"
                else "do nested something else"
            }
        }else {
            if(condition2){
                "do block statement stuffs"
                "do another one"
            }else {
                "do something blocky with semicolon";
            }
        }
        
        ` );

        expect( AST ).toEqual(

            {
                "type": "Program",
                "body": [
                    {
                        "type": "IfStatement",
                        "condition": {
                            "type": "ParenthesizedExpression",
                            "expression": {
                                "type": "Identifier",
                                "name": "condition"
                            }
                        },
                        "thenStatement": {
                            "type": "BlockStatement",
                            "block": [
                                {
                                    "type": "IfStatement",
                                    "condition": {
                                        "type": "ParenthesizedExpression",
                                        "expression": {
                                            "type": "Identifier",
                                            "name": "condition"
                                        }
                                    },
                                    "thenStatement": {
                                        "type": "ExpressionStatement",
                                        "expression": {
                                            "type": "StringLiteral",
                                            "value": "do something"
                                        }
                                    },
                                    "elseKeyword": {
                                        "type": "BlockStatement",
                                        "block": [
                                            {
                                                "type": "IfStatement",
                                                "condition": {
                                                    "type": "ParenthesizedExpression",
                                                    "expression": {
                                                        "type": "Identifier",
                                                        "name": "condition"
                                                    }
                                                },
                                                "thenStatement": {
                                                    "type": "ExpressionStatement",
                                                    "expression": {
                                                        "type": "StringLiteral",
                                                        "value": "do nested something"
                                                    }
                                                },
                                                "elseKeyword": {
                                                    "type": "ExpressionStatement",
                                                    "expression": {
                                                        "type": "StringLiteral",
                                                        "value": "do nested something else"
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        "elseKeyword": {
                            "type": "BlockStatement",
                            "block": [
                                {
                                    "type": "IfStatement",
                                    "condition": {
                                        "type": "ParenthesizedExpression",
                                        "expression": {
                                            "type": "Identifier",
                                            "name": "condition2"
                                        }
                                    },
                                    "thenStatement": {
                                        "type": "BlockStatement",
                                        "block": [
                                            {
                                                "type": "ExpressionStatement",
                                                "expression": {
                                                    "type": "StringLiteral",
                                                    "value": "do block statement stuffs"
                                                }
                                            },
                                            {
                                                "type": "ExpressionStatement",
                                                "expression": {
                                                    "type": "StringLiteral",
                                                    "value": "do another one"
                                                }
                                            }
                                        ]
                                    },
                                    "elseKeyword": {
                                        "type": "BlockStatement",
                                        "block": [
                                            {
                                                "type": "ExpressionStatement",
                                                "expression": {
                                                    "type": "StringLiteral",
                                                    "value": "do something blocky with semicolon"
                                                }
                                            },
                                            {
                                                "type": "EmptyStatement",
                                                "value": ";"
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                ]
            }

        );

    } );

} );