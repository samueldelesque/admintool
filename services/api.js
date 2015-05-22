(function(){
	'use strict';

	angular.module('service.api', [
		'ngResource',
		'Domani.settings',
		'service.log'
	])

	.run(function($http,Settings){
		$http.defaults.headers.common['Authorization'] = 'Basic ' + Settings.api.username + ':' + Settings.api.password
	})

	.service('Api', function($http, $q, Settings, Logger){
		// if(Settings.api.username)
		var auth = btoa(Settings.api.username+":"+Settings.api.password)
		$http.defaults.headers.common['Authorization'] = 'Basic ' + auth
		$http.defaults.useXDomain = true;

		var getAuthorization = "?app_name="+Settings.api.app_name+"&app_key="+Settings.api.app_key

		this.getArchitecture = function(){
			Logger.log("Api::getArchitecture "+Settings.api.url+"/architecture")
			return $http({
				url: Settings.api.url+"/architecture"+getAuthorization,
				method: "GET",
				data: {},
				// withCredentials: true,
				// headers: {
				// 	'Authorization': 'Basic c3RyZWdpc2pheno6amF6emhhbmRzZGV2',
				// 	'Content-Type': 'application/json; charset=utf-8'
				// },
			})
		}

		this.getAll = function(table,lang){
			Logger.log("Api::getAll "+Settings.api.url+"/dynamic/"+table)
			return $http.get(Settings.api.url+"/dynamic/"+table+"?locale="+lang)
		}

		this.update = function(table,id,row){
			Logger.log("Api::update "+Settings.api.url+"/dynamic/"+table+"/"+id,row)
			return $http.post(Settings.api.url+"/dynamic/"+table+"/"+id+getAuthorization,row)
		}

		this.insert = function(table,row){
			Logger.log("Api::insert "+Settings.api.url+"/dynamic/"+table,row)
			return $http.post(Settings.api.url+"/dynamic/"+table+getAuthorization,row)
		}

		this.delete = function(table,id){
			Logger.log("Api::delete "+Settings.api.url+"/dynamic/"+table+"/"+id)
			return $http.delete(Settings.api.url+"/dynamic/"+table+"/"+id+getAuthorization)
		}
	});
})();