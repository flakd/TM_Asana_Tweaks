//window.main = function(){
  function init() {
    logger(2).top();
    //==========================================================

    if (typeof window.numTimesRun === undefined) window.numTimesRun = 0;

    console.log("numTimeRun = %s", window.numTimesRun++);


    logger(2).next("doPermUIChanges()");
    doPermUIChanges();

    logger(2).next("setupDynamicUI()");
    setupDynamicUI();

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
      console.log("burgerMenu: %s", burgerMenu);
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



  function checkForBullets(bullets, content, numBullets, task) {
    for (let j = 0; j < bullets.length; j++) { //	FOR "Loop Through Bullets"
      let bullet = bullets[j][0];
      let styleName = bullets[j][1];
      let styleValue = bullets[j][2];

      //we found a(nother) bullet, so add it's styling
      if (content.includes(bullet)) { // IF "Found Bullet"
        numBullets = numBullets + 1;
        //if (bullet=="√") task.classList.add("\\" + bullet);
        task.classList.add(styleName);
        logger(41).w(`BULLET '${bullet}' =>`, `${styleName}: ${styleValue}`, "ClassList: ", task.classList);

        task.style[styleName] = styleValue;
      } //ENDIF "Found Bullet"

    } //ENDFOR "Loop Through Bullets"
    return numBullets;
  }
  function conditionalHighlighting() {
    logger(2).top();

    const bullets = getHLCodesAsArray();

    let taskListItems = document.querySelectorAll(tasksSelector);
    let tli = taskListItems;

    // CHECK that we have an ACTUAL LIST of tasks/items
    // IF we don't then ERROR TO CONSOLE & RETURN from this function
    if (!tli || !tli[0]) { errHelpers.nullError(this, 37); return; }

    console.log("FOUND an ACTUAL List of %s Tasks by CLASS: '%s'", tli.length, tasksSelector)

    /*******************************************
      //  THE FOLLOWING DONE FOR EVERY TASK LINE
      *******************************************/
    for (let i = 0; i < tli.length; i++) {	// FOR "Loop through all Task Items"

      // DBL-CHECK to see if there an item at this index in the tasklist,
      // otherwise ERROR TO CONSOLE & BREAK OUT OF ENTIRE loop ?????  -- or just CONTINUE ?????
      if (!tli[i]) { errHelpers.nullError(this, 41); continue; }

      // SO we must have an item, so set var 'task' to that item
      let task = tli[i];

      //check that the task has a description/text, otherwise error & continue to next in loop
      if (!task.innerHTML || !task.textContent) { errHelpers.nullError(this, 42); return; }

      // OK, SO, we must have actual text, so set var 'content' to that text
      let content = task.textContent;
      /*****************************************
        //  NOW that we've isolated/captured our ACTUAL
        //	Task TEXT, let's examine it more closely
        ************************************************/
      let innerTaskDiv = task.querySelector("div");
      let innerTaskTA = task.querySelector("textarea");

      /******************************************************
        *    BEFORE we EVEN CHECK for bullets, let's see
        *    if this is already completed -- if so, we
        *    are going to set SPECIAL COMPLETED styling
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
      
      
      innerTaskTA.oninput = function(event){
        //let's check this task item to see if it has ANY of the bullets -- this will SET the *LAST* BULLET it finds!!!
        let numBullets = 0;

        numBullets = checkForBullets(bullets, innerTaskTA.value, numBullets, task);//ENDFOR "Loop Through Bullets"
        console.log("I changed:  numbullets = %s",  numBullets);
        // NO bullets FOUND, and NOT COMPLETED, so clear all formatting...
        // BECAUSE we want to catch RECENT CHANGES where bullets were
        // DELETED/REMOVED by user from the task, otherwise OLD BULLET
        // formatting will linger
        if (numBullets == 0) { // IF "We never found bullets" (numBullets COUNTER still ZERO)
          //task.style.backgroundColor = "";
          //task.style.color = "";
          task.style = null;
        }//ENDIF "We never found bullets"
      }

      let taskText = innerTaskDiv.innerHTML;

      //let's check this task item to see if it has ANY of the bullets -- this will SET the *LAST* BULLET it finds!!!
      let numBullets = 0;

      numBullets = checkForBullets(bullets, content, numBullets, task);//ENDFOR "Loop Through Bullets"

      // NO bullets FOUND, and NOT COMPLETED, so clear all formatting...
      // BECAUSE we want to catch RECENT CHANGES where bullets were
      // DELETED/REMOVED by user from the task, otherwise OLD BULLET
      // formatting will linger
      if (numBullets == 0) { // IF "We never found bullets" (numBullets COUNTER still ZERO)
        //task.style.backgroundColor = "";
        //task.style.color = "";
        task.style = null;
      }//ENDIF "We never found bullets"


      /*******************************************************
        // IF we've gotten THIS FAR, then we have
        // a VALID TASK, that is NOT COMPLETED
        *******************************************************/
      logger(3).w(`TASK: `, `${ i }`, `  CONTENT: `, `${ taskText }`);



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
      document.onkeydown = checkFor_Ctrl_Slash;

      function checkFor_Ctrl_Slash(evt) {
        evtHandlers.checkForShortcut(evt, 191, openHelpOnKeyPress); // params{evt, "slash" key/char}
      }

      function openHelpOnKeyPress() {
        let w = window.open('', "", "width=600, height=400, scrollbars=no");
        w.document.body.innerHTML = getStyleHelpHTML();
      }

      function getStyleHelpHTML() {
        const helpCellTextArray = getHLCodesAsArray();

        let helpRowArray = [];
        let helpRowInnerHTML, helpRowHTML, helpTableHTML;
        for (let i = 0; i < helpCellTextArray.length; i++) {
          helpRowInnerHTML = "<TD>" + helpCellTextArray[i].join("</TD><TD>") + "</TD>";
          helpRowArray[i] = helpRowInnerHTML;
        }
        helpRowHTML = "<TR>" + helpRowArray.join("</TR><TR>") + "</TR>";
        helpTableHTML = "<TABLE font-size='10pt' style='border: 1px' cellpadding='1'>\n"
        helpTableHTML += helpRowHTML;
        helpTableHTML += "\n</TABLE>";
        return helpTableHTML;
      }

    },//END FUNCTION setUpHelpCheatSheet
    setUIPanesWidths: function setUIPanesWidths() {
      let detailsPane = document.querySelector(".FullWidthPageStructureWithDetailsOverlay-detailsOverlay");
      detailsPane.style.width = "40%";

      let tasksListPane = document.querySelector(".FullWidthPageStructureWithDetailsOverlay-fullWidth");
      tasksListPane.style.width = "60%";
      tasksListPane.style.display = "contents";
    }
  };
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
      window.ToolBarToggleButton = btn;


      //if (isLoggingOn) console.log("window.highlightButton => " + window.highlightButton);

      // set to HIDE to start, since bars are visible when page loads initially
      window.ToolBarToggleButton.innerText = "Toggle TBars";
      window.ToolBarToggleButton.addEventListener('click', evtHandlers.toggleAllToolBars);
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
      if (isLoggingOn) console.log("btnID: %s, btnClass: %s added to element:");
      if (isLoggingOn) console.log(appendToElement);

      //store in global object in case I need it globally somewhere
      window.ToolBarToggleButton = btn;

      //if (isLoggingOn) console.log("window.highlightButton => " + window.highlightButton);
      window.ToolBarToggleButton.innerText = btnText;
      window.ToolBarToggleButton.addEventListener('click', btnClickHandler);
      if (isLoggingOn) console.log('%s click event set to %s', btnID, btnClickHandler.name.toString());
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