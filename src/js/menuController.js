(function() {
	var app = angular.module('menu-controller',[]);

	app.controller("MenuController", ['$scope','$rootScope',function($scope,$rootScope){
		this.tab = 1;
		$rootScope.$emit("changeTab",this.tab);
		this.setTab = function(val){
			this.tab = val;
			$rootScope.$emit("changeTab",val);
		}
	}]);

	app.controller("SectionController", ['$scope','$rootScope', '$http',function($scope,$rootScope,$http){
		var sec = this;
		$rootScope.$on("changeTab", function(evt,args){
			sec.tab = args;
		});
	}]);

	app.directive("menuTop", function() {
		return {
			restrict: 'E',
			templateUrl: "views/menu-top.html"
		};
	});

})();