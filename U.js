
var U = module.exports;

/**
 * 把props参数指定的属性或方法复制到obj对象上。
 * @param {Object} obj Object对象。
 * @param {Object} props 包含要复制到obj对象上的属性或方法的对象。
 * @param {Boolean} strict 指定是否采用严格模式复制。默认为false。
 * @return {Object} 复制后的obj对象。
 */
U.merge = function(obj, props, strict) {
  for (var key in props) {
		if (!strict || obj.hasOwnProperty(key) || obj[key] !== undefined) obj[key] = props[key];
	}
	return obj;
};

/**
 * 改变func函数的作用域scope，即this的指向。
 * @param {Function} func 要改变函数作用域的函数。
 * @param {Object} self 指定func函数的作用对象。
 * @return {Function} 一个作用域为参数self的功能与func相同的新函数。
 */
U.delegate = function(func, self) {
	var context = self || win;
	if (arguments.length > 2) {
		var args = Array.prototype.slice.call(arguments, 2);
		return function() {
			var newArgs = Array.prototype.concat.apply(args, arguments);
			return func.apply(context, newArgs);
		};
	} else {
		return function() {
			return func.apply(context, arguments);
		};
	}
};
