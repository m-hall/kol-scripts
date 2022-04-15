// ==UserScript==
// @name         Yossarian helper
// @description  Highlights good/bad messages for yossarian's quest
// @include      *www.kingdomofloathing.com/fight.php*
// @include      http://127.0.0.1:60080/fight.php*
// @icon         https://www.google.com/s2/favicons?domain=kingdomofloathing.com
// ==/UserScript==



(function() {
    'use strict';

    const bad = /does a bombing run|automatic eyeball-peeler|bites you in the fibula|picks a beet off of itself|picks a radish off of itself/;
    const good = /whips out a hammer|whips out a crescent wrench|whips out a pair of pliers|whips out a screwdriver/;

    function doFight() {
        const ps = document.querySelectorAll('p');

        Array.from(ps).find(p => {
            if (p.innerText.match(bad)) {
                const cell = p.querySelector('td');
                cell.style.color = 'red';
                cell.style.fontWeight = 'bold';
                return true;
            } else if (p.innerText.match(good)) {
                const cell = p.querySelector('td');
                cell.style.color = 'green';
                cell.style.fontWeight = 'bold';
                return true;
            }
            return false;
        })
    }

    doFight();
})();
