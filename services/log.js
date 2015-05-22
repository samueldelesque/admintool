(function(){
	'use strict';

	angular.module('service.log', [
		'ngResource'
	])

	.service('Logger', function(){
		this.log = function(){
			var msg;
			if(arguments.length > 1) msg = JSON.stringify(arguments)
			else if(typeof arguments[0] == "string") msg = arguments[0]
			else if(typeof arguments[0] == "object") msg = JSON.stringify(arguments[0])
			else msg = arguments[0].toString()
			$(".console-log").append("<div><i class=\"glyphicon glyphicon-console\"></i> "+msg+"<div>")
			console.log(msg)
		}

		this.error = function(){
			var msg;
			if(arguments.length > 1) msg = JSON.stringify(arguments)
			else if(typeof arguments[0] == "string") msg = arguments[0]
			else if(typeof arguments[0] == "object") msg = JSON.stringify(arguments[0])
			else msg = arguments[0].toString()
			$(".console-log").append("<div class=\"error\">"+msg+"<div>")
			console.error(msg)
		}
	});
})();