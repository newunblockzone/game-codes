// GAME-SPECIFIC SETTINGS / OVERRIDES

SDK_INTERFACE_SETTINGS.isProd = true;
SDK_INTERFACE_SETTINGS.version = "1.2.3";

if(SDK_INTERFACE_SETTINGS.isProd) {
	// PRODUCTION
	SDK_INTERFACE_SETTINGS.debugLevel = 0;
	SDK_INTERFACE_SETTINGS.forceMockObject = false;
} else {
	// TESTING
	SDK_INTERFACE_SETTINGS.debugLevel = 1;
	SDK_INTERFACE_SETTINGS.forceMockObject = true;
}

// overrides
SDK_INTERFACE_OVERRIDES.famobi.showInterstitialAd = (eventId, callback, placementId = null) => {

	return new Promise(resolve => {
		let params = {};

		if(typeof eventId === "object") {
		    params = eventId;
		} else {
		    params.callback = typeof eventId === "function" ? eventId : typeof callback === "function" ? callback : undefined;
		    params.eventId = typeof eventId === "string" ? eventId : typeof callback === "string" ? callback : undefined;
		}

		/*
			'preroll': before the game loads (before UI has rendered)
			'start': before the gameplay starts (after UI has rendered)
			'pause': the player pauses the game
			'next': player navigates to the next level
			'browse': the player explores options outside of the gameplay
		*/

		SDK_INTERFACE_HELPERS.placement_id = placementId;

		if(typeof params.eventId === "string") {
			switch(params.eventId.toLowerCase()) {
				case "preroll":
					SDK_INTERFACE_HELPERS.placement_id = "preroll";
					break;
				case "button:main:start":
				case "button:home:start":
				case "button:levelselect:start":
				case "button:result:start":
				case "button:defeat:restart":
				case "button:levelselection:level":
					SDK_INTERFACE_HELPERS.placement_id = "start";
					break;
				case "button:level:menu":
				case "button:game:menu":
				case "button:level:pause":
				case "button:game:pause":
					SDK_INTERFACE_HELPERS.placement_id = "pause";
					break;
				case "button:level:settings":
				case "button:level:achievements":
				case "button:settings:restart":
					// SDK_INTERFACE_HELPERS.placement_id = params.eventId; ???
					break;
				case "button:home:category":
				case "button:home:page":
					SDK_INTERFACE_HELPERS.placement_id = "browse";
					break;
				case "button:result:restart":
				case "button:results:restart":
				case "button:results:next":
				case "button:result:next":
				case "button:results:nextlevel":
				case "button:main:next":
					SDK_INTERFACE_HELPERS.placement_id = "next";
					break;
				// case "button:result:back":
				case "break:result":
					SDK_INTERFACE_HELPERS.placement_id = "browse";
				default:
					// do nothing
			}
		}

		// alert(SDK_INTERFACE_HELPERS.placement_id);

		if(SDK_INTERFACE_HELPERS.placement_id !== null) {
			window.famobi.showAd(() => {
				if(typeof params.callback === "function") {
				    params.callback();
				}
				resolve();
			}, false, SDK_INTERFACE_HELPERS.placement_id === "preroll");
		} else {
			SDK_INTERFACE.getDebugLevel() && console.log("showInterstitialAd('%s')", params.eventId);
			if(typeof params.callback === "function") {
			    params.callback();
			}
			resolve();
		}
	});
};

SDK_INTERFACE_OVERRIDES.famobi_analytics.trackEvent = (event, params) => {

	return new Promise(function(resolve, reject) {

		SDK_INTERFACE.getDebugLevel() && console.log(event, params);

		switch(event) {
			case "EVENT_LIVESCORE":
				break;

			case "EVENT_LEVELSCORE":
				break;
				SDK_INTERFACE_HELPERS.$msstart.submitGameResultsAsync(params.levelScore).then(result => {
					if(result) {
						SDK_INTERFACE_HELPERS.log("score submitted successfully");
					}
				});
				break;

			case "EVENT_TOTALSCORE":
				return SDK_INTERFACE_HELPERS.$msstart.submitGameResultsAsync(params.totalScore).then(result => {
					if(result) {
						SDK_INTERFACE_HELPERS.log("score submitted successfully");
					}
					resolve(event, params);
				});

				/*
				return window.famobi.showAd(() => {
					resolve(event, params);
				});
				*/

				break;

			case "EVENT_LEVELSUCCESS":
				break;

			case "EVENT_LEVELFAIL":
				break;

			case "EVENT_LEVELSTART":
				/* 
				return window.famobi.showAd(() => {
					resolve(event, params);
				});
				*/
				break;

			case "EVENT_LEVELRESTART":
				break;

			case "EVENT_VOLUMECHANGE":
				if(params.bgmVolume === 1 && params.sfxVolume === 1) {
					SDK_INTERFACE_HELPERS.$msstart.notifyGameUnmuted();
				} else {
					SDK_INTERFACE_HELPERS.$msstart.notifyGameMuted();
				}
				break;

			default:
				// do nothing
		};

		return resolve(event, params);
	});
};

SDK_INTERFACE_OVERRIDES.famobi_analytics.trackScreen = (screen, pageTitle) => {

	return new Promise(function(resolve, reject) {

		SDK_INTERFACE.getDebugLevel() && console.log(screen, pageTitle);

		switch(screen) {
			case "SCREEN_HOME":
				// ...
				break;
			default:
				// ...
		}

		return resolve(screen, pageTitle);
	});
};