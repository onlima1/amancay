(function() {
	var app = angular.module('store-controller',[]);
	
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
			console.log(store.produtos);
			
			$http.get($rootScope.userUrl).then(function (response) {
				store.user = response.data;


				$http.get($rootScope.storeUrl).then(function (response) {
					store.pedidos = response.data.pedidos;
					// console.log(store.pedidos);

					$.each(store.pedidos,function(a,b){
						//console.log(a,b.products)
						$.each(b.products,function(c,d){
							//console.log(c,d.prodId)
							
							$.each(store.produtos.produtos,function(e,f){
								//console.log(e,f.id == d.prodId)
								if(f.id == d.prodId){
									d.prod = f;
									return;
								}
							});		

							console.log(d);
						});
					});

					//$rootScope.$emit('loadedtore');
				},function errorCallback(response) {
					console.log(response.data.message);
				});

			},function errorCallback(response) {
				console.log(response.data.message);
			});	

		},function errorCallback(response) {
			console.log(response.data.message);
		});



		$rootScope.$on("loadedtore", function(evt,args){
			//store.user = $rootScope.storeData.pedidos;
			console.log(store.pedidos)
		});
	
		$rootScope.$on("loadedUser", function(evt,args){
			console.log($rootScope.userData)
		});

		$rootScope.$on("loadedProdutos", function(evt,args){
			console.log($rootScope.prodList)
		});
	}]);

	app.directive("pedidosDescription", function() {
	    return {
	      restrict: 'E',
	      templateUrl: "views/pedidos-description.html"
	    };
	  });

})();