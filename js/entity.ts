
// Basic game entity
// Enemies and player inherit from Entity
import * as _ from 'lodash';

import { Stat } from './stat';
import { StatusList } from './statuslist';
import { Body } from './body/body';
import { PregnancyHandler, Womb } from './pregnancy';
import { LactationHandler } from './lactation';
import { AbilityCollection } from './ability';
import { DamageType, Element } from './damagetype';
import { GetDEBUG } from '../app';
import { EntityMenu } from './entity-menu';
import { EntityDict } from './entity-dict';
import { EntityDesc } from './entity-desc';
import { LowerBodyType } from './body/body';
import { Time } from './time';
import { Text } from './text';
import { Gui } from './gui';
import { Item, ItemIds } from './item';
import { Perk, PerkIds } from './perks';
import { StatusEffect } from './statuseffect';
import { Color } from './body/color';
import { RaceScore, Race, RaceDesc } from './body/race';
import { AppendageType } from './body/appendage';
import { Abilities } from './abilities';
import { GAME } from './GAME';
import { GetAggroEntry } from './ability/default';
import { CurEncounter } from './combat-data';
import { Jobs } from './job';
import { Gender } from './body/gender';
import { Cock } from './body/cock';
import { Vagina } from './body/vagina';
import { Butt } from './body/butt';
import { BodyPartType } from './body/bodypart';
import { Orifice } from './body/orifice';
import { NippleType } from './body/breasts';

export enum DrunkLevel {
	Sober   = 0.25,
	Tipsy   = 0.50,
	Sloshed = 0.75,
	Drunk   = 1.00
};

export enum TargetStrategy {
	None      = 0, //Not used
	NearDeath = 1,
	LowHp     = 2,
	LowAbsHp  = 4,
	HighHp    = 8,
	HighAbsHp = 16,
	Leader    = 32,
	SPHunt    = 64,
	LPHunt    = 128
};

// TODO: Should have shared features, such as combat stats. Body representation
export class Entity {
	name : string;
	monsterName : string;
	MonsterName : string;
	groupName : string;
	GroupName : string;
	uniqueName : string;
	ID : string;
	title : string[];
	avatar : any;

	combatExp : number;
	coinDrop : number;
	abilities : any;
	recipes : Item[];
	alchemyLevel : number;
	jobs : any;
	currentJob : any;
	experience : number;
	level : number;
	pendingStatPoints : number;
	expToLevel : number;
	sexperience : number;
	sexlevel : number;
	sexpToLevel : number;
	
	ExpToLevel  = 15;
	SexpToLevel = 30;

	curHp : number;
	maxHp : Stat;
	curSp : number;
	maxSp : Stat;
	curLust : number;
	maxLust : Stat;

	strength : Stat;
	stamina : Stat;
	dexterity : Stat;
	intelligence : Stat;
	spirit : Stat;
	libido : Stat;
	charisma : Stat;

	weaponSlot : Item;
	topArmorSlot : Item;
	botArmorSlot : Item;
	acc1Slot : Item;
	acc2Slot : Item;

	strapOn : any;

	elementAtk : DamageType;
	elementDef : DamageType;

	atkMod : number;
	defMod : number;

	combatStatus : StatusList;
	statusDef : any[];
	statusDefGear : any[];
	statusWear : any[];

	body : Body;
	drunkLevel : number;
	pregHandler : PregnancyHandler;
	lactHandler : LactationHandler;
	flags : any;
	sex : any;
	perks : Perk[];
	aggro : any[];
	subDom : Stat;
	slut : Stat;
	relation : Stat;

	location : any;

	constructor() {
		// Names and grammar
		this.name         = "ENTITY";
		this.monsterName  = undefined;
		this.MonsterName  = undefined;
		this.groupName    = undefined;
		this.GroupName    = undefined;
		this.ID           = undefined;
		// Titles are achieved by performing feats or by achieving great strength
		this.title        = new Array();
		
		this.avatar       = {};
		
		// Combat
		this.combatExp    = 0;
		this.coinDrop     = 0;
		
		// TODO: Save/Load
		this.abilities             = {};
		this.abilities["Skills"]  = new AbilityCollection("Skills");
		this.abilities["Spells"]  = new AbilityCollection("Spells");
		this.abilities["Support"] = new AbilityCollection("Support");
		this.abilities["Seduce"]  = new AbilityCollection("Seduce");
		this.abilities["Special"] = new AbilityCollection("SPECIAL");
		
		// Alchemy stuff
		this.recipes      = [];
		this.alchemyLevel = 0;
		
		// Jobs //TODO: Save/load
		this.jobs         = {};
		this.currentJob   = null;
		
		// Experience
		// Experience is gained by defeating enemies and completing quests
		// Enough experience will increase level
		// Levels reward perks, skills and stats bonuses
		this.experience        = 0;
		this.level             = 1;
		this.pendingStatPoints = 0;
		this.expToLevel        = this.ExpToLevel;
		// Sexperience is gained by having sex
		// Sex leves reward sex perks and skills, and affect sexual based bonuses
		this.sexperience  = 0;
		this.sexlevel     = 1;
		this.sexpToLevel  = this.SexpToLevel;

		// Base stats
		var that = this;
		
		// Health stat and functions
		this.curHp        = 0;
		this.maxHp        = new Stat(10, 10, 5);
		this.maxHp.debug = function() { return that.name + ".maxHp"; }
		// SP
		this.curSp        = 0;
		this.maxSp        = new Stat(10, 5, 5);
		this.maxSp.debug = function() { return that.name + ".maxSp"; }

		// Lust stat and functions
		this.curLust      = 0;
		this.maxLust      = new Stat(10, 5, 5);
		this.maxLust.debug = function() { return that.name + ".maxLust"; }
		
		// Main stats
		this.strength     = new Stat(0, 1, 0.1);
		this.strength.debug = function() { return that.name + ".strength"; }
		this.stamina      = new Stat(0, 1, 0.1);
		this.stamina.debug = function() { return that.name + ".stamina"; }
		this.dexterity    = new Stat(0, 1, 0.1);
		this.dexterity.debug = function() { return that.name + ".dexterity"; }
		this.intelligence = new Stat(0, 1, 0.1);
		this.intelligence.debug = function() { return that.name + ".intelligence"; }
		this.spirit       = new Stat(0, 1, 0.1);
		this.spirit.debug = function() { return that.name + ".spirit"; }
		this.libido       = new Stat(0, 1, 0.1);
		this.libido.debug = function() { return that.name + ".libido"; }
		this.charisma     = new Stat(0, 1, 0.1);
		this.charisma.debug = function() { return that.name + ".charisma"; }
		
		// Equipment
		this.weaponSlot   = null;
		this.topArmorSlot = null;
		this.botArmorSlot = null;
		this.acc1Slot     = null;
		this.acc2Slot     = null;

		this.strapOn      = null;
		
		this.elementAtk   = new DamageType();
		this.elementDef   = new DamageType();
		
		this.combatStatus = new StatusList();
		this.statusDef    = [];
		this.statusDefGear = [];
		this.statusWear   = [];
		
		// Body representation
		this.body         = new Body(this);
		
		this.drunkLevel   = 0.0;
		
		this.pregHandler  = new PregnancyHandler(this);
		this.lactHandler  = new LactationHandler(this);
		
		// Set hp and sp to full, clear lust to min level
		this.Equip();
		this.SetLevelBonus();
		this.RestFull();
		
		this.flags = {};
		this.sex = {
			rBlow : 0,
			gBlow : 0,
			rCunn : 0,
			gCunn : 0,
			rAnal : 0,
			gAnal : 0,
			rVag  : 0,
			gVag  : 0,
			sired : 0,
			birth : 0
		};
		
		this.perks   = [];
		this.aggro   = [];
		
		// Personality stats
		this.subDom   = new Stat(0); // sub = low, dom = high
		this.subDom.debug = function() { return that.name + ".subDom"; }
		this.slut     = new Stat(0);
		this.slut.debug = function() { return that.name + ".slut"; }
		this.relation = new Stat(0);
		this.relation.debug = function() { return that.name + ".relation"; }
	}
	
	static IdToEntity = EntityDict.IdToEntity;

	SetLevelBonus() {
		this.maxHp.level        = this.level * this.maxHp.growth;
		this.maxSp.level        = this.level * this.maxSp.growth;
		this.maxLust.level      = this.level * this.maxLust.growth;
		this.strength.level     = this.level * this.strength.growth;
		this.stamina.level      = this.level * this.stamina.growth;
		this.dexterity.level    = this.level * this.dexterity.growth;
		this.intelligence.level = this.level * this.intelligence.growth;
		this.spirit.level       = this.level * this.spirit.growth;
		this.libido.level       = this.level * this.libido.growth;
		this.charisma.level     = this.level * this.charisma.growth;
	}
	
	HasPerk(perk : Perk) {
		for(var i = 0; i < this.perks.length; ++i) {
			if(this.perks[i] == perk)
				return true;
		}
		return false;
	}
	
	AddPerk(perk : Perk) {
		for(var i = 0; i < this.perks.length; ++i) {
			if(this.perks[i] == perk)
				return;
		}
		this.perks.push(perk);
	}
	
	KnowsRecipe(item : Item) {
		var idx = this.recipes.indexOf(item); // Find the index
		return (idx != -1);
	}
	
	AddAlchemy(item : Item) {
		var idx = this.recipes.indexOf(item); // Find the index
		if(idx==-1)
			this.recipes.push(item);
	}
	
	Equip() {
		this.maxHp.bonus        = 0;
		this.maxSp.bonus        = 0;
		this.maxLust.bonus      = 0;
		this.strength.bonus     = 0;
		this.stamina.bonus      = 0;
		this.dexterity.bonus    = 0;
		this.intelligence.bonus = 0;
		this.spirit.bonus       = 0;
		this.libido.bonus       = 0;
		this.charisma.bonus     = 0;
		
		this.atkMod = 1;
		this.defMod = 1;
		
		this.elementAtk = new DamageType();
		if(!this.weaponSlot) this.elementAtk.dmg[Element.pBlunt] = 1;
		this.elementDef = new DamageType();
		
		this.statusDefGear = [];
		
		if(this.weaponSlot   && this.weaponSlot.Equip)   this.weaponSlot.Equip(this);
		if(this.topArmorSlot && this.topArmorSlot.Equip) this.topArmorSlot.Equip(this);
		if(this.botArmorSlot && this.botArmorSlot.Equip) this.botArmorSlot.Equip(this);
		if(this.acc1Slot     && this.acc1Slot.Equip)     this.acc1Slot.Equip(this);
		if(this.acc2Slot     && this.acc2Slot.Equip)     this.acc2Slot.Equip(this);
		
		this.BalanceStats();
	}
	
	Strip() {
		// Remove all equipment (discards it completely and destroys it)
		this.weaponSlot   = null;
		this.topArmorSlot = null;
		this.botArmorSlot = null;
		this.acc1Slot     = null;
		this.acc2Slot     = null;
	
		this.strapOn      = null;
	}
	
	ItemUsable(item : Item) {
		if(item.isTF)
			return false;
		return true;
	}
	
	ItemUse(item : Item, backPrompt : any) {
		return {grab : false, consume : true};
	}
	
	Strapon() {
		return this.strapOn;
	}
	
	AddExp(exp : number, reserve? : boolean) {
		var buff = this.combatStatus.stats[StatusEffect.Full];
		if(buff && buff.exp) {
			exp = Math.ceil(buff.exp * exp);
		}
		
		if(GetDEBUG()) {
			Text.NL();
			Text.Add("[reserve][name] gains [x] xp.", {reserve: reserve ? "RESERVE: " : "", name: this.name, x: exp}, 'bold');
			Text.NL();
			Text.Flush();
		}
		
		this.experience += exp;
		if(this.currentJob) {
			this.currentJob.AddExp(this, exp, reserve);
		}
		
		// Check for level up
		while(this.experience >= this.expToLevel) {
			this.experience        -= this.expToLevel;
			this.expToLevel         = Math.floor(this.expToLevel * 1.2);
			this.level++;
			this.pendingStatPoints += Stat.growthPointsPerLevel;
			
			this.SetLevelBonus();
			
			if(GetDEBUG()) {
				Text.NL();
				Text.Add("[reserve][name] gains a level! Now at [x].", {reserve: reserve ? "RESERVE: " : "", name: this.name, x: this.level}, 'bold');
				Text.NL();
				Text.Flush();
			}
		}
	}
	
	AddSexExp(sexp : number) {
		if(GetDEBUG()) {
			Text.NL();
			Text.Add("[name] gains [x] sex exp.", {name: this.name, x: sexp}, 'bold');
			Text.NL();
			Text.Flush();
		}
		
		this.sexperience += sexp;
		// Check for level up
		while(this.sexperience >= this.sexpToLevel) {
			this.sexperience       -= this.sexpToLevel;
			this.sexpToLevel        = Math.floor(this.sexpToLevel * 2);
			this.sexlevel++;
			//this.pendingStatPoints += 5;
			
			if(GetDEBUG()) {
				Text.NL();
				Text.Add("[name] gains a sex level! Now at [x].", {name: this.name, x: this.sexlevel}, 'bold');
				Text.NL();
				Text.Flush();
			}
		}
	}
	
	SetExpToLevel() {
		this.sexpToLevel  = this.SexpToLevel;
		this.expToLevel   = this.ExpToLevel;
		for(var i = 1; i < this.level; i++)
			this.expToLevel  = Math.floor(this.expToLevel * 1.2);
		for(var i = 1; i < this.sexlevel; i++)
			this.sexpToLevel = Math.floor(this.sexpToLevel * 2);
	}
	
	IsAtLocation(location : any) {
		return (this.location == location);
	}
	
	// Should return an array of drops (if any) in the form of {it: Item, num: amount}
	DropTable() : any[] {
		return [];
	}
	
	Update(step? : number) {
		if(step) {
			var time = new Time();
			time.Inc(step);
			
			var hours = time.ToHours();
			
			this.AddLustOverTime(hours);
			this.AccumulateCumOverTime(hours);
			this.LactationOverTime(hours);
			this.PregnancyOverTime(hours);
			this.HandleDrunknessOverTime(hours);
			this.HandleStretchOverTime(hours);
			
			this.combatStatus.Update(this, hours);
		}
	}
	
	HandleStretchOverTime(hours : number) {
		this.body.HandleStretchOverTime(hours);
	}
	
	//TODO
	AccumulateCumOverTime(hours : number) {
		var balls = this.Balls();
		
		var inc = balls.cumProduction.Get() * hours;
	
		// Max out
		balls.cum.IncreaseStat(balls.CumCap(), inc);
	}
	
	MilkDrained() {
		this.lactHandler.MilkDrained();
		// TODO Output
	}
	MilkFull() {
		this.lactHandler.MilkFull();
	}
	MilkDrain(drain : number) {
		return this.LactHandler().MilkDrain(drain);
	}
	MilkDrainFraction(fraction : number) {
		return this.LactHandler().MilkDrainFraction(fraction);
	}
	
	LactHandler() {
		return this.lactHandler;
	}
	
	LactationOverTime(hours : number) {
		this.lactHandler.Update(hours);
	}
	
	PregHandler() {
		return this.pregHandler;
	}
	
	PregnancyOverTime(hours : number) {
		this.pregHandler.Update(hours);
	}
	
	PregnancyProgess(womb : Womb, slot : number, oldProgress : number, progress : number) {
	}
	
	PregnancyTrigger(womb : Womb, slot : number) {
		// Use unshift instead of push to make sure pregnancy doesn't interfere with scene progression
		Gui.Callstack.unshift(function() {
			womb.pregnant = false;
			
			if(GetDEBUG()) {
				var parse : any = {
					name : this.name
				};
				
				Text.Clear();
				Text.Add("PLACEHOLDER: [name] gave birth.", parse);
				Text.NL();
				Text.Flush();
				Gui.NextPrompt();
			}
		});
	}
	
	CanGiveBirth() {
		return true;
	}
	
	DrunkRecoveryRate() {
		var sta = this.Sta();
		if(sta < Math.E) sta = Math.E;
		return Math.log(sta) / 25;
	}
	HandleDrunknessOverTime(hours : number, suppressText? : boolean) {
		var oldLevel = this.drunkLevel;
		this.drunkLevel -= this.DrunkRecoveryRate() * hours;
		if(this.drunkLevel < 0) this.drunkLevel = 0;
	}
	Drunk() {
		return this.drunkLevel;
	}
	DrunkStr() {
		var parse : any = {
			name : this.NameDesc(),
			isAre : this.is()
		};
		if(this.drunkLevel > DrunkLevel.Drunk)
			return Text.Parse("[name] [isAre] passed out, dead drunk.", parse);
		if(this.drunkLevel > DrunkLevel.Sloshed)
			return Text.Parse("[name] [isAre] reeling, quite drunk.", parse);
		if(this.drunkLevel > DrunkLevel.Tipsy)
			return Text.Parse("[name] [isAre] tipsy, wobbling slighty.", parse);
		if(this.drunkLevel > DrunkLevel.Sober)
			return Text.Parse("[name] [isAre] feeling a bit tipsy.", parse);
		return false;
	}
	Drink(drink : number, suppressText : boolean) {
		var sta = this.Sta();
		if(sta < Math.E) sta = Math.E;
		var oldLevel = this.drunkLevel;
		this.drunkLevel += drink / Math.log(sta);
	}
	// TODO: Implement for companions
	InnPrompt() {
		Text.Clear();
		Text.Add("[PLACEHOLDER]");
		Text.NL();
		Text.Flush();
		Gui.NextPrompt();
	}
	
	SetEyeColor(color : Color) {
		this.body.head.eyes.color = color;
	}
	SetHairColor(color : Color) {
		this.body.head.hair.color = color;
	}
	SetSkinColor(color : Color) {
		this.body.torso.color = color;
	}
	
	DebugMode(debug : boolean) {
		var value = debug ? 50 : 0;
		
		this.maxHp.cheat        = value * 10;
		this.maxSp.cheat        = value * 10;
		this.maxLust.cheat      = value * 10;
		this.strength.cheat     = value;
		this.stamina.cheat      = value;
		this.dexterity.cheat    = value;
		this.intelligence.cheat = value;
		this.spirit.cheat       = value;
		this.libido.cheat       = value;
		this.charisma.cheat     = value;
		
		this.Equip();
		if(debug)
			this.RestFull();
	}
	
	/* COMBAT RELATED FUNTIONS */
	Act(encounter : any, activeChar : any) {
		// TODO: Very TEMP
		Text.Add(this.name + " acts! Rawr!");
		Text.NL();
		Text.Flush();
		
		// Pick a random target
		var t = this.GetSingleTarget(encounter, activeChar);

		Abilities.Attack.Use(encounter, this, t);
	}

	//TODO Structure
	FinishCastInternal(ability : any, encounter : any, caster : any, targets : any) {
		Text.Flush();
		
		Gui.NextPrompt(function() {
			if(encounter)
				encounter.CombatTick();
			else
				Gui.PrintDefaultOptions();
		});
	}

	// Can be overrided to allow for selective cancellation
	CanBeInterrupted(ability : any, encounter : any, caster : any, result : any) {
		return true;
	}


	GetCombatEntry(encounter : any) {
		var ent = this;
		var found : any;
		_.each(encounter.combatOrder, function(it) {
			if(it.entity == ent) {
				found = it;
				return false;
			}
		});
		return found;
	}


	GetPartyTarget(encounter : any, activeChar : any, ally? : any) {
		var isEnemy = activeChar.isEnemy;
		var confuse = activeChar.entity.combatStatus.stats[StatusEffect.Confuse];
		if(confuse)
			isEnemy = !isEnemy;
		if(ally)
			isEnemy = !isEnemy;
		
		if(isEnemy)
			return GAME().party;
		else
			return encounter.enemy;
	}

	GetSingleTarget(encounter : any, activeChar : any, strategy? : TargetStrategy, ally? : boolean) {
		var isEnemy = activeChar.isEnemy;
		var confuse = activeChar.entity.combatStatus.stats[StatusEffect.Confuse];
		if(confuse)
			isEnemy = !isEnemy;
		if(ally)
			isEnemy = !isEnemy;
		
		// Fetch all potential targets
		var targets;
		if(isEnemy)
			targets = encounter.GetLivePartyArray();
		else
			targets = encounter.GetLiveEnemyArray();
		
		strategy = strategy || TargetStrategy.None;
		
		var aggro;
		if(ally) {
			// cleanup
			activeChar.aggroAllies = _.reject(activeChar.aggroAllies, function(it) {
				return it.entity.Incapacitated();
			});

			// adding new aggro targets
			_.each(targets, function(t) {
				if(!GetAggroEntry(activeChar, t))
					activeChar.aggroAllies.push({entity: t, aggro: 1});
			});

			// make a temporary aggro array
			aggro = _.clone(activeChar.aggroAllies);
		}
		else {
			// cleanup
			activeChar.aggro = _.reject(activeChar.aggro, function(it) {
				return it.entity.Incapacitated();
			});

			// adding new aggro targets
			_.each(targets, function(t) {
				if(!GetAggroEntry(activeChar, t))
					activeChar.aggro.push({entity: t, aggro: 1});
			});

			// make a temporary aggro array
			aggro = _.clone(activeChar.aggro);
		}
		
		// Strategies
		if(strategy & TargetStrategy.NearDeath) {
			_.each(aggro, function(a) {
				var hp  = 1 - a.entity.HPLevel();
				hp *= hp;
				a.aggro *= hp;
			});
		}
		if(strategy & TargetStrategy.LowHp) {
			_.each(aggro, function(a) {
				var hp  = 1 - a.entity.HPLevel();
				a.aggro *= hp;
			});
		}
		if(strategy & TargetStrategy.HighHp) {
			_.each(aggro, function(a) {
				var hp  = a.entity.HPLevel();
				a.aggro *= hp;
			});
		}
		
		// Normalize hp
		var min = _.minBy(aggro.length, function(a : any) {
			return a.entity.curHp;
		});
		var max = _.maxBy(aggro.length, function(a : any) {
			return a.entity.curHp;
		});
		
		var span = max - min;
		if(strategy & TargetStrategy.LowAbsHp) {
			_.each(aggro, function(a) {
				var hp = (a.entity.curHp - min) / span;
				var hp  = 1 - hp;
				a.aggro *= hp;
			});
		}
		if(strategy & TargetStrategy.HighAbsHp) {
			_.each(aggro, function(a) {
				var hp = (a.entity.curHp - min) / span;
				a.aggro *= hp;
			});
		}
		
		if(strategy & TargetStrategy.Leader) { //Test, this might be wrong
			if(aggro.length > 0)
				aggro[0].aggro *= 5;
		}
		if(strategy & TargetStrategy.SPHunt) {
			for(var i = 0; i < aggro.length; i++) {
				var sp = Math.log(aggro[i].entity.SP());
				aggro[i].aggro *= sp;
			}
		}
		if(strategy & TargetStrategy.LPHunt) {
			for(var i = 0; i < aggro.length; i++) {
				var lp = Math.log(aggro[i].entity.Lust());
				aggro[i].aggro *= lp;
			}
		}
		
		// TODO: more complex targetting
		/*
		if(strategy & TargetStrategy.None) {
			var val = this.effect.statusDef[i];
			val
				var mod = "+";
				if(val < 0) mod = "-"; 
		}val*100 + ""% + mod
		*/
		
		// Weigthed random selection
		var sum = _.sumBy(aggro, function(a : any) {
			return a.aggro;
		});
		
		// Pick a target
		var step = Math.random() * sum;
		
		for(var i = 0; i < aggro.length; i++) {
			step -= aggro[i].aggro;
			if(step <= 0.0) return aggro[i].entity;
		}
		
		return _.sample(aggro).entity;
	}

	//STATS
	HP() {
		var buff = this.combatStatus.stats[StatusEffect.Buff];
		var mod = (buff && buff.HP) ? buff.HP : 1;
		return Math.ceil((this.maxHp.Get() + Math.pow((this.strength.Get() + this.stamina.Get())/2, 1.3)) * mod);
	}

	SP() {
		var buff = this.combatStatus.stats[StatusEffect.Buff];
		var mod = (buff && buff.SP) ? buff.SP : 1;
		return Math.ceil((this.maxSp.Get() + Math.pow((this.spirit.Get() + this.intelligence.Get() + this.stamina.Get())/3, 1.3)) * mod);
	}

	Lust() {
		var buff = this.combatStatus.stats[StatusEffect.Buff];
		var mod = (buff && buff.LP) ? buff.LP : 1;
		return Math.ceil((this.maxLust.Get() + Math.pow(this.libido.Get(), 1.3)) * mod);
	}

	MinLust() {
		return 0; // TODO: Implement
	}

	// STATS
	Str() {
		var buff = this.combatStatus.stats[StatusEffect.Buff];
		if(buff && buff.Str)
			return this.strength.Get() * buff.Str;
		else
			return this.strength.Get();
	}
	Sta() {
		var buff = this.combatStatus.stats[StatusEffect.Buff];
		if(buff && buff.Sta)
			return this.stamina.Get() * buff.Sta;
		else
			return this.stamina.Get();
	}
	Dex() {
		var buff = this.combatStatus.stats[StatusEffect.Buff];
		if(buff && buff.Dex)
			return this.dexterity.Get() * buff.Dex;
		else
			return this.dexterity.Get();
	}
	Int() {
		var buff = this.combatStatus.stats[StatusEffect.Buff];
		if(buff && buff.Int)
			return this.intelligence.Get() * buff.Int;
		else
			return this.intelligence.Get();
	}
	Spi() {
		var buff = this.combatStatus.stats[StatusEffect.Buff];
		if(buff && buff.Spi)
			return this.spirit.Get() * buff.Spi;
		else
			return this.spirit.Get();
	}
	Lib() {
		var buff = this.combatStatus.stats[StatusEffect.Buff];
		if(buff && buff.Lib)
			return this.libido.Get() * buff.Lib;
		else
			return this.libido.Get();
	}
	Cha() {
		var buff = this.combatStatus.stats[StatusEffect.Buff];
		if(buff && buff.Cha)
			return this.charisma.Get() * buff.Cha;
		else
			return this.charisma.Get();
	}

	// TODO: Certain status effects like paralyze should also count as incapacitated
	Incapacitated() {
		return this.curHp <= 0; // || this.curLust >= this.Lust();
	}
	Inhibited() {
		if(this.combatStatus.stats[StatusEffect.Freeze]  != null) return true;
		if(this.combatStatus.stats[StatusEffect.Numb]    != null) return true;
		if(this.combatStatus.stats[StatusEffect.Petrify] != null) return true;
		if(this.combatStatus.stats[StatusEffect.Blind]   != null) return true;
		if(this.combatStatus.stats[StatusEffect.Sleep]   != null) return true;
		if(this.combatStatus.stats[StatusEffect.Enrage]  != null) return true;
		if(this.combatStatus.stats[StatusEffect.Fatigue] != null) return true;
		if(this.combatStatus.stats[StatusEffect.Limp]    != null) return true;
		
		return false;
	}

	AddHPFraction(fraction : number) {
		fraction = fraction || 0;
		var old = this.curHp;
		this.curHp += fraction * this.HP();
		if(this.curHp > this.HP()) this.curHp = this.HP();
		if(this.curHp < 0) {
			this.curHp = 0;
			if(CurEncounter())
				CurEncounter().OnIncapacitate(this);
		}
		
		if(fraction > 0 && this.combatStatus.stats[StatusEffect.Bleed])
			this.combatStatus.stats[StatusEffect.Bleed] = null;
		return this.curHp - old;
	}
	AddSPFraction(fraction : number) {
		fraction = fraction || 0;
		var old = this.curSp;
		this.curSp += fraction * this.SP();
		if(this.curSp > this.SP()) this.curSp = this.SP();
		if(this.curSp < 0) this.curSp = 0;
		return this.curSp - old;
	}
	AddLustFraction(fraction : number) { // 0..1
		fraction = fraction || 0;
		var old = this.curLust;
		this.curLust += fraction * this.Lust();
		if(this.curLust > this.Lust()) this.curLust = this.Lust();
		if(this.curLust < 0) this.curLust = 0;
		return this.curLust - old;
	}

	PhysDmgHP(encounter : any, caster : any, val : number) {
		var parse : any = {
			possessive : this.possessive()
		};
		var ent = this;
		
		//Healing
		if(val >= 0) return true;
		
		// Check for sleep
		if(this.combatStatus.stats[StatusEffect.Sleep] != null) {
			this.combatStatus.stats[StatusEffect.Sleep] = null;
		}
		// Check for confuse
		if(this.combatStatus.stats[StatusEffect.Confuse] != null) {
			this.combatStatus.stats[StatusEffect.Confuse].OnFade(encounter, this);
		}
		
		// Check for counter
		if(this.combatStatus.stats[StatusEffect.Counter] != null) {
			var onhit = this.combatStatus.stats[StatusEffect.Counter].OnHit;
			
			this.combatStatus.stats[StatusEffect.Counter].hits--;
			if(this.combatStatus.stats[StatusEffect.Counter].hits <= 0)
				this.combatStatus.stats[StatusEffect.Counter] = null;

			var ret;
			if(onhit)
				ret = onhit(encounter, this, caster, val);

			return ret;
		}
		// Check for decoy
		var decoy = this.combatStatus.stats[StatusEffect.Decoy];
		if(decoy != null) {
			var num  = decoy.copies;
			var toHit = 1 / (num + 1);
			if(Math.random() < toHit)
				return true;
			
			var func = decoy.func || function() {
				parse["oneof"] = num > 1 ? " one of" : "";
				parse["copy"]  = num > 1 ? "copies" : "copy";
				Text.Add("The attack is absorbed by[oneof] [possessive] [copy]!", parse);
				Text.NL();
				ent.combatStatus.stats[StatusEffect.Decoy].copies--;
				if(ent.combatStatus.stats[StatusEffect.Decoy].copies <= 0)
					ent.combatStatus.stats[StatusEffect.Decoy] = null;
				Text.Flush();
				return false;
			}
			return func(caster, val);
		}
		
		return true;
	}
	AddHPAbs(val : number) {
		val = val || 0;
		var old = this.curHp;
		this.curHp += val;
		if(this.curHp > this.HP()) this.curHp = this.HP();
		if(this.curHp < 0) {
			this.curHp = 0;
			if(CurEncounter())
				CurEncounter().OnIncapacitate(this);
		}
		
		if(val > 0 && this.combatStatus.stats[StatusEffect.Bleed])
			this.combatStatus.stats[StatusEffect.Bleed] = null;
		return this.curHp - old;
	}
	AddSPAbs(val : number) {
		val = val || 0;
		var old = this.curSp;
		this.curSp += val;
		if(this.curSp > this.SP()) this.curSp = this.SP();
		if(this.curSp < 0) this.curSp = 0;
		return this.curSp - old;
	}
	AddLustAbs(val : number) {
		val = val || 0;
		var old = this.curLust;
		this.curLust += val;
		if(this.curLust > this.Lust()) this.curLust = this.Lust();
		if(this.curLust < 0) this.curLust = 0;
		return this.curLust - old;
	}

	RestFull() {
		this.curHp = this.HP();
		this.curSp = this.SP();
		this.curLust = this.MinLust();
		
		//this.combatStatus.Clear();
	}

	Sleep() {
		this.curHp = this.HP();
		this.curSp = this.SP();
	}


	// HP function (returns range 0..1)
	HPLevel() {
		return this.curHp / this.HP();
	}

	// SP function (returns range 0..1)
	SPLevel() {
		return this.curSp / this.SP();
	}

	// Lust function (returns range 0..1)
	LustLevel() {
		return this.curLust / this.Lust();
	}

	// Clear combat effects, called at end of encounters
	ClearCombatBonuses() {
		this.maxHp.temp        = 0;
		this.maxSp.temp        = 0;
		this.maxLust.temp      = 0;
		this.strength.temp     = 0;
		this.stamina.temp      = 0;
		this.dexterity.temp    = 0;
		this.intelligence.temp = 0;
		this.spirit.temp       = 0;
		this.libido.temp       = 0;
		this.charisma.temp     = 0;
		
		this.BalanceStats();
		
		this.statusWear = [];
	}

	// Balance mana, lust and hp
	BalanceStats() {
		if(this.curHp < 0)
			this.curHp = 0;
		else if(this.curHp > this.HP())
			this.curHp = this.HP();
		
		if(this.curSp < 0)
			this.curSp = 0;
		else if(this.curSp > this.SP())
			this.curSp = this.SP();
			
		if(this.curLust < 0)
			this.curLust = 0;
		else if(this.curLust > this.Lust())
			this.curLust = this.Lust();
	}

	AddLustOverTime(hours : number) {
		// TODO: Function
		var lustRate = this.libido.Get() / this.spirit.Get();
		lustRate /= 48;
		var slutFactor = ((this.slut.Get()/100) + 1);
		
		this.AddLustFraction(hours * lustRate * slutFactor);
	}

	LustCombatEfficiencyLevel() {
		var lustFactor = (this.LustLevel() - 0.5) * 2;
		if(lustFactor < 0) lustFactor = 0;
		// linear for now
		return 1.0 - 0.25 * lustFactor;
	}

	LustCombatTurnLossChance() {
		var lustFactor = this.LustLevel() - 0.5;
		if(lustFactor < 0) lustFactor = 0;
		return lustFactor; // linear for now
	}

	Initiative() {
		var ini = Math.sqrt(2 * this.Dex() + this.Int());
		var haste = this.combatStatus.stats[StatusEffect.Haste];
		if(haste) ini *= haste.factor;
		var slow  = this.combatStatus.stats[StatusEffect.Slow];
		if(slow)  ini /= slow.factor;
		return ini;
	}

	// Combat functions (calculated)
	PAttack() {
		// Stat based
		var atkStat = (this.Str() * 3 + this.Sta() + this.Dex()) / 2;
		// Weapon strength based
		var atkWep = this.atkMod;
		
		// Currently range the attack between 0.9 and 1.1
		var atkRand = _.random(0.9, 1.1);
		
		return atkStat * atkWep * atkRand;
	}

	// TODO: Add perk/elemental/special effects
	PDefense() {
		// Stat based
		var defStat = this.Sta() * 3 + this.Spi();
		if(defStat < 0) defStat = 0;
		// Defense based on armor
		var defArmor = this.defMod;
		// Reduce effect of armor due to armor penetration (TODO)
		
		// Currently range the attack between 0.9 and 1.1
		var defRand = _.random(0.9, 1.1);
		
		// Combine the result
		return defStat * defArmor * defRand;
	}

	// TODO temp
	PHit() {
		var hitStat = 3 * this.Dex() + this.Int() + this.Cha();
		
		var blind = this.combatStatus.stats[StatusEffect.Blind];
		if(blind) {
			hitStat *= (1 - blind.str);
		}
		
		return hitStat;
	}

	// TODO temp
	PEvade(attack? : number) {
		var evadeStat = 3 * this.Dex() + this.Int() + this.Cha();
		
		return evadeStat;
	}

	// TODO temp
	MAttack() {
		var magStat = (3 * this.Int() + this.Spi() + this.Cha()) / 2;
		
		var magRand = _.random(0.9, 1.1);
		
		return magStat * magRand;
	}

	// TODO temp
	MDefense() {
		var magDef = this.Sta() + 3 * this.Spi();
		if(magDef < 0) magDef = 0;
		
		var magRand = _.random(0.9, 1.1);
		
		return magDef * magRand;
	}

	MHit() {
		var hitStat = 3 * this.Int() + this.Spi() + this.Cha();
		
		return hitStat;
	}

	// TODO temp
	MEvade(attack? : number) {
		var evadeStat = 3 * this.Spi() + this.Int() + this.Dex();
		
		return evadeStat;
	}

	LAttack() {
		// Stat based
		var sedStat = (this.Dex() + 2 * this.Lib() + 2 * this.Cha()) / 2;
		/*
		var sedLust = this.LustLevel();
		*/
		// Armor sluttiness based (TODO)
		var sedArmor = 1;
		
		// Currently range the attack between 0.9 and 1.1
		var sedRand = _.random(0.9, 1.1);
		
		return sedStat /* * sedLust*/ * sedArmor * sedRand;
	}

	LDefense() {
		// Stat based
		var comStat = 2 * this.Sta() + this.Spi() + this.Cha();
		if(comStat < 0) comStat = 0;

		// Lust and libido based
	//	var comLust = this.libido.Get() + this.LustLevel();
		
		
		// Currently range the attack between 0.9 and 1.1
		var comRand = _.random(0.9, 1.1);
		
		return comStat /* * comLust*/ * comRand;
	}

	// TODO temp
	LHit() {
		var hitStat = 3 * this.Lib() + 2 * this.Cha();
		
		return hitStat;
	}

	// TODO temp
	LEvade(attack? : number) {
		var evadeStat = 3 * this.Spi() + this.Sta() + this.Int();
		
		var blind = this.combatStatus.stats[StatusEffect.Blind];
		if(blind) {
			evadeStat *= (1 + blind.str);
		}
		
		return evadeStat;
	}




	Resistance(type : number) {
		var res   = this.statusDef[type]     || 0;
		var gear  = this.statusDefGear[type] || 0;
		var wear  = this.statusWear[type]    || 0;
		var curse = this.combatStatus.stats[StatusEffect.Curse];
		var total = res + gear - wear;
		if(curse) {
			total -= curse.str;
		}
		//TODO other factors
		return total;
	}

	AddResistanceWear(type : number, wear? : number) {
		wear = wear || 0;
		if(this.statusWear[type]) {
			this.statusWear[type] += wear;
		}
		else {
			this.statusWear[type] = wear;
		}
	}

	/* ENTITY MENU */
	InteractDefault = EntityMenu.InteractDefault;
	LevelUpPrompt = EntityMenu.LevelUpPrompt;
	EquipPrompt = EntityMenu.EquipPrompt;
	JobPrompt = EntityMenu.JobPrompt;
	
	/* ENTITY SAVE */
	
	SaveSexFlags(storage : any) {
		var sex : any = {};
		if(this.sex.rBlow != 0) sex.rBlow = this.sex.rBlow;
		if(this.sex.gBlow != 0) sex.gBlow = this.sex.gBlow;
		if(this.sex.rCunn != 0) sex.rCunn = this.sex.rCunn;
		if(this.sex.gCunn != 0) sex.gCunn = this.sex.gCunn;
		if(this.sex.rAnal != 0) sex.rAnal = this.sex.rAnal;
		if(this.sex.gAnal != 0) sex.gAnal = this.sex.gAnal;
		if(this.sex.rVag  != 0) sex.rVag  = this.sex.rVag;
		if(this.sex.gVag  != 0) sex.gVag  = this.sex.gVag;
		if(this.sex.sired != 0) sex.sired = this.sex.sired;
		if(this.sex.birth != 0) sex.birth = this.sex.birth;
		storage.sex = sex;
	}

	SaveCombatStats(storage : any) {
		storage.name     = this.name;
		storage.exp      = this.experience.toFixed();
		storage.points   = this.pendingStatPoints.toFixed();
		storage.exp2lvl  = this.expToLevel.toFixed();
		storage.lvl      = this.level.toFixed();
		storage.sexp     = this.sexperience.toFixed();
		storage.sxp2lvl  = this.sexpToLevel.toFixed();
		storage.slvl     = this.sexlevel.toFixed();
		storage.alvl     = this.alchemyLevel.toFixed();
		storage.curHp    = this.curHp.toFixed(1);
		storage.maxHp    = this.maxHp.base.toFixed(1);
		storage.curSp    = this.curSp.toFixed(1);
		storage.maxSp    = this.maxSp.base.toFixed(1);
		storage.curLust  = this.curLust.toFixed(1);
		storage.maxLust  = this.maxLust.base.toFixed(1);
		// Main stats
		storage.str      = this.strength.base.toFixed(1);
		storage.sta      = this.stamina.base.toFixed(1);
		storage.dex      = this.dexterity.base.toFixed(1);
		storage.inte     = this.intelligence.base.toFixed(1);
		storage.spi      = this.spirit.base.toFixed(1);
		storage.lib      = this.libido.base.toFixed(1);
		storage.cha      = this.charisma.base.toFixed(1);
		// Growth
		storage.maxHpG   = this.maxHp.growth.toFixed(1);
		storage.maxSpG   = this.maxSp.growth.toFixed(1);
		storage.maxLustG = this.maxLust.growth.toFixed(1);
		storage.strG     = this.strength.growth.toFixed(1);
		storage.staG     = this.stamina.growth.toFixed(1);
		storage.dexG     = this.dexterity.growth.toFixed(1);
		storage.inteG    = this.intelligence.growth.toFixed(1);
		storage.spiG     = this.spirit.growth.toFixed(1);
		storage.libG     = this.libido.growth.toFixed(1);
		storage.chaG     = this.charisma.growth.toFixed(1);
		
		if(this.monsterName) storage.mName = this.monsterName;
		if(this.MonsterName) storage.MName = this.MonsterName;
		
		this.SaveStatusEffects(storage);
	}

	SaveStatusEffects(storage : any) {
		var s = this.combatStatus.ToStorage();
		if(s)
			storage.stat = s;
	}

	SavePersonalityStats(storage : any) {
		// Personality stats
		if(this.subDom.base   != 0) storage.subDom = this.subDom.base.toFixed();
		if(this.slut.base     != 0) storage.slut   = this.slut.base.toFixed();
		if(this.relation.base != 0) storage.rel    = this.relation.base.toFixed();
		if(this.drunkLevel    != 0) storage.drunk  = this.drunkLevel.toFixed(2);
	}

	SaveFlags(storage : any) {
		var flags : any = {};
		for(var flag in this.flags) {
			if(this.flags[flag] != 0)
				flags[flag] = this.flags[flag];
		}
		storage.flags = flags;
	}

	SavePerks(storage : any) {
		var perks = [];
		for(var i = 0; i < this.perks.length; ++i) {
			perks.push(this.perks[i].id);
		}
		storage.perks = perks;
	}

	SaveRecipes(storage : any) {
		if(this.recipes) {
			storage.recipes = [];
			for(var i = 0; i < this.recipes.length; i++)
				storage.recipes.push(this.recipes[i].id);
		}
	}

	SaveJobs(storage : any) {
		storage.jobs = {};
		for(var job in this.jobs) {
			var jd = this.jobs[job];
			var jobStorage = jd.ToStorage();
			if(jobStorage)
				storage.jobs[job] = jobStorage;
		}
		if(this.currentJob)
			storage.curJob = this.currentJob.name;
	}

	SaveEquipment(storage : any) {
		// Equipment
		if(this.weaponSlot)   storage.wep    = this.weaponSlot.id;
		if(this.topArmorSlot) storage.toparm = this.topArmorSlot.id;
		if(this.botArmorSlot) storage.botarm = this.botArmorSlot.id;
		if(this.acc1Slot)     storage.acc1   = this.acc1Slot.id;
		if(this.acc2Slot)     storage.acc2   = this.acc2Slot.id;
		
		if(this.strapOn)      storage.toy    = this.strapOn.id;
	}

	SavePregnancy(storage : any) {
		storage.preg = this.pregHandler.ToStorage();
	}

	SaveLactation(storage : any) {
		storage.lact = this.lactHandler.ToStorage();
	}

	//Only saves some stats from body
	/*
	* opts: cock
	*       balls
	*       vag
	*       ass
	*       breasts
	*       full
	*/
	SaveBodyPartial(storage : any, opts : any) {
		storage.body = this.body.ToStoragePartial(opts);
	}

	// Convert to a format easy to write to/from memory
	ToStorage() {
		var storage : any = {};
		
		storage.body = this.body.ToStorage();
		
		this.SaveCombatStats(storage);
		this.SavePersonalityStats(storage);
		this.SaveRecipes(storage);
		this.SaveJobs(storage);
		this.SaveEquipment(storage);
		this.SavePregnancy(storage);
		this.SaveLactation(storage);

		this.SaveFlags(storage);
		this.SaveSexFlags(storage);
		this.SavePerks(storage);
		
		return storage;
	}

	LoadCombatStats(storage : any) {
		this.name              = storage.name  || this.name;
		this.monsterName       = storage.mName || this.monsterName;
		this.MonsterName       = storage.MName || this.MonsterName;
		
		this.experience        = !isNaN(parseInt(storage.exp))     ? parseInt(storage.exp) : this.experience;
		this.level             = !isNaN(parseInt(storage.lvl))     ? parseInt(storage.lvl) : this.level;
		this.pendingStatPoints = !isNaN(parseInt(storage.points))  ? parseInt(storage.points) : this.pendingStatPoints;
		this.expToLevel        = !isNaN(parseInt(storage.exp2lvl)) ? parseInt(storage.exp2lvl) : this.expToLevel;
		this.sexperience       = !isNaN(parseInt(storage.sexp))    ? parseInt(storage.sexp) : this.sexperience;
		this.sexpToLevel       = !isNaN(parseInt(storage.sxp2lvl)) ? parseInt(storage.sxp2lvl) : this.sexpToLevel;
		this.sexlevel          = !isNaN(parseInt(storage.slvl))    ? parseInt(storage.slvl) : this.sexlevel;
		this.alchemyLevel      = !isNaN(parseInt(storage.alvl))    ? parseInt(storage.alvl) : this.alchemyLevel;
		this.curHp             = !isNaN(parseFloat(storage.curHp))   ? parseFloat(storage.curHp) : this.curHp;
		this.maxHp.base        = !isNaN(parseFloat(storage.maxHp))   ? parseFloat(storage.maxHp) : this.maxHp.base;
		this.curSp             = !isNaN(parseFloat(storage.curSp))   ? parseFloat(storage.curSp) : this.curSp;
		this.maxSp.base        = !isNaN(parseFloat(storage.maxSp))   ? parseFloat(storage.maxSp) : this.maxSp.base;
		this.curLust           = !isNaN(parseFloat(storage.curLust)) ? parseFloat(storage.curLust) : this.curLust;
		this.maxLust.base      = !isNaN(parseFloat(storage.maxLust)) ? parseFloat(storage.maxLust) : this.maxLust.base;
		// Main stats
		this.strength.base     = !isNaN(parseFloat(storage.str))     ? parseFloat(storage.str) : this.strength.base;
		this.stamina.base      = !isNaN(parseFloat(storage.sta))     ? parseFloat(storage.sta) : this.stamina.base;
		this.dexterity.base    = !isNaN(parseFloat(storage.dex))     ? parseFloat(storage.dex) : this.dexterity.base;
		this.intelligence.base = !isNaN(parseFloat(storage.inte))    ? parseFloat(storage.inte) : this.intelligence.base;
		this.spirit.base       = !isNaN(parseFloat(storage.spi))     ? parseFloat(storage.spi) : this.spirit.base;
		this.libido.base       = !isNaN(parseFloat(storage.lib))     ? parseFloat(storage.lib) : this.libido.base;
		this.charisma.base     = !isNaN(parseFloat(storage.cha))     ? parseFloat(storage.cha) : this.charisma.base;
		// Growth
		this.maxHp.growth        = !isNaN(parseFloat(storage.maxHpG))   ? parseFloat(storage.maxHpG) : this.maxHp.growth;
		this.maxSp.growth        = !isNaN(parseFloat(storage.maxSpG))   ? parseFloat(storage.maxSpG) : this.maxSp.growth;
		this.maxLust.growth      = !isNaN(parseFloat(storage.maxLustG)) ? parseFloat(storage.maxLustG) : this.maxLust.growth;
		this.strength.growth     = !isNaN(parseFloat(storage.strG))     ? parseFloat(storage.strG) : this.strength.growth;
		this.stamina.growth      = !isNaN(parseFloat(storage.staG))     ? parseFloat(storage.staG) : this.stamina.growth;
		this.dexterity.growth    = !isNaN(parseFloat(storage.dexG))     ? parseFloat(storage.dexG) : this.dexterity.growth;
		this.intelligence.growth = !isNaN(parseFloat(storage.inteG))    ? parseFloat(storage.inteG) : this.intelligence.growth;
		this.spirit.growth       = !isNaN(parseFloat(storage.spiG))     ? parseFloat(storage.spiG) : this.spirit.growth;
		this.libido.growth       = !isNaN(parseFloat(storage.libG))     ? parseFloat(storage.libG) : this.libido.growth;
		this.charisma.growth     = !isNaN(parseFloat(storage.chaG))     ? parseFloat(storage.chaG) : this.charisma.growth;

		this.LoadStatusEffects(storage);
	}

	LoadStatusEffects(storage : any) {
		if(storage.stat) {
			this.combatStatus.FromStorage(storage.stat);
		}
	}

	LoadPersonalityStats(storage : any) {
		// Personality stats
		this.subDom.base         = parseInt(storage.subDom)  || this.subDom.base;
		this.slut.base           = parseInt(storage.slut)    || this.slut.base;
		this.relation.base       = parseInt(storage.rel)     || this.relation.base;
		this.drunkLevel          = parseFloat(storage.drunk) || this.drunkLevel;
	}

	LoadRecipes(storage : any) {
		if(storage.recipes) {
			this.recipes = [];
			for(var i = 0; i < storage.recipes.length; i++)
				this.recipes.push(ItemIds[storage.recipes[i]]);
		}
	}

	LoadJobs(storage : any) {
		if(storage.jobs) {
			for(var job in this.jobs) {
				var jd = this.jobs[job];
				jd.FromStorage(storage.jobs[jd.job.name]);
			}
		}
		if(storage.curJob)
			this.currentJob = Jobs[storage.curJob];
	}

	LoadEquipment(storage : any) {
		if(storage.wep)    this.weaponSlot   = ItemIds[storage.wep];
		if(storage.toparm) this.topArmorSlot = ItemIds[storage.toparm];
		if(storage.botarm) this.botArmorSlot = ItemIds[storage.botarm];
		if(storage.acc1)   this.acc1Slot     = ItemIds[storage.acc1];
		if(storage.acc2)   this.acc2Slot     = ItemIds[storage.acc2];
		
		if(storage.toy)    this.strapOn      = ItemIds[storage.toy];
	}

	LoadFlags(storage : any) {
		for(var flag in storage.flags)
			this.flags[flag] = parseInt(storage.flags[flag]);
	}

	LoadSexFlags(storage : any) {
		for(var flag in storage.sex)
			this.sex[flag] = parseInt(storage.sex[flag]);
	}

	LoadPerks(storage : any) {
		if(storage.perks) {
			this.perks = [];
			for(var i = 0; i < storage.perks.length; i++) {
				this.perks.push(PerkIds[storage.perks[i]]);
			}
		}
	}

	LoadPregnancy(storage : any) {
		this.pregHandler.FromStorage(storage.preg);
	}

	LoadLactation(storage : any) {
		this.lactHandler.FromStorage(storage.lact);
	}

	FromStorage(storage : any) {
		storage = storage || {};
		
		if(storage.body) {
			this.body = new Body(this);
			this.body.FromStorage(storage.body);
		}
		this.LoadPregnancy(storage);
		this.LoadLactation(storage);
		
		// Load flags
		this.LoadFlags(storage);
		this.LoadSexFlags(storage);
		this.LoadCombatStats(storage);
		this.LoadPersonalityStats(storage);
		
		this.LoadRecipes(storage);
		this.LoadJobs(storage);
		this.LoadEquipment(storage);
		this.LoadPerks(storage);
		
		this.RecallAbilities(); // TODO: Implement for special abilitiy sources (flag dependent)
		this.SetLevelBonus();
		this.Equip();
	}

	RecallAbilities() {
		for(var job in this.jobs) {
			var jd = this.jobs[job];
			for(var i = 0; i < jd.level - 1; i++) {
				if(i >= jd.job.levels.length) break;
				var skills = jd.job.levels[i].skills;
				// Teach new skills
				if(skills) {
					// [ { ab: Ablities.Black.Fireball, set: "Spells" }, ... ]
					for(var j = 0; j < skills.length; j++) {
						var sd      = skills[j];
						var ability = sd.ab;
						var set     = sd.set;
						this.abilities[set].AddAbility(ability);
					}
				}
			}
		}
	}
	
	/* ENTITY DICT */
	UniqueId = EntityDict.UniqueId;
	
	/* ENTITY DESC */
	PrintDescription = EntityDesc.PrintDescription;
	
	// TODO: affect with lust/perks?
	SubDom() {
		return this.subDom.Get();
	}
	Relation() {
		return this.relation.Get();
	}
	Slut() {
		return this.slut.Get();
	}
	
	Gender() {
		return this.body.Gender();
	}
	Race() {
		return this.body.torso.race;
	}
	
	MuscleTone() {
		return this.body.muscleTone.Get();
	}
	BodyMass() {
		return this.body.bodyMass.Get();
	}
	
	Height() {
		return this.body.height.Get();
	}
	Weigth() {
		return this.body.weigth.Get();
	}
	
	Humanity() {
		var racescore = new RaceScore(this.body);
		var humanScore = new RaceScore();
		humanScore.score[Race.Human.id] = 1;
		return racescore.Compare(humanScore);
	}
	RaceCompare(race : RaceDesc) {
		var racescore = new RaceScore(this.body);
		return racescore.SumScore(race);
	}
	Femininity() {
		return this.body.femininity.Get();
	}
	FaceDesc() {
		return this.body.FaceDesc();
	}
	SkinDesc() {
		return this.body.SkinDesc();
	}
	SkinType() {
		return this.body.torso.race;
	}
	LipsDesc() {
		return this.body.LipsDesc();
	}
	TongueDesc() {
		return this.body.TongueDesc();
	}
	TongueTipDesc() {
		return this.body.TongueTipDesc();
	}
	LongTongue() {
		return this.body.LongTongue();
	}
	Hair() {
		return this.body.head.hair;
	}
	HasHair() {
		return this.body.head.hair.Bald() == false;
	}
	HasLongHair() {
		return this.body.head.hair.Bald() == false; //TODO
	}
	Face() {
		return this.body.head;
	}
	Mouth() {
		return this.body.head.mouth;
	}
	Tongue() {
		return this.body.head.mouth.tongue;
	}
	Eyes() {
		return this.body.head.eyes;
	}
	EyeDesc() {
		return this.body.EyeDesc();
	}
	Ears() {
		return this.body.head.ears;
	}
	EarDesc(plural? : boolean) {
		return this.body.EarDesc(plural);
	}
	HasFlexibleEars() {
		return this.body.HasFlexibleEars();
	}
	HasMuzzle() {
		return this.body.HasMuzzle();
	}
	HasLongSnout() {
		return this.body.HasLongSnout();
	}
	Arms() {
		return this.body.arms;
	}
	MultiArm() {
		return this.body.arms.count > 2;
	}
	Legs() {
		return this.body.legs;
	}
	LowerBodyType() {
		if     (this.body.legs.count <  2) return LowerBodyType.Single;
		else if(this.body.legs.count == 2) return LowerBodyType.Humanoid;
		else                               return LowerBodyType.Taur;
	}
	NumLegs() {
		return this.body.legs.count;
	}
	Humanoid() {
		return this.LowerBodyType() == LowerBodyType.Humanoid;
	}
	HasLegs() {
		return (this.body.legs.count >= 2);
	}
	IsNaga() {
		return (this.body.legs.count < 2) &&
			(this.body.legs.race.isRace(Race.Snake));
	}
	IsTaur() {
		return this.LowerBodyType() == LowerBodyType.Taur;
	}
	IsGoo() {
		return (this.body.legs.race.isRace(Race.Goo));
	}
	IsFlexible() {
		return this.body.IsFlexible(); //TODO Perks
	}
	Butt() {
		return this.body.ass;
	}
	HasBalls() {
		return this.Balls().count.Get() > 0;
	}
	Balls() {
		return this.body.balls;
	}
	BallsDesc() {
		return this.Balls().Short();
	}
	Virility() {
		return this.body.balls.fertility.Get();
	}
	HasFur() {
		return this.body.HasFur();
	}
	HasSkin() {
		return this.body.HasSkin();
	}
	HasScales() {
		return this.body.HasScales();
	}
	
	LactationDesc(parse : any) {
		
	}
	StomachDesc() {
		var bellysize = this.pregHandler.BellySize();
		return this.body.StomachDesc(bellysize);
	}
	HipDesc() {
		return this.body.HipsDesc();
	}
	HipsDesc() {
		return this.body.HipsDesc(true);
	}
	HipSize() {
		return this.body.HipSize();
	}
	// TODO
	ArmDesc() {
		return this.body.ArmDesc();
	}
	HandDesc() {
		return this.body.HandDesc();
	}
	PalmDesc() {
		return this.body.PalmDesc();
	}
	LegDesc() {
		return this.body.LegDesc();
	}
	LegsDesc() {
		return this.body.LegsDesc();
	}
	ThighDesc() {
		return this.body.ThighDesc();
	}
	ThighsDesc() {
		return this.body.ThighsDesc();
	}
	KneeDesc() {
		return this.body.KneesDesc();
	}
	KneesDesc() {
		return this.body.KneesDesc(true);
	}
	FeetDesc() {
		return this.body.FeetDesc();
	}
	FootDesc() {
		return this.body.FootDesc();
	}
	Appendages() {
		return this.body.head.appendages;
	}
	HasNightvision() {
		return this.body.HasNightvision();
	}
	HasHorns() {
		for(var i = 0; i < this.body.head.appendages.length; i++)
			if(this.body.head.appendages[i].type == AppendageType.horn)
				return this.body.head.appendages[i];
		return null;
	}
	HasAntenna() {
		for(var i = 0; i < this.body.head.appendages.length; i++)
			if(this.body.head.appendages[i].type == AppendageType.antenna)
				return this.body.head.appendages[i];
		return null;
	}
	Back() {
		return this.body.backSlots;
	}
	HasTail() {
		for(var i = 0; i < this.body.backSlots.length; i++)
			if(this.body.backSlots[i].type == AppendageType.tail)
				return this.body.backSlots[i];
		return null;
	}
	HasPrehensileTail() {
		var found = false;
		for(var i = 0; i < this.body.backSlots.length; i++)
			if(this.body.backSlots[i].type == AppendageType.tail)
				found = found || this.body.backSlots[i].Prehensile();
		return found;
	}
	HasWings() {
		for(var i = 0; i < this.body.backSlots.length; i++)
			if(this.body.backSlots[i].type == AppendageType.wing)
				return this.body.backSlots[i];
		return null;
	}
	NumAttributes(race : RaceDesc) {
		return this.body.NumAttributes(race);
	}
	
	// TODO
	Weapon() {
		return this.weaponSlot;
	}
	// TODO
	WeaponDesc() {
		return this.weaponSlot ? this.weaponSlot.sDesc() : "stick";
	}
	// TODO
	WeaponDescLong() {
		return this.weaponSlot ? this.weaponSlot.lDesc() : "a stick";
	}
	// TODO
	Armor() {
		return this.topArmorSlot;
	}
	// TODO
	LowerArmor() {
		return this.botArmorSlot;
	}
	// TODO
	LowerArmorDesc() {
		return this.botArmorSlot ? this.botArmorSlot.sDesc() : this.ArmorDesc();
	}
	// TODO
	LowerArmorDescLong() {
		return this.botArmorSlot ? this.botArmorSlot.lDesc() : this.ArmorDescLong();
	}
	// TODO
	ArmorDesc() {
		return this.topArmorSlot ? this.topArmorSlot.sDesc() : "comfortable clothes";
	}
	ArmorDescLong() {
		return this.topArmorSlot ? this.topArmorSlot.lDesc() : "a set of comfortable clothes";
	}
	Accessories() {
		return [this.acc1Slot, this.acc2Slot];
	}
	
	/* ENTITY GRAMMAR */
	
	nameDesc() {
		return this.monsterName || this.name;
	}
	NameDesc() {
		return this.MonsterName || this.name;
	}
	possessive() {
		var name = this.monsterName || this.name || "the entity";
		var letter = name[name.length-1];
		var s = (letter == 's' || letter == 'x') ? "'" : "'s";
		return name + s;
	}
	Possessive() {
		var name = this.MonsterName || this.name || "The entity";
		var letter = name[name.length-1];
		var s = (letter == 's' || letter == 'x') ? "'" : "'s";
		return name + s;
	}
	possessivePlural() {
		var name = this.groupName || this.name || "the entities";
		return name + "'";
	}
	PossessivePlural() {
		var name = this.GroupName || this.name || "The entities";
		return name + "'";
	}
	heshe(forcegender? : Gender) : string {
		var gender = forcegender ? forcegender : this.body.Gender();
		if(gender == Gender.male) return "he";
		else if(gender == Gender.female) return "she";
		else if(gender == Gender.herm) return "she";
		else return "they";
	}
	HeShe(forcegender? : Gender) : string {
		var gender = forcegender ? forcegender : this.body.Gender();
		if(gender == Gender.male) return "He";
		else if(gender == Gender.female) return "She";
		else if(gender == Gender.herm) return "She";
		else return "They";
	}
	himher(forcegender? : Gender) : string {
		var gender = forcegender ? forcegender : this.body.Gender();
		if(gender == Gender.male) return "him";
		else if(gender == Gender.female) return "her";
		else if(gender == Gender.herm) return "her";
		else return "them";
	}
	HimHer(forcegender? : Gender) : string {
		var gender = forcegender ? forcegender : this.body.Gender();
		if(gender == Gender.male) return "Him";
		else if(gender == Gender.female) return "Her";
		else if(gender == Gender.herm) return "Her";
		else return "Them";
	}
	hisher(forcegender? : Gender) : string {
		var gender = forcegender ? forcegender : this.body.Gender();
		if(gender == Gender.male) return "his";
		else if(gender == Gender.female) return "her";
		else if(gender == Gender.herm) return "her";
		else return "their";
	}
	HisHer(forcegender? : Gender) : string {
		var gender = forcegender ? forcegender : this.body.Gender();
		if(gender == Gender.male) return "His";
		else if(gender == Gender.female) return "Her";
		else if(gender == Gender.herm) return "Her";
		else return "Their";
	}
	hishers(forcegender? : Gender) : string {
		var gender = forcegender ? forcegender : this.body.Gender();
		if(gender == Gender.male) return "his";
		else if(gender == Gender.female) return "hers";
		else if(gender == Gender.herm) return "hers";
		else return "theirs";
	}
	has() : string {
		if(this.body.Gender() == Gender.none) return "have";
		return "has";
	}
	is() : string {
		if(this.body.Gender() == Gender.none) return "are";
		return "is";
	}
	plural() {
		return (this.body.Gender() == Gender.none);
	}
	// TODO femininity from other things (breasts etc)
	mfFem(male : any, female : any) {
		return this.body.femininity.Get() > 0 ? female : male;
	}
	mfTrue(male : any, female : any) {
		return (this.body.Gender() == Gender.male) ? male : female;
	}

	ParserPronouns(parse? : any, prefix? : string, postfix? : string, forcegender? : Gender) {
		parse   = parse   || {};
		prefix  = prefix  || "";
		postfix = postfix || "";
		parse[prefix + "HeShe" + postfix]   = this.HeShe(forcegender);
		parse[prefix + "heshe" + postfix]   = this.heshe(forcegender);
		parse[prefix + "HisHer" + postfix]  = this.HisHer(forcegender);
		parse[prefix + "hisher" + postfix]  = this.hisher(forcegender);
		parse[prefix + "HimHer" + postfix]  = this.HimHer(forcegender);
		parse[prefix + "himher" + postfix]  = this.himher(forcegender);
		parse[prefix + "hishers" + postfix] = this.hishers(forcegender);
		return parse;
	}

	ParserTags(parse? : any, prefix? : string, p1cock? : Cock) {
		var ent = this;
		parse  = parse  || {};
		prefix = prefix || "";
		
		p1cock = p1cock || ent.BiggestCock(null, true);
		
		parse[prefix + "cocks"]     = function() { return ent.MultiCockDesc(); }
		parse[prefix + "cock"]      = function() { return p1cock.Short(); }
		parse[prefix + "cockTip"]   = function() { return p1cock.TipShort(); }
		parse[prefix + "knot"]      = function() { return p1cock.KnotShort(); }
		parse[prefix + "balls"]     = function() { return ent.BallsDesc(); }
		parse[prefix + "butt"]      = function() { return ent.Butt().Short(); }
		parse[prefix + "anus"]      = function() { return ent.Butt().AnalShort(); }
		parse[prefix + "vag"]       = function() { return ent.FirstVag() ? ent.FirstVag().Short() : "crotch"; }
		parse[prefix + "clit"]      = function() { return ent.FirstVag().ClitShort(); }
		parse[prefix + "breasts"]   = function() { return ent.FirstBreastRow().Short(); }
		parse[prefix + "nip"]       = function() { return ent.FirstBreastRow().NipShort(); }
		parse[prefix + "nips"]      = function() { return ent.FirstBreastRow().NipsShort(); }
		parse[prefix + "tongue"]    = function() { return ent.TongueDesc(); }
		parse[prefix + "tongueTip"] = function() { return ent.TongueTipDesc(); }
		parse[prefix + "skin"]      = function() { return ent.SkinDesc(); }
		parse[prefix + "hair"]      = function() { return ent.Hair().Short(); }
		parse[prefix + "face"]      = function() { return ent.FaceDesc(); }
		parse[prefix + "ear"]       = function() { return ent.EarDesc(); }
		parse[prefix + "ears"]      = function() { return ent.EarDesc(true); }
		parse[prefix + "eye"]       = function() { return ent.EyeDesc(); }
		parse[prefix + "eyes"]      = function() { return ent.EyeDesc() + "s"; }
		parse[prefix + "hand"]      = function() { return ent.HandDesc(); }
		parse[prefix + "palm"]      = function() { return ent.PalmDesc(); }
		parse[prefix + "hip"]       = function() { return ent.HipDesc(); }
		parse[prefix + "hips"]      = function() { return ent.HipsDesc(); }
		parse[prefix + "thigh"]     = function() { return ent.ThighDesc(); }
		parse[prefix + "thighs"]    = function() { return ent.ThighsDesc(); }
		parse[prefix + "legs"]      = function() { return ent.LegsDesc(); }
		parse[prefix + "leg"]       = function() { return ent.LegDesc(); }
		parse[prefix + "knee"]      = function() { return ent.KneeDesc(); }
		parse[prefix + "knees"]     = function() { return ent.KneesDesc(); }
		parse[prefix + "foot"]      = function() { return ent.FootDesc(); }
		parse[prefix + "feet"]      = function() { return ent.FeetDesc(); }
		parse[prefix + "belly"]     = function() { return ent.StomachDesc(); }
		parse[prefix + "tail"]      = function() { var tail = ent.HasTail(); return tail ? tail.Short() : ""; }
		parse[prefix + "wings"]     = function() { var wings = ent.HasWings(); return wings ? wings.Short() : ""; }
		parse[prefix + "horns"]     = function() { var horns = ent.HasHorns(); return horns ? horns.Short() : ""; }
		
		parse[prefix + "weapon"]    = function() { return ent.WeaponDesc(); }
		parse[prefix + "armor"]     = function() { return ent.ArmorDesc(); }
		parse[prefix + "botarmor"]  = function() { return ent.LowerArmorDesc(); }
		return parse;
	}

	toString() {
		return this.name;
	}

	Appearance() {
		return this.NameDesc()
		+ " is a "
		+ this.body.GenderStr() + " "
		+ this.body.RaceStr() + ".";
	}
	
	/* ENTITY SEX */
	Genitalia() {
		return this.body.gen;
	}

	// TODO: affect with things such as stretch, lust, perks etc
	VagCap() {
		return this.FirstVag().capacity.Get();
	}
	OralCap() {
		return this.Mouth().capacity.Get();
	}
	AnalCap() {
		return this.Butt().capacity.Get();
	}

	ResetVirgin() {
		this.Butt().virgin = true;
		var vags = this.AllVags();
		for(var i = 0; i < vags.length; i++)
			vags[i].virgin = true;
	}

	// Convenience functions, cock
	NumCocks() {
		return this.body.cock.length;
	}
	FirstCock() {
		return this.body.cock[0];
	}
	FirstClitCockIdx() {
		for(var i=0,j=this.body.cock.length; i<j; i++) {
			var c = this.body.cock[i];
			if(c.vag)
				return i;
		}
		return -1;
	}
	BiggestCock(cocks? : Cock[], incStrapon? : boolean) {
		cocks = cocks || this.body.cock;
		var c = cocks[0];
		if(c) {
			var cSize = cocks[0].length.Get() * cocks[0].thickness.Get();
			for(var i=1,j=cocks.length; i<j; i++) {
				var newSize = cocks[i].length.Get() * cocks[i].thickness.Get();
				if(newSize > cSize) {
					cSize = newSize;
					c = cocks[i];
				}
			};
		}
		if(c)
			return c;
		else if(incStrapon && this.strapOn)
			return this.strapOn.cock;
	}
	CocksThatFit(orifice? : Orifice, onlyRealCocks? : boolean, extension? : any) {
		var ret = [];
		for(var i=0,j=this.body.cock.length; i<j; i++) {
			var c = this.body.cock[i];
			if(!orifice || orifice.Fits(c, extension))
				ret.push(c);
		};
		if(ret.length == 0 && !onlyRealCocks && this.strapOn) {
			var c : Cock = this.strapOn.cock;
			if(!orifice || orifice.Fits(c, extension))
				ret.push(c);
		}
		return ret;
	}
	AllCocksCopy() {
		var ret = [];
		for(var i=0,j=this.body.cock.length; i<j; i++) {
			var c = this.body.cock[i];
				ret.push(c);
		};
		return ret;
	}
	AllCocks() {
		return this.body.cock;
	}
	// TODO: Race too
	MultiCockDesc(cocks? : Cock[]) {
		cocks = cocks || this.body.cock;
		if(cocks.length == 0) {
			if(this.strapOn)
				return this.strapOn.cock.Short();
			else
				return "[NO COCKS]";
		}
		else if(cocks.length == 1)
			return cocks[0].Short();
		else
			return Text.Quantify(cocks.length) + " of " + cocks[0].Desc().adj + " " + cocks[0].nounPlural();
	}



	// Convenience functions, vag
	NumVags() {
		return this.body.vagina.length;
	}
	FirstVag() {
		return this.body.vagina[0];
	}
	VagsThatFit(capacity : number) {
		var ret : Vagina[] = [];
		for(var i=0; i<this.body.vagina.length; i++) {
			let vag = this.body.vagina[i];
			var size = vag.capacity.Get();
			if(size >= capacity) {
				ret.push(vag);
			}
		};
		return ret;
	}
	AllVags() {
		return this.body.vagina;
	}
	UnfertilezedWomb() {
		var ret : Womb[] = [];
		for(var i=0,j=this.body.vagina.length; i<j; i++){
			var womb = this.body.vagina[i].womb;
			if(womb.pregnant == false)
				ret.push(womb);
		};
		return ret;
	}


	// Convenience functions, breasts
	NumBreastRows() {
		return this.body.breasts.length;
	}
	FirstBreastRow() {
		return this.body.breasts[0];
	}
	AllBreastRows() {
		return this.body.breasts;
	}
	BiggestBreasts() {
		var breasts = this.body.breasts;
		var c = breasts[0];
		var cSize = breasts[0].Size();
		for(var i=1,j=breasts.length; i<j; i++) {
			var newSize = breasts[i].Size();
			if(newSize > cSize) {
				cSize = newSize;
				c = breasts[i];
			}
		};
		return c;
	}
	SmallestBreasts() {
		var breasts = this.body.breasts;
		var c = breasts[0];
		var cSize = breasts[0].Size();
		for(var i=1,j=breasts.length; i<j; i++) {
			var newSize = breasts[i].Size();
			if(newSize < cSize) {
				cSize = newSize;
				c = breasts[i];
			}
		};
		return c;
	}
	BiggestNips() {
		var breasts = this.body.breasts;
		var c = breasts[0];
		var cSize = breasts[0].NipSize();
		for(var i=1,j=breasts.length; i<j; i++) {
			var newSize = breasts[i].NipSize();
			if(newSize > cSize) {
				cSize = newSize;
				c = breasts[i];
			}
		};
		return c;
	}
	SmallestNips() {
		var breasts = this.body.breasts;
		var c = breasts[0];
		var cSize = breasts[0].NipSize();
		for(var i=1,j=breasts.length; i<j; i++) {
			var newSize = breasts[i].NipSize();
			if(newSize < cSize) {
				cSize = newSize;
				c = breasts[i];
			}
		};
		return c;
	}
	NipplesThatFitLen(capacity : number) {
		var ret = new Array();
		for(var i=0,j=this.body.breasts.length; i<j; i++) {
			var row = this.body.breasts[i];
			if(row.nippleType == NippleType.lipple ||
				row.nippleType == NippleType.cunt) {
				if(row.NipSize() >= capacity)
					ret.push(row);
			}
		};
		return ret;
	}


	AllOrfices(capacity? : number) {
		capacity = capacity || 0;
		var ret = new Array();
		
		let vags = this.VagsThatFit(capacity);
		for(var i=0,j=vags.length; i<j; i++)
			ret.push({type: BodyPartType.vagina, obj: vags[i]});
		var nips = this.NipplesThatFitLen(capacity);
		for(var i=0,j=nips.length; i<j; i++)
			ret.push({type: BodyPartType.nipple, obj: nips[i]});
		if(this.body.ass.capacity.Get() >= capacity)
			ret.push({type: BodyPartType.ass, obj: this.body.ass});
		if(this.body.head.mouth.capacity.Get() >= capacity)
			ret.push({type: BodyPartType.mouth, obj: this.body.head.mouth});
		
		return ret;
	}

	AllPenetrators(orifice : Orifice) {
		var ret = new Array();
		
		var cocks = this.CocksThatFit(orifice);
		for(var i=0,j=cocks.length; i<j; i++)
			ret.push({type: BodyPartType.cock, obj: cocks[i]});
		// TODO: Tongue, Nipple-cock, Clitcock
		
		return ret;
	}


	Fuck(cock : Cock, expMult? : number) {
		expMult = expMult || 1;
		this.AddSexExp(expMult);
		// TODO: Stretch
	}

	// Fuck entitys mouth (vag, cock)
	FuckOral(mouth : any, cock : Cock, expMult? : number) {
		expMult = expMult || 1;
		this.AddSexExp(expMult);
		// TODO: Stretch
	}

	// Fuck entitys anus (anus, cock)
	FuckAnal(butt : Butt, cock? : Cock, expMult? : number) {
		var parse : any = {
			name   : this.NameDesc(),
			has    : this.has(),
			hisher : this.hisher()
		};
		expMult = expMult || 1;
		if(butt.virgin) {
			butt.virgin = false;
			Text.Add("<b>[name] [has] lost [hisher] anal virginity.</b>", parse);
			Text.NL();
			this.AddSexExp(5 * expMult);
		}
		else
			this.AddSexExp(expMult);
		
		if(cock) {
			butt.StretchOrifice(this, cock, false);
		}
		Text.Flush();
	}

	// Fuck entitys vagina (vag, cock)
	FuckVag(vag : Vagina, cock? : Cock, expMult? : number) {
		var parse : any = {
			name   : this.NameDesc(),
			has    : this.has(),
			hisher : this.hisher()
		};
		expMult = expMult || 1;
		if(vag.virgin) {
			vag.virgin = false;
			Text.Add("<b>[name] [has] lost [hisher] virginity.</b>", parse);
			Text.NL();
			this.AddSexExp(5 * expMult);
		}
		else
			this.AddSexExp(expMult);
		
		if(cock) {
			vag.StretchOrifice(this, cock, false);
		}
		Text.Flush();
	}

	Sexed() {
		if(this.flags["Sexed"] && this.flags["Sexed"] != 0)
			return true;
		for(var flag in this.sex)
			if(this.sex[flag] != 0)
				return true;
		return false;
	}

	RestoreCum(quantity? : number) {
		quantity = quantity || 1;
		var balls = this.Balls();
		return balls.cum.IncreaseStat(balls.CumCap(), quantity);
	}
	// TODO
	Cum() {
		return this.Balls().cum.Get();
	}
	CumOutput(mult? : number) {
		mult = mult || 1;
		var balls = this.Balls();
		var cum = mult * balls.CumCap() / 4;
		cum *= this.LustLevel() + 0.5;
		
		cum = Math.min(cum, this.Cum());
		return cum;
	}
	// TODO test
	OrgasmCum(mult? : number) {
		mult = mult || 1;
		var balls = this.Balls();
		var cumQ  = this.CumOutput(mult);
		
		this.AddLustFraction(-1);
		
		balls.cum.DecreaseStat(0, cumQ);
		if(GetDEBUG()) {
			Text.NL();
			Text.Add("<b>[name] came ([cum]).</b>", {name: this.NameDesc(), cum: cumQ.toFixed(2)});
			Text.NL();
			Text.Flush();
		}
		return cumQ;
	}
	Lactation() {
		return this.lactHandler.Lactation();
	}
	Milk() {
		return this.lactHandler.milk.Get();
	}
	MilkCap() {
		return this.lactHandler.MilkCap();
	}
	LactationProgress(oldMilk : number, newMilk : number, lactationRate : number) {
		//Placeholder, implement in each entity if applicable
	}
}
