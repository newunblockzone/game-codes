const runtimeData = (function () {

    return {

        // Basic information.
        companyName: "MZGames",
        productName: "Madness Cars Destroy",
        productVersion: "1.0",
        sdkVersion: "3.19.7+merge4",
        productDescription: "",

        // File references.
        buildURL: "bin",
        loaderURL: "bin/Build_Web_GameDistribution.loader.js",
        dataURL: "bin/Build_Web_GameDistribution.data.unityweb",
        frameworkURL: "bin/Build_Web_GameDistribution.framework.js.unityweb",
        workerURL: "",
        codeURL: "bin/Build_Web_GameDistribution.wasm.unityweb",
        symbolsURL: "",
        streamingURL: "streaming",

        // Visual information.
        logoType: "LOGO_TYPE",
        iconTextureName: "GameIcon.png",
        backgroundTextureName: "background_1280x720.png",

        // Aspect ratio.
        desktopAspectRatio: -1,
        mobileAspectRatio: -1,

        // Debug mode.
        debugMode: false,
        rotationLockType : "LandscapeOnly",

        // Prefs.
        prefsContainerTags: [ "json-data" ],

        // Platform specific scripts.
        wrapperScript: "gameDistributionWrapper.js",

        // YandexGames.
        yandexGamesSDK: "/sdk.js",

        // Yandex Ads Network.
        yandexGameId: "",
        yandexBannerId: "",
        yandexInterstitialDesktopId: "",
        yandexInterstitialMobileId: "",
        yandexRewardedDesktopId: "",
        yandexRewardedMobileId: "",

        // GameDistribution.
        gameDistributionId: "2f5c17b7d11f449c9224f09041d1c312",
        gameDistributionPrefix: "mirragames_",

        // GamePush.
        gamepushProjectId: "",
        gamepushToken: "",

    }

})();