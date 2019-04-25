/* global angular */

    angular
        .module("ContactsApp")
        .controller("MainCtrl",["$scope","$http", function ($scope,$http){
            console.log("Main Controller initialized.");
            var API = "/api/v1/contacts";
            
            refresh();
            
            function refresh(){
                console.log("Requesting contacts to <"+API+">...");
                $http.get(API).then(function (response){
                    console.log("Data Received: "
                                    + JSON.stringify(response.data,null,2));
    
                    $scope.contacts = response.data;
                });
            }
            
            $scope.addContact = function (){
                var newContact = $scope.newContact;       
                console.log("Adding a new contact: "+JSON.stringify(newContact,null,2));
                
                $http
                    .post(API,newContact)
                    .then(function (response){
                       
                        console.log("POST Response: " 
                                    + response.status + " "
                                    + response.data);
                        
                        refresh();
                    }); 
            }
            
            $scope.deleteContact = function (name){

                console.log("Deleting contact with name: <"+name+">");
            
                $http
                    .delete(API+"/"+name)
                    .then(function (response){
                       
                        console.log("DELETE Response: " 
                                    + response.status + " "
                                    + response.data);
                        
                        refresh();
                    }); 
            }            
        }]);    