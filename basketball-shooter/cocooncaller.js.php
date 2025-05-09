//v5.3.10001
var _gameConfig="nothingToLoad";
var _pub_loaded = false;
var _MG_loaded = false;
var _gamename = currentGame;//"unnamedgame";	//Code name of the game
var _clientID = -1;
var _platform = "";

function gup( name, url, defaultVal ) {
	if (!url) url = location.href;
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec( url );
	if(typeof(defaultVal) == "undefined") defaultVal = null;
	return results == null ? defaultVal : results[1];
}

function getConfigDatas(){
	return _gameConfig;
}

function loadConfig(){
	var client = new XMLHttpRequest();
	client.onreadystatechange = function(data)	{
	
												if(client.readyState == 4 
												&& client.status == 200){
													//alert(client.responseText);
													_gameConfig = client.responseText;
													//alert(responseText);
												}
											}
	client.open("GET", "https://playzool.com/common/loadGameConfig.php?gamename="+_gamename+"&clientID="+_clientID+"&platform="+_platform, true);
	client.send();
	//alert('send');
}



 if(navigator.userAgent.toLowerCase().indexOf("android") != -1){
	_platform = "Android";
}else if(navigator.userAgent.toLowerCase().indexOf("ipad") != -1){
	_platform = "iPad";
}else if(navigator.userAgent.toLowerCase().indexOf("iphone") != -1){
	_platform = "iPhone";
}else if(navigator.userAgent.toLowerCase().indexOf("ipod") != -1){
	_platform = "iOS";
}else if(navigator.userAgent.toLowerCase().indexOf("silk") != -1 || navigator.userAgent.toLowerCase().indexOf("kindle") != -1 || navigator.userAgent.toLowerCase().indexOf("kfjw") != -1 || navigator.userAgent.toLowerCase().indexOf("kftt") != -1 || navigator.userAgent.toLowerCase().indexOf("kfot") != -1){
	_platform = "Kindle";
}else{
	_platform = "unknow";
}

function setGameName(gname, clientID, forcePlatform){
	forcePlatform = forcePlatform || false;
	if(forcePlatform && forcePlatform != ""){
		_platform = forcePlatform;
	}
	_gamename = gname;
	_clientID = clientID;
	loadConfig();
	//alert(_platform);
}

function showWV(){

	if(!_pub_loaded){
		loadWV();
	}
	if (typeof (CocoonJS) !== 'undefined'){
		CocoonJS.App.showTheWebView(0, 0, window.innerWidth, window.innerHeight);
	}

}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

function showMG(){
	var fromPartner = getCookie('fromPartner') || "";
	var d = new Date();
	switch(fromPartner.toLowerCase()){
		case "windowsstore":
			parent.postMessage({message:{action:"openUrl",url:"https://games.playtouch.net/moregamesdispatcher.php?fromPlatform=playzool&fromPartner="+fromPartner+"&gamename="+_gamename+"&declaredDevice="+_platform+"&_t="+d.getTime()}},"*");
		break;
		case "chromewa":
		case "firefoxwa":
		case "floraictpc":
			window.open("//games.playtouch.net/moregamesdispatcher.php?fromPlatform=playzool&fromPartner="+fromPartner+"&gamename="+_gamename+"&declaredDevice="+_platform+"&_t="+d.getTime());
		break;
		case "flickplay":
			if(typeof(window.history) != 'undefined'){
				if(typeof(window.history.back) != 'undefined'){
					window.history.back();
					return;
				}
				if(typeof(window.history.go) != 'undefined'){
					history.go(-1);
					return;
				}
			}
			window.location="//www.flickplay.io/?fromPlatform=playzool&fromPartner="+fromPartner+"&gamename="+_gamename+"&declaredDevice="+_platform+"&_t="+d.getTime();
		break;
		case "spilweb":
			window.top.location.href="//games.playtouch.net/moregamesdispatcher.php?fromPlatform=playzool&fromPartner="+fromPartner+"&gamename="+_gamename+"&declaredDevice="+_platform+"&_t="+d.getTime()+"&moregamesto="+gup("moregamesto", false, "http%3A%2F%2Fwww.a10.com");
		break;
		case "y8":
			window.top.location.href="//y8.com/?utm_source=playtouch&utm_medium=moregames=utm_campaign=playzool&fromPlatform=playzool&gamename="+_gamename+"&declaredDevice="+_platform+"&_t="+d.getTime();
		break;
		//RTL.DE
		case "dmax.de": window.top.location.href="http://mobilegames.dmax.de/?fromPlatform=playzool&fromPartner=playtouch&_t="+d.getTime(); break;
		case "tlc.de": window.top.location.href="http://mobilegames.tlc.de/?fromPlatform=playzool&fromPartner=playtouch&_t="+d.getTime(); break;
		case "eurosport.de": window.top.location.href="http://mobilegames.eurosport.de/?fromPlatform=playzool&fromPartner=playtouch&_t="+d.getTime(); break;
		case "tntspiele.de": window.top.location.href="http://mobil.tntspiele.de/?fromPlatform=playzool&fromPartner=playtouch&_t="+d.getTime(); break;
		case "syfy.de": window.top.location.href="http://mobilegames.syfy.de/?fromPlatform=playzool&fromPartner=playtouch&_t="+d.getTime(); break;
		case "history.de": window.top.location.href="http://mobilegames.history.de/?fromPlatform=playzool&fromPartner=playtouch&_t="+d.getTime(); break;
		case "13thstreet.de": window.top.location.href="http://mobilegames.13thstreet.de/?fromPlatform=playzool&fromPartner=playtouch&_t="+d.getTime(); break;
		case "eonline.spielehub.com": window.top.location.href="http://eonline.spielehub.com/?fromPlatform=playzool&fromPartner=playtouch&_t="+d.getTime(); break;
		//
		case "":
		default:
			window.location="//games.playtouch.net/moregamesdispatcher.php?fromPlatform=playzool&fromPartner="+fromPartner+"&gamename="+_gamename+"&declaredDevice="+_platform+"&_t="+d.getTime();
		break;
	}
	
}

function hideMG(){
	if (typeof (CocoonJS) !== 'undefined'){
		//CocoonJS.App.forwardAsync("CocoonJS.App.enableTouchInCocoonJS();");
		//window.ext.IDTK_APP.makeCall("enableTouchLayer", "CocoonJSView");
	}
}

function loadWV(){
	if (typeof (CocoonJS) !== 'undefined'){
		CocoonJS.App.loadInTheWebView("//games.playtouch.net/ad/moregame/cocoon-test.php?device="+_platform+"&gamename="+_gamename+"&iscocoon=true");
		//CocoonJS.App.loadInTheWebView("webview.html");
		CocoonJS.App.onLoadInTheWebViewSucceed.addEventListener(function(pageURL) {
			_pub_loaded = true;
			_MG_loaded = false;
			showWV();
		});
	}else{
		//showMG();
	}
}


function windowOpen(url){
	//WORKING
	CocoonJS.App.forward("ext.IDTK_APP.makeCall('openURL' , " + url + " );");
	
	
	//CocoonJS.App.showTheWebView();
	//CocoonJS.App.forward("CocoonJS.App.show(0, 0, " + window.innerWidth/2 + "," + window.innerHeight + ");");
}

//uncomment to load webview
function startOnline(){
	loadWV();
	//alert(_platform);
}
function startOffline(){
	//alert("offline");
	if(_platform != "Android" && _platform != "Kindle"){
		//alert("forced IOS");
		startOnline();
	}
	CocoonJS.App.hideTheWebView();
}

function sendAnalytics(gamename, clientID, type, todo, value){
	//alert('a');
	var ajaxAnalytics = new XMLHttpRequest();
	//alert('b');
	ajaxAnalytics.onreadystatechange = function(data)	{
												if(data.readyState == 4 
												&& data.status == 200){
													//alert(data.responseText);
													//_gameConfig = data.responseText;
													//alert(responseText);
												}
											}
	//alert("http://games.playtouch.net/games-config/gameAnalytics.php?gamename="+_gamename+"&clientID="+clientID+"&type="+type+"&value="+value+"&todo="+todo);
	ajaxAnalytics.open("GET", "http://games.playtouch.net/games-config/gameAnalytics.php?gamename="+gamename+"&clientID="+clientID+"&type="+type+"&value="+value+"&todo="+todo+"&platform="+_platform, true);
	ajaxAnalytics.send();
}
//sendAnalytics("forestJump", 22, "nbLvlPlayed", "add", 1);