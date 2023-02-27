import { TokenTypes } from "src/Parser/types";

type RegexSpecs = {

    [ key in TokenTypes ]: RegExp;
};

export const RegexStore: RegexSpecs = {

    String: /^(?:"[^"]*"|'[^']*')/,

    Number: /^\d+/,

    EndOfFile: /\z$/,

    Whitespace: /^\s+/,

    Comment: /^\/\*[\s\S]*?\*\/|^\/\/.*/,

    Semicolon: /^;/,

    OpenCurlyBrace: /^\{/,

    CloseCurlyBrace: /^\}/,

};