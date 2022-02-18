/*
  *
  * Digital is a javascript library 
  * open source 
  * copyright 2021
  *
  * 
  * author Fr@nck Pertinent
  * 10franckpertinent@gmail.com
  * 
  *
*/

( function ( symbols, factory, needed ) {

	"use strict";

	/*
	  * firstly we have to verify if Digital
	  * can be support by this support
	  * Digital can only be supported
	  * by platform which have got an
	  * object window, and an object 
	  * document
	*/

	if ( needed.call( this, typeof window === 'undefined' ? this : window ) ) {

		/*
		  * if digital can be
		  * support by this support
		*/

		return factory( symbols );
	}

} )( function ( wn, doc ) {

	"use strict";

	/*
	  * now we can start our obect
	  * in this space because you know that
	  * it will be support by this support 
	*/

	var 
	    Storage = {
			__active__name__: '',
			varList: { },
			cssVar: { },
			storeList: [],
		    animationData: [ ],  // list of all elements created by the object
		    digitalList: [ ],
			animationFunc: [ ],
		    animationList: {    
		    	// list of all animations created by this object
		    	initialList: [
		    	    /*
		    	      * list of all actif animation
		    	      * actived
		    	    */
				],
		    	nodes: [], 
		    	queu: [
		    	    /* 
		    	      * list of Spall queu activate
		    	      * int the document
		    	    */
		    	],
		    },
			addStore: function ( store ) {
				    this.storeList.push( store );
				return this;
			},
			getStore: function ( node ) {
				var store;
				    Digital.each( this.storeList, function () {
						if ( this.node === node ) {
							store = this;
						}
					} );
				    if ( !node )
				    	this.addStore( store = new Manager.DataStore( node ) );
				return store;
			},
			addQueu: function ( node, queu ) {
				    this.animationList.queu.push( {
						node: node,
						queu: queu
					} );
				    this.animationList.nodes.push( node );
				return this;
			},
			getAnimationById: function ( id ) {
				var 
				    arr = Storage.animationList.initialList,
					result = [];
					    arr.each( function () {
							if ( this.getId() === id )
								result.push( this.node );
						} );
				return arr;
			},
			put: function ( animation ) {
				    this.animationData.push( animation );
				return this;	
			},
		    get: function ( node ) {
		    	/*
		    	  * return a queu  of the 
		    	  * variable node
		    	  * node is an HTMLElment
		    	*/
		    	return Digital.call( function () {
		    		var 
		    		    _this = this,
		    		    list = _this.animationList.queu,
		    		    result = '';
    
		    		    list.each( function () {
		    		    	var 
		    		    	    obj = this,
		    		    	    keyNode = obj.node;
     
		    		    	    if ( Digital.tools.isElement( node ) && node.isSameNode( keyNode ) )
		    		    	     	result = obj.queu;
		    		    } );

		    		return result ? result : Digital.call( function () {
		    			var 
		    			    queu = new Manager.animation.Queu( '*', node );
		    			    this.animationList.queu.push( {
		    			   	    node: node,
		    			   	    queu: queu
		    			    } );
    
		    			    this.animationList.nodes.push( node );
			   	    	return queu;
			   	    }, this );
			    }, this ) ;
		    },
			analyse: function ( state ) {
				var 
				    result = [],
					arr = this.animationData;
					    arr.each( function () {
							if ( !state ) {
								result.push( {
								    node: this.node,
								    state: this.state
							    } );
							}
							else if( this.state === state ) {
								result.push( this.node );
							}
						} );
				return result;
			},
			setVar: function ( key, val ) {
				    this.varList[ key ] = val;
				return this;
			},
			setCssVar: function ( key, val ) {
				    this.cssVar[ key ] = val;
				return this;
			},
			getVar: function ( key ) {
				return this.varList[ key ];
			},
			getVarCss: function ( key ) {
				return this.cssVar[ key ];
			}
	    };
	/*
	  * proxy is supported in all navigator 
	  * without internet explorer
	*/
	var 
	    isProxySupported = "Proxy" in wn ,
	    storage = ( "localStorage" in wn ) ? wn.localStorage : false,
	    session = ( "sessionStorage" in wn ) ? wn.sessionStorage : false,

	    Manager = {
		    /*
		      * we use storage to store all
		      * needed in this context
		    */

		    animation: {}, // for manage animation
		    dom: {}, // for manager the dom
		    api: {
				internalApi: { },
                externalApi: { }
			}, // for manage some api
		    ajax: { }, // fot manage the ajax Api
			listener: function ( fx ) {
				var listener;
				    fx = Digital.tools.isFunction( fx ) ? fx : function () {
						return;	
					};
				    listener = new Digital.fn.storage.UniversalObject( { fx: fx } );
					listener.setAll( {
						end: function () {
							this.datas.fx.call( { }, this );
						}
					} );
				return listener;
			}
	    };
    
	/**
	    * @typedef {Object} Digital
		* @property {Boolean} strictActivate
		* @property {Object} fn
		* @property {Function} rand
		* @property {Function} crypto
		* @property {Function} css
		* @property {Function} each
		* @property {Object} tools
	*/
	var Digital = {
		    /*
		      * this object will content all datas
		      * about Digital object
		    */
		    /* 
		      * for use the scrict
		      * mode
		    */
		    strictActivate: false,
		    proxyModeActivate: false,
		    dispatchAnimation: true,
			lessModeActivate: false,
			tools: { },
			fn: { }
	};

	var DigitalStorage = {
		    length: 0,
		    contentDatas: {},
		    listOfNativemethods: [],
		    add: function ( key, val ) {
				Digital.builder[ key ] = val;
		    	this.length++;
		    	if ( this.listOfNativemethods.indexOf( key ) == -1 ) {
					this.addLikeNative( key );
		    	}
		    	return true;
		    },
		    addLikeNative: function ( key ) {
		    	return this.listOfNativemethods.push( key );	
		    }
	};

	DigitalStorage.setItem = function ( key, val ) {
        /*
           * setItem will add a item of
           * alias method which can be 
           * access like this Digital[ #key ]
           * anywher, it is an impotant
           * part of the library
        */
		if ( key && Digital.tools.isString( key ) ) {
			  this[ "#" + key ] = val;
			  this.add( "#" + key, val );
			return true;
		}
		return DigitalStorage;
	};
    
	/**
	    * @param {String} key
		* @returns {String} 
	*/
	DigitalStorage.getItem = function ( key ) {
		/*
		  * get an item which
		  * we have set 
		*/
		return this[ '#' + key ];
	};

	/** 
	  *
	  * @param {Object} Digital.tools 
	  * tools need for 
	  * the function
	*/

	Digital.tools = {
		isFunction: function ( param ) {
			if ( typeof param  == "function" ) {
				return true;
			}
			else{
				return false;
			}
		},
		isArray: function ( param ) {
			/*
			  * verifie if the 
			  * parameter is valid
			*/
			if ( Array.isArray ) {
				return Array.isArray( param );
			}
		    return Object.prototype.toString.call( param ) == '[objectArray]';
		},
		isString: function ( param ) {
			/*
			  * verify if the parameter has got the
			  * type string
			*/
			return ( typeof param == "string" || param instanceof String ) ? true : false;
		},
		isNumber: function ( param ) {
			/*
			  * verify if the parameter has got the
			  * type string
			*/
			return ( ( param || param === 0 ) && param.toString() !== "NaN" && ( typeof param == "number" || param instanceof Number ) ) ? true : false;
		},
		isBoolean: function ( param ) {
			/*
			  * verifi is the param is the type
			  * boolean
			*/
			return ( param === true || param === false ) ? true : false;
		},
		isObject: function ( param ) {
			/*
			  * verifi is the param is the type
			  * object
			*/
			return ( typeof param == "object" ) ? true : false;
		},
		isElement: function ( node ) {
			return ( node instanceof Element ) ? true : false;
		},
		error: function ( name ) {
			throw new Error( "( Digital ) : " + name );
		},
		create: function ( node ) {
			return doc.createElement( node );
		},
		createText: function ( node ) {
			return doc.createTextNode( node );
		},
		/** 
			* @param {Function} fn
			* @param {Array} array
			* @param {Array|Object} params
			* @param {Object} params 
			*
			* permit to apply the same function
			* on a list of param
			*
			* params is the list of the 
			* parameter of the fucntion
			*
			* _ represent the type of the
			* main object
		*/
		each: function ( array, fn, params, _ ) {
			_ = _ && Digital.tools.isObject( _ ) ? _ : {};
			params = params && Digital.tools.isArray( params ) ? params : [];
			var 
			    i = 0,
			    option,
			    arr = [],
			    _res,
			    _final_ = Digital.tools.isArray( params || _.require ) ? [] : {};

			if ( Digital.tools.isArray( array ) || Digital.tools.isString( array ) ) {
				for ( ; i < array.length; i++ ) {
                    arr = arr.concat( params );
                    /*
                      * we add the index
                      * in the list of parameter
                    */
                    arr.unshift( i );
					_res = fn.apply( array[ i ], arr );
					if ( _res === false &&  _.type === "strict" ) {
						break;
					}
					if ( Digital.tools.isArray( _final_ ) ) {
						_final_.push( _res );
					}
					else if ( _res ) {
						_final_[ _res.name ] = _res.value;
					}
				}
			}
			else if ( Digital.tools.isObject( array ) ) {
				for ( option in array ) {
                    arr = arr.concat( params );
                    /* 
                      * when we create a Digital
                      * instance of window object
                      * we have to verify if the 
                      * method isn't begin by webkit
                    */
                    /*
                      * we add the name ( option ) of
                      * the object property at the head 
                      * of the parameters list
                    */
                    arr.unshift( option );
                    _res = _.type === "particular" 
                            ? fn.apply( {}, arr )
                            : fn.apply( array[ option ], arr );
                        if ( _res === false &&  _.type === "strict" ) {
                        	break;
                        }
                    if ( Digital.tools.isArray( _final_ ) ) {
                    	_final_.push( _res );
                    }
                    else if ( _res ) {
                    	_final_[ _res.name ] = _res.value;
                    }
				}
			}
			else{
				return Digital.tools.error( "( each ) parameter1 wrong parameter type" );
			}
			return _final_;
		},
		update: function ( object, parameters, filter ) {
			/*
			  * permit to update
			  * an object and add new function
			  * at this object, update is the base 
			  * of all extends function in 
			  * digital
			*/
			var 
			    isFunction = Digital.tools.isFunction;
			if ( ( Digital.tools.isObject( object ) || Digital.tools.isFunction( object ) ) && Digital.tools.isObject( parameters ) ) {
				Digital.tools.each( parameters, function ( name ) {
					if ( filter && isFunction( filter ) ) {
						if ( filter( this , name ) ) {
							if ( !object[ name ] ) {
								object[ name ] = this;
							}
						}
					}
					else{
						if ( !object[ name ] ) {
							object[ name ] = this;
						}
					}
				} );
			}
		},
		extends: function ( parameters ) {
			var obj = this;
			/*
			  * extend permit to add new
			  * function at the Digital.tools
			*/
			return Digital.tools.update( this, parameters, function ( param ) {
				return ( param && obj.isFunction( param ) ) ? true : false;
			} );
		},
		call: function ( callback, context ) {
			/** 
			  * @param {Function} callback
			  * @param {Object} context 
			  * init is use like 
			  * function auto
			  * invoked
			*/
			return callback.call( context || {} , this );
		},
		shave: function ( array ) {
			/** 
			  *
			  * @param {Array} array 
			  * shave is use to return a 
			  * normalyse type
			  * if the array in param is [ arg1, arg2 ],
			  * shave return the same array, else if 
			  * the array is [ arg1 ] shave return arg1
			*/
			
			if ( !Digital.tools.isArray( array ) ) {
				return array;
			}
			else if ( array.length == 0 ) {
				return "";
			}
			else {
				if ( array.length == 1 ) {
				    return array[ 0 ];
			    }
			    else {
			    	return array;
			    }
			}
		},
		emptyFunction: function () {
			return;
		}
	};

	/** 
	  *
	  * @param {object} Digital.strict  
	  * for manage the scrict 
	  * mode
	*/

	Digital.strict = function ( arg ) {
		/*
		  * we strict mode we can use many other new
		  * thing we can't in the initial mode
		  * like the selector {node} and {{node}}
		*/
		if ( arg === true || arg === false ) {
			Digital.strictActivate = arg;
		}
		else if ( Digital.tools.isFunction( arg ) ) {
			Digital.strictActivate = true;
			arg.call( 
				Digital.builder, 
				Digital.builder 
			);
		}
		return this;
	};

	Digital.proxy = function ( arg ) {
		/*
		  * we active proxy mot to many other
		  * digital function like $( selector ).background() || $( selector ).background( "color" )
		  * so we can access at the css property 
		  * as a digital method and you can set
		  * or get any attributes like $( selector ).attribute_name() // $( selector ).attribute_name( value )
		*/
		Digital.proxyModeActivate = ( arg === true ) 
			? true 
			: false;
		
		if ( Digital.tools.isFunction( arg ) ) {
			Digital.proxyModeActivate = true;
			arg.call( 
				Digital.builder, 
				Digital.builder 
			);
		}
		return this;
	};

	Digital.less = function ( params, fx ) {
		if ( Digital.tools.isBoolean( params ) ) {
			    Digital.lessModeActivate = params;
			return this;
		}
		else{
			params = Digital.tools.isObject( params ) ? params : { };
			fx = Digital.tools.isFunction( fx ) ? fx : Digital.tools.emptyFunction;
			        Digital.each( params, function ( name ) {
				    	if ( !Digital.init.prototype[ name ] ) {
				    		var 
				    			datas = {};
				    			datas[ name ] = Digital.init.prototype[ this ];
				    		Digital.builder.extends(
								Digital.builder.METHOD,
								datas
							);
				    	}
				    } );
				Digital.less( true );
				fx.call( { }, Digital.builder );
			return this;
		}
	};

	/**
	   * 
	   * @param {arguments} args 
	   * @returns {Object{{Function} is, {Function} each, {Function} get, {Function} length, {Array} list }}
	*/

	function argsManager ( args ) {
		var 
			list = Array.from( args );
		return {
			is: function () {
				return list.length > 0;
			},
			each: function ( fn ) {
				Digital.each( list, function () {
					return fn( this );
				} );

				return this;
			},
			get: function ( n ) {
				return list[ n >= 0 ? n : length + n ];
			},
			length: function () {
				return list.length;
			},
			list: list
		};
	};
    
	/**
	   *  
	   * @param {Object} _ 
	   * @returns {Boolean}
	*/
	function set( _ ) {
		return ( _ !== undefined && _ !== null )
	};

	/*
	  * for add
	  * some function
	*/

	Digital.fn = {
		/*
		  * content all
		  * needed special fn;
		*/
		temp: {
			tmp: [],
			auto: function ( _obj_ ) {
				Digital.each( this.tmp, function ( ) {
					if ( Digital.tools.isFunction( this ) )
						this.call( _obj_, _obj_, {} );
				} );
				return this;
			},
			setAuto: function ( callback ) {
				    callback = Digital.tools.isFunction( callback ) ? callback : Digital.tools.emptyFunction;
				    this.tmp.push( callback );
				return this;
			},
			is: function () {
				return this.tmp.length;
			}
		}, // will be use with animation an strict mode
		storage: {}, // content all datas necessary 
	};

	function applyCss( obj, prop ) {
		function apply( val ) {
			return obj.css( prop, val );
		};
		return apply;
	};

	function applyAttr( obj, attribute ) {
		function apply( val ) {
			return obj.attr( attribute, val );
		};
		return apply;
	};

	Digital.init = function ( selector, context ) {
		/*
		  * is the main object
		  * of Digital 

		  * we use it for init all
		  * function
		*/

		Digital.update( this, {
			selector: selector,
			selectorList: [ ],
			context: context,
			litteralSelector: selector
		} );

		this.fx = {
			fx: {
				/*
				   * it will be used only if
				   * proxy is supported so 
				   * in all navigator without
				   * InteretExplorer
				*/
			}
		};

		this.start(); // we start all process

        /*
          * now we can add the proxy
          * to manage the usage of the 
          * native html methods and
          * property
        */

		if ( isProxySupported && Digital.proxyModeActivate ) {
			var _this = new Proxy( this, {
				get: function ( _, _val_ ) {
					/*
					  * '_' content the target object
					  * and _val_ the search value
					*/
					return _[ _val_ ] ? 
					        /*
					           * if the value is content in the
					           * prototype of the object we can just
					           * return this _val_
					        */
					        _[ _val_ ] :
					        /*
					          * if she isn't content we can search this
					          * value in the .fx ( list of all function )
					          * of the object
					        */
					        _.fx[ _val_ ] || 
					        /*
					          * we verify in first if the
					          * object exist
					        */
					        ( !_.selector[ 0 ] ) ? Digital.tools.error( "( " + _val_ + ") is not a digital property or method" ) :
					        /*
					          * if _val_ is a css property we have to return 
					          * apply css
					        */
					        ( _.selector[ 0 ].style && typeof _.selector[ 0 ].style[ _val_ ] == "string" ) ? 
					        /*
					          * if _val_ is not a css property
					          * we will you it like attibute
					        */
					        applyCss( _, _val_ ) : applyAttr( _, _val_ );
				}
			} );
			return _this;
		}
	};

	Digital.init.prototype = {
		toString: function () {
			return '[Object Digital]';
		}
	};

	Digital.fn.internalFunction = {
		const: 'INTERNAL.FUCNTION',
		extends: function ( parameters ) {
			/*
			  * for update internal
			  * function
			*/
			var 
			    obj = Digital.tools;
			return obj.update( this, parameters, function ( param ) {
				return obj.isFunction( param );
			} );
		}
	};

	Digital.fn.externalFunction = {
		const: 'EXTERNAL.FUNCTION',
		extends: function ( parameters ) {
			/*
			  * for update 
			  * external function
			*/
			return Digital.tools.update( this, parameters, function ( param ) {
			    return param ? true : false;
			} );
		}
	};

	Digital.init.extends = function ( context, parameters ) {
		/*
		  * for add prototype at
		  * the object
		*/
		if ( !Digital.tools.isObject( context ) )
			return false;
		var 
		    init = Digital.init,
		    isFunction = Digital.tools.isFunction,
		    error = Digital.tools.error;

        if ( context.const === 'EXTERNAL.FUNCTION' && parameters && Digital.tools.isObject( parameters ) ) {
            Digital.tools.each( parameters, function ( name ) {    
                Digital.builder[ name ] = this;
            } );
        }
        else
		if ( parameters && Digital.tools.isObject( parameters ) ) {
			Digital.tools.each( parameters, function ( name ) {
				if ( !isFunction( this ) )
					return error( "( Digital.init.extends ) wrong parameter type" );
				        if ( !hasProp.call( init, name ) )
					    	init.prototype[ name ] = this;
			} );
		}
		return this;
	};

	Digital.builder = function ( selector, context ) {
		/*
		  * now we can build our digital
		  * object and return the instance 
		  * of this object
		*/
		var 
		    _obj_ = new Digital.init( selector, context );
			Storage
			    .digitalList
		        .push( _obj_ );
            /*
              * now if there is an
              * auto caller function we
              * apply this function to
              * digital
            */
		    if ( Digital.fn.temp.is() )
		    	Digital.fn.temp.auto( _obj_ );
		return _obj_;
	};

	function parseCss ( param ) {
		if ( Digital.builder.isObject( param ) ) {
			var 
			    result = '',
				data = '';
			    Digital.each( param, function ( name ) {
			    	result += name + '(';
			    	if ( Digital.builder.isArray( this ) ) {
			    		data = '';
			    		    Digital.each( this, function () {
			    		    	data += this + ',';
			    		    } );
						if ( data )
							result += data.substring( 0, data.length -1 );
							else 
							    result += data;
			    	}
			    	else{
			    		result += this + ')';
			    	}
			    } );
			return result;
		}
		else{
			return param;
		}
	};

	function analyseValue( val ) {
		var 
		    reg = /^var\((.{1,})\)$/ig,
			result = '';
		if ( reg.test( val ) ) {
			reg.exec( val );
			    result = ( RegExp.$1 || '' ).trim();
				result = Storage.getVarCss( result );
			return result;
		}
		else{
			return val;
		}
	};

	function setProp ( node, props ) {
	    Digital.each( props, function ( name ) {
	    	node.style[ Digital.controls.camelCase( name ) ] = parseCss(
				analyseValue( this )
			);
	    } );
	};

	function setAttr ( node, attributes ) {
	    Digital.each( attributes, function ( name ) {
	    	node.setAttribute( name, this );
	    } );
	};
	/*
	  * we can start to use the dom
	  * object
	*/
	Digital.HTMLFn = {
		html: function ( nodes, value ) {
			/*
			  * we use this function
			  * to get the content of any
			  * html element
			*/
			var 
			    arr = [];
			if ( this.isArray( nodes ) ) {
				Digital.each( nodes, function () {
					if ( set( value ) ) {
						this.innerHTML = value;
					}
					else{
						arr.push( this.innerHTML || this.innerText );
					}
				} );
				return arr;

			}else{
				return false;
			}
		},
		css: function ( nodes, prop, val ) {
			/*
			  * for set a 
			  * property css or get a
			  * value of a property css
			*/
			var 
			    obj = this,
			    arr = [ ];

			if ( this.isArray( nodes ) ) {
				Digital.each( nodes, function () {
			        var 
			            node = this,
			            computedStyle = getComputedStyle( node, null );
			        obj.isObject( prop ) ? Digital.call( function () {
			       	    /*
			       	      * if is object the var
			       	      * prop
			       	    */
			       	    return setProp( node, prop );
			        } ) : val && prop? Digital.call( function () {
			       	    var 
						    datas = {};
			       	        datas[ prop ] = val;
			       	    return setProp( node, datas );
			        } ) : arr.push( computedStyle[ prop ] );

				} );
				return arr;
			}
			else{
				return false;
			}
		},
		attr: function ( nodes, attribute, value ) {
			/*
			  * for set a 
			  * property css or get a
			  * value of a property css
			*/
			var 
			    obj = this,
			    arr = [];

			if ( this.isArray( nodes ) ) {
				Digital.each( nodes, function () {
					/*
					  * of the parameter is
					  * an object we have to run it
					  * an set his values
					*/
					obj.isObject( attribute ) 
					    ? setAttr( this, attribute )
					        /*
					          * else if there is the
					          * attribute and his value
					          * we can set it
					        */
					    : value && set( attribute )
					        ? this.setAttribute( attribute, value )
					            /*
					              * else if there is only
					              * the attribute name we have
					              * to return his value
					            */
					            : obj.isString( attribute ) 
								? arr.push( this.getAttribute( attribute ) ): false;
				} );

				return arr;
			}
			else{
				return false;
			}
		}
	};

	Digital.eval = function () {
		var 
		    str = '',
			args = Array.from( arguments );
			    Digital.each( args, function () {
					str += this;
				} );
		return eval( str );
	};

	// we can now add tools
	// function att this object

	Digital.tools.update( 
		Digital.HTMLFn, 
		Digital.tools 
	);

	Digital.render = function ( obj, context ) {
		if ( isString( obj ) || isNumber( obj ) ) {
			return createText( obj );
		}
		else{
			context = context || '';
			var 
				node = create( obj.el );
				    Digital.each( obj, function ( name ) {
						if( name !== 'content' && name !== 'el' ){
							if ( isFunction( this ) ) {
								node[ 'on' + name ] = this;
							}
							else {
								if ( name === 'css' ) {
								    Digital.css( [ node ], this );
							    }
							    else{
							    	node.setAttribute( name, this );
							    }
							}
						}
					} );
				if ( obj.content ) {
					if ( ( isObject( obj.content ) && !isArray( obj.content ) ) || isString( obj.content ) ) {
						node.appendChild( 
							Digital.render( obj.content ) 
						);
					}
					else if ( isArray( obj.content ) ) {
						if ( obj.content.length === 2 && isNumber( obj.content[ 1 ] ) ) {
							var 
							    content = obj.content[ 0 ],
								length = obj.content[ 1 ];
							Digital.each( Digital.range( 0, length ), function ( ) {
								node.appendChild(
									Digital.render( content )
								);
							} );
						}
						else{
							Digital.each( obj.content, function ( ) {
							    node.appendChild( 
							    	Digital.render( this ) 
							    );
						    } );
						}
					}
				}
				node.appendChild( Digital.render( context ) );
			return node;
		}
	};
	var 
        isFunction = Digital.tools.isFunction,

        isBoolean = Digital.tools.isBoolean,

        isObject = Digital.tools.isObject,

        isArray = Digital.tools.isArray,

        isNumber = Digital.tools.isNumber,

        isString = Digital.tools.isString,

        create = Digital.tools.create,

        createText = Digital.tools.createText,

        error = Digital.tools.error,

        isElement = Digital.tools.isElement,

        toolsList = Digital.tools;

    var 
       hasProp = Object.hasOwnProperty,
       getProp = Object.getPrototypeOf,

	   indexOf = String.prototype.indexOf,
	   _num_reg_ = /^-?\d{1,}$/i;

    Digital.tools.each( [ "call", "update", "shave", "each" ], function () {
    	Digital[ this ] = Digital.tools[ this ];
    } );

    /*
      * all filsters for the selection
      * there are two type of filter
    */

    Digital.fn.FilterList = {
		props: {
			toArray: function ( list, separator, condition ) {
				return condition === true 
									? ( list || '' ).split( separator ).map( function ( el ) {
										return el.trim();
									} ) 
									: ( list || '' ).split( separator );
			},
			toObject: function ( list, s1, s2, condition ) {
				var 
					arr = ( list || '' ).split( s1 ),
					result = {};
					    Digital.each( arr, function () {
							var 
								item = this.split( s2 );
								condition === true 
												? result[ item[ 0 ].trim() ] = item[ 1 ].trim()
												: result[ item[ 0 ] ] = item[ 1 ];
						} );  

				return result;
			},
			array: function ( s1, condition ) {
				return this.toArray( this.list, s1, condition );
			},
			object: function ( s1, s2, condition ) {
				return this.toObject( this.list, s1, s2, condition );
			}
		},
    	"{initial}": {},
    	"{pseudo}": {
			odd: function ( els, props, obj ) {
				props.list = 'odd';
				return obj[ '{func}' ][ 'n' ]( els, props );
			},
			even: function ( els, props, obj ) {
				props.list = 'even';
				return obj[ '{func}' ][ 'n' ]( els, props );
			},
			first: function ( els, props, obj ) {
				props.list = '0';
				return obj[ '{func}' ][ 'n' ]( els, props );
			},
			last: function ( els, props, obj ) {
				props.list = '-1';
				return obj[ '{func}' ][ 'n' ]( els, props );
			},
			disabled: function ( els ) {
				var 
					arr = [],
					list = [ 'input', 'select', 'textarea' ];
					Digital.each( els, function () {
						if ( this.disabled === true && list.indexOf( this.nodeName.toLowerCase() ) != -1 ) {
							arr.push( this );
						}
					} );
				
				return arr;
			},
			enabled: function ( els ) {
				var 
					arr = [],
					list = [ 'input', 'select', 'textarea' ];
					Digital.each( els, function () {
						if ( this.disabled === false && list.indexOf( this.nodeName.toLowerCase() ) != -1 ) {
							arr.push( this );
						}
					} );
				
				return arr;
			},
			required: function ( els ) {
				var 
					arr = [],
					list = [ 'input', 'select', 'textarea' ];
					Digital.each( els, function () {
						if ( this.required === true && list.indexOf( this.nodeName.toLowerCase() ) != -1 )
							arr.push( this );
					} );
				
				return arr;
			},
			optional: function ( els ) {
				var 
					arr = [],
					list = [ 'input', 'select', 'textarea' ];
					Digital.each( els, function () {
						if ( this.required === false && list.indexOf( this.nodeName.toLowerCase() ) != -1 )
							arr.push( this );
					} );
				
				return arr;
			}
		},
    	"{func}": {
			n: function ( els, propList ) {
				var 
				    props = propList.array( ',' ),
					n = props[ 0 ].trim(),
					arr = [];
			    return !_num_reg_.test( n ) ? Digital.call( function () {
					    if ( n === 'odd' || n === 'even' ) {
					    	var 
					            index = n === 'odd' ? 1 : 0;
					                for ( ; index < els.length; index += 2 )
					    	    		arr.push( els[ index ] );
					    }
						else if ( !n && _num_reg_.test( ( props[ 1 ] || '' ).trim() ) ) {
							n =  parseInt( props[ 1 ].trim() );
							n = ( n >= 0 ? n : els.length + n ) + 1;
						        Digital.each( Digital.range( 0, n ), function ( ) {
							    	arr.push( els[ this ] );
							    } );
						}
					    else{
							if ( !n )
								return arr;

							if ( propList.list.search( 'e' ) !== -1 ) {
								var 
							    	steps = Digital.eval( propList.list.replace( 'e', 0 ).trim() );
									Digital.each( Digital.range( steps, els.length, steps ), function () {
										arr.push( els[ this ] );
									} );
							}
							else{
								n = n.replace( '=', '' );
					    	    var 
							    	index = Digital.eval( 0, n );
					                    for ( ; index < els.length; index = Digital.eval( index, n ) )
					    	        		arr.push( els[ index ] );
							}
						}
				    return arr;
				} ) : Digital.call( function () {
					if ( props.length === 1 || props.length > 2 ) {
						n = props;
					    Digital.each( props, function () {
							var 
								item = parseInt( this );
								arr.push( item >= 0 ? els[ item ] : els[ els.length + item ] );
						} );
					}
					else{
						var 
						    n1 = parseInt( props[ 0 ].trim() ),
							n2 = parseInt( props[ 1 ].trim() );
						if ( isNaN( n2 ) ) {
							n = n1 >= 0 ? n1 : els.length + n1;
							Digital.each( Digital.range( n, els.length ), function ( ) {
								arr.push( els[ this ] );
							} );
						}
						else {
							if ( n1 <  n2 && n1 > 0 ) {
							    n1 = n1 >= 0 ? n1 : els.length + n1;
							    n2 = ( n2 >= 0 ? n2 : els.length + n2 ) + 1;
							    Digital.each( Digital.range( n1, n2 ), function ( ) {
							    	arr.push( els[ this ] );
							    } );
						    }
						    else{
						    	Digital.each( props, function () {
						    	    var 
						    	    	item = parseInt( this );
						    	    	arr.push( item >= 0 ? els[ item ] : els[ els.length + item ] );
						        } );
						    }
						}
					}
					return arr;
				} );
			},
			childs: function ( nodes, props ) {
				var 
					_new_node_ = Digital
									.builder( nodes )
									.childs( props.list );
				return _new_node_.selectorList;
			},
			next: function ( nodes, props ) {
				var 
					_new_node_ = Digital
									.builder( nodes )
									.next( props.list );
				return _new_node_.selectorList;
			},
			prev: function ( nodes, props ) {
				var 
					_new_node_ = Digital
									.builder( nodes )
									.prev( props.list );
				return _new_node_.selectorList;
			},
			input: function ( nodes, props ) {
				var 
					arr = [],
					type = props.list.trim();
					    Digital.each( nodes, function () {
					    	if ( this.type === type && this.nodeName.toLowerCase() === 'input' )
					    	    arr.push( this );
					    } );
				
				return arr;
			},
			not: function ( nodes, props ) {
				var 
				    arr = [],
					_list_ = Digital
								.builder( props.list )
								.selectorList;
						Digital.each( nodes, function () {
							if ( _list_.indexOf( this ) === -1 )
							    arr.push( this );
						} );
				
				return arr;
			},
			css: function ( els, props ) {
				var 
					arr = [],
					verif = true,
					list = props.object( ',', '=', true );
					    Digital.each( els, function () {
							var 
								item = this;
								verif = true;
								Digital.each( list, function ( name ) {
									var 
										val = Digital.shave(
											Digital.css( [ item ], name )
										);
									if ( val !== list[ name ] )
									    verif = false;
								} );
							if ( verif )
							   arr.push( item );
						} );
				return arr;
			}
		},
    	isInitial: function ( node ) {
    		var _inital_list_ = this[ '{initial}' ];
    		var _verif = false;

    		    Digital.each( _inital_list_, function ( name ) {
    		    	if ( this.test( node ) ) {
    		    		_verif = true;
    		    	}
    		    }  );

    		return _verif;
    	},
    	isPseudo: function ( node ) {
    		var 
			    _inital_list_ = this[ '{pseudo}' ],
    		    _second_list = this[ '{func}' ];
    		        /^([\w\d]*)(\(.*\))?$/i.exec( node );
    		        node = RegExp.$1;

    		return ( node in _inital_list_ || node in _second_list );
    	},
    	init: function ( base, _first_pseudo_ ) {
			var 
				_inital_list_ = this[ '{initial}' ],
				_base_ = base;

    		    Digital.each( _inital_list_, function ( ) {
					_base_ = this( _base_ );
				}  );

    		return _base_ + _first_pseudo_;
    	},
    	filter: function ( nodes, filter_name, value ) {
			var 
				funcs = this[ '{func}' ],
				pseudos = this[ '{pseudo}' ],
				list = [],
				item;
				nodes = isArray( nodes ) ? nodes : [];
				    if ( _num_reg_.test( filter_name ) ){
						this.props.list = filter_name;
			        		item = this[ '{func}' ].n( nodes, this.props, this );
							isArray( item ) ? list = list.concat( item ) : list.push( item );
					}
					else if ( value ) {
			        	if ( filter_name in funcs ) {
							this.props.list = value;
			        		item = this[ '{func}' ][ filter_name ]( nodes, this.props, this );
							isArray( item ) ? list = list.concat( item ) : list.push( item );
			        	}
			        	else
			        	    error(  filter_name + ' Is not a valid pseudo-element in Digital' );
			        }
			        else{
			        	if ( filter_name in pseudos ) {
							this.props.list = value;
			        		item = this[ '{pseudo}' ][ filter_name ]( nodes, this.props, this );
			        		isArray( item ) ? list = list.concat( item ) : list.push( item );
			        	}
			        	else
			        	    error(  filter_name + ' Is not a valid pseudo-element in Digital' );
					}

			return list;
		},
		types: {
			'FUNC': '{func}',
			'PSEUDO': '{pseudo}',
			'INITIAL': '{initial}'
		},
		extends: function ( param, type ) {
			var 
				types = type || this.types.PSEUDO,
				obj = this[ types ];
				if ( isObject( param ) )
				    Digital.each( param, function ( name ) {
						if ( !obj[ name ] && !___pseudo____change____.test( name ) )
							return obj[ name ] = this;
							    error( name + ' Is already a _pseudo_element_ of Digital' );
					} );
			return this;
		}
	};
	
	var 
        ___pseudo___basic___function___ = /:([\w\-]{1,}\([\w\s\*\+\-\/\=\,#\?]{1,}\))/ig,
        ___pseudo___intermediate___function___ = /:([\w\-]{1,}\((([\w\s\$:\.\+\-\*#\?>]{1,}),?){1,}\))/ig,
		___pseudo___css___ = /:(\{[^:]{1,}\})/ig,
		___pseudo___html___attr___selector___ = /(\[([\w\s]{1,})(=|\*=|\|=|\^=|\$=)?((\s{1,}"[^"\(\)]{1,}"\s{1,})|([^"\(\)]{1,}))?\])/ig,
        ___pseudo____class___ = /:[\w\$\-]{1,}|:\{[^:]{1,}\}/ig,
        ___part___selector___ = /([^:]{0,})((:[\w\$\-]{1,}|:\{[^:]{1,}\}){0,})/ig,
        ___group___selector___ = /([^,]{0,},?)/ig,
        ___pseudo____change____ = /:(\$[0-9]{1,})/ig,
		___pseudo____change____attr___ = /(\$[0-9]{1,})/ig,
		___base___ = ':not( html, meta, link, head, head > script )',
        ___index___ = 0,
        ___storage___ = {},
            ___repare___ = function ( str ) {
                return str.replace( ___pseudo____change____, function ( str, $1 ) {
                    return ':' + ___storage___[ $1 ];
                } );
            },
			___repare___base___ = function ( str ) {
				while( ___pseudo____change____attr___.test( str ) )
				    str = str.replace( ___pseudo____change____attr___, function ( str, $1 ) {
                        return ___storage___[ $1 ];
                    } );
				return str;
			},
            ___change___ = function ( str, reg, base ) {
                return str.replace( reg, function ( str, $1 ) {
                    var 
                        key = '$' + ___index___;
                        ___storage___[ key ] = $1;
                        ___index___++;
                    return base + key;
                } )
            },
            ___clean___ = function ( arr ) {
                var 
                    result = [],
                    index;
                        for ( index = 0; index < arr.length; index++ ) {
                            if( arr[ index ] )
                                result.push( arr[ index ].trim() );
                        }
                return result;
            },
            ___replace___final___ = function ( str ) {
                var 
                    list = [],
                    item = '',
                    test = false,
                    data = ___clean___( str.match( ___pseudo____class___ ) || [] );
                    for ( var index = 0; index < data.length; index++ ) {
                        item = data[ index ];
                        test = ___pseudo____change____.test( item );
                            while( test ) {
                                item = ___repare___( item );
                                test = ___pseudo____change____.test( item );
                            }
                        list.push( item );
                    }

                return list;
            },
            ___build___ = function ( str ) {
                var 
                    data = new RegExp( ___part___selector___ ).exec( str ),
					response = '',
                    result = {
                        el: '*',
                        speudo: []
					};
                    
					response = ___repare___base___( data[ 1 ].trim() );
                    result.el = response || '*';
					result.speudo = ___replace___final___( data[ 2 ] || '' );
			        if ( !response )
						result.speudo.unshift( ___base___ );
                return result;
            },
            ___build___group___ = function ( str ) {
                var 
                    result = {
                        parts: [],
                        length: 0
                    },
                    data = str.match( ___part___selector___ ) || [];
                    data = ___clean___( data );
                        for ( var index = 0; index < data.length; index++ ) {
                            result.parts.push( ___build___( data[ index ] ) );
                            result.length++;
                        }
                return result;
			},
			___pre___build___ = function ( str ) {
				while( ___pseudo___html___attr___selector___.test( str ) )
					str = ___change___( str, ___pseudo___html___attr___selector___, '' );

				    while( ___pseudo___css___.test( str ) )
						str = ___change___( str, ___pseudo___css___, ':' );
						
				        while( ___pseudo___basic___function___.test( str ) )
							str = ___change___( str, ___pseudo___basic___function___, ':' );
							
				            while( ___pseudo___intermediate___function___.test( str ) )
				            	str = ___change___( str, ___pseudo___intermediate___function___, ':' );
				return str;
			},
            ___analyse___ = function ( str ) {
                str = ___pre___build___( str || ___base___ );
                var 
                    final = [],
                    index = 0,
                    item = '',
                    result = ( str ? str : '*' ).match( ___group___selector___ );
                    result = ___clean___( result || [] );
                        for ( index = 0; index < result.length; index++ ) {
                            item = result[ index ];
                                if( item[ item.length - 1 ] === ',' )
                                    final.push( ___build___group___( item.substring( 0, item.length - 1 ) ) );
                                        else
                                            final.push( ___build___group___( item ) );
                        }
                return final;
            };

	Digital.fn.Picker = {
		query: function ( selector ) {
			try {
				return doc.querySelectorAll( selector );
			} catch( e ) {
				return Digital
							.tools
							.error( "( Digital.fn.Picker.query ) (" + selector + ") not valid selector" );
			}
		},
		clean: function ( array ) {
			if ( array.length == 0 ) {
				return Digital
							.tools
							.error( "( Digital.fn.Picker.query ) not valid selector" );
			}
			else{
				return array;
			}
		},
		finalise: function ( arr ) {
			var 
			    result = [];
			    Digital.tools.each( arr, function () {
			    	if ( result.indexOf( this ) == -1 && this ) {
			    		result.push( this );
			    	}
			    });
			return result;
		},
		break: function ( word, by ) {
			
			return word.split( by );
		},
		thereIs: function ( str ) {
			var 
				obj = Digital.fn.FilterList;
			
			return obj.isPseudo( str );
		},
		isNative: function ( str ) {
			var 
			    /*
			        * list of all pseudo class css
			        * of the first type
			        * from de MDN Documentation
			    */
                _pseudo_func_ = ( 'dir host has hos-context is lang not nth-child nth-col '
                                + 'nth-last nth-last-of-type nth-of-type where' ).split( ' ' ),
			    /*
                    * list of all pseudo class css 
                    * of the second type
                */
			    _pseudo_element_ = ( 'active any-link blank checked current default defined disabled '
			                    + 'drop empty enabled first first-child first-of-type fullscreen focus '
			                    + 'future focus-visible focus-within host hover interminate in-range inavlid '
			                    + 'last-child last-of-type left link local-link only-child only-of-type optional '
			                    + 'out-of-range past placeholder-shown read-only read-write required right root scope '
								+ 'target target-within user-invalid valid visited' ).split( ' ' );	
			
			var 
				i1 = _pseudo_func_.indexOf( str ),
				i2 = _pseudo_element_.indexOf( str );
			
			return i1 >= 0 ? i1 : i2;
		},
		getData: function ( str ) {
			var 
				_pseudo_fn_ = /^:([\w\$\-]{1,})\((.{1,})\)$/ig,
				_pseudo_el_ = /^:([\w\$\-]{1,})$/,
				___pseudo___css___ = /^:\{(.{1,})\}$/,
				result = [],
				obj = {};
			        if ( ___pseudo___css___.test( str ) ) {
						result = new RegExp( ___pseudo___css___ ).exec( str );
						obj = {
							name: 'css',
							val: result[ 1 ]
						};
					}
			        else if ( _pseudo_fn_.test( str ) ) {
						result = new RegExp( _pseudo_fn_ ).exec( str );
						obj = {
							name: result[ 1 ],
							val: result[ 2 ]
						};
					}
			        else {
						result = new RegExp( _pseudo_el_ ).exec( str );
						obj = {
							name: result[ 1 ],
							val: ''
						};
					}
			
			return obj;
		},
		isKey: function ( key ) {
			var 
			    list = [ '>', '+', '~' ];

		    return list.indexOf( key ) !== -1;
		},
		getKeySpeudo: function ( key ) {
			var 
			    list = [ '>', '+', '~' ];

		    return list.indexOf( key ) === 0 
			        ? 'childs' : list.indexOf( key ) === 1 
					? 'next' : "nextAll";
		},
		getBase: function ( base, __ ) {
			var 
				obj = Digital.fn.FilterList,
				initialKey = '',
				finalKey = '',
				final = '';
				base = base.trim();
			
			initialKey = base[ 0 ];
			finalKey = base[ base.length - 1 ];
			if ( !this.isKey( initialKey ) && !this.isKey( finalKey ) ) {
				final = Digital.shave(
					Array.from(
						this.query(
							obj.init( base, __ )
						)
					)
				);
				return {
					list: final
				}
			}
			else{
				base = this.isKey( initialKey )
				                ? base.substring( 1, base.length )
								: base.substring( 0, base.length - 1 );

				final = Digital.shave(
					Array.from(
						this.query(
							obj.init( base, __ )
						)
					)
				);

				return {
					list: final,
					keys: {
						type: this.isKey( initialKey )  ? 'i' : 'f',
						key: this.isKey( initialKey ) ? initialKey : finalKey
					}
				};
			}
		},
		build: function ( part, _ ) {
			var 
				base = part.el,
				result = {},
				final = {},
				item = { name: '', val: '' },
				obj = Digital.fn.FilterList,
				_first_pseudo_ = '',
				speudo = [],
				native = true;
				    for ( var index = 0; index < part.speudo.length; index++ ) {
						item = this.getData( part.speudo[ index ] );
						if( native ){
							if ( this.isNative( item.name ) >= 0 && !this.thereIs( item.name ) ) {
								_first_pseudo_ = !item.val ? 
														':' + item.name : 
														':' + item.name + '(' + item.val + ')';
							}
							else{
								native = false;
								speudo.push( item );
							}
						}
						else
						    speudo.push( item );
					}
                result = this.getBase(
                	base,
                	_first_pseudo_
                );
				base = result.list;
				
				if( !result.keys ) {
					Digital.each( speudo, function () {
					    base = obj.filter( isArray( base ) 
						                    ? base 
											: [ base ], this.name, this.val );
				    } );

					final = {
						el: base
					};
				}
				else{
					if ( result.keys.type === 'f' ) {
						var 
						    rest = _ || this.getBase( '*', '' ).list;
						    Digital.each( speudo, function () {
					            rest = obj.filter( isArray( rest ) 
						                            ? rest 
						        					: [ rest ], this.name, this.val );
				            } );

						base = obj.filter( base, this.getKeySpeudo( result.keys.key ), rest );
						final = {
							el: base
						};
					}
					else{
						Digital.each( speudo, function () {
					        base = obj.filter( isArray( base ) 
						                        ? base 
						    					: [ base ], this.name, this.val );
				        } );

					    final = {
					    	el: base,
							keys: result.keys.key
					    };
					}
				}
			return final;
		},
		buildGroup: function ( group, _ ) {
			var 
				prev = '', part,
				obj = Digital.fn.FilterList,
				length = group.length;
				    for ( var index = 0; index < length; index++ ) {
						part = this.build( group.parts[ index ], _ );
						if ( prev )
							prev = part.keys 
							                ?  obj.filter( prev, this.getKeySpeudo( part.keys ), part.el )
											:  obj.filter( prev, 'childs', part.el );
								else
								    prev = part.el;
					}
            return prev;
		},
		start: function ( selector, _node_, _ ) {
			if ( selector instanceof Element ) {
				return [ selector ];
			}
			else if ( isObject( selector ) && !isArray( selector ) ) {
				if ( selector instanceof Digital.init ) {
					return selector.selectorList;
				}
				else if ( !( 'el' in selector ) ){
					return selector;
				}
				else{
					return [ Digital.render( selector, Digital.call( function () {
						if ( _node_ ) {
							var 
							    context = _node_.context;
							if ( ( isObject( context ) && 'el' in context ) || isArray( context ) || set( context ) ) {
							    	_node_.context = {};
							    return context;
							}
							return '';
						}
						else{
							return '';
						}
					} ) ) ];
				}
			}
			else if ( isArray( selector ) ) {
				var 
					arr = [],
					obj = this;
				    Digital.each( selector, function () {
						var
						    result = Digital.shave( obj.start( this ) );
						isArray( result ) ? arr = arr.concat( result ) : arr.push( result );
					} );
				return this.finalise( arr );
			}

			var 
			    arr = [],
			    object = this,
				data = ___analyse___( selector );
			        Digital.each( data, function () {
			        	var 
			        		result = object.buildGroup( this, _ );
			        		isArray( result ) ? arr = arr.concat( result ) : arr.push( result );
					} );
			return this.finalise( arr );
		}
	};

	Digital.init.extends( Digital.fn.internalFunction, {
		html: function ( value ) {
			var 
			    res = '', final = '', 
				_this = this,
				args = argsManager( arguments );
				args.each( function ( data ) {
				    final += data;
			    } );
			res = Digital.call( function ( ) {
				return set( value ) ? Digital.tools.shave(
			        Digital
				    	.HTMLFn
				    	.html( _this.selectorList, final )
			    ) : Digital.tools.shave(
			        Digital
				    	.HTMLFn
				    	.html( _this.selectorList )
			    );
			} );
			return ( args.length() ) ? this : res ;
		},
		css: function ( prop, val ) {
			var 
				res = Digital
							.tools
							.shave( 
								Digital
									.HTMLFn
									.css( this.selectorList, prop, val ) 
							);

			return ( Digital.tools.isObject( prop ) || ( prop && val ) ) ? this : res;
		},
		attr: function ( attribute, val ) {
			var 
				res = Digital
						.tools
						.shave( 
							Digital
								.HTMLFn
								.attr( this.selectorList, attribute, val ) 
						);
			return ( Digital.tools.isObject( attribute ) || ( attribute && val ) )? this : res;
		},
		each: function ( fn, type, filter ) {
			    Digital.tools.each( 
					this.selectorList, 
					fn, type, filter
				);
			return this;
		},
		text: function () {
			/*
			  * for return a text content
			  * in any html element
			*/
			var args =  argsManager( arguments );

			if ( args.is() ) {
                this.each( function () {
                	this.textContent = Digital.call( function () {
						var 
							text = '';
							args.each( function ( part ) {
								text += part;
							} );

						return text;
					} );
                } );
				return this;
			}
			else {
				var 
				    arr = [];
				        this.each( function () {
				        	arr.push( this.textContent || this.innerText );
				        } );
				return Digital.tools.shave( arr );
			}
		}
	} );
    
    /*
      * all mains function
      * of Digital
    */
    var 
       /*
    		* like the previous RegExp this one use the native
    		* html code, but in a deffirent way
    		* Example: <div></div> so here we have to have an open tag
    		* and a close tag which by ">" and begin by "</"
    		* we can add attributes or content inside the tag
    	*/
		_html_tag_1_ = /^<([a-z1-6]{1,})([^><]{0,})>(.*?)<\/([a-z1-6]*)>$/im,
		/*
    		* this RegExp is used to create simple html using single
    		* tag, this tag can content attributes and others things
    		* Examples: <div/> ( this tag have to end with '/>' )
    		* we can also do <div id='name'/> here  `"` or `'` isn't
    		* request but you can use it.
    	*/
		_html_tag_2_ = /^<([a-z1-6]*)([^><]{0,})\/>$/i,
		/*
    		* RegExp fo the selector like {div},
    		* to create and html element we cans also add
    		* attributes like {div id=name syle=background:red; }
    		* or {div id='name' syle='background:red;' }
    		* or {div id="name" syle="background:red;" }
    	*/
		_html_speceial_tag_ = /^\{([a-z1-6]*)([^><]{0,})\}$/ig,
		/*
    		* this RegExp is using to create quickly
    		* [ TextNode ] without use any other function
    		* it own selector is {{string}}, string correspond
    		* at the content of the [ TextNode ]
    	*/
		_html_text_node = /^\{\{(.*?)\}\}$/ig,
		/*
		    * This RegExp is used to 
			* get attributes data of an expression   
		*/
		_attribute_reg_ = /([a-z0-9\-]*)=?(".*")?('.*')?([\w\;\:\-%]*)?/ig;

    Digital.init.extends( Digital.fn.internalFunction, {
    	start: function () {
    		/*
    		  * start is the first function which call
    		  * when a new [ DigitalObject ] is create
    		  * so it have to add all data about
    		  * selector and content
    		*/
    		var 
			    context = this.context,
			    selector = this.selector;

			this.length = 0;
    		this.setDatas( selector, context );
    	},
    	getAttributeDatas: function ( char ) {
    		/*
    			* char is the type string, this function
    			* have to return all attributes and their values
    			* content in a string
    		*/
    	    if ( isString( char ) ) {
    		    char = char.trim();
    		    var 
				    obj = {};
    					/*
    					   * reg can matches all type of attributes content 
    					   * in a string with different for like id=name
    					   * it can be also match id="name" and id='name'
    					   * event the empty attribut can be match 
    					   * like download
    					*/
    					var 
						    reg = _attribute_reg_,
    					    list = char.match( reg );
    					    Digital.each( list, function () {
    					        if ( this ) {
    					            var keys = this.split( "=" );			
    					            if ( keys.length == 1 ) {
    					              obj[ keys[ 0 ] ] = keys[ 0 ];
    					            }
    					            else {
    					              obj[ keys[ 0 ] ] = keys[ 1 ].replace( /['|"]/ig, "" );
    					            }
    					        }
    					    } );

    		    return obj;
    	    }
    	    else {
    		    return {};
    	    }
        },
    	setDatas: function ( selector, context ) {
    		var 
    		   _remove_unmatch = function ( _arr_ ) {
    		   	   if ( Digital.tools.isArray( _arr_ ) ) {
                      var final = [];

    		   	   	     Digital.tools
    		   	   	            .each( _arr_, function () {
    		   	   	         	    if ( this ) {
    		   	   	         		        final.push( this );
    		   	   	         	    }
    		   	   	            }, [ ] );

    		   	   	  return final;
    		   	   }
    		   	   else {
    		   	   	  return _arr_;
    		   	   }
    		   };

    	    if ( isFunction( selector ) ) {
    			/*
    				* if selector is Function
    				* we have to wait that the 
    				* page will charge
    			*/
				return Digital
				            .builder( doc )
				            .ready( function ( ) {
								selector.call( {}, Digital.builder );
							} );
    	    }
    	    else if ( isString( selector ) ) {
    			/*
    				* if selector is string, we have to
    				* choice between create a new object
    				* or select any html element
    			*/
				selector = selector
				                .replace( /(\n|\t|\r)/ig, '' )
				                .trim(); 
				var 
				    getAttributeDatas = this.getAttributeDatas;
    								
    				if ( _html_text_node.test( selector ) && Digital.strictActivate ) {
    					_html_text_node.exec( selector );

    						var datas = RegExp.$1;
    							  this.setSelector( createText( datas ), context, true );
    			   }
    			   else
    			   if ( _html_speceial_tag_.test( selector ) && Digital.strictActivate ) {
    				    _html_speceial_tag_.exec( selector ); // for gat all data

    						var 
							    nodeName = RegExp.$1,
    						    attributes = RegExp.$2;
    						if ( nodeName && isString( nodeName ) ) {
    							    this.setSelector( create( nodeName ), context, true );
    							    /*
    							      * if there are
    							      * attributes
    							    */
    								if ( attributes && isString( attributes ) ) {
    									var obj = getAttributeDatas( attributes.trim() );
    									this.attr( obj );
    							    }
    						}
    						else{
    							/*
    							  * if the haven't a node name, we can
    							  * go forward so we have to generate 
    							  * an error
    							*/
    							error( "( " + selector + " ) is not a valid selector" );
    						}
    			    }
    				else if ( _html_tag_2_.test( selector ) ) {
    					_html_tag_2_.exec( selector ); // for get all data
    						var 
							    nodeName = RegExp.$1, // tag name
    						    attributes = RegExp.$2; // tag attributes

    							if ( nodeName && isString( nodeName ) ) {
    								this.setSelector( create( nodeName ), context, true );
    								    if ( attributes && isString( attributes ) ) {
    								    	/*
    								    	  * if there is attributes we have to
    								    	  * add them at the object
    								    	  * if it possible
    								    	*/
    										var obj = getAttributeDatas( attributes.trim() );
    										      this.attr( obj );
    									}
    							}
    							else{
    								error( "( " + selector + " ) is not a valid selector" );
    							}
    			    }
    				else if ( _html_tag_1_.test( selector ) ) {
						_html_tag_1_.exec( selector ); // for get all data
							var 
							    nodeName = RegExp.$1, // name of the tag
    						    attributes = RegExp.$2, // attributes of the tag
							    content = RegExp.$3; // content of the  tag

    					        if ( nodeName && isString( nodeName ) ) {
    									this.setSelector( create( nodeName ), context, true );
    										if ( attributes && isString( attributes ) ) {
    											var obj = getAttributeDatas( attributes );
    											this.attr( obj );
    										}
    										if ( content && isString( content ) ) {
    											this.html( content );
    										}
    							}
    							else{
    								error( "( " + selector + " ) is not a valid selector" );
    							}
    				}
    				else{
    				    var 
						    _obj = Digital
						                .fn.Picker
    				                    .start( selector, this );

    					this.setSelector(
    						_remove_unmatch( _obj ), 
    						context, 
    						true
    				    );
    				}
    		}
    	    else {
    	    	/*
    	    	  * if object is not a Element
    	    	  * or the selector is not
    	    	  * a string
				*/
    		    var _obj;
    				_obj = Digital
					            .fn.Picker
							    .start( selector, this );
                	this.setSelector(
                		_remove_unmatch( _obj ), 
                		context, 
                		true
                    );
    	    }
    	},
    	setSelector: function ( selector, context, indice ) {
    		/*
    		  * now we can apply the context at all
    		  * selected element
    		*/
    		var 
    		   _index = 0,
    		   _this = this;

    		_this.selectorList = ( isArray( selector ) ) ? selector :  [ selector ];
    		_this.selector = Digital.shave( selector );

    		if ( !indice ) {
    			_this.selector = getProp( selector );
    			_this.selectorList = getProp( selector );
    		}
            /*
              * it's this part of the
              * Digital Object which made it
              * like and array because it will
              * list all element of the selector
              * and the list array item and affeted
              * length property of the array
            */
    		if ( indice && _this.selectorList.length >= 1 ) {
    			_this.each( function () {
    				_this[ _index ] = this;
    				_index++;
    			} );

    			_this.length = _this.selectorList.length;
    		}

    		if ( _this.selector ) {
    			_this.cloneFunction();
    			if ( indice ) {
					context = toolsList.isEmptyObject( this.context || { } ) ? ( context || this.context ) : this.context;
    				_this.applyContext( context );
    			}
    		}

    		return _this;
    	},
    	cloneFunction: function () {
    		/*
    		  * now we have to apply at all object
    		  * methods of all selected object
    		*/
    		var 
    		    object = isProxySupported  && Digital.proxyModeActivate ? this.fx : this,
    		    _localNames = [ ];
    		this.each( function () {
    			/*
    			  * we have to verify if we have already
    			  * use and object with the same type
    			  * to add its method to digital
    			*/
    			var 
    			    node = this,
    			    verif = false;
                Digital.each( _localNames, function () {
                	if ( this == node.localName ) {
                		    verif = true;
                		return;
                	}
                } );
                if ( verif )
                	return;

                _localNames.push( this.localName );
    			Digital.each( this, function ( name ) {
    				if ( Digital.fn.dom[ name ] ) {
    					/*
    					  * if a native html function has
    					  * got the same name that a
    					  * Digital function we have to 
    					  * continu
    					*/
    					return;
    				}
    				
    				var 
    				    event_reg = /^on([a-z]*)$/i,
    				    _isEventMethod = false,
    				    initialname = name;

    				if ( event_reg.test( name ) ) {
    					/*
    					  * we its a event method
    					  * we have to remove the 'on'
    					  * at the begining with
    					  * this RegExp
    					*/
    					event_reg.exec( name );
    					name = RegExp.$1;
    					_isEventMethod = true;
    				}

    				if ( ! ( name in object ) ) {
						if ( isNumber( parseInt( name ) ) )
						    return;
    					object[ name ] = function () {
    						var 
							    _this = this,
    						    _params = Array.from( arguments ),
    						    arr = [],
    						    _res;
    						_this.each( function () {
    							/*
    							  * because all methods of the
    							  * object are content in
    							  * object.fc 
    							*/
    							_res = object.fx[ name ].apply( this, _params );
								if ( _res instanceof Digital.init && arr.length == 0 ) {
									arr.push( _res );
								}
								else if ( !( _res instanceof Digital.init ) ) {
									arr.push( _res );
								}
    						} );
    						return Digital.shave( arr );
    					};
    				}
    				/*
    				  * the are several type of
    				  * function 
    				  *
    				  * Example focus is a native method but when we remove
    				  * (on) on ( onfocus ) we will have two fonction which
    				  * the name focus  
    				*/
    				if ( _isEventMethod ) {
    					object.fx[ name ] = function ( fn ) {
    						var 
							    _this = this;
    						if ( fn && isFunction( fn ) ) {
    							/*
    							  * we set the event
    							  * parameter
    							*/
    							    _this[ initialname ] = fn;
    							return object;
    						}
    						else {
    							if ( _this[ name ] && isFunction( _this[ name  ] )  ) {
    								    _this[ name ].call( this, Digital.events( 'click' ) );
    								return object;
    							}
    							else {
    								    _this[ name ] = null;
    								return object;
    							}
    						}
    					};
    				}
    				else{
    					if (  name in object.fx ) {
    						/*
    						  * if there is a method
    						  * in fx who have got the same 
    						  * name that mean that we have
    						  * already add this method
    						  * in our object
    						*/
    						return;
    					}
    					var _fn;
    					    object.fx[ name ] = function () {
    					    	/*
    					    	  * we create an Array which
    					    	  * content all parameter
    					    	*/
    					    	var 
								    _arg = Array.from( arguments  ),
    					    	    _this = this;
    					    	    _fn = this[ name ];
    					    	if ( isFunction( _fn ) ) { 
    					    		/*
    					    		  * if the function doesn't return anything
    					    		  * we can return the main object
    					    		*/
    					    		    var 
									        _res = _fn.apply( _this, _arg );
    					    		return ( _res === undefined ) ? object : _res;
    					    	}
    					    	else {
    					    		/*
    					    		  * in this case _this[ name ] is 
    					    		  * an property so if there is a value
    					    		  * we have to set the value else we have to
    					    		  * return the value of the property
									*/
    					    		return _arg[ 0 ] ? Digital.tools.call( function () {
    					    		        /*
    					    		          * this is an autocalled
    					    		          * function
    					    		        */
    					    		            _this[ name ] = _arg[ 0 ];
    					    		        return object;
    					    		} ) : _this[ name ];
    					    	}
    					    };

    				}

    			}, [ ], {
    				/*
    				  * we use the type particular for
    				  * indicate to the function that the
    				  * first parameter is not a litteral 
    				  * object, that is a Document or element
    				  * object
    				*/
    				type: "particular",
    				/*
    				  * require is the type of
    				  * element returner by the
    				  * array
    				*/
    				require: []
    			} );
    		} );

    		return this;
    	},
    	applyContext: function ( context ) {
    		/*
    		  * here we have to apply the context
    		  * at all object in the
    		*/
            var 
			    _this = this;
				if ( isString( context ) ) {
					context = {
						html: context
					};
				}

    		if ( !context ) {
    			this.context = {};
    			    /*
    			       * now we can create the queu and
    			       * another animation function
    			    */
    			    _this.createAllPart();
    			return _this;
    		}
    		else if ( isFunction( context ) ) {
    			/*
    			  * if the context is a function we can just
    			  * call this function using the current
    			  * digital object like context of the
    			  * function
    			*/
    			    context.call( _this, _this );
    			return _this;
    		}
    		else if ( isObject( context ) ) {
    			Digital.each( context, function ( method ) {
    				var 
    				    _val = this;
    				/*
    				   * now we can apply all
    				   * methods passed
    				*/
    				if ( _this[ method ] ) {
    					if ( isArray( _val ) ) {
    						_this[ method ].apply( _this, _val );
    					}
    					else {
    						_this[ method ].call( _this, _val );
    					}
    				}
    				else if ( method ) {
    					/*
    					  * here we can manage the alias
    					  * alias is an impotant part of the
    					  * library Digital because we can use
    					  * it every we.

    					  * in a content we can add an alias 
    					  * like this { append_as_div1: "{div id='name' }" }
    					  * in this syntaxt, append is the function, and div1 is
    					  * the variable

    					  * we can get the variable after this process
    					  * using $[ _var_name_ ]
    					*/
    					var _reg = /_as_/ig;
    					if (  _reg.test( method ) ) {
    						var 
							    _arr = method.split( _reg ),
    						    _sub_method = _arr[ 0 ],
    						    _var_name = _arr[ 1 ];
    						if ( _this[ _sub_method ] ) {
    							var 
								    _res; 
    							if ( isArray( _val ) ) {
    								_res = _this[ _sub_method ].apply( _this, _val );
    								    DigitalStorage.setItem( _var_name, _res );
    							}
    							else {
    								_res = _this[ _sub_method ].call( _this, _val );
    								    DigitalStorage.setItem( _var_name, _res );
    							}
    						}
    					}
    					else {
    						/*
    						   * now we can mange the free
    						   * context like { background: "red", id: "name" }

    						   * in the first time this function we test if the 
    						   * is a option of style method of any
    						   * html element						
    						*/
    						_this.each( function () {
    							if ( Digital.tools.isString( this.style[ method ] ) ) {
    								this.style[ method ] = _val;
    							}
    							else {
    								/*
    								   * if is not a optons of style we will 
    								   * add the prop like attribute
    								*/
    								this.setAttribute( method, _val );
    							}
    						} );
    					}
    				}
    			} );
    		}
    		    /*
    		       * now we can create the queu and
    		       * another animation function
    		    */
    		    _this.createAllPart();
			return _this;
    	}
    } );
    /*
      * here we start the
      * dom manipulation
    */
    Digital.fn.dom = {
    	append: function ( node, child ) {
    		var 
			    _new_node_;
    		    _new_node_ = Digital.builder( child );
				_new_node_ = _new_node_.selectorList;
    		        if ( _new_node_.length == 0 )
						_new_node_ = [ createText( child ) ];
						
    		    Digital.each( _new_node_, function () {	
    		    	node.appendChild( this );
    		    } );
    		return _new_node_;
    	},
    	prepend: function ( node, child ) {
    		var 
			    _new_node_;
    		        _new_node_ = Digital.builder( child );
    		        _new_node_ = _new_node_.selectorList;
    		        if ( _new_node_.length == 0 ) {
    		        	_new_node_ = [ createText( child ) ];
    		        }
    		    Digital.each( _new_node_, function () {
    		    	
    		    	node.insertBefore( this, node.firstChild );
    		    } );
    		return _new_node_;
    	},
    	parent: function ( node ) {
    		/*
    		  * return the parent node of a
    		  * html element
    		*/
    		return node.parentNode;
    	},
    	clone: function ( node, type, needed ) {
            var 
			    _clone,
                _event_reg = /^(on[a-z]*)$/i;
             
			_clone = type === false 
			                    ? node.cloneNode( false )
								: node.cloneNode( true );

    		if ( needed === true ) {
    			/*
    			  * for clone all event
    			  * of the initial html element
    			*/
    			Digital.each( node, function ( name ) {
    				if ( _event_reg.test( name ) ) {
    					_event_reg.exec( name );
    					_clone[ name ] = node[ name ];
    				}
    			} );
    		}
    		return _clone;
    	},
    	before: function ( node, child ) {
    		var 
			    _parent,
    		    _this = this,
    		    _clone,
    		    _arr = [];

    		node = Digital.fn.Picker.start( node );
    		Digital.each( node, function () {
    			_parent = _this.parent( this );
    			_clone = _this.clone( child, true ); // because there is just child once 
    		    _arr.push( _clone );
    			/*
    			  * we have to verify if this
    			  * element is already in the
    			  * dom
    			*/
    			if ( isElement( _parent ) ) {
    				_parent.insertBefore( _clone, this );
    			}
    			else {
    				return error( "( Digital.before ) element is not in the DOM" );
    			}
    		} );

    		/*
    		  * if this node is already in
    		  * the dom we have to delete
    		  * it
    		*/
    		if ( isElement( _this.parent( child ) ) ) {
    			_this.remove( child );
    		}
    		return _arr;
    	},
    	after: function ( node, child ) {
    		var 
			    _parent,
    		    _this = this,
    		    _clone,
    		    _arr = [];

    		node = Digital.fn.Picker.start( node );
    		Digital.each( node, function () {
    			_parent = _this.parent( this );
    			_clone = _this.clone( child, true ); // because there is just child once
    			_arr.push( _clone );
    			/*
    			  * we have to verify if this
    			  * element is already in the
    			  * dom
    			*/
    			if ( isElement( _parent ) ) {
    				_parent.insertBefore( _clone, _this.next( this ) );
    			}
    			else {
    				return error( "( Digital.before ) element is not in the DOM" );
    			}
    		} );

    		/*
    		  * if this node is already in
    		  * the dom we have to delete
    		  * it
    		*/
    		if ( isElement( _this.parent( child ) ) ) {
    			_this.remove( child );
    		}
    		return _arr;
    	},
    	next: function ( node ) {
    		/*
    		  * return the next node of a
    		  * html element
    		*/
    		return node.nextSibling;
    	},
    	prev: function ( node ) {
    		/*
    		  * return the previous node of a
    		  * html element
    		*/
    		return node.previousSibling;
    	},
    	parentUntil: function ( node, parent_selector ) {
    		var 
			    _parents = [],
    		    html = Digital.shave( Digital.fn.Picker.start( "html" ) ),
    		    _available_parent = [],
    		    _new_parent = [];

    		if ( parent_selector ) {
    			_parents = Digital.fn.Picker.start( parent_selector );
				_parents = isArray( _parents ) ? _parents : [ _parents ];
    		}
    		while ( true ) {
    			node = _new_parent = this.parent( node );
    			_available_parent.push( _new_parent );
    			if ( _parents.indexOf( _new_parent ) != -1 || _new_parent.isSameNode( html ) )
    				break;
    		}
    		return _available_parent;
    	},
    	nextUntil: function ( node, selector ) {
    		var 
			    _limit = [],
    		    _next_ = "",
    		    _arr = [];

    		if ( selector ) {
    			_limit = Digital.fn.Picker.start( selector )
    		}
    		while ( true ) {
    			node = _next_ = this.next( node );
    			if ( _next_ ) {
    				_arr.push( _next_ );
    			}
    			if ( _limit.indexOf( _next_ ) != -1 || !_next_ ) {
    				break;
    			}
    		}
    		return _arr;
    	},
    	prevUntil: function ( node, selector ) {
    		var 
			    _limit = [ ],
    		    _prev_ = "",
    		    _arr = [ ];

    		if ( selector ) {
    			_limit = Digital.fn.Picker.start( selector )
    		}
    		while ( true ) {
    			node = _prev_ = this.prev( node );
    			if ( _prev_ ) {
    				_arr.push( _prev_ );
    			}
    			if ( _limit.indexOf( _prev_ ) != -1 || !_prev_ )
    				break;
    		}
    		return _arr;
    	},
    	remove: function ( node ) {
    		var
			    _parent = this.parent( node );
    		    _parent.removeChild( node );
    		return _parent;
    	},
    	filter: function ( _list_, _filter_ ) {
    		var 
			    _result = [];
    		    Digital.each( _list_, function () {
    		    	if ( _filter_( this ) ) {
    		    		_result.push( this );
    		    	}
    		    } );
    		return _result;
    	}
    };

    Digital.fn.dom.class = {
		class: function ( node, content ) {
			if ( set( content ) ) {
				node.className = content;
			}
			else{
				return node.className;
			}
		},
    	addClass: function ( node, name ) {
    		   node.classList.add( name );
    		return;
    	},
    	removeClass: function ( node, name ) {
    		   node.classList.remove( name );
    		return;
    	},
    	containsClass: function ( node, name ) {
    		return node.classList.contains( name );
    	},
    	toggleClass: function ( node, name ) {
    		return node.classList.toggle( name );
    	},
    	replaceClass: function ( node, _old_, _new_ ) {
    		return node.classList.replace( _old_, _new_ );
    	},
    	classItem: function ( node, name ) {
    		return node.classList.item( name );
    	},
    	hasClass: function ( node, item ) {
    		return node.classList.contains( item );
    	}
    };
    Digital.fn.dom.attr = {
    	attrList: function ( node ) {
    		if ( attr.getAttributeNames ) {
    			return Array.from( attr.getAttributeNames );
    		}
    		else {
    			var 
				    _attr_ = node.attributes,
    			    _arr = [];
    			for( var i = 0; i < _attr_.length; i++ ){
    				_arr.push( _attr_[ i ].name );
    			}
    			return _arr;
    		}
    	},
    	toggleAttr: function ( node, name ) {
    		return node.toggleAttribute(name );
    	},
    	hasAttr: function ( node, name ) {
    		return node.hasAttribute( name );
    	},
    	hasAttrs: function ( node ) {
    		return node.hasAttributes();
    	},
    	removeAttr: function ( node, name ) {
    		return node.removeAttribute( name );
    	},
    	attrNS: function ( node, namespace, name, value ) {
    		if ( isObject( namespace ) ) {
    			Digital.each( namespace, function ( space ) {
    				if ( isObject( this ) ) {
    					Digital.each( this, function ( name ) {
    						node.setAttributeNS( space, name, this );
    					} );
    				}
    			} );
    		}
    		else if( isString( namespace ) && isString( name ) && isString( value ) ) {
    			node.setAttributeNS( namespace, name, value );
    		}
    		else if ( isString( namespace ) && isString( name ) ) {
    			return node.getAttributeNS( namespace, name );
    		}
    	},
    	removeAttrNS: function ( node, namespace, name ) {
    		return node.removeAttributeNS( namespace, name );
    	},
    	hasAttrNS: function ( node, namespace, name ) {
    		return node.hasAttributeNS( namespace, name );
    	}
    };
    /*
      * we add now all dom
      * function at the _varructor 
    */
    var 
	    _dom = Digital.fn.dom,
        _class = Digital.fn.dom.class,
        _attr = Digital.fn.dom.attr;

    Digital.init.extends( Digital.fn.internalFunction, {
    	append: function ( node, context ) {
    		/*
    		   * append has got many function
    		   * we can append html element or other
    		   * digital element if the node can't be 
    		   * created we will create a text node 
    		   * and return it
    		*/
    		var 
			    _this = this,
			    _arr = [];
    		_this.each( function () {    			
    			var 
				    _res = _dom.append( this, node );
    			if ( isArray( _res ) ) {
    				_arr = _arr.concat( _res );
    			}
    			else{
    				_arr.push( _res );
    			}
    		} );
    		/*
    		  * we have to retun an 
    		  * instance of Digital object
    		*/
    		return Digital.builder( _arr, context );
    	},
    	appendTo: function ( node, context ) {
    		var 
			    _this = this,
    		    /*
    		       * in append to, the selector 
    		       * is the element to append
    		       * and node is the parent node 
    		    */
                /*
                  * we have to retun an 
                  * instance of Digital object
                */
    		    _res = Digital.builder( node ).append( _this );
    		return Digital.builder( _res, context || _this.context );
    	},
    	prepend: function ( node, context ) {
    		var 
			    _this = this,
    		    _arr = [];
    		/*
    		  * the particularity of prepend is 
    		  * add any element as first element but
    		  * prepend isn't support by all navigator
    		  * so we will use appendChild and
    		  * first elemnt child+
    		*/
    		_this.each( function () {
    			var _res = _dom.prepend( this, node );

    			if ( isArray( _res ) ) {
    				_arr = _arr.concat( _res );
    			}
    			else{
    				_arr.push( _res );
    			}
    		} );
    		/*
    		  * we have to retun an 
    		  * instance of Digital object
    		*/
    		return Digital.builder( _arr, context );
    	},
    	prependTo: function ( node, context ) {
    		var 
			    _this = this,
            /*
              * we have to retun an 
              * instance of Digital object
            */
    		    _res = Digital.builder( node ).prepend( _this );
    		return Digital.builder( _res, context || _this.context );
    	},
    	before: function ( node, context ) {
    		var 
			    _this = this,
    		    _arr = [];
    		_this.each( function () {
    			/*
    			  * this is a
    			  * child
    			*/
    			var 
				    _res = _dom.before( node, this );
    			    _arr = _arr.concat( _res );
    		} );
    		return Digital.builder( _arr, context );
    	},
    	after: function ( node, context ) {
    		var 
			    _this = this,
    		    _arr = [];
    		_this.each( function () {
    			/*
    			  * this is a
    			  * child
    			*/
    			var
				     _res = _dom.after( node, this );
    			_arr = _arr.concat( _res );

    		} );
    		return Digital.builder( _arr, context );
    	},
    	first: function ( type, context ) {
    		var _arr = [];
    		/*
    		  * first will return all first
    		  * node of the selector but is
    		  * type === true only Element node will
    		  * be selected
    		*/
    		this.each( function () {
    			if ( type === true ) {
    				_arr.push( this.firstElementChild );
    			}
    			else {
    				_arr.push( this.firstChild );
    			}
    		} );

    		return Digital.builder( _arr, context );
    	},
    	last: function ( type, context ) {
    		var _arr = [];
    		/*
    		  * last will return all last
    		  * node of the selector but is
    		  * type === true only Element node will
    		  * be selected
    		*/
    		this.each( function () {    			
    			if ( type === true ) {
    				_arr.push( this.lastElementChild );
    			}
    			else {
    				_arr.push( this.lastChild );
    			}
    		} );

    		return Digital.builder( _arr, context );
    	},
    	clone: function ( type, needed, context ) {
    		var 
			    _arr = [];
    		/*
    		   * clone has got three parameters
    		   * the first one is the ( type ) which
    		   * correspond at type of clonage ( if the containt we be clone or no)
    		   * the second param correspond to if the event attributes shall be
    		   * clone also  
    		*/
    		    this.each( function () {
    		    	_arr.push( _dom.clone( this, type, needed ) );
    		    } );

    		return Digital.builder( _arr, context );
    	},
    	insertTo: function ( node, where, context ) {
    		var 
			    _arr = [],
    		    options = [ "beforebegin", "afterbegin", "beforeend", "afterend" ],
    		    _parents = Digital.builder( node, { } ),
    		    _this = this,
    		    _child, _clone;

    		if ( options.indexOf( where ) === -1 ) {
    			return error( "( Digital.insertTo wrong parameter 2 )" );
    		}

    	    _this.each( function () {
    			_child = this;
    			_parents.each( function () {
    				_clone = _dom.clone( _child );
    				this.insertAdjacentElement( where, _clone );
    				_arr.push( _clone );
    			} );

    			if ( isElement( _dom.parent( _child ) ) ) {
    				/*
    				  * if _child as got a parent, that's mean 
    				  * it is in the dom so we have to remove 
    				  * it
    				*/
    				_dom.remove( _child );
    			}
    		} );

    		return Digital.builder( _arr, context );
    	},
    	parent: function ( selector, context ) {
    		/*
    		  * peturn the parent node ot
    		  * the selected html element
    		*/
    		var 
			    _this = this,
    		    _arr = [];

    		if ( !selector ) {
    			_this.each( function () {
    				_arr.push( _dom.parent( this ) );
    			} );
    		}
    		else {
    			var
				    _parents = _this.parentUntil().selectorList,
					_needed= Digital.fn.Picker.start( selector );

    			Digital.each( _parents, function () {
    				if ( _needed.indexOf( this ) != -1 ) {
    					_arr.push( this );
    				}
    			} );
    		}

    		return Digital.builder( _arr, context );
    	},
    	parentUntil: function ( selector, context ) {
    		var
			    _this = this,
    		    _arr = [];

    		_this.each( function () {
    			_arr = _arr.concat( _dom.parentUntil( this, selector ) );
    		} );
    		return Digital.builder( _arr, context );
    	},
    	parentAll: function () {
    		return this.parentUntil();
    	},
    	next: function ( selector, context ) {
    		/*
    		  * there are two cases in this functions
    		  * if ( selector ) is not defined, we can
    		  * just return the next sibling of the selected
    		  * node but

    		  * if ( selector ) is defined we have to analyse all
    		  * next element or textnode of this node and return
    		  * this one which has got ( selector ) like selector
    		  * but if selector isn't maches we return just an
    		  * empty array
    		*/
    		var 
			    _arr = [],
    		    _this = this;

    		if ( !selector ) {
    			_this.each( function () {
    				_arr.push( _dom.next( this ) );
    			} );
			}
			else if ( isBoolean( selector ) ) {
				_this.each( function () {
					var 
						next = _dom.next( this );
    				_arr.push( next.nodeType === 1 ? next : _dom.next( next ) || next );
    			} );
			}
    		else {
    			var 
				    _needed = Digital.fn.Picker.start( selector ),
					_result = _this.next( true ).selectorList;

    			Digital.each( _result, function () {
    				if ( _needed.indexOf( this ) != -1 ) {
    					_arr.push( this );
    				}
    			} );
    		}
    		return Digital.builder( _arr, context );
    	},
    	prev: function ( selector, context ) {
    		/*
    		  * there are two cases in this functions
    		  * if ( selector ) is not defined, we can
    		  * just return the previous sibling of the selected
    		  * node but

    		  * if ( selector ) is defined we have to analyse all
    		  * previous element or textnode of this node and return
    		  * this one which has got ( selector ) like selector
    		  * but if selector isn't maches we return just an
    		  * empty array
    		*/
			var 
			    _arr = [],
    		    _this = this;
    		if ( !selector ) {
    			_this.each( function () {
    				_arr.push( _dom.prev( this ) );
    			} );
			}
			else if ( isBoolean( selector ) ) {
				_this.each( function () {
					var 
						prev = _dom.prev( this );
    				_arr.push( prev.nodeType === 1 ? prev : _dom.prev( prev ) || prev );
    			} );
			}
    		else {
				var 
				    _needed = Digital.fn.Picker.start( selector ),
    			    _result = _this.prev( true ).selectorList;

    			    Digital.each( _result, function () {
    			    	if ( _needed.indexOf( this ) != -1 ) {
    			    		_arr.push( this );
    			    	}
    			    } );
    		}

    		return Digital.builder( _arr, context );;
    	},
    	nextUntil: function ( selector, context ) {
    		/*
    		  * return all next element
    		  * of an node until the
    		  * selector ( on of the next sibling of this node )
    		*/
    		var 
			    _arr = [];
    		    this.each( function () {
    		    	_arr = _arr.concat( _dom.nextUntil( this, selector ) );
    		    } );
    		return Digital.builder( _arr, context );;
    	},
    	prevUntil: function ( selector, context ) {
    		/*
    		  * selector respresent a css
    		  * selector
    		*/
    		var 
			    _arr = [];
    		    this.each( function () {	
    		    	_arr = _arr.concat( _dom.prevUntil( this, selector ) );
    		    } );
    		return Digital.builder( _arr, context );
    	},
    	nextAll: function ( selector, context ) {
    		/*
    		  * the function will return 
    		  * all next element  from the
    		  * selected element until the body element
    		*/
    		var 
			    _arr = [],
				args = argsManager( arguments ),
				list = [];
    		this.each( function () {
    			_arr = _arr.concat( _dom.nextUntil( this ) );
    		} );

			list = _arr;
			if ( selector && !isBoolean( selector ) )
				list = Digital.builder( selector ).selectorList;
				    else if ( selector && isBoolean( selector ) && selector === true  )
					    Digital.call( function () {
							list = [];
							_arr.each( function () {
								if ( this && this.nodeType === 1 )
									list.push( this );
							} );
						} );  

    		return args.length() === 0 && selector
			        ? Digital.builder( _arr, context )
					: Digital.builder( _arr ).filter( function ( node ) {
						if ( list.indexOf( node ) !== -1 )
							return true;
					} ).applyContext( context );
    	},
    	prevAll: function ( selector, context ) {
			/*
    		  * the function will return 
    		  * all previous element  from the
    		  * selected element until the body element
    		*/
    		var 
			    _arr = [],
				args = argsManager( arguments ),
				list = [];

    		this.each( function () {
    			_arr = _arr.concat( _dom.prevUntil( this ) );
    		} );

			list = _arr;
			if ( selector && !isBoolean( selector ) )
				list = Digital.builder( selector ).selectorList;
				    else if ( selector && isBoolean( selector ) && selector === true  )
					    Digital.call( function () {
							list = [];
							_arr.each( function () {
								if ( this && this.nodeType === 1 )
									list.push( this );
							} );
						} );  

    		return args.length() === 0 && selector
			            ? Digital.builder( _arr, context )
						: Digital.builder( _arr ).filter( function ( node ) {
							if ( list.indexOf( node ) !== -1 )
								return true;
						} ).applyContext( context );
    	},
    	childs: function ( selector, context ) {
    		/*
    		  * selector represent a needed
    		  * child, it is optional
    		  * and context represent the 
    		  * context of each selected 
    		  * child
    		*/
    		var 
			    _arr = [],
    		    _this = this,
    		    _needed;

    		if ( !selector ) {
    			_this.each( function () {
    				_arr = _arr.concat( Array.from( this.childNodes ) );
    			} );
    		}
    		else {
    			
    			_needed = Digital.fn.Picker.start( selector );
    			_this.each( function () {
    				var _childs = Array.from( this.childNodes );
    				Digital.each( _childs, function () {
    					/*
    					  * we have to verify now if
    					  * each child is among the 
    					  * needed childs
    					*/
    					if ( _needed.indexOf( this ) != -1 ) {
    						_arr.push( this );
    					}
    				});
    			} );
    		}
    		return Digital.builder( _arr, context );
    	},
    	children: function ( selector, context ) {

    		/*
    		  * selector represent a needed
    		  * child, it is optional
    		  * and context represent the 
    		  * context of each selected 
    		  * child
    		*/
    		var 
			    _arr = [],
    		    _this = this,
    		    _needed;

    		if ( !selector ) {
    			_this.each( function () {
    				_arr = _arr.concat( Array.from( this.children ) );
    			} );
    		}
    		else {
    			_needed = Digital.fn.Picker.start( selector );
    			_this.each( function () {
    				var 
					    _childs = Array.from( this.children );
    				    Digital.each( _childs, function () {
    				    	/*
    				    	  * we have to verify now if
    				    	  * each child is among the 
    				    	  * needed childs
    				    	*/
    				    	if ( _needed.indexOf( this ) != -1 ) {
    				    		_arr.push( this );
    				    	}
    				    });
    			} );
    		}
    		return Digital.builder( _arr, context );
    	},
    	hasChild: function ( selector ) {

    		/*
    		  * selector represent a
    		  * spécific node we search 
    		  * to know if this ( the main(s) element )
    		  * it is parent
    		*/
    		var 
			    _arr = [],
    		    _needed,
    		    _childs, _verif;

    		if ( !selector ) {
    			this.each( function () {
    				_arr.push( this.hasChildNodes() );
    			} );
    		}
    		else  {
    			/* 
    			  * all elements accepted by the
    			  * selector
    			*/
    			_needed = Digital.fn.Picker.start( selector );
    			this.each( function () {
    				_verif = false;
    				_childs = Array.from( this.children );
    				Digital.each( _childs,  function () {
    					if ( _needed.indexOf( this ) != -1 )
    						_verif = true;
    				} );
    				_arr.push( _verif );
    			} );
    		}

    		return Digital.shave( _arr );
    	},
    	replaceWith: function ( _new_, context ) {
    		var 
			    _arr = [],
    		    _new_node_ = Digital.builder( _new_ ),
    		    _this = this,
    		    _parent, _clone;

    		_this.each( function () {
    			_this = this;
    			_parent = _dom.parent( _this );
    			_new_node_.each( function () {
    				_clone = _dom.clone( this );
    				_parent.replaceChild( _clone, _this );
    				_arr.push( _clone );
    			} );
    		} );
    		return Digital.builder( _arr, context );
    	},
    	remove: function () {
    		this.each( function () {
    			return _dom.remove( this );
    		} );
    		return this;
    	},
    	contains: function ( _child, context ) {
    		var 
			    _arr = [],
    		    _childs = Digital.fn.Picker.start( _child ),
    		    _parent = this.selectorList;

    		Digital.each( _childs, function () {
    			var 
				    _this = this;
    			    if ( _parent.indexOf( _this.parentNode ) !== -1 ) {
						_arr.push( _this );
					}
    		} );
    		return Digital.builder( 
				Digital.shave( _arr ), 
				context 
			);
    	},
    	outerWrap: function ( _text_, context ) {
    		/*
    		  * add a cover tag on
    		  * a html element
    		*/
    		if ( !isString( _text_ ) )
				return error( "Digital.outerWrap" );
				
				var 
					parent = '',
					node = '',
					list = [];

					this.each( function () {
						parent = Digital.builder( this.parentNode );
						    node =  Digital.builder( _text_, context );
						    node.append( this );
						    parent.append( node );
						list.push( node );
					} );

			return Digital.builder(
				Digital.shave( list )
			);
    	},
    	innerWrap: function ( _text_, context ) {
			/*
    		  * add a cover tag on
    		  * a html element
    		*/
    		
    		if ( !isString( _text_ ) )
				return error( "Digital.outerWrap" );
				
				var 
					parent = '',
					node = '',
					list = [];

					this.each( function () {
						parent = Digital.builder( this );
							node =  Digital.builder( _text_, context );
							node.html( parent.html() );
							parent
								.empty()
								.append( node );
						list.push( node );
					} );

			return Digital.builder(
				Digital.shave( list )
			);
		},
		unWrap: function ( context ) {
			var 
				list = [];
				this.each( function () {
					this.parentNode.innerHTML = this.innerHTML;
					list.push( this.parentNode );
				} );
			
			return Digital.builder( list, context );
		},
		unWrapUpper: function ( context ) {
			var 
				list = [];
				this.each( function () {
					var 
						parent = Digital.builder( this )
									.parent()
									.parent();
						parent.append( this );
					list.push( parent );
				} );
			return Digital.builder( list, context );
		}
    } );

    Digital.fn.dom.tools = {
    	isSame: function ( _node1_, _node2_ ) {
    		if ( isElement( _node1_ ) && isElement( _node2_ ) ) {
    			return _node1_.isSameNode( _node2_ );
    		}
    		else {
    			return error( "( Digital.isSame ) wrong parameter type" );
    		}
    	},
    	isEqual: function ( _node1_, _node2_ ) {
    		if ( isElement( _node1_ ) && isElement( _node2_ ) ) {
    			return _node1_.isEqual( _node2_ );
    		}
    		else {
    			return error( "( Digital.isEqual ) wrong parameter type" );
    		}
    	},
    	is: function ( _node_, _ ) {
    		return ( isElement( _node_ ) && isString( _ ) ) ? 
    		       _node_.localName == _ ? true : false :
    		       error( "( Digital.is ) wrong parameter type " );
    	},
    	isValidEmail: function ( _ ) {
    		if ( _.value === undefined ) {
    			return false;
    		}
    		var 
			    _reg_ = new RegExp( /^(www\.)?[a-z0-9\_\$]*@[a-z0-9]*\.[a-z0-9]{2,6}$/, "i" );
    		return _reg_.test( _.value );
    	}
    };

	function unCamelCase( prop ) {
		var 
		    reg = /[A-Z]/g;
			if ( !reg.test( prop ) )
			    return prop;
				var 
				    result = prop.replace( reg, function ( ) {
						var 
						    val = arguments[ 0 ];
						return '-' + val.toLowerCase();
					} );
		return result;
	};

    Digital.init.extends( Digital.fn.internalFunction, {
    	empty: function () {
    		this.each( function () {
    			if ( 'innerHTML' in this ) {
    				this.innerHTML = "";
    			}
    			else {
					if ( 'nodeValue' in this ) {
    				    this.nodeValue = "";
    			    }
    			    else if ( 'value' in this ) {
    				    this.value = "";
    			    }
				}
    		} );
    		return this;
    	},
    	n: function ( index ) {
			var 
			    params = '',
			    context = {},
				args = argsManager( arguments ),
				list = args.list,
				index = 0,
			    result;
				if ( isObject( list[ list.length - 1 ] ) )
					context = list.pop();
				    for ( index = 0; index < list.length; index++ ) {
						if ( index === list.length - 1 ) {
							    params += list[ index ];
							continue;
						}
						params += list[ index ] + ',';
					}
				result = Digital.fn.FilterList.filter( this.selectorList, 'n', params || 0 );
    		return Digital.builder( result, context );
    	},
    	not: function ( selector, context ) {
    		var 
			    _not_available_ = Digital.fn.Picker.start( selector ),
    		    _arr = [];
    		    this.each( function () {
    		    	if ( _not_available_.indexOf( this ) === -1 ) {
			    		_arr.push( this );
			    	}
    		    } );
    		return Digital.builder( _arr, context );
    	},
    	filter: function ( filter, context ) {
    		/*
    		  * if the filter return false,
    		  * the element will be remove
    		  * of the list of element
    		*/
    		return  ( isFunction( filter ) ) 
			        ? Digital.builder( _dom.filter( this.selectorList, filter ), context ) 
					: error( "( Digital.filter ) parameter should be a function" );
    	},
    	removeCss: function ( _prop_ ) {
    		/*
    		  * permit to remove
    		  * a css property
    		*/
    		var 
			    _new_css_,
				_this = this,
    		    _remove = function ( _text_, _prop_ ) {
    		    	var 
					    _list_ = '';
						_prop_ = unCamelCase( _prop_ );
    		    	    Digital.each( _text_.split( ";" ), function () {
    		    	    	if ( this && this.length > 3 ) {
    		    	    		var 
								    _prop_name_ = this.split( ":" )[ 0 ].trim(),
    		    	    		    _prop_value_ = this.split( ":" )[ 1 ].trim();
    		    	    		    if ( _prop_name_ !== _prop_ )
    		    	    		    	_list_ += _prop_name_ + ': ' + _prop_value_+ ";";
    		    	    	}
    		    	    });
    		    	return _list_;
    		    };
    		if ( isString( _prop_ ) ) {
    			this.each( function () {
    				_new_css_ = _remove( 
						this.style.cssText,
						_prop_ 
					);
    				this.style.cssText = _new_css_;
    			} );
    		}
			else if ( isArray( _prop_ ) ) {
				Digital.each( _prop_, function () {
					_this.removeCss( this );
				} );
			}
			return this;
    	},
    	cssText: function () {
    		var 
			    _arr = [];
    		    this.each( function () {
    		    	  _arr.push( this.style.cssText );
    		    } );
    		return Digital.shave( _arr );
    	}
    } );
    /*
      * now we can extends the tools
      * of digital and add new tools
      * which will be used in the rest of 
      * the code
    */
    Digital.tools.extends( {
    	isEmptyObject: function ( object ) {
    		if ( !isObject( object ) ) { 
    			/*
    			  *  we have to verify in first
    			  * if the param is an object
    			*/
    			return false; 
    		}

    		for ( var _ in object ) {
    			 return false;
    		}
    		return true;
    	},
    	isEmptyArray: function ( array ) {
    		return ( isArray( array ) && array.length > 0 ) ? true : false;
    	},
    	twinObject: function ( _obj1_, _obj2_ ) {
    		if ( !isObject( _obj1_ ) || !isObject( _obj2_ ) ) {
    			return error( "( Digital.tools.cloneObject ) wrong parameter type" );
    		}
    		else {
    			Digital.each( _obj2_, function ( _ ) {
    				_obj1_[ _ ] = this;
    			} );
    			return _obj1_;
    		}
    	},
    	parseDataUrl: function ( _obj_, separator, isUrl ) {
    		/*
    		  * this function convent
    		  * JSON object to litteral data
    		*/
            var 
                parse = function ( data, isUrl ) {
                	return isUrl === true 
                	                    ? encodeURIComponent( data ) 
                	                    : data;
                },
                datas = "";
    		    Digital.each( _obj_, function ( name ) {
    		    	datas += name + "=" 
    		    	              + parse( isObject( this ) ? JSON.stringify( this ) : this, isUrl ) 
    		    	              + ( separator || "&" );
    		    } );
    		return ( datas[ datas.length - 1 ] == separator || datas[ datas.length - 1 ] == "&" ) ? datas.substring( 0, datas.length - 1 ) : datas;
    	},
    	parseData: function ( _text_, separator ) {
    		/*
    		  * we use parseData to 
    		  * return a litteral object which
    		  * content the list of all data of a
    		  * part of url with their value
    		*/
    		var datas = {};
    		    if ( !_text_ || !isString( _text_ ) ) {
    		    	return {};
    		    }

    		    var _list_ = _text_.split( separator || "&" );
    		        Digital.each( _list_, function () {
    		        	var 
    		        	    _arr = this.trim().split( "=" ),
    		        	    _name_ = _arr[ 0 ],
    		        	    _val_;
							    _arr.shift();
								_val_ = _arr.join( '=' );

    		        	datas[ _name_ ] = _val_;
    		        } );

    		return datas;
    	}
    } );

    Digital.fn.storage[ "*" ] = {};
    Digital.each( toolsList.twinObject( toolsList.twinObject( _class, _attr ), Digital.fn.dom.tools ), function ( name ) {
    	/*
    	  * now we add class and
    	  * attributes methods to the
    	  * object
    	*/
    	var 
		    _this = this;
    	Digital.fn.storage[ "*" ][ name ] = function () {
    		var 
			    _arr = [],
    		    _res,
    		    _arg = Array.from( arguments ),
    		    _datas;

    		this.each( function () {
    			_datas = [];
    			_datas.push( this );
    			_res = _this.apply( {}, _datas.concat( _arg ) );

    			if ( _res === undefined ) {
    				_arr === false;
    			}
    			else {
    				_arr.push( _res );
    			}
    		} );

    		_arr = _arr.length == 0 ? false : _arr;

    		return ( _arr ) ? Digital.shave( _arr ) 
    		                : Digital.call( function () {
    		                    return this;
    		                }, this );
    	};
    } );

    Digital.fn.storage.UniversalObject = function ( datas ) {
    	/*
    	  * we use DigitalUniversalObject to
    	  * create object we can add any 
    	  * thing
    	*/
    	this.datas = datas;
    	this.set = function ( _name_, _val_ ) {
    		/*
    		  * set permit to add
    		  * new property and method
    		  * at the object
    		*/
    		if ( !isString( _name_ ) )
    			return this;

    		    this[ _name_ ] = _val_;
    		return this;
    	};

		this.setAll = function ( obj ) {
			var 
			    current = this;
			    if ( isObject( obj ) ) {
					Digital.each( obj, function ( name ) {
						current[ name ] = this;
					} );
				}
			return this;
		}
    };

	Digital.update( Digital.fn, {
		Form: function ( node ) {
			this.node = node;
			    Digital.update( this, {
					build: function () {
						var 
						    _arr = [],
							_map_ = {},
							node = this.node,
							_new_node_ = '',
						    _list_of_node_ = Digital.builder( 'fieldset, input, select, textarea, output, button' );
							    _list_of_node_.each( function () {
									_new_node_ = Digital.builder( this ).parent( node );
									if ( _new_node_.length )
									    _arr.push( this );
								} );

								Digital.each( _arr, function () {
									var 
									    name = this.name;
									if ( name ) {
										if ( _map_[ name ] ) {
											isArray( _map_[ name ] ) 
											                    ? _map_[ name ].push( this )
																: _map_[ name ] = [ _map_[ name ], this ];
										}
										else{
											_map_[ name ] = this;
										}
									}
								} );
						    this.list = _arr;
							this.map = _map_;
						return this;
					},
			        get: function ( _ ) {
						var 
						    arr = [];
							Digital.each( this.map, function ( name ) {
								if ( _ === name )
								    arr.push( this );
							} );
						return Digital.builder( arr );
					}
				} );
			this.build();
		}
	} );
    /*
      * now we can manage
      * form element 
      * Form api is use to mange all
      * form element and form object to 
      * return datas 
    */
    Manager.api.internalApi.form = function () {
		if ( this.selectorList.length === 0 )
			return error( ' ( Digital.form ) there is not an Element selected. ' );
    	var 
		    selector = this.selectorList[ 0 ],
    	    elements = new Digital.fn.Form( selector ),
    	    _this = new Digital.fn.storage.UniversalObject( elements ),
    	    index = 0,
    	    _field_list_ = [],
    	    _items_name_ = [];

    	if ( isArray( selector ) || !( selector.localName === "form" ) || !elements ) {
    		/*
    		  * for use form method you have
    		  * to have only one form element celected
    		  * the method elements shall existed
    		*/
    		return;
    	}

    	Digital.each( elements.list, function ( name ) {
    		/*
    		  * here we will add 
    		  * elements method to the
    		  * Digital object
    		*/
    		var 
			    node = this,
    		    test = parseInt( name );

    		if ( isNumber( test ) && node.localName !== "fieldset" ) {
    			_this[ index ] = node;
    			_field_list_.push( node );
    			index++;
    			if ( node.name && !_items_name_.inArray( node.name ) )
    				_items_name_.push( node.name );
    		}
    	} );

		_this.nodes = {};
    	Digital.each( _items_name_, function () {
    		var _name_ = this;
    		    _this.nodes[ _name_ ] = function ( context ) {
    		    	var _node = elements.get( _name_ );

    		    	    if ( isArray( _node ) ) {
    		    	    	_node = Digital.builder( Array.from( _node ), context );
    		    	    	_node.value = function () {
    		    	    		var  
								    _res = "";
    		    	    		    this.each( function () {
    		    	    		     	if ( this.checked === true ) {
    		    	    		     		_res = this.value;
    		    	    		     		return;
    		    	    		     	}
    		    	    		    } );
    		    	    		return _res;
    		    	    	};
    		    	    	return _node;
    		    	    }
    		    	    else {
    		    	    	return Digital.builder( _node, context );
    		    	    }
    		    };
    	} );

		_this.get = function ( _ ) {
			return elements.get( _ );
		};

    	_this.toData = function ( type ) {
    		/*
    		  * we use toData
    		  * to return a litteral object which
    		  * content all field's name of this
    		  * form with their value
    		*/
    		var
			    _obj_ = {};
    		    Digital.each( _items_name_, function () {
    		    	var 
					    _name_ = this,
    		    	    _node_ = _val_ = _this.nodes[ this ](),
    		    	    _val_ = _node_.value();

    		    	if ( _node_.type() === "checkbox" ) {
    		    		/*
    		    		  * if the form element is 
    		    		  * a input of type checkbox, 
    		    		  * we have to verify if it have been
    		    		  * check for add at the list of
    		    		  * datas
    		    		*/

    		    		_obj_[ _name_ ] = _node_.checked();
    		    	}
    		    	else{
    		    		if ( _node_.type() === "file" ) {
    		    			var _arr = [];
    		    			    _node_.files()
    		    			          .each( function ( e ) {
    		    			          	_arr.push( this );
    		    			          } );

    		    			_obj_[ _name_ ] = Digital.shave( _arr );
    		    		}
    		    		else {
    		    			_obj_[ _name_ ] = _val_;
    		    		}
    		    	}
    		    } );

    		    if ( !type || type === "object" ) {
    		    	return _obj_;
    		    }
    		    else if ( type === "url" ) {
    		    	return toolsList.parseDataUrl( _obj_ );
    		    }
    	};

    	_this.toDataUrl = function () {
    		return _this.toData( "url" );
    	};

    	_this.each = function ( fn ) {
    		Digital.each( _field_list_, fn );

    		return this;
    	};
        
        /*
           * represent the current
           * form element 
        */
    	_this.form = this;
    	_this.length = index;
    	/*
    	  * now we want to mange
    	  * directly ajax in the form
    	*/
        _this.ajaxObject = null;
    	_this.ajax = function ( _ ) {
    	    var 
			    _ajax_;
    		    _ = isObject( _ ) ? 
    		    /*
    		      * we add datas to send the 
    		      * request
    		    */
    		    toolsList.twinObject( _, {
    		   	    datas: _this.toData()
    		    } ) : {};
    		/*
    		  * now we can send the
    		  * request
    		*/
    		_ajax_ = new Manager.ajax
    		    		        .ajaxObject( _ )
    		    		        .start()
    		    		        .send();

    	    this.ajaxObject = _ajax_;

    	  return this;
    	};

    	Digital.each( {
    		ajaxLoadstart: "loadstart",
    		ajaxLoad: "load",
    		ajaxLoadend: "loadend",
    		ajaxAbort: "abort",
    		ajaxProgress: "progress",
    		ajaxError: "error",
    		ajaxDone: "done",
    		ajaxFailed: "failed",
    		ajaxLoading: "loading",
    		ajaxHeadersreceived: "headersreceived",
    		ajaxReadystatechange: "readystatechange"
    	}, function ( _event_name_ ) {
    		/*
    		  * now we had new event 
    		  * to the formMethod 
    		*/
            var 
			    _event_ = this;
                _this[ _event_name_ ] = function ( callback ) {
                	  if ( _this.ajaxObject && isFunction( callback ) ) {
                		   _this.ajaxObject[ _event_ ]( callback );
                	  }

                	return _this;
                };
    	} );

    	_this.ajaxOn = function ( _, __, ___ ) {
    		    this.ajaxObject
			        .on( _, __, ___ );
    		return this;
    	};

    	return _this;
    };
    /*
      * now we can mange
      * file Api 
    */
    Manager.api.internalApi.files = function () {
    	if ( isArray( this.selector ) || this.localName() !== "input" || this.type() !== "file" )
    		return;

    	var
		    _obj_ = new Digital.fn.storage.UniversalObject(),
    	    _arr = Array.from( this.selector.files ),
    	    index = 0,
    	    _files_ = [];
    	    Digital.each( _arr, function () {
    	    	_obj_[ index ] = this;
    	    	_files_.push( this );
    	    	index++;
    	    } );

    	    _obj_.length = index;
    	    _obj_.each = function ( fn ) {
    	    	    Digital.each( _files_, fn );
    	    	return _obj_;
    	    };

    	return _obj_;
    };

    /*
      * now we can create function
      * for read file
      *
      * ( read ) can analyse a Blob
      * or a File Object 
    */

    Manager.api.externalApi.read = function ( blob, _ ) {
    	var 
		    reader = new FileReader(),
    	    _obj_ = new Digital.fn.storage.UniversalObject();
    	/*
    	  * now we can mange all
    	  * event
    	*/
    	Digital.each( ( "loadstart load loadend progress error abort" ).split( " " ), function () {
    		var _event_ = this;
    		    _obj_[ _event_ ] = function ( fn ) {
    		    	reader[ "on" + _event_ ] = function ( e ) {
    		    		if ( _event_ === "progress" ) {
    		    			e.percent = Math.ceil( ( e.loaded / e.total ) * 100 );
    		    		}
    		    		fn.call( this, e );
    		    	};
    		    	return _obj_;
    		    };
    	} );

		_obj_.fx = {
			url: reader.readAsDataURL,
			buffer: reader.readAsArrayBuffer,
			binary: reader.readAsBinaryString,
			text: reader.readAsText
		};

    	_obj_.on = function ( _param ) {
    		if ( !isObject( _param ) ) {
    			return _obj_;
    		}

    		Digital.each( _param, function ( name ) {
    			_obj_[ name ]( this );
    		} );

    		return _obj_;
    	};

		    _obj_.fx[ _ ].call( reader, blob );
    	return _obj_;
    };

    Manager.api.internalApi.read = function ( _ ) {
    	if ( this.selector.toString() !== "[object File]" ) {
    		return this;
    	}
    	return Manager.api.externalApi.read( this.selector, _ );
    };
    /*
      * now we can mange URL
      * Api, ( it's a api we use to )
      * mange url datas
    */
    Manager.api.externalApi.url = function ( _url_ ) {
    	/*
    	  * firstly if the var _url_ === local we 
    	  * have to set it the value of the localurl
    	  * that is the url of the open page
    	*/
    	    _url_ = ( _url_ === '{local}' ) ? wn.location.href : _url_;
    	var _obj_ = new Digital
		                    .fn.storage
    	                    .UniversalObject( _url_ );

    	    if ( !isString( _url_ ) ) {
    	    	return _obj_;
    	    }

    	var _arr = _url_.split( "?" );

    	_obj_.url = _url_;
        
        /*
          * content the main
          * path of the file, 
          * that is all elements before
          * the interrogative mark
        */
    	_obj_.baseUrl = _arr[ 0 ];
    	/*
    	  * content the list of all
    	  * data in the url which
    	  * use with the get method
    	  * like name=d&p=3;
    	*/
    	_obj_.dataUrl = _arr[ 1 ];
    	/*
    	  * content a litteral obj
    	  * which has got all datas of the
    	  * url with their value
    	*/
    	_obj_.dataList = toolsList.parseData( _obj_.dataUrl );

    	_obj_.set( "update", function () {
    		var 
    		    _data_url_ = toolsList.parseDataUrl( this.dataList ),
    		    _url_ = this.baseUrl + ( _data_url_ ? "?" + _data_url_ : "" );

    		    this.url = _url_;
    		    this.dataUrl = _data_url_;
    	} );

    	_obj_.set( "get", function ( _ ) {
    		return this.dataList[ _ ] ? 
    		        decodeURIComponent( this.dataList[ _ ] )
    		        : this.dataList[ _ ];
    	} );

    	_obj_.set( "add", function ( _name_, _ ) {
    		/*
    		  * to add any data in 
    		  * the url
    		*/
    		       this.dataList[ _name_ ] = _;
    		       this.update();
    		return this;
    	} );

    	_obj_.set( "delete", function ( _ ) {
    		/*
    		  * to remove any data
    		  * in the url
    		*/
    		       delete this.dataList[ _ ];
    		       this.update();
    		return this;
    	} );

    	_obj_.set( "each", function ( fn ) {
    		/*
    		   * each will list all
    		   * data in the url
    		*/
    		  Digital.each( this.dataList, fn );
    		return this;
    	} );

    	_obj_.set( "go", function () {
    		   wn.location.href = this.url;
    		
    		return this;
    	} );

    	_obj_.set( "basename", function ( name ) {
    		var 
    		   page_url = this.baseUrl,
    		   url;
    		   page_url = page_url.trim();

    		var 
    		   url_datas = page_url.split( '/' ),
               basename =  url_datas[ url_datas.length - 1 ] === "" ? Digital.call( function () {
               	          url_datas.pop(); // 
               	   return url_datas.pop();
               } ) : url_datas.pop();

    		if ( isString( name ) ) {
    			url = url_datas.join( '/' ) + "/" + name;
    			this.baseUrl = url;
    			this.update();
    			return this;
    		}
    		else {
    			return basename;
    		}
    	} );

    	_obj_.set( "clear", function () {
    		/*
    		  * remove all parameter
    		  * in the url
    		*/
    		    this.dataList = {};
    		    this.update();
    		return this;
    	} )

    	_obj_.set( "getBaseUrl", function () {
    		return this.baseUrl;
    	} );

    	_obj_.set( "getUrl", function () {
    		return this.url;
    	} )

    	return _obj_;
    };
    /*
       * now we can add attr and
       * class method to  Digital
    */
    Digital.init.extends( 
		Digital.fn.internalFunction, 
		Digital.fn.storage[ "*" ] 
	);
    /*
      * now we can manage the event.
      * The on[ Event ] have already been
      * create in the first part of the library
      * now we want to mange event we Addeventlistener
      * but Internet Explorer doesn't support it
      * so we will use Attach event
    */
    Digital.update( Digital, {
		events: function ( event ) {
			var 
			    _source_ = ( "Event" in wn ) ? true : false;
    		        if ( !isString( event ) )
    		    	    return;
    		    /*
    		      * if the Object Event is not
    		      * supported by the support we 
    		      * will use initEvent
    		    */
    		    var eventSource = _source_ ? new Event( event, {
    		    	    cancelBubble: true,
    		    	    cancelable: true,
    		    	    bubbles: true,
    		    	    composed: true,
    		    	    currentTarget: this,
    		    	    defaultPrevented: false
    		    } )  : new initEvent( event, true, true );
			return eventSource;
		}
	} );

    Digital.init.extends( Digital.fn.internalFunction, {
    	on: function ( event, func, phase, _propagation ) {
    		var 
			    _this = this,
    		    propagable = false,
    		    generateFunc = function ( fn ) {
    			    return function ( e ) {
    			    	fn.call( this, e );
    			    	/*
    			    	  * now we stop the
    			    	  * propagation of the
    			    	  * event
    			    	*/
    			    	propagable ? e.stopImmediatePropagation() : '';
    			    };
    		};
    		   propagable = _propagation;
    		    _this.each( function () {
    		    	var 
					    _ = ( "addEventListener" in this ) ? true : false,
						node = this,
    		    	    _addEvent = this.addEventListener || this.attachEvent;
    		    	    phase = isBoolean( phase ) ? phase : false;

    		    	    if ( isString( event ) && isFunction( func ) && isBoolean( phase ) ) {
    		    	    	event = _ ? event : 'on' + event;
    		    	    	_addEvent.call( node, 
							    event, 
								generateFunc( func ), 
								phase 
							);
    		    	    }
    		    	    else if ( isObject( event ) ) {
    		    	    	Digital.each( event, function ( _event_name_ ) {
    		    	    		if ( isFunction( this ) ) {
    		    	    			propagable = phase;
    		    	    			_addEvent.call( node, 
										_event_name_, 
										generateFunc( this ), 
										( isBoolean( func ) ? ( func === true ) ? true : false : false )  
    		    	    			);
    		    	    		}
    		    	    		else if ( isObject( this ) ) {
    		    	    			var 
									    _phase = this.phase,
    		    	    			    func = this.fn;
    		    	    			    propagable = this.propagable;

    		    	    			if ( !isFunction( func ) ) {
    		    	    				return error( "( Digital.on ) fn missing " );
    		    	    			}

    		    	    			_addEvent.call( node,
										_event_name_, 
										generateFunc( func ), 
										_phase 
									);
    		    	    		}
    		    	    		else {
    		    	    			return error( "( Digital.on ) wrong paramter type " );
    		    	    		}
    		    	    	});
    		    	    }
    		    } );

    		return this;
    	},
    	off: function ( event, handle, capture ) {
    		/*
    		  * permit to remove an event 
    		  * like EventListner isn't support by
    		  * internet explorer we will use detachEvent
    		*/
    		this.each( function () {
    			var 
				    removeEvent = this.removeEventListener || this.detachEvent,
    			    _ = ( "addEventListener" in this ) ? true : false;

    			    if ( isString( event ) && handle && capture ) {
    			    	event = _ ? event : 'on' + event;
    			    	        removeEvent( event, handle, capture );
    			    }
					else{
						this[ 'on' + event ] = null;
					}
    		} );

    		return this;
    	},
    	trigger: function ( eventType ) {
			var 
			    eventSource = Digital.events( 
					eventType 
				);
    		    this.each( function () {
    		    	/*
    		    	  * now we can start the
    		    	  * event 
    		    	*/
    		    	this.dispatchEvent( eventSource );
    		    } );
    		return this;
    	}
    } );

    /*
      * now we can start the 
      * prototypage
    */

    Digital.call( function () {
    	Array.prototype.each = function ( fn ) {
    		return Digital.each( this, fn );
    	};

    	Array.prototype.inArray = function ( val ) {
    		var _verif = false;
    		    Digital.each( this, function () {
    		    	if ( val === this ) {
    		    		_verif = true;
    		    	}
    		    });
    		return _verif;
    	};

    	String.prototype.each = function ( fn ) {
    		return Digital.each( this.split( '' ), fn );
    	};

    	String.prototype.toInt = function () {
    		return this.replace( /[a-z]/ig, "" );
    	};

    	String.prototype.toFloat = function () {
    		return parseFloat( this.toInt() );
    	};

    	if ( !Array.from ) {
    		Array.from = function ( _arr_ ) {
    			var
    			    i = 0,
    			    final = [],
    			    length = _arr_.length;

    			for ( ; i <= length; i++ ) {
    				/*
    				  * now we can add all
    				  * items in the new arr
    				*/
    				final.push( _arr_[ i ] );
    			}

    			return final;
    		};
    	}
    } );
    /*
      * now we can manage the date
      * and time function
    */
    Digital.fn.storage.DateTimeManager = {
    	dateTimeManager: function ( _, _context_, _manager_ ) {
    		/*
    		  * date is an object we
    		  * use to manage the date
    		  * an other date
    		*/
            /*
              * if the first parameter is a 
              * string
            */
    		_ = isString( _ ) ? _ :
    		                    /*
    		                      * if this param is an
    		                      * array, it should content 
    		                      * all the parameter of Date
    		                      * Object
    		                    */
    		                     isArray( _ ) || isNumber( _ ) ? _
    		                     /*
    		                       * if this paramter is
    		                       * an object
    		                     */
    		                     : isObject( _ ) ? _ : {};

    	var 
		    context = {},
    		_main_ = _,
    		TypeManager = {
    			days: [ 'Mon', 'Tue', 'Wed', "Thu", 'Fri', 'Sat', 'Sun' ],
    			months: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
    			useOther: function ( _str_ ) {
    				var 
					    _days = this.days,
    				    _months = this.months,
    				    _c_days = context.days || [ ],
    				    _c_months = context.months || [ ];
    				    Digital.each( _days, function ( index ) {
    				    	_str_ = _str_.replace( this, _c_days[ index ] || this  );
    				    } );

    				    Digital.each( _months, function ( index ) {
    				    	_str_ = _str_.replace( this, _c_months[ index ] || this  );
    				    } );

    				return _str_;
    			},
    			useNative: function ( _str_ ) {
    				var 
					    _days = this.days,
    				    _months = this.months,
    				    _c_days = context.days || [ ],
    				    _c_months = context.months || [ ];
    				    Digital.each( _c_days, function ( index ) {
    				    	_str_ = _str_.replace( this || _days[ index ], _days[ index ]  );
    				    } );

    				    Digital.each( _c_months, function ( index ) {
    				    	_str_ = _str_.replace( this || _months[ index ], _months[ index ]  );
    				    } );
    				return _str_;
    			}
    		};
    		var 
			    timeStamp = isObject( _ ) 
				                ? _.timeStamp
    		                    : isNumber( _ ) ? _ : null,
    		    date = ( timeStamp ) 
				                ? new Date( timeStamp )
    		                    : isArray( _ ) || isString( _ ) ? new Date( _ ) : new Date();
                /*
                  * if the parameter is not
                  * a date valid parameter
                */
    		    date = date.toString() === 'Invalid Date' ? new Date() : date;

    		var _all_datas_ = {
    			    timeStamp: timeStamp,
    			    days: context.days,
    			    months: context.months,
    			    separatorList: [ "{}", '*', "[]" ],
    			    separator: "{}",
    			    separatorFn: {
    			  	    fns: {},
    			  	    get: function ( _ ) {
    			  	    	var fn = this.fns,
    			  	    	    final = _;
    			  	    	    Digital.each( _all_datas_.separatorList, function ( index ) {
    			  	    	    	if ( this === _all_datas_.separator ) {
    			  	    	    		fn = fn[ index ];
    			  	    	    	}
    			  	    	    } );
    			  	    	    final = fn( final );
    
    			  	    	return final;
    			  	    },
    			  	    length: 4
    			    }
    		};
    		var _this = this;
    		    Digital.each( _all_datas_.separatorList, function ( index ) {
					var 
					    steps = this,
    		    	    separatorFn = _all_datas_.separatorFn,
    		    	             _choose_ = function ( _, __ ) {
    		    		    return isString( _ ) || isNumber( _ ) ? _ : __ ;
    		    	    };
    		    	    /* 
    		    	      * now we can create
    		    	      * the replace function
    		    	    */
    		    	    separatorFn.fns[ index ] = ( steps === "{}" ) ? function ( _ ) {
    		    	    	/*
    		    	    	  * if the separtor is 
    		    	    	  * {} like {d}
    		    	    	*/
    		    	    	return _.replace( /\{([a-z]{1,})\}/ig, function ( str, $1 ) {
    		    	    		return _choose_( _this.get( $1 ), str );
    		    	    	} );
    		    	    } : ( steps === "*" ) ? function ( _ ) {
    		    	    	/*
    		    	    	  * if the separator is
    		    	    	  * '*' like d*
    		    	    	*/
    		    	    	return _.replace( /([a-z]{1,})\*/ig, function ( str, $1 ) {
    		    	    		return _choose_( _this.get( $1 ), str );
    		    	    	} );
    		    	    } : ( steps === '[]' ) ? function ( _ ) {
    		    	    	/*
    		    	    	  * if the separtor 
    		    	    	  * is [] like [d]
    		    	    	*/
    		    	    	return _.replace( /\[([a-z]{1,})\]/ig, function ( str, $1 ) {
    		    	    		return _choose_( _this.get( $1 ), str );
    		    	    	} );
    		    	    } : function ( _ ) {
    		    	    	/*
    		    	    	  * the default
    		    	    	  * function
    		    	    	*/
    		    	    	return _;
    		    	    };
    		    } );


    		    _this.setSeparator = function ( _ ) {
    		    	   _all_datas_.separator = [ "{}", '*', "[]" ].inArray( _ ) ? _ : "{}";
    		    	return _this;
    		    };

    		    _this.getSeparator = function () {
    		    	return _all_datas_.separator;
    		    };

    		    _this.setContext = function ( _ ) {

    		    	if ( !_ ) {
    		    		this;
    		    	}
    		    	    /*
    		    	      * we have to copy the
    		    	      * content of the parameter
    		    	    */

    		    	    context = isObject( _ ) ? toolsList.twinObject( {} , _ ) : {};
    		    	    if ( isArray( context.days ) && context.days.length == 7 ) {
    		    	    	/*
    		    	    	  * because the week begin
    		    	    	  * by sunday we have to put the
    		    	    	  * last element of the week to the
    		    	    	  * first position
    		    	    	*/
    		    	    	var 
							    _arr = [],
    		    	    	    _days = context.days;
    		    	    	    Digital.each( _days, function ( index ) {
    		    	    	    	if ( index === 6 ) {
    		    	    	    		_arr.unshift( this );
    		    	    	    	}
    		    	    	    	else {
    		    	    	    		_arr.push( this );
    		    	    	    	}
    		    	    	    } );

    		    	    	context.days = _arr;
    		    	    }
    		    	return _this;
    		    };

    		    _this.deleteContext = function () {
    		    	context = {};
    		    };

    		    _this.get = function ( _str_ ) {
    		    	if ( !_str_ ) {
    		    		/*
    		    		  * if there aren't any
    		    		  * argument in parameter
    		    		*/
    		    		return _main_ && isString( _main_ ) ? _this.get( _main_ ) : null;
    		    	}

    		    	var 
					    keysList = _manager_.keys,
    		    	    finalStr = '',
    		    	    _;
    		    	    Digital.each( keysList, function ( name ) {
    		    	    	var _obj_ = this;
    		    	    	    if ( _obj_.test( _str_ ) ) {
    		    	    	    	_ = _obj_;
    		    	    	    	_.name = name;
    		    	    	    }
    		    	    } );

    		    	    if ( _ ) {
    		    	    	finalStr = _.name === "month" ? _.analyse( date, context.months )
    		    	    	                              : ( _.name === "weekday" ) ? _.analyse( date, context.days )
    		    	    	                                                         : ( _.name === "today" ) ? _.analyse( date, context.days, context.months, _manager_.keys )
    		    	    	                                                                                  : _.analyse( date );
    		    	    }
    		    	    else {
    		    	    	finalStr = _manager_.general( date, _str_, context.days, context.months );
    		    	    }

    		    	    if ( !isNumber( finalStr ) && !isString( finalStr ) ) {
    		    	    	if ( _this[ "get" + _str_ ] ) {
    		    	    		finalStr = _this[ "get" + _str_ ]();
    		    	    	}
    		    	    }

    		    	return  isNumber( finalStr ) || isString( finalStr )
					                ? finalStr 
									: _all_datas_.separatorFn.get( _str_ );

    		    };

    		    Digital.each( [ "year" , "monthday", "weekday", "month", "today" ] , function ( index ) {
    		    	/*
    		    	  * now we want to add get 
    		    	  * function like getWeekday
    		    	*/
    		    	var 
					    basename = this,
						_fn_name_part1_ = "get",
    		    	    _fn_name_part2_ = basename[ 0 ].toUpperCase() + basename.substring( 1 , basename.length ),
    		    	    _fn_name_ = _fn_name_part1_ + _fn_name_part2_;
    		    	    _this[ _fn_name_ ] = function () {
    		    	    	return _this.get( basename );
    		    	    };
    		    } );

    		    var _props_list_ = Object.getOwnPropertyNames( Date.prototype );
    		        Digital.each( _props_list_, function ( index ) {
    		        	/*
    		        	  * now we had each native
    		        	  * method of Date Object
    		        	  * if the method exist already
    		        	  * we wouldn't add it
    		        	*/
    		        	var _prop_ = this;
    		        	    if ( _this[ _prop_ ] ) {
    		        	    	/* 
    		        	    	  * if the prop exist
    		        	    	  * already
    		        	    	*/
    		        	    	return;
    		        	    }
    		        	    _this[ _prop_ ] = function ( _ ) {
    		        	    	/*
    		        	    	  * that is the new
    		        	    	  * method
    		        	    	*/
    		        	    	_ = arguments[ 0 ];

    		        	    	if ( isString( _ ) && _prop_.toLowerCase().search( "month" ) != -1 ) {
    		        	    		_ = TypeManager.useNative( _ );
    		        	    		Digital.each( TypeManager.months, function ( index ) {
    		        	    			/*
    		        	    			  * we search the index
    		        	    			  * of the element
    		        	    			*/
    		        	    			if ( isString( _ ) && _.toLowerCase() === this.toLowerCase() ) {
    		        	    				_ = index;
    		        	    			}
    		        	    		} );
    		        	    	}
    		        	    	else if ( isString( _ ) && _prop_.toLowerCase().search( "day" ) != -1 ) {
    		        	    		_ = TypeManager.useNative( _ );
    		        	    		Digital.each( TypeManager.days, function ( index ) {
    		        	    			/*
    		        	    			  * we search the index
    		        	    			  * of the element
    		        	    			*/
    		        	    			if  ( isString( _ ) &&  _.toLowerCase() === this.toLowerCase() ) {
    		        	    				_ = index;
    		        	    			}
    		        	    		} );
    		        	    	}
    		        	    	/*
    		        	    	  * we modify the new first element
    		        	    	  * of the array ( list of arguments )
    		        	    	*/
    		        	    	arguments[ 0 ] = _;
    		        	    	    var 
								        _res = date[ _prop_ ].apply( date, Array.from( arguments ) ), //Array.from( arguments )
    		        	    	        months = context.months,
    		        	    	        days = context.days;

    		        	    	    if ( _prop_.toLowerCase().search( "month" ) != -1 ) {
    		        	    	   	    _res = isArray( months ) ? months[ _res ] : _res;
    		        	    	    }
    		        	    	    else if ( _prop_.toLowerCase().search( "day" ) != -1 ) {
    		        	    	   	    _res = isArray( days ) ? days[ _res ] : _res;
    		        	    	    }
    		        	    	return ( _prop_.toLowerCase().search( "set" ) != -1 ) ? _this : _res;
    		        	    };
    		        } );

    		_this.set = function ( _prop_, _val_ ) {
    			if ( isString( _prop_ ) && _this[ "set" + _prop_ ] ) {
    				_this[ "set" + _prop_ ]( _val_ );
    			}
    			else if ( isObject( _prop_ ) ) {
    				Digital.each( _prop_, function ( name ) {
    					if ( _this[ "set" + name ] ) {
    						_this[ "set" + name ]( this );
    					}
    				} )
    			}
    			return this;
    		};

    		_this.toString = function () {
    			return TypeManager.useOther( date.toString() );
    		};

    		_this.setContext( _context_ );
    	},
    	date: function ( _i, _c ) {
    		return new this.dateTimeManager( _i, _c, {
    			keys: {
    				year: {
    					test: function ( _str_ ) {
    						return /^year$/.test( _str_ );
    					},
    					analyse: function ( date ) {
    						return date.getFullYear();
    					}
    				},
    				month: {
    					test: function ( _str_ ) {
    						return /^month$/.test( _str_ );
    					},
    					analyse: function ( date, months ) {
    						return isArray( months ) ? months[ date.getMonth() ] : date.getMonth();
    					}
    				},
    				monthday: {
    					test: function ( _str_ ) {
    						return /^monthday$/.test( _str_ );
    					},
    					analyse: function ( date ) {
    						return date.getDate();
    					}
    				},
    				weekday: {
    					test: function ( _str_ ) {
    						return /^weekday$/.test( _str_ );
    					},
    					analyse: function ( date, days ) {
    						return isArray( days ) ? days[ date.getDay() ] : date.getDay();
    					}
    				},
    				today: {
    					test: function ( _str_ ) {
    						return /^today$/.test( _str_ );
    					},
    					analyse: function ( date, days, months, _ ) {
    						return _.weekday.analyse( date, days ) + ', '
    						        + _.monthday.analyse( date ) + ' '
    						        + _.month.analyse( date, months ) + ' '
    						        + _.year.analyse( date );
    					}
    				}
    			},
    			general: function ( date, key, days, months ) {
    				var list =  {
    					month: isArray( months ) ? months[ date.getMonth() ] : date.getMonth(),
    					year: date.getFullYear(),
    					monthday: date.getDate(),
    					weekday: isArray( days ) ? days[ date.getDay() ] : date.getDay(),
    					sec: date.getSeconds(),
    					min: date.getMinutes(),
    					hour: date.getHours()
    				};
    				list[ "Y" ] = list.year;
    				list[ "Md" ] = list.monthday;
    				list[ "Wd" ] = list.weekday;
    				list[ "M" ] = list.month;

    				return list[ key ];
    			}
    		} );
    	}
    };

    Manager.api.externalApi.date = function ( _, __ ) {
    	/*
    	  * we can now create a new
    	  * object date and return it 
    	*/
    	return Digital
		        .fn.storage
    	        .DateTimeManager.date( _, __ );
    };
    /*
      * now we will has date
      * static method
    */
    Digital.update( Manager.api.externalApi.date, {
		now: function () {
			return Date.now();
		},
		UTC: function () {
    	    return Date.UTC( Array.from( arguments ) );
        },
		parse: function ( _str_ ) {
    	    return Date.parse( _str_ );
        }
	} );

	Digital.update( Digital, {
		rand: function ( spow ) {
			    spow = isNumber( spow ) ? spow : 10;
		    return Math.round( Math.random( ) * spow );
		},
		randNative: function ( spow ) {
		    return Math.random( ) * ( isNumber( spow ) ? spow : 10 );
		}
	} );

    /*
       * now we will manage the Ajax
       * with the XMLHttpRequest an other
       * method we can use for it 
    */
    Manager.ajax.ajaxObject = function ( _obj_ ) {
    	/*
    	  * fn represent the main
    	  * Ajax object which will be
    	  * created when the the .ajax 
    	  * method will be call
    	*/
        
        /*
          * datas content all request
          * datas information set by the user
        */
    	this.datas = _obj_;
    	this.getXHR = function () {
    		/*
    		  * getXHR will return the valid
    		  * ajax extension for the 
    		  * support
    		*/
    		var xhr; // content the supported ajax Object
    		if ( wn.ActiveXObject ) {
    			/*
    			  * the implementation for
    			  * intenet explorer ( Microsoft implementation )
    			*/
    			try {
    				xhr = new ActiveXObject( "Msxml2.XMLHTTP" );
    			} catch( e ) {
    				xhr = new ActiveXObject( "Microsoft.XMLHTTP" );
    			}
    		}
    		else {
    			/*
    			  * all new navigator implement the
    			  * XMLHttpRequest object 
    			  * Mozilla Firefox
    			  * chrome
    			  * safari and us
    			  * you can see the MDN's reference
    			*/
    			xhr = new XMLHttpRequest();
    		}
    		return ( xhr ) ? xhr : error( "( Digital.ajax ) you navigator doesn't support XMLHttpRequest" );
    	};

    	this.xhr = this.getXHR();
    	this.start = function () {
    		this.method = this.datas.use || "get"; // content the choosen method ( Get, Post or Head )
    		    if ( !isString( this.method ) || [ "post", "get", "head", "put", 
    		    	                                "delete", "connect", "options",
    		    	                                "trace", "patch" ].indexOf( this.method.toLowerCase().trim() ) === -1 ) {
    		    	/*
    		    	  * if there isn't a
    		    	  * specific specific method or
    		    	  * the var isn't a method
    		    	*/
    		    	return error( "(Digital.ajax) " + this.method + " is not a valid ajax method" );
    		    }

			Digital.update( this, {
				method: this.method.toUpperCase().trim(),
				/*
    		      * this.url content the location of
    		      * the page needed
    		    */
			    url: this.datas.url,
    		    /*
    		      * the delay for abort
    		      * the request
    		    */
			    timeout: this.datas.timeout,
			    /*
    		      * content all headers that
    		      * which we like to set
    		    */
			    headers: isObject( this.datas.headers ) ? this.datas.headers : { },
				/*
    		      * content the list of
    		      * data which we like to send
    		    */
			    dataList: Digital.call( function ( ) {
					return !isObject( this.datas.datas ) ? 
    		                /*
    		                  * if datas is a string, 
    		                  * the string have to be a html 
    		                  * selector of a form wich we
    		                  * will get data
    		                */
    		                isString( this.datas.datas ) ? Digital
							                                    .builder( this.datas.datas  )
    		                                                    .form().toData() :
    		                /*
    		                  * if datas is not an object or
    		                  * a string we have to return an empty
    		                  * object
    		                */ 
    		                { } : this.datas.datas;
				}, this )
			} );
    		
			Digital.call( function ( ) {
				return Digital.update( this, {
					/*
    		            * content the type of
    		            * the response which send
    		        */
    		        type: this.datas.type,
    		        /*
    		          * the list of event which would like
    		          * to set up
    		        */
    		        listEvent: isObject( this.datas.on ) ? this.datas.on : { },
    		        /*
    		          * if the response is
    		          * async
    		        */
    		        async: ( !isBoolean( this.datas.async ) ) ? true : this.datas.async,
    		        /*
    		          * the username and the
    		          * password
    		        */
    		        username: this.datas.username ? this.datas.username : null,
    		        password: this.datas.password ? this.datas.password : null,
					/* *
					    * Advanced function for the 
						* ajax request 
					*/
    		        withCredentials: this.datas.credentials || false,
    		        mimeType: this.datas.mimeType || null
				} );
			}, this );
    		/*
    		  * now we can start the contruction
    		  * of our ajax request
    		*/
    		    this.init();
    		return this;
    	};

		this.open = function () {
			return this.start();
		};

    	this.setHeaders = function ( _obj_ ) {
    		var _xhr_ = this.xhr;
    		    Digital.each( _obj_ , function ( name ) {
    		    	_xhr_.setRequestHeader( name, this );
    		    } );
    		return this;
    	};

    	this.setType = function ( _ ) {
    		/*
    		   * lis of the avalaible response
    		   * type form the MDN refence
    		*/
    		var _types_ = [ " ", "text", "json", "xml", "blob", "ms-tream", "document" ];
    		    if ( !_types_.inArray( _ ) ) {
    		    	_ = "text";
    		    }
    		  this.xhr.responseType = _;
    		return this;
    	};

    	this.setTimeout = function ( _time_ ) {
    		  this.xhr.timeout =  isNumber( _time_ ) ? _time_ : null;
    		return this;
    	};

    	this.init = function () {
    		var 
    		    xhr = this.xhr,
    		    method = this.method,
    		    datas = this.dataList,
    		    eventList = this.listEvent,
    		    type = this.type,
    		    headers = this.headers,
    		    url = this.url,
    		    timeout = this.timeout,
    		    async = this.async,
    		    username = this.username,
    		    userpassword = this.userpasswor,
    		    credentials = this.withCredentials,
    		    mimeType = this.mimeType,
    		    dataObject;

    		    /*
    		      * now we can open our
    		      * our ajax Request 
    		    */
    		    function open( url ) {
    		    	xhr.open( 
						method.toUpperCase(), 
						url, 
						async, 
						username, 
						userpassword 
					);
    		    };

    		    if ( method.toLowerCase() === "post" ) {
    		    	dataObject = new FormData();
    		    	    Digital.each( datas, function ( name ) {
    		    	    	/*
    		    	    	  * we append informations!
    		    	    	  * in the formData
    		    	    	*/
    		    	    	dataObject.append( name, this );
    		    	    } );
    		    	open( url );
    		    }
    		    else {
    		    	/*
    		    	  * for methods get,
    		    	  * put and delete
    		    	*/
    		    	    dataObject = toolsList.parseDataUrl( datas );
    		    	    dataObject = dataObject ? "?" + dataObject : "";
    		    	open( url + dataObject );
    		    }

    		    this.finalDatas = dataObject;

    		    this
				    .setHeaders( headers )
    		        .setType( type )
    		        .setTimeout( timeout )
    		        .xhr.withCredentials = credentials;

    		    if ( mimeType && isString( mimeType ) ) {
    		    	/*
    		    	  * we can overide the 
    		    	  * mimeType
    		    	*/
    		    	xhr.overrideMimeType( mimeType );
    		    }
                
                /*
                  * now we can set all
                  * event
                */
    		    this.on( eventList );
    	};

    	var 
		    _ajax_ = this,
    	    _xhr_ = this.xhr,
    	    /*
    	      * this function will be call
    	      * in the onreadystate event
    	    */
    	    _readyFunc = null;

    	Digital.each( ( "loadstart load loadend progress error abort" ).split( " " ), function () {
    		var _event_ = this;
    		    _ajax_[ _event_ ] = function ( callback ) {
    		    	if ( _event_ === "abort" && !callback ) {
    		    		/*
    		    		  * if abort is call and
    		    		  * the haven't any parameter we
    		    		  * heve to abort the request 
    		    		*/
    		    		_xhr_.abort();
    		    	}

    		    	if ( !isFunction( callback ) ) {
    		    		return;
    		    	}

    		    	_xhr_[ "on" + _event_ ] = function ( e ) {
    		    		if ( _event_ === "progress" ) {
    		    			e.percent = Math.ceil( ( e.loaded / e.total ) * 100 );
    		    		}
    		    		callback.call( this, e );
    		    	};

    		    	return _ajax_;
    		    };
    	} );

    	Digital.call( function () {
    		/*
    		  * this represent all
    		  * event will be add at the
    		  * ajax method
    		*/
    		[ 'headersreceived', 'loading', 'failed', 'done' ].each( function ( ) {
    			var 
				    _event_ = this;
    			    _ajax_[ _event_ ] = function ( callback ) {
    			    	/*
    			    	  * we have to verify in 
    			    	  * first if the callback is 
    			    	  * function
    			    	*/
    			    	_ajax_[ _event_ ].fn = !isFunction( callback ) ?
    			    	function () {
    			    		return _ajax_;
    			    	} : callback;

    			    	return this;
    			    };
    			    _ajax_[ _event_ ].fn = function () {
    			    	return;
    			    };
    		} );
    	} );

    	_ajax_.readystatechange = function ( callback ) {
    		   _readyFunc = ( isFunction( callback ) ) ? callback: null;
    		return this;
    	};

    	function statechange( e ) {
    		var 
			    _state = this.readyState,
    		    _status = this.status;

    		    if ( _state == 2 ) {
    		    	_ajax_.headersreceived.fn.call( this, e );
    		    }
    		    else{
					if ( _state == 3 ) {
    		    	    _ajax_.loading.fn.call( this, e );
    		        }
    		        else {
						if ( _state == 4 && ( _status == 200 || _state == 0 ) ) {
    		    	        _ajax_.done.fn.call( this, e );
    		            }
    		            else if ( _state == 4 && !( _status == 200 || _state == 0 ) ) {
    		    	        _ajax_.failed.fn.call( this, e );
    		            }
					}
				}

    		if ( _readyFunc ) {
    			_readyFunc.call( this, e );
    		}
    	};

    	_ajax_.xhr.onreadystatechange = function ( e ) {
    		statechange.call( this, e );
    	};

    	_ajax_.on = function ( _event_, callback, _ ) {
    		if ( !isObject( _event_ ) && ( !isString( _event_ ) || !isFunction( callback ) ) ) {
    			return this;
    		}

    		if ( isObject( _event_ ) ) {
    			Digital.each( _event_, function ( name ) {
    				/*
    				  * here callback is the
    				  * phase of the capure 
    				  * of addEventlistener
    				*/
    				_ajax_.xhr.addEventListener( name, this, callback );
    			} );
    		}
    		else if ( isString( _event_ ) && isFunction( callback ) ) {
    			_ajax_.xhr.addEventListener( _event_, callback, _ );
    		}

    		return this;
    	};

    	_ajax_.send = function () {
    		/*
    		  * to send the request to
    		  * the server
			*/
			
    		   this.xhr.send( this.finalDatas );
    		return this;
    	};
    };
    var
	    _extern = Digital.fn.externalFunction,
        _intern = Digital.fn.internalFunction;

    Digital.init.extends( 
		_intern, 
		Manager.api.internalApi 
	);

    Digital.init.extends( _extern, toolsList.twinObject( Manager.api.externalApi, {
    	ajax: function ( _ ) {
    		/*
    		  * ajax method is used to
    		  * open and start an XMLHttpRquest
    		  * using the ajaxObject in the Manger
    		  * if the support doesn't support the 
    		  * XMLHttpRequest, we have to generate 
    		  * an error else we will send the request
    		  * an return the instance of the object
    		*/
    		return new Manager.ajax
    		                    .ajaxObject( _ )
    		                    .start()
    		                    .send();
    	},
		ajaxObject: function ( _ ) {
    		/*
    		  * ajax method is used to
    		  * open and start an XMLHttpRquest
    		  * using the ajaxObject in the Manger
    		  * if the support doesn't support the 
    		  * XMLHttpRequest, we have to generate 
    		  * an error else we will send the request
    		  * an return the instance of the object
    		*/
    		return new Manager
			            .ajax
    		            .ajaxObject( _ );
    	},
    	GET: function ( _url_, _datas_, _headers_, _param_ ) {
    		/*
    		  * GET is a short-hand method
    		  * we use to send an XMLHttpRequest using the
    		  * method get 
    		*/
    		var list = {
    			use: "get",
    			url: _url_,
    			datas: _datas_ || {},
    			headers: _headers_
    		};

    		return this.ajax( isObject( _param_ ) ? 
    			              toolsList.twinObject( _param_, list ) : list );
    	},
    	POST: function ( _url_, _datas_, _headers_, _param_ ) {
    		/*
    		  * GET is a short-hand method
    		  * we use to send an XMLHttpRequest using the
    		  * method pot 
    		*/
    		var list = {
    			use: "post",
    			url: _url_,
    			datas: _datas_ || {},
    			headers: _headers_
    		};

    		return this.ajax( isObject( _param_ ) ? 
    			              toolsList.twinObject( _param_, list ) : list );
    	},
    	HEAD: function ( _url_, _datas_, _headers_, _param_ ) {
    		/*
    		  * GET is a short-hand method
    		  * we use to send an XMLHttpRequest using the
    		  * method pot 
    		*/
    		var list = {
    			use: "head",
    			url: _url_,
    			datas: _datas_ || {},
    			headers: _headers_
    		};
    		return this.ajax( isObject( _param_ ) ? 
    			              toolsList.twinObject( _param_, list ) : list );
    	}
    } ) );
    /*
      * now we can manage storage api
      * Digital could be able to use LocalStorage Api
      * Session api and Cookie api,in the second
      * time it could be able to use indexedDB api
    */
    /*
      * we manage localStorage api
      * and SessionStorage api
    */
    Digital.fn.storageManager = function ( storage, _key_ ) {
    	/*
    	  * _key_ content the key of the index content
    	  * in the localStroage api
    	*/
        var 
		    _this = this;
    	    _this.key = !isObject( _key_ ) && !isArray( _key_ ) ? _key_ : "";
    	    _this.storage = storage;
            
            _this.setKey = function ( _key_ ) {
            	/*
            	  * to change the 
            	  * key of the storage
            	*/
            	   _this.key = !isObject( _key_ ) && !isArray( _key_ ) ? _key_ : _this.key;
            	return this;
            };

    	    _this.get = function () {
    	    	/*
    	    	  * for return value
    	    	  * of the storage key
    	    	*/
    	    	return storage.getItem( _this.key );
    	    };

    	    _this.set = function ( _ ) {
    	    	if ( !isObject( _ ) && !isArray( _ ) ) {
    	    		/*
    	    		  * if the value is a string 
    	    		  * we can derectly set this value
    	    		*/
    	    		storage.setItem( _this.key, _ );
    	    	}
    	    	else if ( _ ) {
    	    		/*
    	    		  * if the value is an object
    	    		  * we have to stringify thi object
    	    		  * before add it in the storage
    	    		*/
    	    		storage.setItem( _this.key, JSON.stringify( _ ) );
    	    	}

    	       return _this;
    	    };

    	    _this.remove = function () {
    	    	  /*
    	    	    * we can remove now
    	    	    * the key in the storage
    	    	  */
    	    	  storage.removeItem( _this.key );
    	    	return _this;
    	    };
    };

    Digital.fn.externalFunction.extends( {
    	local: function ( _ ) {
    		/*
    		  * local help the user
    		  * to use localStorage api 
    		  * with two way
    		  * in the first hand, the user 
    		  * is able to call the function
    		  * which return an instance of storage Manager
    		  * in the second hand, the use can use statics
    		  * Method
    		*/
    		if ( !storage ) {
    			return false;
    		}

    		return new Digital.fn.storageManager( storage, _ );
    	},
    	session: function ( _ ) {
    		/*
    		  * session help the user
    		  * to use sessionStorage api 
    		  * with two way
    		  * in the first hand, the user 
    		  * is able to call the function
    		  * which return an instance of  StorageManager
    		  * in the second hand, the use can use statics
    		  * Method
    		*/
    		if ( !session ) {
    			return false;
    		}
    		return new Digital.fn.storageManager( session, _ );
    	}
    } );

    /*
      * now we can create
      * localStorage and sessionStorage
      * static methods
    */

    Digital.call( function () {
    	var 
    	    _list_ = [
    	       Digital.fn.externalFunction.local, 
    	       Digital.fn.externalFunction.session
    	    ];
    	    Digital.each( _list_, function ( ) {
    	    	var 
				    fn = this,
    	    	    /*
    	    	      * the instance of the
    	    	      * storage manager
    	    	    */
    	    	    _instance_ = fn(),
    	    	    storage = _instance_.storage;
				
				Digital.update( fn, { 
					set: function ( _, _val_ ) {
    	    	    	    _instance_
							        .setKey( _ )
    	    	    	            .set( _val_ );
    	    	    	return fn;
    	    	    },
					get: function ( _ ) {
    	    	    	return _instance_
						            .setKey( _ )
    	    	    	            .get();
    	    	    },
					remove: function ( _ ) {
    	    	    	return _instance_
						            .setKey( _ )
    	    	    	            .remove();
    	    	    },
					setAll: function ( _ ) {
    	    	    	if ( isObject( _ ) ) {
    	    	    		/*
    	    	    		  * if the parameter is an
    	    	    		  * object we can add all its item
    	    	    		  * in the storage
    	    	    		*/
    	    	    		Digital.each( _, function ( key ) {
    	    	    			 _instance_.setKey( key )
    	    	    			           .set( this );
    	    	    		} );
    	    	    	}

    	    	        return fn;
    	    	    },
					key: function ( _ ) {
    	    	    	/*
    	    	    	  * for return a value
    	    	    	  * of a key
    	    	    	*/
    	    	    	return storage.key( _ );
    	    	    },
					clear: function () {
    	    	    	/*
    	    	    	  * for delete all items
    	    	    	  * of the storage
    	    	    	*/
    	    	    	    storage.clear();
    	    	    	return fn;
    	    	    },
					cursor: function ( callback ) {
    	    	    	/*
    	    	    	  * to run all items of 
    	    	    	  * the storage
    	    	    	*/
    	    	    	var 
						    _arr = new Array( storage.length );
    	    	    	    Digital.each( _arr, function ( index ) {
    	    	    	    	var key = fn.key( index ),
    	    	    	    	    value = fn.get( key );
                                    
                                    /*
                                      * now we can call our callback
                                      * and put in paramater the key
                                      * the index and the value of each
                                      * item of the storage
                                    */
    	    	    	    	    callback.apply( fn, [ key, value, index ] );
    	    	    	    } );

    	    	    	return fn;
    	    	    }
				} );
    	    } );
    } );

    Digital.fn.cookieManager = function ( _key_ ) {
        /*
    	   * _key_ content the key of the index content
    	   * in the localStroage api
        */   
    	var 
		    _this = this;
    		_this.key = !isObject( _key_ ) || !isArray( _key_ ) ? _key_ : "";
    	/*
    	  * this object will mange the
    	  * time 
    	*/

    	var Time = {
    		date: new Date(),
            getTimeBySecond: function ( _seconds_ ) {
            	/*
            	  * this function return a date of the
            	  * expiration of the cookie using
            	  * seconds
            	*/
            	   this.date.setTime( this.date.getTime() + ( ( isNumber( _seconds_ ) ? _seconds_ : 1 ) * 1000 ) );
            	return this.date.toString();
            },
            getExpireDate: function () {
            	/*
            	  * this function return the date
            	  * of the first of january 1999
            	*/
            	   this.date.setTime( this.date.getTime() );
            	return this.date.toString();
            }
    	};
    	        
    	    _this.setKey = function ( _key_ ) {
    	        /*
    	          * to change the 
    	          * key of the storage
    	        */
    	        	_this.key = !isObject( _key_ ) || !isArray( _key_ ) ? _key_ : _this.key;
    	        return this;
    	    };

    	    _this.set = function ( _val_, _expire_, params ) {
    	    	/*
    	    	  * for set a cookie (
    	    	  * add a cookie in the list of cookie )
    	    	*/
    	    	_expire_ = isNumber( _expire_ ) ? _expire_ : 1;
    	    	_val_ = !isObject( _val_ ) || !isArray( _val_ ) ? _val_ 
    	    	                               : _val_ ? JSON.stringify( _val_ ) : "";
                /*
                  * content othes parameter
                  * for the cookie

                  * as other parameter for
                  * cookie they are :
                  * {
	                 secure: true,
	                 max-age: ...,
	                 domain: ...,
	                 path: ...,
	                 samesite: [ lax, strict ],
                  }
                */
    	    	params = isObject( params ) ? params : {};
    	    	params.path = ( "path" in params ) ? params.path : "/";
    	    	params.SameSite = ( "SameSite" in params ) ? params.SameSite : "Strict";

    	    	var 
    	    	    _obj_ = {};
    	    	    _obj_[ this.key ] = _val_;
    	    	    _obj_.expires = Time
    	    	                      .getTimeBySecond( _expire_ )
    	    	                      .split( '(' )[ 0 ];

    	    	 document.cookie = toolsList.parseDataUrl( 
    	    	 	                  toolsList.twinObject( _obj_, params ), 
    	    	 	                  ";", false
    	    	 	                );
    	        return _this;
    	    };

    	    _this.get = function () {
    	    	/*
    	    	  * now, we want to return a
    	    	  * value of a cookie
    	    	*/
    	    	var 
				    _str_ = document.cookie,
    	    	    _list_ = toolsList.parseData( _str_, ";" );
    	    	return _list_[ _this.key ];
    	    };

    	    _this.remove = function () {
    	    	/*
    	    	  * for remove cookie,
    	    	  * we have to passe an empty
    	    	  * value and an expire date
    	    	*/
    	    	var 
    	    	    _obj_ = {};
    	    	    _obj_[ this.key ] = '';
    	    	    _obj_[ 'max-age' ] = 0;

    	    	 document.cookie = toolsList.parseDataUrl( 
    	    	 	                  _obj_, 
    	    	 	                  ";"
    	    	 	                );
    	    	return _this;
    	    };
    };

    Digital.fn.externalFunction.extends( {
        cookie: function ( _ ) {
        	/*
        	  * now we create an instance
        	  * of the cookieManager and
        	  * return it
        	*/
        		return new Digital.fn.cookieManager( _ );
        }
    } );
    /*
      * now we can add cookie
      * statics function
    */
    Digital.call( function () {
    	var fn = Digital.fn.externalFunction
    	                   .cookie,
    	    /*
    	      * _instance content an empty instance
    	      * of an cookie object
    	    */
    	    _instance_ = fn();

    	    fn.set = function ( _key_, _val_, _expire_, _ ) {
    	    	  _instance_.setKey( _key_ )
    	    	            .set( _val_, _expire_ , _ );

    	    	return fn;
    	    };

    	    fn.get = function ( _key_ ) {
    	    	
    	    	return _instance_.setKey( _key_ )
    	    	                 .get();
    	    };

    	    fn.remove = function ( _key_ ) {
    	    	   _instance_.setKey( _key_ )
    	    	             .remove();

    	    	return fn;
    	    };

    	    fn.setAll = function ( _, expires, datas ) {
    	        if ( isObject( _ ) ) {
    	    	    /*
    	    		  * if the parameter is an
    	    		  * object we can add all its item
    	    		  * in the storage
    	    	    */
    	    	    
    	    	    Digital.each( _, function ( key ) {
    	    		     _instance_.setKey( key )
    	    				       .set( this, expires, datas );
    	    		} );
    	    	}

    	    	return fn;
    	    };

    	    fn.cursor = function ( callback ) {
    	    	var _str_ = document.cookie,
    	    	    _list_ = toolsList.parseData( _str_, ";" );
    	    	var i = 0;

    	    	    Digital.each( _list_, function ( name ) {
    	    	    	/*
    	    	    	  * now we can add parameter
    	    	    	  * of the callback
    	    	    	*/
    	    	    	callback.call( fn, name, this, i );

    	    	    	i++;
    	    	    } );

    	    	return fn;
    	    };

    	    fn.key = function ( _ ) {
    	    	/*
    	    	  * return a key of a
    	    	  * cookie using his index
    	    	*/

    	    	var _res;
    	    	    fn.cursor( function ( name, value, index ) {
    	    	    	_res = name === _ || index === _ ? name : _res;
    	    	    } );

    	    	return _res;
    	    };

    	    fn.clear = function () {
    	    	/*
    	    	  * delete all items
    	    	  * contents in the cookie
    	    	  * storage
    	    	*/
    	    	    fn.cursor( function ( key ) {
    	    		   fn.remove( key );
    	    	    } );
    	        return this;
    	    };
    } );

    Digital.fn.storage.Promise = function ( callback, obj, nexted ) {
    	/*
    	  * storage.promise is an
    	  * actificial promise object
    	*/
    	var datas = {
    		fn:{
    			resolveFn: function () {
    				return;
    			},
    			rejectFn: function () {
    				return;
    			}
    		},
    		status: 'pending'
    	},
    	promise = this;
    	this.fn = {
    		resolve: function () {
				promise.status = datas.status = 'fulfilled';
    			return datas.fn
    			            .resolveFn
    			            .apply( promise, Array.from( arguments ) );
    		},
    		reject: function () {
				promise.status = datas.status = 'rejected';
    			return datas.fn
    			            .rejectFn
    			            .apply( promise, Array.from( arguments ) );
    		}
    	};

    	callback = isFunction( callback ) ? callback :  function ( resolve, reject ) {
    		return reject( 
				storage.error( "PromiseParameterIsNotAFunction" )
			);
    	};

    	this.then = function ( fn, reject ) {
    		/*
    		  * in the first hand we have to verify if 
    		  * the parameter is a fn,
    		*/
			var 
			    object = this;
			return nexted === true && isFunction( fn ) ? new Digital.builder.Promise( function ( resolve, reject ) {
				return object.setThen( function ( ) {
					try{
						return resolve( 
							fn.apply( this, Array.from( arguments ) ) 
						);
					}catch( e ){
						return reject( e );
					}
				} );
			}, obj, nexted ).setCatch( reject || datas.fn.rejectFn ) : Digital.call( function ( ) {
				return Digital.call( function ( ) {
					object.setThen( fn );
					    if ( isFunction( reject ) )
					    	object.setCatch( reject );
					return object;
				} );
			}, this );
    	};

    	this.catch = function ( fn, reject ) {
    		/*
    		  * in the first hand we have to verify if 
    		  * the parameter is a fn,
    		*/
			var 
			    object = this;
			return nexted === true && isFunction( fn ) ? new Digital.builder.Promise( function ( resolve, reject ) {
				return object.setCatch( function ( ) {
					try{
						return resolve( 
							fn.apply( this, Array.from( arguments ) ) 
						);
					}catch( e ){
						return reject( e );
					}
				} );
			}, obj, nexted ).setCatch( reject || datas.fn.rejectFn ) : Digital.call( function ( ) {
				return Digital.call( function ( ) {
					object.setCatch( fn );
					    if ( isFunction( reject ) )
					    	object.setCatch( reject );
					return object;
				} );
			}, this );
    	};

		this.setThen = function ( fn ) {
    		/*
    		  * in the first hand we have to verify if 
    		  * the parameter is a fn,
    		*/
    		    datas.fn.resolveFn = isFunction( fn ) 
				            ? fn 
							: Digital.tools.emptyFunction;
			if ( datas.status === 'fulfilled' )
				this.fn.resolve();
    		return this;
    	};

		this.setCatch = function ( fn ) {
    		/*
    		  * in the first hand we have to verify if 
    		  * the parameter is a fn,
    		*/
    		    datas.fn.rejectFn = isFunction( fn ) 
				            ? fn 
							: Digital.tools.emptyFunction;
			if ( datas.status === 'rejected' )
				this.fn.reject();
    		return this;
    	};

    	isObject( obj ) ? Digital.call( function () {
    		/*
    		  * if obj is a function we have
    		  * to add all obj function
    		  * to the promise
    		*/
    		Digital.each( obj, function ( name ) {
    			if ( isFunction( this ) ) {
    				promise[ name ] = function () {
    					return this();
    				};
    			}
    			else {
    				promise[ name ] = this;
    			}
    		} );

    	} ) : "";
		this.status = datas.status;
    	/*
    	  * now we can call the
    	  * function
    	*/
    	try{
			callback.call( this, this.fn.resolve, this.fn.reject );
		}catch( e ) {
			this.fn.reject( e );
		}
    };

	Digital.update( Digital.fn.storage.Promise, {
		all: function ( list, obj, nexted ) {
			return new Digital.builder.Promise( function ( resolve, reject ) {
				if ( !( 'length' in list ) )
				    return error( ' ( Digital.Promise ) the first argument should be iterable' );
					var 
					    end = 0,
					    level = 0,
						final = function ( val ) {
							if ( level === list.length )
								return end === level 
								        ? resolve( val ) 
										: reject( new Error( ' ( Digital.Promise ) an error occurs. ' ) );
						};
					Digital.each( Array.from( list ), function ( ) {
						var 
						    promise = new Digital.builder.Promise( this, obj, nexted );
							promise.then( function () {
								    end++;
								    level++;
								return final( this );
							} );

							promise.catch( function ( ) {
								    level++;
								return final( this );
							} );
					} );
				return this;
			} );
		},
		set: function ( _ ) {
			return new Digital
			            .builder
						.Promise( _ );
		}
	} );

    /*
      * now we can create the db system
      * of Digital
    */

    Digital.fn.DB = function ( _db_name_ ) {
    	/*
    	  * Digital.fn.DB is the varructor of the
    	  * indexedDB system of Digital it take like 
    	  * parameter only one String ( the name of the db )
    	*/
        var
            isIndexedDB = "indexedDB" in wn,
            isKeyRange = "IDBKeyRange" in wn,
            infos = {};

    	var 
		    _this = this,
    	    storage = {
    	    	/*
    	    	  * transaction content the active 
    	    	  * transaction
    	    	*/
    	    	transaction: null,
    	    	/*
    	    	  * request content the active
    	    	  * request
    	    	*/
    	    	request: null,
    	    	index: null,
    	    	promise: Digital.fn.storage.Promise,
    	    	error: function ( error_name_ ) {
    	    		/*
    	    		  * for create a new 
    	    		  * error
    	    		*/
    	    		return new Error( isString( error_name_ ) ? error_name_ : "error" );
    	    	},
    	    	fn: {
    	    		/*
    	    		  * the list of function
    	    		  * we have to exec for each
    	    		  * event
    	    		*/
    	    	}
    	    };

    	storage.emptyFunction = function () {
    		return;
    	};
        
        /*
          * the list of active
          * request
        */
        var request = {
        	fn: {},
        	create: {
        		table: {}
        	},
        	others: {
        		transaction: null,
        		table: null
        	},
        	active: "",
        	reject: function () {
        		isFunction( this.fn.reject )
        		                           ? this.fn
        		                                .reject
        		                                .apply( _this, Array.from( arguments) ) 
        		                           : "";
                
                /*
                   * we remove this function
                   * because the request is finish
                */
        		  this.fn.reject = storage.emptyFunction;
        		return;
        	},
        	resolve: function () {
        		isFunction( this.fn.resolve )
        		                          ? this.fn
        		                                  .resolve
        		                                  .apply( _this, Array.from( arguments) ) 
        		                          : "";
                /*
                   * we remove this function
                   * because the request is finish
                */
        		   this.fn.resolve = storage.emptyFunction;
        		return;
        	}
        };
        
        /*
          * the name of the
          * data base
        */
    	_this.name = isString( _db_name_ ) ? _db_name_ : '';

    	_this.version = function ( _int_ ) {
    		/*
    		  * now we set the version of
    		  * the db
    		*/

    		_int_ = isNumber( _int_ ) ? _int_ : null;

    		return new storage.promise( function ( resolve, reject ) {
    			var _obj_ = this;

    			if ( _int_ && isIndexedDB ) {
    				infos.name = _this.name;
    				request.active = indexedDB.open( infos.name, _int_ );

    				Digital.update( request.active, {
    				   	onsuccess: function ( e ) {
    				   		return isFunction( storage.fn.openSuccess ) ? storage.fn.openSuccess( e, resolve ) : "";
    				   	},
    				   	onupgradeneeded: function ( e ) {
    				   		return isFunction( storage.fn.openUpgrade ) ? storage.fn.openUpgrade( e, resolve, _obj_ ) : "";
    				   	},
    				   	onerror: function ( e ) {
    				   		/*
    				   		   * when there is an
    				   		   * error
    				   		*/
    				   		return isFunction( storage.fn.openError ) ? storage.fn.openError( e, reject ) : "";
    				   	},
    				   	onabort: function ( e ) {
    				   		/*
    				   		   * when the request
    				   		   * abort
    				   		*/
    				   		return isFunction( storage.fn.openAbort ) ? storage.fn.openAbort( e, reject ) : "";
    				   	}
    				} );
                    
                    infos.version = _int_;
    				storage.request = request;

    			}
    		    else{
    		    	if ( !_int_ ) {
    		    		/*
    		    		  * if _int_ is not
    		    		  * a number we have to set
    		    		  * a DigitalNotNumberError
    		    		*/
    		    		reject( storage.error( "DigitalNotNumberError" ) );
    		    	}
    		    	else {
    		    		/*
    		    		  * if indexedDB isn't suppport 
    		    		  * by the support, we have to set the
    		    		  * DigitalNotSupportedApi
    		    		*/
    		    		reject( storage.error( "DigitalNotSupportedApi" ) );
    		    	}
    		    }
    		} );
    	};

    	/*
    	  * in the first hand,
    	  * open event
    	*/

    	Digital.update( storage.fn, {
    		openError: function ( e, _ ) {
    		    return _( e );
    		},
    		openAbort: function ( e, _ ) {
    			return _( e );
    		},
    		openSuccess: function ( e, _ ) {
    			/*
    			  * infos.db content the
    			  * data base
    			*/

    			   infos.db = e.target.result;
    			   infos.db.onversionchange = function () {
    			   	 return this.close();
    			   };
    			/*
    			  * when the data base is
    			  * opening we call this
    			  * function
    			*/
    			   _( _this );

    			/*
    			    * we empty all table
    			    * list request
    		    */
    		    if ( !toolsList.isEmptyObject( request.create.table ) ) {

    		    	    request.create.table = {};
    		    	/*
    		    	  * when the tables are 
    		    	  * loded we call this function
    		    	*/

    		    	try {
    		    		request.resolve( _this );
    		    	} catch( e ) {
    		    		request.reject( e );
    		    	}
    		    }
    		},
    		openUpgrade: function ( e, _, promise ) {
    			/*
    			  * now we can create all
    			  * data table( objectStore )
    			*/

    			infos.db = e.target.result;

    			/*
    			  * when the data base is
    			  * opening we call this
    			  * function
    			*/
    			_( _this );

    			var 
    			    db = infos.db,
    			    datas,
    			    finish = true;

    			    Digital.each( request.create.table, function ( name ) {
    			    	/*
    			    	  * datas is an object type
    			    	  * now we can create a table
    			    	  * using datas
    			    	*/
    			    	datas = this;
    			    	var tableDatas = {};
    			    	    if ( "key" in datas ) {
    			    	    	tableDatas.keyPath = datas.key;
    			    	    	if ( "autoIncrement" in datas ) {
    			    	    		/*
    			    	    		  * the default value of
    			    	    		  * the propierty autoIncrement
    			    	    		  * is true
    			    	    		*/
    			    	    		tableDatas.autoIncrement = isBoolean( datas.autoIncrement ) 
    			    	    		                                                         ? datas.autoIncrement
    			    	    		                                                         : false;
    			    	    	}
    			    	    }
    			    	var table;
    			    	try {
    			    		table = db.createObjectStore( name, tableDatas );
    			    		if ( isObject( datas.datas ) ) {
    			    			/*
    			    			  * now we can create all index
    			    			  * index of a table are content in
    			    			  * datas[ datas ]
    			    			*/
    			    			Digital.each( datas.datas, function ( name ) {
    			    				/*
    			    				  * we create an index of a
    			    				  * table with the method createIndex
    			    				  * of object store
    			    				*/
    			    				table.createIndex( name, name, isObject( this ) ? this : {} );
    			    			} );
    			    		}

    			    	} catch( e ) {
    			    		   request.reject( e );
    			    		return false;
    			    	}

    			    }, [], {
    			    	type: "strict"
    			    } );
                
                /*
                  * we empty all table
                  * list request
                */
    			request.create.table = {};

    			/*
    			  * like _ we be call in
    			  * openSuccess we have to delete
    			  * the function for not call the
    			  * same function 02 times		
    			*/
    			/*promise.then( function () {
    				return;
    			} );*/
    		}

    	}, function ( fn ) {
    		return isFunction( fn );
    	}  );

    	_this.createTable = function ( name, _obj_ ) {

    		/*
    		  * to create a table( objectStore )
    		  * in the db
    		*/
    		_obj_ = isObject( _obj_ ) ? _obj_ : {};

    		request.create
    		        .table[ name ] = _obj_;

    		return this;
    	};

    	Digital.update( _this, {
    		catch: function ( fn ) {
    			request.fn.reject = isFunction( fn ) ? fn : function () {
    				return;
    			};

    			return this;
    		},
    		then: function ( fn ) {
    			request.fn.resolve = isFunction( fn ) ? fn : function () {
    				return;
    			};

    			return this;
    		},
    		alter: function ( _str_ ) {
    			/*
    			  * this function is use for
    			  * start a transaction
    			  * and modify the data base
    			*/
    			_str_ = isString( _str_ ) ? _str_ : "";

    			if ( !_str_ ) {
    				throw storage.error( "( Digital.fn.DB.alter ) empty parameter" );
    			}
    			else {
    				var 
    				   listOfDB = _str_.split( ',' );

    				request.others = {
    					/*
    					  * now we start a transaction
    					  * on a list of DB
    					*/
    					transaction: infos.db
    					                   .transaction( listOfDB, 'readwrite' )
    				};
    				return this;
    			}

    			return this;
    		}
    	} );

    	storage.openTable = function ( _table_name_ ) {
    		/*
    		  * here we want to open
    		  * a table using a transaction
    		*/
    		request.others
    		       .table = request.others
    		                       .transaction ? request.others
    		                                               .transaction
    		                                               .objectStore( _table_name_ )
    		                                    : Digital.call( function () {
    		                                    	/*
    		                                    	   * now we will open
    		                                    	   * a new transaction
    		                                    	*/
    		                                    	  request.others.transaction = infos.db
    		                                    	                                      .transaction( _table_name_, 'readwrite' );
    		                                    	var 
    		                                    	  table = request.others
    		                                    	                     .transaction
    		                                    	                     .objectStore( _table_name_ );

    		                                    	return table;
    		                                    } );

    		return request.others.table;
    	};

    	storage.addDatasInTable = function ( table, _ ) {
    		/*
    		  * _ represent the list of
    		  * datas we want to add in
    		  * the table
    		*/

    		Digital.each( _, function () {
    			table.add( this );
    		} );
    	};

    	storage
		    .promise
    	    .transactionPromise = function () {
    		/*
    		  * return a promise after
    		  * a transaction request
    		*/
    		return new storage.promise( function ( resolve, reject ) {
    			Digital.update( request.others.transaction, {
    				oncomplete: function ( e ) {
    					  /*
    					    * we have to remove
    					    * the transaction on the
    					    * list
    					  */
    					  request.others.transaction = null;
    					return resolve( _this );
    				},
    				onerror: function ( ) {
    					return reject( storage.error( "( Digital.fn.DB.add ) request error" ) );
    				},
    				onabort: function ( ) {
    					return reject( storage.error( "( Digital.fn.DB.add ) request abort" ) );
    				}
    			} );
    		} );
    	};

    	_this.add = function ( _obj_ ) {
    		/*
    		  * now we can add datas
    		  * in the table
    		*/

    		isArray( request.add ) ? request.add
    		                                 .push( isObject( _obj_ ) ? _obj_ : { } )
    		                        : Digital.call( function () {
    		                        	/*
    		                        	  * if request.add is not 
    		                        	  * an array we have to create
    		                        	  * an array and add then the variable
    		                        	  * _obj_
    		                        	*/
    		                        	request.add = [];
    		                        	request.add
    		                        	       .push( isObject( _obj_ ) ? _obj_ : { } )
    		                        } );
    		return this;
    	};

    	storage.Response = function ( _arr_ ) {
    		/*
    		  * firstly we have
    		  * to verify if the parameter is 
    		  * an array
    		*/
    		var 
    		    context = this,
    		    response = [];
    		    this.datas = isArray( _arr_ ) ? _arr_ : [];
    	     	this.selected = {
    		     	special: null,
    			    name: null
    		    };

    		    Digital.each( this.datas, function () {
    		    	response.push( this.datas );
    		    } );
    		this.matcher = {
    			make: function ( callback ) {
    				var 
    				   val = [];
    				Digital.each( context.selected.special, function ( ) {
    					 /*
    					   * context.selected.name content
    					   * the item to compare
    					 */
    					 callback.call( {}, this[ context.selected.name ] )
    					          ? val.push( this )
    					          : false;
    				} );
    				this.value = val;
    			},
    			value: response
    		};
    	};

    	storage.Response.prototype = {
    		where: function ( _str_ ) {
    			/*
    			  * firstly we have to verify is
    			  * the parameter is a string 
    			*/
    			var
    			   datas = this.datas,
    			   result = [];

    			!isString( _str_ ) ? error_( "( Response.where ) parameter shall be a string" ) : Digital.call( function () {
    				Digital.each( datas, function () {
    					/*
    					  * this.datas content a row
    					  * of a table of a dataBase
    					*/
    					result.push( this.datas );
    				} );
    			} );

    			this.selected
    			    .special = result;
    			this.selected
    			    .name = _str_;

    			return this;
    		},
    		fetch: function () {
    			/*
    			  * now we can return the
    			  * result of the request
    			*/
    			return this.matcher
    			           .value;
    		},
    		equal: function ( _val_ ) {
    			this.matcher
    			    .make( function ( select ) {
    			    	return select == _val_ ? true : false;
    			    } );

    			return this;
    		},
    		strictlyEqual: function ( _val_ ) {
    			this.matcher
    			    .make( function ( select ) {
    			    	return select === _val_ ? true : false;
    			    } );

    			return this;
    		},
    		upper: function ( _val_ ) {
    			this.matcher
    			    .make( function ( select ) {
    			    	return select > _val_ ? true : false;
    			    } );

    			return this;
    		},
    		upperOrEqual: function ( _val_ ) {
    			this.matcher
    			    .make( function ( select ) {
    			    	return select >= _val_ ? true : false;
    			    } );

    			return this;
    		},
    		lower: function ( _val_ ) {
    			this.matcher
    			    .make( function ( select ) {
    			    	return select < _val_ ? true : false;
    			    } );

    			return this;
    		},
    		lowerOrEqual: function ( _val_ ) {
    			this.matcher
    			    .make( function ( select ) {
    			    	return select <= _val_ ? true : false;
    			    } );

    			return this;
    		},
    		and: function () {
    			/*
    			   * here we want to set the
    			   * this.datas in the form
    			   * of the begenning but 
    			   * only the filter datas
    			*/
    			var 
    			   list = this.fetch(),
    			   result = [];

    			Digital.each( list, function () {
    				result.push( {
    					datas: this
    				} );
    			} );

    			   this.datas = result;
    			return this;
    		},
    		filter: function ( _fn_ ) {
    			this.matcher
    			    .make( isFunction( _fn_ ) ? _fn : function () {
    			    	return true;
    			    } );

    			return this;
    		},
    		orderBy: function ( _val_ ) {
    			/*
    			  * now we want to
    			  * order the result
    			*/
    			var 
    			   list = this.fetch(),
    			   result = [];

    			list.sort( function ( a, b ) {
    			   	return a[ _val_ ] - b[ _val_ ];
    			} );
                
                /*
                  * now we copy
                  * the result
                */
    			   Digital.each( list, function () {
    			   	 result.push( this );
    			   } );

    			this.matcher.value = result;
    			return this;
    		},
    		orderByDesc: function ( _val_ ) {
    			/*
    			  * now we want to
    			  * order the result
    			*/
    			var 
    			    list = this.fetch(),
    			    result = [];

    			list.sort( function ( a, b ) {
    			   	return -1 * ( a[ _val_ ] - b[ _val_ ] );
    			} );
                /*
                  * now we copy
                  * the result
                */
    			    Digital.each( list, function () {
    			    	 result.push( this );
    			    } );
    			    this.matcher.value = result;
    			return this;
    		}
    	};

    	_this.get = function ( _name_ ) {
    		if ( !isString( _name_ ) ) {
    			throw storage.error( "( Digital.fn.DB.get ) parameter is not a string" );
    		}
    		var
    		    index = request
				            .others.table
    		                .index( _name_ ),
    		    result = [],
    		    cursor;
    		    infos.dbObject = this;

    	    /*
    	      * datas have been added
    	      * so now we can emty the add
    	      * request list
    	    */
    	    request.index = index;

    	    return request.index ? Digital.call( function () {
    	    	var 
				    access = request.index.openCursor();
    	         	return access ? new storage.promise( function ( resolve, reject ) {
    	         		Digital.update( access, {
    	         			onerror: function ( e ) {
    	         				return reject( e );
    	         			},
    	         			abort: function ( e ) {
    	         				return reject( e );
    	         			},
    	         			onsuccess: function ( e ) {
    	         				cursor = e.target
    	         				          .result;

    	         				if ( cursor ) {
    	         					result.push( {
    	         						value: cursor.key,
    	         						key: cursor.primaryKey,
    	         						datas: cursor.value
    	         					} );

    	         					cursor.continue();
    	         				}
    	         				else{
    	         					/*
    	         					   * now we can save the
    	         					   * result of the request
    	         					*/
    	         				    request.result = result;
    	         				    /*
    	         				      * we have to remove
    	         				      * the transaction on the
    	         				      * list
    	         				    */
    	         				    request.others.transaction = null;
    	         				    resolve( new storage.Response( result ) );
    	         				}
    	         			}
    	         		} );

    	         	} ) : _this;
    	    } ) : _this;
    	};

    	_this.each = function ( callback ) {
    		/*
    		  * we have to verify firtly
    		  * if callback is a function
    		*/

    		callback =  isFunction( callback ) ? callback : function () {
    			return;
    		};

    		request.index ? Digital.call( function () {
    			request.index.openCusor();
    		} ) : "";
    		return _this;
    	};

    	_this.delete = function ( key ) {
    		/*
    		  * for delete something
    		  * in the db
    		*/
    		  request.others
    		           .table
    		           .delete( key );

    		return this;
    	};

    	_this.from = function ( _ ) {
    		/*
    		  * now we can open the db
    		  * where we want to add
    		  * some thing
    		*/
    		var
    		    table;
            table = _ && isString( _ ) ? storage.openTable( _ )
                                        : Digital.call( function () {
                                        	throw request.reject( storage.error( "( Digital.fn.DB.in ) parameter is not a string" ) );
                                        } );
            request.others
                   .table = table;
            return this;
    	};

    	_this.in = function ( _ ) {
    		/*
    		  * now we can open the db
    		  * where we want to add
    		  * some thing
    		*/
    		var
    		    table;
            table = _ && isString( _ ) ? table = storage.openTable( _ )
                                        : Digital.call( function () {
                                        	throw request.reject( storage.error( "( Digital.fn.DB.in ) parameter is not a string" ) );
                                        } );
     		storage.addDatasInTable( table, isArray( request.add ) ? request.add : [ ] );
            /*
              * datas have been added
              * so now we can emty the add
              * request list
            */
            request.add = [];
    		return storage.promise
    		              .transactionPromise();
    	};
    	return _this.name ? _this : error( "( Digital.fn.DB ) missing db name" );
    };

    Digital.fn.externalFunction.extends( {
        db: function ( _ ) {
            /*
              * now we create an instance
              * of the DB and
              * return it
            */
            return new Digital.fn.DB( _ );
        }
    } );

    /*
      * now we can add new storage
      * whetod
    */

    Digital.call( function () {
    	var
    	    bases = [
    	        "clear", "get", 
    	        "set", "remove", 
    	        "cursor", "setAll", "key"
    	    ],
    	    storage = [ "local", "session", "cookie" ],
    	    store = { };

    	    String.prototype.upperFirstLetter = function () {

    	        /*
    	          * this function is used
    	          * to put the first letter
    	          * of a string to upper 
    	          * case
    	        */ 
			   
    	   	    var
    	   	        val = this,
    	   	        result = "",
    	   	        firstLetter = val[ 0 ],
    	   	        rest = val.substring( 1, val.length );

    	   	        result = firstLetter.toUpperCase() + rest;
    	   	   return result;

    	    };

    	    Digital.each( bases, function () {
    	   	    /*
    	   	      * now we can add new
    	   	      * methods in the store
    	   	    */
    	   	    var 
				    base = this;
    	   	        Digital.each( storage, function () {
    	   	      	    var
    	   	      	        name = this,
    	   	      	        finalName = base + name.upperFirstLetter(),
    	   	      	        fn = function () {
    	   	      	       	    return Digital
					    				.fn.externalFunction[ name ][ base ]
    	   	      	       	            .apply( Digital.fn.externalFunction[ name ], Array.from( arguments ) );
    	   	      	        };
    	   	      	       store[ finalName ] = fn;
    	   	        } );
    	    } );

    	    store = toolsList.twinObject( store, {
    	   	    "setStorage" : store.setLocal,
    	   	    "getStorage" : store.getLocal
    	    } );
        /*
           * now we can add
           * all this methods 
           * to digital
        */
        Digital
		    .fn.externalFunction
            .extends( store );
    } );

    Digital.init.extends( Digital.fn.externalFunction, {
        parseDate: function () {
        	return Date.parse
        	           .apply( Date, Array.from( arguments ) );
        },
        parseHTML: function ( name, context ) {
            /*
              * now we can begin the
              * creation of our document
            */
            if ( !document.implementation ) {
            	return [ ];
            }
            var
                doc = null;
                /*
                   * we create our new
                   * document using
                   * the document implemenation in spide
                   * of this propriety is experimental
                */
             	doc = document.implementation.createHTMLDocument( "" );
             	if ( context && isObject( context ) ) {
             		isString( context.head ) ? Digital.call( function () {
             			isString( context.body ) ? Digital.call( function () {
             				/*
             				  * now we can set the content
             				  * of the head part and body
             				  * of the document
             				*/
             				doc.head.innerHTML += context.head;
             				doc.body.innerHTML = context.body;
             			} ) : Digital.call( function () {
             				/*
             				   * because there isn't
             				   * the body part 
             				*/
             				doc.head.innerHTML = context.head;
             			} );
             		} ) : isString( context.body ) ? Digital.call( function () {
             			/*
             			   * because there isn't
             			   * the head part 
             			*/
             			doc.body.innerHTML = context.body;
             		} ) : false;
             	}
				else if ( isString( context ) ) {
					if ( name === 'body' )
							doc.body.innerHTML = context;
							    else if ( name === 'head' )
							        doc.head.innerHTML = context;
									    else 
									        doc.getElementsByTagName( 'html' )[ 0 ].innerHTML = context;
				}
            return name === "body" ? [ doc.body.innerHTML ]
                                   : name === "head" ? [ doc.head.innerHTML ]
                                                     : doc || [];
        },
        parseXML: function ( _ ) {
            /*
              * we use this function to
              * create an xml dom
            */
            var
                _str_ = isString( _ ) ? _ : "", 
                parser = new DOMParser(),
                doc = "";
            /*
              * now we can return the
              * result of the parser
            */
            return !_str_ ? null : Digital.call( function () {
            	try {
            		doc = parser.parseFromString( _str_, "application/xml" )
            	} catch( e ) {
            		doc = "";
            	}
                /*
                  * we verify if there
                  * haven't an error
                */
            	    !doc || doc.getElementsByTagName( "parsererror" ).length 
            	                ?  error( '( Digital.parseXML ) parameter is not a valid xml code' )
            	                : false;
                return doc;
            } );
     	},
        parseJSON: function ( _ ) {
        	return JSON.parse( _ );
        },
        use: function ( selector ) {
        	var 
        	    node = new Digital.init( selector, {} ),
        	    result = [ ];
        	node.each( function () {
        		result.push( this );
        	} );
        	return Digital.shave( result );
        },
        set: function ( _key_, _val_ ) {
        	/*
        	  * add a key in the 
        	  * DigitalStorage
        	*/
        	var 
			    obj = this;
        	return isString( _key_ ) ? Digital.call( function () {
        		   DigitalStorage.setItem( _key_, _val_ );
        		return obj;
        	} ) : obj;
        },
		setVar: function ( key, val ) {
			    Storage.setVar( key, val );
			return this;
		},
		getVar: function ( key ) {
			return Storage.getVar( key );
		},
		setCssVar: function ( key, val ) {
			    Storage.setCssVar( key, val );
			return this;
		},
		getVar: function ( key ) {
			return Storage.getVar( key );
		},
        get: function ( _key_ ) {
        	return DigitalStorage.getItem( _key_ );
        },
        temp: function ( fn ) {
        	Digital
			    .fn.temp
        	    .setAuto( fn );
        	return this;
        },
        delete: function () {
        	    Digital.fn.temp.tmp = [ ];
            return this;
        }
    } );
    
    Digital.update( String.prototype, {
    	json: function () {
    		return Digital
			        .builder
					.parseJSON( this );
    	},
    	xml: function () {
    		return Digital
			        .builder
					.parseXML( this );
    	},
		html: function () {
    		return Digital
			        .builder
					.parseHTML( '', this );
    	}
	} );
	
	if ( !Array.from ) 
	    Digital.call( function () {
			Array.from = function ( arg ) {
				var 
					arr = [];
					arg = arg === undefined || arg === null ?  [] : arg ;
					if( !'length' in arg )
						return [];
				            for ( var index = 0; index < arg.length; index++ )
						    	arr.push( arg[ index ] );
				return arr;
			};
		} );
	
	if ( !Array.map ) 
	    Digital.call( function () {
			Array.map = function ( fx ) {
				var 
					arr = [];
					Digital.each( this, function () {
						arr.push( fx( this ) );
					} );
				return arr;
			};
		} );

    Digital.eval = function () {
    	var
    	    str = "",
    	    args = Array.from( arguments );
    	    Digital.each( args, function () {
    	    	str += isNumber( this ) || isString( this ) ? this : ""; 
    	    } );
    	return eval( str );
    };
    /*
      * now we can manage
      * a canvas
    */
    Digital.call( function () {
    	var
    	    canvas = create( "canvas" ),
    	    context, 
			/** 
			    * @typedef {Object} Canvas2d   
			    * @param {Element} node 
				* @property {Element} node
				* @property {Context2D} context
			*/
			Canvas2d = function ( node ) {
    	   	    /*
    	   	      * the constructor of
    	   	      * the object
    	   	    */
    	   	    this.node = node;
    	   	    this.context = this.node.getContext( "2d" );
    	    };

    	try {
    		context = canvas.getContext( "2d" );
    	} catch( e ) {
    		return;
    	}

    	Digital.each( context, function ( name ) {
    	    Canvas2d.prototype[ name ] = function ( __val__ ) {
    	    	var
				    context = this.context,
    	    	    fx = context[ name ],
    	    	    res;
    	    	if ( isFunction( fx ) ) {
    	    		/*
    	    		  * if its a 
    	    		  * function
    	    		*/
    	    		    res = fx.apply( context, arguments );
    	    		return res === undefined ? this : res;
    	    	}
    	    	else {
    	    		/*
    	    		  * if there is an argument
    	    		  * we have to set it else
    	    		  * we have to return the value
    	    		  * of the property
    	    		*/
    	    		var 
    	    		    obj = this;
    	    		return __val__ ? Digital.call( function () {
    	    			  context[ name ] = __val__;
    	    			return obj;
    	    		} ) : context[ name ];
    	    	}
    	    };
    	}, [], {
    		type: 'particular'
    	} );

    	Digital.update( Digital.fn.storage, {
			Canvas2d: Canvas2d
		} );
    } );
    /*
       * we add now another
       * html method
    */
    Digital.init
        .extends( _intern, {
          	ready: function ( callback ) {
          		this.each( function () {
          			var
          			   name = this.nodeName ? this.nodeName.toLowerCase() : "";
          			/*
          			  * the callback will be call
          			  * when the selectors will be
          			  * ready
          			*/
          			callback = isFunction( callback ) ? callback : function () {
          				return;
          			};

          			if ( this === document ) {
					    if ( this.readyState != 'complete' ) {
							Digital.builder( this, {
								on: {
									readystatechange: function ( e ) {
										if ( this.readyState === "complete" ) {
										    callback.call( this, e );
								    	}
									}
								}
							} );
						}
						else{
							callback.call( 
								this, 
								Digital.events( 'readystatechange' ) 
							);
						}
          			}
          			else if ( name === "video" || name === "audio" ) {
          				Digital.update( this, {
          					oncanplay: function ( e ) {
          						callback.call( this, e );
          					}
          				} );
          			}
          			else {
          				Digital.update( this, {
          					onload: function ( e ) {
          						callback.call( this, e );
          					}
          				} );
          			}
          		} );
          		return this;
          	},
          	match: function ( criteria ) {
          		/*
          		  * this function test if the selected
          		  * node match with the attribute
          		  * description
          		*/
          		var 
				    result, isMatch, test, node;
          		    criteria = isObject( criteria ) ? criteria : {};
                result = [];
                isMatch = function ( _arr_ ) {
                	return _arr_.inArray( false );
                };
          		this.each( function () {
          			node = this;
          			isElement( node ) ? Digital.call( function () {
          				test = Digital.each( criteria, function ( name ) {
          					/*
          					  * we verify if the 
          					  * attribute match with the
          					  * value
          					*/
          					return node.getAttribute( name ) === this;
          				}, [] );
          				result.push( test.inArray( false ) );
          			} ) : false;
          		} );

          		return isMatch( result );
          	},
          	unmatch: function ( criteria ) {
          		return this.match( criteria ) ? false : true;
          	},
          	index: function ( node ) {
          		/*
          		  * now we can return the index of this
          		  * node in list of node selected
          		*/
          		return this
				        .selectorList
          		        .indexOf( node );
          	},
			push: function ( list, context ) {
				var 
				    obj = this,
				    prev = obj.toArray(),
					    arr = toggleArray( 
					    	Digital.builder( list ).toArray()
					    );
				    obj.selectorList = Digital.fn.Picker.finalise( 
				    	prev.concat( arr ) 
				    );
				return Digital.builder( 
					obj.toArray(),
					context
				);
			},
			pop: function ( list, context ) {
				var 
				    obj = this,
					final = [ ],
				    prev = obj.toArray(),
					    arr = toggleArray( 
					    	Digital.fn.Picker.start( list )
					    );
				    Digital.each( prev, function () {
						if ( arr.indexOf( this ) === -1 )
							final.push( this );
					} );
				return Digital.builder( 
					final,
					context
				);
			},
          	canvas2d: function () {
          		return new Digital
						.fn.storage
          		        .Canvas2d( this.selectorList[ 0 ] )
            }
        } );
    /*
      * here we can start with the animation
      * manager, animation can set 02 thing,
      * css unity and colors
    */
    /*
       * for return the 
       * best form of requestAnimationFrame
    */
    Digital.fn.getAnimationFrame = function () {
    	return  wn.requestAnimationFrame || // the standart form
    	        wn.webkitRequestAnimationFrame || // for Chrome et Safari
    	        wn.mozRequestAnimationFrame || // for Firefox
    	        wn.oRequestAnimationFrame || // for Opera
    	        wn.msRequestAnimationFrame || //forr Internet Explorer   
    	        function( callback ){  // if there is not support
    	            wn.setTimeout( callback, 1000 / 60 );
    	        };
    };
    /*
      * we use the timer
      * for manage the time
      * of the namation
    */
    Digital.fn.Timer = function ( time ) {
        /*
          * time represent the 
          * execution time
          * of the function
          * we divise by five because request
          * animation frame is lower than setTimeout
        */
        this.duration = Digital.timeControls( time );
        /*
          * the status of the
          * animation
        */
        this.status = "nostart"; // can be start|pause|stop|end
        /*
          * the number of repeat of the
          * animation the default number
          * is zero
        */
        this.repeat = 0;
		this.iterationType = 'none';
		this.iteration = -1;
        /*
          * the fn we will be call
          * at the end of the animation
          * and at each steps
        */
        this.fn = {
        	steps: null,
        	end: null
        };
        /*
           * the initial informations
           * of the timers
        */
        this.initialTime = 0;
        this.progress = 0;
		this.lapsCount = 0;
        /*
          * the direction of the
          * timer
        */
        this.direction = 'next';
		this.globalDirection = 'next';
    };

    Digital.fn.Timer.prototype = {
        set: function ( name, fn ) {
      	    /*
      	      * we use this function to add
      	      * a function in a storage store
      	    */
            var obj = this;

            return isFunction( fn ) ? Digital.call( function () {
            	   obj.fn[ name ] = fn;
            	return obj;
            } ) : Digital.call( function () {
            	   obj.fn[ name ] =  function () {
            	   	 return;
            	   };
            	return obj;
            } );
        },
        setEnd: function ( callback ) {
        	    this.set( "end", callback );
        	return this;
        },
        setSteps: function ( callback ) {
        	    this.set( "steps", callback );
        	return this;
        },
        start: function () {
            if ( !this.fn ) {
                 error( "( Digital.fn.Timer ) missing function" );
              return;
            }

                this.status = 'start';
                this.run();
            return this;
        },
        restart: function () {
            if ( !this.fn ) {
                 error( "( Digital.fn.Timer ) missing function" );
              return;
            }
            /*
              * we put the timer at
              * zero
            */
                this.stop();
                this.status = 'start';
                this.run();
            return this;
        },
        stop: function () {
      	    /*
      	        * we put the timer at
      	        * zero if the direction is next 
      	        * because in this way the timer begin
      	        * to zero
      	    */
      	        this.status = "stop";
            return this;
        },
        pause: function () {
        	    /*
        	      * the initial time of the
        	      * timer shall the time where 
        	      * the timer is
        	    */
				this.status = "pause";
            return this;
        },
        getAnimationFrame: function () {
			return Digital
			            .fn
                        .getAnimationFrame();
        },
        back: function () {
        	/*
        	  * for back with 
        	  * the timer
        	*/ 
        	   this.direction = 'prev';
			   this.globalDirection = 'prev';
			   this.initialTime = this.progress;
        	return this;
        },
        forward: function () {
        	/*
        	  * for move forward with
        	  * the timer
        	*/ 
			    this.direction = 'next';
				this.globalDirection = 'next';
        	    this.initialTime = this.progress;
        	return this;
		},
		laps: function () {
			var 
			    direction = this.direction;
			    this.direction = direction === 'next' ? 'prev' : 'next';
			    this.globalDirection = direction;
			return this;
		},
		run: function () {
			var
			    iteration = this.iteration,
			    fn = this.fn,
				final = {},
			    stepsFunction = fn.steps ? fn.steps : function ( _ ) {
				    return _;
			    },
			    duration = this.duration,
			    animationFrame = this.getAnimationFrame(),
			    iteration_count = this.repeat,
				object = this,
			    direction = this.direction || "next", // the direction can be next
			    loop = function () {
			        /*
				      * we verifi if the
				      * num of iteration is
				      * respected
			        */
				    if ( iteration_count != "infinite" && iteration >= iteration_count ) { 
				    	    /*
				    		    * now we can set the
				    		    * timer like end
				    	    */
				    	    object.status = "end";
				    	    if ( isFunction( object.fn.end ) ) {
				    	        object.fn.end();
				    	    }
				    	return;
				    }
					else if ( iteration >= 0 && object.iterationType === 'line' ) {
						if ( object.globalDirection === object.direction ) {
							object.iteration = --iteration;
							object.lapsCount = 0;
							object.laps();
						}
						else if ( object.lapsCount ) {
							object.direction = object.globalDirection;
						}
					}
					direction = object.direction || "next";
					iteration = object.iteration;
				    /*
				       * to run the
				       * animation
				    */
				    var 
					    initialTime = object.initialTime,
						variation = 0,
					    startTime = null,
					    animation = function () {
						    /*
						      * we update informations
						      * of the variables
						    */
						    iteration_count = object.repeat;
						    direction = object.direction;
						    animationFrame( function ( timeStamp ) {
						        if ( startTime === null ) {
									object.prevStamp = timeStamp;
							     	startTime = timeStamp;
						        }

								final.time = direction === 'next' ? duration : 0;
								final.progress = direction === 'next' ? 100 : 0;
								if ( timeStamp - object.prevStamp >= 20 )
									timeStamp = object.prevStamp + 20;
						        /*
							        * if the direction is next we have
							        * to go forward else we have to back
						        */
							   if ( object.status === "stop" || object.status === "pause" ) {
									    if ( object.status !== 'stop' ){
											object.initialTime = object.progress;
										}
										else{
											object.initialTime = 0;
											object.lapsCount = 0;
											object.iteration = -1;
										}
									return;
								}
								object.prevStamp = timeStamp;
						        direction ===  "next" ? Digital.call( function () {
							    	/*
							    	    * we set the progression
							    	    * of the timer
							    	*/
							    	object.progress = ( timeStamp - startTime ) + initialTime;
						        } ) : Digital.call( function () {
									variation = ( timeStamp - startTime ) + initialTime;
							    	object.progress = duration - variation;
						        } );
						        /*
							        * the persent of
							        * pregression
						        */
						        object.percent = duration != 0 ? ( object.progress / duration ) * 100 : 100;
						    return ( direction === 'next' && object.progress >= duration ) ||
							       ( direction === 'prev' && object.progress <= 0 ) ? Digital.call( function () {
									stepsFunction( final.time, final.progress ); // for start the animation
									object.initialTime = 0;
									object.iteration = ++iteration;
					                object.lapsCount++;
									loop(); // for the next iitération
								return;
						    } ) : Digital.call( function () {
								/*
								  * if there isn't the
								  * time
								*/
								stepsFunction( object.progress, object.percent );
								animation();
						    } );
						} );
				    };
				    animation();
			    };
			loop();
			return this;
		},
        then: function ( callback ) {
            if ( !isFunction( callback ) ) {
                return error( "( Digital.fn.Timer ) not valid parameter" );
            }

               this.setEnd( callback );
            return this;
        },
        steps: function ( callback ) {
            if ( !isFunction( callback ) ) {
                return error( "( Digital.fn.Timer ) not valid parameter" );
            }

               this.setSteps( callback );
            return this;
        },
		setRepeat: function ( i ) {
			    this.repeat = i;
			return this;
		},
		setInteration: function ( name ) {
			    this.iterationType = name || 'none';
			return this;
		}
    };

    Digital.fn.animation = {
        getRGBValue: function ( _color_ ) {
         	/*
         	  * we use this function to return
         	  * an color at is rgb form
         	*/

           	var
           	   /*
           	     * firsly we create an
           	     * arctificial dom
           	   */
           	    doc = document,
           	    node = doc
					    .head
						.appendChild( doc.createElement( "digital" ) ),
           	    color;
           	        /*
           	         * we hide the
           	         * html element
           	        */
           	        node.style.display = 'none';
                /*
                  * we set the value at the 
                  * html element
                */
           	    node
					.style
           	        .backgroundColor = _color_ || isString( _color_ ) ? _color_ : "#000000";
            /*
                * now we can return the RGB
                * value of the color
            */
         	return getComputedStyle( node, null ).backgroundColor;
        },
        getDataOfColor: function ( _color_ ) {
         	/*
         	  * return an arr of rgb
         	  * properties
         	  * example [ 15, 24, 255 ]
         	*/
         	_color_ = _color_.toLowerCase();

         	var
         	    arr = [],
         	    list = _color_
					        .replace( /\s/ig, "" )
         	                .replace( /(?:rgb\(|rgba\()/, "" )
         	                .replace( ")", "" )
         	                .split( "," );
         	    list.each( function () {
         	    	arr.push( parseFloat( this ) );
         	    } );

         	return arr.length === 3 ? Digital.call( function () {
         		    arr.push( 1 );
         		return arr;
         	} ) : arr;
        },
        createColor: function ( _arr_ ) {
         	/*
         	  * firtly we have to verify if the 
         	  * parameter is an array
         	*/
         	_arr_ = isArray( _arr_ ) ? _arr_ : [ 0, 0, 0, 1 ];

         	return "rgba(" + _arr_.join( ',' ) + ")";
        }
    };

    Digital.fn.animation.animateProp = function ( datas, initial, final ) {
    	/*
    	  * name si the name of the
    	  * property
    	*/
    	Digital.update( this, {
    		initialValue: initial,
    		finalValue: final,
    		value: initial,
    		prop: {
    		   name: datas.name,
    		   extention: datas.ex
    	    },
    	    final: {
    		    value: datas.finalValue,
    		    ex: datas.finalEx
    	    },
    	    percent: 0
    	} );
    };

    Digital.fn.animation.animateProp.prototype = {
    	set: function ( percent ) {
    		var
    		    value, initial = this.initialValue,
    		    interval, final = this.finalValue;
    		    /*
    		        * the value is a percent of
    		        * the initial value
    		    */
    		    interval = final - initial;
    		    value = ( interval * percent ) / 100;
             
                this.value = initial + value;
                this.percent = percent;
    		return this;
    	},
    	get: function () {
    		var _this = this;

    		return _this.percent === 100 ? Digital.call( function () {
    			return ( _this.final.value || _this.value ) 
    			       + ( _this.prop.extention || _this.final.ex ? _this.final.ex || _this.prop.extention 
    			                         	                      : 0 );

    		} ) : _this.value + ( _this.prop.extention ? _this.prop.extention : 0 );
    	},
    	setId: function ( name ) {
    		    this.id = name;
    		return this;
    	},
    	getId: function () {
    		/*
    		  * return the id of
    		  * the animation
    		*/
    		return this.id;
    	} 
    };

	/** 
	   * @param {String} _str_ 
	   * @returns {Object}
	*/

    function getDataOfFunction( _str_ ) {
    	/*
    	  * the paramter str is a string
    	  * like fn( 45 )
    	  * this function shall
    	  * return an litteral object
    	  * which content the
    	  * name of the function and the value of its
    	  * parameter
    	*/

    	_str_ = isString( _str_ ) ? _str_ : "";
    	var
    	    final, reg;
    	    reg = /^([\w]{1,})\(([\w\s\,\.%]{1,})\)$/i;
    	    final = reg.exec( _str_.replace( /\s/ig, "" ) ); 

    	return {
    		name: RegExp.$1,
    		params: RegExp.$2.split( "," )
    	};
    };

	function makeFunctionProps( name, data ) {
		    data = toggleArray( data );
		return name + '(' + data.join( ',' )+ ')';
	};

    Digital.call( function () {
    	String.prototype.getEx = function () {
    		/*
    		  * if the string is 15px,
    		  * the function will return px
    		*/
    		var str = this.trim(),
    		    reg = /^[0-9\-\+]*([a-z\%]*)?$/i;
    		return reg.exec( str ) === null 
    		                               ? "" 
    		                               : RegExp.$1;
    	};
    } );

    Digital.fn.animation.animateColor = function ( _color_, _final_, name ) {
        /*
          * this function is used
          * to animate a color
        */    	
    	var
    	   itemList = [],
    	   animatorList = [];

    	if ( !isArray( _color_ ) || !isArray( _final_ ) ) {
    		return [ 0, 0, 0, 1 ];
    	}

    	Digital.each( _color_, function ( index ) {
    		animatorList.push( 
    			new Digital.fn.animation.animateProp( { name: "color", ex: 0 }, _color_[ index ], _final_[ index ] ) 
    	    )
    	} );

    	this.name = name;
    	this.set = function ( percent ) {
    		    Digital.each( animatorList, function () {
    			    this.set( percent );
    		    } );
    		return this;
    	};

    	this.get = function () {
    		/*
    		  * this function return an 
    		  * rgba colors
    		*/
    		var 
    		    result = [],
    		    datas = "";
    		    Digital.each( animatorList, function () {
    			    result.push( this.get() );
    		    } );
    		    datas = Digital.fn.animation.createColor( result );

    		return datas;
    	};

    	Digital.update( this, {
    		setId: function ( id ) {
    			/*
    			  * set the id of the animation
    			  * in the list of all animation
    			*/
                Digital.each( animatorList, function () {
                	this.setId( id );
                } );
    			
    			return this;
    		}
    	} );
    };

    Digital.fn.animation.animateFuntionProp = function ( initial, final, name ) {
        /*
          * this function is used
          * to animate the css property
          * which is like a function
          * example 'blur'
        */   	
    	var
    	    reg = /([\w]{1,})\(([\s\w%\,.]{1,})\)/ig,
    	    getData = function ( _val_ ) {
    	   	    /*
    	   	        * this function return the
    	   	        * name of a function, the value of
    	   	        * the property and it's
    	   	        * extension
    	   	    */
    	   	    _val_ = isString( _val_ ) ? _val_ : "";
    	   	    var
				    list = _val_.match( reg ),
    	   	        result, ex,
					arr = [];
					    Digital.each( list, function () {
							if ( this ) {
								result = getDataOfFunction( this );
								arr.push( {
									name: result.name,
									params: result.params.map( function ( x ) {
										    ex = x.getEx();
										return parseFloat( x.toInt() );
									} ),
									ex
								} );
							}
						} );

    	   	    return arr;
    	   };

    	var 
		    datas,
			storage = {};
    	    datas = {
    	    	initial: getData( initial ),
    	    	final: getData( final )
			};

    	Digital.each( datas.initial, function ( i ) {
    		var 
    		    initial, final;
    		    initial = this;
    		    final = datas.final[ i ];
			
			storage[ this.name ] = [];
			Digital.each( this.params, function ( y ) {
				storage[ initial.name ].push( 
    		        new Digital.fn.animation.animateProp( 
    		    	    { 
    		    	    	name: initial.name, 
    		    	    	ex: initial.ex
    		    	    }, 
    		    	    this, 
    		    	    final.params[ y ] 
    		    	)  
    		    );
			} );
    	}  );

		this.name = name;
    	this.set = function ( percent ) {
    		    Digital.each( storage, function () {
    			    Digital.each( this, function () {
						this.set( percent );
					} );
    		    } );
    		return this;
    	};

    	this.get = function () {
    		/*
    		  * this function return an 
    		  * rgba colors
    		*/
    		var 
    		    result = [],
				name = '',
    		    value = '';
    		    Digital.each( storage, function () {
    		  	    result = [ ];
					    Digital.each( this, function () {
							name = this.prop.name;
					    	result.push( this.get() );
					    } );
					value += makeFunctionProps( name, result ) + ' ';
    		    } );
    		return value;
    	};

        Digital.update( this, {
    		setId: function ( id ) {
    	        Digital.each( animatorList, function () {
    	            this.setId( id );
    	        } );
    			return this;
    		}
        } );
    };

    Digital.fn.animation.timing = {
    	fn: {},
		_generate_fn_: function ( arg1, arg2 ) {
    		/*
    		  * this function will generate a function
    		  * which will be use for animations
			  * the function will be a parabolic
			  * funcntion 
			*/
			arg1 = isArray( arg1 ) ? arg1 : [ 0, 0 ];
			arg2 = isArray( arg2 ) ? arg2 : [ 100, 100 ];
			
			var 
                or = function ( a, b ) {
                    if ( isNumber( a ) )
                        return a;
                    return b;
                },
                f1 = [ or( arg1[ 0 ], 0 ), or( arg1[ 1 ], 0 ) ],
                f2 = [ or( arg2[ 0 ], 100 ), or( arg2[ 1 ], 100 ) ];
            var 
                step1 = {
                    p: [ Math.pow( f1[ 0 ], 2 ), f1[ 1 ] ],
                    q: [ Math.pow( f2[ 0 ], 2 ), f2[ 1 ] ]
                },
                step2, a, b;
                if ( step1.p[ 0 ] !== 0 && step1.q[ 0 ] !== 0 ) {
                    step2 = {
                        p: [ step1.p[ 0 ] * step1.q[ 0 ], step1.q[ 0 ], step1.p[ 1 ] * step1.q[ 0 ] ],
                        q: [ step1.p[ 0 ] * step1.q[ 0 ] * -1, step1.p[ 0 ] * -1, step1.q[ 1 ] * step1.p[ 0 ] * -1 ]
                    };
                    b = [ step2.p[ 1 ] + step2.q[ 1 ], step2.p[ 2 ] + step2.q[ 2 ] ];
                    b = b[ 1 ] / b[ 0 ];
                    b = isNaN( b ) ? 0 : b;

                    a = [ step1.p[ 1 ], b, step1.p[ 0 ] ];
                    a = ( a[ 0 ] - a[ 1 ] ) / a[ 2 ];
                }
                else{
                    b = step1.p[ 0 ] === 0 
                                    ? step1.p[ 1 ]
                                    : step1.q[ 1 ];
            
                    a = step1.p[ 0 ] === 0
                                ? ( step1.q[ 1 ] - b ) / step1.q[ 0 ]
                                : ( step1.p[ 1 ] - b ) / step1.p[ 0 ];
                }
            return function ( x ) {
                return ( Math.pow( x, 2 ) * a ) + b;
            };
    	},
    	get: function ( type, percent, total, timer ) {
    		/*
    		  * total represent the total value
    		  * we expect at the end of the
    		  * animation
    		*/
    		var 
    		    obj = this,
    		    reg = /^[a-z0-9\-]*$/i,
    		    result;

    		    result = reg.test( type ) ? Digital.call( function () {
					return isFunction( obj.fn[ type ] ) 
					                        ? obj.fn[ type ].call( obj.fn, percent, total, timer )
    		    	                        : error( type + ' Is not a timing function in Digital' );
    		    } ) : Digital.call( function () {
    		  	    var 
    		  	        datas = getDataOfFunction( type ), 
    		  	        name = datas.name,
    		  	        /*
    		  	          * we get the list of argument
    		  	          * of the function
    		  	        */
    		  	        params = datas.params;
    		  	        params.push( percent );
    		  	        params.push( total );
    		  	        params.push( timer );
					return isFunction( obj.fn[ name ] ) 
					        ? obj.fn[ name ].apply( obj.fn, params )
    		  	            : error( type + ' Is not a timing function in Digital' );
    		    } ); 

    	    return result;
    	},
    	extends: function ( _obj_ ) {
    		_obj_ = isObject( _obj_ ) ? _obj_ : {};
    		    Digital.update( this.fn, _obj_, function ( callback ) {
    		    	return isFunction( callback );
    		    } );
    		return this;
    	}
    };

    Digital.fn.animation.timing.extends( {
		cuve: function ( arr, transition ) {
			transition = transition || 50;
			var 
			    _fx_1_ = Digital.fn.animation.timing._generate_fn_( arr, [] ),
				_fx_2_ = Digital.fn.animation.timing._generate_fn_( 
					[ 0, 0 ], 
					[ transition, _fx_1_( transition ) ] 
				);
			return function ( x ) {
				return x <=  transition  
				                    ? _fx_2_(  x )
									: _fx_1_( x );
			};
		},
    	"linear": function ( value ) {
    		return value;
    	},
    	"ease": function ( value ) {
    		/*
    		  * value represent the percent of
    		  * progression of the animation
    		*/
    		var
			    fx = this.cuve( [ 0, 0 ], 50 ),
				result = fx( value );
    		return result;
    	},
    	"ease-out": function ( value ) {
    		/*
    		  * value represent the percent of
    		  * progression of the animation
    		*/
    		var 
    		    fx = this.cuve( [ 55, 70 ], 50 ),
				result = fx( value );
    		return result;
    	},
    	"ease-in": function ( value ) {
			var 
			    fx = this.cuve( [ 70, 55 ], 50 ),
				result = fx( value );
  		    return result;
    	},
    	"steps": function ( dur, timing, value, total, timer ) {
            /*
              * dur represent the duratio
              * of the steps
            */

			dur = isNaN( parseFloat( dur ) ) ? 100 : parseFloat( dur );
			value = this[ timing ]( value, total, timer );
			timer.interval = value / dur;
			var 
			    arr = Digital.range( 0, total, Math.round( total / dur ), 1 );
					Digital.each( arr, function () {
						if ( value < this ){
							    value = this;
							return false;
						}
					}, [], {
						type: 'strict'
					} );
		   return value;
    	}
    } );

    Digital.update( Digital, {
		range: function ( inital, length, steps, _ ) {
			var 
			    arr = [],
				index = inital || 0;
				length = isNumber( length ) ? length :  20;
				steps = steps || 1;
				_ = isNumber( _ ) ? _ : 1;
				    for ( ; index < length; index += steps )
					    arr.push( index * _ );
			return arr;
		},
    	setTime: function ( callback, time ) {
    		return  Digital.call( function () {
    		    var 
    		        final, is;
    		        is = "setTimeout" in wn;
    		        final = is ? setTimeout : function ( callback, duration ) {
    		        	return Digital.timer( duration )
    		        	              .then( callback );
    		        };
    		    return final( callback, time );
    		} );
    	},
    	controls: {
    		speeds: {
    			low: 2000,
    			medium: 1000,
    			fast: 700
    		},
    		camelCase: function ( _str_ ) {
    			return isString( _str_ ) ? Digital.call( function () {
    				var 
    				    arr = _str_.trim().split( "-" ),
    				    start = arr[ 0 ],
    				    end = arr[ 1 ] ? Digital.call( function () {
    				   	    return arr[ 1 ].upperFirstLetter();
    				    } ) : "";

    				return start + end;
    			} ) : _str_;
			},
			extends: function ( _param_ ) {
			    var 
			    	obj = this;
			    return Digital.each( _param_, function ( name ) {
			    	obj.speeds[ name ] = this;
			    } );
		    }
    	},
    	timeControls: function ( duration ) {
    		/* 
    		  * there is three way to
    		  * set the speed of an animation
    		  * in Digital we can use [ low, fast, meduim ] of
    		  * a number which caracterise the time of the
    		  * animation
    		*/
    		return isNumber( duration ) || isString( duration ) ? Digital.call( function () {
    			return isNumber( duration ) ? duration
    			                            : isString( duration ) ? Digital.call( function () {
    			                             	return this.controls
    			                             	           .speeds[ duration ] 
															        ? this.controls.speeds[ duration ]
    			                             	                    : error( duration + ' is not a valid time key in Digital.' );
    			                            }, this ) : 1000;
    		}, this ) : 1000;
    	},
        dimension: {
        	/*
        	  * the value of each
        	  * uniti in pixel
        	*/
        	base: {
        		cm: 96 / 2.54,
        		mm: ( 96 / 2.54 ) * 0.1,
        		in: 2.54 * ( 96 / 2.54 ),
        		pc: ( 1 / 16 ) * ( 2.54 * ( 96 / 2.54 ) ),
        		pt: ( 1 / 72 ) * ( 2.54 * ( 96 / 2.54 ) ),
        		em: 16
        	}
		}
    } );

    /**
	    * @param {String} _val_
		* @returns {Number} 
	*/
    function  removeUnity( _val_ ) {
    	return parseFloat( 
			_val_.replace( /[a-z]{1,}/ig, "" ) 
		);
	};
    
	/** 
	    * @param {String|Number|Object|Boolean|Array} param
	    * @returns {Array}
	*/ 
	function toggleArray( param ) {
		if( isArray( param ) ) {
			return param;
		}
		else{
			if ( param ) {
				return [ param ];
			}
			else{
				return [];
			}
		}
	};
    
	/**
	    * @param {String} val  
		* @returns {Boolean}
	*/
	function isColor( val ) {
		return /^(?:rgba(.*)|rgb(.*))$/i.test( val );
	};

    /**
	    * @param {String|Number} val  
		* @returns {Boolean}
	*/
	function isPropWithUnity( val ) {
		return isString( val ) && /^[0-9\.\-]{1,}([a-z\%]{1,})$/i.test( val );
	};
    
	/**
	   * @param {String|Number} val 
	   * @returns {Boolean}
	*/
	function isPropWidthOutUnity( val ) {
		return ( isString( val ) && /^[0-9\.\-]{1,}$/i.test( val ) ) || isNumber( val );
	};
    
	/**
	   * @param {String} val 
	   * @returns {Boolean}
	*/
	function isFuncProp( val ) {
		return /^([a-z0-9]*)\(([\D\d\w\W\s]{1,})\)$/i.test( val );
	};
    
	/**
	    * 
	    * @param {Element} node 
	    * @param {String} name 
	    * @param {String|Number} initial 
	    * @param {String|Number} final 
		* @returns {String} 
		*
	*/
	function toggleValue( node, name, initial, final ) {
		if ( !isElement( node ) )
		    return final;
			    if( final === 'toggle' ) {
					if ( isPropWidthOutUnity( initial ) || isPropWithUnity( initial ) ) {
						var 
					        store = Storage.getStore( node ),
						    ex = ( initial || '' ).getEx(),
						    threadName = '{animate}';
						    initial = removeUnity( initial );
					            if ( initial != 0 ) {
					            	var 
					            	    data = {};
					            		data[ name ] = initial + ex;
					            	store.save( data, {
					            		thread: threadName
					            	} );

						    		final = 0 + ex;
					            }
						    	else{
						    		final = store.get( name, {
						    			thread: threadName
						    		} ) || store.get( name );
						    	}
					}
					else if ( isColor( initial ) ) {
						var 
					        store = Storage.getStore( node ),
							val = Digital.fn.animation.getDataOfColor(
								Digital.fn.animation.getRGBValue( initial )
							),
						    threadName = '{animate}';
							val = isArray( val ) ? val : [ ];
						        if ( val[ 0 ] === 0 && val[ 1 ] === 0 && val[ 2 ] === 0 && val[ 3 ] === 1 ) {
									final = store.get( name, {
										thread: threadName
									} ) || store.get( name ) || Digital.fn.animation.createColor( [ 255, 255, 255, 1 ] );
						        }
								else{
									var 
									    data = { };
										data[ name ] = initial;
									store.save( data, {
										thread: threadName
									} );

									final = Digital.fn.animation.createColor( [ 0, 0, 0, 1 ] );
								}
					}
					else if ( isFuncProp( initial ) ) {
						var 
					        store = Storage.getStore( node ),
							data = getDataOfFunction( initial ),
							fname = data.name,
							val = data.params,
							verif = false,
						    threadName = '{animate}';
							    Digital.each( val, function () {
									var 
									    rval = removeUnity( this );
									if ( rval !== 0 )
										verif = true;
								} );

							if ( !verif ) {
								var 
								    primaryValue = [ ];
								        Digital.range( Digital.range( 0, val.length ), function () {
								        	primaryValue.push( 1 );
								        } );
								        final = store.get( name, {
								        	thread: threadName
								        } ) || store.get( name ) || makeFunctionProps( fname, primaryValue );
							}
							else{
								var 
								    update = { };
									update[ name ] = initial;
								        store.save( update, {
								        	thread: threadName
								        } );

								var 
								    fparam = [ ];
									Digital.each( val, function () {
										fparam.push( 0 + ( this || '' ).getEx() );
									} );

								final = makeFunctionProps( fname, fparam );
							}
					}

					return final;
				}
				else{
					return final;
				}
	};

    Digital.update( Digital.dimension, {
    	get: function ( elemtn, prop, value, datas ) {
    		/*
    		  * return the value of someting
    		  * in pixel
    		*/
    		var
    		   ex = value.getEx(),
    		   val = removeUnity( value );

    		return Digital.call( function () {
    			return ex === "%" ? Digital.call( function () {
    				/*
    				  * if the value is in percent we
    				  * have to convert the percent 
    				  * in pixels
    				*/
    				return Digital.dimension.percent( elemtn, prop, val, datas );
    			} ) : Digital.call( function () {
    				/*
    				  * else if it's it a another
    				  * measure we have to convert 
    				  * in pixel
    				*/
    				return Digital.dimension.convertToPx( ex, val );
    			} );
    		} );
    	},
    	convertToPx: function ( ex, value ) {
    		/*
    		   * this method can convert
    		   * the value of any unity to
    		   * pixel
    		*/
    		var
    		    _this = this,
    		    _base = _this.base,
    		    finalValue = value,
    		    back = {};

    		    if ( ex === "rem" ) {
    		   	    finalValue = Digital.fn
    		   	                        .HTMLFn
    		   	                        .css( [ doc.body ], "fontSize" );
    		   	    finalValue = removeUnity( finalValue );
    		   	    finalValue = isNaN( finalValue ) ? finalValue : 1;
    		    }
    		    else {
    		   	    finalValue = _base[ ex ] ? Digital.call( function () {
    		   	    	var 
    		   	    	    unity = ex;
    		   	    	    ex = "px";

    		   	    	return _base[ unity ] * value;
    		   	    } ) : Digital.call( function () {
    		   	    	return value;
    		   	    } );
    		    }

    		return {
    			value: finalValue,
    			ex: ex
    		};
    	},
    	percent: function ( elemnt, prop, value, datas ) {
    	    var 
    	        list = {},
    	        keys = {
    	       	    "left": "width",
    	       	    "top" : "height",
    	       	    "right": "width",
    	       	    "bottom": "height"
    	        },

    	        parentHeight = removeUnity( datas.parentHeight ),
    	        parentWidth = removeUnity( datas.parentWidth ),
    	        /*
    	          * the result of the
    	          * convertion
    	        */
    	        final = value;

    	    Digital.each( keys, function ( name ) {
    	    	var
    	    	    lowerName = prop.toLowerCase(),
    	    	    index = lowerName.indexOf( name ),
    	    	    using = this;

    	    	    if ( index !== -1 ) {
    	    	   	    final = using === "width" ? ( parentWidth * value ) / 100
    	    	   	                              : ( parentHeight * value ) / 100;
    	    	    }
    	    	   else if ( lowerName.indexOf( "size" ) !== -1 ) {
    	    	   	    var 
    	    	   	        size = Digital.fn
    	    	   	                        .HTMLFn
    	    	   	                        .css( [ elemnt.parentNode ], name ),
    	    	   	        float = removeUnity( Digital.shave( size ) );
    	    	   	        // because 1em = 16px
    	    	   	        float = isNaN( float ) ?  16 : float;
    	    	   	        final = ( float * value ) / 100;
    	    	   	    return false;
    	    	    }
    	    }, [ ] , {
    	    	type: "strict"
    	    } );

    	    if ( prop === "width" || prop === "height" ) {
				final = prop === "width"
				            ? ( parentWidth * value ) / 100
    	    	            : ( parentHeight * value ) / 100;
    	    }

    	    return {
    	    	ex: "px",
    	    	value: final
    	    };
    	},
    	modify: function ( initial, final ) {
    		/*
    		  * this function is called when
    		  * a property in an animation
    		  * is set using [ -=, +=, /=, *= ]
    		*/
    		var
    		    iparse = removeUnity( initial ),
    		    ex = final.getEx(),
    		    reg = /^((?:-=|\+=|\*=|\=))/,
    		    fparse = removeUnity( final.replace( reg, "" ) ),
    		    val = 0, operator;

    		    reg.exec( final );

    		    ex === "%" ? Digital.call( function () {
    		    	/*
    		    	   * if the value is a percent
    		    	  * we have to calc the percent of the
    		    	  * initial value
    		    	*/
    		    	fparse = ( iparse * fparse ) / 100;
    		    	val = this.convertToPx( ex, fparse );
    		    }, this ) : Digital.call( function () {
    		    	/*
    		    	  * we have to convert to a pixel value
    		    	  * before calculate the final value
    		    	*/
    		    	val = this.convertToPx( ex, fparse );
    		    }, this );

    		return Digital.eval( iparse, RegExp.$1.replace( "=", "" ), fparse ) + "px";
    	}
    } );

    Digital.fn.animation.Animate = function ( _, props, time, detail, callback ) {
    	/*
    	  * this is the animation object,
    	  * this object is used to create an 
    	  * animation and modify then
    	*/
    	var 
    	    /*
    	      * for manage the
    	      * time
    	    */
		    infos = Manager.analyseAnimationData( time, detail, callback ),
    	    timer = new Digital.fn.Timer( time ),
    	    /*
    	      * is a list of object
    	      * those osbject is used for the animation
    	      * of each property
    	    */
    	    animatorList = [ ],
    	    /*
    	      * props which can be 
    	      * animate
    	    */
    	    canBeAnimate = { },
    	    /*
    	      * the function which will
    	      * be used with then
    	    */
    	    thenFunction = toolsList.emptyFunction,
    	    /*
    	      * the context of the
    	      * object
    	    */
		    _this = this;
			
			time = infos.duration;
			callback = infos.callback;
			detail = infos.detail;
		    _this.state = 'initial';

    	var
    	    _fn = Digital.HTMLFn,
    	    _animation = Digital.fn.animation,
    	    sizeInfos = Digital.call( function () {
    	   	    return isElement( _ ) ? {
    	   	  	    parentWidth: Digital.shave( _fn.css( [ _.parentNode ], 'width' ) ),
    	   	  	    parentHeight: Digital.shave( _fn.css( [ _.parentNode ], 'height' ) )
    	   	    } : {  };
    	    } ),
    	    /*
    	       * this function seclect props 
    	       * who can be animate
    	    */
    	    sortListOfAnimation = function () {
    	   	    Digital.each( props, function ( name ) {
					var 
						initial = _fn.css( [ _ ], name ) || _fn.attr( [ _ ], name );
    	   	  	        initial = Digital.shave( initial );
    	   	  	            if ( /^[a-z]{1,}$/i.test( initial ) )
    	   	  	     	        initial = _.style[ name ] || initial;

    	   	  	    if ( ( isNumber( initial ) || isString( initial ) ) && initial !== 'none' && !isObject( this ) ) {
    	   	  	 	    /*
    	   	  	 	      * we can now add the function
    	   	  	 	      * on the list of property which can
    	   	  	 	      * be animate
    	   	  	 	    */
						props[ name ] += '';
						props[ name ] = toggleValue( _this.node, name, initial, props[ name ] );
    	   	  	 	    props[ name ] = /^(?:-=|\+=|\*=|\/=)/.test( props[ name ].trim() ) 
    	   	  	 	                    ? Digital.dimension.modify( initial, props[ name ].trim() )
    	   	  	 	                    : props[ name ];

    	   	  	 	    if ( isPropWithUnity( initial ) ) {
                            var 
                                ex = props[ name ].getEx(),
                                datas;
                                datas = Digital.dimension.get( _, name, props[ name ], sizeInfos );
    	   	  	 	    	canBeAnimate[ name ] = {
    	   	  	 	    		initial: initial.toFloat(),
    	   	  	 	    		final: datas.value,
    	   	  	 	    		ex: datas.ex,
    	   	  	 	    		finalEx: ex,
    	   	  	 	    		finalValue: props[ name ].toFloat(),
    	   	  	 	    		type: "prop"
    	   	  	 	    	};
    	   	  	 	    }
    	   	  	 	    else if ( isPropWidthOutUnity( initial ) ) {
    	   	  	 	    	canBeAnimate[ name ] = {
    	   	  	 	    		initial: parseFloat( initial ),
    	   	  	 	    		final: parseFloat( props[ name ] ),
    	   	  	 	    		ex: 0,
    	   	  	 	    		type: "prop"
    	   	  	 	    	};
    	   	  	 	    }
    	   	  	 	    else if ( isColor( initial ) ) {
    	   	  	 	    	canBeAnimate[ name ] = {
    	   	  	 	    		initial: _animation.getDataOfColor( _animation.getRGBValue( initial ) ),
    	   	  	 	    		final: _animation.getDataOfColor( _animation.getRGBValue( props[ name ] ) ),
    	   	  	 	    		ex: "",
    	   	  	 	    		type: "color"
    	   	  	 	    	};
    	   	  	 	    }
    	   	  	 	    else if ( isFuncProp( initial ) ) {
    	   	  	 	    	canBeAnimate[ name ] = {
    	   	  	 	    		initial: initial,
    	   	  	 	    		final: props[ name ],
    	   	  	 	    		ex: "",
    	   	  	 	    		type: "function"
    	   	  	 	    	};
    	   	  	 	    }
    	   	  	    }
    	   	  	    else if ( isObject( props[ name ] ) && "to" in props[ name ] && "from" in props[ name ] ) {
    	   	  	        /*
    	   	  	          * we apply all css
    	   	  	          * method
    	   	  	        */
    	   	  	        _fn.css( [ _ ], props[ name ].from );

    	   	  	        canBeAnimate[ name ] = {
    	   	  	     	    initial: props[ name ].from,
    	   	  	     	    final: props[ name ].to,
    	   	  	     	    ex: "",
    	   	  	     	    type: "function"
    	   	  	        };
    	   	  	    }
    	   	    } );
    	    },
    	    insertAllAnimationOptions = function () {
    	   	    /*
    	   	      * this function will be call only
    	   	      * if the var _ is not of type Element,
    	   	      * if this var is a function
    	   	    */
    	   	    props.from = isArray( props[ "from" ] ) ? props.from : [];
    	   	    props.to = isArray( props[ "to" ] ) ? props.to : [];
                /*
                  * props list are give like
                  * { from: [], to:[] }
                */
    	   	    var 
    	   	        first = props.from, // the bigest array
    	   	        second = props.to; // the lower array
                 
    	   	    Digital.each( first, function ( index ) {
    	   	  	    var
    	   	  	        initial = first[ index ],
    	   	  	        final = second[ index ];

    	   	  	        if ( isNumber( initial ) && isNumber( final ) ) {
    	   	  	   	        canBeAnimate[ index ] = {
    	   	  	   	        	initial: initial,
    	   	  	   	        	final: final,
    	   	  	   	        	ex: 0,
    	   	  	   	        	type: "prop"
    	   	  	   	        };
    	   	  	        }
    	   	    } );
    	    },
    	    createAnimatorItem = function () {
    	   	    /*
    	   	      * this function will create an
    	   	      * intance o animateProp or animateCss for
    	   	      * each prop which can be animate
    	   	    */
    	   	    Digital.each( canBeAnimate, function ( name ) {
    	   	 	    if ( this.type === "color" ) {
    	   	 	        animatorList.push( 
    	   	 	    		new _animation.animateColor( 
								this.initial, 
								this.final, 
								name 
							) 
    	   	 	    	);
    	   	 	    }
    	   	 	    else if ( this.type === "function" ) {
    	   	 	    	animatorList.push(
    	   	 	    		new _animation.animateFuntionProp( 
								this.initial, 
								this.final, 
								name 
							) 
    	   	 	    	);
    	   	 	    }
    	   	 	    else {
    	   	 	        animatorList.push(
    	   	 	    		new _animation.animateProp( 
    	   	 	    			{ 
    	   	 	    				name: name, 
    	   	 	    				ex: this.ex, 
    	   	 	    				finalEx: this.finalEx, 
    	   	 	    				finalValue: this.finalValue 
    	   	 	    			}, 
    	   	 	    			this.initial, this.final 
    	   	 	    	    ) 
    	   	 	    	);
    	   	 	    }
    	   	    } );
    	    };

		_this.setNode = function ( node ) {
			    this.node = node;
				Storage.put( this );
			return this;
		};

		_this.setName = function ( name ) {
			    this.name = name;
			return this;
		};

		_this.timer = timer;
    	_this.init = Digital.call( function () {
    		return _ && isElement( _ ) ? function () {
    			/*
    			  * we select the appropiate props
    			  * and we add all object animation in
    			  * the animatorList
    			*/
    			    sortListOfAnimation();
    			createAnimatorItem();
    		} : isFunction( _ ) ? function () {
    			/*
    			  * if the parameter is
    			  * a function
    			*/
    			    insertAllAnimationOptions();
    			createAnimatorItem();
    		} : function () {
    			return;
    		};
    	} );

		if ( isElement( _ ) ) {
			_this.setNode( _ );
		}

		_this.setName( Storage.__active__name__ || 'animate' );
        /*
          * now we can set the maib
          * function( in the timer );
          * this function return the percent
          * of the progression
        */
        timer.steps( function ( time, percent ) {
        	var
        	   res,
        	   isf = isFunction( _ );
        	res = Digital.each( animatorList, function () {
        		    /*
        		      * now we can set the progress
        		      * at the HTML element
        		    */
        		    var 
						final = "timing" in detail 
						                    ? _animation.timing.get( detail.timing, percent, 100, timer )
        		                            : percent;
                        /*
                          * we modify the progression
                          * of all animtorProps
                        */
        		        this.set( final );
        		    return _ && isElement( _ ) ? Digital.call( function () {
        		    	/*
        		    	  * if it is an html element
        		    	  * we have to set these value
        		    	*/
        		    	return _fn.css( [ _ ], this.name || this.prop.name, this.get() );
        		    }, this ) : Digital.call( function () {
        		    	/*
        		    	  * else we have to apply
        		    	  * at the function _ an array
        		    	  * with the same length that the shorter
        		    	  * array of both
        		    	*/
        		    	return this.get();
        		    }, this );
        	}, [ ] );
            /*
              * res content the list of
              * key which will apply at the
              * function
            */
        	return isf ? _.apply( _this, res ) : this;
        } );

        var 
            updates = {},
            obj = this;
            /*
              * now we can add new function
              * to our animation object
            */
            [ "stop", "restart", "back", "forward", "pause" ].each( function () {
            	var name = this;
            	    obj[ name ] = function () {
						        _this.state = name;
            	    	   timer[ name ]();
            	    	return this;
            	    };
            } );

        Digital.update( this, toolsList.twinObject( updates, {
			start: function () {
			    /*
        	      * the starting function
        	      * on the animation
        	    */
			    var obj = this;
				    if ( detail.listen ) {
						if ( isArray( detail.listen ) ) {
							Digital.each( detail.listen, function () {
								this.end();
							} );
						}
						else{
							detail.listen.end();
						}
						delete detail.listen;
					}
        	        if ( this.state === 'initial' )
			            obj.init();
        	    return "delay" in detail ? Digital.call( function () {
        	    	/*
        	    	  * if there is an
        	    	  * animation delay
        	    	*/
        	    	new Digital
			    	        .fn
			    	        .Timer( detail.delay )
        	    	            .steps( function () {
        	    	              	return;
        	    	            } )
        	    	            .then( function () {
			    					obj.state = 'start';
        	    	              	timer.start();
        	    	            } ).start();
        	    	    return obj;
        	    } ) : Digital.call( function () {
        	    	/*
        	    	  * if not
			    	*/  
			    	        obj.state = 'start';
        	    	    timer.start();
        	    	return obj;
        	    } );
			},
			repeat: "repeat" in detail ? Digital.call( function () {
        	    if ( detail.repeat === true || detail.repeat === 'infinite' )
        	    	return 'infinite';
        	            else if ( isNumber( detail.repeat ) )
        	            	return detail.repeat;
        	                    else
        	                    	return 0;
            } ) : 0
		} ) );

        timer.setRepeat( this.repeat ).setInteration( detail.iteration ).then( function () {
        	var
        	    res,
        	    is = isFunction( _ );
        	res = Digital.each( animatorList, function () {
        		    /*
        		      * now we can set the final
        		      * value of the animation
        		    */
        		    timer.direction === "next" 
					                    ? this.set( 100 ) 
										: this.set( 0 );
        		    if ( timer.direction === "next" && !is ) {
        		    	_fn.css( 
							[ _ ], this.name || this.prop.name, 
							this.get() 
						);
        		    }
        		    else if ( !is ) {
        		    	_fn.css( 
							[ _ ], this.name || this.prop.name, 
							this.get() 
						);
        		    }
        		    else{
        		    	return this.get();
        		    }
        	} );

			_this.state = 'finish';
        	is ? Digital.call( function () {
        		/*
        		  * in the case were the
        		  * var _ is an html element
        		*/
        		        _.apply( _this, res );
        		    callback.call( _this, this );
        		thenFunction.apply( _this, res );
        	} ) : Digital.call( function () {
        		/*
        		  * in the case were the
        		  * var _ is a function
        		*/
        		    callback.call( _, this );
        		thenFunction.call( _, this );
        	}, _this );
        } );

        Digital.update( _this, {
        	setId: function ( id ) {
        		Digital.each( animatorList, function ( id ) {
        			return this.setId( id );
        		} );
				Storage
				    .animationList
					.initialList.push( this );

        		   this.id = id;
        		return this;
        	},
        	getId: function () {
        		return this.id;
        	},
        	then: function ( callback ) {
        		    thenFunction = isFunction( callback ) ? callback : function () {
        		    	return;
        		    };
        	    return this;
        	}
        } );
    };

	Digital.update( Manager, {
		analyseAnimationData: function ( time, detail, callback ) {
			var 
			    list =  isObject( time ) ? time : {},
			    _main_ = isObject( detail ) ? toolsList.twinObject( detail, list ) : list,
				final = {},
				duration = isObject( time ) ? _main_.duration : time,
				id = _main_.id || '',
				fx = _main_.then || callback || function () {
					return '';
				};
				    Digital.each( _main_, function ( name ) {
						if ( name !== 'then' ) {
							final[ name ] = this;
						}
					} );
			return {
				id: id,
				callback: fx,
				duration: duration,
				detail: final
			};
		}
	} ); 

    Digital.fn.animation.ObjectAnimation = function ( _, datas, time, detail, callback ) {
    	/*
    	  * the animation manager
    	  * is used to manage many animate
    	  * object
    	*/
    	var 
		    obj = this,
    	    animateList = [],
    	    i = 0,
    	    nodes = _.selectorList,
    	    length = _.length,
			infos = Manager.analyseAnimationData( time, detail, callback ),
    	    finalFn = function () {
    	    	return;
    	    };
			callback = infos.callback;
			detail = infos.detail;
			time = infos.duration;
    	    Digital.each( nodes, function ( ) {
    	   	    var animation = new Digital.fn.animation.Animate( this, datas, time, detail, function () {
    	   	  	        i++;
    	   	  	        if ( i === length ) {
							i = 0;
						    Digital.call( function () {
								animation.state = 'finish';
    	   	  		                callback.call( _, obj );
    	   	  		                finalFn.call( {}, obj );
								/*
    	   	  		              * final fn is the last fn
    	   	  		              * which will be call
    	   	  		              * in the animation
    	   	  		            */
							} );
							callback = finalFn;
    	   	  	        }
    	   	    } ).setId( infos.id ),
    	   	    queu = Storage.get( this );

    	   	    queu && detail.queu !== false ? Digital.call( function () {
    	   	    	/*
    	   	    	  * we add your animation
    	   	    	  * in the queu list
    	   	    	*/
    	   	    	queu.put( detail.queu || "*", animation );
    	   	    } ) : Digital.call( function () {
    	   	    	/*
    	   	    	  * now we can start the 
    	   	    	  * animation
    	   	    	*/
    	   	    	animation.start();
    	   	    } );
                /*
                  * we add animation
                  * in the list of animation
                */
    	   	    animateList.push( animation );
    	    } );

    	var 
    	    updates = {};
    	    obj = this;
    	    /*
    	      * now we can add new function
    	      * to our animation object
    	    */
    	    [ "start", "stop", "restart", "back", "forward", "pause" ].each( function () {
    	    	var name = this;
    	    	    obj[ name ] = function () {
    	    	    	    Digital.each( animateList, function () {
    	    	    	   	    this[ name ]();
    	    	    	    } );
    	    	    	return this;
    	    	    };
    	    } );
    	Digital.update( this, toolsList.twinObject( updates, {
			then: function ( callback ) {
				    finalFn = isFunction( callback ) ? callback : function () {
        	   	        return;
        	        };
				return this;
			}
		} ) );
    };

    Manager.animation.Queu = function ( index, node ) {
    	/*
    	  * we use this object to
    	  * manage a queu of animation
    	*/
    	this.length = 0;
    	this.list = {};
    	this.node = node;
    	this.key = [ index ];
    	/*
    	  * we create our basic
    	  * list
    	*/
    	this.list[ index ] = [];
    	this.saves = {};
    	this.start();
    };

    Manager.animation.Queu.prototype = {
    	add: function ( index, callback ) {
    		    /*
    		      * we add an item in
    		      * the queu
    		    */
    		    callback = isFunction( callback ) ? callback : function () {
    			    return;
    		    };
    		    this.list[ index ]
				    .push( callback );
    		    this.length = this.list[ index ].length;
			return this.length === 1 ? this.shift( index ) : this;
    	},
    	open: function ( name ) {
    		    this.key.indexOf( name ) == -1 ? Digital.call( function () {
    		    	this.list[ name ] = [];
    		    	this.key.push( name );
    		    }, this ) : "";
    		return this;
    	},
    	put: function ( index, _obj_ ) {
    		/*
    		   * we use this funcion
    		   * to add an animation 
    		   * object to the queu
    		*/
    		var _this = this;
    	     	_this.open( index )
    		        .list[ index ]
    		        .push( Digital.call( function () {
                        /*
                           * we have to verify in first
                           * if the queu is empty
                        */
    		         	    if ( _this.list[ index ].length === 0 ) {
    		         	  	    _obj_.start();
							}
    		         	    _obj_.then( function () {
    		         	 	    _this.shift( index );
    		         	    } );
    		         	return _obj_;
    		        } ) );
				_this.length = _this.list[ index ].length;
    		return _this;
    	},
    	shift: function ( index ) {
    		index = index ? index : "*";

			var 
    		    queu = this.list[ index ],
				active, _this = this;
				if ( queu.length === 0 )
				    return this;
				active = queu[ 0 ];
    		    isFunction( active ) ? Digital.call( function () {
    		    	/*
    		    	  * if the active intem of the
    		    	  * queu is a function
					*/
					_this.next = function () {
						    queu.shift();
							_this.length = queu.length;
						_this.shift( index );
					};
					active.call( {}, _this, this.node );
    		    } ) : isObject( active ) ? Digital.call( function () {
					if ( active.state !== 'finish' ) {
						if( active.state === 'initial' ) {
							active.start();
						}
					}
					else {
						queu.shift();
						_this.length = queu.length;
						_this.shift( index );
					}
				} ): false;
    		return this;
		},
    	active: function ( index ) {
    		/*
    		  * return the active 
    		  * object of a list
    		*/
    		    index = isString( index ) && index ? index : "*"; 
    		    this.open( index );
    	    return this.list[ index ][ 0 ];
    	},
    	start: function () {
    		var _this = this;
    		    Digital.each( _this.key, function () {
    		    	var active = _this.active( this );
    		    	    if ( isObject( active ) ) {
    		    	    	active.start();
    		    	    }
    		    } );
    		return this;
    	},
    	stop: function () {
    		var _this = this;
    		    Digital.each( _this.key, function () {
    		    	var active = _this.active( this );
    		    	    if ( isObject( active ) ) {
    		    	    	active.stop();
    		    	    }
    		    } );
    		return this;
    	},
    	pause: function () {
    		var _this = this;
    		    Digital.each( _this.key, function () {
    		    	var 
					    active = _this.active( this );
    		    	    if ( isObject( active ) ) {
    		    	    	active.pause();
    		    	    }
    		    } );
    		return this;
    	},
    	clear: function () {
    		var _this = this;
    		    _this.stop();
    		    Digital.each( _this.key, function () {
    		    	_this.list[ this ] = [];
    		    } );
    		return _this;
    	},
    	cancel: function ( _name_, _id_ ) {
    		/*
    		  * to cancel an animation
    		  * using is id
    		*/
    		_id_ = _id_ ? _id_ : _name_;
    		_name_ = !_id_ ? "*" : _name_;
    		var 
    		    _this = this;
    		    Digital.each( _this.list[ _name_ ], function ( index ) {
    		    	if ( isFunction( this ) ) {
    		    		/*
    		    		  * because in a queu
    		    		  * we can have a function
    		    		  * an it haven't got a method
    		    		  * getId
    		    		*/
    		    		return;
    		    	}
    		    	var
    		    	   animation = this,
    		    	   animationId = animation.getId();
    		    	if ( animationId === _id_ ) {
						animation.stop();
    		    		_this.list[ _name_ ][ index ] = function ( queu ) {
    		    			return queu.next();
    		    		};
    		    	}
    		    } );

    		return _this;
    	}
    };

	Manager.DataStore = function ( node ) {
		this.node = node;
		this.store = { fn: { } };
	};

	Manager.DataStore.prototype = {
		save: function ( obj, context ) {
			context = isObject( context ) ? context : { thread: 'fn' };
			var 
			    _this = this,
				thread = context.thread || 'fn';
			    obj = isObject( obj ) && !isArray( obj ) ? obj : {};
				if ( !isObject( _this.store[ thread ] ) )
				    _this.store[ thread ] = {};
			            Digital.each( obj, function ( name ) {
				        	_this.store[ thread ][ name ] = this;
				        } );
			return this;
		},
		get: function ( name, context ) {
			context = isObject( context ) ? context : { thread: 'fn' };
			if ( !isObject( this.store[ context.thread ] ) )
				this.store[ context.thread ] = {};
			    var
				    thread = context.thread || 'fn'; 
			return this.store[ thread ][ name ];
		},
		remove: function ( name ) {
			    delete this.store[ name ]; 
			return this;
		}
	};

	Digital.fn.FilterList.extends( {
		'animate': function ( els ) {
			var 
			    result = [],
			    list = Storage.analyse( 'start' );
				    list.each( function () {
						if ( els.indexOf( this ) )
						    result.push( this );
					} );
			
			return result;
		},
		'animated': function ( els ) {
			var 
			    result = [],
			    list = Storage.analyse( 'finish' );
				    list.each( function () {
						if ( els.indexOf( this ) )
						    result.push( this );
					} );
			
			return result;
		},
		'animation-pause': function ( els ) {
			var 
			    result = [],
			    list = Storage.analyse( 'pause' );
				    list.each( function () {
						if ( els.indexOf( this ) )
						    result.push( this );
					} );
			
			return result;
		},
		'animation-stop': function ( els ) {
			var 
			    result = [],
			    list = Storage.analyse( 'stop' );
				    list.each( function () {
						if ( els.indexOf( this ) )
						    result.push( this );
					} );
			
			return result;
		},
		'animation-any-state': function ( els ) {
			var 
			    result = [],
			    list = Storage.analyse();
				    list.each( function () {
						if ( els.indexOf( this.node ) )
						    result.push( this.node );
					} );
			
			return result;
		}
	}, Digital.fn.FilterList.types.PSEUDO );

    Digital.init.extends( Digital.fn.externalFunction, {
        timer: function ( duration ) {
           	/*
           	  * return the duration
           	  * of the object array
           	*/
           	return new Digital.fn.Timer( duration );
        },
        process: function ( _id_ ) {
           	/*
           	  * return a specific animation
           	  * using is id
           	*/
           	return Storage.getAnimationById( _id_ );
        }
    } );

    Digital.animate = function ( fn, props, time, detail, callback, _ ) {
    	var 
    	    data = Manager.analyseAnimationData( time, detail, callback ),
    	    request =  new Digital.fn
    		            .animation
    		            .Animate( fn, props, data.duration, data.detail, data.callback );
    	return _ === true ? request : request.start();
    };

    Digital.init.extends( Digital.fn.internalFunction, {
        animate: function ( datas, time, detail, callback ) {
         	/*
         	  * animate will create an instance
         	  * of the object animation an return
         	  * it
         	*/ 
			new Digital.fn.animation.ObjectAnimation( 
				this, datas, 
				time, 
				detail, 
				callback 
			);
         	return this;
        },
        queu: function ( index, params ) {
         	/*
         	  * we use this function to
         	  * mange the queu of animation
         	*/
         	var 
         	    _this = this;
         	    _this.each( function () {
         	   	    /*
         	   	      * firtly we get the queu
         	   	      * of the object
         	   	    */
         	   	    var 
				    	queu = Storage.get( this );
         	   	        if ( isFunction( index ) ) {
					    	queu.add( "*", index );
         	   	        }
         	   	        else if ( isString( index ) ) {
         	   	  	        /*
         	   	  	          * in this case we open
         	   	  	          * the context if its 
         	   	  	          * exist we can just open
         	   	  	          * else we have to create the
         	   	  	          * context
         	   	  	        */
         	   	  	        queu.open( index );
         	   	  	        if ( isArray( params ) ) {
         	   	  	        	queu.clear( index );
         	   	  	        }
         	   	  	        else{
								if ( isFunction( params ) ) {
         	   	  	        	    queu.add( index, params );
         	   	  	            }
							    else if ( isObject( params ) ) {
         	   	        	        queu.put( index, params );
         	   	                }
							}
         	   	        }
         	   	        else{
							if ( isArray( index ) ) {
         	   	  	            /*
         	   	  	              * we shall empty
         	   	  	              * the queu
         	   	  	            */
         	   	  	            queu.clear();
         	   	            }
         	   	            else if ( isObject( index ) ) {
         	   	            	queu.put( '*', index );
         	   	            }
						}
         	    } );
         	return _this;
        },
        createAllPart: function () {
         	/*
         	  * now we can create a queu
         	  * for each element
         	*/
			this.each( function () {
         	   	if ( !isElement( this ) ) {
         	   		return;
         	   	}
         	   	/*
         	   	  * now we create a queu
         	   	  * for each html element
         	   	*/
         	   	if ( Storage.animationList.nodes.indexOf( this ) === -1 ) {
         	   	    var 
						queu = new Manager.animation.Queu( "*", this ),
						store = new Manager.DataStore( this );
					Storage.addQueu( this, queu );
					Storage.addStore( store );
         	   	}
         	} );
         	return this;
        },
        getQueu: function () {
         	return Storage.get( this[ 0 ] );
        },
        bump: function ( _list_, _id_ ) {
         	return Digital.call( function () {
         		this.each( function () {
         			var
         			    queu = Storage.get( this ),
         			    both = isString( _list_ ) && isString( _id_ );
         			return _list_ && _id_ && both ? Digital.call( function () {
         				/*
         				  * if there is the list name
         				  * and the id of the animatio
         				*/
         				return queu.cancel( _list_, _id_ );
         			} ) : Digital.call( function () {
         				/*
         				  * if there is only one 
         				  * argument we have to use the
         				  * default list a cancel this
         				  * animation
         				*/
         				return queu.cancel( "*", _list_ );
         			} );
         		} );
         		return this;
         	}, this );
        },
		save: function ( props ) {
			props = toggleArray( props );
			    this.each( function () {
					var 
					    node = this,
						store = Storage.getStore( node );
					Digital.each( props, function () {
						var  
						    data = {},
						    val = Digital.shave(
							    Digital.css( [ node ], this )
						    );
						data[ this ] = val;
						store.save( data );
					} );
				} );
			return this;
		},
		restore: function ( props, options ) {
			props = toggleArray( props );
			options = isArray( options ) ? options : options ? toggleArray( options ) : [ ];
			    this.each( function () {
					var 
					    node = this,
						store = Storage.getStore( node );
					Digital.each( props, function ( index ) {
						var 
						    val = store.get( this ) || options[ index ];
						Digital.css( [ node ], this, val );
					} );
				} );
			return this;
		}
    } );
    
    Digital.css = function ( elemnt, props, values ) {
    	return Digital.shave( Digital.call( function () {
    		return Digital.HTMLFn.css( elemnt, props, values );
    	} ) );
    };

	Digital.update( Manager, {
		pathManager: {
			authorization: [ ],
			addAuthorization: function ( obj ) {
				    this.authorization.push( obj );
				return this;
			},
			getAutorization: function ( name ) {
				var 
				    obj = { 
						name: name, 
						params: { 
							path: true 
						} 
					};
					Digital.each( this.authorization, function () {
						if ( this.name === name ) {
							obj = this;
						}
					} );
				return obj;
			}
		}
	} );
    
    Digital.Project = function ( __name__, __params__ ) {
    	var
		    obj = new Digital.fn
						.storage
						.UniversalObject( { name: __name__, params: __params__ } );
    	    obj.setAll( {
				init: function () {
					Storage
					    .animationFunc
						.push( this.datas.name );
					    Manager.pathManager.addAuthorization( {
					    	name: this.datas.name,
					    	params: this.datas.params
					    } );
					    this.animationList = [];
					Digital.call( function ( ) {
						var 
						    update = { },
							obj = this;
							    if ( !Digital.fn.FilterList.isPseudo( obj.datas.name ) ) {
									update[ obj.datas.name ] = function ( els ) {
							    	    return Digital.fn.FilterList.filter( 
							    	    	els, 
							    	    	'animation-named', 
							    	    	obj.datas.name 
							     	    );
							        };
								}
							Digital.fn.FilterList.extends(
								update,
								Digital.fn.FilterList.types.PSEUDO
							);
						return this;
					}, this );
					return this;
				},
				build: function ( __obj__, data ) {
					__obj__ = isObject( __obj__ ) ? __obj__ : { path: true };
					if ( 'manager' in __obj__ ) {
						data = __obj__.manager( data );
					}
					return data;
				},
				createAnimation: function ( __fx__ ) {
					isFunction( __fx__ ) ? true : error( ' ( createAnimation ) the paramater shall be a function' );
					var 
					    update = {},
						animationList = [],
						__this__ = this,
						__steps__function__ = function () {
							return;
						},
						steps = function ( ) {
							var 
							    args = Array.from( arguments );
							return __steps__function__.apply( Digital.builder( this.node ), args );
						};
						update[ __this__.datas.name ] = function ( data, time, detail, callback ) {
							var 
							    infos = Manager.analyseAnimationData( time, detail, callback ),
								obj = this,
								time = infos.duration;
								detail = infos.detail; 
								callback = infos.callback;
								data = __this__.build( __this__.datas.params, data );
							    __fx__.call( __this__, data, function ( from, to ) {
								    from = toggleArray( from );
									to = toggleArray( to );
									obj.each( function () {
										var 
							    	        animation = Digital.animate( 
										    	steps,
										    	{ from: from, to: to }, 
										    	time, detail, 
										    	callback, true
										    )
											.setId( infos.id )
											.setName( __this__.datas.name )
											.setNode( this );
											animationList.push( animation )
										if ( !( 'queu' in detail ) || detail.queu ) {
											Storage.get( this ).put( detail.queu || '*', animation );
										}
										else{
											animation.start();
										}
									} );
							    }, function ( callback ) {
									if ( isFunction( callback ) )
									    __steps__function__ = callback;
								} );
						};
						Digital.init.extends(
							Digital.fn.internalFunction,
							toolsList.twinObject( update, { } )
						);
					    this.animationList = animationList;
						delete this.extends;
					return this;
				},
				start: function () {
					this.animationList.each( function () {
						if ( this )
						    this.start();
					} );
					return this;
				},
				then: function ( callback ) {
					var 
					    i = 0, _this = this;
					    _this.animationList.each( function () {
					    	if ( this )
					    	    this.then( function () {
									i++;
									if ( i === _this.animationList.length ) {
									    callback = callback.call( _this, i );
										callback = Digital.call( function () {
											return function () {
											    return;
										    };
										} );
									}
								} );
					    } );
					return this;
				},
				extends: function ( __fx__ ) {
					    isFunction( __fx__ ) ? true : error( ' ( extends ) the paramater shall be a function' );
						    var 
							    update = {},
								__this__ = this;
								update[ this.datas.name ] = function () {
									var 
									    args = Array.from( arguments ),
										    data = Digital.call( function ( ) {
										    	Storage.__active__name__ = __this__.datas.name;
										    	return Manager.analyseAnimationData.apply( {}, args )
										    } );
										    __fx__.apply( this, [ data.duration, data.detail, data.callback ] );
										delete Storage.__active__name__;
									return this;
								};
							Digital.init.extends(
								Digital.fn.internalFunction,
								toolsList.twinObject( update, { } )
							);
					    delete this.createAnimation;
						delete this.then;
						delete this.start;
					return this;
				}
			} );
    	return obj.init( );
    };

	Digital.Project.all = function ( params, datas ) {
		params = isObject( params ) ? params : { };
		datas = isObject( datas ) ? datas : { };
		    Digital.each( datas, function ( name ) {
				if ( isFunction( this )) {
					Digital.Project( name, params ).extends( this );
				}
			} );
		return this;
	};

    Digital.call( function () {
    	var 
    	    list = {};
    	    Digital.each( [ 'pause', 'start', 'forward', 'stop', 'back', 'clear', 'shift', 'cancel' ], function () {
    	   	    var 
    	   	        base = this,
    	   	        name = base + "Queu";
    	   	        list[ name ] =  function ( index ) {
    	   	     	    index = index ? index : "*";
    	   	     	        this.each( function () {
    	   	     		        Storage.get( this )
    	   	     		                [ base ]( index );
    	   	     	        } );
    	   	     	    return this;
    	   	        };
    	   } );
    	Digital.init.extends( Digital.fn.internalFunction, list );
	}, Digital );

	Digital.update( Digital, {
		types: Digital.fn.FilterList.types
	} );

    Digital.call( function () {
    	var
    	    updates = {};
    	    Digital.each( ( 'images embeds head forms links scripts body title' ).split( " " ), function () {
    	   	    var 
					name = this,
					obj = {};
					updates[ name ] = function () {
						return doc[ name ];
					};   

					obj[ name ] = function () {
						if ( isElement(  doc[ name ] ) ) {
							return  doc[ name ];
						}
						else{
							return Array.from(
							    doc[ name ]
						    );
						}
					};

					Digital
					    .fn.FilterList
						.extends( obj );
    	    } );
			
    	Digital.update( 
			Digital, 
			updates 
		);
    } );

	/*
	  * now ce can add all new function at the object
	  * we can use them when it will be create
	*/

	Digital.call( function () {
	    var
	        internal = { },
	        external = { };
	        Storage.internalFunctionNameList = [];

	        Digital.each( Digital.fn.internalFunction , function ( name ) {
	      	    if ( name !== "const" && name !== "extends" ) {
	      	 	    internal[ name ] = this;
	      	 	    Storage.internalFunctionNameList.push( name );
	      	    }
	        } );

	        Digital.each( Digital.fn.externalFunction, function ( name ) {
	      	    if ( name !== "const" && name !== "extends" ) {
	      		    external[ name ] = this;
	      	    }
	        } );

		Digital.init.extends( _intern, internal );
		Digital.init.extends( 
		    _extern, 
		    toolsList.twinObject( external, {
		    	Promise: function ( pcallback, pobject, pnexted ) {
		    		return new Digital.fn.storage.Promise( pcallback, pobject, pnexted );
		    	},
				DateTimeManager: function () {
					return Digital.fn.storage.DateTimeManager.apply( this, arguments );
				},
				canvas2d: function () {
					return Digital.fn.storage.canvas2d.apply( this, arguments );
				},
				UniversalObject: function () {
					return Digital.fn.storage.UniversalObject.apply( this, arguments );
				}
		    } ) 
		);

		Digital.update( Digital.builder, {
			all: Digital.fn.storage.Promise.all,
			set: Digital.fn.storage.Promise.set
		} );
	} );

	Digital.update( 
		Digital.fn, 
		Manager.animation 
	);

	Digital.extends = function ( _param, _list, _ ) {
		/*
		  * here we want to add all functions of
		  * Digital ( tools, fn ... ) at
		  * the varructor
		*/
		if ( !_param ) {
			Digital.tools.update( Digital.builder, this );
			Digital.tools.update( Digital.builder, this.tools, function ( param ) {
				if ( isFunction( param ) )
					return true;
			} );
		}
		else if ( _param === Digital.builder.METHOD || _param === Digital.builder.FILTER ) {
			/*
			  * if there is a
			  * param
			*/
			return _param === Digital.builder.FILTER
					? Digital.extends.filters( _list, _  )
					: Digital.extends.methods( _list, _  );
		}
		else{
			if ( _param === Digital.builder.TIMING ) {
			    return Digital.extends.timing(
			    	_list
			    );
		    }
		    else if ( _param === Digital.builder.SPEED ) {
		    	return Digital.extends.speeds(
		    		_list
		    	);
		    }
		    else{
				if ( _param === Digital.builder.ANIMATE ) {
		    	    return Digital.extends.animate(
		    	    	_list
		    	    );
		        }
	            else
	            	return error( "( Digital.extends ) incorrect first parameter" );
			}
		}
	};

	Digital.update( Digital.extends, {
		filters: function ( filters, type ) {
		    /*
		      * for add new filter att the
		      * object
		    */
		    return Digital
		    		.fn.FilterList
		    		.extends( filters, type );
	    },
		methods: function ( methods ) {
		    /*
		      * for add new method to
		      * the contructor
		    */
		    return Digital.update( 
		    	Digital.init.prototype,  
		    	methods || {} 
		    );
	    },
		timing: function ( timings ) {
		    /*
		        * Here we add a new 
		    	* timing funcrtion to 
		    	* Digital 
		    */	
		    return Digital
		            .fn.animation
		    		.timing.extends( timings );
	    },
		animate: function ( _arr_ ) {
		        Digital.each( _arr_, function () {
		    		Storage.animationFunc.push( this );
		    	} );
		    return this;
	    },
		speeds: function ( speeds ) {
		    return Digital
		            .controls
		    		.extends( speeds );
	    }
	} );

	Digital.extends.addConstant = function ( _var_list_ ) {
		/*
		  * to add var at the
		  * varructor
		  * like version or
		  * author remind that these varant
		  * are not used in any Digital
		  * instance
		*/
		    Digital.tools.update( Digital.builder, _var_list_, function ( _param_ ) {
		    	if ( isString( _param_ ) )
		    		return true;
		    } );
		return Digital;
	};

	Digital.nativeNeeded = Digital.range( 0, 3 );

	Digital.Project( 'disappear', { path: true, needed: Digital.nativeNeeded } ).extends( function ( time, detail, callback ) {
		var 
		    obj = this,
			listener = Manager.listener( function () {
				obj.save( [ 'display', 'opacity' ] );
			} );
			if ( obj.length ) {
				obj.animate( { opacity: 0 }, time, toolsList.twinObject( detail, { listen: listener }  ), function ( animation ) {
					obj.css( { display: 'none' } );
					callback.call( this, animation );
					obj.restore( 'opacity' );
				} );
			}
		return this;
	} );

	Digital.Project( 'appear', { path: true, needed: Digital.nativeNeeded } ).extends( function ( time, detail, callback ) {
		var 
		    obj = this,
			listener = [];
			listener.push( Manager.listener( function () {
				obj.css( { opacity: 0 } );
			} ) );
			if ( obj.length ) {
				obj.each( function () {
					var 
					    node = this,
						object = Digital.builder( node ),
						store = Storage.getStore( node ),
						opacity = store.get( 'opacity' ) || 1,
						display =  store.get( 'display' ) || 'block';
						listener.push( Manager.listener( function () {
							object.css( 'display', display );
						} ) );
					return object.animate( 
						{ opacity: opacity }, time, 
						toolsList.twinObject( detail, { listen: listener }  ), 
						callback 
					);
				} );
			}
		return this;
	} );

	Digital.Project( 'bounce', { path: false, needed: 'default' } ).createAnimation( function ( data, launcher, steps ) {
		data = isObject( data ) ? data : { };
		'min' in data ? true : data.min = 1;
		'max' in data ? true : data.max = 1;

        launcher( [ data.min ], [ data.max ] );
        steps( function ( x ) {
            this.css( {
                transform: makeFunctionProps( 'scale', x )
            } )
        } );
    } );

	Digital.Project( 'slideUp', { path: true, needed: Digital.nativeNeeded } ).extends( function ( time, detail, callback ) {
		var 
		    obj = this,
			datas = [ 'height', 'opacity' ],
			listener = Manager.listener( function () {
				return obj.save( datas );
			} );

			detail.listen = listener;
		return obj.animate( { height: '0px', opacity: 0 }, time, detail, function () {
			obj.save( 'display' ).css( 'display', 'none' ).restore( datas );
			callback.apply( this, arguments );
		} );
	} );

	Digital.Project( 'slideDown', { path: true, needed: Digital.nativeNeeded } ).extends( function ( time, detail, callback ) {
		var 
		    obj = this,
			listener = Manager.listener( function () {
				obj.css( {
					height: '0px',
					opacity: '0'
				} ).restore( [ 'display' ] );
			} );
			detail.listen = listener;
		return obj.animate( { height: 'toggle', opacity: 'toggle' }, time, detail, callback );
	} );

	Digital.Project( 'rectOut', { path: true, needed: Digital.nativeNeeded } ).extends( function ( time, detail, callback ) {
		var 
		    obj = this,
			data = [ 'height', 'width', 'opacity', 'display' ];
			obj.save( data );
		return obj.animate( { height: '0px', width: '0px', opacity: '0' }, time, detail, function () {
			data.pop();
			obj.css( 'display', 'none' ).restore( data );
			callback.apply( this, arguments );
		} );
	} );

	Digital.Project.all( { path: true, needed: Digital.nativeNeeded }, {
		slideLeft: function ( time, detail, callback ) {
			var 
			    obj = this,
				data = [ 'width', 'opacity', 'display' ];
				obj.save( data );
			return obj.animate( { width: '0px', opacity: '0' }, time, detail, function () {
				obj.css( 'display', 'none' );
				callback.apply( this, arguments );
			} );
		},
		slideRight: function ( time, detail, callback ) {
			var 
			    obj = this,
				listener = Manager.listener( function () {
					obj.css( {
						width: '0px',
						opacity: '0'
					} ).restore( [ 'display' ] );
				} );
				detail.listen = listener;
			return obj.animate( { width: 'toggle', opacity: 'toggle' }, time, detail, callback );
		}
	} );

	Digital.Project( 'rectIn', { path: true, needed: Digital.nativeNeeded } ).extends( function ( time, detail, callback ) {
		var 
		    obj = this,
			listener = Manager.listener( function () {
				obj.restore( 'display' ).css( {
					height: '0px',
					width: '0px',
					opacity: '0'
				} );
			} );
			detail.listen = listener;
		return obj.animate( { height: 'toggle', width: 'toggle', opacity: 'toggle' }, time, detail, callback );
	} );

	Digital.extends.methods( {
		toggle: function ( time, detail, callback ) {
			this.each( function () {
				if ( isElement( this ) ) {
					if ( Digital.css( [ this ], 'display' ) === 'none' ) {
						return Digital.builder( this ).appear( time, detail, callback );
					}
					else{
						return Digital.builder( this ).disappear( time, detail, callback );
					}
				}
			} );
			return this;
		},
		toggleSlideY: function ( time, detail, callback ) {
			this.each( function () {
				if ( isElement( this ) ) {
					if ( Digital.css( [ this ], 'display' ) === 'none' ) {
						return Digital.builder( this ).slideDown( time, detail, callback );
					}
					else{
						return Digital.builder( this ).slideUp( time, detail, callback );
					}
				}
			} );
			return this;
		},
		toggleSlideX: function ( time, detail, callback ) {
			this.each( function () {
				if ( isElement( this ) ) {
					if ( Digital.css( [ this ], 'display' ) === 'none' ) {
						return Digital.builder( this ).slideRight( time, detail, callback );
					}
					else{
						return Digital.builder( this ).slideLeft( time, detail, callback );
					}
				}
			} );
			return this;
		},
		toggleRect: function ( time, detail, callback ) {
			this.each( function () {
				if ( isElement( this ) ) {
					if ( Digital.css( [ this ], 'display' ) === 'none' ) {
						return Digital.builder( this ).rectIn( time, detail, callback );
					}
					else{
						return Digital.builder( this ).rectOut( time, detail, callback );
					}
				}
			} );
			return this;
		}
	} );

	Digital.fn.Path = function ( __params__, __fx__, nodes ) {
		__fx__ = isFunction( __fx__ ) ? __fx__ : function ( ) {
			return;
		};
		if ( !__params__.queu )
			__params__.queu = '*';
		var 
		    animationList = [ ],
			animationDetail = { },
		    tools = {
				removeNotRequire: function ( arr ) {
					var 
					    list = [];
						Digital.each( arr, function () {
							if ( 'queu' in this )
							    delete this[ 'queu' ];
							        if ( 'duration' in this )
							            delete this[ 'duration' ];
							list.push( this );
						} );
					return list;
				},
				removeCallBack: function ( arr ) {
					var 
					    result = [];
						Digital.each( arr, function () {
							if ( isObject( this ) ) {
								if ( 'queu' in this )
									delete this[ 'queu' ];
								return result.push( this );
							}
							else if ( isFunction( this ) ) {
								return
							}
							result.push( this );
						} );
					return result;
				},
				generateList: function ( __fx__list__ ) {
					var 
					    list = Storage.animationFunc;
						Digital.each( list, function ( ) {
							var 
							    animationName = this;
								animationDetail[ this ] = Manager 
								                                .pathManager
								                                .getAutorization( this )[ 'params' ];
								if ( animationDetail[ this ].path === false )
								    return;
						            __fx__list__[ animationName ] = function ( ) {
							        	var 
							        	    args = Array.from( arguments ),
							        	    name = animationName;
								    		args = tools.removeNotRequire( 
								    			tools.generateList( args )
								    		);
								    	return {
								    		name: name,
								    		params: args
								    	};
							        };
						} );
					return __fx__list__;
				}
			},
			__fx__list__ = { },
			___tree__ = {
				add: function ( percent, data ) {
					    animationList.push( {
							percent: percent,
							data: data
						} );
					return this;
				},
				from: function ( data ) {
					return this.add( 0, data );
				},
				to: function ( data ) {
					return this.add( 100, data );
				},
				then: function ( fx ) {
					    isFunction( fx ) ? animationList.push( fx ) : false;
					return this;
				}
			};
		__fx__list__ = tools.generateList( __fx__list__ );
		this.datas = {
			tree: ___tree__,
			fx: __fx__,
			params: __params__,
			list: __fx__list__
		};
		this.nodes = nodes;
		this.animationList = animationList;
		this.animationDetail = animationDetail;
		this.build();
	};

	Digital.fn.Path.prototype = {
		build: function () {
			this.datas.fx.call(
				this,
				this.datas.tree,
				this.datas.list
			);
			this.endPoint();
		},
		calcPercent: function ( percent, total ) {
			return ( total * percent ) / 100;
		},
		endPoint: function () {
			var 
			    obj = this,
				list = this.animationList,
				lapsPercent = 0,
				duration = Digital.timeControls( this.datas.params.duration || 'low' ), 
				queu = '';
				    if ( 'queu' in this.datas.params )
					    queu = this.datas.params[ 'queu' ];
						    else 
						        queu = '*';
						Digital.each( list, function ( index ) {
							if ( isObject( this )) {
								var 
								    data = this;
									data.duration = obj.calcPercent( data.percent - lapsPercent, duration );
									lapsPercent = data.percent;
								list[ index ] = data;
							}
						} );
			this.start( list );
		},
		start: function ( list ) {
			var 
			    details = this.animationDetail,
				obj = this.nodes,
				basicData = this.datas.params,
				basicNeeded = [ 1, 2, 3 ];
				delete basicData[ 'duration' ];
				Digital.each( list, function () {
					if ( isObject( this ) ) {
						var 
					        data = this.data,
						    name = data.name,
						    infos = details[ name ],
						    params = data.params,
						    needed = infos.needed ? infos.needed : basicNeeded;
							needed = isString( needed ) && needed === 'default' ? basicNeeded : needed;
					    var result = Manager.analyseAnimationData(
					    		params[ needed[ 0 ] ],
					    		params[ needed[ 1 ] ],
					    		params[ needed[ 2 ] ]
					    	);
					        params[ needed[ 0 ] ] = this.duration;
					        params[ needed[ 1 ] ] = toolsList.twinObject( result.detail, basicData );
					        params[ needed[ 2 ] ] = result.callback;
					    obj[ name ].apply( obj, params );
					}
					else if ( isFunction( this ) ) {
						obj.queu( basicData.queu || '*', this );
					}
				} );
			return this;
		}
	};

	Digital.crypto = function ( name, context ) {
		context = isObject( context ) ? context : {
			base: 10
		};
		var 
		    silze = 'abcdefghijklmno pqrstuvwxyz_.{}[]*&$"*+-/\\\'=#~@;:!<>?',
			wcompare = Digital.range( context.base, context.base + silze.length );
		return ( name || '' ).replace( /./ig, function () {
			var 
			    wname = arguments[ 0 ],
				windex = indexOf.call( silze, wname.toLowerCase() );
				    if( windex >= 0 )
				        wname = wcompare[ windex ];
			return wname;
		} );	
	};

	Digital.extends.methods( {
		path: function ( __params__, __fx__ ) {
			__params__ = isObject( __params__ ) ? __params__ : { };
			    delete __params__[ 'listen' ];
			    new Digital.fn.Path( __params__, __fx__, this ); 
			return this;
		},
		as: function ( key ) {
			key = isString( key ) ? key : '';
			    Storage.setVar( key, this.toArray() );
			return this;
		},
		reverseChilds: function () {
			var 
			    list = this.children().toArray(),
				obj = this;

				list.reverse();
				obj.append( list );
			return obj;
		}
	} );

	Digital.exports = function ( _, __, global ) {

        /*
          * the default
          * value
        */

		__ = 'Digital';

		/*
		  * we can export now the
		  * digital object
		  * which can be access ouside 
		  * of the initial scope
		*/

		if ( !( __ in window ) )
			global[ __ ] = _;
		        global.$ ? Digital.call( function () {

		        	/*
		        	  * if this variable exist 
		        	  * allready ( it is already used by  )
		        	  * another javascript library
		        	*/

		        	    global.$$ = global._$$ = _;
					return this;
		        } ) : Digital.call( function () {
		        	    global.$ = global._$ = _;
					return this;
		        } );

		return Digital.call( function () {
			    if ( typeof module === 'object' )
			   	    module.exports = wn[ __ ];
			return global[ __ ];
		} );
		
	};

	/*
	   * before export Digital  we have
	   * to select which key can be
	   * access or not out off the 
	   * Digital scope ( we have to define the restriction )
	   * this restrcition Doesn't work on InternetExplorer 9 and
	   * previous version
	*/

	Digital.call( function () {
		var 
		    fList = toolsList.twinObject( Digital, Storage.internalFunctionNameList );
		    Digital.each( fList, function ( name ) {
                /*
		           * now we can add the name on 
		           * the list of Digital internal
		           * native function
		        */
		        return DigitalStorage.addLikeNative( name );
	        } );
		return fList;
	} );

	/*
	  *  we can now export 
	  * our Digital object
	*/

    Digital.extends();

	Digital.extends.filters( {
		'has': function ( els, props ) {
			return Digital
			            .builder( els )
			            .has( props.list ).selectorList;
		},
		'nth-child': function ( els, props, obj ) {
			return obj[ Digital.types.FUNC ].n( els, props );
		},
		'contain': function ( els, props ) {
			var 
				val = props.list,
				list = [];
				Digital.each( els, function () {
					if ( ( Digital.builder( this ).text() || '' ).trim() === val.trim() )
						list.push( this );
				} );
			
			return list;
		},
		'is': function ( els, props ) {
			var 
			    list = props.list,
				final = [],
			    result = Digital.builder( list ).selectorList;
				Digital.each( result, function () {
					if ( els.indexOf( this ) != -1 ) {
						final.push( this );
					}
				} );

			return final;
		},
		'nextAll': function ( els, props ) {
			var 
			    _new_node_ = Digital.builder( els ).nextAll( props.list );
			return _new_node_;
		},
		'prevAll': function ( els, props ) {
			var 
			    _new_node_ = Digital.builder( els ).nextAll( props.list );
			return _new_node_;
		},
		'any': function ( els, props, obj ) {
			return obj[ Digital.builder.types.FUNC ].is( els, props );
		},
		'where': function ( els, props, obj ) {
			return obj[ Digital.builder.types.FUNC ].is( 
				els,
				props 
			);
		},
		'maches': function ( els, props, obj ) {
			return obj[ Digital.builder.types.FUNC ].is( els, props );
		},
		'current': function ( els, props ) {
			var 
			    arr = [];
				Digital.builder( props.list ).each( function () {
					if ( els.indexOf( this ) !== -1 && this.style.display !== 'none' )
					    arr.push( this ); 
				} );

			return arr;
		},
		'future': function ( els, props, obj ) {
			return obj[ Digital.builder.types.FUNC ].current( els, props );
		},
		'past': function ( els, props, obj ) {
			return obj[ Digital.builder.types.FUNC ].current( els, props );
		},
		'animate': function ( els, props ) {
			var 
				list = [];
				props.array( ',' ).each( function () {
					Storage.getAnimationById( this ).each( function () {
						if ( els.indexOf( this.node ) !== -1 ) {
							list.push( this.node );
						}
					} );
				} );

			return list;
		},
		'animation-named': function ( els, props ) {
			var 
			    list = [ ];
				props.array( ',' ).each( function () {
					var 
					    name = ( this || '' ).trim();
					    Storage.animationData.each( function ( ) {
					    	if ( this.name === name && els.indexOf( this.node ) !== -1  )
								list.push( this.node );
					    } );
				} );
			return Digital.fn.Picker.finalise( list ) || [ ];
		},
		'var': function ( els, props ) {
			var 
			    data = props.array( ',' ),
				key = data[ 0 ];
			if ( data.length === 1 ) {
				return Storage.getVar( ( key || '' ).trim() );
			} else {
				key = ( key || '' ).trim();
				data.shift();
				var  
				    value = ( data.join( ',' ) ||  '' ).trim();
					if ( value === 'this' ) {
						Storage.setVar( key, els );
					}
					else{
						Storage.setVar( key, value );
					}
				return els;
			}
		},
		'varCss': function ( els, props ) {
			var 
			    data = props.array( ',' ),
				key = data[ 0 ];
			if ( data.length === 1 ) {
				return Storage.getVarCss( ( key || '' ).trim() );
			} else {
				key = ( key || '' ).trim();
				data.shift();
				var  
				    value = ( data.join( ',' ) ||  '' ).trim();
					if ( value === 'this' ) {
						Storage.setCssVar( key, els );
					}
					else{
						Storage.setCssVar( key, value );
					}
				return els;
			}
		}
	}, Digital.types.FUNC );

	Digital.extends.filters( {
		'empty': function ( els ) {
			var 
			    _new_node_ = Digital.builder( els ).filter( function ( node ) {
					if ( ( Digital.builder( node ).text() || '' ).trim() === '' )
					    return true;
				} );
		    return _new_node_.selectorList;
		},
		'hide': function ( els ) {
			var 
			    arr = [ ];
				Digital.each( els, function () {
					var 
					    node = this,
						display = Digital.shave(
							Digital.css( [ node ], 'display' )
						);
					if ( display === 'none' ) {
						arr.push( node );
					}
				} );
			return arr;
		},
		'visible': function ( els ) {
			var 
			    arr = [ ];
				Digital.each( els, function () {
					var 
					    node = this,
						display = Digital.shave(
							Digital.css( [ node ], 'display' )
						);
					if ( display !== 'none' ) {
						arr.push( node );
					}
				} );
			return arr;
		},
		'root': function () {
			return Digital.fn.Picker.start( 'html' );
		},
		'scope': function ( els, props, obj ) {
			return obj[ Digital.builder.types.PSEUDO ].root( els, props );
		},
		'link': function ( els, props, obj ) {
			var 
			    arr = [];
			    obj[ Digital.builder.types.PSEUDO ].links( els, props ).each( function () {
					if ( els.indexOf( this ) !== -1 )
					    arr.push( this );
				} );
			return arr;
		},
		'read-write': function ( els ) {
			var 
				arr = [];
				Digital.builder( 'input:enabled, textarea:enabled, [contenteditable=true]' ).each( function () {
					if ( els.indexOf( this ) !== -1 )
					    arr.push( this );
				} );
			return arr;
		},
		'read-only': function ( els ) {
			var 
				arr = [];
				Digital.builder( ':not( input:enabled, textarea:enabled, [contenteditable=true] )' ).each( function () {
					if ( els.indexOf( this ) !== -1 )
					    arr.push( this );
				} );
			return arr;
		},
		'local-link': function ( els, props, obj ) {
			var 
			    arr = [];
			    obj[ Digital.builder.types.PSEUDO ].link( els, props, obj ).each( function () {
					if ( ( Digital.builder.url( this.href ).basename() || '' )[ 0 ] === '#'  )
					    arr.push( this );
				} );
			return arr;
		},
		'placeholder-shown': function ( els ) {
			var 
			    arr = [];
				els.each( function () {
					if ( this.placeholder )
					    arr.push( this );
				} );
			return arr;
		},
		'checked': function ( els ) {
			var 
				arr = [];
				els.each( function () {
					if( this.checked === true )
					    arr.push( this );
				} );
			return arr;
		},
		'selected': function ( els ) {
			var 
				arr = [];
				els.each( function () {
					if( this.selected === true )
					    arr.push( this );
				} );
			return arr;
		},
		'first-child': function ( els ) {
			return Digital.builder( els )
			                        .first( true )
									.selectorList;
		},
		'last-child': function ( els ) {
			return Digital.builder( els )
			                        .last( true )
									.selectorList;
		},
		'any-link': function ( els ) {
			var 
				arr = [];
				Digital.builder( 'a, area, link' ).each( function () {
					if ( els.indexOf( this ) !== -1 )
					    arr.push( this );
				} );
			
			return arr;
		},
		'blank': function ( els ) {
			var
			    arr = [];
				els.each( function () {
					if ( this.nodeType === 1 && ( this.nodeName.toLowerCase() === 'input' || this.nodeName.toLowerCase() === 'textarea' ) ) {
						if ( this.value === '' )
						    arr.push( this );
					}
				} );

			return arr;
		},
		'in-range': function ( els ) {
			var 
			    arr = [];
				Digital.each( els, function () {
					if ( this.nodeName.toLowerCase() !== 'input' && this.type !== 'range' )
					    return;
					var 
					    value = parseFloat( this.value ),
						min = parseFloat( this.min ),
						max = parseFloat( this.max );
					
					if ( min <= value && value <= max )
					    arr.push( this );
				} );

			return arr;
		},
		'ouf-of-range': function ( els ) {
			var 
			    arr = [];
				Digital.each( els, function () {
					if ( this.nodeName.toLowerCase() !== 'input' && this.type !== 'range' )
					    return;
					var 
					    value = parseFloat( this.value ),
						min = parseFloat( this.min ),
						max = parseFloat( this.max );
					
					if ( !( min <= value && value <= max ) )
					    arr.push( this );
				} );

			return arr;
		},
		'default': function ( els ) {
			var 
			    arr = [];
				Digital.builder( ':selected, :checked' ).each( function () {
					if ( els.indexOf( this ) !== -1 )
					    arr.push( this );
				} );
			return arr;
		},
		'only-child': function ( els ) {
			var 
			    arr = [];
				els.each( function () {
					if ( this.children.length === 1 )
					    arr.push( this.children[ 0 ] );
				} );
			return arr;
		}
	} );

	Digital.call( function ( ) {
		var 
		    __new__filter__ = { },
			inputType  = [
				'button', 'checkbox', 'radio', 'color', 'text', 'password',
				'date', 'datetime', 'datetime-local', 'email', 'file', 'hidden',
				'image', 'month', 'number', 'range', 'reset', 'search', 'submit',
				'tel', 'time', 'url', 'week'
			];
		Digital.each( inputType, function () {
			var 
			    name = this;
			    __new__filter__[ name ] = function ( els, props, obj ) {
					    props.list = name;
			    	return obj[ Digital.types.FUNC ].input( els, props, obj );
			    };
			return this;
		} );
		Digital.extends.filters( __new__filter__ );
	} );

	Digital.builder.extends.methods( {
		hide: function () {
			return this.save( 'display' ).css( {
				display: 'none'
			} );
		},
		show: function () {
			return this.restore( 'display', 'block' );
		}
	} );

	Digital.builder.color = function () {
		var 
		    x , y, z, a;
			a = Digital.randNative( 1 );
			x = Digital.randNative( 255 );
			y =  Digital.randNative( 255 );
			z = Digital.randNative( 255 );
		return Digital.fn.animation.createColor( [ x, y, z, a ] );
	};

	Digital.extends.methods( {
		has: function ( str ) {
			var 
				data = ___analyse___( str ),
				result = [];
			this.each( function () {
				var 
				    parent = this;
					if ( !isElement( parent ) )
					    return;
				Digital.each( data, function () {
					var 
					    el = this.parts[ 0 ].el.trim(),
						obj = toggleArray( Digital.fn.Picker.buildGroup( this ) || [ ] ),
						ex = el[ 0 ];
					if ( ex === '>' ) {
						Digital.each( obj, function ( ) {
							if ( parent.isEqualNode( this.parentNode ) ) {
								result.push( this.parentNode );
							}
						} );
					}
					else if ( ex === '+' ) {
						Digital.each( obj, function ( ) {
							if ( parent.isEqualNode( ( this.previousSibling || '' ).previousSibling ) || parent.isEqualNode( this.previousSibling ) ) {
								result.push( this.previousSibling );
							}
						} );
					}
					else{
						if ( ex === '~' ) {
							Digital.each( obj, function ( ) {
								var 
								    arr = Digital.fn.dom.prevUntil( this );
							    Digital.each( arr, function ( ) {
									if ( parent.isEqualNode( ( this.previousSibling || '' ).previousSibling ) || parent.isEqualNode( this.previousSibling ) ) {
							    	    result.push( this.previousSibling );
							        }
								} );
						    } );
						}
						else{
							Digital.each( obj, function ( ) {
								var 
								    arr = Digital.fn.dom.parentUntil( this, parent );
								Digital.each( arr, function ( ) {
									if ( parent.isEqualNode( this ) ) {
								        result.push( this );
							        }
								} );
							} );
						}
					}
				} );
			} );
			    result = Digital.fn.Picker.finalise( result ) || [ ];
			return Digital.builder( result );
		},
		toArray: function () {
			return this.selectorList;
		},
		where: function ( props, context ) {
			var 
			    result = Digital.fn.FilterList.filter( 
					this.toArray(), 
					'where',
					props 
				);
			return Digital.builder( result, context );
		}
	} );

	Digital.Project( "transform", { needed: "default" } ).extends( function ( data, time, detail, callback ) {
		
	} );

	Digital.extends.animate( 
		[ 'animate' ]
	);

	Digital.builder.toString = function () {
		return '[Object Digital]';
	};

	Digital.update( 
		Digital.builder, {
			storage: Storage,
			manager: Manager
		}
	);
	/*
	  * now we can add 
	  * some varant
	*/

	Digital.extends.addConstant( {
		version: "2.0.0",
		author: "Digital.developper",
		copyright: "2021",
		require: "window, document"
	} );

	Digital.call( function () {
		/** 
		   *
		   * this varant is used for extend
		   * Digital, 
		   * with this we can update filters ( {func}, {speudo}, {initial} )
		   *
		   * this varant is used for extend
		   * Digital in a other manner 
		   * here we can add new method
		   * 
		   * this constant is used for extend
		   * the timing function in
		   * Digital  
		   * 
		   * this constant is used for extend
		   * a speed function of 
		   * Digital
 		   *
	    */
		var 
		    _this = this,
			_obj = { },
			_list = [ 'FILTER', 'METHOD', 'TIMING', 'SPEED' ];
			_this.each( [ 'DIGITAL.FILTER.ADDER', 'DIGITAL.METHOD.ADDER', 'DIGITAL.TIMING.ADDER', 'DIGITAL.SPEED.ADDER' ], function ( index ) {
				_obj[ _list[ index ] ] = Digital.crypto( this, {
					base: Digital.rand( index * 3 )
				} );
			} );

			Digital.builder.extends.speeds( {
				middle: 900
			} );
			
		return _this.extends.addConstant( _obj );
	}, Digital );
	/**
	    * Here we export the 
		* Digital object  
	*/
    return Digital.exports( Digital.builder, null, wn );
}, function ( callback ) {

	"use strict";

	/*
	  * this function permit to
	  * init the Digital process 
	*/
	
	return callback.apply( { }, [ window, window.document ] );
}, function ( global ) {

	"use strict";

	/*
	  * the first thing to do
	  * is verifie is the window object 
	  * exist and if documrnt object
	  * exist
	*/

	if ( typeof module === 'object' && typeof module.exports === 'object' ) {
		if ( global.document )
			return true;
	}
	else{
		if ( typeof window != undefined && window.document ) {
		    if ( 'toString' in window && ( window.toString() === '[object Window]' || window.Element ) )
		    	return true;
	    }
	}

	throw new Error( "( Digital ) cannot be supported by this support" );
} );