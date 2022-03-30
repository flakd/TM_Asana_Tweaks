// ==UserScript==
// @name         Asana Enhancer
// @namespace    https://*.asana.com
// @version      2.0
// @description  Enhance asana web interface
// @author       flakdinenno

// @include      https://*.asana.com/*
// @include      http://*.asana.com/*
// @match        https://*.asana.com/*
// @match        http://*.asana.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    initAsanaEnhancer();
    window.numTimesRun = 0;
    window.highlightButton;

    function initAsanaEnhancer() {
//alert("in initAsanaEnhancer");
        if (typeof window.numTimesRun == "undefined") window.numTimesRun = 0;
//alert(window.numTimesRun++);
        console.log('%cInit asana enhancer', 'color: #77a7ba');
//alert("attempt [#" + window.numTimesRun + "] - just starting... check console");
        //taskListDetailsOnDblClick();
        //hideTopBar();
        //hideUpgradeBtn();
//alert("createHighlightButton() is next");
        createHighlightButton();
        // Will execute myCallback every 0.5 seconds
        var intervalID = window.setInterval(conditionalHightlighting, 10000);
    }

    function conditionalHightlighting(){
        const bullets = [
            ["FUP", "turquoise", "black"],
            ["√√", "#FF00FF", "white"],
            ["√", "purple", "white"],
            ["**", "red", "white"],
            ["++", "orange", "black"],
            ["^^", "pink", "black"],
            ["##", "blue", "white"],
            ["~~", "yellow", "black"]
        ];


        console.log("inside conditionalHightlighting()");
        //let taskListItems = document.querySelectorAll('.SpreadsheetTaskName');
        let taskListItems = document.querySelectorAll('.SpreadsheetTaskName.SpreadsheetTaskName--editable.SpreadsheetGridTaskNameCell-taskName');
        let tli = taskListItems;

        if (!tli || !tli[0]) { nullError(this, 37); return;}
        //alert("taskListItems[0] => " + tli[0]);

        for (let i = 0; i < tli.length; i++) {
            if ( !tli[i] ) { nullError(this, 41); return;}
            let task = tli[i];

            if ( !tli[i].innerHTML || !tli[i].textContent) { nullError(this, 42); return;}
            let content = tli[i].textContent;
            //console.log("Task Content => " + content);

            for (let i = 0; i < bullets.length; i++) {
                let bullet = bullets[i][0];
                let bgColor = bullets[i][1];
                let txtColor = bullets[i][2];
								if ( task.parentElement.classList.contains("SpreadsheetGridTaskNameCell-taskName--completed") {
                  task.style.backgroundColor = "grey";
                  task.style.color = "";
									break;
								}
                if ( !content.includes(bullet) ) {
                  task.style.backgroundColor = "";
                  task.style.color = "";
                } else {
                    console.log("Task Content => " + content);
                    console.log("bullet => " + bullet);
                    console.log("bgColor => " + bgColor);
                    console.log("txtColor => " + txtColor);
                    task.style.backgroundColor = bgColor;
                    task.style.color = txtColor;
                    break;
                }
            }
        }

        console.log('show conditionalHightlighting() is active');
    }


    function taskListDetailsOnDblClick() { //open task list details on double click
        let taskListItems = document.querySelectorAll('.TaskList .SubtaskTaskRow-taskName');

        for(let i = 0; i < taskListItems.length; i++) {
            taskListItems[i].addEventListener('dblclick', openTaskDetails);
        }

        console.log('show tasklist details on double click is active');
    }

    function openTaskDetails(e) { //open task list details
        e.target.parentNode.parentNode.parentNode.querySelector('.SubtaskTaskRow-detailsButton').click();
    }

    function hideTopBar() {
        let topBar = document.getElementById('topbar');

        if(topBar && topBar.style.display !== 'none') {
            topBar.style.display = 'none';
            console.log('topbar hidden');
        }
    }

    function hideUpgradeBtn(){
        let upgradeBtn = document.querySelector('[class*="upgradeButton"]');
        if(upgradeBtn && upgradeBtn.style.display !== 'none'){
            upgradeBtn.style.display = 'none';
            console.log('upgrade button hidden');
        }
    }

    function getCallerName(func){
        if (!func) return "anonymous";
        let caller = func.caller;
        if (!caller) return "anonymous";
        caller = caller.toString();
        if (!caller.trim().startsWith("function")) return "anonymous";
        return caller.substring(0, caller.indexOf("(")).replace("function","");
    }

    function nullError(caller, optText){
        console.log('---------------');
        console.log("null ERROR:")
        if (optText) console.log (optText);
        console.log('---------------');
        console.log(getCallerName(caller));
        console.log('===============');
    }

    function createHighlightButton(){
        let actions = document.querySelector('.TopbarPageHeaderGlobalActions.AsanaPageTopbar-globalActions');
        let btn = document.createElement("button");

        btn.class = "btnHighlight";
        btn.classList.add('AbstractThemeableRectangularButton');
        btn.classList.add('UpgradeButton');
        btn.style.margin = "0px 0px 0px 12px";
        btn.style.padding = "8px 8px 8px 8px";
        //btn.classList.add('TopbarContingentUpgradeButton-button');

        actions.appendChild(btn);
        //store in global object in case I need it globally somewhere
        window.highlightButton = btn;

        //window.highlightButton = document.querySelector('[class*="upgradeButton"]');
        //alert("createHighlightButton => " + upgradeBtn);
        //alert("HIGHLIGHT Btn => " + window.highlightButton);
        //if (!window.highlightButton) {
        //   console.log("upgradeBtn/window.highlightButton is undefined");
        //    nullError(this,110);
        //    return;
        //}
        console.log("window.highlightButton => " + window.highlightButton);
        window.highlightButton.innerText = "HIGHLIGHT";
        window.highlightButton.addEventListener('click', conditionalHightlighting);
        console.log('upgrade button converted');

        let btnUpgrade = document.querySelector('.UpgradeButton');
        btnUpgrade.style.display = "none";
    }

    function getUrlParams(url) {
        let params = {};
        url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
            params[key] = value;
        });

        return params;
    }

    function waitForElementToDisplay(selector, ms) {
        if(document.querySelector(selector)!=null) {
            //hideUpgradeBtn();
            //initAsanaEnhancer();
            createHighlightButton();
        }
        else {
            setTimeout(function() {
                waitForElementToDisplay(selector, ms);
            }, ms);
        }
    }


    (function(open) {
        XMLHttpRequest.prototype.open = function(method, url, async, user, pass) {

            this.addEventListener("readystatechange", function() {

                if(this.readyState === 4) {
                    let urlParams = getUrlParams(this.responseURL);
                    if(!urlParams.idle) { //just re-initialise if not an idle request
                        initAsanaEnhancer();
                    }
                }
            }, false);

            open.call(this, method, url, async, user, pass);
        };

    })(XMLHttpRequest.prototype.open);


})();