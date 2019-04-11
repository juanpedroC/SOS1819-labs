
/* global angular */

    angular
        .module("ContactsApp")
        .controller("MainCtrl",["$scope","$http", function ($scope,$http){
            console.log("Main Controller initialized.");
        }]);