// ==UserScript==
// @name	Crafting synergy
// @description	Adds the corresponding discoveries to the regular crafting pages and vice-versa
// @include	*www.kingdomofloathing.com/craft.php*
// @include      http://127.0.0.1:60080/craft.php*
// ==/UserScript==

/**
 * Sends an XML HTTP Request
 * @param {object} data         Any data necessary to build the request
 **/
 function request(data){
    var x = new XMLHttpRequest();
    x.open (data.method, data.url, false);
    x.onreadystatechange= function (){
        if (this.readyState == 4){
            data.onload.apply(this, [this, data]);
        }
    };
    x.send();
}

const pageTitle = Array.from(document.querySelectorAll('td[bgcolor=blue]')).map(heading => heading.innerText).join('').toLowerCase();
let what, mode;
let greyedHidden = false;

function toggleGreyed() {
    const display = greyedHidden ? '' : 'none';
    const greyedItems = document.querySelectorAll('td.gray');
    greyedHidden = !greyedHidden;

    greyedItems.forEach(item => {
        const cell = item.closest('td');
        cell.previousSibling.style.display = display;
        cell.style.display = display;
    });
}
// Add the miscellaneous link to the top section
document.querySelector('font[size="2"]').innerHTML += `&nbsp;[<a href="/craft.php?mode=discoveries&what=multi">miscellaneous</a>]<br/><button>Toggle Unavailable</button>`;
document.querySelector('font[size="2"] button').addEventListener('click', function (e) {
    e.preventDefault();

    toggleGreyed();
})
if (pageTitle.includes('misc')){
	return;
} else if (pageTitle.includes('combine') || pageTitle.includes('meat-')) {
    what='combine';
} else if (pageTitle.includes('cook')) {
    what='cook';
} else if (pageTitle.includes('smith')) {
    what='smith';
} else if (pageTitle.includes('cocktail')) {
    what='cocktail';
}
mode = pageTitle.includes('discov') ? what : `discoveries&what=${what}`;

if (what && mode){
	request({
		'url':`/craft.php?mode=${mode}`,
		'method': 'POST',
		'onload': function (){
			var div = document.createElement('div');
			div.innerHTML = this.responseText;
			var create = div.querySelectorAll('center > table[width="95%"]');
			var parent = document.querySelector('center');
			var nextNode = document.querySelector('center > center:last-child');
			for(var i = 1, l = create.length; i < l; i++){
				create[i].parentNode.removeChild(create[i]);
				parent.insertBefore(create[i], nextNode);
			}

            toggleGreyed();
		}
	});
}
