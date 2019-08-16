/*
 *
 * "Prison" minigame. Used for Pit and Miranda dungeon.
 *
 */

import { GAME } from "./GAME";
import { GameState, SetGameState } from "./gamestate";
import { Gui } from "./gui";
import { Party } from "./party";
import { Text } from "./text";

/*
 * opts {
 *  party : [player, kiakai...],  - only used for setup
 *  enemy : Party(),
 *  TODO options
 * }
 *
 */
export class PrisonMinigame {
	public party: any[];
	public enemy: Party;

	constructor(opts?: any) {
		opts = opts || {};
		this.party = opts.party || [];
		this.enemy = opts.enemy || new Party();
		// TODO dynamic lists for available actions
	}

	public Prep() {
		const party: Party = GAME().party;

		party.SaveActiveParty();
		party.ClearActiveParty();
		for (let i = 0; i < this.party.length; i++) {
			party.SwitchIn(this.party[i]);
		}

		// TODO maybe use a new one, check rendering
		SetGameState(GameState.Combat, Gui);
	}

	public Cleanup() {
		const party: Party = GAME().party;

		for (let i = 0; i < this.enemy.members.length; i++) {
			const e = this.enemy.members[i];
			e.ClearCombatBonuses();
			e.combatStatus.EndOfCombat();
		}
		for (let i = 0; i < party.members.length; i++) {
			const e = party.members[i];
			e.ClearCombatBonuses();
			e.combatStatus.EndOfCombat();
		}

		party.LoadActiveParty();

		SetGameState(GameState.Event, Gui);
	}

	// TODO
	public Tick() {
		const parse: any = {

		};

		Text.Clear();
		Text.Add("", parse);
		Text.NL();
		Text.Flush();

		// TODO Set up choices
		Gui.ClearButtons();
	}
}
