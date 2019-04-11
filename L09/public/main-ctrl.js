/* global angular */

angular
    .module("ContactsApp")
    .controller("MainCtrl",["$scope","$http", function ($scope,$http){
        
                console.log("[Contacts APP] Main Controller initialized.");
                console.log("[Contacts App] Requesting Data to Contacts APP.");
                
                var URL = "/api/v1/contacts";
                refresh();
                
                function(refresh){
                    $http.get(URL).then(function(res){
                        console.log("[Contacts App] Data Received: " + JSON.stringify(res.data, null, 2));
                        $scope.contacts = res.data;
                    });
                }
                
              
                
                $http.get(URL).then(function(res){
                        console.log("[Contacts App] Data Received: " + JSON.stringify(res.data, null, 2));
                        $scope.contacts = res.data;
                        
                    }
                );
                
                $scope.addContacts = function(){
                    var newContact = $scope.newContact;
                    console.log("Adding a new contac: " + JSON.stringify(newContact));
                    $http
                        .post(URL, newContact)
                        .then(function (response){
                    
                    console.log("POST Response"
                                + response.status + " "
                                + response.data);
                    });
                }
                
                
                //DELETE
                $scope.deleteContact = function(){
                    var newContact = $scope.newContact;
                    console.log("Adding a new contac: " + JSON.stringify(newContact));
                    $http
                        .post(URL, newContact)
                        .then(function (response){
                    
                    console.log("POST Response"
                                + response.status + " "
                                + response.data);
                    });
                }
                
                
                
                
                
                
                
            }
        ]
    );