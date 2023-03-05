import { describe, expect, it } from "vitest";
import { getAST } from "./Shared";

describe( 'VariableDeclaration', () => {

    const AST = getAST( `const a = 1;` );

    it( 'should return a program tree with a VariableDeclaration', () => {

        expect( AST ).toEqual(

            {
                type: 'Program',
                body: [
                    {
                        type: 'VariableStatement',
                        kind: {
                            type: 'VariableKeyword',
                            value: 'const'
                        },
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                identifier: {
                                    type: 'Identifier',
                                    name: 'a'
                                },
                                operator: {
                                    type: 'AssignmentOperator',
                                    value: '='
                                },
                                initializer: {
                                    type: 'NumberLiteral',
                                    value: 1
                                }
                            }
                        ]
                    },
                    {
                        type: 'EmptyStatement',
                        value: ';'
                    }
                ]
            }

        );

    } );

} );