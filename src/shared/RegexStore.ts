import { TokenType } from "src/Parser/types";

type RegexSpecs = {

    [ key in TokenType ]: RegExp;
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

    String: /^(?:"[^"]*"|'[^']*')/,

    AssignmentOperator: /^[+\-*/%]?=/,

    AdditiveOperator: /(?<!\+|\-)=|(?<!\+|\-)\+(?!\+)|(?<!\+|\-)\-(?!\-)/,

    MultiplicativeOperator: /[*\/%]/,

    Comment: /^\/\*[\s\S]*?\*\/|^\/\/.*/,

};