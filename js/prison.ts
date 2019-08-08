/*
 *
 * "Prison" minigame. Used for Pit and Miranda dungeon.
 *
 */

import { Party } from './party';
import { GameState, SetGameState } from './gamestate';
import { Text } from './text';
import { Gui } from './gui';
import { GAME } from './GAME';

/*
 * opts {
 *  party : [player, kiakai...],  - only used for setup
 *  enemy : Party(),
 *  TODO options
 * }
 *
 */
export class PrisonMinigame {
	party : any[];
	enemy : Party;

	constructor(opts? : any) {
		opts = opts || {};
		this.party = opts.party || [];
		this.enemy = opts.enemy || new Party();
		//TODO dynamic lists for available actions
	}
	
	Prep() {
		let party = GAME().party;

		party.SaveActiveParty();
		party.ClearActiveParty();
		for(var i = 0; i < this.party.length; i++)
			party.SwitchIn(this.party[i]);

		//TODO maybe use a new one, check rendering
		SetGameState(GameState.Combat, Gui);
	}


	Cleanup() {
		let party = GAME().party;

		for(var i = 0; i < this.enemy.members.length; i++) {
			var e = this.enemy.members[i];
			e.ClearCombatBonuses();
			e.combatStatus.EndOfCombat();
		}
		for(var i = 0; i < party.members.length; i++) {
			var e = party.members[i];
			e.ClearCombatBonuses();
			e.combatStatus.EndOfCombat();
		}

		party.LoadActiveParty();

		SetGameState(GameState.Event, Gui);
	}

	//TODO
	Tick() {
		var parse = {

		};

		Text.Clear();
		Text.Add("", parse);
		Text.NL();
		Text.Flush();

		//TODO Set up choices
		Gui.ClearButtons();
	}
}