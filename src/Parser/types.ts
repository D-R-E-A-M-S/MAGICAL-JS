export type TokenTypes =
    | 'String'
    | 'Number'
    | 'Comment'
    | 'Semicolon'
    | 'EndOfFile'
    | 'Whitespace'
    | 'Identifier'
    | 'OpenCurlyBrace'
    | 'CloseCurlyBrace'
    | 'OpenParenthesis'
    | 'CloseParenthesis'
    | 'AssignmentOperator'
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

export type PrimaryExpression =
    | Literal
    | Identifier
    | ParenthesizedExpression
    ;

export interface BinaryExpression {
    type: 'BinaryExpression';
    left: PrimaryExpression;
    operator: Token;
    right: ArithmeticExpression;
}

export type ArithmeticExpression = BinaryExpression | PrimaryExpression;

export interface Identifier {
    readonly type: 'Identifier';
    readonly name: string;
}

export type AssignmentExpression = {
    readonly type: 'AssignmentExpression';
    readonly left: Identifier;
    readonly operator: Token;
    readonly right: Expression;
} | ArithmeticExpression;

export type Expression = AssignmentExpression;

export interface ExpressionStatement {
    readonly type: 'ExpressionStatement';
    readonly expression: Expression;
}

export interface EmptyStatement {
    readonly type: 'EmptyStatement';
    readonly value: string;
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
