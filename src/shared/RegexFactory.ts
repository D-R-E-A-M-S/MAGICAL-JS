import { TokenType } from "src/Parser/types";

type RegexSpecs = {

    [ key in TokenType ]: RegExp;
};

export const RegexFactory: RegexSpecs = {

    Comma: /^,/,

    Number: /^\d+/,

    Semicolon: /^;/,

    EndOfFile: /\z$/,

    Whitespace: /^\s+/,

    OpenCurlyBrace: /^\{/,

    CloseCurlyBrace: /^\}/,

    OpenParenthesis: /^\(/,

    CloseParenthesis: /^\)/,

    Identifier: /^[$a-zA-Z_]\w*/,

    String: /^(?:"[^"]*"|'[^']*')/,

    AssignmentOperator: /^[+\-*/%]?=/,

    MultiplicativeOperator: /[*\/%]/,

    Comment: /^\/\*[\s\S]*?\*\/|^\/\/.*/,

    EmptyLine: /^\s*$/,

    VariableKeyword: /^\b(let|const|var)\b/,

    AdditiveOperator: /^[+\-]/,
};