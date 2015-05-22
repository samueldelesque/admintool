(function(){
	'use strict';

	angular.module('service.mysql', [
		'ngResource',
		'Domani.settings',
		'service.log'
	])

	.service('Mysql', function($q, Settings,Logger){
		var mysql = require('mysql');
		var connection = false;

		this.connect = function(params){
			connection = mysql.createConnection(params)
			var deferred = $q.defer();
			connection.connect(function(err) {
				if(err){
					deferred.reject("Query failed",err)
				}
				else{
					Settings.mysql.connected = true
					deferred.resolve(connection.threadId)
				}
				
			});
			return deferred.promise;
		}


		this.query = function(query){
			if(!connection) return false;
			var deferred = $q.defer();
			connection.query(query, function(err, data){
				if(err) deferred.reject("Query failed",err)
				else deferred.resolve(data)
			})
			return deferred.promise;
		}

		this.insert = function(table,obj){
			if(!connection) return false
			var deferred = $q.defer()
			connection.query("INSERT INTO "+table+" SET ?", obj, function(err, data) {
				if(err) deferred.reject("Insert Query failed",err)
				else deferred.resolve(data)
			});
			return deferred.promise;
		}

		this.delete = function(table,id){
			if(!connection) return false
			var deferred = $q.defer()
			connection.query("DELETE FROM "+table+" WHERE id = ?", id, function(err, data) {
				if(err) deferred.reject("Delete Query failed",err)
				else deferred.resolve(data)
			});
			return deferred.promise;
		}

		this.escape = function(str){
			return connection.escape(str)
		}
	});
})();