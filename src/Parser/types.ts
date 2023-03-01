export type TokenType =
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
    | 'AdditiveOperator'
    | 'CloseParenthesis'
    | 'AssignmentOperator'
    | 'MultiplicativeOperator'
    ;

export interface Token {
    type: TokenType;
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
    left: PrimaryExpression | BinaryExpression;
    operator: Token;
    right: PrimaryExpression | BinaryExpression;
}



export type MultiplicativeExpression = PrimaryExpression | MultiplicativeExpressionLeft;
interface MultiplicativeExpressionLeft extends BinaryExpression {
    left: PrimaryExpression | MultiplicativeExpressionLeft;
    right: PrimaryExpression;
}

export type AdditiveExpression = MultiplicativeExpression | AdditiveExpressionLeft;
interface AdditiveExpressionLeft extends BinaryExpression {
    left: MultiplicativeExpression | AdditiveExpressionLeft;
    right: MultiplicativeExpression;
}

export interface Identifier {
    readonly type: 'Identifier';
    readonly name: string;
}

export type AssignmentExpression = {
    readonly type: 'AssignmentExpression';
    readonly left: Identifier;
    readonly operator: Token;
    readonly right: Expression;
} | AdditiveExpression;

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

export type Statement =
    | EmptyStatement
    | BlockStatement
    | ExpressionStatement;

export type StatementList = Statement[];

export interface Program {
    readonly type: 'Program';
    readonly body: StatementList;
}