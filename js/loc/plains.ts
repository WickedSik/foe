/*
 * 
 * Plains area that can be explored (starting area?)
 * 
 */

import { Event, Link } from '../event';
import { EncounterTable } from '../encountertable';
import { NomadsLoc } from './nomads';
import { BurrowsLoc } from './burrows-scenes';
import { WorldTime, MoveToLocation, WORLD, GAME, TimeStep } from '../GAME';
import { Season } from '../time';
import { Text } from '../text';
import { Gui } from '../gui';
import { OutlawsFlags } from '../event/outlaws/outlaws-flags';
import { GlobalScenes } from '../event/global';
import { FelinesScenes } from '../enemy/feline';
import { LagomorphScenes } from '../enemy/rabbit';
import { MomoScenes } from '../event/momo';
import { EquineScenes } from '../enemy/equine';
import { PoetScenes } from '../event/poet';
import { RoamingScenes } from '../event/roaming';
import { PortalOpeningScenes } from '../event/portalopening';
import { MirandaScenes } from '../event/miranda-scenes';
import { OutlawsScenes } from '../event/outlaws/outlaws';
import { FarmScenesIntro } from './farm-scenes';
import { DryadGladeFlags } from './glade-flags';
import { BurrowsFlags } from './burrows-flags';

// Create namespace
let PlainsLoc = {
	Nomads         : NomadsLoc,
	Crossroads     : new Event("Plains: Crossroads"),
	Portals        : new Event(function() {
		return GlobalScenes.PortalsOpen() ? "Plains: Nexus" : "Plains: Mound";
	}),
	Gate           : new Event("Rigard gates"),
};


//
// Crossroads
//
PlainsLoc.Crossroads.description = function() {
	var parse = {
		TreeFar : WORLD().TreeFarDesc(),
		Rigard : GAME().rigard.Visited() ? "Rigard" : "a big city in the distance"
	};
	
	Text.Clear();
	Text.Add("The rolling plains go on for miles and miles around you, the occasional farm or homestead breaking the monotonous flatlands. You are standing on an intersection of several major roads leading off into the distance. The main thoroughfare leads to [Rigard] in one direction, and up into a rougher, hillier country in the other, snowy mountains reaching for the sky far away.", parse);
	Text.NL();
	Text.Add("Crossing this path is a smaller, less travelled one, leading from the deep forest into a dry wasteland in the other direction. [TreeFar]", parse);
	Text.NL();
	Text.Add("Nearby, there is a low hill with some strange standing stones on it. ", parse);
	if(GlobalScenes.PortalsOpen())
		Text.Add("The gem glows in the presence of the nearby portals, inexplicably drawn to them. ", parse);
	else if(GAME().jeanne.flags["Met"] != 0)
		Text.Add("This is probably the place that Jeanne was talking about. ", parse);
	Text.Add("The Nomad camp where you first arrived on Eden lies on the horizon, one beacon of familiarity in this strange land.", parse);
}

PlainsLoc.Crossroads.enc = new EncounterTable();

PlainsLoc.Crossroads.AddEncounter({
	nameStr : "Wildcat",
	func    : function() {
		return FelinesScenes.WildcatEnc();
	}, odds : 0.25, enc : true,
	visible : true, enabled : true, hunt : true
});

PlainsLoc.Crossroads.AddEncounter({
	nameStr : "Puma",
	func    : function() {
		return FelinesScenes.PumaEnc();
	}, odds : 0.25, enc : true,
	visible : true, enabled : true, hunt : true
});

PlainsLoc.Crossroads.AddEncounter({
	nameStr : "Jaguar",
	func    : function() {
		return FelinesScenes.JaguarEnc();
	}, odds : 0.25, enc : true,
	visible : true, enabled : true, hunt : true
});

PlainsLoc.Crossroads.AddEncounter({
	nameStr : "Lynx",
	func    : function() {
		return FelinesScenes.LynxEnc();
	}, odds : 0.25, enc : true,
	visible : true, enabled : true, hunt : true
});

PlainsLoc.Crossroads.AddEncounter({
	nameStr : "Equines",
	func    : function() {
		return EquineScenes.PairEnc();
	}, odds : 1.0, enc : true,
	visible : true, enabled : true, hunt : true
});

PlainsLoc.Crossroads.AddEncounter({
	nameStr : "Bunnies",
	func    : function() {
		return LagomorphScenes.GroupEnc();
	}, odds : 1.0, enc : true,
	visible : true, enabled : true, hunt : true
});

PlainsLoc.Crossroads.enc.AddEnc(function() {
	return MomoScenes.MomoEnc;
}, 1.0, function() { return GAME().momo.Wandering(); });

PlainsLoc.Crossroads.enc.AddEnc(function() {
	return PoetScenes.Entry;
}, 1.0, function() { return true; });

PlainsLoc.Crossroads.enc.AddEnc(function() {
	return RoamingScenes.FindSomeCoins;
}, 0.5, function() { return true; });

PlainsLoc.Crossroads.enc.AddEnc(function() {
	return RoamingScenes.FlowerPetal;
}, 1.0, function() { return WorldTime().season != Season.Winter; });

PlainsLoc.Crossroads.enc.AddEnc(function() {
	return RoamingScenes.KingdomPatrol;
}, 1.0, function() { return true; });
PlainsLoc.Crossroads.enc.AddEnc(function() {
	return RoamingScenes.Bandits;
}, 5.0, function() { return GAME().rigard.bandits; });

PlainsLoc.Crossroads.enc.AddEnc(function() {
	return function() {
		let player = GAME().player;
		let party = GAME().party;
		let kiakai = GAME().kiakai;

		var parse = {
			playername : player.name,
			name : kiakai.name
		};
		
		Text.Clear();
		Text.Add("A man carrying a sizable knapsack is plodding along the road ahead of you, and as you catch up with him, you feel curious enough to strike up a conversation. You ask where he’s going and why he looks so dejected.", parse);
		Text.NL();
		Text.Add("<i>“The same answer’ll serve for both,”</i> he replies, <i>“there ain’t no work to be had here. I heard they’re doing better ‘round Rirvale, so I’m hopin’ they can make use of me.”</i> He does look quite skinny, though there is yet wiry muscle on his bones.", parse);
		Text.NL();
		Text.Add("<i>“I been many things, y’know. Carpenter, mason, farmer, cobbler… you name it, I’ve done it,”</i> he says, a hint of pride enlivening his voice. <i>“Even been a tramp before, though things didn’t look this bad back then.”</i>", parse);
		Text.Flush();
		
		//[Coins][Luck]
		var options = new Array();
		options.push({ nameStr : "Coins",
			func : function() {
				Text.Clear();
				Text.Add("You dig into your purse and pass the man five coins, telling him that you hope these will help keep him fed until he reaches his destination.", parse);
				Text.NL();
				Text.Add("He looks at you for a moment before taking the money from your hand. <i>“Any other day, I’d tell you I’m a tramp, not a beggar, but you got me this time. I’d swallowed my pride a good week ago, and ‘tis been all but digested. With this to get somethin’ more in my stomach, I might even make it.”</i> He nods at you, only slightly inclining his head, digested pride or no. <i>“Thank ye kindly, stranger.”</i>", parse);
				Text.NL();
				Text.Add("You exchange a few more words, wishing him fortune in his search, before proceeding on the road ahead of him.", parse);
				if(party.InParty(kiakai)) {
					Text.NL();
					Text.Add("<i>“That was well done, [playername],”</i> [name] says. <i>“It is good that we were able to help this poor soul. I am sure that Lady Aria will show him mercy and he will yet find his way to prosperity.”</i>", parse);
					kiakai.relation.IncreaseStat(100, 1);
				}
				Text.Flush();
				party.coin -= 5;
				Gui.NextPrompt();
			}, enabled : party.coin >= 5,
			tooltip : "Give the man five coins to help him on his way."
		});
		options.push({ nameStr : "Luck",
			func : function() {
				Text.Clear();
				Text.Add("You sympathize with the man, but you don’t have any resources you can spare just now.", parse);
				Text.NL();
				Text.Add("After exchanging a few more words, you say your goodbyes, and continue on your way.", parse);
				if(party.InParty(kiakai)) {
					Text.NL();
					Text.Add("<i>“I understand we have higher priorities right now, [playername],”</i> [name] says, <i>“but I do wish we could have helped that poor man.”</i>", parse);
				}
				Text.Flush();
				Gui.NextPrompt();
			}, enabled : true,
			tooltip : "Wish the man luck and leave it at that."
		});
		Gui.SetButtonsFromList(options, false, null);
	}
}, 0.5, function() { return WorldTime().hour >= 5 && WorldTime().hour < 21; });

PlainsLoc.Crossroads.links.push(new Link(
	"Nomads", true, true,
	null,
	function() {
		MoveToLocation(PlainsLoc.Nomads.Fireplace, {minute: 15});
	}
));
PlainsLoc.Crossroads.links.push(new Link(
	function() { return GlobalScenes.PortalsOpen() ? "Nexus" : "Mound"; }, true, true,
	null,
	function() {
		MoveToLocation(PlainsLoc.Portals, {minute: 10});
	}
));
PlainsLoc.Crossroads.links.push(new Link(
	"Rigard", true, true,
	null,
	function() {
		let miranda = GAME().miranda;
		let rigard = GAME().rigard;

		if(miranda.flags["Met"] != 0 && Math.random() < 0.1) {
			Text.Clear();
			var parse = {};
			Text.Add("As you make your way, a farmers’ wagon catches up to you from behind. ", parse);
			var scenes = new EncounterTable();
			scenes.AddEnc(function() {
				Text.Add("The friendly couple offers you a ride in the back, and you get to watch the man groping his companion the whole way, while she returns occasional strokes of his trouser leg. Once in a while, you notice them alternatively smirking and blushing in your direction.", parse);
			}, 1.0, function() { return true; });
			scenes.AddEnc(function() {
				Text.Add("The two elderly men greet you, and offer you a lift to town, which you graciously accept. Along the way you get to hear all about the state of their crops, the prospects for a cold winter, and the lives of their adopted children.", parse);
			}, 1.0, function() { return true; });
			
			scenes.Get();
			Text.NL();
			Text.Add("You reach Rigard quite quickly and they drop you off on the road leading up to the gate.", parse);
			if(rigard.Access())
				Text.Add(" Where were they when you were trying to get you into the city? They could’ve probably saved you a lot of bother then.", parse);
			Text.Flush();
			
			Gui.NextPrompt(function() {
				MoveToLocation(PlainsLoc.Gate, {minute: 30});
			});
		}
		else
			MoveToLocation(PlainsLoc.Gate, {hour: 2});
	}
));
PlainsLoc.Crossroads.links.push(new Link(
	"Hills", true, true,
	null,
	function() {
		MoveToLocation(WORLD().loc.Highlands.Hills, {hour: 2});
	}
));
PlainsLoc.Crossroads.links.push(new Link(
	"Forest", true, true,
	null,
	function() {
		MoveToLocation(WORLD().loc.Forest.Outskirts, {hour: 2});
	}
));
PlainsLoc.Crossroads.links.push(new Link(
	"Desert", true, true,
	null,
	function() {
		MoveToLocation(WORLD().loc.Desert.Drylands, {hour: 2});
	}
));
PlainsLoc.Crossroads.links.push(new Link(
	"Burrows", function() { return GAME().burrows.flags["Access"] != BurrowsFlags.AccessFlags.Unknown; }, true,
	function() {
		if(GAME().burrows.flags["Access"] != BurrowsFlags.AccessFlags.Unknown) {
			Text.NL();
			Text.Add("You know how to find the Burrows, should you want to.");
		}
	},
	function() {
		MoveToLocation(BurrowsLoc.Entrance, {minute: 30});
	}
));


// Add initial event, only trigger 7-17
PlainsLoc.Crossroads.enc.AddEnc(function() {
	return FarmScenesIntro.Start;
}, 3.0, function() { return GlobalScenes.VisitedRigardGates() && !GAME().farm.Found() && (WorldTime().hour >= 7 && WorldTime().hour < 17); });

PlainsLoc.Crossroads.links.push(new Link(
	"Farm",
	function() { return GAME().farm.Found(); },
	true,
	null,
	function() {
		MoveToLocation(WORLD().loc.Farm.Fields, {minute: 30});
	}
));

//
// Mound
//

PlainsLoc.Portals.description = function() {
	var parse = {};
	
	Text.Add("Located near the crossroads at the center of the great plains lies a lone hill, visible for miles around. ", parse);
	if(GlobalScenes.PortalsOpen())
		Text.Add("You are standing at its apex, near the portal stones. Each one is taller than two men in height and covered in intricate magical runes glowing brightly. There is an eerie hum in the air, and the gemstone in your pocket pulses in time with your heartbeat. From here, you can reach out and open portals to other realms.", parse);
	else {
		Text.Add("You are standing at its apex, studying the strange stone obelisks standing in a large circle. Each one taller than two men in height, the black slates are covered in intricate magical runes, a few of them glowing faintly. There is an eerie feeling in the air around them.", parse);
		Text.NL();
		if(GAME().glade.flags["Visit"] >= DryadGladeFlags.Visit.DefeatedOrchid) {
			Text.Add("Not far from the strange stone pillars you can see Jeanne standing near a small tent, working on some form of magical device powered by a set of crystals.", parse);
			if(!WorldTime().IsDay())
				Text.Add(" She’s set up some torches to light her way, and that together with the glowing runes gives you just enough illumination to see.", parse);
		}
		else
			Text.Add("The area is deserted. Even though it’s so close to one of the major intersections on this vast plain, few travelers wish to linger near this place.", parse);
	}
}
PlainsLoc.Portals.links.push(new Link(
	"Crossroads", true, true,
	null,
	function() {
		MoveToLocation(PlainsLoc.Crossroads, {minute: 10});
	}
));

PlainsLoc.Portals.events.push(new Link(
	"Jeanne", function() {
		return !GlobalScenes.PortalsOpen() && GAME().glade.flags["Visit"] >= DryadGladeFlags.Visit.DefeatedOrchid;
	}, true,
	null,
	function() {
		PortalOpeningScenes.Intro();
	}
));

//
// Gate house
//

PlainsLoc.Gate.onEntry = function() {
	if(GAME().miranda.flags["Met"] == 0)
		MirandaScenes.WelcomeToRigard();
	else
		Gui.PrintDefaultOptions();
}
PlainsLoc.Gate.description = function() {
	let miranda = GAME().miranda;

	Text.Add("You are standing on a split in the road leading from the great plains to the city of Rigard. Just up ahead you can see the gates of the great city, and the castle towering above a river flowing beside the town. ");
	if(miranda.IsAtLocation())
		MirandaScenes.RigardGatesDesc();
	else {
		Text.Add("There is a guard you don’t know stationed at the gates. He greets you with a bored look on his face.");
		Text.NL();
	}
	
	// Town reaction if been there before
	
	// Town events
	
	Text.Add("The walls have been unable to contain the city’s growth, and there is a large, sprawling slum spreading out by the riverside. Further downstream, the river leads to a large lake at the very edge of Eden, presumably launching its waters into the great void below.");
	Text.NL();
	Text.Add("The other path goes around the city, leading into the plains beyond, threading close to the vast forest. [TreeFar]", {TreeFar: WORLD().TreeFarDesc()});
	Text.NL();
}
PlainsLoc.Gate.links.push(new Link(
	"Crossroads", true, true,
	null,
	function() {
		MoveToLocation(PlainsLoc.Crossroads, {hour: 2});
	}
));
PlainsLoc.Gate.links.push(new Link(
	"Rigard", true, true,
	null,
	function() {
		let miranda = GAME().miranda;
		let rigard = GAME().rigard;

		Text.Clear();
		if(miranda.IsAtLocation()) {
			MirandaScenes.RigardGatesEnter();
		}
		else {
			if(!rigard.GatesOpen()) {
				Text.Add("The guard explains to you that no-one enters or leaves the city during the night hours. You try to argue for a bit, but they are quite adamant. The open hours are between eight and five in the evening.");
				Text.NL();
			}
			else if(rigard.Visa()) {
				if(Math.random() < 0.1) {
					Text.Add("The guard holds you up for way longer than necessary, checking your papers and asking questions as to your purpose in the city. By the time you’re done, your head feels like mush from the continuous barrage of repetitive questioning. Finally, you are allowed inside the city.");
					TimeStep({hour:2});
				}
				else
					Text.Add("You show your visa to the guard, who nods and waves you through.");
				Text.Flush();
				Gui.NextPrompt(function() {
					MoveToLocation(WORLD().loc.Rigard.Gate, {minute: 5});
				});
				return;
			}
			else {
				Text.Add("The guard explains that you need a pass to enter the city. When you confront them with how you are supposed to get one if the only way is to apply for one within the city, they just shrug.");
				Text.NL();
			}
			Text.Flush();
			Gui.PrintDefaultOptions(true);
		}
	}
));
PlainsLoc.Gate.links.push(new Link(
	"Slums", true, true,
	null,
	function() {
		MoveToLocation(WORLD().loc.Rigard.Slums.gate, {minute: 15});
	}
));
PlainsLoc.Gate.links.push(new Link(
	"King's road", true, true,
	null,
	function() {
		MoveToLocation(WORLD().loc.KingsRoad.Road, {hour: 1});
	}
));
PlainsLoc.Gate.events.push(new Link(
	"Miranda", function() { return GAME().miranda.IsAtLocation(); }, true,
	null,
	function() {
		MirandaScenes.RigardGatesInteract();
	}
));
PlainsLoc.Gate.events.push(new Link(
	"Letter", function() {
		return GAME().outlaws.flags["Met"] == OutlawsFlags.Met.Letter;
	}, function() {
		return WorldTime().hour >= 10 && WorldTime().hour < 14;
	},
	function() {
		if(GAME().outlaws.flags["Met"] == OutlawsFlags.Met.Letter) {
			Text.NL();
			Text.Add("Zenith has asked you to deliver a letter to a contact at the Spitting Lion Inn at noon. It should be somewhere in the area.", null, 'bold');
		}
	},
	function() {
		OutlawsScenes.PathIntoRigardBelinda();
	}
));

export { PlainsLoc };
