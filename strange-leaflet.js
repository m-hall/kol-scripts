// Tard's KoL Scripts
// Copyright (c) 2006, Byung Kim
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name           Tard's KoL Scripts - Strange Leaflet
// @namespace      http://kol.dashida.com
// @author		   Tard
// @contributor    Hellion
// @grant	GM_log
// @grant 	GM_getValue
// @grant 	GM_setValue
// @grant	GM_xmlhttpRequest
// @grant   GM_registerMenuCommand
// @include        *kingdomofloathing.com/main_c.html
// @include        *kingdomofloathing.com/main.*
// @include        *kingdomofloathing.com/leaflet.*
// @description    Strange Leaflet spoiler script
// @version		   0.53
// ==/UserScript==


/********************************** Change Log **********************************************
v0.54: auto-secret code
v0.53: fix infinite loop after bowling trophy acquisition.
v0.52: add auto-clicking of the "Do It!" button, except when the secret code is in play.

********************************************************************************************/
if (window.location.pathname == "/main_c.html" || window.location.pathname == "/main.html" || window.location.pathname == "/main.php") {

//	setTimeout('if (window["checkForUpdate"]) checkForUpdate("strangeleaflet","0.5","Strange Leaflet","http://kol.dashida.com/tardskolscripts_strangeleaflet.user.js");',1000);
	GM_setValue("newArea","false");
	GM_log("strange, leaflet.");

} else {

	var body = document.getElementsByTagName('body')[0];
	var bodyHTML = body.innerHTML;
	var tds = document.getElementsByTagName('td');
	var td1 = tds[0].innerText;
	var td3 = tds[2].innerText;
	var command = "";
	var code = "";
	var submit = true;
//	GM_log("td1="+td1);
//	GM_log("td3="+td3);

	if (GM_getValue("newArea") == "true") {
		switch(td1) {
			case "North of the Field":
				command = "south";
			break;

			case "West of House":
				if (td3.indexOf("You leave the house.") != -1) command = "south";
				else command = "east";
			break;

			case "In the House":
				if (td3.indexOf("parchment") != -1) command = "read parchment";
				else if (td3.indexOf("Bits of torn and wadded newspaper") != -1) command = "look fireplace";
				else if (td3.indexOf("An eerie glow surrounds you") != -1 || td3.indexOf("That only works once") != -1) command = "light fireplace";
				else if (td3.indexOf("large pair of boots") != -1 || td3.indexOf("At this point, it's not so much tinder as ash") != -1) command = "get boots";
				else if (td3.indexOf("Okay, got 'em") != -1 || td3.indexOf("You've already got the boots") != -1) command = "wear boots";
				else if (td3.indexOf("With some difficulty, you strap on the boots") != -1 || td3.indexOf("Since you're already wearing them") != -1) command = "west";
				else if (td3.indexOf("The fireplace is stacked with dry firewood and tinder, ready for lighting") != -1) {
					if (td3.indexOf("small white house") != -1) {
						command = "xyzzy";
						// command = "light fireplace";
					} else if (td3.indexOf("brick building") != -1) {
						command = "plugh";
						// command = "light fireplace";
					} else if (td3.indexOf("bird") != -1) {
						command = "plover";
						// command = "light fireplace";
					} else if (td3.indexOf("ship") != -1) {
						command = "yoho";
						// command = "light fireplace";
					} else if (td3.indexOf("trophy") != -1) {
						command = "take trophy";
					} else {
                                                command = "light fireplace";
                                        }
					// if (code != "") {
					// 	GM_setValue("code",code);
					// 	body.innerHTML = '<div style="height:50px;"><a href="javascript:document.whatnow.command.value=\'' + code + '\';void(0);">Click here to reveal the secret code</a></div>' + bodyHTML;
					// 	submit = false;
					// }
				}
				else command = "look tinder";
			break;

			case "South Bank":
				// if (GM_getValue("code")) {
				// 	body.innerHTML = '<div style="height:50px;">Warning: Proceeding further will eliminate your opportunity for using the secret code.'+
				// 		'<br/><a href="javascript:document.whatnow.command.value=\'' + GM_getValue("code") +
				// 		'\';void(0);">Click here to reveal the secret code</a></div>' + bodyHTML;
				// 	submit = false;
				// }
				command = "south";
			break;

			case "Forest":
				if (td3.indexOf("south") != -1) command = "south";
				else if (td3.indexOf("east") != -1) command = "east";
				else if (td3.indexOf("west") != -1) command = "west";
				else if (td3.indexOf("north") != -1) command = "north";
			break;

			case "On the other side of the forest maze...":
				if (td3.indexOf("You carefully make your way back down to the forest floor") != -1) command = "look in leaves";
				else command = "up";
			break;

			case "Halfway Up The Tree":
				if (td3.indexOf("large egg encrusted with precious jewels") != -1) command = "get egg";
				else if (td3.indexOf("manage to get the egg without losing your grip on the tree") != -1 || td3.indexOf("You've already got the egg") != -1) command = "throw egg roadrunner";
				else if (td3.indexOf("the ruby, which plummets past you") != -1 || td3.indexOf("You don't have a ruby") != -1) command = "down";
				else if (td3.indexOf("You snatch the scroll out of the air as it flutters down") != -1) command = "gnusto cleesh";
				else if (td3.indexOf("Both the Gnusto scroll and the Cleesh scroll crumble into dust") != -1) command = "up";
				else command = "throw ruby bowl";
			break;

			case "Tabletop":
				if (td3.indexOf("You acquire an item") != -1) command = "exit";
				else if (td3.indexOf("Giant's pinky ring") != -1) command = "get ring";
				else if (td3.indexOf("contents have spilled and drained") != -1) command = "exit";
				else command = "cleesh giant";
			break;



		}
	} else {
		switch(td1) {
			case "West of House":
				if (td3.indexOf("The house's front door is closed.") != -1) command = "open door";
				else if (td3.indexOf("You leave the house.") != -1) command = "north";
				else if (td3.indexOf("The front door of the house is standing open.") != -1) command = "east";
			break;

			case "In the House":
				if (td3.indexOf("An ornate sword hangs above the mantel.") != -1) command = "get sword";
				else command = "west";
			break;

			case "North of the Field":
				if (td3.indexOf("A hefty stick lies on the ground.") != -1) command = "get stick";
				else if (td3.indexOf("A thick hedge blocks the way to the west.") != -1) command = "cut hedge";
				else if (td3.indexOf("You leave the clearing.") != -1) command = "north";
				else command = "west";
			break;

			case "Forest Clearing":
				if (td3.indexOf("You hold the stick in the flames until it lights.") != -1) command = "east";
				else if (td3.indexOf("You don't know what words mean, do you?") != -1 || td3.indexOf("Do what with the what, now?") != -1 || td3.indexOf("You're using words I don't know...") != -1 || td3.indexOf("I don't understand that...") != -1) command = "east";
				else command = "light stick";
			break;

			case "Cave":
				if (td3.indexOf("dangerous-looking serpent coiled around it.") != -1) command = "kill serpent";
				else if (td3.indexOf("surrounded by hacked-up serpent bits") != -1) command = "open chest";
				else if (td3.indexOf("You discover a tiny hole in the wall behind the chest.") != -1 || td3.indexOf("You check to make sure the hole is still there.") != -1) command = "look in hole";
				else if (td3.indexOf("You find a grue egg in the hole!") != -1 || td3.indexOf("There's nothing else in the hole.") != -1) {
					command = "south";
					GM_setValue("newArea","true");
				}
				else if (td3.indexOf("An empty treasure chest sits near the rear wall.") != -1) command = "look behind chest";
			break;

			default:
				GM_setValue("newArea","true");
			break;

		}
	}

    console.log(td1, td3);
    console.log(command);

    document.forms["whatnow"].command.value=command;
	setTimeout(function () {
        document.forms["whatnow"].command.value=command;
        if (submit == true) {
            document.forms["whatnow"].submit();
        }
    }, 100);
}