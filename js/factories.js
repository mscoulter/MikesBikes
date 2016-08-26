app.factory('CartService', function () {
  return {
    category: "",
    cartSort: function (category) {
      this.category = category;
    }
  }
});

app.factory('SearchService', function () {
  return {
    search: "",
    searchBy: function (term) {
      this.search = term.search;
    }
  }
});

app.factory('AddToCartService', function(){
  return {
    cartItems: [],
    addToCart: function(item, quantity){
      item.quantity = quantity;
      this.cartItems.push(item);
    },
    removeFromCart: function(i){
      this.cartItems.splice(i, 1);
    },
    update: function(i, newQuantity){
      this.cartItems[i].quantity = newQuantity;
    }
  }
})
