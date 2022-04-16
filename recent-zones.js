// ==UserScript==
// @name    Recent zones list
// @description Shows multiple links to recent zones
// @include      *www.kingdomofloathing.com/charpane.php*
// @include      http://127.0.0.1:60080/charpane.php*
// @grant        GM_getValue
// @grant        GM_setValue
// @icon         https://www.google.com/s2/favicons?domain=kingdomofloathing.com
// ==/UserScript==

(function() {
    'use strict';
    const RECENT_KEY = 'RECENT_ZONES';
    const SHOW_COUNT = 5;
    const MAP_IMG = 'https://d2uyhvukfffg5a.cloudfront.net/itemimages/map.gif';

    const user = document.querySelector('td[valign=center] a[href*=charsheet]');
    const [area, zone] = Array.from(document.querySelectorAll('#nudgeblock+center a'));
    let recents = GM_getValue(RECENT_KEY + user.innerText) || [];

    if (!area || !zone) {
        return;
    }

    const existingIndex = recents.findIndex(recent => recent.href === zone.href);
    if (existingIndex >= 0) {
        recents.splice(existingIndex, 1);
    }

    recents.unshift({href: zone.href, name: zone.innerText, areaHref: area.href});
    recents = recents.slice(0, SHOW_COUNT + 1);
    GM_setValue(RECENT_KEY + user.innerText, recents);

    const container = document.createElement('center');
    let content = '';
    for (let i = 1; i < recents.length; i++) {
        if (i > 1) {
            content += '<br/>';
        }
        content += `<a onclick="if (top.mainpane.focus) top.mainpane.focus();" href='${recents[i].href}' target="mainpane">${recents[i].name}</a>`;
        if (recents[i].areaHref) {
            content += ` <a onclick="if (top.mainpane.focus) top.mainpane.focus();" href="${recents[i].areaHref}" target="mainpane"><img height=16 width=16 src="${MAP_IMG}" style="vertical-align: middle;" /></a>`
        }
    }

    container.innerHTML = content;
    zone.after(container);

    if (container.childNodes.length > 0) {
        const separator = document.createElement('div');
        separator.style.margin = '8px 20px';
        separator.style.borderBottom = '1px solid #888';
        zone.style.display = 'block';
        zone.style.textAlign = 'center';
        zone.after(separator);
    }
})();