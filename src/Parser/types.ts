export type TokenTypes =
    | 'String'
    | 'Number'
    | 'Comment'
    | 'Semicolon'
    | 'Whitespace'
    | 'EndOfFile';

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

export interface Program {
    readonly type: 'Program';
    readonly body: Literal[];
}