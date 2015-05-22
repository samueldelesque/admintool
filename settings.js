(function(){
	'use strict';

	angular.module('Domani.settings', ['ngResource'])

	.value('Settings', {
		mysql: {
			host     : 'localhost',
			user     : 'root',
			password : '',
			database : 'stregisjazz',
			connected: false
		},
		api: {
			app_name: "domani_app",
			app_key: "901u08y1h308dh0q83hd9q38hd379h9712h3",
			// url: "http://jazz.dev/api",
			url: "http://stregisjazz.dev.domanistudios.com/api",//stregisjazz:jazzhandsdev@
			username: "stregisjazz",
			password: "jazzhandsdev"
		}
		// architecture: {
		// 	properties: {
		// 		title: "Properties",
		// 		tableName: "properties_tr",
		// 		rows: {
		// 			id: {
		// 				title:"ID"
		// 			},
		// 			name: {
		// 				title:"Name"
		// 			},
		// 			city: {
		// 				title:"City"
		// 			},
		// 			phone: {
		// 				title:"Phone"
		// 			},
		// 			concierge_email: {
		// 				title:"Concierge Email"
		// 			}
		// 		}
		// 	},
		// 	countries: {
		// 		title: "Countries",
		// 		tableName: "countries_tr",
		// 		rows: {
		// 			id: {
		// 				title:"ID"
		// 			},
		// 			name: {
		// 				title:"Name"
		// 			},
		// 		}
		// 	},
		// 	performances: {
		// 		title: "Performances",
		// 		tableName: "performances",
		// 		rows: {
		// 			id: {
		// 				title:"ID"
		// 			},
		// 			title: {
		// 				title:"Title"
		// 			},
		// 			slug: {
		// 				title:"Slug"
		// 			},
		// 			date:{
		// 				title: "Date"
		// 			}
		// 		}
		// 	}
		// }
	})
})();