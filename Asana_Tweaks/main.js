const logger = window.logger
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

window.start(XMLHttpRequest.prototype.open);
//------------------------------------------------ END
logger(2, "GLOBAL function").btm();