// ==UserScript==
// @name         Quick Skillz
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Quick access skills in char pane
// @author       m-hall
// @include        *kingdomofloathing.com/charpane.php
// @include      http://127.0.0.1:60080/charpane.php
// @icon         https://www.google.com/s2/favicons?domain=kingdomofloathing.com
// @grant        none
// ==/UserScript==
//https://www.kingdomofloathing.com/runskillz.php?action=Skillz&whichskill=1010&targetplayer=319588&pwd=d6a804516712ce0f02cfe89ea05e03cc&quantity=1
(function () {
    'use strict';

    const skillz = [
        {name: 'healing'},
        // {
        //     id: 3009,
        //     cost: 6,
        //     title: 'Lasagna Bandages',
        //     description: 'Heals 10-30 hp',
        //     image: 'https://d2uyhvukfffg5a.cloudfront.net/itemimages/lasbandage.gif'
        // },
        {
            id: 1010,
            cost: 10,
            title: 'Tongue of the Walrus',
            description: 'Heals 30-40 hp and removes Beat Up',
            image: 'https://d2uyhvukfffg5a.cloudfront.net/itemimages/tonguewalrus.gif'
        },
        {
            id: 3012,
            cost: 20,
            title: 'Cannelloni Cocoon',
            description: 'Heals up to 1000 hp',
            image: 'https://d2uyhvukfffg5a.cloudfront.net/itemimages/coccoon.gif'
        },
        {name: 'familiar'},
        {
            id: 2026,
            cost: 10,
            title: 'Curiosity of Br\'er Tarrypin',
            description: '+1 Familiar Experience per combat',
            image: 'https://d2uyhvukfffg5a.cloudfront.net/itemimages/curiosity.gif'
        },
        {
            id: 3010,
            cost: 12,
            title: 'Leash of Linguini',
            description: 'Familiar Weight +5 lbs',
            image: 'https://d2uyhvukfffg5a.cloudfront.net/itemimages/string.gif'
        },
        {
            id: 2009,
            cost: 15,
            title: 'Empathy of the Newt',
            description: 'Familiar Weight +5 lbs',
            image: 'https://d2uyhvukfffg5a.cloudfront.net/itemimages/empathy.gif'
        },
        {name: 'Elem Res'},
        {
            id: 4007,
            cost: 10,
            title: 'Elemental Saucesphere',
            description: 'Elemental Resistances +2',
            image: 'https://d2uyhvukfffg5a.cloudfront.net/itemimages/elesphere.gif'
        },
        {
            id: 2012,
            cost: 10,
            title: 'Astral Shell',
            description: 'Elemental Resistances +1',
            image: 'https://d2uyhvukfffg5a.cloudfront.net/itemimages/blackshell.gif'
        },
        {
            id: 4019,
            cost: 10,
            title: 'Scarysauce',
            description: '+2 Sleaze/Cold resistance, reflect some damage',
            image: 'https://d2uyhvukfffg5a.cloudfront.net/itemimages/scarysauce.gif'
        },
        {name: 'drops'},
        {
            id: 6010,
            cost: 11,
            title: 'Fat Leon\'s Phat Loot Lyric',
            description: 'Item drops +20%',
            image: 'https://d2uyhvukfffg5a.cloudfront.net/itemimages/fatleons.gif'
        },
        {
            id: 6006,
            cost: 7,
            title: 'The Polka of Plenty',
            description: 'Meat drops +50%',
            image: 'https://d2uyhvukfffg5a.cloudfront.net/itemimages/plenty.gif'
        },
        {name: 'combat'},
        {
            id: 3015,
            cost: 10,
            title: 'Springy Fusilli',
            description: 'Combat Init +40%',
            image: 'https://d2uyhvukfffg5a.cloudfront.net/itemimages/fusilli.gif'
        },
        {
            id: 6005,
            cost: 4,
            title: 'Cletus\'s Canticle of Celerity',
            description: 'Combat Init +20%',
            image: 'https://d2uyhvukfffg5a.cloudfront.net/itemimages/celerity.gif'
        },
        {
            id: 6012,
            cost: 9,
            title: 'Jackasses Symphony of Destruction',
            description: 'Weapon and Spell Damage +12',
            image: 'https://d2uyhvukfffg5a.cloudfront.net/itemimages/jackasses.gif'
        },
        {name: '-combat freq'},
        {
            id: 5017,
            cost: 10,
            title: 'Smooth Movement',
            description: 'Increase non-combats',
            image: 'https://d2uyhvukfffg5a.cloudfront.net/itemimages/footprints.gif'
        },
        {
            id: 6015,
            cost: 20,
            title: 'The Sonata of Sneakiness',
            description: 'Increase non-combats',
            image: 'https://d2uyhvukfffg5a.cloudfront.net/itemimages/sonata.gif'
        },
        {name: '+combat freq'},
        {
            id: 1019,
            cost: 10,
            title: 'Musk of the Moose',
            description: 'Increase combats',
            image: 'https://d2uyhvukfffg5a.cloudfront.net/itemimages/moosemusk.gif'
        },
        {
            id: 6016,
            cost: 20,
            title: 'Carlweather\'s Cantata of Confrontation',
            description: 'Increase combats',
            image: 'https://d2uyhvukfffg5a.cloudfront.net/itemimages/cantata.gif'
        },
        {name: 'stats'},
        {
            id: 6008,
            cost: 5,
            title: 'The Power Ballad of the Arrowsmith',
            description: '+10 Muscle, +20 HP',
            image: 'https://d2uyhvukfffg5a.cloudfront.net/itemimages/arrowsmith.gif'
        },
        {
            id: 6007,
            cost: 3,
            title: 'The Magical Mojomuscular Melody',
            description: '+10 Mysticality, +20 MP',
            image: 'https://d2uyhvukfffg5a.cloudfront.net/itemimages/mojomusc.gif'
        },
        {
            id: 6004,
            cost: 2,
            title: 'The Moxious Madrigal',
            description: '+10 Moxie',
            image: 'https://d2uyhvukfffg5a.cloudfront.net/itemimages/madrigal.gif'
        },
        {name: 'ML'},
        {
            id: 1040,
            cost: 30,
            title: 'Pride of the Puffin',
            description: '+10 ML',
            image: 'https://d2uyhvukfffg5a.cloudfront.net/itemimages/trophy.gif'
        },
        {
            id: 6017,
            cost: 30,
            title: 'Ur-Kel\'s Aria of Annoyance',
            description: '+2*lvl ML (Max 60)',
            image: 'https://d2uyhvukfffg5a.cloudfront.net/itemimages/urkels.gif'
        },
        {
            id: 89,
            cost: 40,
            title: 'Drescher\'s Annoying Noise',
            description: '+10 ML (20 turns)',
            image: 'https://d2uyhvukfffg5a.cloudfront.net/itemimages/brokenflute.gif'
        },
        {},
        {
            id: 6014,
            cost: 50,
            title: 'Ode To Booze',
            description: '+Adv per booze potency',
            image: 'https://d2uyhvukfffg5a.cloudfront.net/itemimages/odetobooze.gif'
        },
        { name: 'standard' },
        {
            id: 'umbrella',
            title: 'unbreakable umbrella',
            description: 'Update the umbrella\'s enchantment',
            image: 'https://d2uyhvukfffg5a.cloudfront.net/itemimages/unbrella5.gif',
            action: () => {
                window.top.frames.mainpane.location = `/inventory.php?action=useumbrella&pwd=${pwdhash}`;
            }
        },
        {
            id: 'locket',
            title: 'combat lover\'s locket',
            description: 'Reminisce on an old enemy',
            image: 'https://d2uyhvukfffg5a.cloudfront.net/itemimages/lovelocket.gif',
            action: () => {
                window.top.frames.mainpane.location = `/inventory.php?reminisce=1`;
            }
        },
        {
            id: 'backup',
            title: 'backup camera',
            description: 'Set Backup Camera mode.',
            image: 'https://d2uyhvukfffg5a.cloudfront.net/itemimages/backcamera.gif',
            action: () => {
                window.top.frames.mainpane.location = `/inventory.php?action=bcmode`;
            }
        },
        { name: 'old' },
        {
            id: 'barrel',
            title: 'Shrine to the Barrel god',
            description: 'Select a daily gift',
            image: 'https://d2uyhvukfffg5a.cloudfront.net/itemimages/barrelbig.gif',
            action: () => {
                window.top.frames.mainpane.location = `/da.php?barrelshrine=1`;
            }
        },
        {
            id: 'florist',
            title: 'Florist Friar',
            description: 'Pick flowers for the most recent zone',
            image: 'https://s3.amazonaws.com/images.kingdomofloathing.com/itemimages/floristform.gif',
            action: () => {
                window.top.frames.mainpane.location = `/place.php?whichplace=forestvillage&action=fv_friar`;
            }
        },
        {
            id: 'chateau',
            title: 'Chateau Mantagna',
            description: 'Go to your Chateau',
            image: 'https://d2uyhvukfffg5a.cloudfront.net/itemimages/cmkey.gif',
            action: () => {
                window.top.frames.mainpane.location = `/place.php?whichplace=chateau`;
            }
        }
    ];

    if (window.location.pathname.includes('charpane')) {
        var body = document.body;
        var charPaneContainer = document.createElement('center');
        var charPaneContents = body.querySelectorAll('body > :not(#rollover)');

        body.style.display = 'flex';
        body.style.flexDirection = 'column';
        body.style.height = '100%';
        body.style.margin = 0;

        charPaneContainer.style.overflowY = 'auto';
        charPaneContainer.style.flex = '1';

        charPaneContents.forEach(el => charPaneContainer.appendChild(el));

        body.appendChild(charPaneContainer);

        const style = `
        .close { right: 0 !important; }
        #skillName {display: none; position:absolute; bottom:100%; margin-bottom: 5px; border: 1px solid black; background: white; color: black; padding: 2px; width:90%; right: 5%;}
        .skillDesc {font-size:0.6em;}
        .groupName {font-size: 10px; position: absolute; bottom: 1px; left: 50%; transform: translateX(-50%);}
        .quickSkill {padding: 0}
        .skillGroup {display:inline-block;padding:3px 10px 10px;white-space:nowrap;position:relative}
        .quickSkillz {position: relative; display: flex; justify-content: center; flex-wrap: wrap; row-gap: 5px;}
        `;
        let prefix = '';
        let groupIsEven = false;
        const skillnameHTML = '<div id="skillName"></div>';
        const actionMap = {};
        const buttons = `
            ${skillz.map(skill => {
                if (!skill.id) {
                    groupIsEven = !groupIsEven;
                    let result = `${prefix}<div class="skillGroup"${groupIsEven ? ' style="background:#ccc"' : ''}><span class="groupName">${skill.name || ''}</span>`;
                    if (!prefix) {
                        prefix = '</div>';
                    }
                    return result;
                }
                if (!Number.isInteger(skill.id)) {
                    actionMap[skill.id] = skill.action;
                }
                return `<button data-which='${skill.id}' data-title="${skill.title}" data-cost="${skill.cost || ''}" data-description="${skill.description}" style="padding: 0">
                    <img src="${skill.image}" height="16" width="16">
                </button>`;
            }).join(' ')}
            </div>
        `;
        const container = document.createElement('center');
        container.className = 'quickSkillz';
        container.innerHTML = `
            <style>${style}</style>
            ${buttons}
            ${skillnameHTML}
        `;
        const skillname = container.querySelector('#skillname');
        container.querySelectorAll('button').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                const whichskill = this.dataset.which;
                if (!Number.isInteger(+whichskill)) {
                    actionMap[whichskill]();
                }
                if (e.shiftKey) {
                    pop_query($(this), 'How many times?', 'Do It!', function (res) {
                        dojax(`/runskillz.php?action=Skillz&whichskill=${whichskill}&targetplayer=0&pwd=${pwdhash}&quantity=${res}&ajax=1`);
                    });
                } else {
                    dojax(`/runskillz.php?action=Skillz&whichskill=${whichskill}&targetplayer=0&pwd=${pwdhash}&quantity=1&ajax=1`);
                }
            })
            btn.addEventListener('contextmenu', function (e) {
                e.preventDefault();
                const whichskill = this.dataset.which;
                if (!Number.isInteger(+whichskill)) {
                    return;
                }
                pop_query($(this), 'How many times?', 'Do It!', function (res) {
                    dojax(`/runskillz.php?action=Skillz&whichskill=${whichskill}&targetplayer=0&pwd=${pwdhash}&quantity=${res}&ajax=1`);
                });
            });
            btn.addEventListener('mouseenter', function (e) {
                if (this.dataset.cost) {
                    skillname.innerHTML = `<div>${this.dataset.title} (${this.dataset.cost}mp)</div><div class='skillDesc'>${this.dataset.description}</div>`;
                } else {
                    skillname.innerHTML = `<div>${this.dataset.title}</div><div class='skillDesc'>${this.dataset.description}</div>`;
                }
                skillname.style.display = 'block';
            })
            btn.addEventListener('mouseleave', function (e) {
                skillname.innerHTML = '';
                skillname.style.display = 'none';
            })
        })
        body.appendChild(container);
    }
})();