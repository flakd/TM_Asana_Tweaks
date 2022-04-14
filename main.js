const logger = window.logger
const myTableOpenTag = GM_getResourceText("IMPORTED_HTML1");
console.log(myTableOpenTag);
const my_css = GM_getResourceText("IMPORTED_CSS");
GM_addStyle(my_css);
console.log("TM script self-exec Scope: const logger = window.logger");

logger(2, "GLOBAL function").top();
// BEGIN ===========================================
//'use strict';
window.numTimesRun = 0;
window.highlightButton;
window.toggleBarsButton;
window.hideBarsButton;

function checkFor_Ctrl_Slash(evt) {
  let evtHandler = permUIChanges.setStyleHelp().openHelpOnKeyPress;
  evtHandlers.checkForShortcut(evt, 191, evtHandler); // params{evt, "slash" key/char}
}
function checkFor_Ctrl_H(evt){
  logger(3).inside();
  console.log("second key press")
  evtHandlers.checkForShortcut(evt, 72, conditionalHighlighting); // params{evt, "slash" key/char}
}
document.onkeydown = function(evt){
  checkFor_Ctrl_Slash(evt); 
  checkFor_Ctrl_H(evt);
}


window.start(XMLHttpRequest.prototype.open);
//------------------------------------------------ END
logger(2, "GLOBAL function").btm();