import { Parser, Program } from "MAGICAL-JS";

export function getAST ( code: string ): Program {

    return Parser.parse( code );

};