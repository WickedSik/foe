import { Gui } from "../gui";
import { Text } from "../text";

export namespace PortalOpeningScenes {

	export function Intro() {
		const parse: any = {

		};

		// TODO
		Text.Clear();
		Text.Add("THIS IS THE END OF CURRENT MAIN STORY CONTENT, COME BACK LATER.", parse, "bold");
		Text.Flush();

		Gui.NextPrompt();
	}

}
