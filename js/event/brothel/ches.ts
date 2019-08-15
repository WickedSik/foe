/*
 *
 * Define Ches
 *
 */
import { Entity } from "../../entity";

export namespace ChesFlags {
	export enum Met {
		NotMet = 0,
	}
}

export class Ches extends Entity {
	constructor(storage?: any) {
		super();

		this.ID = "ches";

		// Character stats
		this.name = "Ches";

		this.body.DefMale();

		this.flags.Met = ChesFlags.Met.NotMet;

		if (storage) { this.FromStorage(storage); }
	}

	public Met() {
		return this.flags.Met !== ChesFlags.Met.NotMet;
	}

	public FromStorage(storage: any) {
		this.LoadPersonalityStats(storage);

		// Load flags
		this.LoadFlags(storage);
	}

	public ToStorage() {
		const storage: any = {};

		this.SavePersonalityStats(storage);

		this.SaveFlags(storage);

		return storage;
	}

	// Flags

	// Schedule
	public IsAtLocation(location?: any) {
		return true;
	}
}

export namespace ChesScenes {

}
