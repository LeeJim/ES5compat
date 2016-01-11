
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
	/**
	 * format data echo
	 * @param {Date}
	 * @param {string}
	 * @return {string}
	 */
	root.formatDate = function(oDate, sFormation) {

	    var year = oDate.getFullYear(),
	    	month = oDate.getMonth()+1,
	    	date = oDate.getDate(),
	    	hour = oDate.getHours(),
	    	min = oDate.getMinutes(),
	    	second = oDate.getSeconds(),
	    	day = oDate.getDay();

	    var cnDay = '日一二三四五六'.split('');
	    var fmNum = function(num) { return num < 10 ? ('0' + num) : num; };

	    return sFormation
	    				.replace(/yyyy/,year)
	    				.replace(/yy/,year%100)
	    				.replace(/MM/,fmNum(month))
	    				.replace(/M/,month)
	    				.replace(/dd/,fmNum(date))
	    				.replace(/d/,date)
	    				.replace(/HH/,fmNum(hour))
	    				.replace(/H/,hour)
	    				.replace(/hh/,fmNum(hour%12))
	    				.replace(/h/,hour%12 )	    				
	    				.replace(/mm/,fmNum(min))
	    				.replace(/m/,min)
	    				.replace(/ss/,fmNum(second))
	    				.replace(/s/,second)
	    				.replace(/w/,cnDay[day]);
	}

	/**
	 * transform rgb to hex
	 * @param {string}
	 * @return {string}
	 */
	root.rgb2hex = function(sRGB) {
	    
	    var result;

	    var fix = function(n) {
	    	var n = parseInt(n);
	    	return ( n < 16 ? '0' : '' ) + (n.toString(16)) ;
	    }

	    sRGB.replace(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/g, function(a, r, g, b) {
	    	if( r>255 || g>255 || b>255 ) return;
	    	result = '#' + fix(r) + fix(g) + fix(b);
	    });

		return result || sRGB;

	}

})(bull);