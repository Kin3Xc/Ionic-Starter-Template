// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'App' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('App', ['ionic', 'ngCordova', 'ngAnimate'])

//API
.constant('API', 'http://192.168.1.72/LeonAgencies/admin_qqruq/api') //dev
//app.constant('API_URL', 'http://qqruq.com/panel/api') //prod

.run(['$ionicPlatform',
      function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

  });
}])



.config(['$stateProvider',
         '$urlRouterProvider',
         '$ionicConfigProvider',
         '$compileProvider',
         function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $compileProvider) {

    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob|content|ms-appx|x-wmapp0):|data:image\/|img\//);
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|ghttps?|ms-appx|x-wmapp0):/);

    $ionicConfigProvider.scrolling.jsScrolling(ionic.Platform.isIOS());

    $stateProvider
				.state('app', {
						url: '/app',
						abstract: true,
						controller: 'AppController',
						templateUrl: 'templates/menu.html'
				})
        .state('tab', {
          url: '/tab',
          abstract: true,
          templateUrl: 'templates/tabs.html'
        })

				.state('app.screen', {
						url: "/screen",
						cache: false,
						views: {
								viewContent: {
										templateUrl: "templates/screen.html"
								}
						}
				})
        .state('app.results', {
            url: "/results",
            cache: false,
            views: {
                viewContent: {
                    templateUrl: "templates/results.html",
                    controller: 'ResultsController'
                }
            }
        })
				.state('app.map', {
            url: "/map",
            cache: false,
            views: {
                viewContent: {
                    templateUrl: "templates/map.html",
                    controller: 'MapController'
                }
            }
        })
        .state('app.no-results', {
            url: "/no-results",
            cache: false,
            views: {
                viewContent: {
                    templateUrl: "templates/no-results.html"
                }
            }
        })
        .state('app.filter', {
            url: "/filter",
            cache: false,
            views: {
                viewContent: {
                    templateUrl: "templates/filter.html"
                }
            }
        })
        .state('app.restaurant-details', {
            url: "/restaurant-details",
            cache: false,
            views: {
                viewContent: {
                    templateUrl: "templates/restaurant-details.html"
                }
            }
        })
        .state('app.coupons', {
            url: "/coupons",
            cache: false,
            views: {
                viewContent: {
                    templateUrl: "templates/coupons.html"
                }
            }
        })
        .state('app.redeem', {
            url: "/redeem",
            cache: false,
            views: {
                viewContent: {
                    templateUrl: "templates/redeem.html"
                }
            }
        })
        .state('app.add-restaurant', {
            url: "/add-restaurant",
            cache: false,
            views: {
                viewContent: {
                    templateUrl: "templates/add-restaurant.html"
                }
            }
        });




        // .state('app.item', {
        //     url: "/item/{title}",
        //     params: {
        //         color: null,
        //         icon: null
        //     },
        //     cache: false,
        //     views: {
        //         viewContent: {
        //             templateUrl: "templates/item.html",
        //             controller: 'ItemController'
        //         }
        //     }
        // });

    $urlRouterProvider.otherwise(function ($injector, $location) {
        var $state = $injector.get("$state");
        $state.go("app.add-restaurant");
    });
}]);
