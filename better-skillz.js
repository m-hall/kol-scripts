// ==UserScript==
// @name         Better Skillz
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Quick access skills in char pane
// @author       m-hall
// @include        *kingdomofloathing.com/skillz.php
// @include      http://127.0.0.1:60080/skillz.php
// @icon         https://www.google.com/s2/favicons?domain=kingdomofloathing.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const container = document.querySelector('body > center');
    const restorer = document.querySelector('body > center > center:last-of-type');
    const cats = document.querySelectorAll('table.cat');
    const wrapper = document.createElement('div');
    const style = document.createElement('style');
    wrapper.className='wrapper';
    style.innerText = `
    .wrapper {
        display: grid;
        grid-template-columns: repeat(auto-fill, 385px);
        align-items: flex-start;
        justify-items: center;
        justify-content: center;
        gap: 10px;
    }
    .wrapper .balls {
        width: 100% !important;
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
    `;

    restorer.style.marginBottom = '10px';

    wrapper.append(style);

    cats.forEach((cat, i) => {
        if (i > cats.length - 3) {
            return;
        }
        wrapper.append(cat)
    });

    container.prepend(wrapper);
    container.prepend(restorer);
})();