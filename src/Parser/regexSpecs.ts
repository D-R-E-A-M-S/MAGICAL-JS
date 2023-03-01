import { RegexStore } from "@shared/RegexStore";
import { TokenTypes } from "./types";

type RegexSpecs = {

    [ key in TokenTypes ]: RegExp;
};

export const RegexSpec: RegexSpecs = {

    String: RegexStore.String,

    Number: RegexStore.Number,

    Comment: RegexStore.Comment,

    Semicolon: RegexStore.Semicolon,

    EndOfFile: RegexStore.EndOfFile,

    Identifier: RegexStore.Identifier,

    Whitespace: RegexStore.Whitespace,

    OpenCurlyBrace: RegexStore.OpenCurlyBrace,

    CloseCurlyBrace: RegexStore.CloseCurlyBrace,

    OpenParenthesis: RegexStore.OpenParenthesis,

    CloseParenthesis: RegexStore.CloseParenthesis,

    AssignmentOperator: RegexStore.AssignmentOperator,

    ArithmeticOperator: RegexStore.ArithmeticOperator,

};