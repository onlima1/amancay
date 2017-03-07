(function() {
	var app = angular.module('store-controller',['user-controller']);
	
	app.controller("StoreController", ['$scope','$rootScope', '$http',function($scope,$rootScope,$http){
		var store = this;

		store.produtos = "";
		store.pedidos = "";
		store.user = "";

		$rootScope.storeUrl = 'data/storeData.json';
		$rootScope.userUrl = 'data/userData.json';
		$rootScope.produtosUrl = 'data/produtos.json';

		$http.get($rootScope.produtosUrl).then(function (response) {
			store.produtos = response.data;
			
			$http.get($rootScope.userUrl).then(function (response) {
				store.user = response.data;

				$http.get($rootScope.storeUrl).then(function (response) {
					store.pedidos = response.data.pedidos;
					store.addresses = response.data.addresses;
					$.each(store.pedidos,function(a,b){
						
						$.each(b.products,function(c,d){
							$.each(store.produtos.produtos,function(e,f){
								if(f.id == d.prodId){
									d.prod = f;
									return;
								}
							});

							$.each(store.addresses,function(e,f){
								if(f.id == d.addressId){
									d.address = f;
									return;
								}
							});		
						});

					});

					$rootScope.storeUser = store.user;
					$rootScope.storePedidos = store.pedidos;
					$rootScope.storeAddresses = store.addresses;
					
					$scope.$emit("userData");

				},function errorCallback(response) {
					console.log(response.data.message);
				});
			},function errorCallback(response) {
				console.log(response.data.message);
			});	
		},function errorCallback(response) {
			console.log(response.data.message);
		});

		

	}]);

	app.directive("pedidosDescription", function() {
	    return {
	      restrict: 'E',
	      templateUrl: "views/pedidos-description.html"
	    };
	  });

	app.directive("pedidosLocals", function() {
	    return {
	      restrict: 'E',
	      templateUrl: "views/pedidos-locals.html"
	    };
	  });

	app.directive("userAccount", function() {
	    return {
	      restrict: 'E',
	      templateUrl: "views/user-account.html"
	    };
	  });

})();