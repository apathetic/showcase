'use strict';
/**
 * AutoCompleter constructor
 * @param  {DOM Object} handle  should contain all filter input field.
 * @param  {Object} options  contains configurations
 *           {
				filter: DOM Object input field,
				filterTarget: DOM Object where rendered JSON result appended to,
				elementTag: String,
				typingConfig : {
					minimal: Number,
					typePause: Number,
					customHideAndShow: Function
				},
				markup {
					cacheData: Function		overrides the default markup cache method
				}
				ajax: {
					url: String,
					action: String			'POST', 'GET', 'DELETE'
					renderJSON:  Function	It overrides the default render: ,
					error: Function
				},
				customFilter: Function
 *			}
 *
 *
 *
 * @return {void}
 */
var AutoCompleter = function (handle, options) {
		var defaults = {
			//filterSource:'markup', //'ajax', function
			filter: handle.querySelector('input.filter'),
			filterTarget: handle.querySelector('.result'),
			elementTag: 'li',
			typingConfig : {
				minimal: 3,
				typePause: 300
			}
		};
		this.options = this._extend(defaults, options);
		this.handle = handle;
		this.filterElement = this.options.filterTarget.querySelectorAll(this.options.elementTag);
		this.dataCache = [];
		this.timer = null;
		this.regex = null;
		this.allowAjax = true;
		this.noResult = {};
		this.init();
};


/**
 * init AutoCompleter
 * @return {[type]} [description]
 */
AutoCompleter.prototype.init = function () {
	//setup no result 
	this.noResult = this.addNoResult('No result');

	if (this.options.ajax) {
		this.options.filter.addEventListener('keyup', this.filterData.bind(this)); //ie >=9 && ios 6+
		return;
	}
	if (typeof this.options.customFilter === 'function'){
		this.options.filter.addEventListener('keyup', this.options.customFilter.bind(this)); //ie >=9 && ios 6+
		return;
	}
	//filter markup
	this.dataCache = (this.options.markup)? this._cacheCustomData():this._cacheMarkupData();
	this.options.filter.addEventListener('keyup', this.filterMarkup.bind(this)); //ie >=9 && ios 6+
};

AutoCompleter.prototype.addNoResult = function (text) {
	var span = document.createElement('span');

	span.classList.add('hide', 'no-result');
	span.innerHTML = text;
	return this.handle.appendChild(span);
};
/**
 * For filter markup
 * @param  {Event} e
 * @return {Void}
 */
AutoCompleter.prototype.filterMarkup = function (e) {

	this.regex = new RegExp(this._replaceStr(e.target.value), "i");
	if(e.target.value.length !== 0) {
		this._checkTyping(e,this._hideAndShowMarkup);
	} else {
		this._hideAndShowMarkup(); //apply no filter show all the list
		this.noResult.classList.add('hide');
	}
};
/**
 * For filter that requires Ajax to get items
 * @param  {Event} e
 * @return {Void}
 */
AutoCompleter.prototype.filterData = function (e) {
	this.regex = new RegExp(this._replaceStr(e.target.value), "i");

	if(e.target.value.length !== 0) {
		this._checkTyping(e,this._callAjax);
	} else {
		this.options.filterTarget.classList.remove('loading');
		this.options.filterTarget.innerHTML = '';
		this.noResult.classList.add('hide');
		this.allowAjax = true;
	}
};
/**
 * cache text in markup into array
 * @return {array} cached text
 */
AutoCompleter.prototype._cacheMarkupData = function () {
	if(!this.filterElement) {
		return;
	}
	var data = [];
	// cache all filterable text into an array for performance;
	for (var i = 0; i < this.filterElement.length; i++) {
		data.push(this.filterElement[i].innerHTML);
	}

	return data;
};

AutoCompleter.prototype._cacheCustomData = function () {
	if(!this.filterElement && typeof this.options.markup.cacheData !== 'function') {
		return;
	}
	var data = [];
	// cache all filterable text into an array for performance;
	for (var i = 0; i < this.filterElement.length; i++) {
		data.push(this.options.markup.cacheData(this.filterElement[i]));
	}

	return data;
};
/**
 * check if typing against configuration
 * @param  {event}   e			mouseup event
 * @param  {Function} callback  function to fire when typing pause is detected
 * @return {void}
 */
AutoCompleter.prototype._checkTyping = function (e, callback) {
	clearTimeout(this.timer);
	// if entered text is less than minimal
	if(e.target.value.length < this.options.typingConfig.minimal) {
		if(this.options.ajax) {
			this.allowAjax = true;
		}
		return;
	} else {
		this.timer = window.setTimeout(callback.bind(this, e), this.options.typingConfig.typePause);
	}
};
/**
 * hide and show list items
 * @return {void}
 */
AutoCompleter.prototype._hideAndShowMarkup = function () {
	if(this.options.typingConfig.customHideAndShow) {
		this.options.typingConfig.customHideAndShow(this);
		return;
	}
	var show = 0;
	for (var i = 0; i < this.dataCache.length; i++) {
		if(this.dataCache[i].match(this.regex)) {
			this.filterElement[i].className = 'show';
			show ++;
		} else {
			this.filterElement[i].className = 'hide';
		}
	}
	this.checkNoResult( show );
};
AutoCompleter.prototype.checkNoResult = function (show) {
	if(show === 0) {
		//show no result message
		if(this.noResult.classList.contains('hide')) { this.noResult.classList.remove('hide'); }
	} else {
		//hide no result message
		if(!this.noResult.classList.contains('hide')) { this.noResult.classList.add('hide'); }
	}
};
/**
 * ajax
 * @param {Object} config {
 *                         {String} url
 *                         {String} value  URL parameter
 *                         {String} action POST, GET, DELETE
 *                        }
 * @return {Void}
 */
AutoCompleter.prototype._ajax = function (config) {
	var xhr,
		self = this;
	self.options.filterTarget.classList.add('loading');
	if(window.XMLHttpRequest) {
		xhr = new XMLHttpRequest(); // ie 9+
	}
	xhr.onreadystatechange = function () {
		// ajax is finished
		if(this.readyState === 4 ){

			//Ajax success
			if(this.status >= 200 && this.status < 400) {
				var response = this.responseText;
				if(this.getResponseHeader('content-type').match('json')) {
					response = JSON.parse(response);

					//render response JSON as markup
					if(self.options.ajax.renderJSON) {
						//override the json markup default rendering
						self.dataCache = self.options.ajax.renderJSON(response, self.options.filterTarget);
					} else {
						var resultMarkup = self.options.filterTarget,
							frag = document.createDocumentFragment();

						for(var i = 0; i < response.length; i++) {
							var li = document.createElement("li");
							li.innerHTML = response[i];
							frag.appendChild(li);
						}

						resultMarkup.innerHTML = '';
						resultMarkup.appendChild(frag);
						self.dataCache =  response;

					}
				}
				// update cached DOM element
				self.filterElement = self.options.filterTarget.querySelectorAll(self.options.elementTag);
				// filter the appended list with current input value
				self._hideAndShowMarkup();
				self.options.filterTarget.classList.remove('loading');

			} else {
				if(self.options.ajax.error) {
					self.options.ajax.error(this.responseText);
				}
			}
		}
	};

	xhr.open(config.action, config.url);
	xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
	xhr.onerror = function() {
	};
	xhr.timeout = self.options.ajax.timeout || 30000;
	xhr.ontimeout = function () {
		// append error
		if(typeof self.options.ajax.timeoutCallback) {
			self.options.ajax.timeoutCallback(this.responseText);
		}
	};
	xhr.send(config.value);

};
AutoCompleter.prototype._callAjax = function (e) {
	if(this.allowAjax && e.target.value !== "") {
		this.dataCache = [];
		this.options.ajax.action = this.options.ajax.action || 'GET';
		this._ajax({
			url: this.options.ajax.url,
			value: e.target.getAttribute('name') + '=' + e.target.value,
			action: this.options.ajax.action});
		this.allowAjax = false;

	} else {
		this._hideAndShowMarkup();
	}
};
/**
 * Check special characters
 * @param  {String} s
 * @return {String}
 */
AutoCompleter.prototype._replaceStr = function (s) {
	return s.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
};
/**
 * extend ojects
 * @param  {Object} obj
 * @return {Object}
 */
AutoCompleter.prototype._extend = function(obj) {
	var args = Array.prototype.slice.call(arguments, 1);
	for(var i = 0; i < args.length; i ++) {
		var source = args[i];
		for(var prop in source) {
			if( typeof obj[prop] === "object") {
				for (var p in source[prop]) {
					obj[prop][p] = source[prop][p];
				}
			} else {
				obj[prop] = source[prop];
			}
		}
	}
	return obj;
};
