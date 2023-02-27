export type TokenTypes =
    | 'String'
    | 'Number'
    | 'Comment'
    | 'Semicolon'
    | 'Whitespace'
    | 'EndOfFile'
    | 'OpenCurlyBrace'
    | 'CloseCurlyBrace';

export interface Token {
    type: TokenTypes;
    value: string;
}

export interface StringLiteral {
    readonly type: 'StringLiteral';
    readonly value: string;
}

export interface NumberLiteral {
    readonly type: 'NumberLiteral';
    readonly value: number;
}

export type Literal = StringLiteral | NumberLiteral;

export type Expression = Literal;

export type ExpressionStatement = {
    readonly type: 'ExpressionStatement';
    readonly expression: Expression;
};

export type EmptyStatement = {
    readonly type: 'EmptyStatement';
};

export type BlockStatement = {
    readonly type: 'BlockStatement';
    readonly block: StatementList;
};

export type Statement =
    | EmptyStatement
    | BlockStatement
    | ExpressionStatement;

export type StatementList = Statement[];

export interface Program {
    readonly type: 'Program';
    readonly body: StatementList;
}