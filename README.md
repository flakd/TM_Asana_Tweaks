# TM_Asana_Tweaks
===
A TamperMonkey userscript (set of scripts) to add custom highlighting to Asana

1. Go to your browsers add-ons section and download the latest 
   TamperMonkey add-on/Extension
   
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

// @match        	https://*.asana.com/*
// @match        	http://*.asana.com/*

// @require       https://code.jquery.com/jquery-3.6.0.min.js#sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=
// @require       https://code.jquery.com/ui/1.13.0/jquery-ui.min.js#sha256-hlKLmzaRlE8SCJC1Kw8zoUbU8BxA+8kR3gseuKfMjxA=

// @require      	file:////myDev/js/logging/logger.js
// @require      	file:////myDev/js/TM/TM_Asana_Tweaks/global_constants.js
// @require      	file:////myDev/js/TM/TM_Asana_Tweaks/bullets.js
// @require      	file:////myDev/js/TM/TM_Asana_Tweaks/body.js
// @require      	file:////myDev/js/TM/TM_Asana_Tweaks/start.js
// @require      	file:////myDev/js/TM/TM_Asana_Tweaks/main.js

// @resource			IMPORTED_settings file:////myDev/js/TM/TM_Asana_Tweaks/settings.json
// @resource			IMPORTED_CSS1 file:////myDev/js/TM/TM_Asana_Tweaks/main.css
// @resource			IMPORTED_CSS2 file:////myDev/js/TM/TM_Asana_Tweaks/HL_Help.css
// @resource			IMPORTED_HTML1 file:////myDev/js/TM/TM_Asana_Tweaks/myTableOpenTag.html
// @grant      		GM_getResourceText
// @grant      		GM_addStyle
// ==/UserScript==

(function() {
// This is left empty b/c all the magic happens in the files above
})();

