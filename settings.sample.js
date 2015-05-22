(function(){
	'use strict';

	angular.module('Domani.settings', ['ngResource'])

	.value('Settings', {
		mysql: {
			host     : 'localhost',
			user     : 'root',
			password : '',
			database : '',
			connected: false
		},
		api: {
			app_name: "my_app",
			app_key: "xxxxxxxxxx",
			url: "http://my_api",
			username: "httpusr",
			password: "httppwd"
		}
	})
})();