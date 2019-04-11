/* global angular */

angular
    .module("ContactsApp")
    .controller("MainCtrl",["$scope","$http", function ($scope,$http){
        
                console.log("[Contacts APP] Main Controller initialized.");
                console.log("[Contacts App] Requesting Data to Contacts APP.");
                
                var URL = "/api/v1/contacts";
                
                $http.get(URL).then(function(res){
                    
                        console.log("[Contacts App] Data Received: " + JSON.stringify(res.data, null, 2));
                        $scope.contacts = res.data;
                        
                    }
                );
                
            }
        ]
    );