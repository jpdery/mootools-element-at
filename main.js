"use strict"

var cache = {};

Element.at = function(path, async, fn) {

	var element = cache[path];
	if (element) {
		var clone = element.clone(true, true);
		if (fn) fn(clone);
		return clone;
	}

	async = async || false;

	new Moobile.Request({
		method: 'get',
		async: async,
		url: path
	}).addEvent('success', function(response) {

		element = Element.from(response);

		if (fn) fn(element.clone(true, true));
	}).addEvent('failure', function(request) {
		if (fn) fn(null);
	}).send();

	if (element) cache[path] = element;

	return !async ? element.clone(true, true) : null;
};