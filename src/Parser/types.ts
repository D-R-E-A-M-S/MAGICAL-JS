type TokenType =
    | 'Comma'
    | 'String'
    | 'Number'
    | 'Comment'
    | 'Semicolon'
    | 'EndOfFile'
    | 'EmptyLine'
    | 'Whitespace'
    | 'Identifier'
    | 'OpenCurlyBrace'
    | 'CloseCurlyBrace'
    | 'OpenParenthesis'
    | 'VariableKeyword'
    | 'AdditiveOperator'
    | 'CloseParenthesis'
    | 'AssignmentOperator'
    | 'MultiplicativeOperator'
    ;

interface Token {
    type: TokenType;
    value: string;
}

interface StringLiteral {
    readonly type: 'StringLiteral';
    readonly value: string;
}

interface NumberLiteral {
    readonly type: 'NumberLiteral';
    readonly value: number;
}

type Literal = StringLiteral | NumberLiteral;

interface ParenthesizedExpression {
    readonly type: 'ParenthesizedExpression';
    readonly expression: Expression;
}

type PrimaryExpression =
    | Literal
    | Identifier
    | ParenthesizedExpression
    ;

interface BinaryExpression {
    type: 'BinaryExpression';
    left: PrimaryExpression | BinaryExpression;
    operator: Token;
    right: PrimaryExpression | BinaryExpression;
}



type MultiplicativeExpression =
    | PrimaryExpression
    | MultiplicativeExpressionLeft;
interface MultiplicativeExpressionLeft extends BinaryExpression {
    left: PrimaryExpression | MultiplicativeExpressionLeft;
    right: PrimaryExpression;
}

type AdditiveExpression =
    | MultiplicativeExpression
    | AdditiveExpressionLeft;
interface AdditiveExpressionLeft extends BinaryExpression {
    left: MultiplicativeExpression | AdditiveExpressionLeft;
    right: MultiplicativeExpression;
}

interface Identifier {
    readonly type: 'Identifier';
    readonly name: string;
}

type AssignmentExpression = {
    readonly type: 'AssignmentExpression';
    readonly left: Identifier;
    readonly operator: Token;
    readonly right: Expression;
} | AdditiveExpression;

type Expression = AssignmentExpression;

interface ExpressionStatement {
    readonly type: 'ExpressionStatement';
    readonly expression: Expression;
}

interface EmptyStatement {
    readonly type: 'EmptyStatement';
    readonly value: string;
}

interface BlockStatement {
    readonly type: 'BlockStatement';
    readonly block: StatementList;
}

type VariableInitializer = AssignmentExpression;

interface VariableDeclaration {
    readonly type: 'VariableDeclarator';
    readonly identifier: Identifier;
    readonly operator: Token;
    readonly initializer: VariableInitializer;
}

type VariableDeclarationList = VariableDeclaration[];

interface VariableStatement {
    readonly type: 'VariableStatement';
    readonly kind: Token;
    readonly declarations: VariableDeclarationList;

}

type Statement =
    | EmptyStatement
    | BlockStatement
    | VariableStatement
    | ExpressionStatement;

type StatementList = Statement[];

interface Program {
    readonly type: 'Program';
    readonly body: StatementList;
}

export type {
    TokenType,
    Token,
    StringLiteral,
    NumberLiteral,
    Literal,
    ParenthesizedExpression,
    PrimaryExpression,
    BinaryExpression,
    MultiplicativeExpression,
    MultiplicativeExpressionLeft,
    AdditiveExpression,
    AdditiveExpressionLeft,
    Identifier,
    AssignmentExpression,
    Expression,
    ExpressionStatement,
    EmptyStatement,
    BlockStatement,
    VariableInitializer,
    VariableDeclaration,
    VariableDeclarationList,
    VariableStatement,
    Statement,
    StatementList,
    Program
};