(function(){
	'use strict';

	angular.module('Domani.tableView', [
		'ngRoute',
		'service.api',
		'service.log',
		'Domani.settings'
	])

	.config(function($routeProvider) {
		$routeProvider.when('/edit/:table', {
			templateUrl: 'views/table/table.html',
			controller: 'tableCtrl',
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
	})

	.controller('tableCtrl', function($scope,$location,$routeParams,Settings,Api,Logger) {
		// // -> LOCAL MYSQL VERSION
		// if(!Settings.mysql.connected){
		// 	$location.path("/settings")
		// 	$scope.notify("Please specify valid DB settings first!")
		// 	return;
		// }

		// var select = []
		// angular.forEach($scope.table.rows,function(row,name){select.push(name)})
		// var querystring = 'select `'+(select.join("`,`"))+'` from `'+$scope.table.tableName+'` where locale = "'+$scope.lang+'"'

		// Logger.log("Query: "+querystring)



		$scope.$table = angular.element("#table")
		$scope.table = Settings.architecture[$routeParams.table]
		$scope.newitem = {}
		$scope.originalData = {}
		$scope.attributes = {}
		$scope.attributesJson = function(){
			return angular.toJson($scope.attributes)
		}
		$scope.originalDataJson = function(){
			return angular.toJson($scope.originalData)
		}
		$scope.total = function(){
			return  Object.keys($scope.attributes).length
		}

		if(!Settings.architecture[$routeParams.table]){
			// Logger.error("Table does not exist!",table)
			$scope.notify("An error occured! [code: 001]")
			return
		}

		Api.getAll($routeParams.table,$scope.lang.locale).then(function(response){
			if(response.status != 200){
				Logger.log("Failed to fetch rows",response)
				$scope.notify("An error occured! [code: 002]")
				return
			}
			angular.forEach(response.data,function(row,i){
				$scope.attributes[row.id] = row
			})
			$scope.originalData = angular.copy($scope.attributes)
		})

		$scope.add = function(){
			$scope.$table.find("#addItem").addClass("active")
		}
		$scope.closeAdd = function(){
			$scope.$table.find("#addItem").removeClass("active")
		}

		$scope.delete = function(id){
			if(confirm("Are you sure you want to delete this item?"))
				Api.delete($routeParams.table,id).then(function(response){
					if(response.status != 200){
						$scope.notify("An error occured.")
						return
					}
					$scope.notify("Item deleted!");
					delete $scope.attributes[id]
				})
		}

		$scope.addNewItem = function(){
			var insert = angular.copy($scope.newitem)
			insert["locale"] = $scope.lang.locale
			Api.insert($routeParams.table,insert).then(function(response){
				if(response.status != 200){
					$scope.notify("Failed to update ["+id+"]")
					return
				}

				$scope.notify("1 item added!");
				$scope.attributes[response.data] = angular.extend({id:response.data},insert)
				$scope.closeAdd()
			})
		}

		$scope.save = function(){
			var modified = {}
			angular.forEach($scope.attributes,function(row){
				if(angular.toJson(row) != angular.toJson($scope.originalData[row.id])){
					modified[row.id] = angular.copy(row)
				}
			})
			var changes = Object.keys(modified).length
			if(changes == 0){
				$scope.notify("No changes made.")
				return
			}

			var queries = []
			var done = 0
			angular.forEach(modified,function(row,id){
				// var query = "update "+$scope.table.tableName+" set "
				// var fields = []
				// angular.forEach(row,function(val,name){
				// 	if(name != "id" && name.length > 0){
				// 		fields.push("`"+name+"` = \""+val+"\"")
				// 	}
				// })
				// query+=fields.join(",")
				// query+=" where id="+id
				// if(fields.length > 0) queries.push(query)

				Api.update($routeParams.table,id,row).then(function(response){
					done++
					if(response.status != 200){
						$scope.notify("Failed to update ["+id+"]")
						return
					}
					Logger.log(response.data)
					if(done == changes-1){
						$scope.notify(changes+" rows saved!");
					}
				})
			})
			// var mysqlCommand = queries.join(";\n")+";"
			// Logger.log(mysqlCommand)
		}
	});
})()