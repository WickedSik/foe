/*
 * 
 * Wait
 * 
 */
import { Ability, TargetMode } from '../ability';
import { Text } from '../text';
import { Encounter } from '../combat';
import { Entity } from '../entity';

let WaitAb = new Ability();
WaitAb.name = "Wait";
WaitAb.Short = function() { return "Wait a while."; }
WaitAb.targetMode = TargetMode.Self;
WaitAb.castTree.push(function(ability : Ability, encounter : Encounter, caster : Entity) {
	Text.Add("[name] does nothing!", {name: caster.name});
	caster.GetCombatEntry(encounter).initiative += 50;
});

export { WaitAb };