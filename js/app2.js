(function(){
'use-strict';

angular.module('ShoppingListApp',[])
.controller('ShoppingListController',ShoppingListController)
.factory('ShoppingListFactory',ShoppingListFactory)
.directive('shoppingList',ShoppingListDirective);

function ShoppingListDirective () {
  console.log('ShoppingListDirective')
  var ddo = {
    templateUrl: 'shoppingList.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: ShoppingListDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function ShoppingListDirectiveController () {
  var list = this;
  console.log('ShoppingListDirectiveController')

  list.cookiesInList = function () {
    console.log(list);
    for (var i = 0; i < list.items.length; i++){
      var name = list.items[i].name;
      if (name.toLowerCase().indexOf("cookie") !== 1){
        return true;
      }
    }
  }
  return false;
}

ShoppingListController.$inject = ['ShoppingListFactory'];
function ShoppingListController (ShoppingListFactory) {
  console.log('ShoppingListController')
  var list = this;
  var shoppingList = ShoppingListFactory();

  list.items = shoppingList.getItems();
  list.name = "";
  list.quantity = "";


  list.addItem = function () {
    shoppingList.addItem(list.name, list.quantity);
  };

  list.removeItem = function (itemIndex) {
    shoppingList.removeItem(itemIndex);
  }

}

function ShoppingListService () {
  console.log('ShoppingListService')
  var service = this;

  var items = [];

  service.addItem = function(name, quantity) {
    var item = {
      name: name,
      quantity: quantity
    };
    console.log(item);
    items.push(item);
  };

  service.removeItem = function (itemIndex) {
    items.splice(itemIndex,1);
  };

  service.getItems = function () {
    return items;
  }

}

function ShoppingListFactory () {
  console.log('ShoppingListFactory')
  var factory = function () {
    return new ShoppingListService();
  };

  return factory;
}



})();
