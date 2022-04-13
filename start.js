    function start(open) {
			XMLHttpRequest.prototype.open = function(method, url, async, user, pass) {

				this.addEventListener("readystatechange", function() {

					if(this.readyState === 4) {
						let urlParams = bgWorkers.getUrlParams(this.responseURL);
						if(!urlParams.idle) { //just re-initialise if not an idle request
//							logger("readyState").next("setupDynamicUI");
//							setupDynamicUI();  => moving this to init()
							logger(2,"readyState").next("init");
								init()
						}
					}
				}, false);

				open.call(this, method, url, async, user, pass);
			};

    }
    window.start = start;
		//window.start(XMLHttpRequest.prototype.open);
		//------------------------------------------------ END