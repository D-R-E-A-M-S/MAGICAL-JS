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

    IfKeyword: /^\bif\b/,

    OpenCurlyBrace: /^\{/,

    CloseCurlyBrace: /^\}/,

    OpenParenthesis: /^\(/,

    CloseParenthesis: /^\)/,

    ElseKeyword: /^\belse\b/,

    AdditiveOperator: /^[+\-]/,

    Identifier: /^[$a-zA-Z_]\w*/,

    String: /^(?:"[^"]*"|'[^']*')/,

    AssignmentOperator: /^[+\-*/%]?=/,

    MultiplicativeOperator: /[*\/%]/,

    Comment: /^\/\*[\s\S]*?\*\/|^\/\/.*/,

    VariableKeyword: /^\b(let|const|var)\b/,

};