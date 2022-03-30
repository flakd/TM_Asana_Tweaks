// const logStyle1 = 'color:red; font-size:16px; font-weight: 900; -webkit-text-stroke: 1px white;';
const logStyle_RedUnder = 'color:red; font-weight: 900; text-decoration: underline;';
const logStyle_Green = 'color:green;';
const logStyle_MaroonUnder = 'color:maroon; font-weight: 900; text-decoration: underline;';
const logStyle_Maroon = 'color:maroon; font-weight: 900;';
const logStyle_White = 'color:white;';
let logStyle1, logStyle2, logStyle3, logStyle4;


let isLoggingOn = true; // false;


function log2_old(msg, callerName) {
  if (!isLoggingOn) return;
  if (callerName === undefined || callerName === "") {    
    callerName = log2.caller.name;
    console.warn("In 'log2()': PARAM {callerName} is NULL => using {log2.caller.name}");
    if (callerName === undefined || callerName === ""){
      callerName = "anonymous";
      console.warn("In 'log2()': PARAM {log2.caller.name} is NULL => using 'anonymous'");
    }
  }
  //  this log2() function must be hardcoded to do further logging at the 
  //  "Warn" level by literally passing "console.warn()" method as a param
  //  (levels=Error, Warn, Info, Verbose/Debug > levels=1,2,3,4)
  return log(msg, callerName, console.warn);
}

function log2(level, msg1, callerName) {
  if (!isLoggingOn) return;

  let consoleFunc;
  switch (level){
    case 1: consoleFunc = console.error; break;
    case 2: consoleFunc = console.warn; break;
    case 3: consoleFunc = console.log; break;
    case 4: consoleFunc = console.debug; break;            
    default: 
      throw "INVALID 1st PARAM: only {1,2,3,4} allowed"
  }
  //  if we get here, we broke out one of the first 4 cases above 
  //    and have a VALID consoleFunc (eg. console.warn())
  if (msg1 !== undefined) {
    consoleFunc(`msg1=${msg1}`);
    return;
  }

  if (callerName === undefined || callerName === "") {
    callerName = arguments.callee.caller.name;
    console.error("In 'log2()': PARAM {callerName} is NULL => using {arguments.callee.caller.name}=%s", arguments.callee.caller.name);
    if (callerName === undefined || callerName === "") {
      callerName = "anonymous";
      console.error("In 'log2()': PARAM {arguments.callee.caller.name} is NULL => using 'anonymous'");
    }
  }

  prepNextPrevColors();
    
  function writeIt(prefix, msg2, delim2) {
    if (delim2 === undefined) delim2 = " => ";
    if (msg2 === undefined) {
      msg2 = "";
    } else {
      msg2 = delim2 + msg2;
    }    
    consoleFunc("%c%s %c'%s()': %c%s.", logStyle3, prefix, logStyle2, callerName, logStyle1, msg2);
  };
  function prepNextPrevColors(){
    logStyle1 = logStyle_White;
    logStyle2 = logStyle_Green;
    logStyle3 = logStyle_MaroonUnder;
    logStyle4 = logStyle_Maroon;
  }
  return ({ //  return object containing specific funcs(top, btm, next, prev)
    inside: function inside(msg2){
      writeIt("Inside of ",msg2);      
    },
    top: function top(msg2) {
      consoleFunc("%c                                            ", logStyle1);
      // ("%cTop of%c: '%s()'",logStyle1,logStyle2,callerName);
      writeIt("Top of ",msg2);
    },
    btm: function btm(msg2) {
      writeIt("Bottom of ",msg2);
      // consoleFunc("%cBottom of%c: '%s()'",logStyle3,logStyle2,callerName);
      consoleFunc("%c--------------------------------------------", logStyle4);
    },
    next: function next(callNextName) {
      prepNextPrevColors();
      consoleFunc("%cInside %c'%s()', %cNext: %c'%s().'", logStyle1, logStyle2, callerName, logStyle3, logStyle4, callNextName);
    },
    prev: function prev(callNextName) {
      prepNextPrevColors();
      consoleFunc("%cInside %c'%s()', %cPrev: %c'%s().'", logStyle1, logStyle2, callerName, logStyle3, logStyle4, callNextName);
    }
  }); //END return of log2() function

}

window.log2 = log2;
window.isLoggingOn = isLoggingOn;
