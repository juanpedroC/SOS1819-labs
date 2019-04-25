/* global angular */

    angular
        .module("ContactsApp")
        .controller("EditCtrl",
                        ["$scope",
                        "$http", 
                        "$routeParams",
                        "$location",
        function ($scope,$http,$routeParams,$location){
            console.log("Edit Controller initialized.");
            var API = "/api/v1/contacts";


            var name = $routeParams.name;
            
            console.log("Requesting contact <"+API+"/"+name+">...");
            
            $http.get(API+"/"+name).then(function (response){
                console.log("Data Received: "
                                + JSON.stringify(response.data,null,2));
    
                $scope.contact = response.data;
            });
            
            
            $scope.updateContact = function (name){
                
                console.log("Updating contact with name: "+name);
                $http
                    .put(API+"/"+name,$scope.contact)
                    .then(function (response){
                        console.log("PUT Response: " 
                                    + response.status + " "
                                    + response.data);
                        
                    }); 
                $location.path("/");
            }
            
        }]);    