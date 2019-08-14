/*
 * 
 * Define Zina
 * 
 */
import { Entity } from '../entity';
import { AppendageType } from '../body/appendage';
import { Race } from '../body/race';
import { Color } from '../body/color';
import { TF } from '../tf';
import { GAME } from '../GAME';

let ZinaScenes = {};

export class Zina extends Entity {
	constructor(storage? : any) {
		super();

		this.ID = "zina";
		
		// Character stats
		this.name = "Zina";
		
		//TODO
		//this.avatar.combat = Images.zina;
		
		//TODO
		this.maxHp.base        = 140;
		this.maxSp.base        = 30;
		this.maxLust.base      = 50;
		// Main stats
		this.strength.base     = 20;
		this.stamina.base      = 24;
		this.dexterity.base    = 19;
		this.intelligence.base = 16;
		this.spirit.base       = 15;
		this.libido.base       = 20;
		this.charisma.base     = 20;
		
		this.level = 3;
		this.sexlevel = 2;
		this.SetExpToLevel();
		
		this.body.DefHerm(true);
		this.FirstBreastRow().size.base = 5;
		this.Butt().buttSize.base = 5;
		this.FirstCock().thickness.base = 4;
		this.FirstCock().length.base    = 18;
		this.Balls().size.base = 2;
		this.Balls().cumProduction.base = 2;
		this.body.SetRace(Race.Hyena);
		this.body.SetBodyColor(Color.brown);
		this.body.SetEyeColor(Color.brown);
		
		TF.SetAppendage(this.Back(), AppendageType.tail, Race.Hyena, Color.brown);
		
		this.Butt().virgin = false;
		
		this.SetLevelBonus();
		this.RestFull();

		this.flags["Met"] = 0;

		if(storage) this.FromStorage(storage);
	}
	
	//TODO save/load combat stats/preg/etc
	FromStorage(storage : any) {
		this.LoadPersonalityStats(storage);
		
		// Load flags
		this.LoadFlags(storage);
	}

	ToStorage() {
		var storage = {};
		
		this.SavePersonalityStats(storage);
		
		this.SaveFlags(storage);
		
		return storage;
	}

	// Flags
	Met() {
		return this.flags["Met"] & ZinaFlags.Met.Met;
	}

	Recruited() {
		return false; //TODO
	}
	
	// Schedule
	IsAtLocation(location? : any) {
		location = location || GAME().party.location;
		return true;
	}
}

let ZinaFlags = {
	Met : { //Bitmask
		Met  : 1,
		BJ   : 2,
		Cunn : 4
	},
};

export { ZinaScenes, ZinaFlags };