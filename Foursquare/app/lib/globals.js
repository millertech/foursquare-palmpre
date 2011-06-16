//Set up global vars and functions
var _globals = {};
window.maps = window.maps || {};
fsq = {};
logthis("globals started launch");
fsq.Metrix = new Metrix();
_globals.v="20110505";
_globals.db = new Mojo.Depot({name:"feed"}, function(){logthis("depot OK");}, function(){logthis("depot FAIL");}); 
_globals.rdb = new Mojo.Depot({name:"rec"}, function(){logthis("recdepot OK");}, function(){logthis("recdepot FAIL");}); 
_globals.debugMode=true;
_globals.hasWeb=false;
_globals.interval="00:20:00";
//_globals.interval="00:05:00";
_globals.onVenues=false;
_globals.retryingGPS=false;
_globals.hiddenVenues=[];
_globals.userData={};
_globals.rec={};
_globals.isTouchPad=function(){
	var isTouchPad=false;
	if(Mojo.Environment.DeviceInfo.modelNameAscii.indexOf("ouch")>-1){
		isTouchPad=true;
	}
	if(Mojo.Environment.DeviceInfo.modelNameAscii.indexOf("Emulator")>-1){
		isTouchPad=true;
	}
	if(Mojo.Environment.DeviceInfo.screenWidth==1024){
		isTouchPad=true;
	}
	if(Mojo.Environment.DeviceInfo.screenHeight==1024){
		isTouchPad=true;
	}
	
	return isTouchPad;
};

_globals.cmmodel = {
          visible: true,
          items: [{
          	items: [ 
          		{},
                 { iconPath: "images/venue_button.png", command: "do-Venues"},
                 { iconPath: "images/friends_button.png", command: "do-Friends"},
                 { iconPath: "images/todo_button.png", command: "do-Tips"},
                 { iconPath: "images/user_info.png", command: "do-Badges"},
                 { iconPath: 'images/leader_button.png', command: 'do-Leaderboard'},
                 {}
                 ],
            toggleCmd: "do-Venues",
            checkEnabled: true
            }]
    };  //cmmodel no longer used, but retained here for reference
_globals.main=_globals.main || {};


_globals.whatsnew={
	"caption":"What's New",
	"id":"whatsnew",
	"icon":"",
	"pages":[
		"Here's what's new in foursquare webOS <b>v2.7.5</b>! Follow me on Twitter: <a href=\"http://mobile.twitter.com/zhephree\">@zhephree</a><ul><li>A change in the foursquare API prevented venues from being listed</li></ul>",
		"Here's what's new in foursquare webOS <b>v2.7.4</b>! Follow me on Twitter: <a href=\"http://mobile.twitter.com/zhephree\">@zhephree</a><ul><li>OAuth / sign-in issues resolved</li></ul>",
		"Here's what's new in foursquare webOS <b>v2.7.3</b>! Follow me on Twitter: <a href=\"http://mobile.twitter.com/zhephree\">@zhephree</a><ul><li>GPS Issues resolved</li></ul>",
		"Here's what's new in foursquare webOS <b>v2.7.0</b>! Follow me on Twitter: <a href=\"http://mobile.twitter.com/zhephree\">@zhephree</a><ul><li>I seriously, absolutely, feel that I once-and-for-all fixed the GPS and timing-out issues during start up, thanks to James Harris. Automatically waits for the best accuracy (if available)</li><li>[USER PROFILE] Removed \"Last Visited\" option from the \"Where Have I Been?\" feature since foursquare removed it from the API</li><li>[ABOUT] Updated the content on here finally</li></ul>",
		"Here's what's new in foursquare webOS <b>v2.6.0</b>! Follow me on Twitter: <a href=\"http://mobile.twitter.com/zhephree\">@zhephree</a><ul><li>[USER PROFILE] Added points and mini-leaderboard. Tap mini-leaderboard to view full leaderboard</li><li>[LEADERBOARD] No longer an embedded web page! An actual, pretty, and useful leaderboard now.</li><li>[CHECKIN RESULT] Uses new data point for scores instead of old deprecated one. Future-proofing, yo.</li><li>[USER PROFILE] Number of user's check-ins now visible, regardless of friendship status, however, check-in history still only viewable for yourself</li><li>[USER PROFILE] Did I mention how much I love the new points progress bar? I didn't? Well, it's awesome!</li></ul>",
		"Here's what's new in foursquare webOS <b>v2.5.0</b>! Follow me on Twitter: <a href=\"http://mobile.twitter.com/zhephree\">@zhephree</a><ul><li>Added Explore feature</li><li>[CHECKIN RESULTS] Redesigned layout; added leaderboard rankings; added special unlock detection</li><li>Fixed ability to view check-ins from links supplied by Twitter clients</li><li>[NEARBY VENUES] Fixed a bug that prevented searching for venues with a space</li><li>[VIEW TODO] Fixed ability to view to-dos with no text assigned to them</li><li>[VENUE DETAIL] Fixed incorrect \"time ago\" for Who's Here listing</li><li>[ADD VENUE] Adding a venue respects coordinates selected from map and not just GPS specified location</li><li>[ABOUT] Update content</li></ul>"
	]
};


//--------------functions-------------
_globals.categoryFailed = function(event) {
	logthis("category download failed");
	_globals.categories = [];
};

_globals.categorySuccess = function(r) {
	logthis("got cats");
	if(r.responseJSON.meta.code==200){
		_globals.categories=r.responseJSON.response.categories;
	}
};

_globals.categorySort = function(a, b){
	return (b.count - a.count) //causes an array to be sorted numerically and descending
};

_globals.doDonate =function(){
	        Mojo.Controller.getAppController().getActiveStageController().activeScene().serviceRequest('palm://com.palm.applicationManager', {
	            method:'open',
	               parameters:{
		               target: "https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=QGN8Q924DXP82&lc=US&item_name=foursquare%20for%20webOS&item_number=foursquare%2dwebos&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted"
	                    }
	         });

};
_globals.getFriendRequests = function(c){
/*		var url = "https://api.foursquare.com/v1/friend/requests.json";
		var request = new Ajax.Request(url, {
		   method: 'get',
		   evalJSON: 'true',
		   requestHeaders: {Authorization:_globals.auth},
		   onSuccess: _globals.requestsSuccess.bind(this),
		   onFailure: _globals.requestsFailed.bind(this)
		 });*/

	/*	 foursquareGet(this,{
		 	endpoint: 'users/requests',
		 	requiresAuth: true,
		 	ignoreErrors: true,
		 	parameters: {},
		 	debug: true,
		 	onSuccess: _globals.requestsSuccess.bind(this),
		 	onFailure: _globals.requestsFailed.bind(this)
		 });*/
		 

};

_globals.requestsSuccess = function(r){	
	logthis("requests ok");
	if(r.responseJSON.response.requests != undefined && r.responseJSON.response.requests != null && r.responseJSON.requests.response.length>0){
		_globals.requests='';
		for(var f=0;f<r.responseJSON.response.requests.length;f++){
			var html=Mojo.View.render({template:'listtemplates/friend-requests',object:r.responseJSON.response.requests[f]});
			_globals.requests+=html;
		}
		
		if(c!=undefined){
			c.innerHTML=_globals.requests;
		}
	}
};

_globals.requestsFailed = function(r){
	logthis("Failed getting friend requests");
};


_globals.locationFailed = function(e){
	logthis("loc failed func: "+e);
	var msg;
	switch(e){
		case 1:
			msg="Your GPS timed-out. Try relaunching the app. If this problem persists, try restarting your phone.";
			break;
		case 2:
			msg="Your GPS says that your position is unavailable. Try relaunching the app. If this problem persists, try restarting your phone.";
			break;
		case 3:
		case 4:
		case -1:
			msg="An unknown error has occurred with your GPS. Try relaunching the app. If this problem persists, try restarting your phone.";
			break;
		case 5:
			msg="You have Location Services turned off. Please launch the Location Services app and turn on GPS and/or Google Services for location.";
			break;
		case 6:
			msg="You have denied permission to foursquare to use your phone's GPS. Please launch the Location Services app and turn on GPS and Google Services and accept the Terms of Use for Google.";
			break;
		case 7:
			msg="foursquare is already attempting to get GPS coordinates.";
			break;
		case 8:
			msg="foursquare has been temporarily blacklisted from receiving GPS positions. This means you disallowed foursquare access to your GPS when your phone asked you.";
			break;
	}
	logthis(msg);
	_globals.gpsError=msg;
	logthis("mainloaded="+_globals.mainLoaded);
	var appController = Mojo.Controller.getAppController();
	var stageController = appController.getStageController("mainStage");
	var activeScene = stageController.getScenes()[0];
	logthis("showing Dialog Helper");
	//activeScene.controller.errorDialog(_globals.gpsError);

		activeScene.showAlertDialog({
		    onChoose: function(value) {_globals.loginFail({responseJSON:"nothing"});}.bind(this),
		    title: $L("GPS Failure"),
		    message: _globals.gpsError,
		    choices:[
		        {label:$L("OK"), value:"med"}
		    ]
		}); 
		

};

//function for callback on gps return
_globals.gotLocation = function(event) {
	logthis("appassistant: doing got location");
	
	if(_globals.mainLoaded){ //only continue if the main scene is loaded
		//set globals values
		_globals.lat=event.latitude;
		_globals.long=event.longitude;
		_globals.hacc=event.horizAccuracy;
		_globals.vacc=event.vertAccuracy;
		_globals.altitude=event.altitude;
		_globals.gps=event;
		
		//hang on to stage instance
		var appController = Mojo.Controller.getAppController();
  	  	var cardStageController = appController.getStageController("mainStage");
				
		//get accuracy
		var acc=(_globals.gpsAccuracy != undefined)? Math.abs(_globals.gpsAccuracy): 750;
		logthis("acc="+acc);
		
		//check radius
		if(_globals.retryingGPS==false){
			if(acc>=_globals.hacc || acc==0){ 									//if requested radius is larger than 
				logthis("got it on first try");
				_globals.GPS.stop();											//actual or user doesn't care, AND first check, continue
				_globals.gotGPS=true;
				_globals.gpsStatus.innerHTML="Found your location!";
			}else{																//if user cares and radius is larger than requested
				logthis("bad radius; retrying");
				_globals.retryingGPS=true;										//AND first check, restart GPS and let main push
				//_globals.GPS.restart();											//venues and alert user of crappy accuracy
				_globals.GPS.stop();
				_globals.gotGPS=true;
				_globals.gpsStatus.innerHTML="Inaccurate location. Retrying...";
				_globals.newGPS= new Mojo.Service.Request('palm://com.palm.location', {
					method: "getCurrentPosition",
					parameters: {accuracy: 1, maximumAge:0, responseTime: 2},
					onSuccess: _globals.gotLocation,
					onFailure: _globals.locationFailed
				});

			}
		}else{ //if _globals.retryingGPS==true...
			logthis("retrying, yo...");
			if(acc>=_globals.hacc && _globals.onVenues==true){
				logthis("got it second try");
				_globals.GPS.stop();
				_globals.retryingGPS=false;
				_globals.gpsStatus.innerHTML="Found your location!";
				Mojo.Event.send(cardStageController.document.getElementById("gotloc"),"showrefresh");
			}
			if(acc<_globals.hacc && _globals.onVenues==true){
				logthis("still bad radius");
				var now=(new Date().getTime());
				var diff=(now-_globals.gpsStart)/1000; //in seconds
				if(diff>=10){
					logthis("giving up");
					_globals.gpsStatus.innerHTML="Found good enough location.";
					_globals.GPS.stop();
					_globals.retryingGPS=false;
					Mojo.Event.send(cardStageController.document.getElementById("gotloc"),"gaveup");				
				}
			}
		}
		
	}
};

_globals.loadPrefs = function() {
	this.cookieData=new Mojo.Model.Cookie("oauth");
	var credentials=this.cookieData.get();

	if (credentials/* && 1==2*//*uncomment the comment before this to force the login dialog*/){
		this.username=credentials.username;
		_globals.swf=credentials.swf || "1";
		//logthis("swf="+_globals.swf);

		_globals.auth=credentials.auth;
		_globals.token=credentials.token;
		this.gpsdata=new Mojo.Model.Cookie("gpsdata");
		var gps=this.gpsdata.get();
		_globals.gpsAccuracy=(gps)? gps.gpsAccuracy*-1: 0;

		this.venuecount=new Mojo.Model.Cookie("venuecount");
		var vc=this.venuecount.get();
		_globals.venueCount=(vc)? vc.venueCount: 15;

		this.units=new Mojo.Model.Cookie("units");
		var un=this.units.get();
		_globals.units=(un)? un.units: "si";

		this.sendstats=new Mojo.Model.Cookie("sendstats");
		var un=this.sendstats.get();
		_globals.sendstats=(un)? un.sendstats: "true";

		this.houses=new Mojo.Model.Cookie("houses");
		var un=this.houses.get();
		_globals.houses=(un)? un.houses: "yes";

		this.twitter=new Mojo.Model.Cookie("twitter");
		var un=this.twitter.get();
		_globals.twitter=(un)? un.twitter: "web";

		this.autoclose=new Mojo.Model.Cookie("autoclose");
		var un=this.autoclose.get();
		_globals.autoclose=(un)? un.autoclose: "never";

		/*this.hv=new Mojo.Model.Cookie("hiddenVenues");
		var hv=this.hv.get();
		_globals.hiddenVenues=(hv)? hv.hiddenVenues: [];*/


		this.flickr=new Mojo.Model.Cookie("flickr");
		var flickrinfo=this.flickr.get();
		_globals.flickr_token=(flickrinfo)? flickrinfo.token: undefined;
		_globals.flickr_username=(flickrinfo)? flickrinfo.username: undefined;
		_globals.flickr_fullname=(flickrinfo)? flickrinfo.fullname: undefined;
		_globals.flickr_nsid=(flickrinfo)? flickrinfo.nsid: undefined;

	    _globals.getFriendRequests();
		return true;
	}else{
		return false;
	}

};


Array.prototype.inArray = function (value){
	// Returns true if the passed value is found in the
	// array. Returns false if it is not.

	var i;
	for (i=0; i < this.length; i++) {
		// Matches identical (===), not just similar (==).
		if (this[i] === value) {
			return true;
		}
	}
	return false;
};

function isFriend(uid){
	/*var inarray=false;

	if(_globals.friendList2){
		for(var f=0;f<_globals.friendList2.length;f++){
			logthis("in friend loop");
			logthis(Object.toJSON(_globals.friendList2[f]));
			if(_globals.friendList2[f].id==uid){
				inarray=true;
				break;
			}
		}
	}
	
	return inarray;*/
	
		return (_globals.friendsBlob.indexOf(uid+',')>-1);
}


/*
foursquare AJAX Wrappers
@param	that			Object		pass the this object of the current scene
@param	obj				Object		Contains various parameters for the GET request

		endpoint		String		Foursquare API endpoint (not full URL)
		parameters		Object		Key:value pairs of parameters to be sent
		requiresAuth	Boolean		If true, with provide HTTP Basic Auth header
		onSuccess		Function	Callback function to fire on successful response
		onFailure		Function	Callback function to fire on failed response
		ignoreErrors	Boolean		If true, does not display errors

		debug			Boolean		If true, logs the responseText to the console
*/
function foursquareGet(that,opts){
	var headers={};
	logthis("4sqget");
	if(opts!=undefined){
		logthis("has opts");
		if(opts.ignoreErrors==undefined){opts.ignoreErrors=false;}
		if(opts.endpoint==undefined){
			logthis("Foursquare API Fail: Missing endpoint");
			return false;
		}else{
			if(opts.parameters==undefined){
				opts.parameters={};
			}
			if(opts.requiresAuth){
				opts.parameters["oauth_token"]=_globals.token;
			}
			
			opts.parameters["v"]=_globals.v;
			logthis("getting endpoint data");
			var url = "https://api.foursquare.com/v2/"+opts.endpoint;
			var request = new Ajax.Request(url, {
			   method: 'get',
			   evalJSON: 'true',
			   parameters: opts.parameters,
			   requestHeaders: headers,
			   onSuccess: function(r){
			   		if(opts.debug){logthis("debug="+r.responseText);}
			   		logthis("code="+r.responseJSON.meta.code);
			   		//if(r.status!=0){
			   			if(r.responseJSON.meta.code=="200" || r.responseJSON.meta.code==200){
			   				opts.onSuccess(r);
			   			}else if(r.responseJSON.meta.errorType!=undefined){
			   				logthis("has error");
							if(opts.ignoreErrors!=true){
								logthis("not ignoring errors");
								/*var msg="";
								switch(r.responseJSON.meta.errorType){
									case "invalid_auth":
										msg="OAuth token was not provided or was invalid.";
										break;
									case "param_error":
										msg="A required parameter was missing or a parameter was malformed.";
										break;
									case "endpoint_error":
										msg="The requested path does not exist.";
										break;
									case "not_authorized":
										msg="Although authentication succeeded, the acting user is not allowed to see this information due to privacy restrictions.";
										break;
									case "rate_limit_exceeded":
										msg="Rate limit for this hour exceeded.";
										break;
									case "deprecated":
										msg="Something about this request is using deprecated functionality, or the response format may be about to change.";
										break;
									case "server_error":
										msg="Server is currently experiencing issues. Check status.foursquare.com for updates.";
										break;
									case "other":
										msg="An unknown error has occurred";
										break;
								}*/
							
								that.controller.showAlertDialog({
									onChoose: function(value) {opts.onFailure(r);},
									title: $L("Error"),
									message: $L(r.responseJSON.meta.errorDetail+"<br/>Endpoint: "+opts.endpoint),
									allowHTMLMessage: true,
									choices:[
										{label:$L('D\'oh!'), value:"OK", type:'primary'}
									]
								});
							}else{
								opts.onFailure(r);
							}
			   			}else if(r.responseJSON.ratelimited!=undefined){
							that.controller.showAlertDialog({
								onChoose: function(value) {opts.onFailure(r);},
								title: $L("Error"),
								message: $L(r.responseJSON.ratelimited+"<br/>Endpoint: "+opts.endpoint),
								allowHTMLMessage: true,
								choices:[
									{label:$L('D\'oh!'), value:"OK", type:'primary'}
								]
							});
			   			}else if(r.responseJSON.unauthorized!=undefined){
							that.controller.showAlertDialog({
								onChoose: function(value) {opts.onFailure(r);},
								title: $L("Error"),
								message: $L(r.responseJSON.unauthorized+"<br/>Endpoint: "+opts.endpoint),
								allowHTMLMessage: true,
								choices:[
									{label:$L('D\'oh!'), value:"OK", type:'primary'}
								]
							});
			   			}
			   		/*}else{
			   			opts.onFailure(r);		   							   		
			   		}*/
			   },
			   onFailure:  function(r){
			   	logthis("4sqget failed");
			   		if(opts.debug){"failed="+logthis(r.responseText);}
			   		if(r.status!=0){
			   			if(r.responseJSON.meta.errorType!=undefined){
							if(opts.ignoreErrors!=true){
							
								that.controller.showAlertDialog({
									onChoose: function(value) {opts.onFailure(r);},
									title: $L("Error"),
									message: $L(r.responseJSON.meta.errorDetail+"<br/>Endpoint: "+opts.endpoint),
									allowHTMLMessage: true,
									choices:[
										{label:$L('D\'oh!'), value:"OK", type:'primary'}
									]
								});

							}else{
								opts.onFailure(r);
							}
			   			}else if(r.responseJSON.ratelimited!=undefined){
							that.controller.showAlertDialog({
								onChoose: function(value) {opts.onFailure(r);},
								title: $L("Error"),
								message: $L(r.responseJSON.ratelimited+"<br/>Endpoint: "+opts.endpoint),
								allowHTMLMessage: true,
								choices:[
									{label:$L('D\'oh!'), value:"OK", type:'primary'}
								]
							});
			   			}else if(r.responseJSON.unauthorized!=undefined){
							that.controller.showAlertDialog({
								onChoose: function(value) {opts.onFailure(r);},
								title: $L("Error"),
								message: $L(r.responseJSON.unauthorized+"<br/>Endpoint: "+opts.endpoint),
								allowHTMLMessage: true,
								choices:[
									{label:$L('D\'oh!'), value:"OK", type:'primary'}
								]
							});
			   			}
			   		}else{
			   			opts.onFailure(r);		   							   		
			   		}
			   }
			 });
			
			
		}
	}
};

function foursquareGetMulti(that,opts){
	var headers={};
	logthis("4sqgetmulti");
	if(opts!=undefined){
		logthis("has opts");
		if(opts.ignoreErrors==undefined){opts.ignoreErrors=false;}
		if(opts.endpoints==undefined){
			logthis("Foursquare API Fail: Missing endpoint");
			return false;
		}else{
			logthis("getting endpoint data");
			var url = "https://api.foursquare.com/v2/multi?requests="+encodeURIComponent(opts.endpoints)+"&oauth_token="+_globals.token+"&v="+_globals.v;
			var urlu = "https://api.foursquare.com/v2/multi?requests="+(opts.endpoints)+"&oauth_token="+_globals.token;
			logthis("urlu="+urlu);
			logthis("url="+url);
			var request = new Ajax.Request(url, {
			   method: 'get',
			   evalJSON: 'true',
			   requestHeaders: headers,
			   onSuccess: function(r){
			   		if(opts.debug){logthis("debug="+r.responseText);}
			   		logthis("code="+r.responseJSON.meta.code);
			   		//if(r.status!=0){
			   			if(r.responseJSON.meta.code=="200" || r.responseJSON.meta.code==200){
			   				opts.onSuccess(r);
			   			}else if(r.responseJSON.meta.errorType!=undefined){
			   				logthis("has error");
							if(opts.ignoreErrors!=true){
								logthis("not ignoring errors");
								/*var msg="";
								switch(r.responseJSON.meta.errorType){
									case "invalid_auth":
										msg="OAuth token was not provided or was invalid.";
										break;
									case "param_error":
										msg="A required parameter was missing or a parameter was malformed.";
										break;
									case "endpoint_error":
										msg="The requested path does not exist.";
										break;
									case "not_authorized":
										msg="Although authentication succeeded, the acting user is not allowed to see this information due to privacy restrictions.";
										break;
									case "rate_limit_exceeded":
										msg="Rate limit for this hour exceeded.";
										break;
									case "deprecated":
										msg="Something about this request is using deprecated functionality, or the response format may be about to change.";
										break;
									case "server_error":
										msg="Server is currently experiencing issues. Check status.foursquare.com for updates.";
										break;
									case "other":
										msg="An unknown error has occurred";
										break;
								}*/
							
								that.controller.showAlertDialog({
									onChoose: function(value) {opts.onFailure(r);},
									title: $L("Error"),
									message: $L(r.responseJSON.meta.errorDetail+"<br/>Endpoint: "+opts.endpoint),
									allowHTMLMessage: true,
									choices:[
										{label:$L('D\'oh!'), value:"OK", type:'primary'}
									]
								});
							}else{
								opts.onFailure(r);
							}
			   			}else if(r.responseJSON.ratelimited!=undefined){
							that.controller.showAlertDialog({
								onChoose: function(value) {opts.onFailure(r);},
								title: $L("Error"),
								message: $L(r.responseJSON.ratelimited+"<br/>Endpoint: "+opts.endpoint),
								allowHTMLMessage: true,
								choices:[
									{label:$L('D\'oh!'), value:"OK", type:'primary'}
								]
							});
			   			}else if(r.responseJSON.unauthorized!=undefined){
							that.controller.showAlertDialog({
								onChoose: function(value) {opts.onFailure(r);},
								title: $L("Error"),
								message: $L(r.responseJSON.unauthorized+"<br/>Endpoint: "+opts.endpoint),
								allowHTMLMessage: true,
								choices:[
									{label:$L('D\'oh!'), value:"OK", type:'primary'}
								]
							});
			   			}
			   		/*}else{
			   			opts.onFailure(r);		   							   		
			   		}*/
			   },
			   onFailure:  function(r){
			   	logthis("4sqget failed");
			   		if(opts.debug){"failed="+logthis(r.responseText);}
			   		if(r.status!=0){
			   			if(r.responseJSON.meta.errorType!=undefined){
							if(opts.ignoreErrors!=true){
							
								that.controller.showAlertDialog({
									onChoose: function(value) {opts.onFailure(r);},
									title: $L("Error"),
									message: $L(r.responseJSON.meta.errorDetail+"<br/>Endpoint: "+opts.endpoint),
									allowHTMLMessage: true,
									choices:[
										{label:$L('D\'oh!'), value:"OK", type:'primary'}
									]
								});

							}else{
								opts.onFailure(r);
							}
			   			}else if(r.responseJSON.ratelimited!=undefined){
							that.controller.showAlertDialog({
								onChoose: function(value) {opts.onFailure(r);},
								title: $L("Error"),
								message: $L(r.responseJSON.ratelimited+"<br/>Endpoint: "+opts.endpoint),
								allowHTMLMessage: true,
								choices:[
									{label:$L('D\'oh!'), value:"OK", type:'primary'}
								]
							});
			   			}else if(r.responseJSON.unauthorized!=undefined){
							that.controller.showAlertDialog({
								onChoose: function(value) {opts.onFailure(r);},
								title: $L("Error"),
								message: $L(r.responseJSON.unauthorized+"<br/>Endpoint: "+opts.endpoint),
								allowHTMLMessage: true,
								choices:[
									{label:$L('D\'oh!'), value:"OK", type:'primary'}
								]
							});
			   			}
			   		}else{
			   			opts.onFailure(r);		   							   		
			   		}
			   }
			 });
			
			
		}
	}
};


function foursquarePost(that,opts){
	var headers={};
	if(opts!=undefined){
		if(opts.endpoint==undefined){
			logthis("Foursquare API Fail: Missing endpoint");
			return false;
		}else{
			if(opts.parameters==undefined){
				opts.parameters={};
			}
			if(opts.requiresAuth){
				opts.parameters["oauth_token"]=_globals.token;
			}
			
			opts.parameters["v"]=_globals.v;
			
			var url = "https://api.foursquare.com/v2/"+opts.endpoint;
			var request = new Ajax.Request(url, {
			   method: 'post',
			   evalJSON: 'true',
			   parameters: opts.parameters,
			   onSuccess: function(r){
			   		if(opts.debug){logthis(r.responseText);}
			   		if(r.status!=0){
			   			if(r.responseJSON.meta.code=="200" || r.responseJSON.meta.code==200){
			   				opts.onSuccess(r);
			   			}else if(r.responseJSON.meta.errorType!=undefined){
							if(r.responseJSON.meta.errorDetail.indexOf("Possible Duplicate")==-1){
								that.controller.showAlertDialog({
									onChoose: function(value) {opts.onFailure(r);},
									title: $L("Error"),
									message: $L(r.responseJSON.meta.errorDetail+"<br/>Endpoint: "+opts.endpoint),
									allowHTMLMessage: true,
									choices:[
										{label:$L('D\'oh!'), value:"OK", type:'primary'}
									]
								});
							}else{
								opts.onFailure(r);
							}
			   			}else if(r.responseJSON.ratelimited!=undefined){
							that.controller.showAlertDialog({
								onChoose: function(value) {opts.onFailure(r);},
								title: $L("Error"),
								message: $L(r.responseJSON.ratelimited+"<br/>Endpoint: "+opts.endpoint),
								allowHTMLMessage: true,
								choices:[
									{label:$L('D\'oh!'), value:"OK", type:'primary'}
								]
							});
			   			}else if(r.responseJSON.unauthorized!=undefined){
							that.controller.showAlertDialog({
								onChoose: function(value) {opts.onFailure(r);},
								title: $L("Error"),
								message: $L(r.responseJSON.unauthorized+"<br/>Endpoint: "+opts.endpoint),
								allowHTMLMessage: true,
								choices:[
									{label:$L('D\'oh!'), value:"OK", type:'primary'}
								]
							});
			   			}
			   		}else{
			   			opts.onFailure(r);		   							   		
			   		}
			   },
			   onFailure:  function(r){
			   		if(opts.debug){logthis(r.responseText);}
			   		if(r.status!=0){
			   			if(r.responseJSON.meta.errorType!=undefined){
							if(r.responseJSON.meta.errorDetail.indexOf("Possible Duplicate")==-1){
								that.controller.showAlertDialog({
									onChoose: function(value) {opts.onFailure(r);},
									title: $L("Error"),
									message: $L(r.responseJSON.meta.errorDetail+"<br/>Endpoint: "+opts.endpoint),
									allowHTMLMessage: true,
									choices:[
										{label:$L('D\'oh!'), value:"OK", type:'primary'}
									]
								});
							}else{
								opts.onFailure(r);
							}
			   			}else if(r.responseJSON.ratelimited!=undefined){
							that.controller.showAlertDialog({
								onChoose: function(value) {opts.onFailure(r);},
								title: $L("Error"),
								message: $L(r.responseJSON.ratelimited+"<br/>Endpoint: "+opts.endpoint),
								allowHTMLMessage: true,
								choices:[
									{label:$L('D\'oh!'), value:"OK", type:'primary'}
								]
							});
			   			}else if(r.responseJSON.unauthorized!=undefined){
							that.controller.showAlertDialog({
								onChoose: function(value) {opts.onFailure(r);},
								title: $L("Error"),
								message: $L(r.responseJSON.unauthorized+"<br/>Endpoint: "+opts.endpoint),
								allowHTMLMessage: true,
								choices:[
									{label:$L('D\'oh!'), value:"OK", type:'primary'}
								]
							});
			   			}
			   		}else{
			   			opts.onFailure(r);		   							   		
			   		}
			   }
			 });
			
			
		}
	}

};

function getElementsByClassName(classname,node){
	//function from: http://snipplr.com/view.php?codeview&id=1696
    if(!node) node = document.getElementsByTagName("body")[0];
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    return a;
}

function logthis(str){
	if(_globals.debugMode){
		Mojo.Log.error(str);
	}
}




_globals.userSuccess = function(response){
	logthis("user okay");
	var uid=response.responseJSON.user.id;
	var savetw=response.responseJSON.user.settings.sendtotwitter;
	var savefb=response.responseJSON.user.settings.sendtofacebook;
 	var ping=_globals.swf; //response.responseJSON.user.settings.pings;
	_globals.uid=uid;
	
	this.cookieData=new Mojo.Model.Cookie("credentials");
	this.cookieData.put({
		username: _globals.username,
		password: "",
		auth: _globals.auth,
		uid: uid,
		savetotwitter: savetw,
		savetofacebook: savefb,
		ping: ping,
		cityid: 0,
		city: ""
	});

	/* foursquareGet(this,{
	 	endpoint: 'friends.json',
	 	requiresAuth: true,
	 	parameters: {},
		onSuccess: this.getFriendsSuccess.bind(this),
	    onFailure: this.getFriendsFailed.bind(this)		 	
	 });*/
	 
	 
	 var url = "https://api.foursquare.com/v1/friends.json";
	 var request = new Ajax.Request(url, {
	   method: 'get',
	   evalJSON: 'force',
	   requestHeaders: {Authorization: _globals.auth},
	   onSuccess: _globals.getFriendsSuccess.bind(this),
	   onFailure: _globals.getFriendsFailed.bind(this)
	 });


}

_globals.getFriendsSuccess = function(response){
logthis("friends ok");
	if (response.responseJSON == undefined) {
		_globals.getFriendsFailed(response);
	}
	else {
		//Got Results... JSON responses vary based on result set, so I'm doing my best to catch all circumstances
		_globals.friendList2 = [];
		_globals.friendsBlob='';
		
		if(response.responseJSON.friends != undefined) {
			for(var f=0;f<response.responseJSON.friends.length;f++) {
				_globals.friendList2.push(response.responseJSON.friends[f]);
				_globals.friendList2[f].grouping="Friends";
				
				_globals.friendsBlob+=response.responseJSON.friends[f].id+',';
			}
		}
		
	}
	
	logthis(Object.toJSON(_globals.friendList2));

};

_globals.getFriendsFailed = function(r){
	logthis("friendfail="+r.responseText);

};

_globals.userFailed = function(r){
	logthis("ufail="+r.responseText);
}

_globals.relogin = function() {
	var url="https://api.foursquare.com/v2/multi?requests="+encodeURIComponent("/users/self,/settings/all,/users/requests")+"&oauth_token="+this.token;
	
	//this.controller.get('signupbutton').hide();
		
	this.request = new Ajax.Request(url, {
	   method: 'get',
	   evalJSON: 'true',
	   onSuccess: this.loginRequestSuccess.bind(this),
	   onFailure: this.loginRequestFailed.bindAsEventListener(this,false)
	 });

};

_globals.loginRequestSuccess = function(response) {
logthis("login ok");
logthis(response.responseText);
	var j=response.responseJSON;
	if(j.meta.code==200){
		userData = j.response.responses[0].response.user;
		var settings=j.response.responses[1].response.settings;
		var fname=userData.firstName;
		var lname=(userData.lastName)? ' '+userData.lastName: '';
		
		var uid=userData.id;
		var savetw=settings.sendToTwitter;
		var savefb=settings.sendToFacebook;
		var getPings=settings.receivePings;
		logthis(Object.toJSON(settings));
		var getComments=settings.receiveCommentPings;
		
		
		//handle friend requests
		_globals.requests='';
		for(var f=0;f<j.response.responses[2].response.requests.length;f++){
			var html=Mojo.View.render({template:'listtemplates/friend-requests',object:j.response.responses[2].response.requests[f]});
			_globals.requests+=html;
		}
		logthis("reqs="+_globals.requests);
		
		_globals.uid=uid;
		_globals.settings=settings;
		_globals.userData=userData;
		_globals.username=fname + lname;
		this.loggedIn=true;
		
		this.loginDone=true;
	}else{
		this.loginRequestFailed(response,true);
	}
};


_globals.loginRequestFailed = function(){
	logthis("login failed");
};

function callApp(inSender, appids, serviceParams, message) {
	 
	//var appids = this.appids; //['com.funkatron.app.spaz-sped', 'com.funkatron.app.spaz', 'com.funkatron.app.spaz-beta'];
	var index = 0;
    //just change your app ids if you are using a different app.
	function makeCall() {
		if (index < appids.length) {
 
			Mojo.Log.info('Trying to launch with appid %s', appids[index]);
 
			var request = new Mojo.Service.Request("palm://com.palm.applicationManager", {
				method: 'launch',
				parameters: {
					id: appids[index],
					params: serviceParams
				},
				onFailure: function() {
					Mojo.Log.info('Failed to launch with appid %s', appids[index]);
					index++; // go to next appid
					makeCall(); // retry
				}.bind(this)
			});
 
		} else {
			Mojo.Log.error('Failed to launch');                   
			// or alternatively you can prompt the user to download the app in question
			var currentScene = inSender.controller.stageController.activeScene();
			currentScene.showAlertDialog({title: $L("App Not Installed"),
				onChoose: function(value) {
					if (value == "INSTALL") {
						this.controller.serviceRequest("palm://com.palm.applicationManager", {
							method: "open",
							parameters: {
								id: 'com.palm.app.browser',
								params: {target: "http://developer.palm.com/appredirect/?packageid="+ appids[index]}
							}
						});
					}
				}.bind(inSender),
				message: $L(message),
				choices: [
					{label:$L('Install'), value:"INSTALL"},
					{label:$L('Continue'), value:"CLOSE"}
				]
			});
		}
 
	}
    makeCall();
}