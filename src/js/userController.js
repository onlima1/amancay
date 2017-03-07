(function() {
	var app = angular.module('user-controller',[]);
	
	app.controller("UserController", ['$scope','$rootScope', '$http',function($scope,$rootScope,$http){
		var user = this;
		$rootScope.$on("userData", function(){
			user.data = $rootScope.storeUser;
		});
	}]);
})();