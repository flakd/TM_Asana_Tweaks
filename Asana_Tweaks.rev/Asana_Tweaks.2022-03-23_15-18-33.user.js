// ==UserScript==
// @name         Asana_Tweaks
// @namespace    https://*.asana.com
// @version      3.0
// @description  Enhance and Tweak asana web interface to make it more legible and focus on immediate tasks
// @author       flakdinenno

// @include      https://*.asana.com/*
// @include      http://*.asana.com/*
// @match        https://*.asana.com/*
// @match        http://*.asana.com/*
// @grant        none
// ==/UserScript==

(function() {
		'use strict';

	 	/********************************
		*  GLOBAL VARs
		********************************/
		let LoggingOn;
		LoggingOn = false;
		//LoggingOn = true;

		let tasksSelector = '.SpreadsheetTaskName.SpreadsheetTaskName--editable.SpreadsheetGridTaskNameCell-taskName';
		let addElsToThisBarSelector = ".TopbarPageHeaderGlobalActions";
		let completedTaskClassName = "SpreadsheetGridTaskNameCell-taskName--completed";

		initAsanaEnhancer();
		window.numTimesRun = 0;
		window.highlightButton;



		function initAsanaEnhancer() {
			//alert("in initAsanaEnhancer");
			if (typeof window.numTimesRun == "undefined") window.numTimesRun = 0;

			//alert(window.numTimesRun++);
			if (LoggingOn) console.log('%cInit asana enhancer', 'color: #77a7ba');

			//alert("attempt [#" + window.numTimesRun + "] - just starting... check console");
			//taskListDetailsOnDblClick();
			//hideTopBar();

			hideUpgradeBtn();
			setKeyboardShortcuts();

			//let addElsToThisBarSelector = ".TopbarPageHeaderGlobalActions.AsanaPageTopbar-globalActions";
			
			let appendToElement = document.querySelector(addElsToThisBarSelector); //Get ONLY ONE element to add buttons to
			if (!appendToElement) {	// if this is NULL & therefore false, then we didn't find the `addElsToThisBarSelector`
				// this likely means that ASANA has changed the classname since we last ran this.
				//TopbarPageHeaderStructure ProjectPageHeader
				nullError(this, "missing '" + addElsToThisBarSelector + "' -- check HTML for this classname");
			}
			createHighlightButton(appendToElement);

			//createToolBarBtn(appendToElement, btnID, btnClass, btnText, btnClickHandler);
			//createToolBarBtn(appendToElement, "btnTBarVisToggle", "btnTBarVisToggle", "Toggle TBar", setAllToolBarsVis("hide") );
			//createToolBarBtn(appendToElement, "btnTBarVisHide", "btnTBarVisHide", "Hide TBar", setAllToolBarsVis("toggle") );
			create_btnToolBarToggle(appendToElement);
			create_btnToolBarHide(appendToElement);

			// Will execute myCallback every 0.5 seconds

			var intervalID = window.setInterval(conditionalHightlighting, 10000);
		}

		function otherVizTweaks(){
			let detailsPane = document.querySelector(".FullWidthPageStructureWithDetailsOverlay-detailsOverlay");
			detailsPane.style.width = "40%";

			let tasksListPane = document.querySelector(".FullWidthPageStructureWithDetailsOverlay-fullWidth");
			tasksListPane.style.width = "60%";
			tasksListPane.style.display = "contents";

			//let burgerMenu = document.querySelector(".AsanaPageTopbar--showingBreadcrumbs");
			let burgerMenu = document.querySelector(".AsanaBaseTopbar--showingBreadcrumbs");
			console.log("burgerMenu: %s",burgerMenu);
			burgerMenu.style.paddingBottom = "0px";

			//let topBarParent = document.querySelector(".AsanaPageTopbar.AsanaPageTopbar--withoutShadow");
			//let topBarParent = document.querySelector(".AsanaPageTopbar");
			//let topBarParent = document.querySelector(".AsanaBaseTopbar");
			let topBarParent = document.querySelector(".AsanaBaseTopbar.AsanaBaseTopbar--withoutShadow");
			console.log("topBarParent: %s",topBarParent);
			topBarParent.style.minHeight = "0px";

			//	find the MAIN TOP-LEFT MENU/TOOLBAR with "Overview", "List", "Board"
			//let topBarChild_leftItems = document.querySelector(".TopbarPageHeaderStructure.ProjectPageHeader");
			let topBarChild_leftItems = document.querySelector(".TopbarPageHeaderStructure");
			topBarChild_leftItems.style.display = "none";

			//	find all SECTION HEADINGS
			let sectionsToFadeOut = document.querySelectorAll(".PotColumnName-nameButton");
			//	now loop through all SECTION HEADINGS
			for (let sectIdx=0; sectIdx < sectionsToFadeOut.length; sectIdx++){
				let section = sectionsToFadeOut[sectIdx];
				//	not turn the TEXT TO GRAY **only if** the TEXT CONTAINS ".." (two successive periods)
				if (section &&
						section.innerText &&
						section.innerText.contains("..")
					 ){
					section.style.color = "gray";
				}
			}
			var sheet = document.createElement('style')
			sheet.innerHTML =
				//".someClass {color: red;}";
				//".SpreadsheetRow--withShadedBackground < div { background-color: yellow;} " +
				//".DraggableSpreadsheetTaskRow--withShadedBackground < div { background-color: yellow;} " +
				".SpreadsheetRow--withShadedBackground.DraggableSpreadsheetTaskRow--withShadedBackground > div > div { background-color: #004400;} " +
				//".SpreadsheetTaskName SpreadsheetTaskName--editable SpreadsheetGridTaskNameCell-taskName
				".SpreadsheetTaskName--childFocused { background-color: #007700; color: white; } " +
				"::selection {" + "\n"	+
				"		background: #ff5500;" + "\n"	+
				"}"
				//".SpreadsheetTaskName--childFocused { caret-shape: block; } " // this CSS unsupported in Chrome as of 2022-01-25

			;
			document.body.appendChild(sheet);
		}

		function otherVizTweaks2(){
			let detailsPaneShrinkItems = document.querySelectorAll(".LabeledRowStructure-label");
			for(let idx=0; idx<detailsPaneShrinkItems.length; idx++){
				detailsPaneShrinkItems[idx].style.fontSize = "xx-small";
			}
			let t = document.querySelector(".DueDateTokenButton-label");
			t.style.fontSize = "xx-small";
		}

		function setHeights(height,element){
			console.log('inside setHeights()');

			if (!element) { nullError(this, "element missing");return;}
			if (!element.style) { console.log("this object has no STYLE property - not HTML?"); return;}

			// OTHERWISE...
			if (!height) { nullError(this, "height value missing");return;}
			if (!height.contains("px")) {
				console.log("invalid height - must incluse 'px' in string => string supplied was: '%s'", height);
				return;
			}
			element.style.height = height * 2;
			element.style.paddingTop = "20px";
		}

		function setAllToolBarsVis(visibility){ //visibility = show, hide, toggle
			let toolBarsToHideSelectors = [	//each of these selectors are classes WHICH COULD return MULTIPLE elements

				".PageToolbarStructure--withoutBottomBorder",
				".PageToolbarStructure",
				".ProjectSpreadsheetGridPageToolbar",

				".PageToolbarStructure.ProjectSpreadsheetGridPageToolbar",
				".PageToolbarStructure--withoutBottomBorder.PageToolbarStructure.ProjectSpreadsheetGridPageToolbar",

				".PageToolbarStructure--withSeparatorDots",
				".PageToolbarStructure--withSeparatorDots.PageToolbarStructure--withoutBottomBorder",
				".PageToolbarStructure--withSeparatorDots.PageToolbarStructure--withoutBottomBorder.PageToolbarStructure",
				".PageToolbarStructure--withSeparatorDots.PageToolbarStructure--withoutBottomBorder.PageToolbarStructure.ProjectSpreadsheetGridPageToolbar",

				//SpreadsheetGridHeaderStructure--isCompactMode SpreadsheetGridHeaderStructure
				".SpreadsheetGridHeaderStructure",

				".ProjectSpreadsheetAddTaskAndAggregationRow-stickyCell.ProjectSpreadsheetAddTaskAndAggregationRow-stickyCell--compact",
				".ProjectSpreadsheetAddTaskAndAggregationRow-stickyCell--compact",
				".ProjectSpreadsheetAddTaskAndAggregationRow-stickyCell",
				".SpreadsheetRow.SpreadsheetRow--enabled.ProjectSpreadsheetAddTaskAndAggregationRow.ProjectSpreadsheetAddTaskAndAggregationRow--compact.ProjectSpreadsheetAddTaskAndAggregationRow-hasSubtaskToggle",
				".ProjectSpreadsheetAddTaskAndAggregationRow"
			];
			selectAndSetProps(toolBarsToHideSelectors,"visibility",visibility);

			let heightElementSelectors = [	//each of these selectors are classes WHICH COULD return MULTIPLE elements
				//"TaskGroupHeader-placeholderAndHeaderContainer"
				///"#asana_main_page > div.ProjectPage > div.ProjectPage-list > div > div > div > div.FullWidthPageStructureWithDetailsOverlay-mainContent > div.SpreadsheetGridScroller-container > div.Scrollable--withCompositingLayer.Scrollable.Scrollable--vertical.SpreadsheetGridScroller-verticalScroller > div > div.is-compactMode.SpreadsheetGridContents--hasComplete.SpreadsheetGridContents.SpreadsheetPotGridContents > div:nth-child(1) > div > div > div > div:nth-child(1) > div > div.DropTargetTaskGroupHeader > div > div"
				"div.DropTargetTaskGroupHeader > div > div",
				"div.PotColumnName"
			];
			selectAndSetProps(heightElementSelectors,"height","35px");
			//setHeights("35px");
			otherVizTweaks();
			//otherVizTweaks2();
		}

		function selectAndSetProps(selectors,property,value){
			let elements;
			let element;

			for (let selIdx=0; selIdx<selectors.length; selIdx++){
				elements = document.querySelectorAll(selectors[selIdx]);
				console.log("\n");
				if (!elements || !elements.length || elements.length==0) {
					nullError(this, "Error:  CSS selector => Found $s instances of CSS selector: '$s'", elements.length, selectors[selIdx]);
					return;
				} else {
					console.log("OK:  CSS selector => Found $s instances of CSS selector: '$s'.  Here's a list of those objects/elements:", elements.length, selectors[selIdx]);
					console.log("========================================================")
					for (let tbIdx=0; tbIdx<elements.length; tbIdx++){
						element = elements[tbIdx];
						if (!property) return nullError(this);
						if (property==="visibility") setToolBarVis(value,element);
						if (property==="height") setHeights(value,element);
						console.log("set PROPERTY: %s, to VALUE: %s  => for the following object/element:", property, value);
						console.log(element);
					}
				}
			}
		}

		function setToolBarVis(visibility, toolBar){ //visibility = show, hide, toggle
			console.log('inside setToolBarVis()');

			if (visibility === undefined) {
				visibility = "toggle";
			}


			if (toolBar) {
				console.log("TOOLBAR: '" + toolBar + "' has been found/valid element on the page");
				if (toolBar.style.display !== 'none') {
					window.toolBar_style_display = toolBar.style.display;
				}


				if (visibility === "hide" && toolBar.style.display !== 'none') {
					window.toolBar_style_display = toolBar.style.display;
					toolBar.style.display = "none";
					console.log("TOOLBAR... ");
					console.log(toolBar);
					console.log("... is hidden");
				}
				else if (visibility === "show" && toolBar.style.display === 'none') {
					toolBar.style.display = window.toolBar_style_display;
					console.log("TOOLBAR... ");
					console.log(toolBar);
					console.log("... is shown");
				}

				else if (visibility === "toggle") {
					console.log("TOOLBAR... ");
					console.log(toolBar);
					let hideOrShow = "";
					if (toolBar.style.display !== 'none') {
						toolBar.style.display = 'none';
						hideOrShow = "hide";
					} else {
						toolBar.style.display = window.toolBar_style_display;
						hideOrShow = "show";
					}
					console.log("... TOGGLED to: '" + hideOrShow + "'");
				}

			} else {
				console.log("TOOLBAR... ");
				console.log(toolBar);
				console.log("... is NULL, maybe this is running before page loads");
			}
			console.log('leaving setToolBarVis()');
		}

    function hideTopBar() {
			let topBar = document.getElementById('topbar');

			if(topBar && topBar.style.display !== 'none') {
				topBar.style.display = 'none';
				if (LoggingOn) console.log('topbar hidden');
			}
    }

    function hideUpgradeBtn(){
        let upgradeBtn = document.querySelector('[class*="UpgradeButton"]');
        if(upgradeBtn && upgradeBtn.style.display !== 'none'){
            upgradeBtn.style.display = 'none';
            if (LoggingOn) console.log('upgrade button hidden');
        }
    }

		function setKeyboardShortcuts(){
			setShortcut_StyleCheatSheet();
		}

		function setShortcut_StyleCheatSheet(){
			document.onkeydown = detectKeyPress;
			//document.onkeyup = detectKeyPress;
		}

		function detectKeyPress(evt) {
			evt = evt || window.event;
			//if (evt.ctrlKey && evt.keyCode == 90) {
			//alert(evt.keyCode);
			//if (evt.metakey && evt.keyCode == 191) {
			if (evt.ctrlKey) { //alert("ctrl pressed");
				console.log("ctrl pressed");
			}
			if (evt.metaKey) { //alert("meta pressed");
				console.log("meta pressed");
			}
	    if (evt.keyCode == 191 && evt.ctrlKey) {
				//if (evt.keyCode == 17 && evt.keyCode == 191) {
				//	alert("Ctrl-Z");
				//	alert("Ctrl-/");
				//}
				let alertTxt =
					" FUP   bg   turquoise " + "<br>\n" +
					" {*    bg   red       " +"<br>\n" +
					" {+    bg   orange    " +"<br>\n" +
					" {^    bg   DeepPink  " +"<br>\n" +

					" ##    bg   blue      " +"<br>\n" +
					" ##    txt  white     " +"<br>\n" +

					" √     bg   purple    " +"<br>\n" +
					" √     txt  white	   " +"<br>\n" +

					" √√    bg   white     " +"<br>\n" +
					" √√    txt  purple    " +"<br>\n" +

					" {~    bg   beige     " +"<br>\n" +
					" {~    txt  black     " +"<br>\n" +

					" **    bg   white     " +"<br>\n" +
					" **    txt  black     " +"<br>\n" +

					" ~~    bg   yellow    " +"<br>\n" +
					" ~~    txt  black     " +"<br>\n" +

					" <>    bg   brown     " +"<br>\n" +
					" <>    txt  yellow    " +"<br>\n" +

					" []    FV   small-caps" +"<br>\n" +

					" {}    FW   900"
				;
				let w = window.open('', "", "width=600, height=400, scrollbars=no");
 				w.document.body.innerHTML = alertTxt;
			}//	if (evt.keyCode == 191 && evt.ctrlKey) {
		}

		function getBullets(){
        return ([
					[">>>>","backgroundColor"	,	"#ffeeff"		],
					[">>>>",	"color"						,	"black"				],

					[">>>",	"fontStyle"				,	"italic"			],
					[">>>",	"textDecoration"	,	"underline overline"		],
					[">>>",	"fontWeight"			,	"900"					],
					[">>>",	"textShadow"			,	"2px 2px #FF0000"	],


					//[">>",	"fontStyle"					,	"italic"		],
					["[>",	"textDecoration"		,	"underline overline"		],
					["[>",	"backgroundColor"		,	"#AAAAAA"		],
					["[>",	"color"							,	"black"			],

					["FUP", "backgroundColor"	,	"turquoise"		],
					["{*", 	"backgroundColor"	,	"red"					],
					["{+", 	"backgroundColor"	,	"orange"			],
					["{^", 	"backgroundColor"	,	"DeepPink"		],

					["##", 	"backgroundColor"	, "blue"				],
					["##", 	"color"						,	"white"				],

					["√",		"backgroundColor"	,	"purple"			],
					["√",		"color"						,	"white"				],

					["√√", 	"backgroundColor"	,	"white"				],
					["√√", 	"color"						,	"purple"			],

					["{~", 	"backgroundColor"	,	"beige"				],
					["{~", 	"color"						,	"black"				],

					["**", 	"backgroundColor"	,	"white"				],
					["**", 	"color"						,	"black"				],

					["~~", 	"backgroundColor"	, "yellow"			],
					["~~", 	"color"						,	"black"				],

					["<>", 	"backgroundColor"	, "brown"				],
					["<>", 	"color"						,	"yellow"			],

					["[]", 	"fontVariant"			,	"small-caps"	],

					["{}", 	"fontWeight"			,	"900"					]

				])
		}

    function conditionalHightlighting(){
				const bullets = getBullets();

				if (LoggingOn) console.log("inside conditionalHightlighting()");

        //let taskListItems = document.querySelectorAll('.SpreadsheetTaskName');
        let taskListItems = document.querySelectorAll(tasksSelector);
        let tli = taskListItems;

			 	// CHECK that we have an ACTUAL LIST of tasks/items
				// IF we don't then ERROR TO CONSOLE & RETURN from this function
        if (!tli || !tli[0]) { nullError(this, 37); return;}

				console.log("FOUND an ACTUAL List of %s Tasks by CLASS: '%s'", tli.length, tasksSelector)

				/*******************************************
				//  THE FOLLOWING DONE FOR EVERY TASK LINE
				*******************************************/
        for (let i = 0; i < tli.length; i++) {	// FOR "Loop through all Task Items"

					// FOR EVERY Item/Task, PRINT it's index to the CONSOLE (if logging set in INIT())
					if (LoggingOn) console.log("TASK ITEM i=",i);

					// DBL-CHECK to see if there an item at this index in the tasklist,
					// otherwise ERROR TO CONSOLE & BREAK OUT OF ENTIRE loop ?????  -- or just CONTINUE ?????
					//if ( !tli[i] ) { nullError(this, 41); return; }
					if ( !tli[i] ) { nullError(this, 41); continue; }

					// SO we must have an item, so set var 'task' to that item
					let task = tli[i];

					//check that the task has a description/text, otherwise error & continue to next in loop
					if ( !task.innerHTML || !task.textContent) { nullError(this, 42);return; }

					// OK, SO, we must have actual text, so set var 'content' to that text
					let content = task.textContent;
					/*****************************************
					//  NOW that we've isolated/captured our ACTUAL
					//	Task TEXT, let's examine it more closely
					************************************************/

					// BEFORE we EVEN CHECK for bullets, let's see
					// if this is already completed -- if so, we
					// are going to set SPECIAL COMPLETED styling
					if ( task.classList.contains(completedTaskClassName) ){	//IF "Completed Task"

						if (LoggingOn) console.log("BUT This Task is COMPLETED=>'%c', CLASS contains '%s', FULL CLASSLIST='%c'", content, completedTaskClassName, task.classList);
						//  Task IS COMPLETED, so set special styling REGARDLESS
						//  of bullets, and CONTINUE(skip) to NEXT Task Item
						task.style.backgroundColor = "#338833";
						task.style.color = "#999999";
						// STOP, don't set ANY MORE STYLING... a COMPLETED
						// Task Styling OVERRIDES all others so, JUMP out
						// of THIS ITERATION to the NEXT TASK in the loop
						continue;
					} // ENDIF "Completed Task"


					/*******************************************************
					// IF we've gotten THIS FAR, then we have
					// a VALID TASK, that is NOT COMPLETED
					*******************************************************/

					//let's check this task item to see if it has ANY of the bullets -- this will SET the *LAST* BULLET it finds!!!
					let numBullets = 0;

					for (let i = 0; i < bullets.length; i++) {	//	FOR "Loop Through Bullets"
						let bullet = bullets[i][0];
						let styleName = bullets[i][1];
						let styleValue = bullets[i][2];

						//we found a(nother) bullet, so add it's styling
						if ( content.includes(bullet) ){	// IF "Found Bullet"
							numBullets = numBullets + 1;
							if (LoggingOn) console.log("Bullet Found:  Task Content => " + content);
							if (LoggingOn) console.log("bullet => " + bullet);
							if (LoggingOn) console.log("styleName => " + styleName);
							if (LoggingOn) console.log("styleValue => " + styleValue);

							task.style[styleName] = styleValue;
						}	//ENDIF "Found Bullet"

					}//ENDFOR "Loop Through Bullets"

					// NO bullets FOUND, and NOT COMPLETED, so clear all formatting...
					// BECAUSE we want to catch RECENT CHANGES where bullets were
					// DELETED/REMOVED by user from the task, otherwise OLD BULLET
					// formatting will linger
					if (numBullets == 0) { // IF "We never found bullets" (numBullets COUNTER still ZERO)
						//task.style.backgroundColor = "";
						//task.style.color = "";
						task.style = null;
					}//ENDIF "We never found bullets"

				}// ENDFOR "Loop through all Task Items"

        if (LoggingOn) console.log('show conditionalHightlighting() is COMPLETED & ACTIVE');
    }


    function taskListDetailsOnDblClick() { //open task list details on double click
        let taskListItems = document.querySelectorAll('.TaskList .SubtaskTaskRow-taskName');

        for(let i = 0; i < taskListItems.length; i++) {
            taskListItems[i].addEventListener('dblclick', openTaskDetails);
        }

        if (LoggingOn) console.log('show tasklist details on double click is active');
    }

    function openTaskDetails(e) { //open task list details
        e.target.parentNode.parentNode.parentNode.querySelector('.SubtaskTaskRow-detailsButton').click();
    }

    function getCallerName(func){
        if (!func) return "anonymous";
        let caller = func.caller;
        if (!caller) return "anonymous";
        caller = caller.toString();
        if (!caller.trim().startsWith("function")) return "anonymous";
        return caller.substring(0, caller.indexOf("(")).replace("function","");
    }

	  function unexpectedParameterValueError(errMsg){
			console.log("unexpectedParameterValueError: " + errMsg);
		}
    function nullError(caller, errMsg){
        if (LoggingOn) console.log('---------------');
        if (LoggingOn) console.log("null ERROR:")
        if (errMsg) {
					if (LoggingOn) console.log (errMsg);
				}
        if (LoggingOn) console.log('---------------');
        if (LoggingOn) console.log(getCallerName(caller));
        if (LoggingOn) console.log('===============');
    }



		function create_btnToolBarToggle(addToElement){
			let btn = document.createElement("button");

			btn.class = "btnToolBarToggle";
			btn.classList.add('AbstractThemeableRectangularButton');
			btn.classList.add('UpgradeButton');
			btn.style.margin = "0px 0px 0px 12px";
			btn.style.padding = "0px 0px 0px 0px";
			//btn.classList.add('TopbarContingentUpgradeButton-button');

			addToElement.appendChild(btn);
			if (LoggingOn) console.log("btnToolBarToggle added to element:");
			if (LoggingOn) console.log(addToElement);


			//store in global object in case I need it globally somewhere
			window.ToolBarToggleButton = btn;


			//if (LoggingOn) console.log("window.highlightButton => " + window.highlightButton);

			// set to HIDE to start, since bars are visible when page loads initially
			window.ToolBarToggleButton.innerText = "Toggle TBars";
			window.ToolBarToggleButton.addEventListener('click', toggleAllToolBars);
			if (LoggingOn) console.log('btnToolBarToggle click event set to toggleAllToolBars()');
    }

		function create_btnToolBarHide(addToElement){
			let btn = document.createElement("button");

			btn.class = "btnToolBarHide";
			btn.classList.add('AbstractThemeableRectangularButton');
			btn.classList.add('UpgradeButton');
			btn.style.margin = "0px 0px 0px 12px";
			btn.style.padding = "0px 0px 0px 0px";
			//btn.classList.add('TopbarContingentUpgradeButton-button');

			addToElement.appendChild(btn);
			if (LoggingOn) console.log("btnToolBarHide added to element:");
			if (LoggingOn) console.log(addToElement);


			//store in global object in case I need it globally somewhere
			window.ToolBarToggleButton = btn;


			//if (LoggingOn) console.log("window.highlightButton => " + window.highlightButton);

			// set to HIDE to start, since bars are visible when page loads initially
			window.ToolBarToggleButton.innerText = "Hide TBars";
			window.ToolBarToggleButton.addEventListener('click', hideAllToolBars);
			if (LoggingOn) console.log('btnToolBarHide click event set to hideAllToolBars()');
		}

		function createToolBarBtn(appendToElement, btnID, btnClass, btnText, btnClickHandler){
			let btn = document.createElement("button");

			btn.class = btnClass;
			btn.classList.add('AbstractThemeableRectangularButton');
			btn.classList.add('UpgradeButton');
			btn.style.margin = "0px 0px 0px 12px";
			btn.style.padding = "0px 0px 0px 0px";
			//btn.classList.add('TopbarContingentUpgradeButton-button');

			appendToElement.appendChild(btn);
			if (LoggingOn) console.log("btnID: %s, btnClass: %s added to element:");
			if (LoggingOn) console.log(appendToElement);

			//store in global object in case I need it globally somewhere
			window.ToolBarToggleButton = btn;

			//if (LoggingOn) console.log("window.highlightButton => " + window.highlightButton);
			window.ToolBarToggleButton.innerText = btnText;
			window.ToolBarToggleButton.addEventListener('click', btnClickHandler);
			if (LoggingOn) console.log('%s click event set to %s', btnID, btnClickHandler.name.toString());
    }

		function toggleAllToolBars(){
			setAllToolBarsVis("toggle");
		}
		function hideAllToolBars(){
			setAllToolBarsVis("hide");
		}


    function createHighlightButton(addToElement){
        let btn = document.createElement("button");

        btn.class = "btnHighlight";
        btn.classList.add('AbstractThemeableRectangularButton');
        btn.classList.add('UpgradeButton');
        btn.style.margin = "0px 0px 0px 12px";
        btn.style.padding = "0px 0px 0px 0px";
        //btn.classList.add('TopbarContingentUpgradeButton-button');
				if (!addToElement) {
					nullError(this, "missing 'addToElement");
					return;
				}

				addToElement.appendChild(btn);
			  if (LoggingOn) console.log("HighlightButton added to element:");
			  if (LoggingOn) console.log(addToElement);


				//store in global object in case I need it globally somewhere
        window.highlightButton = btn;


        //if (LoggingOn) console.log("window.highlightButton => " + window.highlightButton);
        window.highlightButton.innerText = "HIGHLIGHT";
        window.highlightButton.addEventListener('click', conditionalHightlighting);
        if (LoggingOn) console.log('HighlightButton click event set to conditionalHighlighting()');
    }


		// -----------------------------------------------------------------
		//   background aSync functions: wait for entire page to load, etc.
		// -----------------------------------------------------------------
		function getUrlParams(url) {
        let params = {};
        url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
            params[key] = value;
        });

        return params;
    }
    function waitForElementToDisplay(selector, ms) {
        if(document.querySelector(selector)!=null) {
            initAsanaEnhancer();
            //createHighlightButton();
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