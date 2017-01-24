var myNinjaApp = angular.module('myNinjaApp',['ngRoute','ngAnimate']);

myNinjaApp.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider){
$locationProvider.html5Mode(true);

  $routeProvider
    .when('/home',{
      templateUrl:'views/home.html',
      controller:'NinjaController'
    })
    .when('/directory',{
      templateUrl:'views/directory.html',
      controller:'NinjaController'
    })
    .when('/contact-success',{
      templateUrl:'views/contact-success.html',
      controller:'ContactController'
    })
    .when('/contact',{
      templateUrl:'views/contact.html',
      controller:'ContactController'
    })
    .otherwise({
      redirectTo:'/home'
    });

}]);

myNinjaApp.directive('randomNinja',[function(){
return {
  restrict: 'E',
  scope: {
    ninjas: '=',
    title: '='
  },
  transclude:true,
  replace:true,
  templateUrl: 'views/random.html',
  controller: function($scope){
      $scope.random = Math.floor(Math.random() * 4);
  }
};
}]);

myNinjaApp.controller('ContactController',['$scope','$location',function($scope,$location){

$scope.sendMessage = function() {
  $location.path('/contact-success');
}

}])

myNinjaApp.controller('NinjaController',['$scope', '$http',function($scope, $http) {
$scope.message = "Hey Angular!";

$scope.removeNinja = function(ninja) {
  var removedNinja = $scope.ninjas.indexOf(ninja);
  $scope.ninjas.splice(removedNinja,1);
};

$scope.addNinja = function() {
  $scope.ninjas.push({
      name : $scope.newninja.name,
      belt : $scope.newninja.belt,
      rate : parseInt($scope.newninja.rate),
      available : true
  });
  $scope.newninja.name = '';
  $scope.newninja.belt = '';
  $scope.newninja.rate = '';
};
$scope.removeAllNinjas = function() {
  $scope.ninjas = [];
}

$http({
  method: 'GET',
  url: 'data/ninjas.json'
}).then(function successcallback(response){
  $scope.ninjas = response.data;
},function errorcallback(response){
  console.log("error msg "+response);
});


}]);
