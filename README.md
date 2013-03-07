node-bigpip
===========

bigpip for nodejs

```javascript
  var bigPip = new BigPip(res, 'login');
	bigPip.addSection('s1', function(cb) {
		setTimeout(function() {
			cb(null, '<h2>11111111</h2>');
		}, 1000);
	});
	bigPip.addSection('s2', function(cb) {
		setTimeout(function() {
			cb(null, '<h2>222222222</h2>');
		}, 3000);
	});
	bigPip.addSection('s3', function(cb) {
		setTimeout(function() {
			cb(null, '<h2>333333333</h2>');
		}, 5000);
	});
	bigPip.addSection('s4', function(cb) {
		setTimeout(function() {
			cb(null, '<h2 style="color:red">44444444444</h2>');
		}, 7000);
  });
	bigPip.render();
```
