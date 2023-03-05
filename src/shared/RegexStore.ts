import { TokenTypes } from "src/Parser/types";

type RegexSpecs = {

    [ key in TokenTypes ]: RegExp;
};

export const RegexStore: RegexSpecs = {


    Number: /^\d+/,

    Semicolon: /^;/,

    EndOfFile: /\z$/,

    Whitespace: /^\s+/,

    OpenCurlyBrace: /^\{/,

    CloseCurlyBrace: /^\}/,

    OpenParenthesis: /^\(/,

    CloseParenthesis: /^\)/,

    Identifier: /^[$a-zA-Z_]\w*/,

    ArithmeticOperator: /[+\-*/%]/,

    String: /^(?:"[^"]*"|'[^']*')/,

    Comment: /^\/\*[\s\S]*?\*\/|^\/\/.*/,

    AssignmentOperator: /[+\-*/%]?=/,

};