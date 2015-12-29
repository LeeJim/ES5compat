
var bull = bull || {};

(function(root){

	/**
	 * return DOM object
	 * @param {number}
	 * @return {element}
	 */
	root.get = function(id) {
		return document.getElementById(id);
	};

	/**
	 * show debugger message
	 * @param {string}
	 */
	root.debugger = function(message) {
		try {
			console.log(message);
		}
		catch(e) {
			var debugBox = root.get('debug');
			if(debugBox) {
				debugBox.innerHTMl = 'message';
			}
			else {
				alert(message);
			}
		}
	};


	/**
	 * return params from url
	 * @param {string}
	 * @param {string}
	 * @return {string} 
	 */
	root.getUrlParam = function(sUrl, sKey) {
		var result = {};
	    sUrl.replace(/\??(\w+)=(\w+)/g,function(a,one,two) {
	    	if( typeof result[one] !== 'undefined') {
	    		var pre = result[one];
	    		result[one] = [].concat(pre,two);
	    	}
	    	else {
	    		result[one] = two;
	    	}
	    })
	    if( sKey !== undefined ) {
	    	return result[sKey];
	    }
	    else {
	    	return result;
	    }
	}
})(bull);