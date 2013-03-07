var util = require('util');
var async = require('async');
var U = require('./U');

function BigPip (res, mainTpl, locals) {
  this.res = res;
	this.sectionCbs = [];
}

BigPip.prototype.addSection = function() {
	var id = arguments[0];
	var jq = false;
	if (arguments.length > 2) {
		var selector = '$("' + arguments[1] + '")';
		var cb = arguments[2];
		jq = true;
	} else {
		var selector = 'document.getElementById("' + id + '")';
		var cb = arguments[1];
	}
	this.sectionCbs.push([ id, selector, cb, jq ]);
};

BigPip.prototype.render = function(mainTpl, locals, cb) {
	var _this = this;
	locals = locals || {};
	this.res.render(mainTpl, locals, U.delegate(_this._writeHtml, _this, function(err) {
		async.each(
			_this.sectionCbs,
			U.delegate(_this.pipSection, _this),
			U.delegate(_this._endRender, _this, cb)
		);
	}));
};

BigPip.prototype.pipSection = function(section, cb) {
	var _this = this,
		selector = section[1],
		sectionCb = section[2],
		jq = section[3];
	sectionCb(function(err, html) {
		html = html.replace(/<\/script/gi, '<\\/script')
					//.replace(/<script([^>]*)>/gi, '<script$1 defer="true">')
					.replace(/"/g, '\\"');
		if (jq == true)
			html = '<script>' + selector + '.html("' + html + '");</script>';
		else
			html = '<script>' + selector + '.innerHTML="' + html + '";</script>';
		_this._writeHtml(cb, err, html);
	});
};

BigPip.prototype._writeHtml = function(cb, err, html) {
	if (err) console.log(err.stack);
	if (!err && html)
		this.res.write(html);
	cb(err);
};

BigPip.prototype._endRender = function(cb) {
	this.res.end();
	if (cb) cb();
};

module.exports = BigPip;
