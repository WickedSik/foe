import * as _ from 'lodash';

import { BodyPart } from './bodypart';
import { Stat } from '../stat';
import { Gender } from './gender';
import { RaceDesc, Race } from './race';
import { Color } from './color';
import { Vagina } from './vagina';

export enum CockType {
	ordinary   = 0,
//	clitcock   = 1,
	tentacle   = 2,
	ovipositor = 3,
};

export class Cock extends BodyPart {
	thickness : Stat;
	length : Stat;
	type : CockType;
	vag : Vagina;
	knot : number;
	isStrapon : boolean;

	constructor(race? : RaceDesc, color? : Color) {
		super(race, color);
		this.thickness = new Stat(3);
		this.length    = new Stat(12);
		this.type      = CockType.ordinary;
		this.vag       = null; // For clitcock
		this.knot      = 0;
		this.isStrapon = false;
	}

	ToStorage(full : boolean) {
		var storage : any = {
			len    : this.length.base.toFixed(2),
			thk    : this.thickness.base.toFixed(2)
		};
		if(full) {
			storage.race = this.race.id.toFixed();
			storage.col  = this.color.toFixed();
			if(this.type != CockType.ordinary) storage.type = this.type.toFixed();
			if(this.knot != 0) storage.knot = this.knot.toFixed();
		}
		return storage;
	}

	FromStorage(storage : any) {
		storage = storage || {};
		this.race           = RaceDesc.IdToRace[parseInt(storage.race)] || this.race;
		this.color          = parseInt(storage.col)    || this.color;
		this.type           = parseInt(storage.type)   || this.type;
		this.length.base    = parseFloat(storage.len)  || this.length.base;
		this.thickness.base = parseFloat(storage.thk)  || this.thickness.base;
		this.knot           = parseInt(storage.knot)   || this.knot;
	}

	Clone() {
		var cock            = new Cock(this.race, this.color);
		cock.thickness.base = this.thickness.base;
		cock.length.base    = this.length.base;
		cock.knot           = this.knot;
		return cock;
	}

	Len() {
		return this.length.Get();
	}
	Thickness() {
		return this.thickness.Get();
	}
	Size() {
		return this.thickness.Get() * this.length.Get();
	}
	Volume() {
		var r = this.thickness.Get() / 2;
		return Math.PI * r * r * this.length.Get();
	}
	Knot() {
		return this.knot != 0;
	}
	Sheath() {
		return this.race.isRace(
			Race.Horse,
			Race.Cow,
			Race.Sheep,
			Race.Goat,
			Race.Feline,
			Race.Canine,
			Race.Musteline,
			Race.Rabbit);
	}
	Strapon() {
		return this.isStrapon;
	}

	noun() {
		var noun = [];
		if(this.vag) {
			noun.push("clit-cock");
			noun.push("girl-cock");
		}
		if(this.type == CockType.tentacle) {
			noun.push("tentacle");
			noun.push("tentacle-cock");
		}
		else if(this.type == CockType.ovipositor) {
			noun.push("ovipositor");
			noun.push("egg-layer");
		}
		else {
			noun.push("cock");
			noun.push("dick");
			noun.push("manhood");
			noun.push("member");
			noun.push("slab of meat");
			noun.push("penis");
			noun.push("phallus");
			noun.push("prick");
			noun.push("rod");
			noun.push("shaft");
			noun.push("dong");	
		}
		return _.sample(noun);
	}
	nounPlural() {
		var noun = [];
		noun.push("cocks");
		noun.push("dicks");
		noun.push("manhoods");
		noun.push("members");
		noun.push("slabs of meat");
		noun.push("penises");
		noun.push("phalluses");
		noun.push("pricks");
		noun.push("rods");
		noun.push("shafts");
		noun.push("dongs");
		return _.sample(noun);
	}
	Desc() {
		var ret : any;
		var cockArea = this.thickness.Get() * this.length.Get();
		if     (cockArea <= 10 ) ret = _.sample([{a:"a", adj: "tiny"}, {a:"a", adj: "pathetic"}, {a:"a", adj: "micro"}, {a:"an", adj: "undersized"}]);
		else if(cockArea <= 20 ) ret = _.sample([{a:"a", adj: "small"}, {a:"a", adj: "petite"}]);
		else if(cockArea <= 30 ) ret = _.sample([{a:"a", adj: "below average"}, {a:"a", adj: "modest"}]);
		else if(cockArea <= 40 ) ret = _.sample([{a:"a", adj: "well-proportioned"}, {a:"an", adj: "average"}]);
		else if(cockArea <= 50 ) ret = _.sample([{a:"a", adj: "strapping"}, {a:"a", adj: "respectable"}, {a:"an", adj: "ample"}]);
		else if(cockArea <= 70 ) ret = _.sample([{a:"a", adj: "big"}]);
		else if(cockArea <= 90 ) ret = _.sample([{a:"a", adj: "large"}, {a:"a", adj: "sizable"}]);
		else if(cockArea <= 120) ret = _.sample([{a:"a", adj: "huge"}, {a:"a", adj: "hefty"}]);
		else if(cockArea <= 200) ret = _.sample([{a:"an", adj: "enormous"}, {a:"a", adj: "massive"}, {a:"a", adj: "humongous"}]);
		else if(cockArea <= 400) ret = _.sample([{a:"an", adj: "immense"}, {a:"a", adj: "colossal"}, {a:"a", adj: "mammoth"}]);
		else if(cockArea <= 800) ret = _.sample([{a:"a", adj: "gargantuan"}, {a:"a", adj: "gigantic"}, {a:"a", adj: "monster sized"}]);
		else                     ret = _.sample([{a:"a", adj: "titanic"}, {a:"a", adj: "vast"}]);
		
		ret.len = this.length.Get() / 2 + " inches";
		ret.thickness = this.thickness.Get() / 2 + " inches";
		
		return ret;
	}
	Short() {
		var desc = this.Desc();
		var noun = this.noun();
		var adj = (Math.random() < 0.5) ? desc.adj : "";
		var knotted = "";
		if(this.Knot() && (Math.random() < 0.5)) {
			if(adj) knotted += ", ";
			knotted += "knotted";
		}
		var sheath = "";
		if(this.Sheath() && (Math.random() < 0.5)) {
			if(adj || knotted) sheath += ", ";
			sheath += "sheathed";
		}
		var race = "";
		if((this.race != Race.Human) && (Math.random() < 0.5)) race += " " + this.race.Short(Gender.male);
		var ret = adj + knotted + sheath + race;
		if(ret) ret += " ";
		return ret + noun;
	}
	// TODO
	TipShort() {
		var adj = "";
		
		if(this.race.isRace(Race.Horse)) adj = "flared ";
		else if(this.race.isRace(Race.Canine, Race.Reptile)) adj = "tapered ";
		else if(this.race.isRace(Race.Feline)) adj = "barbed ";
		
		var nouns = [
		"tip",
		"head"
		];
		var noun = _.sample(nouns);
		
		return adj + noun;
	}
	// TODO (knot size?)
	KnotShort() {
		return "knot";
	}
	// TODO: Better descriptions
	aLong() {
		var desc    = this.Desc();
		var noun    = this.noun();
		var knotted = this.Knot() ? ", knotted" : "";
		var sheath  = this.Sheath() ? ", sheathed" : "";
		var race = "";
		if(this.race != Race.Human) {
			race += " " + this.race.Short(Gender.male);
		}
		return desc.a + " " + desc.adj + knotted + sheath + race + " " + noun + ", " + desc.len + " long and " + desc.thickness + " thick";
	}
	// TODO: Better descriptions
	Long() {
		var desc    = this.Desc();
		var noun    = this.noun();
		var knotted = this.Knot() ? ", knotted" : "";
		var sheath  = this.Sheath() ? ", sheathed" : "";
		return desc.adj + knotted + sheath + " " + this.race.Short(Gender.male) + " " + this.noun() + ", " + desc.len + " long and " + desc.thickness + " thick";
	}

}