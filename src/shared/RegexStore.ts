export const RegexStore = {

    String: /^(?:"[^"]*"|'[^']*')/,

    Number: /^\d+/,

    EndOfFile: /\z/,

    Whitespace: /^\s+/,

    Comment: /^\/\*[\s\S]*?\*\/|^\/\/.*/,

    Semicolon: /^;/,

};