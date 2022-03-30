	function log3top(callerName){
		if (callerName === undefined || callerName === ""){
			callerName = log3top.caller.name;
		}
		if (LoggingOn) console.log("%c                                            ",logStyle1);
		if (LoggingOn) console.log("%cTop of%c: '%s'",logStyle1,logStyle2,callerName);
	}
	function log3btm(callerName){
		if (callerName === undefined || callerName === ""){
			callerName = log3btm.caller.name;
		}
		if (LoggingOn) console.log("%cBottom of%c: '%s'",logStyle3,logStyle2,callerName);
		if (LoggingOn) console.log("%c--------------------------------------------",logStyle4);
	}
	let log3b = {
		_callerName: "",
		init: function init(callerName){
			if (callerName === undefined || callerName === ""){
				this._callerName = init.caller.caller.name;
			}
		},	//END init
		top: function top(callerName){
			if (!LoggingOn) return;
			this.init(callerName);
			console.log("%c                                            ",logStyle1);
			console.log("%cTop of%c: '%s'",logStyle1,logStyle2,this._callerName);
		},	//END top
		btm: function btm(callerName){
			if (!LoggingOn) return;
			this.init(callerName);
			console.log("%cBottom of%c: '%s'",logStyle3,logStyle2,this._callerName);
			console.log("%c--------------------------------------------",logStyle4);
		}		//END btm
	};	//END log3b		