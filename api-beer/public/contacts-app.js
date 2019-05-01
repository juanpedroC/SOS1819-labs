/* global angular */

    angular
        .module("ContactsApp",["ngRoute"])
        .config( function ($routeProvider){
            $routeProvider
                .when("/",{
                   controller : "ListCtrl",
                   templateUrl: "list.html"
                })
                .when("/help",{
                   templateUrl: "help.html"
                })
                .when("/edit/:name",{
                   controller : "EditCtrl",
                   templateUrl: "edit.html"
                })
                ;
        });

    console.log("Contacts App Initialized.");