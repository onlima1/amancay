(function() {
	var app = angular.module('menu-controller',[]);

	app.controller("MenuController", ['$scope','$rootScope',function($scope,$rootScope){
		this.tab = 1;
		this.setTab = function(val){
			this.tab = val;
			$rootScope.$emit("changeTab",val);
		}
	}]);

	app.controller("SectionController", ['$scope','$rootScope', '$http',function($scope,$rootScope,$http){
		
		$rootScope.storeUrl = 'data/storeData.json';
		$rootScope.userUrl = 'data/userData.json';
		$rootScope.produtosUrl = 'data/produtos.json';
		
		var sec = this;
		sec.tab = 1;	
		$rootScope.$on("changeTab", function(evt,args){
			sec.tab = args;
		});
		
	}]);


})();