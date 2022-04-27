//window.main = function(){
  function init() {
    logger(2).top();
    //==========================================================

    if (typeof window.numTimesScriptRun === undefined) window.numTimesScriptRun = 0;

    logger(3).w("numTimeRun = %s", window.numTimesScriptRun++);


    logger(2).next("doPermUIChanges()");
    doPermUIChanges();

    logger(2).next("setupDynamicUI()");
    setupDynamicUI();
    setuphelpDiv();

    addEditorListeners();

    // Will execute myCallback every 10 seconds
    logger(2).next("window.setInterval(conditionalHighlighting, 10000);");
    var intervalID = window.setInterval(conditionalHighlighting, 10000);


    //---------------------------------------------------------
    logger(2).btm();
  }
 
  function addEditorListeners(){
    
  }

  function doPermUIChanges() {
    logger(2).top();
    //==========================================================
    logger(2).next("permUIChanges.hideUpgradeBtn()");
    permUIChanges.hideUpgradeBtn();

    logger(2).next("permUIChanges.setUIPanesWidths()");
    permUIChanges.setUIPanesWidths();

    logger(2).next("permUIChanges.setStyleHelp()");
    permUIChanges.setStyleHelp();
    //---------------------------------------------------------
    logger(2).btm();
  }

  function setupDynamicUI() {
    logger(2).top();
    //==========================================================

    logger(2).next("const addEl = dynamicUI.setAppendToElement()");
    const addEl = dynamicUI.setAppendToElement();
    //createToolBarBtn(addEl, btnID, btnClass, btnText, btnClickHandler);
    //createToolBarBtn(addEl, "btnTBarVisHighlight", "btnTBarVisHighlight", "Toggle TBars", setAllToolBarsVis("highlight") );
    //createToolBarBtn(addEl, "btnTBarVisToggle", "btnTBarVisToggle", "Toggle TBars", setAllToolBarsVis("toggle") );
    //createToolBarBtn(addEl, "btnTBarVisHide", "btnTBarVisHide", "Hide TBars", setAllToolBarsVis("hide") );
    logger(2).next("dynamicUI.createToolBarBtn_Highlight()");
    dynamicUI.createToolBarBtn_Highlight(addEl);

    logger(2).next("dynamicUI.createToolBarBtn_ToggleBars()");
    dynamicUI.createToolBarBtn_ToggleBars(addEl);

    logger(2).next("dynamicUI.createToolBarBtn_HideBars()");
    dynamicUI.createToolBarBtn_HideBars(addEl);

    //---------------------------------------------------------
    logger(2).btm();
  }




  function setAllToolBarsUI(visibility) { //visibility = show, hide, toggle

    selectAndSetProps(uiElsToHide, "visibility", visibility);
    selectAndSetProps(uiElsToShrink, "height", "35px");
    
    function setUIPadding() {
      //let burgerMenu = document.querySelector(".AsanaPageTopbar--showingBreadcrumbs");
      logger(4).w("burgerMenu: %s", burgerMenu);
      burgerMenu.style.paddingBottom = "0px";
    }
    function setUITopBarHeight() {
      //let topBarParent = document.querySelector(".AsanaPageTopbar.AsanaPageTopbar--withoutShadow");
      //let topBarParent = document.querySelector(".AsanaPageTopbar");
      //let topBarParent = document.querySelector(".AsanaBaseTopbar");
      let topBarParent = document.querySelector(".AsanaBaseTopbar.AsanaBaseTopbar--withoutShadow");
      console.log("topBarParent: %s", topBarParent);
      topBarParent.style.minHeight = "0px";
    }
    function setUITopBarLeftHide() {
      //	find the MAIN TOP-LEFT MENU/TOOLBAR with "Overview", "List", "Board"
      //let topBarChild_leftItems = document.querySelector(".TopbarPageHeaderStructure.ProjectPageHeader");
      let topBarChild_leftItems = document.querySelector(".TopbarPageHeaderStructure");
      topBarChild_leftItems.style.display = "none";
    }
    function setUISectionsGrayOut() {
      //	find all SECTION HEADINGS
      let sectionsToFadeOut = document.querySelectorAll(".PotColumnName-nameButton");
      //	now loop through all SECTION HEADINGS
      for (let sectIdx = 0; sectIdx < sectionsToFadeOut.length; sectIdx++) {
        let section = sectionsToFadeOut[sectIdx];
        //	not turn the TEXT TO GRAY **only if** the TEXT CONTAINS ".." (two successive periods)
        if (section &&
          section.innerText &&
          section.innerText.contains("..")
        ) {
          section.style.color = "gray";
        }
      }
    }
    setUIPadding();
    setUITopBarHeight();
    setUITopBarLeftHide();
    setUISectionsGrayOut();
    //shrinkDetailsPane();	//NOT DONE, very complicated - not called for now
  }
  function selectAndSetProps(selectors, property, value) {
    function setHeights(height, element) {
      console.log('inside setHeights()');

      if (!element) { errHelpers.nullError(this, "element missing"); return; }
      if (!element.style) { console.log("this object has no STYLE property - not HTML?"); return; }

      // OTHERWISE...
      if (!height) { errHelpers.nullError(this, "height value missing"); return; }
      if (!height.contains("px")) {
        console.log("invalid height - must incluse 'px' in string => string supplied was: '%s'", height);
        return;
      }
      element.style.height = height * 2;
      element.style.paddingTop = "20px";
    }
    function setToolBarVis(visibility, toolBar) { //visibility = show, hide, toggle
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
    let elements;
    let element;

    for (let selIdx = 0; selIdx < selectors.length; selIdx++) {
      elements = document.querySelectorAll(selectors[selIdx]);
      console.log("\n");
      if (!elements || !elements.length || elements.length == 0) {
        errHelpers.nullError(this, "Error:  CSS selector => Found $s instances of CSS selector: '$s'",
          elements.length, selectors[selIdx]
        );
        return;
      } else {
        let msg = "OK: Found $s of CSS selector('$s'). Here's a list of elements found:"
        console.log(msg, elements.length, selectors[selIdx]);
        console.log("========================================================")
        for (let tbIdx = 0; tbIdx < elements.length; tbIdx++) {
          element = elements[tbIdx];
          if (!property) return errHelpers.nullError(this);
          if (property === "visibility") setToolBarVis(value, element);
          if (property === "height") setHeights(value, element);
          console.log("set PROPERTY: %s, to VALUE: %s  => for the following element:", property, value);
          console.log(element);
        }
      }
    }
  }



  function checkForBullets(content, task) {
    const HLArray = getHLCodesAsArray();
    let numBulletsInArray = HLArray.length;
    let numBulletsFound = 0;
    
    for (let bIdx = 0; bIdx < numBulletsInArray; bIdx++) {
      let bullet = HLArray[bIdx][0];
      let styles = HLArray[bIdx][1];
      for (let sIdx = 0; sIdx < styles.length; sIdx++) {
        let style = styles[sIdx];
        let styleName = style[0];
        let styleValue = style[1];

        //we found a(nother) bullet, so add it's styling
        if (content.includes(bullet)) { // IF "Found Bullet"
          numBulletsFound++;
          logger(41).w(`BULLET '${bullet}' =>`, `${styleName}: ${styleValue}`, "ClassList: ", task.classList);
          task.style[styleName] = styleValue;
        } //ENDIF "Found Bullet"
      }

    } //ENDFOR "Loop Through Bullets"
    return numBulletsFound;
  }
  function conditionalHighlighting() {
    logger(2).top();
    window.numTimesHighlightRun++;

    //const bullets = getHLCodesAsArray();

    //  I changed the following 
    //      FROM:
    //        window.tasksSelector = ".SpreadsheetTaskName.SpreadsheetTaskName--editable.SpreadsheetGridTaskNameCell-taskName";
    //      TO:
    //        window.tasksSelector = ".SpreadsheetCell.SpreadsheetGridTaskNameCell.SpreadsheetTaskRow-nameCell";
    let taskListItems = document.querySelectorAll(window.tasks_Selector);
    let tli = taskListItems;

    // CHECK that we have an ACTUAL LIST of tasks/items
    // IF we don't then ERROR TO CONSOLE & RETURN from this function
    if (!tli || !tli[0]) { errHelpers.nullError(this, 37); return; }

    console.log("FOUND an ACTUAL List of %s Tasks by CLASS: '%s'", tli.length, window.tasks_Selector)

    /*******************************************
      //  THE FOLLOWING DONE FOR EVERY TASK LINE
      *******************************************/
    for (let i = 0; i < tli.length; i++) {	// FOR "Loop through all Task Items"

      // DBL-CHECK to see if there an item at this index in the tasklist,
      // otherwise ERROR TO CONSOLE & BREAK OUT OF ENTIRE loop ?????  -- or just CONTINUE ?????
      if (!tli[i]) { errHelpers.nullError(this, 41); continue; }

      // SO we must have an item, so set var 'task' to that item
      let task = tli[i];
      if (typeof task.numTimesHighlightRun === 'undefined') {
        task.numTimesHighlightRun = 1;
      } else {
        task.numTimesHighlightRun++;
      }

      //check that the task has a description/text, otherwise error & continue to next in loop
      if (!task.innerHTML || !task.textContent) { errHelpers.nullError(this, 42); return; }

      // OK, SO, we must have actual text, so set var 'content' to that text
      let content = task.textContent;
      /*****************************************
        //  NOW that we've isolated/captured our ACTUAL
        //	Task TEXT, let's examine it more closely
        ************************************************/
      let innerTask = task.querySelector(tasksSubLabel_Selector);
      let innerTaskDiv = task.querySelector(tasksSubLabelDiv_Selector);
      let innerTaskTA = innerTask.querySelector("textarea");
      let innerTaskDetailsClick = task.querySelector(tasksClickDetails_Selector);

      function highlightCheckOnInput(event) {
        //let's check this task item to see if it has ANY of the bullets -- this will SET the *LAST* BULLET it finds!!!
        let numBullets = 0;

        numBullets = checkForBullets(innerTaskTA.value, task); //ENDFOR "Loop Through Bullets"
        console.log("I changed:  numbullets = %s", numBullets);
        // NO bullets FOUND, and NOT COMPLETED, so clear all formatting...
        // BECAUSE we want to catch RECENT CHANGES where bullets were
        // DELETED/REMOVED by user from the task, otherwise OLD BULLET
        // formatting will linger
        if (numBullets == 0) { // IF "We never found bullets" (numBullets COUNTER still ZERO)
          //task.style.backgroundColor = "";
          //task.style.color = "";
          task.style = null;
        }      
      }
      function hideDetailsPaneOnClick(event) {
        console.log(`task.numTimesHighlightRun = ${task.numTimesHighlightRun}`);
        let detailsPane = document.querySelector(window.detailsPane_Selector);
        console.log(detailsPane.classList);
        if (detailsPane.classList.contains(window.detailsPane_visibleClass)) {
          detailsPane.classList.remove(window.detailsPane_visibleClass);
          detailsPane.style.display = "none";
        } else {
          detailsPane.classList.add(window.detailsPane_visibleClass);
          detailsPane.style.display = "block";
        }
      }


      /******************************************************
        /*    BEFORE we EVEN CHECK for bullets, let's see
        /*    if this is already completed -- if so, we
        /*    are going to set SPECIAL COMPLETED styling
        ******************************************************/

      if (task.classList.contains(completedTaskClassName)) {	//IF "Completed Task"

        if (isLoggingOn) console.log("BUT This Task is COMPLETED=>'%c', CLASS contains '%s', FULL CLASSLIST='%c'", content, completedTaskClassName, task.classList);
        //  Task IS COMPLETED, so set special styling REGARDLESS
        //  of bullets, and CONTINUE(skip) to NEXT Task Item
        task.style.backgroundColor = completedTaskBgColor;
        task.style.color = completedTaskTextColor;
        // STOP, don't set ANY MORE STYLING... a COMPLETED
        // Task Styling OVERRIDES all others so, JUMP out
        // of THIS ITERATION to the NEXT TASK in the loop
        continue;
      } // ENDIF "Completed Task"
      
      if (task.numTimesHighlightRun <= 1) {
        //set oninput of every task I find -- I am running this...
        //  ...(conditionalHighlighting()) every 10 sec, so any new 
        //  tasks that created should get this as well
        innerTaskTA.oninput = highlightCheckOnInput;
        //innerTaskDetailsClick.addEventListener('click', hideDetailsPaneOnClick);
      }

      //let's check this task item to see if it has ANY of the bullets -- this will SET the *LAST* BULLET it finds!!!
      let numBullets = 0;
      numBullets = checkForBullets(content, task);//ENDFOR "Loop Through Bullets"

      /****
        // NO bullets FOUND, and NOT COMPLETED, so clear all formatting...
        // BECAUSE we want to catch RECENT CHANGES where bullets were
        // DELETED/REMOVED by user from the task, otherwise OLD BULLET
        // formatting will linger
        *******/
      if (numBullets == 0) { // IF "We never found bullets" (numBullets COUNTER still ZERO)
        //task.style.backgroundColor = "";
        //task.style.color = "";
        task.style = null;
      }//ENDIF "We never found bullets"

      /*******************************************************
        // IF we've gotten THIS FAR, then we have
        // a VALID TASK, that is NOT COMPLETED
        *******************************************************/
      logger(3).w(`TASK: `, `${i}`, `  CONTENT: `, `${innerTaskTA.innerHTML}`);
    }// ENDFOR "Loop through all Task Items"

    logger(2).btm();
  }

  let permUIChanges = {
    hideUpgradeBtn: function hideUpgradeBtn() {
      let upgradeBtn = document.querySelector('[class*="UpgradeButton"]');
      if (upgradeBtn && upgradeBtn.style.display !== 'none') {
        upgradeBtn.style.display = 'none';
        if (isLoggingOn) console.log('upgrade button hidden');
      }
    },
    setStyleHelp: function setup_HelpCheatSheet() {
      //document.onkeydown = detectKeyPress_CTRL_KEY(191); // FORWARD SLASH key

      function openHelp() {
        let activeElement = document.activeElement;
        let mainWin = window;
        window.name = "mainWin";

        
        //let w = window.open("", "HelpWindow", settings.styleHelp.winSettings);
        //w.document.body.innerHTML = getHTML();
        //var styleSheet = w.document.createElement("style");
        //w.document.head.appendChild(styleSheet);
        
        if (window.helpDiv) {
          if (window.helpDiv.style) {
            if (window.helpDiv.style.display == "none") {
              window.helpDiv.style.display = "block";
            } else {
              window.helpDiv.style.display = "none";
            }
          }
        }
        
        //activeElement.focus();
        //let parent = window.open('',"mainWin");
        //parent.focus();
        //mainWin.focus();
      }


      let openHelpOnKeyPress = openHelp;
      let getStyleHelpHTML = getHTML;
      return ({
        openHelpOnKeyPress,
        getHTML
      })

    },//END FUNCTION setUpHelpCheatSheet
    setUIPanesWidths: function setUIPanesWidths() {
      let detailsPane = document.querySelector(".FullWidthPageStructureWithDetailsOverlay-detailsOverlay");
      detailsPane.style.width = "40%";

      let tasksListPane = document.querySelector(".FullWidthPageStructureWithDetailsOverlay-fullWidth");
      tasksListPane.style.width = "60%";
      tasksListPane.style.display = "contents";
    }
  };

  function setuphelpDiv() {
    
    const addEl = dynamicUI.setAppendToElement();
    var helpDiv = document.createElement("div");
    addEl.appendChild(helpDiv);
    helpDiv.innerHTML = getHTML();
    helpDiv.setAttribute("id", "helpDiv");    
    window.helpDiv = helpDiv;


    const my_css2 = GM_getResourceText("IMPORTED_CSS2");
    var styleSheet = document.createElement("style");
    document.head.appendChild(styleSheet);
    styleSheet.innerText = my_css2;

    if (!jQuery) {
      // jQuery is not loaded
      console.error("JQuery Doesn't Work");
      throw "JQuery Exception";
    } else {
      logger(3).inside("jQuery working");
      if (typeof jQuery.ui !== 'undefined') {
        logger(3).inside("jQuery UI working");
        $("#helpDiv").draggable();
      } else {
        console.error("draggable not working");
        throw "JQuery UI Exception";
      }
    }

    //}); 
  }
  
  function getHTML() {
    const HLArray = getHLCodesAsArray();

    let helpRowArray = [];
    let numBullets = HLArray.length;
    //let cellNumFirstCol = Math.ceil(numBullets / 2);
    let helpRowInnerHTML, helpRowHTML, helpTableHTML;
    //for (let i = 0; i < cellNumFirstCol; i++) {
      for (let bIdx = 0; bIdx < numBullets; bIdx++) {
        let bullet = HLArray[bIdx][0];
        let styles = HLArray[bIdx][1];
        helpRowInnerHTML = `    <TD class='helpTblCell' \n`;
        helpRowInnerHTML += `        style='\n`;        
        for (let sIdx= 0; sIdx < styles.length; sIdx++) {
          let style = styles[sIdx];
          let styleName = style[0];
          let styleValue = style[1];
          helpRowInnerHTML += `         ${styleName}:${styleValue};\n`; 
        }
        helpRowInnerHTML += `         '\n`;
        helpRowInnerHTML += `    >\n`;
        helpRowInnerHTML += `      ${bullet}`;
        helpRowInnerHTML += `\n`;
        helpRowInnerHTML += `    </TD>\n`;

        helpRowInnerHTML += `    <TD class='helpTblCell' \n`;
        helpRowInnerHTML += `        style='\n`;                
        for (let sIdx = 0; sIdx < styles.length; sIdx++) {
          let style = styles[sIdx];
          let styleName = style[0];
          let styleValue = style[1];
          helpRowInnerHTML += `         ${styleName}:${styleValue};\n`; 
        }
        helpRowInnerHTML += `         '\n`;
        helpRowInnerHTML += `    >\n`;
        for (let sIdx = 0; sIdx < styles.length; sIdx++) {
          let style = styles[sIdx];
          let styleName = style[0];
          let styleValue = style[1];
          helpRowInnerHTML += `      ${ styleName }:${ styleValue }; </br>\n`; 
        }
        helpRowInnerHTML += "    </TD>\n";
        
      helpRowArray[bIdx] = helpRowInnerHTML;
    }
    helpRowHTML = "  <TR class='helpTblRow'>\n";
    helpRowHTML += helpRowArray.join("  </TR>\n  <TR class='helpTblRow'>\n") + "  </TR>\n";

    const myTableOpenTag = GM_getResourceText("IMPORTED_HTML1");
    logger(4).w(myTableOpenTag);    
    //console.log(myTableOpenTag);
    //console.log(helpRowHTML);
    helpTableHTML = myTableOpenTag;
    helpTableHTML += helpRowHTML;
    helpTableHTML += "</TABLE>";
    console.log(helpTableHTML);
    return helpTableHTML;
  }

  let dynamicUI = {
    setAppendToElement: function setAppendToElement() {
      //set the ** "AppendTo" Element **
      let appendToElement = document.querySelector(addElsToThisBarSelector); //Get ONLY ONE element to add buttons to
      if (!appendToElement) {	// if this is NULL & therefore false, then we didn't find the `addElsToThisBarSelector`
        // this likely means that ASANA has changed the classname since we last ran this.
        //TopbarPageHeaderStructure ProjectPageHeader
        errHelpers.nullError(this, "missing '" + addElsToThisBarSelector + "' -- check HTML for this classname");
      }
      return appendToElement;
    },
    createToolBarBtn_Highlight: function createToolBarBtn_Highlight(addToElement) {
      let btn = document.createElement("button");

      btn.class = "btnHighlight";
      btn.classList.add('AbstractThemeableRectangularButton');
      btn.classList.add('UpgradeButton');
      btn.style.margin = "0px 0px 0px 12px";
      btn.style.padding = "0px 0px 0px 0px";
      //btn.classList.add('TopbarContingentUpgradeButton-button');
      if (!addToElement) {
        errHelpers.nullError(this, "missing 'addToElement");
        return;
      }

      addToElement.appendChild(btn);
      if (isLoggingOn) console.log("HighlightButton added to element:");
      if (isLoggingOn) console.log(addToElement);


      //store in global object in case I need it globally somewhere
      window.highlightButton = btn;


      //if (isLoggingOn) console.log("window.highlightButton => " + window.highlightButton);
      window.highlightButton.innerText = "HIGHLIGHT";
      window.highlightButton.addEventListener('click', conditionalHighlighting);
      if (isLoggingOn) console.log('HighlightButton click event set to conditionalHighlighting()');
    },
    createToolBarBtn_ToggleBars: function createToolBarBtn_ToggleBars(addToElement) {
      let btn = document.createElement("button");

      btn.class = "btnToolBarToggle";
      btn.classList.add('AbstractThemeableRectangularButton');
      btn.classList.add('UpgradeButton');
      btn.style.margin = "0px 0px 0px 12px";
      btn.style.padding = "0px 0px 0px 0px";
      //btn.classList.add('TopbarContingentUpgradeButton-button');

      addToElement.appendChild(btn);
      if (isLoggingOn) console.log("btnToolBarToggle added to element:");
      if (isLoggingOn) console.log(addToElement);


      //store in global object in case I need it globally somewhere
      window.toolBarToggleBtn = btn;


      //if (isLoggingOn) console.log("window.highlightButton => " + window.highlightButton);

      // set to HIDE to start, since bars are visible when page loads initially
      window.toolBarToggleBtn.innerText = "Toggle TBars";
      window.toolBarToggleBtn.addEventListener('click', evtHandlers.toggleAllToolBars);
      if (isLoggingOn) console.log('btnToolBarToggle click event set to eHandlers.toggleAllToolBars()');
    },
    createToolBarBtn_HideBars: function createToolBarBtn_HideBars(addToElement) {
      //		function addToolBarBtn(toolbarToAddTo, tbBtn_ClassIDName, tbBtn_Text, tbBtn_ClickHandler){			 */
      let btn = document.createElement("button");

      btn.class = "btnToolBarHide";
      btn.classList.add('AbstractThemeableRectangularButton');
      btn.classList.add('UpgradeButton');
      btn.style.margin = "0px 0px 0px 12px";
      btn.style.padding = "0px 0px 0px 0px";
      //btn.classList.add('TopbarContingentUpgradeButton-button');

      addToElement.appendChild(btn);
      if (isLoggingOn) console.log("btnToolBarHide added to element:");
      if (isLoggingOn) console.log(addToElement);


      //store in global object in case I need it globally somewhere
      window.toolBarHideButton = btn;


      //if (isLoggingOn) console.log("window.highlightButton => " + window.highlightButton);

      // set to HIDE to start, since bars are visible when page loads initially
      window.toolBarHideButton.innerText = "Hide TBars";
      window.toolBarHideButton.addEventListener('click', evtHandlers.hideAllToolBars);
      if (isLoggingOn) console.log('btnToolBarHide click event set to eHandlers.hideAllToolBars()');
    }
  };
  let evtHandlers = {
    //	Button Click Handlers
    toggleAllToolBars: function toggleAllToolBars() {
      setAllToolBarsUI("toggle");
    },
    hideAllToolBars: function hideAllToolBars() {
      setAllToolBarsUI("hide");
    },
    //	"KeyPress Handlers"
    checkForShortcut: function checkForShortcut(evt, keyCode, callbackFn) {
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
      if (evt.keyCode == keyCode && evt.ctrlKey) {
        //				if (evt.keyCode == 191 && evt.ctrlKey) {

        //if (evt.keyCode == 17 && evt.keyCode == 191) {
        //	alert("Ctrl-Z");
        //	alert("Ctrl-/");
        //}
        //setUpHelpCheatSheet.openHelpOnKeyPress();
        callbackFn();
      }//	if (evt.keyCode == 191 && evt.ctrlKey) {
    }
  }
  let errHelpers = {
    getFuncName: function getFuncName() {
      return getFuncName.caller.name
      /*    function getFuncName(func){
            if (func === undefined) return "function undefined"
            if (!func) return "no function";
            let caller = func.caller;
            if (!caller) return "no function caller";
            caller = caller.toString();
            //if (!caller.trim().startsWith("function")) return "anonymous";
            //return caller.substring(0, caller.indexOf("(")).replace("function","");
            return caller.name;
      */
    },
    unexpectedParamValError: function unexpectedParamValError(errMsg) {
      console.log("unexpectedParameterValueError: " + errMsg);
    },
    nullError: function nullError(caller, errMsg) {
      if (isLoggingOn) console.log('---------------');
      if (isLoggingOn) console.log("null ERROR:")
      if (errMsg) {
        if (isLoggingOn) console.log(errMsg);
      }
      if (isLoggingOn) console.log('---------------');
      //        if (isLoggingOn) console.log(getCallerName(caller));
      if (isLoggingOn) console.log(errHelpers.nullError.caller.name);
      if (isLoggingOn) console.log('===============');
    }
  };
  let bgWorkers = {
    /*   background aSync functions: wait for entire page to load, etc.
    ********************************************************************/
    getUrlParams: function getUrlParams(url) {
      let params = {};
      url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        params[key] = value;
      });

      return params;
    }, //getUrlParams

    //the following is not currently being used
    waitForElementToDisplay: function waitForElementToDisplay(selector, ms) {
      if (document.querySelector(selector) != null) {
        runYourInitHere();
      }
      else {
        setTimeout(function () {
          waitForElementToDisplay(selector, ms);
        }, ms);
      }
    } //END waitForElementToDisplay
  }



  // BEGIN: "Not FULLY Implemented or UNUSED Functions" ================
  function notImplementedFunctions() {
    /*******************************************************************
    *   Not implemented - not sure they work:
    *   	*shrinkDetailsPane
    *  		*taskListDetailsOnDblClick
    *     *openTaskDetails
    *     *createToolBarBtn
    ********************************************************************/
    function shrinkDetailsPane() {
      let detailsPaneShrinkItems = document.querySelectorAll(".LabeledRowStructure-label");
      for (let idx = 0; idx < detailsPaneShrinkItems.length; idx++) {
        detailsPaneShrinkItems[idx].style.fontSize = "xx-small";
      }
      let t = document.querySelector(".DueDateTokenButton-label");
      t.style.fontSize = "xx-small";
    }
    function taskListDetailsOnDblClick() { //open task list details on double click
      let taskListItems = document.querySelectorAll('.TaskList .SubtaskTaskRow-taskName');

      for (let i = 0; i < taskListItems.length; i++) {
        taskListItems[i].addEventListener('dblclick', openTaskDetails);
      }

      if (isLoggingOn) console.log('show tasklist details on double click is active');
    }
    function openTaskDetails(e) { //open task list details
      e.target.parentNode.parentNode.parentNode.querySelector('.SubtaskTaskRow-detailsButton').click();
    }
    function createToolBarBtn(appendToElement, btnID, btnClass, btnText, btnClickHandler) {
      let btn = document.createElement("button");

      btn.class = btnClass;
      btn.classList.add('AbstractThemeableRectangularButton');
      btn.classList.add('UpgradeButton');
      btn.style.margin = "0px 0px 0px 12px";
      btn.style.padding = "0px 0px 0px 0px";
      //btn.classList.add('TopbarContingentUpgradeButton-button');

      appendToElement.appendChild(btn);
      logger(4).w(`btnID: ${btnID}, btnClass: ${btnClass} added to element: ${appendToElement}`);

      //store in global object in case I need it globally somewhere
      window.toolBarBtn[btnID] = btn;

      //if (isLoggingOn) console.log("window.highlightButton => " + window.highlightButton);
      window.toolBarBtn[btnID].innerText = btnText;
      window.toolBarBtn[btnID].addEventListener('click', btnClickHandler);
      logger(4).w(`${btnID} click event set to ${btnClickHandler.name}`);
    }
    function hideTopBar() {
      let topBar = document.getElementById('topbar');

      if (topBar && topBar.style.display !== 'none') {
        topBar.style.display = 'none';
        if (isLoggingOn) console.log('topbar hidden');
      }
    }
    function logWrapper(funcName) {
      /* work before the function is called */
      try {
        var returnValue = console.log.apply(this, "bottom of: '%s' => ", logWrapper.caller.name, arguments);
        /* work after the function is called */
        return returnValue;
      }
      catch (e) {
        /* work in case there is an error */
        throw e;
      }
    }
  }// END: "Not FULLY Implemented or UNUSED Functions" ================
//}