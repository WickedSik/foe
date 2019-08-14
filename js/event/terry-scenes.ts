import * as _ from 'lodash';

import { Gender } from "../body/gender";
import { GAME, TimeStep, NAV, WORLD } from "../GAME";
import { Text } from "../text";
import { TerryFlags } from "./terry-flags";
import { Party } from "../party";
import { Gui } from "../gui";
import { MirandaFlags } from "./miranda-flags";
import { Encounter } from "../combat";
import { SetGameState, GameState } from "../gamestate";
import { EncounterTable } from "../encountertable";
import { RigardFlags } from "../loc/rigard/rigard-flags";
import { Images } from "../assets";
import { ArmorItems } from "../items/armor";
import { LowerBodyType } from "../body/body";
import { JeanneScenes } from "./royals/jeanne-scenes";
import { AlchemyItems } from "../items/alchemy";
import { TFItem } from "../tf";
import { StrapOnItems } from "../items/strapon";
import { PregnancyHandler } from "../pregnancy";
import { Race } from "../body/race";
import { Entity } from "../entity";
import { Sex } from "../entity-sex";
import { Cock } from "../body/cock";
import { Item } from "../item";
import { ToysItems } from "../items/toys";
import { Perks } from "../perks";
import { Capacity } from "../body/orifice";

let TerryScenes : any = {};

TerryScenes.JeanneTFCost = function() {
    return 50;
}

TerryScenes.Appearance = function() {
	let terry = GAME().terry;

	var parse : any = {
		foxvixen : terry.mfPronoun("fox", "vixen"),
		HeShe   : terry.HeShe(),
		heshe   : terry.heshe(),
		HisHer  : terry.HisHer(),
		hisher  : terry.hisher(),
		himher  : terry.himher(),
		hishers : terry.hishers(),
		trueGender : Gender.Desc(terry.Gender()),
		tbreastDesc : function() { return terry.FirstBreastRow().Short(); },
		tcockDesc : function() { return terry.MultiCockDesc(); }
	};
	
	Text.Clear();
	Text.Add("You take a closer look at Terry.", parse);
	Text.NL();
	Text.Add("Terry is a [trueGender] fox-morph, a former thief that you 'rescued' from the jail in Rigard.", parse);
	if(terry.Gender() == Gender.male && terry.PronounGender() != Gender.male)
		Text.Add(" Though he’s really a male, you chose to refer to him as a 'she'.", parse);
	else if(terry.Gender() == Gender.female && terry.PronounGender() != Gender.female)
		Text.Add(" Though she’s really a female, you chose to refer to her as a 'he'.", parse);
	Text.NL();
	Text.Add("Terry’s vulpine features are unquestionably feminine; ", parse);
	if(terry.Gender() == Gender.male)
		Text.Add("despite [hisher] birth gender, [heshe] can easily pass as a very fetching young fox-woman with only a little effort on [hisher] part.", parse);
	else
		Text.Add("which is only fitting, seeing as how [heshe]’s a very lovely [foxvixen] [trueGender].", parse);
	Text.Add(" Two small, delicate vulpine ears sit atop [hisher] head, practically swallowed by a lush mane of crimson fur. Well-groomed and clean, Terry doesn’t style [hisher] hair much beyond making a rough effort to tie it back into a ponytail. A prominent forelock drapes [hisher] face, falling almost down onto [hisher] dainty little black nose. Beautiful ocean-blue eyes stare out from amidst the hair, always surveying [hisher] surroundings.", parse);
	Text.NL();
	if(terry.Relation() < 30)
		Text.Add("Once [heshe] realizes you’re checking [himher] out, Terry immediately looks away with an indignant huff. Seems like [heshe]’s not too comfortable with your inspection.", parse);
	else if(terry.Relation() < 60)
		Text.Add("Terry grins nervously, once [heshe] realizes you’re checking [himher] out. Aside from [hisher] apparent nervousness, [heshe] makes no move to block your view.", parse);
	else
		Text.Add("The [foxvixen]’s eyes dart toward you and as your gaze meets [hishers], [heshe] smiles. Terry adjusts [hisher] hair a bit and straightens [hisher] posture as [heshe] stretches languidly, giving you a perfect, unobstructed view of [himher]self.", parse);
	Text.NL();
	Text.Add("Despite the crimson mane atop the [foxvixen]’s head, the rest of [hisher] fur is a very different color; golden yellow offsetting white. Though most of [hisher] face is pure white, a large ring of gold around each eye blurs together over the bridge of the nose, creating a very domino mask-like effect. [HisHer] ears are, likewise, pure gold on the outside and pure white on the inside. White gives way to gold at [hisher] neck, and you know for a fact that most of Terry’s fur is gold; only on [hisher] forelimbs, legs from knees to ankle, stomach, buttocks, and the very tip of [hisher] tail does the white return.", parse);
	Text.NL();
	Text.Add("Following the fur leads your gaze down to Terry’s chest. ", parse);
	if(terry.Cup() > TerryFlags.Breasts.Flat) {
		parse["c"] = terry.FirstCock() ? Text.Parse(", contrasting the [tcockDesc] between [hisher] legs", parse) : "";
		Text.Add("A pair of [tbreastDesc] bulge noticeably atop Terry’s chest[c]. ", parse);
		if(terry.Cup() == TerryFlags.Breasts.Dcup) {
			Text.Add("Though only D-cups, Terry is so slenderly built elsewhere that they seem exaggeratedly large. The full quivering breasts jiggle softly whenever [heshe] moves, making even the act of breathing almost hypnotic as they rise, fall, expand and contract. It really is incredible that such a dainty [foxvixen] could have such huge boobs.", parse);
			if(terry.Lactation()) {
				Text.NL();
				Text.Add("The huge [foxvixen] tits contain an equally huge supply of warm creamy milk, just waiting to be tapped. As if to prove your point, a small bead leaks from each perky pink nipple in turn, sliding down Terry’s areolae. With practiced disinterest, [heshe] wipes the smears of milk away with a quick flick of [hisher] fingers over each breast.", parse);
			}
		}
		else if(terry.Cup() == TerryFlags.Breasts.Ccup) {
			Text.Add("Plush and proud, the C-cup sized breasts have just the right amount of sag to them, drawing a casual eye and enticing the viewer to touch and squeeze them. Terry’s delicate body-type only makes them seem more prominent.", parse);
			if(terry.Lactation())
				Text.Add(" Further weighing the [foxvixen] down is the ample supply of fresh milk brewing in each plush teat. As [heshe] moves, a small bead of white wells from one little pink nipple, forced out by the shift in pressure.", parse);
		}
		else if(terry.Cup() == TerryFlags.Breasts.Bcup) {
			Text.Add("The full, perky orbs are a good size that blends well with Terry’s dainty frame; the luscious pair of B-cups are just big enough to squeeze and play with.", parse);
			if(terry.Lactation())
				Text.Add(" And that squeezability comes in handy; it makes milking [himher] of the sweet [foxvixen] milk brewing in each tit almost effortless.", parse);
		}
		else {
			Text.Add("Dainty little things just barely big enough to squeeze as they are, you’d estimate Terry’s breasts to be A-cups. They mesh very well with [hisher] slender frame.", parse);
			if(terry.Lactation())
				Text.Add(" Despite their small size, you know they contain an easily tapped supply of warm, creamy [foxvixen] milk.", parse);
		}
	}
	else {
		Text.Add("Terry’s chest is flat... but that’s about the most masculine thing you can say about [hisher] build. Even though it lacks any visible breasts, there’s a slender suppleness to [hisher] physique that ", parse);
		if(terry.Gender() == Gender.male)
			Text.Add("doesn’t help [himher] present [himher]self as male.", parse);
		else if(terry.Gender() == Gender.herm)
			Text.Add("seems strangely appropriate for one who blurs the gender-line like your double-equipped [foxvixen].", parse);
		else
			Text.Add("manages to convey [hisher] fundamental femininity.", parse);
	}
	Text.NL();
	if(terry.Slut() < 30) {
		if(terry.Relation() < 30) {
			Text.Add("The [foxvixen] immediately hugs [hisher] chest. <i>“Quit it!”</i> [heshe] protests.", parse);
			Text.NL();
			Text.Add("You sigh mentally and roll your eyes, but choose to listen. There’s nothing to be gained by making [himher] upset over something so trivial.", parse);
		}
		else if(terry.Cup() >= TerryFlags.Breasts.Acup) {
			Text.Add("<i>“Umm… it’s kinda embarrassing when you stare at them like that,”</i> the [foxvixen] says, cupping [hisher] tits.", parse);
			Text.NL();
			Text.Add("You smile slightly and shake your head. Terry really needs to stop being so shy; [heshe] has a perfectly nice set of breasts, so naturally you’re going to look at them.", parse);
		}
		else {
			Text.Add("<i>“I don’t see why you’re so fascinated with my chest. I got nothing but fur here,”</i> [heshe] states nonchalantly.", parse);
			Text.NL();
			Text.Add("You simply grin back; it’s just part of [hisher] charms, after all.", parse);
		}
	}
	else if(terry.Slut() < 60) {
		if(terry.Cup() >= TerryFlags.Breasts.Acup) {
			parse["heft"] = terry.Cup() >= TerryFlags.Breasts.Ccup ? " and hefting" : "";
			Text.Add("Terry cups [hisher] breasts, massaging[heft] them. <i>“You like them?”</i> [heshe] asks teasingly, <i>“Well, you’d better, 'cuz it was you who gave them to me.”</i>", parse);
			Text.NL();
			Text.Add("You enthusiastically nod your head in agreement; you most certainly do like them.", parse);
		}
		else {
			Text.Add("<i>“I got nothing to offer up here, and ogling me like that isn’t going to make boobs sprout out of my chest,”</i> the [foxvixen] teases with a grin.", parse);
			Text.NL();
			Text.Add("[HeShe] has to admit, though, that’s a pretty entertaining thought, you shoot back.", parse);
		}
	}
	else {
		if(terry.Cup() >= TerryFlags.Breasts.Acup) {
			Text.Add("<i>“If you keep staring at them like that, it feels like you’re going to wind up burning holes through my clothes,”</i> Terry teases. <i>“Not that I’d mind if you did, but replacing them might get expensive.”</i>", parse);
			Text.NL();
			Text.Add("Well, maybe you should just have [himher] go around naked; you think [heshe]’d like that.", parse);
			Text.NL();
			Text.Add("<i>“Ha! I will if you really want me to, but you’ll have to go naked yourself. If I’m going to be giving you eye-candy all the time, I expect the same treatment,”</i> [heshe] quips back.", parse);
			Text.NL();
			Text.Add("You shoot back that you’ll consider it, but right now, you want to keep looking at Terry.", parse);
		}
		else {
			Text.Add("<i>“You should know well that my best assets aren’t up here,”</i> the [foxvixen] says, patting [hisher] chest. <i>“But feel free to keep looking.”</i>", parse);
			Text.NL();
			Text.Add("Well, if [heshe] insists, why not? Still, there’s more of [himher] to look at...", parse);
		}
	}
	Text.NL();
	Text.Add("Your gaze sweeps down Terry’s form, toward [hisher] waist. ", parse);
	// Pregnancy
	var womb = terry.PregHandler().Womb();
	var preg = womb && womb.pregnant;
	var stage = preg ? womb.progress : null;
	if     (preg && stage > 0.8)
		Text.Add("Seems like Terry’s pregnancy is in its final stages. The [foxvixen]’s belly is nice and round. When you put your hand on [hisher] belly, you can feel the baby inside kick you. The big belly coupled with the [foxvixen]’s sometimes distant gaze make [himher] look very attractive...", parse);
	else if(preg && stage > 0.6)
		Text.Add("[HisHer] pregnancy has come a long way. You don’t think there’s much more [heshe] can grow before [heshe]’s ripe for birthing a little kit into the world. Terry sometimes rubs [hisher] belly with a smile; it’s clear that despite the burdens [hisher] pregnancy have imposed on [himher], [heshe]’s looking forward to popping the little pup out.", parse);
	else if(preg && stage > 0.4)
		Text.Add("Terry’s belly is growing nicely. The [foxvixen] sometimes has cravings, but that’s to be expected of a pregnant [foxvixen] - at least [heshe]’s not feeling sick anymore. You gotta say though, this pretty belly of [hishers] makes [himher] look very feminine and attractive. Maybe you should consider calling Terry over for some alone time later...", parse);
	else if(preg && stage > 0.2)
		Text.Add("[HisHer] belly’s developing a nice paunch, and you can see that [hisher] pregnancy is taking its toll on the poor [foxvixen]. Sometimes, Terry looks sick or tired, but that only lasts an instant before the [foxvixen] recomposes [himher]self.", parse);
	else
		Text.Add("Your [foxvixen] is nicely trim, lean, flat-bellied and perfectly suited for sneaking through windows or wriggling under couches. But there’s not really anything else to say about it, so your gaze keeps sweeping down toward [hisher] loins...", parse);
	Text.NL();
	if(terry.FirstCock()) {
		if(terry.HorseCock()) {
			Text.Add("A rather stark contrast to the rest of the [foxvixen]’s form, between Terry’s thighs rests a proud piece of stallion-cock, far larger than [hisher] old dick. Mottled brown in color, its flaccid state boasts an area of nine inches long and one and a half inches thick. At full mast, however, it grows even bigger, bringing home a massive thirteen inches in length and two and a half inches thick.", parse);
			Text.NL();
			Text.Add("It’s a lot more sensitive than [hisher] old fox-prick, and [heshe] can get going with just a little attention there. Despite the new form, it hasn’t entirely changed from before; [heshe] still has a knot at the base of [hisher] cock, though it’s much bigger than it used to be. [HisHer] balls have practically doubled in size, heavy with churning loads of cum. Sometimes you wonder if it’s even possible for the [foxvixen] to run dry...", parse);
		}
		else
			Text.Add("Between [hisher] thighs lies [hisher] dainty little vulpine dick. When fully erect, it’s a below-average red piece of meat, four inches long and an inch thick. Below it lies a pair of pretty little trappy-balls that cling closely to [hisher] crotch. It’s no surprise that [heshe] can disguise [himher]self as a normal woman so easily. Even when it’s fully erect, it looks too cute to be on a guy.", parse);
		Text.NL();
	}
	if(terry.FirstVag()) {
		parse["c"] = terry.FirstCock() ? Text.Parse(", behind [hisher] [tcockDesc]", parse) : "";
		Text.Add("[HeShe] has a dainty little feminine pussy between [hisher] legs[c]. It’s wet, shiny, and seemingly just waiting to be stuffed with an inquisitive cock, tongue or fingers. If you stimulate it enough, Terry can’t help but squirt a nice gush of vixen-juice, ", parse);
		if(terry.Slut() < 45)
			Text.Add("much to [hisher] embarrassment.", parse);
		else
			Text.Add("a quirk [heshe]’s come to appreciate.", parse);
		Text.NL();
	}
	parse["ns"] = terry.Slut() >= 60 ? "seductively" : "nervously";
	Text.Add("Done admiring what lies between your [foxvixen]’s legs, your gaze sweeps down over [hisher] legs. A girlishly curvy set of hips helps to support a definitely non boyish bubble-butt; Terry’s tail flicks [ns] over a perky ass, more than enough to fill your groping hands if you were to take a grab. Slender, shapely plantigrade legs stretch down, ending in partially paw-like feet. [HeShe] has pads on the balls of [hisher] feet, so [hisher] footprints would resemble those of a real fox.", parse);
	Text.NL();
	Text.Add("Your investigation complete, you nod your head in satisfaction.", parse);
	Text.Flush();
}

TerryScenes.Prompt = function() {
	let terry = GAME().terry;
	let party : Party = GAME().party;
	let player = GAME().player;

	var parse : any = {
		foxvixen : terry.mfPronoun("fox", "vixen"),
		HeShe   : terry.HeShe(),
		heshe   : terry.heshe(),
		HisHer  : terry.HisHer(),
		hisher  : terry.hisher(),
		himher  : terry.himher(),
		hishers : terry.hishers()
	};
	
	var that = terry;
	var switchSpot = party.location.switchSpot();
	
	var options = new Array();
	options.push({ nameStr : "Appearance",
		func : TerryScenes.Appearance, enabled : true,
		tooltip : "Take a closer look."
	});
	options.push({ nameStr : "Talk",
		func : function() {
			Text.Clear();
			Text.Add("<i>“You want to talk? What about?”</i>", parse);
			Text.Flush();
			
			TerryScenes.TalkPrompt();
		}, enabled : true,
		tooltip : "Have a chat with Terry."
	});
	options.push({ nameStr : "Pet",
		func : TerryScenes.SkinshipPrompt, enabled : true,
		tooltip : Text.Parse("Play around with your pretty little [foxvixen]; [heshe] looks like [heshe] could use a good petting.", parse)
	});
	options.push({ nameStr : "Sex",
		func : function() {
			Text.Clear();
			if(terry.Relation() >= 60) {
				parse["h"] = player.Height() > terry.Height() + 5 ? Text.Parse(" getting on [hisher] tiptoes,", parse) : "";
				Text.Add("The [foxvixen] walks up to you with a smile,[h] and gives you a peck on the lips. <i>“Of course this is a booty call,”</i> [heshe] grins, wagging [hisher] fluffy tail.", parse);
			}
			else if(terry.Relation() >= 30)
				Text.Add("<i>“Sex, huh?”</i> [heshe] says with a grin, closing the distance. <i>“Alright, I don’t mind putting out for you.”</i> [HeShe] pokes your belly playfully before taking a step back.", parse);
			else
				Text.Add("<i>“Okay, if you want me, I guess I don’t have much choice,”</i> [heshe] says nonchalantly.", parse);
			Text.NL();
			TerryScenes.SexPrompt(terry.Interact);
		}, enabled : true,
		tooltip : Text.Parse("Terry is a sexy [foxvixen], why not have some fun with [himher]?", parse)
	});
	//TODO
	options.push({ nameStr: "Release",
		func : function() {
			Text.Clear();
			Text.Add("[Placeholder] Terry masturbates fiercely, cumming buckets.");
			Text.Flush();
			TimeStep({minute : 10});
			
			that.OrgasmCum();
			
			Gui.NextPrompt(function() {
				that.Interact(switchSpot);
			});
		}, enabled : true,
		tooltip : "Pleasure yourself."
	});
	//Equip, stats, job, switch
	that.InteractDefault(options, switchSpot, true, true, true, true);
	
	Gui.SetButtonsFromList(options, true, NAV().PartyInteraction);
}

TerryScenes.ExploreGates = function() {
	let terry = GAME().terry;

	var parse : any = {
		
	};
	
	Text.Clear();
	Text.Add("With a nod of agreement to each other, you and Miranda start investigating the area, looking for potential hiding spots or clues that could help you catch this thief.", parse);
	Text.NL();
	if(terry.flags["Met"] >= TerryFlags.Met.Found) {
		Text.Add("As best you can, the pair of you make your way through the crowds, looking for the slightest sign of the thief you're chasing, eyes ever alert for a telltale vulpine form. With the sheer number of people here, it doesn't make your task easy, and you keep having to push your way through the scrum.", parse);
		Text.NL();
		if(terry.hidingSpot == WORLD().loc.Rigard.Gate) {
			Text.Add("Your search finally pays off when you see a vulpine tail rounding a corner toward an alleyway. You signal to Miranda and she opens a path in the crowd so you can give chase. As soon as she notices she’s being followed, she makes a mad dash toward the other side. <i>“Dammit!</i> Miranda curses as she rushes ahead. You follow in tow.", parse);
			Text.NL();
			Text.Add("After a while, she finally makes a mistake and rounds a corner on a dead end. Without so much a batting an eye, she readies herself for combat!", parse);
			Text.Flush();
			
			TerryScenes.CombatVsMiranda();
			return;
		}
		else {
			Text.Add("In the end, you come back empty-handed. Wherever the vixen is, she doesn’t seem to be here.", parse);
			Text.NL();
			Text.Add("<i>“Come on, let’s look somewhere else,”</i> Miranda says in annoyance, pushing a path open through the crowd so the two of you can get out.", parse);
		}
	}
	else {
		Text.Add("Despite your exhaustive efforts at searching, it all comes to naught - there isn't a single trace of a clue to be found here. Eventually, Miranda declares it's time to look somewhere else.", parse);
	}
	Text.Flush();
	TimeStep({minute : 30});
	
	Gui.NextPrompt();
}
TerryScenes.ExploreResidential = function() {
	let terry = GAME().terry;

	var parse : any = {
		
	};
	
	Text.Clear();
	Text.Add("With a nod of agreement to each other, you and Miranda start investigating the area, looking for potential hiding spots or clues that could help you catch this thief.", parse);
	Text.NL();
	
	if(terry.flags["Met"] >= TerryFlags.Met.Found) {
		Text.Add("You decide to look around and ask a few people. Someone might’ve seen her. ", parse);
		if(terry.hidingSpot == WORLD().loc.Rigard.Residential.Street) {
			Text.Add("After a long string of complaints, annoyed comments and plain rudeness, one of the residents finally provides a lead.<i>“A vixen? You mean that one?”</i> They point toward an alleyway, where you see a distinct vulpine running off.", parse);
			Text.NL();
			Text.Add("Without missing a beat, you call for Miranda and make a mad dash after the thief. You chase after her for a while, until Miranda manages to corner her at a dead end. She draws her blade and prepares for battle!", parse);
			Text.Flush();
			
			TerryScenes.CombatVsMiranda();
			return;
		}
		else {
			Text.Add("After a long string of complaints, annoyed comments and plain rudeness, Miranda approaches you. <i>“Any luck?”</i>", parse);
			Text.NL();
			Text.Add("You shake your head.", parse);
			Text.NL();
			Text.Add("<i>“Dammit! When I catch that thief...”</i> she trails off into a growl, signaling you to follow.", parse);
		}
	}
	else {
		Text.Add("You do your best to search, questioning people if they have seen anything strange and poking your nose into any likely looking corner, but in the end, you come up empty-handed. Looking toward Miranda, she shakes her head with a disgusted grimace; evidently her luck was no better than yours. It looks like your thief isn't here.", parse);
	}
	Text.Flush();
	TimeStep({minute : 30});
	
	Gui.NextPrompt();
}
TerryScenes.ExploreMerchants = function() {
	let terry = GAME().terry;
	let player = GAME().player;

	var parse : any = {
		weapon : player.WeaponDesc()
	};
	
	Text.Clear();
	Text.Add("With a nod of agreement to each other, you and Miranda start investigating the area, looking for potential hiding spots or clues that could help you catch this thief.", parse);
	Text.NL();
	
	if(terry.flags["Met"] >= TerryFlags.Met.Found) {
		if(terry.hidingSpot == WORLD().loc.Rigard.ShopStreet.Street) {
			Text.Add("You and Miranda wander through the warehouses of the merchant’s district, looking for any sign of the sleek vixen. The two of you check a few of them before you catch a glimpse of a moving shadow. You rush ahead without thinking, Miranda following hot on your heels, and as soon as round the corner, you’re faced with the vixen thief, already ready for combat!", parse);
			Text.Flush();
			TerryScenes.CombatVsMiranda();
			return;
		}
		else {
			Text.Add("Though you and Miranda search the many warehouses, you find no sign of the vulpine thief. It appears she hasn't returned here since you flushed her out before.", parse);
		}
	}
	else {
		Text.Add("As you consider your options for searching the place, you note it's unlikely that a thief would be hiding in one of the stores. Turning to the long-term resident, you ask Miranda if she has any opinions on where would be likely prospects for ‘good hiding spots’ here.", parse);
		Text.NL();
		Text.Add("Miranda shrugs. <i>“There’s always the warehouses. Not much movement around there even during normal days.”</i>", parse);
		Text.NL();
		Text.Add("You reply that it would probably be best to try searching the warehouses first, in that case.", parse);
		Text.NL();
		Text.Add("<i>“Right, this way.”</i>", parse);
		Text.Flush();
		
		Gui.NextPrompt(function() {
			Text.Clear();
			Text.Add("Despite your efforts, the search so far has been for nothing; you're both empty-handed despite how thoroughly you keep checking. You are just about to leave the warehouse district and search elsewhere when you spot something; a warehouse with its doors ajar. Recalling Miranda said there isn't much activity here even when things are normal, you deem that suspicious and call her attention to it, suggesting that you should both check it out.", parse);
			Text.NL();
			Text.Add("Miranda boldly walks up to the door and kicks it open. <i>“Hey! Is the bastard that stole Krawitz stuff here?”</i>", parse);
			Text.NL();
			Text.Add("...That's Miranda for you. ", parse);
			if(player.SubDom() > 0)
				Text.Add("She really wouldn't know subtlety if it bit her on the ass, would she?", parse);
			else
				Text.Add("There are times when she's a little too direct, even for your taste.", parse);
			Text.Add(" Much to your surprise, you hear a gasp and the sound of metal hitting the floor.", parse);
			Text.NL();
			Text.Add("<i>“Get your weapon ready,”</i> Miranda snarls, taking her sword in her hands and assuming a battle stance. You follow her lead as Miranda shouts, <i>“Show yourself!”</i>", parse);
			Text.NL();
			Text.Add("The two of you wait patiently, but when no reply comes, Miranda takes a step forward. Immediately, you note a small sphere flying toward her. She has no time to react as the sphere bursts open into a cloud of dust, temporarily blinding the canine guard. <i>“Shit!”</i> she exclaims, trying to shake off the dust.", parse);
			Text.NL();
			Text.Add("Thankfully, you manage to protect your eyes, and by the time you uncover them, you’re faced with a blur heading your way, no doubt making a run for it! You quickly strike them with your [weapon], narrowly missing your mark as the blur takes a step back. Their mask comes loose, falling on the ground, and as it does so, you’re faced with a familiar face. It’s the vixen from the Lady’s Blessing!", parse);
			Text.NL();
			Text.Add("She's traded her uniform for a practical, tight-fitting suit of leather armor. A hood rises from the neck to cover her scalp and partially obscure her features, its long sleeves and pant-legs reaching to her wrists and ankles, but tight against the limbs so as to not get in the way. Bracers and pads add a little extra protection, and the front sports a number of pockets and a holster covered in pouches wrapped diagonally around her chest. All in all, perfect gear for a thief.", parse);
			Text.NL();
			Text.Add("<i>“Dammit!”</i> she yells, grabbing a dagger and entering her battle stance.", parse);
			Text.NL();
			Text.Add("<i>“Alright asshole, it’s personal now,”</i> Miranda growls as she steps by your side, eyes red from the thief’s initial attack.", parse);
			Text.Flush();
			TerryScenes.CombatVsMiranda();
			return;
		});
		
		
		terry.flags["Met"] = TerryFlags.Met.Found;
		
		return;
	}
	
	Text.Flush();
	TimeStep({minute : 30});
	
	Gui.NextPrompt();
}
TerryScenes.ExplorePlaza = function() {
	let terry = GAME().terry;
	let player = GAME().player;
	let miranda = GAME().miranda;

	var parse : any = {
		playername : player.name
	};
	
	Text.Clear();
	
	if(terry.flags["Met"] >= TerryFlags.Met.Found) {
		Text.Add("With a nod of agreement to each other, you and Miranda start investigating the area, looking for potential hiding spots or clues that could help you catch this thief.", parse);
		Text.NL();
		Text.Add("Luckily for you, the bustling movement of the people here makes the plaza seem more crowded than it really is, and there aren't that many places to hide anyway. Thusly, if the thief is here, you have a chance of finding her.", parse);
		Text.NL();
		if(terry.hidingSpot == WORLD().loc.Rigard.Plaza) {
			Text.Add("As you make your way through the crowds, you feel someone walk straight into you, having been looking over their shoulder and not watching where they were going. As you shake your head to recover, you find yourself looking right into the eyes of the vixen you were chasing! She yelps in shock and tries to run away, but the crowd is in the path and so she is cornered inadvertently by the scrum. You shout at her to halt, and she replies by drawing her weapons, sending the crowd fleeing and bringing Miranda running to assist.", parse);
			Text.Flush();
			TerryScenes.CombatVsMiranda();
			return;
		}
		else {
			Text.Add("You find yourself bumped, shoved, sworn at, shouted over and generally given the run around as you try fording through the seething crowd of people. Eventually, you fight your way free of the crowd and find Miranda quickly joining you, the doberherm watchdog visibly growling in frustration as you shake your head. Evidently, you'll need to try searching elsewhere.", parse);
		}
	}
	else {
		if(miranda.Attitude() >= MirandaFlags.Attitude.Neutral) {
		Text.Add("<i>“[playername], this place is already packed with guards. Do you really think a thief would hide here where everyone can see them?”</i> she asks you with obvious disdain.", parse);
		Text.NL();
		Text.Add("Even a cursory glance around makes you agree with Miranda's opinion, and you nod your head as you tell her so.", parse);
		Text.NL();
		Text.Add("<i>“Then let’s look elsewhere.”</i>", parse);
		}
		else {
			Text.Add("<i>“Use your head and think for once, this place is already packed with guards, plus there’s nowhere to hide. A thief wouldn’t dream of attempting to stay incognito here.”</i>", parse);
			Text.NL();
			Text.Add("It's hardly necessary to look to see that Miranda does have a valid point, and you waste no time in agreeing with her that it'd be better to try searching elsewhere.", parse);
			Text.NL();
			Text.Add("<i>“Let’s get out of here.”</i>", parse);
		}
	}
	Text.Flush();
	TimeStep({minute : 30});
	
	Gui.NextPrompt();
}

TerryScenes.CombatVsMiranda = function() {
	let terry = GAME().terry;
    let party : Party = GAME().party;
    let world = WORLD();

	var enemy = new Party();
	enemy.AddMember(terry);
	var enc = new Encounter(enemy);
	
	terry.RestFull();
	terry.turnCounter = 0;
	terry.flags["PrefGender"] = Gender.female;
	
	enc.canRun = false;
	
	enc.onLoss = function() {
		var parse : any = {
			
		};
		
		SetGameState(GameState.Event, Gui);
		Text.Clear();
		Text.Add("Smirking, the vixen jumps over you and dashes away. You rub your sore spots and with some effort manage to get back up. Miranda looks like she’s going to pop a vein…", parse);
		Text.NL();
		Text.Add("<i>“That damn bitch! I’m gonna get her, get her good next time!”</i> she fumes. Looking at you, she calms down some and sheathes her sword. <i>“Let’s regroup at the gates and chase after that bitch again.”</i>", parse);
		Text.NL();
		Text.Add("You nod and follow after Miranda.", parse);
		Text.Flush();
		
		party.location = world.loc.Rigard.Gate;
		TimeStep({minute: 30});
		
		party.RestFull();
		
		// Move Terry
		var scenes = new EncounterTable();
		scenes.AddEnc(function() {
			terry.hidingSpot = world.loc.Rigard.Gate;
		}, 1.0, function() { return terry.hidingSpot != world.loc.Rigard.Gate; });
		scenes.AddEnc(function() {
			terry.hidingSpot = world.loc.Rigard.Residential.Street;
		}, 1.0, function() { return terry.hidingSpot != world.loc.Rigard.Residential.Street; });
		scenes.AddEnc(function() {
			terry.hidingSpot = world.loc.Rigard.ShopStreet.Street;
		}, 1.0, function() { return terry.hidingSpot != world.loc.Rigard.ShopStreet.Street; });
		scenes.AddEnc(function() {
			terry.hidingSpot = world.loc.Rigard.Plaza;
		}, 1.0, function() { return terry.hidingSpot != world.loc.Rigard.Plaza; });
		
		scenes.Get();
		
		Gui.NextPrompt();
	}
	enc.onRun = function() {
		var parse : any = {
			
		};
		terry.sbombs--;
		SetGameState(GameState.Event, Gui);
		Text.Clear();
		Text.Add("When the smoke clears, the vixen is nowhere to be seen. Miranda looks like she’s going to pop a vein…", parse);
		Text.NL();
		Text.Add("<i>“That damn bitch! I’m gonna get her, get her good next time!”</i> she fumes. Looking at you, she calms down some and sheathes her sword. <i>“She can’t have gone far, lets continue looking!”</i>", parse);
		Text.NL();
		Text.Add("You nod and follow after Miranda.", parse);
		Text.Flush();
		
		TimeStep({minute: 30});
		
		// Move Terry
		var scenes = new EncounterTable();
		scenes.AddEnc(function() {
			terry.hidingSpot = world.loc.Rigard.Gate;
		}, 1.0, function() { return terry.hidingSpot != world.loc.Rigard.Gate; });
		scenes.AddEnc(function() {
			terry.hidingSpot = world.loc.Rigard.Residential.Street;
		}, 1.0, function() { return terry.hidingSpot != world.loc.Rigard.Residential.Street; });
		scenes.AddEnc(function() {
			terry.hidingSpot = world.loc.Rigard.ShopStreet.Street;
		}, 1.0, function() { return terry.hidingSpot != world.loc.Rigard.ShopStreet.Street; });
		scenes.AddEnc(function() {
			terry.hidingSpot = world.loc.Rigard.Plaza;
		}, 1.0, function() { return terry.hidingSpot != world.loc.Rigard.Plaza; });
		
		scenes.Get();
		
		Gui.NextPrompt();
	}
	enc.onVictory = TerryScenes.CaughtTheThief;
	/*
	enc.onEncounter = ...
	enc.VictoryCondition = ...
	*/
	Gui.NextPrompt(function() {
		enc.Start();
	});
}

TerryScenes.CaughtTheThief = function() {
	let terry = GAME().terry;
	let player = GAME().player;
	let miranda = GAME().miranda;
	let party : Party = GAME().party;
    let rigard = GAME().rigard;
    let world = WORLD();

	var parse : any = {
		playername : player.name,
		masterMistress : player.mfTrue("master", "mistress")
	};
	
	SetGameState(GameState.Event, Gui);
	rigard.Krawitz["Q"] = RigardFlags.KrawitzQ.CaughtTerry;
	
	terry.flags["PrefGender"] = Gender.male;
	
	var dom = player.SubDom() - miranda.SubDom();
	
	Text.Clear();
	Text.Add("As soon as the vixen is down, Miranda strides over to her and roughly pins her down on the floor. <i>“Got you now, thief!”</i>", parse);
	Text.NL();
	Text.Add("The vixen struggles, but she has no strength left, and you doubt it would make a difference if she did. <i>“Get off me! You stupid lapdog!”</i>", parse);
	Text.NL();
	Text.Add("<i>“Oh, she has fire!”</i> Miranda comments grabbing her sword and stabbing the ground right beside the vixen thief.", parse);
	Text.NL();
	Text.Add("Taken aback by the unspoken threat, vixen yelps, making Miranda laugh. <i>“Okay, you mangy mutt, you’re going to tell me where you’ve stashed your loot now or should I extract the information out of you?”</i>", parse);
	Text.NL();
	Text.Add("The vixen swallows audibly…", parse);
	Text.NL();
	if(party.location == world.loc.Rigard.ShopStreet.Street)
		Text.Add("<i>“I-it’s in that warehouse over there,”</i> she squeaks, pointing across the street. Her eyes never leave Miranda’s face.", parse);
	else
		Text.Add("<i>“I… I hid it in a warehouse in the merchant district!”</i> she squeaks, eyeing Miranda fearfully.", parse);
	Text.Flush();
	
	TimeStep({minute: 30});
	
	Gui.NextPrompt(function() {
		Text.Clear();Text.Add("Following the thief’s directions, you make your way into the appointed warehouse. The doors are locked, not that it makes any difference. Miranda shatters the lock, and latch, with a well placed kick, making both you and the thieving vixen cringe. ", parse);
		Text.NL();
		Text.Add("You look inquisitively at your surroundings, trying to see if you can spot where the vixen might’ve stashed the goods. Miranda closes the door behind you and pushes the defeated vixen to your side. Her arms are tied behind her back by a sturdy rope knotted around her wrists, the free end trailing back into Miranda's firm grasp. Not seeing any signs, you turn your attention back toward the thief.", parse);
		Text.NL();
		Text.Add("<i>“It’s inside those boxes,”</i> the thief says indignantly. Miranda simply gives you a look and nods toward the boxes.", parse);
		Text.NL();
		Text.Add("Needing no further prompting, you walk over to the indicated crates and, with a little effort, manage to pull them apart, revealing a bulging sack that a quick glance proves is filled with stolen property.", parse);
		Text.NL();
		Text.Add("<i>“Good girl,”</i> Miranda says patting the smaller vixen’s head patronizingly. <i>“Now before I lock you up, I’m going to take revenge for making me hunt you all over the town.”</i>", parse);
		Text.NL();
		Text.Add("<i>“What!? I already told you where the stuff is, what more do you want?”</i> the vixen protests.", parse);
		Text.NL();
		Text.Add("Miranda doesn’t bother with a reply, she roughly grabs the thief’s pants and with a quick tug pulls them down, exposing the vixen’s butt and her cock. Shaking your head you take another glance, cock?", parse);
		Text.NL();
		Text.Add("Miranda cackles like a hyena in laughter, grabbing the vixen’s below-average sheath and checking behind. <i>“What a nice surprise! So you’re actually a boy?”</i> she asks, checking behind her… his balls. <i>“Nothing, what a kinky slut you are, Mr. Thief.”</i>", parse);
		Text.NL();
		Text.Add("<i>“C-cut it out! So what if I’m a guy?”</i>", parse);
		Text.NL();
		Text.Add("Miranda forces the fox down on his knees, eliciting a yelp. <i>“Pretty thing like you is too girly to be a guy,”</i> Miranda teases. <i>“I’m gonna show you what’s it like to be a real man,”</i> Miranda says, pulling her pants down and letting her half-erect doggy-dong flop against the trembling fox’s shoulder.", parse);
		Text.NL();
		Text.Add("You realize that Miranda's serious about this; she's in one of her moods again. What should you do?", parse);
		Text.Flush();
		
		TimeStep({minute: 30});
		
		//[LetHer][StopHer][TakeHim]
		var options = new Array();
		options.push({ nameStr : "Let her",
			func : function() {
				Text.Clear();
				Text.Add("Miranda spins the poor fox around, making him come face to cock with Miranda’s shaft. <i>“You’d better do a good job blowing me, slut. This is all the lube you’re going to get when I fuck your ass later,”</i> Miranda warns him, shoving her hermhood against his cheek.", parse);
				Text.NL();
				Text.Add("He tries his best to look away to no avail, he opens his mouth to utter a protest, which winds up being a terrible mistake as Miranda takes the opportunity to shove half of her eleven inches of doghood down his throat.", parse);
				Text.NL();
				Text.Add("You hear a muffled gurgle as Miranda begins to mercilessly ram her way down his throat.", parse);
				Text.NL();
				if(miranda.Attitude() >= MirandaFlags.Attitude.Neutral)
					Text.Add("You can't help but wince at the unusual roughness with which Miranda starts fucking the thief. If that's how she tends to act when angry, maybe you should avoid getting on her bad side...", parse);
				else
					Text.Add("You actually feel a pang of sympathy for the thief. You can remember being on the receiving end of Miranda when she's in that sort of mood all too vividly.", parse);
				Text.Add(" Silently, you stand by and watch as Miranda unceremoniously fucks the fox's face, grunting lewdly to herself with effort as she slaps her cock back and forth down his throat. The thief tries his hardest, but he's ultimately little more than a living onahole, casting pleading looks in your direction as he does his best not to choke on her dick.", parse);
				Text.NL();
				Text.Add("<i>“What a nice throat you have, you dirty fox, but let’s not get ahead of ourselves,”</i> Miranda says pulling out of the fox’s abused mouth. He gasps and coughs, thankful for the opportunity to breathe fresh air. Unfortunately, it seems his ordeal is just not over yet. Miranda roughly grabs him and pins him down on the floor, butt up in the air as she teases him one more time before finally taking him, <i>“Get ready fox, I’m gonna split you in two!”</i> She pushes forward.", parse);
				Text.NL();
				Text.Add("Before she can press into his tight butthole, the doors of the warehouse burst open.", parse);
				Text.Flush();
				
				terry.relation.DecreaseStat(-100, 5);
				miranda.relation.IncreaseStat(100, 3);
				
				terry.flags["Met"] = TerryFlags.Met.LetHer; // "0"
				
				Gui.PrintDefaultOptions();
			}, enabled : true,
			tooltip : "What does it matter if you let the angry, horny herm vent her frustrations on some common thief? Who's it really going to hurt? Besides, you're sure that she'll appreciate your looking the other way."
		});
		options.push({ nameStr : "Stop her",
			func : function() {
				Text.Clear();
				Text.Add("In her distracted state, Miranda doesn't notice you approaching until you've already shoved her firmly away from the trappy fox-thief. As she scrambles back to her feet, you make a show of firmly planting yourself in front of him, making it clear you won't let her get back to him. ", parse);
				if(miranda.Attitude() >= MirandaFlags.Attitude.Neutral) {
					Text.Add("<i>“Hey! What the hell are you doing [playername]?”</i> she protests.", parse);
					Text.NL();
					if(dom > 50) {
						Text.Add("Stopping her, you reply calmly. You don't want her fucking this thief - does your bitch have a problem with that?", parse);
						Text.NL();
						Text.Add("<i>“But this bastard made us chase after him through the whole town!”</i> Miranda protests. It’s obvious she’s frustrated; normally she’d never talk back to you like this. Still, you won’t budge on that. You said no, and that’s final.", parse);
						Text.NL();
						Text.Add("<i>“Listen here, [playername]. I <b>am</b> your bitch, I don’t deny that. I’d be happy to take your orders and shut up anytime, but this bastard,”</i> she points at the fox, <i>“made it personal! So Aria help me, I’m going to wreck his ass!”</i>", parse);
						Text.NL();
						Text.Add("The two of you yell at each other as you scold Miranda. The thief doesn’t utter a single peep through this whole discussion, but you do detect that he’s at least relieved you didn’t let Miranda have her way. You’re about to add something on top of your arguments when the doors to the warehouse burst open.", parse);
					}
					else {
						Text.Add("Keeping her from making a big mistake, you tell her. What she was planning is not right and she knows it; she caught the thief, she'll get the glory, leave it at that.", parse);
						Text.NL();
						Text.Add("<i>“After this bastard made us chase after his tail through the whole city? You’ve gotta be kidding me!”</i>", parse);
						Text.NL();
						Text.Add("You shake your head and insist that you mean what you say; you won't let her do this. It's not right.", parse);
						Text.NL();
						Text.Add("<i>“Don’t you dare tell me what’s right or wrong in <b>my</b> city, [playername]. If you care so much, I have no problem letting you take his place, but Aria forbids me, I’m going to wreck someone’s ass over this!”</i>", parse);
						Text.NL();
						Text.Add("The two of you argue vehemently, hurling statement and rebuttal back and forth like knives, the stubborn bitch refusing to back down a foot and doing everything she can to force you to let her past, something you refuse to do. You're dimly aware that the thief remains on his knees behind you throughout the argument, and you can sense relief from him at your unexpected salvation of his anus. Things are just starting to get particularly heated when the doors to the warehouse are violently thrown open.", parse);
					}
				}
				else {
					Text.Add("<i>“What the- you’ve got some nerve pushing me around [playername],”</i> she growls.", parse);
					Text.NL();
					if(miranda.Sexed()) {
						Text.Add("Despite your natural nervousness, you manage to square your shoulders and shake your head, insisting you won't let her do this. Remembering the things she's done to you adds a little stiffness to your spine; you refuse to let her do those same things to someone else! ...Though, privately, you yourself can't tell if it's nobility or jealousy that makes you unable to stand the thought.", parse);
						Text.NL();
						Text.Add("<i>“So the slut’s jealous someone might be stealing their thunder… Well, don’t worry; I’ve got enough in me for both of you, now step aside.”</i>", parse);
						Text.NL();
						Text.Add("A perverse thrill tickles down your spine, but you insistently shake your head and refuse to move.", parse);
						Text.NL();
						Text.Add("<i>“You’re making me mad, slut; trust me, you won’t like me when I’m mad. Now, step aside before I decide to rip you apart as well!”</i> she threatens with a growl.", parse);
						Text.NL();
						Text.Add("As hard as it is for you, you manage to hold your ground, trying to convince Miranda to leave the thief alone, standing firm even in the face of her increasingly volatile and lewd threats, innuendoes and outright profanity. It comes as something of a relief when the warehouse doors suddenly slam open; you were so very close to losing your nerve and caving before her will.", parse);
					}
					else {
						Text.Add("You simply glare back and tell her to knock it off. She's made the collar, she's got what she needs, so she can stick her dick back in her pants where it belongs.", parse);
						Text.NL();
						Text.Add("She walks up to you with a growl, pointing a finger straight at you. <i>“You, step out of my way, now!”</i>", parse);
						Text.NL();
						Text.Add("Folding your arms over your chest, you shake your head.", parse);
						Text.NL();
						Text.Add("<i>“So the slut’s found some balls to stand up to me, huh? Well it’s either his ass or <b>your</b> ass. And trust me, if you thought I was being rough with you before, you haven’t seen anything! Now step aside!”</i>", parse);
						Text.NL();
						Text.Add("That was the worst thing she could have said to try and make you back down; on general principle, you ball your fists and start calling her out, the enraged morph screaming back at you. It's almost a good thing when someone suddenly storms into the warehouse, distracting the pair of you; one more word either way, and you both know that the pair of you would have started swinging.", parse);
					}
				}
				Text.Flush();
				
				terry.relation.IncreaseStat(100, 3);
				miranda.relation.DecreaseStat(-100, 3);
				miranda.subDom.DecreaseStat(-100, 5);
				
				terry.flags["Met"] = TerryFlags.Met.StopHer; // "1"
				
				Gui.PrintDefaultOptions();
			}, enabled : true,
			tooltip : "Criminal or not, letting her rape him just isn't right. She's not going to appreciate you interfering in her affairs, but it's still the noble thing to do."
		});
		if(player.FirstCock() || player.Strapon()) {
			options.push({ nameStr : "Take him",
				func : function() {
					Text.Clear();
					Text.Add("You protest to Miranda that it's not fair - you worked just as hard to catch this thief, you want a fair share of him too.", parse);
					Text.NL();
					if(miranda.Attitude() >= MirandaFlags.Attitude.Neutral) {
						if(dom > 50) {
							Text.Add("<i>“Don’t worry about it, [masterMistress]. I’ll be done soon and then you can have your fun - or, if you can’t take waiting, you can have your way with me while I plow this dirty fox,”</i> she replies, pushing her dick against his lips.", parse);
							Text.NL();
							Text.Add("The offer to take Miranda instead is tempting, you have to admit, but your attention is more focused on the shapely fox femmeboi. You interrupt Miranda, telling her that you are going first.", parse);
							Text.NL();
							Text.Add("Miranda looks at you as if you’d just uttered nonsense. <i>“No offense, [playername], but this bastard made us chase after him through the entire city, and I’m raring for some payback. Normally, I’d be bending over and wagging my tail at you like a good bitch, but not this time, so deal with it.”</i>", parse);
							Text.NL();
							Text.Add("Drawing yourself up to your full height, you stare imperiously into Miranda's eyes and pointedly remind her of who calls the shots here. You say you want to fuck the thief first, so that's what's going to happen, and <b>she</b> can deal with it!", parse);
							Text.NL();
							Text.Add("Miranda's eyes glow with a spark of her old passion, and the two of you start to argue back and forth over who gets to claim him first. Just when you think you are starting to wear her will down, though, a loud banging from the doors signals an interruption as someone strides through into the warehouse.", parse);
						}
						else { // Nice
							Text.Add("<i>“Frustrated with this bastard too, huh? Not a problem, just wait in line while I lube him up for you,”</i> she replies pushing her dick against his lips.", parse);
							Text.NL();
							Text.Add("You tell Miranda that's not necessary - you intend to lube him up for her, instead.", parse);
							Text.NL();
							Text.Add("Miranda laughs at your statement. <i>“Oh, [playername], you crack me up. But after chasing this bastard through the entire city, you gotta be kidding if you think I’m going to sit back and wait for you to be done. Get in line.”</i>", parse);
							Text.NL();
							Text.Add("You inform her that you won't get in line - if you let her at him first, you'll probably never get a chance to fuck him, and even if you do, she'll probably have stretched him all out to the point he's useless. No, you insist that you get to go first this time!", parse);
							Text.NL();
							Text.Add("The two of you fall to arguing over who gets first rights on the thief's tight little ass, getting so carried away that time slips away. You are dragged rudely back to reality at a loud clamor as the warehouse doors are violently thrown open and strangers march into the room to join you.", parse);
						}
					}
					else { // Nasty
						Text.Add("<i>“So the slut feels like pitching instead of receiving for once, huh? Fine, I’ll let you have seconds, since I’m in such a nice mood,”</i> she replies pushing her dick against his lips.", parse);
						Text.NL();
						Text.Add("Firsts, you reply - you want to have him first.", parse);
						Text.NL();
						Text.Add("<i>“Why you… you’ve got some nerve demanding to go first. I’ve been chasing after this asshole through the entire city. I’m mad, frustrated and pent up, so I’m going first and that’s final!” </i>", parse);
						Text.NL();
						Text.Add("Your frustration boils up and you find yourself shouting back that this time, you get to go first; you're sick of taking it and taking it from her all the time, you intend to fuck someone on your terms for once!", parse);
						Text.NL();
						Text.Add("The two of you devolve into a screaming match with each other, forgetting all about the thief as you instead focus on venting your hostilities toward one another. So caught up in it are the pair of you that you almost don't notice it when someone kicks in the warehouse doors and comes marching in. Almost.", parse);
					}
					Text.Flush();
					
					terry.relation.DecreaseStat(-100, 10);
					miranda.subDom.DecreaseStat(-100, 10);
					player.subDom.IncreaseStat(100, 3);
					
					terry.flags["Met"] = TerryFlags.Met.TakeHim; // "2"
					
					Gui.PrintDefaultOptions();
				}, enabled : true,
				tooltip : "Why should Miranda get to keep all the fun? You’ve worked just as hard to bust this fox."
			});
		}
		Gui.SetButtonsFromList(options, false, null);
		
		Gui.Callstack.push(function() {
			Text.NL();
			Text.Add("You quickly compose yourself and do your best to assess the situation. Beside you, you have a bound prisoner, naked from the waist down, and beside him is standing Miranda, dressed from the top up in a city watch outfit and naked from the waist down, an erection bobbing uneasily before her. In front of you, a detachment of armed and armored figures whose iconography makes it clear they belong to the Royal Guard. Really not a good scene to be caught in... at least <b>you</b> are still as dressed as you ever are; you look to be the only one acting somewhat professionally here, so your reputation is probably safe... pity Miranda can't say the same.", parse);
			Text.NL();
			Text.Add("The guards are led by a man in his mid thirties wearing garish silver armor, polished to a shine. You can tell he is a man very preoccupied with his own appearance, as his short, jet-black hair has been meticulously cut and oiled. Neither his armor nor his makeup does anything to soften the expression of sneering contempt on his face, nor the bile in his voice.", parse);
			Text.NL();
			Text.Add("<i>“Men, look at this,”</i> the commander points at both Miranda and the thief, descending into laughter, his men following in tow as they see what he is laughing at. Miranda’s ears flatten as she grabs her pants and pulls them up.", parse);
			Text.NL();
			Text.Add("<i>“Isn’t this exactly what you’d expect of the watch? Cohorting with a common thief. Truly, you cannot go lower than this.”</i>", parse);
			Text.NL();
			Text.Add("Miranda growls and steps toward the commander, <i>“Now you listen here-”</i>", parse);
			Text.NL();
			Text.Add("<i>“Shush dog! We’re here because we received information that the thief was holing up here, now be a good lapdog and go back to the watch. We will handle this since you’re obviously too busy with other issues to do your job. Men, haul this mangy mutt off to the prison.”</i>", parse);
			Text.NL();
			Text.Add("The Royal Guards waste no time in picking up the distraught fox and dragging him off, pants down and all. The ones not carrying the thief pick-up his loot and walk away as well. Once they’re out, the commander closes the door on two of you. Looking at Miranda, she looks on the verge of blowing up.", parse);
			Text.NL();
			Text.Add("<i>“Goddammit!”</i> she yells as she angrily punches the floor, cracking the boards and sending splinters flying.", parse);
			Text.Flush();
			
			Gui.NextPrompt(function() {
				Text.Clear();
				party.location = world.loc.Rigard.Tavern.common;
				TimeStep({hour: 1});
				Text.Add("After Miranda calms down enough, you two somehow find yourselves at the Maidens' Bane. Word that the Royal Guard had <i>caught</i> the thief has spread and the blockade has been lifted. Miranda looks absolutely dejected, drowning her sorrows in a mugful of ale.", parse);
				Text.NL();
				Text.Add("<i>“Damn that pompous ass, making fun of me and taking credit for <b>my</b> hard work.”</i> She drains the entire mug, and pours herself another mugful. <i>“You’ve just had the pleasure of meeting Preston the Shining, the commander of the Royal Guard. Yes, he’s always that much of an ass.”</i>", parse);
				Text.NL();
				Text.Add("You can't really blame her for being upset in this situation. Maybe she'd like it if you offered her a little sympathy? Then again, there is that pride of hers to consider, too.", parse);
				Text.Flush();
				
				//[Comfort][Leave]
				var options = new Array();
				options.push({ nameStr : "Comfort",
					func : function() {
						Text.Clear();
						Text.Add("Shuffling a little close in your seat, you spread your arm over Miranda's shoulders, letting her feel your weight in a show of support. Gently, you assure her that you're on her side; the Royal Guard are damned fools, and she doesn't deserve what they did. But still, you know how hard she worked and what she did, and you respect her for how well she did. She should be proud of herself; while those puffed-up slugs were polishing their armor, she was out chasing down the thief and capturing him single-handedly - she's a real hero.", parse);
						Text.NL();
						Text.Add("Miranda smiles a bit at that and leans into you. ", parse);
						if(miranda.Attitude() >= MirandaFlags.Attitude.Neutral) {
							Text.Add("<i>“Thanks, [playername]. ", parse);
							if(dom > 50)
								Text.Add("I’m glad I have a [masterMistress] as nice you. I wouldn’t have made it without you.”</i>", parse);
							else
								Text.Add("I’m glad I have you around. That alone makes everything a little better. Thanks for all the help.”</i>", parse);
							Text.NL();
							Text.Add("You simply smile and hug her back, hand slipping down her side to further touch her in reassurance.", parse);
						}
						else {
							Text.Add("<i>“Thanks for that, [playername],”</i> she says, just enjoying the comfort of your embrace for a moment. <i>“Y’know? You’re not so bad. I’m thankful for the help, even if I forced you to do it.”</i>", parse);
							Text.NL();
							Text.Add("You tell her it wasn't so bad, and you're glad you managed to help her.", parse);
							Text.NL();
							Text.Add("<i>“Maybe I should be nicer to you from now on. I guess you don’t deserve the crap I throw at you all the time. Sorry for being a dick,”</i> she apologizes.", parse);
							if(miranda.flags["subCellar"] != 0)
								Text.Add(" <i>“And - uh - for locking you in my cellar and having sex with you for three days.”</i>", parse);
							Text.NL();
							Text.Add("Apology accepted, you reply, not wanting to press your luck. Getting back in her good books is enough for you.", parse);
						}
						Text.NL();
						Text.Add("The two of you sit like that for a while longer, till Miranda is done drinking. <i>“Thanks for everything, [playername]. I’ll see you around,”</i> she says, gathering her stuff and walking away.", parse);
						Text.NL();
						Text.Add("You watch her go before getting up and leaving yourself.", parse);
						Text.NL();
						
						party.LoadActiveParty();
						party.location = world.loc.Rigard.Inn.common;
						TimeStep({hour: 1});
						
						if(party.Num() > 1) {
							parse["comp"] = party.Num() > 2 ? "Your companions are" : party.Get(1).name + " is";
							Text.Add("[comp] probably tired of waiting for you, you should hurry to the Lady’s Blessing.", parse);
							Text.NL();
						}
						Text.Add("You can’t deny that there’s a part of you that feels sorry for letting the thief take the blame for your own misdeeds at Krawitz’s. Maybe you should ask Miranda how he’s doing after she’s calmed down.", parse);
						
						Text.Flush();
						
						miranda.flags["Attitude"] = MirandaFlags.Attitude.Nice;
						miranda.relation.IncreaseStat(100, 10);
						
						Gui.NextPrompt();
					}, enabled : true,
					tooltip : Text.Parse("Show some sympathy for Miranda’s frustrated catch.[nasty]", {nasty: (miranda.Attitude() < MirandaFlags.Attitude.Neutral) ? " Maybe she’ll come around and start being nicer to you." : ""})
				});
				options.push({ nameStr : "Leave",
					func : function() {
						Text.Clear();
						
						party.LoadActiveParty();
						party.location = world.loc.Rigard.Inn.common;
						TimeStep({hour: 1});
						
						
						if(party.Num() > 1) {
							parse["comp"] = party.Num() > 2 ? "your companions" : party.Get(1).name;
							Text.Add("You pat Miranda on the back, announcing that you’re leaving and return to the Lady’s Blessing to find [comp].", parse);
						}
						else {
							Text.Add("You pat Miranda on the back, announcing that you’re leaving and leave her to her sorrows.", parse);
						}
						Text.NL();
						Text.Add("There’s a part of you that feels sorry for letting the thief take the blame for your own misdeeds at Krawitz’s. Maybe you should ask Miranda how he’s doing after she’s calmed down.", parse);
						Text.Flush();
						
						Gui.NextPrompt();
					}, enabled : true,
					tooltip : "There’s nothing you can do or say about the matter. What is done, is done. You should probably go back to your own business."
				});
				Gui.SetButtonsFromList(options, false, null);
			});
		});
	});
}

TerryScenes.Release = function() {
	let terry = GAME().terry;
	let player = GAME().player;
	let miranda = GAME().miranda;
	let party : Party = GAME().party;
    let world = WORLD();

	var parse : any = {
		playername : player.name,
		masterMistress : player.mfTrue("master", "mistress"),
		armorTopDesc : function() { return player.ArmorDesc(); }
	};
	
	terry.flags["Saved"] = TerryFlags.Saved.Saved;
	
	Text.Clear();
	Text.Add("<i>“Halt! What business do you have here?”</i> You are quickly stopped by a guard as you approach the entrance to the jail. Remembering the letter that Rumi gave you, you fish through your belongings and retrieve it. Adopting your best officious expression, you present it to the guard on duty.", parse);
	Text.NL();
	Text.Add("The guard examines the seal of the letter before breaking it open and reading its contents. Once finished, he returns the letter and mutters: <i>“Lucky mutt...”</i>", parse);
	Text.NL();
	if(party.InParty(miranda)) {
		Text.Add("You tell Miranda to hold back a bit. You don’t think it’d be a good idea to have her meet the thief right now.", parse);
		Text.NL();
	}
	
	Text.Add("He procures a keychain from his belt, and unlocks the door leading to the cells. <i>“Follow me.”</i>", parse);
	Text.NL();
	Text.Add("The two of you walk toward the back of the jail, passing through two more doors before arriving at an empty area where the guards lead you to a cell. Inside, you see the fox thief, resting on his cot and looking at the roof. <i>“Hey mutt! Today’s your lucky day. Your ticket out of here has arrived.”</i>", parse);
	Text.NL();
	Text.Add("The fox chuckles at that. <i>“Yeah right, ain’t I lucky...”</i>", parse);
	Text.NL();
	Text.Add("Turning to you, the guard says, <i>“I’ll leave you two to socialize while I fetch his belongings.”</i> Having said that, he promptly turns on his heels and walks away.", parse);
	Text.NL();
	Text.Add("Stretching languidly, he moves to get himself up. <i>“Alright, let’s meet my bene-”</i> as soon as his eyes set on you, he stops dead in his tracks. <i>“You!”</i>", parse);
	Text.NL();
	Text.Add("So, he remembers you then?", parse);
	Text.NL();
	if(terry.flags["Met"] == TerryFlags.Met.LetHer) {
		Text.Add("<i>“You let that dog rape me! What’re you here for? Want to finish what you started?”</i>", parse);
		Text.NL();
		Text.Add("You tell him that, actually, no; you came to see him released.", parse);
		Text.NL();
		Text.Add("<i>“Oh, I get it. You’re going to let that dog have another go at me! What are you? Some kind of sick voyeur?”</i>", parse);
		Text.NL();
		Text.Add("Miranda isn't even here, you inform him. This is a bail-out, pure and simple.", parse);
	}
	else if(terry.flags["Met"] == TerryFlags.Met.StopHer) {
		Text.Add("<i>“Why are you releasing me? Weren’t you working with that dog to have me arrested?”</i>", parse);
		Text.NL();
		Text.Add("You admit that's true, but circumstances have changed.", parse);
		Text.NL();
		Text.Add("<i>“What do you mean, circumstances have changed? That dog… oh no, she’s not here is she?”</i>", parse);
		Text.NL();
		Text.Add("You assure him that Miranda isn't here. It's just you and him now.", parse);
	}
	else {
		Text.Add("<i>“You were going to rape me along with that dog! Why the hell are you here? Came to finish what you started?”</i>", parse);
		Text.NL();
		Text.Add("You reply that your actual intention was to save his life, but if he wants to pick up where the two of you were left off...", parse);
		Text.NL();
		Text.Add("<i>“Hell no! Keep your hands to yourself, I’m not going!”</i>", parse);
		Text.NL();
		Text.Add("So, he'd rather wait here for the executioner's axe? Or noose, or whatever it is they have planned for him? ", parse);
		Text.NL();
		Text.Add("<i>“No, but-”</i>", parse);
		Text.NL();
		Text.Add("Before he can get any further, you interrupt him. You're not going to make any excuses for what happened at the warehouse, but right now, all you intend is to get him out of jail and save his life. He can either trust you and keep his neck, or stay here and be executed.", parse);
	}
	Text.NL();
	Text.Add("The fox looks at you with distrust for a few moments, but then he visibly calms down. <i>“I suppose I don’t have a choice.”</i>", parse);
	Text.NL();
	Text.Add("That’s better. That wasn’t so difficult now, was it?", parse);
	Text.NL();
	Text.Add("<i>“They’re revoking the death sentence? What’s the catch?”</i> he asks.", parse);
	Text.NL();
	Text.Add("As part of the terms for his release, he needs to wear this, you inform him as you show him the collar. It has an enchantment in it that will prevent him from disobeying any command you give him, as well as preventing him from escaping. He needs to wear this before you can take him out of the cell. Having explained it, you hold it out to him and instruct him to fasten it around his neck.", parse);
	Text.NL();
	Text.Add("The fox thief takes the collar, examining it in his hands. He looks at you, then back at the collar, obviously unsure if this is actually better than a death sentence. Finally with a sigh, he acquiesces and puts the collar around his neck. <i>“Tch, out of the pan and into the fire...”</i> he mumbles as he connects the iron tips, holding the collar around his neck. It looks a bit loose… maybe if he tried he could get it off? Still, you resolve to trust the twins’ word.", parse);
	Text.NL();
	Text.Add("You promptly say the word ‘Featherfall’, as you were instructed before.", parse);
	Text.NL();
	Text.Add("The collar emanates a faint pink glow, tightening up until it’s snug against the fox’s neck. He tries to grip the collar, scared that it might tighten enough to strangle him, but he’s ultimately unable to stop the magic from running its course. He moves to undo the binding, but the metallic tips refuse to let go. Seems like the enchantment worked like magic. <i>“There, it’s on,”</i> he says with disdain. <i>“I suppose you want me to call you [masterMistress] now?”</i>", parse);
	Text.NL();
	Text.Add("You think the matter over, and then tell him that he doesn’t have to. You might change your mind later, but for now, [playername] is all you expect him to call you.", parse);
	Text.NL();
	Text.Add("The guard returns, carrying with him a bag containing the thief’s stuff. <i>Here.</i> He hands it to you. <i>“Are you done yet? Can I open the cell?”</i>", parse);
	Text.NL();
	Text.Add("Yes, you reply. The guardsman takes a key and twists it in the lock, opening the door. Without so much as a word, he takes the fox by the shoulder and shoves him out of the cell and in your direction. <i>“He’s all yours, now get this mangy mutt out of my jail. Gonna have to kill all the fleas he left behind.”</i>", parse);
	Text.NL();
	Text.Add("<i>“Don’t worry, I’m pretty sure your stench will do the job just fine,”</i> he quips back, pinching his nose.", parse);
	Text.NL();
	Text.Add("Seeing the guard's angry expression, you tell your new... recruit... to follow you, before turning and heading for the jail's exit.", parse);
	Text.Flush();
	
	TimeStep({minute: 30});
	
	Gui.NextPrompt(function() {
		Text.Clear();
		
		party.location = world.loc.Rigard.Plaza;
		
		Text.Add("Once you’re back in the city, the fox pulls on your [armorTopDesc]. <i>“Hey, do you mind if I duck out in an alleyway to get dressed? These prison clothes are all itchy,”</i> he scratches his arm for emphasis.", parse);
		Text.NL();
		Text.Add("After a moment's thought, you tell him that'd be fine, privately trusting that the collar's magic will work as you were promised.", parse);
		Text.NL();
		Text.Add("<i>“Some privacy?”</i> he asks with a raised brow.", parse);
		Text.NL();
		Text.Add("A little less certainly, you nod your head and turn around, pointedly looking away from the effeminate fox-morph.", parse);
		Text.NL();
		Text.Add("You hear the sounds of ruffling cloth for a few moments before he says, <i>“Done.”</i>", parse);
		Text.NL();
		Text.Add("Turning around, you take a good long look at the newly re-garbed fox. He's traded his former barmaid's dress and leather armor for a simple but good quality tunic and pants, both a little on the tight side. A leather cuirass drapes over his torso, and it looks like the guard even gave him back his chest holster, whilst his paw-like feet have been squeezed into knee-high leather boots.", parse);
		Text.NL();
		Text.Add("<i>“This isn’t as good as my previous gear, but it’ll have to do. Bet the bastard didn’t even look to see if it was the right bag… thank Aria it fits.”</i> He kicks the bag and the prison clothes into a corner. <i>“Thanks, chief.”</i>", parse);
		Text.NL();
		Text.Add("You inform him that it's no problem. Better he wasn't walking around in a prisoner's outfit anyway.", parse);
		Text.NL();
		Text.Add("As the two of you continue to walk in silence, he moves to walk beside you. <i>“Y’know, I didn’t really thank you for saving my neck. ", parse);
		if(terry.flags["Met"] == TerryFlags.Met.StopHer)
			Text.Add("And for protecting me from that dog. ", parse);
		Text.Add("They say you should never look a gift horse in the mouth, but after our little encounter in the warehouse, you gotta understand I had my doubts.”</i>", parse);
		Text.NL();
		Text.Add("You tell him that's understandable.", parse);
		Text.NL();
		Text.Add("<i>“By the way, my name is Theodore, but everyone just calls me Terry. Thanks for rescuing me, [playername].”</i>", parse);
		Text.NL();
		Text.Add("Terry, huh? Well, it's no problem, you inform him; you couldn't let him get killed for stealing from the likes of Krawitz.", parse);
		Text.NL();
		Text.Add("<i>“So… out of curiosity, what exactly happens if I disobey you or try to run?”</i> he asks, tail swaying behind.", parse);
		Text.NL();
		parse["j"] = GAME().jeanne.flags["Met"] != 0 ? "Jeanne, " : "";
		Text.Add("You consider it for a moment, then finally decide to tell him the truth, admitting you don't really know. But you know the collar was made by [j]the Royal Court Mage, so he can probably figure it out himself.", parse);
		Text.NL();
		Text.Add("<i>“I see… so I guess I’m at your mercy. Lead away then?”</i>", parse);
		
		terry.topArmorSlot = ArmorItems.LeatherChest;
		terry.botArmorSlot = ArmorItems.LeatherPants;
		terry.Equip();
		terry.RestFull();
		
		terry.name = "Terry";
		terry.avatar.combat = Images.terry_c;
		terry.uniqueName = null;
		terry.monsterName = null;
		terry.MonsterName = null;
		party.SwitchIn(terry);
		
		if(party.InParty(miranda)) {
			var dom = player.SubDom() - miranda.SubDom();
			
			Text.NL();
			Text.Add("Terry looks a bit nervous as you set out, constantly looking around as if he was being watched. His fears turn out to be justified, as Miranda steps out from a side street, a wide grin on her face.", parse);
			Text.NL();
			Text.Add("<i>“So the little thief is roaming the streets again, guess that means you are fair game!”</i> You tell her to stop teasing Terry, and introduce him to her.", parse);
			Text.NL();
			Text.Add("<i>“W-w-what?! She’s with you? B-but you said-!”</i> Terry swivels this way and that, desperately looking for a way to escape. You tell him to calm down, and remind him of the collar. For a moment, the effeminate fox looks like he’s going to chance it, but then he lowers his head, shuffling to stand behind you.", parse);
			Text.NL();
			Text.Add("You explain that Miranda is traveling together with you, and he’ll just have to deal with that.", parse);
			Text.NL();
			Text.Add("<i>“You’re asking too much! I’m not going to travel with this stupid bitch!”</i> he protests.", parse);
			Text.NL();
			Text.Add("Miranda cracks her knuckles, she looks like she’s about to teach him a lesson, but you stop her. You inform Terry that it’s either this or death row, so the faster he gets used to this, the better. Likewise, you tell Miranda not to provoke Terry. The last thing you need is infighting.", parse);
			Text.NL();
			parse["mastermistress"] = dom > 50 ? player.mfTrue(" master", " mistress") : "";
			Text.Add("<i>“Whatever you say…[mastermistress],”</i> Miranda replies. Terry just glares at her, keeping his distance.", parse);
			Text.NL();
			Text.Add("You’re just about to get going when Miranda stops you. <i>“You know, [playername], I think there’s a perfect way for us to settle our differences. How about you let me finish what we started back then? In the warehouse?”</i> she asks with an insidious smile.", parse);
			Text.NL();
			Text.Add("<i>“Oh, no! No way! You gotta be kidding me! Listen here, if you-”</i> You swiftly shush him by telling him to be silent. You need to consider this. On one hand… maybe doing this will put an end to their animosity, though you admit that seems unlikely. On the other… you’re pretty sure your relationship with the fox thief is going to take a hit if you let Miranda have her way.", parse);
			Text.Flush();
			
			//[Let her][Nope]
			var options = new Array();
			options.push({ nameStr : "Let her",
				func : function() {
					Text.Clear();
					Text.Add("Terry’s ears droop as you watch the fox swallow what looks like lead.", parse);
					Text.NL();
					Text.Add("<i>“Sweet, let’s go somewhere more private, shall we?”</i> she suggests, looking at both you and Terry.", parse);
					Text.NL();
					Text.Add("The three of you duck out in a nearby alleyway…", parse);
					Text.Flush();
					
					miranda.relation.IncreaseStat(100, 5);
					terry.relation.DecreaseStat(-100, 5);
					
					// TODO: Repeatable YES
				}, enabled : true,
				tooltip : "You’re pretty sure Miranda will appreciate this, unlike Terry."
			});
			options.push({ nameStr : "Nope",
				func : function() {
					Text.Clear();
					Text.Add("Miranda groans. ", parse);
					if(dom > 50) {
						parse["mastermistress"] = player.mfTrue("master", "mistress");
						Text.Add("<i>“As you wish, [mastermistress],”</i> she says, rolling her eyes.", parse);
					}
					else
						Text.Add("<i>“After all the hell this little bastard’s put me through, you’re not even going to let me have a shot at him? Bah! Do whatever you want!”</i> Miranda exclaims dismissively.", parse);
					Text.NL();
					Text.Add("Terry breathes a sigh of relief, and you’re pretty sure you caught the faintest hint of a smile when he glanced at you just now.", parse);
					Text.NL();
					Text.Add("You motion for them to follow you as you continue on your way.", parse);
					Text.Flush();
					
					terry.relation.IncreaseStat(100, 3);
					miranda.relation.DecreaseStat(-100, 10);
					
					Gui.NextPrompt();
				}, enabled : true,
				tooltip : "It wouldn’t be very nice of you to submit the fox thief to this after he’s just gotten out of the death row."
			});
			Gui.SetButtonsFromList(options, false, null);
			
			terry.relation.DecreaseStat(-100, 5);
		}
		else {
			Text.Flush();
			
			Gui.NextPrompt();
		}
	});
}

TerryScenes.TalkPrompt = function() {
	let terry = GAME().terry;

	var parse : any = {
		foxvixen : terry.mfPronoun("fox", "vixen"),
		HeShe   : terry.HeShe(),
		heshe   : terry.heshe(),
		HisHer  : terry.HisHer(),
		hisher  : terry.hisher(),
		himher  : terry.himher(),
		hishers : terry.hishers()
	};

	var options = new Array();
	options.push({ nameStr : "Feelings",
		func : TerryScenes.TalkFeelings, enabled : true,
		tooltip : Text.Parse("Ask your pet [foxvixen] how [heshe]’s doing.", parse)
	});
	//TODO
	options.push({ nameStr : "Pronoun",
		func : TerryScenes.TalkPronoun, enabled : true,
		tooltip : terry.PronounGender() == Gender.male ? "Terry looks too much like a girl, you should address 'her' as such from now on." : "In the end, Terry is a guy, no matter how girly she looks. You should address 'him' as such."
	});
	options.push({ nameStr : "Past",
		func : TerryScenes.TalkPast, enabled : true,
		tooltip : Text.Parse("Ask Terry to tell you a bit about [himher]self.", parse)
	});
	options.push({ nameStr : "Compliment",
		func : TerryScenes.TalkCompliment, enabled : true,
		tooltip : Text.Parse("Let the [foxvixen] know how attractive [heshe] is.", parse)
	});

	Gui.SetButtonsFromList(options, true, terry.Interact);
}

TerryScenes.TalkFeelings = function() {
	let terry = GAME().terry;
	let player = GAME().player;

	var parse : any = {
		playername: player.name,
		foxvixen : terry.mfPronoun("fox", "vixen"),
		breasts : function() { return terry.FirstBreastRow().Short(); },
		breastsDesc : function() { return player.FirstBreastRow().Short(); }
	};
	parse = terry.ParserPronouns(parse);

	Text.Clear();
	if(terry.LustLevel() >= 0.5) {
		if(terry.Relation() >= 60) {
			Text.Add("<i>“I’m feeling pretty horny,”</i> [heshe] says, sizing you up. ", parse);
			if(terry.Slut() >= 60) {
				parse["b"] = terry.Cup() >= TerryFlags.Breasts.Bcup ? Text.Parse(" against [hisher] [breasts]", parse) : "";
				Text.Add("<i>“I just can’t get you out of my head, [playername].”</i> [HeShe] walks up to you, gently stroking your arm. <i>“Can we go have sex?”</i> [heshe] asks, ears to the sides and tail wagging slowly as [heshe] sidles up to you, hugging your arm[b]. <i>“I need you...”</i>", parse);
			}
			else if(terry.Slut() >= 30) {
				Text.Add("<i>“How about a quickie? I mean, not that I absolutely <b>need</b> one,”</i> [heshe] immediately adds. <i>“I’d just feel a bit better if we did… just a bit...”</i> [HeShe] looks at you expectantly.", parse);
			}
			else {
				Text.Add("[HeShe] looks a bit nervous. <i>“I was wondering...”</i> [heshe] trails off. You place a hand on [hisher] shoulder and smile, waiting for [himher] to finish. <i>“Maybe we could, if you’re willing, maybe do something about my arousal?”</i>", parse);
				Text.NL();
				Text.Add("Sex, [heshe] means.", parse);
				Text.NL();
				Text.Add("<i>“Er, yes,”</i> the [foxvixen] smiles nervously.", parse);
			}
			Text.Flush();
			
			var options = new Array();
			options.push({ nameStr : "Yes",
				func : function() {
					Text.Clear();
					Text.Add("You sweep Terry into your arms, pulling the [foxvixen] into a passionate kiss. [HisHer] chest presses against yours, ", parse);
					if(terry.FirstBreastRow().Size() > 3)
						Text.Add("[hisher] [breasts] squishing pleasantly against your own [breastsDesc], ", parse);
					Text.Add("and [heshe] moans softly in surprise before eagerly returning your kiss. Terry’s eyes sink shut in rapture, arms moving to fold themselves possessively around your waist. The [foxvixen]’s tail wags in delight over [hisher] shapely buttocks, enticing you to reach down and give it a stroke. When you release the kiss, [heshe] pants for breath, and you suggest moving to a more private spot for this.", parse);
					Text.NL();
					if(terry.Slut() >= 60)
						Text.Add("<i>“Why? Let ‘em look, for all I care,”</i> [heshe] giggles mischievously, snuggling up against your chest. <i>“But if that’s what you want...”</i>", parse);
					else if(terry.Slut() >= 30)
						Text.Add("<i>“Well...”</i> [heshe] drawls thoughtfully. <i>“I’d be lying if I said I was totally against the idea of doing it here... but I definitely rather have you all to myself. Lead on.”</i>", parse);
					else
						Text.Add("Terry shivers in a mixture of arousal and embarrassment. <i>“Oh, yes, certainly,”</i> [heshe] agrees, [hisher] voice a whisper of desire.", parse);
					Text.NL();
					Text.Add("You waste little time further in leading Terry somewhere more comfortable, and out of sight of prying eyes.", parse);
					Text.NL();
					
					terry.relation.IncreaseStat(70, 1);

					Text.Flush();
					TerryScenes.SexPrompt(terry.Interact);
				}, enabled : true,
				tooltip : Text.Parse("Well, if [heshe] is in the mood, no sense wasting it, right?", parse)
			});
			options.push({ nameStr : "No",
				func : function() {
					Text.Clear();
					Text.Add("<i>“Oh, okay,”</i> [heshe] says, looking a bit disappointed.", parse);
					Text.Flush();
					TerryScenes.TalkPrompt();
				}, enabled : true,
				tooltip : "You’re not in the mood for sex right now."
			});
			Gui.SetButtonsFromList(options, false, null);
			return;
		}
		else if(terry.Relation() >= 30) {
			Text.Add("<i>“I’m… feeling a bit giddy. Just a bit though!”</i> [heshe] blurts out.", parse);
			if(terry.Slut() >= 60)
				Text.Add(" <i>“Perhaps I’d feel a bit better if we could fool around a bit.”</i>", parse);
			else if(terry.Slut() >= 30)
				Text.Add(" <i>“I wouldn’t say no if you wanted to… do something.”</i>", parse);
			Text.NL();
			Text.Add("Looks like your pet is opening up to you more, if [heshe]’s willing to admit to wanting you. Maybe you should help [himher] get some release...", parse);
			Text.Flush();
			
			var options = new Array();
			options.push({ nameStr : "Yes",
				func : function() {
					Text.Clear();
					Text.Add("You draw Terry closer and hug [himher] gently, one hand brushing in soft, even strokes down [hisher] back and along the fluffy tail swinging above [hisher] shapely ass. If that’s what [heshe] needs, you’re happy to help, but first, you should head somewhere a little more private.", parse);
					Text.NL();
					Text.Add("<i>“Okay, umm… lead the way,”</i> [heshe] smiles nervously.", parse);
					Text.NL();
					Text.Add("With a reassuring smile, you release [himher] from your grip and take [hisher] hand before gently leading [himher] away.", parse);
					Text.NL();
					Text.Add("", parse);
					Text.NL();
					
					terry.relation.IncreaseStat(40, 1);

					Text.Flush();
					TerryScenes.SexPrompt(terry.Interact);
				}, enabled : true,
				tooltip : Text.Parse("Be a shame to waste it if your pet [foxvixen] is in the mood for some sex.", parse)
			});
			options.push({ nameStr : "No",
				func : function() {
					Text.Clear();
					Text.Add("<i>“Of course, there are more important things to do anyway.”</i> You note the slight disappointment in [hisher] tone.", parse);
					Text.Flush();
					TerryScenes.TalkPrompt();
				}, enabled : true,
				tooltip : Text.Parse("You’re not really in the mood yourself, though, so [heshe]’ll just have to take care of it [himher]self.", parse)
			});
			Gui.SetButtonsFromList(options, false, null);
			
			return;
		}
		else {
			Text.Add("<i>“I-I’m fine,”</i> [heshe] says, looking quite flustered.", parse);
			Text.NL();
			Text.Add("The [foxvixen] certainly doesn’t look fine. In fact, if you’re any judge, [heshe]’s really in need of a good fuck; [heshe] looks awfully pent up. Of course, [heshe] won’t admit that to you; you’ll need to make the first move about settling it.", parse);
		}
	}
	else if(terry.HPLevel() <= 0.3)
		Text.Add("<i>“I’m exhausted!”</i> [heshe] exclaims. <i>“We should find somewhere safe and take a moment to catch our breath.”</i>", parse);
	else if(terry.HPLevel() <= 0.6)
		Text.Add("<i>“I’m a bit tired, but still hanging in there,”</i> [heshe] smiles softly. <i>“I wouldn’t say no to getting some rest, though.”</i>", parse);
	else
		Text.Add("<i>“I’m fine, thanks for asking,”</i> [heshe] smiles, tail wagging slowly behind.", parse);
	Text.Flush();
	
	terry.relation.IncreaseStat(20, 1);
	
	TerryScenes.TalkPrompt();
}


TerryScenes.TalkPronoun = function() {
	let terry = GAME().terry;
	let player = GAME().player;

	var parse : any = {
		breasts : function() {
			var desc = terry.FirstBreastRow().Desc();
			return desc.cup + "s";
		},
		foxvixen : terry.mfPronoun("fox", "vixen"),
		cock    : function() { return terry.MultiCockDesc(); },
		HeShe   : function() { return terry.HeShe(); },
		heshe   : function() { return terry.heshe(); },
		HisHer  : function() { return terry.HisHer(); },
		hisher  : function() { return terry.hisher(); },
		himher  : function() { return terry.himher(); },
		hishers : function() { return terry.hishers(); },
		girlguy : function() { return terry.mfPronoun("guy", "girl"); }
	};
	
	Text.Clear();
	if(terry.PronounGender() == Gender.male) {
		Text.Add("Shaking your head, you tell Terry that you just can’t really think of him as being a guy. ", parse);
		if(terry.FirstBreastRow().Size() < 3)
			Text.Add("It doesn’t matter that he’s flat up top. ", parse);
		else
			Text.Add("The fact he has [breasts] certainly doesn’t help the matter. ", parse);
		if(terry.FirstCock() && terry.FirstVag())
			Text.Add("The cock he has to go with his pussy doesn’t matter.", parse);
		else if(terry.FirstCock())
			Text.Add("And it doesn’t matter that he has a cock hanging between his legs.", parse);
		else //vag
			Text.Add("Especially when you consider that what lies between his legs is a pretty little pussy.", parse);
		Text.Add(" He’s just far too pretty, and his build is just too curvy. No matter what angle you look at him from, there’s just no way this feminine figure could be a guy", parse);
		if(terry.FirstVag() && terry.FirstBreastRow().Size() >= 3)
			Text.Add(" - he even has all the proper parts", parse);
		Text.Add(". From now on, you’re going to start addressing him as such. It’ll be less confusing if you didn’t have to keep calling ‘him’ a guy all the time.", parse);
	}
	else {
		Text.Add("With a shake of your head, you confess to Terry that you just can’t really think of her as a girl. ", parse);
		if(terry.FirstBreastRow().Size() >= 3)
			Text.Add("It doesn’t matter how big her breasts are. ", parse);
		else
			Text.Add("That flat chest of hers just doesn’t present a very feminine image. ", parse);
		if(terry.FirstCock() && terry.FirstVag())
			Text.Add("And that cock she has right above her pussy clearly doesn’t look right on a girl.", parse);
		else if(terry.FirstCock())
			Text.Add("And the [cock] swinging between her legs certainly puts to rest any debate toward her apparent gender.", parse);
		else //vag
			Text.Add("Even if she doesn’t have a cock anymore, there’s just no hiding it.", parse);
		Text.Add(" She was born a guy, you know she was born a guy, and you can’t lie to yourself anymore. Terry is male, and he has a right to be addressed as such, so that’s what you’ll be doing from now on.", parse);
	}
	Text.NL();
	
	if(terry.PronounGender() == Gender.male)
		terry.flags["PrefGender"] = Gender.female;
	else
		terry.flags["PrefGender"] = Gender.male;
	
	if(terry.Relation() >= 60) {
		Text.Add("<i>“I don’t know if I’m really comfortable with you addressing me as a [girlguy]...”</i> [heshe] says, tapping [hisher] chin.", parse);
		Text.NL();
		Text.Add("Grinning at the [foxvixen]’s quip, you close the distance and give [himher] a playful peck right on [hisher] upturned lips, lifting off after a few seconds to see [hisher] response.", parse);
		Text.NL();
		Text.Add("<i>“Okay… nice try, but you’re going to have to do better than that if you hope to con-”</i> you interrupt [himher] with another kiss, and another. It’s not long before you’re deeply entangled in each other’s arms, passionately making out. By the time you break away, Terry’s panting.", parse);
		Text.NL();
		Text.Add("<i>“I’m convinced,”</i> [heshe] grins, tail wagging as [heshe] licks [hisher] lips.", parse);
		
		terry.AddLustFraction(0.2);
		player.AddLustFraction(0.2);
	}
	else if(terry.Relation() >= 30) {
		Text.Add("<i>“I was kinda getting used to the way you were addressing me, but if you really consider me a [girlguy], go ahead. I spent the longest time trying to assert myself as a guy. Lately, I don’t think it really matters anymore,”</i> [heshe] smiles, tail wagging slowly behind.", parse);
	}
	else {
		Text.Add("<i>“Hearing you say that kinda makes me pissed, but… it’s not like I can stop you, so suit yourself.”</i>", parse);
		Text.NL();
		Text.Add("[HeShe] doesn’t look very angry to you...", parse);
	}
	Text.Flush();
	
	TerryScenes.TalkPrompt();
}

TerryScenes.TalkPast = function(force : boolean) {
	let terry = GAME().terry;
	let player = GAME().player;

	var parse : any = {
		foxvixen : terry.mfPronoun("fox", "vixen"),
		mastermistress : player.mfTrue("master", "mistress"),
		playername : player.name
	};
	
	parse = terry.ParserPronouns(parse);
	
	var max = terry.flags["maxPast"];
	var cur = terry.flags["rotPast"];
	
	var scenes = [];
	
	var BlockScene = function() {
		Text.Add("The [foxvixen] looks like [heshe]’s contemplating what to tell you. Finally, [heshe] says:", parse);
		Text.NL();
		Text.Add("<i>“...Listen, I don’t really feel comfortable talking about more just yet. I… well, can we do this later?”</i> [heshe] asks.", parse);
		Text.NL();
		Text.Add("You could always order [himher] to tell you anyway, but that would be counterproductive, so you quietly agree.", parse);
	}
	
	// Long
	scenes.push(function() {
		Text.Add("<i>“I was born in the slums of Rigard. My mother was a hooker and my father was a thief. One heavy night of drinking and partying, and I was conceived.”</i>", parse);
		Text.NL();
		Text.Add("<i>“My father told me that when he heard the news, he was surprisingly joyous. He and mom never married, but they started living together all the same. Who said someone needs to be married to have a family together?”</i>", parse);
		Text.NL();
		Text.Add("<i>“To be honest, I don’t remember my mother that well. I was just a baby when she died. Some trouble with morphs here in Rigard... I don’t recall the exact details, but you can see that the bigotry still runs strong.”</i> Terry sighs.", parse);
		Text.NL();
		Text.Add("You nod in silent understanding.", parse);
		Text.NL();
		Text.Add("<i>“Anyway, my parents ran. Mom wasn’t so quick, but luckily daddy was. He took me away and we escaped to the Free Cities, where I spent most of my childhood.”</i>", parse);
		Text.NL();
		Text.Add("Terry takes a deep breath. <i>“I suppose that’s enough for now. Can we talk, or do, something else for a bit?”</i>", parse);
		Text.NL();
		Text.Add("Sure, you tell [himher].", parse);
		
		Text.Flush();
		TerryScenes.TalkPrompt();
	});
	scenes.push(function() {
		if(terry.Relation() < 10) {
			BlockScene();
			return true;
		}
		
		Text.Add("<i>“My dad was surprisingly caring when it came down to raising me, although he did have some bad habits.”</i>", parse);
		Text.NL();
		Text.Add("Oh? Like what?", parse);
		Text.NL();
		Text.Add("<i>“He was an alcoholic. Can’t say I blame him. War broke out and he lost mom. Sometimes, when he was really drunk, he’d mistake me for her.”</i>", parse);
		Text.NL();
		Text.Add("He mistook Terry for [hisher] mother?", parse);
		Text.NL();
		Text.Add("<i>“Yeah. Well, I look pretty girly to begin with and booze kinda blurs things. He never touched me, just kept saying stuff to me. It was kinda sad. I could tell that he really loved mom... I never bothered correcting him either. Sometimes, I’d just pretend to be a woman and reply in kind.”</i>", parse);
		Text.NL();
		Text.Add("That’s… pretty sad, you admit.", parse);
		Text.NL();
		Text.Add("<i>“Yeah… can we leave the rest for later?”</i>", parse);
		Text.NL();
		Text.Add("Sure.", parse);
		
		if(max < 1)
			terry.relation.IncreaseStat(100, 1);
		
		TerryScenes.TalkPrompt();
	});
	scenes.push(function() {
		if(terry.Relation() < 20) {
			BlockScene();
			return true;
		}
		
		Text.Add("<i>“I told how my father was a thief, right?”</i>", parse);
		Text.NL();
		Text.Add("Yes, you recall that.", parse);
		Text.NL();
		Text.Add("<i>“Whenever he was sober enough, he thought he’d train me. Said it always paid to know a thing or two about the ‘finer arts’, his words. It turns out I was pretty good at it too. Of course, the fact that I looked pretty darn innocent and meek also helped my cause.”</i>", parse);
		Text.NL();
		Text.Add("<i>“Father worked at the docks, loading and unloading ships... and if something went missing? No skin off his back. I mean, things go missing all the time during the busy hours. Pretty sure my dad wasn’t the only one relieving a few of the dirty rich merchants of some of their precious cargo.”</i>", parse);
		Text.NL();
		Text.Add("<i>“Those were the good days, but they only lasted a couple years. Dad… well, he didn’t last long.”</i> Terry’s visage saddens for a moment.", parse);
		Text.NL();
		Text.Add("You place a comforting hand on [hisher] shoulder.", parse);
		Text.NL();
		Text.Add("[HeShe] looks at you and brightens up a little. <i>“Thanks… umm, anyway. Guess we’ll pick up some other time?”</i>", parse);
		Text.NL();
		Text.Add("Sounds good to you.", parse);
		
		if(max < 2)
			terry.relation.IncreaseStat(100, 1);
	});
	scenes.push(function() {
		if(terry.Relation() < 30) {
			BlockScene();
			return true;
		}
		
		Text.Add("<i>“Last time, I mentioned my father died, right?”</i>", parse);
		Text.NL();
		Text.Add("You nod in confirmation.", parse);
		Text.NL();
		Text.Add("<i>“Turns out he was ill. He didn’t say anything, but eventually it was clear. He wasn’t going to make it. I… cried a lot back then.”</i> Terry’s ears droop.", parse);
		Text.NL();
		Text.Add("You scoop the [foxvixen] up into your arms and embrace [himher]. Eventually, [heshe] breaks the hug, looking at least a bit better.", parse);
		Text.NL();
		Text.Add("<i>“Anyways, I was all alone, and I had to fend for myself. Daddy’s skills came in pretty handy, but I was pretty scrawny by comparison. Working at the docks? No dice.”</i> [HeShe] shakes [hisher] head.", parse);
		Text.NL();
		Text.Add("<i>“Instead, I managed to land a job at the local inn. It wasn’t as safe as the docks, but at least I could pick my marks - also, my fingers were light enough that few even noticed missing goods. I didn’t steal anything major, after all.”</i> A smile breaks on [hisher] muzzle.", parse);
		Text.NL();
		Text.Add("<i>“I was pretty naive back then - and pretty darn careless. That’s how I met my master, actually. But that’s a tale for another time.”</i>", parse);
		
		if(max < 3)
			terry.relation.IncreaseStat(100, 1);
	});
	scenes.push(function() {
		if(terry.Relation() < 40) {
			BlockScene();
			return true;
		}
		
		Text.Add("<i>“I’ve always been pretty good when picking pockets or stealthily nabbing a thing or two from a careless traveler, but nothing could’ve prepared me for my master. Not ‘master’ like you, [playername]. I mean… I guess ‘mentor’ would be a more appropriate term.”</i>", parse);
		Text.NL();
		Text.Add("Well, trying to rob a thief is one way to get them to teach you, you suppose. How did it happen?", parse);
		Text.NL();
		Text.Add("<i>“He looked pretty well off, and he was distracted messing with a strange contraption, so I thought that I should help myself to his rather loaded bag. I pickpocketed the key off him and snuck inside his room while he was out, opened his suitcase and 'BAM!', an alarm rang out,”</i> Terry says, punching [hisher] open palm for effect.", parse);
		Text.NL();
		Text.Add("<i>“He caught me in an instant, I thought I was done for, but to my surprise, he smiled and turned the alarm off. Told me I had talent, he hadn’t even noticed his key was gone. Instead of ratting me out, he offered to train me. Teach me the finer points of being a thief. Not a two-bit one like I was, but a pro thief.”</i>", parse);
		Text.NL();
		Text.Add("<i>“Since I really didn’t want to deal with the authorities, I accepted. Initially, that was my motivation, but as time passed and he trained me, I grew to like him. That, however, is a tale for another time. Maybe later?”</i>", parse);
		Text.NL();
		Text.Add("You nod your head in understanding, smiling softly before you thank [himher] for [hisher] time.", parse);
		
		if(max < 4)
			terry.relation.IncreaseStat(100, 1);
	});
	scenes.push(function() {
		if(terry.Relation() < 45) {
			BlockScene();
			return true;
		}
		
		Text.Add("<i>“He was a gray fox, and he told me that his name was Thorn. Probably not his real name, but it’s what I called him. I did give him my real name, Theodore, but he said that name was a mouthful, so he stuck to calling me by the nickname folks at the inn gave me, Terry.”</i>", parse);
		Text.NL();
		Text.Add("Honestly, [heshe] feels more like a ‘Terry’ than a ‘Theodore’ anyway, in your opinion.", parse);
		Text.NL();
		Text.Add("<i>“Training was tough; he prepared a wide assortment of challenges. I had to pass each of them with minimal instruction and keep practicing. He made me do various things, like picking the locks of several different lockboxes, solving riddles, working puzzles...”</i> Terry smiles softly. <i>“Now that I think back on it, I never did figure out the last one. Got around it by using a micro-explosive to bust the lock,”</i> [heshe] grins at [hisher] own ingenuity.", parse);
		Text.NL();
		Text.Add("Well... that’s not exactly what you’d think of as ‘thiefly behavior’, but you have to confess, it sounds effective.", parse);
		Text.NL();
		Text.Add("<i>“Anyways, the most important thing he taught me was how to build all sorts of gadgets. Smoke bombs, trick mirrors, magic baubles, all kinds of neat things. The same ones I offered to make you. That’s what most of my training was dedicated to.”</i>", parse);
		Text.NL();
		Text.Add("<i>“He did use me sometimes, had me dress up elegantly and go in-town to scout some info on possible marks. We only went after the dirty-rich. And Thorn, well Thorn had a special way of making his heists.”</i>", parse);
		Text.NL();
		Text.Add("Oh? What did he do that was so special?", parse);
		Text.NL();
		Text.Add("<i>“He would dress up in some colorful clothes, rob the mark blind, then leave a calling card. The masked fox, he would call himself. It was quite funny seeing the reaction of the local authorities as we snuck away,”</i> Terry laughs.", parse);
		Text.NL();
		Text.Add("<i>“Life was good again, and it was so for a few years. I didn’t go into heists myself, just helped Thorn with info and prepared gadgets. He said I was pretty good as a thief already, and all I needed was to complement my skills, so that’s what I focused on. Can’t say I loved wearing a few of those frilly dresses though...”</i>", parse);
		Text.NL();
		Text.Add("Dresses... Thorn made [himher] dress up as a girl? You consider what you’ve been told for a moment, and then ask if Thorn was just using the old ‘honeypot trick’, or if he had ulterior motives for it.", parse);
		Text.NL();
		Text.Add("<i>“It was easier to collect info, plus people were less likely to suspect a vixen of a crime committed by a fox. You can’t believe the things people will babble about to a pretty face and some giggles. I played the part well - what with me looking all girly and everything...”</i>", parse);
		Text.NL();
		Text.Add("You can’t help but nod your head and agree; [heshe] certainly could play the part of the vixen well. You never would have guessed what was really under that waitress getup until you caught ‘her’ back then.", parse);
		Text.NL();
		if(terry.FirstVag() && !terry.FirstCock()) {
			Text.Add("You wonder what Thorn would think of his apprentice having become a vixen for real?", parse);
			if(terry.Cup() <= TerryFlags.Breasts.Acup)
				Text.Add(" At least - you add, looking at [hisher] flat chest - a vixen where it matters?", parse);
			Text.NL();
		}
		if(terry.HorseCock()) {
			Text.Add("You wonder what Thorn would say if he saw what kind of heat Terry’s packing. ", parse);
			if(terry.FirstVag() && terry.Cup() >= TerryFlags.Breasts.Acup)
				Text.Add("Despite [himher] having all the bits necessary to pass as a woman, [hisher]", parse);
			else if(terry.FirstVag() || terry.Cup() >= TerryFlags.Breasts.Acup)
				Text.Add("Despite [himher] also some girly bits, [hisher]", parse);
			else
				Text.Add("[HisHer]", parse);
			Text.Add(" stallionhood is truly eye-catching! Although Terry <b>is</b> pretty skilled at keeping it hidden...", parse);
			Text.NL();
		}
		else if(terry.FirstCock() && !terry.FirstVag() && terry.Cup() >= TerryFlags.Breasts.Bcup) {
			Text.Add("You can’t help but wonder what Thorn would think of his old apprentice’s ‘new assets’? Certainly makes the old act more convincing.", parse);
			Text.NL();
		}
		else if(terry.FirstCock() && terry.FirstVag()) {
			if(terry.Cup() <= TerryFlags.Breasts.Acup)
				Text.Add("What would Thorn say to Terry upon learning of [hisher] new ‘extra’ tucked away between [hisher] legs?", parse);
			else
				Text.Add("You just bet Thorn would have something to say about Terry’s new body; [heshe] was girly to begin with, but with the new breasts and a new pussy too, well, that’s a whole new level, isn’t it?", parse);
			Text.NL();
		}
		Text.Add("<i>“He… ugh, he wouldn’t let me hear the end of it. My girly physique was always something he’d mock me about. Not that I resent him for that. It was all in good fun, though there was a time when I kicked him in the nuts for a particularly offensive remark.”</i>", parse);
		Text.NL();
		Text.Add("Well... he kind of deserved it, from what Terry just told you.", parse);
		Text.NL();
		Text.Add("<i>“Yeah, he kinda did. We had a good run... but eventually, I guess he got too cocky and things didn’t end up well for him. But let’s visit that some other time, alright?”</i>", parse);
		Text.NL();
		parse["again"] = (max == cur) ? "" : " again";
		Text.Add("Of course; Terry should take [hisher] time, [heshe]’ll talk when [heshe]’s ready. You thank [himher] for telling you about Thorn[again].", parse);
		if(max < 5)
			terry.relation.IncreaseStat(100, 1);
	});
	scenes.push(function() {
		if(terry.Relation() < 50) {
			BlockScene();
			return true;
		}
		
		Text.Add("<i>“We kept avoiding capture by traveling a lot under the pretense of being merchants. Thorn was very pleased with our successful heists. We had a system that worked really well,”</i> Terry smiles softly, but the smile quickly fades.", parse);
		Text.NL();
		Text.Add("<i>“About then, we caught wind of a VIP that was visiting the town we were in. Thorn’s eyes were aglow. That was a great mark if there ever was one... and best of all? He had little security with him. It was an opportunity, and if there’s a thing you learn in thievery, it’s that you never miss an opportunity.”</i>", parse);
		Text.NL();
		Text.Add("You nod your head in understanding, and ask who this VIP was.", parse);
		Text.NL();
		Text.Add("<i>“Our mark was Duke Kane. He was responsible for the neighboring town and had a vast amount of land under his name. Naturally, despite the opportunity, we couldn’t just take risks blindly, so I set out to gather info my usual way. Thorn was stalking the Duke, gathering info on his own.”</i>", parse);
		Text.NL();
		Text.Add("You nod your head in understanding, then inquisitively ask just how close Terry was able to get to Kane; did [heshe] have to settle for just chasing rumors? Or did the Duke welcome the chance to spend a little time with a sexy vixen who was just so interested in him?", parse);
		Text.NL();
		Text.Add("<i>“No, he didn’t stay anywhere near me. I was simply a maid at the local inn, but I did get the chance to speak with a few guards. Naturally, I also had to deflect more flirts than I’d like,”</i> Terry adds, cringing at the memory.", parse);
		Text.NL();
		Text.Add("<i>“So, as you can guess, gathering info on this mark was slow. We were approaching our deadline, and we didn’t have near enough info on the Duke and his guards to make a proper heist. My dad always preached that I should be patient. Same goes for thievery. You rush into the danger and you’ll wind up caught or worse.”</i>", parse);
		Text.NL();
		Text.Add("Sage advice, you say in agreement.", parse);
		Text.NL();
		Text.Add("<i>“Well, Thorn was impatient. I was just getting started on my shift when I heard one of the guards remark that a masked thief had tried to steal from Duke Kane. When I heard that, I rushed back to our room, and sure enough… Thorn was there, hurt.”</i>", parse);
		Text.NL();
		Text.Add("<i>“He had lost too much blood, and by the time I could get him to a healer, it was too late. I was devastated by the news. Even if Thorn was just using me, he was still my best friend. So, once again, I was all alone.”</i>", parse);
		Text.NL();
		Text.Add("With a sigh, you put a hand on Terry’s shoulder, trying to comfort the [foxvixen].", parse);
		Text.NL();
		Text.Add("<i>“We’re almost at the end of me tale, but I think we should wait until another time to finish it.”</i>", parse);
		Text.NL();
		Text.Add("Sure, sounds like a plan.", parse);
		
		if(max < 6)
			terry.relation.IncreaseStat(100, 1);
	});
	scenes.push(function() {
		if(terry.Relation() < 55) {
			BlockScene();
			return true;
		}
		
		Text.Add("<i>“Last time we spoke, I told about how my mentor Thorn died, right?”</i>", parse);
		Text.NL();
		Text.Add("You nod in confirmation.", parse);
		Text.NL();
		Text.Add("<i>“Well after that, I performed the last rites, quit my job at the inn and got in the first caravan headed out of the city. I wanted to get away from it all, plus there was always the chance people would find out I was with Thorn and then I’d be in trouble too.”</i>", parse);
		Text.NL();
		Text.Add("<i>“I had nowhere to go, and I was feeling too depressed to think about anything. So I just idled, waiting for the caravan to reach its destination. It was a long trip, but eventually we made our way to Rigard.”</i>", parse);
		Text.NL();
		Text.Add("So [heshe] wound up in [hisher] hometown. Did [heshe] recall it at all from [hisher] childhood?", parse);
		Text.NL();
		Text.Add("<i>“I didn’t recall too much about it, no. But from what dad told me, the city was shit back then as well,”</i> Terry sighs, frowning in disapproval.", parse);
		Text.NL();
		Text.Add("<i>“I was getting short on money, and I was already dressed for the job. So I thought… why not get back into the game? Rob some fool and hop on the nearest caravan. Problem is… that damn blockade on the city gates.”</i>", parse);
		Text.NL();
		Text.Add("Ah yes, you had a hard time getting past the gates yourself...", parse);
		Text.NL();
		Text.Add("<i>“I was lucky enough to make it inside the city, but I couldn’t just rob anyone. Even long after the conflict that took my mother from me, people were still on edge. Finding a mark was tough. In the end, I decided if I wanted to score some decent loot, I’d have to rob one of the local nobles.”</i>", parse);
		Text.NL();
		Text.Add("Oh? And who was the lucky one?", parse);
		Text.NL();
		Text.Add("<i>“Krawitz seemed like a good mark. He was a bigot to morphs and an asshole to most people. I figured no one would mind if the old fool got robbed blind. So I did what I always did. Prepared, gathered intel, and in honor of my late mentor? I decided to don his costume and replicate his signature style. Thought I should let the good lord know that a morph outwitted him and robbed him.”</i>", parse);
		Text.NL();
		Text.Add("You decide not to say anything. Your own crimes got pinned on Terry, after all. It wouldn’t do you both any good if [heshe] found out you were there with [himher] that day...", parse);
		Text.NL();
		Text.Add("<i>“After that, you know the story. Fin.”</i>", parse);
		Text.NL();
		Text.Add("Well, that was quite the story, but in the end [heshe] wound up with you, and you’re glad you met [himher].", parse);
		Text.NL();
		Text.Add("<i>“Yes, I’m glad I met you too,”</i> [heshe] replies, wagging [hisher] bushy tail. <i>“Now, anything else I can do for you?”</i>", parse);
		
		if(max < 7)
			terry.relation.IncreaseStat(100, 1);
	});
	
	if(cur >= scenes.length) cur = 0;
	
	if(!force) {
		Text.Clear();
		if(max == 0 && cur == 0) {
			Text.Add("<i>“Okay, I guess I can do that. So, what would you like to know?”</i>", parse);
			Text.NL();
			Text.Add("You’re curious about [hisher] past. You’d like to know more about [himher] and you feel this would help sorting that out.", parse);
			Text.NL();
			Text.Add("<i>“My past? My past is nothing special. It’s quite cliché I’d say. And honestly, it’s best forgotten...”</i> the [foxvixen] says, ears flattening on [hisher] skull. It’s obvious this isn’t [hisher] favorite topic.", parse);
			Text.NL();
			Text.Add("You’d still like to know. ", parse);
			if(terry.Relation() < 30)
				Text.Add("Getting to know [himher] better would be a big step toward getting a better relationship with [himher], you feel.", parse);
			else
				Text.Add("The two of you are well on your way toward building a better relationship, and getting to know more about [himher] would only strengthen your bonds.", parse);
			Text.NL();
			Text.Add("The [foxvixen] ponders your words for a few moments, but finally acquiesces. <i>“Tough to argue against that...”</i>", parse);
			Text.NL();
			Text.Add("<i>“Well, if you really want to know I guess I have to tell you.”</i> [HeShe] smiles a bit. <i>“Let’s start at the beginning then...”</i>", parse);
			
			terry.relation.IncreaseStat(100, 3);
		}
		else if(cur == 0) {
			Text.Add("<i>“I already told you everything I could about my past, [playername]. So, unless you want me to start over, there’s not much else to tell.”</i>", parse);
			Text.Flush();
			
			//[HearAgain][Nevermind]
			var options = new Array();
			options.push({ nameStr : "Hear again",
				func : function() {
					Text.Clear();
					Text.Add("<i>“Okay then. Back to the beginning, I suppose...”</i>", parse);
					Text.NL();
					TerryScenes.TalkPast(true);
				}, enabled : true,
				tooltip : Text.Parse("You’d like [himher] to tell you [hisher] stories again, and refresh your memories.", parse)
			});
			options.push({ nameStr : "Nevermind",
				func : function() {
					Text.Clear();
					Text.Add("<i>“Alright.”</i>", parse);
					Text.Flush();
					TerryScenes.TalkPrompt();
				}, enabled : true,
				tooltip : Text.Parse("In that case, you’d rather talk to [himher] about something else.", parse)
			});
			Gui.SetButtonsFromList(options, false, null);
			return;
		}
		else {
			Text.Add("<i>“Alright then. Now, where was I...”</i>", parse);
		}
		Text.NL();
	}
	
	// Play scene
	var block = scenes[cur]();
	
	if(!block) {
		terry.flags["rotPast"] = cur + 1;
		terry.flags["maxPast"] = Math.max(max, cur);
	}
	
	Text.Flush();
	TerryScenes.TalkPrompt();
}

TerryScenes.TalkCompliment = function() {
	let terry = GAME().terry;
	let player = GAME().player;

	var parse : any = {
		foxvixen : terry.mfPronoun("fox", "vixen"),
		HeShe   : terry.HeShe(),
		heshe   : terry.heshe(),
		HisHer  : terry.HisHer(),
		hisher  : terry.hisher(),
		himher  : terry.himher(),
		hishers : terry.hishers(),
		mastermistress : player.mfTrue("master", "mistress")
	};
	
	Text.Clear();
	Text.Add("With a studious look on your face, you start to circle Terry, intensely observing [himher] from all angles. Moving your gaze up and down, back and forth, you continue to trail around the puzzled vulpine.", parse);
	Text.NL();
	if(terry.Relation() >= 60) {
		Text.Add("Terry looks a bit nervous. <i>“Um, everything is alright, right? I didn’t miss any spots combing my fur… maybe my hair is not good?”</i>", parse);
		Text.NL();
		Text.Add("You hasten to assure [himher] that [hisher] hair looks lovely, as always. Just like the rest of [himher], it’s beautiful.", parse);
		Text.NL();
		Text.Add("This gets you a smile as [hisher] tail begins wagging. <i>“If you want, we can go more private spot and I can show you all of me. But if we do, I can’t promise we won’t take this beyond a show and tell.”</i>", parse);
		Text.NL();
		Text.Add("You can’t keep a smirk off your face at the mischievous grin spreading over the [foxvixen]’s vulpine features, [hisher] tail wagging in seductive twirls over the shapely ass that [hisher] posture tilts enticingly toward you. The thought comes to mind that you might not even make it to a private spot... still, the offer is tempting; maybe you should accept it?", parse);
		Text.Flush();
		
		//[Yes][No]
		var options = new Array();
		options.push({ nameStr : "Yes",
			func : function() {
				Text.Clear();
				Text.Add("With a grin, you invite Terry to follow you and lead [himher] toward a less public place to conduct your ‘show and tell’.", parse);
				Text.NL();
				Text.Add("No sooner are you out of sight, the petite [foxvixen] spins you, nearly pouncing [hisher] way into your arms as [heshe] wraps [hisher] lips around yours in a passionate kiss. [HisHer] hair and fur become a disheveled mess the first few seconds, not that either of you mind it. When you finally break away, the smiling [foxvixen] takes a step back to look you over. <i>“I figured just looking can be a bit boring. I think we’d both prefer a more hands-on approach, don’t you think?”</i>", parse);
				Text.NL();
				if(terry.Slut() >= 60)
					Text.Add("<i>“I know what parts <b>I</b> want, but what parts do <b>you</b> want, my lovely [mastermistress]?”</i> Terry asks, giving you a smoldering look.", parse);
				else if(terry.Slut() >= 30)
					Text.Add("<i>“Okay, before we continue, you should probably tell me how you’ll be wanting to have me,”</i> Terry says, smiling as [hisher] tail wags in excitement.", parse);
				else
					Text.Add("<i>“So, how do you want to do this?”</i> Terry asks.", parse);
				Text.NL();
				Text.Flush();
				TerryScenes.SexPrompt(terry.Interact);
			}, enabled : true,
			tooltip : Text.Parse("You just know that this is just going to wind up in sex, but sex is not a bad outcome. Go do your [foxvixen].", parse)
		});
		options.push({ nameStr : "No",
			func : function() {
				Text.Clear();
				Text.Add("<i>“Suit yourself, but I hope you’re willing to humor me later?”</i>", parse);
				Text.NL();
				Text.Add("You assure [himher] that you most certainly are. After all, you couldn’t keep yourself away from your lovely pet [foxvixen] for long.", parse);
				Text.NL();
				Text.Add("<i>“It’s a promise then,”</i> [heshe] giggles.", parse);
				Text.Flush();
				
				TerryScenes.TalkPrompt();
			}, enabled : true,
			tooltip : Text.Parse("You really just want to look, refuse [hisher] invitation.", parse)
		});
		Gui.SetButtonsFromList(options, false, null);
		
		return;
	}
	else if(terry.Relation() >= 30) {
		Text.Add("The [foxvixen] is quick to pick up on your intentions, and [heshe] submits willingly to your scrutiny. <i>“I’m still the same old me, as you can see,”</i> [heshe] quips.", parse);
		Text.NL();
		Text.Add("[HeShe] most certainly is; lovely as always.", parse);
		Text.NL();
		Text.Add("Terry looks a bit flustered at your compliment, and you note that [heshe] seems to adjust [hisher] clothing to enhance [hisher] more feminine curves. <i>“Well, go ahead and look then,”</i> [heshe] says nonchalantly, even as [hisher] tail starts wagging. It’s quite obvious that despite [hisher] demeanor, [heshe] enjoys the attention…", parse);
		Text.NL();
		Text.Add("You draw out your observations for as long as possible, smiling and nodding your approval of every luscious inch. When you are finished, you nod your head and step away, telling [himher] that it was your pleasure to look at such a beautiful [foxvixen].", parse);
		Text.NL();
		Text.Add("<i>“Thank you,”</i> [heshe] says with a smile.", parse);
	}
	else {
		Text.Add("<i>“What’s wrong? Why are you looking at me like that?”</i>", parse);
		Text.NL();
		Text.Add("Just appreciating [hisher] good looks properly, you reply.", parse);
		Text.NL();
		Text.Add("<i>“Umm, right. So, appreciate away… I guess...”</i> [heshe] trails off, looking more than a bit flustered at your scrutiny.", parse);
		Text.NL();
		Text.Add("With a smile, you continue to look Terry over, the [foxvixen]’s embarrassment at your appraisal no impediment to your appreciation of [hisher] looks. Finally, though, you have enough and you thank [himher] for [hisher] patience; [heshe]’s a very pretty [foxvixen].", parse);
		Text.NL();
		Text.Add("<i>“Thanks.”</i>", parse);
	}
	Text.Flush();
	
	terry.relation.IncreaseStat(30, 1);
	
	TerryScenes.TalkPrompt();
}

TerryScenes.SkinshipRummagePack = function() {
	let terry = GAME().terry;
	let player = GAME().player;

	var parse : any = {
		foxvixen : terry.mfPronoun("fox", "vixen"),
		boygirl : terry.mfTrue("boy", "girl"),
		HeShe   : terry.HeShe(),
		heshe   : terry.heshe(),
		HisHer  : terry.HisHer(),
		hisher  : terry.hisher(),
		himher  : terry.himher(),
		hishers : terry.hishers(),
		master : player.mfTrue("master", "mistress")
	};
	
	Text.Add("You find Terry’s pack and rummage through it. ", parse);
	if(terry.Slut() >= 60) {
		Text.Add("At first, you just find a few spare clothes, panties, few tools of the trade, and a couple dry snacks. Once you get to the bottom though, you raise a brow at what you see: a dildo, lube, a cockring, another dildo, an inflatable buttplug, more lube, and some honey. Chuckling to yourself, you ask whyever [heshe] would need all of that? Doesn’t it get heavy having to lug around all these toys?", parse);
		Text.NL();
		Text.Add("<i>“Gotta be prepared for when you’re not around, my dear [master]. Plus, in case you’re feeling kinky in the middle of the forest, I’d rather not have to wait until we find a city to go after the big [boygirl] toys,”</i> [heshe] grins innocently.", parse);
		Text.NL();
		Text.Add("...You think you created a monster…", parse);
		Text.NL();
		if(terry.Relation() < 60)
			Text.Add("<i>“Damn right you did, and now you gotta take care of me,”</i> [heshe] states.", parse);
		else {
			Text.Add("<i>“Maybe you did, but I loved every second of it, and so did you.”</i>", parse);
			Text.NL();
			Text.Add("True. In that case, you’ll just have to enjoy the spoils of your hard labor.", parse);
		}
		Text.NL();
		Text.Add("After digging through quite a few toys, you finally manage to secure Terry’s comb and brush. Carefully, you return everything to [hisher] pack and move to the grinning [foxvixen].", parse);
	}
	else if(terry.Slut() >= 30) {
		Text.Add("Terry keeps [hisher] pack fairly organized. A few spare clothes, some lockpicks, assorted tools for crafting [hisher] gadgets… a bottle of lube? You set that aside and rummage a bit deeper, grinning to yourself once you find what looks like a fairly small buttplug. Has Terry being having fun behind your back?", parse);
		Text.NL();
		Text.Add("<i>“Umm... ah...”</i> [heshe] trails off. <i>“Well, I figured since we’ve been doing the dirty deed a lot, I should start getting used to it. And it does, kinda, feel good… sometimes… when I’m in the mood.”</i>", parse);
		Text.NL();
		Text.Add("Right… you consider the teasing the [foxvixen] a bit more, but there’ll be plenty of opportunities to do that later. For now, you concentrate on finding [hisher] comb and brush. Locating it at the bottom of [hisher] pack is simple enough, and once you pick them up, you put [hisher] things back in [hisher] pack.", parse);
	}
	else {
		Text.Add("Terry is kinda neat when it comes to keeping [hisher] pack organized. It’s clear [heshe] takes great care when putting away [hisher] things. You easily locate [hisher] comb and brush at the bottom of the pack, underneath [hisher] extra clothes and tools of the trade. After picking them up, you replace the contents of [hisher] pack back into their proper order.", parse);
	}
}

TerryScenes.SkinshipPrompt = function() {
	let terry = GAME().terry;
	let player = GAME().player;

	var parse : any = {
		foxvixen : terry.mfPronoun("fox", "vixen"),
		HeShe   : terry.HeShe(),
		heshe   : terry.heshe(),
		HisHer  : terry.HisHer(),
		hisher  : terry.hisher(),
		himher  : terry.himher(),
		hishers : terry.hishers(),
		breasts : function() { return terry.FirstBreastRow().Short(); },
		boygirl : terry.mfTrue("boy", "girl"),
		playername : player.name,
		hand    : function() { return player.HandDesc(); },
		breastsDesc : function() { return player.FirstBreastRow().Short(); },
		tongueDesc : function() { return player.TongueDesc(); }
	};
	
	Text.Clear();
	if(terry.Relation() < 30) {
		Text.Add("<i>“Huh?”</i> The [foxvixen] glares at you as if [heshe]’d just been mocked. <i>“What do I look like to you? Some kind of pet? I don’t need your grabby [hand]s on my body.”</i>", parse);
		Text.NL();
		if(terry.flags["Skin"] == 0) {
			Text.Add("Maybe [heshe] doesn’t <i>need</i> them, you confess. But does [heshe] really think it’d be so bad to let you just touch [himher]? You don’t mean anything by doing so, if that’s [hisher] concern. Besides, you <i>could</i> just make this an order...", parse);
			Text.NL();
			Text.Add("The [foxvixen] scowls at you, but acquiesces. <i>“Fine, you got your point across… what are you thinking of doing then?”</i>", parse);
		}
		else {
			Text.Add("With a smirk and a shake of your head, you teasingly ask if [heshe]’s really going to protest like this when you both know how much [heshe] enjoyed it last time.", parse);
			Text.NL();
			Text.Add("Terry sighs. <i>“Okay, I guess there’s no harm in letting you… do whatever to me, just watch where you touch.”</i>", parse);
		}
	}
	else if(terry.Relation() < 60) {
		Text.Add("<i>“Seriously, [playername]. Do I look like a dog to you?”</i>", parse);
		Text.NL();
		Text.Add("...Well-", parse);
		Text.NL();
		Text.Add("<i>“No, don’t answer that,”</i> the [foxvixen] says, raising [hisher] hands. <i>“I have half a mind I’m digging myself into a pit by asking that.”</i>", parse);
		Text.NL();
		Text.Add("You’re content to simply grin. You aren’t going to say anything if [heshe] isn’t. So, [heshe]’s got no problems?", parse);
		Text.NL();
		Text.Add("<i>“Nope, but if you’re going to get touchy-feely with me, at least make me feel good, okay?”</i> [heshe] says with a smile, tail wagging slowly behind.", parse);
		Text.NL();
		Text.Add("You assure [himher] that is precisely what you have in mind.", parse);
	}
	else {
		Text.Add("<i>“Alright, I’m ready whenever you are.”</i>", parse);
		Text.NL();
		Text.Add("Just like that? No complaints? No protests? No token efforts at dissuading you?", parse);
		Text.NL();
		Text.Add("<i>“I’m about to get pampered and loved, [playername]. What idiot would refuse that?”</i> [heshe] asks, grinning innocently.", parse);
		Text.NL();
		Text.Add("A much bigger idiot than your clever [foxvixen], you immediately reply, chest swelling with pride at [hisher] response.", parse);
		Text.NL();
		Text.Add("<i>“You got it! Now, what did you have in store for little old me?”</i>", parse);
	}
	Text.Flush();
	
	TerryScenes.SkinshipPromptChoices();
}


TerryScenes.SkinshipPromptChoices = function() {
	let terry = GAME().terry;
	let player = GAME().player;
	let party : Party = GAME().party;

	var parse : any = {
		foxvixen : terry.mfPronoun("fox", "vixen"),
		breasts : function() { return terry.FirstBreastRow().Short(); },
		boygirl : terry.mfTrue("boy", "girl"),
		playername : player.name,
		hand    : function() { return player.HandDesc(); },
		breastsDesc : function() { return player.FirstBreastRow().Short(); },
		tongueDesc : function() { return player.TongueDesc(); }
	};
	parse = terry.ParserPronouns(parse);
	
	//[Hug]
	var options = new Array();
	options.push({ nameStr : "Hug",
		func : function() {
			terry.flags["Skin"]++;

			var pbreasts = player.FirstBreastRow().Size() > 2;
			var tbreasts = terry.FirstBreastRow().Size() > 2;
			Text.Clear();
			Text.Add("You close the distance between you and your pet [foxvixen], arms spreading wide before folding around [hisher] shoulders and drawing [himher] into your chest. ", parse);
			if(pbreasts && tbreasts)
				Text.Add("Your [breastsDesc] squish most pleasantly against Terry’s own [breasts], the cleavage flesh rippling and rolling together.", parse);
			else if(pbreasts)
				Text.Add("Your [breastsDesc] flatten themselves against Terry’s daintily flat chest, pressed between the two of you.", parse);
			else if(tbreasts)
				Text.Add("Terry’s [breasts] squish wonderfully against your own flat chest as you press [himher] to you.", parse);
			else
				Text.Add("You are pressed tightly against each other, pectoral to pectoral, loins to loins.", parse);
			Text.NL();
			if(terry.Relation() >= 60)
				Text.Add("Terry hugs you back with as much intensity as [heshe] can muster. A whine of happiness escapes [himher] as [heshe] basks in your warmth.", parse);
			else if(terry.Relation() >= 30)
				Text.Add("Terry hesitates at first, but quickly succumbs and wraps [hisher] arms around you. [HeShe] closes [hisher] eyes as [heshe] basks in your warmth.", parse);
			else
				Text.Add("At first, it seems Terry is pissed at you, but your concerns are dispelled when the [foxvixen] hesitantly lifts [hisher] arms to return the hug. [HeShe]’s not very enthusiastic, and [hisher] body is tensed up, but at least this is a start….", parse);
			Text.NL();
			Text.Add("Eventually, you break the hug, unfolding your arms from around the warm [foxvixen]-morph. As you step back, you can see that your surprise hug has really perked your pet up; [hisher] tail is wagging openly, and [hisher] eyes have closed in happiness, a pleased smile on [hisher] lips. ", parse);
			if(terry.flags["Skin"] <= 1 && terry.Relation() < 30)
				Text.Add(" Seems like you made an important step toward furthering your relationship with the pretty fox-[boygirl].", parse);
			Text.Flush();
			
			terry.relation.IncreaseStat(40, 1);
			
			TerryScenes.Prompt();
		}, enabled : true,
		tooltip : Text.Parse("Terry’s fur looks so soft to the touch. It makes you want to cuddle the [foxvixen].", parse)
	});
	options.push({ nameStr : "Brush Hair",
		func : function() {
			terry.flags["Skin"]++;

			Text.Clear();
			if(terry.Relation() < 60)
			{
				Text.Add("<i>“Sure, I guess there’s no harm in touching up my hair, but I can do this by myself. You don’t really need to bother.”</i>", parse);
				Text.NL();
				Text.Add("Nonsense, it would be a pleasure.", parse);
				Text.NL();
				Text.Add("<i>“Well, if you don’t mind, I guess it’s alright. I have a comb and a brush in my pack.”</i>", parse);
			}
			else {
				Text.Add("<i>“Something wrong with my hair?”</i> Terry asks, a hint of mischief in [hisher] voice.", parse);
				Text.NL();
				Text.Add("You pretend to examine it with great scrutiny before admitting you just want some quality time together. Plus, you gotta help your [foxvixen] maintain [himher]self.", parse);
				Text.NL();
				Text.Add("<i>“Well, as good an excuse as any I suppose. You know where I keep my comb and my brush, right?”</i>", parse);
			}
			Text.NL();
			
			TerryScenes.SkinshipRummagePack();
			
			Text.NL();
			Text.Add("As the [foxvixen] sees you approaching, [heshe] ", parse);
			if(party.location.safe())
				Text.Add("finds a stool and sits down.", parse);
			else
				Text.Add("sits on the ground cross-legged.", parse);
			Text.NL();
			Text.Add("You circle [himher] until you’re behind [himher], then remove the small strap holding [hisher] ponytail. Terry doesn’t look half-bad with [hisher] bangs loose… well, plenty of time to admire later. First of all, you decide to begin with the comb. As neat as the [foxvixen] is, [hisher] hair is perfectly cared for and provides minimal resistance as you rake the comb through [hisher] locks. Then, you set down the comb and grab the brush.", parse);
			Text.NL();
			Text.Add("<i>“Ah… this feels pretty nice.”</i>", parse);
			Text.NL();
			Text.Add("Well, you’re glad [heshe]’s liking [hisher] treatment, you say whilst massaging [hisher] scalp, right behind [hisher] triangular ears.", parse);
			Text.NL();
			if(terry.Relation() < 60)
				Text.Add("<i>“I could get used to this,”</i> [heshe] remarks.", parse);
			else
				Text.Add("<i>“Bit more to the left… yeah, right there.”</i> [HeShe] leans into your touch shamelessly.", parse);
			Text.NL();
			Text.Add("Once you’re done, you quickly locate [hisher] strap and tie [hisher] hair back into the traditional ponytail [heshe] likes to wear it in.", parse);
			Text.NL();
			Text.Add("<i>“Thanks a lot, [playername].”</i> ", parse);
			Text.NL();
			Text.Add("You pat [hisher] on the head and put [hisher] things back into [hisher] pack.", parse);
			Text.Flush();
			
			terry.relation.IncreaseStat(50, 1);
			
			TerryScenes.Prompt();
		}, enabled : terry.Relation() >= 30,
		tooltip : Text.Parse("Terry’s hair oughta suffer from all your adventuring, maybe you should brush it to ensure your [foxvixen] is always looking good.", parse)
	});
	
	options.push({ nameStr : "Brush tail",
		func : TerryScenes.BrushTail, enabled : terry.Relation() >= 40,
		tooltip : Text.Parse("Terry’s lovely bushy tail looks like it needs a lot of attention to look its best. Why don’t you do your [foxvixen] a favor and give it a nice brushing?", parse)
	});
	
	options.push({ nameStr : "Kiss",
		func : function() {
			Text.Clear();
			Text.Add("Bridging the distance between you, your hands reach out toward Terry’s face. One tenderly caresses [hisher] cheek, whilst the other tucks itself under the [foxvixen]’s chin, tilting [hisher] head for a better angle.", parse);
			Text.NL();
			if(terry.Relation() < 60) {
				Text.Add("Terry looks a bit unsure of [himher]self, but [heshe] makes no move to push you away either.", parse);
				Text.NL();
				Text.Add("You give [himher] a reassuring smile, trying to calm [hisher] nerves. When it’s clear [heshe]’s not going to stop you, you allow your lips to close the gap and press against [hisher] own.", parse);
			}
			else {
				Text.Add("The [foxvixen] closes [hisher] eyes, moving to meet your intended kiss.", parse);
				Text.NL();
				Text.Add("Eager little thing, isn’t [heshe]? You intercept [himher] halfway, not willing to entirely give up the initiative in this.", parse);
			}
			Text.NL();
			if(player.sexlevel < 3) {
				Text.Add("The warmth of the [foxvixen]’s lips on your own is an intriguing sensation, one you could happily lose yourself in. Your eyes flutter closed, allowing you to bask in the feeling as you kiss [himher], instinctively pushing your tongue into [hisher] mouth. The taste of Terry floods your senses, and you try to concentrate as it assaults your taste buds, softly and amateurishly stroking Terry’s tongue with sporadic twitches and tugs.", parse);
				
				terry.AddLustFraction(0.2);
			}
			else if(player.sexlevel < 5) {
				Text.Add("Your eyes sink closed, allowing you to fully concentrate on what you’re doing, and you embrace Terry’s lips with your own. With practiced skill, you insinuate your tongue into the [foxvixen]’s mouth, savoring [hisher] flavor as it washes over you. Your [tongueDesc] curls itself around Terry’s own flat muscle, squeezing gently as you make an effort to explore the depths of [hisher] mouth.", parse);
				
				terry.AddLustFraction(0.4);
			}
			else {
				Text.Add("Your teeth close purposefully upon Terry’s lower lip; not hard enough to pierce the skin, but not so soft that [heshe] can’t feel them as you nibble teasingly. You suck the soft skin into your mouth, working it with your own lips, releasing only to then conquer [himher] in a single fell swoop.", parse);
				Text.NL();
				Text.Add("With serpentine sensuality, your [tongueDesc] invades the [foxvixen]’s mouth, curling around [hisher] tongue and drawing it into your mouth. Greedily, you suckle upon Terry’s tongue, massaging it with your lips and letting [hisher] flavor consume your world, moaning around your fleshy muffler in your pleasure at the feel and the taste.", parse);
				Text.NL();
				Text.Add("Your teeth descend, just hard enough that Terry can feel them raking over [hisher] tongue as you let it slip back into [hisher] mouth so you can breathe. Then you pounce once more, grinding your lips against [hishers] as you feed [himher] your tongue.", parse);
				
				terry.AddLustFraction(0.7);
			}
			Text.NL();
			if(terry.Slut() < 30) {
				Text.Add("Terry kisses you back. [HeShe] might lack technique, but makes up for it with enthusiasm. The [foxvixen] tries to match your movements and massage your tongue as best as [heshe] can.", parse);
				
				player.AddLustFraction(0.2);
			}
			else if(terry.Slut() < 60) {
				Text.Add("Terry kisses back with abandon, clinging to you as [heshe] explores your mouth with [hisher] tongue, licking the roof of your mouth in controlled strokes to further excite you. It’s a strange technique, being licked inside your mouth, but it’s also very effective. You can’t resist the moan that wells up when [hisher] tongue suddenly makes a dive to pull your own [tongueDesc] back into [hisher] mouth.", parse);
				
				player.AddLustFraction(0.4);
			}
			else {
				Text.Add("Terry grinds [himher]self against you, while [heshe] fellates your tongue and explores the inside of your mouth. You can’t even decide what to focus on. It’s as if the [foxvixen] has turned into a blanket and is trying [hisher] best to envelop all of you.", parse);
				Text.NL();
				Text.Add("Slurping sounds emanate from your joined lips as Terry drinks your saliva in measured suckles, exchanging it with [hisher] own moments later. You can see [himher] gulping it down as if it were the sweetest nectar [heshe]’d ever tasted.", parse);
				Text.NL();
				Text.Add("[HeShe] can’t help but moan against you, a deep sound that passes a very clear message - Terry wants you.", parse);
				
				player.AddLustFraction(0.7);
			}
			Text.NL();
			parse["metaphorical"] = player.HasLegs() ? "" : " metaphorical";
			Text.Add("Eventually, the need for oxygen forces you to break the kiss. You take a[metaphorical] step back as you inhale and exhale, allowing your heart to slow down.", parse);
			Text.NL();
			if(terry.LustLevel() < 0.3) {
				Text.Add("<i>“Not bad, [playername]. That was pretty nice.”</i> [HeShe] smiles, tail wagging in obvious enjoyment.", parse);
				Text.NL();
				Text.Add("You’re glad that [heshe] liked it so much. You thought that it would brighten [hisher] day a little.", parse);
				Text.NL();
				Text.Add("<i>“It did.”</i> Terry nods. <i>“So, now that my day is a bit brighter… is there anything else you’d like to do?”</i>", parse);
				
				TerryScenes.Prompt();
			}
			else if(terry.LustLevel() < 0.6) {
				Text.Add("<i>“Wow… I didn’t think a kiss could feel this intense...”</i> [heshe] breathes, panting heavily. <i>“Almost makes me sad it had to end...”</i>", parse);
				Text.NL();
				Text.Add("Well, there's plenty of other things that the two of you can do, if [heshe] liked that so much...", parse);
				Text.NL();
				Text.Add("<i>“Really? And what exactly do you have in mind?”</i> The [foxvixen] cocks [hisher] head quizzically.", parse);
				Text.NL();
				if(player.LustLevel() >= 30)
					Text.Add("Oh, you have some rather naughty ideas in store… ", parse);
				Text.Add("You mentally pause for a second to consider your answers. It looks like Terry wouldn’t be averse to a nice little bedroom romp, in the mood [heshe]’s in. On the other hand, a bit more friendly intimacy certainly wouldn’t be turned down, either.", parse);
				Text.NL();
				Text.Add("You’re also aware of a little voice in the back of your mind, whispering about the enticing nature of the first option.", parse);
				Text.NL();
				Text.Add("Terry is looking at you expectantly; what are you going to suggest?", parse);
				
				//[Intimacy] [Sex]
				var options = new Array();
				options.push({ nameStr : "Intimacy",
					func : function() {
						Text.Clear();
						Text.Add("[HeShe] smiles softly. <i>“Sure, I wouldn’t be against that at all.”</i>", parse);
						Text.Flush();
						
						TerryScenes.SkinshipPromptChoices();
					}, enabled : true,
					tooltip : Text.Parse("Since [heshe] loved kissing so much, how about the two of you play around a little more?", parse)
				});
				options.push({ nameStr : "Sex",
					func : function() {
						Text.Clear();
						Text.Add("<i>“Hotter than kissing, huh?”</i> the [foxvixen] muses, shooting you a knowing grin. <i>“I can only imagine what you really mean by that. Not that it’s any surprise,”</i> [heshe] says, leaning closer. <i>“Ya big perv.”</i>", parse);
						Text.NL();
						Text.Add("You simply grin at that. It takes one to know one.", parse);
						Text.NL();
						TerryScenes.SexPrompt();
					}, enabled : true,
					tooltip : "Why don’t the two of you enjoy something a little hotter than kissing? [HeShe] certainly looks in the mood for it..."
				});
				Gui.SetButtonsFromList(options, false, null);
			}
			else {
				Text.Add("<i>“[playername], you big tease. Surely, you don’t expect to end this with just a kiss,”</i> [heshe] says, smiling seductively. <i>“That was pretty good. So good, in fact, that now I’m craving something more.”</i>", parse);
				Text.NL();
				Text.Add("Trying to hold back a smile, you carefully raise a quizzical eyebrow and ask what [heshe] wants.", parse);
				Text.NL();
				Text.Add("<i>“Oh, I don’t know...”</i> [heshe] says, looking you over. ", parse);
				parse["raceDesc"] = player.body.RaceStr();
				if(player.MuscleTone() > 0.5)
					Text.Add("<i>“I have a craving for a hunky [raceDesc]. You don’t know where I could find one of those, do you?”</i> [HeShe] smiles mischievously.", parse);
				else
					Text.Add("<i>“I could go for a sexy [raceDesc]. Yes, that would hit the spot,”</i> [heshe] teases, licking [hisher] lips in a clearly predatory gesture.", parse);
				Text.NL();
				Text.Add("Looks like <i>somebody</i> really got excited with your little kiss. Perhaps you should offer to ‘help out’, as it were?", parse);
				
				//[Yes] [No]
				var options = new Array();
				options.push({ nameStr : "Yes",
					func : function() {
						Text.Clear();
						Text.Add("With a mischievous grin, you saunter closer, reaching out to tickle the [foxvixen]’s chin. Well, you might not know exactly where [heshe] could find what [heshe]’s looking for, but you’d be happy to help [himher] with [hisher] cravings...", parse);
						Text.NL();
						Text.Add("<i>“I’m sure you would,”</i> [heshe] replies with a knowing grin.", parse);
						Text.NL();
						TerryScenes.SexPrompt();
					}, enabled : true,
					tooltip : Text.Parse("Oh, come on, [heshe]’s practically <i>begging</i> for it! How could you possibly turn [himher] down now, of all times?", parse)
				});
				options.push({ nameStr : "No",
					func : function() {
						Text.Clear();
						Text.Add("You tell Terry that you’re not in the mood for sex right now.", parse);
						Text.NL();
						Text.Add("<i>“Pity. I guess we can do this some other time then.”</i>", parse);
						Text.NL();
						Text.Add("Absently nodding your agreement, you tell [himher] that there was something else that you wanted.", parse);
						Text.Flush();
						
						TerryScenes.Prompt();
					}, enabled : true,
					tooltip : Text.Parse("As much as you sympathize, you’re really not in the mood. You’ll just have to turn [himher] down.", parse)
				});
				Gui.SetButtonsFromList(options, false, null);
			}
			Text.Flush();
			
			terry.relation.IncreaseStat(70, 1);
		}, enabled : terry.Relation() >= 40,
		tooltip : Text.Parse("What better way to show your feelings for [himher] than a nice, warm kiss? Your [foxvixen] deserves to know that you care for [himher].", parse)
	});
	
	parse["gen"] = "";
	if(terry.HasBalls()) parse["gen"] += " nuts";
	if(terry.HasBalls() && terry.Lactation()) parse["gen"] += " and";
	if(terry.Lactation()) parse["gen"] += " breasts";
	options.push({ nameStr : "Check fluids",
		func : TerryScenes.CheckFluids, enabled : terry.flags["BM"] >= 1 && (terry.HasBalls() || terry.Lactation()),
		tooltip : Text.Parse("See how much fluid Terry is packing in [hisher][gen].", parse)
	});
	//TODO
	/*
	//[name]
	options.push({ nameStr : "name",
		func : function() {
			Text.Clear();
			Text.Add("", parse);
			Text.NL();
			Text.Flush();
		}, enabled : true,
		tooltip : ""
	});
	 */
	Gui.SetButtonsFromList(options, true, function() {
		Text.Clear();
		Text.Add("<i>“Oh, okay. Is there anything else you want to do?”</i>", parse);
		Text.Flush();
		
		TerryScenes.Prompt();
	});
}

TerryScenes.BrushTail = function() {
	let terry = GAME().terry;
	let player = GAME().player;

	var parse : any = {
		foxvixen       : terry.mfPronoun("fox", "vixen"),
		boygirl        : terry.mfPronoun("boy", "girl"),
		tarmorDesc     : function() { return terry.ArmorDesc(); },
		tlowerArmor    : function() { return terry.LowerArmorDesc(); },
		tbreastDesc    : function() { return terry.FirstBreastRow().Short(); },
		tcockDesc      : function() { return terry.MultiCockDesc(); },
		bellydesc      : function() { return terry.StomachDesc(); },
		skinDesc       : function() { return player.SkinDesc(); },
		playername : player.name
	};
	parse = terry.ParserPronouns(parse);
	
	terry.flags["Skin"]++;
	
	Text.Clear();
	if(terry.Relation() < 60) {
		Text.Add("<i>“Um, okay I guess. It can be a lot of pain to brush properly. And the fur gets tangled all the time, so getting some help wouldn’t be so bad... I think.”</i>", parse);
		Text.NL();
		Text.Add("That’s good then; [heshe] gets a nice brushed tail, you get to help [himher] out, everybody’s happy! Not to mention you get to enjoy touching such a soft and fluffy tail...", parse);
		Text.NL();
		Text.Add("<i>“Alright then, I have a brush in my pack.”</i>", parse);
	}
	else {
		Text.Add("<i>“My tail, huh? Pretty sure you have other intentions... and if you don’t, then I’m pretty sure you’ll have them by the time you’re done. Okay, I’ll play along then - just try not to be too obvious about it,”</i> the [foxvixen] says, grinning mischievously.", parse);
		Text.NL();
		Text.Add("Same goes for [himher]. [HeShe] should at least pretend [heshe]’s not enjoying it too much, and try to keep [hisher] tail under control. It’s tough to brush with all the wagging. ", parse);
		Text.NL();
		Text.Add("As if proving your point, Terry’s tail begins wagging even more enthusiastically. <i>“Okay, I’ll try, but I can’t promise anything,”</i> [heshe] chuckles. <i>“Brush is in my pack.”</i>", parse);
	}
	Text.NL();
	
	TerryScenes.SkinshipRummagePack();
	
	Text.NL();
	Text.Add("Now that you have the brush, you make yourself comfortable and tell Terry that [heshe] should bend over your lap so that you can start properly brushing [hisher] tail.", parse);
	Text.NL();
	Text.Add("<i>“Alright.”</i> ", parse);
	var naked = false;
	if(terry.Slut() >= 60) {
		Text.Add("Terry begins undressing [himher]self, removing each piece of [hisher] [tarmorDesc].", parse);
		Text.NL();
		Text.Add("You can’t hold back a chuckle, even as you watch in appreciation as your little vulpine slut exposes ever more of [himher]self to the air. Unable to resist, you quip that you were only planning on brushing [hisher] tail, not the rest of [hisher] body.", parse);
		Text.NL();
		Text.Add("<i>“Hey, those clothes would only get in the way. Plus, I was hoping to convince you to brush the rest of my fur too - especially since you seem so fond of making it messy,”</i> [heshe] chuckles.", parse);
		Text.NL();
		Text.Add("True, true... well, you’ll both have to see if there’s anything you can do with the rest of [hisher] fur afterward.", parse);
		Text.NL();
		Text.Add("The, now naked, [foxvixen] sashays your way, lying down atop your lap, tush high for easy access.", parse);
		naked = true;
		player.AddLustFraction(0.3);
	}
	else {
		Text.Add("Terry approaches, lying down on top of your lap, tush up in the air.", parse);
		Text.NL();
		Text.Add("You detect a hint of embarrassment from the [foxvixen], but when you glance [hisher] way, [heshe] smiles back. Cute.", parse);
	}
	Text.NL();
	Text.Add("With your free hand, you carefully take hold of Terry’s tail and maneuver it to be more accessible. Holding it still, your other hand starts at the base of [hisher] fluffy appendage and starts to smoothly and levelly glide down its length, toward the tip of [hisher] brush.", parse);
	Text.NL();
	Text.Add("You’re rather impressed; despite [hisher] rough lifestyle, Terry’s tail is quite luxuriously cared for, with no major snarls or tangles for you to comb out. At least, you haven’t found any yet. As you continue stroking Terry, you compliment [himher] on how much care [heshe] obviously takes in looking after [himher]self.", parse);
	Text.NL();
	Text.Add("<i>“Yeah, if I let it get too messy, then it becomes pretty hard to move it around... also, it hurts.", parse);
	if(terry.Relation() >= 60) {
		Text.Add(" Plus, keeping it neat makes it better for drawing the eyes of a certain someone,”</i> [heshe] adds, with a smile, wagging [hisher] tail a bit.", parse);
		Text.NL();
		Text.Add("You chuckle and assure [himher] that it most certainly does, then playfully mock-scold [himher] to keep it still; you can’t brush it whilst [heshe]’s waving it about.", parse);
	}
	else {
		Text.Add("”</i>", parse);
		Text.NL();
		Text.Add("You nod and express your sympathies. Still, [heshe] should feel proud of how good a job [heshe] does with it.", parse);
	}
	Text.NL();
	Text.Add("You return your attention to your task, brushing the long gold and white fur in smooth, even strokes. This close to the [foxvixen], you’re intimately aware of the weight of [hisher] body in your lap, the warmth of [hisher] presence and the faintest whiff of [hisher] personal scent.", parse);
	Text.NL();
	Text.Add("It’s very easy to lose yourself in the brushing, almost mechanically stroking as you savor the [foxvixen]’s body against your own. You can feel Terry leaning against you, soft sighs of contentment escaping the [foxvixen] as [heshe] basks under your care and relaxes with a dreamy look in [hisher] face.", parse);
	Text.NL();
	Text.Add("Almost involuntarily, your eyes are drawn to the shapely ass currently perched so invitingly before you. Terry looks almost stupefied; surely [heshe] wouldn’t protest if you were to give it a nice little grope?", parse);
	Text.NL();
	Text.Add("Your gaze flicks to Terry’s head and you can’t help but put on a smile of amusement at the way [hisher] ears are daintily flicking in [hisher] half sleeping state. They’re just too cute; you really want to pet them...", parse);
	Text.NL();
	Text.Add("Then again, maybe you should just keep brushing...", parse);
	Text.Flush();
	
	//[Grope] [Pet] [Nope]
	var options = new Array();
	var tooltip = naked ? Text.Parse("[HeShe]’s just asking for it, flaunting that sweet ass without even the slightest stitch for modesty. Go on and give it a big squeeze...", parse) : Text.Parse("Even through [hisher] [tlowerArmor], Terry’s got a sweet ass. Why not cop a feel while you can?", parse);
	options.push({ nameStr : "Grope",
		func : function() {
			Text.Clear();
			Text.Add("Of course, you have more wits than to just cop a feel out of the blue. Besides, you’ve spent all this time and energy brushing the [foxvixen]’s tail; let’s see what your efforts have done.", parse);
			Text.NL();
			Text.Add("You stop brushing Terry’s tail and gently move to cup the bushy tip of the appendage, lifting it up closer to your face. Playfully, you give it a sniff, filling your nostrils with the Terry’s scent. Bringing it closer, you start to rub your cheek against it, closing your eyes to enjoy the feel of the soft, velvety fur brushing over your [skinDesc]. With your free hand, you start to run your fingers through the fur, half-stroking and half-combing the vulpine brush.", parse);
			Text.NL();
			if(terry.Slut() < 60 && terry.Relation() < 60) {
				Text.Add("<i>“[playername]? What are you doing?”</i> Terry asks, turning [hisher] head slightly to look up at you.", parse);
				Text.NL();
				Text.Add("With a smile, you assure [himher] that you’re simply admiring Terry’s tail... and, perhaps, the butt it’s attached to.", parse);
				Text.NL();
				Text.Add("<i>“Oh… alright then, I guess,”</i> [heshe] says, a bit embarrassed by your actions. However, you also detect a hint of excitement in the [foxvixen].", parse);
			}
			else {
				Text.Add("<i>“Hmm, I knew it. It was just a matter of time,”</i> Terry says knowingly, even as [hisher] tail moves to curl against your cheek.", parse);
				Text.NL();
				parse["nude"] = naked ? " stripped down and" : "";
				Text.Add("Well, [heshe] can’t really blame you; what did [heshe] expect when [heshe][nude] started flaunting this glorious ass right in your face? Grinning, you emphasize your point by giving your slutty [foxvixen]’s butt a nice squeeze with your free hand.", parse);
				Text.NL();
				Text.Add("<i>“Oh!”</i> [heshe] yelps at your sudden intimacy. <i>“You never fail to disappoint, do you? Ya big perv.”</i>", parse);
				Text.NL();
				Text.Add("Your only answer is a triumphant smirk, possessively caressing the fine vulpine butt again.", parse);
				Text.NL();
				Text.Add("<i>“Alright then, you got me. I’m in no position to fight back, so I guess I’m at your mercy,”</i> [heshe] says with a grin.", parse);
				Text.NL();
				Text.Add("That’s true enough... but don’t worry; you know [heshe]’ll enjoy it...", parse);
			}
			Text.NL();
			if(naked) {
				Text.Add("Since your little slut of a [foxvixen] handily stripped down before [heshe] sat down, there’s nothing to stop you admiring the shapely curves of [hisher] ass. Terry’s hips twitch, wiggling [hisher] butt and ensuring your attention is drawn to the heart so boldly emblazoned on [hisher] ass. ", parse);
				
				if(terry.flags["BM"] == 0) {
					Text.Add("What’s this? You look down at Terry’s bubble-butt. A heart-shaped patch of golden fur is stamped on [hisher] right butt-cheek. You didn’t expect to see a tramp stamp on Terry’s butt, however you admit it looks kinda cute.", parse);
					terry.flags["BM"] = 1;
				}
				else {
					Text.Add("Terry’s birthmark stands out on [hisher]’s creamy butt, painting a tantalizing target for your attentions.", parse);
				}
				
				Text.Add(" Unthinkingly, you reach out and touch it, gently caressing the patch-colored fur and the flesh beneath.", parse);
				Text.NL();
				Text.Add("<i>“Wha? Hey, cut it out!”</i> Terry exclaims, batting your hand with [hisher] tail. <i>“Don’t tease my birthmark, you perv!”</i>", parse);
				Text.NL();
				Text.Add("Like [heshe]’s one to talk, you quip back, waving aside the wagging tail to purposefully stroke the [foxvixen]’s tail again. After all, here [heshe] is with your hand on [hisher] ass and wagging [hisher] tail at it.", parse);
				Text.NL();
				Text.Add("<i>“W-well… just don’t tease my birthmark. You know how embarrassed that makes me...”</i>", parse);
				Text.NL();
				Text.Add("You shake your head, assuring [himher] that [heshe] really doesn’t have anything to be embarrassed about - it’s such a cute mark, and [heshe]’s got such a sexy ass to wear it on. [HeShe] should be proud of being able to show off something like that!", parse);
				Text.NL();
				Text.Add("But, if that’s the way [heshe] wants it, you’ll leave it alone - for now. [HeShe]’s kind of cute when [heshe] gets all upset like this...", parse);
				Text.NL();
				Text.Add("<i>“Alright… uhh… thanks.”</i>", parse);
			}
			else {
				Text.Add("Abandoning Terry’s fluffy tail for the moment, you reach for [hisher] [tlowerArmor], slowly tugging it down over [hisher] ass, sliding it down past [hisher] thighs until you have neatly peeled it off of [himher].", parse);
				Text.NL();
				Text.Add("As the [foxvixen] instinctively kicks out lightly with [hisher] legs, you reach down and caress the heart shape emblazoned so boldly on [hisher] ass, tracing the outline of the all-natural tramp stamp.", parse);
				Text.NL();
				Text.Add("<i>“Ah! Not my mark, you perv!”</i> Terry cries out as you trace [hisher] heart-shaped birthmark.", parse);
				if(terry.Relation() >= 60)
					Text.Add(" It doesn’t matter how familiar the two of you are with each other, [heshe] never stops being embarrassed about that. Even if it makes [himher] extra-cute.", parse);
				Text.NL();
				Text.Add("Smiling, you gently pat [himher] on the mark and promise you’ll leave it alone. You have so much else to play with, after all...", parse);
			}
			Text.NL();
			Text.Add("You resume stroking the [foxvixen]’s tail, this time harder and faster than before. No longer are you leisurely stroking, but instead making quick, firm passes through the lush fur. You run your fingers eagerly through [hisher] gold-and-white coat, feeling it gliding between your digits.", parse);
			Text.NL();
			Text.Add("After tiring of this, your hand moves from [hisher] tail to the full, heart-shaped cheeks of [hisher] plump rear. With the same energy, you start to caress and knead the flesh, running your fingers through the fur and cupping each bulging buttock. Your fingers push and slide, stroking the most sensitive spots you can find, shamelessly fondling the vulpine’s tush however you want.", parse);
			Text.NL();
			if(terry.FirstCock()) {
				Text.Add("You become distinctly aware of something hard and wet starting to poke against your thigh. It looks like your little [foxvixen] is enjoying [himher]self as much as you are. You pause your stroking for a few moments and adjust Terry slightly in your lap, moving [himher] into a position where you’ll both be more comfortable.", parse);
				Text.NL();
				Text.Add("A soft moan escapes the [foxvixen]-morph’s lips. Looking over at [hisher] face, you can see a mixture of pleasure and satisfaction.", parse);
				Text.NL();
			}
			var lubed = false;
			if(terry.FirstVag()) {
				Text.Add("A scent tickles at your nostrils and you sniff, trying to figure out what it is. After a few moments, you recognize it as the distinctive scent of female arousal - and it’s coming from between Terry’s legs, no matter how [heshe] squeezes [hisher] thighs together to try and hide it. With a grin, your hand snakes down, worming its way between the [foxvixen]’s clenched thighs to try and touch the dampness of [hisher] cunt.", parse);
				Text.NL();
				Text.Add("<i>“Ah!”</i> [HeShe] cries out as you make contact with [hisher] swollen netherlips. Moisture clings to your digits, proof of [hisher] intense arousal. You didn’t think a tail-stroke would have so much of an effect on the [foxvixen].", parse);
				Text.NL();
				lubed = true;
			}
			Text.Add("Your hands resume stroking the sweet ass in your lap, the now-free [foxvixen] tail sweeping eagerly back and forth in time with your hands. But the stroking isn’t enough; you want a little more...", parse);
			Text.NL();
			Text.Add("Slowly, your fingers creep like spiders into the cleavage of Terry’s bountiful buttocks, purposefully worming their way toward [hisher] ring. Your index finger traces the puckered ring of muscle in leisurely spirals, then starts to push against it.", parse);
			Text.NL();
			if(terry.Slut() < 30) {
				parse["lubed"] = lubed ? ", despite the feminine juices coating your fingers" : "";
				Text.Add("Whimpers of protest escape the [foxvixen]’s mouth as you try and worm your way inside[lubed]. It’s hard, because you have to fight for every inch; you wouldn’t say Terry’s a virgin, but [hisher] ass is definitely watertight. It’s quite obvious that Terry doesn’t know how to relax it properly, and you’re lucky to make it halfway inside.", parse);
				Text.NL();
				Text.Add("<i>“Hng, that hurts!”</i> [heshe] protests.", parse);
				Text.NL();
				Text.Add("Gently shushing [himher], you apologise, but tell [himher] that [heshe] needs to relax; this will stop hurting so much if only [heshe] can just loosen up back here. You try to help by carefully worming your finger back out, much easier than going in, leaving only the very tip still inside. With your free hand, you reach down and start to rub [hisher] lower back, rolling your palm around in smooth, steady circles, trying to coax the tight muscles to loosen.", parse);
				Text.NL();
				Text.Add("Terry sighs in pleasure, and you can feel [himher] slowly becoming more relaxed. Eventually the pressure [hisher] tight rosebud eases enough that you feel comfortable pushing back inside.", parse);
			}
			else if(terry.Slut() < 60) {
				parse["lubed"] = lubed ? ", even with the juices lubing your finger" : "";
				Text.Add("Terry mewls quietly, initially tensing at the pressure you’re exerting. After a few moments, though, the [foxvixen] sighs softly and relaxes, allowing your finger to just glide on in. Though it’s clearly seen some use, Terry’s tailhole is still very tight and you need to push with purpose to glide inside[lubed].", parse);
			}
			else {
				parse["lubed"] = lubed ? Text.Parse("You don’t even need the lube you made from [hisher] pussy-juice. ", parse) : "";
				Text.Add("There’s not even the slightest hesitation from your slutty [foxvixen]. [lubed]Terry’s well-trained asshole opens up before you, allowing you to slide in without a hitch. The only problem is getting your finger back <b>out</b>; the little slut has enough trained control to grip down like a vice when [heshe] wants.", parse);
			}
			Text.NL();
			Text.Add("<i>“Ah! Ohm!”</i> the [foxvixen] moans as you pump your finger into [hisher] ass. [HeShe] pants, desire clear in [hisher] eyes when [heshe] sneaks a glance at you. Your heart skips a beat, a stab of desire surging through you.", parse);
			Text.NL();
			Text.Add("Maybe you should invite the [foxvixen] for a little tumble in the hay...", parse);
			Text.Flush();
			
			//[Sex][No Sex]
			var options = new Array();
			options.push({ nameStr : "Sex",
				func : function() {
					Text.Clear();
					if(terry.Relation() < 60)
						Text.Add("<i>“Sounds good to me!”</i> Terry readily agrees, suppressing a moan as you continue to finger [himher].", parse);
					else
						Text.Add("<i>“Finally! I was wondering how many more signs that I want it you’d need to spring into action,”</i> Terry teases, clenching [hisher] ass around your finger.", parse);
					Text.NL();
					Text.Add("With a grin, you extract your finger from Terry’s tailhole, petting [hisher] butt affectionately before giving [himher] a helping hand to push out of your lap and stand up.", parse);
					Text.NL();
					
					var scenes = new EncounterTable();
					scenes.AddEnc(function() {
						parse["fox"] = terry.HorseCock() ? "horse" : "fox";
						Text.Add("<i>“So what are we doing? I’m already rock-hard. Maybe you’d like to add some [fox]-meat to your diet? Or maybe you just need something to fill you up?”</i> [heshe] suggests with a lusty grin.", parse);
					}, 1.0, function() { return terry.FirstCock(); });
					scenes.AddEnc(function() {
						Text.Add("<i>“What’s it gonna be, [playername]? You finally going to break my virgin pussy in?”</i>", parse);
					}, 1.0, function() { return terry.FirstVag() && terry.FirstVag().virgin && (player.FirstCock() || player.Strapon()); });
					scenes.AddEnc(function() {
						Text.Add("<i>“Tell me what are we doing? I’m so wet I can barely stand it anymore!”</i>", parse);
					}, 1.0, function() { return terry.FirstVag() && terry.FirstVag().virgin == false; });
					scenes.AddEnc(function() {
						Text.Add("<i>“So what are you planning? Personally, I’m a bit hungry. Think you could feed me?”</i>", parse);
					}, 1.0, function() { return player.FirstCock(); });
					scenes.AddEnc(function() {
						Text.Add("<i>“I got an itch in my butt, and I just can’t reach it. Got something long and hard to help me with?”</i>", parse);
					}, 1.0, function() { return player.FirstCock() || player.Strapon(); });
					
					scenes.AddEnc(function() {
						Text.Add("<i>“Feeling a bit thirsty, think you can get me something to drink? Maybe some juice?”</i> [heshe] grins.", parse);
					}, 1.0, function() { return player.FirstVag(); });
					scenes.AddEnc(function() {
						Text.Add("<i>“My boobs feel so heavy… I could really use a hand over here,”</i> [heshe] says, caressing [hisher] breasts.", parse);
					}, 1.0, function() { return terry.Lactation() && (terry.Milk() >= terry.MilkCap()); });
					
					scenes.Get();
					
					player.AddLustFraction(0.5);
					terry.AddLustFraction(1);
					terry.relation.IncreaseStat(50, 1);
					
					Text.Flush();
					
					TerryScenes.SexPromptChoice(function() {
						Text.Clear();
						Text.Add("<i>“What? After getting me all worked up, you’re going to back down <b>now</b>!?”</i>", parse);
						Text.NL();
						Text.Add("Well… yes.", parse);
						Text.NL();
						Text.Add("Terry sighs, frowning and looking incredulously at you. <i>“I can’t believe you’re going to leave me hanging after all that. Sometimes you can be kind of a jerk you know? Alright then, guess I have no say in the matter anyway, so suit yourself! ”</i> the [foxvixen] exclaims, gathering [hisher] clothes and walking away.", parse);
						Text.Flush();
						
						terry.relation.DecreaseStat(30, 3);
						
						Gui.NextPrompt();
					}, true);
				}, enabled : true,
				tooltip : Text.Parse("Come on, [heshe]’s begging for it!", parse)
			});
			options.push({ nameStr : "No sex",
				func : function() {
					Text.Clear();
					Text.Add("Steeling yourself, you just grin innocently back at the pleading [foxvixen] in your lap. As you do, your finger continues to pump back and forth, curling slightly as you twisted in order to continue teasing [himher]. ", parse);
					Text.NL();
					Text.Add("Terry’s toes curl, tail thrashing a bit. [HeShe] continues to look pleadingly at you, grabbing at the ground as you continue to pleasure [himher]. Despite [hisher] obvious desire, [heshe] says nothing.", parse);
					Text.NL();
					Text.Add("Finger still methodically pumping away, you turn your attention back to the [foxvixen]’s twitching tail, your other hand still smoothly stroking it. You manage to get a nice rhythm going; stroke-pump, stroke-pump, combining each brushing motion with a matching thrust into Terry’s ass. You wonder how much more of this [heshe] can take...", parse);
					Text.NL();
					Text.Add("Some other time, you might be interested in seeing, but right now, you don’t feel that way. Instead, you carefully pop your finger free from the sucking embrace of Terry’s tailhole, giving [himher] a conciliatory pat on the butt with that hand. You continue stroking for a few moments, before you slowly put the brush away and cheerfully announce Terry’s good to go.", parse);
					Text.NL();
					if(terry.Relation() < 60) {
						parse["nude"] = naked ? Text.Parse(", and finds [hisher] clothes", parse) : "";
						Text.Add("<i>“Huh? Oh, right... thanks,”</i> the [foxvixen] mumbles. [HeShe] sounds a bit disappointed as [heshe] carefully slips out of your lap[nude].", parse);
					}
					else {
						Text.Add("<i>“Wait, what? That’s all?”</i> the [foxvixen] asks in protest.", parse);
						Text.NL();
						Text.Add("Cheerfully, you assure [himher] that’s all; [hisher] tail’s all nice and groomed now. Did [heshe] enjoy your efforts?", parse);
						Text.NL();
						Text.Add("<i>“Well, yes. But after all that teasing, what am I supposed to do about this?”</i>", parse);
						if(terry.FirstCock())
							Text.Add(" [HeShe] points to [hisher] erect cock. Already at full mast and dripping pre.", parse);
						else
							Text.Add(" [HeShe] points to [hisher] moist cunt. Already puffy and dripping out the signals of [hisher] excitement.", parse);
						Text.NL();
						Text.Add("Smiling, you reach out and playfully tussle the [foxvixen]’s ears with your fingertips. After all, what’s wrong with [himher] being a little excited? You quite like how [heshe] looks like that.", parse);
						Text.NL();
						Text.Add("<i>“Aww, come on! You’re not going to leave me hanging like this, are you?”</i> Terry asks, pouting pleadingly at you.", parse);
						Text.NL();
						Text.Add("Ha! And [heshe] calls you a perv. Well, you did just want to touch that fluffy tail of [hishers], getting [himher] all worked up was just a bonus. Considering how cute [heshe] looks when [heshe] pleads like that, you think you’re going to make [himher] wait for it - at least for a little while.", parse);
						Text.NL();
						Text.Add("<i>“You big meanie...”</i> [heshe] huffs.", parse);
						Text.NL();
						Text.Add("If [heshe]’s a good [boygirl], you promise to help [himher] with that. For now though, [heshe] should get dressed.", parse);
						Text.NL();
						Text.Add("Sighing, Terry concedes. <i>“Fiiiine. I guess there’s no arguing with you...”</i>", parse);
						Text.NL();
						Text.Add("Good [boygirl].", parse);
					}
					Text.Flush();
					
					player.AddLustFraction(0.3);
					terry.AddLustFraction(1);
					terry.relation.IncreaseStat(50, 1);
					
					TerryScenes.Prompt();
				}, enabled : true,
				tooltip : Text.Parse("It’s more fun to keep teasing [himher]; let’s just watch [himher] squirm.", parse)
			});
			Gui.SetButtonsFromList(options, false, null);
		}, enabled : true,
		tooltip : tooltip
	});
	options.push({ nameStr : "Pet",
		func : function() {
			Text.Clear();
			Text.Add("Slowly, your free hand stretches out toward the dozy [foxvixen]’s head, even as the other continues to languidly caress [hisher] tail. Your fingers stroke softly through the flowing red locks that crown Terry’s head, feeling it gliding so smoothly between your digits. ", parse);
			Text.NL();
			Text.Add("After a few moments of luxuriating there, your hands reach higher, for the twitching vulpine ears that crown the [foxvixen]’s head. You take the closest one carefully between forefinger and thumb, slowly rubbing tender circles around its surface with your digits, then moving down to stroke the base of the triangular lobe.", parse);
			Text.NL();
			Text.Add("<i>“Hmm, that feels good,”</i> Terry says with a happy smile, eyes closing shut as [heshe] enjoys your caress.", parse);
			Text.NL();
			Text.Add("You grin at the contentment your vulpine pet is showing, continuing to caress [hisher] ear for a moment before moving your fingers to the top of [hisher] scalp. With just the right amount of pressure, you start to scratch [himher] between the ears in that spot you’re sure [heshe]’ll just love.", parse);
			Text.NL();
			Text.Add("A soft whimper escapes [himher] and Terry tries to disguise it with a fake cough. <i>“Umm, sorry. I must’ve choked or something.”</i> Of course, you see right through. [HeShe] looks so much like a pet fox right now…", parse);
			Text.NL();
			Text.Add("For now, you decide to ignore Terry’s lame excuse and focus on your ministrations. Your whole palm now overlays itself on Terry’s head, stroking back and forth, tussling [hisher] ears from side to side. Your hand goes gliding down through the flowing red locks, held together in the crude tail that the [foxvixen] sports, and you can’t resist tickling at the back of [hisher] neck.", parse);
			Text.NL();
			Text.Add("<i>“A bit more to the left,”</i> Terry says, wagging [hisher] tail softly.", parse);
			Text.NL();
			Text.Add("With a grin, you comply in shifting your fingers and scratching what is clearly an itchy spot. Flippantly, you comment that you always thought a love of being petted was more a dog-thing than a fox-thing. Or are you just that good at it, hmm?", parse);
			Text.NL();
			Text.Add("<i>“Shut it and keep stroking - Oh! - right there!”</i> [HeShe] whimpers again, this time not bothering to hide it.", parse);
			Text.NL();
			Text.Add("Smirking openly now, you continue to scratch away, your other hand abandoning its place at Terry’s tail to creep up the small of [hisher] back, stroking in search of further itches to soothe and sweet-spots to touch.", parse);
			Text.NL();
			Text.Add("Soon, Terry is openly groaning in pleasure, wriggling like an overgrown puppy in your lap as your fingers stroke all the right spots. [HisHer] kneeling position prevents [himher] from kicking out like a dog getting a belly-rub, but it certainly doesn’t stop [hisher] tail beating a tattoo of delight against your side.", parse);
			Text.NL();
			Text.Add("You while away some very pleasant minutes simply petting, stroking and scratching your happy little pet, [hisher] tongue lolling out shamelessly in pleasure, but eventually you have to stop. With one last gentle stroke on the head, you inform Terry that [hisher] brushing is done now.", parse);
			Text.NL();
			Text.Add("<i>“Aw, already?”</i> [heshe] asks, a hint of disappointment apparent in [hisher] voice.", parse);
			Text.NL();
			Text.Add("Yes, already, you quip back playfully.", parse);
			Text.NL();
			Text.Add("Sighing, Terry gently touches up [hisher] hair and smiles at you. <i>“Thanks a lot, [playername]. I should have you brush my tail more often.”</i>", parse);
			Text.NL();
			parse["l"] = player.LowerBodyType() == LowerBodyType.Single ? ", so to speak," : "";
			Text.Add("You smile back, assuring [himher] that you’d be happy to give [himher] a hand whenever [heshe] feels like it, but for now, you both have other things to do. Terry sighs and vacates your lap, whilst you get back to your feet[l] and head off again.", parse);
			Text.Flush();
			
			player.AddLustFraction(0.3);
			terry.AddLustFraction(0.3);
			terry.relation.IncreaseStat(50, 2);
			
			Gui.NextPrompt();
		}, enabled : true,
		tooltip : Text.Parse("Terry’s just too much like a big sleepy dog to resist. Let’s see what petting [himher] will do when [heshe]’s in this kind of state...", parse)
	});
	options.push({ nameStr : "Nope",
		func : function() {
			Text.Clear();
			Text.Add("Quietly, you continue to brush the [foxvixen]’s sleek, clean tail-fur, running the prongs of the brush through [hisher] tail in companionable silence. The two of you remain there for several pleasant moments, just feeling each other’s bodies, before you put the brush aside and announce that you’re finished.", parse);
			Text.NL();
			Text.Add("Terry lifts [himher]self off your lap, reaching back to pet [hisher] tail. <i>“Alright, that looks great. It sure beats having to brush by myself. Thanks a lot, [playername].”</i>", parse);
			Text.NL();
			Text.Add("It was your pleasure, you reply, then add that if ever [heshe] wants a hand, you’d be happy to help again. Gathering up your own stuff, you head back off on your way again.", parse);
			Text.Flush();
			terry.relation.IncreaseStat(50, 1);
			
			Gui.NextPrompt();
		}, enabled : true,
		tooltip : Text.Parse("You promised Terry you were only going to brush [hisher] tail, so you’ll push aside the temptation and keep at it.", parse)
	});
	Gui.SetButtonsFromList(options, false, null);
}


TerryScenes.CheckFluids = function() {
	let terry = GAME().terry;
	let player = GAME().player;

	var parse : any = {
		foxvixen       : terry.mfPronoun("fox", "vixen"),
		boygirl        : terry.mfPronoun("boy", "girl"),
		armorDesc      : function() { return terry.ArmorDesc(); },
		topArmorDesc   : function() { return terry.ArmorDesc(); },
		lowerArmorDesc : function() { return terry.LowerArmorDesc(); },
		tbreastDesc   : function() { return terry.FirstBreastRow().Short(); },
		tcockDesc      : function() { return terry.MultiCockDesc(); },
		bellydesc      : function() { return terry.StomachDesc(); },
		playername : player.name
	};
	parse = terry.ParserPronouns(parse);
	
	terry.flags["Skin"]++;
	
	Text.Clear();
	Text.Add("Looking Terry over, you tell the [foxvixen] that you need [himher] to strip for what you have in mind.", parse);
	Text.NL();
	if(terry.Relation() < 30) {
		Text.Add("The [foxvixen] glares daggers at you, but ultimately complies with a resigned sigh. Slowly [heshe] removes [hisher] [armorDesc] and sets it aside.", parse);
	}
	else if(terry.Relation() < 60) {
		Text.Add("[HeShe] raises a brow at your request, but moves to comply. <i>“Now you’re making me dubious about your intentions, [playername],”</i> [heshe] says as [heshe] removes [hisher] [armorDesc].", parse);
		Text.NL();
		Text.Add("You assure [himher] that your intentions are innocent. Well, innocent-ish.", parse);
		Text.NL();
		Text.Add("<i>“Riiiiight,”</i> [heshe] replies rolling [hisher] eyes.", parse);
	}
	else { //high rel
		Text.Add("<i>“That eager to see me naked, huh? One look and you just can’t get enough, is that it?”</i> [heshe] asks teasingly.", parse);
		Text.NL();
		Text.Add("[HeShe] sure has you figured out; but, seriously, you really do need [himher] naked for this, too.", parse);
		Text.NL();
		Text.Add("<i>“Oh, I didn’t say I wouldn’t strip for you. I just thought that I’d get you to help me a little. Especially since you’re in such a rush to see me in my birthday suit,”</i> [heshe] grins.", parse);
		Text.NL();
		Text.Add("Rolling your eyes playfully at the horny [foxvixen]’s antics, you step forward to help [himher] get undressed.", parse);
		Text.NL();
		Text.Add("Terry giggles as you begin undoing [hisher] [topArmorDesc]. <i>“You’re such a pervert, [playername]. All it took was a little invitation and you came to me like a moth to a flame,”</i> [heshe] grins.", parse);
		Text.NL();
		Text.Add("What moth worthy of the name could resist when the flame is as enticing as Terry, you quip back. Having removed [hisher] [topArmorDesc], you start to work on [hisher] [lowerArmorDesc]. The coquettish [foxvixen] eagerly plays along, daintily lifting [hisher] foot to help you get the gear off and teasingly brushing [hisher] fluffy tail against your side, until finally [heshe] is totally naked before you.", parse);
		Text.NL();
		Text.Add("<i>“Done? Great! Now let’s get started,”</i> Terry says, wrapping [hisher] arms around your neck and pulling you into a kiss.", parse);
		Text.NL();
		Text.Add("You let the [foxvixen]’s lips touch your own, for a moment, but then insistently push [himher] away. Now who’s the pervert? You just said you needed [himher] to be naked, you never said you were out for sex.", parse);
		Text.NL();
		Text.Add("<i>“What? But I thought...</i> [heshe] trails off, pouting.", parse);
		Text.NL();
		Text.Add("You gently scold [himher] to not look at you like that; [heshe]’s the one who let [hisher] libido carry [himher] away. But, you assure [himher] that [heshe]’ll enjoy what you have in mind, and maybe you’ll have sex with [himher] after you’re done...", parse);
		Text.NL();
		Text.Add("<i>“Hmph, I’ll be holding you to that promise,”</i> [heshe] replies, taking a step back and crossing [hisher] arms. <i>“Alright then, just carry on with whatever you had in mind.”</i>", parse);
	}
	Text.NL();
	//BREASTS
	if(terry.Lactation()) {
		Text.Add("Your eyes are drawn to the [foxvixen]’s [tbreastDesc], filled with their liquid cargo... but just how full are they? Well, there’s only one way to get a proper estimate.", parse);
		Text.NL();
		Text.Add("Closing the distance between you, your hands reach out for Terry’s tits. ", parse);
		if(terry.Cup() >= TerryFlags.Breasts.Dcup)
			Text.Add("The heaving, near basketball-sized breasts are far too large for you to have a hope of fitting in a single hand. Instead, both hands reach out for a single vulpine mammary, wrapping themselves around the abundant titflesh as best they can. Even with this presumptory touch, you can feel the weight of it.", parse);
		else if(terry.Cup() >= TerryFlags.Breasts.Ccup)
			Text.Add("Terry’s breasts squish nicely between your fingers, just a little bit too big for your hands, but not so much that you can’t effectively feel them with one hand to each one.", parse);
		else if(terry.Cup() >= TerryFlags.Breasts.Bcup)
			Text.Add("The [foxvixen] has breasts perfectly sized for this, each nestling snugly into your grasping fingers and easy to grope.", parse);
		else
			Text.Add("[HisHer] petite breasts are actually a little tricky to get a proper hold of, they’re so small, but it should certainly make it easier to do what you have in mind.", parse);
		Text.NL();
		Text.Add("A soft moan escapes the [foxvixen]’s lips. <i>“Not so rough! They’re sensitive...”</i>", parse);
		Text.NL();
		Text.Add("You promise [himher] that you’ll try to be more gentle, and give [himher] a moment to adjust to the feeling of your fingers wrapping around the soft flesh. Once [heshe] seems to be comfortable, you start to gently knead [hisher] breast, groping and squeezing, lifting them in your palms as best you can to better feel their weight.", parse);
		Text.NL();
		if(terry.Milk() >= TerryFlags.MilkLevel.VeryHigh)
			Text.Add("You’re amazed by the sheer weight of Terry’s tits in your hands; there’s no question that [heshe] is absolutely bloated with milk. It’s amazing that it doesn’t leak automatically from the sheer quantity contained within; it’s effortless for you to coax milk forth, and once [heshe] starts seeping, a simple squeeze can actually send a fine squirt of milk flying.", parse);
		else if(terry.Milk() >= TerryFlags.MilkLevel.High)
			Text.Add("The weight of the [foxvixen]’s breasts is a palpable thing, so engorged with milk that your first exploratory squeeze makes [himher] start to drip. By the time you are finished with your explorations, a constant trickle of milk is seeping from [hisher] nipples, slowly trailing down [hisher] breasts.", parse);
		else if(terry.Milk() >= TerryFlags.MilkLevel.Mid)
			Text.Add("You can feel a noticeable weight to Terry’s bosom as you manipulate it with your hands. Almost as soon as your groping caresses tease [hisher] nipples into erecting, they start to drip whiteness from their tips. Terry clearly has a good supply of milk in [hisher] bosom; it would be very easy to tap [himher] if you wanted.", parse);
		else if(terry.Milk() >= TerryFlags.MilkLevel.Low)
			Text.Add("There’s a little weight to [hisher] breasts, just barely enough for you to notice them. Terry moans softly as you knead and stroke, though it takes a lot of attention to coax a single precious bead of milk from [hisher] bosom. It looks like Terry doesn’t have much milk in [hisher] breasts at all, you’d probably drink [himher] dry if you tried to nurse.", parse);
		else
			Text.Add("Terry’s breasts feel surprisingly light in your hands. And though you knead and stroke until [hisher] nipples are visibly engorged and [heshe] is moaning softly in pleasure, not a drop of precious milk comes out. It looks like [heshe] has been completely tapped; there isn’t any milk left in [himher].", parse);
		if(terry.FirstCock()) {
			Text.NL();
			Text.Add("Having finished testing Terry’s breasts, your attention is drawn in turn to [hisher] [tcockDesc]. Well, since you’re here and all...", parse);
			Text.NL();
		}
	}
	//COCK
	if(terry.FirstCock()) {
		if(terry.HorseCock()) {
			parse["preg"] = terry.PregHandler().IsPregnant() ? Text.Parse(", slapping heavily against [hisher] [bellydesc]", parse) : "";
			Text.Add("The footlong equine shaft hanging heavily between the [foxvixen]’s legs draws your hand like a magnet, compelling you to stroke its mottled brown length. A whimper bubbles from Terry’s throat as you touch the overly sensitive organ, which practically leaps erect in your hands[preg]. Not wanting to push [himher] too far, you quickly move to instead cup the heavy balls that fuel [hisher] new beast of a dick.", parse);
		}
		else {
			Text.Add("Your hand brushes the [foxvixen]’s dainty little vulpine dick, the healthy pink flesh pulsing under your touch, growing just that bit firmer in response. Terry fidgets a little as you slide up and down across the [foxvixen]’s petite shaft, caressing its bobbing pointy tip before reaching down to cup the equally petite testicles swaying between [hisher] legs.", parse);
		}
		Text.NL();
		Text.Add("Terry moans as you knead [hisher] shaft and balls, hips moving against your touch.", parse);
		Text.NL();
		Text.Add("Calmly but firmly, you tell the [foxvixen] to stop moving; you can’t measure how heavy [hisher] load is when [heshe] keeps wriggling around like that.", parse);
		Text.NL();
		Text.Add("<i>“Oh yeah? Then maybe you shouldn’t give me a handjob while checking for that. You try staying still when someone is jacking you off,”</i> [heshe] replies in mild annoyance.", parse);
		Text.NL();
		parse["cutehuge"] = terry.HorseCock() ? "huge" : "cute";
		Text.Add("Clicking your tongue in mock-reproach, you chide Terry that [heshe]’s supposed to be a big, tough thief; surely [heshe] can keep still for a few seconds whilst you’re finishing weighing up this [cutehuge] [tcockDesc] of [hishers]? Or is the big bad [foxvixen] just a pervy little wimp, you ask, playfully poking the tip of [hisher] dick for emphasis.", parse);
		Text.NL();
		Text.Add("<i>“Hng! Me? A perv? What about you? Fondling me so casually...”</i>", parse);
		Text.NL();
		Text.Add("You’re just performing a routine medical check-up on your pet [foxvixen]; [heshe]’s the one who’s getting all worked up over it, you reply, shaking a finger at [himher] as if in chastisement.", parse);
		Text.NL();
		Text.Add("The [foxvixen] looks at you with disdain. <i>“You’re not convincing anyone… but fine. I’ll try to stop moving if you stop stroking me.", parse);
		if(terry.Slut() < 30)
			Text.Add("”</i>", parse);
		else if(terry.Slut() < 60) {
			Text.Add(" Not that I mind getting a handjob,”</i> [heshe] grins mischievously.", parse);
			Text.NL();
			Text.Add("You just bet [heshe] doesn’t. Well, if that’s what [heshe] needs to convince [himher] to stay still, you’re happy for [himher] to think of it that way.", parse);
		}
		else {
			Text.Add(" Of course, if you really want to check the size of my load, nothing can be quite as accurate as seeing it for yourself. So feel free to keep going,”</i> [heshe] says, grinning mischievously.", parse);
			Text.NL();
			Text.Add("Pervert. [HeShe]’s definitely a pervert. But, [heshe]’s <b>your</b> pervert, and that’s part of the reason why you love [himher]. You’ll consider treating [himher] to some R&R later, but right now you mean business. So [heshe] can either cooperate and get some later, or get a serious case of blue balls. What’s it gonna be?", parse);
			Text.NL();
			Text.Add("The [foxvixen] sighs with a knowing smile. <i>“Well, if you put it that way. I guess I have no choice but to obey, right?”</i>", parse);
			Text.NL();
			Text.Add("Good [boygirl].", parse);
		}
		Text.NL();
		parse["petitebulging"] = terry.HorseCock() ? "bulging" : "petite";
		Text.Add("Your hands continue to stroke and caress the [foxvixen]’s [petitebulging] balls, gently kneading them and rolling them around on your palms as you try to gauge their weight and firmness, and from that the amount of semen stored within.", parse);
		Text.NL();
		var cum = terry.Cum();
		if(cum >= TerryFlags.CumLevel.High)
			Text.Add("It goes without saying that Terry’s balls are full of cum; you can practically see the difference in size even before you touch them. In your hands, the seed-bloated orbs have a substantial amount of weight to them, straining over their liquid contents to the point the tension is palpable with the slightest touch. The [foxvixen] can’t hold back a plaintive moan, a bead of precum visibly welling from [hisher] shaft at the gentle pressure you inflict. You really doubt Terry would object to getting some venting, if you were of a mind.", parse);
		else if(cum >= TerryFlags.CumLevel.Mid)
			Text.Add("There’s a very real weight to Terry’s nuts, well beyond what [heshe] should normally have. There’s no question that there’s an abundance of semen in there; you can feel the firmness of [hisher] balls under your fingers as it packs them full. A quiver wracks the [foxvixen]’s form, and a moan escapes Terry’s mouth, letting you know how sensitive they are as a result. It’d be quite messy if you were to tap [himher] now.", parse);
		else if(cum >= TerryFlags.CumLevel.Low)
			Text.Add("You can definitely feel a little extra weight to the [foxvixen]’s balls, and there’s a definite firmness to the touch. You’d hesitate to say that [heshe]’s extremely loaded with semen, but it feels like [heshe] has enough for a nice fuck if you were in the mood.", parse);
		else
			Text.Add("Despite your efforts, you can’t really feel any weight beyond what you’d consider normal for Terry. Not only that, but they feel quite soft to the touch. You’d have to guess that [heshe]’s pretty much running on empty, practically nothing left inside them at all. Might be best to leave [himher] to fill up a while before your next session.", parse);
	}
	Text.NL();
	
	terry.AddLustFraction(0.3);
	
	Text.Add("Satisfied with your assessment, you let the [foxvixen] go and take a step back, assuring [himher] that you’re finished now and [heshe] can put [hisher] clothes back on.", parse);
	Text.NL();
	if(terry.Relation() < 30)
		Text.Add("<i>“Alright then,”</i> Terry says, putting [hisher] [armorDesc] back on.", parse);
	else if(terry.Relation() < 60) {
		Text.Add("<i>“Oh? You’re finished? Alright then,”</i> [heshe] says with a hint of disappointment as [heshe] begins dressing back up.", parse);
		Text.NL();
		Text.Add("This is definitely not the same shy [foxvixen] you used to know; [heshe]’s really changed since you’ve been together. Maybe you should consider sticking around a little longer...", parse);
	}
	else {
		Text.Add("<i>“Aww, you’re not even going to play with me?”</i> [heshe] asks provocatively.", parse);
		Text.NL();
		Text.Add("You make a show of it, but you really are considering the question. [HeShe] <b>is</b> right there, and clearly ready to play... it’d honestly be kind of a shame to waste it... ", parse);
		Text.Flush();
		
		var backFunc = function() {
			Text.Clear();
			Text.Add("<i>“Alright then, but maybe later?”</i>", parse);
			Text.NL();
			Text.Add("Nodding your head, you assure the [foxvixen] that it should be possible.", parse);
			Text.NL();
			Text.Add("<i>“It’s a promise!”</i> [heshe] exclaims, gathering [hisher] [armorDesc].", parse);
			Text.Flush();
			
			TerryScenes.Prompt();
		};
		
		//[Sex] [No Sex]
		var options = new Array();
		options.push({ nameStr : "Sex",
			func : function() {
				Text.Clear();
				Text.Add("<i>“I knew you couldn’t resist my sexy charms, you big perv,”</i> Terry teases.", parse);
				Text.Flush();
				
				TerryScenes.SexPromptChoice(backFunc, true);
			}, enabled : true,
			tooltip : Text.Parse("[HeShe] wants to play, and you’re in the mood as well; why not?", parse)
		});
		options.push({ nameStr : "No sex",
			func : backFunc, enabled : true,
			tooltip : Text.Parse("No, you’re not really in the mood. [HeShe] can put [hisher] clothes back on.", parse)
		});
		Gui.SetButtonsFromList(options, false, null);
		
		return;
	}
	Text.Flush();
	
	TerryScenes.Prompt();
}


/* TERRY TF SCENES */




// Need if(terry.flags["TF"] & TerryFlags.TF.TriedItem && !(terry.flags["TF"] & TerryFlags.TF.Rosalin))
TerryScenes.RosalinTF = function() {
	let terry = GAME().terry;
	let player = GAME().player;
	let rosalin = GAME().rosalin;

	var parse : any = {
		playername : player.name,
		rearsDesc  : function() { return rosalin.EarDesc(true); },
		foxvixen   : terry.mfPronoun("fox", "vixen")
	};
	parse = terry.ParserPronouns(parse);
	parse = rosalin.ParserPronouns(parse, "r");
	
	Text.Clear();
	Text.Add("<i>“Alchemy doesn’t work?”</i> Rosalin’s [rearsDesc] perk in curiosity as [rheshe] studies Terry. The alchemist turns around, quickly whipping together a potion from the ingredients [rheshe] has at hand. <i>“Try this, I want to see it for myself,”</i> [rheshe] urges the [foxvixen], handing [himher] the bottle. Terry looks a bit unsure of about this, but at your nod, [heshe] drinks contents of the offered flask. Just as before, the collar glows pink, and absolutely nothing happens.", parse);
	Text.NL();
	Text.Add("<i>“Hmm,”</i> Rosalin concludes, poking at the offending collar to little effect. <i>“Give me a few minutes, okay?”</i> Terry gulps as the determined alchemist starts pouring ingredients together into a bowl. This one takes significantly longer than the last, and the result is a vile smelling yellow goop.", parse);
	Text.NL();
	Text.Add("<i>“I… I’m supposed to drink that?”</i> Terry falters, shaking [hisher] head fearfully, backing away quickly.", parse);
	Text.NL();
	Text.Add("<i>“For science!”</i> Rosalin proclaims as [rheshe] advances on the poor [foxvixen], catching [himher] off guard and prying open [hisher] mouth, pouring the contents down [hisher] throat before you have a chance to intervene. Terry looks like [heshe] is going to be ill, swaying back and forth in place while smoke pours out of [hisher] mouth, nose and ears. The collar is working overtime, shining so brightly that it almost hurts your eyes. Finally, the reaction seems to wear off. As the smoke settles, you can make out Terry again, unchanged.", parse);
	Text.NL();
	Text.Add("<i>“That is cheating!”</i> Rosalin complains, peeking out from [rhisher] position huddling behind [rhisher] workbench. <i>“That should’ve been enough hair balls to turn a bloody elephant into a housecat!”</i> [rHeShe] turns [rhisher] back on you, throwing ingredients together with newfound fervor, muttering something about magic.", parse);
	Text.NL();
	Text.Add("Terry tugs you away urgently, putting as much distance between you and the alchemist as [heshe] can. <i>“Don’t take me to that crazy person again, okay [playername]?”</i> the thief pleads anxiously, hiding behind you from the vindictive alchemist. <i>“I’m not drinking anything [rheshe] makes, and that’s that!”</i> [HeShe] looks vehement about it; [heshe]’d probably take [hisher] chances with the collar and try to run for it should you force the issue again.", parse);
	Text.Flush();
	
	terry.relation.DecreaseStat(-100, 3);
	TimeStep({hour: 1});
	terry.flags["TF"] |= TerryFlags.TF.Rosalin;
	
	Gui.NextPrompt();
}

TerryScenes.JeanneTFFirst = function() {
	let terry = GAME().terry;

	var parse : any = {
		foxvixen : terry.mfPronoun("fox", "vixen")
	};
	parse = terry.ParserPronouns(parse);
	
	Text.Clear();
	Text.Add("You ask Jeanne if she recognizes this collar, pointing at the object in question, sitting secure as always around Terry’s neck.", parse);
	Text.NL();
	Text.Add("<i>“Hmm? Yes, I made it. It is nice, do you not think?”</i> she replies, smiling.", parse);
	Text.NL();
	Text.Add("Yes, she did a wonderful job on it, you assure her. Best to keep her in a good mood for this, after all. You then explain you had a question; you attempted to transform Terry here, but the collar basically stopped the transformation from happening. Is it supposed to do that?", parse);
	Text.NL();
	Text.Add("<i>“Yes, certain transformatives and alchemical substances can interfere with the collar’s magic, something that can have disastrous consequences for the wearer. I have placed an enchantment on it to deal with this kind of risk. If you try to take a transformative while wearing the collar, the collar will nullify all of the item’s transformative properties,”</i> she explains. <i>“If you want to use a transformative, you have to take it off first.”</i>", parse);
	Text.NL();
	Text.Add("Looking at Terry for a moment, you then ask if there is any possible way that you could apply a transformative to Terry without taking the collar off first. ", parse);
	if(terry.Relation() >= 60)
		Text.Add("You trust Terry's loyalty without question, you know [heshe] would never leave you, but the two of you really prefer that [heshe] keeps the collar on.", parse);
	else if(terry.Relation() >= 30)
		Text.Add("Terry's gotten a lot better since you first 'recruited' [himher], but still, you're not entirely certain you'd trust [himher] not to run away if you took the collar off.", parse);
	else
		Text.Add("You have little doubt that if you removed Terry's collar, the [foxvixen] would bolt for freedom, after all.", parse);
	Text.NL();
	Text.Add("<i>“Then I suppose you have a dilemma on your hands,”</i> she states nonchalantly.", parse);
	Text.NL();
	Text.Add("Please, does she have any ideas how to solve this? You're sure someone as smart as her must have some inkling on how to pull it off - you really would appreciate it.", parse);
	Text.NL();
	Text.Add("<i>“Well...”</i> she trails off, tapping her lips. <i>“I can probably come up with something, but it will cost you. I will also need some materials.”</i>", parse);
	Text.NL();
	Text.Add("That's certainly alright with you; it's about what you expected. You thank her for doing this for you, and then ask if there's anything else she needs to tell you about these specialized transformatives.", parse);
	Text.NL();
	Text.Add("<i>“I cannot prepare just any kind of transformative like this, but having some options beats having none, I think. Of course, you could always cave and just remove the collar,”</i> she smiles.", parse);
	Text.NL();
	Text.Add("You tell her that you'll keep that in mind.", parse);
	Text.Flush();
	
	TimeStep({minute: 30});
	terry.flags["TF"] |= TerryFlags.TF.Jeanne;
	
	JeanneScenes.Talk();
}

TerryScenes.JeanneTFPrompt = function() {
	let terry = GAME().terry;
	let player = GAME().player;
	let party : Party = GAME().party;

	var parse : any = {
		playername : player.name
	};
	parse = terry.ParserPronouns(parse);
	
	//[name]
	var options = new Array();
	
	var AddItem = function(item : TFItem, scene : any, name : string, tooltip : string, costmult : number, horseTF? : boolean) {
		options.push({ nameStr : name || item.name,
			func : function(obj : any) {
				parse["item"] = obj.str;
				var coin = obj.mult * TerryScenes.JeanneTFCost();
				parse["coin"] = Text.NumToText(coin);
				
				Text.Clear();
				Text.Add("<i>“For that, I will need [item], plus [coin] coins,”</i> she says, showing you a scroll of what she’ll be needing.", parse);
				if(terry.PregHandler().IsPregnant() && item == AlchemyItems.Testos) {
					Text.NL();
					Text.Add("<i>“Sorry, [playername]. Trying to modify [hisher] womb while [heshe] is still pregnant could have disastrous consequences both for [himher] and the baby. So I am going to have to refuse to do so until Terry has given birth.”</i>", parse);
					Text.NL();
					Text.Add("Jeanne has a point; looks like you’ll have to wait until Terry has [hisher] baby.", parse);
					Text.Flush();
					TerryScenes.JeanneTFPrompt();
				}
				else {
					Text.Flush();
					
					var options = new Array();
					options.push({ nameStr : "Craft",
						func : function() {
							TimeStep({hour: 1});
							party.coin -= coin;
							party.Inv().RemoveItem(item);
							TerryScenes.JeanneTFCraft(obj.item, obj.scene, horseTF);
						}, enabled : party.coin >= coin && party.Inv().QueryNum(item) > 0,
						tooltip : Text.Parse("Craft the potion for [coin] coins.", parse)
					});
					Gui.SetButtonsFromList(options, true, TerryScenes.JeanneTFPrompt);
				}
			}, enabled : true,
			obj : {
				str   : item.lDesc(),
				mult  : costmult || 1,
				item  : item,
				scene : scene
			},
			tooltip : tooltip
		});
	};
	
	//TODO items?
	AddItem(AlchemyItems.Bovia,     TerryScenes.JeanneTFGrowBoobs,     "Grow boobs", "", 1);
	AddItem(AlchemyItems.Lacertium, TerryScenes.JeanneTFShrinkBoobs,   "Shrink boobs", "", 1);
	AddItem(AlchemyItems.Bovia,     TerryScenes.JeanneTFStartLactate,  "Lactate+", "", 1);
	AddItem(AlchemyItems.Lacertium, TerryScenes.JeanneTFStopLactate,   "Lactate-", "", 1);
	AddItem(AlchemyItems.Estros,    TerryScenes.JeanneTFGrowVag,       "Add pussy", "", 2);
	AddItem(AlchemyItems.Testos,    TerryScenes.JeanneTFRemVag,        "Rem pussy", "", 1);
	AddItem(AlchemyItems.Testos,    TerryScenes.JeanneTFGrowCock,      "Add cock", "", 2);
	AddItem(AlchemyItems.Estros,    TerryScenes.JeanneTFRemCock,       "Rem cock", "", 1);
	AddItem(AlchemyItems.Equinium,  TerryScenes.JeanneTFGrowHorsecock, "Horsecock", "", 5, true);
	
	Gui.SetButtonsFromList(options, true, JeanneScenes.InteractPrompt);
}

TerryScenes.JeanneTFCraft = function(item : TFItem, scene : any, horseTF : boolean) {
	let terry = GAME().terry;
	let player = GAME().player;

	var parse : any = {
		playername : player.name,
		lowerArmorDesc : function() { return player.LowerArmorDesc(); },
		foxvixen   : terry.mfPronoun("fox", "vixen"),
		boygirl    : terry.mfPronoun("boy", "girl"),
		boygirl2   : player.mfTrue("boy", "girl"),
		armorDesc  : function() { return terry.ArmorDesc(); },
		terrycock  : function() { return terry.MultiCockDesc(); },
		terrypussy : function() { return terry.FirstVag().Short(); }
	};
	parse = terry.ParserPronouns(parse);
	
	terry.flags["TFd"]++;
	
	Text.Clear();
	Text.Add("Jeanne smiles as she takes the necessary ingredients from you, as well as the coins. <i>“Wait here, I will be right back.”</i>", parse);
	Text.NL();
	Text.Add("The elven mage moves about her room, collecting the materials she’ll need and setting them all up on a clear spot at a table nearby. Jeanne begins by taking the ingredients you’ve given and pouring them all into a bowl. She mixes it until she has worked the mix into an oddly-colored soup. Afterward, she immediately pours the soup into a distill and starts the distilling process with a flick of her finger.", parse);
	Text.NL();
	Text.Add("While waiting for the process to finish, she opens a box nearby and takes out a strange-looking vial. It is about three inches long and one inch thick, ending in a rounded-out tip. She plugs the open vial to the end of the distill and sits back to watch the process conclude.", parse);
	Text.Flush();
	
	//TODO
	Gui.NextPrompt(function() {
		Text.Clear();
		if(horseTF) {
			Text.Add("Once it’s over, she closes the vial and utters something under her breath, making the vial glow briefly. <i>“Sorry, but I cannot really shrink this one, so your [foxvixen] will have to settle for taking a big one this time,”</i> Jeanne explains, handing you the sealed vial.", parse);
		}
		else {
			Text.Add("Once it’s over, she closes the vial and utters something under her breath, making the vial glow and shrink. She tests the seal to make sure it’s solid, then presents it to you. <i>“Here you go.”</i> You accept it, turning it over in your hand. After the magic has done its work, the vial is only a fraction of its former size.", parse);
		}
		
		TimeStep({hour : 1});
		
		if(terry.flags["TF"] & TerryFlags.TF.JeanneUsed)
			Text.Add(" You take the capsule and look at Terry.", parse);
		else {
			Text.Add(" You thank her and take the capsule. So… you just feed Terry the capsule? Is that all it takes?", parse);
			Text.NL();
			Text.Add("<i>“Well, if you feed it to [himher] normally the collar will just counteract the transformative again. I did what I could to hide the elements detected by the collar, but the truth is that if the collar detects it, it will still nullify the effects.”</i>", parse);
			Text.NL();
			Text.Add("How are you supposed to give it to [himher] then?", parse);
			Text.NL();
			Text.Add("<i>“Anally,”</i> she says nonchalantly. <i>“That is a suppository, so just shove it in and it will work its magic. Do not worry about the vial itself, the spell on it will dissolve it harmlessly.”</i>", parse);
			Text.NL();
			if(terry.Slut() < 5)
				Text.Add("<i>“What!? I’m not shoving that up my ass!”</i> Terry immediately protests.", parse);
			else if(terry.Slut() < 30)
				Text.Add("<i>“Tch, at least it won’t be as bad as a dick….”</i> Terry mumbles, not thrilled by the idea at all.", parse);
			else {
				Text.Add("<i>“Well, if that’s what it takes, I suppose I’m fine with it. Not like I haven’t taken bigger.”</i>", parse);
				Text.NL();
				Text.Add("<i>“Oh? Would you like me to increase its size? I can make it as big as-”</i> Jeanne starts.", parse);
				Text.NL();
				Text.Add("<i>“Small is fine!”</i> Terry interrupts Jeanne. The elven mage just shrugs.", parse);
			}
			Text.NL();
			Text.Add("You thank Jeanne once again; applying this should be interesting…", parse);
		}
		Text.NL();
		
		terry.flags["TF"] |= TerryFlags.TF.JeanneUsed;
		
		if(terry.Slut() < 5) {
			Text.Add("<i>“Do I really have to?”</i>", parse);
			Text.NL();
			Text.Add("<i>“It’s an order,”</i> you reply. As soon as you say the words, the collar tightens in warning, a faint glow emanating from the enchanted leather.", parse);
			Text.NL();
			Text.Add("Terry sighs in defeat. <i>“I hate this...”</i> [heshe] mumbles. Without further ado, [heshe] begins stripping off [hisher] [armorDesc].", parse);
		}
		else if(terry.Slut() < 30) {
			Text.Add("The [foxvixen] rolls [hisher] eyes, but complies with the unspoken command. [HeShe] strips off [hisher] [armorDesc]. <i>“Let’s just get this over with...”</i>", parse);
		}
		else {
			Text.Add("<i>“Alright, no need to say anything,”</i> [heshe] raises a hand, waving dismissively as [heshe] begins undoing [hisher] [armorDesc].", parse);
		}
		Text.NL();
		Text.Add("You watch patiently as Terry removes the last of [hisher] clothes and folds them carefully, setting them aside. Turning to look at you expectantly, [heshe] says. <i>“I’m ready… now what?”</i>", parse);
		Text.NL();
		if(terry.Relation() + terry.Slut() >= 60) {
			parse["milkdripping"] = terry.Lactation() ? " milk-dripping" : "";
			Text.Add("There’s a definite air of excitement in the [foxvixen]’s body language,[milkdripping] nipples erect through [hisher] fur.", parse);
			if(terry.FirstCock())
				Text.Add(" [HisHer] [terrycock] is jutting out of its sheath, as if in anticipation.", parse);
			if(terry.FirstVag())
				Text.Add(" [HisHer] [terrypussy] is visibly wet, a small stream leaking down the inside of [hisher] thighs.", parse);
			Text.NL();
			Text.Add("Looks like your little [foxvixen] is looking forward to doing some bodywork, you quip, reaching out to affectionately tussle [hisher] ears,", parse);
			Text.NL();
			if(terry.Relation() >= 60) {
				Text.Add("<i>“You can’t expect me to strip in front of my [boygirl2]friend and <b>not</b> get at least a bit antsy,”</i> [heshe] says, flustered and pouting as [heshe] averts [hisher] gaze in embarrassment.", parse);
				Text.NL();
				Text.Add("Smiling at [hisher] confession, you gently lift [hisher] chin and steal a quick kiss, assuring [himher] that’s part of [hisher] considerable charms. [HeShe] smiles at that, tail wagging softly behind.", parse);
			}
			else {
				Text.Add("<i>“So what if I am? It’s your fault I’m like this...”</i> [heshe] mumbles, averting [hisher] gaze with a slight frown.", parse);
				Text.NL();
				Text.Add("You just smirk and shake your head good-naturedly; [hisher] lips may say one thing, but [hisher] body tells the real story, no matter how much the [foxvixen] may want to deny it.", parse);
				Text.NL();
				Text.Add("<i>“That’s not...”</i> [heshe] starts, but quickly falls silent with a resigned sigh. <i>“Look, are you going to get on with it or are you just here to bully me?”</i> [heshe] asks indignantly.", parse);
			}
			Text.NL();
		}
		Text.Add("With one hand on [hisher] hip and the other on [hisher] shoulder, it’s a matter of moments for you to gently spin Terry around and give [himher] a soft push. Effortlessly, the vulpine morph falls forward onto [hisher] knees. Another careful prod and a command is all you need to make [himher] go on fours, tail swept aside around [hisher] hip and buttocks raised slightly for better access to [hisher] tailhole. <i>“O-okay, please be gentle.”</i>", parse);
		Text.NL();
		if(terry.flags["TFd"] > 5)
			Text.Add("Playfully, you chide [himher]; you’re always kind to your special [foxvixen], [heshe] knows that.", parse);
		else
			Text.Add("You assure [himher] that you’ll be as tender as you can.", parse);
		Text.NL();
		Text.Add("Kneeling down for a better view, you admire the shapely, feminine ass now lifted before you. Terry’s tail twitches, and unthinkingly, you move to stroke the long appendage with its soft, fluffy fur. A few caresses of the plush tail, and then it’s back to business. You resume studying Terry’s butt, your gaze drawn to the pronounced love-heart shape of pure gold set against the creamy white of the rest of [hisher] ass cheeks.", parse);
		Text.NL();
		
		if(terry.flags["BM"] == 0) {
			terry.flags["BM"] = 1;
			Text.Add("You can’t resist teasing Terry about [hisher] ‘birthmark’; who’d have thought [heshe] would have something so cute on [hisher] body, nevermind it being there of all places?", parse);
			Text.NL();
			Text.Add("<i>“S-stop teasing me- Ah!”</i> [HeShe] jumps when you touch the patch. <i>“Don’t touch it! It’s embarrassing!”</i> the [foxvixen] protests weakly, cheeks burning so hot that you can feel the heat from this distance.", parse);
			Text.NL();
			Text.Add("Seems like you found a weak spot, you think to yourself. ", parse);
		}
		else {
			var scenes = new EncounterTable();
			scenes.AddEnc(function() {
				Text.Add("Unable to resist yourself, you poke [himher] playfully right in the center of the heart-shape, feeling [hisher] buttflesh giving under the pressure of your finger.", parse);
			}, 1.0, function() { return true; });
			scenes.AddEnc(function() {
				Text.Add("You gently trail your finger around the heart’s shape, following the lines until you have traced the shape completely.", parse);
			}, 1.0, function() { return true; });
			scenes.AddEnc(function() {
				Text.Add("Struck by an impulse, you bend in closer and plant a soft kiss on the golden-furred patch.", parse);
			}, 1.0, function() { return true; });
			scenes.Get();
			
			Text.NL();
			Text.Add("[HeShe] gasps softly at your touch. <i>“Don’t tease me like that!”</i> [heshe] protests.", parse);
			Text.NL();
			Text.Add("With a soft chuckle at how worked up [heshe] can get over something so small, you offer the [foxvixen] a half-hearted apology, asserting that you just couldn’t resist such a tempting target.", parse);
			Text.NL();
			Text.Add("<i>“Meanie...”</i>", parse);
		}
		Text.NL();
		Text.Add("<i>“This might help,”</i> Jeanne says, handing you a small tube with a clear gel inside. You thank her for the lube as she steps away. Now then… time to get started.", parse);
		Text.NL();
		Text.Add("Applying lube to your fingers, you begin to softly massage Terry’s tailhole, tracing your gel-caked digits around and around [hisher] ring before starting to working your fingertips inside. The [foxvixen]’s tail flutters as [heshe] represses the urge to wave it, whole body shivering from your touch even as [heshe] bites back any sounds of pleasure. As the lube begins to work and more and more of your digit slides inside, you start to pump away, getting [himher] ready for the insertion you’ll be making shortly.", parse);
		if(terry.FirstCock())
			Text.Add(" You have a front-row seat to watch Terry’s [terrycock] grow to full mast, hard and aching to be used.", parse);
		if(terry.FirstVag())
			Text.Add(" From where you are, you can see quite clearly as Terry’s [terrypussy] flushes with arousal, netherlips growing more prominent through [hisher] fur, aroused fluids starting to drip from its folds.", parse);
		Text.NL();
		Text.Add("Looks like [heshe]’s enjoying [himher]self, you say, smiling even as you continue to finger the [foxvixen].", parse);
		Text.NL();
		if(terry.Slut() < 30) {
			Text.Add("<i>“J-just shut it and get this done with!”</i> [heshe] quips back.", parse);
			Text.NL();
			Text.Add("Temper, temper, you chide [himher]. Still, you have other things to do, so you focus your attention on finishing the lubing. Plenty of time to tease Terry later.", parse);
		}
		else {
			Text.Add("<i>“Yeah… it feels nice,”</i> [heshe] admits.", parse);
			if(terry.Relation() >= 60) {
				Text.Add(" <i>“We should continue this later, alone,”</i> [heshe] says, casting a glance at the smiling Jeanne.", parse);
				Text.NL();
				Text.Add("You smirk and inform [himher] that you’ll hold [himher] up to that, leisurely continuing to lube Terry’s asshole.", parse);
			}
		}
		Text.NL();
		Text.Add("Finally, you deem Terry’s tush to be as ready as it’ll ever be. Giving Jeanne back her lube, you reach for the transformative suppository she gave you earlier, align it with Terry’s anus, and start to gently push it against [hisher] pucker.", parse);
		Text.NL();
		
		Gui.Callstack.push(function() {
			Text.NL();
			Text.Add("The [foxvixen] gets up on [hisher], awaiting whatever effect the suppository is supposed to have on [himher]self.", parse);
			Text.Flush();
			
			Gui.NextPrompt(scene);
		});
		
		if(horseTF) {
			Text.Add("<i>“I-it’s too big!”</i> Terry protests as you try to shove the suppository up [hisher] butt.", parse);
			Text.NL();
			Text.Add("You try your best to comfort the [foxvixen] and get [himher] to relax, but it’s no use. Terry is just too tense to take this one, even though you stretched [himher] out just moments ago. If [heshe] doesn’t relax, you’re never getting this inside.", parse);
			Text.NL();
			Text.Add("Sighing, you stop for a moment, considering your options. Finally, an idea pops in your head. This should stretch [himher] nicely. ", parse);
			
			var cocksInAss = player.CocksThatFit(terry.Butt());
			var p1Cock     = player.BiggestCock(cocksInAss);
			
			parse["multiCockDesc"] = function() { return player.MultiCockDesc(); }
			parse["cockDesc"]      = function() { return p1Cock.Short(); }
				
			if(p1Cock) {
				Text.Add("You strip your [lowerArmorDesc], exposing your [multiCockDesc] to air.", parse);
				Text.NL();
				Text.Add("<i>“[playername], what are you…!?”</i> [heshe] suddenly gasps as you nestle your [cockDesc] against [hisher] rosebud. <i>“Here!? You’re going to take me here, of all places?”</i>", parse);
				Text.NL();
				Text.Add("Yes, you have to stretch [himher] out. Besides, it’s not like Jeanne would mind, would she?", parse);
				Text.NL();
				Text.Add("<i>“Do not mind me,”</i> the elven mage replies, taking a seat on a nearby chair, studying the fox intently.", parse);
				Text.NL();
				Text.Add("It’s settled then.", parse);
			}
			else {
				Text.Add("You ask if Jeanne has a strap-on you could use.", parse);
				Text.NL();
				Text.Add("<i>“What!?”</i> Terry protests.", parse);
				Text.NL();
				Text.Add("<i>“Sure,”</i> she replies, walking to a chest nearby.", parse);
				Text.NL();
				Text.Add("<i>“You can’t be serious, [playername]! You’re going to take me? Here of all places?”</i>", parse);
				Text.NL();
				Text.Add("Yes, you have to stretch [himher] out. Besides, it’s not like Jeanne would mind, would she?", parse);
				Text.NL();
				Text.Add("<i>“Do not mind me,”</i> the elven mage replies, taking a seat on a nearby chair, studying the fox intently.", parse);
				Text.NL();
				Text.Add("It’s settled then. You strip off your [lowerArmorDesc] and attach the strap-on, making sure it won’t come loose. Now, about Terry’s butt...", parse);
				p1Cock = StrapOnItems.PlainStrapon.cock;
			}
			Text.NL();
			
			TerryScenes.SexFuckButtEntrypoint(p1Cock, false, function(rough : boolean) {
				Text.Add("There, now [heshe]’s all stretched up, you proudly declare, working the tip of the big suppository into [hisher] butt. ", parse);
				if(rough) {
					Text.Add("<i>“That works, I suppose,”</i> Jeanne muses, huffing as she adjusts her gown, unabashedly licking her drenched fingers clean. <i>“Was it really necessary to be that rough, though?”</i> She really shouldn’t be one to talk. While you had your own fun, the court magician has been playing with some toys out of her collection, eyeing Terry lustfully; looks like she really enjoyed the show.", parse);
					Text.NL();
					Text.Add("<i>“[playername],”</i> the [foxvixen] grunts. <i>“Ya big jerk!”</i> [heshe] exclaims, moaning as you manage to insert the first few inches. <i>“Not only did you fuck me in front of - Aah! - her, but did you really have to be so rough!”</i>", parse);
					Text.NL();
					if(terry.Slut() < 60) {
						Text.Add("Yes. With Terry’s cute tush in full display before you… why, asking you to hold back is just asking too much! No, a glorious butt like the one [heshe] has was just made to be fucked raw, and you’re more than happy to oblige!", parse);
						Text.NL();
						Text.Add("<i>“...You...”</i> Terry starts, but doesn’t finish. You can tell the [foxvixen] is embarrassed at your comment. [HeShe]’s really a sucker for compliments, isn’t [heshe]?", parse);
					}
					else {
						Text.Add("Funny, you don’t remember hearing [himher] complain while you were doing it.", parse);
						Text.NL();
						Text.Add("<i>“You - ah! - didn’t give me a chance to.”</i>", parse);
						Text.NL();
						Text.Add("Chuckling, you reply that [heshe]’s right. [HeShe] really couldn’t hope to say otherwise in-between [hisher] moaning about how good it felt - nor [hisher] cries of enjoyment.", parse);
						Text.NL();
						Text.Add("<i>“S-stop it!”</i> Terry protests, cheeks flushing with embarrassment. You can see them redden just a bit, even though [hisher] fur does a good job of hiding it.", parse);
						Text.NL();
						Text.Add("Oh Terry… [heshe]’s just so fun to tease...", parse);
					}
				}
				else {
					Text.Add("<i>“A novel enough technique,”</i> Jeanne muses, idly playing with herself as she watches you.", parse);
					Text.NL();
					Text.Add("<i>“[playername],”</i> the [foxvixen] says with a groan. <i>“You fucked me in front of- Aah!”</i> [heshe] says, moaning as you manage to insert the first few inches.", parse);
					Text.NL();
					if(terry.Slut() < 60) {
						Text.Add("You simply chuckle. It’s not like it was a big deal. You enjoyed yourself, Terry enjoyed [himher]self, and Jeanne got a good show. Think about it; was it really that bad indulging in front of an audience?", parse);
						Text.NL();
						Text.Add("<i>“I-I guess not.”</i>", parse);
						Text.NL();
						Text.Add("You pet the [foxvixen] lightly in response.", parse);
						terry.slut.IncreaseStat(60, 1);
					}
					else {
						Text.Add("You laugh at what [heshe] was about to say. Come on… you know [himher] better than that. It’s not like the [foxvixen] even cares if you do it in public. Once you get [himher] going, there’s just no stopping [himher].", parse);
						Text.NL();
						Text.Add("<i>“...Alright, alright, I get it. No need to rub it in, but do I really need to remind you that it was <b>you</b> who made me this way?”</i>", parse);
						Text.NL();
						Text.Add("Of course not, but you couldn’t help keeping your hands off [himher] either. Maybe it’s [hisher] own fault for being so damn fuckable…", parse);
						Text.NL();
						Text.Add("If Terry didn’t have any fur, you’d think [heshe] was blushing. <i>“Um… I’m not sure how to respond that...”</i>", parse);
						Text.NL();
						Text.Add("No need to dwell on it. You knew [heshe]’d make a great pet, and you’re glad you got [himher] to come with you.", parse);
						terry.relation.IncreaseStat(100, 1);
					}
				}
				if(terry.Relation() >= 60) {
					Text.Add(" <i>“I love you,”</i> [heshe] adds.", parse);
					Text.NL();
					Text.Add("Yes, of course [heshe] does. You love [himher] too, you reply. Now if [heshe]’ll be a good [boygirl] and take all of [hisher] medicine?", parse);
				}
				else {
					Text.NL();
					if(rough)
						Text.Add("<i>“Doesn’t - oh! - make you any less of a jerk,”</i> [heshe] quips.", parse);
					else
						Text.Add("<i>“Doesn’t - oh! - make you any less of a perv, you horndog.”</i> [heshe] quips.", parse);
					Text.NL();
					Text.Add("Maybe so... but right now you need [himher] to be a good [boygirl] and take all of [hisher] medicine.", parse);
				}
				Text.NL();
				Text.Add("Your only reply is a lusty moan as you manage to cram in a few more inches.", parse);
				Text.NL();
				Text.Add("Once you manage to get the other end of the vial past [hisher] sphincter, Terry groans and suddenly clenches [hisher] butt, a couple inches of the suppository escaping from [hisher] used butthole. Seeing no other reasonable way to push this in effectively, you align the tip of your [cockDesc] with the vial and thrust.", parse);
				Text.NL();
				Text.Add("Terry howls in a mixture of pain and pleasure as [hisher] butt is stretched both by the large capsule and your [cockDesc], the magic within the vial finally activating and drilling itself inside Terry’s guts. Success!", parse);
				Text.NL();
				Text.Add("<i>“Owowow! What happened to being gentle!?”</i> the [foxvixen] protests.", parse);
				Text.NL();
				Text.Add("You wouldn’t have had to do this if [heshe] wasn’t being so stubborn about taking the suppository, besides it’s not like [heshe] didn’t enjoy it, you point out.", parse);
				Text.NL();
				Text.Add("Despite having climaxed only moments ago", parse);
				if(terry.FirstVag())
					Text.Add(" [hisher] [terrypussy] is already puffed up in full arousal, wet with [hisher] juices", parse);
				if(terry.FirstVag() && terry.FirstCock())
					Text.Add(", and", parse);
				if(terry.FirstCock())
					Text.Add(" [hisher] [terrycock] is fully erect, dripping pre", parse);
				Text.Add(".", parse);
				Text.NL();
				Text.Add("Terry flushes in embarrassment, averting [hisher] eyes. <i>“You really are a big meanie,”</i> [heshe] pouts.", parse);
				Text.NL();
				parse["armorDesc"] = function() { return player.ArmorDesc(); }
				Text.Add("Extricating your [cockDesc], you pat [himher] gently on the flank and inform [himher] that you’re all done. Having said that, you move to clean up and put your [armorDesc] back on.", parse);
				Gui.PrintDefaultOptions();
			});
		}
		else {
			Text.Add("With a groan of arousal, Terry arches [hisher] back in unthinking pleasure as it glides smoothly inside, your fingers following it as deeply as you can fit them. Finally, you are inside [himher] to the knuckle, but you can feel the capsule continue gliding inwards, making course for Terry’s stomach.", parse);
			Text.NL();
			Text.Add("Extricating your digits, you pat the [foxvixen] tenderly on the flank and inform [himher] that you’re all done.", parse);
			Gui.PrintDefaultOptions();
		}
	});
}

TerryScenes.JeanneTFGrowBoobs = function() {
	let terry = GAME().terry;
	let player = GAME().player;

	var parse : any = {
		playername : player.name,
		foxvixen   : terry.mfPronoun("fox", "vixen"),
		terrycock  : function() { return terry.MultiCockDesc(); }
	};
	parse = terry.ParserPronouns(parse);
	
	Text.Clear();
	if(terry.Cup() <= TerryFlags.Breasts.Flat) {
		Text.Add("The naked [foxvixen] twitches, looking down in surprise at [hisher] chest as the transformative’s effects begin taking hold. [HisHer] nipples perk up, though who can say if from arousal or the magic, like little cherry-pink nubs through Terry’s fur. Terry groans softly at the sensation, [hisher] formerly flat chest begins to bulk up; fat visibly swelling into being underneath the skin and fur and pushing [hisher] buds outwards. Within moments, what was a flat chest is now sporting a dainty pair of feminine A-cup breasts.", parse);
		Text.NL();
		Text.Add("The [foxvixen] pants, as [heshe] recovers from the transformation. Then [heshe] slowly rises to [hisher] feet, experimentally pinching a nipple and gasping as [heshe] does so. <i>“Sensitive...”</i> [heshe] comments under [hisher] breath.", parse);
		Text.NL();
		Text.Add("Now that’s too tempting to pass up. Without hesitation, your hands reach for your vulpine pet’s new bosom, gently stroking each of the new A-cups in turn, squeezing the plush flesh through its soft fur before caressing [hisher] erect nipples with your thumbs.", parse);
		Text.NL();
		Text.Add("Terry gasps and quickly moves to bat your hands away. <i>“S-stop it!”</i> [heshe] protests weakly.", parse);
		
		terry.flags["breasts"] = TerryFlags.Breasts.Acup;
		terry.SetBreasts();
	}
	else if(terry.Cup() == TerryFlags.Breasts.Acup) {
		Text.Add("A soft whimper escapes Terry’s throat, nipples perking up as [hisher] small bosom quivers before starting to grow. A pleased murmur bubbles from the [foxvixen]’s throat as they swell outwards, stopping only after [heshe] has acquired a perky pair of B-cup breasts.", parse);
		Text.NL();
		Text.Add("Terry is left panting as [hisher] transformation reaches an end. [HeShe] cups [hisher] newly grown breasts, testing them momentarily as [heshe] rises to [hisher] feet.", parse);
		Text.NL();
		Text.Add("Nodding your head appreciatively, you idly compliment Terry on how good [heshe] looks with them. Not so big as to be obtrusive, but definitely enhancing [hisher] womanly charms.", parse);
		Text.NL();
		if(terry.Relation() < 60) {
			Text.Add("<i>“I’m not a girl...”</i> [heshe] protests weakly.", parse);
			Text.NL();
			Text.Add("The breasts [heshe] has certainly don’t make [himher] look very manly - not that [heshe] ever did, of course - but you let the [foxvixen] insist otherwise, for [hisher] peace of mind.", parse);
		}
		else {
			Text.Add("<i>“Um… thanks, I guess...”</i>", parse);
			Text.NL();
			Text.Add("With a smile, you assure [himher] that you’d be happy to help [himher] give them a test run, if ever [heshe] feels like it.", parse);
		}
		
		terry.flags["breasts"] = TerryFlags.Breasts.Bcup;
		terry.SetBreasts();
	}
	else if(terry.Cup() == TerryFlags.Breasts.Bcup) {
		Text.Add("Terry’s head falls back and [heshe] moans softly, bosom quivering as the transformative goes to work. Nipples hard as diamond, jutting blatantly through the fur, you watch as the perky orbs balloon outwards, swelling into plush, proud C-cups, with just the right amount of sag. Terry truly looks like a woman at any casual glance, with an hourglass figure that many women would kill to have.", parse);
		if(terry.FirstCock())
			Text.Add(" Even knowing about the [terrycock] hanging between [hisher] legs, if [heshe] were covered, you doubt anyone would notice it at a first glance in [hisher] usual clothes.", parse);
		Text.NL();
		Text.Add("Terry pants, watching [hisher] own chest rise and fall. [HeShe] cups [hisher] pillowy breasts, testing their weight. Slowly, [heshe] rises to [hisher] feet, [hisher] expression one of confusion. Your eyes meet and you can tell [heshe]’s not too sure about this development.", parse);
		Text.NL();
		Text.Add("Well, you know one way to convince [himher]. Closing the distance between you, your hands reach out and gently cup [hisher] newly amplified bosom. Massaging the pillowing flesh with your fingers, you begin kneading [hisher] nipples and caressing the sensitive titflesh.", parse);
		Text.NL();
		if(terry.Relation() < 30) {
			Text.Add("For a moment, the [foxvixen] pushes [hisher] chest against your hands, as if enjoying your caress, but then [heshe] gasps and quickly jumps back. <i>“Don’t touch them!”</i> [heshe] protests.", parse);
			Text.NL();
			Text.Add("Certainly looked to you like [heshe] was enjoying it, but you hold your peace. You know [heshe]’ll come around and admit the truth eventually; you just need to be patient with [himher] until then.", parse);
		}
		else if(terry.Relation() < 60) {
			Text.Add("Terry’s expression is one of discomfort, but even so, [heshe] doesn’t move away from your touch. Instead, [heshe] just stands there while you inspect [hisher] new growth; a soft sigh of pleasure escaping [himher] as you finish.", parse);
			Text.NL();
			Text.Add("You’re a little disappointed at the lack of reaction, but at least [heshe]’s not actively fighting you away anymore. Little steps lead to big rewards, after all.", parse);
		}
		else {
			Text.Add("Terry moans softly as you caress [hisher] newly grown breasts. [HeShe] thrusts [hisher] chest out to allow you full access. <i>“Do you like them?”</i> [heshe] asks, looking at you expectantly.", parse);
			Text.NL();
			Text.Add("You smile back and playfully kiss [himher] right on the closest nipple, a soft girly squeak of pleasure and surprise escaping Terry’s mouth. You glance up at [himher] and see the [foxvixen] openly grinning, clearly pleased by your approval.", parse);
		}
		terry.flags["breasts"] = TerryFlags.Breasts.Ccup;
		terry.SetBreasts();
	}
	else if(terry.Cup() == TerryFlags.Breasts.Ccup) {
		Text.Add("Terry arches [hisher] back and moans in pleasure, unthinkingly thrusting out [hisher] bosom and emphasizing its sudden growth spurt. Before your eyes, the former C-cups balloon into large, luscious D-cups, looking even larger than they actually are on Terry’s otherwise petite and graceful build.", parse);
		Text.NL();
		Text.Add("Even with the [foxvixen]’s small frame exaggerating every quiver and quake of them, they are truly enticing. Before Terry can think of clambering back to [hisher] feet, you move to touch them. They’re just as soft and inviting as they look; downy fur covering ample flesh that’s got just the right amount of give to it. Yes, groping these is going to be a very enjoyable experience, for both of you.", parse);
		Text.NL();
		Text.Add("Giving them a last appreciative squeeze for luck, you let Terry’s tits go and offer the [foxvixen] a hand. ", parse);
		if(terry.Relation() < 30)
			Text.Add("Terry ignores your offer of help and gets back on [hisher] feet on [hisher] own.", parse);
		else
			Text.Add("Terry takes it, and you help [himher] back to [hisher] feet.", parse);
		Text.Add(" <i>“They’re heavy,”</i> the [foxvixen] idly comments.", parse);
		Text.NL();
		Text.Add("That may be so, you reply, but they most assuredly look great on [himher]; [heshe] really pulls them off well. You think you’d be hard-pressed to find another [foxvixen] anywhere near Rigard who looks as good as [heshe] does.", parse);
		Text.NL();
		if(terry.Relation() < 60)
			Text.Add("Terry looks away, clearly embarrassed by your compliment.", parse);
		else
			Text.Add("Terry looks at you, a soft smile on [hisher] lips.", parse);
		terry.flags["breasts"] = TerryFlags.Breasts.Dcup;
		terry.SetBreasts();
	}
	else {
		Text.Add("Terry gasps and moans, panting as [hisher] tits begin their now familiar ballooning routine, swelling out into heaving E-cups... but then, rather than stopping, they keep on growing! Terry whimpers in panic as they continue to bloat, swelling down and out over [hisher] stomach. Inches passing like seconds, they reach F-cup size, almost as big as [hisher] head, and then they grow into G-cups and are <i>bigger</i> than [hisher] head... just how big is [heshe] going to get...?", parse);
		Text.NL();
		Text.Add("As soon as you pass the thought, however, the [foxvixen]’s boobs stop their dramatic expansion, quivering atop Terry’s chest. And then, even faster than they grew before, they start to shrink, deflating rapidly until Terry is left with [hisher] former D-cup cleavage, much to [hisher] evident relief.", parse);
		Text.NL();
		Text.Add("<i>“Do you not think you have gone far enough, [playername]?”</i> Jeanne comments reproachfully.", parse);
		Text.NL();
		Text.Add("Biting back any possible sarcastic quips, you idly agree and move to help the shivering [foxvixen] to [hisher] feet. You’ll need to remember that [heshe] is as busty as [heshe]’s going to get, otherwise you’ll just be wasting money and ingredients. You ask Terry if [heshe]’s alright.", parse);
		Text.NL();
		Text.Add("[HeShe] nods, hugging [hisher] chest as [heshe] gets over what just happened. <i>“Please. Don’t make me go through that again.”</i>", parse);
		terry.flags["breasts"] = TerryFlags.Breasts.Dcup;
		terry.SetBreasts();
		
		terry.relation.DecreaseStat(0, 3);
	}
	Text.Flush();
	
	JeanneScenes.InteractPrompt();
}

TerryScenes.JeanneTFShrinkBoobs = function() {
	let terry = GAME().terry;
	let player = GAME().player;

	var parse : any = {
		playername : player.name,
		foxvixen   : terry.mfPronoun("fox", "vixen")
	};
	parse = terry.ParserPronouns(parse);
	
	Text.Clear();
	if(terry.Cup() >= TerryFlags.Breasts.Dcup) {
		Text.Add("Terry gasps, arching [hisher] back with a moan, bosom thrusting unconsciously forward. Before your eyes, the luscious D-cups quiver and then start to dwindle, shrinking in on themselves until Terry has lost a full cup-size, leaving [himher] with a more manageable C-cup bustline.", parse);
		Text.NL();
		Text.Add("The [foxvixen] hefts [hisher] reduced boobs, testing them. <i>“Well, that’s certainly a load off my back,”</i> [heshe] states. <i>“Personally, I was way too big previously. It’s nice to have them be a little smaller again.”</i>", parse);
		Text.NL();
		Text.Add("You nod your head absently, noting that you’re happy that Terry is happier with [hisher] new breasts.", parse);
		
		terry.flags["breasts"] = TerryFlags.Breasts.Ccup;
		terry.SetBreasts();
	}
	else if(terry.Cup() == TerryFlags.Breasts.Ccup) {
		Text.Add("A mewl escapes Terry’s throat as [hisher] C-cups quiver visibly, unconsciously arching [hisher] back and making it more prominent as they shrink. By the time they stop, the [foxvixen] is sporting a new B-cup bustline.", parse);
		Text.NL();
		Text.Add("[HeShe] massages [hisher] boobs experimentally. <i>“I guess smaller breasts are more manageable...”</i> [heshe] mumbles. You get the feeling that [heshe]’s a bit disappointed at [hisher] reduced bust.", parse);
		Text.NL();
		Text.Add("Deciding not to raise the matter directly, you simply give Terry an idle agreement with [hisher] statement. Privately, you’re certain [heshe]’ll get over it soon enough.", parse);
		
		terry.flags["breasts"] = TerryFlags.Breasts.Bcup;
		terry.SetBreasts();
	}
	else if(terry.Cup() == TerryFlags.Breasts.Bcup) {
		Text.Add("The [foxvixen]’s eyes sink closed with a luxuriant groan, B-cups visibly shrinking away and not stopping until [heshe]’s left with a humble A-cup bustline.", parse);
		Text.NL();
		Text.Add("Terry checks out [hisher] perky breasts. <i>“Guess I don’t really have to worry about them sagging anymore now.”</i>", parse);
		Text.NL();
		Text.Add("That’s certainly true, you quip back.", parse);
		
		terry.flags["breasts"] = TerryFlags.Breasts.Acup;
		terry.SetBreasts();
	}
	else if(terry.Cup() == TerryFlags.Breasts.Acup) {
		Text.Add("With a single moan, Terry’s bustline rapidly shrinks away, within seconds leaving [himher] with [hisher] original daintily flat chest.", parse);
		Text.NL();
		Text.Add("<i>“Guess I won’t have to worry so much about protecting my chest now, at least not more than usual,”</i> the [foxvixen] states.", parse);
		if(terry.Lactation())
			Text.Add(" <i>“And I won’t have to worry anymore about draining my breasts,”</i> [heshe] adds.", parse);
		Text.NL();
		Text.Add("That certainly seems to be the case, you agree.", parse);
		
		terry.flags["breasts"] = TerryFlags.Breasts.Flat;
		terry.flags["lact"] = 0;
		terry.SetBreasts();
		terry.SetLactation();
	}
	else {
		Text.Add("Long, silent moments tick by, and not a thing happens. Terry pokes [hisher] chest experimentally and then shrugs, clearly unsure what to say. You feel very foolish; what were you expecting to happen, giving a breast-reducer to someone without breasts to reduce?", parse);
		
		terry.flags["breasts"] = TerryFlags.Breasts.Flat;
		terry.flags["lact"] = 0;
		terry.SetBreasts();
		terry.SetLactation();
	}
	Text.Flush();
	
	JeanneScenes.InteractPrompt();
}

TerryScenes.JeanneTFStartLactate = function() {
	let terry = GAME().terry;
	let player = GAME().player;

	var parse : any = {
		playername : player.name,
		foxvixen   : terry.mfPronoun("fox", "vixen"),
		terrybreasts : function() { return terry.FirstBreastRow().Short(); }
	};
	parse = terry.ParserPronouns(parse);
	
	Text.Clear();
	if(terry.Lactation()) {
		Text.Add("Terry cringes, the [foxvixen]’s lips instinctively curled back over [hisher] teeth in a nervous snarl as [hisher] nipples perk up through the fur, breasts visibly quivering. [HeShe] whimpers, hands reaching up to tenderly cradle [hisher] [terrybreasts], then [heshe] throws [hisher] head back in a primal scream as, out of nowhere, [hisher] teats unleash a cascade of vulpine milk.", parse);
		Text.NL();
		Text.Add("As close as you are, you can do nothing to keep yourself from getting hosed down as Terry becomes a veritable milk-fountain. Fortunately, it’s only temporary, and the streams die away after a few moments, leaving only the white streaks painted over your body and Terry’s swollen-looking nipples as sign of what lurks inside [hisher] breasts.", parse);
		Text.NL();
		Text.Add("The court magician giggles. ", parse);
		if(terry.flags["xLact"] == 0)
			Text.Add("<i>“I suppose that is what you get for trying to make a lactating [foxvixen] lactate; I could get used to watching this,”</i> she teases.", parse);
		else if(terry.flags["xLact"] <= 3)
			Text.Add("<i>“You must really enjoy getting drenched in breast milk, hrm?”</i>  she teases.", parse);
		else if(terry.flags["xLact"] <= 6)
			Text.Add("<i>“I admit this was amusing the first few times, but do you not think [heshe] has had enough?”</i> she comments.", parse);
		else
			Text.Add("<i>“Will you ever learn your lesson?”</i> she asks, rolling her eyes.", parse);
		Text.Add(" Jeanne snaps her fingers, gathering all the milk into a floating white orb and funneling it all into a bottle. She corks the bottle and passes it to you.", parse);
		Text.NL();
		Text.Add("You idly thank Jeanne for her help, and the clean up, before reaching down and helping Terry to [hisher] feet. From the way [heshe] is still gingerly cradling [hisher] bosom, it looks like [heshe]’s still full to capacity.", parse);
		
		terry.flags["xLact"]++;
	}
	else {
		Text.Add("Terry moans softly as [hisher] [terrybreasts] visibly quiver; it almost looks like [hisher] nipples are vibrating, working themselves up fatter and fuller than usual. After a few moments, the [foxvixen]’s chest settles back down again, leaving [himher] with engorged buds. Terry makes a small noise of curiosity, and inquisitively pinches at one; [heshe] lets out a yelp of shock, hand withdrawing as if stung, and allowing you to see the droplet of white milk seeping from the nipple and running down [hisher] tit.", parse);
		Text.NL();
		Text.Add("<i>“I feel so full,”</i> [heshe] comments, hugging [hisher] own chest.", parse);
		Text.NL();
		Text.Add("Curious, you take Terry’s hands by the wrists and gently lift [hisher] arms away, allowing you to move in closer to suckle at one sensitive nipple. Your pet’s milk washes over your tongue, a distinctive taste accompanied by liquid warmth; very nice. Smacking your lips appreciatively, you congratulate Terry on how tasty it is.", parse);
		Text.NL();
		if(terry.Relation() < 30) {
			Text.Add("<i>“How dare you! Don’t touch me!”</i> [heshe] protests, jumping away from you.", parse);
			Text.NL();
			Text.Add("You watch [himher] with feigned indifference, asking how [heshe] expects to drain [himher]self without your help whenever [heshe] gets full. Terry grumbles, ears flattening against [hisher] skull. The [foxvixen] looks down at the floor, but says nothing. [HeShe]’ll get over it.", parse);
		}
		else if(terry.Relation() < 60) {
			Text.Add("<i>“You like it? Good, because you’re gonna help me drain it whenever I’m full!”</i> [heshe] says imperiously.", parse);
			Text.NL();
			Text.Add("You can’t help but smirk at Terry’s attempt at a defiant bark, casually replying that you think you can do that for [himher].", parse);
		}
		else {
			Text.Add("<i>“I’m glad you like it, but I hope you’re aware this means you’ll be adding ‘milk the [foxvixen]’ to your daily tasks,”</i> [heshe] teases with a smirk.", parse);
			Text.NL();
			Text.Add("Grinning back, you assure [himher] that you’ll adjust your schedule accordingly.", parse);
		}
	}
	Text.Flush();
	terry.flags["lact"] = 1;
	terry.SetLactation();
	terry.lactHandler.milk.base = terry.MilkCap();
	
	JeanneScenes.InteractPrompt();
}

TerryScenes.JeanneTFStopLactate = function() {
	let terry = GAME().terry;
	let player = GAME().player;

	var parse : any = {
		playername : player.name,
		foxvixen   : terry.mfPronoun("fox", "vixen"),
		terrybreasts : function() { return terry.FirstBreastRow().Short(); }
	};
	parse = terry.ParserPronouns(parse);
	
	Text.Clear();
	if(terry.Lactation()) {
		Text.Add("Terry’s breasts quiver to the extent [hisher] nipples vibrate, the formerly engorged nubs shrinking down and compacting into their original small, perky selves. Once they have dwindled away, the shuddering of the [foxvixen]’s titflesh vanishes, leaving [hisher] [terrybreasts] the way they were before.", parse);
		Text.NL();
		Text.Add("Terry experimentally pinches one of [hisher] teats, but nothing comes out. <i>“I guess that’s the end of that, then.”</i>", parse);
		Text.NL();
		Text.Add("You nod idly, agreeing that it looks like neither of you will need to deal with fox-milk anymore. Doesn’t look like Terry minds the change very much, either.", parse);
	}
	else {
		Text.Add("The two of you look at Terry’s bosom for a while, but ultimately nothing happens.", parse);
		Text.NL();
		Text.Add("<i>“I guess… it worked?”</i> Terry says, getting up on [hisher] feet.", parse);
		Text.NL();
		Text.Add("<i>“Of course it did,”</i> Jeanne offers. <i>“My potions always work. Just because it did not have any visible effect does not mean it was ineffective.”</i>", parse);
		Text.NL();
		Text.Add("As you stand there, you feel embarrassed. It should have occurred to you in the first place that it would be a waste of time and resources removing lactation from someone who doesn’t lactate in the first place. All you’ve done is made yourself look and feel rather foolish.", parse);
	}
	Text.Flush();
	
	terry.flags["lact"] = 0;
	terry.SetLactation();
	
	JeanneScenes.InteractPrompt();
}

TerryScenes.JeanneTFGrowVag = function() {
	let terry = GAME().terry;
	let player = GAME().player;

	var parse : any = {
		playername : player.name,
		foxvixen   : terry.mfPronoun("fox", "vixen"),
		tcockDesc  : function() { return terry.MultiCockDesc(); },
		hand       : function() { return terry.HandDesc(); }
	};
	parse = terry.ParserPronouns(parse);
	
	Text.Clear();
	if(terry.FirstVag()) {
		Text.Add("Terry gasps, [hisher] hands darting to [hisher] pussy and barely making it before the [foxvixen] cums with a cry. Squirt after squirt of feminine fluids flowing from between [hisher] legs like a perverted cascade.", parse);
		if(terry.HorseCock())
			Text.Add(" [HisHer] equine pecker erupts, bobbing in a lewd fountain almost as messy as [hisher] feminine half.", parse);
		else if(terry.FirstCock())
			Text.Add(" [HisHer] cock spurts rope after rope of seed down to join [hisher] feminine half in sympathetic orgasm.", parse);
		Text.NL();
		Text.Add("The [foxvixen] continues being stuck in perpetual orgasm for a while longer, until [hisher] legs finally give out and [heshe] collapses to [hisher] knees on the puddle of [hisher] own making. A few more spurts of female juices and [heshe] finally stops. <i>“D-damn...”</i>", parse);
		Text.NL();
		Text.Add("[HeShe] can certainly say that again; that looked like one intense orgasm. Still, it seems that the intended effect won’t work anymore; Terry’s only ever going to have the one vagina, it looks like.", parse);
	}
	else {
		Text.Add("Terry groans, holding [hisher] crotch as it heats up, rubbing [hisher] slender thighs together. <i>“Hot! Hot! Hot!”</i> [heshe] cries out, falling to [hisher] knees.", parse);
		Text.NL();
		Text.Add("You quickly move to catch [himher], one arm around [hisher] shoulder, asking if [heshe]’s alright and to let you see what’s happening to [himher]. [HeShe] wriggles and mewls, but eventually you manage to get [himher] on [hisher] back and spread [hisher] legs so that you can see what is happening. Lifting [hisher] [tcockDesc] out of the way, you watch as the flesh underneath [hisher] balls dimples and ripples, a vertical line of pink flesh rising through the fur before suddenly parting, Terry crying out as wet fluid gushes from the new opening.", parse);
		Text.NL();
		Text.Add("Motivated by curiosity, you reach in with a finger, gently running it down the soft, delicate-looking folds of the [foxvixen]’s new netherlips. Terry wriggles and threshes, mewling in pleasure, and you become aware of [hisher] cock jutting eagerly from its sheath... and, more importantly, of a stiff little clitoris just barely peeking out of its hood at the top of Terry’s new pussy.", parse);
		Text.NL();
		Text.Add("You can’t resist touching it, squeezing it gently between forefinger and thumb and rolling it between your digits. This is evidently the last straw for Terry; the [foxvixen] lets out a barking cry of pleasure and veritably gushes femcum from [hisher] new pussy, a great wet squirt of juices splashes against the your [hand]s and the floor, followed by a couple more weak squirts as [heshe] collapses, exhausted for the moment.", parse);
		Text.NL();
		Text.Add("Looking at the great mess that Terry has made, you can’t help shaking your head and quipping that it looks like [hisher] new equipment is working just fine. Out of the corner of your eye, you can see Jeanne smirking before she twitches her fingers, making the fluids roll and seep off of Terry’s body and yours alike, creeping along the floor in a great puddle before rising up and pouring itself into an open bottle that comes floating through the air to meet it.", parse);
		terry.flags["vag"] = TerryFlags.Pussy.Virgin;
	}
	Text.Flush();
	
	terry.SetPussy();
	
	var cum = terry.OrgasmCum();
	
	JeanneScenes.InteractPrompt();
}

TerryScenes.JeanneTFRemVag = function() {
	let terry = GAME().terry;
	let player = GAME().player;

	var parse : any = {
		playername : player.name,
		foxvixen   : terry.mfPronoun("fox", "vixen"),
		tcockDesc  : function() { return terry.MultiCockDesc(); },
		horse      : terry.HorseCock() ? "horse" : ""
	};
	parse = terry.ParserPronouns(parse);
	
	Text.Clear();
	if(terry.FirstVag()) {
		Text.Add("<i>“Ugh!”</i> Terry falls to [hisher] knees, holding [hisher] crotch. Shuddering, [heshe] moans, dropping down on all fours.", parse);
		if(terry.FirstCock())
			Text.Add(" From your vantage point, you can see that Terry’s [horse]cock is already at full mast, throbbing and spewing pre like a faucet.", parse);
		Text.NL();
		Text.Add("You move to kneel behind [himher], lifting [hisher] tail out of the way as you watch the last moments of Terry’s pussy. You can see its netherlips flexing and wrinkling, shudders wracking the [foxvixen]’s body before [heshe] lets out a barking cry as it squeezes shut, fluid spurting wetly between its folds even as they dwindle away, shrinking into [hisher] fur until it is lost forever.", parse);
		Text.NL();
		if(terry.FirstCock()) {
			Text.Add("Terry’s [tcockDesc] visibly bulges before erupting, spraying semen across the floor to join the puddle of feminine fluids already there.", parse);
			Text.NL();
			parse["more"] = terry.sex.birth > 0 ? " any more" : "";
			Text.Add("The [foxvixen] groans, <i>“Guess I don’t have to worry about having[more] babies now.”</i>", parse);
			Text.NL();
			Text.Add("[HeShe] most certainly doesn’t.", parse);
		}
		else {
			Text.Add("The now flat, featureless expanse of Terry’s crotch suddenly bulges alarmingly, fur stretching into three indistinct shapes; one oval, two rounded. Within seconds, they reshape themselves into something clearer; two dangling, dainty balls, much like the ones Terry originally had. The identity of the third shape becomes clear when a throbbing, crimson-fleshed fox prick thrusts its quivering shape out of the opening at its end, spraying semen into the puddle of sexual fluids below the [foxvixen]’s form.", parse);
			Text.NL();
			Text.Add("<i>“Hey there, old buddy,”</i> [heshe] says, touching [hisher] sensitive foxhood.", parse);
			Text.NL();
			Text.Add("You can’t resist asking if Terry wants you to leave the two of them alone to ‘get reacquainted’. [HeShe] just looks at you disdainfully.", parse);
			
			terry.flags["cock"] = TerryFlags.Cock.Regular;
			terry.SetCock();
		}
	}
	else {
		Text.Add("A few moments tick by, and absolutely nothing happens. There’s not even the slightest hint of stirring from the [foxvixen]’s [tcockDesc]. Terry simply gives you a noncommittal shrug, whilst you feel very foolish about using a vagina-removing suppository on someone who doesn’t have a vagina to remove.", parse);
	}
	Text.Flush();
	
	terry.flags["vag"] = TerryFlags.Pussy.None;
	terry.SetPussy();
	
	JeanneScenes.InteractPrompt();
}

TerryScenes.JeanneTFGrowCockEntrypoint = function() {
	let terry = GAME().terry;
	let player = GAME().player;

	var parse : any = {
		playername : player.name,
		foxvixen   : terry.mfPronoun("fox", "vixen")
	};
	parse = terry.ParserPronouns(parse);
	
	Text.Add("Terry’s whole body quakes with violent tremors, the [foxvixen] letting out a high-pitched cry as [hisher] legs fail [himher], sending [himher] pitching down onto [hisher] knees. Eyes screwed closed, whimpering, [heshe] rubs frantically at [hisher] loins, just above [hisher] pussy.", parse);
	Text.NL();
	Text.Add("As you watch, the flesh over Terry’s cunt begins to bulge and bloat, swelling into an oval-shaped mass. Finally, [heshe] wraps [hisher] fingers around it and its tip splits apart, revealing something crimson-colored and conical in shape jutting from the interior of what is clearly [hisher] new sheath. Curling [hisher] digits around it, Terry strokes away in an almost trance-like state, coaxing inch after inch of turgid flesh from its depths. Its base begins to swell, bloating into the iconic vulpine knot, engorged and clearly ready to be used to anchor Terry to someone, but after that... nothing else happens.", parse);
}

TerryScenes.JeanneTFHorsegasmEntrypoint = function() {
	let terry = GAME().terry;
	let player = GAME().player;

	var parse : any = {
		playername : player.name,
		foxvixen   : terry.mfPronoun("fox", "vixen"),
		tcockDesc  : function() { return terry.MultiCockDesc(); },
		tbreastDesc : function() { return terry.FirstBreastRow().Short(); }
		
	};
	parse = terry.ParserPronouns(parse);
	
	Text.Add("Terry immediately falls to [hisher] knees, hands darting to stroke [hisher] already engorged [tcockDesc]. Knot already fully formed, all [heshe] needs is a small touch on [hisher] inflated thickness to send forth a veritable geyser of jism; once [heshe]’s begun, you know there’s just no stopping [himher]. [HisHer] equine endowment never stops spewing gob after gob of cum, even as [heshe] gets the brilliant idea to lean over and take the flared tip of [hisher] horsecock into [hisher] foxy muzzle. In the end, [heshe] winds up blasting [hisher] own face with spunk - not that [heshe]’d care at this point - and though [heshe] does [hisher] best to suckle it all, most of the spent juices wind up on [hisher] body rather than in [hisher] maw.", parse);
	if(terry.FirstVag())
		Text.Add(" Somewhere in [hisher] continuous climax, Terry’s pussy has decided to make its own contribution to the mess by squirting some femcum down below, between the [foxvixen]’s legs.", parse);
	Text.NL();
	Text.Add("You watch as the semen-hose masquerading as a [foxvixen] slowly comes to a halt, [hisher] perversely equine cock slapping wetly against [hisher] [tbreastDesc] and lying slack on [hisher] visibly bulging belly. You slowly scrape a stray bead of jizz off of your cheek and ", parse);
	if(player.Slut() >= 60)
		Text.Add("suck it off your finger, savoring its taste.", parse);
	else
		Text.Add("flick it dismissively aside.", parse);
	Text.Add(" You ask Terry if [heshe] thinks [heshe]’s done now, to which the tired, seed-soaked [foxvixen] simply gives you a dizzy grin and nods sheepishly. Even as you say this, you look over [hisher] now-flaccid horsecock; it doesn’t look to have changed at all.", parse);
}

TerryScenes.JeanneTFGrowCock = function() {
	let terry = GAME().terry;
	let player = GAME().player;

	var parse : any = {
		playername : player.name,
		foxvixen   : terry.mfPronoun("fox", "vixen"),
		tcockDesc  : function() { return terry.MultiCockDesc(); }
	};
	parse = terry.ParserPronouns(parse);
	
	Text.Clear();
	if(terry.flags["cock"] == TerryFlags.Cock.None) {
		TerryScenes.JeanneTFGrowCockEntrypoint();
		Text.NL();
		Text.Add("The [foxvixen] pants, fapping like [hisher] life depended on it. <i>“Hah… c-can’t cum!”</i> [heshe] exclaims, desperation apparent in [hisher] voice.", parse);
		Text.NL();
		Text.Add("Instinctively, you close the distance and approach the [foxvixen]. Batting [hisher] hand away, you reach out to gently massage the base of [hisher] new sheath. With soft but insistent strokes, your fingers move up and around. Terry shudders and lets out a deep, sighing moan, and a bulge of flesh suddenly forms at the base of [hisher] sheath. A suspicion of what it is prompts you to keep going, and when the effect repeats itself, thick ropes of pre-cum starting to bubble from [hisher] cock. You’re certain of it: [heshe] now has balls again.", parse);
		Text.NL();
		Text.Add("Without a thought, you lift your hands from the base of Terry’s sheath and give [hisher] new cock a firm pump between your digits.", parse);
		Text.NL();
		Text.Add("Terry cries out in pleasure as your touch brings [himher] to [hisher] climax. [HeShe] instinctively bucks against your grasp as rope after rope of fox-jism spurts from [hisher] newly grown fox-cock. A wet splash comes from underneath the [foxvixen] as [hisher] pussy achieves a sympathetic orgasm.", parse);
		Text.NL();
		Text.Add("Stepping back, you watch as the [foxvixen] collapses onto a puddle of [hisher] own making. [HeShe] sighs in relief. <i>“Ah… I thought I was going to explode.”</i>", parse);
		Text.NL();
		Text.Add("Looking at the sheer mess of Terry’s climax, you can’t resist quipping that you wouldn’t say [heshe] didn’t.", parse);
		
		terry.flags["cock"] = TerryFlags.Cock.Regular;
		terry.SetCock();
	}
	else if(terry.flags["cock"] == TerryFlags.Cock.Regular) {
		Text.Add("Terry immediately falls to [hisher] knees, furiously fapping at [hisher] fox-cock as it reaches its fully engorged state and dripping pre. The knot inflates in record time. Each time [hisher] paws connect with it, [heshe] spews a long strand of fox-cum.", parse);
		if(terry.FirstVag())
			Text.Add(" The [foxvixen]’s pussy reacts in a similar manner, squirting small but constant, gushes of fluids underneath, quickly forming a pool of female-scented arousal.", parse);
		Text.NL();
		Text.Add("The process continues for a short while longer, until Terry’s finished cumming. After [heshe]’s done, [heshe] slowly climbs back to [hisher] feet, still a bit dizzy and wobbly from so many repeated orgasms. <i>“Damn… that was intense.”</i>", parse);
		Text.NL();
		Text.Add("You nod your head in agreement with [hisher] statement, but note that despite all this, Terry’s [tcockDesc] doesn’t look any different. It seems Jeanne’s suppository is only good for restoring a removed cock, not for adding new ones or increasing its size.", parse);
	}
	else { // Horsecock
		TerryScenes.JeanneTFHorsegasmEntrypoint();
	}
	Text.Flush();
	
	var cum = terry.OrgasmCum();
	
	JeanneScenes.InteractPrompt();
}

//TODO
TerryScenes.JeanneTFRemCock = function() {
	let terry = GAME().terry;
	let player = GAME().player;

	var parse : any = {
		playername : player.name,
		foxvixen   : terry.mfPronoun("fox", "vixen")
	};
	parse = terry.ParserPronouns(parse);
	
	Text.Clear();
	if(terry.FirstCock()) {
		if(terry.HorseCock()) {
			Text.Add("The [foxvixen] arches [hisher] back, eyes screwed shut as [hisher] equine endowment thrusts from [hisher] sheath. It visibly throbs, knot swelling as if tying with some ethereal pussy... and then, with a body-wracking shudder, Terry cums. A great gout of semen sprays from its flared head, splashing messily across the floor, and then its underside bulges before it fires a second shot, and then a third, each as large as the one before.", parse);
			Text.NL();
			Text.Add("After the third shot, however, it stops firing; a steady flow of seed seeps slowly from its head, but nothing else seems to be coming out. Terry wriggles and moans, delirious with the pleasure of the transformative running through [hisher] system. If you let this run its course, you’re going to be stuck here until tomorrow. Considering Terry is in no shape to try and fix this, it seems you’ll have to do something about it yourself.", parse);
			Text.NL();
			Text.Add("Crossing the distance between you both, you seat yourself behind the [foxvixen] and pull [himher] into your lap, reaching around to take hold of the horsecock as it throbs away in [hisher] lap. You can feel that it’s shrunk, shorter and thinner now than it was before.", parse);
			Text.NL();
			Text.Add("Moving your fingers to its inflated knot and gripping the bloated bulge of flesh with your hand, you caress it. Slowly, you massage it against your palm with smooth, even motions. Terry moans like a whore in heat, thick spurts of cum geysering from [hisher] flare, each climactic outburst causing [hisher] bulb to shrink a little bit in your grip until finally it disappears, leaving [himher] with just a normal horsecock.", parse);
			Text.NL();
			Text.Add("Smiling, your hand glides in a long, slow stroke up Terry’s shaft, not stopping until you reach the flared tip. Your digits trace circles around the bulging flesh, rubbing every bump and wrinkle, teasing out great jets of semen that spill down [hisher] length. Looking over Terry’s shoulder confirms what your fingers are telling you: Terry’s dick is shrinking, and quite rapidly, inches vanishing with every spurt of seed.", parse);
			Text.NL();
			Text.Add("Stroke by stroke and spurt by spurt, Terry’s cock keeps dwindling from its former impressive size to something even smaller than [hisher] original vulpine member, just barely big enough to fit outside its sheath now. Moved by impulse, you reach out and gently tuck the now micro-dick away inside of the sheath, one final pathetic spurt of semen erupting from between its fleshy lips as if in weak protest of its fate. Your fingers move to pinch the sheath’s lips shut, rubbing it back into Terry’s loins and feeling it seep away into the flesh of [hisher] crotch, until there’s no longer anything there.", parse);
			Text.NL();
			Text.Add("Terry’s balls remain, dangling lonely in their former space. You move to cup them, fondling and rolling them around in your palm, feeling them shrink smaller and smaller until they have receded totally into Terry’s body, leaving a blank space where [hisher] cock was.", parse);
			Text.NL();
			parse["vag"] = terry.FirstVag() ? Text.Parse(", apart from [hisher] pussy, of course", parse) : "";
			Text.Add("As your [foxvixen] pants heavily for breath, you give [himher] a moment’s respite, then gently wriggle your way out from under [himher] once it looks like [heshe] can support [himher]self. As [heshe] continues catching [hisher] breath, you walk back around to [hisher] front so you can properly examine [hisher] new state. Sure enough, it’s totally smooth and blank[vag].", parse);
		}
		else {
			Text.Add("The [foxvixen] arches [hisher] back, eyes screwed shut as [hisher] vulpine dick thrusts from [hisher] sheath. It visibly throbs, knot swelling as if tying with some ethereal pussy... and then, with a body-wracking shudder, Terry cums, spraying [hisher] usual meager splash of semen across the floor. Instead of going limp, however, it fires off again, and then again, multiple orgasms wracking the vulpine-morph in quick succession.", parse);
			Text.NL();
			Text.Add("But as [heshe] barks and whimpers in pleasure, you can see something surprising happening: Terry’s dick is growing smaller, inch after inch, dwindling down until only the barest nub of a cock is poking out of [hisher] sheath. Then, with one final thigh-spattering splash of semen, it vanishes inside of [hisher] sheath, which seems to melt away into Terry’s body. [HisHer] balls dwindle, as if being sucked into Terry’s pelvis from the inside out, and are likewise gone.", parse);
		}
		
		terry.flags["cock"] = TerryFlags.Cock.None;
		terry.SetCock();
		
		Text.NL();
		Text.Add("Terry rubs [hisher] smoothened crotch, exhaling a sigh as the last tickles of pleasure fade. <i>“Well, I guess I’m a bit less male now...”</i>", parse);
		if(!terry.FirstVag()) {
			Text.NL();
			Text.Add("Your vulpine pet isn’t left a neuter for long; moaning in pleasure, you watch [hisher] now-blank loins beginning to puff and swell, shaping into the unmistakably feminine form of a daintily puffy mons. Pink flesh pushes through the fur in a vertical line, then suddenly peels open in a great squirt of translucent fluid, the ecstatic howl escaping Terry’s lips making you very certain as to what it is.", parse);
			Text.NL();
			Text.Add("Terry has grown [himher]self a brand new pussy to replace [hisher] old cock!", parse);
			
			terry.flags["vag"] = TerryFlags.Pussy.Virgin;
			terry.SetPussy();
		}
		
		var cum = terry.OrgasmCum();
	}
	else {
		parse["lust"] = (terry.LustLevel() >= 0.5 || terry.Slut() >= 60) ? " beyond usual" : "";
		Text.Add("Both you and Terry wait patiently, but nothing happens. There’s simply no alteration in the [foxvixen]. No stirring on [hisher] pussy, not even a tickle of arousal[lust]. After a few moments, Terry simply gives you a noncommittal shrug, whilst you feel very foolish about using a penis-removing suppository on someone who doesn’t have a penis to remove.", parse);
	}
	Text.Flush();
	
	JeanneScenes.InteractPrompt();
}

TerryScenes.JeanneTFGrowHorsecock = function() {
	let terry = GAME().terry;
	let player = GAME().player;

	var parse : any = {
		playername : player.name,
		pheshe     : player.heshe(),
		foxvixen   : terry.mfPronoun("fox", "vixen"),
		paternalMaternal : player.mfTrue("paternal", "maternal")
	};
	parse = terry.ParserPronouns(parse);
	
	Text.Clear();
	if(terry.HorseCock()) {
		TerryScenes.JeanneTFHorsegasmEntrypoint();
		
		Text.Flush();
		var cum = terry.OrgasmCum();
		
		JeanneScenes.InteractPrompt();
		return;
	}
	
	if(terry.FirstCock()) {
		Text.Add("Terry groans, falling to [hisher] knees as a dizzy spell threatens to knock [himher] off balance. <i>“T-tight!”</i>", parse);
		Text.NL();
		Text.Add("You watch as the [foxvixen] sits down and spread [hisher] legs to let you watch as [hisher] balls churn. The tip of [hisher] cock pokes out from its sheath as a small rope of cum spews forth, even before [hisher] dick has a chance to grow into a proper erection.", parse);
		Text.NL();
		Text.Add("With the pressure of the seed churning within [hisher] balls, Terry’s member sprouts like lightning into a full-fledged erection, knot swelling out with the need to anchor. The shaft throbs visibly, its base bulging as a great spurt of semen forces its way up and out [hisher] glans, far larger than the last. Looking a little further down, you can see [hisher] balls throbbing in sympathy, almost visibly churning up more and more cum, bloating to twice their original size from the sheer volume of seed crammed into them.", parse);
	}
	else {
		TerryScenes.JeanneTFGrowCockEntrypoint();
		
		Text.NL();
		Text.Add("<i>“Huh? Is that it?”</i> the [foxvixen] asks, stopping [hisher] masturbation and sitting down to look at [hisher] turgid cock throb.", parse);
		Text.NL();
		Text.Add("A gob of pre forms on the pointy tip, falling to the ground as Terry groans, <i>“Ugh… I guess it isn’t over...”</i>", parse);
		Text.NL();
		Text.Add("Sitting on [hisher] haunches, the [foxvixen] spreads [hisher] legs, giving you a perfect view of [hisher] foxhood as it throbs. A few drops of pre slide along the erect shaft, down [hisher] knot and onto the floor.", parse);
		Text.NL();
		Text.Add("Before your eyes, the fur at the base of the [foxvixen]’s new cock starts to expand, swelling out and taking the shape of what is unquestionably a new scrotum. They hit the size of Terry’s old balls, but keep on growing, expanding until they are easily twice the size of the [foxvixen]’s original dainty testes. Terry shudders, moaning softly as they almost visibly churn, bulging with frothing new [foxvixen]-seed. The semen inside builds in pressure until it is forcing its way up Terry’s shaft, a bulge visibly traversing its underside before a great ropy strand of seed spews from its tip.", parse);
	}
	Text.NL();
	Text.Add("Terry cries out, [hisher] cock bulging out, veins on display, pumping into [hisher] dick as [heshe] suddenly grows harder than you thought possible.", parse);
	Text.NL();
	Text.Add("Before your eyes, Terry’s shaft begins to bulge, swelling in girth wider and wider, [hisher] knot being absorbed by the growing flesh until it disappears altogether. Only after it has grown so wide does the outward swelling stop, the member pulsating with pent-up need. Terry mewls and shudders, bucking [hisher] hips in unconscious desire, and with each thrust, [hisher] tip grows flatter and flatter. Soon, it’s no longer pointy at all, but blunt and roughly circular; the more you look at it, the more it looks like a horse’s cock, flare and all.", parse);
	Text.NL();
	Text.Add("A cry of ecstasy wrings its way from the [foxvixen]’s throat as a small spurt of semen shoots from [hisher] now flat, flared tip. It splashes almost meekly onto the floor, and then a second spurt erupts, and then a third, meager ropes of seed trailing across the floor.", parse);
	Text.NL();
	Text.Add("The transformative is clearly still at work, however; each spurt of cum makes Terry’s cock grow just a little bit bigger, a little bit fatter. Inch by inch it slowly swells outwards, bloating longer and longer. When the volley of jism ropes finally dwindles away into a seeping trickle, the panting [foxvixen]’s sheath is visibly distended around [hisher] new phallic girth. There’s no question what [heshe]’s now sporting is an equine cock, at least three times its original length and almost three times as thick as it once was. Colored the same bright crimson as Terry’s old cock, the bobbing shaft is incredibly eye-catching, drawing attention with both its color and sheer size.", parse);
	Text.NL();
	Text.Add("The [foxvixen] pants with the effort, [hisher] sheath slowly growing more and more accustomed to the girth of [hisher] new horsecock. <i>“D-damn! It’s not over!”</i> [HeShe] cries out as [hisher] dick slowly changes color, the bright crimson fading into a more subtle pink coloration, dulling out so as to not draw as much attention to [hisher] newly acquired equine endowment. Not that such a huge shaft would go unnoticed when it’s attached to Terry’s dainty body.", parse);
	Text.NL();
	Text.Add("As if in response to your thoughts, the colors of Terry’s cock keep on changing, shifting from its former pearly pink shade to a mottled brown color that is more like something you’d associate with a horse’s dick. It looks like you spoke too soon; this darker color seems to make it stand out even more against Terry’s white and gold fur than it did when it was bright red.", parse);
	Text.NL();
	Text.Add("Before your eyes, the straining flesh of Terry’s sheath begins to grow, creeping forward and stretching wider as it does. Soon, it has enveloped the base of the new horse-like cock, properly sized to fit, and making it match [hisher] body much more smoothly. Looking at the pulsating erection, you feel compelled to touch it and see for yourself how Terry responds.", parse);
	Text.NL();
	Text.Add("Deciding to give in to your curiosity, you circle Terry and seat yourself on the floor behind [himher]. Once comfortable, you unceremoniously pull the [foxvixen] into your lap, one arm curling around [hisher] waist to hold [himher] there and the other hand reaching eagerly into [hisher] lap and the new toy that awaits you there.", parse);
	Text.NL();
	Text.Add("<i>“Ah! Wait!”</i> the [foxvixen] protests as you encircle [hisher] shaft, slowly stroking along its length, milking pre as it leaks like a faucet. You eagerly divert your caress to [hisher] flat tip, rubbing the sensitive glans as Terry cries out in pleasure. Pre continually forms, which you quickly swipe to rub along [hisher] member. <i>“C-can’t cum!”</i>", parse);
	Text.NL();
	Text.Add("As Terry bucks madly into your hand, unthinkingly grinding against you in [hisher] magically-induced rut, you can’t help but rub [hisher] new shaft, trying to help the [foxvixen] achieve release. Strange... there’s some sort of bulge growing down near the base of [hisher] dick...", parse);
	Text.NL();
	Text.Add("Curious, you continue to rub and stroke it, feeling it continuing to bloat outwards in mimicry of the flaring tip, and you realize what it is: the shift from vulpine to equine evidently wasn’t total. Terry’s growing a brand new knot! And quite a knot, at that; as you continue to molest it, it bloats into a monster easily the size of a grapefruit. Fortunately, that seems to be as big as it’s going to get.", parse);
	Text.NL();
	Text.Add("Sperm drools thick and heavy over your stroking fingers as Terry gasps and whimpers, trembling so hard you can feel it. It doesn’t look like [heshe]’s going to last much longer... Abandoning Terry’s cock, your hand reaches for [hisher] newly-bloated balls, which show no sign of shrinking despite the copious amounts of seed leaking from Terry’s new endowment. You caress the bulging orbs with your digits, rolling them into your palm as best you can and fondling them, feeling their liquid contents churn and boil inside.", parse);
	Text.NL();
	Text.Add("That seems to be it, as Terry arches [hisher] back and howls in ecstasy, erupting like a perverse volcano as [hisher] new balls eagerly empty themselves. Great waves of semen, any one of which would have put [hisher] old climaxes to shame, erupt from the flaring tip, vomiting in a fountain of off-white. What feels like minutes slips by before finally Terry’s new dick belches its last hands-filling gobbet of seed and falls limp... well, as limp as it can, with the knot swollen at its base, preventing Terry’s sheath from sucking it back inside.", parse);
	Text.NL();
	Text.Add("With a huge sigh of release, Terry slumps back against you, feeling exhausted due to how spent [heshe] is, head falling down and resting [hisher] chin on [hisher] chest. You adjust the [foxvixen] on your lap, so [heshe] can have some proper rest.", parse);
	Text.NL();
	Text.Add("You glance over at Jeanne, who took the brunt of Terry’s climax. The magician is soaked in the [foxvixen]’s cum, long strands hanging from her hat and dripping down her cleavage. She looks relatively unconcerned, if a little surprised. With a small gesture and a few whispered words, the white goop is swept up by her magic, gathering into a rather large floating blob. Another flick of her wrist and a vial drifts lazily over to the base of the blob, which vanishes inside of it before it caps itself off. She deftly plucks it from the air and stows it away inside of her pocket, clearly intending to make use of it somehow.", parse);
	Text.NL();
	Text.Add("<i>“Well, that was certainly... interesting. Quite a show your little [foxvixen] put on, [playername],”</i> the elven mage comments.", parse);
	Text.NL();
	Text.Add("[HeShe] most certainly did, you reply. ", parse);
	if(player.Slut() >= 60)
		Text.Add("An almost [paternalMaternal] wave of pride fills you at just how much of a show your little pet gave you; you can’t wait to see what [heshe] can do with this new dick after some more training.", parse);
	else
		Text.Add("You wriggle in embarrassment, feeling the guilt of soaking Jeanne washing over you like an icy shower. If this new productivity is going to be staying, sex is going to get a bit more embarrassing in the future.", parse);
	Text.NL();
	Text.Add("It takes the better part of an hour before Terry is well enough to get back on [hisher] feet. [HeShe] examines [hisher] new sheath and balls, both much bigger, and fuller, than [hisher] original set. <i>“Dammit, [playername]. You can’t keep changing and transforming me like I’m some kind of toy,”</i> [heshe] pouts.", parse);
	Text.NL();
	Text.Add("<i>“I did not hear you complain over all the screaming about how good it felt, nor when you were on all fours getting done in the butt by [playername],”</i> Jeanne states nonchalantly. <i>“You also did not protest when [pheshe] brought up the idea.”</i>", parse);
	Text.NL();
	Text.Add("Smiling, you agree to Jeanne’s observations.", parse);
	Text.NL();
	Text.Add("<i>“I… umm...”</i>", parse);
	Text.NL();
	Text.Add("Looks like Terry is at a loss for words. ", parse);
	if(terry.Relation() < 30) {
		Text.Add("With a friendly grin, you give the [foxvixen] a playful clap on the shoulder, assuring [himher] that [heshe]’ll grow to enjoy [hisher] new toy, if [heshe] gives it a chance.", parse);
		Text.NL();
		Text.Add("The [foxvixen] huffs indignantly, looking away.", parse);
	}
	else if(terry.Relation() < 60) {
		Text.Add("Smiling, you close the distance and draw Terry to you, wrapping your arms around [himher] in an affectionate hug. The new cock really looks great on [himher], you assure the [foxvixen].", parse);
		Text.NL();
		Text.Add("<i>“Thanks. It’s… pretty sensitive, I guess. It’ll take some getting used to.”</i>", parse);
		Text.NL();
		Text.Add("That may be, but you’re sure [heshe]’ll get used to it in record time.", parse);
	}
	else {
		Text.Add("You simply can’t resist, Terry’s face lighting up with glee as you pull the [foxvixen] into a warm hug, feeling [himher] melting against you as your lips claim [hishers]. As your bodies tangle, you can feel the new equine dick hanging between [hisher] legs poking against you. Breaking the kiss, you smirk and quip that you have a feeling it won’t be long before Terry starts to enjoy [hisher] new equipment.", parse);
		Text.NL();
		Text.Add("The [foxvixen] grins. <i>“I just hope you’re ready to deal with the responsibility that comes attached with giving me this big cock. I already have an idea about what I’d like it used for,”</i> Terry says, licking [hisher] lips.", parse);
		Text.NL();
		Text.Add("That’s the spirit; [heshe]’s getting the hang of things already. To celebrate, you decide to kiss [himher] again, enjoying the almost purring sound of pleasure that rumbles up [hisher] throat as [heshe] melts against you. After a few pleasant moments, you release the [foxvixen], who actually pouts at being let go.", parse);
	}
	Text.Flush();
	
	terry.flags["cock"] = TerryFlags.Cock.Horse;
	terry.SetCock();
	
	TimeStep({hour: 1});
	var cum = terry.OrgasmCum();
	
	JeanneScenes.InteractPrompt();
}



/* TERRY SEX SCENES */


TerryScenes.Impregnate = function(mother : Entity, father : Entity, cum : number, slot? : number) {
	mother.PregHandler().Impregnate({
		slot   : slot || PregnancyHandler.Slot.Vag,
		mother : mother,
		father : father,
		race   : Race.Fox,
		num    : 1,
		time   : 29*24,
		load   : cum
	});
}

// TODO
TerryScenes.SexPrompt = function(backPrompt : any) {
	let terry = GAME().terry;
	let player = GAME().player;

	var parse : any = {
		foxvixen : terry.mfPronoun("fox", "vixen"),
		master : player.mfTrue("master", "mistress"),
		playername : player.name
	};
	parse = player.ParserTags(parse);
	parse = terry.ParserPronouns(parse);
	parse = terry.ParserTags(parse, "t");
	
	Gui.Callstack.push(function() {
		Text.Add("Done appreciating your vulpine pet’s naked form, you step around so that you are in front of [himher], rubbing your chin idly as you consider how you want to fuck the [foxvixen] this time...", parse);
		Text.Flush();
		TerryScenes.SexPromptChoice(backPrompt, true);
	});
	
	if(terry.Slut() >= 60) {
		Text.Add("With practiced motions, Terry begins stripping [hisher] [tarmor], each motion a flourish that emphasizes [hisher] assets. You watch the delicate [foxvixen]’s striptease enraptured, drinking in every detail on [hisher] lithe body, until [heshe] is completely naked.", parse);
		player.AddLustFraction(0.2);
	}
	else if(terry.Slut() >= 30)
		Text.Add("Terry eagerly begins removing [hisher] [tarmor].", parse);
	else {
		Text.Add("Terry reluctantly begins stripping off [hisher] [tarmor], taking off each piece of [hisher] garment painstakingly slowly.", parse);
		if(terry.Relation() >= 30)
			Text.Add(" Whether it's to entice you, or out of shyness, you don’t know.", parse);
	}
	Text.NL();
	
	var scenes = new EncounterTable();
	scenes.AddEnc(function() {
		Text.Add("<i>“How’s this?”</i> [heshe] asks, puffing [hisher] chest and proudly displaying [himher]self before you. <i>“Ready for the taking?”</i>", parse);
	}, 1.0, function() { return true; });
	scenes.AddEnc(function() {
		Text.Add("<i>“I’m ready… [master],”</i> the [foxvixen] says, kneeling before you.", parse);
	}, 1.0, function() { return true; });
	scenes.AddEnc(function() {
		Text.Add("<i>“Alright, I guess I’m ready,”</i> the [foxvixen] says, standing before you.", parse);
	}, 1.0, function() { return true; });
	
	scenes.Get();
	
	Text.NL();
	parse["malefemaleherm"] = Gender.Desc(terry.Gender());
	parse["nervousnessarousal"] = terry.Relation() < 30 ? "nervousness" : "arousal";
	Text.Add("You make a point of circling Terry, looking up and down and studying every inch of the [malefemaleherm]’s naked form. As [hisher] tail waves gently in [nervousnessarousal], it exposes a prominent “birthmark” on [hisher] butt cheek; though a large patch of pure white otherwise envelops [hisher] ass and the backs of [hisher] thighs, on the right cheek there is a large, love-heart-shaped patch of the rich golden color that adorns the rest of [hisher] body.", parse);
	Text.NL();
	
	if(terry.flags["BM"] == 0) {
		terry.flags["BM"] = 1;
		Text.Add("Motivated by curiosity, you reach out with your hand to touch it, gently trailing your fingers through the [foxvixen]’s soft fur and tracing the edge of the heart design on [hisher] lusciously shapely ass cheek. There’s no question that it’s real.", parse);
		Text.NL();
		Text.Add("The [foxvixen] thief gasps as you trace, ears flattening against [hisher] skull as [heshe] protests, <i>“D-don’t touch my birthmark!”</i>", parse);
		Text.NL();
		Text.Add("That’s some reaction! But what’s wrong with touching it?", parse);
		Text.NL();
		Text.Add("<i>“It’s embarrassing...”</i>", parse);
		Text.NL();
		Text.Add("Isn’t that just so cute...", parse);
		Text.Flush();
		
		//[Tease][Praise]
		var options = new Array();
		options.push({ nameStr : "Tease",
			func : function() {
				Text.Clear();
				Text.Add("Smirking, you cup the [foxvixen]’s ass cheek in one hand, kneading the soft flesh over the birthmark with slow, sensual caresses. Now, whyever should [heshe] be so embarrassed over it? After all, it’s not like it isn’t the most blatant beauty spot you’ve ever seen, just perfect for such a sweet, luscious butt... Why, it’s like a perfect target for anyone who wants to spank [himher], or fuck [hisher] ass...", parse);
				Text.NL();
				Text.Add("Terry shudders, [hisher] body temp spiking as [heshe] flushes with such deep embarrassment that you can see the crimson redness covering [hisher] cheeks. <i>“J-just stop teasing me and get to the point, you jerk!”</i>", parse);
				Text.NL();
				
				terry.relation.DecreaseStat(-100, 2);
				
				Gui.PrintDefaultOptions();
			}, enabled : true,
			tooltip : Text.Parse("Maybe you should tease [himher]? It’s clearly a sensitive spot and you could do with having some fun at the [foxvixen]’s expense.", parse)
		});
		options.push({ nameStr : "Praise",
			func : function() {
				Text.Clear();
				Text.Add("Shaking your head, you gently chide Terry for getting embarrassed; [heshe] has such a beautiful body, and [heshe] should be proud of it! And this mark, why, it’s simply so fitting for [himher] - surprisingly cute and delicate, but bold and flamboyant when seen. It emphasizes the lusciousness of [hisher] sweet ass wonderfully, drawing the eye in to appreciate it, inviting the onlooking to touch, to rub, to fondle...", parse);
				Text.NL();
				Text.Add("<i>“But it’s embarrassing!”</i> [heshe] protests. ", parse);
				if(terry.Gender() == Gender.male)
					Text.Add("<i>“I’m a boy dammit! But I have that girly tramp stamp permanently tattooed on my butt!”</i> [heshe] exclaims. ", parse);
				Text.Add("<i>“Can you imagine what it was like growing up on the streets? With that thing on my butt? I was bullied left and right because of it!”</i>", parse);
				Text.NL();
				Text.Add("Moving closer, you gently draw the [foxvixen] into your arms, folding them around [himher] in a soft, comforting embrace. Leaning closer to [hisher] vulpine ear, you tell [himher] that [heshe] has nothing to be ashamed of. [HeShe] is beautiful, and this - your hand moves to cover the vulpine morph’s birthmark, tenderly stroking the gold-on-white fur - this is just part of [hisher] beauty. They were idiots, teasing [himher] for what they didn’t understand. In fact, they were probably just jealous...", parse);
				Text.NL();
				Text.Add("<i>“You really think so?”</i>", parse);
				Text.NL();
				Text.Add("You assure [himher] that you know so.", parse);
				Text.NL();
				Text.Add("<i>“Thanks, [playername]. I guess… well, I guess you can touch it. Sometimes.”</i>", parse);
				Text.NL();
				
				terry.relation.IncreaseStat(100, 3);
				
				Gui.PrintDefaultOptions();
			}, enabled : true,
			tooltip : Text.Parse("That mark is pretty attractive. Terry should learn to appreciate [hisher] charms better.", parse)
		});
		Gui.SetButtonsFromList(options, false, null);
		return;
	}
	else {
		var scenes = new EncounterTable();
		
		scenes.AddEnc(function() {
			Text.Add("You thrust your tenting bulge against the golden heart, grinding your fabric clad erection against your [foxvixen]’s birthmark and letting [himher] feel your appreciation of it through your [botarmor].", parse);
			Text.NL();
			Text.Add("<i>“S-stop it! You perv!”</i> [heshe] exclaims, though [heshe] makes no move to step away from you.", parse);
		}, 1.0, function() { return player.FirstCock(); });
		scenes.AddEnc(function() {
			Text.Add("Feeling mischievous, you give Terry’s butt a sudden firm poke with your finger right in the middle of [hisher] love-heart birthmark.", parse);
			Text.NL();
			Text.Add("<i>“Eep!”</i> Terry rubs [hisher] butt right where you poked [himher]. <i>“Jerk...”</i> [heshe] pouts.", parse);
		}, 1.0, function() { return true; });
		scenes.AddEnc(function() {
			Text.Add("Your fingers reach out and gently trace the love-heart’s edging, starting from the point down at its bottom before curving up, around and then down again.", parse);
			Text.NL();
			Text.Add("Terry shudders in embarrassment as you do so. <i>“Okay, you’ve done your teasing, so let’s move on.”</i>", parse);
		}, 1.0, function() { return true; });
		scenes.AddEnc(function() {
			Text.Add("Grinning to yourself, you deliver a sudden appreciative slap to Terry’s ass right on [hisher] birthmark, watching as the [foxvixen]’s butt jiggles slightly in response to the impact.", parse);
			Text.NL();
			Text.Add("<i>“Ooh! H-hey, be gentle!”</i> [heshe] protests, rubbing where you slapped.", parse);
		}, 1.0, function() { return true; });
		
		scenes.Get();
	}
	Text.NL();
	Gui.PrintDefaultOptions();
}

TerryScenes.SexPromptChoice = function(backPrompt : any, haveadrink : boolean) {
	let terry = GAME().terry;
	let player = GAME().player;

	var parse : any = {
		playername : player.name,
		foxvixen : terry.mfPronoun("fox", "vixen"),
		master : player.mfTrue("master", "mistress")
	};
	parse = terry.ParserPronouns(parse);
	
	var cocksInAss = player.CocksThatFit(terry.Butt());
	
	var options = new Array();
	if(terry.FirstVag()) {
		var cocksInVag = player.CocksThatFit(terry.FirstVag());
		options.push({ nameStr : "Pitch vaginal",
			func : function() {
				TerryScenes.SexPitchVaginal(cocksInVag);
			}, enabled : cocksInVag.length > 0,
			tooltip : Text.Parse("You went to the trouble of growing Terry a vagina, so let’s go ahead and use it.", parse)
		});
	}
	options.push({ nameStr : "Pitch anal",
		func : function() {
			TerryScenes.SexPitchAnal(cocksInAss);
		}, enabled : cocksInAss.length > 0,
		tooltip : Text.Parse("Terry’s butt is so cute with that heart stamp. It paints a perfect target for your attentions...", parse)
	});
	if(terry.FirstCock()) {
		if(player.FirstVag()) {
			var tooltip = terry.HorseCock() ? "With that great big monster between [hisher] legs, you just know [heshe] can give you a ride to remember." : "It’s not size that matters, it’s skill. Let’s see just how well your pet [foxvixen] can use that cock of [hishers].";
			options.push({ nameStr : "Catch vaginal",
				func : function() {
					TerryScenes.SexCatchVaginal();
				}, enabled : true,
				tooltip : Text.Parse(tooltip, parse)
			});
		}
		var tooltip = terry.HorseCock() ? "You went through the trouble of giving Terry that big stallionhood of [hishers] for a reason." : "Why not let the [foxvixen] catch a break and let [himher] do you for a change of pace?";
		options.push({ nameStr : "Catch anal",
			func : function() {
				TerryScenes.SexCatchAnal();
			}, enabled : true,
			tooltip : Text.Parse(tooltip, parse)
		});
	}
	if(terry.HorseCock()) {
		options.push({ nameStr : "Worship Terry",
			func : function() {
				TerryScenes.SexWorship();
			}, enabled : true,
			tooltip : Text.Parse("Give your [foxvixen]’s mighty horsecock the love and attention that it deserves!", parse)
		});
	}
	options.push({ nameStr : "Get oral",
		func : function() {
			Text.Clear();
			if(terry.Relation() < 30) {
				Text.Add("<i>“I’m not sure I like the sound of that,”</i> [heshe] says warily.", parse);
				Text.NL();
				Text.Add("It’s just a little oral sex - nothing to be scared of. Or does [heshe] think [heshe] can’t handle something as simple as that, hmm?", parse);
				Text.NL();
				Text.Add("<i>“I can handle it just fine, but that doesn’t mean I have to like it,”</i> [heshe] replies indignantly.", parse);
				Text.NL();
				Text.Add("That’s... probably the best you’re going to get out of [himher]. Knowing you can simply order [himher] if [heshe] is too stubborn to obey, you consider what you want [himher] to do.", parse);
			}
			else if(terry.Relation() < 60) {
				Text.Add("<i>“Okay, sure. What do you have in mind?”</i>", parse);
			}
			else {
				Text.Add("<i>“Gee, [playername], that almost makes me think you don’t like to hear me speak,”</i> [heshe] replies, teasing. <i>“So, what kind of tasty treat are you gonna give me now?”</i>", parse);
				Text.NL();
				Text.Add("With a mischievous grin, you make a show of contemplating your answer.", parse);
			}
			
			var options = new Array();
			if(player.FirstCock()) {
				parse["cock"] = player.BiggestCock().Short();
				var tooltip = terry.Relation() < 60 ? "Terry can start by sucking your [cock]." : "Well, how about a fresh serving of warm, gooey cream?";
				options.push({ nameStr : "Cock",
					func : function() {
						Text.Clear();
						TerryScenes.SexGetOralCock();
					}, enabled : true,
					tooltip : Text.Parse(tooltip, parse)
				});
			}
			if(player.FirstVag()) {
				parse["vag"] = player.FirstVag().Short();
				var tooltip = terry.Relation() < 60 ? "Terry can start by licking your [vag]." : "Well, how about a nice dose of honey straight from your own pretty little flower?";
				options.push({ nameStr : "Pussy",
					func : function() {
						Text.Clear();
						TerryScenes.SexGetOralPussy();
					}, enabled : true,
					tooltip : Text.Parse(tooltip, parse)
				});
			}
			if(options.length > 1) {
				Text.Flush();
				Gui.SetButtonsFromList(options, false, null);
			}
			else {
				Text.NL();
				if(player.FirstCock())
					TerryScenes.SexGetOralCock();
				else
					TerryScenes.SexGetOralPussy();
			}
		}, enabled : true,
		tooltip : Text.Parse("Let’s put your little [foxvixen]’s clever tongue to work, shall we?", parse)
	});
	if(haveadrink) {
		options.push({ nameStr : "Have a drink",
			func : function() {
				TerryScenes.SexHaveADrink(backPrompt);
			}, enabled : true,
			tooltip : Text.Parse("You have such a tasty little [foxvixen] here. Why not whet your appetite a little with a taste test?", parse)
		});
	}
	/* //TODO
	options.push({ nameStr : "name",
		func : function() {
			Text.Clear();
			Text.Add("", parse);
			Text.NL();
			Text.Flush();
		}, enabled : true,
		tooltip : Text.Parse("", parse)
	});
	 */
	Gui.SetButtonsFromList(options, backPrompt, backPrompt);
}

TerryScenes.SexGetOralPussy = function() {
	let terry = GAME().terry;
	let player = GAME().player;

	var parse : any = {
		playername : player.name,
		foxvixen   : terry.mfPronoun("fox", "vixen"),
		master     : player.mfTrue("master", "mistress")
	};
	parse = terry.ParserPronouns(parse);
	parse = player.ParserTags(parse);
	parse = terry.ParserTags(parse, "t");
	parse = Text.ParserPlural(parse, player.NumCocks() > 1);
	parse = Text.ParserPlural(parse, player.NumCocks() > 2, "", "2");
	
	if(terry.Relation() < 30)
		Text.Add("Terry lets out a long-suffering sigh before replying with a grudging, <i>“Fiiiine.”</i>", parse);
	else if(terry.Relation() < 60) {
		Text.Add("<i>“Okay, try not to get too excited,”</i> [heshe] replies, teasing.", parse);
		Text.NL();
		Text.Add("You smirk and wave a finger, declaring you’ll make no such promise. Terry’s just too good at what [heshe] does.", parse);
	}
	else {
		Text.Add("<i>“You know I love my sweets,”</i> Terry replies, licking [hisher] lips.", parse);
		Text.NL();
		Text.Add("Oh, you do know. You’ve never seen a [foxvixen] with such a sweet tooth as your little Terry.", parse);
		Text.NL();
		parse["boyGirl"] = player.mfTrue("boy", "girl");
		Text.Add("<i>“Now, be a good [boyGirl] and spread ‘em for me.”</i>", parse);
	}
	Text.NL();
	Text.Add("You settle on the ground and ", parse);
	if(player.HasLegs())
		Text.Add("spread your [legs] to give Terry easy access to your [vag].", parse);
	else
		Text.Add("adjust your [legs] to ensure Terry can easily access your [vag].", parse);
	var c = "";
	if(player.FirstCock()) c += ", carefully moving your [cocks]";
	if(player.FirstCock() && player.HasBalls()) c += " and [balls]";
	if(player.FirstCock()) c += " out of the way";
	parse["c"] = Text.Parse(c, parse);
	
	Text.Add(" You spread your pussy lips with a pair of digits and beckon the [foxvixen] over with a crooked finger[c].", parse);
	Text.NL();
	
	var relslut = terry.Relation() + terry.Slut();
	
	if(relslut < 45)
		Text.Add("Terry swallows audibly as [heshe] watches your lewd display, but [heshe] doesn’t shy away. Instead, [heshe] approaches and kneels before you with some reluctance, extending a pair of fingers to gently massage your opened slit.", parse);
	else
		Text.Add("Terry smiles in excitement, licking [hisher] lips as [heshe] kneels before you and inhales your scent. [HeShe] looks like [heshe]’s about to lick you, but instead decides to gently tease your inner folds with a pair of fingers.", parse);
	Text.NL();
	Text.Add("With the very first touch, a spark of pleasure races under your skin and you let out a sharp hiss. Those dexterous fingers, trained for the delicate art of thievery, start to work their magic upon your [vag]. It’s as if your pussy were just another lock waiting to be picked.", parse);
	Text.NL();
	Text.Add("Terry’s touch is feather-light, almost too soft to feel at times, and yet [heshe] manages to leave ripples of pleasure in [hisher] wake. [HeShe] seeks out your sensitive spots without even trying, applying just the right amount of pressure to make you melt. Moisture begins to well within you, and droplets slowly seep out of your entrance as warmth flares through your [vag], making you melt in bliss.", parse);
	Text.NL();
	if(relslut < 45) {
		Text.Add("For all the pleasure that Terry’s fingers grant you, this isn’t what you asked of [himher]. It almost feels like [heshe]’s stalling, and a spark of irritation begins to grow within you. Impatiently, you ask when [heshe] intends to stop teasing and get to work.", parse);
		Text.NL();
		Text.Add("[HeShe] looks at you and sighs. <i>“Soon...”</i>", parse);
		Text.NL();
		Text.Add("Not ‘soon’. <i>Now</i>! And that’s an order.", parse);
		Text.NL();
		Text.Add("The [foxvixen] clicks [hisher] tongue, already feeling the collar tighten around [hisher] neck. <i>“F-fine!”</i>", parse);
	}
	else {
		if(terry.Relation() < 60)
			Text.Add("Satisfied with the results, the [foxvixen] withdraws, licking [hisher] fingers clean and leaning over to get closer to [hisher] target.", parse);
		else {
			Text.Add("<i>“Nice and wet,”</i> [heshe] notes, taking [hisher] fingers away and licking them clean of your juices. <i>“Hmm, delicious. ", parse);
			if(terry.FirstCock()) {
				Text.Add("You sure you just want me to lick you? Because I could totally get behind the idea of pulling my [tcock] out and fucking you right here, right now,”</i> [heshe] says, licking [hisher] lips.", parse);
				Text.NL();
				parse["vulpineEquine"] = terry.HorseCock() ? "equine" : "vulpine";
				Text.Add("Even from where you are, you can see the pillar of [vulpineEquine] flesh rising from Terry’s loins, fat droplets of pre-cum welling at its tip. With a smile and a shake of your head, you reply that as much as you may like [hisher] ", parse);
				if(terry.HorseCock())
					Text.Add("big, juicy", parse);
				else
					Text.Add("sweet, little", parse);
				Text.Add(" dick, if you wanted it, you’d have asked for it. Now, let’s see [himher] start licking!", parse);
				Text.NL();
				Text.Add("[HeShe] grins confidently. <i>“One of these days, I’m going to disobey you and just take what’s mine,”</i> [heshe] teases.", parse);
				Text.NL();
				Text.Add("With a laugh, you reply that you’ll believe that when you see it.", parse);
			}
			else {
				Text.Add("If I had a cock, I might just give up on licking you and fuck you instead,”</i> [heshe] says with a mischievous grin.", parse);
				Text.NL();
				Text.Add("Isn’t it a pity for [himher] then that you’re quite happy with [hisher] tongue?", parse);
				Text.NL();
				Text.Add("Terry shrugs, chuckling softly. <i>“Well, you never know. Maybe you’ll change your mind. Maybe you’ll make me grow a big cock to fuck you with?”</i>", parse);
				Text.NL();
				Text.Add("You chuckle at the thought, favoring [himher] with a ‘maybe’.", parse);
				Text.NL();
				Text.Add("<i>“'Course, I’m not picky. I could always settle for a strap-on too. Wouldn’t feel as good, but y’know it’s the thought that counts.”</i> [HeShe] chuckles.", parse);
				Text.NL();
				Text.Add("Right now, you’d settle for deed over thought. Let’s see that clever tongue of [hisher] already.", parse);
			}
		}
	}
	Text.NL();
	Text.Add("Without delay, Terry sets about licking your folds. [HeShe] dives straight for your insides, sometimes pulling away to give a wandering lick on your [clit].", parse);
	Text.NL();
	
	Sex.Cunnilingus(terry, player);
	terry.Fuck(null, 2);
	player.Fuck(null, 2);
	
	Text.Add("You moan, deep, loud and sharp as Terry’s tongue dances across your sensitive flesh. A quiver races through you, and your limbs tremble as pleasure dances like a shower of sparks in your brain.", parse);
	Text.NL();
	if(relslut < 45) {
		Text.Add("Beneath it all, a dim hint of surprise at how eager the once-shy [foxvixen] has become flashes a fin, only to be swept away in the tide of your feelings.", parse);
		Text.NL();
	}
	if(terry.Relation() >= 60 && player.FirstCock()) {
		Text.Add("Without warning, you feel Terry’s broad tongue leave your [vag] with a wet slurp. You wonder what [heshe]’s planning, when you suddenly feel [hisher] tongue on ", parse);
		if(player.HasBalls())
			Text.Add("your [balls]. Terry laps at you with glee, kissing and sucking on each of your nuts before moving to ", parse);
		Text.Add("[oneof] your [cocks]. [HeShe] licks the base and moves upward, tracing a stream of pre along the way, until [heshe] reaches your [cockTip].", parse);
		Text.NL();
		Text.Add("You groan in pleasure, and then laugh softly. That really does feel nice, but you asked [himher] to eat you out, not suck you off.", parse);
		Text.NL();
		Text.Add("<i>“Just making a little detour to get an appetizer. I’ll be right back where you want me, [master],”</i> [heshe] teases, giving your [cockTip] a kiss before moving back to your [vag].", parse);
		Text.NL();
	}
	Text.Add("You writhe and squirm, moaning in rapture as Terry lavishes all the care [hisher] vulpine tongue can give upon your sensitive petals. Warm wetness builds within as your juices flow freely, mixing with Terry’s saliva.", parse);
	Text.NL();
	Text.Add("Shivers race along your spine, your brain clouded by a fog of pleasure. A hot pressure wells within your belly, your body quivering as the sensation grows stronger. You’re close... oh, so close...", parse);
	Text.NL();
	
	var cum = player.OrgasmCum();
	
	Text.Add("A cry of pleasure rips its way out of your throat as the dam breaks within you. Juices sluice forth and splatter onto Terry’s muzzle, washing over [hisher] tongue in your orgasm.", parse);
	if(player.FirstCock())
		Text.Add(" Your [cocks] erupt[notS] in sympathy, firing ropes of seed over Terry’s head to spatter across [hisher] shoulders.", parse);
	Text.NL();
	if(relslut < 45)
		Text.Add("The [foxvixen] tries to move away, but you stop [himher] by grabbing [hisher] head and pulling it against your [vag], giving Terry two options: drink or drown.", parse);
	else
		Text.Add("Though initially surprised, Terry quickly moves closer to your quivering twat, hoping to drink as much of your juice as [heshe] can. As [heshe] does so, your hands instinctively hold onto [hisher] head, both for support and to ensure [heshe] can make the most of your spilling juices.", parse);
	Text.NL();
	Text.Add("Having lost yourself to bliss, you don’t know how much time passes. But, inevitably, your climax ends and leaves behind only a warm fuzzy feeling. With a luxuriating sigh, you settle yourself back to bask in the afterglow. As an afterthought, you lazily release the [foxvixen], whose face is still buried in your cunt.", parse);
	Text.NL();
	Text.Add("The [foxvixen] coughs, trying [hisher] best to catch [hisher] breath.", parse);
	Text.NL();
	if(terry.Relation() < 30) {
		Text.Add("<i>“There. Happy now?”</i> [heshe] asks, feigning nonchalance.", parse);
		Text.NL();
		Text.Add("Very much so. Terry is a wonderful little muffdiver; you just knew [heshe] had it in [himher].", parse);
	}
	else if(terry.Relation() < 60) {
		Text.Add("<i>“Pretty tasty, but I’d appreciate it if you didn’t try to suffocate me with your muff next time,”</i> [heshe] teases.", parse);
		Text.NL();
		Text.Add("You’re sorry, but [heshe] just does too good a job. You want to make sure [heshe] gets everything [heshe] teased out of you.", parse);
	}
	else {
		Text.Add("<i>“It’s always a thrill with you isn’t it, [playername]? I love your pussy, but someday I know you’re going to hold on too long and smother me with your cunt. Though I suppose there’s worse ways to go,”</i> Terry teases, chuckling at the idea.", parse);
		Text.NL();
		Text.Add("Well, you have no intention of letting [himher] go that way anytime soon. What would you do without your favorite pussy-licker?", parse);
		Text.NL();
		Text.Add("<i>“What indeed, ya huge perv!”</i>", parse);
	}
	Text.Flush();
	
	terry.AddLustFraction(0.4);
	
	TimeStep({minute: 30});
	
	if(relslut < 45)
		terry.relation.DecreaseStat(0, 1);
	else if(terry.Relation() >= 30)
		terry.relation.IncreaseStat(50, 1);
	
	TerryScenes.Prompt();
}

TerryScenes.SexGetOralCock = function() {
	let terry = GAME().terry;
	let player = GAME().player;

	var p1cock = player.BiggestCock();
	
	var parse : any = {
		playername : player.name,
		foxvixen   : terry.mfPronoun("fox", "vixen"),
		boygirl    : terry.mfPronoun("boy", "girl"),
		master     : player.mfTrue("master", "mistress")
	};
	parse = terry.ParserPronouns(parse);
	parse = player.ParserTags(parse);
	parse = terry.ParserTags(parse, "t");
	parse = Text.ParserPlural(parse, player.NumCocks() > 1);
	parse = Text.ParserPlural(parse, player.NumCocks() > 2, "", "2");
	
	var relslut = terry.Relation() + terry.Slut();
	
	if(relslut < 45) {
		Text.Add("Terry clicks [hisher] tongue, looking disgusted at what you’ve asked of [himher].", parse);
		Text.NL();
		Text.Add("You remind [himher] that you’re giving [himher] a chance to say yes. [HeShe] <i>doesn’t</i> want you to make it an order, now does [heshe]?", parse);
		Text.NL();
		Text.Add("<i>“Alright, alright, I’ll do it.”</i> [HeShe] sighs. <i>“No need to be pushy… Well, show me what I’m working with.”</i>", parse);
	}
	else {
		if(terry.Relation() < 60)
			Text.Add("<i>“Okay, get comfy then,”</i> [heshe] says.", parse);
		else {
			Text.Add("<i>“Throwing me a bone, huh? I should’ve expected,”</i> [heshe] says with a chuckle.", parse);
			Text.NL();
			Text.Add("Well, you know how much Terry just <i>loves</i> sucking all the juicy marrow out of a nice big bone...", parse);
			Text.NL();
			Text.Add("<i>“I also like gnawing a fair bit,”</i> [heshe] jokes. <i>“Although, maybe I’ll make an exception for you, but just because I really like you.”</i>", parse);
			Text.NL();
			Text.Add("How fortunate.", parse);
		}
	}
	Text.NL();
	if(player.NumCocks() > 1) {
		Text.Add("You certainly are spoiled for choices here. Which of your cocks do you want Terry to suck?", parse);
		Text.Flush();
		
		//[name]
		var options = new Array();
		
		var cockFunc = function(c : Cock, idx : number) {
			options.push({ nameStr : Text.Ordinal(idx+1, true),
				func : function() {
					Text.Clear();
					Text.Add("Mind made up, you reach down to caress the lucky love-meat, calling Terry over to suck your chosen cock.", parse);
					Text.NL();
					TerryScenes.SexGetOralCockCont(parse, c);
				}, enabled : true,
				tooltip : Text.Parse("Your [c].", {c: c.Long()})
			});
		};
		
		_.each(player.AllCocks(), function(c, key : number) {
			cockFunc(c, key);
		});
		
		Gui.SetButtonsFromList(options, false, null);
	}
	else {
		Text.Add("Reaching down, you stroke your [cock], running your fingers demurely along its shaft before calling Terry over to get started.", parse);
		Text.NL();
		TerryScenes.SexGetOralCockCont(parse, p1cock);
	}
}

TerryScenes.SexGetOralCockCont = function(parse : any, p1cock : Cock) {
	let terry = GAME().terry;
	let player = GAME().player;

	var isLarge = p1cock.Volume() >= 100;
	
	if(!isLarge) {
		if(terry.Relation() < 60)
			Text.Add("<i>“That should be no problem,”</i> the [foxvixen] says, kneeling before you.", parse);
		else
			Text.Add("<i>“Cute. Let’s begin then,”</i> the [foxvixen] says, kneeling before you.", parse);
		Text.NL();
		parse["b"] = player.HasBalls() ? Text.Parse(", while [hisher] other hand busies itself with your [balls], rolling the spheres in [hisher] grasp.", parse) : "";
		Text.Add("Terry starts by gently grabbing your [cockTip], stroking it with a pair of fingers[b]", parse);
		Text.NL();
		Text.Add("You moan appreciatively, feeling your [cock] twitch under Terry’s stroking hands. You can’t help but reach down and pet [hisher] head with a compliment.", parse);
		Text.NL();
		if(terry.Relation() < 30)
			Text.Add("Though [heshe] seems to ignore your praise, [heshe] does speed up on [hisher] ministrations.", parse);
		else
			Text.Add("Terry looks up at you with a smile, before returning to his task with renewed vigor.", parse);
		Text.NL();
		Text.Add("Feeling the friction of Terry’s loving ministrations makes your member drool pre-cum in anticipation, wringing a soft coo from your throat. Your eyes sink closed, savoring the feeling, opening them only when you feel the [foxvixen] releasing you.", parse);
		Text.NL();
		Text.Add("Looking down, you see Terry bend in closer. [HisHer] little nose twitches adorably as [heshe] takes in your scent, inhaling the fumes of your growing musk.", parse);
		Text.NL();
		if(terry.Slut() < 45) {
			Text.Add("Your pet [foxvixen] looks a bit hesitant at first, but [heshe] quickly composes [himher]self and begins taking your cock in, inch after inch, careful not to let [hisher] sharp teeth touch your sensitive [cock]. [HeShe] takes you as far as [heshe] can, fighting [hisher] gag reflex to take you to the hilt.", parse);
			Text.NL();
			Text.Add("With a deep, luxuriant groan, you praise Terry for [hisher] skill; [heshe]’s got a real knack for this.", parse);
		}
		else {
			Text.Add("The [foxvixen] licks [hisher] lips. You can see the anticipation in [hisher] eyes as [heshe] opens [hisher] mouth and lets [hisher] tongue roll out like a red carpet, ready to receive your [cock]. Though [heshe] starts slow, as soon as your [cockTip] moves past [hisher] lips, [heshe] adjusts [himher]self and takes your whole shaft in with a single thrust.", parse);
			Text.NL();
			Text.Add("That’s your little [foxvixen] alright; even [hisher] gag reflex works for you rather than against you. [HisHer] throat pulses around you, wringing your [cock] with deliciously tight wetness as opposed to pushing back.", parse);
			Text.NL();
			Text.Add("You ruffle Terry’s ears affectionately, singing [hisher] praises. All [hisher] hard training has paid off wonderfully.", parse);
		}
	}
	else {
		if(terry.Relation() < 60) {
			Text.Add("<i>“W-wha! You want me to handle that!”</i> the [foxvixen] exclaims pointing at your [cock].", parse);
			Text.NL();
			Text.Add("Yes, you do. Is there a problem?", parse);
			Text.NL();
			Text.Add("<i>“That’s… no. No problem...”</i> [heshe] trails off.", parse);
			Text.NL();
			Text.Add("Good; that’s what you wanted to hear.", parse);
		}
		else {
			Text.Add("<i>“Wow, talk about a treat!”</i> the [foxvixen] says, grabbing your [cock] and testing its weight. <i>“Big, fat and juicy. Oh, you shouldn’t have, [playername].”</i>", parse);
			Text.NL();
			Text.Add("You just couldn’t resist spoiling your favorite [foxvixen].", parse);
			Text.NL();
			Text.Add("<i>“To be honest, this might be more than I can chew. But I’m willing to give it a try, just for you.”</i>", parse);
			Text.NL();
			Text.Add("That’s all you could ever hope for.", parse);
		}
		Text.NL();
		Text.Add("Terry starts by stroking your [cockTip] with a hand, while the other massages your shaft. [HisHer] trained motions and feather-light touch attest to [hisher] skill as a thief.", parse);
		Text.NL();
		Text.Add("Your eyes flutter shut and you moan, deep and low in longing. Terry truly has such <i>wonderful</i> hands.", parse);
		Text.NL();
		Text.Add("[HeShe] gathers some of your pre-cum and lathers it along your shaft. The fur on [hisher] cheek tickles your [cock] slightly as [heshe] bumps against its [cockTip] with a particularly long stroke.", parse);
		Text.NL();
		Text.Add("A knot of impatience starts to form in your belly, but you keep your mouth closed, not wanting to break [hisher] concentration.", parse);
		Text.NL();
		Text.Add("Once [heshe] deems you ready, [heshe] lets out [hisher] tongue, gently lapping along the underside of your shaft all the way from base to tip. During one last lick, [heshe] opens [hisher] mouth and begins taking you inside [hisher] maw.", parse);
		Text.NL();
		Text.Add("Now, that’s what you were waiting for. Warm wetness creeps slowly over your sensitive flesh, even as tingles race along your spine. ", parse);
		if(terry.Slut() < 45)
			Text.Add("The inexperienced [foxvixen] chokes as your sizable [cock] triggers [hisher] gag reflex. Still, [heshe] shoulders on, taking you down inch by painstaking inch. [HisHer] throat stretches like a tight cocksleeve around your member as [heshe] takes you as deep as [heshe] can.", parse);
		else {
			Text.Add("The [foxvixen] stops swallowing when your [cockTip] touches the back of [hisher] throat. Even with all [hisher] experience, your sheer size is a little too much to handle.", parse);
			Text.NL();
			Text.Add("Terry takes it slow, first letting [hisher] throat slowly stretch as [heshe] presses on. Once [heshe] manages the first few inches, the [foxvixen] resumes gulping your [cock] with renewed confidence.", parse);
		}
	}
	Text.NL();
	
	Sex.Blowjob(terry, player);
	terry.FuckOral(terry.Mouth(), p1cock, 2);
	player.Fuck(p1cock, 2);
	
	Text.Add("As soon as Terry’s throat has adjusted to your girth, [heshe] begins moving; bobbing [hisher] head at a brisk pace as [heshe] works [hisher] tongue on the underside of your [cock].", parse);
	Text.NL();
	if(terry.Slut() < 30) {
		Text.Add("Terry isn’t exactly what you’d call a <i>skilled</i> cocksucker. [HeShe]’s not doing a great job of blowing you, but [heshe] does have enthusiasm.", parse);
		if(terry.Relation() < 30)
			Text.Add(" It’s kind of surprising considering [heshe] was so reluctant earlier.", parse);
		Text.NL();
		Text.Add("You pet [hisher] head and help [himher] with shallow thrusts, just enough to let you inch closer to the inevitable edge of your climax.", parse);
	}
	else {
		Text.Add("Terry’s enthusiasm is mirrored only by [hisher] skill. Slow, expert licks and deep suckles, matched to whorish moans of delight. As far as this little [foxvixen] is concerned, your dick is the world’s sweetest lollipop, and [heshe] just can’t get enough of it.", parse);
		Text.NL();
		Text.Add("Shivers race along your spine, and you fight the urge to just let yourself blow right here and now. You find yourself unconsciously bucking your hips, the [foxvixen]‘s muzzle feels so good that you just can’t resist it - ", parse);
		parse["l"] = terry.Relation() >= 60 ? " loving" : "";
		if(player.SubDom() < 0)
			Text.Add("it’s as if you were losing control, dancing to [hisher] tune. A feeling that you relish in. Right now, you’re Terry’s instrument, and [heshe]’s playing you like a master.", parse);
		else
			Text.Add("at least this helps you regain a little bit of control. It’s hard for you to admit it, but right now Terry is playing you like a master plays a fine-tuned instrument. Still, [heshe]’ll always be your[l] pet; at least for as long as [heshe]’s wearing that collar.", parse);
	}
	Text.NL();
	Text.Add("The sound of Terry’s efforts fill the air, wet slurps and grunts interspersed with moans. [HeShe] pops free of your [cock] and rolls the perverse mix of your juices around on [hisher] tongue. The cool air makes your flesh tingle and shudder ripples across your skin, then [heshe] swallows [hisher] mouthful and gobbles you down again.", parse);
	Text.NL();
	Text.Add("The pleasure mounts inside you, deeper and stronger with each heartbeat. ", parse);
	if(player.HasBalls())
		Text.Add("You can feel your [balls] churn, preparing for your orgasm,", parse);
	else
		Text.Add("You feel an ache growing inside you, a pulsing that becomes increasingly urgent,", parse);
	Text.Add(" and you know that you can’t hold out much longer. If you’ve got something special in mind for a finisher, now’s the time to make your choice...", parse);
	Text.Flush();
	
	//[Inside Mouth][Paint [HimHer]]
	var options = new Array();
	options.push({ nameStr : "Inside Mouth",
		func : function() {
			Text.Clear();
			Text.Add("Your hands reach out and grab Terry’s head, eliciting a muffled grunt of surprise from the [foxvixen]. You pump yourself into [hisher] muzzle, facefucking Terry as your climax grows ever nearer.", parse);
			Text.NL();
			parse["c"] = player.NumCocks() > 1 ? Text.Parse(", your other neglected cock[s2] erupting in sympathetic climax", parse) : "";
			Text.Add("Something inside of you breaks, and in a powerful thrust you push your [cock] as far down Terry’s throat as you can reach. Back arched and head flung back, you cry out as you explode inside of Terry’s gullet[c].", parse);
			Text.NL();
			
			var cum = player.OrgasmCum();
			
			var clean = false;
			
			if(cum < 3) {
				parse["b"] = player.HasBalls() ? Text.Parse("r [balls]", parse) : "";
				Text.Add("You do your best to paint Terry's gullet white with your seed. Shot after shot swirls down [hisher] throat to splash into [hisher] belly before you[b] finally run dry. Feeling the last spurt welling up within you, you draw your cock back until only the very tip of it remains within the [foxvixen]'s mouth, allowing this final splurt to spatter over [hisher] tongue.", parse);
				Text.NL();
				if(terry.Slut() < 15) {
					Text.Add("Terry coughs, clearly not used to drinking cum. <i>“Ugh. There, satisfied now?”</i> [heshe] asks, sputtering a bit more.", parse);
					Text.NL();
					Text.Add("Quite satisfied. [HeShe]’s got a lot of promise as a cock-sucker. You’re going to enjoy helping [himher] reach [hisher] full potential...", parse);
				}
				else if(terry.Relation() < 60) {
					Text.Add("Terry has no problems dealing with your load, [heshe] gulps everything down, then sighs when you finally pull out.", parse);
					Text.NL();
					Text.Add("Smiling, you congratulate [himher] on [hisher] efforts. You think [heshe] enjoyed that almost as much as you did.", parse);
				}
				else {
					Text.Add("Terry swallows your entire load, and when you pull out, [heshe] eagerly moves to lick you clean. <i>“Hmm, such a tasty cock. Feeling better now?”</i>", parse);
					Text.NL();
					Text.Add("<i>Much</i> better, you assure [himher]. It’s always such a treat to put [hisher] wonderful little mouth to work. Knowing [heshe] enjoys it too helps a lot, of course.", parse);
					Text.NL();
					Text.Add("<i>“Anytime, [playername],”</i> Terry smiles.", parse);
				}
			}
			else if(cum < 6) {
				Text.Add("A veritable river of semen pours from your [cock] down Terry’s throat. Thick white waves of cum that wash into [hisher] belly as inexorably as the tide.", parse);
				if(player.NumCocks() > 1) {
					if(player.NumCocks() == 2)
						Text.Add(" Your neglected [cock] pours forth its own load, drenching Terry’s front in excess sperm even as [hisher] belly fills to the brim with the other torrent.", parse);
					else
						Text.Add(" Neglected as they have been, your other [cocks] still try to get in on the fun, doing their best to paint Terry’s fur as white as newly fallen snow. Thick ropes fling themselves over Terry’s front, arms and legs, caking [himher] in your goo.", parse);
					Text.NL();
					
					clean = true;
				}
				Text.NL();
				if(terry.Slut() < 30) {
					Text.Add("Though [heshe] tries [hisher] best, Terry is unable to keep up with your torrential flow. [HeShe] pulls away, coughing and sputtering as you finish all over [hisher] head.", parse);
					Text.NL();
					Text.Add("Once the last splurt has finished drooling down Terry’s nose, you give [himher] an apologetic smile. [HeShe] did very well for someone with so little experience; with a little more practice, you’re sure [heshe] could take it all.", parse);
					clean = true;
				}
				else if(terry.Relation() < 60) {
					Text.Add("Your pet [foxvixen] has no trouble keeping up with your prodigious ejaculation. [HeShe] gulps it down almost as fast as you can pump it out, however a bit does leak out of the sides of [hisher] muzzle.", parse);
					Text.NL();
					Text.Add("Even through your orgasmic haze, you still feel pride in Terry’s achievement. [HeShe]’s come a long way from the relatively innocent [foxvixen] [heshe] was when you first took [himher] under your proverbial wing.", parse);
					Text.NL();
					Text.Add("With a final shudder, a last squirt of seed squeezes out your cock and into Terry’s mouth. But it seems the [foxvixen] has met [hisher] match; when you withdraw your [cock], the semen drools out of [hisher] open mouth and dribbles onto the ground.", parse);
				}
				else {
					Text.Add("Looking down, your eyes meet Terry’s. [HeShe]’s smiling as well as [heshe] can with your cock jammed all the way down [hisher] throat. Rather than fighting to gulp down your load, [heshe] resolves to simply hold [hisher] throat open and let your [cock] pour your seed straight down [hisher] gullet.", parse);
					Text.NL();
					Text.Add("Clever, clever [boygirl]...", parse);
					Text.NL();
					Text.Add("Without any need to hold back, you give yourself over to your climax, doing your best to fill Terry as full as [heshe] can possibly get. But the game little [foxvixen] is a match for you; even as [hisher] belly bulges out, [heshe] continues to gulp and swallow. When you finally finish and withdraw, [cockTip] smeared with drool and seed, Terry’s gut has grown visibly rounder, and almost sloshes as [heshe] moves.", parse);
				}
			}
			else { // High cum amount
				Text.Add("When your [cock] explodes, it’s a wonder the force doesn’t pop it clean out of Terry’s mouth. An eruption of cum, fit for a geyser, pounds its way down [hisher] throat with relentless force.", parse);
				if(player.NumCocks() > 1) {
					if(player.NumCocks() == 2)
						Text.Add(" Not to be outdone, your other [cock] joins the party. It hoses Terry down with great enthusiasm, and ensures [heshe] is completely soaked [himher] in semen both inside and out.", parse);
					else
						Text.Add(" With all of your [cocks] firing in unison, Terry is promptly drenched inside and out. Waves of semen splatter over [hisher] pelt, even as more floods [hisher] stomach.", parse);
					clean = true;
				}
				Text.NL();
				if(terry.Slut() < 60) {
					parse["rel"] = terry.Slut() >= 40 ? Text.Parse(" - as skilled as [heshe] is -", parse) : "";
					Text.Add("With how full you were, it’s no surprise when Terry[rel] doesn’t manage to keep up. The very first jet is enough to make the [foxvixen] gurgle and pull away from your [cock] hacking and coughing after nearly drowning in spunk.", parse);
					Text.NL();
					Text.Add("You’re sympathetic, really, you are. But you’re also in mid-stream and so you can’t exactly stop it. Consequently, the best Terry can do is try and keep [hisher] nose down to avoid drowning as you give [himher] a complete soaking.", parse);
					Text.NL();
					Text.Add("By the time your thunderous orgasm has finally drooled its last, Terry is sopping wet, drenched in semen to the point [heshe] is pure white from snout to tail. Not to mention standing nearly ankle deep in a puddle of cum.", parse);
					
					clean = true;
				}
				else if(terry.Relation() < 60) {
					Text.Add("Despite your enormous load, Terry manages to keep up fairly well. Sure, some streamers do escape the side of [hisher] muzzle, but the rate with which [heshe]’s gulping down your sperm is nothing short of impressive.", parse);
					Text.NL();
					Text.Add("It’s a fascinating sight. Even if you didn’t have more to give [himher], you’d want to keep feeding [himher] more just to see how well [heshe] can take it.", parse);
					Text.NL();
					Text.Add("The [foxvixen]’s belly begins to swell, piling on inch after inch of liquid weight as you keep on climaxing. By the time you finally finish, Terry looks like [heshe] swallowed a watermelon whole. You can hear it gurgle in protest and as you withdraw, Terry hiccups wetly, sending a small trickle of cum seeping out of the side of [hisher] mouth.", parse);
				}
				else {
					Text.Add("Terry’s brows are furrowed in concentration as [heshe] forces your [cockTip] down [hisher] gullet to take as much of your seed in as [heshe] can. [HisHer] throat moves as if it was an extension of your shaft, moving and milking away alongside the bulges of pent up seed that you pump down.", parse);
					Text.NL();
					Text.Add("That’s your brave, clever [boygirl]. Excitedly, you exhort [himher] to take it all, that you know [heshe] can handle everything you have to give. Stirred by your words, Terry manages to take you even deeper, ensuring that not so much as a drop escapes its cascade toward [hisher] stomach.", parse);
					Text.NL();
					Text.Add("It’s a good thing that [heshe] undressed first because you know [hisher] belly would tear [hisher] shirt clean open with how fast it swells. You find yourself wondering just how much [heshe] can take, but fortunately it seems you’re within [hisher] limits.", parse);
					Text.NL();
					Text.Add("With a final groan of pleasure, you empty yourself of one last spurt, and then slowly pull yourself free, the [foxvixen]’s distended gut visibly sloshes as it splashes home. Terry rubs [hisher] belly tenderly with one paw in an effort to calm its obvious protests.", parse);
				}
			}
			
			terry.AddLustFraction(0.3);
			
			var relslut = terry.Relation() + terry.Slut();
			if(relslut < 45)
				terry.relation.DecreaseStat(0, 1);
			else if(terry.Relation() >= 30)
				terry.relation.IncreaseStat(45, 1);
			Text.NL();
			
			TimeStep({hour: 1});
			
			if(clean) {
				Text.Flush();
				TerryScenes.PCCleansTerry();
			}
			else if(terry.Relation() < 30) {
				Text.Add("<i>“I need to wash my mouth,”</i> the [foxvixen] hurriedly says, darting off before you can say anything.", parse);
				Text.NL();
				Text.Add("That’s... well, that’s honestly kind of what you expected to hear. [HeShe]’ll get used to it in time.", parse);
				Text.Flush();
				
				Gui.NextPrompt();
			}
			else if(terry.Relation() < 60) {
				Text.Add("The [foxvixen] takes a deep breath. <i>“Phew! I dunno about you, [playername], but I sure could use some rest right now.”</i>", parse);
				Text.NL();
				Text.Add("[HeShe] can go ahead and take one, then; [heshe] really put in some hard work getting you off. You’re very happy with [hisher] efforts.", parse);
				Text.NL();
				Text.Add("<i>“Thanks!”</i> [heshe] says, lying down for a short nap.", parse);
				Text.Flush();
				
				Gui.NextPrompt();
			}
			else {
				Text.Add("<i>“Thanks for the meal!”</i> Terry grins, licking [hisher] chops and wagging [hisher] tail happily.", parse);
				Text.NL();
				Text.Add("With a chuckle, you assure [himher] that you’re happy [heshe] liked it so much. It’s truly a pleasure to provide, ah, ‘good food’ for someone who appreciates eating it. Or drinking it, in this case.", parse);
				Text.NL();
				Text.Add("<i>“Hmm, a nap would be great right now. How about it, [playername]? Join me for a lazy snuggle?”</i>", parse);
				Text.NL();
				Text.Add("How could you possibly refuse an offer like that after all [heshe] just did for you? You draw Terry to you and throw an arm around [himher]. Vulpine lover held close, you find the comfiest-looking spot around and carefully lower the both of you to the ground.", parse);
				Text.NL();
				Text.Add("Terry wriggles closer to you, and you fold your arms around [himher], letting [himher] snuggle up to you as tightly as possible.", parse);
				Text.NL();
				Text.Add("<i>“That’s good… and keep those [hand]s to yourself, ya perv!”</i>", parse);
				Text.NL();
				Text.Add("As if that’s not part of the reason [heshe] loves you...", parse);
				Text.Flush();
				
				Gui.NextPrompt();
			}
		}, enabled : true,
		tooltip : Text.Parse("Where else are you going to put it? Fill that [foxvixen]’s belly with hot seed!", parse)
	});
	options.push({ nameStr : Text.Parse("Paint [HimHer]", parse),
		func : function() {
			Text.Clear();
			Text.Add("You bite your lip in concentration, waiting as Terry continues [hisher] ministrations. The pressure inside of you grows steadily. Your body trembles as it reaches its bursting point. For a heartbeat, you wonder if you’ll be able to stick to your plan.", parse);
			Text.NL();
			parse["c"] = player.NumCocks() > 1 ? Text.Parse(", your neglected cock[s2] joining in to form a veritable barrage of jism", parse) : "";
			Text.Add("At that, you make your move. As Terry glides back along your [cock], you grab [hisher] shoulders and push [himher] off your throbbing cock. The cold air on your hot, wet flesh is the last straw, and a shudder wracks your body as you climax. Your [cock] launches its hot, steaming load squarely at the [foxvixen]’s face[c].", parse);
			Text.NL();
			
			var cum = player.OrgasmCum();
			
			if(cum < 3) {
				if(player.NumCocks() > 1)
					Text.Add("Your [cocks] work in unison, launching a volley of semen shots on the helpless [foxvixen]. Thick globs of cream spatter across [hisher] defenseless form; they cake [hisher] hair and smear on [hisher] lips. The lewd gobbets burst on [hisher] [tbreasts] and [tbelly], even going so far as to splash against [hisher] own loins.", parse);
				else
					Text.Add("Glistening ropes of semen fling themselves about Terry’s face with merry abandon, veiling [himher] in a perverse web of sparkling strands. It streaks over [hisher] hair, paints across [hisher] cheeks and spatters upon [hisher] nose, dripping down [hisher] neck.", parse);
			}
			else if(cum < 6) {
				parse["bothAll"] = player.NumCocks() == 2 ? "both" : "all";
				if(player.NumCocks() > 1)
					Text.Add("With [bothAll] your [cocks] firing in unison, Terry gets a true soaking. In [hisher] hair, on [hisher] face, over [hisher] belly, across [hisher] arms... your cream goes absolutely <b>everywhere</b>. By the time that you finally stop, Terry is a cummy white shade from head to tail with little drops of love-goo dripping onto the ground beneath [himher].", parse);
				else
					Text.Add("Terry’s face cops the full force of your [cock]’s perverse blast, a geyser of sperm that rockets forth and envelops [hisher] head. The [foxvixen]’s cheeks and brow go cream-white, the red of [hisher] hair disappears under a thick layer of seed, and not an inch in general goes untouched. Thick rivers of semen are pouring like lewd little waterfalls down [hisher] [tbreasts] by the time you finally finish.", parse);
			}
			else {
				if(player.NumCocks() > 1)
					Text.Add("Utter saturation. That’s the only term that could possibly describe what you do to Terry. Sperm flies forth in a torrent so intense, you actually lose sight of Terry beneath it for a moment. All you can do is hang on and hope you don’t wash [himher] away in a river of cum. When your titanic orgasm finally ends, Terry looks more like someone tried to make a vulpine sculpture out of half-set semen than a morph, standing ankle deep in more of the same.", parse);
				else
					Text.Add("Like a portal to some perverse ocean, your [cock] vomits forth a tidal wave of semen, drenching Terry utterly from head to toe, and then blasting forth even more cream. By the time you finish, [heshe] has been well and truly hosed. You can’t even tell what color [heshe] originally was beneath the thick, dripping layers of cum wrapped around [hisher] frame.", parse);
			}
			Text.NL();
			
			TimeStep({hour: 1});
			
			if(terry.Relation() < 30) {
				Text.Add("Terry glares at you, clearly not pleased with how you chose to end this. <i>“Are we done here?”</i> [heshe] asks, voice practically dripping venom.", parse);
				Text.NL();
				Text.Add("Yes, you’re done.", parse);
				Text.NL();
				Text.Add("<i>“Right, so if you’ll excuse I’m going to wash myself and get your taste out of my mouth,”</i> [heshe] says, darting off before you have a chance to reply.", parse);
				Text.Flush();
				
				terry.relation.DecreaseStat(-10, 1);
				
				Gui.NextPrompt();
				return; // End scene
			}
			
			if(terry.Relation() < 60) {
				Text.Add("Terry looks at you in disdain. <i>“Was it really necessary to do this?”</i>", parse);
				Text.NL();
				Text.Add("Well... maybe not <i>necessary</i>, you’ll admit, but it was kind of fun.", parse);
				Text.NL();
				if(terry.Slut() < 45) {
					Text.Add("<i>“You got cum all over my hair!”</i>", parse);
					Text.NL();
					if(cum < 3)
						Text.Add("Well, [heshe]’s right about that...", parse);
					else
						Text.Add("Looking at [himher], it looks like you got cum everywhere, really...", parse);
					Text.Add("But [heshe]’s right. You did put it there. It’s only fair you offer to help [himher] clean off.", parse);
					Text.NL();
					Text.Add("<i>“Yes, please do.”</i>", parse);
					
					terry.slut.IncreaseStat(45, 1);
				}
				else {
					Text.Add("<i>“Okay, I won’t deny it was fun, and I do enjoy a good cumbath every now and then - they say it’s good for the fur - but I was kinda looking forward to tasting you...”</i>", parse);
					Text.NL();
					Text.Add("You’re sorry... would it make up for it if you offered to help [himher] clean off?", parse);
					Text.NL();
					Text.Add("<i>“Well, okay. I’ll forgive you if you help me clean up.”</i> [HeShe] smiles, wagging [hisher] tail.", parse);
				}
			}
			else {
				Text.Add("<i>“[playername]! You asshole!”</i> Terry exclaims, wiping some of your seed from [hisher] eyes.", parse);
				Text.NL();
				Text.Add("You grin mischievously and ask [himher] if something’s the matter? You thought [heshe] would appreciate a bath.", parse);
				Text.NL();
				if(terry.Slut() < 45) {
					parse["mistermiss"] = player.mfTrue("mister", "miss");
					Text.Add("<i>“Not a cumbath, you jerk,”</i> [heshe] replies huffing indignantly. <i>“You got all my fur dirty, so let’s hear how do you intend to make up for this, [mistermiss].”</i>", parse);
					Text.NL();
					Text.Add("Well, with [hisher] permission, you want to clean [himher] off personally. You promise you'll polish [himher] until [heshe] sparkles like the radiant jewl [heshe] is. Please, will [heshe] forgive you if you do that?", parse);
					Text.NL();
					Text.Add("<i>“...It’s a start, but you’ll have to do much more if you want to get back on my good side.”</i> [HeShe] smirks, wagging [hisher] tail.", parse);
					Text.NL();
					Text.Add("Of course, but first things first. Now, how to clean your [foxvixen]...", parse);
					terry.slut.IncreaseStat(45, 1);
				}
				else {
					Text.Add("<i>“Of course you would think that. You’re just an incorrigible perv! But turns out that <b>this</b> time, I was actually looking forward to getting my snack.”</i>", parse);
					Text.NL();
					Text.Add("Oh dear...", parse);
					Text.NL();
					Text.Add("Apologetically, you assure Terry that you really didn’t know [heshe] wanted your cum, promising that you’d have given [himher] a feast if you had.", parse);
					Text.NL();
					Text.Add("<i>“Feigning ignorance won’t save your ass, doofus. So how do intend to pay me back for all this?”</i> [heshe] says, motioning to [himher]self.", parse);
					Text.NL();
					Text.Add("Hmm... would [heshe] accept a personal grooming to get all of the cum out of [hisher] fur? You promise to make sure that not a drop remains when you’re done.", parse);
					Text.NL();
					Text.Add("<i>“Aaaand?”</i>", parse);
					Text.NL();
					parse["gen"] = terry.mfPronoun("handsome prince", "pretty little princess");
					Text.Add("How about a nice, long cuddle to make [himher] feel like the [gen] [heshe] is, hmm?", parse);
					Text.NL();
					Text.Add("<i>“And? What else?”</i>", parse);
					Text.NL();
					Text.Add("Greedy little thing, isn't [heshe]? But you keep that observation to yourself. Instead, you promise you’ll see about giving [himher] that tasty treat [heshe] wanted so badly.", parse);
					Text.NL();
					Text.Add("<i>“Good, and what else?”</i>", parse);
					Text.NL();
					Text.Add("...Doesn’t [heshe] think that [heshe]’s asking for too much now?", parse);
					Text.NL();
					parse["sirmadam"] = player.mfTrue("sir", "madam");
					Text.Add("Terry grins mischievously? <i>“Asking for too much? Me? ‘Fraid you got the wrong impression there, my good [sirmadam]. You’re offering and I’m just saying yes. Like, all my yes to all that, plus whatever you got going as a bonus.”</i> [HeShe] winks.", parse);
					Text.NL();
					Text.Add("You chuckle softly. Alright, alright. But let’s not be counting hens before they’re swiped, shall we? First, you need to clean your cheeky little [foxvixen] up.", parse);
					Text.NL();
					Text.Add("<i>“Okay. Just be aware that I’ll be holding you to all those promises and more!”</i>", parse);
				}
			}
			Text.Flush();
			
			TerryScenes.PCCleansTerry();
		}, enabled : true,
		tooltip : Text.Parse("Nothing sexier than a little [foxvixen] covered in spooge. Yank it out and let [himher] get what’s coming!", parse)
	});
	Gui.SetButtonsFromList(options, false, null);
}

TerryScenes.SexPitchAnal = function(cocksInAss : Cock[]) {
	let terry = GAME().terry;
	let player = GAME().player;

	var p1Cock = player.BiggestCock(cocksInAss);
	
	var parse : any = {
		foxvixen : terry.mfPronoun("fox", "vixen"),
		boygirl : terry.mfPronoun("boy", "girl"),
		master  : player.mfTrue("master", "mistress"),		
		playername : player.name
	};
	parse = player.ParserTags(parse);
	parse = terry.ParserPronouns(parse);
	parse = terry.ParserTags(parse, "t");
	
	var virgin = terry.Butt().virgin;
	var promise : boolean;
	
	Gui.Callstack.push(function() {
		
		Gui.Callstack.push(function() {
			Text.Add("Taking the proper stance, you grind your [cock] against the [foxvixen]’s ass, gliding it through the velvety-furred cheeks of [hisher] rear before lining the tip up with [hisher] newly lubed hole.", parse);
			Text.NL();
			if(p1Cock.Volume() >= 400) {
				if(virgin || terry.Slut() < 30) {
					Text.Add("Terry swallows as [heshe] feels your [cock] grinding in the valley of [hisher] butt. <i>“You’re big,”</i> [heshe] states nervously.", parse);
					Text.NL();
					if(promise)
						Text.Add("You assure [himher] that you remember your promise; it’ll fit, but you will take it slow and steady, and give [himher] a chance to properly adjust to it.", parse);
					else
						Text.Add("You assure the [foxvixen] that you have every confidence that it’ll fit; you know [heshe] can take it.", parse);
					Text.NL();
					Text.Add("<i>“Okay.”</i> [HeShe] relaxes a little.", parse);
				}
				else if(terry.Slut() < 60) {
					Text.Add("<i>“Take it easy, [playername]. Remember: you’re not exactly little,”</i> the [foxvixen] says nervously.", parse);
					Text.NL();
					Text.Add("You assure [himher] that you will... although, not too gentle; you know [heshe] likes it when you get a little rough...", parse);
				}
				else {
					Text.Add("<i>“You know, it’s always a thrill when you make it a point to state just how big you really are,”</i> Terry says, looking back with a coy smile.", parse);
					Text.NL();
					Text.Add("Grinning, you quip back that you know; that’s why you do it, after all. ", parse);
					Text.NL();
					Text.Add("<i>“Show off.”</i>", parse);
				}
				Text.NL();
			}
			
			TerryScenes.SexFuckButtEntrypoint(p1Cock, promise, function(rough : boolean) {
				if(rough) {
					Text.Add("<i>“Ugh, my ass...”</i> Terry groans. <i>“My hips feel sore, my butt feels sore, I’m feeling sore in places I didn’t even think it was possible to feel sore...”</i>", parse);
					Text.NL();
					parse["c"] = !p1Cock.isStrapon ? Text.Parse(" and [cock]", parse) : "";
					Text.Add("You mumble an idle agreement, noting your own hips[c] are certainly going to get you back for this when they can.", parse);
					Text.NL();
					if(terry.Relation() < 30) {
						Text.Add("<i>“Ugh, did you absolutely HAVE to be this rough?”</i>", parse);
						Text.NL();
						Text.Add("As if [heshe] didn’t enjoy it, you quip back, indicating the great smears of sexual fluid [heshe] has left down your [legs] and [hishers] from [hisher] climax.", parse);
						Text.NL();
						Text.Add("The [foxvixen] just huffs indignantly and looks away.", parse);
						Text.NL();
						Text.Add("You don’t even try to fight back the grin that crosses your face. [HeShe]’ll learn to admit the truth in time.", parse);
					}
					else if(terry.Relation() < 60) {
						Text.Add("<i>“You really did a number on me this time, [playername]. I’m not even sure I’ll be able to recover from this one.”</i>", parse);
						Text.NL();
						Text.Add("Smirking, you assure Terry that you just know [heshe]’ll get better soon. And then you can do this again when [heshe] does.", parse);
						Text.NL();
						Text.Add("<i>“Again!? Are you crazy?”</i>", parse);
						Text.NL();
						Text.Add("[HeShe] says that, but you have a feeling [heshe]’s looking forward to the idea [himher]self, you quip back.", parse);
						Text.NL();
						Text.Add("<i>“In your dreams,”</i> the [foxvixen] smirks.", parse);
					}
					else {
						Text.Add("<i>“You know, [playername]... any other time I’d tell you I love you, but right now I freaking hate you. Ow, my ass...”</i>", parse);
						Text.NL();
						Text.Add("Oh, poor baby; if you weren’t so sore as well, you’d kiss it better for [himher], you reply, grinning as you do so.", parse);
						Text.NL();
						Text.Add("<i>“You know, that actually sounds like it might work. Kiss me better, right where it hurts,”</i> [heshe] wiggles on your lap, trying to raise [hisher] butt.", parse);
						Text.NL();
						Text.Add("Grinning, you cup Terry’s ass playfully in your hand, using the other to pull [hisher] lips to yours and enfold them in a deep, passionate kiss. A few very pleasant moments later, you break the kiss and ask if [heshe] feels better now.", parse);
						Text.NL();
						Text.Add("<i>“A bit, but you’d better do that again, just to be sure.”</i>", parse);
						Text.NL();
						Text.Add("You can’t help but laugh softly; Terry really is yours, isn’t [heshe]? Still, you’re happy to oblige, pulling the [foxvixen] into another deep, affectionate kiss.", parse);
						
						terry.relation.IncreaseStat(100, 1);
					}
					Text.Flush();
					
					terry.slut.IncreaseStat(100, 4);
					TimeStep({hour: 1});
					
					Gui.NextPrompt();
				}
				else { // Gentle
					if(virgin) {
						Text.Add("So, how was it?", parse);
						Text.NL();
						Text.Add("<i>“F-fuck, [playername]. It was pretty intense,”</i> [heshe] groans. <i>“If you - hah - can make me feel like this every time, I might even grow to like this.”</i>", parse);
						Text.NL();
						Text.Add("Cheerfully, you declare that’s a promise, then.", parse);
					}
					else if(terry.Slut() < 30) {
						Text.Add("<i>“Damn, that felt good,”</i> [heshe] groans. <i>“I never thought taking it in the butt could feel so good. That thing you did with my nipples while you fucked me...”</i> [heshe] shudders at the thought. <i>“That was unique.”</i>", parse);
						Text.NL();
						Text.Add("You can’t help but smile proudly; [heshe]’s come quite a long way from the blushing virgin [heshe] was. Still, you’ve a feeling that [heshe]’ll only get better at this with practice...", parse);
					}
					else if(terry.Slut() < 60) {
						Text.Add("<i>“Aha! I’ll never get tired of this. Fuck, I really needed this...”</i> [heshe] pants.", parse);
						Text.NL();
						Text.Add("That’s your [boygirl], you cheerfully proclaim.", parse);
					}
					else {
						Text.Add("<i>“Oh yes! You know me so well, [playername].”</i>", parse);
						Text.NL();
						Text.Add("Grinning, you reply that you ought to by now.", parse);
						Text.NL();
						Text.Add("<i>“Damn right you do, hah… Keep up the good work.”</i>", parse);
						Text.NL();
						Text.Add("You most certainly will, you assure [himher].", parse);
					}
					Text.NL();
					
					var knotted = p1Cock.knot != 0;
					
					var fTooltip;
					var kTooltip;
					var pTooltip;
					
					if(terry.Relation() < 30) {
						Text.Add("<i>“Thanks a lot for the the great sex, but I think I’ll need a rest now...”</i>", parse);
						Text.NL();
						Text.Add("A frown crosses your face as you hear Terry’s words; does the [foxvixen] not realize that [heshe]’s the only one who’s gotten off so far? That’s being kind of selfish...", parse);
						fTooltip = Text.Parse("You want to cum as well; finish off in Terry’s ass before you let [himher] get some rest.", parse);
						if(knotted)
							fTooltip += Text.Parse(" You’ll be nice and spare [himher] the knot, though.", parse);
						kTooltip = Text.Parse("Give [himher] a pointed reminder about letting [hisher] partner get off as well.", parse);
						pTooltip = Text.Parse("Terry’s clearly worn out; why not be generous and let [himher] be?", parse);
					}
					else if(terry.Relation() < 60) {
						Text.Add("<i>“That was great, [playername]. Thanks a lot, but I can’t help but notice you still didn’t cum. I’m pretty tired but I think I can hold out enough to at least get you off.”</i>", parse);
						fTooltip = Text.Parse("Well, since [heshe]’s offering, why not take the generous offer?", parse);
						kTooltip = Text.Parse("Your knot’s just aching to be used; surely, Terry won’t mind if you tie in the process of getting off?", parse);
						pTooltip = Text.Parse("Terry’s being generous, but you can be generous too; let [himher] get some rest, you’ll take care of this yourself.", parse);
					}
					else {
						Text.Add("<i>“Thanks for making me cum so hard, [playername]... but surely we’re not finished yet, are we? You didn’t cum, and you can’t just hold out on me like this. If you don’t give me treats, I might grow rebellious,”</i> [heshe] smirks mischievously. It’s clear that [heshe]’s tired, but you can also tell that [heshe]’s not about to collapse without at least getting you off.", parse);
						fTooltip = Text.Parse("It’s what [heshe] wants, it’s what your body wants, why not make everyone happy?", parse);
						kTooltip = Text.Parse("If [heshe] wants it all, then you may as well give it to [himher]; shove your knot up Terry’s tailhole!", parse);
						pTooltip = Text.Parse("Terry’s words are brave, but [heshe]’s clearly tired. You can be magnanimous and let [himher] get some sleep instead.", parse);
					}
					Text.Flush();
					
					//[Finish][Knot][PullOut] 
					var options = new Array();
					if(!p1Cock.isStrapon) {
						options.push({ nameStr : "Finish",
							func : function() {
								Text.Clear();
								Text.Add("You wrap your arms tightly around Terry’s chest, as much for support as ensuring [heshe] can’t hope to wriggle free of your embrace, and resume thrusting, faster and rougher than before. [HeShe] grunts and moans softly as you fuck the [foxvixen]’s ass harder, the orgasm-softened flesh doing its best to clench down around your intruding girth. Moments later, you cry out in pleasure as your own climax washes through you, erupting inside Terry’s tailhole.", parse);
								Text.NL();
								
								var cum = player.OrgasmCum();
								
								if(cum > 6) {
									Text.Add("Terry cries out as your tremendous load erupts inside of [himher], pressurized jets of spunk erupting backwards and washing over your [legs], matting them both in fluid. Still, even with the compression forcing so much of it out, more still finds its way into the [foxvixen]’s stomach which bloats into a massive swell. Finally, your climax finishes and you go soft, panting for breath. Terry shifts restlessly, trying to get more comfortable with [hisher] newly enhanced girth, wetly belching as the semen audibly sloshes around inside [hisher] gut.", parse);
								}
								else if(cum > 3) {
									Text.Add("A long, gurgling moan bubbles from Terry’s throat as [hisher] stomach visibly bulges from your titanic orgasm, swelling out like a balloon as you keep unloading spurt after spurt of semen inside of [himher]. By the time you go limp, it looks like [heshe] is ready to give birth any day now, and the [foxvixen] unthinkingly pats the stretched skin, rubbing it soothingly.", parse);
								}
								else {
									Text.Add("Your cum explodes inside of Terry’s ass, packing itself into a nice, wet, gloopy load somewhere inside of [himher]. Terry moans softly, ass flexing as if to milk you, but you have nothing more left to give.", parse);
								}
								Text.NL();
								if(terry.Relation() < 30) {
									Text.Add("<i>“F-full...”</i> the [foxvixen] groans, collapsing into a heap and promptly passing out.", parse);
								}
								else if(terry.Relation() < 60) {
									Text.Add("<i>“That’s better now, isn’t it?”</i>", parse);
									Text.NL();
									Text.Add("You groan idly in agreement, sleepily nodding your head even though Terry can’t see it.", parse);
									Text.NL();
									Text.Add("<i>“Rest with me?”</i>", parse);
									Text.NL();
									parse["seeppourgush"] = cum > 6 ? "gush" :
									                        cum > 3 ? "pour" : "seep";
									Text.Add("That’s... that’s a very welcoming idea. Deciding words are unnecessary, you gently pull yourself free of Terry’s ass, letting your seed start to [seeppourgush] from [hisher] depths. Once [heshe]’s properly uncorked, you ease [himher] fully to the ground, snuggling up closer and wrapping your arms around the [foxvixen] as you rest your head in the crook of [hisher] neck.", parse);
								}
								else {
									parse["c"] = cum > 6 ? " pregnant-looking" :
									             cum > 3 ? " distended" : "";
									Text.Add("<i>“Yes, hmm. Let it all out for me,”</i> [heshe] says, patting [hisher][c] belly. <i>“Pack me full of your seed.”</i>", parse);
									Text.NL();
									Text.Add("You shudder, managing to squeeze out a last tiny trickle of semen, before announcing that [heshe]’s as full as you can make [himher].", parse);
									Text.NL();
									Text.Add("<i>“Snuggle and nap together, [master]?”</i> Terry says with a coy smile.", parse);
									Text.NL();
									Text.Add("Stifling a yawn, you nod your head and agree that sounds like a wonderful idea. You start to pull yourself free of Terry’s ass, only to stop as the [foxvixen] reaches back to grab at your [hips].", parse);
									Text.NL();
									Text.Add("<i>“Leave it in. It feels nice like this.”</i>", parse);
									Text.NL();
									Text.Add("Well, if that’s what [heshe] wants... You push forward again, properly slotting yourself back inside of the [foxvixen]’s ass, then gently lower the pair of you to the ground. You tuck yourself as close to Terry as you can manage, nestling your chin in the crook of [hisher] shoulder, then close your eyes and allow yourself to drift off.", parse);
								}
								Text.Flush();
								
								terry.relation.IncreaseStat(50, 2);
								terry.slut.IncreaseStat(100, 1);
								TimeStep({hour: 1});
								
								Gui.NextPrompt();
							}, enabled : true,
							tooltip : fTooltip
						});
						if(knotted) {
							options.push({ nameStr : "Knot",
								func : function() {
									Text.Clear();
									Text.Add("You wrap your arms tightly around Terry’s chest, ensuring you are well supported - and that the [foxvixen] can’t get away - before you draw your hips back and then give them a firm thrust forward. Your knot isn’t fully inflated yet, but it already markedly increases your girth, meaning you have to push with strong, insistent strokes to try and squeeze inside of Terry’s tailhole. Terry gasps and wriggles, scratching at the ground as [heshe] tries to loosen up enough to let your bulging dick-root inside. Finally, amazingly, you manage to force your way in, the texture, the heat and the feeling of Terry’s asshole crushing your knot with its vice-like grip driving you over the edge; you throw back your head and cry out as you climax in turn.", parse);
									Text.NL();
									
									var cum = player.OrgasmCum();
									
									if(cum > 6) {
										Text.Add("Terry whimpers and mewls as gush after inhuman gush of seed floods inside of [himher], belly veritably exploding outwards under the titanic influx of semen. Though some thin spurts spray out around the rim of your knot, the seal is tight enough that the vast majority goes directly to Terry’s stomach. By the time you finish, Terry is wallowing atop a tummy like a beachball full of water, moaning softly. [HeShe] lets out a gurgled belch, expelling a mouthful of cum down [hisher] front.", parse);
									}
									else if(cum > 3) {
										Text.Add("With mewls and moans, Terry wriggles as [hisher] stomach begins bloating under your output of semen, swelling out like a balloon, your bulging knot ensuring every last drop is sent squirting into the [foxvixen]’s increasingly full-packed belly. By the time you go limp, Terry looks ready to pop with a whole litter of kits, each motion eliciting a soft sloshing sound as the cum inside [himher] is stirred by the movement. [HeShe] pats it gently, and stifles a burp.", parse);
									}
									else {
										Text.Add("The two of you moan in pleasure as your hot seed flows freely into the [foxvixen]. With your knot trapping it inside, every last drop you have to spare is pushed inside of Terry’s ass until [hisher] stomach bulges subtly.", parse);
									}
									
									Text.NL();
									
									if(terry.Relation() < 30) {
										Text.Add("<i>“Ow... my butt. So full...”</i> [heshe] mumbles before collapsing on the floor, passed out.", parse);
										Text.NL();
										Text.Add("You shake your head with a soft sigh; still, [heshe]’ll get better with practice. As best you can, you maneuver the two of you into a spooning position on the ground; nothing to do but make yourself comfortable until your knot deflates. You yawn softly, tuck your head against Terry’s shoulder, and allow your eyes to close.", parse);
									}
									else if(terry.Relation() < 60) {
										Text.Add("<i>“Hng! You really stuffed me back there,”</i> [heshe] states.", parse);
										Text.NL();
										Text.Add("Grinning tiredly, you playfully ask if [heshe]’s saying [heshe] didn’t enjoy it.", parse);
										Text.NL();
										Text.Add("<i>“I didn’t say that, now did I? But damn my butt’s gonna be sore when you finally pull out. Good thing you were just being ‘gentle’ this time,”</i> the [foxvixen] teases.", parse);
										Text.NL();
										Text.Add("Feeling a little sheepish, you apologize to [himher] about that.", parse);
										Text.NL();
										Text.Add("<i>“Don’t worry about it. It was a great ride nevertheless. Just… let’s rest for now, okay? I was pretty tired before taking all of you, and now I feel like I might just pass out...”</i>", parse);
										Text.NL();
										Text.Add("Yawning softly, you confess that you feel like a rest yourself. You help gently guide Terry down to the ground, and then snuggle up close to [hisher] fluffy form, folding your arms around the [foxvixen] and cradling [himher] close.", parse);
									}
									else {
										Text.Add("<i>“Mmm, yes. I love it when you tie me. You can always give me everything you have, I’ll take it all,”</i> [heshe] proclaims, looking back at you with a tired smile, tail thumping softly against your midriff as [heshe] wags it.", parse);
										Text.NL();
										Text.Add("You smile through the haze of your afterglow and reach out to gently tousle Terry’s ears, assuring [himher] that you’ll keep that in mind. But right now, you have nothing left to give.", parse);
										Text.NL();
										parse["b"] = player.HasBalls() ? Text.Parse(" reaches between [hisher] legs to fondle your [balls] and", parse) : "";
										Text.Add("<i>“You sure?”</i> The [foxvixen][b] clenches [hisher] ass one last time. You groan as you spew just a little bit more cum inside [himher]. <i>“Looks like you weren’t quite finished for me,”</i> [heshe] teases.", parse);
										Text.NL();
										Text.Add("You roll your eyes and nip gently at the tip of Terry’s ear, eliciting a girly squeak of protest from the [foxvixen]. Yawning gently, you decide that now is the time to get some rest, and promptly pull Terry down with you as you settle yourself upon the ground, using [himher] like a full-body pillow.", parse);
										Text.NL();
										Text.Add("<i>“Aw, no good night kiss?”</i>", parse);
										Text.NL();
										Text.Add("In this position? Not possible. Will [heshe] settle for a good morning kiss instead?", parse);
										Text.NL();
										Text.Add("<i>“Alright, I can live with that.”</i> [HeShe] snuggles up against you and follows you on your brief, but necessary, journey to dreamland.", parse);
									}
									Text.Flush();
									
									terry.relation.IncreaseStat(50, 2);
									terry.slut.IncreaseStat(100, 2);
									TimeStep({hour: 2});
									
									Gui.NextPrompt();
								}, enabled : true,
								tooltip : kTooltip
							});
						}
					}
					options.push({ nameStr : "Pull out",
						func : function(choice : boolean) {
							if(choice)
								Text.Clear();
							else
								Text.NL();
							Text.Add("Wriggling a little to get into a better position to do so, you patiently guide your [cock] free of your vulpine pet’s newly used ass.", parse);
							Text.NL();
							if(p1Cock.isStrapon) {
								if(terry.Relation() >= 30) {
									Text.Add("Shaking your head, you thank Terry for the offer, but gently remind [himher] that your [cock] is only a toy; it’s not going to cum, so there’s no point in continuing.", parse);
									Text.NL();
									Text.Add("<i>“Of course there is; you can try to get another load off me,”</i> the [foxvixen] grins.", parse);
									Text.NL();
									Text.Add("Smirking, you quip back that Terry is certainly a horny little [foxvixen] - whatever happened to [hisher] being tired?", parse);
									Text.NL();
									Text.Add("<i>“Okay, maybe you have a point. But let’s not forget whose fault it is that I grew to enjoy our little ‘alone time’ so much.”</i>", parse);
									Text.NL();
									Text.Add("Guilty as charged, you concede, still grinning smugly as you do so. But that doesn’t change the fact that [heshe]’s about to pass out.", parse);
									Text.NL();
									Text.Add("<i>“Can you at least spare some time to snuggle?”</i>", parse);
									Text.NL();
									Text.Add("That you most certainly can, you reply, already moving to embrace Terry and pull the [foxvixen] carefully into your lap, gently cradling [himher].", parse);
								}
								else {
									Text.Add("Terry’s out like a candle as soon as you’re done pulling out. You sigh and shake your head; yes, the cock is only a dildo, but still, it’s disrespectful for [himher] to just go out like a light after you go to all the trouble of getting [himher] off like that. You’ll simply <i>have</i> to train [himher] better, you resolve.", parse);
								}
							}
							else { // real cock
								if(terry.Relation() < 30) {
									Text.Add("Terry’s out like a candle as soon as you’re done pulling out. You sigh in disappointment; you decide to be generous, and [heshe] can’t even thank you for it? You’re going to need to teach [himher] some proper manners in the future.", parse);
								}
								else if(terry.Relation() < 60) {
									Text.Add("<i>“Whu? Why’d you pull out?”</i>", parse);
									Text.NL();
									Text.Add("Because [heshe]’s tired and clearly about to fall asleep, you point out; it’s no fun to fuck [himher] if [heshe] passes out before you’re through. You’ll get off somewhere else, it’s no biggie.", parse);
									Text.NL();
									Text.Add("<i>“Don’t be stupid, [playername]. I can at least-”</i> You swiftly cut [himher] off with a finger pressed against [hisher] lips, smiling as you assure Terry that it’s okay.", parse);
									Text.NL();
									Text.Add("Terry smiles at you. <i>“You’re too nice to me, [playername]. I promise I’ll get you off properly next time.”</i>", parse);
									Text.NL();
									Text.Add("Still grinning, you promise that you’ll hold [himher] up to that.", parse);
								}
								else {
									Text.Add("<i>“Hey! I was using that!”</i> [heshe] jokingly protests.", parse);
									Text.NL();
									Text.Add("You shake your head and gently chide Terry in the same tone; you both know [heshe]’s about to pass out, so [heshe] may as well lie down and get some sleep. You’ll take care of your [cock] yourself.", parse);
									Text.NL();
									parse["boygirl"] = terry.mfPronoun("boy", "girl");
									Text.Add("<i>“But I wanna!”</i> [heshe] pouts. <i>“Besides, what kind of [boygirl]friend would I be if I didn’t at least get my lover off before passing out?”</i>", parse);
									Text.NL();
									Text.Add("Smiling, you shake your head and assure [himher] that it’s alright; as brave a face as [heshe] wants to put on, you clearly wore [himher] out. You exhort that [heshe] needs to get [hisher] rest; you’ll be fine. Besides, you quip, you’d rather have a well-rested [foxvixen] raring for a second go later than a tired, worn-out one now.", parse);
									Text.NL();
									Text.Add("Sighing in defeat, Terry smiles tiredly. <i>“Alright, you have a point. I guess I’ll just have to get you off twice as hard to make up for this time, won’t I?”</i>", parse);
									Text.NL();
									Text.Add("You nod your head with a smile and say that sounds acceptable to you.", parse);
									Text.NL();
									Text.Add("<i>“It’s a promise. Make sure to have plenty of cum backed up for me later, but for now can we snuggle? I can’t sleep very well without my [playername].”</i>", parse);
									Text.NL();
									Text.Add("You simply grin and hold out your arms, an open invitation to an embrace. [HeShe] hugs you tightly, snuggling up to you affectionately.", parse);
								}
							}
							Text.Flush();
							
							terry.relation.IncreaseStat(50, 2);
							terry.slut.IncreaseStat(100, 1);
							TimeStep({hour: 1});
							
							Gui.NextPrompt();
						}, enabled : true,
						tooltip : pTooltip,
						obj : true
					});
					if(options.length > 1)
						Gui.SetButtonsFromList(options, false, null);
					else
						options[0].func();
				}
			});
		});
		
		Text.NL();
		Text.Add("With Terry in position, it’s time to get yourself ready, and you quickly strip off your [armor] before putting it aside. As the [foxvixen] eyes you, you tap your chin, considering what would be the best way to prepare [himher] for a proper butt stuffing...", parse);
		Text.Flush();
		
		//[Finger][Lick]
		var options = new Array();
		options.push({ nameStr : "Finger",
			func : function() {
				Text.Clear();
				Text.Add("Turning back to your belongings for the moment, you fish around and retrieve a bottle of lubricant, proceeding to smear a generous amount on your fingers before settling down behind Terry. Moving [hisher] tail out of the way, you reach out with your lube dripping digits and smear some of the creamy substance onto [hisher] anal ring, kneading it in as you roll your fingers around and around.", parse);
				Text.NL();
				if(terry.Slut() < 30)
					Text.Add("<i>“Hng! T-take it easy, [playername].”</i>", parse);
				else if(terry.Slut() < 60)
					Text.Add("<i>“Ugh! It’s cold!”</i> the [foxvixen] complains.", parse);
				else
					Text.Add("The [foxvixen] shudders as you begin massaging the lube into [hisher] tight rosebud. <i>“Don’t worry - it’s cold but I’m fine. Just start fingering me, please.”</i>", parse);
				Text.NL();
				Text.Add("With your thumb, you continue spiraling around and around Terry’s tailhole until you deem the surface sufficiently lubed. Now, it’s time to start lubing [himher] up inside... Extending your finger, you begin to push gently but firmly at [hisher] newly creamed hole, patiently worming the very tip of your finger inside of the [foxvixen]’s ass, eliciting a moan from the vulpine. [HeShe] adjusts [himher]self, bucking back against your digit slightly.", parse);
				if(terry.Slut() >= 60) {
					Text.Add(" The [foxvixen] reaches back, raising [hisher] bubble butt as [heshe] spreads [hisher] butt cheeks for you. <i>“Easier to work like this, right?”</i>", parse);
					Text.NL();
					Text.Add("You nod your head, letting out a grunt of agreement, concentrating more on feeling [hisher] asshole slowly conforming to your probing digit than anything.", parse);
				}
				Text.NL();
				Text.Add("Patiently, you pump away with your finger, feeling Terry stretching around the intruder. Once you gauge the [foxvixen] as being loose enough, you push a second finger against the seal of [hisher] anal ring, feeling it slide slowly around this new invader. Terry moans as you worm both digits inside of [hisher] ass, patiently thrusting them and further stretching [hisher] tight passage.", parse);
				Text.NL();
				if(terry.FirstCock()) {
					parse["p"] = terry.FirstVag() ? Text.Parse("Ignoring [hisher] dripping pussy, y", parse) : "Y";
					Text.Add("[p]ou reach for Terry’s [tcock] with your free hand, sliding your digits along its length in smooth, even strokes that match the tempo of your thrusting fingers. ", parse);
					Text.NL();
					if(terry.HorseCock()) {
						Text.Add("You can feel it growing from its meager half-erect state to its more impressive fully-erect state. Each touch sends an electric ripple flowing through the [foxvixen], proof of how sensitive [heshe] really is down there. The sound of dripping cum becomes more prominent, and you notice [heshe]’s made a decently sized puddle underneath. You grasp [hisher] deflated knot, earning yourself a yelp and a rope of pre.", parse);
						Text.NL();
						Text.Add("<i>“Dammit, [playername], watch it. I’m sen - Ah!”</i> Yes, yes, [heshe]’s pretty sensitive down here. That’s why it’s so much fun teasing [himher] like this.", parse);
					}
					else {
						Text.Add("[HisHer] half-erect cock hardens to full mast under your careful ministrations, [hisher] knot already beginning to form as you stroke [hisher] foxhood and milk [hisher] length for precious gobs of pre.", parse);
					}
				}
				else {
					Text.Add("You reach for Terry’s new womanhood, already starting to plush with arousal. Gently, you stroke [hisher] feminine sex, slowly running your digits through the folds, feeling [hisher] excitement beginning to bead on your fingertips and run down to puddle in your palm. Terry moans softly as you continue the two-pronged assault, the [foxvixen] unthinkingly bucking back and forth against each set of fingers.", parse);
				}
				Text.NL();
				Text.Add("Once you judge your fingers are sufficiently slick with the [foxvixen]’s pre-cum, you leave [hisher] sex alone, wetly popping your original fingers free of [hisher] ass. Terry wriggles, a mewl of protest unthinkingly escaping [hisher] lips, before you slide your newly sex-slickened digits back inside of [himher]. You push these as far inside of [himher] as you can, the mingled fluids letting you stretch Terry wider and go deeper than before, audibly squelching as you pump away.", parse);
				Text.NL();
				Text.Add("Once you deem Terry to feel sufficiently loose and lubed, you pull your fingers out again and stand up; time for the main event now...", parse);
				Text.NL();
				
				Gui.PrintDefaultOptions();
			}, enabled : true,
			tooltip : Text.Parse("Give [himher] a taste of what’s to come and stretch [himher] in preparation at the same time.", parse)
		});
		options.push({ nameStr : "Lick",
			func : function() {
				Text.Clear();
				parse["l"] = player.LowerBodyType() != LowerBodyType.Single ? " your knees at" : "";
				Text.Add("Lowering yourself to[l] Terry’s rear, you gently nip [himher] right on the heart-stamp, sinking your teeth through the fur into the flesh beneath just hard enough that [heshe] can properly feel it.", parse);
				Text.NL();
				Text.Add("<i>“Ow! That hurt!”</i> Terry protests. <i>“Why’d you bite me?”</i>", parse);
				Text.NL();
				Text.Add("It’s [hisher] own fault for being so tasty, you promptly shoot back; how could you possibly resist such a delectable morsel?", parse);
				Text.NL();
				if(terry.Relation() >= 60) {
					Text.Add("<i>“Hardy, har, har. Ain’t you lucky that you found someone that likes you, despite your lame one-liners and weird antics?”</i> [heshe] asks mockingly.", parse);
					Text.NL();
					Text.Add("Shaking your head as Terry’s tail brushes ticklishly across your nose, you quip back that you’d be twice as lucky if you could find someone who could do that without smacking you in the face with their tail all the time. For emphasis, you grab Terry’s tail near its base, gently stroking down its length.", parse);
					Text.NL();
					Text.Add("<i>“Hmm, your own fault for stalling instead of doing your job,”</i> [heshe] coos as you stroke [hisher] tail.", parse);
					Text.NL();
					Text.Add("Well, you’ll just have to get back to work, you reply, giving [hisher] tail one last stroke for luck.", parse);
				}
				else if(terry.Relation() >= 30) {
					Text.Add("<i>“Dear Aria… Please bite me again - just stop with the lame one-liners before I puke.”</i> Terry gags mockingly.", parse);
					Text.NL();
					Text.Add("Well, since [heshe] asked... you promptly nip [hisher] heart-stamp again, a little harder this time.", parse);
					Text.NL();
					Text.Add("<i>“Oof! Still less painful than your one-liners,”</i> [heshe] quips again.", parse);
				}
				else {
					Text.Add("<i>“I’m not even gonna bother replying to that,”</i> [heshe] jerks [hisher] head away in disapproval.", parse);
					Text.NL();
					Text.Add("You just sigh softly and shake your head; [heshe]’ll warm up to you eventually. You simply give [hisher] butt a gentle pat instead.", parse);
				}
				Text.NL();
				Text.Add("Gently, you part Terry’s ass cheeks, the white fur giving way to the naked pink flesh of [hisher] anus. ", parse);
				if(terry.Slut() >= 60)
					Text.Add("The [foxvixen] starts panting in anticipation, round butt wiggling a little in excitement. <i>“Are you going to get started already?”</i>", parse);
				else if(terry.Slut() >= 30)
					Text.Add("[HeShe] thrusts [hisher] butt up, granting you easier access.", parse);
				else
					Text.Add("[HeShe] shudders in surprise, not quite used to being touched like that just yet. You can tell that [heshe]’s pretty tense.", parse);
				Text.NL();
				parse["NervouslyPlayfully"] = terry.Slut() < 30 ? "Nervously" : "Playfully";
				Text.Add("Your [tongue] extends over your lips and you begin to trace Terry’s ring with it, feeling it clench and squirm as you trail teasingly over the sensitive flesh. Around and around you loop, slathering a good amount of natural lube over its surface; then, when you deem your efforts sufficient, you start to push the very tip of your [tongue] against [hisher] entrance. [NervouslyPlayfully], [heshe] tries to clench [hisher] butt shut; however, no matter how much [heshe] tries, your tongue is just too limber to be stopped so easily. Patiently, you squirm and pry and poke, slowly teasing it open and feeding your flexible organ inside, worming it deeper and deeper until you are buried in [hisher] ass.", parse);
				if(terry.FirstCock()) {
					parse["vulpineequine"] = terry.HorseCock() ? "equine" : "vulpine";
					Text.NL();
					Text.Add("Your probing [tongue] finds the [foxvixen]’s prostate, and you waste no time in grinding and wriggling your length against it, rubbing the sensitive organ that you’ll soon be mashing with your [cocks]. One of your hands reaches around [hisher] hip and comes up between [hisher] legs, letting you feel the throbbing length of [hisher] [vulpineequine] erection with your fingers. You playfully stroke it, giving it a gentle squeeze of affection.", parse);
				}
				Text.NL();
				if(terry.flags["xLick"] < 5) {
					Text.Add("<i>“Hng! This feels… weird.”</i>", parse);
					Text.NL();
					Text.Add("Tempted as you might be to reassure the [foxvixen], that’s a little improbable from your current position. Pulling your tongue back from inside Terry’s tailhole, you lift your face from between [hisher] ass cheeks and ask if [heshe] sincerely doesn’t like what you’re doing to [himher].", parse);
					Text.NL();
					Text.Add("To emphasize your point, you plunge your tongue back inside [hisher] ass again, this time taking a slower and gentler approach, caressing [hisher] interior with soft, languid laps, painstakingly gliding over the most sensitive spots you can find.", parse);
					Text.NL();
					Text.Add("<i>“I guess it’s not too bad - ah! - b-but I’m having a hard time getting used to the feeling.”</i>", parse);
				}
				else if(terry.flags["xLick"] < 10) {
					Text.Add("<i>“Umm! This still feels strange, but I guess I can appreciate the feeling of you eating me out like that.”</i>", parse);
					Text.NL();
					Text.Add("As best you can from your current position, you grin in approval; Terry’s come quite a way. Unthinkingly, you congratulate [himher], making your tongue vibrate and flex inside the [foxvixen]’s tailhole. Naturally, no words come out, but from the way Terry clamps down, you think [heshe] got the message.", parse);
				}
				else {
					Text.Add("<i>“Ah! This feels great. I love it when you eat me out, [playername]. A bit more to the - oh! - yes, right there...”</i>", parse);
					Text.NL();
					Text.Add("What a little buttslut your [foxvixen] has become... still, you need no further encouragement, moving your tongue as Terry instructs and feeling [himher] practically melting around you, [hisher] throaty moans of pleasure echoing in your [ears].", parse);
				}
				Text.NL();
				Text.Add("Eventually, you withdraw your tongue and stand up; you just want to lube the [foxvixen], not tongue [himher] to an assgasm. You give [himher] an affectionate pat on the butt and announce that [heshe]’s ready for the real fun.", parse);
				Text.NL();
				
				terry.flags["xLick"]++;
				
				Gui.PrintDefaultOptions();
			}, enabled : true,
			tooltip : "Bite that tasty tush, and maybe have a taste of what’s to come..."
		});
		Gui.SetButtonsFromList(options, false, null);
	});
	
	Text.Clear();
	if(virgin) {
		Gui.Callstack.push(function() {
			Text.NL();
			Text.Add("Reaching out with your hands, you gently push on Terry’s shoulders, the [foxvixen] quickly catching on and kneeling down on all fours. You move [hisher] limbs slightly with your [hand]s, adjusting Terry’s stance so that the posture will be more comfortable for [himher], until you are satisfied with the result.", parse);
			Text.NL();
			Text.Add("Nodding to yourself, you reach out and lightly clasp the [foxvixen]’s long, bushy tail before moving it to the side so it’s no longer covering [hisher] ass from view. Playfully, you run your fingers through [hisher] brush, luxuriating in the soft fur as your digits glide through its strands, before letting it go and moving your hands to Terry’s shapely rear.", parse);
			Text.NL();
			Text.Add("You start to rub [himher] with smooth, even strokes, kneading flesh through soft fur in a soothing massage and telling [himher] to relax. The [foxvixen] nods, trying [hisher] best to relax, despite the anxiety.", parse);
			
			Gui.PrintDefaultOptions();
		});
		
		Text.Add("<i>“W-wait! I’m sure there’s something else we could-”</i> With a gentle smile on your lips, you cut the [foxvixen] off in mid-protest with a finger placed demurely to [hisher] mouth. Shaking your head makes it clear that [heshe]’s not going to make you change your mind, and [hisher] ears droop in submission.", parse);
		Text.NL();
		if(terry.Relation() >= 60) {
			Text.Add("The [foxvixen] takes a deep breath, steeling [hisher] resolve. <i>“Okay, then… alright. I’ll do it, not because of the collar. But because it’s you that’s asking for it. Please, just promise me that you’ll be gentle?”</i>", parse);
			Text.Flush();
			
			//[Promise][Can’t]
			var options = new Array();
			options.push({ nameStr : "Promise",
				func : function() {
					Text.Clear();
					Text.Add("Smiling sweetly, you kiss Terry tenderly on the lips, gently stroking [hisher] ears with your fingertips in that way that you know [heshe] likes. Once Terry’s melted into your arms, you break the lip-lock and look the [foxvixen] in the eyes, swearing in your most sincere tone that you would never stand for hurting [himher]. No, all [heshe] needs to worry about is how good you’re going to make [himher] feel; once you’re done, you vow [heshe]’s not going to be able to get enough of doing it like this.", parse);
					Text.NL();
					parse["foxyvixxy"] = terry.mfPronoun("foxy", "vixxy")
					Text.Add("Terry smiles at your reassurance. <i>“So… that’s how it is, huh? You’re going to fuck me until I turn into your [foxyvixxy] buttslut, is that it?”</i>", parse);
					Text.NL();
					Text.Add("Giving [himher] a playful peck on the nose, you tell [himher] that’s <i>exactly</i> how it is.", parse);
					Text.NL();
					parse["h"] = player.Height() > terry.Height() + 5 ? Text.Parse(" stands on [hisher] tiptoes, then", parse) : "";
					Text.Add("<i>“Okay then, I’ll take you up on that challenge, then.”</i> [HeShe] grins. <i>“Alright, I’m trusting you to keep up with your promise, let’s do it then. Take me and make me yours.”</i> [HeShe] takes a step and[h] gives you a little peck on the lips.", parse);
					
					promise = true;
					terry.relation.IncreaseStat(100, 5);
					
					Gui.PrintDefaultOptions();
				}, enabled : true,
				tooltip : "You promise to be gentle."
			});
			options.push({ nameStr : "Can’t",
				func : function() {
					Text.Clear();
					Text.Add("With a playful shake of your head, you proclaim you just can’t make that promise; who’d be able to resist tapping a hot [foxvixen]’s ass like Terry’s as hard as they possibly can? For emphasis, you reach down and cup [hisher] butt, fondling the feminine curves and feeling how it squishes wonderfully in your grip.", parse);
					Text.NL();
					Text.Add("<i>“Hmm, you perv!”</i> [heshe] exclaims, playfully punching you in the arm. Grinning back, you let out a melodramatic ‘ow!’ of protest and make a show of rubbing the spot where the [foxvixen] punched you.", parse);
					Text.NL();
					Text.Add("<i>“Alright then, since you can’t seem to think about anything else, I guess I have no choice but to take your mind off my ‘hot [foxvixen]’s ass’ as you put it. But I expect you to at least make the entry easy on me.”</i>", parse);
					Text.NL();
					Text.Add("Nodding your head, you assure Terry that you can at least do that for [himher].", parse);
					
					promise = false;
					terry.relation.IncreaseStat(100, 2);
					
					Gui.PrintDefaultOptions();
				}, enabled : true,
				tooltip : "You can't make that promise."
			});
			Gui.SetButtonsFromList(options, false, null);
		}
		else if(terry.Relation() >= 30) {
			Text.Add("Still, there’s a definite wag in [hisher] tail as it swishes softly over [hisher] butt. It looks like Terry isn’t entirely against this...", parse);
			Gui.PrintDefaultOptions();
		}
		else {
			Text.Add("Cowed, [heshe] meekly looks at [hisher] feet, saying not a word.", parse);
			Gui.PrintDefaultOptions();
		}
	}
	else if(terry.Slut() < 30) {
		Text.Add("<i>“Alright...”</i> Terry hesitantly turns around, first kneeling on the floor, then finally crawling on fours. [HisHer] tail is tucked between [hisher] legs, ears flat on [hisher] skull. It’s clear that the [foxvixen] is a nervous pile.", parse);
		Gui.PrintDefaultOptions();
	}
	else if(terry.Slut() < 60) {
		Text.Add("<i>“Okay, sure. If you want my butt, it’s yours. Should I get on all fours now?”</i>", parse);
		Text.NL();
		Text.Add("Nodding your head, you tell the [foxvixen] that’s right. Without further ado, [heshe] kneels and complies with your command, crawling around until [heshe] has [hisher] back turned to you, tail raised to give you a clear view of your target.", parse);
		Gui.PrintDefaultOptions();
	}
	else {
		Text.Add("<i>“My, my, someone can’t get enough of my butt.”</i> [HeShe] grins. <i>“Alright then, you can have it - but you’ll have to come and get it.”</i> The [foxvixen] gives you a wink.", parse);
		Text.NL();
		Text.Add("Well, that’s an invitation you can hardly refuse. In a few brisk motions, you have crossed the distance between the pair of you, one hand moving to possessively cup Terry’s ass. As your slutty [foxvixen] mewls in delight, you stifle [hisher] noise by hungrily enveloping [hisher] lips with your own. Terry melts into your embrace, and you easily coax [himher] into the proper stance before breaking the kiss, standing back up with an appreciative slap to [hisher] butt.", parse);
		Gui.PrintDefaultOptions();
	}
}


TerryScenes.SexFuckButtEntrypoint = function(p1Cock : Cock, promise : boolean, retFunc : any) {
	let terry = GAME().terry;
	let player = GAME().player;

	var virgin = terry.Butt().virgin;
	var knotted = p1Cock.knot != 0;

	var parse : any = {
		foxvixen : terry.mfPronoun("fox", "vixen"),
		boygirl  : terry.mfPronoun("boy", "girl"),
		master  : player.mfTrue("master", "mistress"),
		mistermiss : player.mfTrue("mister", "miss"),
		playername : player.name
	};
	parse = player.ParserTags(parse);
	parse = terry.ParserPronouns(parse);
	parse = terry.ParserTags(parse, "t");
	
	Text.Add("You spare a quick thought for how you should take Terry’s tailhole: gently, or roughly?", parse);
	if(promise)
		Text.Add(" You promised [himher] you’d be gentle...", parse);
	else if(virgin)
		Text.Add(" [HeShe]’d probably prefer it if you were gentle with [himher]...", parse);
	Text.Flush();
	
	//[Gentle] [Rough]
	var options = new Array();
	options.push({ nameStr : "Gentle",
		func : function() {
			Text.Clear();
			Text.Add("Holding Terry by the hips, you start to push forward, slow and steady, pressing against [hisher] newly loosened and lubed ass until you begin to work your way inside. ", parse);
			Text.NL();
			
			Sex.Anal(player, terry);
			terry.FuckAnal(terry.Butt(), player.FirstCock(), 3);
			player.Fuck(player.FirstCock(), virgin ? 10 : 3);
			
			if(virgin || terry.Slut() < 30) {
				Text.Add("<i>“Ouch! Stop! Give me a moment.”</i>", parse);
				Text.NL();
				Text.Add("Immediately, you stop your advance, waiting there for Terry to give the go-ahead again. You can feel the [foxvixen]’s anal ring contracting around your [cockTip] as [heshe] gets used to your girth.", parse);
				Text.NL();
				Text.Add("<i>“Okay, I guess I’m good. Just keep it nice and slow.”</i>", parse);
			}
			else if(terry.Slut() < 60) {
				Text.Add("<i>“Ugh!”</i> the [foxvixen] groans. You promptly stop your advance, asking if [heshe]’s alright.", parse);
				Text.NL();
				Text.Add("<i>“It’s alright, I’m cool. Just hurts a little, but I’m fine. It feels kinda good already,”</i> [heshe] reaffirms, bucking back and taking another inch in. <i>“Nng! I guess you’d better handle this...”</i>", parse);
			}
			else {
				Text.Add("<i>“Yeah… You can go a little quicker if you want; I’m a big [boygirl], I can take it.”</i>", parse);
				Text.NL();
				Text.Add("Smiling, you reach out and scratch the [foxvixen] behind the ears; you know [heshe] is, but still, it’s nice to take things slow and sweet sometimes, isn’t it?", parse);
				Text.NL();
				Text.Add("<i>“Hmm, well I do enjoy the feeling of you going in the first time… so alright, I guess you can take your time. It still hurts a little, to be honest, but I won’t care too much about that when you’re making me feel good later.”</i>", parse);
			}
			Text.NL();
			parse["b"] = player.HasBalls() ? Text.Parse(", your [balls] nestling softly against [hisher] thighs", parse) : "";
			Text.Add("Patiently, you feed inch after inch of your length inside of [himher], trying to make the insertion as gentle as possible. Terry’s appreciative groans fill your [ears] as you push inside of [himher], stopping only when have reached to the very hilt of your [cock][b]. You ask Terry how that feels, brushing your hand gently down [hisher] back.", parse);
			Text.NL();
			if(virgin || terry.Slut() < 30)
				Text.Add("<i>“Not bad, all things considered. Better than I expected, anyway.”</i>", parse);
			else if(terry.Slut() < 60)
				Text.Add("<i>“Nice and full. I think you can start moving now.”</i>", parse);
			else
				Text.Add("<i>“Pretty good, but you’d better get moving before I get it in my mind to run this show myself, [mistermiss] ‘nice and slow’.”</i> [HeShe] clenches [hisher] ass, drawing a groan out of you.", parse);
			if(promise) {
				Text.NL();
				Text.Add("You gently tousle Terry’s ears affectionately, assuring [himher] that you remember your promise; you’ll keep things nice and gentle for [himher], just like [heshe] asked. No better way to lose [hisher] virginity than that.", parse);
				Text.NL();
				Text.Add("<i>“Thanks, [playername].”</i>", parse);
				
				terry.relation.IncreaseStat(100, 2);
			}
			Text.NL();
			parse["c"] = terry.FirstCock() ? Text.Parse(", sliding tantalizingly over the [foxvixen]’s prostate with each plunge", parse) : "";
			Text.Add("With Terry ready, you hold onto [hisher] hips for support and start to lean back, drawing your shaft free of the [foxvixen]’s ass with the same smooth, patient movement you used to insert it. You withdraw until only your [cockTip] remains inside, hold that pose for a second, and then push back inside again. With the same gentle rhythm, you pump back and forth, gliding in and out of Terry’s tailhole[c].", parse);
			Text.NL();
			Text.Add("Each time you pump yourself back in, you’re received with a groan as [heshe] does [hisher] best to relax; and each time you pull out, Terry moans and clenches [hisher] butt, trying to keep you inside which results in a nice vacuum that feels almost like [heshe]’s sucking on your cock with [hisher] ass. It’s tough to not throw care to the wind and just do [himher] hard. <i>“More...”</i> [heshe] moans.", parse);
			Text.NL();
			parse["be"] = player.pregHandler.BellySize() > 3 ? Text.Parse(" and [belly]", parse) : "";
			parse["b"] = player.FirstBreastRow().Size() > 1 ? Text.Parse(" your [breasts][be] squishing softly against [hisher] girlish physique,", parse) : "";
			Text.Add("You can’t help but shudder at Terry’s plaintive moan; that’s certainly not helping you keep your resolve about keeping this gentle! Still, you manage to push it down and continue your rhythmic thrusting. To distract yourself, you lean forward until you are resting atop the [foxvixen]’s back,[b] your [nips] rubbing gently against [hisher] soft, downy fur. You playfully flick some of Terry’s mane of red hair out of the way and plant a playful kiss on the back of [hisher] neck.", parse);
			Text.NL();
			Text.Add("<i>“Hmm, that’s nice. Keep going,”</i> the [foxvixen] coos in pleasure.", parse);
			Text.NL();
			Text.Add("[HisHer] wish is your command. Sliding forward on a particularly deep thrust, you lean over Terry’s back, gently maneuvering [hisher] muzzle so you can steal a quick kiss from the [foxvixen]’s lips. Seeing [hisher] ears twitching as you thrust away awakens a playful streak in you, and you teasingly nip at their pointy tips, making Terry giggle and wriggle in response.", parse);
			Text.NL();
			Text.Add("Your hand creeps around onto [hisher] front, reaching for [hisher] [tbreasts]. ", parse);
			if(terry.Cup() >= TerryFlags.Breasts.Acup)
				Text.Add("Your fingers cup [hisher] [tbreasts], feeling the perky orb squish pleasantly. You grope and fondle it for a few moments, then release it, digits returning to their original target. ", parse);
			Text.Add("Terry’s nipples are perky little nubs from the [foxvixen]’s excitement, practically diamond-hard with arousal. You pinch one between thumb and forefinger, tweaking and massaging it. <i>“Ah! Not so rough!”</i> You throw a quick apology and continue your ministrations, careful to be gentle as you listen to Terry’s mewls of pleasure at your assault.", parse);
			if(terry.Lactation())
				Text.Add(" Milk seeps onto your digits at the pressure, dripping to the ground below.", parse);
			Text.NL();
			Text.Add("<i>“If you - ah! - keep doing this, I don’t think I - hmm! - I’m going to last much longer.”</i>", parse);
			Text.NL();
			Text.Add("Smiling, you kiss the back of [hisher] neck again, playfully teasing that [heshe] doesn’t sound unhappy about that. Your fingers trail tantalizing circles around [hisher] swollen nipples, dancing across the areolae before flicking the nubs themselves.", parse);
			Text.NL();
			if(terry.FirstCock()) {
				Text.Add("Remembering the bobbing erection between Terry’s legs, you decide to give [himher] a helpful little extra <i>push</i>... Your other hand winds itself between [hisher] hips, gently stroking the length of throbbing, turgid flesh between. You keep your strokes soft and even; you just want to keep [himher] properly on edge with this, not make [himher] blow [hisher] load just from that.", parse);
				if(terry.HorseCock())
					Text.Add(" That enhanced sensitivity of [hishers] makes it more difficult, but that’s half the fun!", parse);
				Text.NL();
			}
			Text.Add("Lifting your face closer to Terry’s ear, you whisper into it a single, simple word. <i>“Cum.”</i>", parse);
			Text.NL();
			Text.Add("Whether the [foxvixen] thief interprets that as an actual order or not, you don’t know. All that you know is the vice-like tightness of [hisher] ass as [heshe] moans whorishly.", parse);
			if(terry.FirstVag()) {
				parse["b"] = player.HasBalls() ? player.BallsDesc() : player.ThighsDesc();
				Text.Add(" You can feel [hisher] pussy contracting to grip at a phantom member as your [b] are plastered with a squirt of warm feminine juices.", parse);
			}
			if(terry.HorseCock())
				Text.Add(" Terry’s equine endowment throbs in your grasp; you can feel as the massive load being held in [hisher] balls travels up [hisher] shaft to spew forth like from a perverted hose, matting [hisher] [tbreasts], arms and the ground below. You continue to stroke [hisher] cock throughout the orgasm, making it a point to squeeze the large knot that’s formed just at the base, drawing a few extra jets as Terry groans and cries like a slut.", parse);
			else if(terry.FirstCock())
				Text.Add(" Terry’s cock throbs in your grasp. You can feel [hisher] knot inflating as [heshe] spews jet after jet of fox-seed below, emptying [hisher] balls of their liquid load.", parse);
			Text.NL();
			
			var cum = terry.OrgasmCum();
			
			Text.Add("You stop for a moment to admire the shuddering [foxvixen] below you, barely managing to remain on all fours as [hisher] trembling arms and knees threaten to give at any moment. You hug [himher] from behind, supporting [himher] as you turn to give [hisher] cheek a kiss.", parse);
			Text.NL();
			
			retFunc(false);
		}, enabled : true,
		tooltip : Text.Parse("Give it to [himher] smooth and soft; make sure [heshe] enjoys this.", parse)
	});
	options.push({ nameStr : "Rough",
		func : function() {
			Text.Clear();
			Text.Add("Gripping Terry’s hips tightly for extra leverage, you draw your hips back and surge forward, slamming your [cock] right into the [foxvixen]’s tailhole in a single, powerful impact that buries almost half of your length inside of [himher] in that instant.", parse);
			Text.NL();
			
			Sex.Anal(player, terry);
			terry.FuckAnal(terry.Butt(), player.FirstCock(), 4);
			player.Fuck(player.FirstCock(), 4);
			
			if(promise) {
				Text.Add("<i>“Ouch! What the fuck, [playername]!?”</i> Terry protests, wincing in pain. <i>“You promised to be gentle!”</i>", parse);
				Text.NL();
				Text.Add("You nod your head and concede that you did promise that, yes. But you changed your mind, you add unabashedly.", parse);
				Text.NL();
				Text.Add("<i>“Ugh! Great, shows how much I can trust you!”</i> [heshe] chastises.", parse);
				
				terry.relation.DecreaseStat(-100, 10);
			}
			else {
				if(terry.Slut() < 30) {
					Text.Add("The [foxvixen] cries out in pain. <i>“Dammit, [playername]. Can’t you be a little gentler!”</i> [heshe] protests.", parse);
					Text.NL();
					Text.Add("You shake your head; not when an ass as sweet as [hishers] is on the line, you reply. If [heshe] would just loosen up, this would be a lot more enjoyable for the both of you. Still, [heshe] is new at this, you suppose you can give [himher] a moment to adjust...", parse);
				}
				else if(terry.Slut() < 60) {
					Text.Add("Terry cries out in pain. <i>“T-that was quite the entrance. Dammit! At least let me adjust before you screw me raw.”</i>", parse);
					Text.NL();
					Text.Add("Well, it’s hard to hold yourself back when such a sweet ass is there, but you want this to feel good for [himher] too; you assure the [foxvixen] [heshe] can have the time [heshe] needs.", parse);
				}
				else {
					Text.Add("Terry cries out in a mixture of pain and pleasure. <i>“Ah! So rough! Someone is feeling randy,”</i> the [foxvixen] teases.", parse);
					Text.NL();
					Text.Add("As if [heshe] doesn’t love it when you feel this way, you quip back.", parse);
					Text.NL();
					Text.Add("<i>“Maybe I do… but you should still give me time to adjust.”</i>", parse);
					Text.NL();
					Text.Add("Of course, if [heshe] needs it.", parse);
				}
			}
			Text.NL();
			Text.Add("As the moments tick past, you feel Terry’s ass slowly growing more loose, slackening its grip around your [cock] as the [foxvixen] recovers from your initial penetration and relaxes. Once you feel [heshe] is as adjusted as [heshe]’s going to get, you waste no time; holding onto [hisher] hips for balance, you pull back an inch or two and then roughly thrust forward, driving yourself deeper inside. Back a little for energy, then fiercely forward; you pound away at Terry’s butt until you have thrust your way inside of [himher] to the very hilt.", parse);
			Text.NL();
			Text.Add("Terry groans as your hips connect with [hisher] ass, instinctively clenching as you begin to pull out, then relaxing when you push back in. Without realizing it, the two of you have fallen into a brisk yet steady pace. <i>“Hng! H-harder,”</i> the [foxvixen] begs, lust-addled eyes glancing at you over [hisher] shoulder.", parse);
			Text.NL();
			parse["k"] = knotted ? Text.Parse(", your knot stretching [himher] with each penetration, even though it’s not yet swollen enough to tie you together", parse) : "";
			Text.Add("That’s a request you’re hardly inclined to deny; you pick up the pace, your flesh meeting with meaty slaps that make it quite clear what you are doing to any possible listeners. Your [cock] jackhammers the [foxvixen]’s ass, wetly pounding into [himher][k].", parse);
			Text.NL();
			Text.Add("You rut Terry’s ass as if [heshe] were a bitch in heat, but you find yourself frustrated; it’s just not letting you get [himher] done right! Addled by lust, you suddenly pull backwards, sitting up and yanking Terry into your lap. The [foxvixen] yelps in surprise, gasping as your hands move from [hisher] hips to instead hold [hisher] legs by the knees. Letting gravity aid you in your task, you lift [himher] up and roughly slam [hisher] down on your shaft. Terry thrashes in your grasp, whether in protest or enjoyment you can’t tell. [HeShe] tries to speak to you, but all that comes out of [hisher] mouth is a garbled mess of groans, moans, and gasps.", parse);
			Text.NL();
			Text.Add("You decide to silence [himher] by going at it even harder than before, violently bouncing Terry up and down in your lap to give [himher] the hardest fucking you can possibly manage. Obscene noises echo around you, a perverse chorus of fleshy slapping, squelching as your cock slurps through Terry’s pre-filled anus, and the whimpers, mewls and salacious moans of your pleasure delirious fucktoy.", parse);
			Text.NL();
			
			var cum = terry.OrgasmCum();
			
			Text.Add("There is no warning when the [foxvixen]’s butt suddenly clenches, grasping your [cock] mid-thrust. ", parse);
			if(terry.FirstVag()) {
				parse["b"] = player.HasBalls() ? Text.Parse(" and down your [balls]", parse) : "";
				Text.Add("A squirt of juices flows out of [hisher] nethers, painting an obscene trail as [hisher] pussy continues to leak [hisher] pleasure down toward your [cock][b]. ", parse);
			}
			if(terry.FirstCock()) {
				Text.Add("Strands of white shower the two of you as [hisher] cock whips about, spraying [hisher] load as you continue to fuck [himher] despite [hisher] orgasm. ", parse);
			}
			Text.Add("You grin to yourself as you continue to fuck your [foxvixen] through [hisher] climax, even as [heshe] grows slack in your grip, no longer capable, nor willing, to fight you as you use [himher].", parse);
			Text.NL();
			if(p1Cock.isStrapon)
				Text.Add("Even if you’re not actually feeling it yourself, the sight of your pet getting off so hard from your favorite toy is just too precious, spurring you to keep fucking [himher] as hard as you possibly can.", parse);
			else
				Text.Add("You moan with pleasure as Terry’s ass clenches down so wonderfully around your dick, feeling your own orgasm building up inside of you. You fuck as hard as you possibly can, eager to paint Terry’s guts with your seed.", parse);
			Text.NL();
			if(knotted) {
				Text.Add("Finally, your thrusting gets so rough and impatient that you drive your knot completely inside of Terry’s ass, [hisher] tailhole stretching obscenely to swallow it all and tie you both together.", parse);
				Text.NL();
				if(p1Cock.isStrapon) {
					parse["l"] = player.HasLegs() ? "between your legs" : "at your crotch";
					Text.Add("As you unconsciously pull back, you feel something funny happening [l]. With a moment’s thought, you realize that you have been fucking Terry so hard that your dildo has come out of its setting in your strap-on and is now stuck in Terry’s ass!", parse);
					Text.NL();
					Text.Add("Amused and annoyed in equal measure, you shift the [foxvixen] slightly in your lap for better access and try to grab the small stump of dildo jutting from [hisher] anus. Between the shortness of the available grip, and the knot jammed inside of Terry’s butt, it’s a difficult thing to achieve; you pull as hard as you can, twisting and turning this way and that, wriggling it however you can to try and coax it free.", parse);
					Text.NL();
					Text.Add("Up above, Terry is panting in pleasure, moaning tiredly every time you yank. And despite the fact that [heshe]’s pretty much gone slack, [hisher] butt still refuses to let go of your [cock]. You rock [himher] left and right, up and down, as you attempt to wrench the blasted toy out of [hisher] butt. It’s not until you give it a good pull that you manage to drive the dildo out of [himher], the [foxvixen] coming crashing down on you as [heshe] giggles deliriously.", parse);
					Text.NL();
					Text.Add("You put the used toy aside, working to better adjust the pleasure-addled pet in your lap for greater comfort.", parse);
				}
				else {
					var cum = player.OrgasmCum();
					
					Text.Add("The sensation as [hisher] ass sucks your bulb down is the final straw; you arch your back and cry out in your pleasure as your orgasm washes through you, erupting into Terry’s [tanus]. ", parse);
					if(cum > 6) {
						Text.Add("Terry’s stomach practically explodes outward, your [knot] forcing the vast bulk of your inhuman load inside [himher], bloating the [foxvixen] so swiftly and efficiently that you wouldn’t be surprised if some of it came flying out of [hisher] mouth. By the time you finish, Terry is cradling [hisher] beachball of a belly gingerly in [hisher] lap, the sheer pressure making semen seep out around the seal of your knot.", parse);
					}
					else if(cum > 3) {
						Text.Add("Terry moans deliriously as [hisher] stomach expands dramatically, your cascade of semen bloating [himher] like a balloon. When your climax finally ends, Terry looks like [heshe] could give birth any day now.", parse);
					}
					else {
						Text.Add("Thick, hot strands of semen pour into Terry’s colon, your knot ensuring that not a single drop escapes, leaving [himher] looking slightly bloated by the time that you finish.", parse);
					}
					
					TimeStep({hour: 1});
				}
			}
			else { //no knot
				if(p1Cock.isStrapon) {
					Text.Add("As you withdraw from your latest thrust, you feel something strange happening about your nethers. Shifting around slightly, you realize that the sheer vigor of your fucking has loosened your toy and made it pop free of its harness. You don’t think you can fix it properly back in place in your current position... but that doesn’t mean you can’t have a little more fun.", parse);
					Text.NL();
					parse["c"] = terry.FirstCock() ? Text.Parse(" [hisher] prostate and", parse) : "";
					Text.Add("Taking hold of your [cock], you resume the original punishing pace, thrusting it back and forth into Terry’s used ass with all your strength, twisting and turning to better rub against[c] all the most sensitive parts of [hisher] back passage.", parse);
					if(player.FirstVag())
						Text.Add(" With your free hand, you start to frig yourself, panting heavily from stimulation and arousal both as your fingers dance through your folds. Excited as you were from seeing Terry reduced to such a slut for your toy, your body responds well, and you’re certain an orgasm of your own is coming fast.", parse);
					Text.NL();
					Text.Add("Terry is helpless to resist your advances, not that you think [heshe]’d even want to resist at this point. [HeShe]’s giggling like an insensate fool, wiggling [hisher] butt to try and follow your motions. At one point, the [foxvixen] loses [hisher] balance and comes crashing down on you.", parse);
					Text.NL();
					parse["v"] = player.FirstVag() ? " The sudden shudders that ripple through you as your own orgasm hits don’t help." : "";
					Text.Add("The impact nearly knocks you over, and does make you drop the toy you were so busily plumbing [hisher] ass with before.[v] The two of you lie there for the moment, panting for breath, even as you mindlessly adjust Terry in your lap to be a little more comfortable.", parse);
					
					var cum = player.OrgasmCum();
				}
				else {
					Text.Add("You cry out in pleasure as your resistance breaks and orgasm washes through you, fountaining your sperm into Terry’s waiting ass.", parse);
					Text.NL();
					
					var cum = player.OrgasmCum();
					
					if(cum > 6) {
						Text.Add("Seed pours back out over your lap as Terry’s body tries to reject the inhuman flood you are filling [himher] with, but so great is your geyser of semen that [hisher] stomach still bloats like a filled condom, swelling into a huge pregnant-looking swell. Even when you are finished, excess spunk seeping out and smearing your legs, Terry remains bloated like a mother about to give birth.", parse);
					}
					else if(cum > 3) {
						Text.Add("You can see your pet’s stomach growing from the sheer volume of cum you are flooding [hisher] belly with, making Terry groan deliriously from the sensations of being pumped so full. By the time you finish, Terry is left rubbing a heavily pregnant-looking belly, the semen-filled orb dimpling under [hisher] fingers.", parse);
					}
					else {
						Text.Add("Thick and hot, your seed plasters Terry’s [tanus], squelching wetly by the time you are done as you paint it white.", parse);
					}
				}
			}
			Text.NL();
			
			retFunc(true);
		}, enabled : true,
		tooltip : Text.Parse("Fuck that butt good and hard!", parse)
	});
	Gui.SetButtonsFromList(options, false, null);
}

TerryScenes.SexWorship = function() {
	let terry = GAME().terry;
	let player = GAME().player;

	var parse : any = {
		playername : player.name,
		foxvixen   : terry.mfPronoun("fox", "vixen"),
		boygirl    : terry.mfPronoun("boy", "girl"),
		guygirl    : terry.mfPronoun("guy", "girl"),		
	};
	parse = player.ParserTags(parse);
	parse = terry.ParserPronouns(parse);
	parse = terry.ParserTags(parse, "t");
	parse = Text.ParserPlural(parse, player.NumCocks() > 1);
	parse = Text.ParserPlural(parse, player.NumCocks() > 2, "", "2");
	
	parse["stuttername"] = player.name[0] + "-" + player.name;
			
	Text.Clear();
	Text.Add("Your gaze falls upon the long length of mottled-brown horseflesh bobbing between your [foxvixen]’s legs, and a smirk curls your lips. Your hand reaches forward and possessively twines its fingers around the turgid pole, tightening just enough to hold it firm against your palm.", parse);
	Text.NL();
	Text.Add("<i>“Ack! Watch it!”</i> the [foxvixen] gasps in surprise at your sudden lunge. <i>“What are you-”</i>", parse);
	Text.NL();
	Text.Add("A single finger from your free hand pressed firmly against [hisher] lips interrupts the [foxvixen]‘s protests. Looking [himher] firmly in the eye, you tell [himher] a single word, your tone blunt and clear, your expression brooking no argument.", parse);
	Text.NL();
	Text.Add("<i>“Sit.”</i>", parse);
	Text.NL();
	Text.Add("Terry doesn’t protest, [heshe] just looks at you in silence and immediately complies with your command. Your tone commands such obedience that even if the [foxvixen] wasn’t wearing [hisher] collar, [heshe] would have obeyed without question. Using [hisher] hands for support, the [foxvixen] sits down where [heshe] stands, spreading [hisher] legs to allow you access.", parse);
	Text.NL();
	parse["lg"] = player.HasLegs() ? "kneel down" : "lower yourself";
	Text.Add("Smiling, you nod your head in pride, an acknowledgement of what a good [boygirl] [heshe] just was, and [lg] in smooth, graceful motions, every step showing that you are in command. Confident that Terry is yours now, you turn your attention fully to the prize pulsating so warmly in your grip...", parse);
	Text.NL();
	Text.Add("Terry’s cock is a proud pillar of stallionflesh, over a foot long and nearly three inches thick. Your fingers twitch, kneading the sensitive dickmeat you are holding even as your palm begins to rise and fall. With each pass, you squeeze and caress, lovingly milking the [foxvixen]’s prick in a smooth, steady rhythm. Hot, thick pre-cum wells from its blunt tip, Terry whimpering in pleasure as you grope [hisher] sensitive member, the liquid proof of [hisher] arousal slowly drooling down over your digits.", parse);
	Text.NL();
	Text.Add("The scent of [hisher] lust tingles in your nose, a strong and enticing musk that makes you shuffle closer, allowing your [tongue] to slide between your lips. Gently, you flick the very tip of [hisher] cock, short and quick dabs with the tip of your tongue that tickle Terry’s cumslit and let you catch the tantalizing sweet-salt of pre-cum on your flexible organ.", parse);
	Text.NL();
	Text.Add("You spare a glance at Terry to see how well you’re being received by the petite [foxvixen]. [HeShe]’s looking straight at you, lovingly nipping the flared tip of [hisher] member, eyes glazed in lust as [heshe] pants expectantly. Each lick sends a shudder of enjoyment rattling through [hisher] body. It’s good that you made [himher] sit; [hisher] cute little toes are all curled up, and [hisher] legs are shaking so much that you doubt [heshe] would remain upright, if [heshe] was still standing.", parse);
	Text.NL();
	Text.Add("Your tongue ceases playing with the helpless [foxvixen], withdrawing into your mouth as you stop stroking. You gently place your free hand on Terry’s left thigh and softly stroke it, running your fingers through [hisher] soft, fine white fur as you murmur quietly to the [foxvixen]. You exhort [himher] to calm down, to relax; that’s a good [boygirl], [heshe]’s a good [foxvixen]...", parse);
	Text.NL();
	if(terry.Relation() < 30) {
		Text.Add("<i>“Don’t treat me like I’m your - hah! - pet. I’m not… hmm… not...”</i> [heshe] trails off. <i>“L-look, this cock… my cock, is very sensitive. When you keep teasing me like that, it’s really hard for me to keep control. But I’ll try, I guess.”</i>", parse);
		Text.NL();
		Text.Add("You smile pleasantly and nod your approval. It’s more fun playing with [himher] when [heshe] tries not to just give in straight away...", parse);
	}
	else if(terry.Relation() < 60) {
		Text.Add("<i>“Shit, you might as well as have asked me to lift the world. You know how sensitive I am down there. Plus you look incredibly hot when you go down on me like that.”</i>", parse);
		Text.NL();
		Text.Add("Flattery will get [himher] places, you assure the [foxvixen], but if [heshe] can crack jokes, then [heshe] can calm down and give you a chance to really blow [hisher] mind.", parse);
		Text.NL();
		Text.Add("<i>“Okay, I suppose I can try. But no promises,”</i> [heshe] smiles.", parse);
		Text.NL();
		Text.Add("You don’t need them anyway; you know [heshe]’ll come through.", parse);
	}
	else {
		Text.Add("<i>“Tough to calm down when your lover is being so unbelievably hot by going down on you,”</i> the [foxvixen] smirks. <i>“Plus I’m pretty sensitive down there. You should know that.”</i>", parse);
		Text.NL();
		Text.Add("Ignoring the fact [heshe] has a point, you smirk and ask if [heshe]’s saying [heshe]’s too weak to deal with a little pleasure, hmm?", parse);
		Text.NL();
		Text.Add("<i>“Well, maybe <b>I</b> should give you a similar treatment. Let’s see how <b>you</b> hold up when I’m the one in control,”</i> [heshe] pouts.", parse);
		Text.NL();
		Text.Add("You’ll look forward to it, you assure [himher]. But right now, this is supposed to be [hisher] time... and you’re not moving until [heshe] gets [himher]self under control.", parse);
		Text.NL();
		Text.Add("Terry sighs, <i>“You drive a hard bargain, [playername]. But alright, I’ll try.”</i>", parse);
		Text.NL();
		Text.Add("As if you ever doubted [heshe] would.", parse);
	}
	Text.NL();
	Text.Add("Terry closes [hisher] eyes, inhaling and exhaling softly, the trembling slowly ceasing. You pet the [foxvixen]’s thigh in approval, then your head lunges forward. Your tongue’s tip thrusts itself against the tip of Terry’s cock, worming its way into the urethra as best it can and wriggling ticklishly inside [hisher] cumvein before your mouth closes over it. Your fingers slide down Terry’s shaft to caress and knead the churning balls, stroking the fluffy seed factories even as you withdraw your tongue, allowing a great spurt of pre-cum to wash over your lips and into your maw. Wetly, you slurp your mouth off of Terry’s dick, lips sealing [hisher] pre inside, and abandon [hisher] balls to wriggle closer.", parse);
	Text.NL();
	Text.Add("You grind yourself into Terry’s lap, loins to loins. ", parse);
	if(player.FirstCock()) {
		Text.Add("Your [cocks] rub[notS] against the [foxvixen]’s own shaft, flesh throbbing against flesh. You hump and grind, effectively frotting Terry’s equine phallus, feeling the tingle race over your groin - every ridge, every vein on [hisher] stallionhood registering as you clamber up Terry’s body, sending jolts of pleasure coursing through your cock[s].", parse);
	}
	else {
		Text.Add("Your [vag] burns as you rub its folds against Terry’s dick, the thick [foxvixen]-prick spreading you and grinding against you. Your juices drool over the heated flesh, filling you with an ache to properly envelop Terry in your depths, but you force it aside; you have other things in mind. Still, you can’t help but cling to Terry’s hips with your own even as you slide your torso up the length of Terry’s body.", parse);
	}
	Text.NL();
	Text.Add("Face to face with your lover, you thrust your lips against the [foxvixen]’s, pressing your face inescapably against [hishers]. Your lips part and your flexible muscle pushes into Terry’s mouth, allowing you to guide most of the pre-cum filling your maw into [hishers], even if some leaks down over [hisher] chin and out of the corner of [hisher] muzzle. Your [tongue] pushes firmly into [hisher] mouth, trying to pin [hisher] own tongue flat and ensure that your perverse meal is swallowed.", parse);
	Text.NL();
	if(terry.Slut() < 30) {
		Text.Add("Terry’s eyes bulge out in surprise as soon as [heshe] tastes [hisher] own pre. There is a muffled protest as you continue lathering the inside of [hisher] mouth with your helping before you finally break the kiss. A thin strand of pre-cum and saliva links your mouths to one another.", parse);
		Text.NL();
		Text.Add("[HeShe] coughs, spitting a wad of pre. <i>“Yuck! That was gross, [playername]!”</i>", parse);
		Text.NL();
		Text.Add("Ah, Terry; so naive and innocent... you really must do something more about fixing that. You simply grin back at [himher], confident [heshe]’ll eventually come to see things your way.", parse);
	}
	else if(terry.Slut() < 60) {
		Text.Add("Terry gags as soon as [heshe] tastes [himher]self on your tongue. There is a moment of hesitation, but [heshe] quickly recovers and begins kissing you back. You take the opportunity to baste [hisher] mouth with [hisher] own seed. It’s not long before you’ve emptied yourself and break the lip-lock. A thin strand of mixed pre and saliva links your mouth to [hishers]. The [foxvixen] simply looks at you in confusion, unsure of what to do.", parse);
		Text.NL();
		Text.Add("Eyes half-closed, smoldering seductively as they stare into the baffled [foxvixen]’s own, your own [tongue] slides slowly and deliberately from between your lips. You carefully lick the strand of mingled juices clear on your end, curling it purposefully into your mouth. Tilting your head, you swallow loudly, throat visibly flexing as you gulp down the fluid you took, a faint hum of pleasure bubbling up from you.", parse);
		Text.NL();
		Text.Add("Following your lead, the [foxvixen] tilts [hisher] own head back and swallows, smacking [hisher] lips afterward. <i>“...Good?”</i> [heshe] smiles nervously.", parse);
		Text.NL();
		Text.Add("Smiling proudly, you nod your head and confirm that’s very good.", parse);
	}
	else {
		Text.Add("Terry’s arms and legs are around you the moment your lips press to [hishers]. The [foxvixen] is completely unfazed by the taste of [hisher] own cum in your mouth, even as [hisher] own tongue pushes past your lips to help you feed [himher]. You take the opportunity to both explore and lather the inside of the [foxvixen]’s maw, enjoying the act immensely before you finally have to break for a breath of fresh air.", parse);
		Text.NL();
		Text.Add("Your [foxvixen] lover regards you with a smile, opening [hisher] maw to let you see the seed you’ve deposited there. You only have an instant to appreciate the view though as [heshe] quickly closes [hisher] mouth and tips [hisher] head back, an audible gulp signaling the act. Terry whimpers, eyes closed, as if you had just fed [himher] pure ambrosia. Then [heshe] looks at you and licks [hisher] lips, smacking them as [heshe] opens her muzzle so you can see that [heshe] did, indeed, drink everything.", parse);
		Text.NL();
		if(terry.Relation() < 60) {
			Text.Add("<i>“Delicious,”</i> is [hisher] single statement.", parse);
			Text.NL();
			Text.Add("A thrill runs down your spine at your kinky little [foxvixen]; [heshe]’s come a long way since [hisher] days as a blushing virgin. You feel arousal and pride pulse within you, all the more motivated to get back to your oh-so-pleasant task...", parse);
			player.AddLustFraction(0.4);
		}
		else {
			Text.Add("<i>“Hmm, that wasn’t bad. But you know I prefer yours, right?”</i> [heshe] asks, licking [hisher] lips provocatively.", parse);
			Text.NL();
			Text.Add("Shuddering at the spike of desire that suddenly pierces you, your words come out a mere whisper, so husky with lust is your tone, as you quip back that as flattering as you may find that, you think [heshe] looks absolutely irresistible no matter whose juices [heshe]’s sucking down.", parse);
			Text.NL();
			Text.Add("<i>“Then I guess you’ll just have to feed me more,”</i> [heshe] says, licking [hisher] lips again.", parse);
		}
	}
	Text.NL();
	parse["v"] = terry.FirstVag() ? Text.Parse(", mingling with the juices seeping from [hisher] neglected cunt", parse) : "";
	Text.Add("You grind your hips against Terry’s once more, then start to shuffle backwards, lowering your torso down until you are lying sprawled on your belly over Terry’s thighs, the engorged length of [hisher] shaft rising before you like a sacred pillar. The mottled brown has darkened with the blood rushing through it, the un-equine knot at its base bulging in arousal to match the flare of its glans. Pre-cum runs thick and clear like a perverse waterfall down its length, pooling over [hisher] bulging balls[v].", parse);
	Text.NL();
	Text.Add("Lifting your neck slightly, you purse your lips and kiss Terry's cock right on its flat tip, noisily slurping as you dab it with your tongue and let the pre-cum wash into your mouth. You lift your lips again and nuzzle [hisher] flare with the tip of your nose, then oh-so-gently close your teeth around it; just enough to let [himher] feel the pressure, but not enough to bruise the sensitive flesh.", parse);
	Text.NL();
	Text.Add("Your mouth moves down Terry’s cock, noisily smacking and slurping as you alternate kisses and licks, curling your tongue over [hisher] bulging veins and ridges until you reach [hisher] knot, which you start to suckle on, casting your eyes up to see Terry’s reaction.", parse);
	Text.NL();
	if(terry.Relation() < 60)
		Text.Add("<i>“[stuttername], if you keep that up - hng! - I’m gonna blow!”</i> the [foxvixen] cries, fingers digging on the ground as [heshe] tries [hisher] best not to explode.", parse);
	else
		Text.Add("<i>“Lover-[boygirl], if you keep doing - hah! - that, little Terry wo- ooh! - won’t be able to hold back!”</i> the [foxvixen] cries, fingers digging on the ground as [heshe] tries [hisher] best not to blow.", parse);
	Text.NL();
	Text.Add("Whoa, hold it right there! You hold [hisher] cumvein shut with a finger.", parse);
	Text.NL();
	Text.Add("<i>“Ack! D-don’t move so suddenly! Didn’t you hear my warning?”</i>", parse);
	Text.NL();
	Text.Add("Of course you did; that’s precisely why you’re holding this delicious piece of horse-fox meat shut. You’re not going to let [himher] cum without your say-so, you tell [himher] rubbing your fingertip over [hisher] urethra.", parse);
	Text.NL();
	Text.Add("The only reply the [foxvixen] can manage is a moan as [hisher] cock throbs in warning. [HeShe] wasn’t lying when [heshe] said [heshe] was close. Looks like Terry is only hanging in there by a thin line, just about to break… question is, how to push [himher] over? You could give [himher] a nice pasting with [hisher] own juices; you know what a cum fountain this pillar makes [himher] into... on the other hand, you could give yourself a nice hot cumbath instead. Then again, why waste it? Why not let [himher] cum inside you; you’re pretty sure you could take [himher] balls deep before [heshe] blows...", parse);
	Text.Flush();
	
	TimeStep({hour: 1});
	
	//[HoseTerry] [Bukkake] [AnalCatch]
	var options = new Array();
	options.push({ nameStr : "Hose Terry",
		func : function() {
			Text.Clear();
			Text.Add("Your mind made up, you begin by giving [hisher] flare an experimental lick, cleaning up whatever trace of pre happened to be smeared by your prodding digit. It’s all for naught, for as soon as you remove your finger from [hisher] cumslit, a fresh batch of pre-cum begins leaking down [hisher] shaft.", parse);
			Text.NL();
			Text.Add("Extending your [tongue], you follow the trail below, tracing each little detour the guiding stream makes around Terry’s veins. You lick your way down the underside of [hisher] throbbing cock until you finally make contact with [hisher] sheath. Unfortunately, there’s no way you can work your way inside like this, so you settle for the next best thing: Terry’s swollen nuts.", parse);
			Text.NL();
			parse["vag"] = terry.FirstVag() ? ", seeping femjuices basting them from beneath" : "";
			Text.Add("The bulging orbs seem to ripple before your eyes this close up, soaked in pre-cum pooling down over [hisher] stretched sack[vag]. Your tongue glides through soft, velvety fur, tasting them tentatively; salt-sweet from pre-cum, a tinge of sweat, and Terry’s own particular musk roll over your taste buds.", parse);
			Text.NL();
			Text.Add("Unthinkingly, you smack your lips, emboldened by the taste, and extend your tongue to taste more. Around and across, you circle the [foxvixen]’s balls, curling ticklishly through the canyon between [hisher] nuts, feeling every ridge and ripple of flesh and muscle and fur pass under your probing [tongue].", parse);
			Text.NL();
			Text.Add("Worming your tongue under one ball, you jiggle it up off of the ground, leveraging it into your gaping mouth, your lips closing around it as you envelop it as deeply as you can. Tongue slithering back between your jaws, you start to suckle and slurp, the fluid-soaked orb bobbing back and forth under the suction. Your [tongue] caresses it, your teeth gently trailing over the delicate skin, trying to gulp it all the way into your maw.", parse);
			Text.NL();
			Text.Add("After a few moments of futile effort, you release it and slurp the other ball inside your mouth, sucking and slobbering as you redouble your efforts to pull it into your maw, moaning softly in pleasure as you try.", parse);
			Text.NL();
			Text.Add("<i>“Ah! I’m really gonna cum now!”</i> the [foxvixen] warns, thighs closing around your head despite Terry’s best efforts. No, this won’t do. You’re running this show, so Terry’d best mind [hisher] cue. Having said that, your hand immediately flies to grab [hisher] shaft, holding it shut and preventing even a single droplet from escaping. ", parse);
			Text.NL();
			Text.Add("<i>“Dammit, [playername]! Let me cum!”</i> the [foxvixen] protests, hands flying to try and wrestle your grip away. But a quick bat on each from your free hand is enough to remind [himher] of [hisher] place.", parse);
			Text.NL();
			Text.Add("You spread [hisher] thighs apart and look at [himher] sternly in the eyes, <i>“Not yet,”</i> you say. Terry whines, but complies, resting [hisher] hands back on the ground.", parse);
			Text.NL();
			Text.Add("Now that’s better. Gathering some of [hisher] spent pre, you lather your middle finger and press it against the entrance to [hisher] rosebud. A quick press and a cry later, you’re in up to your knuckle. It only takes a bit of wiggling around for you to find Terry’s prostate. All preparations done, you ask if [heshe]’s ready to cum now.", parse);
			Text.NL();
			Text.Add("<i>“I was ready ages ago!”</i>", parse);
			Text.NL();
			Text.Add("Slackening your grip slightly, you lean over and give the side of [hisher] flare a light nip. That’s all it takes to set the [foxvixen] off. [HeShe]’s spurting [hisher] load skywards even before a ripple of throbbing pleasure works its way through [hisher] equine mast. You don’t lose a beat and quickly tilt Terry’s shaft toward [himher]self, letting jet after powerful jet fly off through the air and land on the unsuspecting [foxvixen].", parse);
			Text.NL();
			
			terry.OrgasmCum();
			
			Text.Add("Some of it falls on [hisher] open maw as [heshe] cries out in pleasure, but most of it winds up plastering [hisher] body. To ensure not a single droplet is left behind, you make it a point to press your finger and massage [hisher] prostate, alternating between fingering [himher] and stroking the rock-hard horse-shaft in your hand.", parse);
			Text.NL();
			if(terry.FirstVag()) {
				Text.Add("You feel the distinct splash of [hisher] female half’s juices splattering your arm as you continue to finger the hapless [foxvixen]. Chuckling, you remark to no one in particular that Terry must be in heaven. All the better! You spare a thumb from your fingering hand to grant the clenching pussy something to grip as it continues gushing with the [foxvixen]’s pleasure.", parse);
				Text.NL();
			}
			Text.Add("Terry’s orgasm lasts for a good while, but ultimately it ceases, leaving you with a very creamy, very pleasured [foxvixen]. <i>“D-damn… [playername]...”</i> [heshe] says weakly, still not recovered enough to form a coherent sentence between [hisher] panting gasps.", parse);
			Text.NL();
			Text.Add("Pulling your finger out of [hisher] butt, you heft [hisher] balls. They definitely feel lighter, but it doesn’t look like they’re totally empty just yet… you bet the [foxvixen]’s got another go in [himher].", parse);
			Text.NL();
			Text.Add("<i>“Oh no! Please no! Let… at least let me rest a bit before - Ah!”</i> You silence [himher] by giving [hisher] swollen knot a tug. Shush now, Terry’s done very well, you’re not going to push [himher] - at least not now.", parse);
			Text.NL();
			Text.Add("Terry relaxes at that, and you leave the [foxvixen] to lie on the ground, resting a bit. Gotta say though that after this little session, [heshe] looks like an absolute mess; you oughta help the [foxvixen] clean up since [heshe]’s obviously not up to the task yet. If you don’t clean up all the cream clinging to [hisher] fur before it dries, your pretty fox-[boygirl]’s fur is going to get stained.", parse);
			Text.Flush();
			
			terry.relation.IncreaseStat(35, 1);
			
			TimeStep({hour: 1});
			
			TerryScenes.PCCleansTerry();
		}, enabled : true,
		tooltip : Text.Parse("Give the [foxvixen] a nice basting with [hisher] own semen.", parse)
	});
	options.push({ nameStr : "Bukkake",
		func : function() {
			Text.Clear();
			Text.Add("Decision made, you withdraw your dripping finger and wrap your lips around it, noisily sucking it clean, savoring the taste of your [foxvixen]’s pre-cum as it vanishes down your gullet. Wetly popping your digit free, you bat your eyes up at Terry meaningfully, then wrap your hand around [hisher] pulsating member.", parse);
			Text.NL();
			Text.Add("You can feel [hisher] heartbeat through the shuddering of [hisher] dick in your palms, and you knead the dripping flesh with smooth, rhythmic strokes. You clench and squeeze, releasing to trail your fingers up and down, curling spiraling patterns over [hisher] prick that massage the pre-cum deeper into the overheated cock.", parse);
			Text.NL();
			Text.Add("<i>“[stuttername], I don’t think I - ah! - can hold out any long - oooh! - longer if you keep - hah! - milking me like - Aah! - this!”</i>", parse);
			Text.NL();
			Text.Add("Wriggling closer, your mouth opens and you extend your [tongue] with almost languid ease. Your fingers continue to play and caress with [hisher] dripping stallionhood even as your tongue trails with slow, teasing purposefulness around [hisher] flare, tickling each tiny ridge and bump of flesh.", parse);
			Text.NL();
			Text.Add("Your fingers creep downward, curling themselves under Terry’s pre-soaked balls, jiggling them gently into your palms as your mouth stretches wider to envelop Terry’s flare. Pre-cum flows thick and hot down your throat as you suckle and lap at the dish-like spread of flesh wedged in your maw, thumbs kneading and stroking the bulging cum factories nestled in your hands.", parse);
			Text.NL();
			Text.Add("Overwhelmed by pleasure, Terry involuntarily thrusts into your mouth. [HisHer] fingers and toes dig into the ground. Seems like [heshe]’s gonna blow anytime now... ", parse);
			Text.NL();
			
			var cum = terry.OrgasmCum();
			
			Text.Add("Deeming the [foxvixen] finally stimulated to your liking, you close your eyes and wetly pop your mouth free. A trail of saliva links your gaping lips to [hisher] flaring glans for a moment before [heshe] howls in pleasure and veritably explodes in orgasm.", parse);
			Text.NL();
			Text.Add("You can feel [hisher] balls pulsate in your palms, stretching and then contracting with the force of [hisher] climax barely a second before the first cannon shot of cum splashes into your open mouth. Thick, salty, musky seed washes over your [tongue] and pours down your throat without you even needing to swallow, the excess painting itself over your cheeks and running messily down your chin.", parse);
			Text.NL();
			Text.Add("The warmth of Terry’s seed on your [skin] thrills you, and you instinctively knead [hisher] bulging balls, coaxing a second shot from [himher], a third right on its heels. Gush after gush of semen plasters itself over your face and flows down your gullet, flooding your nostrils with its musk and deluging your taste buds in its distinctive flavor.", parse);
			Text.NL();
			Text.Add("Groaning in ecstasy, you close your mouth and tilt your head up, allowing the cum fountain masquerading as a [foxvixen] to continue basting your body. Warm, sticky, slimy juices spatter against your [breasts], rolling down your body and sliding wetly over your [belly]. ", parse);
			Text.NL();
			Text.Add("Your arms are dripping with seed, abandoning Terry’s nuts unthinkingly as you twist gently back and forth, allowing [himher] to truly bathe you in [hisher] sweet fluids. You feel so warm and right, drenched in Terry’s splooge, surrounding by [hisher] musk... when [heshe] moans, an ululation of release and exhaustion, you groan in disappointment, feeling the last jet of semen patter wetly against your dripping body.", parse);
			Text.NL();
			Text.Add("Gently wiping at your eyelids to clear off the worst of the cum sprayed there, you open your eyes and look Terry in the face, grinning happily as you do so.", parse);
			Text.NL();
			parse["guygirl"] = terry.mfPronoun("guy", "girl");
			Text.Add("The fox simply groans, still delirious after [hisher] fierce orgasm. For a moment, you worry you might’ve broken the poor [guygirl], but after a few prods on [hisher] [tbreasts], [heshe] finally reacts. <i>“Ugh, my balls hurt…”</i>", parse);
			Text.NL();
			Text.Add("Well, considering how much [heshe] came, that’s really not a surprise, you quip. You can’t resist pausing for a moment to admire the deep plastering of off-white now drenching your form, feeling quite satisfied with the results yourself.", parse);
			Text.NL();
			if(terry.Relation() < 30) {
				Text.Add("<i>“Alright then… you got what you wanted… can I go now?”</i> [heshe] asks, already gathering [himher]self up.", parse);
			}
			else if(terry.Relation() < 60) {
				Text.Add("[HisHer] eyes crack open and [heshe] makes a face as soon as [heshe] spots your creamy self. <i>“Whoa, I really did a number on you, didn’t I?”</i>", parse);
				Text.NL();
				Text.Add("[HeShe] most certainly did, you cheerfully inform the [foxvixen]. Who’d have thought all it would take was a horse-juice suppository to turn [himher] into such a productive little cum fountain?", parse);
				Text.NL();
				Text.Add("<i>“Well, that’s your damn fault. I wouldn’t have this if you hadn’t insisted I get it...”</i> [heshe] looks away, trying to look hurt.", parse);
				Text.NL();
				Text.Add("Try as [heshe] might, you can see the [foxvixen]’s tail is waving back and forth with slow, gentle swishes. With a soft chuckle, you smirkingly ask if that’s <b>really</b> how [heshe] feels.", parse);
				Text.NL();
				Text.Add("<i>“...Well, okay. I admit it feels pretty good. Still, it can be a bit difficult to work around sometimes,”</i> [heshe] notes.", parse);
				Text.NL();
				Text.Add("Maybe that’s true... still, you ask, does the [foxvixen] really think it wasn’t worth it.", parse);
				Text.NL();
				Text.Add("<i>“I guess it was worth it, all things considered...”</i> [heshe] takes a deep breath. <i>“Well, I suppose I am responsible for all that mess,”</i> [heshe] starts, pointing at you. <i>“Want me to help you clean up?”</i>", parse);
			}
			else {
				Text.Add("<i>“Well, they’d hurt a lot less if <b>someone</b> didn’t keep abusing them,”</i> [heshe] pouts, looking accusingly at you. ", parse);
				Text.NL();
				Text.Add("Poor baby; would [heshe] like you to kiss them better, you suggest, grinning innocently at the exhausted [foxvixen]. You’d be happy to if [heshe] asked...", parse);
				Text.NL();
				Text.Add("<i>“I’d ask, but then I don’t trust you not to turn this into something more than a kiss, ya big perv,”</i> [heshe] replies with a smirk.", parse);
				Text.NL();
				Text.Add("[HeShe] just knows you too well, you agree, laughing at how right the [foxvixen] is.", parse);
				Text.NL();
				Text.Add("<i>“Honestly, I’m surprised my eating habits haven’t changed, considering the amount of seed you drain from me each time.”</i>", parse);
				Text.NL();
				Text.Add("Teasingly, you assure the [foxvixen] that if [heshe] wants you to start making meals for [himher], all [heshe] needs to do is just say so.", parse);
				Text.NL();
				if(GAME().momo.IsFollower()) {
					Text.Add("<i>“With Momo around? No offense, but as good a cook as you may be, love, I don’t think you can beat a professional chef,”</i> [heshe] chuckles.", parse);
					Text.NL();
					Text.Add("Maybe not, you agree, but your cooking would certainly have an... investment... that hers wouldn’t.", parse);
					Text.NL();
					Text.Add("Terry rolls [hisher] eyes. <i>“Of course there’d be strings attached… perv.”</i>", parse);
				}
				else {
					Text.Add("<i>“Do I even have to ask? Isn’t it supposed to be your duty to keep me pampered and cared for?”</i>", parse);
					Text.NL();
					Text.Add("That’s true - you have been neglecting your duty there, too. You beg the [foxvixen] to have mercy on you and forgive your negligence.", parse);
					Text.NL();
					Text.Add("<i>“Hmm… I might if you bend over and ask real nice sometime later,”</i> [heshe] says teasingly. <i>“But right now, I’m too tired to try and ‘forgive’ you.”</i>", parse);
					Text.NL();
					Text.Add("You promise [himher] that you’ll keep it in mind and offer a proper apology when [heshe]’s not so tired, grinning as you do.", parse);
				}
				Text.NL();
				Text.Add("The [foxvixen] eyes up and down with interest. <i>“You know... as good as you look with the whole creamy motif, maybe you’d want to get clean? Maybe with my help?”</i>", parse);
			}
			Text.Flush();
			
			TimeStep({hour: 1});
			
			TerryScenes.TCleansPC();
		}, enabled : true,
		tooltip : Text.Parse("Let [himher] cum all over you.", parse)
	});
	options.push({ nameStr : "Anal catch",
		func : function() {
			Text.Clear();
			Text.Add("Trusting Terry won’t explode this very second, you let go of [hisher] throbbing stallionhood and glide in closer, straddling the [foxvixen]’s hips.", parse);
			Text.NL();
			Text.Add("<i>“Huh? What are y- Ah!”</i> the [foxvixen] cries out in pleasure as [heshe] feels your [butt] descend upon [hisher] pole of horse-meat, its flat tip nestling your [anus].", parse);
			Text.NL();
			Text.Add("Teasingly, you grind your [anus] against Terry’s half-flared tip, letting [himher] feel the heat washing over [hisher] glans as you prepare yourself. Then, lifting yourself up, you thrust back down, deliberately impaling yourself on the throbbing horse-cock.", parse);
			Text.NL();
			
			Sex.Anal(terry, player);
			player.FuckAnal(player.Butt(), terry.FirstCock(), 3);
			terry.Fuck(terry.FirstCock(), 3);
			
			Text.Add("You force yourself down [hisher] length until maybe half of it sits inside you, feeling it pulse and throb in time with the [foxvixen]’s heartbeat. You pant softly with the effort, eyes flicking to Terry’s face to see how [heshe]’s feeling in response to this.", parse);
			Text.NL();
			Text.Add("The [foxvixen]’s face is contorted in ecstasy. A whimper escapes [himher] as it grows until it finally becomes a deep-throated moan. [HisHer] tail is standing up, fluffy fur bristled as you overwhelm [hisher] senses with pleasure.", parse);
			Text.NL();
			Text.Add("Smiling, you reach out and gently pet Terry’s cheek, then resume sinking deeper and deeper down upon [hisher] shaft. Inch after inch of delicious fuckmeat spears into your ass, and you arch your back at the sensations they elicit inside of you. You moan as you feel the distinctive bulge of the [foxvixen]’s knot pressing against your rear. For a moment, you consider what you should do... but the answer is obvious.", parse);
			Text.NL();
			Text.Add("Gritting your teeth, holding onto Terry’s shoulders for support, you force yourself down upon [hisher] knot, your abused ass stretching madly to try and cope with the feel of it. Finally, with a cry of effort, you feel it squeeze inside of you, sucked into your hole and expanding to anchor the two of you together, leaving you well and truly tied.", parse);
			Text.NL();
			Text.Add("Terry cries out as [heshe] throbs inside you, [hisher] knot growing as big as it can. You feel [hisher] balls churn, almost vibrating with the effort of pumping all of [hisher] load up [hisher] footlong mast. The last signal you get is [hisher] tip flaring out as a veritable eruption of fox-seed heralds Terry’s climax.", parse);
			Text.NL();
			
			var cum = terry.OrgasmCum();
			
			TerryScenes.Impregnate(player, terry, cum, PregnancyHandler.Slot.Butt);
			
			Text.Add("Stretched to the fullest, you shudder, arching your back as you feel the [foxvixen]’s seed roaring into your guts like a perverse volcano. You can practically feel the first wave of semen slapping against your stomach wall, your gut bulging from the liquid cannon shot you have taken, before Terry fires again, and then again. Gush after jet after spurt cascades inside you, Terry’s knot sealing your ass and ensuring it has nowhere to go but up and in. Your belly bloats obscenely, a perverse parody of pregnancy, slapping heavily into Terry’s own belly as you just keep growing, and growing...", parse);
			Text.NL();
			Text.Add("Finally - mercifully - Terry’s howl dies away into exhausted panting as [hisher] vul-quine seed factories deplete themselves, leaving the two of you cradling a belly that looks pregnant with a whole litter of Terry’s pups. Your stomach gurgles and you stifle a belch, tasting cum on the back of your tongue.", parse);
			Text.NL();
			Text.Add("The [foxvixen] pants below you, trying [hisher] best to catch [hisher] breath after this mind-breaking orgasm. When [heshe] finally does, you don’t miss the smile of relief in [hisher] face. Still not quite recovered, [heshe] gives a few experimental humps, trying to pull out. <i>“Huh? We’re tied?”</i>", parse);
			Text.NL();
			Text.Add("Moaning softly as [hisher] efforts twist the bulging flesh stretching your tired pucker, you nod your head and assure [himher] that you are well and truly tied.", parse);
			Text.NL();
			if(terry.Relation() < 30) {
				Text.Add("<i>“Great, now I’m going to be stuck to you for a while,”</i> [heshe] sighs.", parse);
				Text.NL();
				Text.Add("Oh, as if [heshe] had anywhere better to be than here knot-deep in your ass...", parse);
				Text.NL();
				Text.Add("<i>“Doesn’t mean I wouldn’t rather be somewhere else,”</i> [heshe] adds with a pout.", parse);
			}
			else if(terry.Relation() < 60) {
				Text.Add("<i>“I guess this means we’re going to be here for a while. Not that I mind,”</i> [heshe] adds, smiling.", parse);
				Text.NL();
				Text.Add("With a matching grin, you assure the [foxvixen] that you’re certainly not complaining either, reaching out a hand and tenderly stroking [hisher] cheek.", parse);
			}
			else {
				Text.Add("<i>“For what it’s worth, there’s no one else I’d rather be stuck with,”</i> [heshe] grins.", parse);
				Text.NL();
				Text.Add("Tenderly, you kiss your [foxvixen] on the lips, holding [himher] by them before gently breaking away and looking into [hisher] eyes as you assert that you feel the same way.", parse);
			}
			Text.NL();
			
			var cock = player.BiggestCock();
			
			if(cock && (cock.length.Get() > 30) && (terry.Slut() + terry.Relation() >= 90)) { //30cm ~ 1 foot
				Text.Add("The two of you sit in silence for a while, but eventually the [foxvixen] eyes settles on[oneof] your [cocks].", parse);
				Text.NL();
				Text.Add("Following Terry’s gaze, you fight a smile off your lips, asking with feigned innocence if there’s something wrong with your dick.", parse);
				Text.NL();
				Text.Add("[HeShe] chuckles at your question. <i>“No, nothing wrong. It’s just that you look pretty hard right now, and you did make me lose a <b>lot</b> of protein just now. So I was wondering if you wanted me to take care of that and have a little snack while I do it,”</i> [heshe] says, licking [hisher] lips. <i>“After all, you’re so big. And that looks so juicy,”</i> [heshe] adds with a grin.", parse);
				Text.NL();
				Text.Add("As if in thought, you tap a finger slowly against your lips, but the truth is it’s just a little show for Terry’s sake. Feeling your aching need burning against the fluid-crammed swell of your gut is more than enough to convince you to accept the [foxvixen]’s oh-so-generous offer.", parse);
				Text.NL();
				Text.Add("Smiling toothily, you assure Terry that if [heshe] can reach it, [heshe] can suck it as much as [heshe] wants. You assure [himher] you’d be more than happy to do your best at returning the favor [heshe] just gave you, tapping your belly for emphasis.", parse);
				Text.NL();
				Text.Add("<i>“Hehe, sounds like a deal.”</i> [HeShe] takes your [cock] and pulls it down, toward [himher]self. ", parse);
				if(terry.Cup() >= TerryFlags.Breasts.Ccup) {
					Text.Add("[HeShe] squeezes [hisher] boobs, trapping your shaft in [hisher] cleavage. <i>“Whaddya know... these came in handy,”</i> [heshe] says with a grin, rubbing along your length with [hisher] pillowy breastflesh.", parse);
					Text.NL();
					Text.Add("Feeling the warm, soft, fluffy flesh enveloping your sensitive shaft, you can’t hold back a moan of pleasure, arching your back as best you can. You wriggle a little in Terry’s lap, sending sparks surging up your spine as you stimulate the nerves in your ass. Panting softly, you can’t help but loudly agree that Terry is right; [hisher] breasts really do come in handy for things like this.", parse);
					Text.NL();
					Text.Add("<i>“I’m glad you agree,”</i> [heshe] says, continuing to rub your [cock] with [hisher] breasts.", parse);
					if(terry.Lactation()) {
						Text.Add(" Some of the [foxvixen]'s tasty milk leaks from [hisher] engorged nipples to add a pleasant layer of creamy moisture to Terry’s impromptu boobjob.", parse);
					}
					Text.NL();
					Text.Add("You are in heaven, feeling the soft fur and the just-rightly squishy titflesh sweeping back and forth along your shaft. Your moan of pleasure changes in mid-groan to one of query and disappointment when, just as you are truly starting to enjoy [hisher] efforts, [heshe] stops. Unthinkingly, you ask [himher] why [heshe] stopped.", parse);
					Text.NL();
					Text.Add("<i>“Let’s not get ahead of ourselves, shall we? Wouldn’t want you wasting your precious cargo on my face.”</i> [HeShe] winks.", parse);
				}
				Text.NL();
				Text.Add("The [foxvixen] leans in and closes [hisher] eyes, smelling your musk and heady scent. <i>“Smells good enough to eat,”</i> [heshe] remarks. <i>“But I think I’ll take it slow.”</i> [HeShe] extends [hisher] tongue, gently lapping around your [cockTip].", parse);
				Text.NL();
				Text.Add("A soft coo of desire wells unabashedly from your throat, shifting slightly in response to the gentle, tantalizing tongue-flicks that the [foxvixen] is raining upon your glans. Pleasure races under your skin, crackling through your mind, and you find it harder to think.", parse);
				Text.NL();
				Text.Add("It’s an effort to get the words out, but you manage to gasp to Terry that [heshe] doesn’t need to hold back on your account. [HeShe] just used up a lot of protein - [heshe] must be starving, after all...", parse);
				Text.NL();
				Text.Add("<i>“Yes, I am, but I’m a bad [boygirl]. And I like playing with my food,”</i> [heshe] giggles, giving a peck on your [cockTip], some pre sticking to [hisher] nose before [heshe] laps it off.", parse);
				Text.NL();
				Text.Add("You sigh heavily in anguish that isn’t entirely feigned for Terry’s benefit. With an exaggeratedly grudging tone, you concede that you can’t stop [himher], so if [heshe]’s going to play with [hisher] food, that’s [hisher] choice. But you warn [himher] that if [heshe] spends too long playing, [heshe] may end up with a bath instead of a meal...", parse);
				Text.NL();
				parse["mastermistress"] = player.mfTrue("master", "mistress");
				Text.Add("<i>“Oh, I wouldn’t worry about that. You trained me well, and I can tell when you’re just about to peak. Isn’t that right, [mastermistress]?”</i> [heshe] asks teasingly, licking your urethra with the very tip of [hisher] tongue.", parse);
				Text.NL();
				Text.Add("Your whole body shudders at the touch, a moan spilling unconsciously from your throat. That’s true, you have trained [himher] as best you can... now, let’s see just how well you did... Stiffening yourself as best you can, you tell Terry that [heshe] can play all [heshe] wants, now. This time, [heshe]’s in charge.", parse);
				Text.NL();
				parse["br"] = terry.Cup() >= TerryFlags.Breasts.Ccup ? "breasts" : "hands";
				Text.Add("<i>“You mean I’m not always? Just joking,”</i> [heshe] laughs. <i>“Alright then, I’m going to milk you good.”</i> Finally, [heshe] engulfs your length in [hisher] warm maw. Terry wastes no time, and begins sucking on as much of your [cock] as [heshe] can get to. [HisHer] [br] stroking along the remainder of your shaft.", parse);
				Text.NL();
				parse["k"] = cock.knot != 0 ? " and your knot" : "";
				Text.Add("Your eyes sink closed and you cry out softly in bliss at the [foxvixen]’s expert ministrations. Warm wetness envelops the key parts of your cock, the stroking against the very base of your shaft[k] merely highlighting the pleasure of [hisher] lips and tongue. ", parse);
				Text.NL();
				Text.Add("The hot, wet flesh strokes and caresses you, teasing your [cockTip] and undulating against the underside of your shaft. Sparks of pleasure crackle along your nerves, like a lightning storm inside your brain, and you mindlessly thrust your hips as best you can with Terry’s knot anchoring your ass in place.", parse);
				Text.NL();
				Text.Add("Gasping in pleasure, you mindlessly babble compliments on Terry’s skill; [heshe]’s come such a long way from the prudish near-virgin [heshe] was before...", parse);
				Text.NL();
				Text.Add("The [foxvixen] hums, not being capable of replying with [hisher] muzzle so full of cock. Vibrations course throughout your member, and you can feel [hisher] tongue caressing your glans. You can feel [himher] circling your [cockTip], finally peaking when [heshe] finds your cumvein dribbling with spent pre. [HeShe] gives you a muffled chuckle and pushes [hisher] tongue against your urethra, trying to lick inside.", parse);
				Text.NL();
				Text.Add("You were on thin ice already, but this final perverse trick of Terry’s is all you can take. Arching your back, anus squeezing down viciously on Terry’s knot in orgasmic bliss, your whole body shudders as you climax, exploding into the [foxvixen]’s mouth with a cry of pleasure.", parse);
				Text.NL();
				
				var cum = player.OrgasmCum();
				
				var CumCoat = {
					None  : 0,
					Gut   : 1,
					Cummy : 2
				};
				var cumCoat = CumCoat.None;
				
				if(cum > 6) {
					Text.Add("Your seed erupts from your shaft like a perverse volcano, a cascade of salty goo pouring down Terry’s hungry gullet. Bravely, [heshe] sucks and slurps, swallowing each cheek-bulging mouthful as it comes, [hisher] belly thrusting itself boldly into your own as it stretches over your titanic output. ", parse);
					Text.NL();
					Text.Add("Your [cock] is sandwiched between your bulging bellies, the cream-crammed flesh wrapping itself with delicious softness around the heated flesh of your shaft. But you just keep on cumming, and cumming; Terry can’t keep up!", parse);
					Text.NL();
					Text.Add("Eventually, the pouring tide of semen bloats Terry to the point [hisher] own belly shoves your dick out of [hisher] mouth, and you’re still cumming! All the [foxvixen] can do is close [hisher] eyes, open [hisher] mouth, and let the thick jets of warm seed paint [hisher] face cum-white. Great ropes of semen bead through [hisher] luscious red mane, washing over [hisher] cheeks, pouring down onto [hisher] [tbreasts], even flicking a few ropes between [hisher] ears.", parse);
					Text.NL();
					Text.Add("Finally, though, you groan your way to the end of your climax, a single last dribble of cum spattering wetly across the [foxvixen]’s nose before you fall limp. Bellies sloshing with their mutual loads, you slump forward against the newly bloated [foxvixen], panting for breath.", parse);
					Text.NL();
					Text.Add("Terry licks some of your cum out of [hisher] nose, giggling shortly after. <i>“As productive as always,”</i> [heshe] remarks teasingly.", parse);
					Text.NL();
					Text.Add("With a half-grin, you concede that you are... but then, it’s not as if Terry’s much of a slouch in the cum department either, and you drum your fingertips on your own swollen stomach as a reminder. You shift slightly atop Terry’s hips, moaning quietly as you feel [hisher] knot grinding against your walls, the twin seed bloated orbs of your bellies still sandwiching your sensitive prick-flesh.", parse);
					Text.NL();
					Text.Add("<i>“True, but that’s also your fault,”</i> [heshe] teases. <i>“Did you really have to give me a facepaint though? Now I’ll need another bath...”</i> [heshe] sighs.", parse);
					Text.NL();
					Text.Add("You apologize, but insist you couldn’t help it; Terry just did too good a job for you to hold it back at all. But if it’ll make [himher] feel better, you’d be happy to wash [himher] down in the bathroom once [heshe] unknots you...", parse);
					Text.NL();
					parse["mistermiss"] = player.mfTrue("mister", "miss");
					Text.Add("<i>“Sounds like a deal, just make sure to keep your hands to yourself [mistermiss]. No mischief in the bath - I need to get cleaner, not dirtier.”</i>", parse);
					Text.NL();
					Text.Add("Grinning, you tell Terry that you can’t make any promises there. Yawning softly, you snuggle up to [himher] as best you can given your present state, closing your eyes and allowing yourself to drift off into the contented slumber of the fucked senseless.", parse);
					cumCoat = CumCoat.Cummy;
				}
				else if(cum > 3) {
					Text.Add("Your cock fires cum like a liquid cannonball, but your brave vulpine slut neatly swallows each cheek-bulging load. Wetly, [heshe] gulps and slurps, the cascade of thick, rich semen pouring down [hisher] throat and into the increasingly tight confines of [hisher] belly. With each mouthful [heshe] swallows, you can feel [hisher] stomach growing rounder and fuller, pushing back against your dick and pressing it against the sperm stuffed fullness of your own.", parse);
					Text.NL();
					Text.Add("By the time you groan and dribble your last shot of semen into Terry’s waiting mouth, your [cock] is well and truly sandwiched between your two bloated bellies. Each shift and wriggle that either of you makes sends soft flesh brushing gently across its sensitive length, ensuring you remain half-erect even despite your tired state.", parse);
					Text.NL();
					Text.Add("<i>“Plentiful as usual. That should compensate for all the seed you’ve made me spill.”</i>", parse);
					Text.NL();
					Text.Add("Feigning wounded pride, you reply that [heshe] should expect nothing less. Curiously, you eye your mutual bulges, reaching out to gently stroke what parts of Terry’s soft, fur-covered roundness you can reach, looking thoughtful as you do. Finally, you give [himher] a gentle pat and declare that you think Terry put out more than you did, grinning as you do.", parse);
					Text.NL();
					Text.Add("<i>“Guess you’ll have to make up to me later then,”</i> [heshe] suggests with a smile.", parse);
					Text.NL();
					Text.Add("Teasingly, you wonder aloud just what Terry might mean by ‘making it up to [himher]’. You chuckle softly, but then yawn softly, your body demanding rest after the experience you just put it through.", parse);
					Text.NL();
					Text.Add("<i>“You know what I’m talking about, you huge perv. Now, since you’re tired too, how about a snuggle and a nap? I think we’ll both need some time to digest all this. Plus I can’t pull out of you just yet.”</i>", parse);
					Text.NL();
					Text.Add("That sounds like a good idea to you. Sleepily nodding your head, you wriggle a little to see if you can coax your cock out from between your stomachs. When it fails to budge, you decide to put up with it; you’re too tired to do anything more. Gently, you settle against your equally bloated partner and close your eyes, drifting off to a warm and enticing slumber.", parse);
					cumCoat = CumCoat.Gut;
				}
				else {
					Text.Add("Like the expert little cocksucker [heshe] is, Terry neatly fields every spurt and dribble of cum that your dick puts forth. Even as you quiver and shake your way through your climax, the liquid leavings of your pleasure disappear down [hisher] throat like water down a drain, swallowed with nary a hiccup. When you finally finish, Terry’s tongue runs itself teasingly along your glans, cleaning off the last remaining smears of semen with a final bit of suction before [heshe] wetly pops [hisher] mouth free.", parse);
					Text.NL();
					Text.Add("<i>“Creamy and tasty - just how I like it,”</i> [heshe] grins.", parse);
					Text.NL();
					Text.Add("You can’t resist quipping back that you always aim to please; you know Terry’s favorite flavor, after all. You choke back a yawn, feeling the fatigue crashing down upon you.", parse);
					Text.NL();
					Text.Add("<i>“Sure you do. Now, since you’re probably as tired as I am, how about we snuggle for a short nap? It’ll be a while before I can pull out, especially if you - oh! - keep squeezing on me like that.”</i>", parse);
					Text.NL();
					Text.Add("Blinking your eyes sleepily, you nod your head; that sounds like a good idea to you. As best you can with your stomach in the way, you snuggle closer to Terry and allow your eyes to sink closed, eagerly drifting off to sleep.", parse);
				}
				Text.NL();
				Text.Add("Eventually, you woke up to find Terry’s member limping but still embedded inside your [anus]. Pulling away prompted the [foxvixen]’s awakening, followed by a stream of fox-seed leaking from your butt. That was quite a mess.", parse);
				Text.NL();
				if(terry.Relation() + terry.Slut() >= 90) {
					Text.Add("Naturally, being the helpful little pet [heshe] is, Terry offered to help you clean up… with [hisher] tongue. [HeShe] made sure to lick everything, even giving you a rimjob to ensure [heshe]’s got everything. ", parse);
				}
				else {
					Text.Add("Thankfully, a few towels is all you needed to deal with that.", parse);
				}
				Text.NL();
				if(cumCoat == CumCoat.Cummy) {
					Text.Add("This brings you to the present... there’s the little matter of your promise to help Terry wash all of the now-gummy, sticky cum matting [hisher] crimson hair out of [hisher] mane.", parse);
					Text.NL();
					Text.Add("<i>“Alright, just remember to stay focused. Knowing you, I bet you’re going to be getting all grabby with me, and I don’t need another layer of [playername] on me to clean up later,”</i> [heshe] teases with a grin.", parse);
					Text.NL();
					Text.Add("Smirking back, you promise [himher] that you’ll do your best, so long as [heshe] remembers to keep the flirting down. It’s not your fault [heshe]’s such a tease, always begging you to bend [himher] over and make [himher] all dirty again...", parse);
					Text.NL();
					Text.Add("<i>“Hey, I don’t do that!”</i> [heshe] protests. <i>“At least not all the time,”</i> [heshe] adds with a smirk. <i>“Let’s go then - we need to get you cleaned up too.”</i> Terry comes up to you, gives your [butt] a smack and dashes away.", parse);
					Text.NL();
					Text.Add("With a cheerful grin and a light toss of your head, you hurry after the [foxvixen], racing to catch up.", parse);
					Text.Flush();
					
					TimeStep({hour: 3});
					Gui.NextPrompt();
					return;
				}
				else if(cumCoat == CumCoat.Gut) {
					parse["rel"] = (terry.Relation() + terry.Slut() >= 90) ? " and Terry’s kinky tongue" : "";
					Text.Add("Even though gravity[rel] have cleaned out your bowels some, you are still sporting quite a belly. Of course, so is the [foxvixen] who gave you your belly. Playfully, you look back and forth between your two semen stuffed swells, visibly comparing them, before announcing that you’re fairly sure Terry’s bigger than you, now.", parse);
					Text.NL();
					parse["mistermiss"] = player.mfTrue("mister", "miss");
					Text.Add("<i>“Give me a break. It’s not like I can drain myself like you, [mistermiss] leaky faucet.”</i>", parse);
					Text.NL();
					Text.Add("With a cheeky grin, you concede [heshe] has a point. Luckily for [himher], it’s not only [hisher] favorite treat, it’s also good for [himher], right?", parse);
					Text.NL();
					Text.Add("<i>“Gotta take back all that I gave you somehow, otherwise you’re going to wind up killing me,”</i> [heshe] says with a grin.", parse);
					Text.NL();
					parse["foxyvixen"] = terry.mfPronoun("foxy", "vixen");
					Text.Add("You’re happy to give it back anytime. As for killing [himher], you’d never do that because you wouldn’t have a pretty [foxyvixen] to drain anymore.", parse);
					Text.NL();
					Text.Add("<i>“That’s true, so you’d better take good care of me.”</i>", parse);
					Text.NL();
					Text.Add("Better than you do?", parse);
					Text.NL();
					Text.Add("<i>“Always room for improvement,”</i> [heshe] giggles.", parse);
					Text.NL();
					Text.Add("Finished dressing up, you collect your belongings and leave with Terry in tow.", parse);
				}
				else {
					Text.Add("No longer anchored together, you take a few moments to shake the last stiffness out of your joints and start getting your gear together, casting the occasional glance in Terry’s direction as the [foxvixen] pulls [hisher] own gear on. Once the two of you are properly attired, you offer [himher] the lead and follow the nimble vulpine back in the way you came.", parse);
				}
			}
			else {
				if(terry.Relation() < 30) {
					Text.Add("The two of you sit in silence, neither breaking the ice. Eventually, Terry yawns. Seems like you wore the poor [guygirl] out. Well, since you’re not going anywhere for a while, you might as well try and be nice; with your warmest smile, you ask if Terry would like to get some sleep whilst [heshe]’s waiting for [hisher] knot to go down.", parse);
					Text.NL();
					Text.Add("<i>“I guess I wouldn’t mind a nap. Not like I have anything better to do...”</i>", parse);
					Text.NL();
					Text.Add("As soon as the [foxvixen] agrees, your arms sweep out and hug [himher] to your chest, shifting your center of gravity to bring the two of you toppling onto the ground in a controlled crash. Once down, you waste no time in snuggling up to the startled [foxvixen], resting your head comfortably against [hisher] own luscious red mane, filling your nostrils with the sweet scent of [hisher] shampoo. Smiling happily, you wish [himher] a good sleep.", parse);
					Text.NL();
					Text.Add("[HeShe] looks a bit flustered at first, but quickly calms down, accepting your embrace. <i>“Umm, right. Good night,”</i> [heshe] says, letting [hisher] eyes shut.", parse);
				}
				else {
					Text.Add("The two of you sit in silent contemplation for some time. Eventually, Terry decides to break the ice. <i>“So, how’s it going up there?”</i> [heshe] asks, resting [hisher] head on [hisher] hands.", parse);
					Text.NL();
					Text.Add("Cheerfully, you reply that it’s going pretty good; you have over a foot of juicy, thick horsecock jammed up your ass and a tasty knot keeping it stuck there. For emphasis, you squeeze down with your anal muscles, grinning at the soft gasp that escapes the [foxvixen]’s lips.", parse);
					Text.NL();
					Text.Add("Casually, you add that you’d ask how [heshe]’s going down there, but it seems a bit redundant, given the earth-shattering orgasm [heshe] evidently just had. Playfully, you drum your fingers atop the mammoth roundness of your jism-packed belly.", parse);
					Text.NL();
					Text.Add("<i>“Yeah, I’m a bit tired. So, how about we snuggle and nod off for a bit? Just until my knot’s small enough to slip out of your tasty rump,”</i> [heshe] suggests with a smile.", parse);
					Text.NL();
					Text.Add("Smiling, you gently reach out and twine your arms around the [foxvixen]’s neck, tenderly bringing [hisher] head close enough that you can rest it on your shoulder. Conversationally, you tell Terry that sounds like a wonderful idea to you, lightly resting your own cheek against [hishers] and letting your eyes close.", parse);
					Text.NL();
					Text.Add("<i>“Yeah, that’s just who I am. Full of bright ideas. Good night,”</i> [heshe] says, giving your cheek a peck and closing [hisher] eyes for some much needed rest.", parse);
				}
				terry.relation.IncreaseStat(45, 2);
				TimeStep({hour: 1});
			}
			Text.Flush();
			
			TimeStep({hour: 1});
			
			Gui.NextPrompt();
		}, enabled : true,
		tooltip : Text.Parse("Stuff your butt with Terry’s cock and give it a proper sleeve to empty itself into.", parse)
	});
	Gui.SetButtonsFromList(options, false, null);
}

// Clean Terry Up Entry Point
TerryScenes.PCCleansTerry = function(func : any, opts : any) {
	let terry = GAME().terry;
	let player = GAME().player;

	var parse : any = {
		playername : player.name,
		foxvixen   : terry.mfPronoun("fox", "vixen"),		
	};
	parse = player.ParserTags(parse);
	parse = terry.ParserPronouns(parse);
	parse = terry.ParserTags(parse, "t");
	parse = Text.ParserPlural(parse, player.NumCocks() > 1);
	parse = Text.ParserPlural(parse, player.NumCocks() > 2, "", "2");
	
	opts = opts || {};
	func = func || function(opts : any) {
		Text.Flush();
		Gui.NextPrompt();
	};
	
	//[Towel][Lick Clean]
	var options = new Array();
	options.push({ nameStr : "Towel",
		func : function() {
			Text.Clear();
			parse["kn"] = player.HasLegs() ? "kneel" : "lower yourself";
			Text.Add("Clambering back upright, you tell Terry to wait for a second. The semen dripping [foxvixen] mumbles an idle agreement and waves a hand even as you wander off to find a towel. Once you have what you need, you [kn] beside Terry and wrap the cloth around [hisher] head, rubbing [hisher] ears and flowing mane of red hair to try and wipe away the worst of the jets that splattered this high, then start stroking at [hisher] face to clean it away.", parse);
			Text.NL();
			Text.Add("The [foxvixen] mutters some muffled protest as you rub [hisher] face clean, but you doubt it was anything important… so you decide to ignore it for now and continue to wipe down Terry.", parse);
			Text.NL();
			Text.Add("Judging Terry’s head to be sufficiently clean, you move down [hisher] neck toward [hisher] chest where the bulk of [hisher] ejaculate is smeared. ", parse);
			if(terry.Cup() >= TerryFlags.Breasts.Dcup) {
				parse["milk"] = terry.Lactation() ? ", making milk seep out to further stain your towel" : "";
				Text.Add("The [foxvixen]’s plush, jiggling D-cups squish delightfully as you apply pressure to them[milk], and Terry moans in unconscious appreciation as you carefully, tenderly wipe and stroke them. With meticulous attention, you mop the [foxvixen]’s breasts clean, wiping away as much of Terry’s cum as you possibly can before accepting you aren’t going to get [himher] any cleaner and moving on.", parse);
			}
			else if(terry.Cup() >= TerryFlags.Breasts.Ccup) {
				parse["milk"] = terry.Lactation() ? " - unwittingly coaxing forth milk to mix with the semen -" : "";
				Text.Add("Even as you wipe at the semen coating them, you cannot resist squishing and fondling Terry’s ample tits, feeling the [foxvixen] unthinkingly lean against you in pleasure at the touch. With diligent, patient motions, you rub and stroke and mop each breast in turn[milk] until you have to accept that [heshe] is as clean there as possible.", parse);
			}
			else if(terry.Cup() >= TerryFlags.Breasts.Bcup) {
				Text.Add("As you wrap and rub the towel over Terry’s chest, you find the [foxvixen]’s perky breasts squishing most delightfully in the process, just big enough to flatten as you press down, but small enough to slide deliciously between your fingers. Even you can’t pinpoint how much of your efforts are actually cleaning [himher] and how much are simply groping [himher], but eventually [heshe] is clean enough that it’s time to move on.", parse);
			}
			else if(terry.Cup() >= TerryFlags.Breasts.Acup) {
				Text.Add("Terry’s perky little tits bounce and move most invitingly under your towel as you wash down [hisher] chest, and you can’t help but cop the odd feel in the process. As small as they are, they don’t add much to your workload and you soon have [himher] as clean as you’re going to get [himher] with just a towel.", parse);
			}
			else {
				Text.Add("Terry’s femininely flat chest is easy enough to clean; you can easily wrap the whole towel around [hisher] upper torso and rub it back and forth, sopping up the excess semen as best you possibly can. [HeShe] arches [hisher] back, leaning into the impromptu massage, and you soon have [himher] fairly clean.", parse);
			}
			Text.NL();
			var preg = terry.PregHandler().IsPregnant();
			parse["swollen"] = preg ? " swollen" : "";
			Text.Add("With Terry’s chest clean, you move down toward [hisher][swollen] belly next. ", parse);
			if(preg)
				Text.Add("Carefully, you massage the bulging orb of [hisher] midriff, distended with your unborn child, rubbing the towel around, across and over with smooth, even strokes. You fall easily into a rhythm of wiping the semen away and stroking the stretched and sensitive skin beneath, massaging your pregnant lover tenderly. Eventually, you deem [himher] to be as clean as you can make [himher] with just a towel.", parse);
			else
				Text.Add("With firm, energetic strokes, you rub and wipe, sopping up the semen puddling on [hisher] belly and drying out the [foxvixen]’s fur as best you can. It takes a while, but finally you have [himher] looking decently presentable.", parse);
			Text.NL();
			Text.Add("<i>“Thanks,”</i> you hear the [foxvixen] mumble.", parse);
			Text.NL();
			Text.Add("You assure [himher] that it’s no problem and offer [himher] a friendly smile.", parse);
			Text.NL();
			Text.Add("Terry smiles [himher]self before slumping back. Seems like your pet is still drained after your activities. You pat [himher] on the thigh and tell [himher] that [heshe] should get some rest.", parse);
			Text.NL();
			if(terry.Relation() < 30)
				Text.Add("<i>“Right… I will,”</i> [heshe] replies, closing [hisher] eyes.", parse);
			else if(terry.Relation() < 60)
				Text.Add("<i>“Okay, thanks again, [playername].”</i> You pat [himher] on the head and watch as [heshe] closes [hisher] eyes before leaving.", parse);
			else
				Text.Add("<i>“Kiss me good night?”</i> [heshe] requests. A request which you’re only too happy to oblige before leaving [himher] to rest with a smile.", parse);
			
			func(opts);
		}, enabled : true,
		tooltip : Text.Parse("Grab a towel or something and help rub [himher] down.", parse)
	});
	var tooltip = player.Slut() < 30 ? "It's icky and gross, but you probably could lick [himher] clean... you think [heshe]'d like that... Honestly, it's kind of hot, too." :
	              player.Slut() < 60 ? "Why waste all that tasty [foxvixen] spunk? Bon appetite..." : "Like you're really going to waste yummy nutbutter on a towel! Time to eat!";
	options.push({ nameStr : "Lick Clean",
		func : function() {
			Text.Clear();
			var preg = terry.PregHandler().IsPregnant();
			Text.Add("Licking your lips unconsciously, you place a hand on each of the [foxvixen]’s thighs for support and wriggle in closer. Your lips sink forward until you are hovering over the underside of [hisher] [tbelly], then part to allow your [tongue] to slide outwards. Carefully, you glide over the cum-caked fur, heavy enough to lap the off-white smears from its surface, but not enough to coat your tongue in fur. The thick taste of salt and musk washes over your senses, and you swallow hard, squeezing the semen down your throat before starting to lick again.", parse);
			Text.NL();
			Text.Add("Painstakingly, you wash your way up Terry’s belly, pausing at its peak to ", parse);
			if(preg)
				Text.Add("lap and play with the pregnant [foxvixen]’s belly button, popped out through the fur into a distinctive little peak for you to kiss and suckle, teasing with tongue, lips and teeth.", parse);
			else
				Text.Add("worm your way into [hisher] belly button, wriggling in circles along the indent’s walls, tongue pumping playfully in and out.", parse);
			Text.NL();
			Text.Add("The [foxvixen] laughs incessantly at your ministrations. <i>“[playername]! - heh! - S-stop! That tickles!”</i>", parse);
			Text.NL();
			Text.Add("Amused, you can’t resist teasing Terry just a little longer, feeling the [foxvixen] wriggle and squirm beneath you, then take mercy. Removing your tongue from [hisher] belly button, you start to lick and suckle and lap your way further up Terry’s body until you reach [hisher] chest.", parse);
			Text.NL();
			if(terry.Cup() >= TerryFlags.Breasts.Ccup) {
				parse["milk"] = terry.Lactation() ? Text.Parse(" - which rewards you with a taste of [hisher] milk -", parse) : "";
				Text.Add("Your tongue and lips attack the [foxvixen]’s ample cleavage with a vengeance, licking long and hard, slurping wetly at [hisher] nipples[milk] and planting wet, sucking kisses over their surface until they jiggle from the force.", parse);
			}
			else if(terry.Cup() >= TerryFlags.Breasts.Acup) {
				parse["milky"] = terry.Lactation() ? " milky" : "";
				Text.Add("Small as they are, your [foxvixen]’s breasts are still big enough for you to suckle at, to tease each[milky] nipple with lips and tongue and teeth, lapping and slurping and kissing your way over the swells.", parse);
			}
			else {
				Text.Add("Your [foxvixen]’s nipples poke like tiny little pink islands from the sea of white fur, and your tongue is drawn to them like an iron filing to a magnet. With slow, gentle strokes from the very tip, you tease and caress, polishing them until they shine, then gently nipping them just barely with your teeth.", parse);
			}
			Text.NL();
			Text.Add("Not able to resist, Terry is content to moan and groan as you lavish [hisher] [tbreasts] with attention. [HisHer] [thand]s move to the back of your head, not to stop you, but to direct and aid you in your task. Each lick causes [hisher] hands to clench, reassuring you that the [foxvixen] is indeed enjoying your treatment very much.", parse);
			Text.NL();
			Text.Add("By this point, you have lapped up the bulk of the semen adorning your pet’s form. Latest mouthful between your lips, you are struck by an urge that you can’t resist. Clambering the last few inches along Terry’s body, you thrust your lips possessively against [hisher] own, drawing the [foxvixen] into a deep and passionate kiss. As you do so, your tongue pushes authoritatively into [hisher] muzzle, gravity drawing the mouthful of semen from your mouth into [hishers].", parse);
			Text.NL();
			if(terry.Slut() < 30) {
				Text.Add("Even if this something the [foxvixen] would never consider otherwise, [heshe]’s just feeling too good to care. Terry accepts your kiss without a hint of protest, licking your own [tongue] clean of all the fox-seed you feed [himher].", parse);
			}
			else if(terry.Slut() < 60) {
				Text.Add("Terry is feeling too good - basking in [hisher] afterglow as [heshe] is - to bother hesitating when you thrust your creamy [tongue] into [hisher] maw. All [heshe] does is accept and lick your mouth clean of [hisher] own jism, a smile gracing [hisher] features once you break the kiss.", parse);
			}
			else {
				Text.Add("The [foxvixen] regains some of [hisher] pep when you touch lips. [HisHer] [ttongue] darts into your maw to kiss you back passionately. The moment [heshe] tastes [himher]self, [heshe] eagerly begins lapping any remnant of spunk, thoroughly washing your mouth up. [HisHer] tongue tangles with yours, dancing in wild, chaotic embraces, hooking together so [heshe] can pull you inside [hisher] muzzle. Puckering [hisher] lips, Terry makes a show of sucking on your [tongue], gulping down jism and saliva as [heshe] does so. It actually takes some effort for you to break free of the hungry [foxvixen] with a pop.", parse);
				Text.NL();
				Text.Add("What a slutty [foxvixen] your sexy little pet is…", parse);
				Text.NL();
				Text.Add("Terry just grins at you with a mischievous smile, licking [hisher] lips to taste the last of you.", parse);
			}
			Text.NL();
			Text.Add("Slowly, you slide your tongue over your lips, swallowing heavily as your eyes sink half-closed with pleasure. With a throaty purr of approval, you congratulate Terry on being so tasty.", parse);
			Text.NL();
			if(terry.Relation() < 30) {
				Text.Add("<i>“Err, thanks?”</i> the [foxvixen] says, unsure of how to proceed. It’s clear [heshe] appreciates you cleaning [himher] the way you did, but the fact that [heshe]’s being all shy about it is kinda cute.", parse);
				Text.NL();
				Text.Add("[HeShe]’s welcome, you reply. Terry looks as if [heshe] is about to say something, but cuts [himher]self off with a soft yawn; looks like [heshe] needs to be left to get some rest.", parse);
			}
			else if(terry.Relation() < 60) {
				Text.Add("<i>“Anytime, [playername],”</i> [heshe] replies with a tired smile.", parse);
				Text.NL();
				Text.Add("With a mischievous grin of your own, you assure [himher] that you’ll keep that in mind, but for now [heshe] should lie back and get some rest. Affectionately, you tussle the [foxvixen]’s ears, running your fingers through silky soft hair before petting [hisher] head.", parse);
			}
			else {
				Text.Add("<i>“Spirits, you’re such a perv, [playername],”</i> [heshe] comments teasingly.", parse);
				Text.NL();
				Text.Add("That may be so, but you know [heshe] wouldn’t have you any other way.", parse);
				Text.NL();
				parse["boygirl"] = player.mfTrue("boy", "girl");
				Text.Add("<i>“Lucky you that I happen to like pervy [boygirl]s, then.”</i> the [foxvixen] giggles.", parse);
				Text.NL();
				Text.Add("You agree that you are most lucky indeed, then steal a quick kiss. But even so, [heshe] needs to get some rest now; the two of you can have more fun later.", parse);
				Text.NL();
				Text.Add("<i>“Alright, then. See you later?”</i>", parse);
				Text.NL();
				Text.Add("You promise [himher] that [heshe] will.", parse);
			}
			
			player.slut.IncreaseStat(75, 1);
			terry.slut.IncreaseStat(100, 2);
			
			func(opts);
		}, enabled : true,
		tooltip : Text.Parse(tooltip, parse)
	});
	Gui.SetButtonsFromList(options, false, null);
}
// Clean Terry Up Exit Point

// Terry cleans PC Entry Point
TerryScenes.TCleansPC = function(func : any, opts : any) {
	let terry = GAME().terry;
	let player = GAME().player;
	let party : Party = GAME().party;

	var parse : any = {
		playername : player.name,
		foxvixen   : terry.mfPronoun("fox", "vixen"),		
	};
	parse = player.ParserTags(parse);
	parse = terry.ParserPronouns(parse);
	parse = terry.ParserTags(parse, "t");
	parse = Text.ParserPlural(parse, player.NumCocks() > 1);
	parse = Text.ParserPlural(parse, player.NumCocks() > 2, "", "2");	
					
	opts = opts || {};
	func = func || function(opts : any) {
		Text.Flush();
		Gui.NextPrompt();
	};
	
	//[Let Be][Clean Up]
	var options = new Array();
	var tooltip = terry.Relation() < 30 ? Text.Parse("No, you don’t want anything more from [himher] at the moment. [HeShe]’s free to go.", parse) :
	              terry.Relation() < 60 ? Text.Parse("No, you don’t need [hisher] help; you’ll go and clean yourself off.", parse) :
	              Text.Parse("That’s not necessary; you’re happy to walk around wearing your lover on your [skin] like this.", parse);
	options.push({ nameStr : "Let Be",
		func : function() {
			Text.Clear();
			if(terry.Relation() < 30) {
				Text.Add("<i>“Alright, thanks,”</i> [heshe] finds [hisher] [tarmor] and leaves you.", parse);
				Text.NL();
				Text.Add("Gathering up your things as necessary, you prepare yourself to get back to what you were doing.", parse);
				
				terry.relation.IncreaseStat(60, 2);
			}
			else if(terry.Relation() < 60) {
				Text.Add("<i>“You sure? Okay then.”</i> [HeShe] gathers [himher]self and finds [hisher] [tarmor] leaving you with a smile. <i>“See you later, [playername].”</i>", parse);
				Text.NL();
				Text.Add("You assure [himher] that [heshe] most certainly will. And you’re sure [heshe] will enjoy it even more than [heshe] did this time. Smirking to yourself, you finish gathering up your own things in turn.", parse);
				
				terry.relation.IncreaseStat(60, 2);
			}
			else {
				Text.Add("Terry chuckles at your reply. <i>“Why did I have to fall for such a huge perv...”</i>", parse);
				Text.NL();
				Text.Add("Grinning, you suggest that maybe it’s because that’s what [heshe] likes in a lover.", parse);
				Text.NL();
				Text.Add("<i>“Maybe so. Alright then, lover, have it your way. If you want to broadcast to everyone that you’re mine, I’m powerless to stop you,”</i> [heshe] teases, pointing at [hisher] collar. <i>“See you later, creamy,”</i> [heshe] says, gathering [hisher] [tarmor] and leaving you.", parse);
				Text.NL();
				Text.Add("You blow the [foxvixen] a rather gooey kiss and set about gathering your things as well before setting off.", parse);
				
				terry.relation.IncreaseStat(80, 2);
			}
			
			func(opts);
		}, enabled : true,
		tooltip : tooltip
	});
	var tooltip = terry.Relation() < 30 ? Text.Parse("No, this is [hisher] mess and you want [himher] to clean up. That’s an order.", parse) :
	              terry.Relation() < 60 ? Text.Parse("Yes, you’d appreciate [hisher] help getting cleaned up.", parse) :
	              Text.Parse("If your lovely [foxvixen] is offering to help you clean up, you wouldn’t dream of saying no.", parse);
	options.push({ nameStr : "Clean Up",
		func : function() {
			Text.Clear();
			var towel = false;
			if(terry.Relation() < 30) {
				Text.Add("The moment [foxvixen] thinks to protest, [hisher] collar begins flashing faintly. You watch as [heshe] gasps, growing a bit flushed at the influences of the collar. <i>“Dammit, alright, alright. I’ll help you clean up. Let me just get a towel...”</i>", parse);
				towel = true;
			}
			else if(terry.Relation() < 60) {
				Text.Add("<i>“Alright, just wait a little bit,”</i> [heshe] tells you, wandering off to check on [hisher] pack. ", parse);
				if(terry.Slut() < 60) {
					Text.Add("After some rummaging, Terry returns with a towel. <i>“Just hold still and I’ll clean you up.”</i>", parse);
					Text.NL();
					Text.Add("Nodding your head in understanding, you sit up to make it easier for the [foxvixen] to wipe you clean.", parse);
					towel = true;
				}
				else {
					Text.Add("After rummaging through [hisher] belongings, Terry returns with a waterskin. [HeShe] pops the top and takes a drink, sighing in relief at rehydrating. <i>“Alright, I’m ready.”</i>", parse);
					Text.NL();
					Text.Add("You’re pretty sure you know how the [foxvixen] intends to clean you up. Still, you decide to playfully ask what [heshe]’s up to. Just a waterskin is not enough to clean you up.", parse);
					Text.NL();
					Text.Add("<i>“Don’t be silly, [playername]. You should know what to expect of me after all we’ve been through. I’m going to eat you up,”</i> [heshe] says, licking [hisher] lips.", parse);
					Text.NL();
					Text.Add("[HeShe] just can’t resist a taste, can [heshe]? No matter, you’ll help [himher] up. You sit up to let [himher] have easier access.", parse);
				}
			}
			else {
				Text.Add("<i>“Of course you wouldn’t say no. If you did, you’d miss the chance of groping me while I try to get you cleaned,”</i> [heshe] teases, wandering off toward [hisher] pack.", parse);
				Text.NL();
				Text.Add("[HeShe] knows you too well, you quip back, watching the seductive swishing of the [foxvixen]’s girlish hips as [heshe] goes.", parse);
				Text.NL();
				if(terry.Slut() < 40) {
					Text.Add("You close your eyes momentarily as you wait for the [foxvixen]’s return when a towel flies in your direction, landing over your head. Moments later, Terry lifts it off your face. <i>“Come on, lazy bones. Get up so I can clean you up.”</i>", parse);
					Text.NL();
					Text.Add("Grinning, you sit up, holding your torso off the ground so that Terry can get at the semen coating your form. Your little [foxvixen] is certainly getting bold, isn’t [heshe]? You might have to punish [himher] for this later...", parse);
					Text.NL();
					Text.Add("<i>“Yes, yes. We all know what kind of punishment you have in store for me,”</i> [heshe] grins. <i>“Looking forward to it, honey. Now be quiet and let me work.”</i>", parse);
					Text.NL();
					Text.Add("Rolling your eyes but shutting your mouth, you do as the [foxvixen] instructs... for now, anyway.", parse);
					towel = true;
				}
				else {
					Text.Add("You close your eyes momentarily as you wait for the [foxvixen]’s return when a pair of lips suddenly presses against your own. A familiar tongue darts into your mouth, taking advantage of your surprised gasp to do so.", parse);
					Text.NL();
					Text.Add("Happily, you sink into the welcome warm wetness of Terry’s kiss, your own [tongue] rising to meet the returning visitor. The [foxvixen]’s taste sweeps its way across your senses as your tongues tangle together, lips hungrily consuming each other. You are just dimly reaching out to pull Terry into a hug when the [foxvixen] delicately breaks the kiss, nimbly stepping back out of reach of your dripping form.", parse);
					Text.NL();
					Text.Add("<i>“Hmm, tasty,”</i> the [foxvixen] remarks, licking [hisher] chops. <i>“Okay, now that my mouth is wet, I can start cleaning you up.”</i>", parse);
				}
			}
			Text.NL();
			if(towel) {
				Text.Add("The [foxvixen] starts with an arm, ensuring that the cloth absorbs as much cum as it can. Naturally, there’s no way a single towel would be enough to absorb all the cum on you, but you decide to let Terry work that out by [himher]self.", parse);
				Text.NL();
				Text.Add("You hum quietly to yourself in pleasure as you feel the [foxvixen]’s careful, gentle strokes and pats along your [skin] with the towel, patiently wiping the limb clean of [hisher] bountiful goo.", parse);
				Text.NL();
				Text.Add("Terry is quite thorough, even stroking along your palm and swiping between your fingers, until your arm is clean. Seeing [hisher] intent, you lower the now-cleaned limb, careful to not let it touch your still-dripping torso, and raise the second, the vulpine body attendant daintily stepping around you and starting to work on it in turn.", parse);
				Text.NL();
				Text.Add("[HeShe] doesn’t dwell on it long, and by the time [heshe] moves to your head, the linen is more than a little soaked with fox-juice. <i>“Hold on.”</i> [HeShe] moves away to bat the towel, flinging off gobs of cum onto the floor. It works to some extent… the excess goop flies off the cloth easily enough, but it is still pretty much caked with seed. However, the [foxvixen] thief eases your worry when [heshe] opens up [hisher] waterskin to wash the towel a little.", parse);
				Text.NL();
				Text.Add("<i>“Close your eyes. I’m going to clean your head next,”</i> [heshe] instructs.", parse);
				Text.NL();
				Text.Add("Doing as you are told, you feel [hisher] gentle hands on your face, the damp material of the towel gliding smoothly over your [skin]. You keep your eyes and your mouth shut, going limp to help Terry move your head from side to side, tilting it at various angles to help [himher] remove the excess semen from your facial features, running down the nape of your throat and brushing along your collarbone for good measure.", parse);
				Text.NL();
				Text.Add("<i>“Head is done,”</i> Terry remarks, moving down to your torso.", parse);
				Text.NL();
				if(player.FirstBreastRow().Size() > 3) {
					Text.Add("The [foxvixen] takes great care cleaning up your [breasts]. Though unintentionally, it does feel kinda good when [heshe] rubs your breasts with the towel...", parse);
				}
				else {
					Text.Add("It doesn’t take much work for the [foxvixen] to be done with your torso and move on to the next area...", parse);
				}
				Text.NL();
				if(player.FirstCock()) {
					if(terry.Relation() < 30) {
						Text.Add("Terry is careful, almost wary, when cleaning your [cocks]. You can see the look of discomfort [heshe] gives when your hardened shaft[s] throb[notS] in [hisher] paws.", parse);
					}
					else if(terry.Relation() < 60) {
						Text.Add("Terry rubs your [cocks] with the towel up and down, almost as if [heshe] was stroking you. <i>“Just cleaning you up, not stroking you. Don’t get any funny ideas,”</i> [heshe] says, a bit embarrassed.", parse);
						Text.NL();
						Text.Add("Feigning innocence, you assure [himher] that you wouldn’t <i>dream</i> of it.", parse);
					}
					else {
						Text.Add("Terry pays a lot of attention whilst cleaning your [cocks]. In fact, you’d say [heshe]’s paying too much attention. When [heshe] ditches the towel to rub your more sensitive spots, you’re pretty this is way more attention than you should get. At least if [heshe] intends to clean you.", parse);
						Text.NL();
						Text.Add("<i>“What? I gotta make sure you’re all clean down here. Can’t miss a spot,”</i> [heshe] says with a mischievous smirk.", parse);
						Text.NL();
						Text.Add("That’s your Terry, alright. Smiling innocently back, you assure [himher] that you believe everything [heshe]’s saying. Why, surely [heshe] wouldn’t get carried away with something else when [heshe]’s so busy tending to you already.", parse);
						Text.NL();
						Text.Add("<i>“Of course not - you know better than anyone that I’m serious about getting the job done,”</i> [heshe] says, giving you another stroke.", parse);
					}
				}
				else if(player.FirstVag()) {
					if(terry.Relation() < 30) {
						Text.Add("Terry is pretty careful when it’s time to finally clean your [vag]. [HeShe] stops momentarily as you twitch in pleasure when [heshe] touches you.", parse);
					}
					else if(terry.Relation() < 60) {
						Text.Add("A soft moan escapes you as Terry rubs your [vag] with the towel.", parse);
						Text.NL();
						Text.Add("<i>“Do you really have to moan when I wipe it here?”</i>", parse);
						Text.NL();
						Text.Add("With a roll of your eyes, you assure the [foxvixen] that if your positions were reversed, [heshe] would be moaning even more.", parse);
						if(!terry.FirstVag())
							Text.Add(" Well, [heshe] knows what you mean.", parse);
						Text.NL();
						Text.Add("<i>“Alright, alright. I’ll be done shortly, so try to bear with it a little.”</i>", parse);
						Text.NL();
						Text.Add("You nod and promise [himher] that you can, gritting your teeth to try and help you resist the pleasure that Terry’s strokes are bringing you, however unintentionally.", parse);
					}
					else {
						Text.Add("Terry wipes your [vag] vigorously, no doubt trying to ensure maximum pleasure while [heshe] takes care of your lower bits. <i>“Will you stop leaking already? I can’t clean you up if you keep wetting yourself right after,”</i> [heshe] jokingly complains.", parse);
						Text.NL();
						Text.Add("Gasping a little as [heshe] touches a particularly sensitive spot, you wish loudly that you could, but [heshe]’s just too good at this.", parse);
					}
				}
				Text.NL();
				Text.Add("<i>“Phew. Alright, I think that’s all. You’re as clean as I can make you without a bath,”</i> Terry declares, folding the towel and heading for [hisher] clothes.", parse);
				Text.NL();
				if(terry.Relation() < 30) {
					Text.Add("After a quick lookover, you nod your head in satisfaction. Thanking the [foxvixen] for [hisher] efforts, you tell [himher] that [heshe] can go now if [heshe] wants.", parse);
					Text.NL();
					Text.Add("<i>“Right, thanks.”</i> The [foxvixen] gathers [hisher] things and leaves you.", parse);
				}
				else if(terry.Relation() < 60) {
					Text.Add("With a smile, you assure the [foxvixen] that [heshe] did a very good job with the tools [heshe] had. You’re very impressed.", parse);
					Text.NL();
					Text.Add("<i>“Thanks,”</i> [heshe] replies with a smile. <i>“I should probably get my stuff and go clean this towel up. You don’t need me for anything else, do you?”</i>", parse);
					Text.NL();
					Text.Add("You give the matter some thought, but ultimately shake your head, assuring Terry that you’re good now.", parse);
					Text.NL();
					Text.Add("<i>“Alright then. I guess I’ll see you later,”</i> [heshe] says, gathering [hisher] things and leaving you.", parse);
				}
				else {
					Text.Add("Playfully, you declare that you’d rather get a rubdown from Terry than a mere bath any day.", parse);
					Text.NL();
					Text.Add("<i>“Flatterer,”</i> [heshe] chuckles. <i>“Well, you know that all you gotta do is ask. I’ll come running to rub you down.”</i>", parse);
					Text.NL();
					Text.Add("With a grin, you assure [himher] that you never doubted that for a second.", parse);
					Text.NL();
					Text.Add("<i>“Good. Now, if you’ll excuse me, I need to clean this towel up.”</i>", parse);
					Text.NL();
					Text.Add("You wave a hand and assure Terry you’ll drop by later.", parse);
					Text.NL();
					Text.Add("[HeShe] gathers [hisher] things up and leaves you - for the moment at least.", parse);
				}
				Text.NL();
				Text.Add("With your vulpine attendant gone and [hisher] semen cleaned from your body, you set about grabbing your gear. Once satisfied you’re ready, you go back to what you were doing before.", parse);
			}
			else {
				Text.Add("The [foxvixen] starts with your [hand]s, sucking on each of your fingers in turn, and licking your palm.", parse);
				Text.NL();
				Text.Add("You repress a twitch as the vulpine daintily osculates at your digits, a ticklish sensation that ripples across your [skin] with each lap of [hisher] little pink tongue. Despite yourself, your lips curl into a smile of pleasure and amusement, but you do your best to hold still so as to not disrupt Terry’s work.", parse);
				Text.NL();
				Text.Add("[HeShe] licks [hisher] way up your arm, shoulder, and finally your cheek. There, [heshe] spends a few moments leisurely lapping your cheek and chin.", parse);
				Text.NL();
				Text.Add("You bite your lip, trying to hold back a giggle, unable to keep from wriggling your face instinctively away from the probing [foxvixen]’s tongue.", parse);
				Text.NL();
				parse["h"] = player.HasHair() ? "do your hair" : "get to your scalp";
				Text.Add("Eventually, the [foxvixen] stops and moves on to your other arm, repeating the process. Next up is the rest of your head. [HeShe] had already taken care of your cheeks, but there were still a few spots left. <i>“We’ll [h] later, for now just close your eyes a bit,”</i> [heshe] says with a smile.", parse);
				Text.NL();
				Text.Add("You nod your head to show your understanding and then close your eyes as instructed.", parse);
				Text.NL();
				Text.Add("Terry sets about [hisher] task, tasting [himher]self on your [skin] with each lap. When [heshe] reaches your lips, [heshe] wraps them into a kiss, licking around inside your mouth.", parse);
				Text.NL();
				Text.Add("Your [tongue] immediately leaps up to meet this intruder in your mouth, playfully trying to wrestle the slick, nimble invader into submission. You narrowly fight back the urge to pull Terry into a hug, focusing instead on the vulpine flexible muscle and the taste of Terry in your maw. The two of you moan softly into each other’s lips, tongues wriggling wetly, with you trying to push Terry’s [ttongue] back into [hisher] mouth so you can return the favor.", parse);
				Text.NL();
				Text.Add("The [foxvixen] holds out valiantly, but cannot withstand your onslaught, and soon it is your tongue that is exploring every nook and crevice of [hisher] mouth. [HisHer] taste washes over your [tongue], rich and strong, sharp teeth pointed when your wriggling appendage brushes against them.", parse);
				Text.NL();
				Text.Add("You press your advantage, savoring your dominance over your vulpine lover’s mouth, then slowly and deliberately withdraw. Your lips break away with a soft sigh, and you can feel the cool air tingling on your flexible organ as it glides back into your mouth, anchored to Terry’s tongue for a moment by a tenuous string of saliva that snaps as your lips close.", parse);
				Text.NL();
				parse["pet"] = terry.Relation() >= 60 ? "lover" : "pet";
				Text.Add("Swallowing, the [foxvixen] smiles, a bit flustered. <i>“That was pretty good, but back to business.”</i> [HeShe] leans closer to lap around your lips before moving down your neck. Dainty handpaws gently push you down by your shoulders, trying to get you to lie down as your foxy [pet] straddles your chest.", parse);
				if(player.FirstBreastRow().Size() > 3 && terry.HorseCock())
					Text.Add("As close as [heshe] is, you can easily feel [hisher] proud stallionhood slapping against you. Half-erect from the kinky [foxvixen]’s own ministrations to you, it falls naturally into the valley of your [breasts], gliding back and forth with each unthinking thrust and twitch of [hisher] hips.", parse);
				Text.NL();
				Text.Add("After a moment’s struggle, you decide to give in to Terry’s unspoken request, allowing [himher] to pin you gently back against the ground and resting your hands at your sides. You look up at [himher] with amusement, waiting to see what your kinky little [foxvixen] has in mind from here, feeling [himher] carefully shift [hisher] weight atop your torso.", parse);
				Text.NL();
				Text.Add("Terry slides [hisher] way down your body, ", parse);
				if(terry.FirstCock()) {
					Text.Add("letting [hisher] shaft rub against your creamy [skin] as [heshe] crawls to begin licking your chest. You can feel [himher] gently thrusting against you, rubbing [himher]self on you as [heshe] grows back to full mast.", parse);
				}
				else {
					Text.Add("letting [hisher] vagina purposely rub against your creamy [skin]. [HeShe] moans in pleasure, trails of [hisher] arousal joining the seed on your body, adding to the mess.", parse);
				}
				Text.NL();
				Text.Add("Despite this, [hisher] attention lies on your [breasts] and your [nips]. [HeShe] licks [hisher] lips before homing in on the closest target, closing [hisher] mouth around your [nip] and slurping it like a lollipop.", parse);
				Text.NL();
				parse["leaking"] = player.Lactation() ? " leaking" : "";
				Text.Add("You moan softly in appreciation, feeling your[leaking] nipple perking in [hisher] mouth. Unthinkingly, you push up with your elbows, raising your torso a little in an effort to push more of your breast into the suckling [foxvixen]’s mouth.", parse);
				Text.NL();
				Text.Add("[HeShe] repeats the process on your other nipple, then moves back down. ", parse);
				if(player.FirstCock())
					Text.Add("By now, [hisher] erect shaft is actively frotting[oneof] your [cocks]. [HisHer] hard horsecock feels so good against your own [cock] that you can’t resist humping back at [himher].", parse);
				else
					Text.Add("By now, [hisher] erect shaft is rubbing against your groin. The shallow movements of the [foxvixen]’s hips rubbing that tasty piece of horse-meat up and down. If only [heshe] moved a little lower...", parse);
				Text.NL();
				Text.Add("You shudder and cry out, wriggling under the vulpine form pinning you as a warm, wet tongue glides ticklishly over your navel. Mischievously, Terry slurps and laps at your belly button, as if trying to nurse it, the ticklish feeling leaving you writhing beneath [himher]. You try to hold out, but soon [heshe] has you laughing at the sensation, trying your best to beg [himher] for mercy in between giggling fits.", parse);
				Text.NL();
				Text.Add("But Terry shows you no remorse, [hisher] [ttongue] steadily gliding out to lap circles around your belly. ", parse);
				var womb = player.PregHandler().Womb();
				var preg = womb && womb.pregnant;
				if(preg && womb.progress > 0.3) {
					if(womb.progress > 0.6) {
						parse["babyCheck"] = womb.litterSize > 1 ? "babies" : "baby";
						Text.Add("With the [babyCheck] inside of you so close to term, [heshe] certainly has plenty of belly to lick. The stretched, swollen orb of flesh invites ceaseless attentions, long, languid strokes of the [foxvixen]’s tongue tingling on your sensitive skin. Terry shows no signs of halting at the work [heshe] has to do; [heshe] just keeps on licking and suckling until your baby bloated belly is practically shining clean.", parse);
					}
					else {
						Text.Add("The dome of your stomach gives the [foxvixen] an abundance to lick at, and [heshe] attacks it with zeal. Your skin tingles deliciously as [heshe] painstakingly laps away, each smooth stroke removing more and more of the vulpine seed smeared across its bulging sides.", parse);
					}
				}
				else {
					Text.Add("Industriously licking away, it doesn’t take Terry very long to have wiped your gut clean of all the semen that dripped and oozed its way down there.", parse);
				}
				Text.NL();
				if(player.FirstCock()) {
					Text.Add("<i>“What a lovely sight,”</i> the [foxvixen] says, looking at your creamy [cocks]. <i>“Here, let me clean this up for you.”</i> Terry picks[oneof] your [cocks] and leans over it, letting [hisher] hot breath caress your cum caked [cock].", parse);
					Text.NL();
					Text.Add("Your shudder at the sensation of hot wind chasing over your seed-slick shaft turns into an open moan as you feel the [foxvixen]’s hot, wet mouth wrapping itself hungrily around your length. Instinctively, you buck your hips, feeding yourself as deep into Terry’s mouth as [heshe]’s willing to take you.", parse);
					Text.NL();
					Text.Add("The lusty [foxvixen] wastes no time and begins milking your [cock] for its creamy prize. You tease your pet for [hisher] slutty behavior, which prompts [himher] to pull away with a smirk. <i>“And whose fault is it that I’m like this?”</i> [heshe] asks teasingly.", parse);
					Text.NL();
					Text.Add("You are forced to confess that it’s your fault.", parse);
					Text.NL();
					Text.Add("<i>“Then can it and feed me. Mine is tasty too, but I need some variance in my meal.”</i>", parse);
					Text.NL();
					Text.Add("Any thoughts you might have about teasing your slutty little [foxvixen] are blown away as [hisher] mouth expertly engulfs you again. Your [cock] is rock-hard by this point, and [heshe] lewdly slurps and suckles away, making you moan and thrust your hips, mindlessly anxious for [hisher] hungry lips and tongue.", parse);
					Text.NL();
					Text.Add("Terry’s become pretty good at this. [HisHer] tongue massages you in all the key spots [heshe]’s come to know so well. As you facefuck your pet [foxvixen], you come to realize that your hips are moving of their own accord - not that either of you are complaining at this point. Suddenly, you feel [himher] take you all the way, as deep into [hisher] muzzle as [heshe] can. The feeling of [hisher] throat closing down on your shaft is the last straw.", parse);
					Text.NL();
					
					var cum = player.OrgasmCum();
					
					Text.Add("With a jubilant howl of pleasure, you empty yourself into Terry’s waiting belly, shedding a nice sized gush of seed down [hisher] throat. [HeShe] sucks hungrily, gulping down each shot, until you finally finish, confident that you have given [hisher] stomach a nice whitewash.", parse);
					Text.NL();
					Text.Add("As you slump panting back against the ground, Terry wetly pops [hisher] mouth free of your glans, smacking [hisher] lips daintily as [heshe] does.", parse);
					Text.NL();
					Text.Add("<i>“Hmm, so tasty,”</i> the [foxvixen] comments, licking [hisher] lips and wiping a small strand that escaped [hisher] hungry maw.", parse);
					Text.NL();
					Text.Add("Sucking in a lungful of air, you manage to smirk and assure Terry that you’re glad [heshe] approves.", parse);
				}
				else if(player.FirstVag()) {
					Text.Add("The feel of your pet [foxvixen]’s tongue, lapping at your labia sends jolts of pleasure racing through your spine, and you find yourself moaning and shuddering as you feel [hisher] [ttongue] invade your [vag].", parse);
					Text.NL();
					Text.Add("Your fingers grasp unthinkingly at the ground under you, your mind clouded by a haze of pleasure. Gasping for breath, clutching at the straws of consciousness, you pant out a query, asking Terry what made [himher] change [hisher] mind. You thought [heshe] was supposed to be cleaning you up...", parse);
					Text.NL();
					Text.Add("Stopping momentarily to chuckle, the [foxvixen] replies, <i>“I am going to clean you up - just thought I’d get a drink first. Something sweet and tasty to wash down all this semen.”</i>", parse);
					Text.NL();
					Text.Add("As you feel [hisher] tongue caress your [clit] again, you moan in pleasure, assuring [himher] that [heshe] can drink all [heshe] wants, just please, keep doing that!", parse);
					Text.NL();
					Text.Add("Terry engulfs your [vag], letting [hisher] tongue drill into your muff, draining it of your precious juices which you’re only too glad to give [himher]. ", parse);
					Text.NL();
					
					var cum = player.OrgasmCum();
					
					Text.Add("With a shriek of ecstasy, your whole body shudders in climax, gushing your feminine juices into the [foxvixen]’s ever-hungry mouth. [HeShe] practically inhales your honey, gulping it down until every last drop is gone, then carefully licks around to remove the last vestiges from your flower. You can only moan weakly in bliss until [heshe] finally deigns to lift [hisher] face from your folds.", parse);
					Text.NL();
					Text.Add("<i>“Hmm, that hit the spot. [playername], your juices are like a drug. The more I drink them, the more I like them,”</i> [heshe] praises you.", parse);
					Text.NL();
					Text.Add("Panting for breath, you dreamily thank Terry for having such a high opinion of them.", parse);
				}
				Text.NL();
				Text.Add("As you relax, enjoying your afterglow, Terry finishes up the rest of your body. Sure, you’re clean of [hisher] semen, but now you’re covered in [foxvixen] slobber!", parse);
				Text.NL();
				Text.Add("<i>“Can’t win them all,”</i> the [foxvixen] chuckles. <i>“Anyway, I think this is as good as it’ll get without a bath proper. Anything else you need me for?”</i>", parse);
				Text.NL();
				Text.Add("You shake your head, assuring the [foxvixen] that you’re fine now.", parse);
				Text.NL();
				Text.Add("<i>“Alright then. If you’ll excuse me, I think I’ll be going, but I had fun. So let’s do that again some other time,”</i> [heshe] grins.", parse);
				Text.NL();
				Text.Add("You assure Terry that you won’t forget about trying this again. ", parse);
				if(party.InParty(terry))
					Text.Add("You gather your own gear, and set off along with the grinning [foxvixen].", parse);
				else
					Text.Add("You wave [himher] goodbye, gather your own gear, and set off on your separate ways.", parse);
				
				terry.relation.IncreaseStat(75, 2);
			}
			
			func(opts);
		}, enabled : true,
		tooltip : tooltip
	});
	Gui.SetButtonsFromList(options, false, null);
}
// Terry cleans PC Exit Point


TerryScenes.FuckedByBunnyMob = function(male : Entity, parse : any) {
	let terry = GAME().terry;

	if(terry.Slut() < 45) {
		Text.Add("<i>“Whoa, wait you bunch of pervs! I didn’t- mmf!”</i> Terry’s protests get immediately silenced as one of the males kisses [himher] straight on the lips. ", parse);
		if(terry.PronounGender() == Gender.male)
			Text.Add("Maybe because Terry looks just so girly...", parse);
		else
			Text.Add("It seems the lagomorphs are incapable of resisting Terry’s charms...", parse);
	}
	else
		Text.Add("<i>“Hey! No need to push, I’m strip- mmf!”</i> Terry has no time to finish before one of the taller bunnies decides to keep [hisher] muzzle shut with a kiss. After the initial surprise, the slutty [foxvixen] is quick to kiss back. Maybe you should punish [himher] for being so forward...", parse);
	Text.NL();
	Text.Add("Your [foxvixen] is undressed in record time, [hisher] clothing discarded carelessly as the lagomorphs push [himher] down toward the ground. ", parse);
	if(terry.Cup() < TerryFlags.Breasts.Ccup) {
		Text.Add("One of the rabbits immediately jumps on [hisher] chest, rubbing his erect cock on the [foxvixen]’s nipples.", parse);
		if(terry.Lactation()) {
			Text.NL();
			Text.Add("A small droplet of milk beads on [hisher] nipple, and the male immediately replaces his cock with his mouth, drinking from Terry as another bunny takes the other breast. You can’t see very well from your position, but you’re pretty sure you can see them fapping as they suck. Looks like Terry is in for a creamy finish.", parse);
			//TODO Drink milk
		}
	}
	else {
		Text.Add("One of the rabbits immediately straddles Terry’s bosom, holding [hisher] boobs tightly together as the bunny male inserts his dick in-between the [foxvixen]’s pillowy orbs.", parse);
		if(terry.Lactation()) {
			Text.NL();
			Text.Add("A few droplets of milk moistens the lagomorph’s handpaws, and he withdraws them with a surprised squeak. A pair of his siblings quickly replace his hands with eager mouths, though. They squeeze your pet [foxvixen]’s bosom, intent on draining each orb of their liquid load.", parse);
			//TODO Drink milk
		}
	}
	Text.NL();
	if(terry.HorseCock()) {
		Text.Add("A pair of lagomorphs looks at the [foxvixen]’s enormous spire of horse-meat, already at full mast and positively towering. The bunny-sluts are already drooling at the sight, and you’re pretty sure of their intentions when they decide to pounce on Terry’s cock. They lick and kiss the length like a long-lost lover, caressing [hisher] balls and bathing themselves on the [foxvixen]’s pre.", parse);
		Text.NL();
		
		Sex.Blowjob(male, terry);
		male.FuckOral(male.Mouth(), terry.FirstCock(), 2);
		terry.Fuck(terry.FirstCock(), 2);
	}
	else if(terry.FirstCock()) {
		Text.Add("One of the lagomorphs decides to have a taste of Terry’s cute fox-pecker. And like a practiced slut, the bunny takes the entire shaft in one long gulp, knot and all. He suckles on Terry’s cock with abandon, eager for some fox cream. And from the looks of it, Terry is eager to give him some too.", parse);
		Text.NL();
		
		Sex.Blowjob(male, terry);
		male.FuckOral(male.Mouth(), terry.FirstCock(), 2);
		terry.Fuck(terry.FirstCock(), 2);
	}
	var pussy = false;
	if(terry.FirstVag()) {
		var virgin = terry.FirstVag().virgin;
		parse["virgin"] = virgin ? " virgin" : "";
		Text.Add("Lifting one of the [foxvixen]’s legs, one of the bunnies easily finds Terry’s[virgin] pussy. He thrusts mercilessly, plunging his small pecker into Terry’s depths. ", parse);
		if(virgin)
			Text.Add("Robbed of [hisher] virginity, Terry screams in both pain and pleasure, muffled by the lagomorph kissing [himher].", parse);
		else
			Text.Add("Terry cries out in pleasure as the lagomorph’s sibling continues to kiss [hisher], effectively muffling [himher].", parse);
		Text.NL();
		
		Sex.Vaginal(male, terry);
		terry.FuckVag(terry.FirstVag(), male.FirstCock(), 3);
		male.Fuck(male.FirstCock(), 3);
		pussy = true;
	}
	Text.Add("The rabbit kissing Terry decides he’s had enough, and replaces his mouth with a cock, already erect and dripping pre for the [foxvixen] to suckle. Overcome by lust, Terry wastes no time in opening [hisher] muzzle invitingly and letting the rabbit plunge his petite shaft into the [foxvixen]’s maw.", parse);
	Text.NL();
	if(!pussy) {
		var avirgin = terry.Butt().virgin;
		Text.Add("Terry moans as another bunny decides to play with [hisher] butt, lubing it up with tiny laps of his tongue. ", parse);
		if(avirgin) {
			Text.Add("As the lagomorph aligns his shaft, Terry immediately pushes the rabbit on top of [himher] away.", parse);
			Text.NL();
			Text.Add("<i>“No! Not my ass!”</i> [heshe] exclaims authoritatively. The bunnies crowding [himher] are stunned at [hisher] strong reaction, but quickly resume their activities. The one that was preparing to take [hisher] butt instead decides to simply stick to rimming [himher] while the first rabbit pushes his cock against Terry’s lips once more.", parse);
			Text.NL();
		}
		else {
			Text.Add("Terry spreads [hisher] legs wider, glaring lustily at the rabbit rimming [himher]. Quick to catch on, the lagomorph immediately replaces his mouth with his dick, and in a few pokes he’s plunging into the [foxvixen]’s anal passage, drawing a whorish moan from the [foxvixen]-slut.", parse);
			Text.NL();
			
			Sex.Anal(male, terry);
			terry.FuckAnal(terry.Butt(), male.FirstCock(), 3);
			male.Fuck(male.FirstCock(), 3);
		}
	}
	Text.Add("You watch as the bunnies have their fun with your pet [foxvixen] before you decide to leave them to their own devices.", parse);
	Text.NL();
	
	var cum = terry.OrgasmCum();
}

TerryScenes.SexPitchVaginal = function(cocks : Cock[]) {
	let terry = GAME().terry;
	let player = GAME().player;
	let party : Party = GAME().party;

	var p1cock  = player.BiggestCock(cocks);
	var strapon = p1cock.isStrapon;
	
	var parse : any = {
		playername  : player.name,
		master      : player.mfTrue("master", "mistress"),
		foxvixen    : terry.mfPronoun("fox", "vixen"),
		fox         : terry.HorseCock() ? "horse" : "fox-",		
		boygirl     : player.mfTrue("boy", "girl")
	};
	parse = player.ParserTags(parse);
	parse = terry.ParserTags(parse, "t");
	
	var p2cock : Cock;
	if(player.NumCocks() > 1) {
		var allCocks = player.AllCocksCopy();
		for(var i = 0; i < allCocks.length; i++) {
			if(allCocks[i] == p1cock) {
				allCocks.splice(i, 1);
				break;
			}
		}
		p2cock = player.BiggestCock(allCocks);
		
		parse["cocks2"] = player.MultiCockDesc(allCocks);
	}
	
	var virgin = terry.FirstVag().virgin;
	var virginFirst = terry.PussyVirgin();
	
	parse = terry.ParserPronouns(parse);
	parse = Text.ParserPlural(parse, player.NumCocks() > 1);
	parse = Text.ParserPlural(parse, player.NumCocks() > 2, "", "2");
	
	parse["stuttername"] = player.name[0] + "-" + player.name;
	
	Text.Clear();
	if(terry.Relation() < 30) {
		Text.Add("<i>“Umm, I’m not so sure about this...”</i> Seems like Terry is not so receptive to the idea of being penetrated.", parse);
		if(!virginFirst)
			Text.Add(" Even though it’s not [hisher] first time.", parse);
		Text.NL();
		Text.Add("Smiling gently, you reach out and take [hisher] hands, swearing to [himher] that it’s okay, you’ll be gentle with [himher].", parse);
		Text.NL();
		Text.Add("<i>“O-okay. It’s not like I have a choice anyway...”</i>", parse);
	}
	else if(terry.Relation() < 60) {
		Text.Add("<i>“Okay, just remember to be gentle.”</i>", parse);
		Text.NL();
		Text.Add("You promise [himher] that you will try to be as gentle as you can.", parse);
	}
	else {
		Text.Add("<i>“Good, I was craving some meat between my legs,”</i> [heshe] giggles.", parse);
		Text.NL();
		parse["lady"] = terry.mfPronoun("'lady'", "lady");
		Text.Add("Well, you’re certainly happy to oblige; anything your [lady] desires...", parse);
		Text.NL();
		Text.Add("<i>“If you got time to be cheeky, you also have time for foreplay. So, why haven’t you started yet? And why are you still dressed?”</i>", parse);
	}
	Text.NL();
	Text.Add("One eye focused on the naked [foxvixen] before you, you make short work of your own [armor], stripping away your attire until you’re standing before [himher] equally naked. ", parse);
	if(strapon)
		Text.Add("You quickly check your [cock], making sure that it’s properly secured to its place. Don’t want it to fall out while you’re fucking Terry, after all.", parse);
	else
		Text.Add("Your own erect [cocks] stand[notS] proudly before you, signaling your readiness to begin whenever Terry gives the okay.", parse);
	Text.NL();
	
	if(virgin) {
		if(virginFirst) {
			Text.Add("<i>“Listen, I… well… common knowledge is that it always hurts the first time. So can you go slowly? Give me time to adjust?”</i>", parse);
			Text.NL();
			Text.Add("Nodding your head, you give [himher] your word. Everyone knows virgins need a delicate touch, and virgins who were once boys especially so.", parse);
			Text.NL();
			Text.Add("<i>“Alright, I’m trusting you.”</i>", parse);
			
			terry.flags["vFirst"] = 1;
			
			terry.slut.IncreaseStat(100, 2);
			terry.relation.IncreaseStat(100, 1);
		}
		else {
			Text.Add("<i>“Hope you’ll take your time before you start humping. After all, you’ll be popping my cherry all over again, and that hurts!”</i>", parse);
			Text.NL();
			Text.Add("With a nod and a reassuring smile, you assure the [foxvixen] that you haven’t forgotten what [heshe] needs.", parse);
			Text.NL();
			Text.Add("<i>“Okay, we’re set then. Let’s go, I guess.”</i>", parse);
			
			terry.slut.IncreaseStat(100, 2);
		}
	}
	else {
		Text.Add("<i>“Alright then, some foreplay before we get down to business?”</i>", parse);
		Text.NL();
		Text.Add("Why not? After all, you know how much [heshe] likes it better when you play around first.", parse);
	}
	Text.Flush();
	
	//[Kiss][Hands][Lick][Dildo]
	var options = new Array();
	options.push({ nameStr : "Kiss",
		func : function() {
			Text.Clear();
			Text.Add("With a smile, you cross the distance between yourself and the [foxvixen], hands reaching out to gently but authoritatively take hold of [hisher] cheeks. [HisHer] blue eyes flick about instinctively before your lips dip in and cover [hisher] own. Softly at first, a tender press of flesh on flesh, but as your ardor builds you kiss the [foxvixen] harder, more insistently, sliding closer and closer to [himher] so you can try and dominate [hisher] mouth.", parse);
			Text.NL();
			Text.Add("Terry is a bit taken by surprise initially, but [heshe] quickly reciprocates, tail wagging slowly behind as [hisher] eyes close. [HisHer] tongue wrestles with yours, and [heshe] moans a little as you twist your heads slightly to deepen the kiss.", parse);
			Text.NL();
			parse["slender"] = terry.PregHandler().BellySize() > 0.2 ? "pregnancy-swollen" : "slender";
			Text.Add("As your tongues tangle together in the [foxvixen]’s mouth, your hand rises as if on autopilot, skimming the fur of Terry’s [slender] form to reach for [hisher] chest. ", parse);
			if(terry.Cup() >= TerryFlags.Breasts.Acup)
				Text.Add("Your digits splay around the vulpine breast, cupping it as best you can. You caress and squeeze it, fingers kneading the soft and sensitive flesh, thumb rubbing itself ardently against the perky nipple, coaxing it to pebble under your touch.", parse);
			else
				Text.Add("With no breasts to speak of, your fingers zero in on Terry’s nipple. You pinch it between forefinger and thumb, slowly rubbing and teasing it, nipping it just hard enough to add an extra spark. Your efforts bear fruit, coaxing it into a little pink pebble of arousal-stiffened flesh.", parse);
			Text.NL();
			Text.Add("The [foxvixen] moans into the kiss, but otherwise doesn’t protest your ministrations. In fact, [heshe] leans closer, [hisher] own hands setting themselves on your [hips]. You’ve been making out for a while now, but neither of you feel the need to break just yet.", parse);
			Text.NL();
			Text.Add("Your other hand glides over the [foxvixen]’s womanly hip to reach for the heart-shaped perkiness of [hisher] butt. Fingers cup one bountiful cheek and squeeze possessively, amorously kneading at the tight, firm flesh, delighting in the way it squishes between your digits.", parse);
			Text.NL();
			Text.Add("Terry breaks the kiss momentarily to gasp. <i>“Perv...”</i> [heshe] utters, almost inaudibly.", parse);
			Text.NL();
			parse["l"] = player.IsGoo() ? "lower section" : player.IsNaga() ? "tail" : "leg";
			parse["c"] = terry.FirstCock() ? Text.Parse(", not that [hisher] erect [tcock] poking against you wasn’t enough of an indication already", parse) : "";
			Text.Add("Like [heshe] doesn’t love it, you retort, before covering [hisher] mouth again with possessive firmness. Close as you are, you can easily use your [l] to start grinding at [hisher] arousal-clenched thighs, slowly spreading them and allowing you to work your own [cocks] in-between them to rub against [hisher] rapidly moistening pussy. It’s pretty clear that the [foxvixen]'s excitement is already peaking[c].", parse);
			if(terry.HorseCock())
				Text.Add(" You’re surprised you didn’t notice it earlier, given how huge [heshe] is.", parse);
			Text.NL();
			Text.Add("Terry grinds back against you, moaning softly as [heshe] feels[oneof] your [cocks] rubbing against [hisher] pussy. [HeShe] stands on shaky legs - maybe you should sit down before the [foxvixen] loses [hisher] balance.", parse);
			Text.NL();
			Text.Add("The scent of Terry’s drooling cunt fills your nostrils as you finally deign to break the kiss, the panting, glaze-eyed [foxvixen] staring at you longingly. Wrapping [himher] gently in your arms, you sit down, tenderly guiding the [foxvixen] to straddle you. You let[oneof] your [cocks] nestle against Terry’s wet pussy, and ask [himher] if [heshe]’s ready to start.", parse);
			Text.NL();
			Text.Add("Your only reply is a soft nod.", parse);
			Text.Flush();
			
			terry.AddLustFraction(0.5);
			
			Gui.NextPrompt();
		}, enabled : true,
		tooltip : Text.Parse("A nice makeout session should be just the thing to put your [foxvixen] in the mood.", parse)
	});
	options.push({ nameStr : "Hands",
		func : function() {
			Text.Clear();
			Text.Add("Closing the distance between you, your arms reach out and gently embrace the [foxvixen], pulling [himher] into a tender hug, feeling [himher] rest [hisher] head against your collarbone. You hold [himher] like that for a few moments, softly stroking [hisher] hair, then let the [foxvixen] go in order to seat yourself upon the ground, guiding Terry down into your lap and instructing [himher] to straddle you.", parse);
			Text.NL();
			Text.Add("Terry does exactly as you instructed, moaning softly as[oneof] your [cocks] rubs against [hisher] [tvag]. You push your [cocks] below the [foxvixen], letting [itThem] emerge from behind [himher]. ", parse);
			if(terry.Relation() < 30)
				Text.Add("Terry looks a bit uneasy in this position, but [heshe] also looks at you with undeniable lust in [hisher] eyes. It’s difficult to tell which one is the strongest emotion.", parse);
			else if(terry.Relation() < 60)
				Text.Add("Terry doesn’t look all that comfortable at first, but after some wiggling [heshe] finds the best position to straddle you in. [HeShe] looks at you and smiles softly.", parse);
			else {
				Text.Add("Terry smiles as [heshe] adjusts [himher]self in your lap, embracing you with outstretched arms.", parse);
				if(terry.FirstCock())
					Text.Add(" You feel [hisher] [tcock] throb gently against your belly.", parse);
			}
			Text.NL();
			Text.Add("Seeing Terry is ready to go, you decide to start with the obvious, and so your hands reach toward the [foxvixen]’s chest. ", parse);
			if(terry.Cup() < TerryFlags.Breasts.Acup) {
				Text.Add("Of course, Terry has no bosom, even if [heshe] does have a perfectly feminine flower between [hisher] legs. But that still leaves a pair of pearl-pink nipples to play with, and your fingers gravitate toward them inevitably.", parse);
				Text.NL();
				Text.Add("With expert precision, your digits trace circles, starting at the fur just past the areola before spiraling in, flicking the buds back and forth with tiny twitches of your fingertip. You caress and rub, going so far as to take the pebbling nubs between thumb and forefinger in a not-unpleasant pinch that lets you gently grind on the sensitive flesh. ", parse);
			}
			else if(terry.Cup() < TerryFlags.Breasts.Ccup) {
				Text.Add("Terry’s small, perky tits match [hisher] slender build just perfectly, easily fitting into your hands.", parse);
				Text.NL();
				Text.Add("Though too small and firm to really squish, you can still knead them like dough and that is what you proceed to do. Your thumbs rub each nipple in circles, stroking them back and forth as you cup and squeeze at [hisher] breasts.", parse);
			}
			else if(terry.Cup() < TerryFlags.Breasts.Dcup) {
				Text.Add("Stretching the limits of what would fit a [foxvixen] as petitely built as Terry, the bountiful C-cups are almost too large to hold with a single hand, leaving you cupping generously at the toned, perky breasts.", parse);
				Text.NL();
				Text.Add("As best you can, you massage them with thumbs and fingers, kneading the flesh that squishes so delightfully between your digits and stroking at the nipples. You gently heft them up from Terry’s chest, marveling at their weight, caressing them with tender possessiveness.", parse);
			}
			else {
				Text.Add("[HisHer] bountiful breasts - so big as to be out of place on [hisher] small, slender frame - draw your hands like iron filings to a magnet. So large that a single [hand] alone strains to even try and cup a singular one, you find yourself needing to devote both hands to each one in turn.", parse);
				Text.NL();
				Text.Add("The weight of them in your palms is a palpable thing, and there is more than enough flesh to caress and stroke. Fingers sink into luxuriant fur-wrapped boobflesh, groping shamelessly, more than enough for you to focus on caressing with one hand as the other plays with the nipple, pinching and squeezing, tugging lightly.", parse);
				Text.NL();
				Text.Add("You play with one breast to your heart’s content, then switch over to the other, lavishing the same attention on it before switching back to the first.", parse);
			}
			Text.NL();
			parse["br"] = terry.Cup() < TerryFlags.Breasts.Acup ? "breasts" : "nipples";
			parse["boobs"] = terry.Cup() < TerryFlags.Breasts.Acup ? "boobs" : "nipples";
			Text.Add("<i>“Ah!”</i> the [foxvixen] cries out as you play with [hisher] [br]. <i>“H-hey, I thought you were going to do me - not play around with my [boobs],”</i> [heshe] teases you, stifling another moan.", parse);
			Text.NL();
			Text.Add("All in due time, you quip back. First of all, you think some foreplay is in order - just to get [himher] started. And [hisher] [br] sure seem to be the quickest way to get [himher] going.", parse);
			Text.NL();
			if(terry.Relation() < 30) {
				Text.Add("The [foxvixen] doesn’t say anything, instead [heshe] continues to try and stifle [hisher] moans as you work [himher] into a soft pant.", parse);
			}
			else if(terry.Relation() < 60) {
				Text.Add("<i>“Oh! Get me going, huh?”</i> [heshe] replies, panting softly.", parse);
				Text.NL();
				Text.Add("You chuckle and tell [himher] that you can’t just start on [himher] without enjoying [himher] a little...", parse);
			}
			else {
				Text.Add("<i>“Get me going? What kind of teasing remark is that? How about <b>I</b> get <b>you</b> ‘going’, big [boygirl],”</i> Terry huskily replies, reaching over to twist one of your [nips].", parse);
				Text.NL();
				Text.Add("You moan in pleased surprise, body tensing at the sensation that spikes under your skin. In shock, you whisper Terry’s name, shaking your head and managing a weak laugh at how far [heshe]’s come from the sexual innocent [heshe] was.", parse);
				Text.NL();
				Text.Add("<i>“So, you going to pick up the pace or do I have to take charge?”</i> [heshe] grins mischievously.", parse);
				Text.NL();
				Text.Add("Oh, you’ll pick up the pace alright...", parse);
			}
			Text.NL();
			Text.Add("Abandoning Terry’s chest, your hands roam down [hisher] body, heading for [hisher] lower half.", parse);
			Text.NL();
			if(terry.FirstCock()) {
				if(terry.HorseCock()) {
					Text.Add("Naturally, your [hand]s first stop at the magnificent pillar of equine meat jutting so erroneously between Terry’s dainty thighs. You know you need to be careful here, lest your teasing of the over-sensitive flesh makes Terry cum before you want [himher] to.", parse);
					Text.NL();
					Text.Add("Your digits curl possessively around Terry’s ample cockflesh, sliding back and forth in smooth, even strokes, tracing the bluntness of [hisher] glans and teasing back along its upper side. You reach for the swollen fullness of [hisher] balls, setting them swaying playfully with gentle nudges of your fingers, fondling them as if to gauge their ripeness.", parse);
				}
				else
					Text.Add("The almost dainty foxhood lying between Terry’s thighs is a natural step for you. You caress the base, just above the sheath, feeling the promise there of [hisher] knot before gliding your digits back and forth along its upper side. You pinch the pointed tip gently between your fingers, then caress the shaft with your palm. You cup [hisher] dainty little balls in your palm and knead them softly, feeling the promise of seed within.", parse);
			}
			else
				Text.Add("Though it is too soon to play with Terry’s cunt properly, you can still tease [himher] a little. Your fingers stroke just above [hisher] pussy, rubbing gently at the hood above [hisher] clitoris, trailing the outer lips with one questing digit.", parse);
			Text.NL();
			Text.Add("<i>“Ah! If you keep playing with me like that, you’re going to make me cum!”</i> Terry cries out in warning as [heshe] tries to grind [himher]self against you, enjoying your loving caress to the fullest.", parse);
			Text.NL();
			Text.Add("You shake your head in gentle reproach; you can’t have that, now can you? Even as you ask this, your fingers removes themselves from Terry’s loins, your hands resting idly upon [hisher] thighs instead as you wait for [himher] to get back under control.", parse);
			Text.NL();
			Text.Add("Terry leans onto you, resting [hisher] head on your shoulder. <i>“Kinda disappointed you stopped,”</i> [heshe] remarks, still panting.", parse);
			Text.NL();
			Text.Add("It’s only until [heshe] isn’t so close to [hisher] climax, you assure the [foxvixen].", parse);
			Text.NL();
			Text.Add("<i>“Just give me some time.”</i>", parse);
			Text.NL();
			Text.Add("You nod your head in understanding, letting the [foxvixen] rest against you in companionable silence for a few long moments.", parse);
			Text.NL();
			parse["t"] = terry.FirstCock() ? Text.Parse(", despite the fact that [hisher] [tcock] is still rock-hard and throbbing against you", parse) : "";
			Text.Add("<i>“Okay, I guess I’m good now,”</i> Terry declares[t].", parse);
			Text.NL();
			Text.Add("Well, if [heshe] says so, then you should be getting ready for the main event. You smile at the [foxvixen] and tease [himher] by telling [himher] not to cum on the first thrust.", parse);
			Text.NL();
			if(terry.Slut() < 30) {
				Text.Add("<i>“Hey, I’m not that bad at sex,”</i> [heshe] protests with a pout. But [hisher] muzzle quickly spreads into a smile. <i>“Alright then, let’s get started.”</i>", parse);
			}
			else {
				Text.Add("<i>“Not my first rodeo, cow[boygirl]. You know I’m not shabby. If anything, <b>you</b> should look out for yourself and not blow the first thrust, ”</i> the [foxvixen] teases back.", parse);
				Text.NL();
				Text.Add("Now who’s getting ahead of themselves, hmm? You wink to show you’re just teasing, but it’s clear you’re both ready to begin.", parse);
			}
			Text.Flush();
			
			terry.AddLustFraction(0.7);
			
			Gui.NextPrompt();
		}, enabled : true,
		tooltip : Text.Parse("Show Terry just how good you are with your hands by getting [himher] all hot and ready.", parse)
	});
	
	var TerryBlowjob = {
		No   : 0,
		Yes  : 1,
		Came : 2
	}
	var blowjob = TerryBlowjob.No;
	var pleasuredPC = false;
	
	//TODO
	options.push({ nameStr : "Lick",
		func : function() {
			Text.Clear();
			Text.Add("Looking the [foxvixen] up and down speculatively, you smile and ask if [heshe]’d like you to personally lube [himher] up before either of you considers penetration.", parse);
			Text.NL();
			
			// Callstack manipulation
			Gui.Callstack.push(function() {
				Text.NL();
				parse["c"] = terry.FirstCock() ? Text.Parse(", [hisher] neglected maleness brushes softly against your chin, but you pay it no mind", parse) : "";
				Text.Add("Reaching up with your arms, you wrap them around the [foxvixen]’s curvy hips, pulling [himher] down and forward to bring your mouth in proper alignment with [hisher] cunt[c]. This close, you can smell the musk seeping from [hisher] pussy, a heady scent that screams “ready female”. You make sure to burn the scent into your brain.", parse);
				Text.NL();
				Text.Add("<i>“Hey, [playername]?”</i>", parse);
				Text.NL();
				Text.Add("You grunt in acknowledgement.", parse);
				Text.NL();
				Text.Add("<i>“It’s not gonna lick itself, you know? Plus if you keep teasing me like that, I can’t say what I’ll do. Hell hath no fury like a [foxvixen] scorned!”</i> [heshe] warns you playfully.", parse);
				Text.NL();
				parse["boygirl"] = player.mfTrue("boy", "girl");
				Text.Add("You roll your eyes, even as you dramatically plead for Terry to spare you from [hisher] terrible wrath. You’ll be a good [boygirl]. And to prove your words, you open your mouth and let your tongue roll out, giving [hisher] cunt a big, sloppy lick, letting the taste wash through your mouth.", parse);
				Text.NL();
				Text.Add("<i>“Ah! G-good [boygirl],”</i> Terry says, stifling a moan, [hisher] tail wagging demurely above your head.", parse);
				Text.NL();
				if(player.FirstCock()) {
					if(terry.Relation() + terry.Slut() >= 90) {
						Text.Add("You feel Terry’s nose bop[oneof] your [cockTip][s]. <i>“Hmm, such a tasty morsel… don’t mind if I do.”</i> The [foxvixen] promptly engulfs your shaft.", parse);
						Text.NL();
						Text.Add("You moan in pleasure, gratefully returning the favor by enveloping Terry’s flower in a perverse kiss, tongue caressing the slit and licking through to [hisher] inner folds before you release. You don’t want to spoil [himher] too quickly...", parse);
						Text.NL();
						pleasuredPC = true;
					}
					else if(terry.Relation() + terry.Slut() >= 60) {
						Text.Add("You feel a pair of vulpine handpaws encircle[oneof] your [cocks]. <i>“Just returning the favor,”</i> you hear Terry say.", parse);
						Text.NL();
						Text.Add("You let out a muffled noise of gratitude, and extend your tongue again, intent on properly thanking [himher] for [hisher] generosity.", parse);
						Text.NL();
						pleasuredPC = true;
					}
				}
				Text.Add("Your tongue dances across the [foxvixen]’s petals, sliding with all the skill you can muster back and forth along [hisher] slit. Once the outer labia have been lubed enough, you start to probe deeper with your tongue, tantalizing the inner labia and coaxing them to let you through deeper. You slurp Terry’s clitoris into a kiss, sucking on it before returning to the rest of [hisher] womanhood, burying yourself as deeply into it as you can.", parse);
				Text.NL();
				parse["p"] = pleasuredPC ? Text.Parse(", stopping [hisher] ministrations on your [cock]", parse) : "";
				Text.Add("<i>“Ah!”</i> the [foxvixen] cries out[p]. <i>“H-hey, [playername]. Don’t you think you’re - Ooh! - getting a bit carried away back there? You’re gonna make me cum!”</i>", parse);
				Text.NL();
				Text.Add("Well, you can’t have that, now can you? You give Terry’s pussy one last sloppy lick for luck, and then you release your grip on [hisher] hips and settle back down. Mischievously, you ask if [heshe] thinks [heshe]’s ready for something meatier between [hisher] legs than your tongue.", parse);
				Text.NL();
				Text.Add("Getting off of you, the [foxvixen] turns to look at you, panting, eyes filled with lust, <i>“[playername], I was ready ages ago. Do me now!”</i>", parse);
				Text.NL();
				parse["le"] = player.IsNaga() ? " and coil your tail under you" :
							  player.IsGoo() ? " and shift your form" :
							  player.Humanoid() ? " and cross your legs" : "";
				Text.Add("[HeShe] only had to ask, you purr, even as you sit up[le], creating an impromptu seat from your lap, leaning back to better expose your [cocks].", parse);
				Text.NL();
				Text.Add("Terry wastes no time straddling you.", parse);
				Text.Flush();
				
				Gui.NextPrompt();
			});
			
			if(terry.Slut() < 30) {
				Text.Add("<i>“What exactly do you have in mind?”</i> Terry asks, looking at you inquisitively.", parse);
				Text.NL();
				Text.Add("[HeShe]’ll see soon enough, you quip back, but first you need [himher] to kneel. Obediently, the [foxvixen] nods [hisher] head and does as you instruct, looking patiently at you. Once [heshe]’s in the proper position, you walk over and lie down on your back before [himher], head pointing toward [himher], and instruct [himher] to crawl.", parse);
				Text.NL();
				Text.Add("<i>“Umm, what’s next?”</i> Terry asks, slowly creeping down your body as instructed.", parse);
				Text.NL();
				parse["c"] = terry.FirstCock() ? Text.Parse(" [tcock] and balls pass by and [hisher]", parse) : "";
				Text.Add("You grin to yourself as [hisher][c] pussy comes into view. Without speaking, you reach up and wrap your arms around Terry’s hips, bringing the [foxvixen] to a halt before you pull [himher] downward, tongue questing out to dab playfully at [hisher] womanhood.", parse);
				Text.NL();
				Text.Add("<i>“Ah!”</i> Terry cries out, surprised by your lick. <i>“So this is what you had in mind...”</i>", parse);
				Text.NL();
				Text.Add("It most certainly was. Does [heshe] has any objections...?", parse);
				Text.NL();
				Text.Add("<i>“N-not really...”</i> the [foxvixen] replies, a bit embarrassed.", parse);
				
				Gui.PrintDefaultOptions();
			}
			else if(terry.Slut() < 60) {
				Text.Add("<i>“Lube me yourself? I wonder what do you mean by that?”</i> Terry asks with a smirk.", parse);
				Text.NL();
				Text.Add("Smirking back, you retort that you think Terry has a pretty good idea of what you mean. For emphasis, you thrust your tongue out between your lips, licking at the air before retracting it again.", parse);
				Text.NL();
				Text.Add("<i>“Oh ho! I see. Why don’t you get comfortable then?”</i> [heshe] suggests with a knowing grin.", parse);
				Text.NL();
				Text.Add("Smiling back, you lay yourself upon the ground and indicate you’re ready for Terry to take [hisher] position.", parse);
				Text.NL();
				parse["c"] = terry.FirstCock() ? Text.Parse(" [HeShe] makes a point of shaking [hisher] hips enticingly, ensuring [hisher] [tcock] and balls swing side to side above you.", parse) : "";
				Text.Add("The [foxvixen] wastes no time, crawling atop you.[c] <i>“Ready when you are,”</i> [heshe] notifies you.", parse);
				Text.NL();
				Text.Add("Alright then, in that case...", parse);
				
				Gui.PrintDefaultOptions();
			}
			else {
				Text.Add("<i>“I personally don’t think I need any lube. I’m more than capable of taking you on. But on the other hand, I’m pretty sure you got something good in store. So let’s say, yes.”</i> Terry grins knowingly.", parse);
				Text.NL();
				Text.Add("Somehow, you thought that was what [heshe]’d say, you reply, even as you lie down on your back and make yourself comfortable, knowing that Terry knows exactly what needs to be done.", parse);
				Text.NL();
				Text.Add("Terry kneels before you, leaning down to give you a lusty kiss. It’s an interesting experience sharing an inverted kiss like this, but it still feels good. Once [heshe]’s done, [heshe] breaks the lip-lock with a smile, licking [hisher] lips of any lingering trace of your saliva. <i>“Hmm, tasty. Gotta make sure you’re wet enough to lube me,”</i> [heshe] grins.", parse);
				Text.NL();
				Text.Add("Sure [heshe] does... so, do you pass the test?", parse);
				Text.NL();
				Text.Add("<i>“Maybe, just maybe. I guess there’s only way to find out, don’t you agree?”</i> Having said that, [heshe] gets down on four and begins slowly crawling above you.", parse);
				
				if(terry.FirstCock()) {
					parse["little"] = terry.HorseCock() ? "not-so-little" : "little";
					Text.Add("You catch a glimpse of [hisher] swaying [tcock] and balls when [heshe] suddenly stops. As you wonder why [heshe]’s stopping, Terry angles [himher]self and brings [hisher] cock down on your face, smacking your lips with [hisher] shaft. <i>“C’mon, give my [little] friend a kiss,”</i> [heshe] teases.", parse);
					Text.Flush();
					
					//[Blow [himher]][Push away]
					var options = new Array();
					options.push({ nameStr : Text.Parse("Blow [himher]", parse),
						func : function() {
							blowjob = TerryBlowjob.Yes;
							
							Text.Clear();
							Text.Add("[HeShe] wants a kiss, huh? Well, let’s see what [heshe] thinks of this... Opening your mouth, you inhale the very tip of Terry’s [tcock], wetly slurping on the prickflesh between your lips and flicking your tongue against it, caressing the [tcockTip] and what parts of it that you can.", parse);
							Text.NL();
							Text.Add("<i>“Oh! [playername], you really know how to make a [foxvixen] happy. Here I am just asking for a kiss, and instead I’m getting the full treatment. You’re gonna spoil me if you keep that up… [master],”</i> [heshe] giggles, adjusting [himher]self so you can get better leverage.", parse);
							Text.NL();
							Text.Add("With Terry in a better position, you start to teasingly gulp you way up [hisher] length, bobbing your head back and forth in a smooth, steady rhythm.", parse);
							Text.NL();
							Text.Add("<i>“Oh, yes! Suck on my [fox]meat. Eat me all up like the big perv that you are,”</i> Terry cries out in pleasure, letting [hisher] tongue loll out as [heshe] draws [hisher] hips back, and thrusts into your mouth.", parse);
							Text.NL();
							Text.Add("You roll your eyes at Terry’s antics, but do your best to oblige. As your tongue and lips caress [hisher] thrusting member, your hands reach up between [hisher] legs, stroking the swaying orbs of [hisher] balls and caressing the fluffy surfaces of [hisher] inner thighs.", parse);
							Text.NL();
							if(player.sexlevel <= 3) {
								Text.Add("With your mouth so full of [fox]cock, there’s only so much you can do, but you give it your best shot.", parse);
								Text.NL();
								Text.Add("Your fingers dance over whatever parts of Terry that you can reach, stroking and kneading [hisher] balls, caressing [hisher] thighs, groping [hisher] ass and brushing down the length of [hisher] tail. Your ministrations aren’t expert, by any means, but there’s no denying your enthusiasm.", parse);
								Text.NL();
								Text.Add("And all the while, you let your [foxvixen] hump away eagerly at your mouth, whetting [hisher] appetite for what’s to come.", parse);
								Text.NL();
								if(player.FirstCock()) {
									Text.Add("<i>“Not bad, [playername], but let me teach you how to properly suck a cock.”</i> Terry’s handpaws fly to your crotch, where [heshe] finds[oneof] your [cocks].", parse);
									Text.NL();
									Text.Add("You sigh in pleasure as you feel the [foxvixen]’s muzzle engulf your flesh, blowing you with both enthusiasm and technique. Still, you continue your task, now moaning into the shaft stuffing your maw.", parse);
									Text.NL();
									Text.Add("<i>“Think that’ll be enough,”</i> Terry declares, pulling away and licking [hisher] lips off your pre-cum.", parse);
								}
								else {
									Text.Add("<i>“Ah! You’re so good to me, [playername]. Use your tongue a bit more.”</i>", parse);
									Text.NL();
									Text.Add("You grunt a muffled response to Terry’s request, working your mouth as best you can. You lap circles around [hisher] glans, curling your tongue back and around to run along the veins lining [hisher] dick.", parse);
									Text.NL();
									Text.Add("<i>“Alright, that’s enough of that,”</i> the [foxvixen] declares.", parse);
								}
								Text.NL();
								Text.Add("You can’t help but grunt as you feel Terry shifting [hisher] weight atop you, firmly pushing away from you. [HisHer] cock pops wetly from your mouth, still drooling a mixture of pre-cum and saliva down your chin and onto your [breasts]. You work your jaw, getting a little feeling back into it, eyes staring after Terry’s sweet ass as [heshe] delicately steps off of you, [hisher] tail brushing playfully against your chin as [heshe] goes.", parse);
								Text.NL();
								Text.Add("<i>“Come on, [playername]. You said you wanted my pussy. So, you’re just going to lie there and let me do all the work?”</i> Terry says teasingly, hands on [hisher] hips as [heshe] waits for you to get in position.", parse);
							}
							else {
								Text.Add("Though naturally you'd steal this opportunity to grope and fondle whatever parts of Terry you can reach, from [hisher] girly thighs to [hisher] sexy butt, you have bigger things in mind. ", parse);
								Text.NL();
								Text.Add("You caress the ripe fruit of [hisher] nuts, wishing you could spare a moment to give them a nice sucking, but Terry’s too insistent to let your mouth get put to such use. You moan plaintively at being denied it, letting the vibrations dance along [hisher] dick, tongue dexterously massaging [hisher] flesh.", parse);
								Text.NL();
								Text.Add("Finished with the fondling, you move for the other choice targets instead.", parse);
								Text.NL();
								Text.Add("One hand creeps up behind the [foxvixen]’s balls for [hisher] womanly flower, expertly manipulating its petals with your digits. You spread [himher] open, stroking and twitching, stealing a mischievous playful half-pinch of [hisher] little clitoris before pushing just the tips of your index and middle finger inside to pump back and forth.", parse);
								Text.NL();
								Text.Add("The other hand reaches further up, worming its way between the [foxvixen]’s plushly fuckable booty to trail teasing circles around [hisher] anus, pushing lightly but insistently against [hisher] back passage to try and worm a finger inside.", parse);
								Text.NL();
								Text.Add("<i>“Ack! You’re gonna make me cum!”</i> Terry cries out in warning.", parse);
								Text.NL();
								Text.Add("Well, that was the whole point... You show [himher] no mercy, swallowing Terry’s [fox]hood as deeply as you possibly can without taking [hisher] knot. As you do so, your fingers thrust themselves decisively into each of [hisher] holes.", parse);
								Text.NL();
								Text.Add("The [foxvixen] lets out a yipping cry of equal parts shock and pleasure, [hisher] pussy and ass clamping roughly down on your intruding fingers and a shudder visibly rippling through [hisher] body as [heshe] cums.", parse);
								Text.NL();
								if(terry.HorseCock())
									Text.Add("Thick gouts of hot seed relentlessly pummels your throat with jet after jet of copious fox-cum. [HisHer] knotty horsecock does a good job of plugging your mouth as it throbs. Even so, you’re no novice at this, and you manage to swallow just as fast as [heshe]’s can pump out jism.", parse);
								else
									Text.Add("Terry’s fox-cock throbs within your maw as it spews rope after rope of searing fox-cum down your throat. You smile inwardly with each whorish moan that escapes the [foxvixen]’s mouth. [HeShe]’s so cute when [heshe]’s helplessly cumming for you.", parse);
								Text.NL();
								Text.Add("When Terry starts to pant above you, you know that [heshe]’s spent. Wrapping your arms tenderly around the [foxvixen] to keep [himher] close, you roll the both of you over onto your sides. With Terry now lying down beside you, you start to wriggle your way free, the [foxvixen]’s [tcock] sliding out of your mouth.", parse);
								Text.NL();
								Text.Add("When only the tip remains in your mouth, you cease your withdrawal. With mischievous purpose, your hand reaches for [hisher] still-throbbing dick, its counterpart reaching for [hisher] balls. You caress and knead Terry’s nuts even as you pump purposefully on [hisher] shaft.", parse);
								Text.NL();
								Text.Add("Terry moans and shudders, a few last weak spurts of cream emptying themselves into your waiting mouth. There, now it looks like you’ve gotten everything. You let Terry’s dick slide out from between your lips as you finish withdrawing, but you don’t swallow the semen plastering itself over your tongue yet.", parse);
								Text.NL();
								Text.Add("<i>“Ugh… I thought you said you wanted my pussy, not my cock,”</i> [heshe] teases, laughing softly.", parse);
								Text.NL();
								Text.Add("Oh, like [heshe] doesn’t have it in [himher] to go for another round. Of course, you can’t actually say that to Terry with your mouth full of cum. So you simply clap [himher] authoritatively on the thigh, signaling that [heshe] should get into position for you.", parse);
								
								blowjob = TerryBlowjob.Came;
							}
							Text.NL();
							parse["lg"] = player.IsNaga() ? " and curling your tail" :
										  player.IsGoo() ? " and shifting your lower body" :
										  player.Humanoid() ? " and curling your legs" : "";
							Text.Add("You take a seat on the ground, keeping yourself upright[lg] to form a proper 'chair' for Terry’s shapely rump and provide proper access to your [cocks]. With a smirk, you gesture toward your lap signaling the [foxvixen] that [hisher] throne is ready.", parse);
							Text.NL();
							Text.Add("<i>“All that? For me? Aww, you’re so considerate, [playername],”</i> the [foxvixen] grins teasingly, straddling you and making [himher]self comfortable.", parse);
							Text.Flush();
							
							player.slut.IncreaseStat(50, 1);
							terry.relation.IncreaseStat(60, 1);
							terry.AddLustFraction(1);
							player.AddLustFraction(0.3);
							
							Gui.Callstack.pop();
							Gui.NextPrompt();
						}, enabled : true,
						tooltip : "Why stop with just a kiss when you could do so much more?"
					});
					options.push({ nameStr : "Push away",
						func : function() {
							Text.Clear();
							Text.Add("However tempting the offer may be, you focus and push the [fox]cock away from your lips, chiding Terry playfully that [heshe] needs to be thinking with [hisher] cunt, not [hisher] dick.", parse);
							Text.NL();
							Text.Add("<i>“Aww, you’re no fun, [playername],”</i> the [foxvixen] teases, shaking [hisher] hips. <i>“Alright then - if you want my tight cunt, you can have it. Just come and get it~”</i> [heshe] giggles.", parse);
							Text.Flush();
							
							Gui.NextPrompt();
						}, enabled : true,
						tooltip : "You’d rather not. You want pussy, and that’s what you’ll be getting."
					});
					Gui.SetButtonsFromList(options, false, null);
				}
				else
					Gui.PrintDefaultOptions();
			}
		}, enabled : true,
		tooltip : Text.Parse("Let’s see how your [foxvixen] likes being licked instead.", parse)
	});
	
	var dildoScene = function(toy : any) {
		parse["toy"]     = toy.sDesc();
		parse["toyHead"] = toy.cock.TipShort();
		
		Text.Clear();
		Text.Add("You ask Terry to just give you a moment to get something first. At the [foxvixen]’s nod, you quickly begin rooting through your belongings, smiling to yourself as you pull out your [toy]. With a grin, you turn back to Terry and start to close the distance between you, holding up your toy for [hisher] inspection.", parse);
		Text.NL();
		if(terry.Slut() < 30) {
			Text.Add("Terry raises a brow as [heshe] notices the [toy], but doesn’t say anything.", parse);
		}
		else if(terry.Slut() < 60) {
			Text.Add("Terry simply smiles knowingly.", parse);
		}
		else {
			Text.Add("<i>“Between you and me, you don’t think you have enough to play with?”</i> [heshe] asks teasingly.", parse);
			Text.NL();
			Text.Add("Oh, [heshe] knows how it goes: the more to play with, the more fun, right? You wink at [himher] knowingly in reply.", parse);
		}
		Text.NL();
		Text.Add("Closing the remaining distance between you, you reach out with the dildo toward Terry’s mouth, holding it invitingly there as you instruct [himher] to lick it.", parse);
		Text.NL();
		if(terry.Slut() < 60)
			Text.Add("<i>“O-okay...”</i> the [foxvixen] replies, opening [hisher] mouth and letting [hisher] tongue loll out to lick at the [toyHead].", parse);
		else
			Text.Add("<i>“Personally, I’d prefer some real meat between my lips, but I’ll humor you,”</i> [heshe] replies, opening [hisher] mouth and letting [hisher] tongue loll out to lick at the [toyHead].", parse);
		Text.NL();
		Text.Add("Terry starts with slow licks along the glans of the [toy], then starts moving up and down along the shaft. You tilt the toy slightly to give [himher] a better angle and [heshe] begins taking the [toyHead] in [hisher] mouth, suckling lightly.", parse);
		Text.NL();
		Text.Add("That’s a good [foxvixen], you quip, twisting your wrist to push another inch or two past Terry’s willing lips.", parse);
		Text.NL();
		Text.Add("<i>“Mmnf,”</i> is your muffled reply.", parse);
		Text.NL();
		parse["slut"] = terry.Slut() >= 60 ? Text.Parse(", struggling a little to get it out as Terry playfully insists on keeping [hisher] lips closed", parse) : "";
		Text.Add("Judging the toy suitably wet, you gently but insistently pry it from Terry’s mouth[slut]. Brandishing it with a flourish of your wrist, you place it against the nape of [hisher] neck and slowly trail it down [hisher] body.", parse);
		Text.NL();
		Text.Add("The [foxvixen] shudders as the tip of the [toy] tickles [hisher] fur.", parse);
		Text.NL();
		if(terry.Cup() < TerryFlags.Breasts.Acup) {
			Text.Add("Despite Terry’s lack of boobflesh, you can still have some fun. Bringing the spit-slick toy to rest against one of [hisher] nipples, you start to stroke it back and forth, rubbing the [toyHead] against the [foxvixen]’s nub and trailing it in circles across the flesh.", parse);
			Text.NL();
			Text.Add("<i>“Ahn! That tickles!”</i> the [foxvixen] exclaims, though [heshe] doesn’t recoil.", parse);
			Text.NL();
			Text.Add("Well, if that’s the case... your free hand reaches out for Terry’s other nipple, pinching it gently between forefinger and thumb, twiddling it with just the right amount of force that [heshe] can feel it without it hurting.", parse);
		}
		else if(terry.Cup() < TerryFlags.Breasts.Ccup) {
			Text.Add("The [foxvixen]’s small, perky breasts are just begging for a bit of attention. The flesh gives way just a little as you press the [toyHead] against it, grinding it softly against [hisher] nipple before you start to stroke and rub, tracing patterns around and over [hisher] tit.", parse);
			Text.NL();
			Text.Add("Terry moans as you stimulate [hisher] breasts with the [toy]. <i>“H-hey, watch it. That tickles!”</i>", parse);
			Text.NL();
			Text.Add("Tickles, huh? Maybe you need a little more than that. With your other hand, you reach out and cup the remaining breast, feeling it squish just a little beneath your groping digits before you start to rub and stroke. You knead the flesh with dexterous flexes of your fingers, brushing against Terry’s other nipple in time with the rubbing and stroking of your [toy].", parse);
		}
		else {
			Text.Add("Those big, juicy tits are practically singing out for you. Boobflesh squishes enticingly as you press your [toy] to one, jiggling gently as you start to grind the [toyHead] into the nipple. Lightly thrusting back and forth, you stroke and caress Terry’s [tnip] with your [toy], making [hisher] breast bounce with each flex of your wrist.", parse);
			Text.NL();
			Text.Add("<i>“Ah! Hey, be careful! - Ahn! - They’re sensitive,”</i> Terry cries out in pleasure.", parse);
			Text.NL();
			Text.Add("Sensitive, hmm? Grinning mischievously, your other hand reaches out to cup and fondle the breast you aren’t currently molesting with a [toy], groping away shamelessly, delighting in the feel of boobage squishing and jiggling between your fingers.", parse);
		}
		Text.NL();
		Text.Add("Terry pants as you continue to tease [himher]. [HeShe] cries out whenever you pinch [hisher] nipples, moaning whorishly soon after. You’ve no doubt [heshe]’s already sopping wet by now.", parse);
		Text.NL();
		Text.Add("Though your hand remains pressed against [hisher] breast, you move the [toy] away from the other nipple. ", parse);
		var belly = terry.PregHandler().BellySize();
		if(belly < 0.2)
			Text.Add("Down over Terry’s stomach it sinks, though you can’t resist stopping at [hisher] belly button, playfully rubbing the [toyHead] back and forth inside of it, trailing a circle before dropping lower.", parse);
		else if(belly < 0.6)
			Text.Add("With Terry’s bulging belly, you can’t resist playing a little, you trace patterns of loops and curls over the swollen, fur-covered orb with the [toyHead], rubbing gently against the protruding navel before continuing your descent.", parse);
		else {
			Text.Add("The roundness of Terry’s stomach compels you to get a little playful. You gently grind your [toyHead] against the pregnant [foxvixen]’s protruding navel, then start to rub it in circles around [hisher] lower belly. As you do, [hisher] skin visibly distends, a small lump suddenly rising sharply against the toy pushed against [hisher] skin, making you stop in shock. Was that...?", parse);
			Text.NL();
			Text.Add("<i>“Hey! Don’t poke my belly with that [toy],”</i> Terry says with a frown. <i>“You’re disturbing our baby!”</i>", parse);
			Text.NL();
			Text.Add("You can’t help a smile, but you manage to apologise, promising Terry you’ll stop poking [hisher] belly.", parse);
			Text.NL();
			Text.Add("<i>“Right, just be more careful. You don’t want to hurt our kit before it had a chance to see what a hopeless pervert their father is, do you?”</i> Terry asks teasingly, rubbing [hisher] baby bump.", parse);
			Text.NL();
			Text.Add("You just bite back a chuckle and continue down Terry’s body.", parse);
		}
		Text.NL();
		if(terry.FirstCock()) {
			Text.Add("Terry’s [tcock] is half-erect already and visibly jutting from its sheath. You can’t resist playfully running your [toy] along the smooth, sensitive sides of the exposed flesh. Terry visibly quakes in pleasure, but this isn’t what you’re here for and so you keep dropping.", parse);
			Text.NL();
		}
		Text.Add("Guiding your [toy] between Terry’s legs, you reach it up against Terry’s petals, rubbing the [toyHead] with careful pressure squarely against [hisher] clitoris. You can feel warm wetness dripping onto your fingers; [heshe]’s really turned on right now!", parse);
		Text.NL();
		Text.Add("<i>“Hng! Don’t you think it’s about time you stopped teasing me and gave it to me? I… I want you!”</i> [heshe] says pleadingly.", parse);
		Text.NL();
		Text.Add("You make a show of looking thoughtful... Well… You give Terry a moment or two to sweat, then smile and promise you’ll give it to [himher] alright. Taking your hand off, you give [hisher] cunt one last brush with your [toy] before you pull the slick piece away.", parse);
		Text.NL();
		parse["ls"] = player.IsNaga() ? ", curling your tail" :
					  player.IsGoo() ? ", shifting your lower body" :
					  player.Humanoid() ? ", curling your legs" : "";
		Text.Add("Taking a step or two back, you sit down[ls] to expose your [cocks] and make a seat out of your lap. Smiling, you invite Terry to sit down, so you can give [himher] what [heshe]’s craving.", parse);
		Text.NL();
		Text.Add("Terry quickly moves to straddle you, letting[oneof] your [cocks] rub against [hisher] wet [tvag] as [heshe] slides into place. <i>“Ahn!”</i> [heshe] cries out cutely as [heshe] finally settles into your lap.", parse);
		Text.NL();
		Text.Add("You chuckle; if [heshe]’s that hot now, you can’t wait to see how [heshe] reacts when you start going for real...", parse);
		Text.Flush();
		
		Gui.NextPrompt();
	};
	
	var addDildoScene = function(toy : Item) {
		if(party.Inv().QueryNum(toy) < 1) return;
		
		parse["toy"] = toy.sDesc();
		options.push({ nameStr : toy.name,
			func : dildoScene, obj : toy, enabled : true,
			tooltip : Text.Parse("You’ll give [himher] the real thing soon enough, but why not get [himher] into the proper mood with a proper tool, first? How about your [toy]?", parse)
		});
	}
	
	addDildoScene(ToysItems.SmallDildo);
	addDildoScene(ToysItems.MediumDildo);
	addDildoScene(ToysItems.LargeDildo);
	addDildoScene(ToysItems.ThinDildo);
	addDildoScene(ToysItems.ButtPlug);
	addDildoScene(ToysItems.LargeButtPlug);
	addDildoScene(ToysItems.EquineDildo);
	addDildoScene(ToysItems.CanidDildo);
	addDildoScene(ToysItems.ChimeraDildo);
		
		//TODO: additional toys
	
	Gui.SetButtonsFromList(options, false, null);
	
	Gui.Callstack.push(function() {
		Text.Clear();
		if(blowjob == TerryBlowjob.Came) {
			Text.Add("Smiling around your mouthful, you take Terry’s right hand and bring it toward your mouth, palm up, as if you were going to kiss it. Instead, you open your lips and tilt your head, allowing the sticky semen within to ooze out over [hisher] fingers. Once you have emptied your maw, you guide the ooze-dripping digits to[oneof] your [cocks].", parse);
			Text.NL();
			Text.Add("[HeShe] grins knowingly at you and begins eagerly stroking your [cock] all over. <i>“Making me lube you like this… you’re so kinky, [playername],”</i> [heshe] comments teasingly.", parse);
			Text.NL();
			Text.Add("You smile in pleasure as Terry’s lecherous fingers stroke your shaft, smearing you in the [foxvixen]’s own orgasm for lube. Bending closer, you give Terry an appreciative kiss on the lips, soft and tender, before bucking your hips as best you can to ensure that you get as lubed as possible.", parse);
			Text.NL();
			Text.Add("<i>“That’s enough,”</i> the [foxvixen] declares, releasing your [cock]. <i>“I really need you now, [playername],”</i> [heshe] says, voice dripping with lust.", parse);
			Text.NL();
		}
		Text.Add("Curling your fingers under Terry’s girlish thighs, you strain and heave [himher] up out of your lap. Guiding the [foxvixen] into proper alignment, you carefully lower [himher] down onto your jutting erection.", parse);
		Text.NL();
		if(virginFirst) {
			Text.Add("<i>“Be careful,”</i> [heshe] says as your [cock] nestles against [hisher] folds, threatening to penetrate [himher].", parse);
			Text.NL();
			Text.Add("You assure [himher] that you will, and try to take it as slowly and as gently as possible, carefully lowering the [foxvixen] down and feeling [hisher] hymen stretch and finally break as you push inside.", parse);
			Text.NL();
			Text.Add("<i>“Ah!”</i> Terry cries out at the pain of having [hisher] hymen pierced.", parse);
		}
		else if(terry.FirstVag().virgin) {
			Text.Add("<i>“Here we go again,”</i> [heshe] says, adjusting [himher]self as soon as your [cock] nestles against [hisher] folds.", parse);
			Text.NL();
			Text.Add("You nod, and reaffirm that you’ll be gentle with [himher] this time too. As carefully as you can, you continue lowering the [foxvixen] onto your cock, slowly pushing against [hisher] hymen and patiently stretching it apart rather than roughly bursting it.", parse);
			Text.NL();
			Text.Add("<i>“Ugh!”</i> Terry cries out in slight pain.", parse);
		}
		else {
			Text.Add("<i>“Ah… I’ve been waiting for this,”</i> [heshe] says, as your [cock] nestles against [hisher] folds.", parse);
			Text.NL();
			Text.Add("Smirking, you quip back that you have as well, and finish lowering Terry down into your lap, warm flesh wrapping eagerly around your [cock] as it impales [himher].", parse);
		}
		Text.NL();
		
		Sex.Vaginal(player, terry);
		terry.FuckVag(terry.FirstVag(), p1cock, 3);
		player.Fuck(p1cock, 3);
		
		parse["c"] = terry.FirstCock() ? Text.Parse(", [hisher] own meaty manhood slapping against your belly", parse) : "";
		Text.Add("With the [foxvixen] now properly seated in your lap, your [cock] buried in [himher] to the very hilt[c], you seize the moment and claim [hisher] lips in a powerful kiss.", parse);
		Text.NL();
		if(blowjob >= TerryBlowjob.Yes) {
			Text.Add("Breaking the kiss momentarily, Terry says, <i>“Mwah, I can taste myself inside your mouth.”</i>", parse);
			Text.NL();
			Text.Add("You lick your lips and nod; you enjoyed the taste, so you thought you ought to share it with [himher].", parse);
			Text.NL();
			Text.Add("<i>“Not that I can’t appreciate my fine flavor, but I’d rather have something else from you - if you catch my drift,”</i> [HeShe] replies, giving an experimental buck against you.", parse);
			Text.NL();
			Text.Add("Well, ask and [heshe] shall receive, you quip back, then cover Terry’s lips before the [foxvixen] can reply.", parse);
		}
		else {
			Text.Add("Terry kisses you back, beginning to grind against you as [hisher] legs close behind you.", parse);
			if(terry.FirstCock())
				Text.Add(" [HisHer] [tcock], already at full mast, oozes pre as [heshe] continues to grind.", parse);
		}
		Text.NL();
		parse["b"] = terry.Cup() >= TerryFlags.Breasts.Acup ? Text.Parse("hands cup [hisher] breasts, palpating them momentarily. As you do so, your", parse) : "";
		Text.Add("Lips still locked together, you start to rock your hips, grinding against and into the [foxvixen] atop you. Your [hand]s eagerly begin to roam across Terry’s form, reaching for the softest, tenderest places that you can think of. Your [b] fingers reach for Terry’s perky nipples, tweaking and twiddling them between forefinger and thumb before exploring lower.", parse);
		Text.NL();
		Text.Add("<i>“Mmmmnf!”</i> Terry moans into the kiss, [hisher] own arms moving to embrace you, handpaws scratching your back a little as [heshe] grips your shoulders momentarily.", parse);
		var wings = player.HasWings();
		if(wings) {			
			Text.Add(" You instinctively adjust your [wings] to allow the [foxvixen] to properly caress your back.", parse);
		}
		Text.NL();
		Text.Add("You can’t help but wriggle a little deeper into Terry’s arms, savoring [hisher] embrace. Your hands reach down to cup the perky bubbles that make [hisher] butt, squishing the flesh between your fingers. You caress the beautiful heart-shaped patch of fur that adorns Terry’s rump like a natural tramp stamp with one hand, the other moving to stroke luxuriantly through [hisher] silky brush tail.", parse);
		Text.NL();
		Text.Add("The [foxvixen] breaks the lip-lock momentarily, panting in pleasure. <i>“N-not my birthmark! - Ah! - You meanie...”</i> [heshe] says, leaning back to kiss you once more.", parse);
		Text.NL();
		Text.Add("You chuckle, playfully teasing Terry that [heshe] should just get used to it; [hisher] birthmark’s just too cute not to play with, especially not if [heshe]’s always going to pout like this when you do it. You accept the [foxvixen]’s return kiss eagerly, squeezing [hisher] butt for appreciation and for balance as you rock your hips back, starting to pull your cock out of the warm tightness of Terry’s cunt.", parse);
		Text.NL();
		if(player.NumCocks() > 1) {
			parse["oneof2"] = player.NumCocks() > 2 ? " one of" : "";
			Text.Add("Once you have withdrawn properly, you break the kiss, both of you panting for breath. As Terry is preoccupied, your hand snakes underneath you, reaching for[oneof2] your other [cocks2] and aligning it with the puckered hole beneath Terry’s tail. Once confident of your efforts, you start to push forward again, beginning to spear into Terry’s tailhole even as you sink deeper inside of [hisher] cunt.", parse);
			Text.NL();
			
			Sex.Anal(player, terry);
			terry.FuckAnal(terry.Butt(), p1cock, 2);
			player.Fuck(p1cock, 2);
			
			Text.Add("<i>“Ahn! My butt too?”</i> [heshe] asks, bewildered.", parse);
			Text.NL();
			parse["c"] = player.NumCocks() > 2 ? " at least" : "";
			Text.Add("Well, you do have[c] two cocks, Terry has two holes... seems fair to you. As you say this, you continue slowly pushing forward, filling Terry in front and back with your two shafts.", parse);
			Text.NL();
			Text.Add("<i>“I-I don’t know how much - Ooh! - longer I can stand this,”</i> [heshe] warns, clinging desperately onto you.", parse);
		}
		else {
			Text.Add("You break the kiss with Terry, the both of you gasping for breath. Still, your digits creep like a horny spider over the plush expanse of the [foxvixen]’s inviting bottom, worming their way into [hisher] buttock cleavage to press against the puckered ring of muscle within. Your index finger trails around it, tracing a single circle, then starts to push its way insistently inside.", parse);
			Text.NL();
			Text.Add("<i>“Ah! My butt!”</i> The [foxvixen] cries out in surprise.", parse);
			Text.NL();
			Text.Add("You shush [himher] gently, softly kissing at [hisher] bottom lip to distract [himher] for a moment. All [heshe] has to do is relax; this will make things so much better, you promise. Even as you say that, you keep pushing your finger deeper inside, allowing your own [cock] to start thrusting back into [hisher] cunt as you do.", parse);
			Text.NL();
			Text.Add("<i>“Ungh! Okay! I-I’ll try, but I don’t know how much longer I can keep this up,”</i> [heshe] warns, clinging onto you.", parse);
		}
		Text.NL();
		parse["c"] = player.NumCocks() > 2 ? "other cocks" :
		             player.NumCocks() > 1 ? "other cock" : "finger";
		Text.Add("You start to thrust for real, bucking your hips back and forth, working Terry’s cunt with your [cock] and [hisher] ass with your [c]. You soon have a steady rhythm going, the two of you gasping and panting in exertion.", parse);
		Text.NL();
		Text.Add("After a few pleasant minutes, you notice that, as much as Terry tries to cling to your torso, the [foxvixen]’s grip is weakening. You must be wearing [himher] out faster than you thought... Holding Terry tightly in your arms, you swivel around, bringing you both down to the ground on your sides in a controlled, gentle crash. Terry cries out softly, and you roll over, resting [himher] on [hisher] back and positioning yourself above [himher]. You start to thrust again, asking Terry if that’s better.", parse);
		Text.NL();
		Text.Add("The [foxvixen] smiles at you. <i>“Yeah, that feels more - Ah! - comfortable,”</i> [heshe] says between pants and moans.", parse);
		Text.NL();
		Text.Add("Lying down like this, you’re free to get a better look at your vulpine lover. Terry’s cute face whenever [heshe] moans. [HisHer] ", parse);
		if(terry.Cup() >= TerryFlags.Breasts.Ccup)
			Text.Add("luscious mounds, capped with erect little nubs poking out of [hisher] fluffy fur. ", parse);
		else if(terry.Cup() >= TerryFlags.Breasts.Acup)
			Text.Add("pert mounds, with tiny pearls that make [hisher] nipples poking out of the fluffy fur on [hisher] chest. ", parse);
		else
			Text.Add("little nipples, hardened in excitement, begging to be pressed like tiny pleasure buzzers. ", parse);
		
		var belly = terry.PregHandler().BellySize();
		if(belly < 0.2)
			Text.Add("That lean belly of [hishers]...", parse);
		else if(belly < 0.6)
			Text.Add("That bulging belly of [hishers], shaking around as you pummel [hisher] pussy...", parse);
		else
			Text.Add("Terry’s pregnant swell, heavy with your child. You wonder if the baby isn’t being bothered by how much Terry’s shaking underneath you...", parse);
		Text.NL();
		if(terry.HorseCock()) {
			Text.Add("Next, your gaze falls on Terry’s stallionhood. Huge and throbbing, it slaps obscenely against [hisher] belly as pre-cum oozes out like a faucet. [HisHer] balls churn in preparation for the huge orgasm that’s to follow as [hisher] knot swells.", parse);
			Text.NL();
		}
		else if(terry.FirstCock()) {
			Text.Add("Next, your gaze falls onto Terry’s cute foxhood. Erect and bright red, it seeps gobs of pre as it slaps against the [foxvixen]’s belly with wet flaps, [hisher] knot completely swollen as [hisher] balls work overtime to provide all the cum for [hisher] oncoming climax.", parse);
			Text.NL();
		}
		parse["c"] = player.NumCocks() > 1 ? Text.Parse("other [cocks2]", parse) : "finger";
		Text.Add("You groan in pleasure as you feel the [foxvixen]’s pussy grasp your [cock] like a vice while [hisher] rosebud clenches onto your [c]. ", parse);
		if(terry.Relation() < 60)
			Text.Add("<i>“C-can’t hold out much longer, [playername]. I’m too close to cumming!”</i> [heshe] yells.", parse);
		else
			Text.Add("<i>“D-doing my best to hold back here, [playername]. I’m too close! B-but I want to cum with you...”</i> [heshe] whines.", parse);
		Text.NL();
		Text.Add("Your own need boils within you; you know you’re in no better shape than the [foxvixen] beneath you. You need to consider how you want to finish this, and quickly!", parse);
		
		let cumbath : boolean = false;
		
		var knotted = p1cock.knot != 0;
		var doubleKnot = knotted;
		if(p2cock) knotted = knotted || p2cock.knot != 0;
		if(p2cock) doubleKnot = doubleKnot && p2cock.knot != 0;
		
		parse = Text.ParserPlural(parse, doubleKnot, null, "4");
		
		if(!strapon) {
			Text.Flush();
			
			//[Cum inside][Cum outside][Breed][Tittyjob]
			var options = new Array();
			options.push({ nameStr : "Cum inside",
				func : function() {
					Text.Clear();
					parse["c"] = player.NumCocks() > 1 ? "other dick" : "finger";
					Text.Add("<i>“[playername]! I’m cumming!”</i> Terry cries out. [HisHer] [tvag] clamps down on your [cock] while [hisher] ass does the same on your [c], both [hisher] holes working overtime to milk you of your precious cargo.", parse);
					Text.NL();
					Text.Add("It feels like barely three heartbeats before your precious willpower crumbles like a collapsing wall. Ramming in as deeply as you possibly can, you cry out to the heavens above as you release yourself into Terry’s waiting depths.", parse);
					Text.NL();
					
					var cum = player.OrgasmCum();
					
					TerryScenes.Impregnate(terry, player, cum);
					
					if(p1cock.knot != 0) {
						var knot2 = p2cock && p2cock.knot != 0;
						parse = Text.ParserPlural(parse, knot2, null, "3");
						parse["andguts"] = knot2 ? " and guts" : ""; 
						if(cum > 6) {
							Text.Add("With your knot[s3] anchoring you in place, you can’t help but ensure Terry is jammed full of the waterfall of semen gushing from your cock[s] and invading [hisher] defenseless womb[andguts]. Terry’s stomach seems to practically explode as you pour gush after gush inside of [himher], thrusting aggressively against you as [heshe] just keeps getting fuller and fuller. The pressure inside is so intense that fine sprays of seed start spurting out around the seal[notS3] of your bulb[s3].", parse);
							Text.NL();
							Text.Add("Despite this, Terry’s stomach just keeps getting bigger and bigger until it fills the space between you completely, pressing against not only your own belly, but against your loins and even your [breasts]. And it still grows, deforming outwards in response to the pressure of your body against it, wobbling over Terry’s sides as you finally finish.", parse);
							Text.NL();
							Text.Add("The stuffed [foxvixen] audibly sloshes and gurgles with each breath, stomach churning underneath you until you feel like you are lying atop your own personal velvety waterbed.", parse);
						}
						else if(cum > 3) {
							Text.Add("Terry’s stomach begins to bloat from the volume of your orgasm, but your knot[s3] seal[notS3] [hisher] hole[s3] shut, ensuring that not a drop of your ejaculate escapes.", parse);
							Text.NL();
							Text.Add("The dome of the [foxvixen]’s tummy rises up quickly and steadily, growing ever larger with each heartbeat. By the time you are finally finished, it is brushing insistently against your own torso, allowing you to feel the warmth of the fur-sheathed orb brushing against your stomach, loins, even against your [breasts]. Terry’s belly wobbles slightly with each rise and fall, and you find yourself rising up and down along with it.", parse);
						}
						else {
							Text.Add("Jammed shut as [heshe] is, there’s nowhere for your cum to escape from. Terry’s stomach visibly rises up by the time you are done, crammed full with enough semen to add several inches to [hisher] former girth. Feeling quite blissfully drained, you allow yourself to rest gently atop the newly swollen [foxvixen].", parse);
						}
					}
					else {
						if(cum > 6) {
							Text.Add("Cum explodes into Terry’s depths like a perverted volcano eruption. Though much of it spurts back out afterward, the bulk of it spirals deep into Terry’s belly, ballooning it outwards with such vigor that it thrusts itself against you.", parse);
							Text.NL();
							parse["andass"] = player.NumCocks() > 1 ? " and ass" : "";
							parse["le"] = player.HasLegs() ? "your respective legs" : Text.Parse("your [legs] and Terry's legs", parse);
							Text.Add("By the time you finally finish, Terry looks to have doubled [hisher] previous weight with all the extra bulk concentrated on [hisher] belly, and a veritable river of semen flows from [hisher] cunt[andass] down between [le].", parse);
							Text.NL();
							Text.Add("You are resting atop the sloshing orb, feeling it quiver and shake with each breath that Terry takes.", parse);
						}
						else if(cum > 3) {
							Text.Add("As your tidal wave of semen flows inside of Terry, the [foxvixen]’s stomach starts to expand, gaining inch by inch even as excess spunk trickles back out again. By the time you finish, Terry looks like [heshe] could have just swallowed a watermelon whole even despite the leaking fluids seeping from between [hisher] legs. [HisHer] new belly makes a perfect cushion for your own torso as you sink down upon [himher] to rest.", parse);
						}
						else {
							Text.Add("Thick and sloppy, your cream splashes deep into Terry’s waiting hole[s], swirling eagerly away into [hisher] depths. Finally spent, you sink down atop your lover, enjoying the feel of resting against [himher].", parse);
						}
					}
					
					Text.NL();
					Text.Add("<i>“Ugh...”</i> the [foxvixen] groans in exertion. <i>“You really filled me up, [playername].”</i>", parse);
					Text.NL();
					Text.Add("Smiling merrily, you quip back that you couldn’t help yourself; Terry’s just too fuckable for [hisher] own good. And you gently kiss [himher] on the nose for emphasis.", parse);
					Text.NL();
					if(terry.Relation() < 60)
						Text.Add("<i>“Whatever you say, you incorrigible perv,”</i> [heshe] quips back teasingly.", parse);
					else
						Text.Add("<i>“Yes, I know you can’t resist my foxy charms,”</i> [heshe] giggles.", parse);
					Text.NL();
					if(terry.FirstCock()) {
						Text.Add("Pressed together as you are, you can feel it intimately when something twitches against your stomach. It doesn’t take you more than a heartbeat to realize what it is, and you playfully ask why Terry still hasn’t managed to cum yet.", parse);
						Text.NL();
						Text.Add("<i>“Kinda difficult to cum with you pressing down on my cock,”</i> [heshe] teasingly replies. <i>“Not that I’m complaining. It also feels kinda good...”</i>", parse);
						Text.NL();
						Text.Add("Maybe... but you’ll bet that finally shooting [hisher] load off will be a lot better.", parse);
						Text.NL();
						if(terry.HorseCock()) {
							Text.Add("You wriggle slightly, shifting your body atop Terry’s until the distinctive shape of [hisher] proud stallion-cock comes into view, visibly throbbing as pre-cum oozes like magma from its half-flared tip.", parse);
							Text.NL();
							if(player.Slut() >= 45)
								Text.Add("Grinning mischievously, you can’t help but lick your lips at the tasty treat you are about to enjoy. Your hand works its way between your bodies to start stroking the lower part of Terry’s shaft, feeling its distinctly un-equine knot bulging against your fingers. As you do, you bend in and start to tease the upper part of Terry’s cock with your tongue, caressing the shaft with slow, deliberate licks and gently nibbling on the flare.", parse);
							else
								Text.Add("Though you need to wriggle back slightly to get a better grip, you start to pump away enthusiastically at Terry’s drooling erection. Smooth, steady strokes glide from [hisher] bulging knot to [hisher] flare and back again, nice and even in their rhythm.", parse);
							Text.NL();
							Text.Add("<i>“Augh! C-cummin~!”</i> Terry cries out with a grimace.", parse);
							Text.NL();
							Text.Add("You watch in amusement as the [foxvixen]’s stallionhood throbs in your grasp, spewing forth the load hidden within Terry’s balls like a great volcano. White, hot jism rains down upon the [foxvixen]’s prone form, falling down like a perverted rain to mat [hisher] fluffy fur with the undeniable proof of your recent activities. By the time [heshe]’s done, [heshe]’s a complete mess!", parse);
							Text.NL();
							parse["cum"] = cum > 3 ? " and semen-stuffed" : "";
							Text.Add("Grinning widely, you quip that’s a very good look for Terry; cum-glazed[cum] is definitely something [heshe] carries well.", parse);
							Text.NL();
							Text.Add("<i>“Hmph. Maybe I should aim at you next time,”</i> [heshe] quips back.", parse);
							Text.NL();
							parse["kn"] =! player.HasSkin() ? " - if you had any to try it on" : "";
							if(player.Slut() >= 60)
								Text.Add("Oh, [heshe] definitely should; you hear [foxvixen] spooge just does wonders for the skin[kn]. You laugh and shoot your lover a wink.", parse);
							else
								Text.Add("Well... fair is fair, isn’t it?", parse);
						}
						else {
							parse["foxcock"] = terry.mfPronoun("fox-cock", "vixen-prick");
							Text.Add("Feeling between you with one hand, you manage to close your fingers around the dainty piece of throbbing meat that is Terry’s petite [foxcock]. As best you can, you stroke and tease the [foxvixen]’s dick, grinding your hips to [hishers] as you do.", parse);
							Text.NL();
							Text.Add("<i>“H-here it comes!”</i> [heshe] cries out.", parse);
							Text.NL();
							Text.Add("You watch as the [foxvixen]’s crimson member throbs, its knot expanding just a bit more as Terry fires off ropes of hot fox-seed toward the sky. One after the other, they fall atop [hisher] prone body, matting [hisher] fur with the creamy excess that resulted from your activities. Once [heshe]’s done, [heshe] sighs with relief. <i>“Ah, that hit the spot. I really needed that.”</i>", parse);
							Text.NL();
							Text.Add("It certainly looks like it, you agree.", parse);
						}
						
						cumbath = true;
					}
					else {
						Text.Add("As you shift your position slightly, you grind your [cocks] around inside of Terry’s hole[s], an action that elicits a soft whimper from the [foxvixen] beneath you. Blinking, you brush your fingers gently over one of Terry’s arms, feeling the muscles tensing beneath [hisher] skin, and your eyes widen in realization.", parse);
						Text.NL();
						Text.Add("A teasing smirk spreads across your lips as your hands start to brush along Terry’s arms with more purpose, deliberately grinding against [himher] hips to hips. As you do, you teasingly note that Terry seems to be a little tense, playfully asking [himher] what’s wrong.", parse);
						Text.NL();
						Text.Add("<i>“S-still a bit - Ahn! - on edge,”</i> [heshe] replies.", parse);
						Text.NL();
						Text.Add("Still on edge?", parse);
						Text.NL();
						Text.Add("<i>“Well, you did get me to cum a little already, but - Oh!”</i>", parse);
						Text.NL();
						Text.Add("You slide your hips back again, having cut Terry off with a purposeful grind into [hisher] hips. But nothing; you’re not letting your little [foxvixen] walk away from this without making sure [heshe] gets off too.", parse);
						Text.NL();
						Text.Add("Terry stares at you, opening [hisher] mouth as if to say something, but you cut [himher] off with a possessively passionate kiss. You thrust your [tongue] shamelessly into [hisher] mouth, wrestling [hisher] own tongue into submission. As you do, your hands start to move into a proper position, one reaching down for [hisher] clitoris, the other toward [hisher] nipples...", parse);
						Text.NL();
						parse["c"] = player.NumCocks() > 1 ? Text.Parse(" and [tanus]", parse) : "";
						parse["k"] = p1cock.knot != 0 ? Text.Parse(", even with your knot plugging [himher]", parse) : "";
						Text.Add("The [foxvixen] groans into the kiss as you feel [hisher] [tvag][c] clench onto your member[s]. A flood of vixen-juice escapes the seal of your shaft[k]. You moan in pleasure as [hisher] squirting femcum hits your [cockTip] before leaking around your shaft.", parse);
						Text.NL();
						Text.Add("<i>“[stuttername], you jerk! I’m still sensitive and you go forcing another orgasm on me,”</i> Terry chastises you, pouting and trying to look mad at you.", parse);
						Text.NL();
						Text.Add("Forcing? That’s a bit of a strong word, doesn’t [heshe] think? You grin and shake your head at Terry’s antics. Besides, what were you supposed to do? You couldn’t just leave your Terry all pent up, not after [heshe] went and milked you dry earlier...", parse);
						Text.NL();
						Text.Add("<i>“Hmph. I wasn’t ready to cum yet.”</i>", parse);
						Text.NL();
						Text.Add("Smiling, you tap an index finger playfully against the [foxvixen]’s nose, teasing [himher] about how [heshe]’s just so adorable when [heshe] tries to feign being mad at you.", parse);
						Text.NL();
						Text.Add("The [foxvixen] regards you with a pout before sighing. <i>“I can’t really stay mad at you...”</i>", parse);
						Text.NL();
						Text.Add("You just smile, assure [himher] that’s part of [hisher] charms, and gently steal a quick kiss from [hisher] lips before snuggling back down.", parse);
					}
					Text.NL();
					
					terry.OrgasmCum();
					
					if(cumbath) {
						Text.Add("<i>“Ugh. I hope you like creamy [foxvixen]. I’m a total mess right now.”</i>", parse);
						Text.NL();
						Text.Add("You make a show of looking over the spooge slick fur of your vulpine lover before grinning and assuring [himher] that [heshe] pulls the look off <i>very</i> well. There’s just something sexy about the sight of [himher] utterly drenched in [hisher] own semen.", parse);
						Text.NL();
						Text.Add("<i>“There’d better be since this is all your fault,”</i> Terry replies teasingly. <i>“Speaking of which, how long do you plan to stay inside me? I could really use a bath...”</i>", parse);
						Text.NL();
						if(knotted) {
							Text.Add("Well, that’s not exactly up to you, and you tug your bulging knot[s4] inside of Terry’s hole[s4] to emphasize your point.", parse);
							Text.NL();
							Text.Add("<i>“I guess you have a point,”</i> [heshe] sighs. <i>“Well, I guess I get to ‘forcibly’ enjoy you a little longer,”</i> [heshe] giggles.", parse);
							Text.NL();
							Text.Add("You smile happily and nod, enjoying the sound of Terry’s laugh.", parse);
							Text.NL();
							Text.Add("<i>“Just hope all this semen won’t dry up till you can pull out. You have no idea how tough it is to clean up dry cum when you got fur as fluffy as mine.”</i>", parse);
							Text.NL();
							Text.Add("You nod your head in idle agreement, busy with snuggling yourself appreciatively into the soft fluffyness of your vulpine pillow. As you close your eyes and allow yourself to luxuriate in Terry’s warmth, you idly promise [himher] that, whether it dries or not, you’ll help Terry clean [himher]self off when you’re done.", parse);
							Text.NL();
							Text.Add("<b>Later...</b>", parse);
							Text.NL();
							Text.Add("Finally feeling your knot[s4] deflate, you wriggle your hips and pop yourself free. Now, that just leaves the question of how to clean Terry up...", parse);
							
							TimeStep({hour : 1});
						}
						else {
							Text.Add("You pout and ask if Terry really wants you out of [himher] already? [HeShe]’s so comfortable!", parse);
							Text.NL();
							Text.Add("<i>“I’m also very dirty, and you wouldn’t believe how tough it is to clean dry cum from fluffy fur.”</i>", parse);
							Text.NL();
							Text.Add("You have to admit to yourself that the [foxvixen] has a point. Slowly and tenderly, you pull yourself free of Terry’s leaking hole[s], pausing whilst still atop [himher] to study the mess. Since this is your fault, you resolve that you should help Terry with the clean up.", parse);
						}
						Text.Flush();
						
						TimeStep({hour: 1});
						terry.slut.IncreaseStat(100, 1);
						terry.relation.IncreaseStat(100, 1);
					
						TerryScenes.PCCleansTerry();
					}
					else {
						Text.Add("<i>“Phew, when you get going, there’s just no stopping you,”</i> Terry idly comments, still panting in exertion.", parse);
						Text.NL();
						Text.Add("[HeShe] certainly wasn’t complaining about that before, you quip, even as you gulp for air yourself.", parse);
						Text.NL();
						Text.Add("<i>“That’s because you were smothering me with your lips,”</i> [heshe] teases.", parse);
						Text.NL();
						Text.Add("You were smothering [himher]? Funny... the way you remember it, it was [himher] who wouldn’t let you up.", parse);
						Text.NL();
						if(terry.Relation() < 30) {
							Text.Add("<i>“In your dreams, perv,”</i> Terry replies, though [heshe] does have a smile on [hisher] face. <i>“Anyways… how long do you intend to stay inside me?”</i>", parse);
							Text.NL();
							Text.Add("You put on a thoughtful expression. Well... ", parse);
							if(knotted) {
								Text.Add("As long as it takes for your knot[s4] to deflate, you reckon.", parse);
								Text.NL();
								Text.Add("<i>“Ah, I’d forgotten about that...”</i> Terry sighs. <i>“So… what do we do until then?”</i>", parse);
								Text.NL();
								Text.Add("You simply smile, peck Terry gently on the lips, then lay your head back down upon [hisher] [tbreasts] and snuggle in softly, sighing in pleasure as you get comfortable.", parse);
								Text.NL();
								Text.Add("<i>“A-alright, I supposed that’s one way...”</i> the [foxvixen] says, a bit uncomfortable with your closeness. But [heshe] settles down all the same.", parse);
								
								TimeStep({hour: 1});
							}
							else {
								Text.Add("If it really bothers [himher] so much, you suppose you can get out now.", parse);
								Text.NL();
								Text.Add("<i>“It’s...”</i> [heshe] seems to ponder the feeling for a few moments before finally adding, <i>“kinda weird, I guess.”</i>", parse);
								Text.NL();
								Text.Add("With a smile, you assure [himher] that it’ll stop feeling so weird with practice. But if [heshe]’ll let you stay a little longer, it’ll help it to stop feeling so weird.", parse);
							}
						}
						else if(terry.Relation() < 60) {
							Text.Add("<i>“Well, you were unexpectedly tasty. So, you can’t really blame for trying to get a more lasting flavor out of you.”</i>", parse);
							Text.NL();
							Text.Add("You just chuckle; if that’s how [heshe] feels, [heshe] only needs to ask whenever [heshe] wants a taste. You promise you’ll always have the time to refresh [hisher] memory.", parse);
							Text.NL();
							Text.Add("<i>“Don’t flatter yourself, you’re not THAT tasty,”</i> [heshe] quips back. ", parse);
							if(knotted) {
								Text.Add("<i>“Anyway, how long till your knot[s4] deflate[notS4] so we can get going?”</i>", parse);
								Text.NL();
								Text.Add("You visibly think it over, then shrug your shoulders flippantly. As long as it takes. With such a sexy [foxvixen] under you, why, you can’t make any promises.", parse);
								Text.NL();
								Text.Add("<i>“Flatterer,”</i> [heshe] giggles. <i>“Alright, I guess we’ll just wait.”</i>", parse);
								
								TimeStep({hour: 1});
							}
							else {
								Text.Add("<i>“In any case, how much longer do you plan to stay inside me?”</i>", parse);
								Text.NL();
								Text.Add("Pouting, you teasingly ask if [heshe]’s really so eager to be rid of you already.", parse);
								Text.NL();
								Text.Add("The [foxvixen] rolls [hisher] eyes. <i>“No, I’m not. I suppose you can stay a while longer...”</i>", parse);
								Text.NL();
								Text.Add("You smirk in triumph, pointedly cuddling back up to your vulpine lover, burying your head against [hisher] [tbreasts] and sighing in pleasure at the feeling of being so close.", parse);
							}
						}
						else {
							Text.Add("<i>“Hey, I have every right to push for more when a sexy [boygirl] like you puts the moves on me. Key point being: you started it.”</i>", parse);
							Text.NL();
							Text.Add("You nod your head, slowly conceding this is truth. Then, with a wicked grin, you kiss Terry passionately on the lips, breaking the lip-lock only to whisper gently into [hisher] ear that [heshe] was the one who finished it.", parse);
							Text.NL();
							Text.Add("<i>“Who says I’m done?”</i> [heshe] asks with a mischievous grin. Before you can reply, [heshe] grabs your head and pulls you into another kiss. It doesn’t last long though.", parse);
							Text.NL();
							Text.Add("<i>“Not done yet - just taking a break to catch my breath,”</i> [heshe] warns.", parse);
							Text.NL();
							Text.Add("You believe it... and you couldn’t be happier.", parse);
							Text.NL();
							if(knotted) {
								Text.Add("<i>“So, love, how long till your knot[s4] deflate[notS4]?”</i>", parse);
								Text.NL();
								Text.Add("With a smirk, you quip back that it depends on how long Terry wants it to be.", parse);
								Text.NL();
								Text.Add("<i>“Good, that gives me plenty of time to play with you then,”</i> [heshe] says with a predatory smirk, hands caressing your cheek.", parse);
								Text.NL();
								Text.Add("Oh, beat still my heart, you whisper, leaning back against your lover in a passionate embrace.", parse);
								
								TimeStep({hour: 1});
							}
							else {
								Text.Add("<i>“Not that I have a problem with it or anything, but how long do you intend to stay inside?”</i>", parse);
								Text.NL();
								Text.Add("As long as Terry will let you, you shoot back, snuggling yourself down into Terry’s [tbreasts]. After all, [heshe] isn’t <b>really</b> in a hurry to get rid of you, is [heshe]?", parse);
								Text.NL();
								Text.Add("<i>“Of course not, love. Just thought that the sooner you leave me, the sooner you’ll be ready for another round,”</i> [heshe] quips back with a smirk.", parse);
								Text.NL();
								Text.Add("That is true... still, you’d rather cuddle for a little while first before you leave. You glance up with the widest, most innocent-looking eyes you can muster at your vulpine bedmate, playfully pleading with [himher] to agree.", parse);
								Text.NL();
								Text.Add("<i>“Oh, alright. You know I can’t say no when you make that face...”</i> Terry replies, rolling [hisher] eyes and hugging you affectionately.", parse);
							}
						}
						Text.Flush();
						
						Gui.NextPrompt(function() {
							Text.Clear();
							Text.Add("<b>Later…</b>", parse);
							Text.NL();
							Text.Add("With a little shifting and some wriggling of your hips, you pull yourself free of Terry’s warm hole[s], whiteness streaming in your wake. Shifting your weight, you slide off of Terry’s sprawling form and haul yourself upright before reaching down and offering the [foxvixen] a hand to join you.", parse);
							Text.NL();
							Text.Add("Terry gladly accepts the help, one hand moving to catch some of the whiteness.", parse);
							Text.NL();
							if(terry.Slut() < 60) {
								Text.Add("[HeShe] brings [hisher] hand level with [hisher] eyes and looks at your combined juices. <i>“You really came a lot.”</i>", parse);
								Text.NL();
								Text.Add("You did, yes. It helps when you have such a cute bedmate as Terry to play with.", parse);
								Text.NL();
								Text.Add("<i>“Alright, that’s enough flattery. Let’s just get dressed and go.”</i>", parse);
							}
							else {
								Text.Add("[HeShe] brings [hisher] hand to [hisher] mouth and begins lapping at [hisher] digits. <i>“Hmm, so tasty. Though there’s still room for improvement flavor-wise.”</i>", parse);
								Text.NL();
								Text.Add("Oh? So now [heshe]’s an expert, hmm? You smile teasingly, even as you playfully shake your head.", parse);
								Text.NL();
								Text.Add("<i>“Kinda have to be with you around,”</i> [heshe] teasingly replies. <i>“But enough chitchat for now. Let’s get dressed and go.”</i>", parse);
							}
							Text.NL();
							Text.Add("After a few moments, you and Terry busy yourselves getting back into your respective gear. Once you’re both dressed, you set off again.", parse);
							Text.Flush();
							
							TimeStep({hour: 1});
							terry.slut.IncreaseStat(100, 1);
							terry.relation.IncreaseStat(100, 1);
					
							Gui.NextPrompt();
						});
					}
				}, enabled : true,
				tooltip : Text.Parse("Terry’s just begging for you to fill [himher] up. So why not give [himher] the entire course?", parse)
			});
			options.push({ nameStr : "Cum outside",
				func : function() {
					Text.Clear();
					Text.Add("Vigorously, you continue thrusting, feeling yourself climbing the metaphorical wall. So close now, so close...", parse);
					Text.NL();
					Text.Add("<i>“Ah! - [playername]! - Uhn! - I don’t think - Ah! - I can hold out any - Hng! - more!”</i>", parse);
					Text.NL();
					parse["c"] = terry.FirstCock() ? " and maleness" : "";
					Text.Add("Pulling back with all your will, you manage to pop your cock[s] free of the writhing [foxvixen] below you. Aiming your [cock] at [hisher] clitty[c], you thrust forward again, rubbing and grinding upon the sensitive flesh.", parse);
					Text.NL();
					Text.Add("As one, you shudder and cry out, orgasm surging through the pair of you. Grabbing your throbbing [cocks], you aim [itThem] at Terry’s [tbreasts] and face, showering [himher] with glistening streamers of off-white seed. Your mind fades away in the tide of white-hot pleasure, only dimly cognizant as you paint your lover’s features and chest with pearlescent ropes of cum.", parse);
					Text.NL();
					if(terry.FirstCock()) {
						Text.Add("You feel Terry’s [tcock] throb against your own, and look as the [foxvixen]’s prick unleashes it’s own cascade of white upon [hisher] hapless body - a huge load, ", parse);
						if(terry.HorseCock())
							Text.Add("fitting of the member that’s firing it.", parse);
						else
							Text.Add("unlike the below-average fox-cock that’s firing it.", parse);
						Text.NL();
					}
					
					player.OrgasmCum();
					terry.OrgasmCum();
					
					Text.Add("Terry is only capable of crying out in pleasure as cum gathers in [hisher] once-soft fur, utterly plastering it with the results of your recent activities. Some of the seed even manages to get into [hisher] mouth, but if [heshe] minds, or even notices, you can’t tell.", parse);
					Text.NL();
					Text.Add("Feeling mischievous, you angle your [cocks] to try and aim the last few spurts gushing from your dick[s] at Terry’s open mouth, ending with a few pitiful last dribbles that splatter messily on [hisher] belly.", parse);
					Text.NL();
					Text.Add("The [foxvixen] lies on the ground, panting and trying to catch [hisher] breath. <i>“Uhnn… I’m a total mess,”</i> [heshe] mutters.", parse);
					Text.NL();
					Text.Add("Yeah, [heshe] kind of is, you immediately agree. However, you note with a smile, [heshe] looks pretty sexy when [heshe]’s all messed up like this.", parse);
					Text.NL();
					if(terry.Relation() < 30)
						Text.Add("<i>“Yeah, whatever you say...”</i> [heshe] replies. <i>“Damn, this is going to be so hard to clean up...”</i>", parse);
					else if(terry.Relation() < 60)
						Text.Add("<i>“Thanks, ya big perv,”</i> Terry replies with a chuckle. <i>“But I bet I won’t look half as sexy when all of this is dried up.”</i> [HeShe] sighs. <i>“It’s going to be a bitch to wash this out of my fur...”</i>", parse);
					else {
						Text.Add("<i>“What? You mean I don’t always look sexy?”</i> Terry asks teasingly.", parse);
						Text.NL();
						Text.Add("Of course [heshe] does! It’s just, well, that nice glazing of semen helps make [himher] look <b>extra</b> sexy.", parse);
						Text.NL();
						Text.Add("<i>“Good,”</i> the [foxvixen] says with a satisfied nod. <i>“Enjoy the sight while you can, [playername]. I’m going to have to wash this out before it dries.”</i>", parse);
					}
					Text.NL();
					Text.Add("Well, you made the mess, it’s only fair you should offer Terry a hand... you ask the [foxvixen] if you can help [himher] with the clean up.", parse);
					Text.NL();
					Text.Add("<i>“Sure, I’d love to get some help cleaning up,”</i> [heshe] replies with a smile.", parse);
					Text.Flush();
					
					terry.slut.IncreaseStat(100, 2);
					terry.relation.IncreaseStat(100, 1);
					TimeStep({hour: 1});
					
					TerryScenes.PCCleansTerry();
				}, enabled : true,
				tooltip : Text.Parse("Pull out of your vulpine lover and glaze [himher] over with a nice layer of jism.", parse)
			});
			options.push({ nameStr : "Breed",
				func : function() {
					Text.Clear();
					Text.Add("With a shudder, you pull yourself firmly out of the writhing [foxvixen] beneath you. Terry lets out a wordless mewl of protest, but before [heshe] can articulate a more formal complaint, your hands lunge for [hisher] rear. Squeezing [himher] around the hips, you bodily roll [himher] over onto [hisher] front, pulling [hisher] ass up so that [heshe] is kneeling with [hisher] face down on the ground.", parse);
					Text.NL();
					parse["c"] = player.NumCocks() > 1 ? Text.Parse(" and [tanus]", parse) : "";
					Text.Add("<i>“[playername]? What are you- Ah!”</i> You cut [himher] off before [heshe] can finish by penetrating [hisher] [tvag][c] once more.", parse);
					Text.NL();
					Text.Add("Properly in place again, you take Terry by the hips and start to pump away, harder and faster than you have before. As best you can, you grind yourself down Terry’s [tvag], trying to angle yourself to thrust as deeply as possible; you <b>need</b> to fill [hisher] womb with as much cum as you possibly can!", parse);
					Text.NL();
					if(player.NumCocks() > 1) {
						parse["c"] = terry.FirstCock() ? Text.Parse(" and paying special attention to [hisher] prostate", parse) : "";
						Text.Add("At the same time, you angle and grind with your second [cock], firmly rutting Terry’s anus[c] in your efforts to make [hisher] cervix dilate.", parse);
						Text.NL();
					}
					if(terry.Relation() < 30)
						Text.Add("<i>“A-ah! Be more gentle, [playername]! You’re- Ah!”</i> the [foxvixen] tries to protest.", parse);
					else if(terry.Relation() < 60)
						Text.Add("Terry moans and pants as you thrust into [himher] with abandon. <i>“Uh! Take it easy - Oh! - [playername]. I’m not - Ah! - going anywhere!”</i>", parse);
					else
						Text.Add("By this point, Terry is reduced to a moaning mess, but [heshe] still does [hisher] best to reciprocate your thrusts. <i>“I - Ah! - I don’t know what brought this on, b-but I like it!”</i>", parse);
					Text.NL();
					Text.Add("Your hips slap against Terry’s with audible force - you just know the both of you are going to be walking a little funny after this. You can feel it... your cock[s] [isAre] throbbing in anticipation; you’re going to blow any time now.", parse);
					Text.NL();
					parse["k"] = knotted ? Text.Parse(", your knot[s4] bloating to their full glory and anchoring you in place", parse) : "";
					Text.Add("Grabbing Terry’s ass for dear life, you thrust yourself as hard and as deeply as you can into [hisher] waiting hole[s]. You can feel it boiling within you, a rising tide of cum just aching to flood the [foxvixen]’s womb and fill [himher] with your child. Trembling in your excitement, you cry out and slam yourself in for the final time[k]. No sooner have your hips battered against Terry’s rear than you explode inside of [himher], hot seed gushing freely into [hisher] hole[s].", parse);
					Text.NL();
					
					terry.OrgasmCum();
					
					parse["c"] = player.NumCocks() > 1 ? " and ass both" : "";
					parse["considerable"] = terry.HorseCock() ? " considerable" : "";
					Text.Add("Your climax triggers the [foxvixen]’s own, [hisher] pussy[c] clamp[notS] down on your intruding cock[s]. ", parse);
					if(terry.FirstCock())
						Text.Add("[HisHer] own [tcock] spasms as it begins shooting it’s own[considerable] load onto the ground below. ", parse);
					Text.Add("<i>“[playername]!”</i> Terry cries out in pleasure.", parse);
					Text.NL();
					Text.Add("You cry out in response, shouting Terry’s own name back to [himher].", parse);
					Text.NL();
					
					var cum = player.OrgasmCum();
					
					TerryScenes.Impregnate(terry, player, cum * 3);
					
					if(cum > 6) {
						Text.Add("Great gushes of semen wash into Terry like an ocean of spunk, filling [himher] to the brim and beyond. Such is the cascade of cum you have unleashed that Terry’s stomach distends, hanging pendulously down until it almost brushes the ground; [heshe] looks like [heshe] could drop a kit or two any day now. You’re almost certain that [heshe]’s going to get pregnant from this.", parse);
					}
					else {
						Text.Add("Pent up as you are, your load is much larger than normal. Terry’s belly begins to bloat, swelling into a cantaloupe-sized bulge, almost as if foreshadowing what will happen to [himher] after your seed takes hold.", parse);
					}
					Text.NL();
					Text.Add("Finally, your climax ends and you slump over Terry’s prone form, panting from the exertion.", parse);
					Text.NL();
					Text.Add("<i>“Hmm, so full,”</i> the [foxvixen] says before collapsing [himher]self.", parse);
					Text.NL();
					Text.Add("You reach out and gently stroke the long mane of red hair flowing onto Terry’s shoulders, your other hand rubbing [hisher] shoulders with equal tenderness. Conversationally, you note that you hope Terry doesn’t mind being so full because it’s very likely [heshe]’s going to feel that way for a while.", parse);
					Text.NL();
					if(terry.Relation() < 30) {
						Text.Add("<i>“You were pretty rough...”</i>", parse);
						Text.NL();
						Text.Add("You apologize for that as best you can. Still, it was for a purpose, you assure [himher] of that.", parse);
						Text.NL();
						Text.Add("<i>“Right… well, it’s not like I have any say about it...”</i>", parse);
						Text.NL();
						Text.Add("Maybe it wasn’t such a good idea to do this so early. You can practically hear the frown on Terry’s face. You’re going to need to work on [himher] if you want [himher] to like you more again.", parse);
						
						terry.relation.DecreaseStat(0, 1);
					}
					else if(terry.Relation() < 60) {
						Text.Add("<i>“Wow, that was… unexpected.”</i>", parse);
						Text.NL();
						Text.Add("You ask if Terry really thought it was so bad - did [heshe] really not like it?", parse);
						Text.NL();
						Text.Add("<i>“Not really, but I would’ve appreciated a warning at least.”</i>", parse);
						Text.NL();
						Text.Add("You apologize, stating that you were caught up in the moment; if you had a moment to think, you would have warned [himher] what you were going to do, you promise.", parse);
						Text.NL();
						Text.Add("<i>“Right...”</i>", parse);
						
						terry.relation.DecreaseStat(0, 1);
					}
					else {
						Text.Add("<i>“Didn’t know you’d get this… intense,”</i> Terry chuckles. <i>“Not that I’m complaining, but wow… what brought this on?”</i>", parse);
						Text.NL();
						Text.Add("Bending down is a little awkward, but you manage to teasingly kiss the tip of one of Terry’s ears, which flicks at the touch. Why, you were simply overcome by Terry’s beauty, that’s all. Also, well, you were convinced that now was the time to make a real effort toward expanding your little family with [himher]...", parse);
						Text.NL();
						Text.Add("<i>“I see.”</i> Terry takes a deep breath and smiles. <i>“Well, if you really want that, I have no objections, though I expect to be pampered and spoiled if it took,”</i> [heshe] adds teasingly.", parse);
						Text.NL();
						Text.Add("You chuckle, and assure Terry that’s exactly what you had in mind from the beginning. Though you have to ask, what if it didn’t take?", parse);
						Text.NL();
						Text.Add("<i>“If it didn’t, then we get to try again later,”</i> [heshe] says, reaching back to grab your [butt]. <i>“We can keep trying as much as you want, love.”</i>", parse);
						Text.NL();
						Text.Add("You chuckle and rub Terry’s ear in that way you know [heshe] loves. That’s your Terry, alright...", parse);
						
						terry.relation.IncreaseStat(100, 2);
					}
					Text.Flush();
					
					terry.slut.IncreaseStat(100, 2);
					
					TimeStep({hour: 1});
					
					Gui.NextPrompt();
				}, enabled : (player.HasPerk(Perks.Breeder) || player.sexlevel >= 5) && terry.PregHandler().IsPregnant() == false,
				tooltip : Text.Parse("Show Terry what that cunt of [hishers] is really for! Breed [himher] like the bitch [heshe] is and fill [himher] full of kits!", parse)
			});
			if(terry.Cup() >= TerryFlags.Breasts.Ccup) {
				options.push({ nameStr : "Tittyjob",
					func : function() {
						Text.Clear();
						Text.Add("Inhaling deeply to help yourself focus, you pull yourself purposefully from Terry’s used hole[s], pre-cum seeping sluggishly from your [cocks] as you clear the [foxvixen]’s tunnel[s].", parse);
						Text.NL();
						if(terry.Relation() < 30) {
							Text.Add("<i>“Huh? Why did you stop?”</i>", parse);
							Text.NL();
							Text.Add("Because you can think of something else to do, something you are quite sure Terry will enjoy if [heshe] gives it a chance.", parse);
							Text.NL();
							Text.Add("The [foxvixen] sighs. <i>“I’m afraid to even ask… but what do you have in mind?”</i>", parse);
						}
						else if(terry.Relation() < 60) {
							Text.Add("<i>“Hmm? Is something the matter, [playername]?”</i>", parse);
							Text.NL();
							Text.Add("You shake your head, assuring the [foxvixen] that everything’s fine. You just feel like a different sort of finisher, this time.", parse);
							Text.NL();
							Text.Add("<i>“Oh? Well, what do you intend to do?”</i>", parse);
						}
						else {
							Text.Add("<i>“Aww, why did you pull out?”</i>", parse);
							Text.NL();
							Text.Add("Because, as lovely as Terry’s cunt is, those sweet boobs of [hishers] are just begging to get a little fun, too.", parse);
							Text.NL();
							Text.Add("<i>“Heh, alright then you big tease. If you want them so badly, why don’t you get over here and show me your appreciation,”</i> Terry replies, hugging [hisher] bust.", parse);
						}
						Text.NL();
						Text.Add("With purposeful movements, you slide your way carefully up Terry’s body, bringing[oneof] your [cocks] in line with the [foxvixen]’s [tbreasts]. Your hands reach out to cup the bountiful orbs, pressing them together to make a makeshift pussy, and you thrust your [cock] into the squished breastflesh. A shudder of pleasure ripples through your body as the soft mounds - covered in warm, velvet-smooth fur - brushes so deliciously over your sensitive dick, and you grind your way forward until you’ve managed to bury yourself in Terry’s tits to the very hilt.", parse);
						Text.NL();
						if(terry.Relation() < 30) {
							Text.Add("<i>“So this is what you had in mind...”</i>", parse);
							Text.NL();
							Text.Add("Not entirely, you quip. As Terry opens [hisher] mouth, you wriggle yourself forward, pushing the tip of your [cock] into the [foxvixen]’s mouth. Now this is what you had in mind, you tease; so [heshe] had better start sucking.", parse);
							Text.NL();
							Text.Add("Terry mumbles a reply as [heshe] starts lapping at the [cockTip] of your [cock].", parse);
						}
						else if(terry.Relation() < 60) {
							Text.Add("<i>“I see, so this is what you were looking for, ya perv,”</i> Terry teases, extending [hisher] tongue to lick the [cockTip] of your [cock].", parse);
							Text.NL();
							Text.Add("You shudder appreciatively, and confess it’s true. But then, who’s the one who just started licking your dick, hmm? You’d say Terry’s the perv here...", parse);
							Text.NL();
							Text.Add("<i>“As if you weren’t going to request that in the first place!”</i> [heshe] teases back, giving you another lick.", parse);
						}
						else {
							Text.Add("<i>“So hot and so hard… you really like my boobs, don’t you? Ya big perv.”</i>", parse);
							Text.NL();
							Text.Add("Of course you do. They’re so soft and fluffy...", parse);
							Text.NL();
							Text.Add("<i>“Don’t worry, I know exactly how to deal with big [boygirl]s like yourself,”</i> the [foxvixen] says, extending [hisher] tongue to lap at the [cockTip] of your [cock].", parse);
							Text.NL();
							parse["boygirl2"] = terry.mfPronoun("boy", "girl");
							Text.Add("You groan appreciatively; that’s your [boygirl2]...", parse);
						}
						Text.NL();
						parse["eager"] = terry.Relation() >= 30 ? " eager" : "";
						Text.Add("With Terry busy for the moment, you decide that you should reward the [foxvixen] for [hisher][eager] compliance.", parse);
						Text.NL();
						
						var tail = player.IsNaga() || player.HasPrehensileTail();
						if(tail) {
							parse["ti"] = player.IsNaga() ? function() { return player.LegsDesc(); } : player.HasTail().Short();
							parse["tailSkinDesc"] = player.IsNaga() ? player.body.SkinDesc(player.Legs()) : player.body.SkinDesc(player.HasTail());
						}
						
						if(terry.FirstCock()) {
							if(tail) {
								Text.Add("Your [ti] wriggles speculatively behind you, and you smile to yourself. Yes, that should do just nicely. Even as Terry laps away at your [cockTip] and your fingers grope and caress [hisher] ample bosom, smothering your shaft in furry boobage, your tail works its way back toward Terry’s nethers.", parse);
								Text.NL();
								Text.Add("Feeling for Terry’s [tcock], you brush your tail-tip gently up its throbbing length, feeling the turgid flesh pulsating with [hisher] arousal, intimately aware of pre-cum oozing sluggishly over its [tailSkinDesc]. Convinced what to do, your tail begin to curl itself around Terry’s shaft, slowly pumping back and forth along its length.", parse);
								Text.NL();
								Text.Add("Terry lets out a muffled groan, resolving to suckle on your [cockTip] instead of just licking it. Judging by [hisher] sudden grimace of pleasure, it seems that [heshe] likes the contact.", parse);
								Text.NL();
								Text.Add("Smirking, you coil your tail a little firmer around Terry’s dick and begin to stroke away with greater resolve, the looped flesh sliding up and down, back and forth, growing faster and surer with each pass, even as you focus on ministering to your own cock alongside Terry.", parse);
							}
							else {
								Text.Add("It’s a little awkward for you to lean back to reach [hisher] cock without pulling yourself away from Terry’s mouth, but you manage to pull it off. Groping fingers stroke and eventually take triumphant hold of the [foxvixen]’s [tcock], allowing you to caress it with smooth, steady strokes of your fingers. You can feel [hisher] pre-cum oozing over your digits, intimately aware of it throbbing away under your grasp.", parse);
								Text.NL();
								Text.Add("Terry moans at your touch, hands instinctively flying to [hisher] bosom to sandwich your [cock] between [hisher] luscious orbs. [HeShe] wastes no time in treating your [cockTip] to a few licks before [heshe] starts suckling on it like a teat.", parse);
								Text.NL();
								Text.Add("With Terry so conveniently focusing on holding [hisher] breasts in place for you, you can properly focus your attention on feeling behind you to play with Terry’s [tcock]. Your fingers stroke and caress, kneading the turgid flesh and dabbling in the bubbling pre-cum, rubbing every sensitive spot that you can think of without actually being able to see it.", parse);
							}
						}
						else {
							if(tail) {
								Text.Add("Hmm... well, it might be a little odd, but you’re sure Terry will approve of it in the end. Grinning mischievously to yourself, your [ti] undulates in anticipation before starting to crawl its way back down Terry’s body, over the [foxvixen]’s belly before reaching for [hisher] just-used cunt.", parse);
								Text.NL();
								Text.Add("<i>“Ah!”</i> Terry cries out in surprise as you penetrate [himher]. For a moment, [heshe] loses [hisher] composure and just pants in lust, but [heshe] quickly recovers and goes back to licking and suckling on your [cockTip].", parse);
								Text.NL();
								Text.Add("You smile as you feed more of your tail inside of the [foxvixen]’s pussy. Without being able to see, it’s a little trickier as your prehensile extremity isn’t as sensitive as your cock, but you soon feel content to start pumping away with your appendage. Even as you play with Terry’s breasts up front, your tail thrusts behind you, a makeshift dildo eager to get Terry off in turn.", parse);
							}
							else {
								Text.Add("This is going to be tricky, but you think you can manage it... Leaning back carefully, you tentatively feel for Terry’s pussy with your hand, fingers creeping like spiders in an effort to find [hisher] folds.", parse);
								Text.NL();
								Text.Add("Terry groans the moment [heshe] feels your digits on [hisher] moist folds. Seeing that you bothered to grant [himher] some pleasure, [hisher] hands fly to [hisher] breasts, to hold the soft orbs together, sandwiching your [cock]. [HisHer] mouth opens and [heshe] envelops your [cockTip] in the moist embrace of [hisher] lips, tickling your glans with [hisher] tongue.", parse);
								Text.NL();
								Text.Add("You moan appreciatively. Since Terry is willing to take charge of your dick, you devote your attention to leaning back, supporting yourself with one hand on the [foxvixen]’s thigh even as the other busily caresses and teases [hisher] folds, doing the best you can to pleasure [himher] by touch alone.", parse);
							}
						}
						Text.NL();
						Text.Add("The two of you writhe together, mutually pleasuring each other as best you can. With your earlier efforts, you don’t last much longer. Huffing as you try to hold it back, you cry out a warning to Terry that you’re cumming. Seconds later, you arch your back and cry out as your [cock] erupts right into Terry’s face.", parse);
						Text.NL();
						
						var cum = player.OrgasmCum();
						
						if(player.NumCocks() > 1) {
							Text.Add("You dimly note your other neglected cock[s2] erupting in turn; some of it catches Terry right in the face, but most of it simply flies right over [hisher] head.", parse);
							Text.NL();
						}
						if(terry.Relation() + terry.Slut() < 90)
							Text.Add("The blast comes completely unexpected despite your warning. A few strands paint the [foxvixen]’s muzzle before [heshe] looks away so most of your climax flies right over [hisher] head. Only the last few weaker spurts manage to land on [hisher] face.", parse);
						else
							Text.Add("After the initial jet, Terry immediately clamps down on your cock, drinking all of your load that [heshe] can. Even though some of it winds up escaping the sides of [hisher] mouth, [heshe] doesn’t stop. Terry only releases your tip when [heshe]’s sure that [heshe]’s gotten all of your creamy release. However, as your [cock] springs free, a leftover strand shoots out to plaster itself across the [foxvixen]’s muzzle.", parse);
						Text.NL();
						if(terry.FirstCock()) {
							if(tail)
								Text.Add("Even through your tail, you can feel Terry quivering; [heshe]’s so close... Diligently, you keep on pumping until you can feel the semen gushing back up [hisher] shaft; then you use your appendage to point [hisher] cock away, so [heshe] doesn’t go spraying it all over your back.", parse);
							else
								Text.Add("Feeling the trembling and the gushing tide of pre-cum washing over your fingers stirs you to keep pumping away with your hands. When Terry quivers and squirms, it’s a struggle to point [hisher] [tcock] away from you, but you manage to pull it off.", parse);
							Text.NL();
							parse["considerable"] = terry.HorseCock() ? " considerable" : "";
							Text.Add("<i>“C-cumming!”</i> Terry cries out. A late warning, but thankfully you were already prepared. The fox spurts [hisher][considerable] load into the air. Most of it comes crashing down onto the ground, but a few droplets wind up falling onto your [skin] all the same. What a messy [foxvixen]...", parse);
						}
						else {
							if(tail)
								Text.Add("Your tail quivers, but you manage to keep it steady, continuing to pump away into Terry’s sopping wet hole... up until it clamps down on you like a vice, keeping you locked in place as the [foxvixen] cries out and squirms beneath you.", parse);
							else
								Text.Add("Your probing digits continue to stroke and caress and pump as best they can. Soon enough, you feel Terry’s netherlips fluttering, trying to wrap around your fingers and squeeze them like a makeshift cock.", parse);
							Text.NL();
							parse["t"]  = tail ? "appendage" : "fingers";
							parse["t2"] = tail ? Text.Parse("[tail]", parse) : "digits";
							Text.Add("<i>“Hiyaaa!”</i> the [foxvixen] cries out in pleasure. [HisHer] pussy squirts a jet of femcum all over your [t], most of it escaping around your [t2] to create a messy pool on the ground below.", parse);
						}
						Text.NL();
						
						var cum = terry.OrgasmCum();
						
						Text.Add("<i>“Haah, haah, that was… pretty good,”</i> Terry says, collapsing on the ground.", parse);
						Text.NL();
						Text.Add("You nod and make a wordless hum of agreement. [HeShe] was really something, alright. You wriggle gently, carefully sliding your way off of Terry to lie on your back on the ground beside [himher].", parse);
						Text.NL();
						Text.Add("<i>“Hey, [playername]? How about a nap? I’m feeling mighty tired right now...”</i>", parse);
						Text.NL();
						Text.Add("You stifle a yawn and nod your head; a nap sounds mighty enticing right now...", parse);
						Text.Flush();
						
						terry.slut.IncreaseStat(100, 1);
						terry.relation.IncreaseStat(100, 1);
						TimeStep({hour: 1});
						
						Gui.NextPrompt();
					}, enabled : true,
					tooltip : Text.Parse("Terry’s got some nice big boobs, so why not use them to finish the job?", parse)
				});
			}
			Gui.SetButtonsFromList(options, false, null);
		}
		//STRAPON FINISH
		else {
			Text.NL();
			Text.Add("Terry’s clearly very close... but you, yourself, need something a little more. On your next thrust backwards, you keep retreating until your toy pops clearly free of Terry’s grasping cunt.", parse);
			Text.NL();
			Text.Add("<i>“Huh? Why did you pull out? I was so close!”</i> [heshe] protests.", parse);
			Text.NL();
			Text.Add("Ignoring the [foxvixen], you turn your attention to the mechanisms holding your artificial cock in place. A few deft motions, and you have it removed, and you waste little time in bending back down and manually feeding it back into Terry’s cunt.", parse);
			Text.NL();
			Text.Add("<i>“Ah! Yesss...”</i> Terry trails off, happy to have something to fill [hisher] quivering cunt once more.", parse);
			Text.NL();
			Text.Add("Smiling in satisfaction, you push the dildo what you judge to be a satisfactory distance into the [foxvixen]’s squirming cunt, then stand up. Circling the [foxvixen], you straddle [himher], swiftly moving up [hisher] torso until you reach [hisher] face, then turn around so you are facing back down [hisher] torso. Squatting over your vulpine lover’s head, you lower yourself down until your [vag] is all but rubbing in [hisher] face.", parse);
			Text.NL();
			Text.Add("Terry immediately catches on to what you’re wanting, and dives into [hisher] task without delay or protest. [HisHer] broad vulpine tongue begins lapping your moist folds, teasing your [clit] every few laps.", parse);
			Text.NL();
			Text.Add("You moan appreciatively, cooing a complement to your bedmate. To reward [himher] for being so compliant, you lean forward and reach down, grasping the base of the dildo you left penetrating [himher] and start to pump it back and forth - slowly at first in order to get your old rhythm back.", parse);
			Text.NL();
			Text.Add("The [foxvixen] moans appreciatively moments before [heshe] buries [hisher] muzzle into your muff. [HeShe] begins truly licking your insides now, cooing at the taste of your sweet juices.", parse);
			Text.NL();
			Text.Add("Now this is more like it. You eagerly begin to speed up the rhythm of your dildo thrusting, rewarding Terry’s enthusiasm in kind, matching your efforts to [hisher] own.", parse);
			Text.NL();
			if(terry.FirstCock()) {
				Text.Add("Seeing Terry’s [tcock] waving back and forth over [hisher] belly, you determine that you should give it some attention as well.", parse);
				Text.NL();
				if(player.Slut() >= 40) {
					Text.Add("You lay yourself down atop Terry, shamelessly mashing your womanhood into [hisher] face as you eagerly reach for [hisher] [tcock]. Opening your mouth, you gulp down the pre drooling dick, lewdly slurping and slobbering in your eagerness, one hand playing with Terry’s balls and the other still pumping away with the dildo.", parse);
					blowjob = TerryBlowjob.Yes;
				}
				else
					Text.Add("Lying down further, you reach out with your free hand to caress Terry’s jutting [tcock], alternatively stroking the throbbing shaft and fondling the seed bloated balls beneath. As you do that, your other hand busily plunges the dildo back and forth, refusing to slacken it.", parse);
			}
			Text.NL();
			Text.Add("Your vulpine lover moans and groans, sending delightful vibration through your cunny. After a few more licks, [heshe] pushes you away to take a breath. <i>“I-I’m close!”</i> [heshe] warns you.", parse);
			Text.NL();
			if(blowjob >= TerryBlowjob.Yes)
				Text.Add("You’re so close, too, but of course you can’t tell [himher] that! All you can do is moan and mumble rapturously around the dick in your mouth, vibrating it even as you thrust your cunt back into Terry’s face. You want [himher] to lick you, dammit!", parse);
			else
				Text.Add("You gasp out to Terry that you’re also close, fingers tightening without thinking around [hisher] cock. You wriggle in anticipation, then mash your pussy back down against [hisher] lips, exhorting [himher] to keep licking even as you resume jerking and plumbing [himher].", parse);
			Text.NL();
			Text.Add("<i>“Cumming!”</i> Terry cries out, bucking one last time as [hisher] [tvag] clamps down on the [cock], holding it in place as a squirt of feminine fluids escape the seal of the [cock], nearly knocking it out of [hisher] pussy.", parse);
			Text.NL();
			if(terry.HorseCock()) {
				if(blowjob >= TerryBlowjob.Yes) {
					Text.Add("You feel the [foxvixen]’s stallionhood throb within your maw, [hisher] balls visibly churning and knot fully inflating as the flared tip expands. Immediately, you brace yourself for the oncoming onslaught of jism.", parse);
					Text.NL();
					if(player.sexlevel >= 5)
						Text.Add("Luckily, this is not your first rodeo, and you manage to catch the first eruption without spilling a single drop. Despite Terry’s attempts to drown you with fox-cream, you’re good enough to maintain a steady rhythm of gulping it down and breathing. You don’t stop until the last gob of cum has been spilled, leaving you with a rounded out belly and completely satisfied after your hot drink.", parse);
					else {
						Text.Add("Despite your preparation, Terry’s load is just too much for you. You gag and release [hisher] shaft to try and catch your breath, getting plastered with a veritable eruption of fox-jism as Terry continue to cum. By the time [heshe]’s done, you’re an absolute mess!", parse);
						cumbath = true;
					}
				}
				else {
					Text.Add("You feel the [foxvixen]’s stallionhood throb within your grasp, and all you have is a moment to brace yourself before the first of many of Terry’s jets of cum exits it’s hiding place within [hisher] horsecock and hits you with the force of a punch. All you can do is keep your eyes shut as Terry bathes you in a cascade of hot jism, leaving you a creamy mess.", parse);
					cumbath = true;
				}
				Text.NL();
			}
			else if(terry.FirstCock()) {
				if(blowjob >= TerryBlowjob.Yes)
					Text.Add("You feel Terry’s shaft throb within your maw, [hisher] balls churning with effort as [hisher] knot inflates to its full size. The first jet of fox-cum touches your [tongue] and you instinctively drink it down, savoring the flavor of your vulpine lover as [heshe] tries to [hisher] best to cope with your demand for more cream. It’s almost disappointing when [heshe] stops cumming, leaving you slightly full, but still wanting more.", parse);
				else {
					Text.Add("You feel Terry’s canine shaft throb within your grasp, and smile as the first rope shoots out of [hisher] crimson cock with enough force to clear your head and fall across your forehead. The following ropes fly about chaotically, some hitting you in your chin, others hitting you on your [breasts], a few plastering your [thighs]. By the time Terry’s done, [heshe]’s only capable of shooting blanks. You pat [hisher] cute balls, overworked after this powerful climax, and giggle as they manage to send one more dollop out to drool onto your hand.", parse);
					cumbath = true;
				}
				Text.NL();
			}
			Text.Add("Despite [hisher] climax, Terry never stops licking you, nor kissing your [clit]. With the scent of Terry’s climax hanging in your nostrils and such attention, it is little wonder that moments later, you are crying out in ecstasy. Your whole body quivers with pleasure as orgasm ripples through your body, pussy trying to clamp on Terry’s intruding tongue but spasming too fiercely to hold it.", parse);
			Text.NL();
			
			var cum = player.OrgasmCum();
			
			Text.Add("When your climax washes through you, you are left weak and spent. Panting for breath, you slowly topple from your perch atop Terry onto the ground beside [himher], flopping bonelessly onto your back as you continue to gulp air.", parse);
			Text.NL();
			Text.Add("<i>“That was… great,”</i> Terry says, licking [hisher] lips of any stray traces of your juices. [HeShe] sits up to look at you. <i>“I really enjoyed that, [playername]. ", parse);
			if(cumbath) {
				Text.Add("Sorry about the mess though.”</i>", parse);
				Text.NL();
				Text.Add("You smile and wave a hand flippantly, assuring [himher] it’s alright. Well worth the price of admission, as the saying goes.", parse);
				Text.NL();
				if(terry.Relation() < 30)
					Text.Add("<i>“So… if we’re done here, can I go now? I could really use a bath.”</i>", parse);
				else if(terry.Relation() < 60)
					Text.Add("<i>“Hey, before I go, want some help cleaning up?”</i>", parse);
				else
					Text.Add("<i>“Love, you look absolutely gorgeous covered in my seed. Plus I love the fact that I marked you as mine,”</i> [heshe] chuckles at [hisher] own teasing. <i>“But I know dry cum can be a bitch to clean up, so do you want me to help you?”</i>", parse);
				Text.Flush();
				
				TerryScenes.TCleansPC();
			}
			else {
				Text.Add("Though I’d appreciate it if you didn’t try to drown me next time,”</i> [heshe] adds jokingly.", parse);
				Text.NL();
				Text.Add("Well, maybe [heshe] shouldn't do so good a job of eating you out next time, you quip back, teasingly sticking your tongue out at [himher].", parse);
				Text.NL();
				Text.Add("The [foxvixen] chuckles at your comeback, but otherwise doesn’t say anything. Eventually, Terry gets back on [hisher] feet and offers you a helping hand.", parse);
				Text.NL();
				Text.Add("You eagerly reach out for it and allow the [foxvixen] to help you back upright again. Stretching a few kinks out of your joints, you smirk and playfully ask if Terry wouldn’t mind giving you back your [cock].", parse);
				Text.NL();
				if(terry.Relation() < 45) {
					Text.Add("<i>“Huh? Oh right, sorry,”</i> the flustered [foxvixen] says, reaching between [hisher] legs to pull out your [cock] with a groan. <i>“Here you go… perv.”</i>", parse);
					Text.NL();
					Text.Add("[HeShe] was almost about to walk off with it, and <b>you’re</b> the perv? Even as you say this, you grin and collect the toy off of [himher].", parse);
					Text.NL();
					Text.Add("Terry just grins back and collects [hisher] gear.", parse);
				}
				else {
					Text.Add("<i>“Aww... and here I was hoping you’d let me keep it as a souvenir,”</i> the [foxvixen] teasingly replies.", parse);
					Text.NL();
					Text.Add("Tempting, but... no, you’re going to need that in the future. So, your lewd little [foxvixen] can just give it back now, thank you.", parse);
					Text.NL();
					Text.Add("<i>“You put it there, you take it out,”</i> [heshe] replies with a wink, spreading [hisher] legs to give you access.", parse);
					Text.NL();
					Text.Add("You chuckle, but step forward, hand reaching out to grab your [cock] by its base and slowly pull it free. You hold it up, pointedly watching it drip a bead of Terry’s femcum, and smirk knowingly at your vulpine lover before lowering it again.", parse);
					Text.NL();
					Text.Add("Terry playfully shows you [hisher] tongue, moving to fetch [hisher] gear.", parse);
				}
				Text.Flush();
			}
			
			terry.slut.IncreaseStat(100, 1);
			terry.relation.IncreaseStat(100, 1);
			TimeStep({hour: 1});
		}
	});
}

TerryScenes.SexCatchVaginal = function() {
	let terry = GAME().terry;
	let player = GAME().player;

	var p1cock = player.BiggestCock();
	
	var parse : any = {
		playername : player.name,
		foxvixen   : terry.mfPronoun("fox", "vixen"),
		FoxVixen   : terry.mfPronoun("Fox", "Vixen"),
		foxyvixxy  : terry.mfPronoun("foxy", "vixxy"),
		boygirl    : player.mfFem("boy", "girl"),
		guygirl    : player.mfFem("guy", "girl"),
		manwoman   : terry.mfPronoun("man", "woman"),
		mastermistress : player.mfFem("master", "mistress")
	};
	parse = player.ParserTags(parse);
	parse = terry.ParserTags(parse, "t");
	
	parse = terry.ParserPronouns(parse);
	parse = Text.ParserPlural(parse, player.NumCocks() > 1);
	parse = Text.ParserPlural(parse, player.NumCocks() > 2, "", "2");
	parse = Text.ParserPlural(parse, player.HasLegs(), "l", "");
	
	Text.Clear();
	Text.Add("With a lusty smirk on your lips, you tell Terry that you want [himher] to fuck you like a woman, this time.", parse);
	Text.NL();
	if(terry.Relation() < 30) {
		Text.Add("<i>“You sure about this? I won’t be gentle,”</i> [heshe] says, a predatory smile playing on [hisher] face.", parse);
		Text.NL();
		Text.Add("You just return the smile and state that you’re sure. You can handle a little roughness.", parse);
		var nFucked = terry.sex.rAnal + terry.sex.rVag;
		if(nFucked >= 5)
			Text.Add(" Besides, it’ll be fun to let [himher] do the fucking this time.", parse);
		if(player.Slut() < 15)
			Text.Add(" Secretly, though, you hope that your words will make [himher] be gentler with you. Still, you keep that thought to yourself and try to feign confidence.", parse);
		Text.NL();
		Text.Add("<i>“Hope you don’t regret this later, I know I won’t.”</i> [HeShe] licks [hisher] lips, eager to get started.", parse);
	}
	else if(terry.Relation() < 60) {
		Text.Add("<i>“Fancy some foxy dicking, do you?”</i> [heshe] asks with a mischievous smile.", parse);
		Text.NL();
		Text.Add("With a coy giggle, you confess that [heshe]’s got you pinned. You’ve got a craving for some ", parse);
		if(terry.HorseCock())
			Text.Add("big, juicy foxhorse-sausage", parse);
		else
			Text.Add("cute little [foxyvixxy] prick", parse);
		Text.Add(" and you were hoping [heshe]’d be willing to help you sate it.", parse);
		Text.NL();
		Text.Add("<i>“Of course, always glad to be of service,”</i> [heshe] chuckles.", parse);
	}
	else {
		Text.Add("<i>“I would love to fuck you nice and good! Can’t leave my sexy perv craving a good fox dicking, can I?”</i> [heshe] asks with a playful smile.", parse);
		Text.NL();
		Text.Add("Laughing gaily, you assert that [heshe] most certainly can’t; you know [heshe]’s got better manners than that.", parse);
		Text.NL();
		Text.Add("<i>“Then again… seeing you beg could also be alluring...”</i>", parse);
		Text.NL();
		Text.Add("The smirk on your lips widens. Closing the distance between you, you gently lift Terry’s chin and draw [himher] into a deep, passionate kiss. You hold [himher] for a few seconds, enough to let [himher] get a good taste of you, and then break the lip-lock to whisper <i>“Pretty please?”</i> into [hisher] ear.", parse);
		Text.NL();
		Text.Add("<i>“Hmm, well… since you put it that way, I guess I’ll have to do you extra-hard now.”</i>", parse);
		Text.NL();
		Text.Add("You titter merrily and assure [himher] that’s exactly what you were hoping for.", parse);
	}
	Text.NL();
	parse["b"] = player.FirstBreastRow().size.Get() >= 3 ? Text.Parse(" your [breasts] jiggle in their freedom and", parse) : "";
	Text.Add("With Terry so obviously amiable towards the idea, you hasten to undress yourself. You quickly shuck off your [armor], sighing in relief as[b] the cool breeze brushes against your [nips]. You grin at the sight of Terry enjoying the view, and let [himher] indulge for a few moments before pulling down your [botarmor], leaving you completely naked.", parse);
	Text.NL();
	Text.Add("Terry motions for you to lie down. <i>“Get comfortable and we’ll begin.”</i>", parse);
	Text.NL();
	Text.Add("You quip that Terry is <b>such</b> a gentle[manwoman], even as you stretch yourself out on the ground and roll over onto your back. You wriggle in place a few times, getting yourself as comfortable as you can, and then smile up at your vulpine playmate. ", parse);
	if(player.IsNaga())
		Text.Add("With your long, sinuous [legs], you have practically nothing to hide your [vag] from view. Reaching down, you caress your protective slit until it unfolds like a perverse flower, exposing your netherlips to Terry in blatant invitation.", parse);
	else if(player.IsGoo())
		Text.Add("The amorphous mass of your lower body writhes and shifts, stretching itself into a makeshift cushion, even as it plumps up your pussy, puffing out the folds and presenting an obvious target for Terry’s affections.", parse);
	else
		Text.Add("You spread your [legs] wide, a shameless invitation that nobody could misunderstand.", parse);
	Text.NL();
	Text.Add("The [foxvixen] whistles at the sight. <i>“Can’t complain about the view, nor your eagerness.”</i> [HeShe] grins.", parse);
	Text.NL();
	
	var cap = player.FirstVag().Cap();
	
	if(terry.HorseCock()) {
		Text.Add("<i>“Think I should probably prepare you a little,”</i> [heshe] suggests, gently stroking your outer lips.", parse);
		Text.NL();
		Text.Add("You moan softly in approval and readily agree with [hisher] suggestion. ", parse);
		
		if(cap < Capacity.loose)
			Text.Add("After all, you’re going to need all the help you can get for something as big as what [heshe]’s packing.", parse);
		else if(cap < Capacity.gaping)
			Text.Add("You could probably take [himher] without too much trouble, but it’s always nice to have that little extra edge.", parse);
		else
			Text.Add("You don’t really need it, your [vag] being able to handle cocks of [hisher] size with ease, but foreplay’s always fun, too.", parse);
		Text.NL();
		Text.Add("Terry leans over and gives your slit an experimental lap. You groan loudly at the touch of [hisher] tongue, unable to resist an instinctive hump back against the probing wet flesh.", parse);
		Text.NL();
		Text.Add("<i>“Hmm, so tasty! We’re going to have a lot of fun.”</i>", parse);
		Text.NL();
		Text.Add("Having said that, Terry sets about licking and kissing your [vag] like a starved wolf attacks a juicy steak. You can’t even think about holding back the whorish noises that spill from your throat as your vulpine playmate greedily dives into your muff. With great enthusiasm and no small skill, [heshe] probes deeper and deeper inside of you. The clever [foxvixen]’s tongue worms about with a dexterity few humans could match, lapping at your every nook and cranny.", parse);
		Text.NL();
		Text.Add("You can already feel yourself starting to heat up in response to Terry’s attentions, your folds starting to seep their own moisture in addition to the generous lathering of saliva that Terry is giving you.", parse);
		if(terry.Relation() + terry.Slut() >= 80) {
			Text.Add(" That being said, you can’t fail to notice when the naughty [foxvixen]’s tongue starts to wander.", parse);
			Text.NL();
			if(player.FirstCock()) {
				Text.Add("Without the slightest hesitation, [hisher] tongue slides upwards, advancing along your slit towards your torso.", parse);
				if(player.HasBalls())
					Text.Add(" [HeShe] licks at your [balls], jiggling them about for a few moments, then continues undaunted.", parse);
				Text.Add(" [HeShe] doesn’t stop until [heshe] has reached the base of your [cocks], and even then, only to properly orientate [himher]self. The [foxvixen] slurps [hisher] way up the underside of your shaft[s], gliding back and forth across the sensitive skin.", parse);
				Text.NL();
				Text.Add("You wriggle and squirm, mewling eagerly as you harden under Terry’s treatment. The [foxvixen]’s tongue flicks over[oneof] your tip[s], deftly removing the first bead of pre-cum, and then glides smoothly back down your length[s].", parse);
				Text.NL();
				Text.Add("You groan softly as Terry makes another pass up your cock[s]. Pushing yourself partially up, you tell [himher] that, although you are enjoying this too, what you want [himher] to do is pleasure your pussy. [HeShe] can have a go at your [cocks] another time.", parse);
				Text.NL();
				Text.Add("<i>“Aw, come on. You can hardly blame me for taking a detour when you have so many options!”</i> [heshe] playfully protests, giving[oneof] your [cockTip][s] a kiss.", parse);
				Text.NL();
				Text.Add("Yes, you may have a lot of <i>options</i>, but right now you only need [himher] to pay attention to one of them. You tell [himher] to quit beating around the bush and get to what really matters, and that’s an order.", parse);
				Text.NL();
				Text.Add("Terry’s collar emits a soft glow and you can hear [himher] grunt around your [cockTip]. [HeShe] pulls away with a mischievous smile, licking [hisher] lips as [heshe] says, <i>“As you wish, [mastermistress].”</i>", parse);
				Text.NL();
				Text.Add("Without missing a beat, Terry ", parse);
				if(player.FirstVag().clitCock)
					Text.Add("dives back onto your [cock], taking half of it down [hisher] throat while [heshe] traces your labia with a pair of fingers.", parse);
				else
					Text.Add("moves to pinch your [clit], massaging it between [hisher] fingers as [heshe] takes half your shaft down [hisher] throat.", parse);
				Text.Add(" A strangled gasp bursts from you; that was <b>not</b> what you told [himher] to do! You try to scold Terry, but the cunning [foxvixen] just keeps bobbing [hisher] head along your [cock], greedily gulping it down and then reluctantly dragging it out.", parse);
				Text.NL();
				
				Sex.Blowjob(terry, player);
				terry.FuckOral(terry.Mouth(), player.FirstCock(), 1);
				player.Fuck(player.FirstCock(), 1);
				
				Text.Add("The heat, the warm wetness seeping over your flesh, and the feel of [hisher] mouth and throat wrapped around your sensitive prickflesh sends pleasure crackling through your mind, scattering your thoughts and leaving you incapable of forming coherent words.", parse);
				Text.NL();
				Text.Add("Even as you gasp, grunt and groan, Terry hungrily slaves away at your dick. Caught off-guard like this, your attempts to hold out against the feelings assaulting you are in vain. You can’t... you’re going to...", parse);
				Text.NL();
				
				var cum = player.OrgasmCum();
				
				Text.Add("Terry greedily gulps down your cum like a baby suckling on a teat. Even though this wasn’t such a powerful orgasm, you still produce enough seed to give the [foxvixen] the equivalent of a hearty meal, and only when your flow has slowed to a trickle does Terry release you.", parse);
				Text.NL();
				Text.Add("You pant deeply, slowly calming your racing heart until you can think clearly, looking down the length of your body at Terry. [HeShe]’s grinning up at you like the fox that just raided the chicken-coop, completely unrepentant.", parse);
				Text.NL();
				if(player.NumCocks() > 1) {
					Text.Add("[HeShe] didn’t get away with [hisher] little game unscathed; smears of cum drip down [hisher] chin and cover [hisher] [tbreasts] where your other cock[s2] spurted all over [himher].", parse);
					Text.NL();
				}
				Text.Add("Dryly, you ask if [heshe] thinks that was funny.", parse);
				Text.NL();
				Text.Add("<i>“What? You told me to get to the point.”</i> [HeShe] grins even wider.", parse);
				Text.NL();
				Text.Add("Looking [himher] square in the eye, you tell [himher] that [heshe] <b>knows</b> exactly what you meant. You were hoping for a nice, long, lusty fucking from your favorite [foxvixen], and this is all [heshe]’s going to give you?", parse);
				Text.NL();
				Text.Add("<i>“Of course not.”</i> [HeShe] moves away so you can look at [hisher] stallionhood, fully erect and dripping pre. It’s clear that this was pretty exciting for the [foxvixen] too.", parse);
				Text.NL();
				Text.Add("<i>“That was just foreplay, [playername]. You know there’s no way in hell that I’d disappoint my favorite [guygirl].”</i> [HeShe] smiles.", parse);
				Text.NL();
				Text.Add("You can’t hold it back anymore; you drop the frown for a smile of your own, laughing softly as you confess that you knew [heshe] wouldn’t. It was just too tempting to try and mess with [himher].", parse);
			}
			else {
				Text.Add("Terry’s tongue passes down under your [vag], flicking against your [butt] before spiraling inexorably towards your [anus]. You squirm in place, moaning softly as your playmate playfully tongues your asshole, [hisher] hot, wet flesh sliding into your pucker.", parse);
				Text.NL();
				Text.Add("The [foxvixen] lifts you off the ground, just enough so that [heshe] can get a better grip on your [butt] and probe you a little deeper. You wriggle in [hisher] arms, intimately aware of every inch of tongue squirming around your innards. On pure instinct, you clench down, trying to trap the invader that tickles your nooks and crannies so deliciously, but Terry is too clever for you and deftly wriggles free of your anal grip.", parse);
				Text.NL();
				Text.Add("<i>“Someone’s getting a bit too excited.”</i> [HeShe] grins. Chuckling, you quip that [heshe]’s one to talk; you thought [heshe] was just doing a little branching out, but now you’re not so sure. Would [heshe] rather eat you out than fuck you?", parse);
				Text.NL();
				Text.Add("<i>“Of course not!”</i> [HeShe] puts you back down and moves away so [heshe] can show you [hisher] stallionhood, already at full mast and dripping pre. <i>“You gave me this for a reason, and I intend to make good on that reason by using it on you over and over.”</i> [HeShe] grins.", parse);
				Text.NL();
				Text.Add("You chuckle in your approval, admitting with a lustful purr that you were hoping [heshe] would say something like that.", parse);
			}
		}
		Text.NL();
		Text.Add("You watch as Terry licks [hisher] lips and tenderly aligns the blunt tip of [hisher] horsecock with your [vag]. [HeShe] lovingly rubs [hisher] glans against your opening, smiling as your labia flutters from the touch, and then puts [himher]self back in line and starts to <i>push</i>.", parse);
		Text.NL();
		
		Sex.Vaginal(terry, player);
		player.FuckVag(player.FirstVag(), terry.FirstCock(), 3);
		terry.Fuck(terry.FirstCock(), 3);
		
		Text.Add("You moan shamelessly, arching your back as you feel [himher] spreading you open. [HisHer] monstrous maleness stretches you out around its girth, drawing you so tight that you can feel each wrinkle, ridge and vein as it pushes through your love-tunnel.", parse);
		Text.NL();
		Text.Add("<i>“So warm, so wet... Your pussy feels wonderful, [playername]. Maybe getting me a bigger, more sensitive cock wasn’t such a bad idea.”</i>", parse);
		Text.NL();
		Text.Add("You shudder as [heshe] grinds against something particularly sensitive, managing to throw [himher] a lusty grin and confess that you certainly don’t regret the decision.", parse);
		Text.NL();
		Text.Add("<i>“Yeah, I’m sure you don’t. Now, come on, moan for me!”</i>", parse);
		Text.NL();
		Text.Add("You would have been willing to play along for [himher] anyway, but the sudden fierce thrust into your depths gives you no choice. You arch your back until you nearly lift yourself off the floor, moaning like a whore in heat as you instinctively try to thrust back into Terry’s lap and help [himher] drive even deeper inside.", parse);
		Text.NL();
		Text.Add("Terry is more than happy to comply; inch by glorious inch, you can feel [hisher] stallionhood slipping inside of you, filling you to the brim with warm, gently pulsing maleness. You almost wish it could go on forever... but, all too soon, you can feel [hisher] knot pressing against your pussy lips.", parse);
		Text.NL();
		Text.Add("It gently rubs against your cunny, a perverse nuzzle that is firm enough for you to feel, but clearly not meant to push it inside. Your vulpine lover has your lower half carefully cradled in [hisher] arms, content to let you adjust to being so very stuffed with cock.", parse);
		Text.NL();
		Text.Add("A languid purr rumbles out of your lips as you bat your eyes at Terry, blissfully cooing about how good [heshe] makes you feel.", parse);
		Text.NL();
		Text.Add("<i>“If you’re feeling this good already, let’s see how you feel when I actually get started.”</i>", parse);
		Text.NL();
		Text.Add("You shiver in anticipation, exaggerating the motion so Terry can see that you’re ready to go. [HeShe] grins down at you lustily, adjusts [hisher] grip, and starts to draw [hisher] hips back. [HisHer] length slowly pulls back through your gaping lips, leaving a gnawing feeling of emptiness as [heshe] withdraws.", parse);
		Text.NL();
		Text.Add("It’s <i>sooo</i> big, long and thick, letting you feel every ridge and wrinkle. It scrapes along your tunnel, stuffing you ", parse);
		if(cap < terry.FirstCock().Thickness())
			Text.Add("to the brim and beyond. You feel almost full to bursting, even with all the tender loving care that your vulpine partner has given you, but that just makes this...mmm... all the sweeter.", parse);
		else
			Text.Add("so very deliciously full. You’re so glad that you gave [himher] this juicy fuckstick of [hishers]; look at what wonderful use it can be put to!", parse);
		Text.NL();
		Text.Add("Terry pulls out and out, until only the plug-like glans of [hisher] cock remains stuffed within you, leaving in its wake a hollow void that evokes an almost painful yearning. [HeShe] holds you like that for a moment, watching you squirm, and then thrusts [himher]self home, plugging you wonderfully full again.", parse);
		Text.NL();
		Text.Add("Sparks fizz through your brain, making you arch your back and mewl with glee, especially as Terry grinds [hisher] hips into yours and makes your [vag] quiver with pleasure. The [foxvixen] smirks at you, grinding just a little bit deeper as [heshe] prepares [himher]self and then pulls out again, ready to start the cycle all over.", parse);
		Text.NL();
		if(terry.Relation() < 30)
			Text.Add("Despite [hisher] playful threats when you asked to be fucked, Terry is a tender and gentle lover; all bark and no bite, you might say. Eager to enjoy having you wrapped around [hisher] cock, certainly, but far from the thug [heshe] insinuated [heshe]’d be.", parse);
		else if(terry.Relation() < 60)
			Text.Add("Playful and tender, Terry makes a wonderful lover, attending to your as much as to [hisher] own desires. You can feel [hisher] efforts to reach the best spots for you, paying close attention to how you move and what makes you squeak, giggle and moan.", parse);
		else
			Text.Add("Your lover knows your body as well as [hisher] own by now, and mercilessly exploits that knowledge. [HeShe] leans in and boldly steals a kiss as [heshe] grinds against a particularly sweet spot, greedily drinking your blissful moan before letting you go.", parse);
		Text.NL();
		Text.Add("Back and forth, the two of you glide, your hips smacking together with the deliciously meaty impact of lovemaking.", parse);
		
		var preg = terry.PregHandler().IsPregnant();

		if(terry.Cup() >= TerryFlags.Breasts.Bcup)
			Text.Add(" [HisHer] [tbreasts] jiggle each time you slap together, adding a delightful visual to the affair.", parse);
		if(preg)
			Text.Add(" Terry’s gravid [tbelly] butts gently against your own [belly] as [heshe] leans into you, adding its own perverse thrill to the affair.", parse);
		Text.NL();
		if(player.sexlevel < 3)
			Text.Add("You try your best to pay Terry back in [hisher] own coin, clumsily squeezing down with your [vag] to make it tighter and add what friction you can. You can't say that you're an expert by any means, but from the moan that echoes above you, Terry surely appreciates the effort.", parse);
		else if(player.sexlevel < 5)
			Text.Add("Your [vag] clenches down with all the strength you can muster, making the [foxvixen] work to pull it free and welcoming [himher] with every thrust. Terry coos in pleasure, visibly shivering at your ministrations.", parse);
		else
			Text.Add("You can't let such a lover go unrewarded; it would be shameful. Your [vag] flexes and releases, dexterously milking the equine shaft and leaving Terry panting and whimpering.", parse);
		Text.NL();
		Text.Add("Pleasure fills your senses, making the outside world fade away, but sharpening your awareness of the joy rising and falling in your cunt. You can feel Terry's dick getting harder, and <i>harder</i>, until the veins are bulging inside your tunnel and you'd swear that [heshe] had just <i>doubled</i> in girth!", parse);
		Text.NL();
		Text.Add("<i>“C-can’t hold out much longer!”</i> [heshe] warns.", parse);
		Text.NL();
		Text.Add("Seems like Terry might blow any moment; if you want to have any say on where [heshe] finishes, now is the time to say it!", parse);
		Text.Flush();
		
		//[[HeShe] decides][Inside] [Outside]
		var options = [];
		options.push({nameStr : "Inside",
			tooltip : Text.Parse("You want [himher] to fill you up with [hisher] fox-seed, tell [himher] to cum inside!", parse),
			enabled : true,
			func : function() {
				Text.Clear();
				Text.Add("Don't pull out! You want to feel all [hisher] thick, gloopy fox-seed sloshing around your pussy; you want [himher] to cum inside of you!", parse);
				Text.NL();
				Text.Add("<i>“O-okay, in that case...”</i> [heshe] squeezes your [hips], pulling away to gain enough momentum to fully thrust against your [vag].", parse);
				Text.NL();
				TerryScenes.SexCatchVaginalInsideHorseCock(parse);
			}
		});
		var preg = player.PregHandler().IsPregnant();
		parse["p"] = preg ? "" : " You don’t want to risk getting pregnant.";
		options.push({nameStr : "Outside",
			tooltip : Text.Parse("Tell [himher] to cum outside.[p]", parse),
			enabled : true,
			func : function() {
				Text.Clear();
				Text.Add("You order [himher] to keep going as long as [heshe] can, but to pull out the moment [heshe] can’t keep it back anymore. [HeShe] is <i>not</i> to cum inside of you, but [heshe] <i>must</i> keep going - you’re so close!", parse);
				Text.NL();
				Text.Add("Terry’s collar glows a little and you can tell from [hisher] slight change in pace that [heshe] felt it around [hisher] neck too.", parse);
				Text.NL();
				Text.Add("<i>“O-okay, I think I can hold out a little longer. Maybe just long enough to get you off first.”</i>", parse);
				Text.NL();
				TerryScenes.SexCatchVaginalOutsideHorseCock(parse);
			}
		});
		options.push({nameStr : Text.Parse("[HeShe] decides", parse),
			tooltip : Text.Parse("Stay quiet and let [himher] cum wherever [heshe] wants; you don’t mind it one way or another.", parse),
			enabled : true,
			func : function() {
				var inside = TerryScenes.SexCatchVaginalHeChooses();
				
				Text.Clear();
				if(inside) {
					Text.Add("Terry grabs your [hips] and thrusts with all [hisher] strength, pushing [hisher] knot against the straining rim of your [vag].", parse);
					Text.NL();
					TerryScenes.SexCatchVaginalInsideHorseCock(parse);
				}
				else {
					TerryScenes.SexCatchVaginalOutsideHorseCock(parse);
				}
			}
		});
		Gui.SetButtonsFromList(options, false, null);
	}
	else {
		Text.Add("Having [hisher] target in clear sight, Terry wastes no time. [HeShe] grabs [hisher] foxhood and aligns it with your opening, gently teasing your nethers with the tip of [hisher] pointy rod.", parse);
		Text.NL();
		Text.Add("You begin breathing a little deeper than usual; the small contact fills you with anticipation, and you find your excitement starting to leak.", parse);
		if(player.FirstCock())
			Text.Add(" Your [cocks] throb[notS] softly above, pre gathering in [itsTheir] tip[s] in sympathetic lust.", parse);
		Text.NL();
		Text.Add("<i>“I’m going in,”</i> [heshe] announces, unceremoniously driving [himher]self inside you.", parse);
		Text.NL();
		
		Sex.Vaginal(terry, player);
		player.FuckVag(player.FirstVag(), terry.FirstCock(), 3);
		terry.Fuck(terry.FirstCock(), 3);
		
		Text.Add("You hiss in pleasure as you feel [hisher] shaft entering you. It may not be the biggest cock you’ve ever seen, but you can’t deny the pleasure it brings you. Warmth spreads through you as [hisher] vulpine pecker scrapes against your sensitive walls, counterpointed by [hisher] balls tickling your [butt] and [hisher] knot bumping against your entrance.", parse);
		Text.NL();
		parse["b"] = player.FirstBreastRow().size.Get() >= 3 ? Text.Parse(" and nuzzling your [breasts]", parse) : "";
		Text.Add("As the [foxvixen] finishes hilting [himher]self inside your depths, you watch as [heshe] bends over your prone form, draping [himher]self on top of you[b]. [HisHer] nose tickles your [skin] as [heshe] licks your chest in search of a nipple, immediately beginning to suck on it when [heshe] finds it.", parse);
		Text.NL();
		Text.Add("The pleasure forces a moan out of you, and you instinctively wrap your arms around the [foxvixen]’s head, pushing closer to your [breasts].", parse);
		if(player.Lactation())
			Text.Add(" Milk starts to seep out of your [nips], flooding [hisher] mouth with your rich taste, and you feel gentle vibrations spread across your boobflesh as [heshe] hums, obviously delighted at having a little snack.", parse);
		Text.NL();
		parse["l"] = player.Lactation() ? Text.Parse(", leaving milky droplets in [hisher] wake", parse) : "";
		Text.Add("You begin bucking against [himher], encouraging [himher] to take some action other than just grinding into you. Through the process, you can feel [hisher] knot, not yet completely inflated, pushing your folds apart, until it pops inside you on a particularly strong buck. The two of you moan in unison as Terry releases your nipple[l].", parse);
		Text.NL();
		parse["rel"] = terry.Relation() >= 30 ? " mischievously" : "";
		Text.Add("<i>“Okay, now we can start for real.”</i> [HeShe] grins[rel].", parse);
		Text.NL();
		Text.Add("You raise a brow, wondering just what [heshe]’s actually planning on doing when you feel [himher] pulling away. ", parse);
		if(player.HasLegs())
			Text.Add("You curl your toes", parse);
		else if(player.IsNaga())
			Text.Add("You curl your tail-end around [hisher] leg", parse);
		else
			Text.Add("Your lower body becomes agitated", parse);
		Text.Add(" as you feel [hisher] knot stretching you oh-so-wonderfully, tugging at your insides as Terry does [hisher] best to pull it out from your [vag].", parse);
		Text.NL();
		parse["b"] = player.HasBalls() ? Text.Parse("r [balls]", parse) : "";
		Text.Add("It takes a bit of work, and it hurts a little, but when [heshe] finally manages to pop out from your [vag], [heshe] drags a fresh flow of juices with [himher]. The force of the pull causes [himher] to leave your warm embrace as [hisher] foxhood nestles against you[b]. A small spurt of pre smears your flesh as [heshe] adjusts [himher]self to penetrate you once more.", parse);
		Text.NL();
		Text.Add("<i>“Sorry, guess I pulled a little too hard,”</i> [heshe] says, breathing a little harder as [hisher] collar glows a little.", parse);
		Text.NL();
		if(terry.Relation() < 30) {
			Text.Add("Maybe [heshe] did, but you’re sure [heshe]’ll be making it up to you in no time. That felt pretty good despite a little bit of pain. Not to mention, you recall [himher] promising you a rough ride?", parse);
			Text.NL();
			Text.Add("[HeShe] immediately smirks back. <i>“Yeah, I did warn you I wouldn’t be gentle. Alright then, get ready because I’ll fuck you good!”</i>", parse);
			Text.NL();
			Text.Add("Sure, and [heshe]’d better hurry too, it would be a shame if the collar’s magic made [himher] too horny to pull this off.", parse);
		}
		else if(terry.Relation() < 60) {
			Text.Add("You just smile and shake your head. What is a little pain when you’ve got [himher] right where you want [himher]? Besides, it can only get easier from now on, right?", parse);
			Text.NL();
			Text.Add("<i>“Well, not if the collar makes me too hard to do this without actually hurting you, but yeah! Sure! I’ll loosen you up good, count on me to do that!”</i> [HeShe] grins.", parse);
			Text.NL();
			Text.Add("You wouldn’t have it any other way...", parse);
		}
		else {
			Text.Add("It only hurt a little; besides, you’re pretty sure [heshe]’ll make it up to you. A little pain is totally worth it if you’re getting some of your favorite Terry-brand fox-meat.", parse);
			Text.NL();
			Text.Add("<i>“Ha! Can’t believe I almost felt sorry for you, perv. For a moment there, I thought this would put you off or something. Guess I forgot what <b>huge</b> slut you are.”</i> [HeShe] grins.", parse);
			Text.NL();
			if(player.Slut() <= terry.Slut()) {
				Text.Add("Like [heshe]’s one to talk! It’s a wonder [heshe] can spend even one minute out of your pants!", parse);
				Text.NL();
				Text.Add("<i>“I’d spend less time out, but we got places to be, right? Unless you could get better pants.”</i>", parse);
				Text.NL();
				Text.Add("What a cheeky little thing… maybe you should let [hisher] collar do its thing and leave [himher] to face the heat of [hisher] punishment by [himher]self?", parse);
			}
			else {
				Text.Add("And [heshe]’s going to pretend [heshe] doesn’t love that side of you?", parse);
				Text.NL();
				Text.Add("<i>“Never said that.”</i> [HeShe] smiles innocently.", parse);
				Text.NL();
				Text.Add("Cheeky little bastard… maybe you oughta let the collar show [himher] [hisher] place? A few minutes spent in heat should certainly correct [hisher] rebellious behavior.", parse);
			}
			Text.NL();
			Text.Add("At this, Terry throws you a mildly worried look. <i>“Now, now, [mastermistress]. Let’s not rush thi-”</i>", parse);
			Text.NL();
			Text.Add("So you’re <i>[mastermistress]</i> now, are you? You interrupt [himher].", parse);
			Text.NL();
			Text.Add("Well then, how about this? You order [himher] to fuck you hard and pleasure you to the best of [hisher] capacity, and while at it, you also order [himher] to enjoy [himher]self to the fullest!", parse);
			Text.NL();
			Text.Add("<i>“Your order is my wish!”</i> [HeShe] gives you a small salute.", parse);
		}
		Text.NL();
		Text.Add("Terry grabs your [hips] and braces [himher]self for the next thrust.", parse);
		Text.NL();
		Text.Add("You take a deep breath and try to relax as much as possible. This will be quite intense...", parse);
		Text.NL();
		Text.Add("Terry’s first thrust carries all the power [heshe] can muster in [hisher] foxy pelvis. [HisHer] member hammers through your [vag] like a piledriver, settling inside you only when you feel [hisher] balls slap against your [butt]. [HeShe] holds the position for a moment, then begins withdrawing, pulling against your entrance until [heshe] manages to wring [himher]self free with a small pop.", parse);
		Text.NL();
		Text.Add("It’s pretty rough, but you would be lying if you said it didn’t feel great every time [hisher] knots pops in and out of you.", parse);
		Text.NL();
		Text.Add("As time goes by, you realize that it’s getting harder for Terry to push past your nethers.", parse);
		Text.NL();
		Text.Add("<i>“Shit! Guess I can’t do anymore of this. Next time I push my knot in, we might actually wind up tied for good!”</i> [HeShe] warns you.", parse);
		Text.NL();
		Text.Add("If you have anything to say about this, <i>now</i> is the time to say it!", parse);
		Text.Flush();
		
		//[[HeShe] decides][Inside] [Outside]
		var options = [];
		options.push({nameStr : "Inside",
			tooltip : Text.Parse("Let [himher] tie you for good and fill you up with [hisher] fox-seed! Tell [himher] to cum inside!", parse),
			enabled : true,
			func : function() {
				Text.Clear();
				Text.Add("You tell your [foxvixen] lover to go ahead and push it all in.", parse);
				Text.NL();
				Text.Add("<i>“But-”</i>", parse);
				Text.NL();
				Text.Add("Shush! That’s an order! You tell [himher]. You want [himher] to fill you up!", parse);
				Text.NL();
				Text.Add("Terry’s collar glows a little and [heshe] swallows. <i>“O-okay, in that case...”</i> [heshe] squeezes your [hips], pulling away before [heshe] thrusts with all [hisher] might, burying [hisher] shaft inside you and forcing [hisher] knot into your [vag].", parse);
				Text.NL();
				TerryScenes.SexCatchVaginalInsideFoxCock(parse);
			}
		});
		var preg = player.PregHandler().IsPregnant();
		parse["p"] = preg ? "" : " You don’t want to risk getting pregnant.";
		options.push({nameStr : "Outside",
			tooltip : Text.Parse("Tell [himher] to cum outside.[p]", parse),
			enabled : true,
			func : function() {
				Text.Clear();
				Text.Add("Then [heshe] should stop with the knot, ", parse);
				if(preg)
					Text.Add("You don’t want to be here all day.", parse);
				else
					Text.Add("you really don’t want to risk pregnancy.", parse);
				Text.NL();
				Text.Add("<i>“Okay, then I’ll-”</i>", parse);
				Text.NL();
				Text.Add("You interrupt [himher] by adding that despite that, you still want to get off, and you want [himher] to do it. Terry groans. <i>“Yes, yes, I’m not gonna leave you hanging, but can I at least deal with it myself so I can focus on you?”</i>", parse);
				Text.NL();
				Text.Add("Sounds reasonable...", parse);
				Text.NL();
				Text.Add("Terry works [himher]self out of your [vag] and begins furiously stroking [hisher] foxhood. Moments later, [heshe] moans as ropes of fox-seed erupts from [hisher] overworked shaft to splatter on the two of you.", parse);
				Text.NL();
				
				var cum = terry.OrgasmCum();
				
				Text.Add("You watch as Terry groans and slumps forward, whole body going limp in the wake of [hisher] climax. ", parse);
				if(terry.Relation() < 60) {
					Text.Add("You give [himher] a moment to catch [hisher] breath, and then remind [himher] that [heshe] still has to finish you off.", parse);
					Text.NL();
					Text.Add("<i>“Yeah, yeah, I’ll get to that, just… let me breathe.”</i>", parse);
				}
				else {
					Text.Add("You can't help smiling fondly to yourself; Terry just doesn't have a lot of staying power, but you know [heshe] will always take care of you. Grinning at the [foxvixen] once [heshe]'s caught [hisher] breath, you teasingly quip that you hope you'll enjoy this next part as much as [heshe] enjoyed that.", parse);
					Text.NL();
					Text.Add("<i>“Heh, no worries, [playername]. You know I got you covered.”</i> [HeShe] smiles softly.", parse);
				}
				Text.NL();
				Text.Add("You settle back and try to make yourself a little more comfortable, knowing your turn will come shortly.", parse);
				Text.NL();
				TerryScenes.SexCatchVaginalOutsideFoxCock(parse);
			}
		});
		options.push({nameStr : Text.Parse("[HeShe] decides", parse),
			tooltip : Text.Parse("Stay quiet and let [himher] cum wherever [heshe] wants; you don’t mind it one way or another.", parse),
			enabled : true,
			func : function() {
				var inside = TerryScenes.SexCatchVaginalHeChooses();
				
				Text.Clear();
				if(inside) {
					Text.Add("Terry pulls out until [heshe] has almost slipped out of your [vag] and thrusts with all [hisher] strength, forcing [hisher] knot inside you.", parse);
					Text.NL();
					TerryScenes.SexCatchVaginalInsideFoxCock(parse);
				}
				else {
					Text.Add("Terry suddenly pulls out and furiously strokes [himher]self, moaning as [heshe] reaches [hisher] climax, sending a few ropes of fox-seed arcing through the air to splatter on the both of you.", parse);
					Text.NL();
					
					var cum = terry.OrgasmCum();
					
					Text.Add("Even though you left it up to [himher], you can't hold back a sigh of disappointment. You gaze at the [foxvixen] with obvious frustration, and [heshe] replies before you even have a chance to speak.", parse);
					Text.NL();
					if(terry.Relation() < 60) {
						Text.Add("<i>“Sorry! Sorry! I couldn’t focus before and I didn’t want to risk getting you pregnant!”</i>", parse);
						Text.NL();
						Text.Add("In the face of a response like that, what else can you do but smile in understanding and assure [himher] that it's okay. You thank [himher] for being so thoughtful. ", parse);
						Text.NL();
						Text.Add("<i>“Don’t worry, I can still make you cum, just give me a second to breathe.”</i>", parse);
						Text.NL();
						Text.Add("Settling back, you chuckle softly, assuring [himher] that you can do that for [himher].", parse);
					}
					else {
						Text.Add("<i>“Don’t worry, [playername]. I’d never leave my precious mate hanging.”</i> [HeShe] smiles apologetically. <i>“I just need a second to catch my breath and I promise I’ll get you off.”</i>", parse);
						Text.NL();
						Text.Add("You grin warmly; you never doubted it for a second. You just wriggle a little to make yourself that bit extra comfy as you wait for [himher] to catch up to you.", parse);
					}
					Text.NL();
					TerryScenes.SexCatchVaginalOutsideFoxCock(parse);
				}
			}
		});
		Gui.SetButtonsFromList(options, false, null);
	}
}

// Returns true for inside, false for outside
TerryScenes.SexCatchVaginalHeChooses = function() {
	let terry = GAME().terry;
	let player = GAME().player;

	var tpreg = terry.PregHandler().IsPregnant();
	var preg = player.PregHandler().IsPregnant();
	if(terry.Relation() < 30) {
		return false;
	}
	else if(terry.Relation() < 60) {
		if(preg || terry.LustLevel() >= 0.75)
			return false;
		else
			return true;
	}
	else {
		if(tpreg && !preg)
			return false;
		else
			return true;
	}
}

TerryScenes.SexCatchVaginalInsideHorseCock = function(parse : any) {
	let terry = GAME().terry;
	let player = GAME().player;

	Text.Add("You gasp as you feel yourself stretching around the [foxvixen]’s knot; for a moment, you fear [heshe]’s going to force [himher]self in, but thankfully the pressure eases and Terry pulls away. That was kinda rough!", parse);
	Text.NL();
	Text.Add("<i>“Sorry...”</i>", parse);
	Text.NL();
	Text.Add("It’s fine, but you’d appreciate a warning before [heshe] tries anything like that.", parse);
	Text.NL();
	Text.Add("<i>“Yeah, sorry. I still have to push though, it’s a tight fit.”</i>", parse);
	Text.NL();
	Text.Add("Yes, you understand that, and you’ll be ready for it this time.", parse);
	Text.NL();
	Text.Add("<i>“Okay.”</i> Terry smiles softly, bracing for another thrust.", parse);
	Text.NL();
	Text.Add("You inhale twice, letting the tension ease so your [vag] will relax. When you feel ready, you nod to Terry, letting [himher] know that [heshe] can start again.", parse);
	Text.NL();
	Text.Add("Terry takes it slower this time, but still, you can intimately feel your folds starting to stretch around [hisher] girth. [HeShe] pushes, just deep enough to get an inch of knot inside, and then eases back, giving you a moment to adjust before trying again. Slowly rocking [hisher] hips back and forth, the [foxvixen] starts to make progress, coaxing you into accepting the bulging flesh between your petals.", parse);
	Text.NL();
	Text.Add("You groan softly, letting the outside world fade away and recede to just the sensation of Terry’s mighty stallionhood slowly stuffing you. [HeShe] works it deeper and deeper, making you twitch and shudder; so close now, [heshe]’s almost got it...", parse);
	Text.NL();
	Text.Add("Then, with deceptive ease, the [foxvixen]’s knot finally slips inside as Terry’s coaxing pays off. Your netherlips open up and swallow it whole, letting Terry’s entire length bury itself to the hilt inside of you, [hisher] ample balls meatily smacking against your [butt].", parse);
	Text.NL();
	Text.Add("You wriggle and squirm, mind afire with pleasure at being so very magnificently full. The great length of Terry's stallionhood fills your love-tunnel completely, just a solid mass of meat that you'd swear you could feel through your [skin] if you caressed below your navel, countered by the great knot grinding against every sweet spot in your pussy all at once.", parse);
	Text.NL();
	Text.Add("The sensation is just too much for both of you, your ecstatic howls forming a lewd love-duet as you hit a mutual climax.", parse);
	Text.NL();
	
	var cum = terry.OrgasmCum();
	TerryScenes.Impregnate(player, terry, cum, PregnancyHandler.Slot.Vag);
	
	var cum = player.OrgasmCum();
	
	Text.Add("Thick jets of [foxvixen]-seed pour into your defenseless cunt, swirling around your depths and mixing into a thick stew as your own feminine honey meets it from above. Trapped with nowhere to go by the seal of [hisher] knot, Terry’s cum just keeps on gushing inside of you. Your hands slap themselves over your midriff, moaning like a whore as you feel yourself swell up like a perverse balloon as [heshe] just keeps on cumming, and cumming...", parse);
	Text.NL();
	if(player.FirstCock()) {
		Text.Add("Unnoticed by either of you, your own [cocks] erupt[notS] in turn, spraying jets of semen over Terry’s torso, coating [hisher] [tbreasts] and even splattering onto [hisher] chin, where [heshe] absently licks it off.", parse);
		Text.NL();
	}
	Text.Add("Time seemingly stops flowing, and you lose yourself in the moment as the two of you clutch each other for support, busily cumming your brains out. But all good things must end, alas, and Terry’s seemingly unending flow slows to a trickle, wringing a hollow groan from your vulpine partner. Sighing softly in satisfaction, you reach up and tenderly take hold of Terry, carefully guiding [himher] down to lie atop you. You hug [himher] gently close, and smile before thanking [himher]; that was great.", parse);
	Text.NL();
	Text.Add("<i>“Y-yeah, it really was.”</i> [HeShe] sighs.", parse);
	Text.NL();
	Text.Add("You chuckle softly and playfully run your fingers through [hisher] long crimson locks. Of course, the two of you won’t be going anywhere until [hisher] ‘little friend’ down there decides to deflate. But that just means you get to cuddle with a cute [foxyvixxy] until it does; lucky you.", parse);
	Text.NL();
	if(terry.Relation() < 30) {
		Text.Add("Terry chuckles despite [himher]self, <i>“Well, that doesn’t seem too bad.”</i>", parse);
		Text.NL();
		Text.Add("You just smile and tussle [hisher] hair affectionately, then focus on making yourself comfortable.", parse);
	}
	else if(terry.Relation() < 60) {
		Text.Add("<i>“Yep, just don’t squeeze me so hard or I’ll - ah!”</i>", parse);
		Text.NL();
		Text.Add("You feel another small spurt from Terry’s flared tip, and you chuckle softly; you’ll just have to be gentle with [himher], in that case. Lying back, you settle in for a nice little rest.", parse);
	}
	else {
		Text.Add("<i>“Well, you’re a tough person to part from.”</i> [HeShe] chuckles.", parse);
		Text.NL();
		Text.Add("Funny, you could say the same thing about [himher]. It must be [hisher] magnetic personality.", parse);
		Text.NL();
		Text.Add("<i>“Of course, it figures a perv like you would have trouble keeping your hands away.”</i> [HeShe] grins.", parse);
		Text.NL();
		Text.Add("Listen to the pot calling the kettle black.", parse);
		Text.NL();
		Text.Add("<i>“Just one thing, if you keep massaging my dick like this, we won’t ever be done.”</i> [HeShe] groans as your vaginal walls manage to wring another spurt from the [foxvixen].", parse);
		Text.NL();
		Text.Add("You don’t really have any control over that part of you. Maybe if [heshe] wasn’t so deliciously big…", parse);
		Text.NL();
		Text.Add("<i>“And who’s to blame for that?”</i>", parse);
		Text.NL();
		Text.Add("You are. But [heshe] didn’t complain about getting it now, did [heshe]?", parse);
		Text.NL();
		Text.Add("<i>“Maybe not, but I don’t really have any say in the matter, remember ‘[mastermistress]’?”</i> [HeShe] grins, pointing at [hisher] collar. <i>“Then again, I don’t have a problem if I stay tied to you forever.”</i>", parse);
		Text.NL();
		Text.Add("Well, that doesn’t sound too bad, but if you two stay stuck forever then you won’t be able to have sex with [himher] anymore. Is that an acceptable sacrifice?", parse);
		Text.NL();
		Text.Add("Terry makes a face of mock desperation. <i>“Oh no! Not the sex!”</i>", parse);
		Text.NL();
		Text.Add("Yes, you’re afraid that’s what it’ll take.", parse);
		Text.NL();
		Text.Add("<i>“Well, better start thinking unsexy thoughts!”</i>", parse);
		Text.NL();
		Text.Add("You chuckle and give Terry a soft kiss. Such a silly [foxvixen]. You’re sure you’ll manage to get unstuck eventually, but for now… well… you two should just enjoy it while it lasts...", parse);
	}
	Text.Flush();
	
	Gui.NextPrompt(function() {
		Text.Clear();
		Text.Add("<b>Some time later…</b>", parse);
		Text.NL();
		Text.Add("After Terry’s knot finally deflates, [heshe] gingerly eases [hisher] footlong length out of your gaping [vag]. A torrent of luke-warm semen pours from your overused hole in [hisher] wake, puddling on the floor beneath you.", parse);
		Text.NL();
		Text.Add("<i>“Damn, that’s a lot!”</i> [heshe] comments, half-impressed with [himher]self.", parse);
		Text.NL();
		Text.Add("You simply smile knowingly at the [foxvixen], trying not to slip in [hisher] leavings as you pull yourself upright. Once the two of you are relatively clean and have your clothes back on, you set off again; Terry leads the way, as you’re going to be walking a little funny for a while after this.", parse);
		
		terry.relation.IncreaseStat(60, 1);
		TimeStep({hour: 2});
		
		Text.Flush();
		
		Gui.NextPrompt();
	});
}

TerryScenes.SexCatchVaginalOutsideHorseCock = function(parse : any) {
	let terry = GAME().terry;
	let player = GAME().player;

	Text.Add("You can't help but moan softly as you feel Terry slowing down. [HeShe] keeps thrusting, but at a much more sedate pace, gyrating [hisher] hips on each stroke through your tunnels. [HeShe] whimpers softly with the effort, [hisher] cock throbbing inside your tunnel, but is steadfast at [hisher] task.", parse);
	Text.NL();
	Text.Add("You can feel [himher] grinding deliberately against your most sensitive spots, substituting attentiveness for vigor. As aroused as you were to begin with, this skillful application of [hisher] dick is the last straw for you.", parse);
	Text.NL();
	
	var cum = player.OrgasmCum();
	
	Text.Add("You arch your back and cry out in pleasure, fingers clawing at the ground as your orgasm rocks your whole body. Thick femcum surges from your netherlips, a tidal wave of nectar that soaks your petals and Terry's prick with equal thoroughness, rolling over [hisher] balls and puddling on the ground beneath you.", parse);
	Text.NL();
	if(player.FirstCock()) {
		Text.Add("Your [cocks] erupt[notS] in sympathy, spewing [itsTheir] load into the air and splattering over your [skin].", parse);
		Text.NL();
	}
	Text.Add("On pure instinct, you clamp down with your cunt, squeezing Terry's mighty man-meat as tightly as you can clench it.", parse);
	Text.NL();
	Text.Add("The [foxvixen] yelps as you squeeze [himher] and suddenly pulls backwards, dragging [hisher] cock out through your tightly clenched walls.", parse);
	Text.NL();
	Text.Add("You moan and wriggle, momentarily confused by [hisher] actions, but too distracted by a secondary climax as [hisher] flare rakes your G-spot to really focus on it.", parse);
	Text.NL();
	Text.Add("An answer swiftly comes as Terry leans back on [hisher] haunches, pawing roughly at [hisher] throbbing dick. The knot bulges, so large you can hardly believe you would have been able to fit it, and the shaft's underside distends obscenely. A bulge races up its length, like a snake eating an egg in reverse, until an enormous gout of [foxvixen]-cum comes gushing out of [hisher] flared glans!", parse);
	Text.NL();
	
	var cum = terry.OrgasmCum();
	
	if(player.Slut() < 30)
		Text.Add("You can't help but squeal as Terry's seed comes raining down on you, instinctively raising your arms to try and shield your face from the lewd deluge about to wash you down.", parse);
	else if(player.Slut() < 50)
		Text.Add("You smile softly to yourself and tilt your face to better catch the spray of semen that comes washing over you, gently rubbing your [breasts] as it splatters over your torso and runs down your body.", parse);
	else
		Text.Add("You greedily open your mouth and extend your tongue in invitation, trying to catch Terry's liquid lust and giving [himher] a clear target to aim for. The thick, rich taste of [hisher] cum fills your mouth and you swallow avidly, even as you exult in the feeling of [himher] painting your body, lazily massaging the warm semen into your [skin].", parse);
	Text.NL();
	Text.Add("Hot on the heels of [hisher] first load comes another, and then another... after all the teasing you've done, Terry has no intention of stopping any time soon. Thick wads of cum fly through the air and noisily splatter over your body, painting you from head to pelvis in a thick layer of dripping, gloopy seed.", parse);
	Text.NL();
	Text.Add("Only when you've been thoroughly marinated in [foxvixen]-semen does Terry's orgasm finally seem to end, [hisher] bulging balls at last content to relax. Terry settles back with a sigh of relief, half-erect horse-cock still idly throbbing as [heshe] takes in your drenched form.", parse);
	Text.NL();
	if(terry.Relation() < 30) {
		Text.Add("<i>“Sorry about that,”</i> [heshe] says, pointing at your cum-caked self. <i>“Couldn’t hold back any longer.”</i>", parse);
		Text.NL();
		Text.Add("You wipe a little semen from your eyes and dryly respond that it’s alright; you should have expected this.", parse);
		Text.NL();
		Text.Add("<i>“Yes, well… is that all you want? Can I go now?”</i>", parse);
	}
	else if(terry.Relation() < 60) {
		Text.Add("<i>“Now that’s what I call icing on the cake.”</i> [HeShe] chuckles.", parse);
		Text.NL();
		Text.Add("Maybe [heshe] should have been a baker instead of a thief, hmm? [HeShe] certainly has a knack for glazing treats.", parse);
		Text.NL();
		Text.Add("The [foxvixen] laughs. <i>“Well, that was a lame comeback. Still, we’d better get you cleaned up. Cum sticks to everything.”</i> [HeShe] smiles.", parse);
	}
	else {
		Text.Add("<i>“There’s a nice look for you, perv. Looking pretty slick.”</i> [HeShe] grins.", parse);
		Text.NL();
		Text.Add("You giggle softly and playfully preen yourself. Does [heshe] really think so? [FoxVixen] cum is all the rage in style these days, you hear.", parse);
		Text.NL();
		Text.Add("<i>“Well, if you like it so much, I’m up for giving you another layer, just give my magical hose a few tugs and we’ll get you all white in a second.”</i> [HeShe] chuckles.", parse);
		Text.NL();
		Text.Add("[HeShe]'d like that, wouldn't [heshe]? Well, if [heshe]'s a good [boygirl], you might give [himher] a special treat later... after you've had a little rest. Some naughty [foxvixen] has worn you all out...", parse);
		Text.NL();
		Text.Add("<i>“Ain’t no fault of mine, you only got what you asked for,”</i> [heshe] says, very pleased with [himher]self.", parse);
		Text.NL();
		Text.Add("[HeShe]’s such a generous soul, isn’t [heshe]?", parse);
		Text.NL();
		Text.Add("<i>“Ahem, much as I’d love to keep teasing you, would you like me to help you get cleaned up? I heard cum can be tough to wash out.”</i>", parse);
	}
	
	terry.relation.IncreaseStat(60, 1);
	TimeStep({hour: 1});

	Text.Flush();

	TerryScenes.TCleansPC();
}

TerryScenes.SexCatchVaginalInsideFoxCock = function(parse : any) {
	let terry = GAME().terry;
	let player = GAME().player;

	Text.Add("You cry out as you are forcibly stuffed and stretched by the [foxvixen]'s surprisingly big knot; as soon as it’s past your entrance, you can feel it growing into a rock-solid plug to hold you in place. Terry instinctively tries to back out, but since [hisher] knot has the two of you tied, all [heshe] manages to do is tug your walls. It feels wonderful, and you let [himher] know that with a deep, pleasure-filled moan.", parse);
	Text.NL();
	Text.Add("[HeShe] grunts with effort as [heshe] pushes inside you, driving [himher]self as far as [heshe] can into your pliable cunt, then [heshe] tries to pull away once more. The two of your repeat this back and forth until you can’t take it anymore and you clamp down on your willing partner’s shaft.", parse);
	Text.NL();
	
	var cum = player.OrgasmCum();
	
	Text.Add("You cry out in pleasure as your pussy spasms and your juices flood your passage; your walls contract, working to milk the member embedded deep within you. Terry grips your hips extra-hard, but not hard enough to hurt you, as [heshe] grinds [himher]self against you, gyrating [hisher] hips to grant you maximum pleasure before [heshe] climaxes [himher]self.", parse);
	Text.NL();
	
	var cum = terry.OrgasmCum();
	TerryScenes.Impregnate(player, terry, cum, PregnancyHandler.Slot.Vag);
	
	Text.Add("You can feel the warmth spreading throughout your nethers mixing with your juices. With the [foxvixen]’s knot holding you shut, the mixture has nowhere to go but into your womb. Terry’s load isn’t exactly prodigious, but all things considered, you’d still say [heshe] came buckets. The two of you grind into each other as you come off your orgasmic high. The [foxvixen] collapses atop you and you move to embrace your lover as you feel the heat in your [vag] die out into an ember that spreads pleasantly through your body.", parse);
	Text.NL();
	Text.Add("You find yourself smiling lazily as you stroke Terry’s hair.", parse);
	if(player.FirstCock())
		Text.Add(" A familiar feeling of euphoria, accompanied by strands of sticky cum, lets you know that your cunt wasn’t the only part of you that had some enjoyment.", parse);
	Text.Add(" The two of you lie together for a few moments, before Terry recovers enough to push [himher]self up.", parse);
	Text.NL();
	Text.Add("<i>“That was great!”</i> [heshe] says, panting lightly.", parse);
	Text.NL();
	Text.Add("You’d have to agree, it was pretty great! [HeShe] did a great job, you say, patting [hisher] head.", parse);
	Text.NL();
	if(terry.Relation() < 30) {
		Text.Add("Despite [himher]self, you can tell [heshe]’s feeling proud of [himher]self, and maybe a bit embarrassed with how much [heshe] enjoyed doing it with you.", parse);
		Text.NL();
		Text.Add("<i>“Um, anyway, I guess we’re stuck like this for a while. It’ll take a bit for my knot to deflate so I can finally pull out… and we still have to clean up too.”</i> True, but you don’t mind. Besides, you’re feeling way too good to move right now… so maybe a nap is in order.", parse);
		Text.NL();
		Text.Add("<i>“I can agree to that.”</i> [HeShe] smiles. You thought [heshe] would…", parse);
		Text.NL();
		Text.Add("The two of you snuggle closer and let your eyes rest for a while, enjoying each other’s warmth as you settle into a nice nap.", parse);
	}
	else if(terry.Relation() < 60) {
		Text.Add("Terry smiles happily and leans into your hand. It’s a small display of affection, but it’s still very cute… and [hisher] smile is quite infectious…", parse);
		Text.NL();
		Text.Add("The [foxvixen] yawns lazily, it’s clear the earlier activities took its toll; and you’re not sure you’re faring much better either.", parse);
		Text.NL();
		Text.Add("<i>“Hey, [playername]. It’ll be awhile before my knot deflates and I can pull out, so how about we snuggle and rest for a bit?”</i>", parse);
		Text.NL();
		Text.Add("Sounds like a great plan.", parse);
		Text.NL();
		Text.Add("<i>“Hehe, I thought you’d agree. C’mere.”</i> [HeShe] hugs you close, nuzzling you softly as [heshe] drapes [himher]self over you. Such a cute and affectionate [foxvixen]...", parse);
	}
	else {
		Text.Add("<i>“Anything for my loving and caring [mastermistress] slash [boygirl]friend.”</i> [HeShe] chuckles. <i>“Too bad you’re such a big perv sometimes.”</i>", parse);
		Text.NL();
		Text.Add("You gently flick [hisher] nose in retaliation. [HeShe]’s the one groping your [butt] and you’re the perv?", parse);
		Text.NL();
		Text.Add("<i>“Hey, what can I say? You have a wonderfully gropeable butt, besides that I know you love this.”</i> [HeShe] gives you a hard squeeze. <i>“And since we’re going to be tied together for awhile, I thought I might as well as find something to do until then.”</i> [HeShe] grins.", parse);
		Text.NL();
		Text.Add("Yeah right…", parse);
		Text.NL();
		Text.Add("<i>“Or perhaps you’d like me to do something different?”</i>", parse);
		Text.NL();
		
		var scenes = new EncounterTable();
		scenes.AddEnc(function() {
			Text.Add("[HisHer] hands move up to tweak your nipples, gently caressing your breasts.", parse);
			Text.NL();
			Text.Add("You gasp in pleasure and your hands dart to intercept [hishers], holding onto them as you pull the [foxvixen] up so [heshe]’s level with your face.", parse);
			Text.NL();
			Text.Add("Now, that’s quite enough. If [heshe] gets started, the two of you will never get out of here!", parse);
			Text.NL();
			Text.Add("<i>“Doesn’t seem like a such a bad fate.”</i> [HeShe] grins.", parse);
		}, 1.0, function() { return player.FirstBreastRow().size.Get() >= 3; });
		scenes.AddEnc(function() {
			Text.Add("[HeShe] bends over to give[oneof] your [cocks] a lick.", parse);
			Text.NL();
			Text.Add("You gasp in pleasure and your hands dart to [hisher] shoulders, pulling the [foxvixen] up so [heshe]’s level with your face.", parse);
			Text.NL();
			Text.Add("Not that you wouldn’t appreciate a blowjob, but if [heshe] starts on this the two of you aren’t getting out of here anytime soon!", parse);
			Text.NL();
			Text.Add("<i>“Aww, you’re talking as if that was a bad thing.”</i> [HeShe] grins.", parse);
		}, 1.0, function() { return player.FirstCock(); });
		scenes.AddEnc(function() {
			Text.Add("[HisHer] hands move a little lower, one finger gently rubbing your [anus].", parse);
			Text.NL();
			Text.Add("You shake at the sensation and immediately grabs [hisher] hands, pulling them from under you.", parse);
			Text.NL();
			Text.Add("<i>“Sorry, bad touch?”</i> [heshe] asks apologetically.", parse);
			Text.NL();
			Text.Add("Well… you’re just not in the mood right now.", parse);
			Text.NL();
			Text.Add("Terry sighs and you let go of [hisher] hands. Slowly, [heshe] pulls [himher]self up so [hisher] face is level with your.", parse);
			Text.NL();
			Text.Add("<i>“Sorry for that, [playername]. You’re just too sexy, and I couldn’t help myself. Forgive me?”</i> [HeShe] grins apologetically.", parse);
		}, 1.0, function() { return true; });
		scenes.Get();
		
		Text.NL();
		Text.Add("Oh, you sly [foxvixen]...", parse);
		Text.NL();
		Text.Add("You grab Terry by the cheeks and pull [himher] into a kiss. [HeShe] kisses you back, but you quickly break it. For now, you’d just like to lie down with [himher] and have a nap, you tell [himher].", parse);
		Text.NL();
		Text.Add("<i>“Okay then, I guess a nap would be good.”</i> [HeShe] smiles and hugs you while settling down on top of you. Such an affectionate pet, you chuckle, embracing [himher] as the two of you drift asleep.", parse);
	}
	Text.NL();
	Text.Add("Time passes, and when the two of you come to, Terry’s knot is small enough that [heshe] can pull out of you without any issue. Your mixed fluids drip from your used [vag] and you quickly clean yourself up, before dressing up and getting ready to depart once more.", parse);
	
	terry.relation.IncreaseStat(60, 1);
	TimeStep({hour: 1, minute: 30});

	Text.Flush();
	
	Gui.NextPrompt();
}

TerryScenes.SexCatchVaginalOutsideFoxCock = function(parse : any) {
	let terry = GAME().terry;
	let player = GAME().player;

	Text.Add("The [foxvixen] takes a few deep breaths, steadying [himher]self before cracking [hisher] knuckles. <i>“Alright, let’s get to work!”</i> Grinning widely, you nod hungrily and assure [himher] that you're ready.", parse);
	Text.NL();
	Text.Add("[HeShe] approaches you, leaning down to get to your [vag]. Your juices ooze from your entrance as [heshe] lets [hisher] tongue out to give your labia a sloppy lick. You moan appreciatively, squirming in your seat as Terry's warm, wet length caresses your petals and sends sparks of pleasure dancing along your spine.", parse);
	Text.NL();
	Text.Add("<i>“Hmm, tasty!”</i>", parse);
	Text.NL();
	if(player.Slut() < 15)
		Text.Add("You flush warmly at the comment, but can't keep from smiling at the approval in the [foxvixen]'s voice.", parse);
	else
		Text.Add("Chuckling, you thank Terry for the compliment.", parse);
	Text.NL();
	parse["c"] = player.FirstVag().clitCock ? "" : ", lips puckering to give your pleasure buzzer a kiss";
	Text.Add("Terry starts off by pressing a finger inside you, it’s… smaller than [hisher] dick, and frankly, after [heshe]’s entered you, you just don’t find it very fulfilling. Next, you feel [hisher] nose gently rub against your [clit][c].", parse);
	Text.NL();
	Text.Add("Now that feels much better, making you purr in approval and wriggle to better press your [clit] to Terry's soft, sweet lips.", parse);
	Text.NL();
	Text.Add("[HeShe] takes that as [hisher] cue to start moving and exploring your inner walls, touching you all over in search of your most sensitive spots.", parse);
	Text.NL();
	if(terry.Relation() < 30)
		Text.Add("[HeShe]'s... well, if you're honest, [heshe]'s not very good, but at least [heshe]'s making an honest effort at it. Just that fact alone is enough to make you squeeze down a little tighter, a delicious tingling spreading through your nethers. When [heshe] chances upon a particularly sweet spot, you moan shamelessly, letting [himher] know [heshe]’s hit the right stuff.", parse);
	else if(terry.Relation() < 30)
		Text.Add("The [foxvixen]'s efforts are a little hit-and-miss, but [heshe]'s got a good memory for the sweeter spots. The slightest twitch on your face or the whisper of a moan and [heshe] redirects [hisher] efforts, teasing some of your more blatant spots and making you grow wetter. [HeShe] could use a little more practice, but [heshe] definitely knows how to get you all fired up.", parse);
	else
		Text.Add("You may as well be putty in your vulpine lover's hands. [HisHer] dexterous digit seeks out even the most well-hidden and sensitive of your pleasure spots with needle-like precision, leaving you squirming and mewling happily as [heshe] plays with you.", parse);
	Text.NL();
	Text.Add("Terry continues to stimulate you, whilst virtually making out with your [clit]. After a few moments, [heshe] adds another finger, and then another. Each digit dexterously explores your insides.", parse);
	Text.NL();
	Text.Add("Pleasure builds inside of you like an open flame, emanating from your pussy and sweeping up through your body, flooding you with its warmth. Your heart starts to pound, your breath coming in short gasps as your mind begins to succumb to the deluge of stimulus Terry is providing you.", parse);
	Text.NL();
	Text.Add("You can feel your will starting to crumble, body inching ever closer to orgasm. Moaning blissfully, you absently warn the [foxvixen] that you're getting close to cumming, begging [himher] to help you get there.", parse);
	Text.NL();
	parse["c"] = player.FirstVag().clitCock ? "long lick" : "little nibble";
	Text.Add("<i>“Well then, how’s this for some help?”</i> [HeShe] pumps [hisher] fingers in whilst simultaneously giving your [clit] a [c].", parse);
	Text.NL();
	
	var cum = player.OrgasmCum();
	
	Text.Add("Oh, that did it! You can't even try to hold back an ecstatic shriek as you cum right there on the spot. Spots dance in front of your eyes as your whole body quivers with the effort of climax, squeezing down on Terry's fingers with a death grip. Your [legs] quiver[lnotS] and twitch[lnotEs], feminine honey spurting from your folds and spraying all over Terry's chin.", parse);
	Text.NL();
	if(player.FirstCock()) {
		Text.Add("Ignored until now, your [cocks] erupt[notS] in sympathy, raining semen down on the pair of you.", parse);
		Text.NL();
	}
	Text.Add("Time fades away and all that matters now is your climax... and then, as sharply as it came, it retreats. Your sense of the world around you snaps back into place, fatigue leaving you sprawled in place as you pant for breath. That feels so damn good...", parse);
	Text.NL();
	Text.Add("You're not sure how long you lie there, dopily smiling in satisfaction, but eventually you muster the energy to lift your head and lazily thank Terry for [hisher] efforts. You <i>really</i> needed that.", parse);
	Text.NL();
	Text.Add("<i>“No worries, I had a lot of fun too!”</i>", parse);
	Text.NL();
	Text.Add("Still grinning happily, you reach out and pull Terry into a hug. Nuzzling into your fluffy bedmate, you lazily assert that you're glad [heshe] enjoyed it too. Now, it's time the two of you got some sleep.", parse);
	Text.NL();
	if(terry.Relation() < 30)
		Text.Add("The [foxvixen] wriggles a little in your arms, clearly not entirely enthused with the idea of being your cuddly toy, but you just tighten your grip. [HeShe] sighs softly and submits. Still, as you drift off, you think you feel [himher] snuggle in a little closer.", parse);
	else if(terry.Relation() < 30)
		Text.Add("Terry seems content to put up with your sudden need for a life-sized stuffed toy. [HeShe] makes [himher]self comfortable and the two of you soon drift off together in equitable silence.", parse);
	else
		Text.Add("Your lover is caught off-guard by your sudden glomp, but quickly rallies and hugs you back. Lost in each other's arms, you nuzzle each other sleepily and allow sleep to claim you both.", parse);
	
	terry.relation.IncreaseStat(60, 1);
	TimeStep({hour: 1});

	Text.Flush();
	
	Gui.NextPrompt();
}

TerryScenes.SexCatchAnal = function() {
	let terry = GAME().terry;
	let player = GAME().player;

	var p1cock = player.BiggestCock();
	
	var parse : any = {
		playername : player.name,
		foxvixen   : terry.mfPronoun("fox", "vixen"),
		fox        : terry.HorseCock() ? "stallion" : "fox-",		
		boygirl    : player.mfFem("boy", "girl")
	};
	parse = player.ParserTags(parse);
	parse = terry.ParserTags(parse, "t");
	
	var first = terry.flags["caFirst"] == 0;
	terry.flags["caFirst"]++;
	
	parse = terry.ParserPronouns(parse);
	parse = Text.ParserPlural(parse, player.NumCocks() > 1);
	parse = Text.ParserPlural(parse, player.NumCocks() > 2, "", "2");

	var tail = player.HasTail();
	var wing = player.HasWings();
	
	Text.Clear();
	Text.Add("Grinning smugly to yourself, your gaze drifts toward Terry’s crotch and the delightful toy hanging there, already protruding from its protective sheath. With a lick of your lips, you step closer to Terry, cooing that this is going to be [hisher] lucky day.", parse);
	Text.NL();
	if(terry.Relation() < 30) {
		Text.Add("<i>“It is?”</i>", parse);
		Text.NL();
		Text.Add("You nod, assuring [himher] that it is.", parse);
	}
	else if(terry.Relation() < 60) {
		Text.Add("<i>“And why would that be?”</i> [heshe] asks with a smug smile.", parse);
		Text.NL();
		Text.Add("Well...", parse);
	}
	else {
		Text.Add("<i>“Reaaaaly?”</i> [heshe] asks with a grin.", parse);
		Text.NL();
		Text.Add("Oh yes, really, you purr, grinning back at [himher].", parse);
	}
	Text.NL();
	Text.Add("Because, right now, you feel like taking this - you reach out and cup Terry’s [tcock], caressing it wantonly - and letting [himher] bury it right to the hilt in your needy ass. Still fondling the [foxvixen], feeling the warmth of arousal under your fingers, you purr seductively, asking if [heshe] likes the sound of that.", parse);
	Text.NL();
	Text.Add("<i>“Not gonna lie, I love what I’m hearing,”</i> [heshe] replies, thrusting [hisher] hips out and letting you fondle [hisher] crotch with a mischievous grin. <i>“Does that mean I can do whatever I want?”</i>", parse);
	Text.NL();
	Text.Add("You purse your lips thoughtfully. Well... you let Terry stew for a few moments, rubbing the tip of [hisher] cock with your fingertips, then grin broadly and nod. Whyever not? This time, Terry can be in charge; you’ll let [himher] do as [heshe] likes.", parse);
	Text.NL();
	Text.Add("<i>“Music to my ears… Now, how about you stop holding out on me and show me the goods?”</i> [heshe] asks, placing a hand on your [hip].", parse);
	Text.NL();
	Text.Add("[HeShe] only had to ask, you quip back, giving [himher] a quick affectionate squeeze with your fingertips before stepping back. With purposeful movements, you divest yourself of your [armor], casting it casually aside before turning around and bending over, thrusting out your [butt] for the [foxvixen]’s approval.", parse);
	Text.NL();
	Text.Add("Terry starts by appraising your [butt] moving [hisher] handpaws over your [skin]. <i>“Nice,”</i> [heshe] says, giving you an appreciative pat.", parse);
	Text.NL();
	Text.Add("You smile over your shoulder, telling [himher] that you’re glad [heshe] approves.", parse);
	Text.NL();
	Text.Add("<i>“Let’s not waste time then,”</i> [heshe] says.", parse);
	
	//[Suck][Vagina][Grind][[HeShe] decides]
	var options = new Array();
	options.push({ nameStr : "Suck",
		func : function() {
			Text.Clear();
			Text.Add("The [foxvixen] guides you to the ground, then circles around to present you [hisher] erect [tcock]. <i>“Here’s my cock - be a good [boygirl] and give me a good cockshine.”</i>", parse);
			Text.NL();
			Text.Add("Smiling happily, you reach out with one hand for the erection bobbing before you.", parse);
			Text.NL();
			if(terry.HorseCock()) {
				Text.Add("It’s not at full extension yet, but there’s at least nine or ten inches of semi-turgid horsemeat waving before you. There's plenty to wrap your fingers around, and then you pull it closer, letting the [tongueTip] of your tongue glide teasingly over its surface. You lick the [foxvixen]’s stallionhood like if it was ice cream, getting it nice and shiny before you pop it inside. The salty-sweet taste of pre-cum washes over your senses and your eyes close to concentrate on it better. You bob your head back and forth, audibly humming your delight as you work it around inside your mouth, drooling unabashedly upon the proud erection.", parse);
			}
			else {
				Text.Add("Terry’s dainty little piece is so cute, really. [HeShe]’s really going to need to work it hard, but you just know [heshe] can pull it off. Your mouth closes around the tip in a mock-nip, then you noisily slurp it inside, burying your nose up against Terry’s belly. You lavish loving licks upon the pre-dripping piece of meat between your lips, tasting salty-sweet washing over your taste buds and crooning with pleasure as you do.", parse);
			}
			Text.NL();
			
			Sex.Blowjob(player, terry);
			player.FuckOral(player.Mouth(), terry.FirstCock(), 1);
			terry.Fuck(terry.FirstCock(), 1);
			
			Text.Add("<i>“Ah, yes. That feels great,”</i> you hear [himher] whisper. [HisHer] hands move to your head, holding you gently by the sides as [heshe] guides you to [hisher] most sensitive spots. <i>“Work a bit harder here.”</i>", parse);
			Text.NL();
			Text.Add("You voice a muffled moan of desire, increasing the suction as best you can and stroking all the harder with your [tongue]. You lavish your attentions on Terry’s [tcock], worshipping it with lips and tongue until the pre-cum is flowing steadily down your throat, then slowly pop yourself free. Strings of saliva link the bobbing dick to your parted lips, and it glistens before you as Terry shifts [hisher] stance. Your eyes look up toward the [foxvixen] and you give [himher] your sexiest smolder, lustfully breathing that [heshe] looks good and lubed now.", parse);
			Text.NL();
			Text.Add("<i>“Ah! Here, let me help!”</i> the [foxvixen] says with glee, grasping your head by the sides and beginning to hump you.", parse);
			Text.NL();
			Text.Add("Caught off-guard, the [tcock] plunges back between your lips, thrusting vigorously into your maw again before you manage to raise your hands and pointedly shove Terry away. Wiping a smear of pre-cum and saliva from your cheek, you ask if [heshe] really loves your mouth so much that [heshe]’s going to just turn down a chance to have your ass.", parse);
			Text.NL();
			Text.Add("<i>“Of course not. I’m just making sure you got it lubed enough. Wouldn’t want to hurt that pretty ass of yours would we?”</i> [heshe] replies with a smirk.", parse);
			Text.NL();
			Text.Add("No, you most certainly wouldn’t, you purr back. You just wanted to make sure [heshe] had [hisher] eye still on the real prize here for [himher]... Now, since you went and got your little [foxvixen] all lubed up, perhaps [heshe] would like to get started with the real fun now?", parse);
			Text.NL();
			Text.Add("<i>“As you wish, my pet,”</i> [heshe] says with a grin.", parse);
			Text.Flush();
			Gui.NextPrompt();
		}, enabled : true,
		tooltip : Text.Parse("Why doesn’t [heshe] bring that tasty [tcock] around to your mouth? You’ll get [himher] all lubed up...", parse)
	});
	if(player.FirstVag()) {
		options.push({ nameStr : "Vagina",
			func : function(hischoice : boolean) {
				Text.Clear();
				if(hischoice)
					Text.Add("<i>“You know what, I think I’ll just use your [vag] for this. Get down on the floor and raise your butt for me!”</i>", parse);
				else
					Text.Add("<i>“Great idea!”</i> the [foxvixen] exclaims. <i>“Alright then, I’ll give you a taste of my [fox]hood. Get down on the floor and raise that tush for me!”</i>", parse);
				Text.NL();
				parse["tl"] = tail ? Text.Parse(" and curl your [tail] out of the way", parse) : "";
				Text.Add("You smirk to yourself and nod, already moving into position as you were instructed. Belly nearly flat on the ground, supporting yourself on your hands and elbows, you raise your [anus] up into the air[tl], giving it a seductive shake.", parse);
				Text.NL();
				parse["cl"] = player.FirstVag().clitCock ? "" : Text.Parse(" and prodding your [clit] with a padded finger", parse);
				Text.Add("Terry starts off by gently massaging your [vag], slowly teasing your labia[cl]. <i>“You were not lying about the wet part,”</i> Terry comments, bringing [hisher] moist digits to [hisher] mouth and giving them a lick.", parse);
				Text.NL();
				Text.Add("You moan huskily and arch your back, curling your [feet] in pleasure at Terry’s touch, then chuckling softly. Does Terry not like the idea [heshe] can get you so hot and bothered this easily? Imagine what you’ll be like when you’re actually wrapped around [hisher] hot, throbbing cock...", parse);
				Text.NL();
				if(terry.Relation() < 30) {
					Text.Add("<i>“Well, I’m just surprised you feel that way about me. Never thought a [boygirl] would get wet for me without money being involved.”</i>", parse);
					Text.NL();
					Text.Add("You shake your head and click your tongue. Any [boygirl] who wasn’t willing to give your sweet little [foxvixen] a shot was a fool. But their loss is your gain, and you don’t intend to let [himher] go any time soon...", parse);
					Text.NL();
					Text.Add("<i>“I see, thanks,”</i> [heshe] says with a smile. <i>“So… get started?”</i>", parse);
					Text.NL();
					Text.Add("Please, let’s.", parse);
				}
				else if(terry.Relation() < 60) {
					Text.Add("<i>“Of course I like it, but nothing wrong with working you up to the high, right? If you’re already like that, then it kinda takes the fun out of it,”</i> [heshe] replies teasingly.", parse);
					Text.NL();
					Text.Add("Oh, poor baby; are you spoiling [hisher] fun? You’ll just have to make it up to [himher] when the real fun begins...", parse);
					Text.NL();
					Text.Add("<i>“I’m counting on it. But let’s not delay any longer, shall we?”</i>", parse);
					Text.NL();
					Text.Add("Somebody else is in a hurry too, hmm? Well, you’re ready when [heshe] is.", parse);
				}
				else {
					parse["fat"] = terry.HorseCock() ? " fat" : "";
					Text.Add("<i>“Ha! Any other [foxvixen] would ask themselves why you said you wanted to be buggered if you’re here pining to get my[fat] cock up your [vag]. But since it’s me, and I know what a huge perv you are…”</i> [heshe] trails off with a grin.", parse);
					Text.NL();
					Text.Add("As if that isn’t part of the reason [heshe] loves you so much, you immediately quip back.", parse);
					Text.NL();
					Text.Add("<i>“Too true. Now let’s get down to business, shall we?”</i>", parse);
					Text.NL();
					Text.Add("You purr contentedly at that suggestion and nod your head eagerly. Oh, yes...", parse);
				}
				Text.NL();
				parse["h"] = terry.HorseCock() ? " considerable" : "";
				Text.Add("The [foxvixen] starts off by gently prodding your moist slit with [hisher] [tcockTip], gathering some of your juices as [heshe] aligns with your opening proper. With deliberate slowness, as if savoring every second, [heshe] begins feeding you inch after inch of [hisher][h] girth.", parse);
				Text.NL();
				Text.Add("You gasp as you feel your folds spreading, then moan blissfully as Terry sinks within you. Unthinkingly, you clench down, trying to pull the [foxvixen] deeper, wriggling your hips to try and help guide [himher] inside. That feels good...", parse);
				Text.NL();
				
				Sex.Vaginal(terry, player);
				player.FuckVag(player.FirstVag(), terry.FirstCock(), 1);
				terry.Fuck(terry.FirstCock(), 1);
				
				Text.Add("A moan of pleasure emanates from your pet [foxvixen], but [heshe] doesn’t change [hisher] pace. [HeShe] keeps slowly pressing inside you until [heshe] bottoms out. <i>“Dammit, [playername]. If you keep gripping me like this, I’m gonna wind up shooting my load up your pussy,”</i> [heshe] says with a gasp of pleasure. ", parse);
				Text.NL();
				Text.Add("A moan bubbles from deep inside you, the temptation to tell the [foxvixen] to just go ahead welling up. But you shake your head and start breathing deep and slow until your body stops shaking and you can unclench your folds. Feeling more sure of yourself now, you ask if Terry feels [heshe] is lubed enough now.", parse);
				Text.NL();
				Text.Add("<i>“Honestly, I think I could do with a bit more, but we’d better stop now before you wind up grabbing me in a vice again,”</i> the [foxvixen] chuckles.", parse);
				Text.NL();
				Text.Add("Even as you nod, you still can’t hold back a quiver and a pout of disappointment as Terry gently slips [hisher] newly slickened shaft from your womanhood.", parse);
				Text.NL();
				Text.Add("<i>“Alright, let’s begin!”</i>", parse);
				Text.Flush();
				Gui.NextPrompt();
			}, enabled : true,
			tooltip : Text.Parse("You’re already plenty wet in the other hole; why doesn’t [heshe] lube [hisher] dick there?", parse)
		});
	}
	options.push({ nameStr : "Grind",
		func : function(hischoice : boolean) {
			Text.Clear();
			if(hischoice)
				Text.Add("<i>“You know what, I think all you need is a bit of grinding and you’ll be all set. Get down and spread yourself for me!”</i>", parse);
			else
				Text.Add("<i>“You want it that bad?”</i> the [foxvixen] teases. <i>“A little patience wouldn’t hurt, [playername], but that’s okay. If you want to feel my cock up your butt so badly, I’ll oblige! Now, get down and spread yourself for me!”</i>", parse);
			Text.NL();
			Text.Add("[HeShe] only had to ask. Smiling, you ease yourself to the ground and move your [legs] to better expose the full expanse of your [anus]. You even go so far as to reach back with one hand and crudely spread your butt cheeks with your splayed fingers, ensuring the [foxvixen] can get a better look at your [anus].", parse);
			Text.NL();
			Text.Add("Terry starts out by grabbing your [hips] and aligning [hisher] [tcock] with your butt cleavage.", parse);
			Text.NL();
			Text.Add("You groan in pleased anticipation as you feel Terry’s hard meat slaps against your ass cheeks, moving your fingers to provide [himher] with better access to your hole. Shifting your stance slightly to be better braced, you tell [himher] to go ahead.", parse);
			Text.NL();
			Text.Add("The [foxvixen] begins humping you, brushing your [anus] with [hisher] length as pre bubbles from [hisher] [tcockTip]. <i>“This might take a bit of work...”</i>", parse);
			Text.NL();
			Text.Add("A coo of pleasure escapes your lips, unthinkingly thrusting back with your hips as a shudder ripples down your spine. You assure Terry that you don’t mind; this feels delicious...", parse);
			Text.NL();
			Text.Add("<i>“Good, because we’re just getting started,”</i> [heshe] says, sliding [hisher] [tcock] down to [hisher] [tcockTip] and smearing your sphincter with [hisher] slick pre.", parse);
			Text.NL();
			Text.Add("With Terry starting to grind [hisher] [tcockTip] against your anus, your hand abandons your ass and joins its partner in supporting you. As the [foxvixen] gently but insistently rubs [hisher] glans against your anus, you can’t help moaning at the feel of flesh on flesh, pre-cum seeping into every wrinkle. Your [anus] flexes in response to Terry’s touch, opening up in anticipation of his [tcockTip] pushing inside.", parse);
			Text.NL();
			Text.Add("<i>“Think that’ll be enough lube for you,”</i> Terry says, pulling away.", parse);
			Text.NL();
			Text.Add("Unthinkingly, you groan in disappointment, shifting your weight restlessly even though you know Terry will be giving it back to you soon.", parse);
			Text.Flush();
			Gui.NextPrompt();
		}, enabled : true,
		tooltip : Text.Parse("[HeShe] can just grind your ass; you know you’ll be ready for [himher] with a little prepping back there.", parse)
	});
	options.push({ nameStr : Text.Parse("[HeShe] decides", parse),
		func : function() {
			Text.Clear();
			Text.Add("<i>“If that’s what you want, I’m happy to oblige!”</i>", parse);
			Text.NL();
			var next = options[Math.floor(Math.random() * (options.length-1))].func;
			next(true);
		}, enabled : true,
		tooltip : Text.Parse("You want Terry to really cut loose on you; [heshe] can do whatever [heshe] wants to you.", parse)
	});
	
	if(terry.Relation() >= 45) {
		Text.Add(" <i>“Since you’ve been so nice to me, I think I’ll let you pick your poison. How do you wanna get me lubed up for that [anus] of yours?”</i>", parse);
		Text.Flush();
		Gui.SetButtonsFromList(options, false, null);
	}
	else {
		var next = options[Math.floor(Math.random() * (options.length-1))].func;
		Text.Flush();
		Gui.NextPrompt(function() {
			next(true);
		});
	}
	
	Gui.Callstack.push(function() {
		Text.Clear();
		if(terry.Relation() < 30) {
			Text.Add("<i>“No point in delaying the inevitable!”</i> [heshe] says, gripping your [hips] and pushing [hisher] entire cock in a single thrust.", parse);
			Text.NL();
			
			Sex.Anal(terry, player);
			player.FuckAnal(player.Butt(), terry.FirstCock(), 4);
			terry.Fuck(terry.FirstCock(), 4);
			
			if(terry.HorseCock())
				Text.Add("Even with all the efforts Terry put into lubing you, you still shriek in shock and pain; [hisher] cock isn’t small by any stretch of the imagination, and [heshe] just jammed it in you with one move! Your anus feels like it’s on fire from the force with which he just violated you.", parse);
			else
				Text.Add("You cry out in surprise and a tinge of pain as Terry’s petite foxhood plunges home. Dimly, you thank your lucky stars that Terry is small down there, and that [heshe] allowed you to lube [himher] up first. That would have <b>really</b> hurt otherwise...", parse);
			Text.NL();
			Text.Add("<i>“What’s the matter, [playername]? Wasn’t this what you were asking for?”</i> Terry teases, beginning to move [hisher] hips.", parse);
			Text.NL();
			Text.Add("Shaking your head to try and clear the spots from your eyes, you crane your head to glare at Terry over your shoulder. You protest that this is <b>not</b> what you asked for, cut-off in mid-sentence as Terry suddenly bucks roughly into your waist, making you snap forward with an incoherent splutter.", parse);
			Text.NL();
			Text.Add("<i>“You said I was in charge, and that I was supposed to take your butt. So that’s what I’m doing,”</i> [heshe] replies nonchalantly.", parse);
			Text.NL();
			if(first) {
				if(player.SubDom() >= 40) {
					Text.Add("Growling, you snap that being in charge doesn’t mean [heshe] can just hurt you for [hisher] own pleasure! [HeShe] better not forget [heshe] still has that collar around [hisher] neck because you sure haven’t!", parse);
					Text.NL();
					Text.Add("<i>“Now, listen up. If you-”</i>", parse);
				}
				else {
					Text.Add("Tearfully, you ask why [heshe] has to do it in a way that hurts you; you wanted to be nice and let [himher] be in charge, so why is [heshe] treating you like this?", parse);
					Text.NL();
					Text.Add("<i>“You want to know why? I’ll tell you-”</i>", parse);
				}
				Text.Add(" Terry suddenly stops in [hisher] tracks, a gasp escaping [himher] as [heshe] suddenly grows motionless inside you. Though [heshe] stops moving, you can feel [hisher] [tcock] throbbing inside. <i>“Haa, Haa...”</i> [heshe] pants.", parse);
				Text.NL();
				Text.Add("Looks like the collar has picked up on your distress and automatically started to punish Terry for you.", parse);
				Text.NL();
				if(player.SubDom() >= 40) {
					Text.Add("With a sneer, you taunt Terry that this is what [heshe] gets for abusing the trust you so generously placed in [himher]. You deliberately crawl forward, far enough that Terry’s [tcock] pops free of your recently abused asshole.", parse);
					Text.NL();
					Text.Add("<i>“T-too hot...”</i> [heshe] says airily, sitting on [hisher] knees, unable to do anything.", parse);
					Text.NL();
					Text.Add("Rolling over onto your back, you smirk at Terry. Well, what a shame. Maybe you should just leave [himher] like that - see if it will teach [himher] a lesson about not abusing your nicety in the future.", parse);
					Text.NL();
					Text.Add("<i>“N-no! Please...”</i> [heshe] begs, moaning as pre begins dripping from [hisher] [tcockTip].", parse);
					Text.NL();
					Text.Add("With a knowing smirk, you tap your finger against your arm. Well, it <b>would</b> be a waste of a perfectly good cock... and you did spend all that time getting primed and ready, too... Does [heshe] promise to be good if you let [himher] have the reins again?", parse);
					Text.NL();
					Text.Add("<i>“Yes! Anything you want! Just make it stop, haa...”</i> [heshe] readily agrees.", parse);
					Text.NL();
					Text.Add("Well... you trail off, leaving the word hanging just long enough for the [foxvixen] to voice a plaintive, pleading moan. Smiling at [himher] in a gentler fashion, you raise yourself from your position and close the distance between you. ", parse);
					Text.NL();
					Text.Add("You take Terry gently in your arms and guide the [foxvixen] until [heshe] is lying on [hisher] back. Then you straddle [hisher] waist, sitting so that [hisher] [tcock] is jutting up through the cheeks of your [butt].", parse);
					Text.NL();
					Text.Add("Teasingly, you grind your buttocks back against the [foxvixen]’s jutting erection, rubbing up and down and enjoying the feel of hot pre-cum sliding over your [skin], even as Terry moans plaintively beneath you.", parse);
					Text.NL();
					Text.Add("When you feel you have teased Terry enough, you lift your hips, align [hisher] cock with your asshole again, and start to descend again. This time, you take it slowly and carefully - partially because of the lingering tenderness from Terry’s initial penetration, but mostly to make it clear that you aren’t helpless here. You don’t stop until you have taken [himher] to the very hilt.", parse);
				}
				else {
					Text.Add("With a sigh, you gently shake your head and ask if Terry is alright; you didn’t want this to happen to [himher], after all.", parse);
					Text.NL();
					Text.Add("<i>“T-too hot...”</i> [heshe] says airily, sitting on [hisher] knees, helpless.", parse);
					Text.NL();
					Text.Add("In Terry’s state, it’s easy for you to pull yourself free of [hisher] [tcock], shuffling forward so that you can stand up. Gingerly, you rub at your sore ass and take in the pitiful form of your lover.", parse);
					Text.NL();
					Text.Add("You shake your head and sigh softly; you should just leave [himher] to the collar for a while... but you won’t do that. Closing the distance back between you, you start carefully guiding the [foxvixen] to the ground, so that [heshe] is lying on [hisher] back.", parse);
					Text.NL();
					Text.Add("<i>“What are you…?”</i>", parse);
					Text.NL();
					Text.Add("Well, you can’t just leave [himher] like this, you declare, even as you start carefully straddling the [foxvixen]’s waist and gingerly aligning [hisher] [tcock] with your ass. Even if [heshe] deserves it, you add. You inhale deeply, trying to steel your nerves, then slowly start to sink down again. A quiet moan escapes you as your abused anus stretches around Terry’s cock again, but you keep on, pushing down and down until your hips bump into [hisher] own.", parse);
				}
				Text.NL();
				Text.Add("<i>“Aaah...”</i> Terry sighs in relief. [HisHer] [tcock] throbs inside you, seemingly growing harder.", parse);
				Text.NL();
				parse["vulpineequine"] = terry.HorseCock() ? "equine" : "vulpine";
				parse["c"] = player.FirstCock() ? Text.Parse(", your own [cocks] slapping meatily against Terry’s belly", parse) : "";
				Text.Add("You give yourself a few moments, breathing slowly and steadily, feeling your anus adjust to the [vulpineequine] member spreading it open. When you feel ready, you start to raise your hips, slowly dragging yourself up Terry’s shaft until the [tcockTip] almost pops free, then slowly sinking down again. You keep pumping back and forth like that, a nice steady rhythm[c].", parse);
				Text.NL();
				Text.Add("Terry tentatively reaches out for you, laying [hisher] hands on your [hips] to guide you up and down [hisher] shaft. From the way [heshe]’s moaning, you’d venture a guess that [heshe]’s enjoying your treatment. <i>“Oh! So good!”</i>", parse);
				Text.NL();
				Text.Add("You smile knowingly, teasingly asking if this doesn’t feel much better than when [heshe] was just brutally reaming your ass.", parse);
				Text.NL();
				Text.Add("<i>“Yes! Just don’t stop, please!”</i>", parse);
				Text.NL();
				Text.Add("As your own nerves sing from the stimulation, you have no intention of stopping. Slowly, you increase your pace, each slide up and fall down a heartbeat quicker than the one before until you are bouncing away quite steadily in the [foxvixen]’s lap. Terry moans and whimpers beneath you, the look on [hisher] face bringing a smile to your lips. You could almost forget about what you had planned, and just focus on riding Terry until [heshe] cums; you’re sure the [foxvixen] wouldn’t mind that...", parse);
				Text.NL();
				Text.Add("But you have a plan, and so you start slowing your pace again. When Terry groans in disappointment, you lower yourself forward, placing a tender kiss on [hisher] lips before asking if [heshe] feels more in control of [himher]self now.", parse);
				Text.NL();
				Text.Add("[HeShe] still looks a bit flustered, especially after the kiss. <i>“I’m fine… I guess,”</i> [heshe] replies, touching where you kissed [himher].", parse);
				Text.NL();
				parse["l"] = player.HasLegs() ? "kneel again" : "lower yourself to the ground";
				Text.Add("Smirking in pleasure, you declare that if that’s the case, it’s time to try this again. And so, when you next raise your hips, you keep on rising until you have popped yourself free. Somewhat wobbly, you take a few steps back and [l], raising your [butt] into the air. Smiling back over your shoulder at Terry, you playfully ask if [heshe] is ready to take it from the top.", parse);
				Text.NL();
				Text.Add("<i>“Yeah...”</i> [HeShe] gets back in position, aligning [himher]self with your entrance. <i>“Sorry.”</i>", parse);
				Text.NL();
				Text.Add("Apology accepted, but [heshe] had better not do it again! Now, let’s see what [heshe] can do when [heshe]’s <b>gentle</b> with the reins...", parse);
				Text.NL();
				Text.Add("Terry nods and begins slowly entering you once more.", parse);
			}
			else {
				if(player.SubDom() >= 40)
					Text.Add("You snap harshly at [himher] to have better care; you told [himher] the first time about being so rough! Has [heshe] forgotten what that collar [heshe]’s wearing will do if you’re not happy with [hisher] efforts?", parse);
				else
					Text.Add("Biting your lip, you gently remind Terry that [heshe] promised to be gentle with you when you let [himher] take the reins like this. Does [heshe] want that collar to go off again?", parse);
				Text.NL();
				Text.Add("<i>“Umm… sorry,”</i> [heshe] immediately slows down to give you a better chance to adjust.", parse);
				Text.NL();
				parse["sizeable"] = terry.HorseCock() ? " sizeable" : "";
				Text.Add("You inhale and exhale, slowly and steadily, willing your body to adjust to the[sizeable] invader intruding inside of you. Seconds tick away like hours, but finally you feel the pain of the [foxvixen]s blunt intrusion bleed away, leaving you able to move. Clenching your [anus], you make a short, experimental thrust, sliding up and down on Terry’s cock. Though you feel the motion stirring your inner walls, it’s not painful, and emboldened you make a second such thrust.", parse);
				Text.NL();
				Text.Add("<i>“Good to go?”</i> [heshe] asks tentatively.", parse);
				Text.NL();
				Text.Add("You slide back until your [butt] is snug against Terry’s groin, smirking to yourself as you decree that you’re ready when [heshe] is.", parse);
			}
			Text.NL();
			Text.Add("Your [foxvixen] lover sets a brisk, but steady pace. Not too fast, but not too slow either - just perfect for the constant climb toward the edge.", parse);
			Text.NL();
			Text.Add("You purr in pleasure as Terry thrusts into you, matching the rhythm with ease. You clench and squeeze with your anus, flexing the rippling walls of flesh in time with Terry’s efforts to better stroke and manipulate [himher] as [heshe] slides in and out. Your whole body trembles with desire, but you make yourself settle for matching the pace [heshe] is setting; you are leaving [himher] in charge, this time.", parse);
			Text.NL();
			var tw = "";
			if(tail)
				tw += ", curling your [tail] out of the way";
			if(tail && wing)
				tw += " and ";
			else if(wing)
				tw += ", ";
			if(wing)
				tw += "shifting your [wings] so that [heshe] won’t be lying atop them";
			parse["tw"] = Text.Parse(tw, parse);
			Text.Add("After a few pleasurable minutes, you feel a pressure growing over your [hips], creeping along your spine. You straighten your limbs to support the increase in weight as Terry leans over you[tw].", parse);
			Text.NL();
			parse["b"] = player.FirstBreastRow().Size() > 3 ? ", taking the opportunity to fondle you as well" : "";
			Text.Add("The [foxvixen] scrambles a bit to get [hisher] arms around you, one hand moving across your [breasts]. [HeShe] teases your [nip] with small pinches[b]. ", parse);
			if(player.FirstCock())
				Text.Add("[HisHer] other hand travels toward your crotch, where your [cocks] rests. [HeShe] easily finds[oneof] your [cocks] and begin stroking it.", parse);
			else
				Text.Add("[HisHer] other hand roams your [hips] looking for a good position to support [himher]self as [heshe] prepares to redouble [hisher] assault on your [butt].", parse);
			Text.NL();
			parse["t"] = player.HasPrehensileTail() ? Text.Parse(" coil your [tail] around [hisher] legs as best as you can and", parse) : "";
			Text.Add("As Terry plays you like an instrument, you moan in appreciation. You[t] thrust your ass back into Terry’s, grinding deliberately as your [anus] does its best to milk [hisher] [tcock] dry. With a lilting purr, you praise Terry for having such skilled fingers - but then, that’s part of the prize of having a thief for a lover.", parse);
			Text.NL();
			Text.Add("<i>“T-thanks,”</i> [heshe] says shakily. <i>“Hng! If you keep clenching like that, I won’t last long. Getting close already!”</i>", parse);
			Text.NL();
			Text.Add("Now that [heshe] mentions it... you shudder and groan deeply, thrusting harder against the [foxvixen] atop you. That makes two of you. Panting heavily, you plead for Terry to do you harder - you want to cum, too...", parse);
			Text.NL();
			Text.Add("<i>“Right.”</i> [HeShe] redoubles [hisher] efforts, hips slapping against your [butt], rocking you forward each time they connect.", parse);
			Text.NL();
			Text.Add("You meet the [foxvixen] thrust for thrust and grind for grind, setting up a chorus of whorish moans and lewd mewls. You twist your hips from side to side, grinding and flexing in order to milk the [tcock] plowing your ass as best you can. Lightning races along your spine, fire burning under your [skin]... you’re so close that you can taste it, and you scream Terry’s name in ecstasy, praying [heshe] will push you over the edge at last.", parse);
			Text.NL();
			Text.Add("The sound of flesh slapping against flesh competes with the sound of your heartbeat racing in your [ears], drowning out the world around you. There is only you and Terry, connected by the [tcock] ravaging your [anus]. Finally, in one definitive thrust, Terry slams [himher]self home, bulging knot stretching your asshole to its breaking point before gliding inside.", parse);
			Text.NL();
			
			var cum = terry.OrgasmCum();
			
			TerryScenes.Impregnate(player, terry, cum, PregnancyHandler.Slot.Butt);
					
			var cum = player.OrgasmCum();
			
			Text.Add("As your pucker grinds shut, Terry howls like the fox [heshe] resembles, firing ropes of hot cum into your sealed tight hole, the feel of liquid warmth splashing around inside of you the final thing you needed to push you over the edge. Your own cry of ecstasy rises to match your partner’s as your body quakes in orgasm.", parse);
			if(player.FirstCock())
				Text.Add(" Your [cocks] fire[notS] a cascade of cum, splattering heavily on the ground below, filling your nostrils with the scent of sex.", parse);
			if(player.FirstVag())
				Text.Add(" Your [vag] clenches in sympathy, spattering juices everywhere in a shower of feminine honey.", parse);
			Text.NL();
			Text.Add("Finally spent, you slump against the ground, panting for breath, groaning softly as the afterglow envelops you in its warm arms.", parse);
			Text.NL();
			Text.Add("Terry lies atop you, worn out after [hisher] earth shattering orgasm. <i>“That was pretty good.”</i>", parse);
			Text.NL();
			parse["h"] = terry.HorseCock() ? " newly cumflated" : "";
			Text.Add("[HeShe] wasn’t so bad [himher]self you quip back, affectionately petting one of the hands looped over your[h] stomach. So, how did [heshe] enjoy being given the reins? Everything [heshe] hoped for?", parse);
			Text.NL();
			Text.Add("<i>“Well, it was pretty fun, I admit. Thank you for doing this. Sorry about the rough start...”</i>", parse);
			Text.NL();
			Text.Add("You smile and assure Terry that it’s alright. [HeShe] should just try and remember to take it easier in the future. Tired of talking, you snuggle up to your vulpine bedmate as best you can, closing your eyes to wait out [hisher] knot deflating.", parse);
		}
		else if(terry.Relation() < 60) {
			Text.Add("<i>“Let’s begin then, I want to savor this,”</i> [heshe] says, beginning to slowly push past your sphincter.", parse);
			Text.NL();
			
			Sex.Anal(terry, player);
			player.FuckAnal(player.Butt(), terry.FirstCock(), 4);
			terry.Fuck(terry.FirstCock(), 4);
			
			if(terry.HorseCock())
				Text.Add("You moan deep and low as the [foxvixen]’s mighty stallionhood begins to stretch you open. You spare an idle thought to thank the fates for lube, and for Terry’s gentleness. Even with that, though, you’re definitely feeling it; your whole world seems to boil down to the horsecock spreading you wider and wider, plowing inexorably inside. For a moment, you almost find yourself doubting it will fit, but inevitably Terry’s hips come flush with your own [butt].", parse);
			else
				Text.Add("Arching your back, you croon in pleasure as Terry glides smoothly inside. You know that [hisher] cock isn’t the most impressively sized of organs, but it’s more than adequate for your needs. Indeed, between its size and the thorough job Terry did of lubing it, it’s almost effortless for you to open your [anus] and let it just slide on in. The only possible dissatisfaction is that - even as Terry’s own hips come to rest against your ass - you want [himher] to go <b>deeper</b>; right now, [heshe]’s just tantalizing you, [hisher] glans tickling madly inside your butt.", parse);
			Text.NL();
			Text.Add("<i>“So warm!”</i> [heshe] sighs. <i>“I’m going to start moving now, okay?”</i>", parse);
			Text.NL();
			Text.Add("You let out a purring note of approval, nodding to show that it’s more than okay with you. You clench down with your [anus], playfully trying to trap Terry’s cock where it is.", parse);
			Text.NL();
			Text.Add("<i>“Ack! You sneaky bastard,”</i> [heshe] playfully teases, beginning to pump [hisher] hips.", parse);
			Text.NL();
			Text.Add("[HeShe] knows that [heshe] loves it, you shoot back, working to match the [foxvixen] pump for pump.", parse);
			Text.NL();
			Text.Add("As Terry picks up [hisher] pace, you’re treated the feeling of [hisher] padded handpaws roaming your back.", parse);
			if(tail) {
				parse["pt"] = player.HasPrehensileTail() ? " and try to curl it around his arm" : "";
				Text.Add(" [HeShe] moves to stroke your [tail], gently teasing the base, eliciting a thrill of pleasure from you. Whenever [heshe] tickles your base, you wag your [tail] softly [pt].", parse);
			}
			Text.NL();
			Text.Add("You rotate your shoulders, shuffling your weight from arm to arm as you croon your appreciation. ", parse);
			if(wing)
				Text.Add("Your [wings] spread themselves in invitation, rewarded with Terry’s soft touch as the [foxvixen] kneads the muscles at their base before tenderly stroking out along their lengths and then returning. ", parse);
			Text.Add("Terry’s hands busily massage your neck and shoulders, loosening the tension in your muscles. You arch your back to better draw [hisher] attentions, making the [foxvixen] chuckle. Terry’s [tbreasts] touch your back as [heshe] bends over, leaning [himher]self across your torso.", parse);
			Text.NL();
			Text.Add("[HeShe] nuzzles you softly, the new position helping [himher] go deeper inside you. You can feel [hisher] knot batting your [butt] as if asking to be allowed in, yet Terry makes no effort to push past your barrier. <i>“How does this feel?”</i> [heshe] asks, hugging you from behind.", parse);
			Text.NL();
			Text.Add("It feels wonderful, you reply, making no effort to hide the pleased purr underlying your words. In a playful act, you clench your buttocks, feeling Terry’s knot grinding between your [butt] cheeks. You wriggle your hips slightly, caressing the bulge of flesh within your anal cleavage, and ask why [heshe] is holding that back - you’re sure the two of you can make it fit, if [heshe] wants...", parse);
			Text.NL();
			Text.Add("<i>“Make no mistake, [playername]. By the end of this, you’ll be getting <b>all</b> of me. But why rush? Let’s take our time. Not everyday you let me own your ass,”</i> [heshe] says, slowing down [hisher] thrusts.", parse);
			Text.NL();
			Text.Add("You chuckle softly; is that what [heshe] really wants? Or is [heshe] simply scared that [heshe] can’t take it any faster than this? You’re a big [boygirl] - you know you can handle whatever your pretty little [foxvixen] throws your way.", parse);
			if(player.HasPrehensileTail())
				Text.Add(" Your [tail] twists through the air, landing a mocking swat on Terry’s own jiggly heart-shaped ass for emphasis.", parse);
			Text.NL();
			Text.Add("<i>“And what about you? Acting all cocky just because you can’t get enough of my cock,”</i> [heshe] teases right back.", parse);
			Text.NL();
			Text.Add("[HeShe]’s damn right you can’t get enough of [hisher] [tcock]. ", parse);
			if(terry.HorseCock())
				Text.Add("[HeShe] has got a damn fine piece of stallion-meat. It’s so long and thick and juicy, with those balls just bulging full of fine vulpine seed. And with a great big bitchbreaking knot to cap it all off, the real thing that makes it stand out as unique in all the world.", parse);
			else
				Text.Add("[HeShe] uses that dainty little foxhood like an expert, hitting all the spots that a bigger dick just wouldn’t be able to touch. [HeShe]’s got the finesse to bring you to the peak of ecstasy; why wouldn’t you love having such an expert playing with you?", parse);
			Text.NL();
			Text.Add("So, what’s [heshe] afraid of? Doesn’t [heshe] think [heshe]’ll be able to handle you for real? You don’t mind if [heshe] blows [hisher] load in your butt - that’s what you want! With the hardest squeeze of your [anus] for emphasis, you purr to Terry that [heshe] should just give it up to you; a nice, thick, sloppy shot of foxcum right down your slutty ass, just what you need.", parse);
			Text.NL();
			Text.Add("<i>“Hehe, alright then. If that’s what you want, you can have it all!”</i> Terry says, grabbing your waist and pulling you with all [hisher] might.", parse);
			Text.NL();
			Text.Add("Faster than you can follow, Terry pulls you backwards as [heshe] falls onto [hisher] shapely behind, the sudden shift in position bringing gravity to play. Your own weight means you fall down hard on Terry’s shaft, the [tcock] spearing upward with such force that [hisher] knot proves no obstacle. Instead, you feel your anal ring stretching with all its might as it envelops the proud bulb of [foxvixen] flesh, driving it completely inside before you wetly slurp shut around it.", parse);
			Text.NL();
			
			var cum = terry.OrgasmCum();
			
			TerryScenes.Impregnate(player, terry, 2*cum, PregnancyHandler.Slot.Butt);
			
			Text.Add("As you unconsciously squeeze down on the sensitive dickmeat with all your might, Terry yips loudly behind your ear. ", parse);
			if(terry.HorseCock()) {
				Text.Add("The pillar of equine flesh embedded in your stomach throbs so violently, you can feel it through your anus, bulging as the first great shot of cum erupts inside of you.", parse);
				Text.NL();
				Text.Add("It feels like you’ve trapped some sort of perverse volcano inside your guts as the [foxvixen] empties [hisher] prodigious balls into your depths. The knot seals you closed so that each belly bulging burst of seed has nowhere to go but up.", parse);
				Text.NL();
				Text.Add("By the time Terry shudders and slumps into your shoulder, your stomach audibly sloshes from the sheer volume of semen distending it.", parse);
			}
			else {
				Text.Add("Thick liquid warmth spills inside of you with a perverse slurping sensation. Terry’s humble knot traps it all enclosed, leaving you tingling with the feeling of [hisher] seed sloshing around in your ass.", parse);
			}
			Text.NL();
			Text.Add("You usher a plaintive moan and wriggle in your seat in Terry’s lap; even though Terry’s orgasmed, you haven’t gotten off yet. The feel of [hisher] cock buried deep in your rosebud and [hisher] seed swirling through your guts enflames your desire, but you just can’t manage to cum on your own!", parse);
			Text.NL();
			Text.Add("<i>“Just quit struggling and cum already!”</i> [heshe] exclaims. ", parse);
			if(player.FirstCock())
				Text.Add("[HisHer] hand dives straight toward[oneof] your [cocks], gripping [itThem] and fapping with all that remains of [hisher] energy.", parse);
			else
				Text.Add("[HisHer] hand dives straight to your [vag], teasing your entrance and pinching your [clit] with all that remains of [hisher] energy.", parse);
			Text.NL();
			Text.Add("You buck and thrash as best you can with the anchor tying you to your vulpine lover. As pleasure washes over your senses, clouding your mind and blurring your vision, you blurt out praise to Terry about how good [heshe] is with [hisher] hands.", parse);
			Text.NL();
			Text.Add("If Terry says anything, it’s drowned out by your own cry of ecstasy as [heshe] provides the last bits of stimulation you need. In your mind, the metaphorical dam breaks, drowning you in a sea of pleasure. Your nerves spark and your blood sings as you arch your back, shuddering violently in climax.", parse);
			Text.NL();
			
			var cum = player.OrgasmCum();
			
			if(player.FirstCock()) {
				Text.Add("Your [cocks], painfully erect and throbbing by this point, finally erupt[s] under Terry’s nimble fingers. Ropes of seed fly from your loins, drenching the [foxvixen]’s hands and painting the ground before you with the fruits of your pleasure.", parse);
				Text.NL();
			}
			if(player.FirstVag()) {
				Text.Add("Your [vag] creases shut, walls rippling and squeezing as your feminine nectar gushes forth. Strings of fluid paint themselves over your [thighs] as you cum, squirting around a phantasmal cock and pooling wetly over Terry’s balls.", parse);
				Text.NL();
			}
			Text.Add("Finally spent, you slump back against Terry with a languid sigh of pleasure. [HeShe] makes a very comfortable body cushion, and you rest your head against [hisher] shoulder without hesitation, closing your eyes to focus on the feelings coursing through you.", parse);
			Text.NL();
			Text.Add("<i>“That was great. You have a very nice ass, [playername],”</i> Terry says, lying down on [hisher] side, and dragging you along by your tie.", parse);
			Text.NL();
			Text.Add("And [heshe] has a very, <b>very</b> nice cock, you purr back to the [foxvixen]. If [heshe]’s lucky, you might let [himher] have the reins more often, especially since [heshe] seems to know how to treat you right when you let [himher].", parse);
			Text.NL();
			Text.Add("You snuggle as close to Terry as you can, [hisher] [tbreasts] pressed against your back, playfully grinding your buttocks deeper into [hisher] loins.", parse);
			
			player.slut.IncreaseStat(75, 1);
		}
		else {
			Text.Add("<i>“Better relax, dear. Don’t want to ruin this pretty ass of yours,”</i> Terry says teasingly, slapping your [butt] for effect.", parse);
			Text.NL();
			Text.Add("Smirking, you quip back that of course [heshe] doesn’t; then [heshe] wouldn’t get to enjoy it to the fullest in the future, would [heshe]?", parse);
			Text.NL();
			Text.Add("<i>“Gotta watch out for my own interests,”</i> [heshe] teasingly replies. <i>“But if you’re being this cheeky, then I suppose you’re ready. So take it!”</i> [HeShe] bucks into you in a single thrust, lodging [hisher] [tcockTip] past your sphincter.", parse);
			Text.NL();
			
			Sex.Anal(terry, player);
			player.FuckAnal(player.Butt(), terry.FirstCock(), 4);
			terry.Fuck(terry.FirstCock(), 4);
			
			Text.Add("You arch your back and groan in surprise, clenching down instinctively to stop further intrusion. A heartbeat later, and you realize Terry’s not pushing any further than that. Your lips curl into a grin, before you force them into a pout, and you mockingly huff to the [foxvixen] about playing dirty tricks.", parse);
			Text.NL();
			Text.Add("<i>“No foul play here, [playername]. You asked for a buttfucking and that’s exactly what I’m giving you. Now loosen up so I can finish pushing in,”</i> [heshe] says, tapping your butt.", parse);
			Text.NL();
			Text.Add("You tap your chin in thought. A soft hum escapes your lips as you consider Terry’s request. Then you shake your head and issue a loud huff, telling [himher] no.", parse);
			Text.NL();
			Text.Add("<i>“Aww, come on. Don’t be like that,”</i> Terry says, gently rubbing your [hips]. <i>“Don’t you want me to make you feel good, hmm?”</i>", parse);
			Text.NL();
			Text.Add("Well...", parse);
			Text.NL();
			Text.Add("<i>“Pretty please?”</i> ", parse);
			if(tail)
				Text.Add("Terry says, bending over to nuzzle your [tail], taking it in hand and gently biting the tip.", parse);
			else
				Text.Add("Terry says, bending over to nuzzle your back.", parse);
			Text.NL();
			Text.Add("You can’t help the smile that splits your face. With a chuckle, you praise Terry’s skill as a sweet talker.", parse);
			Text.NL();
			Text.Add("As you say this, you relax the grip of your [anus] and start to push your hips back, slowly guiding your ring down along Terry’s [tcock].", parse);
			Text.NL();
			Text.Add("<i>“Hehe, don’t underestimate my smooth talking skills; now, let’s get this pretty ass of yours filled!”</i> [heshe] says, enthusiastically pushing inside.", parse);
			Text.NL();
			Text.Add("You moan appreciatively, pushing back into the advancing [foxvixen] with equal enthusiasm. You can feel every glorious inch of [tcock] slide smoothly into your [anus]. Your nerves sing as the flesh glides against your own, able to feel every vein, ridge and wrinkle of your lover’s dick. It almost comes as a surprise when your [butt] bumps gently into Terry’s hips, having been so lost in the euphoria of being filled.", parse);
			Text.NL();
			Text.Add("You trill in pleasure, and then your eyes widen as something warm and wet glides teasingly over the back of your neck. You wriggle in surprise, unable to hold back an exclamation of shock that gives way to a laughing, ‘Terry!’", parse);
			Text.NL();
			Text.Add("<i>“What? I caught my prey, now I’m enjoying it,”</i> [heshe] says licking the back of your neck once more.", parse);
			Text.NL();
			Text.Add("A shiver runs along your spine, an instinctive reaction to the tickle of Terry’s tongue on your neck. You laugh in pleasure, and ask when it is that you became prey.", parse);
			Text.NL();
			Text.Add("<i>“The moment you asked me to take charge, sweet cheeks. Now let’s get this show on the road.”</i> [HeShe] begins moving, slowly at first, but [heshe] quickly picks up pace.", parse);
			Text.NL();
			Text.Add("The [foxvixen] moves smoothly and steadily, shifting slightly with each thrust in order to brush the most sensitive spots [heshe] can think of touching. ", parse);
			if(terry.HorseCock())
				Text.Add("The thick length of equine dick stretches you out wonderfully. [HeShe] can’t muster much finesse with its sheer size, but it does a very admirable job of stimulating you all the same. You are intimately aware of every bump and wrinkle, every bulging vein and ridging along its half-unfurled flare.", parse);
			else
				Text.Add("The petite [foxvixen]-prick may not be able to stretch you much, but its size lets Terry handle it like a real pro. The pointed tip twirls and twists inside of you as Terry angles, strokes and redirects it with each motion. It catches on every sensitive bulge, worms its way into each delicious cranny, and generally drives you mad with lust with each motion it makes.", parse);
			Text.NL();
			Text.Add("You are no passive partner during this either. You match Terry thrust for thrust, gyration for gyration. Your [anus] flexes hungrily, sucking [hisher] cock in when [heshe] tries to pull it out and opening wide to ease [hisher] entry.", parse);
			Text.NL();
			Text.Add("<i>“Hmm, this is nice. But I’m kinda sad I don’t have more to play with back here.”</i>", parse);
			Text.NL();
			Text.Add("Baffled, you tilt your head and give the [foxvixen] a quizzical look over your shoulder. What does [heshe] mean?", parse);
			Text.NL();
			Text.Add("<i>“How about a little switch?”</i> Terry offers, pulling out of your [anus] and grabbing your sides. Before you have a chance to say anything, [heshe] pushes you on your back.", parse);
			Text.NL();
			Text.Add("You blink in surprise and open your mouth to say something. Before you can work out what, though, Terry’s arms have flung themselves around your shoulders and the [foxvixen] is kissing you passionately.", parse);
			Text.NL();
			Text.Add("Your train of thought scatters, boiling down to the feel of [hisher] soft, cuddly form in your arms and the warm lips claiming your own. You reach for Terry to pull [himher] closer, even as [heshe] releases your lips.", parse);
			Text.NL();
			Text.Add("As you blink, you feel [hisher] [tcockTip] probing against your newly used butt, stopping just shy of actually penetrating.", parse);
			Text.NL();
			Text.Add("<i>“Isn’t that much better?”</i> [heshe] asks, leaning over to kiss you again.", parse);
			Text.NL();
			Text.Add("You chuckle that it certainly has its charm, then eagerly open your mouth to accept Terry’s second kiss. As you twine your arms around [himher], you feel [hisher] hips slide forward, pushing [hisher] [tcock] back inside of you again, making you break the lip-lock with a gasp of pleasure.", parse);
			Text.NL();
			Text.Add("<i>“There’s just so much more for me to play with on this side,”</i> [heshe] says teasingly. [HisHer] hands caress your [breasts]", parse);
			if(player.FirstCock())
				Text.Add(", stroke your [cocks]", parse);
			if(player.HasBalls())
				Text.Add(", fondle your [balls]", parse);
			if(player.FirstVag())
				Text.Add(", tease your [vag]", parse);
			Text.Add(", then finally settle back on your [hips].", parse);
			Text.NL();
			Text.Add("That’s funny - you were thinking the same thing. As you grin, your hands reach for your vulpine lover’s chest. ", parse);
			if(terry.Cup() >= TerryFlags.Breasts.Bcup)
				Text.Add("You gently cup [hisher] [tbreasts], squeezing and kneading the vulpine titflesh with your fingers. Your thumbs press down on the pearly nubs of [hisher] nipples, rolling them as you continue to play with [hisher] boobs.", parse);
			else
				Text.Add("With forefinger and thumb, you take hold of each pink pearl of a vulpine nipple, twiddling them back and forth with short, gently firm strokes and pinches.", parse);
			Text.NL();
			Text.Add("<i>“Ahn! See? So much more,”</i> [heshe] replies, already beginning to pant.", parse);
			Text.NL();
			parse["v"] = terry.FirstVag() ? ", one finger reaching up to stroke teasingly at Terry’s vagina" : "";
			Text.Add("You smile and nod in agreement. Your hands leave their position on Terry’s [tbreasts]; one travels up to drape itself around the [foxvixen]’s shoulders, giving you some extra support, whilst the other travels lower. With this free hand, you work your way under Terry’s girlish thigh and cup [hisher] balls[v].", parse);
			Text.NL();
			Text.Add("The [foxvixen]’s mouth opens at your touch, and you capitalize on it; you pull yourself forward and kiss [himher] hungrily, thrusting your [tongue] through [hisher] lips and into [hisher] muzzle.", parse);
			Text.NL();
			Text.Add("Terry kisses you back, pushing [hisher] body against yours as [heshe] begins bucking [hisher] hips, fucking your butt while enjoying your lips on [hisher] own.", parse);
			Text.NL();
			Text.Add("The two of you wrestle together willingly, Terry’s [tcock] rutting your [anus] in counterpoint to the wrestling of your tongues. Your fingers knead and squeeze [hisher] balls, compelling [himher] to thrust deeper. [HisHer] arms crush you tight, [breasts] to [tbreasts], fingers scraping across the [skin] of your back.", parse);
			Text.NL();
			var gen = "";
			if(player.FirstCock())
				gen += "[cocks] slap meatily against [hisher] belly";
			if(player.FirstCock() && player.FirstVag())
				gen += " and ";
			if(player.FirstVag())
				gen += "your [vag] drool female nectar over [hisher] thighs";
			parse["gen"] = Text.Parse(gen, parse);
			Text.Add("Pleasure washes through you like a rising tide, making your [gen]. You moan deeply into Terry’s mouth, breaking the kiss to sigh longingly, whispering to Terry that you’re getting so very close...", parse);
			Text.NL();
			Text.Add("<i>“M-me too,”</i> [heshe] replies, panting. <i>“Let’s cum together, [playername].”</i>", parse);
			Text.NL();
			Text.Add("You nod your head and inhale deeply. Once you have steeled yourself, focusing your willpower on holding back your climax, you sink down Terry’s [tcock] in one fierce thrust. Terry’s bulging knot stops you, for a moment, but you power on, forcing your pucker to stretch until it envelops the engorged flesh and slurps it lewdly inside of you.", parse);
			Text.NL();
			Text.Add("As soon as Terry’s knot pops in, the [foxvixen] lets out a howl of pleasure. [HeShe] grits [hisher] teeth in an attempt to stave off [hisher] oncoming climax. <i>“G-gonna!”</i> [heshe] declares, looking you over.", parse);
			Text.NL();
			if(player.FirstCock()) {
				Text.Add("[HisHer] eyes home in on your [cocks], and in one fell swoop [heshe] takes[oneof] your cock[s] into [hisher] mouth, sucking on the [cockTip] in an effort to grant you that last spike you need to orgasm yourself.", parse);
				Text.NL();
				
				var cum = terry.OrgasmCum();
				
				TerryScenes.Impregnate(player, terry, cum, PregnancyHandler.Slot.Butt);
				
				var cum = player.OrgasmCum();
				
				Text.Add("You fling your head back and cry out as you explode into the [foxvixen]’s suckling mouth. Terry valiantly swallows and gulps, drinking every last drop you have to give [himher].", parse);
				Text.NL();
				Text.Add("Even through the wracking shudders you experience as you empty yourself into Terry’s belly, you can still feel [hisher] own [tcock] erupting inside your [anus], sending [hisher] own cum shooting for your stomach.", parse);
				Text.NL();
				Text.Add("Like a perverse oroboros, you remain locked together, cock to mouth and cock to ass, each feeding the other with semen until you both run dry at last.", parse);
				Text.NL();
				parse["c"] = player.NumCocks() > 1 ? Text.Parse(", not caring about the mess your other cock[s2] made in the least", parse) : "";
				Text.Add("Terry releases your cock[c]. <i>“Hmm, tasty,”</i> [heshe] declares, slumping over your prone form.", parse);
				Text.NL();
				Text.Add("You’re certainly glad that [heshe] approves. As you say this, you pet [hisher] head affectionately.", parse);
			}
			else {
				Text.Add("[HisHer] eyes home in on your [vag], and in a moment of desperation [heshe] shuffles to finger your moist entrance. Two digits are crammed inside your pussy, while [hisher] thumb teases your [clit]. This is the last straw - you can’t hold back anymore!", parse);
				Text.NL();
				
				var cum = terry.OrgasmCum();
				
				TerryScenes.Impregnate(player, terry, cum, PregnancyHandler.Slot.Butt);
				
				var cum = player.OrgasmCum();
				
				Text.Add("You cry out in pleasure, quaking violently against your vulpine lover. Your [vag] clasps shut, trying to squeeze [hisher] fingers like the cock they have pretended to be, drenching [hisher] wrist in your feminine honey.", parse);
				Text.NL();
				Text.Add("Even through your own cascade of pleasure, you can still feel when Terry’s [tcock] bulges inside of you. A great spray of hot [foxvixen] cum floods your anus, swirling around inside your guts and driving your pleasure.", parse);
				Text.NL();
				Text.Add("Finally, the two of you are completely drained, slumping against each other for support.", parse);
				Text.NL();
				parse["bulging"] = terry.HorseCock() ? " bulging" : "";
				Text.Add("<i>“Haa… That was great, [playername],”</i> [heshe] says, gently caressing your[bulging] belly.", parse);
				Text.NL();
				Text.Add("[HeShe] wasn’t so bad [himher]self, you shoot back, playfully stroking [hisher] hair.", parse);
			}
			Text.NL();
			Text.Add("<i>“So, how’d you like being owned by your pet for a change?”</i> [heshe] asks with a mischievous grin.", parse);
			Text.NL();
			Text.Add("It was certainly quite an experience, you coo back. You might just have to consider doing it again in the future. So, you take it [heshe] liked being the owner instead of the pet, hmm?", parse);
			Text.NL();
			Text.Add("<i>“Sure. I mean, I don’t mind being the ‘pet’ most of the time, but switching roles once or twice keeps things fresh. After all, variety is the spice of life.”</i>", parse);
			Text.NL();
			Text.Add("It most certainly is, you agree. A coquettish smile on your lips, you spank your [butt] for emphasis. Then you lean into your vulpine lover and curl your arms around [himher], pulling [hisher] head to your chest and kissing [himher] gently on the forehead.", parse);
			Text.NL();
			parse["masterMistress"] = terry.mfPronoun("master", "mistress");
			parse["boygirl"] = player.mfFem("boy", "girl");
			Text.Add("<i>“Snuggling your [masterMistress]. You’re such a good [boygirl], [playername],”</i> Terry says, gently caressing your cheek. <i>“Well, it’ll be a while before I can pull out, so best get comfortable.”</i>", parse);
			Text.NL();
			Text.Add("You’re hard-pressed to think of anywhere more comfortable than this. As you say this, you snuggle slightly closer to Terry, shifting in [hisher] lap to avoid squishing [himher] too much.", parse);
		}
		Text.NL();
		Text.Add("Once Terry’s knot finally deflates, you detach your [butt] from the [foxvixen] you were so firmly attached to. The two of you clean yourselves off, get dressed again, and set off once more.", parse);
		Text.NL();
		parse["h"] = terry.HorseCock() ? ", <b>really</b>" : "";
		Text.Add("Your own progress is somewhat slower than it was before...your butt is really[h] aching. Damned if you don’t think it was worth it, though.", parse);
			
		terry.relation.IncreaseStat(80, 1);
		TimeStep({hour: 1, minute: 30});
		
		Text.Flush();
		
		Gui.NextPrompt();
	});
}



/* TERRY SEX DRINK */

TerryScenes.SexHaveADrink = function(back : any) {
	let terry = GAME().terry;

	var parse : any = {
		foxvixen : terry.mfPronoun("fox", "vixen"),
		tbreasts : terry.FirstBreastRow().Short()
	};
	
	parse = terry.ParserPronouns(parse);
	
	Text.Clear();
	if(terry.Relation() < 30) {
		Text.Add("<i>“W-what are you thinking?”</i> [heshe] asks, taking a step back.", parse);
		Text.NL();
		Text.Add("There’s no reason to be timid. You were just thinking about giving [himher] a bit of oral sex. You’d have thought [heshe]’d like that...", parse);
		Text.NL();
		Text.Add("<i>“Oh. I guess I don’t really have a problem with that...”</i>", parse);
		Text.NL();
		Text.Add("[HeShe] really doesn’t trust you much, does [heshe]? Ah well, [heshe]’ll get better as you get to know [himher].", parse);
	}
	else if(terry.Relation() < 60) {
		Text.Add("<i>“A taste-test? Interesting way of putting it.”</i> [HeShe] smiles knowingly. <i>“What kind of tasting are you hoping for?”</i>", parse);
		Text.NL();
		Text.Add("The intimate sort, of course. What else could you want with someone as yummy as Terry hanging around all the time?", parse);
		Text.NL();
		Text.Add("<i>“Hmm, I don’t know. But from what I figure, there’s a lot more you could want.”</i>", parse);
		Text.NL();
		Text.Add("That there is. But right now, what you want is to suck Terry dry. From the look on your [foxvixen]’s face - and the way [heshe]’s wagging [hisher] tail so hard it’s about to fall off - you don’t think [heshe] has a problem with that.", parse);
	}
	else {
		Text.Add("<i>“I’m the one wearing the collar, yet you’re the one that gets a treat? Something doesn’t seem fair in this relationship,”</i> [heshe] teases.", parse);
		Text.NL();
		Text.Add("Oh, like [heshe]’s not going to enjoy every moment of you sucking [himher] dry. Maybe if [heshe] has a nice big drink for you, you’ll consider letting [himher] have a taste of you afterward.", parse);
		Text.NL();
		Text.Add("<i>“Okay, that’s something to keep in mind.”</i> [HeShe] smirks. <i>“So, I guess I’m the master and you’re the pet for now?”</i>", parse);
		Text.NL();
		Text.Add("Well, yeah, you could say that.", parse);
		Text.NL();
		Text.Add("<i>“Great, get naked then! Pets don’t need clothes. Besides, you’d only get them dirty, ya big pervert.”</i>", parse);
		Text.NL();
		Text.Add("Oh, <b>you</b> are the pervert here? Cheeky little [foxvixen]... No, you think you’ll stay clothed. For the moment.", parse);
	}
	Text.NL();
	Text.Add("With Terry’s agreement, you start eyeing over the [foxvixen]’s naked form as you consider what’ll you’ll do with your pet.", parse);
	Text.Flush();
	
	TimeStep({minute: 10});
	
	//[Breasts] [Pussy] [Cock]
	var options = new Array();
	options.push({ nameStr : "Breasts",
		tooltip : Text.Parse("Those yummy [tbreasts] and their sweet milk are calling to you.", parse),
		func : TerryScenes.SexHaveADrinkBreasts, enabled : terry.Lactation()
	});
	if(terry.FirstCock()) {
		options.push({ nameStr : "Cock",
			tooltip : "What better treat than a shot of hot, gooey fox-cum?",
			func : TerryScenes.SexHaveADrinkCock, enabled : true
		});
	}
	if(terry.FirstVag()) {
		options.push({ nameStr : "Pussy",
			tooltip : Text.Parse("Sweet, sweet womanly nectar sounds just perfect for you.", parse),
			func : TerryScenes.SexHaveADrinkPussy, enabled : true
		});
	}

	Gui.SetButtonsFromList(options, true, function() {
		Text.Clear();
		Text.Add("You tell Terry that you’ve changed your mind; you want to do something else.", parse);
		Text.NL();
		if(terry.Relation() < 30) {
			Text.Add("<i>“Oh… okay then.”</i>", parse);
			Text.NL();
			Text.Add("Idly eyeing the attractive [foxvixen], you contemplate just how you want to play with [himher].", parse);
		}
		else if(terry.Relation() < 60) {
			Text.Add("<i>“Aww, you’re going to pussy out on me?”</i> Terry asks teasingly.", parse);
			Text.NL();
			Text.Add("No, of course not. You’re just not thirsty - you still want to show [himher] a good time. Just need to decide what you want to do first.", parse);
		}
		else {
			Text.Add("<i>“And why is that? Too much for you to handle?”</i> Terry teases, posing for your benefit.", parse);
			Text.NL();
			Text.Add("Oh, if you were thirsty, you promise you’d be all over [himher]! Right now, you’re just not in that sort of mood. You’re just going to have to rock [hisher] world a different way.", parse);
		}
		Text.Flush();
		
		TerryScenes.SexPromptChoice(back, true);
	});
}

TerryScenes.SexHaveADrinkPussy = function() {
	let terry = GAME().terry;
	let player = GAME().player;

	var parse : any = {
		playername : player.name,
		foxvixen : terry.mfPronoun("fox", "vixen"),
		foxxyvixxy : terry.mfPronoun("foxxy", "vixxy"),
		handsomebeautiful : terry.mfPronoun("handsome", "beautiful"),
		boygirl : terry.mfPronoun("boy", "girl"),
		mastermistress : player.mfTrue("master", "mistress"),
		sir : player.mfTrue("sir", "ma’am"),
		sirmadam : player.mfTrue("sir", "madam"),
		guygal : terry.mfPronoun("guy", "gal")
	};
	
	parse["stuttername"] = player.name[0] + "-" + player.name;
	
	parse = terry.ParserPronouns(parse);
	parse = terry.ParserTags(parse, "t");
	parse = player.ParserTags(parse);
	
	var rel = terry.Relation() + terry.Slut();
	
	Text.Clear();
	parse["c"] = terry.FirstCock() ? Text.Parse(", behind [hisher] cock", parse) : "";
	Text.Add("Your gaze falls on Terry’s thighs, and the tasty flower tucked away between them[c]. Yes, you know just what you want to drink from… but first, you need to get [himher] in the proper mood to feed you.", parse);
	Text.NL();
	Text.Add("You smile to yourself and advance on the [foxvixen], who looks at you ", parse);
	if(terry.Relation() < 30)
		Text.Add("nervously.", parse);
	else if(terry.Relation() < 60)
		Text.Add("inquisitively.", parse);
	else
		Text.Add("expectantly.", parse);
	parse["rel"] = terry.Relation() >= 30 ? Text.Parse(", the way you know [heshe] likes it", parse) : "";
	Text.Add(" Stopping at arm’s length, you reach out and tenderly caress [hisher] cheek, drawing your fingers along [hisher] dainty features before moving to stroke [hisher] hair. You admire the way it parts around your digits like silk, then scratch [himher] at the base of [hisher] ear[rel].", parse);
	Text.NL();
	if(terry.Relation() < 30) {
		Text.Add("<i>“Any particular reason for the petting? Not that I’m complaining...”</i>", parse);
		Text.NL();
		Text.Add("Since [heshe]’s asked; yes, there’s a reason, but you doubt [heshe]’ll complain once [heshe] figures out your plan.", parse);
		Text.NL();
		Text.Add("<i>“Okay, I’m curious now.”</i>", parse);
		Text.NL();
		Text.Add("Well, you’re not going to give it away and spoil things for [himher], but you know [heshe]’s going to enjoy it.", parse);
	}
	else if(terry.Relation() < 60) {
		Text.Add("<i>“Hmm, this feels nice...”</i>", parse);
		Text.NL();
		Text.Add("You aim to please. A pretty little thing like Terry deserves a little pampering now and then, but you’re only just getting started...", parse);
		Text.NL();
		Text.Add("<i>“Can’t wait to see the rest.”</i> [HeShe] grins.", parse);
	}
	else {
		Text.Add("<i>“I must praise your knowledge of my sweet spots, [playername], but if you’re being so attentive, then this must mean you want something,”</i> [heshe] says, giving you a knowing smirk.", parse);
		Text.NL();
		Text.Add("Maybe... or maybe you just wanted to pet the [foxvixen]. Either way, does it really matter?", parse);
		Text.NL();
		Text.Add("<i>“Of course it matters. A pervert like you touching me all over… It’s enough to worry any [guygal].”</i>", parse);
		Text.NL();
		Text.Add("Oh, is that so? Well, then you guess you’d better stop petting [himher] - if [heshe]’s so worried.", parse);
		Text.NL();
		Text.Add("<i>“Even if you did keep your hands away, I have a feeling that’s not really going to keep you away from your prize...”</i>", parse);
		Text.NL();
		Text.Add("Cheerfully, you confess that Terry’s probably right, but you don’t think you’re the only one who’s going to enjoy what you have planned.", parse);
	}
	Text.NL();
	Text.Add("Still idly brushing Terry’s flowing locks, you nimbly circle the [foxvixen] and sweep [himher] into a tender embrace. ", parse);
	if(terry.Relation() < 30)
		Text.Add("[HeShe] wriggles in your arms instinctively, clearly not too comfortable with being held too close, but doesn’t try to fight you off.", parse);
	else
		Text.Add("[HeShe] leans back into your embrace, content to let you hug [himher] as you please.", parse);
	Text.NL();
	Text.Add("The [foxvixen]’s ears twitch, catching your eye. You can’t resist the urge to lean forward and tenderly kiss the closest one. It flicks against your nose, making you laugh softly and enticing you to give it another peck.", parse);
	Text.NL();
	Text.Add("You place a deeper kiss on the back of Terry’s neck, freeing one hand to stroke the long, soft fluffiness of [hisher] luxuriant tail as it bats against your [hips].", parse);
	Text.NL();
	Text.Add("Terry coos in pleasure, relishing in the attention. [HeShe] pushes back to grind against you as you continue your skillful ministrations.", parse);
	Text.NL();
	parse["b"] = terry.Cup() >= TerryFlags.Breasts.Acup ? Text.Parse(" and [hisher] breasts", parse) : "";
	Text.Add("You smile to yourself at the [foxvixen]’s pleasure. It’s a good start, but [heshe] still needs a little more work yet. With the thought solidified in your mind, you raise your hand toward [hisher] chest[b].", parse);
	Text.NL();
	if(terry.Cup() < TerryFlags.Breasts.Acup)
		Text.Add("The [foxvixen]’s girlishly flat chest has nothing to really play with... except, of course, for [hisher] perky little nipples. Drawn to them like iron filings to a magnet, you start to caress the closest nub. Your fingers stroke tender circles around [hisher] areolae, brushing [hisher] nipple until it starts to swell. Once it has proudly risen up, you gently pinch it between forefinger and thumb.", parse);
	else if(terry.Cup() < TerryFlags.Breasts.Bcup)
		Text.Add("Terry’s dainty little A-cups are just big enough that you can savor their softness against your fingertips as you caress them. You run your fingers through the silken fur to brush the sensitive skin beneath before spiraling inexorably toward [hisher] dainty nipples. You can feel [himher] hardening under your touch, each nub rising as you lavish it tenderly.", parse);
	else if(terry.Cup() < TerryFlags.Breasts.Ccup)
		Text.Add("The perky B-cup is just the right size to fit into the palm of your hand. Soft fur over soft flesh squishes in your grip as you affectionately caress the [foxvixen]’s boob, alternatively running your fingers back and forth across its suppleness and kneading it between your fingers.", parse);
	else if(terry.Cup() < TerryFlags.Breasts.Dcup)
		Text.Add("Terry’s proud C-cup is just begging for you to grope it, squishing wonderfully as you knead and caress it. You can feel the heavy fullness of Terry’s breast in your grip as you attempt to palm the pillowy orb.", parse);
	else
		Text.Add("The [foxvixen]’s over-inflated tits are far too big to encompass with just one hand... but that doesn’t mean you can’t enjoy yourself trying. Your fingers sink into supple boobflesh as you tenderly squeeze it, kneading the luscious breast as best you can.", parse);
	Text.NL();
	Text.Add("Terry arches [hisher] back, moaning profusely at your ministrations. That’s a good [boygirl]; now, let’s see how close [heshe] is to being ready...", parse);
	Text.NL();
	
	var womb = terry.PregHandler().Womb();
	var preg = womb && womb.pregnant;
	var stage = womb && womb.progress;
	
	Text.Add("Leaving Terry’s tail alone, you reach around to [hisher] belly. ", parse);
	
	if(preg) {
		Text.Add("Naturally, you can’t resist tending to your vulpine lover’s gravid womb first. ", parse);
		if(stage > 0.75) {
			parse["poppamomma"] = terry.mfPronoun("poppa", "momma");
			Text.Add("Terry moans appreciatively as you stroke [hisher] distended navel, teasing the sensitive bulb of flesh. [HisHer] bulging stomach ripples as the child kicks excitedly in Terry’s womb, evidently enjoying the attention as much as [poppamomma] Terry is. You give [himher] a gentle pat, and then guide your hand further down, trailing around the pronounced swell.", parse);
		}
		else if(stage > 0.5) {
			Text.Add("Terry groans leisurely as your hand sweeps across [hisher] bloated middle, which is swollen like a ripe fruit. You cup [himher] under the navel, rubbing soft circles as you appreciate the feel of [himher], so heavy with the life you helped to make. A smile crosses your lips as you feel the faintest flutter from the baby inside, and you pet where you felt it moving before sweeping your hand lower still.", parse);
		}
		else {
			Text.Add("The pregnant [foxvixen]’s belly is palpably swollen under your palm as you caress it. You spend a moment savoring the warmth of [hisher] burgeoning womb before sweeping down [hisher] body.", parse);
		}
	}
	else
		Text.Add("You stop to give [himher] a playful tummy-rub that draws a girlish giggle from the [foxvixen]’s lips, and then continue on your way, guiding your hand down toward [hisher] girlish thighs.", parse);
	Text.NL();
	if(terry.FirstCock()) {
		parse["hc"] = terry.HorseCock() ? " massive" : "";
		Text.Add("You can feel the[hc] hardness of [hisher] [tcock] jutting from its sheath. Playfully, you brush against its [tcockTip], feeling the faintest smear of pre-cum on your [skin].  However, you have a different target in mind, and so you move downward.", parse);
		Text.NL();
		Text.Add("[HeShe] moans as your fingers brush against the tender skin of [hisher] balls, instinctively spreading [hisher] legs to give you better access to your real target.", parse);
	}
	else {
		Text.Add("When your fingers brush against the [foxvixen]’s silky thighs, [heshe] moans softly and obediently spreads [hisher] legs, letting you have access to the treasure hidden between them.", parse);
	}
	Text.NL();
	Text.Add("You can feel Terry shudder as you stroke [hisher] plush netherlips, carefully running a digit along [hisher] labia. Delicately, you insert just the barest tip of your finger inside of [himher]; ", parse);
	if(terry.PussyVirgin())
		Text.Add("this isn’t how you want to break [hisher] hymen, after all.", parse);
	else
		Text.Add("you don’t want to get [himher] off just yet.", parse);
	Text.NL();
	if(terry.Relation() < 30) {
		Text.Add("Terry moans in barely contained lust. <i>“S-so, this is what you were after?”</i>", parse);
		Text.NL();
		Text.Add("Yes, it is. Does [heshe] want you to stop?", parse);
		Text.NL();
		Text.Add("<i>“Hmm… no. I don’t mind,”</i> [heshe] says, smiling softly. <i>“As long as you’re not rough,”</i> [heshe] adds.", parse);
		Text.NL();
		Text.Add("You assure [himher] that you’ll be gentle, even as you delicately continue to stroke the [foxvixen] inside and out. Affectionately, you ask [himher] how that feels.", parse);
		Text.NL();
		Text.Add("<i>“Mhm, it feels good.”</i>", parse);
		Text.NL();
		Text.Add("You croon your approval, especially as you feel the dampness starting to slicken your fingers. [HeShe] feels just about ready for you. All that you need is to get [himher] into the proper position...", parse);
	}
	else if(terry.Relation() < 60) {
		Text.Add("Terry cries out as you stroke [hisher] labia. <i>“So this is where you were trying to get at?”</i>", parse);
		Text.NL();
		Text.Add("You hum in wordless agreement, nodding softly as you continue playing with [hisher] womanhood.", parse);
		Text.NL();
		Text.Add("<i>“Well, as long as you make me feel good, I got no complaints.”</i>", parse);
		Text.NL();
		Text.Add("Oh, you’re going to rock [hisher] world, you assure [himher] of that.", parse);
		Text.NL();
		Text.Add("<i>“I’ll hold you to that promise, so you’d better start putting some real effort behind your ministrations, my perverted [mastermistress].”</i>", parse);
		Text.NL();
		Text.Add("You’ll put some real effort in alright, but you have something other than fingering in mind for [himher]...", parse);
	}
	else {
		Text.Add("<i>“Ahn!”</i> [HeShe] cries out cutely as you dip your digits into [hisher] vulnerable treasure. <i>“I knew it! You pervert!”</i> [heshe] calls you out accusingly.", parse);
		Text.NL();
		Text.Add("The secret is out! However did [heshe] figure you out?", parse);
		Text.NL();
		Text.Add("<i>“A [foxvixen] always knows.”</i> [HeShe] giggles.", parse);
		Text.NL();
		Text.Add("Maybe so, but it didn’t save [himher] from falling into your trap, did it? Now you can do whatever you want to [himher]...", parse);
		Text.NL();
		Text.Add("<i>“Damn it! I guess you got me this time, perv!”</i> [HeShe] smirks.", parse);
		Text.NL();
		Text.Add("You make a final twist inside of [hisher] pussy, and then deliberately lap the smears of feminine nectar from your fingers, audibly savoring this appetizer. With an approving purr, you compliment Terry on [hisher] fine taste.", parse);
		Text.NL();
		Text.Add("<i>“You sneaky bastard, so <b>that</b> is what you’re really after...”</i> [heshe] says, catching on to your real goal.", parse);
		Text.NL();
		Text.Add("You just smile, and place a proud kiss on [hisher] dainty cheek. Such a clever little [foxvixen]; you knew [heshe] was so smart, but that’s why you fell in love with [himher]. With your free hand, you grope at [hisher] chest, pinching a nipple for emphasis. As Terry gasps, wriggling in your grip, you seize your moment to pounce; you’ve had the appetizer, now for the main course...", parse);
	}
	Text.NL();
	Text.Add("You tell Terry to get down on fours, giving [hisher] back a little push to get [himher] going.", parse);
	Text.NL();
	parse["b"] = terry.Relation() >= 30 ? "doesn't hesitate" : "barely hesitates";
	Text.Add("The [foxvixen] [b] as [heshe] falls onto [hisher] hands and knees.", parse);
	Text.NL();
	parse["lb"] = player.Humanoid() ? "" : ", as best you can given your frame";
	Text.Add("That’s a good [foxxyvixxy]. You gently pet [hisher] back in approval, then kneel down behind [himher][lb]. Once settled, you eagerly cup Terry’s perky ass cheeks and savor the feeling of squishing them softly between your fingers.", parse);
	Text.NL();
	Text.Add("Terry gasps, shuddering for a moment as you fondle [hisher] butt.", parse);
	Text.NL();
	
	if(rel < 45) {
		Text.Add("<i>“Hey! Not so rough,”</i> [heshe] protests.", parse);
		Text.NL();
		Text.Add("Sorry, you got overexcited. [HisHer] ass is just so lovely that you had to play with it a little before you got down to the real fun.", parse);
		Text.NL();
		Text.Add("<i>“R-right. I don’t really mind, just… be a bit more careful, okay?”</i>", parse);
		Text.NL();
		Text.Add("Chuckling softly, you give Terry’s butt a tender pet, assuring [himher] that you’ll be careful.", parse);
	}
	else {
		Text.Add("<i>“Teasing is fine, [playername], but try not to keep me waiting,”</i> [heshe] says, grinding [hisher] cute tush against your palms.", parse);
		Text.NL();
		Text.Add("You can’t hold back a chuckle. Such an impatient [foxvixen]! No worries; you know [heshe]’s all wet and ready for you. This was just a last little bit of play before you showed [himher] the real fun.", parse);
		Text.NL();
		Text.Add("<i>“Riiiiight. If you keep fooling around too much, I might just have to go back there. And you wouldn’t want that, would you?”</i> [HeShe] grins.", parse);
		Text.NL();
		Text.Add("Oh, no, you wouldn’t want that at all, you chuckle.", parse);
	}
	Text.NL();
	Text.Add("You brush Terry’s tail out of the way and drink in the sight of [hisher] lovely rear-end, presented so enticingly below you. Beneath the round, perky cheeks of [hisher] juicy butt lies a delicate pussy, shimmering slightly with the glaze of lube you’ve already managed to draw from [himher].", parse);
	if(terry.FirstCock())
		Text.Add(" Past [hisher] womanhood, [hisher] balls dangle in the breeze, [hisher] [tcock] already fully out of [hisher] sheath, pressing against [hisher] belly in [hisher] arousal.", parse);
	Text.NL();
	Text.Add("You could just dive on in and drink to your heart’s content... but, maybe you should also keep playing with [himher] as you do? Nothing says you can’t do two things at once, after all...", parse);
	Text.Flush();
	
	TimeStep({minute: 30});
	
	player.AddLustFraction(0.25);
	
	//[LickNtease] [LickNass] [LickNdick]
	var options = new Array();
	options.push({ nameStr : "LickNtease",
		tooltip : "As much as you’d like to get on with your business, you can’t just ignore Terry’s birthmark...",
		func : function() {
			Text.Clear();
			parse["noseSnout"] = player.HasMuzzle() ? "snout" : "nose";
			Text.Add("As Terry sways slightly, [hisher] beautiful birthmark stands out in the corner of your eye. It is a beautiful gold shimmering against the creamy white that encompasses the rest of [hisher] glorious butt. Hungrily licking your lips, you lean closer and plant a wet, juicy kiss squarely in its center, [noseSnout] shamelessly buried in Terry’s ass from your efforts.", parse);
			Text.NL();
			Text.Add("<i>“Ahn! Hey! That’s my birthmark!”</i> [heshe] exclaims. <i>“You know how I feel about it...”</i>", parse);
			Text.NL();
			Text.Add("Oh, you know, but... it’s just so cute. It’s such a rich, beautiful gold, and it’s so clearly shaped! It’s just one of the cutest marks you’ve ever seen on such a pretty [foxxyvixxy]. As you speak, your finger traces the rim of the mark, a playful stroke that emphasizes your words.", parse);
			Text.NL();
			if(terry.Relation() < 30) {
				Text.Add("<i>“Flattery doesn’t make you any less of a jerk...”</i> [heshe] trails off.", parse);
				Text.NL();
				Text.Add("And yet, despite [hisher] words, you can see [hisher] tail wagging softly. With a soft chuckle, you comment that you think Terry actually likes it when you’re a bit of a jerk, before sweetly kissing [himher] right on the mark again.", parse);
				Text.NL();
				Text.Add("Terry looks back at you with a pout, but remains silent.", parse);
			}
			else if(terry.Relation() < 60) {
				Text.Add("<i>“I thought we agreed you wouldn’t tease me like that!”</i>", parse);
				Text.NL();
				Text.Add("You don’t recall agreeing to anything, especially when [hisher] mark is so cute!", parse);
				Text.NL();
				Text.Add("<i>“...Sometimes you can be such a jerk, [playername].”</i> [HeShe] sighs, pouting.", parse);
				Text.NL();
				Text.Add("Maybe so, but [heshe] likes you that way, doesn’t [heshe]?", parse);
				Text.NL();
				Text.Add("Terry doesn’t dignify you with an answer - not verbally, anyway. [HisHer] long, fluffy tail wags gently, giving you all the reply you need.", parse);
			}
			else {
				Text.Add("<i>“[playername], as much as I love you, there are times I just want to smack you. You’re such a brat sometimes,”</i> [heshe] adds, teasingly.", parse);
				Text.NL();
				Text.Add("<b>You</b> are a brat? Who’s the one getting all worked up over a sexy little tramp-stamp, hmm?", parse);
				Text.NL();
				Text.Add("<i>“Of course I get worked up! You can’t seem to leave it alone!”</i> [heshe] protests, pouting.", parse);
				Text.NL();
				Text.Add("Well, it’s not your fault that it’s so irresistible. You make a show of kneading the soft fur with its distinctive patterning for emphasis, quipping that [heshe]’s just so adorable when [heshe] gets all pouty like this.", parse);
				Text.NL();
				Text.Add("<i>“...Jerk.”</i> [HeShe] sighs. <i>“Flattery doesn’t help your case, you know?”</i>", parse);
				Text.NL();
				Text.Add("Oh, come on. You know that [heshe]’s a sucker for flattery. Your pretty little [foxvixen] just loves being told how sexy [heshe] is, doesn’t [heshe]? Not that you mind; you love telling [himher] about what a sexy thing [heshe] is. This glorious ass, those sweet, girlish features, long lovely red hair; [heshe]’s just such a beautiful sight. And you get to have [himher] all to yourself; you’re so lucky.", parse);
				Text.NL();
				Text.Add("Terry’s pout quickly turns into a smile, and [hisher] tail begins wagging slightly at your words. <i>“You make it really hard to be mad at you, [playername], but you’re still a jerk for teasing my mark,”</i> [heshe] adds jokingly.", parse);
				Text.NL();
				Text.Add("Well, you’ll just have to make it up to [himher] some more. You have just the apology in mind...", parse);
				Text.NL();
				Text.Add("<i>“Reaaaally?”</i>", parse);
				Text.NL();
				Text.Add("You chuckle softly in response. No fun giving it away first, but you know [heshe]’ll love it.", parse);
			}
			Text.NL();
			Text.Add("Idly stroking the [foxvixen]’s bouncy butt with its all-natural tramp-stamp, your gaze sinks lower still, making you lick your lips at the sight of the glistening treasure there.", parse);
			Text.NL();
			parse["b"] = terry.HasBalls() ? Text.Parse(", just above [hisher] swaying balls", parse) : "";
			Text.Add("Leaning in, you extend your [tongue] and carefully guide its [tongueTip] to the very bottom of [hisher] flower[b]. You draw the length of your tongue upwards in a wet, slurping lick, ensuring both lips get the full treatment as you glaze their length with spittle.", parse);
			Text.NL();
			Text.Add("Terry groans softly, [hisher] pussy fluttering as [heshe] instinctively attempts to draw you deeper inside. Unwilling to give your tongue to [himher] so early on, you wriggle it free of [hisher] clutch. Slowly and methodically, you continue lapping at [hisher] womanhood, pressing just a little deeper each time. Through it all, you savor the spicy, sweet taste of [hisher] juices as they coat your tongue and help you polish [himher] to a glistening sheen.", parse);
			Text.NL();
			Text.Add("As Terry mewls and wriggles, you change your tactics and start carefully probing [hisher] depths with your [tongueTip], as opposed to simply making out with [hisher] netherlips. ", parse);
			if(terry.PussyVirgin()) {
				Text.Add("In your efforts, you can feel the barrier of [hisher] hymen barring you from getting too deep. Unwilling to burst it in this manner, you content yourself with tickling the sensitive membrane with your tongue, making up for Terry’s shallowness with your ability to control your ministrations more readily.", parse);
			}
			else {
				Text.Add("Terry’s womanhood opens up around your intruder, the mewling [foxvixen] drawing you inside as deeply as [heshe] can", parse);
				if(player.LongTongue())
					Text.Add(" - which is quite a way. You keep probing deeper and deeper inside of [himher], until you’re certain that you’re bumping your [tongueTip] against [hisher] cervix.", parse);
				else
					Text.Add(".", parse);
				Text.NL();
				Text.Add("Eager to oblige, you thrust your tongue in and out, plumbing [himher] in the best imitation of a thrusting cock that you can give. As you plunge, you wriggle your tongue, allowing you to caress [hisher] inner walls in a manner few cocks could hope to replicate.", parse);
			}
			Text.NL();
			Text.Add("Tongue dripping with Terry’s juices, you pull free of [hisher] nethers with a wet slurp. Feeling mischievous, you lay the sloppiest kiss you can muster on [hisher] birthmark, painting the golden heart with the mixture of saliva and female lube. To keep [himher] from getting lonely while your tongue is occupied, your fingers seek out [hisher] petals, gently stirring through them before closing expertly on [hisher] clitoris in a playful pinch.", parse);
			Text.NL();
			Text.Add("<i>“Yahn!”</i> [heshe] yelps. <i>“S-stop tea- ah!”</i>", parse);
			Text.NL();
			Text.Add("You cut [himher] off in mid-protest as you change over again. Your fingers lovingly trace the birth-mark on [hisher] butt cheeks as your lips close on [hisher] clitoris. ", parse);
			if(terry.FirstCock())
				Text.Add("As [hisher] churning balls bump against your chin, you", parse);
			else
				Text.Add("You", parse);
			Text.Add(" nibble delicately at the [foxvixen]’s pleasure-buzzer with your teeth. You graze it just hard enough that [heshe] can feel it, then soothe it with teasing flicks of your tongue.", parse);
			Text.NL();
			Text.Add("<i>“I’m getting close!”</i>", parse);
			Text.NL();
			Text.Add("A thrill runs through you, and you change tack. Your mouth moves up, passionately making out with Terry’s netherlips, suckling and lapping. With your free hand, you resume playing with [hisher] clitoris, tweaking it expertly between your fingertips. Your thirst for [hisher] nectar is overwhelming, driving you to push [himher] over the edge.", parse);
			Text.NL();
			
			var cum = terry.OrgasmCum();
			
			Text.Add("Terry’s whole body shakes and [heshe] virtually howls in ecstasy as climax washes through [himher]. A flood of feminine honey pours into your mouth and you avidly gulp it down, swallowing mouthful after mouthful as excess runs down your chin. [HisHer] spicy-sweet flavor caresses your tongue and sets your stomach afire, making you thirst for more and more.", parse);
			Text.NL();
			Text.Add("You bury your face as deeply into Terry’s cunt as you can, intent on lapping up every last drop of [hisher] delicious juices. Instinctively, you hug [himher] closer to try and minimize the spillage.", parse);
			if(terry.FirstCock())
				Text.Add(" Underneath you, [hisher] neglected [tcock] erupts, spattering cum across the ground beneath [hisher] belly.", parse);
			Text.NL();
			Text.Add("Even as Terry’s cries dwindle to a soft, contented mewl, the tidal wave of climax gone and leaving just the lingering backwash of afterglow, you continue lapping, ensuring that not a single drop remains. Only when you have licked [himher] clean do you pull away, licking your own lips bare as you do.", parse);
			Text.NL();
			Text.Add("Terry wobbles softly, so weak from [hisher] climax that [heshe] can barely hold [himher]self upright anymore. Shifting around slightly for a better grip, you tenderly fold [himher] in your arms and guide [himher] down to the ground. Once [heshe] is settled, you lie down beside [himher], spooning yourself against [hisher] back.", parse);
			Text.NL();
			if(terry.Relation() < 30) {
				Text.Add("<i>“T-that was...”</i> [heshe] trails off. Apparently, [heshe] still hasn’t quite caught [hisher] breath.", parse);
				Text.NL();
				Text.Add("Incredible? Well, [heshe] certainly tasted incredible, too.", parse);
				Text.NL();
				Text.Add("The [foxvixen] chuckles softly. <i>“Thanks.”</i>", parse);
				Text.NL();
				Text.Add("Any time.", parse);
			}
			else if(terry.Relation() < 60) {
				Text.Add("<i>“So, how was it?”</i> Terry asks, still panting.", parse);
				Text.NL();
				Text.Add("Delicious. [HeShe] has some of the yummiest honey you’ve ever been lucky enough to sample.", parse);
				Text.NL();
				Text.Add("<i>“What can I say? I aim to please.”</i> [HeShe] smiles.", parse);
				Text.NL();
				Text.Add("Well, [heshe] certainly hit the bullseye this time.", parse);
			}
			else {
				Text.Add("<i>“That was nice, but I think you missed a spot,”</i> [heshe] teases.", parse);
				Text.NL();
				Text.Add("Really? Oh, yes! You see it now.", parse);
				Text.NL();
				Text.Add("With a wicked grin, you lean over and plant a warm, tender kiss right on Terry’s girlish lips. [HeShe] murmurs softly in approval, kissing you back hungrily before you break liplock. You teasingly lick your lips before you declare that you got it.", parse);
				Text.NL();
				Text.Add("<i>“It wasn’t quite the spot I was thinking about, but you get bonus points for a job well done either way.”</i>", parse);
				Text.NL();
				Text.Add("It was the least you could do, after [heshe] gave you such a lovely treat.", parse);
			}
			Text.NL();
			Text.Add("That said, you wrap your arms around the [foxvixen] and draw [himher] in close, holding [himher] tenderly and listening to [hisher] breathing. You both allow yourselves to drift off, the smell of sex still lingering in your nose.", parse);
			Text.Flush();
			
			TimeStep({minute: 30});
			
			Gui.NextPrompt();
		}, enabled : true
	});
	options.push({ nameStr : "LickNass",
		tooltip : Text.Parse("If you’re going to be so close to [hisher] ass, you might as well enjoy it as you have your drink...", parse),
		func : function() {
			Text.Clear();
			Text.Add("Your eyes are drawn inexorably to the golden heart stamped so brazenly on Terry’s buttocks. For a moment, you consider teasing [himher] by messing with [hisher] heart stamp, but ultimately you decide to give the poor [foxvixen] a break. As cute as [heshe] is when [heshe]’s embarrassed, you think you’d like to go for another target this time...", parse);
			Text.NL();
			Text.Add("You wrap your fingers around the [foxvixen]’s luscious butt cheeks and squeeze. Terry’s bubble-butt is just enough to give you a proper handful as you fondle [himher], and the gasps and moans that accompany every delicious squeeze is enough to make you smile.", parse);
			Text.NL();
			if(terry.Relation() < 30) {
				Text.Add("<i>“Don’t play with my butt so much! It’s embarrassing...”</i> [heshe] protests.", parse);
				Text.NL();
				Text.Add("Aw, there’s no need to be embarrassed! How can you not play with something so cute?", parse);
				Text.NL();
				Text.Add("<i>“W-weren’t you supposed to do something <b>other</b> than playing with my butt?”</i> [heshe] protests.", parse);
				Text.NL();
				Text.Add("Oh, that’s right, so you were. You just got a little distracted; thanks for the reminder.", parse);
			}
			else if(terry.Relation() < 60) {
				Text.Add("<i>“Enjoying yourself back there?”</i> [heshe] asks teasingly.", parse);
				Text.NL();
				Text.Add("Oh, yes, you most certainly are. The view from back here is spectacular.", parse);
				Text.NL();
				Text.Add("Terry chuckles. <i>“Enjoying the view is fine and dandy, but that doesn’t do much for me.”</i>", parse);
				Text.NL();
				Text.Add("Maybe not, but it does get [himher] in the mood to properly appreciate what’s next.", parse);
			}
			else {
				Text.Add("<i>“Much as I love the attention, aren’t you getting a bit carried away, ya big perv?”</i> [heshe] asks teasingly.", parse);
				Text.NL();
				Text.Add("Well... maybe just a little, but it’d be wrong to not appreciate one of [hisher] finest features while you’re back here.", parse);
				Text.NL();
				Text.Add("Terry chuckles softly. <i>“No need to flatter me anymore, silly. I already got my pants down,”</i> [heshe] teases.", parse);
				Text.NL();
				Text.Add("Yes, [heshe] does. Now, if only you could talk [himher] into keeping them off all the time...", parse);
				Text.NL();
				Text.Add("<i>“I would, but wouldn’t that distract you from your adventuring?”</i>", parse);
				Text.NL();
				Text.Add("Maybe a little, but think of the morale boost!", parse);
				Text.NL();
				Text.Add("The [foxvixen] laughs at your reply. <i>“Alright, I’ll consider it, but what are you going to do about <b>my</b> morale boost?”</i>", parse);
				Text.NL();
				Text.Add("Why, you’re going to do this!", parse);
			}
			Text.NL();
			Text.Add("With a final squeeze for luck, you lean in closer to Terry’s feminine flower and extend your tongue, leisurely dragging just the [tongueTip] through [hisher] petals. Eyes half-closed, you savor the hints of [hisher] nectar as they dance across your taste buds.", parse);
			Text.NL();
			Text.Add("You roll your tongue back inside, audibly swallowing as you savor the flavor. Teasingly, you smack your lips before licking [himher] again. Each stroke is slow and deliberate, only just penetrating Terry’s depths. After all, ", parse);
			if(terry.PussyVirgin())
				Text.Add("you don’t want to pop [hisher] precious cherry so casually.", parse);
			else
				Text.Add("it’s more fun this way.", parse);
			Text.NL();
			Text.Add("Terry’s soft moans ring in your [ears] as you lap teasingly at [hisher] womanhood, a perfect backdrop to spur your efforts on. Your tongue works its way further down, allowing you to cautiously ease it into the hood where Terry’s clitoris hides.", parse);
			Text.NL();
			Text.Add("A sharp inhalation greets you as you tickle the [foxvixen]’s pleasure buzzer, and you eagerly start licking it. Your tongue delicately flicks Terry’s clit, rubbing it with your [tongueTip] until it has swollen with the [foxvixen]’s arousal and peeks demurely from its hood. Bending closer, you softly kiss Terry’s button, nibbling it carefully with your teeth.", parse);
			Text.NL();
			Text.Add("Terry gasps sharply, mewling as [heshe] wriggles instinctively from your touch. In the privacy of your head, you smile, continuing to nip and suckle the [foxvixen]’s clit as your hands adjust themselves.", parse);
			Text.NL();
			Text.Add("Slowly and tenderly, you spread Terry’s folds apart with your thumbs, releasing [hisher] button to lay a broad, wet, slurping lick across [hisher] cunt. Terry’s honey is flowing strong and thick now, making your head reel as it washes across your [tongue]. Compelled by a hunger that wells up inside you, you lick [himher] again, and again. With each stroke, you slowly lap your way up [hisher] slit.", parse);
			Text.NL();
			Text.Add("<i>“Ahn! Yes! This feels great!”</i>", parse);
			Text.NL();
			Text.Add("Caught up in your enthusiasm, you don’t slow your efforts even when your tongue brushes across the smooth, sensitive skin of Terry’s taint. You start to caress Terry’s slit with your thumbs, carefully trailing over [hisher] netherlips as you start painting the taint with your tongue.", parse);
			Text.NL();
			Text.Add("You lick your way steadily upwards, until you are forced to relinquish one hand from Terry’s cunt to pull apart [hisher] butt cheeks. Propelled by your desire, you lick upwards still, running your tongue around Terry’s clenched anus without qualm. The sound of your own wet slurping fills your ears as you busily coat Terry’s back passage with your fluids.", parse);
			Text.NL();
			Text.Add("<i>“Huh? [playername], what are y- ah!”</i>", parse);
			Text.NL();
			Text.Add("Before Terry can stop you, you thrust forward with your [tongueTip], plunging it as deeply into the startled [foxvixen]’s butt as you can manage. [HeShe] instinctively clamps down, squeezing your wriggling appendage in a tunnel of hot, tight flesh, but your tongue cannot be constrained. With deft wriggles and flicks, you worm your way deeper inside, teasing every nook, ridge and cranny that you can feel along the way.", parse);
			Text.NL();
			Text.Add("Terry moans in abandon as your lewd [tongue] burrows through [hisher] most shameful of tunnels, molesting [himher] in the most perverse way you can think of. ", parse);
			if(terry.FirstCock()) {
				if(player.LongTongue()) {
					Text.Add("Your probing finds the herm [foxvixen]’s prostate, ", parse);
					if(terry.HorseCock())
						Text.Add("totally bloated with the fluids to aid [hisher] mighty balls and throbbing with need,", parse);
					else
						Text.Add("pulsing softly in [hisher] desire,", parse);
					Text.Add(" and you caress it shamelessly. Terry’s mewling is brought to a new pitch as the pleasure washes through [himher].", parse);
				}
				else {
					Text.Add("Alas, your tongue is too short to reach Terry’s prostate, but you make do as best you can regardless. You spare no effort in energetically plowing [hisher] depths, slurping and slavering as you coat [hisher] innards thoroughly in your juice.", parse);
				}
			}
			else {
				Text.Add("You slurp and lap at Terry’s ass with the same enthusiasm you showed [hisher] precious womanhood, noisily slathering [hisher] perverse tunnel and coaxing [himher] to mewl and grunt in shameless abandon at your efforts.", parse);
			}
			Text.NL();
			Text.Add("When Terry’s cries reach a delightfully high pitch, you deem your efforts enough. Though [heshe] tries to keep you locked inside, your ministrations have left [himher] so sopping wet that your tongue slips freely from the [foxvixen]’s butt.", parse);
			Text.NL();
			if(terry.Relation() < 30) {
				Text.Add("<i>“T-that felt… good.”</i> [heshe] states, panting a bit.", parse);
				Text.NL();
				Text.Add("You’re glad [heshe] thinks so, but that was just the appetizer; now for the main course...", parse);
			}
			else if(terry.Relation() < 60) {
				Text.Add("<i>“Haa… that felt great,”</i> [heshe] says, sighing softly. <i>“Thanks a lot, [playername]. This was a nice suprise.”</i>", parse);
				Text.NL();
				Text.Add("Chuckling softly, you assure [himher] that you’re glad [heshe] liked it, but you’re not finished yet.", parse);
			}
			else {
				Text.Add("<i>“Just my pussy wasn’t enough for you?”</i> the [foxvixen] asks, panting softly. <i>“Does your hunger know no bounds?”</i>", parse);
				Text.NL();
				Text.Add("When a banquet like Terry has been laid out for you? No, it doesn’t. You intend to gorge yourself before you’re through.", parse);
				Text.NL();
				Text.Add("<i>“Whatever am I going to do with a big perv like you...”</i> [heshe] muses, while using [hisher] fluffy tail to caress your cheeks.", parse);
				Text.NL();
				Text.Add("Hmm... love you back as much as you love [himher]?", parse);
				Text.NL();
				Text.Add("Terry laughs in response. <i>“Well, that’s a given! Now, how about you be a good lover and finish me off?”</i> [heshe] asks teasingly, shaking [hisher] butt for emphasis.", parse);
				Text.NL();
				Text.Add("With all due haste. You would never want to keep your precious [foxvixen] waiting.", parse);
			}
			Text.NL();
			parse["nose"] = player.HasMuzzle() ? "snout" : "nose";
			Text.Add("Grasping Terry’s bountiful butt cheeks with both hands again, you lower your mouth to [hisher] flower once more. Drawn instinctively to [hisher] stiff clit, you kiss it firmly, feeling the trickle of feminine honey over your [nose] as you press it to [hisher] seeping slit.", parse);
			Text.NL();
			Text.Add("As you passionately make out with Terry’s cunt, your fingers creep across [hisher] backside, inching closer to [hisher] wet, shiny ass. Releasing the clit, you start to lap at Terry’s cunny once more, moaning in counterpoint to Terry’s mewls as you soak your senses in [hisher] delicious female juices.", parse);
			Text.NL();
			Text.Add("Carefully, you press your thumb to [hisher] pucker and start to push. Lubed up as it is from your earlier efforts, Terry can’t hope to keep it out, allowing you stretch [himher] around your invading digit.", parse);
			Text.NL();
			Text.Add("[HeShe] moans sharply as you push yourself in as deep as you physically can, contrasting this invasion of one hole with your oral molestation of the other. ", parse);
			if(terry.FirstCock())
				Text.Add("You can’t hope to reach [hisher] prostate, of course, but nevermind; you’ll make do. In [hisher] present state, it certainly doesn’t matter to Terry.", parse);
			else
				Text.Add("Stimulated as [heshe] is, Terry welcomes your intrusion, walls flexing to try and pull both invaders as deep as they can.", parse);
			Text.NL();
			Text.Add("With thumb and tongue, you double-stuff Terry, working both holes in sync and with no mercy. The [foxvixen]’s cries grow louder and higher, the strain building inside of [himher] as you play [himher] like an instrument.", parse);
			Text.NL();
			
			var cum = terry.OrgasmCum();
			
			Text.Add("Inevitably, under your careful ministrations, Terry reaches [hisher] limits. With a vulpine howl of ecstasy, [heshe] cums, and you plunge your face into [hisher] thighs to drink your fill.", parse);
			if(terry.FirstCock())
				Text.Add(" Beneath you, ignored, the [foxvixen]’s [tcock] erupts, spattering its steaming seed across the ground.", parse);
			Text.NL();
			parse["juice"] = terry.mfPronoun("fox-honey", "vixen-nectar");
			Text.Add("Rich, thick, spicy-sweet [juice] floods across your tongue and you greedily guzzle it down. It tastes so good; you have to have more. You lick, suckle and slurp. Terry mewls and yips as you coax [himher] to share with you every drop [heshe] has. You gorge yourself, careless of the nectar smeared across your cheeks and dripping down your chin. All that matters to you is quenching your thirst.", parse);
			Text.NL();
			Text.Add("In the end, Terry runs dry. Even your most dexterous twists cannot coax anything more from the panting, mewling vulpine. Accepting that the feast is over, you lift your face from [hisher] pussy, thumb pulling free of [hisher] ass with an audible pop.", parse);
			Text.NL();
			Text.Add("Pushing yourself upright, you settle back on your haunches and wipe a stray smear of fluid from your face. Before you suck your fingers clean, you mischievously asked if Terry enjoyed your efforts.", parse);
			Text.NL();
			Text.Add("Terry wobbles and finally falls on [hisher] side, groaning in response.", parse);
			Text.NL();
			Text.Add("You chuckle softly. Poor little thing; [heshe]’s all worn out. You carefully lie down beside the prone [foxvixen], gently sweeping [himher] into your arms. Terry coos while you softly stroke [hisher] hair, tenderly scratching one flicking ear and cuddling [himher] like an oversized stuffed toy. ", parse);
			Text.NL();
			if(terry.Relation() < 30) {
				Text.Add("<i>“Hah… t-that was...”</i>", parse);
				Text.NL();
				Text.Add("Shhh. No need to talk, now. Just get some rest. [HeShe] deserves it, sweet little thing that [heshe] is.", parse);
			}
			else if(terry.Relation() < 60) {
				Text.Add("<i>“Hmm, you really know how to wear a fox down, don’t you?”</i>", parse);
				Text.NL();
				Text.Add("So it seems, you chuckle, but is [heshe] going to tell you that [heshe] didn’t enjoy every moment of it?", parse);
			}
			else {
				Text.Add("<i>“So, how was your [foxvixen]?”</i> [heshe] asks teasingly. <i>“I don’t remember ordering tongue, but it was pretty good!”</i> [HeShe] giggles.", parse);
				Text.NL();
				Text.Add("Delicious. You’ll have to try doing that again, especially if [heshe] likes it so much.", parse);
				Text.NL();
				Text.Add("<i>“Hehe, I do. Right now, I think I could use a nap,”</i> [heshe] says, yawning.", parse);
				Text.NL();
				Text.Add("Sounds good to you.", parse);
			}
			terry.relation.IncreaseStat(70, 1);
			Text.NL();
			Text.Add("With a soft sigh, you wrap your arms protectively around the tired [foxvixen], and gently rest yourself against [himher]. You allow your eyes to close, Terry’s quiet breathing lulling you to sleep alongside [himher].", parse);
			Text.Flush();
			
			TimeStep({minute: 30});
			
			Gui.NextPrompt();
		}, enabled : true
	});
	if(terry.FirstCock()) {
		options.push({ nameStr : "LickNdick",
			tooltip : Text.Parse("Double the genitals, double the fun. Nothing like giving [himher] a handjob to help make [himher] super-comfortable with you eating [himher] out, right?", parse),
			func : function() {
				Text.Clear();
				Text.Add("Terry’s swaying balls draw your eye, almost hypnotic in their movements as [hisher] impatiently twitching hips rock them back and forth. Beyond them, the [foxvixen]’s [tcock] thrusts itself from its sheath, an invitation that you cannot bring yourself to refuse.", parse);
				Text.NL();
				if(terry.HorseCock()) {
					Text.Add("Terry’s equine monster of a cock throbs anxiously as you wrap your fingers around it. You’ll have to be careful or [heshe]’s going to blow [hisher] top before you can properly enjoy [hisher] <i>other</i> set of equipment, too. You know that you’re up to the challenge.", parse);
					Text.NL();
					Text.Add("Like a perverse spider, you ‘walk’ your digits playfully from knotty base to blunt tip, smearing the drizzling pre-cum along the thick, flat glans with your fingertip as you trace lewd spirals across the warm flesh.", parse);
					Text.NL();
					if(rel < 50) {
						Text.Add("Terry groans in response to your ministrations, but otherwise remains silent.", parse);
					}
					else {
						Text.Add("<i>“You sure want me to stay in this position? My cock would be much easier to get at if I was sitting,”</i> [heshe] teases.", parse);
						Text.NL();
						Text.Add("No, this position is just fine; you still want that sweet pussy of [hishers], you just thought [hisher] cock would be lonely if you left it out.", parse);
						Text.NL();
						Text.Add("The [foxvixen] chuckles in response. <i>“Well, if you really want to give me handjob while you eat me out, who am I to complain?”</i>", parse);
						Text.NL();
						if(player.SubDom() >= 25) {
							Text.Add("<i>“Stroke it good, and do- yip!”</i>", parse);
							Text.NL();
							Text.Add("You tighten your grip on Terry’s stallionhood just a notch more, to make sure you have [hisher] attention. Smiling affectionately, you gently shush the [foxvixen]; silly little thing, there’s no need for words here. You know what [heshe] likes, what [heshe] <b>needs</b>.", parse);
							Text.NL();
							Text.Add("With your free hand, you slide possessively over Terry’s ass, deliberately stroking [hisher] birthmark before curling your fingers around the base of [hisher] tail. You pull it taut, tugging just hard enough that [heshe] can feel the pressure.", parse);
							Text.NL();
							Text.Add("With your other hand, you drag the very edge of your nails along the underside of [hisher] sensitive equine shaft. You trail your fingers slowly and deliberately along [hisher] veins, the stimulation making the [foxvixen] tremble in your grip.", parse);
							Text.NL();
							Text.Add("What [heshe] needs, you casually add, is to be milked dry. You’re going to take your pet and wring every last drop of cream and honey from [hisher] loins - and [heshe]’s going to love you for it.", parse);
							Text.NL();
							Text.Add("Terry swallows audibly. From your position, you can see [hisher] pussy moistening ever so slightly; [hisher] cock throbs in your hand, new dollops of pre already forming on the tip as your words sink in.", parse);
							Text.NL();
							Text.Add("<i>“Y-yes, [sir]... [mastermistress],”</i> [heshe] says, almost on instinct.", parse);
							Text.NL();
							Text.Add("Good [boygirl].", parse);
							
							terry.slut.IncreaseStat(50, 1);
						}
						else if(player.SubDom() <= -25) {
							Text.Add("<i>“Make sure you stroke it good,”</i> [heshe] adds.", parse);
							Text.NL();
							Text.Add("Oh, of course! Right away!", parse);
							Text.NL();
							Text.Add("Avidly, you start to pump away at Terry’s mighty equine shaft with both hands, working your fingers with each pass back and forth. Your lovely [foxvixen] deserves only the best that you can give [himher]. You call up every trick that you can think of, feeling for the slightest ridges and bumps that will let you truly drive [himher] wild.", parse);
							Text.NL();
							Text.Add("<i>“Hmm, yeah… just like that… how about you use your tongue next?”</i>", parse);
							Text.NL();
							Text.Add("Falling to all fours, you crawl under Terry’s hips so that you can get your mouth into place, eagerly running your tongue back and forth across the mighty shaft and polishing it to a sheen with your spittle.", parse);
							Text.NL();
							Text.Add("<i>“And my balls? Don’t forget my balls - Oh! Yes! That’s great!”</i>", parse);
							Text.NL();
							Text.Add("You coo softly in your pride, hungrily sucking away on Terry’s balls. You’d swear that you can <b>feel</b> the equine nuts contained in [hisher] impressive scrotum fizzing as they busily churn up one of [hisher] trademark eruptions of cum.", parse);
							Text.NL();
							Text.Add("A noisy kiss of appreciation on one ball, and then you return to Terry’s drooling cock. You caress the blunt tip with your [tongueTip], then curl your tongue under the glans to catch the dripping pre-cum before you resume licking back along [hisher] length.", parse);
							Text.NL();
							Text.Add("<i>“Hmm, you really know your way around my dick, don’t you, [playername]? I could just blow my load, right here, right now.”</i>", parse);
							Text.NL();
							Text.Add("A wracking sigh of longing flows from your lips at the thought of it. You swear you can hear Terry’s balls at work as they whip up a delicious font of salty, creamy fox-spooge for you. You can taste that wonderful cascade of jism sliding down your throat, feel your belly growing fat, hot and heavy as [heshe] stuffs [hisher] cock down your throat and empties [himher]self into you...", parse);
							Text.NL();
							Text.Add("The [foxvixen] chuckles, wagging [hisher] tail. <i>“Maybe you should play with it next… get a huge serving of fox-cream? We both know that isn’t what you’re after right now, and if you keep going, I’m really gonna cum!”</i> [heshe] says as [hisher] cock throbs dangerously.", parse);
							Text.NL();
							Text.Add("You pull back, shaking your head. [HeShe]’s right; as much as you want a bellyful of [foxvixen]-cock, that’s not what you bent [himher] over for. Though you really, really could suck [hisher] [tcock] dry too, you have to think about what you’re here for: sweet, sweet pussy-honey.", parse);
						}
						else {
							Text.Add("<i>“Stroke it good, and don’t forget my balls,”</i> [heshe] adds.", parse);
							Text.NL();
							Text.Add("Well, if that’s what [heshe] needs to get that sweet pussy of [hishers] all nice and juiced up for you, you’ll play along. [HeShe] better not think that this is all you’re going to do to [himher].", parse);
							Text.NL();
							Text.Add("Warning given, you bend in closer and slowly run your tongue across one bulging seed-factory. Terry’s unique musk washes over your senses, undercut with the faintest tang of salt. As you start to suckle Terry’s balls, your hands busy themselves downward. You caress [hisher] member, rubbing the dripping pre-cum into the tender skin to make it nice and slippery.", parse);
							Text.NL();
							Text.Add("<i>“Ah, yes… that feels nice...”</i>", parse);
							Text.NL();
							Text.Add("Dimly aware of Terry’s tail wagging above you, you continue with your ministrations. You leisurely caress [hisher] maleness with hands, mouth and tongue for several long moments, before you deign to glide back up above Terry’s bulging balls to take an exploratory slurp at the feminine folds there.", parse);
							Text.NL();
							Text.Add("Terry mewls sharply at the sudden intrusion of your tongue, even though you only take a shallow lick. [HisHer] nectar washes over your senses, rich and heady in the warmth of your mouth. [HeShe]’s ready for you...", parse);
						}
					}
					Text.NL();
					Text.Add("One hand still wrapped around Terry’s equine meat and pumping lazily, to keep [himher] on edge, you lower your face to [hisher] honeypot. It’s already glistening with [hisher] nectar, a thin stream running down onto [hisher] balls.", parse);
					Text.NL();
					Text.Add("Feeling playful, you lap up that stray streamer, making Terry quiver and mewl as your [tongueTip] drags along [hisher] sack and up into [hisher] folds. You worm your way daintily into [hisher] hood to tickle [hisher] clit before gliding shallowly along [hisher] length.", parse);
					Text.NL();
					Text.Add("Slowly and meticulously, you lick at [hisher] cunt, each pass just deep enough to stir [hisher] inner petals. A chorus of gasps and whimpers greets your efforts, guiding your tongue to explore each nook and cranny, helping you determine which touch elicits which note.", parse);
					Text.NL();
					Text.Add("You give [hisher] pleasure buzzer another passing lick and make your way down toward [hisher] balls, then onto [hisher] shaft. It’s not until you reach [hisher] broad, flat tip that you realize just how much pre this [foxvixen] is leaking.", parse);
					Text.NL();
					Text.Add("Savoring the rich taste of Terry’s seed, you decide to spice up the [foxvixen]’s juices with a touch of [hisher] own maleness. You give [hisher] cock a few more licks, then draw the tip inside your mouth.", parse);
					Text.NL();
					Text.Add("Terry groans in pleasure, instinctively bucking [hisher] hips as [heshe] rewards your efforts with a fresh spurt of [hisher] tasty pre-cum. It doesn’t take much coaxing before you have your mouthful. Carefully letting [hisher] shaft slip from your lips, you move back to your original target: Terry’s winking pussy.", parse);
					Text.NL();
					Text.Add("With the utmost care, you start drooling the [foxvixen]’s male essence over [hisher] womanhood. Painstakingly, you use your slick tongue to guide the flow, ensuring that it seeps inside. With your guidance, Terry’s pre-cum flows into [hisher] folds and runs down [hisher] length, painting [hisher] clit and puddling on [hisher] balls.", parse);
					Text.NL();
					Text.Add("Terry shivers as your breath caresses [hisher] newly painted pussy, unconsciously clenching down around a phantasmal cock. Closing your eyes, you take a moment to appreciate [hisher] scent; a wonderful mixture of male and female musk that floods your nose from being so close. Hungrily, you take your first real lick, drawing your tongue completely across the length of [hisher] slit. Eyes still closed, you roll the mixed juices around in your mouth, analyzing the subtle nuances of the combination.", parse);
					Text.NL();
					Text.Add("You swallow the delicious mouthful with a shudder of pleasure, opening your eyes as you playfully praise Terry for providing such a unique dish for you. Vixen nectar and stallion sauce; who else could give you something so tasty?", parse);
					Text.NL();
					if(terry.Relation() < 30) {
						Text.Add("<i>“You’re the one who made me this way...”</i>", parse);
						Text.NL();
						Text.Add("That is true... but [heshe]'s certainly made [hisher] new body [hisher] own. Or was that somebody else mewling in pleasure just now, hmm?", parse);
						Text.NL();
						Text.Add("Terry falls silent at that. From the way [hisher] tail is twitching above you, and the way [heshe] shifts [hisher] weight, it’s obvious you’ve embarrassed [himher]. Time to finish [himher] off...", parse);
					}
					else if(terry.Relation() < 60) {
						Text.Add("<i>“Well, whose fault is that?”</i> [heshe] teases.", parse);
						Text.NL();
						Text.Add("Yours, but [heshe] certainly doesn’t seem to mind the results.", parse);
						Text.NL();
						Text.Add("<i>“I don’t. So good call, [playername].”</i> [HeShe] chuckles.", parse);
						Text.NL();
						Text.Add("You rather thought it was a good idea yourself. That’s why you went through with it.", parse);
						Text.NL();
						Text.Add("<i>“Care to finish me off now?”</i>", parse);
						Text.NL();
						Text.Add("It would be your pleasure.", parse);
					}
					else {
						Text.Add("<i>“Well, I owe it all to my kinky, perverted lover,”</i> [heshe] says with a grin.", parse);
						Text.NL();
						Text.Add("You can’t take all the credit; [heshe] was the kinky [boygirl] who mastered this new body after you gave it to [himher], after all.", parse);
						Text.NL();
						Text.Add("<i>“Hard not to, especially when someone is so insistent on playing with your new bits.”</i>", parse);
						Text.NL();
						Text.Add("Can [heshe] really blame you? They’re so much fun to play with!", parse);
						Text.NL();
						Text.Add("<i>“Blame a huge pervert like yourself? Of course I can! Not that I mind...”</i>", parse);
						Text.NL();
						Text.Add("Sounds like you’re not the only pervert here. Or does [heshe] not want you to finish [himher] off, hmm?", parse);
						Text.NL();
						Text.Add("<i>“Of course I want you to finish me off… unless you’re implying you don’t want my juices? Or my cream?”</i>", parse);
						Text.NL();
						Text.Add("After this little appetizer? Of course you want the main course! You just wanted to be sure it was okay with [himher] first.", parse);
						Text.NL();
						Text.Add("<i>“Excuses, [playername]. Excuses...”</i>", parse);
					}
					Text.NL();
					Text.Add("Without further ado, you plunge your face back into Terry’s muff and resume licking for all you’re worth. Your hands caress [hisher] stallionhood, feeling it throbbing faster and faster as your fingers glide across the skin. You smear it with pre-cum, massaging Terry’s own juices into the soft flesh.", parse);
					Text.NL();
					Text.Add("[HisHer] flare has risen from [hisher] glans, and you tease it mercilessly with one hand, pinching and stroking the ridged flesh even as the other hand busies itself with Terry’s swelling knot, palpating the engorged flesh.", parse);
					Text.NL();
					Text.Add("Through it all, you hungrily ravish Terry’s cunt. Smears of feminine fluids paint themselves across your [face] as you slurp and slather at the precious source of nectar. You can taste the difference in [hisher] juices, feel [hisher] climax coming closer and closer, and it drives you on in your efforts.", parse);
					Text.NL();
					Text.Add("You nibble at [hisher] clit, pump [hisher] cock, lick and suckle and stroke for all you’re worth...", parse);
					Text.NL();
					
					var cum = terry.OrgasmCum();
					
					Text.Add("With a suddenness that shocks you, Terry arches [hisher] back and howls in ecstasy. You can feel [hisher] mighty horsemeat bulging almost double its girth as the first huge wave of cum erupts from [hisher] overstuffed balls, forcing your clasping fingers apart as it rushes out of [hisher] cumslit. Your stray hand, busily teasing the jutting flare, is too close to the liquid explosion, and you can feel thick wet warmth washing over your [skin] as it is soaked in this first eruption - the first of many, judging by the way you can feel [hisher] shaft bulging again...", parse);
					Text.NL();
					Text.Add("At the same time, an equally impressive wave of femcum splashes against your face, washing over your cheeks and running down your chin as you frantically try to keep up with it. Spice-tinged sweetness envelops your tongue and makes your head swim, exhorting you to drink your fill.", parse);
					Text.NL();
					Text.Add("Even as you guzzle down Terry’s honey, your hands don’t fall idle. As best you can, you milk the [foxvixen]’s pulsing member, heedless of the cum that soaks your fingers as you play with [hisher] flare. Every vein in [hisher] length is bulging against your skin, knot swollen and throbbing with the need to anchor the [foxvixen]’s mighty stallionhood in a warm hole and breed it. Even with your face buried in between Terry’s thighs, you can still hear the liquid gurgling and splashing as [hisher] balls violently empty themselves onto the ground.", parse);
					Text.NL();
					Text.Add("That only drives you on in your efforts. Your mouth wrapped around [hisher] mound as best you can, you swallow desperately in an effort to keep up with the tidal wave of femcum pouring down your throat. It pours down your gullet, coating your innards with a thick glaze of rich nectar and sloshing around inside your belly. It feels so good, filling you with a warmth that is almost sexual in itself.", parse);
					Text.NL();
					Text.Add("Even Terry has [hisher] limits, however. With a long, wavering sigh of release, [heshe] belches forth one last gobbet of cum and goes limp, slumping against you for support as [hisher] clenched cunny finally falls slack.", parse);
					Text.NL();
					Text.Add("You take a few moments to finish licking off any stray streamers and help the [foxvixen] lie down, away from the mess [heshe] created [himher]self.", parse);
					Text.NL();
					if(player.SubDom() >= 25) {
						Text.Add("Carefully, you set Terry down on [hisher] back and pat the panting [foxvixen]’s head. That’s a good pet.", parse);
						Text.NL();
						Text.Add("Terry just coos in response.", parse);
						Text.NL();
						Text.Add("There’s just one last detail…", parse);
						Text.NL();
						Text.Add("<i>“What?”</i> [heshe] asks, looking at you.", parse);
						Text.NL();
						Text.Add("You present your hand, plastered with [hisher] cum, to [himher]. [HeShe] made quite a mess, you tell [himher]. It’s only fair that [heshe] cleans it up, right?", parse);
						Text.NL();
						Text.Add("Terry looks at your hand, then back at you, and finally [heshe] sighs. <i>“Okay...”</i>", parse);
						Text.NL();
						Text.Add("That’s a good [boygirl].", parse);
						Text.NL();
						Text.Add("[HeShe] extends [hisher] hands, grabbing yours by the wrist and bringing it closer so [heshe] can clean it up properly.", parse);
						Text.NL();
						Text.Add("You watch as the pet [foxvixen] begins gently lapping your palm, then your finger, then the back of your hand. [HeShe] doesn’t seem too enthusiastic at first, but that quickly changes as [heshe] continues to service you. Terry is very thorough, fellating each individual digit to ensure not a single smear of [hisher] climax remains.", parse);
						Text.NL();
						Text.Add("Very nice work, you purr, admiring your clean hand. Such a good [boygirl], to work so hard. And a good little [foxvixen] deserves a reward.", parse);
						Text.NL();
						Text.Add("<i>“Huh?”</i>", parse);
						Text.NL();
						Text.Add("Without further ado, you swoop down on Terry and claim [hisher] lips, boldly thrusting your [tongue] into [hisher] mouth as deep as you can. ", parse);
						if(player.LongTongue())
							Text.Add("Your inhumanly long tongue plunges down Terry’s gullet, staking a claim [heshe] cannot hope to contest.", parse);
						else
							Text.Add("It wrestles Terry’s tongue to the floor of [hisher] mouth, indisputably asserting your ownership.", parse);
						Text.NL();
						Text.Add("A muffled noise bubbles from Terry’s lips to yours, and you possessively embrace him, locking your faces together. [HeShe] struggles a little, but purely on instinct. As you drape yourself over [himher], [heshe] quiets down, moaning softly into your mouth as you stake your claim.", parse);
						Text.NL();
						Text.Add("Slowly, you break the kiss, letting Terry suckle your tongue for a moment before pulling away. Smirking down at your vulpine pet, you ask if [heshe] liked [hisher] reward.", parse);
						Text.NL();
						Text.Add("[HeShe] simply nods wordlessly, panting to try and catch [hisher] breath.", parse);
						Text.NL();
						Text.Add("You thought [heshe] would. Now, you think the both of you could use a little nap.", parse);
						Text.NL();
						Text.Add("Daintily, you lay your head down on Terry’s chest, using ", parse);
						if(terry.Cup() < TerryFlags.Breasts.Acup)
							Text.Add("[hisher] fluffy chest", parse);
						else
							Text.Add("[hisher] [tbreasts]", parse);
						Text.Add(" as a makeshift pillow. As you close your eyes, you affectionately hug [himher] closer.", parse);
						Text.NL();
						if(terry.Relation() < 30)
							Text.Add("As you start to drift away, you feel [hisher] arms hesitantly wrap around you in return.", parse);
						else
							Text.Add("Terry hugs you back, quite content to catch some rest [himher]self. The last thing you feel before drifting off is the [foxvixen]’s tail affectionately brushing against your [legs].", parse);
					}
					else if(player.SubDom() <= -25) {
						Text.Add("Reverently, you lay the panting [foxvixen] down on [hisher] back. Smiling, you thank Terry for sharing [hisher] sweet honey with you; it was delicious.", parse);
						Text.NL();
						Text.Add("Terry simply groans in response.", parse);
						Text.NL();
						Text.Add("Looks like you really tired [himher] out, poor thing... but [heshe] certainly doesn’t seem to mind. Cheerfully, you note that Terry really is a generous soul. You’ll have to do this again sometime.", parse);
						Text.NL();
						Text.Add("Terry groans again in reply, but looking down, you see that [heshe] isn’t too put out by the idea. [HisHer] thick, juicy member is still poking from its sheath, half-erect and bobbing slightly as [heshe] breathes. Seeing the cum still oozing across its skin makes you lick your lips. It’s a little greedy, but... you think you can fit just a little more in...", parse);
						Text.NL();
						Text.Add("Kneeling down, you gently spread the [foxvixen]’s legs and settle yourself between Terry’s thighs, lowering your head until you are practically nose to tip with [hisher] equine shaft. Your eyes flutter closed as you inhale, drinking in Terry’s scent. The thick smell of sex fills the air around your [face], masculine musk undercut by just a hint of Terry’s well-licked cunt. It smells so good...", parse);
						Text.NL();
						Text.Add("Your hungry [tongue] glides out over your lips, already dripping in your eagerness. You swing it lightly through the air, brushing its [tongueTip] against Terry’s still-swollen knot before dragging a long path up [hisher] shaft. The taste of warm [foxvixen] cream explodes on your tongue, its salty goodness making you shiver as it burns over your taste buds.", parse);
						Text.NL();
						Text.Add("A soft whimper escapes Terry’s muzzle, the [foxvixen] wriggling as if trying to squirm away from your teasing, but you can’t be denied. With soft, gentle laps, you slurp up the cum that has dripped down [hisher] cock, insistently running your tongue around the rim of Terry’s sheath.", parse);
						Text.NL();
						Text.Add("Satisfied with your cleaning, you eagerly drift up Terry’s shaft again, opening your mouth and gently swallowing as much of the [foxvixen]’s cock as you can fit. Terry mewls softly, shivering in your mouth as you suckle like a babe at the teat.", parse);
						Text.NL();
						Text.Add("Your tongue strokes and caresses, lips working to suck up every last drop of yummy goodness smeared over Terry’s tasty stallionhood. All too soon, it’s all vanished down your throat.", parse);
						Text.NL();
						Text.Add("So good… you knew there was a good reason you gave Terry this huge cock. [HeShe] fills your mouth so well, and the taste of [hisher] seed, combined with [hisher] juices, it’s simply divine. If only you could get a little more? Maybe… maybe you can? Surely [heshe]’s got more cream in these big, beautiful balls for you to wash down [hisher] honey with?", parse);
						Text.NL();
						Text.Add("Hopefully, you start to caress Terry’s balls, wishing that [heshe] can wring out just one last mouthful for you. [HeShe] gasps and whimpers, thrashing weakly as you molest [himher] with hand and mouth.", parse);
						Text.NL();
						Text.Add("From somewhere deep inside [himher]self, [heshe] finds the strength to cum again. A single thick burst of [hisher] wonderful creamy [foxvixen] seed rushing into your mouth and filling it to the brim. Your head swims as [hisher] essence drowns your taste buds, reluctant to swallow and end your savoring of this delicious treat.", parse);
						Text.NL();
						Text.Add("Inevitably, the siren call of your belly is too loud to ignore. You let Terry’s cum pour down your throat, swirling into your gullet and warming you from the inside out. You tenderly suck [hisher] cock clean, and then let it pop softly from between your lips before thanking Terry for [hisher] sweet generosity.", parse);
						Text.NL();
						Text.Add("All you get in reply is a soft sigh. Bemused, you lift your head higher, and then smile gently. Poor thing; Terry’s fallen asleep! You must have <b>really</b> been too much for [himher] to handle.", parse);
						Text.NL();
						Text.Add("Quietly as you can, you rise from between Terry’s legs and lie down beside the exhausted [foxvixen]. Carefully drawing [himher] into your arms, you smile down at [hisher] sleeping face. [HeShe] looks so peaceful like this. You tenderly brush a lock of hair out of [hisher] eye, then kiss [himher] softly on the lips. Finally, you nuzzle down into the crook of [hisher] shoulder and, after wishing [himher] sweet dreams, drift off to sleep yourself.", parse);
					}
					else {
						Text.Add("Carefully, you help Terry down to the ground, letting the spent [foxvixen] hang onto your shoulder for support before [heshe] rolls over onto [hisher] back. With a sigh of effort, you settle yourself down and playfully note that you’d ask if [heshe] enjoyed your efforts... but you think you have a pretty good idea already. You idly wipe your still-slimy hand off on the ground beside you as you say this.", parse);
						Text.NL();
						Text.Add("Terry simply groans in response, too worn out to formulate a proper reply.", parse);
						Text.NL();
						Text.Add("Poor [guygal]; you really wore [himher] out. Would [heshe] like to just rest here for a while?", parse);
						Text.NL();
						Text.Add("The [foxvixen] sighs softly, gently nodding [hisher] agreement.", parse);
						Text.NL();
						Text.Add("Well, you could use a bit of a rest too, so that’s alright with you. Before that, though... You reach out and pull Terry into your embrace, gently cuddling [himher] once you have [himher] in your grip. Terry doesn’t try to struggle, content to use your arm as a pillow as you snuggle in close.", parse);
						Text.NL();
						Text.Add("With your favorite fluffy pet in your arms, you close your eyes and allow yourself to drift off to sleep.", parse);
					}
				}
				else {
					Text.Add("The [foxvixen]’s dainty little cock is so small, it almost vanishes between your fingers as they lovingly encircle it. Not that you mind, though; it just means you’ll have to get... <i>creative</i>... when it comes to milking [himher].", parse);
					Text.NL();
					Text.Add("Grinning at the very thought, you flex your fingers, dexterously stroking the slowly darkening length of pink flesh with each fingertip in turn, tracing unearthly patterns over silken-smooth skin.", parse);
					Text.NL();
					Text.Add("Terry moans at your touch, [hisher] dainty cock growing stiff under your ministrations. The small knot fills up ever so slightly, and [hisher] little coin purse grows a bit heavier as [hisher] body works to produce the seed [heshe]’ll be spending shortly. A distinct scent of aroused vixen tickles your nose, and one look is all you need to confirm the source: Terry’s rapidly moistening folds.", parse);
					Text.NL();
					Text.Add("Your palm gently glides across the underside of Terry’s girlish prick, absently stroking [himher] as you savor the smell wafting towards your [face]. Almost lazily, you dip your head in closer and extend your tongue. The [foxvixen]’s ballsack jiggles as your [tongue] sweeps across it, the salt of [hisher] skin crackling across your taste buds before your [tongueTip] plunges into Terry’s folds.", parse);
					Text.NL();
					Text.Add("The taste of Terry’s nectar slowly creeps across your tongue, a sort of spicy sweetness that contrasts deliciously with the teasing taste of [hisher] maleness that you already got. It calls to you, begging you to greedily plunge your face into [hisher] muff and lick with all your might, but you hold yourself firm: you are better than that.", parse);
					if(terry.PussyVirgin())
						Text.Add(" Besides, Terry deserves a better way to pop [hisher] precious cherry.", parse);
					Text.NL();
					Text.Add("You glide slowly along Terry’s slit, slathering [hisher] netherlips with your tongue until they shimmer like pink pearls. Sliding your face to the bottom of Terry’s cunt, just above [hisher] trapsack, you playfully kiss [hisher] clit, insistently suckling on the herm [foxvixen]’s pleasure button.", parse);
					Text.NL();
					Text.Add("Terry gasps shrilly, instinctively clenching down on a dick that isn’t there. You can feel [hisher] heartbeat racing through the veins in [hisher] cock as it throbs against your fingers. The [foxvixen]’s hips pump on sheer auto-pilot, thrusting [hisher] dripping member against your palm in a clumsy attempt to grind it.", parse);
					Text.NL();
					Text.Add("Oh, [heshe] likes your hand, does [heshe]? Well, [heshe]’ll like this better...", parse);
					Text.NL();
					Text.Add("Your fingers curl inwards, looping into a crude O-shape with your palm, a makeshift onahole that Terry is more than happy to accept. You can feel [hisher] warm, soft skin gliding over your own as [heshe] bucks away, fucking the impromptu opening without a second thought.", parse);
					Text.NL();
					Text.Add("With each back-thrust, Terry mashes [hisher] cunt into your face, and you don’t hesitate to take advantage of it. Your tongue flicks out in shallow, broad laps, stroking just the outermost pair of the [foxvixen]’s netherlips. Terry’s pussy flutters like some obscene butterfly, trying to catch your tongue and draw it deeper inside.", parse);
					Text.NL();
					Text.Add("Unwilling to be caught so, your [tongueTip] nimbly evades Terry’s efforts and quests through [hisher] folds and crannies, sopping up the spicy-sweet feminine nectar pooling there. The taste of Terry’s cunt-juice burns a trail down your gullet, making your stomach growl impatiently for more.", parse);
					Text.NL();
					Text.Add("Your ears are filled with the chorus of Terry’s pleasure: the wet squelching of your tongue in [hisher] pussy, the slapping of [hisher] cock against your pre-soaked palm, the [foxvixen]’s cute little grunts and whimpers as [heshe] creeps ever closer to the edge.", parse);
					Text.NL();
					Text.Add("Oh, it’s such wonderful music. Your heart fills with pride that it’s your efforts that are driving Terry so wild, and it spurs you on to lick [himher] harder and faster than before. You can feel the [foxvixen]’s turgid knot battering against your fingers as [heshe] restlessly ruts your hand. You don’t need to see it to know it must be driving Terry mad, throbbing impatiently with its need to tie a bitch and fill her full of Terry’s seed. Well, you can do something about that...", parse);
					Text.NL();
					Text.Add("No sooner have your fingers uncurled, widening the gap Terry is trying so desperately to fit [hisher] dick into, than Terry shoves [hisher] cock home with a soft growl of satisfaction. You can feel the thick, swollen, throbbing flesh of [hisher] knot as it grinds over your slick fingers... and then, you pounce.", parse);
					Text.NL();
					Text.Add("Terry mewls in distress, instinctively trying to tug out again as your fingers spring closed, trapping [hisher] knot in your grip. You tighten your hold until you can feel it squish between your fingers, but it’s just not enough to push [himher] over the edge yet.", parse);
					Text.NL();
					Text.Add("You lift your face from the [foxvixen]’s womanhood and sink lower. Coaxingly, you coo at [himher] to cum for you before laying your lips on [hisher] aching coin purse. You suckle as hard as you dare, a perverse kiss that pulls one ball completely into the wet warmth of your mouth, letting your honey-caked tongue caress the tight-stretched skin.", parse);
					Text.NL();
					Text.Add("Terry convulses in your grip, grunting and moaning as [hisher] balls draw tight. <i>“Aaaahn!”</i> [heshe] cries out lasciviously.", parse);
					Text.NL();
					
					var cum = terry.OrgasmCum();
					
					Text.Add("The [foxvixen]’s ecstatic howl has barely begun to resound in your ears before you move. Impatiently, you spit out [hisher] ball so you can plunge your face into [hisher] cunt, greedily guzzling the small wave of female nectar that pours down your gullet. Still held tight in your hand, Terry’s cock spits seed onto the uncaring ground below, a small puddle forming lonely and ignored under [hisher] belly. You don’t allow a single drop of [hisher] precious pussy-juice to escape your lips, greedily swallowing all of it down your throat.", parse);
					Text.NL();
					Text.Add("With a whimpering sigh, Terry sags as the last of [hisher] climax washes out of [himher], a final dribble of cum flowing over your hand as it seeps out of [hisher] pointy cock-tip. Patiently, you clean [hisher] folds and then gently release [hisher] cock.", parse);
					Text.NL();
					parse["p"] = player.HasLegs() ? "" : " proverbial";
					Text.Add("Rising to your[p] knees, you tenderly help Terry down, laying yourself beside [himher]. Folding the tired [foxvixen] in your arms, you nuzzle up closer and warmly ask if [heshe] enjoyed that.", parse);
					Text.NL();
					if(terry.Relation() < 30) {
						Text.Add("<i>“Y-yeah, I did,”</i> [heshe] replies, panting.", parse);
						Text.NL();
						Text.Add("Good. You’re so glad to hear it.", parse);
					}
					else if(terry.Relation() < 60) {
						Text.Add("<i>“Very much,”</i> [heshe] says, still panting.", parse);
						Text.NL();
						Text.Add("Wonderful. Maybe you’ll have to do this for [himher] again in the future.", parse);
					}
					else {
						Text.Add("<i>“Hmm… I feel like you could’ve done better,”</i> [heshe] teases, still panting.", parse);
						Text.NL();
						if(terry.PussyVirgin()) {
							Text.Add("Oh? Does [heshe] want [hisher] cherry popped, hmm? Because that’s what a better job would have entailed.", parse);
							Text.NL();
							Text.Add("<i>“If I said yes, would you take me right here right now?”</i> [heshe] grins hopefully.", parse);
							Text.NL();
							Text.Add("Maybe... if [heshe] didn’t look like [heshe] was about to fall asleep on you. [HeShe] should get some rest. The two of you can discuss popping cherries later.", parse);
							Text.NL();
							Text.Add("<i>“Hey! I can total-”</i>", parse);
						}
						else {
							Text.Add("Maybe you could have, but then you wouldn’t have gotten your drink. And Terry-honey is far too yummy to pass up.", parse);
							Text.NL();
							Text.Add("<i>“That so? Well, you’ve had your fill, how about I get <b>my</b> fill now?”</i>", parse);
						}
						Text.NL();
						Text.Add("With a single swift motion, you roll Terry over in your arms, allowing your lips to swoop down and capture [hishers] in a passionate kiss. With a muffled near-purr of delight, the [foxvixen] loops [hisher] arms around your shoulders, pressing [hisher] [tbreasts] to your own [breasts] as [heshe] melts into your mouth. Only when the need for air becomes too insistent to ignore do you release Terry, tongue playfully stroking [hisher] lips as you recede.", parse);
						Text.NL();
						Text.Add("<i>“That’ll suffice for now.”</i> [HeShe] smiles.", parse);
					}
					Text.NL();
					Text.Add("Smiling contentedly, you bury your face into the crook of Terry’s shoulder and allow yourself to drift off, happy to catch some well-earned rest.", parse);
				}
				Text.Flush();
				
				terry.relation.IncreaseStat(75, 1);
				TimeStep({minute: 30});
				
				Gui.NextPrompt();
			}, enabled : true
		});
	}
	Gui.SetButtonsFromList(options, false, null);
}

TerryScenes.SexHaveADrinkCock = function() {
	let terry = GAME().terry;
	let player = GAME().player;

	var parse : any = {
		playername : player.name,
		foxvixen : terry.mfPronoun("fox", "vixen"),
		handsomebeautiful : terry.mfPronoun("handsome", "beautiful"),
		boygirl : player.mfTrue("boy", "girl"),
		mastermistress : player.mfTrue("master", "mistress"),
		sir : player.mfTrue("sir", "ma’am"),
		sirmadam : player.mfTrue("sir", "madam")
	};
	
	parse["stuttername"] = player.name[0] + "-" + player.name;
	
	parse = terry.ParserPronouns(parse);
	parse = terry.ParserTags(parse, "t");
	parse = player.ParserTags(parse);
	
	Text.Clear();
	Text.Add("You smile ", parse);
	if(player.sexlevel < 3)
		Text.Add("and try to feign confidence", parse);
	else
		Text.Add("confidently", parse);
	Text.Add(" as you advance upon the [foxvixen] and reach down to caress [hisher] balls. Terry ", parse);
	if(terry.Relation() < 30)
		Text.Add("flinches at your touch, barely managing to stay where [heshe] is.", parse);
	else if(terry.Relation() < 60)
		Text.Add("blushes in embarrassment at the gesture.", parse);
	else
		Text.Add("grins mischievously, flicking an ear in appreciation.", parse);
	Text.NL();
	Text.Add("Leaning closer, you stage-whisper that the [foxvixen] has a <i>very</i> yummy-looking cock.", parse);
	Text.NL();
	if(terry.Relation() < 30) {
		Text.Add("<i>“Okay? So...”</i>", parse);
		Text.NL();
		Text.Add("So, you want [himher] to feed you. You're craving cream, and you want [himher] to sate that craving.", parse);
		Text.NL();
		Text.Add("<i>“Oh… okay. I guess I can do that,”</i> [heshe] says, smiling a little.", parse);
		Text.NL();
		Text.Add("<i>“You should probably strip first, unless you don’t care about getting fox-cum all over your clothes.”</i>", parse);
		Text.NL();
		Text.Add("Well, you wouldn’t want to waste a delectable treat like that...", parse);
	}
	else if(terry.Relation() < 60) {
		Text.Add("<i>“Do I? And what would you like me to do with it?”</i> [heshe] asks, smirking as [heshe] enjoys you fondling [hisher] balls.", parse);
		Text.NL();
		Text.Add("Battering your [eyes] coyly, you coo back that you’d like it ever so much if [heshe] would feed you with [hisher] yummy, scrummy cock. You want [himher] to put it in your mouth and down your throat, to let you suck until all that warm, salty cum is in your belly.", parse);
		Text.NL();
		Text.Add("The [foxvixen]’s muzzle widens into a grin. <i>“It would be my pleasure.”</i>", parse);
		Text.NL();
		Text.Add("<i>“Now, how about you get naked first? Unless you want me marking you as well.”</i>", parse);
		Text.NL();
		Text.Add("It’s a tempting thought, you quip back, tapping a finger against your lips as you contemplate it, then you grin wider and shake your head. No, you think you’ll strip down - this time.", parse);
	}
	else {
		Text.Add("<i>“I think I know what you’re getting at here, but I’d still like to hear you say it.”</i> [HeShe] grins.", parse);
		Text.NL();
		Text.Add("You reply with a flat look, leaning closer to stare [himher] square in the eyes. Without blinking, you tell [himher] to feed you [hisher] cock. And that’s an <b>order</b>.", parse);
		Text.NL();
		Text.Add("Terry gasps softly as [heshe] feels [hisher] collar tighten ever so slightly. <i>“Oh, you cocky bastard,”</i> [heshe] replies with a big grin.", parse);
		Text.NL();
		Text.Add("You smirk back and nod your agreement.", parse);
		Text.NL();
		Text.Add("<i>“Well, you asked for it, so you’re gonna get it!”</i> With a swift lunge, Terry presses [hisher] lips to your own, kissing you passionately. [HisHer] tongue tangles with yours for an instant, before [heshe] breaks the kiss. <i>“Come on, strip!”</i>", parse);
		Text.NL();
		Text.Add("With a shake to clear your thoughts, you chuckle softly. Well, if [heshe] insists...", parse);
	}
	Text.NL();
	
	terry.relation.IncreaseStat(40, 1);
	
	Text.Add("You take a step back from Terry and reach for your [armor]. ", parse);
	if(player.sexlevel < 3) {
		Text.Add("Without hesitation you start to peel it off, tossing it aside in your eagerness to begin.", parse);
	}
	else if(player.sexlevel < 6) {
		Text.Add("Though excited, you don’t forget that Terry deserves a little presentation, too. You remove your gear as slowly as you can bear to do so, letting [himher] ogle each precious inch of [skin] as you cast your things aside.", parse);
		
		terry.AddLustFraction(0.25);
	}
	else {
		Text.Add("Of course, you’re not going to just rush into this. Even undressing can be something to savor...", parse);
		Text.NL();
		Text.Add("With a mischievous smile on your lips, you make your stripping as leisurely as possible, letting Terry bask in the unveiling of each delicious inch of your body. You twist and turn, coaxing [hisher] excitement and ensuring that [heshe] can see all of your glory as it is revealed.", parse);
		
		terry.AddLustFraction(0.5);
	}
	Text.NL();
	Text.Add("Now naked, you place a hand on your hips and beckon to [himher] with the other. A coy smile on your lips, you ask the [foxvixen] how [heshe]’d like you to receive [himher].", parse);
	Text.Flush();
	
	Gui.NextPrompt(function() {
		Text.Clear();
		if(terry.Relation() < 30) {
			Text.Add("<i>“Umm… I’m not sure...”</i> [heshe] trails off.", parse);
			Text.NL();
			Text.Add("You wonder for a second if [hisher] uncertainty is genuine or due to nerves. Still, better to nip this in the bud, lest it sour the mood. With your warmest smile, you suggest that you could lie on your back and allow [himher] to straddle your chest - that way, you can be sure to suck up every last drop of tasty, salty cream.", parse);
			Text.NL();
			Text.Add("<i>“Okay, I guess that works.”</i>", parse);
		}
		else if(terry.Relation() < 60) {
			Text.Add("<i>“Any way is fine for me,”</i> [heshe] replies with a smile.", parse);
			Text.NL();
			Text.Add("You chuckle at [hisher] words. What a sweetheart [heshe] is, but if [heshe] really feels like leaving it up to you... you want to lay down and let [himher] get on top to make sure [heshe] can feed you everything [heshe]’s got. Is [heshe] fine with that, hmm?", parse);
			Text.NL();
			Text.Add("<i>“Sounds perfect for me, but don’t blame me if I decide I want a little more action while I’m topping you.”</i> [HeShe] grins.", parse);
			Text.NL();
			Text.Add("Giggling softly, you reply that if [heshe] can think about doing that whilst feeding you, [heshe] can go right ahead.", parse);
		}
		else {
			Text.Add("<i>“With a smile, an open mouth, and your tongue lolling out. Cherry on top for bonus points.”</i>", parse);
			Text.NL();
			Text.Add("You laugh at that; you really walked right into that one, didn’t you?", parse);
			Text.NL();
			Text.Add("Terry simply grins back.", parse);
			Text.NL();
			Text.Add("Alright then; is [heshe] okay with being on top and feeding [himher]self to you?", parse);
			Text.NL();
			Text.Add("<i>“I’m fine with any position, [playername]. Now, how about you get to it? You ordered me to feed you, not stand here naked,”</i> [heshe] teases you.", parse);
			Text.NL();
			Text.Add("Patience, you chide, grinning widely as you playfully wave a finger at the [foxvixen].", parse);
		}
		Text.NL();
		var wings = player.HasWings();
		if(wings) parse["wings"] = wings.Short();
		parse["w"] = wings ? Text.Parse(", taking a moment or two to get your [wings] properly positioned", parse) : "";
		Text.Add("Decision made, you lie down flat on your back[w]. Once comfortable, you smile up at your vulpine partner and beckon [himher] to approach.", parse);
		Text.NL();
		
		//Big split
		
		if(terry.HorseCock() && player.FirstBreastRow().Size() > 5) {
			Text.Add("Terry saunters over and gingerly straddles you, letting [hisher] stallionhood plop between your [breasts].", parse);
			Text.NL();
			Text.Add("<i>“Err...”</i>", parse);
			Text.NL();
			if(terry.Relation() < 30)
				Text.Add("Poor little [foxvixen]; [heshe] looks like [heshe]’s still waiting for the other boot to drop. Still, you can fix that...", parse);
			else if(terry.Relation() < 60)
				Text.Add("You bite back a chuckle; sweet little [foxvixen], [heshe] just looks so lost. Well, you can help [himher] with that...", parse);
			else
				Text.Add("Aw, how cute; [heshe]’s still so easy to embarrass, even after all you’ve done together. But that’s just part of [hisher] charms. Well, you know how to get [himher] in the proper mood...", parse);
			Text.NL();
			Text.Add("You reach out with one hand and tenderly take hold of the [foxvixen]’s stallionhood near the knot, lifting it from your [skin]. With the other hand, you start to run your fingertips over [hisher] length. Soft, warm skin glides under your fingers with each rhythmic stroke, coaxing [himher] into growing longer and firmer.", parse);
			Text.NL();
			Text.Add("Terry wriggles atop you at your touch, making you smile as [heshe] whimpers softly. A bead of pre-cum splatters in the canyon of your cleavage, the warm wetness drawing your attention back where it belongs. A long, thick rod of mottled brown flesh bobs in the air before you, just waiting for you to start sucking.", parse);
			Text.NL();
			Text.Add("With a tempting target like that, you can’t resist; you stick out your [tongue] and give the glans a wet slurp. You savor the taste of pre-cum on your tongue as you lower the [foxvixen]’s mighty cock where it belongs. Your hands move to encompass your breasts with Terry’s stallionhood nestled between them, and you smile warmly up at your vulpine partner.", parse);
			Text.NL();
			Text.Add("It doesn’t take long for the [foxvixen] to get the message. Smiling to [himher]self, [heshe] grabs your [breasts] and push your soft mounds together, sandwiching [hisher] shaft as [heshe] gives an experimental thrust, causing [hisher] flat tip to bump on your chin.", parse);
			Text.NL();
			Text.Add("You close your eyes and arch your back, pushing out your ample tits even further. Your mouth falls open in a throaty moan of pleasure, [tongue] sliding and touching the blunt tip.", parse);
			Text.NL();
			Text.Add("Terry bucks a second time, causing [hisher] shaft to slide along your [tongue] and enter your mouth. <i>“Oh yeah… this is nice,”</i> [heshe] comments as the warm wetness of your mouth wraps around [hisher] tip.", parse);
			Text.NL();
			Text.Add("You respond with a muffled grunt of agreement, basking in Terry’s flavor as it washes across your tongue. The strange sweetness of pre-cum, mingled with a musky taste that is all Terry, cut with just a hint of salt...", parse);
			Text.NL();
			Text.Add("Purring with approval around Terry’s cock, you slowly lap at [hisher] glans, lips puckering as you suckle softly on [hisher] tip. This appetizer is nice, but you want more.", parse);
			Text.NL();
			Text.Add("Rather than feeding you more, Terry pulls back, popping [hisher] flat tip from your maw as [heshe] sets [himher]self up for another buck. [HeShe] settles into a brisk rhythm, sawing [himher]self into your bosom as [hisher] tip dips into your mouth.", parse);
			Text.NL();
			Text.Add("A spark of impatience flares inside your chest. Irked at the [foxvixen]’s obsession with your breasts, you reach out and grab [hisher] cock on the next thrust, pulling [hisher] cock deeper into your wet, waiting maw and refusing to let go.", parse);
			Text.NL();
			Text.Add("Terry groans in both pleasure and discomfort for a moment, before [heshe] gives in and scoots over. <i>“Hng, alright, alright! I got it. You want me to get closer. Geez, no need to be so pushy!”</i> [heshe] says, settling down so [hisher] balls lie flush with your [breasts].", parse);
			Text.NL();
			Text.Add("You voice a muffled groan of pleasure at the [foxvixen]’s reaction, and you leisurely suckle at [hisher] shaft to thank [himher].", parse);
			Text.NL();
			Text.Add("Once [heshe]’s sure you’re satisfied, [heshe] resumes thrusting, starting off slow at first, but steadily building up to [hisher] previous pace. Spurts of pre wash away down your throat as each pump beckons a lick, and each lick beckons a fresh spurt.", parse);
			Text.NL();
			Text.Add("You close your eyes to better focus on your task. Terry’s labored breathing as [heshe] inches ever closer to [hisher] climax is like music to your [ears]. You know that if you keep this up, it won’t be long before the [foxvixen] delivers your promised load of fox-cream.", parse);
			Text.NL();
			Text.Add("<i>“Ahn! [playername]! I don’t think- Ooh! That feels good!”</i>", parse);
			Text.NL();
			Text.Add("You simply slurp wetly in response, tongue worming as it escapes the seal of your lips to further caress the neglected prick-flesh beyond. Your mouth ripples, swirling the mixture of saliva and pre-cum around Terry’s cock with lewd squelching sounds.", parse);
			Text.NL();
			Text.Add("You know that [heshe]’s getting closer, and your own lust is burning inside of you. Your heart pounds a tattoo against your ribs, matching the tempo you can feel through the veins pulsing against your tongue.", parse);
			Text.NL();
			Text.Add("Your hands reach for your breasts, laying themselves over Terry’s hands. You push back and forth with the [foxvixen], coaxing [himher] to thrust harder and harder. When [heshe] is fast enough for you, you release [hisher] hands and reach for [hisher] balls instead.", parse);
			Text.NL();
			Text.Add("You can feel the seed churning into a froth inside the taut skin as you roll and massage them. They’re so full that it almost makes your head swim, just aching to let go.", parse);
			Text.NL();
			Text.Add("Well, you’re not going to keep your sweet little pet waiting. You suck with all your might, gulping away at [hisher] cock like a [boygirl] possessed.", parse);
			Text.NL();
			Text.Add("<i>“Ack! I can- cumming!”</i> [heshe] exclaims as [hisher] cock throbs one last time and tenses in preparation for the first blow.", parse);
			Text.NL();
			
			var cum = terry.OrgasmCum();
			
			Text.Add("Almost like a teaser as to what’s to come, a thick gobbet of cum spatters across your tongue, making your senses reel with its rich, salty taste. Avidly, you suck all the harder, determined to feed to your heart’s content as Terry cries out and erupts inside of your mouth.", parse);
			Text.NL();
			if(player.sexlevel < 3) {
				Text.Add("The tidal wave of cum that washes into your mouth is more than you can hope to contain. You desperately gulp and swallow, slurping huge mouthfuls of spooge, but you just can’t keep up with Terry’s output. As your belly swells, skin stretching taut and protesting at being so abused, it only gets harder for you to swallow.", parse);
				Text.NL();
				Text.Add("Finally, you can’t take it anymore; a spurt of cream slips down the wrong pipe and you start to splutter and choke. You unthinkingly grab Terry’s cock and pull it from your mouth to allow you can breathe.", parse);
				Text.NL();
				Text.Add("Terry isn’t even half-finished however, and launches another cascade of cum blasts you in the [face]. [HisHer] pulsating organ sprays you down indiscriminately, drenching your face and pouring down onto your [breasts]. [HeShe] is squelching with each thrust, and still [heshe] keeps on cumming.", parse);
				Text.NL();
				Text.Add("Finally, Terry’s prodigious balls run dry. A final spurt belches from [hisher] half-flaccid cock, spattering on your cheek. With a sigh of relief, Terry goes limp.", parse);
				Text.NL();
				Text.Add("You are a mess and a half; your face and upper torso is painted cum-white in thick layers of [foxvixen]-jizz.", parse);
				Text.NL();
				if(terry.Relation() < 30) {
					Text.Add("<i>“Umm… sorry?”</i> [HeShe] grins nervously.", parse);
					Text.NL();
					Text.Add("You wipe a smear of goo from your cheek and flip it away, smiling and assuring [himher] that there’s no need to be sorry. You should have remembered just how much those stallion-balls of [hishers] hold...", parse);
					Text.NL();
					Text.Add("<i>“Right… well… maybe I should get off you?”</i>", parse);
					Text.NL();
					Text.Add("That would be nice, yes.", parse);
					Text.NL();
					Text.Add("Terry promptly gets up and steps away, letting [hisher] glistening shaft slowly recede back into its sheath.", parse);
					Text.NL();
					Text.Add("<i>“So, are we done?”</i>", parse);
				}
				else if(terry.Relation() < 60) {
					Text.Add("<i>“Bit more than you could chew, huh?”</i> Terry asks with a smirk.", parse);
					Text.NL();
					Text.Add("With a soft chuckle, you confess that it seems like you did. You may need to get a bit more practice at this if you want to have a hope of containing it all.", parse);
					Text.NL();
					Text.Add("<i>“If you need help practicing count me in,”</i> [heshe] says with a big grin.", parse);
					Text.NL();
					Text.Add("A chuckle escapes you, and you confess that you knew [heshe]’d say that. You promise to keep that in mind, but for now, if [heshe]’d mind getting off?", parse);
					Text.NL();
					Text.Add("<i>“I think I can accommodate,”</i> [heshe] replies, getting up and letting [hisher] dangling shaft caress your cheek as [heshe] does.", parse);
					Text.NL();
					Text.Add("<i>“That was really nice, thanks.”</i>", parse);
					Text.NL();
					Text.Add("Anytime.", parse);
					Text.NL();
					Text.Add("<i>“Anything else I could do for you?”</i>", parse);
				}
				else {
					Text.Add("<i>“Well, well, darling. Seems like you got what you ordered.”</i> [HeShe] giggles.", parse);
					Text.NL();
					Text.Add("Everything you ordered and then some, you agree.", parse);
					Text.NL();
					Text.Add("<i>“Always happy to please,”</i> [heshe] says with a smile.", parse);
					Text.NL();
					Text.Add("Grinning, you note that [heshe] most certainly is. Now, is [heshe] finished playing with your boobies yet?", parse);
					Text.NL();
					Text.Add("<i>“Hmm… no?”</i> [heshe] replies, still fondling your [breasts] and sandwiching [hisher] cock.", parse);
					Text.NL();
					Text.Add("In that case, you’ll just have to order [himher] off.", parse);
					Text.NL();
					Text.Add("Terry’s collar glows a bit as it tightens slightly. <i>“Party pooper,”</i> [heshe] complains with a pout.", parse);
					Text.NL();
					Text.Add("[HeShe]’ll get over it. Now, off.", parse);
					Text.NL();
					Text.Add("<i>“As you wish,”</i> [heshe] replies while moving to do as you ordered, but not before rubbing [hisher] flaccid shaft on your cum-stained cheek.", parse);
					Text.NL();
					Text.Add("Cheeky [foxvixen]...", parse);
					Text.NL();
					Text.Add("<i>“Anything else I can do for you, [mastermistress]?”</i> [heshe] asks with a teasing grin.", parse);
				}
				Text.Flush();
				
				TimeStep({minute: 30});
				
				TerryScenes.TerryCleansPC();
			}
			else if(player.sexlevel < 5) {
				Text.Add("Even to someone with your experience, the geyser of semen erupting from Terry’s cock is a little overwhelming.", parse);
				Text.NL();
				Text.Add("Nonetheless, you won’t be beaten by a little cum... okay, a lot of cum. With fervent desire, you suck for all you’re worth, trying to make your swallows match each great spurt of jism flooding your mouth.", parse);
				Text.NL();
				Text.Add("Above your head, Terry mewls and shudders, lost in the throes of [hisher] climax as you busy yourself drinking the result. Your stomach grows tighter with each mouthful, tingling in a sensation that is pleasant, if odd, and a little distracting.", parse);
				Text.NL();
				Text.Add("But you won’t give up so easily as that. Even as you feel yourself stretching over your titanic liquid repast, you do your best to keep on sucking. Terry tastes too good to waste if you can avoid it.", parse);
				Text.NL();
				Text.Add("Unfortunately, eager as you are, even your stomach has its limits. By the time Terry is starting to lose steam, you feel too bloated to swallow. The last few sluggish spurts puddle in the back of your mouth, bulging your cheeks before spilling between your slack lips and drooling down your cheek and over Terry’s now-slack cock.", parse);
				Text.NL();
				Text.Add("<i>“Aah, that hit the spot,”</i> [heshe] says, pulling away to let you breathe.", parse);
				Text.NL();
				Text.Add("You hiccup softly, then tell [himher] that you’re happy you could help.", parse);
				Text.NL();
				if(terry.Relation() < 30) {
					Text.Add("<i>“Sorry about the mouthful, it just felt too good,”</i> [heshe] says apologetically.", parse);
					Text.NL();
					Text.Add("You assure [himher] that it’s alright. It’s sort of a compliment, really; [heshe] must have really enjoyed your mouth.", parse);
					Text.NL();
					Text.Add("<i>“Yeah, I did.”</i> [HeShe] smiles softly.", parse);
					Text.NL();
					Text.Add("Then that’s all that matters. Now, if [heshe] wouldn’t mind hopping off of you?", parse);
					Text.NL();
					Text.Add("<i>“Oh, sure!”</i> [HeShe] quickly hops to [hisher] feet and steps away.", parse);
					Text.NL();
					Text.Add("No longer pressed to the ground, you pull yourself upright and use your hand to scrub away the smears of cum that have stained your face and chest.", parse);
				}
				else if(terry.Relation() < 60) {
					Text.Add("<i>“I figure this is enough for you? If you want more, you’re gonna have to wait a bit.”</i> [HeShe] grins.", parse);
					Text.NL();
					Text.Add("Hiccuping again, you confess that you’ve had your fill for now, thanks.", parse);
					Text.NL();
					Text.Add("<i>“Thought so, hehe.”</i>", parse);
					Text.NL();
					Text.Add("You’re glad [heshe] finds this funny. Now, how about [heshe] gets off of you, hmm?", parse);
					Text.NL();
					Text.Add("<i>Aww, just when I was getting comfy,”</i> [heshe] teases, getting back on [hisher] feet and stepping away.", parse);
					Text.NL();
					Text.Add("You’ll be happy to snuggle [himher] later, when your stomach feels a little less bloated. Terry simply smiles at you, offering you a hand to help you clamber upright. You wipe the back of your arm across your mouth to remove the worst of the stains from your chin.", parse);
				}
				else {
					Text.Add("<i>“How do you like your order of special fox-cream? I can see that you still couldn’t handle all of it,”</i> [heshe] teases pointing at your cum-stained chin.", parse);
					Text.NL();
					Text.Add("You chuckle and lick your chin as best you can. You’ll just have to get better, if [heshe]’s going to keep on serving you up a bounty like this.", parse);
					Text.NL();
					Text.Add("<i>“Well, you know what they say, practice makes perfect, so just keep sucking my dick and you’ll eventually get it.”</i> [HeShe] chuckles", parse);
					Text.NL();
					Text.Add("For [himher]? You’d be happy to practice as much as [heshe] wants.", parse);
					Text.NL();
					if(terry.Slut() < 15) {
						Text.Add("<i>“Well, I guess I’d best get off and let you clean that up.”</i>", parse);
						Text.NL();
						Text.Add("You almost want to protest, but the truth is your stomach is a little sensitive. So, you nod your agreement to Terry’s statement, and the [foxvixen] carefully hops off of you.", parse);
						Text.NL();
						Text.Add("Once Terry is up, you take a deep breath to steel yourself, and then start to clamber upright. Terry is quick to step in and lend you a hand to get upright, and then produces a towel for you to wipe yourself off with.", parse);
					}
					else {
						Text.Add("<i>“Come here then, let me help you clean up,”</i> Terry says, bending over to lick your chin clean.", parse);
						Text.NL();
						Text.Add("You start to chuckle, but you're quickly stifled as Terry’s tongue slurps over your lips and plunges inside without hesitation. You moan softly as the [foxvixen] greedily devours your mouth, [hisher] tongue easily wrestling your own tired tongue into submission despite your efforts.", parse);
						Text.NL();
						Text.Add("Lost in the kiss, you reach up and gently stroke [hisher] long, luscious locks. When [heshe] breaks the kiss, you sigh softly.", parse);
						Text.NL();
						Text.Add("<i>“There, all clean,”</i> [heshe] states, caressing your cheek and then getting back on [hisher] feet.", parse);
						Text.NL();
						Text.Add("You just chuckle softly, and pull yourself upright, with a little help from Terry’s offered hand, of course.", parse);
					}
				}
				
				terry.slut.IncreaseStat(45, 1);
			}
			else {
				Text.Add("No ordinary lover could hope to keep up with the jizz-volcano that is Terry’s erupting stallionhood. But you are no ordinary lover; your throat trained to take semen pouring down it like a flash flood, your stomach accustomed to the feel of hot jism splattering against its walls, your tongue delighting in the rich saltiness of dickcream...", parse);
				Text.NL();
				Text.Add("You meet Terry’s climax suckle for spurt, gulp for gush. The taste of [himher] floods your senses and makes your head spin; [heshe] tastes so <b>good</b>! Greedily, you guzzle all [heshe] has to give you; the feel of your belly stretching to hold it all sends pleasure washing through your nerves and drenches your brain, making you suck all the harder. You want it all - you <b>need</b> it all!", parse);
				Text.NL();
				Text.Add("Terry gasps and groans, eager to feed your insatiable appetite for [hisher] seed, but even [hisher] bountiful balls have their limits. They surrender first in light of your fierce hunger.", parse);
				Text.NL();
				Text.Add("Slowly, the tidal wave begins to ebb, until only a few pitiful trickles slide down your throat. Still wrapped up in the euphoria, you suckle a little harder, but all that it elicits are a few soft moans from your lover. Forced to admit there’s nothing left, you do your best to lick Terry’s cock clean and then open your mouth so that [heshe] can slide it out.", parse);
				Text.NL();
				Text.Add("<i>“Ahh, that was great,”</i> Terry remarks, pulling away.", parse);
				Text.NL();
				Text.Add("You grin and assure [himher] that you endeavor to please, stifling a burp.", parse);
				Text.NL();
				if(terry.Relation() < 30) {
					Text.Add("<i>“I suppose you want me to get off of you?”</i>", parse);
					Text.NL();
					Text.Add("With a nod, you agree that would probably be for the best.", parse);
					Text.NL();
					Text.Add("Terry wastes no time in complying, extending a helping hand to help you up.", parse);
					Text.NL();
					Text.Add("You happily accept it and are soon upright again, your over-stuffed stomach quietly sloshing before its contents settle down again.", parse);
				}
				else if(terry.Relation() < 60) {
					Text.Add("<i>“Impressive, you drank all of it! And not a drop spilled to boot.”</i>", parse);
					Text.NL();
					Text.Add("Naturally. You’re not some scared little virgin; you know your way around a cock. Even one as big and juicy as Terry’s.", parse);
					Text.NL();
					Text.Add("<i>“Ha! Don’t get cocky now. One of these days I might decide to one-up you and then we’ll see how much you can handle.”</i>", parse);
					Text.NL();
					Text.Add("You chuckle softly. Sounds like it could be fun, but at the moment, it looks like [heshe]’s all empty.", parse);
					Text.NL();
					Text.Add("<i>“Yeah, for now. Gimme a bit and I’ll have a fresh load for you tho,”</i> [heshe] replies, rubbing your soft mounds together and stroking [hisher] shaft in the process.", parse);
					Text.NL();
					Text.Add("You groan luxuriantly at the [foxvixen]’s touch, and then shake your head. As fun as that sounds, you do have other things you need to do right now. Would [heshe] mind getting off, please?", parse);
					Text.NL();
					Text.Add("<i>“Alright then. Maybe another time?”</i>", parse);
					Text.NL();
					Text.Add("You nod and assure [himher] that you’ll look forward to it.", parse);
					Text.NL();
					Text.Add("Terry promptly gets back on [hisher] feet and hops off. Then [heshe] turns to you and offers you a helping hand.", parse);
					Text.NL();
					Text.Add("You gladly reach out for it, allowing the [foxvixen] to support you as you clamber upright. Your stomach visibly ripples and churns at the motion before settling down once you stop moving.", parse);
				}
				else {
					Text.Add("<i>“I trust your meal was adequate, [sir]?”</i>", parse);
					Text.NL();
					Text.Add("You playfully purse your lips and feign thinking about it. Well, the taste was exquisite, the server attentive... you drum your fingertips on your bulging stomach and cheekily proclaim that the servings maybe could have been a little more generous, but all in all, you thought the meal was quite delightful.", parse);
					Text.NL();
					Text.Add("Terry laughs at your reply. <i>“More generous, huh? Those are fighting words, [playername].”</i>", parse);
					Text.NL();
					Text.Add("Oh, really? So what is [heshe] doing to do about them, hmm?", parse);
					Text.NL();
					Text.Add("<i>“For now, nothing. But I’ll strike when you least expect it, just you wait.”</i> Terry grins. <i>“My vengeance shall be swift and merciless.”</i>", parse);
					Text.NL();
					Text.Add("Oh, now you’re just terrified. You chuckle softly, undercutting any seriousness that might have slipped through your playful tone. Now, how about [heshe] hops up, hmm? As much as you like to cuddle your lovely pet, this isn’t the best position to do so from.", parse);
					Text.NL();
					Text.Add("<i>“Really, because I feel pretty comfy up here,”</i> [heshe] teasingly replies, even adjusting [himher]self on top of you for emphasis.", parse);
					Text.NL();
					Text.Add("You heave an exaggerated sigh, rolling your eyes. Looking Terry squarely in the eyes, you tell [himher], <i>“Off. Now.”</i> The firm tone of your voice isn’t enough to trigger the collar, but it does make it glow in warning.", parse);
					Text.NL();
					Text.Add("<i>“Aww, you’re no fun.”</i> Terry pouts, finally complying. Once [heshe]’s off you, [heshe] offers a helping hand.", parse);
					Text.NL();
					Text.Add("With Terry’s help, you soon join [himher] in the ranks of the upright, even if it is a little harder to get up than you anticipated. You have gained quite a lot of weight in the past few minutes, after all. But never mind, it was worth it, and besides, you’ll slim down soon enough.", parse);
					if(terry.flags["vengeance"] < TerryFlags.Vengeance.Triggered)
						terry.flags["vengeance"] = TerryFlags.Vengeance.Triggered;
				}
			}
			Text.Flush();
			
			player.AddSexExp(2);
			terry.AddSexExp(2);
			
			TimeStep({hour: 1});
			
			Gui.NextPrompt();
		}
		else if(terry.HorseCock()) {
			if(terry.Relation() < 30) {
				Text.Add("Terry begins by straddling you, then pushing [hisher] stallionhood down to make it level with your [face].", parse);
				Text.NL();
				Text.Add("Sensing [hisher] hesitation, you grab [himher] by the hips and pull [himher] towards you, smiling when you feel the flat tip of [hisher] pre-cum leaking [tcock] touch your lips.", parse);
				Text.NL();
				parse["v"] = terry.FirstVag() ? ", despite having a hint of female due to Terry’s womanly bits currently soaking your torso" : "";
				Text.Add("Being this close to Terry’s shaft, you can smell [hisher] musk. A heady male musk[v].", parse);
				Text.NL();
				Text.Add("You can feel your mouth watering already, and without hesitation, you grip Terry’s butt and pull [himher] towards you, opening your maw to take in [hisher] flat tip.", parse);
			}
			else if(terry.Relation() < 60) {
				Text.Add("Terry grins as [heshe] straddles you, stroking [hisher] equine prick and milking a few drops of pre that slide along the length of [hisher] shaft. <i>“Here’s your order, [sir],”</i> [heshe] says teasingly.", parse);
				Text.NL();
				Text.Add("Hmm, it all seems to be in order, but you won’t know until you’ve tasted it. Terry’s not getting tipped unless [heshe] gets all points right.", parse);
				Text.NL();
				Text.Add("<i>“Oh, [playername], for you? Just open wide and I’ll show you <b>all</b> the points. Can’t disappoint my favorite customer, can I?”</i>", parse);
				Text.NL();
				Text.Add("Indeed, [heshe] can’t. Now then, it’s time for your snack! You open wide and let your tongue loll out as you welcome Terry’s [tcock] into your mouth.", parse);
			}
			else {
				Text.Add("Terry wastes no time straddling you and leaning down to give you a passionate kiss.", parse);
				Text.NL();
				Text.Add("[HeShe] makes sure to explore every inch of your mouth before finally breaking with a sigh. <i>“Just making sure you’re wet enough for this. Chafing’s not good, y’know?”</i>", parse);
				Text.NL();
				Text.Add("Sure, it’s not like you have saliva to keep your own mouth wet, you reply sarcastically.", parse);
				Text.NL();
				Text.Add("<i>“Very tasty saliva, I’ll add,”</i> [heshe] says, giggling and licking [hisher] chops.", parse);
				Text.NL();
				Text.Add("Good, but if you recall correctly, you ordered Terry to give you something tasty for yourself. One might think [heshe]’s stalling instead of doing what [heshe] was ordered…", parse);
				Text.NL();
				Text.Add("Terry moans as [hisher] collar begins glowing dimly, the effects of the collar’s magic already apparent in [hisher] pulsating, leaking horsehood.", parse);
				Text.NL();
				Text.Add("<i>“Alright, alright. No more stalling. Open wide and say aaah.”</i>", parse);
				Text.NL();
				Text.Add("You do just as [heshe] asked, and before you can even so much utter a syllable, the [foxvixen] stuffs your mouth with the flat tip of [hisher] stallionhood.", parse);
			}
			Text.NL();
			
			Sex.Blowjob(player, terry);
			player.FuckOral(player.Mouth(), terry.FirstCock(), 2);
			terry.Fuck(terry.FirstCock(), 2);
			
			Text.Add("The [foxvixen]’s taste floods your taste buds, a rich and creamy flavor that makes you hungry for more. Almost on reflex, your hands fly to Terry’s shaft, stroking [hisher] horse-dick, milking more of [hisher] precious load.", parse);
			Text.NL();
			Text.Add("Above you, Terry’s panting already, [hisher] hands gripping your shoulders for support. ", parse);
			if(terry.Relation() < 30)
				Text.Add("[HeShe] yips and groans as you continue to milk [hisher] shaft, but otherwise stays silent.", parse);
			else {
				parse["r"] = terry.Relation() >= 60 ? ", especially when I still haven’t carried out my orders" : "";
				Text.Add("<i>“E-easy there, [playername]. Not going anywhere[r],”</i> [heshe] teases.", parse);
			}
			Text.NL();
			Text.Add("You chuckle in response, sending vibrations rippling through [hisher] tip - the reward for your efforts is a fresh spurt of pre. Not keen on wasting such bounty, you immediately put your [tongue] to work and begin licking around Terry’s glans, tracing every single detail on that flat tip of [hishers].", parse);
			Text.NL();
			Text.Add("[HeShe] moans demurely, hips starting to move seemingly on their own. With slow, but needful, pumps. ", parse);
			if(player.Slut() < 30) {
				Text.Add("Normally, this would be fine for you, but you’re feeling a bit adventurous. You decide to give [hisher] cumvein an experimental lick.", parse);
			}
			else {
				if(terry.Relation() >= 30)
					Text.Add("Terry should know you better than that though. ", parse);
				Text.Add("This isn’t nearly enough to satisfy you, you need more! Without delay, you press your [tongue] against [hisher] cumvein and lick the inside of [hisher] urethra.", parse);
				if(terry.sexlevel >= 3)
					Text.Add(" You undulate and tease as far as you can reach, stimulating that opening with all your expertise.", parse);
			}
			Text.NL();
			Text.Add("Terry gasps and thrusts carelessly into your maw, perhaps a bit more forceful than [heshe] intended. It hurts a bit as it hits the back of your throat, ", parse);
			if(player.sexlevel < 5)
				Text.Add("and you wind up gagging as [heshe] spews forth a rope of pre straight down your throat, but thankfully [heshe] pulls out right afterwards.", parse);
			else
				Text.Add("but your trained mouth prevents any real damage. You just wind up swallowing a small rope of pre that [heshe] spews down your throat, not that this wasn’t the original plan anyway...", parse);
			Text.NL();
			Text.Add("Looking up, you gaze at Terry’s face as it turns from apologetic to lustful, almost desperately so. The reason is clear: [hisher] collar must’ve taken this reaction of [hishers] as an attempt to hurt you. As the dim glow fades, you can’t help but chuckle as [heshe] increases the speed of [hisher] pumping.", parse);
			Text.NL();
			Text.Add("Each time [heshe] pulls back, [hisher] cock spurts a coating of pre on your [tongue], lubing it up as [heshe] thrusts back inside your mouth. The added slickness mixed with your saliva allows [himher] to move ever faster, and you help [himher] along with encouraging pumps on [hisher] exposed shaft.", parse);
			Text.NL();
			Text.Add("Terry’s cock grows ever harder, [hisher] veins more pronounced against your tongue, the throbs become more intense and more frequent. It doesn’t take a master to figure out [heshe]’s just about to blow.", parse);
			Text.NL();
			Text.Add("<i>“[stuttername]! I’m going to- Ahn!”</i>", parse);
			Text.NL();
			Text.Add("Cum, yes. You’d tell [himher] to just let go and give you what you want, but you can’t really speak with a mouthful of horse-cock, so you decide you’ll have to show [himher] instead.", parse);
			Text.NL();
			if(player.sexlevel < 3) {
				Text.Add("You grip [hisher] shaft, spreading your fingers to trace along [hisher] veins as you begin working them to truly milk [hisher] shaft.", parse);
				Text.NL();
				Text.Add("<i>“Aaaahn!”</i> Terry cries out, half screaming, half moaning. As [hisher] [tcock] bulges out with the liquid torrent coursing within.", parse);
			}
			else if(player.sexlevel < 5) {
				Text.Add("With one hand, you grab [hisher] shaft, teasing [hisher] most sensitive spots. With the other hand, you grab [hisher] heavy balls, so full of cum they can barely contain all that tasty cream within.", parse);
				Text.NL();
				Text.Add("You fondle, roll them around, gently hefting them and letting go. Each time [hisher] balls become more and more taut, until you feel them practically churn under your touch. [HisHer] shaft bulging out with the imminent climax, tensing inside your mouth.", parse);
			}
			else {
				Text.Add("You suddenly grab [hisher] butt, spreading [hisher] cheeks apart.", parse);
				Text.NL();
				Text.Add("<i>“[playername]! Whaaaahn!”</i> Terry’s confusion turns into a moan of pure bliss as you stick your middle and index fingers inside [hisher] tight butthole, pushing deep inside to find that special spot hidden within.", parse);
				Text.NL();
				Text.Add("The effect is immediate. Terry’s stallionhood becomes impossibly hard, tensing and bulging out as the first jet spills into your mouth even before [hisher] ball are done churning.", parse);
			}
			Text.NL();
			
			var cum = terry.OrgasmCum();
			
			Text.Add("The torrential flood of white, hot, creamy fox-cum that follows fills your jaws in no time. Terry is absolutely delirious with pleasure, unable to do anything but thrust [himher]self as deep into your maw as [heshe] can.", parse);
			Text.NL();
			if(player.sexlevel < 3) {
				Text.Add("There’s simply no way you can contain the [foxvixen]’s jets. Each time [heshe] shoots inside you, it feels like a volcano’s erupting. It’s tasty, yes, but the quantity is a bit much. You don’t even know how you manage to take more than one jet as the second one threatens to brute force its way past your throat and into your belly.", parse);
				Text.NL();
				Text.Add("The third load is what proves to be your undoing. Already gagging from having more than a few inches of horse-meat shoved past your lips, you can’t stop yourself from pushing Terry away and withdrawing as some of [hisher] cream goes down the wrong pipe, nearly choking you with its sheer volume.", parse);
				Text.NL();
				Text.Add("You cough and sputter, trying to clear your throat as Terry’s cum continues to rain down on your face. The [foxvixen] having since lost [hisher] balance after you pushed [himher] can do nothing but shudder in bliss as [hisher] cock continues to shoot up in the air.", parse);
				Text.NL();
				Text.Add("When [heshe]’s finally done, you’re left completely soaked in [hisher] cum. The white, creamy liquid covering you like a layer of paint. Terry [himher]self is left panting, [hisher] legs and tummy splattered with [hisher] own messy orgasm.", parse);
				Text.NL();
				Text.Add("You give [himher] a few minutes, watching as [hisher] limping equine prick towers over you. Once you’ve caught your breath, you tap Terry’s thigh, instructing [himher] to get up.", parse);
				Text.NL();
				if(terry.Relation() < 30) {
					Text.Add("The [foxvixen] groans in protests, but does as you said, getting back on [hisher] wobbly feet and looking down at your cum-soaked visage.", parse);
					Text.NL();
					Text.Add("<i>“Err, sorry about that...”</i>", parse);
					Text.NL();
					Text.Add("It’s alright, you tell [himher]. This is what you wanted, even most of it ended <i>on</i> you rather than <i>in</i> you. You swipe a glob with your finger and take it to your lips, humming appreciatively at the taste. [HeShe]’s one tasty [foxvixen], you tell [himher].", parse);
					Text.NL();
					Text.Add("<i>“Hehe, thanks.”</i> [HeShe] grins.", parse);
					Text.NL();
					Text.Add("Now then, you should probably take care of all this mess… or have Terry take care of it, since most of it <i>is</i> [hishers] anyway...", parse);
				}
				else if(terry.Relation() < 60) {
					Text.Add("<i>“Hmm, can’t we stay like this a while longer?”</i>", parse);
					Text.NL();
					Text.Add("Considering dry cum is a pain to clean? Nope.", parse);
					Text.NL();
					Text.Add("<i>“Okay, okay, getting up...”</i> [HeShe] slowly collects [himher]self and gets back on [hisher] feet, then immediately laughs as [heshe] sees you.", parse);
					Text.NL();
					Text.Add("<i>“What’s this, [playername]? Bit more than you could chew?”</i>", parse);
					Text.NL();
					Text.Add("Hardy har har, you roll your eyes.", parse);
					Text.NL();
					Text.Add("<i>“It’s a nice look though, pretty sexy.”</i>", parse);
					Text.NL();
					Text.Add("Right… but sexy or not, someone is going to have to clean all of this up, you tell [himher].", parse);
					Text.NL();
					Text.Add("Terry simply shrugs. <i>“I don’t mind cleaning if you want me to, sure was fun making the mess tho.”</i>", parse);
					Text.NL();
					Text.Add("Well...", parse);
				}
				else {
					Text.Add("Terry stirs, moving [hisher] legs and gently caressing your cummy face with a foot.", parse);
					Text.NL();
					Text.Add("To drive the point home and get [himher] off you before all [hisher] cum dries, you bite [hisher] toe.", parse);
					Text.NL();
					Text.Add("<i>“Ouch!”</i> This gets the [foxvixen] moving, and [heshe] immediately gets off you, chuckling despite [himher]self.", parse);
					Text.NL();
					Text.Add("<i>“Oh, come on. [playername]. It’s not my fault you couldn’t drink it all.”</i>", parse);
					Text.NL();
					Text.Add("Doesn’t mean [heshe] should rub it in.", parse);
					Text.NL();
					Text.Add("[HeShe] simply laughs in reply. <i>“Alright, alright. I’m sorry,”</i> [heshe] says, crawling to give you a kiss and lick a stray glob off your nose. <i>“Better?”</i>", parse);
					Text.NL();
					Text.Add("...Okay, you’ll forgive [himher]... this time!", parse);
					Text.NL();
					Text.Add("<i>“That’s what you say, but we both know I got you wrapped around my finger,”</i> [heshe] teases back.", parse);
					Text.NL();
					Text.Add("Cheeky [foxvixen]...", parse);
					Text.NL();
					Text.Add("<i>“So, you want help cleaning up or you just want to marinate in my juices?”</i>", parse);
					Text.NL();
					Text.Add("Hmm...", parse);
				}
				Text.Flush();
				
				TimeStep({minute: 30});
				
				TerryScenes.TerryCleansPC();
			}
			else if(player.sexlevel < 5) {
				Text.Add("It’s a bit tough, but somehow you find a rhythm where you can manage to swallow most of Terry’s prodigious load. Sure, some of it manages to escape the sides of your mouth, but most of it winds up where it belongs: inside your belly.", parse);
				Text.NL();
				Text.Add("You continue lightly stroking and fondling Terry’s balls, feeling as their weight dissipates with each new jet of cum. Eventually, the flow tapers and you release Terry’s sexy bits, grabbing [hisher] sides instead to hold [himher] up.", parse);
				Text.NL();
				Text.Add("Gently, you lay [himher] down on [hisher] side, right next to you.", parse);
				Text.NL();
				if(terry.Relation() < 30) {
					Text.Add("<i>“Uuuh...”</i>", parse);
					Text.NL();
					Text.Add("From the looks of it, Terry is completely spent. You sigh to yourself, then pat your [belly]. Slowly, you scoot closer to Terry and hug [himher] gently from behind, spooning [himher].", parse);
					Text.NL();
					Text.Add("The two of you stay like this until you’re good enough to get up and go about your business.", parse);
				}
				else if(terry.Relation() < 60) {
					Text.Add("<i>“That was… amazing. I came really hard...”</i>", parse);
					Text.NL();
					Text.Add("You smile. So [heshe] really liked that, huh?", parse);
					Text.NL();
					Text.Add("<i>“Of course I did, you’re really good at this. Although even as good as you are, I see you still managed to spill a little,”</i> [heshe] says, chuckling and pointing at a strand of cum on the side of your mouth. You immediately swipe the glob, shoving your sticky finger into the talkative [foxvixen]’s own mouth.", parse);
					Text.NL();
					if(terry.Slut() < 15) {
						Text.Add("Taken by surprise, Terry coughs and sputters. <i>“Hey! It’s you who wanted a taste, not me!”</i> [heshe] protests.", parse);
						Text.NL();
						Text.Add("That’ll teach [himher] to keep [hisher] mouth shut...", parse);
					}
					else {
						Text.Add("Despite the initial surprise, Terry quickly adapts and begins sucking on your finger. [HeShe] fellates it as if it was a cock, using [hisher] tongue to expertly lick your digit from root to tip. The display is kinda hot… and [heshe] only stops when you pull out.", parse);
						Text.NL();
						Text.Add("<i>“Hmm, yeah. I’d say I’m pretty tasty myself,”</i> [heshe] teases. <i>“But I think I’d enjoy something from you more, maybe you got something I could [suckLick]?”</i> [heshe] asks teasingly.", parse);
						Text.NL();
						Text.Add("...Maybe later, you reply.", parse);
						
						player.AddLustFraction(0.25);
					}
					Text.NL();
					Text.Add("<i>“Hmm, feeling a bit worn out after this. Think we got enough time to rest for a spell?”</i>", parse);
					Text.NL();
					Text.Add("Sure, you could use some rest too. At least while you digest your snack.", parse);
					Text.NL();
					Text.Add("<i>“Hehe, alright then.”</i>", parse);
					Text.NL();
					Text.Add("With that said, Terry settles down beside you, closing [hisher] eyes for a short nap. You follow in [hisher] lead.", parse);
				}
				else {
					Text.Add("<i>“Aah, that really hit the spot. I even feel lighter after cumming this much… and you? Did you enjoy your treat, [playername]?”</i>", parse);
					Text.NL();
					Text.Add("Very much so, you say, patting your [belly].", parse);
					Text.NL();
					Text.Add("<i>“I’m glad… Though I see you missed some over here,”</i> Terry adds, pointing at a strand that escaped out of the corner of your mouth.", parse);
					Text.NL();
					Text.Add("Before you can move to swipe it clean, Terry leans over and licks it off your chin. Then proceeds to kiss you, feeding you the missed strand with a passionate, if short, kiss.", parse);
					Text.NL();
					Text.Add("<i>“There. That’s better now.”</i>", parse);
					Text.NL();
					Text.Add("Smiling, you hug [himher] close, pressing your bodies together and basking into each other’s warmth.", parse);
					Text.NL();
					Text.Add("<i>“Time out for cuddling and napping?”</i>", parse);
					Text.NL();
					Text.Add("Sounds like a plan...", parse);
				}
				Text.Flush();
				
				TimeStep({hour: 1});
				
				terry.relation.IncreaseStat(70, 1);
				
				Gui.NextPrompt();
			}
			else {
				Text.Add("As experienced as you are, dealing with Terry’s prodigious load is no issue. No matter how fast [heshe] shoots, you still find time to savor every last drop of [hisher] precious fox-seed before gulping it down.", parse);
				Text.NL();
				Text.Add("Up above, you watch Terry go through a range of <i>pleasure faces</i>. Sometimes [heshe] has a cute pout, other times [heshe]’s biting [hisher] lower lip, and there’s the hissing groan, and even the ‘<i>this is so good</i>’ tongue-lolling-out gasp. It’s like watching a private show.", parse);
				Text.NL();
				Text.Add("The flow of cum starts to taper ever so slightly, but you’re pretty sure Terry is capable of more, [heshe] just needs the appropriate incentive. Withdrawing one of your hands from [hisher] cute butt, you make a ring with your finger at the base of [hisher] swollen knot, gently giving it a few tugs.", parse);
				Text.NL();
				Text.Add("With your other hand still firmly lodged inside Terry’s ass, you begin massaging [hisher] prostate in slow circles, pressing down to grind your fingertips and force just a little extra semen out of [hisher] cum-factory.", parse);
				Text.NL();
				Text.Add("Sure enough, [hisher] flow grows in intensity. [HeShe]’ll still run out eventually, but this little push will make sure you’re both extra-satisfied by the end of it.", parse);
				Text.NL();
				Text.Add("Only when you feel Terry has truly spent every little droplet of [hisher] cargo do you let go of the [foxvixen]’s already limping horse-cock, licking your lips to savor the lingering taste as you hold on to Terry and sit yourself up.", parse);
				Text.NL();
				if(terry.Relation() < 30) {
					Text.Add("Terry pants heavily, seems like feeding your hunger was pretty exhausting for the petite [foxvixen]. That being the case, you decide it’s best to lay [himher] down gently on the ground and let [himher] catch [hisher] breath.", parse);
					Text.NL();
					Text.Add("It takes a bit, but eventually [hisher] breathing does steady out. You simply smile down at [himher], patting your belly and thanking [himher] for the meal.", parse);
					Text.NL();
					Text.Add("<i>“...Wow… err… you’re welcome?”</i> [heshe] says nervously.", parse);
					Text.NL();
					Text.Add("You stroke [hisher] side and tell [himher] there’s no need to be nervous. [HeShe] only did as you asked.", parse);
					Text.NL();
					Text.Add("<i>“Right, thanks. I liked this… a lot.”</i>", parse);
					Text.NL();
					Text.Add("You could tell, you reply. But [heshe] must be feeling tired still, so how about [heshe] takes a little nap to recover? You’ll keep watch while [heshe] sleeps.", parse);
					Text.NL();
					Text.Add("<i>“That’d be good, thanks.”</i> [HeShe] smiles, letting [hisher] eyes drift closed.", parse);
					Text.NL();
					Text.Add("Good, this also gives you time to digest some of [hisher] seed before you set out.", parse);
				}
				else if(terry.Relation() < 60) {
					Text.Add("You hold Terry close, stroking [hisher] back and watching [hisher] fluffy tail sway to and fro. It takes a bit, but [heshe] eventually hugs you back, steadying [hisher] breathing in the process.", parse);
					Text.NL();
					Text.Add("<i>“That felt amazing,”</i> [heshe] says, still panting slightly.", parse);
					Text.NL();
					Text.Add("You aim to please, you reply.", parse);
					Text.NL();
					Text.Add("<i>“We should do this more often...”</i>", parse);
					Text.NL();
					Text.Add("No disagreement there. Terry is one tasty [foxvixen], and you’d love to sample [himher] again.", parse);
					Text.NL();
					Text.Add("[HeShe] laughs softly. <i>“Is that all I am to you? Some delicacy you can snack on when your perverted urges rise to the fore?”</i>", parse);
					Text.NL();
					Text.Add("<i>Fine</i> delicacy, you correct [himher], the <i>fine</i> part is important. And you don’t snack on [himher], you nibble and sip [himher]. Terry is way too tasty to wolf down all at once… though you’ll admit that has its own appeal.", parse);
					Text.NL();
					Text.Add("[HeShe] laughs at your teasing remarks. <i>“Alright, alright, you perverted jackass. Now I’m afraid this <b>fine</b>,”</i> [heshe] stresses, <i>“delicacy has to rest for a bit... you drained me so hard that even my balls feel sore...”</i>", parse);
					Text.NL();
					Text.Add("Hmm, okay. [HeShe] can rest as much as [heshe] wants. You’ll keep watch over the two of you, in that case.", parse);
					Text.NL();
					Text.Add("Terry pulls away to look you in the eyes. <i>“Thanks, [playername].”</i>", parse);
					Text.NL();
					Text.Add("No problem, you reply, pulling [himher] back into your embrace and letting [himher] settle down against you as [heshe] rests for a spell.", parse);
				}
				else {
					Text.Add("You hold Terry close, nuzzling [himher] and kissing along [hisher] neck while the [foxvixen] recuperates.", parse);
					Text.NL();
					Text.Add("<i>“Huff… huff… that was pretty intense,”</i> [heshe] comments.", parse);
					Text.NL();
					Text.Add("You chuckle and tell [himher] you’re glad [heshe] enjoyed [himher]self.", parse);
					Text.NL();
					Text.Add("<i>“Yep, I really did. And what you about you, my perverted [mastermistress]? How did you enjoy your meal? I worked really hard to make all that, just for you,”</i> [heshe] says with a smirk.", parse);
					Text.NL();
					Text.Add("Hmm, you tap your chin in mock thought. The texture was creamy, the flavor was exquisite, but [heshe] could use some work on the quantity and stamina departments, you reply teasingly.", parse);
					Text.NL();
					Text.Add("<i>“Careful what you wish for, [playername]. You might wind up just getting it. I’ll have you know that I’m pretty competitive, and this won’t be able to handle all of me if I do go all out,”</i> [heshe] says, patting your [belly].", parse);
					Text.NL();
					Text.Add("Interesting… that almost sounded like a challenge…", parse);
					Text.NL();
					Text.Add("<i>“It is a challenge! I can be pretty crafty; I’ll find a way to outdo you, just you wait.”</i>", parse);
					Text.NL();
					Text.Add("Oooh, you’re shaking in your boots, you reply mockingly.", parse);
					Text.NL();
					Text.Add("<i>“You’d better. I’ll get back at you when you least expect it.”</i> [HeShe] sighs. <i>“For now, can we take some time off? I’m really feeling tired.”</i>", parse);
					Text.NL();
					Text.Add("Of course, you wouldn’t want your pretty [foxvixen] pet to die out on you.", parse);
					Text.NL();
					Text.Add("<i>“Thanks, [playername]. Then how about we cuddle for a bit?”</i>", parse);
					Text.NL();
					Text.Add("Cuddling is fine, maybe [heshe]’d also like a massage? Maybe make out?", parse);
					Text.NL();
					Text.Add("Terry giggles at your reply. <i>“Aren’t you a clingy bastard? But fine, I love you despite your flaws. And I’ll say yes to both the massage and the making out.”</i> [HeShe] grins.", parse);
					Text.NL();
					Text.Add("You grin back and lie down on the ground, pulling [himher] on top of you and kissing [himher] lovingly as the two of you enjoy each other and recover from your past activities.", parse);
					if(terry.flags["vengeance"] < TerryFlags.Vengeance.Triggered)
						terry.flags["vengeance"] = TerryFlags.Vengeance.Triggered;
				}
				Text.Flush();
				
				TimeStep({hour: 1});
				
				terry.relation.IncreaseStat(70, 1);
				
				Gui.NextPrompt();
			}
		}
		else {
			if(terry.Relation() < 30) {
				Text.Add("Terry carefully straddles you, [hisher] foxhood already erect and throbbing with need.", parse);
				Text.NL();
				Text.Add("You wait for a bit, but when Terry doesn’t seem to be moving, you call out to [himher].", parse);
				Text.NL();
				Text.Add("<i>“Huh?”</i> [HeShe] snaps, looking at you.", parse);
				Text.NL();
				Text.Add("You can’t really do much with [himher] so far away…", parse);
				Text.NL();
				Text.Add("<i>“Oh, sorry,”</i> [heshe] says, immediately moving closer.", parse);
				Text.NL();
				if(player.FirstBreastRow().Size() > 5) {
					Text.Add("[HeShe] stops as soon as [heshe] feels [hisher] balls touch your [breasts]. <i>“Umm...”</i>", parse);
					Text.NL();
					Text.Add("There’s no need to be embarrassed, you tell [himher]. And while you’re not exactly opposed to let [himher] play with your breasts, this also isn’t exactly what you asked for…", parse);
					Text.NL();
					Text.Add("<i>“Hehe, sorry...”</i> [heshe] says, offering an embarrassed smile. Then [heshe] promptly maneuvers [himher]self, stopping when [hisher] pointy cock-tip is just barely touching your lips.", parse);
					Text.NL();
					Text.Add("That’s more like it...", parse);
				}
				else {
					Text.Add("[HeShe] stops barely an inch away from your [face], still looking a bit nervous about all this.", parse);
					Text.NL();
					Text.Add("Relax, you tell [himher]. You’re just going to suck [himher] off, not test [himher] or anything like that.", parse);
					Text.NL();
					Text.Add("<i>“Yeah, sorry. But I’m kinda worried about this,”</i> [heshe] says, giving [hisher] collar a small tug.", parse);
					Text.NL();
					Text.Add("The collar won’t do anything, especially since [heshe]’s not doing anything against your will.", parse);
					Text.NL();
					Text.Add("<i>“Right. Umm, I guess you can start then?”</i>", parse);
					Text.NL();
					Text.Add("That’s more like it...", parse);
				}
			}
			else if(terry.Relation() < 60) {
				Text.Add("Terry straddles you, smiling down at you as [heshe] scoots closer, ", parse);
				if(player.FirstBreastRow().Size() > 5) {
					Text.Add("until [hisher] progress is impeded by your [breasts].", parse);
					Text.NL();
					Text.Add("Seems like [heshe] didn’t think things through, you tease [himher].", parse);
					Text.NL();
					Text.Add("The [foxvixen] chuckles. <i>“That seems to be the case, but you have to agree these are quite the obstacle,”</i> [heshe] teases back, gently fondling your [breasts].", parse);
					Text.NL();
					Text.Add("Hmm, you wouldn’t call them an obstacle, especially when [heshe] seems to be having so much fun playing with you. But you didn’t order a tittyfuck, you ordered tasty fox-flavored sausage...", parse);
					Text.NL();
					Text.Add("<i>“And you’ll get it,”</i> [heshe] agrees, maneuvering over your [breasts] to sit closer.", parse);
					Text.NL();
					Text.Add("[HeShe] sits barely an inch away from you, [hisher] vulpine prick almost touching your lips. <i>“Better now?”</i>", parse);
					Text.NL();
					Text.Add("Much better...", parse);
				}
				else {
					Text.Add("until [hisher] cock is almost touching your lips.", parse);
					Text.NL();
					Text.Add("<i>“Here’s your order, [sirmadam]!”</i> [heshe] says, trying [hisher] best to imitate a waiter.", parse);
					Text.NL();
					Text.Add("Well, the service isn’t half-bad, but will the food be up to par?", parse);
					Text.NL();
					Text.Add("<i>“I assure you it will, you have but to try, [sir].”</i>", parse);
					Text.NL();
					Text.Add("That sounds like a plan…", parse);
				}
			}
			else {
				Text.Add("Terry crawls on top of you, ", parse);
				if(player.FirstBreastRow().Size() > 5) {
					Text.Add("letting [hisher] cock nestle in the valley of your cleavage.", parse);
					Text.NL();
					Text.Add("You look down at Terry’s cock, then look back up at [himher]. You don’t remember ordering [himher] to tittyfuck you, you say.", parse);
					Text.NL();
					Text.Add("<i>“No, you didn’t. But some foreplay is always good, no?”</i> [heshe] teasingly replies, grabbing your breasts and pressing them to [hisher] shaft.", parse);
					Text.NL();
					Text.Add("A little foreplay is good, you purr, but not if [heshe] forgets what you wanted. You’d hate to have to remind [himher] of where that pretty little cock of [hishers] is supposed to go...", parse);
					Text.NL();
					Text.Add("<i>“No worries, I didn’t forget. But it’d be a shame not to play with these a little bit,”</i> [heshe] says with a smirk, bucking [hisher] hips to gently fuck your [breasts].", parse);
					Text.NL();
					Text.Add("You moan sharply as Terry’s dexterous fingers expertly tweak your [nips]. [HeShe] does have a point there... you just don’t want [himher] to get so wrapped up in your tits that [heshe] forgets the warm, wet, thirsty mouth waiting for [himher].", parse);
					Text.NL();
					Text.Add("Even if they <i>are</i> rather nice tits, if you do say so yourself.", parse);
					Text.NL();
					Text.Add("<i>“Okay, I guess this is my cue to get going with this. Otherwise your ego might just throw me off you,”</i> [heshe] teases, releasing your breasts and maneuvering [himher]self to bring [hisher] shaft close to your lips.", parse);
					Text.NL();
					Text.Add("Oh, you’re going to get [himher] back for that... not that you think [heshe]’ll mind, in the end.", parse);
				}
				else {
					Text.Add("stopping mere inches from your lips as [hisher] shaft is already poised to penetrate your mouth. You can even smell the pre-cum already beginning to bead on [hisher] pointy tip.", parse);
					Text.NL();
					Text.Add("<i>“Here you go, [playername]. All ready for a good sucking.”</i>", parse);
					Text.NL();
					Text.Add("It most certainly is, and you’re just the [boygirl] to provide one.", parse);
					Text.NL();
					Text.Add("<i>“Good, then let’s begin!”</i> [heshe] says, sitting down on your chest.", parse);
				}
			}
			Text.NL();
			Text.Add("Your hungry eyes run over the dainty form of Terry’s little fox-cock, drinking in every detail. This close to [himher], [hisher] musk fills your nose and you inhale hungrily.", parse);
			Text.NL();
			Text.Add("Terry starts as your hands sweep up, cupping the round, girly lushness of [hisher] butt. You rub the perky cheeks as you pull [himher] closer to your mouth. Your lips part and your [tongue] lolls out to gently caress [hisher] petite balls, stroking them and drawing them close enough to hungrily suckle on their soft sack-skin.", parse);
			Text.NL();
			Text.Add("[HeShe] moans atop you, crooning [hisher] pleasure as you lay sucking kisses on [hisher] balls, working your way to the base of [hisher] cock where you wetly lick up the shaft in a single slurp. [HisHer] pink flesh gleams wetly as you stroke back and forth with your tongue, polishing [hisher] little half-formed knot, before you open your mouth and engulf [himher] with one smooth motion.", parse);
			Text.NL();
			Text.Add("The [foxvixen] inhales sharply, trembling on your [breasts] as you swallow [himher]. Small as [heshe] is, [heshe] makes a perfect mouthful; even the knot doesn’t stop you from bobbing back and forth, letting it audibly pop between your lips before you gulp it down again.", parse);
			Text.NL();
			Text.Add("Your [tongue] whirls within the confine of your mouth, polishing every nook and cranny. You seek out every dip and divot, trace every vein, flick the pointed tip and otherwise mercilessly attack every sensitive spot that you can find.", parse);
			Text.NL();
			Text.Add("You moan wetly around the cock in your mouth, letting the muffled tones emphasize your hunger. You have a delicious treat, and you intend to savor it. Salaciously suckling, you plan on milking every last drop Terry has and drinking it all.", parse);
			Text.NL();
			Text.Add("<i>“[playername], I’m getting - ah! - close!”</i> [heshe] warns you.", parse);
			Text.NL();
			Text.Add("You can feel [himher] throbbing in your mouth as [hisher] knot is starting to swell against the [tongueTip] of your [tongue]. That’s good... but not good enough.", parse);
			Text.NL();
			Text.Add("Even as you continue suckling, your fingers start to move, rubbing the distracted [foxvixen]’s lovely ass, and then pushing into the canyon of [hisher] buttock cleavage. Terry yips and wriggles as you caress [hisher] tailhole, unintentionally thrusting deeper into your mouth as [heshe] shies away.", parse);
			Text.NL();
			Text.Add("But [heshe] is too wrapped up in the pleasure you are giving [himher] to fight you, allowing you to worm a finger inside. [HeShe] groans as you spread [himher], pushing deeper as you reach for [hisher] prostate.", parse);
			Text.NL();
			Text.Add("You can feel the effects within your mouth. The flow of pre-cum washing down your gullet increases steadily, [hisher] knot bulging ever larger. When you press something particularly soft, Terry practically jumps.", parse);
			Text.NL();
			Text.Add("The [foxvixen] tries to say something, but all that [heshe] manages is an inarticulate moan. The way [hisher] knot spreads to its full growth, pushing your mouth open, says it for [himher].", parse);
			Text.NL();
			Text.Add("You can’t really suck [himher] like this, but that’s alright; you’re more creative than that...", parse);
			Text.NL();
			Text.Add("Opening your mouth as wide as you can and pulling backwards, you manage to wriggle free. Terry’s shaft throbs in your vision, deep red in its engorgement. You grasp it just below the knot with your free [hand], holding it steady as you open your mouth and extend your tongue beneath it.", parse);
			Text.NL();
			
			var cum = terry.OrgasmCum();
			
			Text.Add("With your fingers, you thrust firmly into the mewling vulpine’s ass, ruthlessly stroking [hisher] prostate until, with a howl, [heshe] cums. [HisHer] glans distends before spurting forth a long, thick rope of seed that splatters onto your tongue and rolls down your throat. You gulp it down eagerly and keep milking [himher], coaxing another rope, and another.", parse);
			Text.NL();
			Text.Add("Terry bucks and whimpers, gasping as you coax [himher] into bleeding [himher]self dry into your mouth. Even with your finger right on [hisher] button, Terry’s petite balls just don’t hold that much. All too soon for your liking, Terry goes limp atop you; your touches keep [himher] still hard, but there’s not going to be any more gooey goodness.", parse);
			Text.NL();
			Text.Add("Mercifully, you pop your digit free of [hisher] clenched ass, allowing the moaning vulpine to slump onto your chest and rest.", parse);
			Text.NL();
			if(terry.Relation() < 30) {
				Text.Add("<i>“T-that was pretty good,”</i> [heshe] admits.", parse);
				Text.NL();
				Text.Add("Only pretty good? Playfully, you note that from where you were sitting, [heshe] looked to be loving it.", parse);
				Text.NL();
				Text.Add("<i>“Well, okay. You do deserve the compliment, but now you’re just pushing it,”</i> [heshe] playfully replies.", parse);
				Text.NL();
				Text.Add("Chuckling, you concede the point. So long as [heshe] enjoyed it, that’s all that matters.", parse);
				Text.NL();
				Text.Add("<i>“Thanks for that, by the way.”</i>", parse);
				Text.NL();
				Text.Add("Licking your lips, you assure [himher] that it was a pleasure.", parse);
				Text.NL();
				Text.Add("<i>“Mind if we rest a little before going?”</i>", parse);
				Text.NL();
				Text.Add("You certainly don’t mind, and you allow the [foxvixen] to carefully lay [himher]self out on your body, using you as an impromptu bed.", parse);
			}
			else if(terry.Relation() < 60) {
				Text.Add("<i>“How’d you like your service, [playername]?”</i> Terry asks with a grin, still panting despite [himher]self.", parse);
				Text.NL();
				Text.Add("You lick a stray smear from your lips and compliment [himher] on [hisher] efforts; some of the best service you’ve had in a while.", parse);
				Text.NL();
				Text.Add("<i>“Then how about a tip?”</i>", parse);
				Text.NL();
				Text.Add("Chuckling, you wave a finger. You think [heshe]’s already gotten one hell of a tip.", parse);
				Text.NL();
				Text.Add("<i>“Oh, come on! Just a little extra then. We’re buddy-buddy aren’t we? Spare some change? For your friend?”</i> [HeShe] grins, mirth practically oozing as [heshe] blinks [hisher] eyes inno - ...well, <i>innocently</i>.", parse);
				Text.NL();
				Text.Add("You think it over for a moment, and then reach up to pull Terry over, bringing [hisher] face close to yours. Your lips touch [hisher]s, tenderly kissing [himher] for a few heartbeats, and then releasing [himher].", parse);
				Text.NL();
				Text.Add("With a mischievous smile, you ask if that’s enough change for [himher].", parse);
				Text.NL();
				Text.Add("<i>“Hmm, I could use some more,”</i> [heshe] grins.", parse);
				Text.NL();
				Text.Add("Tutting, you shake a finger in gentle reproach. Well, if [heshe] wants more, [heshe]’ll have to earn some more.", parse);
				Text.NL();
				Text.Add("<i>“Aww… Alright then, and I suppose I’ll get my chance later?”</i>", parse);
				Text.NL();
				Text.Add("[HeShe] most certainly will.", parse);
				Text.NL();
				Text.Add("<i>“It’s set then, but for now… how about resting some?”</i>", parse);
				Text.NL();
				Text.Add("Reaching up, you hug the [foxvixen]. That sounds like a fine idea to you.", parse);
			}
			else {
				Text.Add("Terry sighs atop you, a dopey smile plastered on [hisher] face. <i>“That was amazing, [playername].”</i>", parse);
				Text.NL();
				Text.Add("Grinning proudly, you thank [himher] for the compliment. You wanted to make sure [heshe]’d remember this.", parse);
				Text.NL();
				Text.Add("<i>“Only this and the other hundred times we’ll do it?”</i> [HeShe] grins.", parse);
				Text.NL();
				Text.Add("Well, that goes without saying, doesn’t it?", parse);
				Text.NL();
				Text.Add("<i>“Can’t keep your hands off my tail, can you, lover-[boygirl]?”</i>", parse);
				Text.NL();
				Text.Add("Nope. It’s [hisher] own fault for having such a cute tail; it’s too irresistible <i>not</i> to touch.", parse);
				Text.NL();
				Text.Add("<i>“Well, if you want to get more of this ‘cute tail’, you’d better be ready to pay the toll.”</i> [HeShe] grins.", parse);
				Text.NL();
				Text.Add("And just what would that toll be, hmm?", parse);
				Text.NL();
				Text.Add("<i>“Guess,”</i> [heshe] says, closing [hisher] eyes and puckering [hisher] lips.", parse);
				Text.NL();
				Text.Add("Chuckling softly to yourself, you happily sweep the [foxvixen] into a passionate embrace, eagerly falling on [hisher] lips and crushing them with your own. The two of you cling together, softly murmuring wordless outbursts of lust as your tongues coil and twist together, breaking apart only when the need for air forces you.", parse);
				Text.NL();
				Text.Add("<i>“Guess I’m a bit more tired than I thought. I’m feeling really heavy right now.”</i>", parse);
				Text.NL();
				Text.Add("Smiling, you tenderly brush Terry’s hair and gently lay the [foxvixen] down atop you. If [heshe]’s tired, then [heshe] can just stay here and rest. You could use a little shut-eye yourself.", parse);
				Text.NL();
				Text.Add("<i>“Hmm, I’ll take you up on that offer,”</i> [heshe] replies, tail wagging softly as [heshe] looks up at you with loving eyes.", parse);
			}
			Text.Flush();
			
			terry.relation.IncreaseStat(70, 1);
			
			TimeStep({hour: 1});
			
			player.AddSexExp(2);
			terry.AddSexExp(2);
			
			Gui.NextPrompt();
		}
		
		player.AddLustFraction(0.25);
	});
}

TerryScenes.SexHaveADrinkBreasts = function() {
	let terry = GAME().terry;
	let player = GAME().player;

	var parse : any = {
		playername : player.name,
		foxvixen : terry.mfPronoun("fox", "vixen"),
		foxxyvixxy : terry.mfPronoun("foxxy", "vixxy"),
		handsomebeautiful : terry.mfPronoun("handsome", "beautiful"),
		noseSnout : player.HasMuzzle() ? "snout" : "nose",
		boygirl : player.mfTrue("boy", "girl"),
		guygirl : player.mfTrue("guy", "girl"),
		mastermistress : player.mfTrue("master", "mistress")
	};
	
	parse = terry.ParserPronouns(parse);
	parse = terry.ParserTags(parse, "t");
	parse = player.ParserTags(parse);
	
	Text.Clear();
	if(terry.Relation() < 30) {
		Text.Add("<i>“My breasts? That’s what you want?”</i>", parse);
		Text.NL();
		Text.Add("That’s right.", parse);
		Text.NL();
		Text.Add("<i>“Well, I can’t stop you, so go ahead,”</i> [heshe] says nonchalantly.", parse);
		Text.NL();
		Text.Add("Well, it’s good to see [heshe]’s so calm about this. Now then, if [heshe]’ll just lie down? Wouldn’t want [himher] to fall over while you’re milking [himher], after all.", parse);
		Text.NL();
		Text.Add("Terry rolls [hisher] eyes and sits down on the ground.", parse);
		Text.NL();
		Text.Add("Not exactly what you wanted, but a good start. Stepping forward, you place a hand on [hisher] shoulder and firmly push [himher] over, not stopping until [hisher] back is to the ground and you have [himher] pinned beneath you.", parse);
		Text.NL();
		Text.Add("With a bright smile, you declare that now you can begin. Terry just huffs quietly to [himher]self.", parse);
	}
	else if(terry.Relation() < 60) {
		Text.Add("<i>“I figured. Had to be a reason you gave me these,”</i> [heshe] says, cupping [hisher] [tbreasts].", parse);
		Text.NL();
		Text.Add("Well, it’s one of the reasons, you’ll admit.", parse);
		Text.NL();
		Text.Add("<i>“Really?”</i> [heshe] asks with a snide grin.", parse);
		Text.NL();
		Text.Add("Now, now; no fishing for compliments, [heshe] knows you think [heshe]’s pretty. You step closer and take [himher] by the arm. So, if [heshe]’s okay with you milking [himher], then why don’t [heshe] continue being a good [foxvixen] and lie down for you, hmm? It’ll be much easier for both of you that way.", parse);
		Text.NL();
		Text.Add("<i>“Okay!”</i> [heshe] replies, letting you guide [himher] towards the floor. <i>“Like this?”</i>", parse);
		Text.NL();
		Text.Add("That’s just perfect, you purr, already lowering yourself over [hisher] upper torso.", parse);
	}
	else {
		Text.Add("<i>“Like a moth to the flame!”</i> Terry cheerfully says. <i>“Come on then, come to me.”</i> [HeShe] crooks a finger, inviting you over.", parse);
		Text.NL();
		Text.Add("Oh, with pleasure. You promptly pounce at the surprised [foxvixen], sending [himher] tumbling onto [hisher] back. You scramble over [hisher] body to pin [himher] beneath you.", parse);
		Text.NL();
		Text.Add("<i>“Oof! Or maybe you’re more like a big dumb puppy,”</i> [heshe] teases with a big grin.", parse);
		Text.NL();
		Text.Add("With a smirk of your own, you lean toward Terry’s ear and stage-whisper <i>“woof”</i>.", parse);
	}
	Text.NL();
	if(terry.Cup() <= TerryFlags.Breasts.Acup) {
		Text.Add("Looking down at Terry’s petite chest, it’s actually hard to see what you have to work with at a quick glance. The cute little puffball of white fur that sprouts there is so large and round, it’s completely swallowed up the [foxvixen]’s budding breasts.", parse);
		Text.NL();
		Text.Add("With them tucked away in their little cocoon, you’ll have to let your fingers do the looking for you. Reaching forward, you allow your digits to begin their quest. Silken soft fluff wraps around your fingertips as you carefully push forward, each hand sinking deeper into the veil of fur hiding Terry’s perky breasts.", parse);
		Text.NL();
		Text.Add("It’s wonderfully smooth and fine to the touch; there are women who’d pay good money to wear fur like this themselves. You push back the smirk that thought brings on.", parse);
		Text.NL();
		Text.Add("You’re not here just to groom Terry’s chest-fluff, so you press on until you feel something solid pushing back against your fingertips. Tenderly pressing down, you feel it give just slightly at the pressure, and you tweak it with your fingertips.", parse);
		Text.NL();
		Text.Add("Terry yips suddenly at the pinch; looks like you’ve struck cleavage.", parse);
		Text.NL();
		Text.Add("You part [hisher] fur so you can rest your cheek against [hisher] pert breasts. Lying on [hisher] chest like this, you can’t help but feel closer to Terry.", parse);
		Text.NL();
		Text.Add("Slowly, you shut your eyes and rub your face against [himher], feeling the small nubs that are [hisher] nipples poke you on your [noseSnout]. For a moment, you just focus on the warmth emanating from the petite [foxvixen]; [hisher] heartbeat - always beating in a steady rhythm - soothes you.", parse);
		Text.NL();
		Text.Add("You grab a bunch of [hisher] chest fluff in your [hand] and bring it close so you can sniff it, inhaling Terry’s scent. It’s amazing how [heshe] can keep [hisher] fur so well cared for, even when you’re on the road.", parse);
		Text.NL();
		if(terry.Relation() < 30) {
			Text.Add("Before you can sink too far into your reverie, a sharp cough from above reaches your ears. Terry doesn’t sound too thrilled with you sniffing [himher] like that, and so you sadly let go of [hisher] fur and get back to business.", parse);
		}
		else if(terry.Relation() < 30) {
			Text.Add("<i>“Enjoying yourself?”</i> Terry asks with a hint of mirth in [hisher] voice.", parse);
			Text.NL();
			Text.Add("You sigh and nod dreamily in response. There’s still much more to come, and so you reluctantly let Terry go.", parse);
		}
		else {
			Text.Add("As you relax, you feel Terry’s arms gently drape over your head, hugging you close. <i>“Sometimes you can be such a big baby, [playername],”</i> [heshe] remarks, chuckling softly.", parse);
			Text.NL();
			Text.Add("If it lets you get up close and personal with [himher] like this, then you don’t really care about that.", parse);
			Text.NL();
			Text.Add("<i>“Well, I’m not complaining, but didn’t you want something from me?”</i>", parse);
			Text.NL();
			Text.Add("[HeShe] does have a point... nice as it is to just lie here and snuggle, you still want something more. With that in mind, you let [hisher] fur go.", parse);
		}
		Text.NL();
		Text.Add("Guiding your hand through the veil of chest-fluff, you close your fingers around the petite bulge of one little breast. Its nipple pebbles against your palm as you palpate it, massaging the dainty orb. It’s so small that it barely squishes in your grip, so you have to adapt.", parse);
		Text.NL();
		Text.Add("You roll your palm across and around, with smooth strokes up and down, ensuring the nipple grinds against your skin as you pick up the pace, going faster and faster.", parse);
		Text.NL();
		Text.Add("Terry arches off of the floor with a soft mewl, chest thrust out against you. Since [heshe]’s so eager, you happily oblige, turning your face to lavish kisses over the half of [hisher] chest you’re not busily molesting.", parse);
		Text.NL();
		Text.Add("Nosing through [hisher] fur, you tease it aside to try and expose [hisher] areola better. Once satisfied, you extend your [tongue] and touch the very tip of it to the pink pearl of flesh, helping you guide your tongue as it curls itself along [hisher] areola.", parse);
		Text.NL();
		Text.Add("You yearn to take it into your mouth... but it’s too soon for that. Instead, you let your tongue slide lower, and glide around the small mound of flesh beneath you. Moans of pleasure echo above you as you leisurely lap back and forth, still squeezing intermittently with your other hand at [hisher] breast.", parse);
		Text.NL();
		Text.Add("One final wet slurp across the nipple before your tongue withdraws. You descend on Terry’s chest, jaws agape to envelop all of [hisher] petite teat. Warm, fuzzy breastflesh fills your mouth as your lips seal themselves around it, and you suck softly as you seek the warm deliciousness within.", parse);
	}
	else if(terry.Cup() <= TerryFlags.Breasts.Bcup) {
		Text.Add("Looking over Terry’s chest, you see the undeniable curves of [hisher] perky breasts. The fluff that would usually cover [hisher] nipples has since receded, exposing the bottom half of the [foxvixen]’s cleavage. There’s still plenty of soft fur for you to play with, should you feel inclined to.", parse);
		Text.NL();
		Text.Add("You smile and gently sweep Terry’s fluffy fur away, exposing [hisher] hand-filling breasts to your viewing pleasure. They are perky and soft, just big enough to give you a handful as you reach to knead each mound. The [foxvixen] inhales sharply, and you can feel [hisher] nipples hardening against your palms.", parse);
		Text.NL();
		Text.Add("The two orbs look right at home on Terry’s chest, further complementing [hisher] feminine looks.", parse);
		Text.NL();
		if(terry.Relation() < 30) {
			Text.Add("You chuckle when you see [hisher] cheeks reddening at your compliment, though [heshe] still looks uncomfortable.", parse);
		}
		else if(terry.Relation() < 60) {
			Text.Add("<i>“Hm, thanks. One of the perks of having these is that I don’t need to use filling when I want to dress up.”</i>", parse);
			Text.NL();
			Text.Add("Well, you wouldn’t say [heshe] was unconvincing before... [heshe]’s always going to be the cutest little [foxvixen] you know, real boobs or not.", parse);
		}
		else {
			Text.Add("<i>“Oh, [playername]. You know I’m a sucker for flattery.”</i> [HeShe] chuckles. <i>“So, don’t stop now and keep massaging my boobs.”</i>", parse);
			Text.NL();
			Text.Add("Oh, you wouldn’t dream of not telling [himher] what a gorgeous, sexy, adorable [foxvixen] [heshe] is, you purr. Certainly not when [heshe] honors you enough to let you play with these sweet little milk-makers of [hishers].", parse);
			Text.NL();
			Text.Add("<i>“Ahn! Yes, you really know how to make a [foxvixen] feel appreciated!”</i>", parse);
			Text.NL();
			Text.Add("Oh, but you’ve only just begun...", parse);
		}
		Text.NL();
		Text.Add("You give each breast a final squeeze for good luck, and then slide your hands around, cupping them from the sides and pushing them as close together as you can. That done, you lower your face to the sweet little pillows and extend your [tongue]. Picking one boob at random, you glide the length of your tongue across it, curling partially around its dainty mass.", parse);
		Text.NL();
		Text.Add("Terry’s fur is silken soft and pleasantly clean beneath your taste buds as you leisurely glide back and forth, tracing crescents from the bottom of the breast to the top and back again. Then, with one particularly wet slurp, you slide over to the other teat, lavishing it with the same affection.", parse);
		Text.NL();
		Text.Add("In spiraling figure-eights, you work your way up to the tops of Terry’s tits, fingers softly palpating in your wake.", parse);
		Text.NL();
		Text.Add("Above you, Terry pants in obvious pleasure, little moans escaping [hisher] muzzle whenever you lick [hisher] nipples.", parse);
		Text.NL();
		Text.Add("Those moans stir a spark of mischief, and you withdraw your tongue, leaning in close enough to carefully nip one pert nipple with your teeth. Not hard enough to actually hurt your precious [foxvixen], but sharp enough that [heshe] definitely felt it.", parse);
		Text.NL();
		Text.Add("<i>“Aah!”</i> [HeShe] cries out. ", parse);
		if(terry.Relation() < 30) {
			Text.Add("Terry glares down at you, shame and worry clear in [hisher] face.", parse);
			Text.NL();
			Text.Add("You just smile innocently back at [himher]. [HeShe] might act like [heshe] didn’t enjoy it, but you can tell that it’s just the opposite.", parse);
		}
		else if(terry.Relation() < 60) {
			Text.Add("<i>“Don’t bite my nipples! They’re sensitive...”</i>", parse);
			Text.NL();
			Text.Add("You know they’re sensitive. Why does [heshe] think you bit them? It’s no fun nibbling something that isn’t sensitive.", parse);
		}
		else {
			Text.Add("<i>“[playername]! You meanie!”</i> Terry says, giving you a flick on your forehead.", parse);
			Text.NL();
			Text.Add("Aw, [heshe] loves you for it, [heshe] knows [heshe] does.", parse);
			Text.NL();
			Text.Add("<i>“Oh yeah? Maybe I should bite you instead!”</i> [heshe] teases back.", parse);
			Text.NL();
			Text.Add("Well, fair is fair; maybe sometime you will let [himher] have a nibble on you.", parse);
		}
		Text.NL();
		Text.Add("Turning your attention back to Terry’s breast, you lower your mouth once more to the nipple you nibbled. Puckering your lips, you place a tender peck upon its surface. As the [foxvixen] croons appreciatively above you, you deepen the kiss, lewdly sucking the nipple.", parse);
		Text.NL();
		Text.Add("As it brushes against your tongue, you open your mouth to engulf more breastflesh, ready to begin drinking.", parse);
	}
	else if(terry.Cup() <= TerryFlags.Breasts.Ccup) {
		Text.Add("Fat and proud, Terry’s bulging teats draw your gaze like iron filings to a magnet. Covered in luxuriant white fur, a heart-shaped tuft of long fluff nestled at the top of [hisher] cleavage, they practically beg to be squeezed and fondled, caressed and molested.", parse);
		Text.NL();
		Text.Add("Reverently, your hands embrace their fullness, one to either side of [hisher] bountiful cleavage. The lush pillows are so large that your fingers can barely encompass their girth, dimpling slightly as you start to squeeze.", parse);
		Text.NL();
		Text.Add("With a twist of your wrists, you push Terry’s boobs together, squishing them so that they bulge up and out, seeming even larger than they already are. You palpate with your fingers, kneading each mammary and reveling as it flexes hypnotically beneath you.", parse);
		Text.NL();
		Text.Add("Pushed together like this, Terry’s tits remind you of plump, sexy pillows. Spurred on by that notion, you allow your face to sink down into their downy embrace, burying yourself in their fluffy warmth. You inhale deeply to fill your nostrils with Terry’s surprisingly sweet scent.", parse);
		Text.NL();
		Text.Add("Lazily, your arms wrap themselves around Terry’s tits, nestling them in the crooks of your elbows as your hands dance over the [foxvixen]’s shoulders. Eyes closed to savor the warm darkness, you nuzzle back and forth, rubbing cheek and [noseSnout] against Terry’s boobs as you steadily build up your pace until you are grinding your face into [hisher] cleavage.", parse);
		Text.NL();
		if(terry.Relation() < 30) {
			Text.Add("Above you, you can hear Terry gasping in pleasure as you nuzzle [hisher] tits. As enticing as that is, you’re getting a little carried away, and so you slow yourself down in your grinding.", parse);
		}
		else if(terry.Relation() < 60) {
			Text.Add("<i>“Haha, easy there!”</i> Terry says, gently patting your head.", parse);
			Text.NL();
			Text.Add("Party pooper. Still, you heed [hisher] words and slow your pace. Don’t want to be too rough with your precious pet, after all.", parse);
		}
		else {
			Text.Add("<i>“Easy, [boygirl]! If you keep rubbing my breasts this hard, you’re going to get us shocked,”</i> Terry teases.", parse);
			Text.NL();
			Text.Add("Oh no, you wouldn’t want that to happen, as fun as it would be to see Terry with all of [hisher] fur poofed out, so you turn your enthusiasm down a notch.", parse);
		}
		Text.NL();
		Text.Add("With some reluctance, you lift your head from the comforting warmth of Terry’s bosom. Opening your eyes and smiling absently, you tenderly reach up and cup one plush tit. You give it a comforting squeeze, and then lower your face back toward it.", parse);
		Text.NL();
		Text.Add("You open your mouth and extend your [tongue], before you trace a languid crescent along the underside of Terry’s breast. Letting your saliva flow freely, you stroke back and forth, curling your tongue sensuously along the ripe fullness beneath your face. With painstaking deliberation, you lead your winding way up to the peak of Terry’s boob, slathering the ruddy flesh of [hisher] areola in warm fluids as you use your [tongueTip] to paint the sensitive ring.", parse);
		Text.NL();
		Text.Add("A luxuriant groan bubbles from above, the [foxvixen] clearly appreciates your ministrations. [HeShe] mewls softly as your tongue retracts, only to squeak and wriggle beneath you as you purse your lips and blow a gust over [hisher] nipple. ", parse);
		Text.NL();
		Text.Add("Somehow, it manages to get even harder than before, jutting accusingly at your face. As Terry whimpers in frustration, you decide you’ve played long enough. Your [tongue] curls out once more, flicking [hisher] nipple before you wrap your lips around it and start to drink.", parse);
	}
	else {
		Text.Add("You cannot hope to escape the magnificence of Terry’s mammoth milkers. On [hisher] petite little frame, they seem all the larger, commanding the attention of anyone who so much as glances [hisher] way.", parse);
		Text.NL();
		Text.Add("With the reverential respect they deserve, you reach out with one hand to try and encompass one luscious globe. It is far too large to fit, but even your slight squeeze elicits a moan of pleasure from the [foxvixen] beneath you.", parse);
		Text.NL();
		Text.Add("It seems a more delicate touch would be better here. You allow your hand to sink back, and then lower your face. Pursing your lips, you plant a tender kiss on the side of the boob you just squeezed, audibly smacking as you release [himher]. Then you move over to the opposite breast and kiss it in the same way.", parse);
		Text.NL();
		Text.Add("Feeling playful, you rain down a shower of feather-light kisses, nuzzling your way across the expanse of Terry’s breast. You culminate your brief display of affection by planting a warm, tender peck on each bud in turn, sucking just a little to coax [hisher] nipples to stand erect against your lips.", parse);
		Text.NL();
		if(terry.Relation() < 30) {
			Text.Add("Terry struggles with the effort to contain [hisher] moans as you pleasure [himher]. It’s cute… but ultimately ineffective.", parse);
			Text.NL();
			Text.Add("You always knew [heshe] would learn to love [hisher] boobies if [heshe] just gave them a chance.", parse);
		}
		else if(terry.Relation() < 60) {
			Text.Add("Terry laughs at your antics. <i>“You really like my big boobs, don’t you, [playername]?”</i>", parse);
			Text.NL();
			Text.Add("Mmm... yes, you certainly do.", parse);
			Text.NL();
			Text.Add("<i>“I should’ve guessed since you made them this big… perv.”</i> [HeShe] gives you a smug grin.", parse);
			Text.NL();
			Text.Add("Maybe, but you’re <b>[hisher]</b> perv, and [heshe] loves it.", parse);
		}
		else {
			Text.Add("<i>“Easy there, cow[boygirl]. If I didn’t know any better, I’d say that you only keep me around as a pair of walking tits.”</i> [HeShe] chuckles.", parse);
			Text.NL();
			Text.Add("Of course not! [HeShe]’s also got a damn sexy ass, too. And that long fluffy tail of [hishers] is just to die for...", parse);
			Text.NL();
			Text.Add("<i>“Cheeky bastard,”</i> [heshe] replies, showing you [hisher] tongue.", parse);
		}
		Text.NL();
		Text.Add("Shifting slightly atop of Terry, you reach out with both [hand]s, fingers extended. Tenderly, you touch Terry’s areolae and start to trace soft, sensuous circles around the peak of each bulbous breast. You playfully twitch each nipple as you pass, keeping your strokes smooth and steady to better lull your vulpine partner.", parse);
		Text.NL();
		Text.Add("A croon of pleasure rewards your efforts, bringing a smile to your face. You carefully glide your fingers down across the broad expanses of titty-flesh, using your thumbs to continue flicking and rubbing Terry’s nipples as you do. You start to squeeze and knead what boob-flesh you can reach, creating gentle palpitations that have Terry lolling [hisher] head back with a rumble of pleasure.", parse);
		Text.NL();
		Text.Add("Judging that Terry is ready, you finally slide your hands off to the sides, cupping [hisher] luscious bosom. Without further ado, you lower your mouth to start nursing.", parse);
	}
	Text.Flush();
	
	TimeStep({minute: 15});
	
	Gui.NextPrompt(function() {
		TerryScenes.SexHaveADrinkBreastsMilk(parse);
	});
}

TerryScenes.SexHaveADrinkBreastsMilk = function(parse : any) {
	let terry = GAME().terry;
	let player = GAME().player;

	//#Milk quantity block
	Text.Clear();
	
	var milk = terry.Milk();
	terry.MilkDrain(3);
	
	if(milk >= TerryFlags.MilkLevel.VeryHigh) {
		Text.Add("It seems like the moment your lips wrap around Terry’s nipple, it squirts milk down your throat. Obviously, the [foxvixen]’s big fat titties are just crammed full of milk, waiting to come out. Poor thing must be so distracted with them so full - you’re doing [himher] a favor by helping [himher] get rid of some.", parse);
		Text.NL();
		Text.Add("Feeling both thirsty and compassionate, you happily start guzzling down every drop Terry has to give you, at least until you realize that if [heshe]’s putting out this much milk, you may not be able to handle that much... Best to just take the edge off for [himher], then. You can always come back and drink some more after you’ve digested this liquid meal, after all.", parse);
		Text.NL();
		Text.Add("As best you can measure, you pop free after draining the worst of the milk from Terry’s breast. It’s so bloated that it continues seeping milk, running down onto [hisher] belly for several seconds after you stop suckling. Ignoring that, you latch your lips onto [hisher] other nipple and resume your nursing.", parse);
		Text.NL();
		Text.Add("You drink as much as you feel you can hold comfortably, belly softly gurgling as you release [himher]. You wipe your mouth with the back of your arm and sigh softly. That feels so good - and you bet it feels a lot better for your pet, too.", parse);
		Text.NL();
		if(terry.Relation() < 30) {
			Text.Add("<i>“Y-yeah. They were pretty heavy...”</i>", parse);
			Text.NL();
			Text.Add("Oh, poor thing. But you know how to make [himher] feel better...", parse);
		}
		else if(terry.Relation() < 60) {
			Text.Add("<i>“Sure does. Thanks for that, [playername]. They’re already pretty heavy and sensitive on their own, and being so full of milk doesn’t help,”</i> [heshe] giggles.", parse);
			Text.NL();
			Text.Add("You were happy to help. Sounds like a brave little [foxvixen] deserves some special care...", parse);
		}
		else {
			Text.Add("<i>“Yeah, it feels pretty good now. Y’know you can always count on me to keep you fed, even if our roles should be reversed, my dear [mastermistress],”</i> Terry teases, showing [hisher] tongue.", parse);
			Text.NL();
			Text.Add("With a laugh, you admit that you don’t doubt that, but right now, you’re the [mastermistress], and you’re not quite done playing with [himher] just yet...", parse);
		}
	}
	else if(milk >= TerryFlags.MilkLevel.High) {
		Text.Add("Almost immediately, Terry’s rich milk flows into your mouth and pours steadily down your gullet. Thick, warm and creamy, it’s a delicious beverage that eagerly entices you to drink more. It shows no sign of stopping anytime, and you guzzle away eagerly.", parse);
		Text.NL();
		Text.Add("When you tire of nursing from one teat, you switch your attention to the other, being greeted with the same enthusiasm as the first. Delicious [foxvixen] milk; Terry’s tits seem to be just about overflowing with it, and you could drink [himher] completely dry...", parse);
		Text.NL();
		Text.Add("That’s just being greedy - not to mention a good way to give yourself a tummy ache. You drink heartily all the same, but when your stomach starts to gurgle in soft protest, you force yourself to stop.", parse);
		Text.NL();
		Text.Add("Beads of white continue to glisten upon the caps of Terry’s nipples, and you allow yourself the luxury of deftly licking them clean, an act that makes Terry wriggle beneath you in quite an amusing fashion.", parse);
		Text.NL();
		Text.Add("Feeling very good, and very pleased with yourself, you consider how to properly thank your pet for providing such a delicious treat. Ah, that sounds promising...", parse);
	}
	else if(milk >= TerryFlags.MilkLevel.Mid) {
		Text.Add("After a few seconds of nursing, your reward is a smooth, steady flow of rich creamy [foxvixen] milk. Happily, you guzzle it down, gulping each heady mouthful before sucking forth a fresh one. Eventually, the flow becomes a thin trickle, and you turn to Terry’s other breast to fully sate your thirst.", parse);
		Text.NL();
		Text.Add("After several long, dreamy minutes, your belly grumbles its satiation and you allow Terry’s nipple to fall from your mouth. Sighing in contentment, basking in the feeling of warm fullness that ripples out from your stomach, you cuddle [himher] closer.", parse);
		Text.NL();
		Text.Add("It feels so nice to be here, twined about your vulpine pet. Through your milk-induced haze, it dawns on you that perhaps a little thank-you is in order...", parse);
	}
	else if(milk >= TerryFlags.MilkLevel.Low) {
		Text.Add("With slow, patient suckling, a trickle of warm [foxvixen] milk starts to creep over your tongue. Rich and creamy, with a heady bouquet, it glides sluggishly down your gullet and entices you to drink more. When the flow creeps to a stop, you switch over to the other breast, intent on getting a proper drink.", parse);
		Text.NL();
		Text.Add("As Terry sighs and coos above, you lazily drink your fill. A nice glow emanates from your belly as the last trickle of milk slides down your throat. You suck a little harder, but only meagar dribbles escape; it looks like you’ve sucked [himher] dry.", parse);
		Text.NL();
		Text.Add("Allowing the slickened teat to pop wetly from between your lips, you sigh hugely and thank Terry for [hisher] generosity.", parse);
		Text.NL();
		if(terry.Relation() < 30)
			Text.Add("<i>“Y-you’re welcome,”</i> [heshe] says nervously.", parse);
		else
			Text.Add("<i>“Anytime, [playername].”</i> [HeShe] grins.", parse);
		Text.NL();
		Text.Add("Such a nice [boygirl]. And nice [boygirl]s deserve a special thank you... hmm, you know just how to do it...", parse);
	}
	else {
		parse["sex"] = player.sexlevel > 2 ? " or what tricks you play with your tongue," : "";
		Text.Add("No matter how you work Terry’s nipple in your mouth,[sex] nothing comes out. You suckle and swallow and massage [hisher] tit until [heshe] mewls above you, but you can’t get so much as a drop.", parse);
		Text.NL();
		Text.Add("There’s no denying it: Terry is completely empty - [heshe] doesn’t have any milk to give. Maybe you should have given [himher] some more time to fill up again.", parse);
		Text.NL();
		parse["smallFull"] = terry.Cup() < TerryFlags.Breasts.Ccup ? "small" : "full";
		Text.Add("With that realization, you open your lips and let Terry’s nipple fall from them, and then rest your head against [hisher] [smallFull] bosom. This is kind of a let down... still, you have a cute little [foxvixen] under you to play with. Surely there’s some way to salvage this?", parse);
		Text.NL();
		Text.Add("As you reflect on that, a mischievous grin starts to grow on your face. You have some ideas already...", parse);
	}
	Text.NL();
	TerryScenes.SexHaveADrinkBreastsRomance(parse);
}

TerryScenes.SexHaveADrinkBreastsRomance = function(parse : any) {
	let terry = GAME().terry;

	Text.Add("Leisurely, you wrap your arms around Terry and snuggle close, demurely dipping your head down to play a tender kiss on the [foxvixen]’s collarbone, and grinning to yourself as [heshe] shivers in anticipation.", parse);
	Text.NL();
	Text.Add("With the same languid ease, you let your [tongue] loll freely from between your lips and start to glide it up Terry’s chest, stopping only when the silky fur gives way to cool leather.", parse);
	Text.NL();
	Text.Add("You wriggle forward, nuzzling your head into the crook of Terry’s neck safely above [hisher] ever-present collar. Mercilessly, you kiss [himher], long and deep, feeling the moan that [heshe] voices more than hearing it as you lewdly suckle at [hisher] throat.", parse);
	Text.NL();
	Text.Add("When you have had your fill, you let [himher] go, your lips smacking in satisfaction. Due to your intensity, you leave [himher] with quite an impressive hickey too.", parse);
	Text.NL();
	Text.Add("You begin to move again, bringing your gaze squarely to meet Terry’s own. Beautiful blue eyes fill your vision, and you lose yourself to them, content with just staring into their shimmering depths.", parse);
	Text.NL();
	if(terry.Relation() < 30)
		Text.Add("Terry’s gaze darts away for a moment, but they quickly turn to look back into your own. You can tell [heshe]’s a little confused, but despite that, you don’t feel like [heshe]’s rejecting you either.", parse);
	else if(terry.Relation() < 60)
		Text.Add("Terry’s gaze widens, it seems like [heshe]’s hoping for something from you, and you won’t disappoint.", parse);
	else
		Text.Add("Terry’s gaze sparkle with adoration, [hisher] relaxed yet hopeful demeanor gives away what [heshe]’s hoping for next. Well then, let’s not keep our pet [foxvixen] waiting...", parse);
	Text.NL();
	Text.Add("You lean forward and place a soft, sweet kiss on [hisher] dainty lips, holding [himher] for barely a heartbeat before letting go.", parse);
	Text.NL();
	if(terry.Relation() < 30) {
		Text.Add("<i>“[playername]... Wha- ...just what the hell are you doing?”</i> the [foxvixen] asks you, baffled.", parse);
		Text.NL();
		Text.Add("With an innocent smile, you reply that you’re just showing how much you appreciate your adorable little [foxvixen], that’s all.", parse);
		Text.NL();
		Text.Add("<i>“I don’t remember saying you could kiss me,”</i> [heshe] replies, trying to look at least a little mad at you.", parse);
		Text.NL();
		Text.Add("You don’t remember [himher] resisting either.", parse);
		Text.NL();
		Text.Add("<i>“I didn’t have time to!”</i> [heshe] protests.", parse);
		Text.NL();
		Text.Add("You just chuckle softly. [HeShe]’s so cute when [heshe] gets all flustered like that. Besides, you know all too well that [heshe] enjoyed it. Almost as much as [heshe]’ll enjoy this...", parse);
	}
	else if(terry.Relation() < 60) {
		Text.Add("<i>“That was nice,”</i> Terry says with a smile.", parse);
		Text.NL();
		Text.Add("You knew [heshe]’d like that. Of course, nothing says you have to stop there, if [heshe] doesn’t want you to...", parse);
		Text.NL();
		Text.Add("<i>“Hmm, in that case, go on. What else are you planning?”</i>", parse);
		Text.NL();
		Text.Add("Oh, you’re sure [heshe]’ll just love it.", parse);
	}
	else {
		Text.Add("<i>“Oh, come on! You call that a kiss?”</i>", parse);
		Text.NL();
		Text.Add("You feign innocence, giving the [foxvixen] your best bemused look.", parse);
		Text.NL();
		Text.Add("<i>“Here, I’ll show you what a real kiss is like!”</i> Terry’s arms envelop you in a tight hug as [heshe] pulls you down on top of [himher].", parse);
		Text.NL();
		Text.Add("This time, you’re the one who doesn’t have so much as a chance to squeak before Terry’s lips have seized your own. A hungry, passionate lip lock that sends tingles racing down your spine. You can’t hold back a moan, readily grinding yourself against [himher].", parse);
		Text.NL();
		Text.Add("The [foxvixen] happily takes this opportunity to slip [hisher] tongue past your lips and wrestle with your own, humming into the kiss as [heshe] exchanges saliva with you.", parse);
		Text.NL();
		Text.Add("Long, pleasant moments tick past as you playfully wrestle for control of both your mouth and Terry’s. Eventually, you are forced to break the kiss. A strand of glistening fluid link your lips for a moment as you raise your head.", parse);
		Text.NL();
		Text.Add("Chuckling, you concede that Terry certainly showed you what a real kiss is.", parse);
		Text.NL();
		Text.Add("<i>“Of course. And if you ever forget what it’s like, I’d be happy to show you as many times as necessary.”</i>", parse);
		Text.NL();
		Text.Add("", parse);
	}
	Text.NL();
	Text.Add("Oh, that sounds like a wonderful idea... but, you have a little something else in mind for [himher] right at this moment. Don’t worry, you know [heshe]’s just going to <i>love</i> it...", parse);
	Text.Flush();
	
	TimeStep({minute: 20});
	
	TerryScenes.SexHaveADrinkBreastsArousal(parse);
}

TerryScenes.SexHaveADrinkBreastsArousal = function(parse : any) {
	let terry = GAME().terry;
	//#arousal check block
	
	//[Cock][Pussy]
	var options = new Array();
	if(terry.FirstCock()) {
		var tooltip = "What better way to show your appreciation than with a nice massage on Terry’s ";
		if(terry.HorseCock()) tooltip += "fat stallionhood?";
		else tooltip += "dainty foxhood?";
		options.push({ nameStr : "Cock",
			tooltip : tooltip,
			func : function() {
				if(terry.HorseCock())
					TerryScenes.SexHaveADrinkBreastsArousalHorsecock(parse);
				else
					TerryScenes.SexHaveADrinkBreastsArousalFoxcock(parse);
			}, enabled : true
		});
	}
	if(terry.FirstVag()) {
		options.push({ nameStr : "Pussy",
			tooltip : Text.Parse("A tender pussy rubbing should be just the thing to thank your [handsomebeautiful] [foxvixen].", parse),
			func : function() {
				TerryScenes.SexHaveADrinkBreastsArousalPussy(parse);
			}, enabled : true
		});
	}
	if(options.length > 1)
		Gui.SetButtonsFromList(options, false, null);
	else
		Gui.NextPrompt(options[0].func);
}

TerryScenes.SexHaveADrinkBreastsArousalHorsecock = function(parse : any) {
	let terry = GAME().terry;
	let player = GAME().player;

	Text.Clear();
	Text.Add("You suddenly feel something poking against ", parse);
	var tail = player.HasTail();
	if(tail) {
		parse["tail"] = tail.Short();
		Text.Add("the base of your [tail].", parse);
	}
	else
		Text.Add("your [butt].", parse);
	Text.Add(" With feigned innocence, you shift atop the supine [foxvixen] until you have slid off, rising to your full height and circling [himher]. Terry’s mammoth erection stands out proudly between [hisher] thighs, almost begging you to take hold of it.", parse);
	Text.NL();
	Text.Add("But you ignore it, for the moment. Instead, you settle yourself next to Terry, scooping [himher] up and pulling [himher] neatly into your lap.", parse);
	Text.NL();
	Text.Add("Your arms twine around the [foxvixen]’s waist, reaching down to caress [hisher] thighs and coax them apart. Leaning forward, you whisper into Terry’s ear that [hisher] fur feels so soft...", parse);
	Text.NL();
	if(terry.Relation() < 30) {
		Text.Add("<i>“It does?”</i> [heshe] asks tentatively.", parse);
		Text.NL();
		Text.Add("Oh, yes; [heshe]’s just so silky and clean. You could just while away hours petting [himher] like a big puppy.", parse);
		Text.NL();
		Text.Add("<i>“Oh… umm, thanks I guess...”</i> [heshe] replies, ears flattening on [hisher] skull as [hisher] tail begins wagging ever so slightly.", parse);
		Text.NL();
		Text.Add("Aw, [heshe]’s just so cute when [heshe]’s embarrassed like that. Makes [himher] so much fun to tease.", parse);
		Text.NL();
		Text.Add("<i>“...Jerk.”</i> [HeShe] pouts.", parse);
	}
	else if(terry.Relation() < 60) {
		Text.Add("<i>“Thanks. Keeping my fur well-groomed on the go isn’t easy, you know?”</i>", parse);
		Text.NL();
		Text.Add("Well, if [heshe] ever wants a hand with that, you’d love to help out. Not that you need an excuse to put your hands all over [himher], of course.", parse);
		Text.NL();
		Text.Add("<i>“I’d be happy to take your help. Just be mindful of where you put your hands, or I might have to punish you,”</i> [heshe] replies with a snide grin.", parse);
		Text.NL();
		Text.Add("Oh, you wouldn’t dream of touching [himher] anywhere that [heshe] doesn’t want you to, but you know [heshe] secretly hopes that you’ll touch [himher] <i>everywhere</i>...", parse);
		Text.NL();
		Text.Add("<i>“[playername]! Are you accusing me of being a sick pervert like you?”</i>", parse);
		Text.NL();
		Text.Add("Yes, yes you are. Not that it’s a <i>bad</i> thing.", parse);
		Text.NL();
		Text.Add("<i>“...Okay, maybe I am hoping for that, but just a little.”</i> [HeShe] grins.", parse);
	}
	else {
		Text.Add("<i>“It better feel good. I go to great lengths to make sure my fluffiness is at it’s best,”</i> [heshe] replies, leaning back onto your [breasts].", parse);
		Text.NL();
		Text.Add("Oh, you can tell. [HeShe] does a wonderful job on it. You’re so lucky to have a sweet [foxvixen] who likes to keep [himher]self in such wonderful condition.", parse);
		Text.NL();
		Text.Add("<i>“Hmm, I love flattery, don’t stop now!”</i> [HeShe] giggles.", parse);
		Text.NL();
		Text.Add("[HisHer] wish is your command... Hmm, have you ever told [himher] that [hisher] eyes are bluer than the sky on a blissful spring morning? You could just get lost staring into their depths, drifting away into the vistas they promise...", parse);
		Text.NL();
		Text.Add("Terry turns to look at you, [hisher] muzzle split into a mischievous smile. <i>“Okay, okay. Just cut the sappy stuff and give me a kiss instead,”</i> [heshe] says, caressing your cheek and closing [hisher] eyes.", parse);
		Text.NL();
		Text.Add("As if you need further invitation. One hand lifts itself from [hisher] thighs to cup [hisher] chin as you plunge forward. Your lips lock hungrily with the [foxvixen]’s own, your own eyes closing as you savor the warmth of [himher], the taste of [hisher] breath in your mouth.", parse);
		Text.NL();
		Text.Add("Without thinking, you start to probe at [hisher] lips with your [tongueTip], seeking entrance.", parse);
		Text.NL();
		Text.Add("Terry not only welcomes you, but slips [hisher] tongue around yours to wrestle with your own muscle.", parse);
		Text.NL();
		Text.Add("You playfully tussle with your vulpine lover, then concede defeat. As [heshe] triumphantly withdraws [hisher] victorious tongue, you break the kiss, smacking your lips and smiling.", parse);
		Text.NL();
		Text.Add("<i>“Better than any fancy words, no?”</i> [HeShe] smiles.", parse);
		Text.NL();
		Text.Add("It has its advantages, you’ll admit.", parse);
		Text.NL();
		Text.Add("<i>“Now, didn’t you have something in store for me?”</i>", parse);
		Text.NL();
		Text.Add("Oh, yes, that’s right. You got so wrapped up in your lovely little [foxxyvixxy] that you almost forgot.", parse);
	}
	Text.NL();
	Text.Add("Your hand glides feather-soft over Terry’s inner thigh. Fingers caress [hisher] seed-swollen balls in passing, but don’t stop their advance, aiming for your true target. Terry’s long, mismatched phallus is hot against your [palm] as your digits wrap themselves possessively around [hisher] girth.", parse);
	Text.NL();
	Text.Add("You can feel it throb in time with Terry’s heartbeat as you swoop up the shaft and rub your fingers over its blunted tip, smearing your digits with the pre-cum already starting to ooze from [hisher] cumvein.", parse);
	Text.NL();
	Text.Add("Smiling to yourself, you continue to stimulate your pet [foxvixen] with languid strokes, gathering some of [hisher] leaking pre on every up-stroke and spreading it across [hisher] length on the down-stroke.", parse);
	Text.NL();
	Text.Add("Terry sinks down into your lap, letting out a sigh as [heshe] relaxes, happy to let you keep control of the situation. ", parse);
	if(terry.Relation() < 30)
		Text.Add("It’s rare for the [foxvixen] to lower [hisher] guard like that, but you can’t resist remarking that [heshe] seems to enjoying [himher]self.", parse);
	else
		Text.Add("Would you look at that? Is [heshe] enjoying [himher]self that much?", parse);
	Text.NL();
	Text.Add("<i>“Yeah...”</i>", parse);
	Text.NL();
	Text.Add("Oh, that's good, because you sure are're enjoying yourself. Just you, Terry and this big, meaty dick of [hishers]. [HeShe]'s so cute and sweet on the outside; who'd suspect that [heshe]'s hiding a monster like this in [hisher] pants? Isn't [heshe] happier with [himher]self now?", parse);
	Text.NL();
	Text.Add("<i>“When it feels this good? Hard not to be happy,”</i> [heshe] replies, chuckling softly.", parse);
	Text.NL();
	Text.Add("Grinning to yourself, you plant a deep, wet kiss on the nape of Terry’s neck, and chuckle as [heshe] wriggles in response. You tuck your head into the crook of [hisher] shoulder and sigh. You’re so happy to hear that.", parse);
	Text.NL();
	if(terry.Relation() < 30) {
		Text.Add("<i>“Look, [playername]. I know I give you a hard time, but I know that you’re a nice [guygirl] deep down. I just… I don’t know, I guess it’s difficult for me to trust other people.”</i>", parse);
		Text.NL();
		Text.Add("It’s okay, you can understand it hasn’t been easy for the poor [foxvixen], but you want to prove that you’re different. If [heshe]’ll give you a little time, you’ll prove [heshe] can trust you, you promise.", parse);
		Text.NL();
		Text.Add("<i>“Really? I hope that’s the case. I don’t want to have a bad relationship with you. I mean, I’m basically your slave right? It wouldn’t be good for to get on your bad side...”</i> [heshe] says, forcing a weak smile.", parse);
		Text.NL();
		Text.Add("You sigh softly and shake your head. Terry’s more to you than some slave - yes, the collar makes [himher] obey, but that’s not the only reason you want [himher] around. You’re not going to abuse the power it gives you over [himher], you promise. Terry means something special to you... you just wish [heshe] could give you a chance to mean something special to [himher], too.", parse);
		Text.NL();
		Text.Add("<i>“...Thank you, [playername]. I promise I’ll try not to be such a pain for you.”</i>", parse);
		Text.NL();
		Text.Add("You slip a hand around Terry’s waist to give [himher] a quick, gentle hug. That’s all you can ask of [himher].", parse);
		
		terry.relation.IncreaseStat(0, 2);
		terry.relation.IncreaseStat(30, 2);
	}
	else if(terry.Relation() < 60) {
		Text.Add("<i>“You know, it’s at times like this that I feel damn lucky that you’re the one who busted me out of jail.”</i>", parse);
		Text.NL();
		Text.Add("Oh? Why is that? [HeShe] doesn’t think someone else could have gotten [himher] a better deal?", parse);
		Text.NL();
		Text.Add("<i>“Better than this? Ha! No way. You’re really nice to me, and I feel really close to you. It’s like we connect, and I really cherish this bond we have.”</i>", parse);
		Text.NL();
		Text.Add("You feel the same way. Terry’s your special [foxvixen], and nothing’s going to change that.", parse);
		
		terry.relation.IncreaseStat(50, 1);
	}
	else {
		Text.Add("<i>“Hey, [playername]?”</i>", parse);
		Text.NL();
		Text.Add("Yes? What is it?", parse);
		Text.NL();
		Text.Add("<i>“I love you.”</i> [HeShe] looks at you in silence for a moment, then giggles. <i>“It feels nice to say that, I don’t think I get to say it enough...”</i>", parse);
		Text.NL();
		Text.Add("You kiss [hisher] nape again to interrupt. [HeShe] may not say it all that often, but the fact [heshe] always means it more than makes up for it. Besides, you love [himher] too - and you need to say that to [himher] more often.", parse);
		Text.NL();
		Text.Add("<i>“Nah, you don’t. I mean, I’m not going to complain, but just doing this, being together like this. It’s more than I could have ever hoped for. This must be what heaven feels like.”</i>", parse);
		Text.NL();
		Text.Add("Such a romantic your Terry is. You should do things like this more often, [heshe]’s so adorable when [heshe]’s waxing rhetorical.", parse);
		Text.NL();
		Text.Add("<i>“Hey, you got your hands wrapped up all over my cock. Hard to not get emotional when we’re like this.”</i> [HeShe] shows you [hisher] tongue.", parse);
		Text.NL();
		Text.Add("You really should play with [hisher] cock more often, then.", parse);
	}
	Text.NL();
	Text.Add("Time to give your pet a proper happy ending. Your strokes, once lazy and tender, begin to come faster and harder.", parse);
	Text.NL();
	Text.Add("Your pre-slick fingers work their way under the lips of Terry’s sheath, allowing you to caress the tenderest flesh beneath, and then trail up its underside to trace rings along [hisher] spreading flare. With your other hand, you reach down to cup Terry’s bloated seed-factories, convinced you can feel [himher] churn up a fresh batch of cum.", parse);
	Text.NL();
	Text.Add("<i>“Ahn! If you keep going like this, I won’t be able to hold back,”</i> [heshe] says, moaning in pleasure.", parse);
	Text.NL();
	Text.Add("Then [heshe] should just let it all out...", parse);
	Text.NL();
	
	var cum = terry.OrgasmCum();
	
	Text.Add("The [foxvixen] arches [hisher] back and does [hisher] best to howl as climax wracks [hisher] body. Hand clenched just above [hisher] turgid knot, you can feel [hisher] shaft distend as the first torrent of seed wells up from [hisher] groaning nuts.", parse);
	Text.NL();
	Text.Add("A great arc of white geysers from [hisher] flaring shaft, sailing through the air to splatter on the floor quite a distance away. An impressive shot indeed... but you think [heshe] can do better.", parse);
	Text.NL();
	Text.Add("Mischief burning in your heart, your curled fingers start to pump back and forth along Terry’s shaft, coaxing [himher] to launch each glob of seed further than the one before. [HeShe] writhes and squirms, helpless as you playfully aim each arc of semen to trace its own path.", parse);
	Text.NL();
	Text.Add("Inevitably, Terry’s bountiful balls run dry, and the last meager spurt of cum dribbles down over your fingers. Terry slumps against you with a luxuriant groan as you release [hisher] cock, snapping your wrist to remove the lingering fluids.", parse);
	Text.NL();
	Text.Add("Casting an eye over Terry’s paintings, you teasingly praise [hisher] efforts; who would believe such a cute little [foxvixen] could shoot [hisher] load that far?", parse);
	Text.NL();
	
	TimeStep({minute: 15});
	
	if(terry.Relation() < 30) {
		Text.Add("The [foxvixen] simply stares at you with disdain.", parse);
		Text.NL();
		Text.Add("Alright, that joke was a little in poor taste, given the moment you just shared. Still, [heshe] made quite an impressive splatter - [heshe] obviously enjoyed [himher]self a lot.", parse);
		Text.NL();
		Text.Add("<i>“Yeah, I’ll admit I did. Thanks for that.”</i>", parse);
		Text.NL();
		Text.Add("Oh, it was your pleasure.", parse);
		Text.NL();
		Text.Add("<i>“Well, uhh… is that all?”</i>", parse);
		Text.NL();
		Text.Add("You take a moment to consider that. This would be a perfect opportunity to ask for sex, or you could be generous and let Terry go now; you’ve had some milk, you got [himher] off, do you really need to fuck?", parse);
		Text.Flush();
		
		//[Ask for sex] [Finished]
		var options = new Array();
		options.push({ nameStr : "Ask for sex",
			tooltip : "You’re having too much fun to stop now.",
			func : function() {
				Text.Clear();
				Text.Add("Well, if [heshe]’s up for it, you would like to do a little more...", parse);
				Text.NL();
				Text.Add("<i>“Well, I guess fair is fair. So, what do you want to do?”</i>", parse);
				Text.Flush();
				
				TerryScenes.SexPromptChoice();
			}, enabled : true
		});
		options.push({ nameStr : "Finished",
			tooltip : "You’ve had enough, so you’ll let Terry go this time.",
			func : function() {
				Text.Clear();
				Text.Add("You pat Terry on the shoulder and assure the [foxvixen] that you’re finished with [himher]. For now, anyway.", parse);
				Text.NL();
				Text.Add("<i>“Okay,”</i> [heshe] says, gathering [hisher] clothes.", parse);
				Text.Flush();
				
				Gui.NextPrompt();
			}, enabled : true
		});
		Gui.SetButtonsFromList(options, false, null);
	}
	else if(terry.Relation() < 60) {
		Text.Add("<i>“Why the surprise? This huge cock is not just for show, y’know?”</i> [HeShe] grins.", parse);
		Text.NL();
		Text.Add("It most certainly isn’t. You’re so glad you gave it to [himher] - it’s just so much fun to play with...", parse);
		Text.NL();
		Text.Add("<i>“Hey now! Is that how you really see me? A toy [foxvixen] for you to play with?”</i> [heshe] asks with a smirk.", parse);
		Text.NL();
		Text.Add("[HeShe]’s cute, cuddly, fluffy, and makes cute little noises when you squeeze [himher]. You pinch [hisher] thigh, drawing a cute <i>yip</i> from the [foxvixen]. With a confident grin, you finish by saying that sounds like a toy to you.", parse);
		Text.NL();
		Text.Add("<i>“Meanie...”</i> [heshe] remarks, showing you [hisher] tongue.", parse);
		Text.NL();
		Text.Add("Smirking, you wrap your arms around Terry and hug [himher] close nuzzling the [foxvixen] affectionately. You both know [heshe] loves you for it.", parse);
		Text.NL();
		Text.Add("<i>“Cut it out, ya big perv,”</i> [heshe] says playfully pushing you away. <i>“I get it, no need to be so clingy.”</i> [HeShe] chuckles.", parse);
		Text.NL();
		Text.Add("Chortling yourself, you unwrap your arms and set the [foxvixen] free. You can’t help that [heshe]’s so huggable, though.", parse);
		Text.NL();
		Text.Add("<i>“More to the point though, you got me off. Aren’t you going to want me to return the favor?”</i>", parse);
		Text.NL();
		Text.Add("You pause for a second to consider your answer. It certainly would be a fair trade, but do you really want sex right now?", parse);
		Text.Flush();
		
		//[Yes] [No]
		var options = new Array();
		options.push({ nameStr : "Yes",
			tooltip : "Terry’s offering, you’re horny, so why pass it up?",
			func : function() {
				Text.Clear();
				Text.Add("You assure Terry that if [heshe] feels up to it, you’d be happy to give [himher] another round.", parse);
				Text.NL();
				Text.Add("<i>“Great! I’ll let you pick your poison then.”</i>", parse);
				Text.Flush();
				
				TerryScenes.SexPromptChoice();
			}, enabled : true
		});
		options.push({ nameStr : "No",
			tooltip : "Even if Terry’s in the mood for more, you’re not.",
			func : function() {
				Text.Clear();
				Text.Add("With a shake, you assure Terry that it’s alright. You’re not really in the mood for sex right now.", parse);
				Text.NL();
				Text.Add("<i>“Alright. Guess we’ll save it for later then,”</i> [heshe] says, collecting [hisher] clothes.", parse);
				Text.Flush();
				
				Gui.NextPrompt();
			}, enabled : true
		});
		Gui.SetButtonsFromList(options, false, null);
	}
	else {
		Text.Add("<i>“So, how about we see how far I can shoot when I’m <b>inside</b> you?”</i> [HeShe] winks at you.", parse);
		Text.NL();
		Text.Add("You can’t hold back a laugh at the [foxvixen]’s confidence. [HeShe] just came enough to embarrass a stallion; is [heshe] really so eager to go for another romp already?", parse);
		Text.NL();
		Text.Add("<i>“With a sexy thing like you? Always! Not to mention that as long as I have this.”</i> [HeShe] taps [hisher] collar. <i>“Getting ready for another go is easy as pie.”</i>", parse);
		Text.NL();
		Text.Add("Well, [heshe]’s right about that. And you have to admit, it’s at least a little tempting. If [heshe]’s so raring to go, maybe you ought to give [himher] another round...", parse);
		Text.Flush();
		
		//[Fuck] [Don’t fuck]
		var options = new Array();
		options.push({ nameStr : "Fuck",
			tooltip : "If Terry wants you this badly, why not oblige?",
			func : function() {
				Text.Clear();
				Text.Add("Well, since [heshe] asked so nicely, how can you turn [himher] down?", parse);
				Text.NL();
				Text.Add("<i>“I knew you couldn’t resist! Now, how do you want to play?”</i>", parse);
				Text.Flush();
				
				TerryScenes.SexPromptChoice();
			}, enabled : true
		});
		options.push({ nameStr : "Don’t fuck",
			tooltip : Text.Parse("Unfortunately for [himher], you’re really not in the mood for any more playtime.", parse),
			func : function() {
				Text.Clear();
				Text.Add("<i>“Don’t be like that, [playername]. You got me off, so it’s only fair I do the same for you. Plus I really, <b>reeeally</b> want you,”</i> [heshe] says, taking a step forward to gently stroke your [hips]. <i>“You’re not gonna be a jerkface and deny your favorite [foxvixen], are you?”</i> [heshe] asks, giving you [hisher] best impression of the infamous “puppy eyes”.", parse);
				Text.NL();
				Text.Add("You swallow hard, trying to retain your conviction in the face of Terry’s pleas. [HeShe] looks and sounds so heartbroken...", parse);
				Text.Flush();
				
				//[Submit] [Resist]
				var options = new Array();
				options.push({ nameStr : "Submit",
					tooltip : Text.Parse("How can you possibly say no to [himher] in the face of that?", parse),
					func : function() {
						Text.Clear();
						Text.Add("<i>“Works every single time,”</i> [heshe] says with a victorious grin.", parse);
						Text.NL();
						Text.Add("[HeShe] has gotten way too good at this. Still, you can’t find it in you to be mad.", parse);
						Text.NL();
						parse["len"] = player.Height() > terry.Height() + 10 ? Text.Parse(" standing on the tips of [hisher] toes and", parse) : "";
						Text.Add("<i>“Alright then, I’ll be a good sport and let you pick what we’ll be doing. But try not to take too long,”</i> [heshe] adds,[len] giving you a soft peck on the cheek.", parse);
						Text.Flush();
						
						TerryScenes.SexPromptChoice();
					}, enabled : true
				});
				options.push({ nameStr : "Resist",
					tooltip : "You have to stand strong!",
					func : function() {
						Text.Clear();
						Text.Add("<i>“Awww....”</i>", parse);
						Text.NL();
						Text.Add("You just stare at [himher], stubbornly holding your ground. You won’t be swayed, not this time.", parse);
						Text.NL();
						Text.Add("[HeShe] sighs in defeat. <i>“Okay then, I’ll concede this time, but next time you’re mine!”</i>", parse);
						Text.NL();
						Text.Add("Maybe, maybe not. You’ll just have to see.", parse);
						Text.Flush();
						
						Gui.NextPrompt();
					}, enabled : true
				});
				Gui.SetButtonsFromList(options, false, null);
			}, enabled : true
		});
		Gui.SetButtonsFromList(options, false, null);
	}
}

TerryScenes.SexHaveADrinkBreastsArousalFoxcock = function(parse : any) {
	let terry = GAME().terry;
	let player = GAME().player;

	Text.Clear();
	Text.Add("Decision made, you slide yourself neatly off of Terry’s back and seat yourself on the ground beside [himher]. Without preamble, you reach out and scoop the [foxvixen] off of the ground, pulling [himher] unceremoniously into your lap.", parse);
	Text.NL();
	if(player.FirstCock()) {
		Text.Add("Tempting as it is, you make certain that ", parse);
		if(player.NumCocks() > 1)
			Text.Add("your [cocks] do not", parse);
		else
			Text.Add("your [cock] doesn’t", parse);
		Text.Add(" penetrate [himher], instead sliding harmlessly between [hisher] thighs.", parse);
		Text.NL();
	}
	Text.Add("Your arms twine around the [foxvixen]’s waist, reaching down to caress [hisher] thighs and coax them apart. One hand then slides inwards towards the [foxvixen]’s crotch. The roundness of [hisher] dainty little balls is your first target, and you cup them carefully between your fingers, rolling them appreciatively across your palm before you continue.", parse);
	Text.NL();
	Text.Add("You can feel Terry’s erection with your [hand]. The petite vulpine dick has already risen to its full extent, throbbing softly against your [skin] in time with [hisher] heartbeat. Just brushing it with one finger makes Terry sharply suck in a breath and shudder against you.", parse);
	Text.NL();
	Text.Add("Mischievously, you note to Terry that it looks like [heshe] enjoyed your nursing.", parse);
	Text.NL();
	if(terry.Relation() < 30) {
		Text.Add("<i>“Yeah, I guess I did...”</i>", parse);
		Text.NL();
		Text.Add("No need to be so embarrassed about it; you wanted this to feel as good for [himher] as it does for you.", parse);
	}
	else if(terry.Relation() < 60) {
		Text.Add("<i>“Heh, of course I did. I mean, there had to be a reason you gave me these; ‘sides eye-candy, I mean.”</i>", parse);
		Text.NL();
		Text.Add("Not that they don’t do an ample job there, too.", parse);
	}
	else {
		Text.Add("<i>“It’s always a thrill with you, [playername]. You should know that much,”</i> [heshe] says with a smile.", parse);
		Text.NL();
		Text.Add("Oh, you know. It’s just so pleasing to be hearing it from [hisher] lips.", parse);
	}
	Text.NL();
	Text.Add("Slowly, your hand starts to pump the [foxvixen]’s shaft, fingers kneading as you rise and fall along its diminutive length. Terry sighs dreamily and then lazily slumps back against you. If [heshe] were a cat, you’re certain [heshe]’d be purring in time with your touch.", parse);
	Text.NL();
	Text.Add("The sight brings a smile to your face. Such a laid-back little [foxvixen]. [HeShe]’s enjoying this, isn’t [heshe]?", parse);
	Text.NL();
	Text.Add("<i>“Yeah, it feels pretty good.”</i>", parse);
	Text.NL();
	Text.Add("You thought as much; [heshe] looks so content. [HeShe] really is far too cute for [hisher] own good, does [heshe] know that? ", parse);
	if(terry.PronounGender() == Gender.female)
		Text.Add("With her sweet[little] tits and this dainty little girl-cock in your fingers, she’s just the yummiest girl you’ve ever held. ", {little: terry.Cup() < TerryFlags.Breasts.Bcup ? " little" : ""});
	else
		Text.Add("Between his pretty face, his[big] milky boobs and this sweet little fox-dick, you could just eat him up.", {big: terry.Cup() >= TerryFlags.Breasts.Ccup ? " big" : ""});
	Text.NL();
	Text.Add("<i>“Yet, here you are stroking my dick and fondling my balls… perv.”</i>", parse);
	Text.NL();
	Text.Add("[HeShe] wouldn’t get this kind of treatment if you weren’t. It’s not such a bad thing that you are, is it?", parse);
	Text.NL();
	Text.Add("<i>“Maybe not,”</i> [heshe] giggles. <i>“Focus a bit more on the tip?”</i>", parse);
	Text.NL();
	Text.Add("Like this? You slide your fingers up until you are caressing [hisher] pointy glans with just the tips.", parse);
	Text.NL();
	Text.Add("<i>“Yeah, right - ahn! - there!”</i>", parse);
	Text.NL();
	Text.Add("As the [foxvixen] luxuriates, you consider what you should do with your free hand. You’re already molesting Terry’s cock with one hand, and with [himher] seated like this, [hisher] ass is a little tricky to get to.", parse);
	Text.NL();
	Text.Add("Mind made up, you reach up and carefully cup one of [hisher] [tbreasts]. ", parse);
	if(terry.Cup() <= TerryFlags.Breasts.Acup)
		Text.Add("The petite little orb fits effortlessly into your cupped hand. With so little flesh, you have to settle for stroking it with your palm more than kneading it.", parse);
	else if(terry.Cup() <= TerryFlags.Breasts.Bcup)
		Text.Add("Perfectly sized for what you have in mind, the boob meshes effortlessly with your cupped fingers. Just enough titflesh to caress as you rub it with your palm.", parse);
	else if(terry.Cup() <= TerryFlags.Breasts.Ccup)
		Text.Add("Fat and full, Terry’s generous breast squishes delightfully as your digits close around it, bulging softly where your hand can’t cover it. You hardly need to press down with your palm, and instead focus on kneading with your fingers.", parse);
	else
		Text.Add("The juicy fruit of Terry’s bosom is soft and pliant under your digits. So lusciously ripe that you haven’t a hope of fitting it into your hand, you settle for shamelessly groping it, fingers working to caress, knead and stroke everything that you can reach.", parse);
	Text.NL();
	Text.Add("Terry moans, arching [hisher] back at your touch. As you continue to caress [himher], you ask if you’re being too rough; you know [hisher] nipples must be extra-sensitive at the moment.", parse);
	Text.NL();
	Text.Add("<i>“A bit, but it also feels - oh! - so good.”</i> [HeShe] grinds back against you, fluffy tail batting your side as it wags.", parse);
	Text.NL();
	Text.Add("That’s good to hear. Your sweet little pet deserves a reward from time to time. If you had a third hand, you’d scratch [himher] between the ears.", parse);
	Text.NL();
	Text.Add("You continue your task, smiling to yourself when Terry starts bucking into your hand. [HisHer] knot grows under your careful ministrations, a sign that Terry is approaching [hisher] climax.", parse);
	Text.NL();
	Text.Add("Well, there’s no need to hold back now. If [heshe]’s close, [heshe] should just cum for you.", parse);
	Text.NL();
	Text.Add("<i>“I - ahn!”</i>", parse);
	Text.NL();
	Text.Add("Here, since you’re such a nice [guygirl], you’ll help [himher]. You move your hand down to encircle the base of [hisher] shaft, forming a seal around [hisher] knot, then give it a small yank upwards. Terry moans and bucks [hisher] hips, lifting [himher]self off you just enough for you to slip your hand underneath [himher].", parse);
	Text.NL();
	Text.Add("You cup [hisher] bubble butt and adjust [himher] so [heshe]’s sitting on [hisher] knees. Brandishing a pair of fingers, you lather them with your saliva and press both digits to Terry’s waiting pucker.", parse);
	Text.NL();
	Text.Add("<i>“[playername]...”</i> [heshe] starts, before a moan cuts [himher] short.", parse);
	Text.NL();
	Text.Add("Terry, you whisper [hisher] name.", parse);
	Text.NL();
	Text.Add("<i>“Y-yeah?”</i>", parse);
	Text.NL();
	Text.Add("Cum for me, you order [himher], promptly shoving your slickened finger up [hisher] butt.", parse);
	Text.NL();
	Text.Add("The [foxvixen] cries out in pleasure, spasming as you curl your digits to press on [hisher] prostate like a pleasure buzzer. You can feel [hisher] shaft throb in your hand and let loose the first rope of [hisher] vulpine seed.", parse);
	Text.NL();
	Text.Add("You give Terry no quarter, massaging [hisher] prostate throughout [hisher] orgasm, pulling [himher] close in an attempt to encompass [himher] as the [foxvixen] shivers with the effort of pushing [hisher] cum out into the air.", parse);
	Text.NL();
	
	var cum = terry.OrgasmCum();
	
	Text.Add("Your pet [foxvixen] isn’t terribly productive, so you’re not surprised when the flow of [hisher] seed tapers after only a few shots. You give [hisher] prostate one more push to draw the last stubborn rope from [himher] and then pull your fingers out.", parse);
	Text.NL();
	Text.Add("Chuckling to yourself, you pat Terry’s head and whisper into [hisher] ears that [heshe]’s a good [boygirl].", parse);
	Text.NL();
	Text.Add("<i>“Hmm...”</i> [heshe] simply moans, slumping down.", parse);
	Text.NL();
	Text.Add("Seems like you wore [himher] out.", parse);
	Text.NL();
	
	TimeStep({minute: 15});
	
	if(terry.Relation() < 30) {
		Text.Add("<i>“Uhh, just give me a few minutes...”</i>", parse);
		Text.NL();
		Text.Add("Of course, you tell [himher], bringing [himher] closer for a hug.", parse);
		Text.NL();
		Text.Add("True to [hisher] word, it only takes a bit before [heshe] extracts [himher]self from your arms. <i>“Thanks, [playername]. That was pretty great, although I’m not sure I liked you fingering my ass like that,”</i> [heshe] adds with a pout.", parse);
		Text.NL();
		Text.Add("Considering [hisher] reaction, you didn’t think [heshe]’d complain.", parse);
		Text.NL();
		Text.Add("<i>“I’m not! I’d just appreciate a little warning next time, that’s all.”</i>", parse);
		Text.NL();
		Text.Add("You’ll consider it, though it does take a bit of the fun away.", parse);
		Text.NL();
		Text.Add("<i>“Yeah… right...”</i>", parse);
		Text.NL();
		Text.Add("Now that your [foxvixen] has gotten off and is sufficiently rested, perhaps you should consider asking for some reciprocity?", parse);
		Text.Flush();
		
		//[Yes][No]
		var options = new Array();
		options.push({ nameStr : "Yes",
			tooltip : Text.Parse("After that display of [hishers], you sure could use some help getting off yourself.", parse),
			func : function() {
				Text.Clear();
				Text.Add("<i>“You still want to fool around? Well, alright I guess. I mean, it’s only fair right?”</i> [heshe] asks with a timid smile.", parse);
				Text.NL();
				Text.Add("Fair is fair indeed, now… what will you do?", parse);
				Text.Flush();
				
				TerryScenes.SexPromptChoice();
			}, enabled : true
		});
		options.push({ nameStr : "No",
			tooltip : "The closeness and the show were enough for you.",
			func : function() {
				Text.Clear();
				Text.Add("You tell Terry to get dressed, the two of you need to get back to your duties.", parse);
				Text.NL();
				Text.Add("<i>“Okay,”</i> [heshe] says, already gathering [hisher] clothes.", parse);
				Text.Flush();
				
				Gui.NextPrompt();
			}, enabled : true
		});
		Gui.SetButtonsFromList(options, false, null);
	}
	else if(terry.Relation() < 60) {
		Text.Add("<i>“I can still keep going...”</i>", parse);
		Text.NL();
		Text.Add("You laugh at [hisher] reply. Even if [heshe] could, it might be better to wait for a bit. You don’t want others to think you’re abusing your poor pet [foxvixen].", parse);
		Text.NL();
		Text.Add("<i>“More than you already do?”</i> [heshe] asks with a smirk.", parse);
		Text.NL();
		Text.Add("Well now, that is an entirely different type of <i>abuse</i>. Plus, you feel you’re entirely justified, considering how [heshe] keeps waving that cute butt and fluffy tail in front of you.", parse);
		Text.NL();
		Text.Add("<i>“Yeah, I should know better than to tempt a huge perv, right?”</i>", parse);
		Text.NL();
		Text.Add("As if [heshe] wasn’t one [himher]self…", parse);
		Text.NL();
		Text.Add("Terry simply chuckles and shows you [hisher] tongue. <i>“Alright, I guess I feel well enough now. So… how about I pay you back for our little fun time?”</i>", parse);
		Text.NL();
		Text.Add("Hmm…", parse);
		Text.Flush();
		
		//[Yes][No]
		var options = new Array();
		options.push({ nameStr : "Yes",
			tooltip : Text.Parse("Since [heshe]’s offering, why not? After all, you’ve got an itch that could use some scratching...", parse),
			func : function() {
				Text.Clear();
				Text.Add("Terry grins. <i>“Knew you couldn’t resist the invitation of more sloppy [foxvixen] sex. Ya big perv!”</i>", parse);
				Text.NL();
				Text.Add("Ouch! Now [heshe]’s just hurting you!", parse);
				Text.NL();
				Text.Add("[HeShe] laughs. <i>“Okay, okay. Will you take my apology if I let you decide what to do next?”</i>", parse);
				Text.NL();
				Text.Add("Sure! [HeShe]’s got [himher]self a deal!", parse);
				Text.NL();
				Text.Add("<i>“Figures...”</i> [heshe] says rolling [hisher] eyes.", parse);
				Text.Flush();
				
				TerryScenes.SexPromptChoice();
			}, enabled : true
		});
		options.push({ nameStr : "No",
			tooltip : "Much as you appreciate the offer, right now you’re just not in the mood.",
			func : function() {
				Text.Clear();
				Text.Add("<i>“Alright then. There’s always next time, right?”</i>", parse);
				Text.NL();
				Text.Add("Definitely! You reply, gathering your clothes alongside Terry.", parse);
				Text.Flush();
				
				Gui.NextPrompt();
			}, enabled : true
		});
		Gui.SetButtonsFromList(options, false, null);
	}
	else {
		Text.Add("<i>“Only a little,”</i> [heshe] replies, giggling.", parse);
		Text.NL();
		Text.Add("That so? Will [heshe] be needing some time to rest?", parse);
		Text.NL();
		Text.Add("<i>“Depends, will you hold me while I’m resting?”</i>", parse);
		Text.NL();
		Text.Add("Hmm… yes?", parse);
		Text.NL();
		Text.Add("<i>“Then a couple minutes wouldn’t hurt,”</i> [heshe] says, leaning against you and adjusting [himher]self into a more comfortable position.", parse);
		Text.NL();
		Text.Add("You let your arms drape over the [foxvixen], hugging [himher] closer as you luxuriate into [hisher] soft fur. Chuckling softly, you question [hisher] lack of snarky remarks. Not gonna call you a perv or anything this time?", parse);
		Text.NL();
		Text.Add("<i>“I figure I don’t have to keep stating the obvious, plus we both know you can’t keep your hands off me.”</i> [HeShe] grins.", parse);
		Text.NL();
		Text.Add("Right back at [himher], you say.", parse);
		Text.NL();
		Text.Add("<i>“Oh, but I wasn’t always like this. You corrupted me with your insatiable perviness.”</i>", parse);
		Text.NL();
		Text.Add("So [heshe] blames you? Alright then, you’ll fix [himher] right up. From now on, there will be no more perviness from your part.", parse);
		Text.NL();
		Text.Add("<i>“Whoa, let’s not take any drastic measures, [playername]. You dangle a bone in front of me and then take it away before I even had a chance to chew it up properly,”</i> [heshe] protests.", parse);
		Text.NL();
		Text.Add("Aha, you knew that was going to get a reaction!", parse);
		Text.NL();
		Text.Add("<i>“Jerk...”</i>", parse);
		Text.NL();
		Text.Add("Silly [foxvixen]...", parse);
		Text.NL();
		Text.Add("<i>“Kiss me?”</i> [heshe] asks, twisting around to face you.", parse);
		Text.NL();
		Text.Add("You simply close your eyes and stroke [hisher] cheek in reply.", parse);
		Text.NL();
		Text.Add("Terry presses [hisher] lips against yours into a short kiss, leaving you with a sweet aftertaste when [heshe] breaks away.", parse);
		Text.NL();
		Text.Add("<i>“Okay, I feel good to go now. So, how about me paying you back for the treatment?”</i>", parse);
		Text.Flush();
		
		//[Sure][Later]
		var options = new Array();
		options.push({ nameStr : "Sure",
			tooltip : "Sounds like a wonderful idea.",
			func : function() {
				Text.Clear();
				Text.Add("<i>“Great! I’ll let you decide how I can repay you then, I’m cool with anything, as long as it involves you, my sexy [playername],”</i> [heshe] says, gently caressing your cheek.", parse);
				Text.Flush();
				
				TerryScenes.SexPromptChoice();
			}, enabled : true
		});
		options.push({ nameStr : "Later",
			tooltip : Text.Parse("You’re fine. You just wanted to pleasure your favorite [foxvixen].", parse),
			func : function() {
				Text.Clear();
				Text.Add("<i>“...You really think I’ll buy that? You’ve had your fun, now it’s time for me to have mine. Plus I feel really, <b>really</b> thankful,”</i> [heshe] says, caressing your [breasts].", parse);
				Text.Flush();
				
				//[Give in][Don’t]
				var options = new Array();
				options.push({ nameStr : "Give in",
					tooltip : Text.Parse("Well if [heshe]’s <i>that</i> thankful, you see no point in denying the [foxvixen] [hisher] fun.", parse),
					func : function() {
						Text.Clear();
						Text.Add("<i>“Glad we could see eye to eye, now watcha feel like doing, my lovely?”</i>", parse);
						Text.NL();
						Text.Add("Hmm…", parse);
						Text.Flush();
						
						TerryScenes.SexPromptChoice();
					}, enabled : true
				});
				options.push({ nameStr : "Don’t",
					tooltip : "Much as you appreciate the invitation, you really don’t feel like fooling around right now.",
					func : function() {
						Text.Clear();
						Text.Add("[HeShe] doesn’t mind if you two do that later, does [heshe]?", parse);
						Text.NL();
						Text.Add("<i>“Well, I really wanted to get some [playername] right now, but since I like you so much, I suppose I can make a little sacrifice for your sake - this time.”</i>", parse);
						Text.NL();
						Text.Add("Lucky you…", parse);
						Text.NL();
						Text.Add("<i>“Careful, I might just take a bite at you sometime.”</i>", parse);
						Text.NL();
						Text.Add("You don’t doubt that.", parse);
						Text.NL();
						Text.Add("<i>“Cool, we have an understanding then,”</i> [heshe] says, getting up and letting [hisher] fluffy tail brush against your cheek.", parse);
						Text.NL();
						Text.Add("Terry ensures you get a good view of [hisher] naughty bits as [heshe] sets about dressing [himher]self back up. Damn this [foxvixen]...", parse);
						Text.Flush();
						
						player.AddLustFraction(0.25);
						
						Gui.NextPrompt();
					}, enabled : true
				});
				Gui.SetButtonsFromList(options, false, null);
			}, enabled : true
		});
		Gui.SetButtonsFromList(options, false, null);
	}
}

TerryScenes.SexHaveADrinkBreastsArousalPussy = function(parse : any) {
	let terry = GAME().terry;
	let player = GAME().player;

	Text.Clear();
	Text.Add("Time to make your little [foxvixen] really feel like a woman...", parse);
	if(terry.PronounGender() == Gender.male)
		Text.Add(" Oh, how he’d chew you out if you said that to his face...", parse);
	Text.NL();
	Text.Add("Delicately, you slide yourself off of Terry’s chest and settle onto the ground beside [himher]. Then, quick as a wink, you snatch [himher] up and unceremoniously swing [himher] into your lap.", parse);
	Text.NL();
	if(terry.Relation() < 30) {
		Text.Add("<i>“[playername]?”</i>", parse);
		Text.NL();
		Text.Add("Smiling softly to yourself, you place a gentle finger on the [foxvixen]’s lips and shush [himher]. All [heshe] needs to do is to relax; [heshe]’s going to love this...", parse);
		Text.NL();
		Text.Add("Terry complies, though you do detect a hint of tension on [hisher] shoulders as [heshe] leans back against you.", parse);
		Text.NL();
		Text.Add("That’s a good [boygirl]. Just settle down and let you work your magic...", parse);
	}
	else if(terry.Relation() < 60) {
		Text.Add("<i>“Hm? What are you planning?”</i>", parse);
		Text.NL();
		Text.Add("Oh, just something [heshe]’s going to enjoy, you promise [himher] that.", parse);
		Text.NL();
		Text.Add("<i>“Then I can get a refund if I don’t enjoy it?”</i> [heshe] asks teasingly.", parse);
		Text.NL();
		Text.Add("That sounds fair enough, but you doubt [heshe]’ll get a chance to collect.", parse);
		Text.NL();
		Text.Add("<i>“Someone’s feeling confident.”</i>", parse);
		Text.NL();
		Text.Add("Oh, you have good reason to feel that way. Let’s show [himher] why...", parse);
	}
	else {
		Text.Add("<i>“Haha, big perv can’t keep [hisher] [hand]s off me?”</i>", parse);
		Text.NL();
		Text.Add("Nope. You don’t want to try, either. You’d rather play with your fluffy little [foxvixen] instead.", parse);
		Text.NL();
		Text.Add("<i>“Sheesh, maybe I should start charging you by the hour?”</i> [heshe] asks teasingly.", parse);
		Text.NL();
		Text.Add("Oh, [heshe] really is a thief, isn’t [heshe]? First, [heshe] steals your heart, now [heshe] wants to bleed your wallet dry?", parse);
		Text.NL();
		Text.Add("<i>“What can I say? I take pride in my work.”</i> [HeShe] grins.", parse);
		Text.NL();
		Text.Add("As do you. Now, if [heshe]’ll let you start, you’re sure [heshe] won’t regret giving you this one for free.", parse);
	}
	Text.NL();
	Text.Add("Tucking your head into the crook of the [foxvixen]’s neck, your arm gently snakes around [hisher] waist and rests itself upon [hisher] midriff. ", parse);
	
	var womb = terry.PregHandler().Womb();
	var preg = womb && womb.pregnant;
	var stage = womb && womb.progress;
	
	if(preg) {
		if(stage > 0.75) {
			Text.Add("Hugely round and ripe, Terry’s belly is stretched tight over the engorged womb beneath. [HisHer] fur has grown thin in [hisher] gravidity, and you can feel the soft, silken skin as you tenderly caress it. Hard and firm, there is almost no give to [hisher] skin at all, a sign that your child will be with you soon.", parse);
			Text.NL();
			Text.Add("Your fingers spiral around and around, brushing out as far as you can hope to reach. You outline a gentle tattoo upon the taut flesh as you reach lower, cupping the underside of the bulging orb.", parse);
		}
		else if(stage > 0.5) {
			Text.Add("The [foxvixen]’s pregnancy is unmistakable, belly bulging like some ripe fruit. You lovingly run your hand across the great swell of white, silken fur, feeling it slide smoothly beneath your touch. Underneath lies skin grown increasingly taut, though with still a little give to it; [heshe] has bigger still to grow.", parse);
			Text.NL();
			Text.Add("Though you have to strain a little to reach it all, you trace a circuitous route around [hisher] stomach with your [palm], stopping only when you can tenderly pinch [hisher] protruding nipple between your forefinger and thumb.", parse);
		}
		else if(stage > 0.25) {
			Text.Add("As your child grows inside of [himher], Terry’s belly has begun to swell. Like a loaf rising in an oven, it has bulged out, forming a distinct rounded shape. Though the skin bows beneath your hand, you can feel the firm tightness of it, the womb growing increasingly full inside.", parse);
			Text.NL();
			Text.Add("You lazily start to rub your hand back and forth, using long, smooth strokes that glide over [hisher] luscious fur. Gently, you knead and caress, rubbing circles as you go.", parse);
		}
		else {
			Text.Add("Lush, silken fur greets your hand as it starts to stroke back and forth. Terry’s stomach is toned and firm, but there’s something a little off about it. Your hand is drawn down below [hisher] navel, where you can feel it better.", parse);
			Text.NL();
			Text.Add("There’s a tightness to the flesh there, as if something beneath was starting to make it stretch and yet, [heshe] is growing wider; the unmistakable beginnings of a small bulge lie under your hand. Trying to make it out better, you continue to brush back and forth. You have a sneaking suspicion of what it is. Looks like Terry is going to be a mommy...", parse);
		}
	}
	else {
		Text.Add("Terry isn’t exactly packing a set of rippling six-pack abs, but [heshe]’s not some butterball either - not by a long shot. As your hand glides over long, soft fur, you can feel the firm, toned flesh beneath. Terry’s stomach is flat as a pancake, perfect for you to rub back and forth. Slowly, at first, but then quicker, massaging [himher] deeper with each stroke.", parse);
	}
	Text.NL();
	Text.Add("The [foxvixen] groans luxuriantly, relaxing against you as if you were a full-body pillow. You smile to yourself, but you have more in mind than a mere tummy rub. Still tracing circles across [hisher] flesh, you allow your hand to creep lower, reaching for Terry’s loins.", parse);
	Text.NL();
	Text.Add("Without even thinking about it, Terry spreads [hisher] legs, giving you access. ", parse);
	if(terry.HorseCock()) {
		Text.Add("The impressive length of stallionflesh has already begun to creep from its sheath as your fingers wrap around it. It hardens under your touch, mighty veins throbbing as they work to engorge it to its full stature. You allow yourself the luxury of caressing it, savoring the feel of its turgid weight pulsing in your grip.", parse);
		Text.NL();
		Text.Add("Terry arches [hisher] back and mewls softly, shifting restlessly in your lap. You doubt that [heshe]’d object to a handjob, but you have something different in mind.", parse);
		Text.NL();
		Text.Add("Ignoring [hisher] whimper of protest, you release [hisher] horsehood and creep down lower still. You spare [hisher] full, heavy testes a quick caress in passing, but your real target lies beneath, and so you nudge them aside to expose [hisher] womanhood.", parse);
	}
	else if(terry.FirstCock()) {
		Text.Add("The [foxvixen]’s dainty little cock is already wet and throbbing as your hand grazes it in passing. You can’t resist the urge to palm it, feeling it pulse as you gently rub its length up and down with tender motions.", parse);
		Text.NL();
		Text.Add("Terry moans softly, clearly relishing the attention. It would be so easy to just pet [himher] until [heshe] cums... but you know [heshe]’ll like what you have planned even better.", parse);
		Text.NL();
		Text.Add("Downwards your fingers creep, pausing only to playfully tickle [hisher] little balls with your fingertips. Nudging them aside, you are rewarded with your true goal: the pink lips of Terry’s pussy.", parse);
	}
	else {
		Text.Add("Nothing stops you from reaching your target, as your fingers descend unflinchingly toward Terry’s cunt.", parse);
	}
	Text.NL();
	if(terry.Relation() < 30) {
		Text.Add("<i>“Huh? That’s-”</i>", parse);
		Text.NL();
		Text.Add("Going to make [himher] feel very good, yes. It is why you gave [himher] a pussy, after all; just for occasions like this.", parse);
		Text.NL();
		Text.Add("<i>“Hmm, o-okay.”</i>", parse);
	}
	else if(terry.Relation() < 60) {
		Text.Add("<i>“Hmm, so this is what you had in mind, huh?”</i>", parse);
		Text.NL();
		Text.Add("Yep. Is [heshe] disappointed?", parse);
		Text.NL();
		Text.Add("[HeShe] shakes [hisher] head. <i>“Not really, I kinda expected you to go for my honeypot, so I’d say this is pretty typical.”</i> [HeShe] smiles.", parse);
		Text.NL();
		Text.Add("Well, you’re glad [heshe]’s okay with this. It’s the perfect thing to make [himher] feel good about [himher]self.", parse);
	}
	else {
		Text.Add("<i>“Ah! So this is what you had in mind, my pervy [mastermistress]?”</i>", parse);
		Text.NL();
		Text.Add("That’s right. Just the thing for pleasing a pervy little [foxxyvixxy].", parse);
		Text.NL();
		Text.Add("<i>“Hmm, okay. Go ahead then; pet me good...”</i>", parse);
		Text.NL();
		Text.Add("Oh, with pleasure...", parse);
	}
	Text.NL();
	Text.Add("You carefully run the tip of your finger up along one dainty vulva lip. The smooth, silken flesh crinkles at your touch, reflexively trying to squeeze close and making you retreat to avoid being caught. When Terry relaxes, you move in again, languidly running your digit back and forth along the warm, soft skin. You stroke up and down, slowly tracing the full lengths of [hisher] netherlips.", parse);
	Text.NL();
	Text.Add("<i>“Ahn...”</i> the [foxvixen] moans softly. As you stroke, you can feel [himher] becoming wet, slowly leaking and moistening your [hand]s, making it easier to rub and caress [himher] just the right way. As you continue your ministrations, it doesn’t take long until the air around you is saturated with the scent of horny [foxvixen].", parse);
	Text.NL();
	Text.Add("You close your eyes and inhale, loudly and deliberately, basking in the scent of Terry’s arousal. With a satisfied purr, you note that Terry truly makes the most wonderful perfume.", parse);
	Text.NL();
	if(terry.Relation() < 60) {
		Text.Add("<i>“D-don’t tease me like that...”</i>", parse);
		Text.NL();
		parse["c"] = terry.FirstCock() ? " mixed with the scent of pre-cum," : "";
		Text.Add("Oh, but you mean every word. The smell of [hisher] pussy just drooling in lust,[c] it’s just intoxicating. If only [heshe] would wear it more often...", parse);
		Text.NL();
		Text.Add("Terry swallows audibly. <i>“I’m not sure what to say...”</i> [heshe] says, flustered by your words.", parse);
		Text.NL();
		Text.Add("Then don’t say anything, you tell [himher]. Just sit back, relax, and enjoy it. A pretty thing like [himher] shouldn’t be worrying so much.", parse);
	}
	else {
		Text.Add("<i>“Hmm, I’m glad you like my scent, but don’t get shy and stop with the flattery. I love hearing you say how much you like me.”</i> [HeShe] giggles.", parse);
		Text.NL();
		Text.Add("And you love telling [himher] how much you love [himher]. This scent of [hishers], why, it drives you wild; if [heshe] wore it more often, you don’t think you’d get anything done. [HeShe]’s simply irresistible...", parse);
		Text.NL();
		Text.Add("<i>“Maybe I should bottle it up and start using it then?”</i> [HeShe] grins. <i>“I wouldn’t mind having you all over myself...”</i>", parse);
		Text.NL();
		Text.Add("Fresh is always better, and you certainly don’t mind helping [himher] with the extraction process...", parse);
	}
	Text.NL();
	Text.Add("Feeling that Terry is finally ready, you worm your way carefully into [hisher] clitoral hood. The [foxvixen]’s clitoris is already jutting from the soft, plush flesh in arousal, and your fingertips close around it without hesitation.", parse);
	Text.NL();
	Text.Add("Terry inhales sharply, and wriggles at your touch. As you tenderly caress and knead the sensitive pleasure buzzer, [heshe] moans and mewls, panting as you tease [himher] and lure [himher] closer and closer to the edge.", parse);
	Text.NL();
	Text.Add("<i>“[playername]! I think I’m about to- Ah!”</i>", parse);
	Text.NL();
	
	var cum = terry.OrgasmCum();
	
	Text.Add("You can feel the [foxvixen]’s spine flexing as [heshe] arches [hisher] back, head turned skyward as if baying at some unseen moon. Thick femcum sprays from [hisher] pussy, squirting between its quenched lips and smearing over your dangling fingers.", parse);
	Text.NL();
	if(terry.FirstCock()) {
		if(terry.HorseCock())
			Text.Add("The equine pillar above erupts in an arcing fountain of hermseed, neglected balls almost audibly churning in their fury as they vent in sympathy to [hisher] feminine flower.", parse);
		else
			Text.Add("Driven to match [hisher] womanhood, Terry’s dainty fox-cock adds its own contribution to the growing puddle of fluids beneath Terry’s lap, spraying a gallant gush of dickcream to mingle with the [foxvixen]’s female nectar.", parse);
		Text.NL();
	}
	Text.Add("Reduced to a mere participant, all you can do is hold on as Terry’s juices seep down over your [legs]. You wait patiently until [heshe] shudders and, with a final moan, spills the last of it. [HeShe] then settles back against you with a blissful sigh.", parse);
	Text.NL();
	Text.Add("Smiling at [himher], you carefully adjust the [foxvixen] so that [heshe] will be more comfortable. You cradle [himher] tenderly in your arms, and allow [hisher] head to rest against your shoulder.", parse);
	Text.NL();
	Text.Add("Terry nuzzles against you, and you gently kiss [himher] on the cheek, asking if [heshe] enjoyed your little present.", parse);
	Text.NL();
	
	TimeStep({minute: 15});
	
	if(terry.Relation() < 30) {
		Text.Add("<i>“That was nice.”</i>", parse);
		Text.NL();
		Text.Add("...You were hoping for a little more enthusiasm than that.", parse);
		Text.NL();
		Text.Add("<i>“Sorry, it’s just that I’m a bit worn out after that...”</i>", parse);
		Text.NL();
		Text.Add("It’s alright. You’re just glad that [heshe] enjoyed that. You certainly did.", parse);
		Text.NL();
		Text.Add("That said, you adjust the weary [foxvixen] in your arms, cradling [himher] so that [heshe] can rest up. Despite [himher]self, Terry looks a little surprised at your generosity, but quietly accepts the offer.", parse);
		Text.NL();
		var gen = "";
		if(player.FirstCock()) gen += "your [cocks] starting to stiffen beneath [hisher] thighs";
		if(player.FirstCock() && player.FirstVag()) gen += " and ";
		if(player.FirstVag()) gen += "your [vag] starting to tingle with anticipation";
		parse["gen"] = Text.Parse(gen, parse);
		Text.Add("Time ticks softly by as you sit there. Terry’s breathing comes easier as [heshe] recovers from [hisher] recent climax. As [heshe] shifts in your lap, you are aware of [gen].", parse);
		Text.NL();
		Text.Add("Since you were so generous as to release [himher] before, maybe you ought to ask [himher] to take care of you in return...?", parse);
		Text.Flush();
		
		//[Yes] [No]
		var options = new Array();
		options.push({ nameStr : "Yes",
			tooltip : Text.Parse("Fair is fair; let your [foxvixen] pay you back, an orgasm for an orgasm.", parse),
			func : function() {
				Text.Clear();
				Text.Add("Mind made up, you ask if Terry feels rested now.", parse);
				Text.NL();
				Text.Add("<i>“Yes, I am. Thanks.”</i> [HeShe] smiles softly.", parse);
				Text.NL();
				Text.Add("That’s good to hear, because you’re not quite done with [himher] yet.", parse);
				Text.NL();
				Text.Add("Terry looks at you in confusion.", parse);
				Text.NL();
				Text.Add("Well, [heshe] was so hot before, perched on your lap and moaning like [heshe] was. You want to play around some more. See if you can make [himher] moan even harder...", parse);
				Text.NL();
				Text.Add("Realization dawns on Terry’s face, and [heshe] smiles softly. <i>“Okay, I guess fair is fair. What you wanna to do?”</i>", parse);
				Text.Flush();
				
				TerryScenes.SexPromptChoice();
			}, enabled : true
		});
		options.push({ nameStr : "No",
			tooltip : Text.Parse("You’re not really that horny, just let [himher] go.", parse),
			func : function() {
				Text.Clear();
				Text.Add("Decision made, you ask Terry if [heshe]’s ready to get going now.", parse);
				Text.NL();
				Text.Add("<i>“Yup, I’m good.”</i>", parse);
				Text.NL();
				Text.Add("Alright then. You unwrap your arms so that the [foxvixen] can hop out of your lap. As [heshe] goes for [hisher] clothes, you haul yourself upright in turn. Once the both of you are ready, you set off once again.", parse);
				Text.Flush();
				
				Gui.NextPrompt();
			}, enabled : true
		});
		Gui.SetButtonsFromList(options, false, null);
	}
	else if(terry.Relation() < 60) {
		Text.Add("<i>“Ugh, I could use some rest after that...”</i>", parse);
		Text.NL();
		Text.Add("After all that you put [himher] through, you’re not surprised. [HeShe] really did quite a lot just now. If [heshe] needs some rest, then [heshe] can just lie down here and get some.", parse);
		Text.NL();
		Text.Add("<i>“I think I’ll do just that then,”</i> [heshe] says, getting [himher]self comfortable.", parse);
		Text.NL();
		Text.Add("That’s a good [boygirl]... You start to softly stroke the long fluffy brush of Terry’s tail as [heshe] dozes against you, content to hold [himher] close until [heshe] is rested.", parse);
		Text.NL();
		Text.Add("A comfy silence envelops you both, until finally Terry shifts in [hisher] seat, turning partially to face you.", parse);
		Text.NL();
		Text.Add("<i>“So, you got me off pretty good, but what about you?”</i> [HeShe] smirks. <i>“", parse);
		if(player.FirstCock())
			Text.Add("I think I felt something stir in your pants. Plus, ", parse);
		Text.Add("I have a pretty good nose, y’know?”</i>", parse);
		Text.NL();
		Text.Add("Well, you’d be lying - to no avail, at that - if you claimed you weren’t turned on at the moment. But still, do you really want to have sex with Terry now?", parse);
		Text.Flush();
		
		//[Yes] [No]
		var options = new Array();
		options.push({ nameStr : "Yes",
			tooltip : Text.Parse("Why in the world would you turn [himher] down?", parse),
			func : function() {
				Text.Clear();
				Text.Add("Well, if [heshe]’s offering, you’d be happy to take [himher] up on [hisher] offer.", parse);
				Text.NL();
				Text.Add("<i>“Thought you would.”</i> [HeShe] grins. <i>“So, what you feel like doing?”</i>", parse);
				Text.Flush();
				
				TerryScenes.SexPromptChoice();
			}, enabled : true
		});
		options.push({ nameStr : "No",
			tooltip : Text.Parse("You’re stronger than this. Tell [himher] thanks, but no thanks.", parse),
			func : function() {
				Text.Clear();
				Text.Add("You assure Terry that you’re fine, really, and you don’t need to get off at the moment.", parse);
				Text.NL();
				Text.Add("[HeShe] simply shrugs. <i>“Alright then, if you say so...”</i>", parse);
				Text.NL();
				Text.Add("Having made your decision, you unwrap your arms so that the [foxvixen] can hop out of your lap. As [heshe] pads over to [hisher] own clothes, you take the opportunity to haul yourself up right. Once both of you are set, you leave.", parse);
				Text.Flush();
				
				Gui.NextPrompt();
			}, enabled : true
		});
		Gui.SetButtonsFromList(options, false, null);
	}
	else {
		Text.Add("<i>“Enjoy the show, [playername]?”</i>", parse);
		Text.NL();
		Text.Add("You certainly did. Terry’s always so fun to play with.", parse);
		Text.NL();
		Text.Add("[HeShe] giggles. <i>“Ya big perv!”</i> [heshe] exclaims, batting your side with [hisher] tail.", parse);
		Text.NL();
		Text.Add("Guilty as charged, but that’s why Terry loves you so. You rub the base of [hisher] ears, winning a pleased coo from the [foxvixen].", parse);
		Text.NL();
		Text.Add("You adjust your grip a little, settling Terry into a more comfortable seat atop you. The happy [foxvixen] readily snuggles up against you, using your shoulder as a makeshift pillow as [heshe] catches [hisher] breath.", parse);
		Text.NL();
		Text.Add("It’s a quiet, comfortable silence that envelops you both, broken only when Terry stirs restlessly in your arms, shifting to better face you.", parse);
		Text.NL();
		Text.Add("<i>“Alright, I’m good to go, so how about I pay you back for the massage?”</i>", parse);
		Text.Flush();
		
		//[Yes] [No]
		var options = new Array();
		options.push({ nameStr : "Yes",
			tooltip : Text.Parse("Well, if [heshe] insists, why not?", parse),
			func : function() {
				Text.Clear();
				Text.Add("You reply that you wouldn’t insist on payment, but, if [heshe] wants to, you’d be happy to let [himher] do so.", parse);
				Text.NL();
				Text.Add("<i>“Hehe, I know you too well, [playername]. Now, what do you feel like doing?”</i>", parse);
				Text.Flush();
				
				TerryScenes.SexPromptChoice();
			}, enabled : true
		});
		options.push({ nameStr : "No",
			tooltip : "That really isn’t necessary.",
			func : function() {
				Text.Clear();
				Text.Add("You assure the [foxvixen] that [heshe] doesn’t need to pay you back.", parse);
				Text.NL();
				Text.Add("<i>“Oh, come on. Don’t act like you don’t want me after that little show.”</i> [HeShe] grins. <i>“I know what a big perv you are, plus I recall someone stirring around a bit too much while you were fingering me.”</i> [HeShe] shows [hisher] tongue.", parse);
				Text.NL();
				Text.Add("Well... [heshe] does have a point...", parse);
				Text.Flush();
				
				//[Give in] [Stay strong]
				var options = new Array();
				options.push({ nameStr : "Give in",
					tooltip : Text.Parse("If [heshe]’s really so eager, why fight it?", parse),
					func : function() {
						Text.Clear();
						Text.Add("You tell Terry that, if [heshe] insists, you’d love to have a little more fun first.", parse);
						Text.NL();
						Text.Add("<i>“Knew you’d give in. Can’t resist my charms, can you?”</i>", parse);
						Text.Flush();
						
						TerryScenes.SexPromptChoice();
					}, enabled : true
				});
				options.push({ nameStr : "Stay strong",
					tooltip : "You said no and you mean no!",
					func : function() {
						Text.Clear();
						Text.Add("Firmly, you tell Terry that you don’t want to have sex at the moment.", parse);
						Text.NL();
						Text.Add("<i>“Oh… well… if you put it that way, it’s okay I guess...”</i> [heshe] says, disappointed.", parse);
						Text.NL();
						Text.Add("Once you open your arms, the [foxvixen] clambers out. Still frowning, [heshe] walks over to retrieve [hisher] clothes, whilst you haul yourself upright in turn. Once both of you are ready, you set off once more.", parse);
						Text.Flush();
						
						terry.relation.DecreaseStat(0, 1);
						
						Gui.NextPrompt();
					}, enabled : true
				});
				Gui.SetButtonsFromList(options, false, null);
			}, enabled : true
		});
		Gui.SetButtonsFromList(options, false, null);
	}
}

export { TerryScenes };