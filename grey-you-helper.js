// ==UserScript==
// @name         Grey You Helper
// @description  Shows Skills, bonus adventures and bonus skills gained from monsters in Grey You. Also includes a summary of available boosts in the characters sheet.
// @include      *www.kingdomofloathing.com/fight.php*
// @include      http://127.0.0.1:60080/fight.php*
// @include      *www.kingdomofloathing.com/charsheet.php*
// @include      http://127.0.0.1:60080/charsheet.php*
// @icon         https://www.google.com/s2/favicons?domain=kingdomofloathing.com
// ==/UserScript==

/***********************************/
/********* Helper functions ********/
/***********************************/
const imgPrefix = 'https://d2uyhvukfffg5a.cloudfront.net/itemimages/';
const enemies = new Map([
    ['Pseudopod Slap', {skill: 'Pseudopod Slap', desc: 'Deals 10 damage (starting skill)', img: 'goocon10.gif', id: 27000}],
    ['remaindered skeleton', {skill: 'Hardslab', desc: 'Deal your Muscle in physical damage (no bonuses)', zone: 'Skeleton Store', img: 'goocon2.gif', id: 27001}],
    ['crêep', {skill: 'Telekinetic Murder', desc: 'Deal your Mysticality in physical damage (no bonuses)', zone: 'Madness Bakery', img: 'goocon3.gif', id: 27002}],
    ['sewer snake with a sewer snake in it', {skill: 'Snakesmack', desc: 'Deal your Moxie in physical damage (no bonuses)', zone: 'Overgrown Lot', img: 'goocon4.gif', id: 27003}],
    ['raging bull', {skill: 'Ire Proof', desc: '<font color="red"><b>Serious Hot Resistance (+3)</b></font>', zone: 'South of the Border', img: 'goocon5.gif', id: 27004}],
    ['ratbat', {skill: 'Nanofur', desc: '<font color="blue"><b>Serious Cold Resistance (+3)</b></font>', zone: 'Batrat and Ratbat Burrow', img: 'goocon6.gif', id: 27005}],
    ['spooky vampire', {skill: 'Autovampirism Routines', desc: '<font color="gray"><b>Serious Spooky Resistance (+3)</b></font>', zone: 'Spooky Forest', img: 'goocon7.gif', id: 27006}],
    ['pine bat', {skill: 'Conifer Polymers', desc: '<font color="green"><b>Serious Stench Resistance (+3)</b></font>', zone: 'Bat Hole Entryway', img: 'goocon8.gif', id: 27007}],
    ['werecougar', {skill: 'Anti-Sleaze Recursion', desc: '<font color="blueviolet"><b>Serious Sleaze Resistance (+3)</b></font>', zone: 'A Barroom Brawl', img: 'goocon9.gif', id: 27008}],
    ['Cobb\'s Knob oven', {skill: 'Microburner', desc: '<font color="red"><b>+5 Hot Damage</b></font>', zone: 'Cobb\'s Knob Kitchens', img: 'goocon1.gif', id: 27009}],
    ['Knob Goblin MBA', {skill: 'Cryocurrency', desc: '<font color="blue"><b>+5 Cold Damage</b></font>', zone: 'Cobb\'s Knob Treasury', img: 'goocon10.gif', id: 27010}],
    ['lihc', {skill: 'Curses Library', desc: '<font color="gray"><b>+5 Spooky Damage</b></font>', zone: 'Unquiet Garves', img: 'goocon11.gif', id: 27011}],
    ['beanbat', {skill: 'Exhaust Tubules', desc: '<font color="green"><b>+5 Stench Damage</b></font>', zone: 'Beanbat Chamber', img: 'goocon12.gif', id: 27012}],
    ['Knob Goblin Harem Girl', {skill: 'Camp Subroutines', desc: '<font color="blueviolet"><b>+5 Sleaze Damage</b></font>', zone: 'Cobb\'s Knob Harem', img: 'goocon13.gif', id: 27013}],
    ['The Boss Bat', {skill: 'Grey Noise', desc: 'Deals 5 damage plus any bonus elemental damage you have', zone: 'Boss Bat\'s Lair', img: 'goocon14.gif', id: 27014}],
    ['Knob Goblin Elite Guard', {skill: 'Advanced Exo-Alloy', desc: 'Damage Absorption +100', zone: 'Cobb\'s Knob Barracks', img: 'goocon15.gif', id: 27015}],
    ['cubist bull', {skill: 'Localized Vacuum', desc: '<font color="red"><b>So-So Hot Resistance (+2)</b></font>', zone: 'Haunted Gallery', img: 'goocon16.gif', id: 27016}],
    ['eXtreme cross-country hippy', {skill: 'Microweave', desc: '<font color="blue"><b>So-So Cold Resistance (+2)</b></font>', zone: 'eXtreme Slope', img: 'goocon17.gif', id: 27017}],
    ['Claybender Sorcerer Ghost', {skill: 'Ectogenesis', desc: '<font color="gray"><b>So-So Spooky Resistance (+2)</b></font>', zone: 'A-Boo Peak', img: 'goocon18.gif', id: 27018}],
    ['malevolent hair clog', {skill: 'Clammy Microcilia', desc: '<font color="green"><b>So-So Stench Resistance (+2)</b></font>', zone: 'Haunted Bathroom', img: 'goocon19.gif', id: 27019}],
    ['oil slick', {skill: 'Lubricant Layer', desc: '<font color="blueviolet"><b>So-So Sleaze Resistance (+2)</b></font>', zone: 'Oil Peak', img: 'goocon20.gif', id: 27020}],
    ['demonic icebox', {skill: 'Infernal Automata', desc: '<font color="red"><b>+10 Hot Damage</b></font>', zone: 'Haunted Kitchen', img: 'goocon21.gif', id: 27021}],
    ['Ninja Snowman Weaponmaster', {skill: 'Cooling Tubules', desc: '<font color="blue"><b>+10 Cold Damage</b></font>', zone: 'Lair of the Ninja Snowmen', img: 'goocon22.gif', id: 27022}],
    ['animated ornate nightstand', {skill: 'Ominous Substrate', desc: '<font color="gray"><b>+10 Spooky Damage</b></font>', zone: 'Haunted Bedroom', img: 'goocon23.gif', id: 27023}],
    ['drunk goat', {skill: 'Secondary Fermentation', desc: '<font color="green"><b>+10 Stench Damage</b></font>', zone: 'Goatlet', img: 'goocon24.gif', id: 27024}],
    ['smut orc screwer', {skill: 'Procgen Ribaldry', desc: '<font color="blueviolet"><b>+10 Sleaze Damage</b></font>', zone: 'Smut Orc Logging Camp', img: 'goocon25.gif', id: 27025}],
    ['Knob Goblin Alchemist', {skill: 'Solid Fuel', desc: '+10 Adventure(s) per day', zone: 'Cobb\'s Knob Laboratory', img: 'goocon26.gif', id: 27026}],
    ['zombie waltzers', {skill: 'Autochrony', desc: '+10 Adventure(s) per day', zone: 'Haunted Ballroom', img: 'goocon27.gif', id: 27027}],
    ['Pr Imp', {skill: 'Temporal Hyperextension', desc: '+10 Adventure(s) per day', zone: 'Laugh Floor', img: 'goocon28.gif', id: 27028}],
    ['junksprite bender', {skill: 'Propagation Drive', desc: '+20% Item Drops from Monsters', zone: 'Old Landfill', img: 'goocon29.gif', id: 27029}],
    ['me4t begZ0r', {skill: 'Financial Spreadsheets', desc: '+40% Meat from Monsters', zone: 'Valley of Rof L\'m Fao', img: 'goocon30.gif', id: 27030}],
    ['Spectral Jellyfish', {skill: 'Phase Shift', desc: 'Gives Effect: Shifted Phase (10 Adventures) ', zone: 'Menagerie Level 3', img: 'goocon31.gif', id: 27031}],
    ['white lion', {skill: 'Piezoelectric Honk', desc: 'Gives Effect: Hooooooooonk! (10 Adventures) ++combat', zone: 'Whitey\'s Grove', img: 'goocon32.gif', id: 27032}],
    ['Big Wheelin\' Twins', {skill: 'Overclocking', desc: '+X% Combat Initiative (Scales with your Muscle)', zone: 'Twin Peak', img: 'goocon33.gif', id: 27033}],
    ['pooltergeist', {skill: 'Subatomic Hardening', desc: 'Damage Reduction: X (Scales with your Muscle)', zone: 'Haunted Billiards Room', img: 'goocon34.gif', id: 27034}],
    ['suckubus', {skill: 'Gravitational Compression', desc: '+Y% Item Drops from Monsters (Y = 0.2 * Base Mys)', zone: 'Infernal Rackets Backstage', img: 'goocon25.gif', id: 27035}],
    ['mind flayer', {skill: 'Hivemindedness', desc: 'Regenerate Y MP per Adventure (Scales with your Mysticality)', zone: 'Dungeons of Doom', img: 'goocon36.gif', id: 27036}],
    ['anglerbush', {skill: 'Ponzi Apparatus', desc: '+Z% Meat from Monsters (Scales with your Moxie)', zone: 'Haunted Conservatory', img: 'goocon37.gif', id: 27037}],
    ['Carnivorous Moxie Weed', {skill: 'Fluid Dynamics Simulation', desc: 'Regenerate X HP per Adventure (Scales with your Muscle)', zone: 'Menagerie Level 2', img: 'goocon38.gif', id: 27038}],
    ['stuffed moose head', {skill: 'Nantlers', desc: 'Deals your Muscle in damage (includes bonus damage)', zone: 'Haunted Storage Room', img: 'goocon39.gif', id: 27039}],
    ['Jacob\'s adder', {skill: 'Nanoshock', desc: 'Deals your Mysticality in damage (includes bonus damage)', zone: 'Haunted Laboratory', img: 'goocon40.gif', id: 27040}],
    ['spooky music box', {skill: 'Audioclasm', desc: 'Deals your Moxie in damage (includes bonus damage)', zone: 'Haunted Nursery', img: 'goocon41.gif', id: 27041}],
    ['pygmy janitor', {skill: 'System Sweep', desc: 'Deal your Muscle in physical damage.<br/>If this defeats the enemy, it is banished for the rest of the day', zone: 'Hidden Park', img: 'goocon42.gif', id: 27042}],
    ['drunk pygmy', {skill: 'Double Nanovision', desc: 'Deal your Mysticality in physical damage.<br/>If this defeats the enemy, get +100% item drops for this fight', zone: 'Hidden Bowling Alley', img: 'goocon43.gif', id: 27043}],
    ['Pygmy Witch Lawyer', {skill: 'Infinite Loop', desc: 'Deal your Moxie in physical damage.<br/>If this defeats enemy, gain 1 muscle, mysticality and moxie', zone: 'Hidden Apartment Building<br/>Hidden Office Building<br/>Hidden Park', img: 'goocon44.gif', id: 27044}],
    ['black panther', {skill: 'Photonic Shroud', desc: 'Gives Effect: Darkened Photons. (10 Adventures) --combat', zone: 'Black Forest', img: 'goocon45.gif', id: 27045}],
    ['steam elemental', {skill: 'Steam Mycelia', desc: '+15 Hot Damage', zone: 'Haunted Boiler Room', img: 'goocon47.gif', id: 27047}],
    ['Snow Queen', {skill: 'Snow-Cooling System', desc: '+15 Cold Damage', zone: 'Icy Peak', img: 'goocon48.gif', id: 27048}],
    ['possessed wine rack', {skill: 'Legacy Code', desc: '+15 Spooky Damage', zone: 'Haunted Wine Cellar', img: 'goocon49.gif', id: 27049}],
    ['Flock of Stab-bats', {skill: 'AUTOEXEC.BAT', desc: '+15 Stench Damage', zone: 'Inside the Palindome', img: 'goocon50.gif', id: 27050}],
    ['Astronomer', {skill: 'Innuendo Circuitry', desc: '+15 Sleaze Damage', zone: 'Hole in the Sky', img: 'goocon51.gif', id: 27051}],
    ['fan dancer', {skill: 'Subatomic Tango', desc: '+15 Adventure(s) per day', zone: 'Copperhead Club', img: 'goocon52.gif', id: 27052}],
    ['baseball bat', {skill: 'Extra Innings', desc: '+5 Adventure(s) per day', zone: 'Guano Junction', img: 'goocon2.gif', id: 27053}],
    ['Bullet Bill', {skill: 'Reloading', desc: '+5 Adventure(s) per day', zone: '8-Bit Realm', img: 'goocon16.gif', id: 27054}],
    ['rushing bum', {skill: 'Harried', desc: '+5 Adventure(s) per day', zone: 'Sleazy Back Alley', img: 'goocon50.gif', id: 27055}],
    ['undead elbow macaroni', {skill: 'Temporal Bent', desc: '+5 Adventure(s) per day', zone: 'Haunted Pantry', img: 'goocon5.gif', id: 27056}],
    ['Sub-Assistant Knob Mad Scientist', {skill: 'Provably Efficient', desc: '+5 Adventure(s) per day', zone: 'Outskirts of Cobb\'s Knob', img: 'goocon25.gif', id: 27057}],
    ['BASIC Elemental', {skill: 'Basic Improvements', desc: '+5 Adventure(s) per day', zone: 'Menagerie Level 1', img: 'goocon27.gif', id: 27058}],
    ['shifty pirate', {skill: 'Shifted About', desc: '+5 Adventure(s) per day', zone: 'Obligatory Pirate\'s Cove', img: 'goocon33.gif', id: 27059}],
    ['ghost miner', {skill: 'Spooky Veins', desc: '+10 Adventure(s) per day', zone: 'Knob Shaft', img: 'goocon40.gif', id: 27060}],
    ['dopey 7-Foot Dwarf', {skill: 'Seven Foot Feelings', desc: '+5 Adventure(s) per day', zone: 'Itznotyerzitz Mine', img: 'goocon32.gif', id: 27061}],
    ['banshee librarian', {skill: 'Self-Actualized', desc: '+5 Adventure(s) per day', zone: 'Haunted Library', img: 'goocon49.gif', id: 27062}],

    ['batrat', {adv: 5, zone: 'Batrat and Ratbat Burrow'}],
    ['L imp', {adv: 5, zone: 'Dark Elbow of the Woods<br/>Pandamonium Slums'}],
    ['G imp', {adv: 5, zone: 'Dark Elbow of the Woods<br/>Dark Heart of the Woods<br/>Pandamonium Slums'}],
    ['P imp', {adv: 5, zone: 'Dark Heart of the Woods<br/>Dark Neck of the Woods<br/>Pandamonium Slums'}],
    ['W imp', {adv: 5, zone: 'Dark Neck of the Woods<br/>Pandamonium Slums'}],
    ['warwelf', {adv: 5, zone: 'Spooky Forest'}],
    ['Knob Goblin Madam', {adv: 5, zone: 'Cobb\'s Knob Harem'}],
    ['magical fruit bat', {adv: 5, zone: 'Beanbat Chamber'}],
    ['grave rober', {adv: 5, zone: 'Unquiet Garves'}],
    ['plastered frat orc', {adv: 5, zone: 'A Barroom Brawl'}],
    ['swarm of Knob lice', {adv: 5, zone: 'Cobb\'s Knob Barracks'}],
    ['Knob Goblin Master Chef', {adv: 5, zone: 'Cobb\'s Knob Kitchens'}],
    ['Knob Goblin Bean Counter', {adv: 5, zone: 'Cobb\'s Knob Treasury'}],
    ['albino bat', {adv: 5, zone: 'Bat Hole Entryway'}],
    ['gingerbread murderer', {adv: 5, zone: 'Madness Bakery'}],
    ['dire pigeon', {adv: 5, zone: 'Overgrown Lot'}],
    ['irate mariachi', {adv: 5, zone: 'South of the Border'}],
    ['swarm of skulls', {adv: 5, zone: 'Skeleton Store'}],
    ['whitesnake', {adv: 7, zone: 'Whitey\'s Grove'}],
    ['chalkdust wraith', {adv: 7, zone: 'Haunted Billiards Room'}],
    ['guy with a pitchfork, and his wife', {adv: 7, zone: 'Haunted Gallery'}],
    ['Ninja Snowman Janitor', {adv: 7, zone: 'Lair of the Ninja Snowmen'}],
    ['Battlie Knight Ghost', {adv: 7, zone: 'A-Boo Peak'}],
    ['possessed silverware drawer', {adv: 7, zone: 'Haunted Kitchen'}],
    ['smut orc pipelayer', {adv: 7, zone: 'Smut Orc Logging Camp'}],
    ['animated rustic nightstand', {adv: 7, zone: 'Haunted Bedroom'}],
    ['tapdancing skeleton', {adv: 7, zone: 'Haunted Ballroom'}],
    ['Bubblemint Twins', {adv: 7, zone: 'Twin Peak'}],
    ['toilet papergeist', {adv: 7, zone: 'Haunted Bathroom'}],
    ['sabre-toothed goat', {adv: 7, zone: 'Goatlet'}],
    ['party skelteon', {adv: 7, zone: 'Defiled Nook<br/>VERY Unquiet Garves'}],
    ['Knob Goblin Very Mad Scientist', {adv: 7, zone: 'Cobb\'s Knob Laboratory'}],
    ['serialbus', {adv: 7, zone: 'Infernal Rackets Backstage'}],
    ['gluttonous ghuol', {adv: 7, zone: 'Defiled Cranny<br/>VERY Unquiet Garves'}],
    ['basic lihc', {adv: 7, zone: 'Defiled Niche<br/>VERY Unquiet Garves'}],
    ['grave rober zmobie', {adv: 7, zone: 'Defiled Alcove<br/>VERY Unquiet Garves'}],
    ['swarm of killer bees', {adv: 7, zone: 'Dungeons of Doom'}],
    ['skeletal hamster', {adv: 7, zone: 'Haunted Conservatory'}],
    ['CH Imp', {adv: 7, zone: 'Laugh Floor'}],
    ['eXtreme Orcish snowboarder', {adv: 7, zone: 'eXtreme Slope'}],
    ['Booze Giant', {adv: 7, zone: 'Menagerie Level 3'}],
    ['Grass Elemental', {adv: 7, zone: 'Menagerie Level 2'}],
    ['junksprite sharpener', {adv: 7, zone: 'Old Landfill'}],
    ['model skeleton', {adv: 7, zone: 'Haunted Laboratory'}],
    ['possessed toy chest', {adv: 7, zone: 'Haunted Nursery'}],
    ['sheet ghost', {adv: 7, zone: 'Haunted Storage Room'}],
    ['upgraded ram', {adv: 7, zone: 'Icy Peak'}],
    ['vicious gnauga', {adv: 7, zone: 'Thugnderdome'}],
    ['blur', {adv: 10, zone: 'Oasis'}],
    ['Bob Racecar', {adv: 10, zone: 'Inside the Palindome'}],
    ['Racecar Bob', {adv: 10, zone: 'Inside the Palindome'}],
    ['pygmy shaman', {adv: 10, zone: 'Hidden Apartment Building'}],
    ['fleet woodsman', {adv: 10, zone: 'A Mob of Zeppelin Protesters'}],
    ['swarm of fire ants', {adv: 10, zone: 'Arid, Extra-Dry Desert'}],
    ['black magic woman', {adv: 10, zone: 'Black Forest'}],
    ['Alphabet Giant', {adv: 10, zone: 'Castle in the Clouds in the Sky (Basement)'}],
    ['Renaissance Giant', {adv: 10, zone: 'Castle in the Clouds in the Sky (Ground Floor)'}],
    ['Raver Giant', {adv: 10, zone: 'Castle in the Clouds in the Sky (Top Floor)'}],
    ['Mob Penguin Capo', {adv: 10, zone: 'Copperhead Club'}],
    ['pygmy headhunter', {adv: 10, zone: 'Hidden Office Building'}],
    ['pygmy blowgunner', {adv: 10, zone: 'Hidden Park'}],
    ['Iiti Kitty', {adv: 10, zone: 'Upper Chamber'}],
    ['Irritating Series of Random Encounters', {adv: 10, zone: 'Penultimate Fantasy Airship'}],
    ['mad wino', {adv: 10, zone: 'Haunted Wine Cellar'}],
    ['coaltergeist', {adv: 10, zone: 'Haunted Boiler Room'}],
    ['tomb asp', {adv: 10, zone: 'Middle Chamber'}],
    ['pygmy orderlies', {adv: 10, zone: 'Hidden Hospital<br/>Hidden Bowling alley'}],
    ['One-Eyed Willie', {adv: 10, zone: 'The Hole in the Sky'}],
    ['Little Man in the Canoe', {adv: 10, zone: 'The Hole in the Sky'}],
    ['1335 HaXx0r', {adv: 10, zone: 'Valley of Rof L\'m Fao'}],

    ['stone temple pirate', {muscle: 3}],
    ['Burly Sidekick', {muscle: 5}],
    ['Knob Goblin Mutant', {muscle: 5}],
    ['sleeping Knob Goblin Guard', {muscle: 5}],
    ['angry bugbear', {muscle: 10}],
    ['Fallen Archfiend', {muscle: 10}],
    ['Fitness Giant', {muscle: 10}],
    ['toothy sklelton', {muscle: 10}],

    ['baa-relief sheep', {mysticality: 3}],
    ['fiendish can of asparagus', {mysticality: 5}],
    ['Quiet Healer', {mysticality: 5}],
    ['Blue Oyster cultist', {mysticality: 10}],
    ['bookbat', {mysticality: 10}],
    ['forest spirit', {mysticality: 10}],
    ['Hellion', {mysticality: 10}],
    ['Possibility Giant', {mysticality: 10}],
    ['seline lihc', {mysticality: 10}],
    ['tomb servant', {mysticality: 10}],

    ['craven carven raven', {moxie: 3}],
    ['half-orc hobo', {moxie: 5}],
    ['sassy pirate', {moxie: 5}],
    ['Spunky Princess', {moxie: 5}],
    ['demoninja', {moxie: 10}],
    ['gaunt ghuol', {moxie: 10}],
    ['Gnefarious gnome', {moxie: 10}],
    ['Punk Rock Giant', {moxie: 10}],
    ['swarm of scarab beatles', {moxie: 10}],

    ['fluffy-bunny', {hp: 5}],
    ['beefy bodyguard bat', {hp: 10}],
    ['vampire bat', {hp: 10}],
    ['corpulent zobmie', {hp: 20}],

    ['Zol', {mp: 5}],
    ['Grumpy 7-Foot Dwarf', {mp: 10}],
    ['plaque of locusts', {mp: 20}],
])

const nameVariants = [
    [/a junksprite.*sharpener/i, 'junksprite sharpener'],
    [/a junksprite.*bender/i, 'junksprite bender']
];


/***********************************/
/******** Section functions ********/
/***********************************/
function doFight(){
    const monster = document.getElementById('monname');
    let name = monster.innerText;


    let enemy = enemies.get(name);

    if (!enemy) {
        nameVariants.find(variant => {
            if (name.match(variant?.[0])) {
                name = variant[1];
                enemy = enemies.get(name);

                return true;
            }
        });
    }

    if (!enemy) {
        name = name.slice(name.indexOf(' ') + 1);
        enemy = enemies.get(name);
    }


    if (!enemy) {
        return;
    }

    const info = document.createElement('p');
    info.innerHTML = 'Grey You</br>';

    if (enemy.adv) {
        info.innerHTML += `<img src="${imgPrefix}hourglass.gif" height="30" width="30" style="vertical-align: middle;" alt="Adventures"> ${enemy.adv} adventures`;
    } else if (enemy.skill) {
        info.innerHTML += `${enemy.img ? `<img src="${imgPrefix}${enemy.img}" height="30" width="30" style="vertical-align: middle;"> ` : ''}<b>${enemy.skill}</b><br/>${enemy.desc}`;
    } else if (enemy.muscle) {
        info.innerHTML += `<b>${enemy.muscle} Muscle</b>`;
    } else if (enemy.mysticality) {
        info.innerHTML += `<b>${enemy.mysticality} Mysticality</b>`;
    } else if (enemy.moxie) {
        info.innerHTML += `<b>${enemy.moxie} Moxie</b>`;
    } else if (enemy.hp) {
        info.innerHTML += `<b>${enemy.hp} HP</b>`;
    } else if (enemy.mp) {
        info.innerHTML += `<b>${enemy.mp} MP</b>`;
    }

    monster.after(info);
}

function doCharsheet() {
    const bs = Array.from(document.querySelectorAll('b'));
    let absorbTable;
    let skillTable;

    bs.find(b => {
        if (b.innerText === 'Absorptions:') {
            absorbTable = b.nextElementSibling.nextElementSibling;
        } else if (b.innerText === 'Skills:') {
            skillTable = b.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling;
        }

        return absorbTable && skillTable;
    });

    if (!absorbTable || !skillTable) {
        return;
    }

    let isOdd = true;

    const absorbs = absorbTable.innerText;
    const advMap = new Map(Array.from(enemies.entries()).filter(item => !!item[1].adv));
    const missingAdventures = Array.from(advMap.entries()).filter(item => !absorbs.includes(item[0]));
    const totalMissingAdventures = missingAdventures.reduce((val, item) => val + item[1].adv, 0);
    const adventureList = missingAdventures.map(item => `<tr${(isOdd = !isOdd) ? ' style="background: #eee;"' : ''}><td>${item[1].adv}</td><td>${item[0]}</td><td>${item[1].zone}</td></tr$>`);


    const skills = skillTable.innerText;
    const skillMap = new Map(Array.from(
        enemies.entries())
            .filter(item => !!item[1].skill)
            .map(item => {
                return [item[1].skill, {enemy: item[0], ...item[1]}]
            })
    );
    const missingSkills = Array.from(skillMap.entries()).filter(item => !skills.includes(item[0]));
    const totalMissingSkills = missingSkills.length;
    const skillsList = missingSkills.map(item => `<tr${(isOdd = !isOdd) ? ' style="background: #eee;"' : ''}>
        <th>
            <a onclick="javascript:poop('desc_skill.php?whichskill=${item[1].id}&self=true','skill', 350, 300)">
                ${item[1].img ? `<img src="${imgPrefix}${item[1].img}" height="30" width="30" style="vertical-align: middle;"> ` : ''}
                ${item[0]}
            </a>
        </th>
        <td>${item[1].enemy}</td>
        <td>${item[1].zone}</td>
        <td>${item[1].desc}</td>
        </tr>
    `);


    const container = document.createElement('center');

    container.innerHTML = `
        <br/><b>Total remaining adventures: ${totalMissingAdventures}</b><br/><br/>
        <table><tr>
        ${adventureList.join('')}
        </tr></table>
        <br/><br/>
        <br/><b>Total remaining skills: ${totalMissingSkills}</b><br/><br/>
        <table><tr>
        ${skillsList.join('')}
        </tr></table>
    `;
    document.body.appendChild(container);


    const knownSkills = Array.from(skillTable.querySelectorAll('a'));

    knownSkills.forEach(knownSkill => {
        const skill = skillMap.get(knownSkill.innerText);
        if (skill) {
            knownSkill.style.fontWeight = 'bold';
            const desc = document.createElement('span');
            desc.innerHTML = `&nbsp;&nbsp;${skill.desc}`;
            knownSkill.after(desc);
            if (skill.img) {
                knownSkill.innerHTML = `<img src="${imgPrefix}${skill.img}" height="30" width="30" style="vertical-align: middle;"> ${knownSkill.innerHTML}`;
            }
        }
    })
}


switch(window.location.pathname){
    case '/fight.php':
        doFight();
        break;
    case '/charsheet.php':
        doCharsheet();
        break;
}
