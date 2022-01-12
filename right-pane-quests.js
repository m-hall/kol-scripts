// ==UserScript==
// @name         Right-Pane Quests
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Moves the quests from the char pane to the right pane when chat is not open
// @author       m-hall
// @include      *kingdomofloathing.com/charpane.php
// @include      http://127.0.0.1:60080/charpane.php
// @include      *kingdomofloathing.com/chatlaunch.php
// @include      http://127.0.0.1:60080/chatlaunch.php
// @include      *kingdomofloathing.com/mchat.php
// @include      http://127.0.0.1:60080/mchat.php
// @icon         https://www.google.com/s2/favicons?domain=kingdomofloathing.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    switch(window.location.pathname){
        case '/charpane.php':
            {
                const quests = document.querySelector('#nudgeblock');
                if (quests) {
                    quests.style.display = 'none';

                    let chatpaneNudge = window.top.frames['chatpane']?.document?.querySelector('#nudgeblock');

                    if (chatpaneNudge) {
                        chatpaneNudge.innerHTML = quests.innerHTML;
                    }
                }
            }
            break;
        case '/chatlaunch.php':
            {
                const dateElement = document.querySelector('.small > center:nth-of-type(2)');
                const questContent = window.top.frames['charpane']?.document?.querySelector('#nudgeblock')?.innerHTML || '';

                const chatpaneNudge = document.createElement('center');
                chatpaneNudge.id = 'nudgeblock';
                chatpaneNudge.style.margin = '20px 0';
                chatpaneNudge.style.paddingTop = '10px';
                chatpaneNudge.style.borderTop = '2px solid #888';
                chatpaneNudge.style.borderBottom = '2px solid #888';

                chatpaneNudge.innerHTML = questContent;

                dateElement.after(chatpaneNudge);
            }
            break;
        case '/mchat.php':
            {
                const questContent = window.top.frames['charpane']?.document?.querySelector('#nudgeblock')?.innerHTML || '';

                const container = document.createElement('div');
                container.style.display = 'none';
                container.style.position = 'fixed';
                container.style.top = '0';
                container.style.left = '0';
                container.style.width = '100%';
                container.style.height = '100%';
                container.style.zIndex = 100;
                container.style.background = 'rgba(0, 0, 0, 0.5)';

                const nudgeblock = document.createElement('div');
                nudgeblock.id = 'nudgeblock';
                nudgeblock.style.margin = '30px 10px';
                nudgeblock.style.padding = '10px';
                nudgeblock.style.background = 'white';
                nudgeblock.style.maxHeight = '90%';
                nudgeblock.style.overflow = 'auto';

                nudgeblock.innerHTML = questContent;

                container.appendChild(nudgeblock);

                const btn = document.createElement('button');
                btn.innerHTML = 'Quests';
                btn.style.position = 'fixed';
                btn.style.top = '3px';
                btn.style.right = '3px';
                btn.style.zIndex = 101;

                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    container.style.display = container.style.display === 'none' ? 'block' : 'none';
                });

                document.body.appendChild(btn);
                document.body.appendChild(container);

                document.querySelector('#tabs').style.marginRight = '60px';
            }
            break;
    }
})();