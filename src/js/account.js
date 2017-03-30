var account = (function(){
    var getSession = function(){
		var session = localStorage.getItem("session");
		return (session && typeof(session)!="undefined") ? eval("(" + session +")") : null;
	}
    return {
	 	getSession:getSession
	};
})()