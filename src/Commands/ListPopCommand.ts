import { NativeCallProperties } from "../Languages/Properties/NativeCallProperties";
import { NativeCallCommand } from "./NativeCallCommand";
import { Parameter } from "./Parameters/Parameter";
import { SingleParameter } from "./Parameters/SingleParameter";

/**
 * A command for a list pop statement.
 */
export class ListPopCommand extends NativeCallCommand {
    /**
     * Information on parameters this command takes in.
     */
    private static parameters: Parameter[] = [
        new SingleParameter("name", "The name of the list.", true)
    ];

    /**
     * @returns Information on parameters this command takes in.
     */
    public getParameters(): Parameter[] {
        return ListPopCommand.parameters;
    }

    /**
     * @returns Metadata on how to perform the native call.
     */
    protected retrieveNativeCallProperties(): NativeCallProperties {
        return this.language.properties.lists.pop;
    }
}
