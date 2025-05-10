class GameDistributionWrapper {

	constructor(readyCallback) {
		this.readyCallback = readyCallback;
		// Advertisement fields.
		this.interstitialVisible = false;
		this.rewardedVisible = false;
		this.contentPauseRequested = false;
		// Wrapper initialization.
		console.log("Wrapper initialization started.");
		window["GD_OPTIONS"] = {
			"gameId": runtimeData.gameDistributionId,
			"prefix": runtimeData.gameDistributionPrefix,
			"advertisementSettings": {
				// Enable IMA SDK debugging.
				"debug": false,
				// Don't use this because of browser 
				// video autoplay restrictions.
				"autoplay": false,
				// Locale used in IMA SDK, this will localize
				// the "Skip ad after x seconds" phrases.
				"locale": "en",
			},
			"onEvent": (eventData) => {
				switch (eventData.name) {
					case "SDK_READY": {
						// When the SDK is ready.
						console.log("SDK initialized successfully.");
						this.readyCallback();
						this.invokeInterstitial();
						break;
					}
					case "LOADED": {
						// Fired when ad data is available.
						console.log("Ad is loaded.");

						break;
					}
					case "CONTENT_PAUSE_REQUESTED": {
						// Fired when content should be paused.
						// This usually happens right before an
						// ad is about to cover the content.
						console.log("Content pause requested.");
						application.publishEvent("OnExternalPause", "True");
						this.contentPauseRequested = true;
						break;
					}
					case "CONTENT_RESUME_REQUESTED": {
						// Fired when content should be resumed.
						// This usually happens when an ad finishes or collapses.
						console.log("Content resume requested.");
						application.publishEvent("OnExternalPause", "False");
						this.contentPauseRequested = false;
						break;
					}
					case "SDK_REWARDED_WATCH_COMPLETE": {
						// This event is triggered when your
						// user completely watched rewarded ad.
						console.log("Rewarded ad watched successfully.");
						application.publishEvent("OnRewardedEvent", "Success");
						break;
					}
					case "SDK_ERROR": {
						// When the SDK has hit a critical error.
						console.error("Critical error occurred.");
						break;
					}
				}
			},
		};
		(function (d, s, id) {
			var js,
				fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) return;
			js = d.createElement(s);
			js.id = id;
			js.src = "//html5.api.gamedistribution.com/main.min.js";
			fjs.parentNode.insertBefore(js, fjs);
		})(document, "script", "gamedistribution-jssdk");
	}

	// Interstitial advertisement methods.

	isInterstitialVisible() {
		return this.interstitialVisible;
	}

	invokeInterstitial() {
		console.log("Invoke interstitial called.");
		return new Promise((resolve, reject) => {
			try {
				if (typeof gdsdk.preloadAd !== "undefined") {
					console.log("Interstitial is already preloaded.");
					return resolve(this.displayInterstitial());
				}
				else {
					console.log("Interstitial is not preloaded.");
					this.preloadInterstitial().then(() => {
						resolve(this.displayInterstitial());
					});
				}
			}
			catch (exception) {
				console.error("Invoke interstitial failed.", exception);
				reject(exception);
			}
		});
	}

	preloadInterstitial() {
		console.log("Preload interstitial called.");
		return new Promise((resolve, reject) => {
			try {
				gdsdk.preloadAd(gdsdk.AdType.Interstitial).then(response => {
					console.log("Preloading interstitial successful.", response);
					resolve(response);
				}).catch(exception => {
					console.error("Preloading interstitial failed.", exception);
					reject(exception);
				});
			}
			catch (exception) {
				console.error("Preloading interstitial failed.", exception);
				reject(exception);
			}
		});
	}

	displayInterstitial() {
		console.log("Display interstitial called.");
		return new Promise((resolve, reject) => {
			try {
				this.interstitialVisible = true;
				application.publishEvent("OnInterstitialEvent", "Begin");
				gdsdk.showAd(gdsdk.AdType.Interstitial).then(response => {
					console.log("Interstitial done playing.", response);
					this.interstitialVisible = false;
					application.publishEvent("OnInterstitialEvent", "Close");
					resolve(response);
				}).catch(exception => {
					this.interstitialVisible = false;
					console.error("Interstitial failed to play.", exception);
					application.publishEvent("OnInterstitialEvent", "Error");
					reject(exception);
				});
			}
			catch (exception) {
				this.interstitialVisible = false;
				console.error("Interstitial failed to play.", exception);
				application.publishEvent("OnInterstitialEvent", "Error");
				reject(exception);
			}
		});
	}

	// Rewarded advertisement methods.

	isRewardedVisible() {
		return this.rewardedVisible;
	}

	invokeRewarded() {
		console.log("Invoke rewarded called.");
		return new Promise((resolve, reject) => {
			try {
				if (typeof gdsdk.preloadAd !== "undefined") {
					console.log("Rewarded is already preloaded.");
					return resolve(this.displayRewarded());
				}
				else {
					console.log("Rewarded is not preloaded.");
					this.preloadRewarded().then(() => {
						resolve(this.displayRewarded());
					});
				}
			}
			catch (exception) {
				console.error("Invoke rewarded failed.", exception);
				reject(exception);
			}
		});
	}

	preloadRewarded() {
        console.log("Preload rewarded called.");
        return new Promise((resolve, reject) => {
            try {
				gdsdk.preloadAd(gdsdk.AdType.Rewarded).then(response => {
                    console.log("Preloading rewarded successful.", response);
                    resolve(response);
                }).catch(exception => {
                    console.error("Preloading rewarded failed.", exception);
                    reject(exception);
                });
            }
            catch (exception) {
                console.error("Preloading rewarded failed.", exception);
                reject(exception);
            }
        });
	}

	displayRewarded() {
        console.log("Display rewarded called.");
        return new Promise((resolve, reject) => {
            try {
                this.rewardedVisible = true;
                application.publishEvent("OnRewardedEvent", "Begin");
                gdsdk.showAd(gdsdk.AdType.Rewarded).then(response => {
                    console.log("Rewarded done playing.", response);
                    this.rewardedVisible = false;
                    application.publishEvent("OnRewardedEvent", "Close");
                    resolve(response);
                }).catch(exception => {
                    this.rewardedVisible = false;
                    console.error("Rewarded failed to play.", exception);
                    application.publishEvent("OnRewardedEvent", "Error");
                    reject(exception);
                });
            }
            catch (exception) {
                this.rewardedVisible = false;
                console.error("Rewarded failed to play.", exception);
                application.publishEvent("OnRewardedEvent", "Error");
                reject(exception);
            }
        });
    }

}

function initializeWrapper() {
	if (typeof window !== 'undefined') {
		window.gameDistributionWrapper = new GameDistributionWrapper(() => {
			// Application initialization on wrapper ready callback.
			application.initialize();
		});
	}
}