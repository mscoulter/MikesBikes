app.controller("ResultsController",
  function($scope, $rootScope, $window, $route, CartService, SearchService, AddToCartService){
    $scope.data = data;
    $scope.category = CartService.category;
    $scope.searchTerm = SearchService.search;
    $scope.add = function(item, quantity){
      if(quantity == undefined){
        quantity = 1
      };
      AddToCartService.addToCart(item, quantity);
      $rootScope.$broadcast('update');
    };
});

app.controller('CartController', function($scope, $rootScope, $route, AddToCartService){
  $scope.data = AddToCartService.cartItems;
  $scope.total = 0;
  for (var i = 0; i < $scope.data.length; i++) {
    var sub = $scope.data[i].quantity * $scope.data[i].price;
    $scope.total += sub;
  };
  $scope.remove = function(i){
    AddToCartService.removeFromCart(i);
    $rootScope.$broadcast('update');
    $route.reload()
  };
  $scope.edit = {};
  $scope.edit.showing = false;
  $scope.edit.toggle = function(){
    $scope.edit.showing = !$scope.edit.showing
  };
  $scope.edit.update = function(i, newQuantity){
    AddToCartService.update(i, newQuantity);
    $route.reload()
  }
});

app.controller("NavController",
  function($scope, $rootScope, $location, $route, CartService, SearchService, AddToCartService){
    $scope.categorySorter = "";
    $scope.changeCategory = function(category){
      CartService.cartSort(category);
      SearchService.searchBy("")
      $route.reload();
      $location.path('/');
    };
    $scope.categories = [];
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data[i].categories.length; j++) {
        if($scope.categories.indexOf(data[i].categories[j]) < 0){
          $scope.categories.push(data[i].categories[j])
        }
      }
    };
    $scope.form = {};
    $scope.submit = function(input){
      console.log("input = " + input);
      SearchService.searchBy(input);
      CartService.cartSort("")
      $route.reload();
      $location.path('/');
    };
    $scope.totalQ = AddToCartService.cartItems.length;
    $rootScope.$on('update', function (event) {
      console.log("updating");
     $scope.totalQ = AddToCartService.cartItems.length;
   });
})
