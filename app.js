(function(){
	'use strict';

	// Declare app level module which depends on views, and components
	angular.module('Domani', [
		'ngRoute',
		'Domani.settings',
		'Domani.tableView',
		'service.api',
		'service.log',
		'ui.bootstrap',
	]).
	config(['$routeProvider', function($routeProvider) {
		$routeProvider.otherwise({redirectTo: "/"})
		$routeProvider.when("/", {
			resolve: {
				loader: function($q, $location, Settings, Api, Logger) {
					var deferred = $q.defer()
					if(Settings.architecture){
						deferred.resolve()
					}
					else{
						Api.getArchitecture().then(function(response){
							if(response.status != 200){
								Logger.error(response)
								// $scope.notify("Failed to fetch Architecture!")
								$location.path("/")
								return
							}
							// $scope.notify("App ready.");
							// Logger.log(response.data)
							Settings.architecture = response.data
							deferred.resolve()
						})
					}
					return deferred.promise
				}
			}
		})
	}])
	.controller('MainCtrl', function($scope,Logger,Settings,Api) {
		$scope.body = angular.element("body")

		$scope.langs = [{locale:"en_US",name:"English"},{locale:"fr_FR",name:"French"}]
		$scope.lang = $scope.langs[0]
		$scope.isDesktop = false
		$scope.notifications = {}
		$scope.logActive = false
		$scope.tables = []
		$scope.architecture = function(){
			return Settings.architecture
		}

		$scope.toggleLogClass = function(){if($scope.logActive)return 'log-shown';}

		$scope.notify = function(msg, time){
			if(!time)time=5
			var id = Math.random() * (999 - 3) + Math.random() * (999 - 3) + Math.random() * (999 - 3);
			$scope.notifications[id] = {
				text: msg
			}

			setTimeout(function(){
				$scope.$apply(function(){
					delete $scope.notifications[id]
					Logger.log($scope.notifications)
				})
			},1000*time)
		}

		$scope.hasNotifications = function(){
			return Object.keys($scope.notifications).length > 0
		}

		if($scope.isDesktop){
			$scope.gui = require('nw.gui')
			$scope.gui.App.on('open', function(cmdline) {
				Logger.log('command line: ' + cmdline);
			})
		}
	});
})()