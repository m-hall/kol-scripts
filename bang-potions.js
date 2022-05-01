// ==UserScript==
// @name           Bang Potion Helper
// @include        *kingdomofloathing.com/game.php*
// @include        *kingdomofloathing.com/fight.php*
// @include        *kingdomofloathing.com/inventory.php*
// @include        *kingdomofloathing.com/afterlife.php*
// @version        1.0
// ==/UserScript==


var bangNames = ["milky", "swirly", "bubbly", "smoky", "cloudy", "effervescent", "fizzy", "dark", "murky"];
var bangEffects = [
	{ name: 'drunk', inventory: 'liquid fire', combat: 'like a wino' }, //drunk
	{ name: 'heals', inventory: 'hit points', combat: 'feels better' }, //heals
	{ name: 'Izchak\'s Blessing', inventory: 'Izchak\'s Blessing', combat: 'more stylish' }, //+effect
	{ name: 'Strength of Ten Ettins', inventory: 'Strength of Ten Ettins', combat: 'much stronger' }, //+effect
	{ name: 'Strange Mental Acuity', inventory: 'Strange Mental Acuity', combat: 'much smarter' }, //+effect
	{ name: 'Object Detection', inventory: 'Object Detection', combat: 'blink' }, //+effect
	{ name: 'Confused', inventory: 'Confused', combat: 'looks confused' }, //-effect
	{ name: 'Sleepy', inventory: 'Sleepy', combat: 'yawns' }, //-effect
	{ name: 'Teleportis', inventory: 'Teleportitis', combat: 'starts disappearing' }//-effect
];
var combatRegex = /You throw the (\w+) potion at your opponent. It shatters against.*?(like a wino|feels better|more stylish|much stronger|much smarter|blink|looks confused|yawns|starts disappearing)/;
var invNameRegex = /You drink the (\w+) potion./;
var potionRegex = /(\w+)\spotion/;



/**
 * Gets a stored value
 * @param {string} name         The name of an item
 * @param {object} def          A default value when the item is undefined
 * @return {object}             The value corresponding to the name
 **/
function getValue(name, def){
    var val = localStorage.getItem(name);
    return (val || val === 0) ? val : def;
}

/**
 * Sets a stored value
 * @param {string} name         The name of an item
 * @param {object} value        The value of the item
 **/
function setValue(name, value){
    localStorage.setItem(name, value);
}

/**
 * Deletes a stored value
 * @param {string} name         The name of an item
 **/
function deleteValue(name){
    localStorage.removeItem(name);
}

/**
 * Gets the index of which Bang potion effect uses a specific string
 * @param {string} str          An inventory or combat string
 * @return {int}                The index of the bang potion effect
 **/
function getBangId(str){
	for (var i = bangEffects.length; i--;){
		var bang = bangEffects[i];
		if (bang.inventory === str || bang.combat === str ){
			return i;
		}
	}
	return -1;
}

/**
 * Gets the Character name.
 * @return {string}             A character's name
 **/
function getCharName(){
	if (getValue('CurrentCharName', null))
		return getValue('CurrentCharName')
	if (!window.top || !window.top.frames[1])
		return false
	var charName = window.top.frames[1].document.querySelector('b')
	if (charName){
		charName = charName.textContent
	}else {
		return false
	}
	setValue('CurrentCharName', charName)
	return charName;
}

/**
 * Checks to see if the Results of using a potion has shown up.
 **/
function checkInventory(){
	var charName = getCharName();
	var effdiv = document.querySelector('#effdiv');
	if (!charName || !effdiv || effdiv.innerHTML === window.lastEffDiv){
		return;
	}
	var m = effdiv.innerText.match(invNameRegex);
	if (!m || getValue(charName+m[1], null) !== null) {
		return;
	}
	if (bangNames.indexOf(m[1]) > -1){
		var name = m[1];
		for (var i = bangEffects.length; i--;){
			if (effdiv.innerText.indexOf(bangEffects[i].inventory) > -1){
				setValue(getCharName()+name, i);
				break;
			}
		}
		effdiv.querySelector('blockquote').innerHTML += '<center>The "'+name+'" potion is the '+bangEffects[i].name+' potion.</center>';
	}
	window.lastEffDiv = effDiv.innerHTML;
}

/**
 * Adds the type to each of the potions in the inventory.
 **/
function doInventory(){
	var charName = getCharName();
	if (!charName){
		return;
	}
	var items = document.querySelectorAll('table.item');
	for (var i = items.length; i--;){
		var item = items[i];
		var name = item.querySelector('b.ircm').textContent;
		var m = name.match(potionRegex);
		if (m && m[1]){
			var eff = getValue(charName+m[1]);
			if (!eff){
				continue;
			}
			var node = item.querySelector('b.ircm ~ font');
			node.innerHTML +='<span style="color:blue">'+bangEffects[parseInt(eff)].name+"</span>";
		}
	}
}

/**
 * Checks for potions used during combat
 **/
function doFight(){
	var charName = getCharName();
	if (!charName){
		return;
	}
	var pageText = document.body.innerText;
	var m = pageText.match(combatRegex);
	if (!m || !m[1]){
		return;
	}
	var pName = m[1];
	var eff = getBangId(m[2]);
	if (eff === -1){
		return;
	}
	setValue(getCharName()+pName, eff);
	var div = document.querySelector('#effdiv');
	div.style.display = 'block';
	div.style.textAlign = 'center';
	div.innerHTML = 'The "'+pName+'" potion is the '+bangEffects[eff].name+' potion.';
}

/**
 * Clears the current character data
 **/
function clearChar(){
	var charName = getCharName();
	if (!charName){
		return;
	}
	for (var i = bangNames.length; i--; ){
		deleteValue(charName+bangNames[i]);
	}
}


switch(window.location.pathname) {
	case '/inventory.php':
		doInventory();
		setInterval(checkInventory, 500);
		break;
	case '/fight.php':
		doFight();
		break;
	case '/afterlife.php':
		clearChar();
		break;
	case '/game.php':
		deleteValue('CurrentCharName');
}