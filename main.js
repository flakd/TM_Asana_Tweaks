const logger = window.logger


// BEGIN ===========================================
logger(2, "GLOBAL function").top();
//'use strict';

const settingsText = GM_getResourceText("IMPORTED_settings");
let settings = JSON.parse(settingsText);
logger(4).w(settings.helpWinSettings)

const my_css1 = GM_getResourceText("IMPORTED_CSS1");
GM_addStyle(my_css1);

logger(3).w("TM script self-exec Scope: const logger = window.logger");


window.numTimesScriptRun = 0;
window.numTimesHighlightRun = 0;
window.highlightButton;
window.toggleBarsButton;
window.hideBarsButton;


function checkFor_Ctrl_Slash(evt) {
  logger(3).top();
  //let openHelp = permUIChanges.setStyleHelp().openHelpOnKeyPress;
  evtHandlers.checkForShortcut(evt, 191, function(){
    if (window.helpDiv) {
      if (window.helpDiv.style) {
        if (window.helpDiv.style.display == "none") {
          window.helpDiv.style.display = "block";
        } else {
          window.helpDiv.style.display = "none";
        }
      }
    }
  }); // params{evt, "slash" key/char}
}
function checkFor_Ctrl_H(evt){
  logger(3).top();
  evtHandlers.checkForShortcut(evt, 72, conditionalHighlighting); // params{evt, "slash" key/char}
}
document.onkeydown = function(evt){
  checkFor_Ctrl_Slash(evt); 
  checkFor_Ctrl_H(evt);
}


window.start(XMLHttpRequest.prototype.open);
//------------------------------------------------ END
logger(2, "GLOBAL function").btm();