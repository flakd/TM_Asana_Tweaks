# TM_Asana_Tweaks
A TamperMonkey userscript (set of scripts) to add custom highlighting to Asana

************************************************************************
THIS IS VERY EARLY STAGE... please email me at flak@dinenno.com if you 
actually want to start using this now.

The ACTUAL Tampermonkey UserScript follows... but you must have the local 
files (which you'll find in this repo) placed into the correct folders/paths 
(which you can change/customize below/in your userscript).  Hopefully this 
same script below will be at UserScripts.com as well.
************************************************************************

    // ==UserScript==
    // @name         	Asana_Tweaks
    // @namespace    	https://*.asana.com
    // @version      	4.0
    // @description  	Enhance and Tweak asana web interface to make it more legible and focus on immediate tasks
    // @author       	flakdinenno

    // @include      	https://*.asana.com/*
    // @include      	http://*.asana.com/*

    // @match        	https://*.asana.com/*
    // @match        	http://*.asana.com/*

    // @require      	file:////myDev/js/logging/logger.js
    // @require      	file:////myDev/js/TM/TM_Asana_Tweaks/global_constants.js
    // @require      	file:////myDev/js/TM/TM_Asana_Tweaks/bullets.js
    // @require      	file:////myDev/js/TM/TM_Asana_Tweaks/body.js
    // @require      	file:////myDev/js/TM/TM_Asana_Tweaks/start.js
    // @require      	file:////myDev/js/TM/TM_Asana_Tweaks/main.js

    // @resource			IMPORTED_CSS file:////myDev/js/TM/TM_Asana_Tweaks/style.css
    // @grant      		GM_getResourceText
    // @grant      		GM_addStyle
    // ==/UserScript==

    (function() {
    // This is left empty b/c all the magic happens in the files above
    })();

