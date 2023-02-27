import { RegexStore } from "@shared/RegexStore";
import { TokenTypes } from "./types";

type RegexSpecs = {

    [ key in TokenTypes ]: RegExp;
};

export const RegexSpec: RegexSpecs = {

    Comment: RegexStore.Comment,

    Whitespace: RegexStore.Whitespace,

    String: RegexStore.String,

    Number: RegexStore.Number,

    EndOfFile: RegexStore.EndOfFile,

    Semicolon: RegexStore.Semicolon,

    OpenCurlyBrace: RegexStore.OpenCurlyBrace,

    CloseCurlyBrace: RegexStore.CloseCurlyBrace,

};