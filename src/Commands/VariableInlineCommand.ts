import { Command } from "./Command";
import { CommandNames } from "./CommandNames";
import { LineResults } from "./LineResults";
import { Parameter } from "./Parameters/Parameter";
import { SingleParameter } from "./Parameters/SingleParameter";

/**
 * A command for declaring a variable inline (without a preceding "var ").
 */
export class VariableInlineCommand extends Command {
    /**
     * Information on parameters this command takes in.
     */
    private static parameters: Parameter[] = [
        new SingleParameter("name", "The name of the variable.", true),
        new SingleParameter("type", "The type of the variable.", true),
        new SingleParameter("value", "The starting value of the variable.", false)
    ];

    /**
     * @returns Information on parameters this command takes in.
     */
    public getParameters(): Parameter[] {
        return VariableInlineCommand.parameters;
    }

    /**
     * Renders the command for a language with the given parameters.
     *
     * @param parameters   The command's name, followed by any parameters.
     * @returns Line(s) of code in the language.
     */
    public render(parameters: string[]): LineResults {
        if (parameters.length === 3 && !this.language.properties.variables.declarationRequired) {
            return LineResults.newSingleLine("\0", false);
        }

        const name: string = parameters[1];
        const typeName: string = this.context.convertCommon(CommandNames.Type, parameters[2]);
        let output = "";

        if (this.language.properties.variables.explicitTypes) {
            if (this.language.properties.variables.typesAfterName) {
                output += name + this.language.properties.variables.typeLeft;
                output += typeName;
            } else {
                output += typeName + " " + name;
            }
        } else {
            output += name;
        }

        if (parameters.length > 3) {
            output += " " + this.renderVariableValue(parameters[3]);
        }

        return LineResults.newSingleLine(output, false);
    }

    /**
     * Renders the "= value" part of a command.
     *
     * @param valueRaw   The raw value of a variable.
     * @returns   The "= value" part of a command.
     */
    private renderVariableValue(valueRaw: string): string {
        const operator = this.context.convertCommon("operator", "equals");
        const value = this.context.convertCommon("value", valueRaw);

        return operator + " " + value;
    }
}
