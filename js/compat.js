
 (function(){

 	/*
 		@Array ECMAscript5 compat
 	*/

 	if( !Array.prototype.indexOf ) {
 		
 		Array.prototype.indexOf = function(searchElement, fromIndex) {
 			// 调用方，参数
 			// this? [] / null ---- [] -> return -1; null -> error
 			// typeof searchElement
 			// typeof fromIndex == int ? fromIndex : +fromIndex
 			// fromIndex = Infinity || fromIndex >= len || fromIndex <0 
 			if(this === null ) {
 				throw new TypeError(' "this" is null or not defined');
 			}

 			var O = Object(this);

 			var len = O.length >>> 0;

 			if( len == 0 ) return -1; // 如果数组为空直接返回-1

 			var n = +fromIndex || 0 ;

 			if( isFinite(n) ) n=0;

 			if( n>=len ) return -1;

 			var k = Math.max( n>=0 ? n : len-Math.abs(n) , 0 );

 			while( k < len ) {
 				if( k in O && O[k]==searchElement ) return k;
 				k++;
 			}

 			return -1;
 		}
 	}

 	if( !Array.prototype.forEach ) {

 		Array.prototype.forEach = function(callback, context) {

 			if( this === null || typeof this === 'undefined' ) throw new TypeError();

 			var len = this.length;

 			if( len==0 ) throw new TypeError();
			
			var isFunc = Object.prototype.toString.call(callback) === '[object Function]';
			
			if( isFunc ) {
				
				for(var i=0; i<len; i++) {
					//if context = undefined or null {context = window}  :auto
					callback.call(context, this[i], i, this);
				}
			}

 		}
 	}


 	if( !Array.prototype.map ) {

 		Array.prototype.map = function(callback, context) {

 			var result = [];

 			if( this === null || typeof this === 'undefined' ) throw new TypeError();

 			var len = this.length;

 			if( len==0 ) throw new TypeError();

 			var isFunc = Object.prototype.toString.call(callback) === '[object Function]';
			
			if( isFunc ) {
				
				for(var i=0; i<len; i++) {
					//if context = undefined or null {context = window}  :auto
					result.push( callback.call(context, this[i], i, this) );
				}

				return result;
			}
 		}
 	}


 	if( !Array.prototype.every ) {

 		Array.prototype.every = function(callback, context) {

 			if( this === null || typeof this === 'undefined' ) throw new TypeError();

 			var len = this.length;

 			if( len==0 ) throw new TypeError();

 			var isFunc = Object.prototype.toString.call(callback) === '[object Function]';
			
			if( isFunc ) {
				
				for(var i=0; i<len; i++) {
					//if context = undefined or null {context = window}  :auto
					if( !callback.call(context, this[i], i, this) ) return false;
				}

				return true;
			}
 		}
 	}

 	if( !Array.prototype.some ) {

 		Array.prototype.some = function(callback, context) {

 			if( this === null || typeof this === 'undefined' ) throw new TypeError();

 			var len = this.length;

 			if( len==0 ) throw new TypeError();

 			var isFunc = Object.prototype.toString.call(callback) === '[object Function]';
			
			if( isFunc ) {
				
				for(var i=0; i<len; i++) {
					//if context = undefined or null {context = window}  :auto
					if( callback.call(context, this[i], i, this) ) return true;
				}

				return false;
			}
 		}
 	}


 	if( !Array.prototype.filter ) {

 		Array.prototype.filter = function(callback, context) {

 			var result = [];

 			if( this === null || typeof this === 'undefined' ) throw new TypeError();

 			var len = this.length;

 			if( len==0 ) throw new TypeError();

 			var isFunc = Object.prototype.toString.call(callback) === '[object Function]';
			
			if( isFunc ) {
				
				for(var i=0; i<len; i++) {
					//if context = undefined or null {context = window}  :auto
					if( callback.call(context, this[i], i, this) ) result.push(this[i]);
				}

				return result;
			}
 		}
 	}


 	if( !Array.prototype.reduce ) {

 		Array.prototype.reduce = function(callback, initialValue) {

 			if( this === null || typeof this === 'undefined' ) throw new TypeError();

 			var len = this.length;

 			var O = Object(this);

 			if( len==0 ) throw new TypeError();

 			var isFunc = Object.prototype.toString.call(callback) === '[object Function]';
			
			if( isFunc ) {

				var isValueSet = false,
					value;

				if( arguments.length > 1 ) isValueSet = true;

				var func = function(i) {
					if( !isValueSet ) {
						value = O[i];
						func = function(i) {
							value = callback(value, O[i], i, O);
						}
					}
					else {
						value = callback(initialValue, O[i], i, O);
						func = function(i) {
							value = callback(value, O[i], i, O);
						}
					}
					
				};

				for(var i=0; i<len; i++) {
					//if context = undefined or null {context = window}  :auto
					func(i);
				}

				return value;
			}
 		}
 	}

 	if( !Array.prototype.uniq ) {
 		Array.prototype.uniq = function () {
 		    var newArr = [];
 		    var hasNaN = false;
 		    if(this === null || typeof this === 'undefined') throw new TypeError();
 		    var len = this.length;
 		    var O = Object(this);
 		    if(len===1) return this;
 		    for(var i=0; i<len; i++) {
 		    	var isNew = (newArr.indexOf(this[i]) === -1);
 		    	if( !hasNaN && O[i]!==O[i] ) {
 		    		hasNaN = true;
 		    		newArr.push(O[i]);
 		    	}
 		    	if( hasNaN && O[i]!==O[i] ) continue;
 		    	else if( i in O && isNew ) {
 		    		newArr.push(O[i]);
 		    	}
 		    }	
 		    return newArr;
 		}
 	}
 	
 	if( Array.isArray ) {
 		Array.isArray = function(o) {
 			return Object.prototype.toString.call(o) === '[object Array]';
 		}
 	}

 })()
