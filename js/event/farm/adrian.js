/*
 *
 * Define Adrian
 *
 */
import { Scenes } from '../../event';
import { Entity } from '../../entity';
import { GetDEBUG } from '../../../app';

function Adrian(storage) {
	Entity.call(this);
	this.ID = "adrian";

	// Character stats
	this.name = "Adrian";

	//this.avatar.combat = new Image();
	//this.avatar.combat.src = "assets/img/adrian_avatar.png";
	
	this.maxHp.base        = 100;
	this.maxSp.base        = 80;
	this.maxLust.base      = 50;
	// Main stats
	this.strength.base     = 20;
	this.stamina.base      = 22;
	this.dexterity.base    = 16;
	this.intelligence.base = 17;
	this.spirit.base       = 15;
	this.libido.base       = 20;
	this.charisma.base     = 18;

	this.level = 5;
	this.sexlevel = 3;
	this.SetExpToLevel();

	this.body.DefMale();
	this.body.SetRace(Race.Horse);
	TF.SetAppendage(this.Back(), AppendageType.tail, Race.Horse, Color.brown);

	this.SetLevelBonus();
	this.RestFull();

	this.flags["Met"] = 0;

	if(storage) this.FromStorage(storage);
}
Adrian.prototype = new Entity();
Adrian.prototype.constructor = Adrian;


Adrian.prototype.FromStorage = function(storage) {
	this.body.FromStorage(storage.body);
	this.LoadPersonalityStats(storage);

	// Load flags
	this.LoadFlags(storage);
}

Adrian.prototype.ToStorage = function() {
	var storage = {};

	this.SaveBodyPartial(storage, {ass: true});
	this.SavePersonalityStats(storage);

	this.SaveFlags(storage);

	return storage;
}


// Schedule
Adrian.prototype.IsAtLocation = function(location) {
	return true;
}

// Party interaction
Adrian.prototype.Interact = function() {
	Text.Clear();
	Text.Add("Rawr Imma horse.");


	if(GetDEBUG()) {
		Text.NL();
		Text.Add("DEBUG: relation: " + adrian.relation.Get(), null, 'bold');
		Text.NL();
		Text.Add("DEBUG: subDom: " + adrian.subDom.Get(), null, 'bold');
		Text.NL();
		Text.Add("DEBUG: slut: " + adrian.slut.Get(), null, 'bold');
		Text.NL();
	}

	Text.Flush();
	Gui.NextPrompt(function() {
		PartyInteraction();
	});
}

export { Adrian };
