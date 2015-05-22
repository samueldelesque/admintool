(function(){
	'use strict';

	angular.module('Domani.settingsView', [
		'ngRoute',
		'service.mysql',
		'service.log',
		'Domani.settings'
	])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/settings', {
			templateUrl: 'views/settings/settings.html',
			controller: 'settingsCtrl'
		});
	}])

	.controller('settingsCtrl', function($scope,$location,Settings,Mysql,Logger) {
		$scope.user = Settings.mysql.user
		$scope.password = Settings.mysql.password
		$scope.host = Settings.mysql.host
		$scope.database = Settings.mysql.database

		$scope.save = function(){
			Settings.mysql.user = $scope.user
			Settings.mysql.password = $scope.password
			Settings.mysql.host = $scope.host
			Settings.mysql.database = $scope.database
			Mysql.connect(Settings.mysql).then(function(connectId){
				$scope.notify("Connection Succeded! [connection #"+connectId+"]")
				var tables = Object.keys(Settings.architecture)
				$location.path("/edit/"+tables[0])
			},function(err){
				$scope.notify("Connection Failed! ["+err+"]")
			})
		}
	});
})()