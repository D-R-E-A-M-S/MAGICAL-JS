export type TokenTypes =
    | 'String'
    | 'Number'
    | 'Comment'
    | 'Semicolon'
    | 'Whitespace'
    | 'EndOfFile'
    | 'OpenCurlyBrace'
    | 'CloseCurlyBrace'
    | 'OpenParenthesis'
    | 'CloseParenthesis'
    | 'ArithmeticOperator';

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

export interface ParenthesizedExpression {
    readonly type: 'ParenthesizedExpression';
    readonly expression: Expression;
}

export type PrimaryExpression = Literal | ParenthesizedExpression;

export interface BinaryExpression {
    type: 'BinaryExpression';
    left: PrimaryExpression;
    operator: string;
    right: ArithmeticExpression;
}

export type ArithmeticExpression = BinaryExpression | PrimaryExpression;

export type Expression = ArithmeticExpression;

export interface ExpressionStatement {
    readonly type: 'ExpressionStatement';
    readonly expression: Expression;
}

export interface EmptyStatement {
    readonly type: 'EmptyStatement';
}

export interface BlockStatement {
    readonly type: 'BlockStatement';
    readonly block: StatementList;
}

export type Statement = EmptyStatement | BlockStatement | ExpressionStatement;

export type StatementList = Statement[];

export interface Program {
    readonly type: 'Program';
    readonly body: StatementList;
}
