import { RegexFactory } from "@shared/RegexFactory";
import { TokenType } from "./types";

type RegexSpecs = {

    [ key in TokenType ]: RegExp;
};

export const RegexSpec: RegexSpecs = {

    Comma: RegexFactory.Comma,

    String: RegexFactory.String,

    Number: RegexFactory.Number,

    Comment: RegexFactory.Comment,

    Semicolon: RegexFactory.Semicolon,

    VariableKeyword: RegexFactory.VariableKeyword,

    EmptyLine: RegexFactory.EmptyLine,

    EndOfFile: RegexFactory.EndOfFile,

    Identifier: RegexFactory.Identifier,

    Whitespace: RegexFactory.Whitespace,

    OpenCurlyBrace: RegexFactory.OpenCurlyBrace,

    CloseCurlyBrace: RegexFactory.CloseCurlyBrace,

    OpenParenthesis: RegexFactory.OpenParenthesis,

    CloseParenthesis: RegexFactory.CloseParenthesis,

    AssignmentOperator: RegexFactory.AssignmentOperator,

    AdditiveOperator: RegexFactory.AdditiveOperator,

    MultiplicativeOperator: RegexFactory.MultiplicativeOperator,

};