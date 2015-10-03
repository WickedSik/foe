/*
 * Lt Corishev
 */

function Corishev(storage) {
	BossEntity.call(this);
	this.uniqueName = "corishev";
	
	this.avatar.combat     = Images.corishev;
	
	this.name              = "Corishev";
	
	this.maxHp.base        = 1500;
	this.maxSp.base        = 400;
	this.maxLust.base      = 500;
	// Main stats
	this.strength.base     = 20;
	this.stamina.base      = 50;
	this.dexterity.base    = 85;
	this.intelligence.base = 30;
	this.spirit.base       = 40;
	this.libido.base       = 50;
	this.charisma.base     = 30;
	
	this.level             = 12;
	this.sexlevel          = 6;
	
	this.combatExp         = 300;
	this.coinDrop          = 1000;
	
	this.elementDef.dmg[Element.lust] = -1;
	
	this.body              = new Body(this);
	
	this.body.DefMale();
	
	// Set hp and mana to full
	this.SetLevelBonus();
	this.RestFull();
	// Start with some lust
	this.AddLustFraction(0.4);

	if(storage) this.FromStorage(storage);
}
Corishev.prototype = new BossEntity();
Corishev.prototype.constructor = Corishev;

Corishev.prototype.WeaknessResist = function() {
	return 0;
}

Corishev.prototype.DropTable = function() {
	var drops = [];
	drops.push({ it: Items.Weapons.GolWhip });
	drops.push({ it: Items.Combat.LustDart });
	drops.push({ it: Items.Accessories.SimpleCuffs });
	
	if(Math.random() < 0.1)  drops.push({ it: Items.Homos });
	if(Math.random() < 0.1)  drops.push({ it: Items.Letter });
	if(Math.random() < 0.1)  drops.push({ it: Items.SpringWater });
	if(Math.random() < 0.1)  drops.push({ it: Items.Hummus });
	
	return drops;
}

Corishev.prototype.Act = function(encounter, activeChar) {
	var parse = {
		
	};
	
	// Banter
	if(Math.random() < 0.5) {
		var scenes = new EncounterTable();
		scenes.AddEnc(function() {
			Text.Add("<i>“I could’ve simply locked the door and let those useless fools sort you out while you tried to break it down,”</i> Corishev says, a giggle escaping his lips. <i>“But this little wimp here is most unsatisfying - he can’t take even the slightest pain before passing out on me. You two should be much more fun.”</i>", parse);
		}, 1.0, function() { return true; });
		scenes.AddEnc(function() {
			Text.Add("<i>“Seems like a little birdie has found its way down into my dungeon, does it not?”</i> Corishev giggles, eyeing Cveta up and down. <i>“What kind of birdie are you, I wonder? The kind that will sit in a cage and sing pretty songs? Or the kind that I’ll let the men stuff for their own amusement?”</i>", parse);
			Text.NL();
			Text.Add("<i>“You degenerate,”</i> Cveta spits, putting extra venom in that last word.", parse);
		}, 1.0, function() { return true; });
		scenes.AddEnc(function() {
			Text.Add("<i>“I will teach you to embrace suffering. It builds character,”</i> the maddened lieutenant taunts. <i>“You youngsters these days are just too soft and coddled. What can you outlaws hope to do against not just Preston, but those above him?”</i>", parse);
		}, 1.0, function() { return true; });
		scenes.AddEnc(function() {
			Text.Add("<i>“Hurt? Hurt? That didn’t even tickle me! I get beaten harder than that at the brothel!”</i>", parse);
		}, 1.0, function() { return activeChar.entity.HPLevel() < 0.5; });
		scenes.AddEnc(function() {
			Text.Add("<i>“When Preston’s done with you outlaws, I’ll have enough of you in the cells to whip every day!”</i> Corishev’s bloodshot eyes dart this way and that; the sheer thought of such must be practically orgasmic for the madman, judging by how his stiff cock is practically drooling pre thanks to the gol venom. <i>“Every day in the palace plaza, one after the other! It will never end!”</i>", parse);
		}, 1.0, function() { return activeChar.entity.LustLevel() > 0.5; });
		
		scenes.Get();
		Text.NL();
	}
	
	// Pick a random target
	var t = this.GetSingleTarget(encounter, activeChar);
	var highlust = null;
	for(var i = 0; i < party.Num(); i++) {
		var c = party.Get(i);
		if(c.Incapacitated()) continue;
		
		if(c.LustLevel() >= 0.7) {
			highlust = c;
			break;
		}
	}
	
	var choice = Math.random();
	
	if(highlust && Abilities.EnemySkill.Corishev.Punish.enabledCondition(encounter, this)) { // Violate
		Abilities.EnemySkill.Corishev.Punish.Use(encounter, this, highlust);
	}
	else if(choice < 0.2 && Abilities.EnemySkill.Corishev.Lashing.enabledCondition(encounter, this))
		Abilities.EnemySkill.Corishev.Lashing.Use(encounter, this, t);
	else if(choice < 0.4 && Abilities.EnemySkill.Corishev.WideStrike.enabledCondition(encounter, this))
		Abilities.EnemySkill.Corishev.WideStrike.Use(encounter, this, party);
	else if(choice < 0.8 && activeChar.entity.LustLevel() < 0.5 && Abilities.EnemySkill.Corishev.SelfHarm.enabledCondition(encounter, this))
		Abilities.EnemySkill.Corishev.SelfHarm.Use(encounter, this);
	else
		Abilities.EnemySkill.Corishev.Whip.Use(encounter, this, t);
}
