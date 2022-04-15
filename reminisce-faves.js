// ==UserScript==
// @name         Reminisce favorites
// @description  Shows a list of favorite enemies to reminisce.
// @include      *www.kingdomofloathing.com/choice.php?forceoption=0
// @include      http://127.0.0.1:60080/choice.php?forceoption=0
// @grant        GM_getValue
// @grant        GM_setValue
// @icon         https://www.google.com/s2/favicons?domain=kingdomofloathing.com
// ==/UserScript==


const monsters = [
    { name: 'ninja snowman assassin', id: '1185' },
    { name: 'lobsterfrogman', id: '529' },
    { name: 'ghost', id: '950' },
    { name: 'Fantasy bandit', id: '2060' },
    { name: 'mountain man', id: '1153' },
    { name: 'Knob Goblin Embezzler', id: '530' },
];

(function() {
    'use strict';

    const heading = document.querySelector('tr:first-child td[style*=white]');

    if (!heading.innerText.includes('Reminiscing')) {
        return;
    }
    
    document.body.append(getStyles());
    document.body.append(getEnchantmentsTable());

    const form = document.querySelector('form');

    const container = document.createElement('div');

    monsters.forEach(monster => {
        const span = document.createElement('span');
        span.classList.add('monster');
        span.innerText = monster.name;
        span.dataset.id = monster.id;
        container.append(span);
    });

    container.addEventListener('click', onClickMonsterContainer);

    form.after(container);
})();

function onClickMonsterContainer(e) {
    const monsterButton = Array.from(e.target.classList).includes('monster') ?? e.target.nearest('.monster');
    if (!monsterButton) {
        return;
    }

    const id = e.target.dataset.id;

    const form = document.querySelector('form');
    form.mid.value = id;
    // form.submit();
}


function getStyles() {
    const styles = document.createElement('style');
    styles.innerText = `
    .element-hot,.element-hot > a {
        color: red
    }
    
    .element-cold,.element-cold > a {
        color: blue
    }
    
    .element-stench,.element-stench > a {
        color: green
    }
    
    .element-spooky,.element-spooky > a,.element-shadow,.element-shadow > a {
        color: gray
    }
    
    .element-sleaze,.element-sleaze > a {
        color: blueviolet
    }

    .monster {
        width: 200px;
        margin: 5px;
        padding: 5px;
        border: 1px solid #888;
    }
    .monster:hover {
        background: #ccc;
        cursor: pointer;
    }

    tr.odd {
        background: #eee;
    }
    `;

    return styles;
}

function getEnchantmentsTable() {
    const container = document.createElement('div');
    container.innerHTML = `<center>

<table class="wikitable sortable jquery-tablesorter" cellspacing="0" cellpadding="3">
    <thead>
        <tr>
            <th><a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Phylum" title="Phylum" class="mw-redirect">Phylum</a></th>
            <th>Enchantment</th>
            <th>Monster</th>
        </tr>
    </thead>
    <tbody>
        <tr class='odd'>
            <td><a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Category:Beasts" title="Category:Beasts">Beasts</a>
            </td>
            <td>+10% chance of <a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Critical_Hit_Chance" title="Critical Hit Chance">Critical
                    Hit</a><br><a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Muscle_Modifiers" title="Muscle Modifiers">Muscle</a> +20
            </td>
            <td><span class='monster' data-id="48">beanbat</span></td>
        </tr>
        <tr>
            <td><a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Category:Bugs" title="Category:Bugs">Bugs</a>
            </td>
            <td><a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Weapon_Damage" title="Weapon Damage">Weapon Damage</a> +25%<br><a target="_blank"
                    href="/thekolwiki/index.php/MP_Modifiers" title="MP Modifiers">Maximum MP</a> +25%
            </td>
            <td><span class='monster' data-id="221">swarm of killer bees</span></td>
        </tr>
        <tr class='odd'>
            <td><a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Category:Constellations"
                    title="Category:Constellations">Constellations</a>
            </td>
            <td>+10% chance of <a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Critical_Spell_Chance" title="Critical Spell Chance">Spell
                    Critical Hit</a><br><a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Mysticality_Modifiers"
                    title="Mysticality Modifiers">Mysticality</a> +20
            </td>
            <td><span class='monster' data-id="184">The Astronomer</span></td>
        </tr>
        <tr>
            <td><a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Category:Constructs" title="Category:Constructs">Constructs</a>
            </td>
            <td>+3 Moxie <a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Stat_Gains_from_Fights" title="Stat Gains from Fights">Stats Per
                    Fight</a><br>+25 <a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Bonus_Spell_Damage" title="Bonus Spell Damage">Spell
                    Damage</a>
            </td>
            <td><span class='monster' data-id="1160">baa-relief sheep</span></td>
        </tr>
        <tr class='odd'>
            <td><a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Category:Demons" title="Category:Demons">Demons</a>
            </td>
            <td>+25 <span class="element-hot"><a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Hot#Damage" title="Hot">Hot
                        Damage</a></span><br>+50% <a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Items_from_Monsters"
                    title="Items from Monsters">Gear Drops</a>
            </td>
            <td><span class='monster' data-id="128">Hellion</span></td>
        </tr>
        <tr>
            <td><a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Category:Dudes" title="Category:Dudes">Dudes</a>
            </td>
            <td>+25 <span class="element-cold"><a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Cold#Damage" title="Cold">Cold
                        Damage</a></span><br><a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Moxie_Modifiers"
                    title="Moxie Modifiers">Moxie</a> +50%
            </td>
            <td><span class='monster' data-id="141">1335 HaXx0r</span></td>
        </tr>
        <tr class='odd'>
            <td><a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Category:Elementals" title="Category:Elementals">Elementals</a>
            </td>
            <td>Serious <span class="element-hot"><a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Hot#Resistance" title="Hot">Hot
                        Resistance</a></span> (+3)<br>+25 Damage to <span class="element-stench"><a target="_blank"
                        href="/thekolwiki/index.php/Stench#Spells" title="Stench">Stench Spells</a></span>
            </td>
            <td><span class='monster' data-id="1185">ninja snowman assassin</span></td>
        </tr>
        <tr>
            <td><a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Category:Elves" title="Category:Elves">Elves</a>
            </td>
            <td>+5 <a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Stat_Gains_from_Fights" title="Stat Gains from Fights">Stats Per
                    Fight</a><br>+75% <a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Items_from_Monsters"
                    title="Items from Monsters">Candy Drops</a>
            </td>
            <td><span class='monster' data-id="1201">Black Crayon Crimbo Elf</span></td>
        </tr>
        <tr class='odd'>
            <td><a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Category:Fish" title="Category:Fish">Fish</a>
            </td>
            <td>+50% <a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Meat_from_Monsters" title="Meat from Monsters">Meat from
                    Monsters</a><br>+25 Damage to <span class="element-spooky"><a target="_blank"
                        href="/thekolwiki/index.php/Spooky#Spells" title="Spooky">Spooky Spells</a></span>
            </td>
            <td><span class='monster' data-id="1857">Arctic Octolus</span></td>
        </tr>
        <tr>
            <td><a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Category:Goblins" title="Category:Goblins">Goblins</a>
            </td>
            <td>+25 <span class="element-stench"><a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Stench#Damage" title="Stench">Stench
                        Damage</a></span><br><a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Mysticality_Modifiers"
                    title="Mysticality Modifiers">Mysticality</a> +50%
            </td>
            <td><span class='monster' data-id="530">Knob Goblin Embezzler</span></td>
        </tr>
        <tr class='odd'>
            <td><a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Category:Hippies" title="Category:Hippies">Hippies</a>
            </td>
            <td>Serious <span class="element-stench"><a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Stench#Resistance"
                        title="Stench">Stench Resistance</a></span> (+3)<br><a target="_blank"
                    href="/thekolwiki/index.php/Damage_Reduction" title="Damage Reduction">Damage Reduction</a>: 10
            </td>
            <td><span class='monster' data-id="482">War Hippy drill sergeant</span></td>
        </tr>
        <tr>
            <td><a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Category:Hobos" title="Category:Hobos">Hobos</a>
            </td>
            <td>+3 Mysticality <a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Stat_Gains_from_Fights"
                    title="Stat Gains from Fights">Stats Per Fight</a><br>+25 Damage to <span class="element-hot"><a target="_blank"
                        href="/thekolwiki/index.php/Hot#Spells" title="Hot">Hot Spells</a></span>
            </td>
            <td><span class='monster' data-id="1563">mad wino</span></td>
        </tr>
        <tr class='odd'>
            <td><a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Category:Horrors" title="Category:Horrors">Horrors</a>
            </td>
            <td>Serious <span class="element-spooky"><a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Spooky#Resistance"
                        title="Spooky">Spooky Resistance</a></span> (+3)<br><a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/HP_Modifiers"
                    title="HP Modifiers">Maximum HP</a> +50
            </td>
            <td><span class='monster' data-id="1974">Eldritch Tentacle</span></td>
        </tr>
        <tr>
            <td><a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Category:Humanoids" title="Category:Humanoids">Humanoids</a>
            </td>
            <td><a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Bonus_Spell_Damage" title="Bonus Spell Damage">Spell Damage</a>
                +25%<br><a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Moxie_Modifiers" title="Moxie Modifiers">Moxie</a> +20
            </td>
            <td><span class='monster' data-id="19">Gnollish Crossdresser</span></td>
        </tr>
        <tr class='odd'>
            <td><a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Category:Mer-Kin" title="Category:Mer-Kin">Mer-Kin</a>
            </td>
            <td>+25% <a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Item_Drops_from_Monsters" title="Item Drops from Monsters"
                    class="mw-redirect">Item Drops from Monsters</a><br>+25 Damage to <span class="element-sleaze"><a target="_blank"
                        href="/thekolwiki/index.php/Sleaze#Spells" title="Sleaze">Sleaze Spells</a></span>
            </td>
            <td><span class='monster' data-id="765">Mer-kin miner</span></td>
        </tr>
        <tr>
            <td><a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Category:Orcs" title="Category:Orcs">Orcs</a>
            </td>
            <td>Serious <span class="element-sleaze"><a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Sleaze#Resistance"
                        title="Sleaze">Sleaze Resistance</a></span> (+3)<br><a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/MP_Modifiers"
                    title="MP Modifiers">Maximum MP</a> +25
            </td>
            <td><span class='monster' data-id="528">Frat Warrior drill sergeant</span></td>
        </tr>
        <tr class='odd'>
            <td><a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Category:Penguins" title="Category:Penguins">Penguins</a>
            </td>
            <td>+3 Muscle <a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Stat_Gains_from_Fights" title="Stat Gains from Fights">Stats
                    Per Fight</a><br>+25 Damage to <span class="element-cold"><a target="_blank"
                        href="/thekolwiki/index.php/Cold#Spells" title="Cold">Cold Spells</a></span>
            </td>
            <td><span class='monster' data-id="1511">Mob Penguin Capo</span></td>
        </tr>
        <tr>
            <td><a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Category:Pirates" title="Category:Pirates">Pirates</a>
            </td>
            <td>+50% <a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Item_Drops_from_Monsters" title="Item Drops from Monsters"
                    class="mw-redirect">Booze Drops from Monsters</a><br>+25 <span class="element-sleaze"><a target="_blank"
                        href="/thekolwiki/index.php/Sleaze#Damage" title="Sleaze">Sleaze Damage</a></span>
            </td>
            <td><span class='monster' data-id="129">shifty pirate</span></td>
        </tr>
        <tr class='odd'>
            <td><a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Category:Plants" title="Category:Plants">Plants</a>
            </td>
            <td><a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Combat_Initiative" title="Combat Initiative">Combat Initiative</a>
                +50%<br>+50% <a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/HP_Modifiers" title="HP Modifiers">Maximum HP</a>
            </td>
            <td><span class='monster' data-id="1800">angry mushroom guy</span></td>
        </tr>
        <tr>
            <td><a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Category:Slimes" title="Category:Slimes">Slimes</a>
            </td>
            <td>Serious <span class="element-cold"><a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Cold#Resistance" title="Cold">Cold
                        Resistance</a></span> (+3)<br><a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Damage_Absorption"
                    title="Damage Absorption">Damage Absorption</a> +50
            </td>
            <td><span class='monster' data-id="1238">oil cartel</span></td>
        </tr>
        <tr class='odd'>
            <td><a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Category:Undead" title="Category:Undead">Undead</a>
            </td>
            <td>+25 <span class="element-spooky"><a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Spooky#Damage" title="Spooky">Spooky
                        Damage</a></span><br><a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Muscle_Modifiers"
                    title="Muscle Modifiers">Muscle</a> +50%
            </td>
            <td><span class='monster' data-id="1074">giant swarm of ghuol whelps</span></td>
        </tr>
        <tr>
            <td><a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Category:Weird" title="Category:Weird">Weird</a>
            </td>
            <td>+50% <a target="_blank" href="https://kol.coldfront.net/thekolwiki/index.php/Item_Drops_from_Monsters" title="Item Drops from Monsters"
                    class="mw-redirect">Food Drops from Monsters</a><br><a target="_blank"
                    href="/thekolwiki/index.php/Bonus_Weapon_Damage" title="Bonus Weapon Damage">Weapon Damage</a> +25
            </td>
            <td><span class='monster' data-id="287">small barrel mimic</span></td>
        </tr>
    </tbody>
    <tfoot></tfoot>
</table></center>`;

    container.addEventListener('click', onClickMonsterContainer);

    return container;
}