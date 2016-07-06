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
        })
        .state('app.photos', {
            url: "/photos",
            cache: false,
            views: {
                viewContent: {
                    templateUrl: "templates/photos.html"
                }
            }
        })
        .state('app.reviews', {
            url: "/reviews",
            cache: false,
            views: {
                viewContent: {
                    templateUrl: "templates/reviews.html"
                }
            }
        })
        .state('app.comment', {
            url: "/comment",
            cache: false,
            views: {
                viewContent: {
                    templateUrl: "templates/comment.html"
                }
            }
        })
        .state('app.signin', {
            url: "/signin",
            cache: false,
            views: {
                viewContent: {
                    templateUrl: "templates/signin.html"
                }
            }
        })
        .state('app.signin-mail', {
            url: "/signin-mail",
            cache: false,
            views: {
                viewContent: {
                    templateUrl: "templates/signin-mail.html"
                }
            }
        })
        .state('app.recovery-pass', {
            url: "/recovery-pass",
            cache: false,
            views: {
                viewContent: {
                    templateUrl: "templates/recovery-pass.html"
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
        $state.go("app.recovery-pass");
    });
}]);

/* global ionic */
(function (angular, ionic) {
	"use strict";

	ionic.Platform.isIE = function () {
		return ionic.Platform.ua.toLowerCase().indexOf('trident') > -1;
	}

	if (ionic.Platform.isIE()) {
		angular.module('ionic')
			.factory('$ionicNgClick', ['$parse', '$timeout', function ($parse, $timeout) {
				return function (scope, element, clickExpr) {
					var clickHandler = angular.isFunction(clickExpr) ? clickExpr : $parse(clickExpr);

					element.on('click', function (event) {
						scope.$apply(function () {
							if (scope.clicktimer) return; // Second call
							clickHandler(scope, { $event: (event) });
							scope.clicktimer = $timeout(function () { delete scope.clicktimer; }, 1, false);
						});
					});

					// Hack for iOS Safari's benefit. It goes searching for onclick handlers and is liable to click
					// something else nearby.
					element.onclick = function (event) { };
				};
			}]);
	}

	function SelectDirective() {
		'use strict';

		return {
			restrict: 'E',
			replace: false,
			link: function (scope, element) {
				if (ionic.Platform && (ionic.Platform.isWindowsPhone() || ionic.Platform.isIE() || ionic.Platform.platform() === "edge")) {
					element.attr('data-tap-disabled', 'true');
				}
			}
		};
	}

	angular.module('ionic')
    .directive('select', SelectDirective);

	/*angular.module('ionic-datepicker')
	.directive('select', SelectDirective);*/

})(angular, ionic);
(function () {
    'use strict';

    angular
        .module('App')
        .controller('AppController', AppController);

    AppController.$inject = ['$scope', '$ionicPopover'];
    function AppController($scope, $ionicPopover) {

        $scope.items = [
            {
                color: "#fff",
                icon: "ion-ionic",
                title: "Tienda"
            },
            {
                color: "#fff",
                icon: "ion-social-html5",
                title: "Productos"
            },
            {
                color: "#fff",
                icon: "ion-social-javascript",
                title: "Carrito"
            },
            {
                color: "#fff",
                icon: "ion-social-sass",
                title: "Mi perfil"
            },
            {
                color: "#fff",
                icon: "ion-social-css3",
                title: "Contacto"
            }
        ];

        $scope.exitApp = function () {
            ionic.Platform.exitApp();
        };

        $ionicPopover.fromTemplateUrl('templates/modals/popover.html', {
            scope: $scope
        }).then(function (popover) {
            $scope.popover = popover;
        });

        $scope.openPopover = function ($event) {
            $scope.popover.show($event);
        };

        $scope.$on('$destroy', function() {
            $scope.popover.remove();
        });
    }
})();

(function() {
'use strict';

    angular
        .module('App')
        .controller('MapController', MapController);

    MapController.$inject = ['$scope', '$state', 'Results','$cordovaGeolocation'];
    function MapController($scope, $state,Results,$cordovaGeolocation) {

      // var options = {timeout: 10000, enableHighAccuracy: true};
      //
      // $cordovaGeolocation.getCurrentPosition(options).then(function(position){
      //
      //   var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      //
      //   var mapOptions = {
      //     center: latLng,
      //     zoom: 15,
      //     mapTypeId: google.maps.MapTypeId.ROADMAP
      //   };
      //
      //   $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
      //
      // }, function(error){
      //   console.log(error);
      // });

      google.maps.event.addDomListener(window, 'load', function() {
        var myLatlng = new google.maps.LatLng(37.3000, -120.4833);

        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        navigator.geolocation.getCurrentPosition(function(pos) {
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: map,
                title: "My Location"
            });
        });

        $scope.map = map;
    });

    }
})();

(function() {
'use strict';

    angular
        .module('App')
        .controller('ResultsController', ResultsController);

    ResultsController.$inject = ['$scope', '$state', 'Results'];
    function ResultsController($scope, $state,Results) {

      //traigo los platos
      // Results.getResults().then(function(data){
      //   console.log(data);
      //   $scope.platos = data;
      // })
      // .catch(function(err){
      //   console.log(err);
      // })
    }
})();

(function () {
	'use strict';

	angular
		.module('App')
		.directive('holdList', holdList);

	holdList.$inject = ['$ionicGesture'];
	function holdList($ionicGesture) {

		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				$ionicGesture.on('hold', function (e) {

					var content = element[0].querySelector('.item-content');

					var buttons = element[0].querySelector('.item-options');
					var buttonsWidth = buttons.offsetWidth;

					ionic.requestAnimationFrame(function () {
						content.style[ionic.CSS.TRANSITION] = 'all ease-out .25s';

						if (!buttons.classList.contains('invisible')) {
							content.style[ionic.CSS.TRANSFORM] = '';
							setTimeout(function () {
								buttons.classList.add('invisible');
							}, 250);
						} else {
							buttons.classList.remove('invisible');
							content.style[ionic.CSS.TRANSFORM] = 'translate3d(-' + buttonsWidth + 'px, 0, 0)';
						}
					});


				}, element);
			}
		};
	}
})();
(function () {
	'use strict';

	angular
		.module('App')
		.directive('ionMultipleSelect', ionMultipleSelect);

	ionMultipleSelect.$inject = ['$ionicModal', '$ionicGesture'];
	function ionMultipleSelect($ionicModal, $ionicGesture) {

		return {
			restrict: 'E',
			scope: {
				options: "="
			},
			controller: function ($scope, $element, $attrs) {
				$scope.multipleSelect = {
					title: $attrs.title || "Select Options",
					tempOptions: [],
					keyProperty: $attrs.keyProperty || "id",
					valueProperty: $attrs.valueProperty || "value",
					selectedProperty: $attrs.selectedProperty || "selected",
					templateUrl: $attrs.templateUrl || 'templates/multipleSelect.html',
					renderCheckbox: $attrs.renderCheckbox ? $attrs.renderCheckbox == "true" : true,
					animation: $attrs.animation || 'slide-in-up'
				};

				$scope.OpenModalFromTemplate = function (templateUrl) {
					$ionicModal.fromTemplateUrl(templateUrl, {
						scope: $scope,
						animation: $scope.multipleSelect.animation
					}).then(function (modal) {
						$scope.modal = modal;
						$scope.modal.show();
					});
				};

				$ionicGesture.on('tap', function (e) {
					$scope.multipleSelect.tempOptions = $scope.options.map(function (option) {
						var tempOption = {};
						tempOption[$scope.multipleSelect.keyProperty] = option[$scope.multipleSelect.keyProperty];
						tempOption[$scope.multipleSelect.valueProperty] = option[$scope.multipleSelect.valueProperty];
						tempOption[$scope.multipleSelect.selectedProperty] = option[$scope.multipleSelect.selectedProperty];

						return tempOption;
					});
					$scope.OpenModalFromTemplate($scope.multipleSelect.templateUrl);
				}, $element);

				$scope.saveOptions = function () {
					for (var i = 0; i < $scope.multipleSelect.tempOptions.length; i++) {
						var tempOption = $scope.multipleSelect.tempOptions[i];
						for (var j = 0; j < $scope.options.length; j++) {
							var option = $scope.options[j];
							if (tempOption[$scope.multipleSelect.keyProperty] == option[$scope.multipleSelect.keyProperty]) {
								option[$scope.multipleSelect.selectedProperty] = tempOption[$scope.multipleSelect.selectedProperty];
								break;
							}
						}
					}
					$scope.closeModal();
				};

				$scope.closeModal = function () {
					$scope.modal.remove();
				};
				$scope.$on('$destroy', function () {
					if ($scope.modal) {
						$scope.modal.remove();
					}
				});
			}
		};
	}
})();
(function () {
	'use strict';

	angular
		.module('App')
		.directive('ionSearchSelect', ionSearchSelect);

	ionSearchSelect.$inject = ['$ionicModal', '$ionicGesture'];
	function ionSearchSelect($ionicModal, $ionicGesture) {

		return {
			restrict: 'E',
			scope: {
				options: "=",
				optionSelected: "="
			},
			controller: function ($scope, $element, $attrs) {
				$scope.searchSelect = {
					title: $attrs.title || "Search",
					keyProperty: $attrs.keyProperty,
					valueProperty: $attrs.valueProperty,
					templateUrl: $attrs.templateUrl || 'templates/searchSelect.html',
					animation: $attrs.animation || 'slide-in-up',
					option: null,
					searchvalue: "",
					enableSearch: $attrs.enableSearch ? $attrs.enableSearch == "true" : true
				};

				$ionicGesture.on('tap', function (e) {

					if (!!$scope.searchSelect.keyProperty && !!$scope.searchSelect.valueProperty) {
						if ($scope.optionSelected) {
							$scope.searchSelect.option = $scope.optionSelected[$scope.searchSelect.keyProperty];
						}
					}
					else {
						$scope.searchSelect.option = $scope.optionSelected;
					}
					$scope.OpenModalFromTemplate($scope.searchSelect.templateUrl);
				}, $element);

				$scope.saveOption = function () {
					if (!!$scope.searchSelect.keyProperty && !!$scope.searchSelect.valueProperty) {
						for (var i = 0; i < $scope.options.length; i++) {
							var currentOption = $scope.options[i];
							if (currentOption[$scope.searchSelect.keyProperty] == $scope.searchSelect.option) {
								$scope.optionSelected = currentOption;
								break;
							}
						}
					}
					else {
						$scope.optionSelected = $scope.searchSelect.option;
					}
					$scope.searchSelect.searchvalue = "";
					$scope.modal.remove();
				};

				$scope.clearSearch = function () {
					$scope.searchSelect.searchvalue = "";
				};

				$scope.closeModal = function () {
					$scope.modal.remove();
				};
				$scope.$on('$destroy', function () {
					if ($scope.modal) {
						$scope.modal.remove();
					}
				});

				$scope.OpenModalFromTemplate = function (templateUrl) {
					$ionicModal.fromTemplateUrl(templateUrl, {
						scope: $scope,
						animation: $scope.searchSelect.animation
					}).then(function (modal) {
						$scope.modal = modal;
						$scope.modal.show();
					});
				};
			}
		};
	}
})();
(function () {
	'use strict';

	angular
		.module('App')
		.factory('Modals', Modals);

	Modals.$inject = ['$ionicModal'];
	function Modals($ionicModal) {

		var modals = [];

		var _openModal = function ($scope, templateUrl, animation) {
			return $ionicModal.fromTemplateUrl(templateUrl, {
				scope: $scope,
				animation: animation || 'slide-in-up',
				backdropClickToClose: false
			}).then(function (modal) {
				modals.push(modal);
				modal.show();
			});
		};

		var _closeModal = function () {
			var currentModal = modals.splice(-1, 1)[0];
			currentModal.remove();
		};

		var _closeAllModals = function () {
			modals.map(function (modal) {
				modal.remove();
			});
			modals = [];
		};

		return {
			openModal: _openModal,
			closeModal: _closeModal,
			closeAllModals: _closeAllModals
		};
	}
})();
(function () {
	'use strict';

	angular
		.module('App')
		.factory('Model', Model);

	Model.$inject = ['Users'];
	function Model(Users) {

		return {
			Users: Users
		};
	}
})();
(function () {
	'use strict';

	angular
		.module('App')
		.factory('Results', Results);

	Results.$inject = ['$http', '$q','API'];
	function Results($http,$q, API) {

    return {
      getResults:function(){
        var defered = $q.defer();
        var promise = defered.promise;

        $http.get(API+'/get_producto_id/'+'4')
    		.success(function(data){
    			defered.resolve(data);
    		})
    		.error(function(err){
    			defered.reject(err)
    		});

    		return promise;
      }
    };

	}
})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImlzc3Vlcy5qcyIsImNvbnRyb2xsZXJzL2FwcC5qcyIsImNvbnRyb2xsZXJzL21hcC5qcyIsImNvbnRyb2xsZXJzL3Jlc3VsdHMuanMiLCJkaXJlY3RpdmVzL2hvbGRMaXN0LmpzIiwiZGlyZWN0aXZlcy9tdWx0aXBsZVNlbGVjdC5qcyIsImRpcmVjdGl2ZXMvc2VhcmNoU2VsZWN0LmpzIiwic2VydmljZXMvbW9kYWxzLmpzIiwic2VydmljZXMvbW9kZWwuanMiLCJzZXJ2aWNlcy9yZXN1bHRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIElvbmljIFN0YXJ0ZXIgQXBwXG5cbi8vIGFuZ3VsYXIubW9kdWxlIGlzIGEgZ2xvYmFsIHBsYWNlIGZvciBjcmVhdGluZywgcmVnaXN0ZXJpbmcgYW5kIHJldHJpZXZpbmcgQW5ndWxhciBtb2R1bGVzXG4vLyAnQXBwJyBpcyB0aGUgbmFtZSBvZiB0aGlzIGFuZ3VsYXIgbW9kdWxlIGV4YW1wbGUgKGFsc28gc2V0IGluIGEgPGJvZHk+IGF0dHJpYnV0ZSBpbiBpbmRleC5odG1sKVxuLy8gdGhlIDJuZCBwYXJhbWV0ZXIgaXMgYW4gYXJyYXkgb2YgJ3JlcXVpcmVzJ1xuYW5ndWxhci5tb2R1bGUoJ0FwcCcsIFsnaW9uaWMnLCAnbmdDb3Jkb3ZhJywgJ25nQW5pbWF0ZSddKVxuXG4vL0FQSVxuLmNvbnN0YW50KCdBUEknLCAnaHR0cDovLzE5Mi4xNjguMS43Mi9MZW9uQWdlbmNpZXMvYWRtaW5fcXFydXEvYXBpJykgLy9kZXZcbi8vYXBwLmNvbnN0YW50KCdBUElfVVJMJywgJ2h0dHA6Ly9xcXJ1cS5jb20vcGFuZWwvYXBpJykgLy9wcm9kXG5cbi5ydW4oWyckaW9uaWNQbGF0Zm9ybScsXG4gICAgICBmdW5jdGlvbigkaW9uaWNQbGF0Zm9ybSkge1xuICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICBpZih3aW5kb3cuY29yZG92YSAmJiB3aW5kb3cuY29yZG92YS5wbHVnaW5zLktleWJvYXJkKSB7XG4gICAgICAvLyBIaWRlIHRoZSBhY2Nlc3NvcnkgYmFyIGJ5IGRlZmF1bHQgKHJlbW92ZSB0aGlzIHRvIHNob3cgdGhlIGFjY2Vzc29yeSBiYXIgYWJvdmUgdGhlIGtleWJvYXJkXG4gICAgICAvLyBmb3IgZm9ybSBpbnB1dHMpXG4gICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyKHRydWUpO1xuXG4gICAgICAvLyBEb24ndCByZW1vdmUgdGhpcyBsaW5lIHVubGVzcyB5b3Uga25vdyB3aGF0IHlvdSBhcmUgZG9pbmcuIEl0IHN0b3BzIHRoZSB2aWV3cG9ydFxuICAgICAgLy8gZnJvbSBzbmFwcGluZyB3aGVuIHRleHQgaW5wdXRzIGFyZSBmb2N1c2VkLiBJb25pYyBoYW5kbGVzIHRoaXMgaW50ZXJuYWxseSBmb3JcbiAgICAgIC8vIGEgbXVjaCBuaWNlciBrZXlib2FyZCBleHBlcmllbmNlLlxuICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmRpc2FibGVTY3JvbGwodHJ1ZSk7XG4gICAgfVxuICAgIGlmKHdpbmRvdy5TdGF0dXNCYXIpIHtcbiAgICAgIFN0YXR1c0Jhci5zdHlsZURlZmF1bHQoKTtcbiAgICB9XG5cbiAgfSk7XG59XSlcblxuXG5cbi5jb25maWcoWyckc3RhdGVQcm92aWRlcicsXG4gICAgICAgICAnJHVybFJvdXRlclByb3ZpZGVyJyxcbiAgICAgICAgICckaW9uaWNDb25maWdQcm92aWRlcicsXG4gICAgICAgICAnJGNvbXBpbGVQcm92aWRlcicsXG4gICAgICAgICBmdW5jdGlvbiAoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlciwgJGlvbmljQ29uZmlnUHJvdmlkZXIsICRjb21waWxlUHJvdmlkZXIpIHtcblxuICAgICRjb21waWxlUHJvdmlkZXIuaW1nU3JjU2FuaXRpemF0aW9uV2hpdGVsaXN0KC9eXFxzKihodHRwcz98ZnRwfGZpbGV8YmxvYnxjb250ZW50fG1zLWFwcHh8eC13bWFwcDApOnxkYXRhOmltYWdlXFwvfGltZ1xcLy8pO1xuICAgICRjb21waWxlUHJvdmlkZXIuYUhyZWZTYW5pdGl6YXRpb25XaGl0ZWxpc3QoL15cXHMqKGh0dHBzP3xmdHB8bWFpbHRvfGZpbGV8Z2h0dHBzP3xtcy1hcHB4fHgtd21hcHAwKTovKTtcblxuICAgICRpb25pY0NvbmZpZ1Byb3ZpZGVyLnNjcm9sbGluZy5qc1Njcm9sbGluZyhpb25pYy5QbGF0Zm9ybS5pc0lPUygpKTtcblxuICAgICRzdGF0ZVByb3ZpZGVyXG5cdFx0XHRcdC5zdGF0ZSgnYXBwJywge1xuXHRcdFx0XHRcdFx0dXJsOiAnL2FwcCcsXG5cdFx0XHRcdFx0XHRhYnN0cmFjdDogdHJ1ZSxcblx0XHRcdFx0XHRcdGNvbnRyb2xsZXI6ICdBcHBDb250cm9sbGVyJyxcblx0XHRcdFx0XHRcdHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL21lbnUuaHRtbCdcblx0XHRcdFx0fSlcbiAgICAgICAgLnN0YXRlKCd0YWInLCB7XG4gICAgICAgICAgdXJsOiAnL3RhYicsXG4gICAgICAgICAgYWJzdHJhY3Q6IHRydWUsXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvdGFicy5odG1sJ1xuICAgICAgICB9KVxuXG5cdFx0XHRcdC5zdGF0ZSgnYXBwLnNjcmVlbicsIHtcblx0XHRcdFx0XHRcdHVybDogXCIvc2NyZWVuXCIsXG5cdFx0XHRcdFx0XHRjYWNoZTogZmFsc2UsXG5cdFx0XHRcdFx0XHR2aWV3czoge1xuXHRcdFx0XHRcdFx0XHRcdHZpZXdDb250ZW50OiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRlbXBsYXRlVXJsOiBcInRlbXBsYXRlcy9zY3JlZW4uaHRtbFwiXG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuICAgICAgICAuc3RhdGUoJ2FwcC5yZXN1bHRzJywge1xuICAgICAgICAgICAgdXJsOiBcIi9yZXN1bHRzXCIsXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgIHZpZXdDb250ZW50OiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcInRlbXBsYXRlcy9yZXN1bHRzLmh0bWxcIixcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ1Jlc3VsdHNDb250cm9sbGVyJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblx0XHRcdFx0LnN0YXRlKCdhcHAubWFwJywge1xuICAgICAgICAgICAgdXJsOiBcIi9tYXBcIixcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgdmlld0NvbnRlbnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwidGVtcGxhdGVzL21hcC5odG1sXCIsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdNYXBDb250cm9sbGVyJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnN0YXRlKCdhcHAubm8tcmVzdWx0cycsIHtcbiAgICAgICAgICAgIHVybDogXCIvbm8tcmVzdWx0c1wiLFxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICB2aWV3Q29udGVudDoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJ0ZW1wbGF0ZXMvbm8tcmVzdWx0cy5odG1sXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5zdGF0ZSgnYXBwLmZpbHRlcicsIHtcbiAgICAgICAgICAgIHVybDogXCIvZmlsdGVyXCIsXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgIHZpZXdDb250ZW50OiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcInRlbXBsYXRlcy9maWx0ZXIuaHRtbFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuc3RhdGUoJ2FwcC5yZXN0YXVyYW50LWRldGFpbHMnLCB7XG4gICAgICAgICAgICB1cmw6IFwiL3Jlc3RhdXJhbnQtZGV0YWlsc1wiLFxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICB2aWV3Q29udGVudDoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJ0ZW1wbGF0ZXMvcmVzdGF1cmFudC1kZXRhaWxzLmh0bWxcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnN0YXRlKCdhcHAuY291cG9ucycsIHtcbiAgICAgICAgICAgIHVybDogXCIvY291cG9uc1wiLFxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICB2aWV3Q29udGVudDoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJ0ZW1wbGF0ZXMvY291cG9ucy5odG1sXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5zdGF0ZSgnYXBwLnJlZGVlbScsIHtcbiAgICAgICAgICAgIHVybDogXCIvcmVkZWVtXCIsXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgIHZpZXdDb250ZW50OiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcInRlbXBsYXRlcy9yZWRlZW0uaHRtbFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuc3RhdGUoJ2FwcC5hZGQtcmVzdGF1cmFudCcsIHtcbiAgICAgICAgICAgIHVybDogXCIvYWRkLXJlc3RhdXJhbnRcIixcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgdmlld0NvbnRlbnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwidGVtcGxhdGVzL2FkZC1yZXN0YXVyYW50Lmh0bWxcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnN0YXRlKCdhcHAucGhvdG9zJywge1xuICAgICAgICAgICAgdXJsOiBcIi9waG90b3NcIixcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgdmlld0NvbnRlbnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwidGVtcGxhdGVzL3Bob3Rvcy5odG1sXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5zdGF0ZSgnYXBwLnJldmlld3MnLCB7XG4gICAgICAgICAgICB1cmw6IFwiL3Jldmlld3NcIixcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgdmlld0NvbnRlbnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwidGVtcGxhdGVzL3Jldmlld3MuaHRtbFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuc3RhdGUoJ2FwcC5jb21tZW50Jywge1xuICAgICAgICAgICAgdXJsOiBcIi9jb21tZW50XCIsXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgIHZpZXdDb250ZW50OiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcInRlbXBsYXRlcy9jb21tZW50Lmh0bWxcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnN0YXRlKCdhcHAuc2lnbmluJywge1xuICAgICAgICAgICAgdXJsOiBcIi9zaWduaW5cIixcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgdmlld0NvbnRlbnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwidGVtcGxhdGVzL3NpZ25pbi5odG1sXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5zdGF0ZSgnYXBwLnNpZ25pbi1tYWlsJywge1xuICAgICAgICAgICAgdXJsOiBcIi9zaWduaW4tbWFpbFwiLFxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICB2aWV3Q29udGVudDoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJ0ZW1wbGF0ZXMvc2lnbmluLW1haWwuaHRtbFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuc3RhdGUoJ2FwcC5yZWNvdmVyeS1wYXNzJywge1xuICAgICAgICAgICAgdXJsOiBcIi9yZWNvdmVyeS1wYXNzXCIsXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgIHZpZXdDb250ZW50OiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcInRlbXBsYXRlcy9yZWNvdmVyeS1wYXNzLmh0bWxcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cblxuXG5cbiAgICAgICAgLy8gLnN0YXRlKCdhcHAuaXRlbScsIHtcbiAgICAgICAgLy8gICAgIHVybDogXCIvaXRlbS97dGl0bGV9XCIsXG4gICAgICAgIC8vICAgICBwYXJhbXM6IHtcbiAgICAgICAgLy8gICAgICAgICBjb2xvcjogbnVsbCxcbiAgICAgICAgLy8gICAgICAgICBpY29uOiBudWxsXG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICAvLyAgICAgdmlld3M6IHtcbiAgICAgICAgLy8gICAgICAgICB2aWV3Q29udGVudDoge1xuICAgICAgICAvLyAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJ0ZW1wbGF0ZXMvaXRlbS5odG1sXCIsXG4gICAgICAgIC8vICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdJdGVtQ29udHJvbGxlcidcbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0pO1xuXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZShmdW5jdGlvbiAoJGluamVjdG9yLCAkbG9jYXRpb24pIHtcbiAgICAgICAgdmFyICRzdGF0ZSA9ICRpbmplY3Rvci5nZXQoXCIkc3RhdGVcIik7XG4gICAgICAgICRzdGF0ZS5nbyhcImFwcC5yZWNvdmVyeS1wYXNzXCIpO1xuICAgIH0pO1xufV0pO1xuIiwiLyogZ2xvYmFsIGlvbmljICovXG4oZnVuY3Rpb24gKGFuZ3VsYXIsIGlvbmljKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGlvbmljLlBsYXRmb3JtLmlzSUUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIGlvbmljLlBsYXRmb3JtLnVhLnRvTG93ZXJDYXNlKCkuaW5kZXhPZigndHJpZGVudCcpID4gLTE7XG5cdH1cblxuXHRpZiAoaW9uaWMuUGxhdGZvcm0uaXNJRSgpKSB7XG5cdFx0YW5ndWxhci5tb2R1bGUoJ2lvbmljJylcblx0XHRcdC5mYWN0b3J5KCckaW9uaWNOZ0NsaWNrJywgWyckcGFyc2UnLCAnJHRpbWVvdXQnLCBmdW5jdGlvbiAoJHBhcnNlLCAkdGltZW91dCkge1xuXHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBjbGlja0V4cHIpIHtcblx0XHRcdFx0XHR2YXIgY2xpY2tIYW5kbGVyID0gYW5ndWxhci5pc0Z1bmN0aW9uKGNsaWNrRXhwcikgPyBjbGlja0V4cHIgOiAkcGFyc2UoY2xpY2tFeHByKTtcblxuXHRcdFx0XHRcdGVsZW1lbnQub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdFx0XHRzY29wZS4kYXBwbHkoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0XHRpZiAoc2NvcGUuY2xpY2t0aW1lcikgcmV0dXJuOyAvLyBTZWNvbmQgY2FsbFxuXHRcdFx0XHRcdFx0XHRjbGlja0hhbmRsZXIoc2NvcGUsIHsgJGV2ZW50OiAoZXZlbnQpIH0pO1xuXHRcdFx0XHRcdFx0XHRzY29wZS5jbGlja3RpbWVyID0gJHRpbWVvdXQoZnVuY3Rpb24gKCkgeyBkZWxldGUgc2NvcGUuY2xpY2t0aW1lcjsgfSwgMSwgZmFsc2UpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHQvLyBIYWNrIGZvciBpT1MgU2FmYXJpJ3MgYmVuZWZpdC4gSXQgZ29lcyBzZWFyY2hpbmcgZm9yIG9uY2xpY2sgaGFuZGxlcnMgYW5kIGlzIGxpYWJsZSB0byBjbGlja1xuXHRcdFx0XHRcdC8vIHNvbWV0aGluZyBlbHNlIG5lYXJieS5cblx0XHRcdFx0XHRlbGVtZW50Lm9uY2xpY2sgPSBmdW5jdGlvbiAoZXZlbnQpIHsgfTtcblx0XHRcdFx0fTtcblx0XHRcdH1dKTtcblx0fVxuXG5cdGZ1bmN0aW9uIFNlbGVjdERpcmVjdGl2ZSgpIHtcblx0XHQndXNlIHN0cmljdCc7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0cmVzdHJpY3Q6ICdFJyxcblx0XHRcdHJlcGxhY2U6IGZhbHNlLFxuXHRcdFx0bGluazogZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50KSB7XG5cdFx0XHRcdGlmIChpb25pYy5QbGF0Zm9ybSAmJiAoaW9uaWMuUGxhdGZvcm0uaXNXaW5kb3dzUGhvbmUoKSB8fCBpb25pYy5QbGF0Zm9ybS5pc0lFKCkgfHwgaW9uaWMuUGxhdGZvcm0ucGxhdGZvcm0oKSA9PT0gXCJlZGdlXCIpKSB7XG5cdFx0XHRcdFx0ZWxlbWVudC5hdHRyKCdkYXRhLXRhcC1kaXNhYmxlZCcsICd0cnVlJyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXHR9XG5cblx0YW5ndWxhci5tb2R1bGUoJ2lvbmljJylcbiAgICAuZGlyZWN0aXZlKCdzZWxlY3QnLCBTZWxlY3REaXJlY3RpdmUpO1xuXG5cdC8qYW5ndWxhci5tb2R1bGUoJ2lvbmljLWRhdGVwaWNrZXInKVxuXHQuZGlyZWN0aXZlKCdzZWxlY3QnLCBTZWxlY3REaXJlY3RpdmUpOyovXG5cbn0pKGFuZ3VsYXIsIGlvbmljKTsiLCIoZnVuY3Rpb24gKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnQXBwJylcbiAgICAgICAgLmNvbnRyb2xsZXIoJ0FwcENvbnRyb2xsZXInLCBBcHBDb250cm9sbGVyKTtcblxuICAgIEFwcENvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRpb25pY1BvcG92ZXInXTtcbiAgICBmdW5jdGlvbiBBcHBDb250cm9sbGVyKCRzY29wZSwgJGlvbmljUG9wb3Zlcikge1xuXG4gICAgICAgICRzY29wZS5pdGVtcyA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb2xvcjogXCIjZmZmXCIsXG4gICAgICAgICAgICAgICAgaWNvbjogXCJpb24taW9uaWNcIixcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJUaWVuZGFcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb2xvcjogXCIjZmZmXCIsXG4gICAgICAgICAgICAgICAgaWNvbjogXCJpb24tc29jaWFsLWh0bWw1XCIsXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiUHJvZHVjdG9zXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY29sb3I6IFwiI2ZmZlwiLFxuICAgICAgICAgICAgICAgIGljb246IFwiaW9uLXNvY2lhbC1qYXZhc2NyaXB0XCIsXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiQ2Fycml0b1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNvbG9yOiBcIiNmZmZcIixcbiAgICAgICAgICAgICAgICBpY29uOiBcImlvbi1zb2NpYWwtc2Fzc1wiLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIk1pIHBlcmZpbFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNvbG9yOiBcIiNmZmZcIixcbiAgICAgICAgICAgICAgICBpY29uOiBcImlvbi1zb2NpYWwtY3NzM1wiLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIkNvbnRhY3RvXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXTtcblxuICAgICAgICAkc2NvcGUuZXhpdEFwcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlvbmljLlBsYXRmb3JtLmV4aXRBcHAoKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkaW9uaWNQb3BvdmVyLmZyb21UZW1wbGF0ZVVybCgndGVtcGxhdGVzL21vZGFscy9wb3BvdmVyLmh0bWwnLCB7XG4gICAgICAgICAgICBzY29wZTogJHNjb3BlXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHBvcG92ZXIpIHtcbiAgICAgICAgICAgICRzY29wZS5wb3BvdmVyID0gcG9wb3ZlcjtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLm9wZW5Qb3BvdmVyID0gZnVuY3Rpb24gKCRldmVudCkge1xuICAgICAgICAgICAgJHNjb3BlLnBvcG92ZXIuc2hvdygkZXZlbnQpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkc2NvcGUucG9wb3Zlci5yZW1vdmUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbid1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnQXBwJylcbiAgICAgICAgLmNvbnRyb2xsZXIoJ01hcENvbnRyb2xsZXInLCBNYXBDb250cm9sbGVyKTtcblxuICAgIE1hcENvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRzdGF0ZScsICdSZXN1bHRzJywnJGNvcmRvdmFHZW9sb2NhdGlvbiddO1xuICAgIGZ1bmN0aW9uIE1hcENvbnRyb2xsZXIoJHNjb3BlLCAkc3RhdGUsUmVzdWx0cywkY29yZG92YUdlb2xvY2F0aW9uKSB7XG5cbiAgICAgIC8vIHZhciBvcHRpb25zID0ge3RpbWVvdXQ6IDEwMDAwLCBlbmFibGVIaWdoQWNjdXJhY3k6IHRydWV9O1xuICAgICAgLy9cbiAgICAgIC8vICRjb3Jkb3ZhR2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKG9wdGlvbnMpLnRoZW4oZnVuY3Rpb24ocG9zaXRpb24pe1xuICAgICAgLy9cbiAgICAgIC8vICAgdmFyIGxhdExuZyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcocG9zaXRpb24uY29vcmRzLmxhdGl0dWRlLCBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlKTtcbiAgICAgIC8vXG4gICAgICAvLyAgIHZhciBtYXBPcHRpb25zID0ge1xuICAgICAgLy8gICAgIGNlbnRlcjogbGF0TG5nLFxuICAgICAgLy8gICAgIHpvb206IDE1LFxuICAgICAgLy8gICAgIG1hcFR5cGVJZDogZ29vZ2xlLm1hcHMuTWFwVHlwZUlkLlJPQURNQVBcbiAgICAgIC8vICAgfTtcbiAgICAgIC8vXG4gICAgICAvLyAgICRzY29wZS5tYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFwXCIpLCBtYXBPcHRpb25zKTtcbiAgICAgIC8vXG4gICAgICAvLyB9LCBmdW5jdGlvbihlcnJvcil7XG4gICAgICAvLyAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIC8vIH0pO1xuXG4gICAgICBnb29nbGUubWFwcy5ldmVudC5hZGREb21MaXN0ZW5lcih3aW5kb3csICdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBteUxhdGxuZyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoMzcuMzAwMCwgLTEyMC40ODMzKTtcblxuICAgICAgICB2YXIgbWFwT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGNlbnRlcjogbXlMYXRsbmcsXG4gICAgICAgICAgICB6b29tOiAxNixcbiAgICAgICAgICAgIG1hcFR5cGVJZDogZ29vZ2xlLm1hcHMuTWFwVHlwZUlkLlJPQURNQVBcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1hcFwiKSwgbWFwT3B0aW9ucyk7XG5cbiAgICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihmdW5jdGlvbihwb3MpIHtcbiAgICAgICAgICAgIG1hcC5zZXRDZW50ZXIobmV3IGdvb2dsZS5tYXBzLkxhdExuZyhwb3MuY29vcmRzLmxhdGl0dWRlLCBwb3MuY29vcmRzLmxvbmdpdHVkZSkpO1xuICAgICAgICAgICAgdmFyIG15TG9jYXRpb24gPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhwb3MuY29vcmRzLmxhdGl0dWRlLCBwb3MuY29vcmRzLmxvbmdpdHVkZSksXG4gICAgICAgICAgICAgICAgbWFwOiBtYXAsXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiTXkgTG9jYXRpb25cIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5tYXAgPSBtYXA7XG4gICAgfSk7XG5cbiAgICB9XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdBcHAnKVxuICAgICAgICAuY29udHJvbGxlcignUmVzdWx0c0NvbnRyb2xsZXInLCBSZXN1bHRzQ29udHJvbGxlcik7XG5cbiAgICBSZXN1bHRzQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJHN0YXRlJywgJ1Jlc3VsdHMnXTtcbiAgICBmdW5jdGlvbiBSZXN1bHRzQ29udHJvbGxlcigkc2NvcGUsICRzdGF0ZSxSZXN1bHRzKSB7XG5cbiAgICAgIC8vdHJhaWdvIGxvcyBwbGF0b3NcbiAgICAgIC8vIFJlc3VsdHMuZ2V0UmVzdWx0cygpLnRoZW4oZnVuY3Rpb24oZGF0YSl7XG4gICAgICAvLyAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgLy8gICAkc2NvcGUucGxhdG9zID0gZGF0YTtcbiAgICAgIC8vIH0pXG4gICAgICAvLyAuY2F0Y2goZnVuY3Rpb24oZXJyKXtcbiAgICAgIC8vICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIC8vIH0pXG4gICAgfVxufSkoKTtcbiIsIihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyXG5cdFx0Lm1vZHVsZSgnQXBwJylcblx0XHQuZGlyZWN0aXZlKCdob2xkTGlzdCcsIGhvbGRMaXN0KTtcblxuXHRob2xkTGlzdC4kaW5qZWN0ID0gWyckaW9uaWNHZXN0dXJlJ107XG5cdGZ1bmN0aW9uIGhvbGRMaXN0KCRpb25pY0dlc3R1cmUpIHtcblxuXHRcdHJldHVybiB7XG5cdFx0XHRyZXN0cmljdDogJ0EnLFxuXHRcdFx0bGluazogZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuXHRcdFx0XHQkaW9uaWNHZXN0dXJlLm9uKCdob2xkJywgZnVuY3Rpb24gKGUpIHtcblxuXHRcdFx0XHRcdHZhciBjb250ZW50ID0gZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcuaXRlbS1jb250ZW50Jyk7XG5cblx0XHRcdFx0XHR2YXIgYnV0dG9ucyA9IGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLml0ZW0tb3B0aW9ucycpO1xuXHRcdFx0XHRcdHZhciBidXR0b25zV2lkdGggPSBidXR0b25zLm9mZnNldFdpZHRoO1xuXG5cdFx0XHRcdFx0aW9uaWMucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdGNvbnRlbnQuc3R5bGVbaW9uaWMuQ1NTLlRSQU5TSVRJT05dID0gJ2FsbCBlYXNlLW91dCAuMjVzJztcblxuXHRcdFx0XHRcdFx0aWYgKCFidXR0b25zLmNsYXNzTGlzdC5jb250YWlucygnaW52aXNpYmxlJykpIHtcblx0XHRcdFx0XHRcdFx0Y29udGVudC5zdHlsZVtpb25pYy5DU1MuVFJBTlNGT1JNXSA9ICcnO1xuXHRcdFx0XHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdFx0XHRidXR0b25zLmNsYXNzTGlzdC5hZGQoJ2ludmlzaWJsZScpO1xuXHRcdFx0XHRcdFx0XHR9LCAyNTApO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0YnV0dG9ucy5jbGFzc0xpc3QucmVtb3ZlKCdpbnZpc2libGUnKTtcblx0XHRcdFx0XHRcdFx0Y29udGVudC5zdHlsZVtpb25pYy5DU1MuVFJBTlNGT1JNXSA9ICd0cmFuc2xhdGUzZCgtJyArIGJ1dHRvbnNXaWR0aCArICdweCwgMCwgMCknO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXG5cblx0XHRcdFx0fSwgZWxlbWVudCk7XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhclxuXHRcdC5tb2R1bGUoJ0FwcCcpXG5cdFx0LmRpcmVjdGl2ZSgnaW9uTXVsdGlwbGVTZWxlY3QnLCBpb25NdWx0aXBsZVNlbGVjdCk7XG5cblx0aW9uTXVsdGlwbGVTZWxlY3QuJGluamVjdCA9IFsnJGlvbmljTW9kYWwnLCAnJGlvbmljR2VzdHVyZSddO1xuXHRmdW5jdGlvbiBpb25NdWx0aXBsZVNlbGVjdCgkaW9uaWNNb2RhbCwgJGlvbmljR2VzdHVyZSkge1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHJlc3RyaWN0OiAnRScsXG5cdFx0XHRzY29wZToge1xuXHRcdFx0XHRvcHRpb25zOiBcIj1cIlxuXHRcdFx0fSxcblx0XHRcdGNvbnRyb2xsZXI6IGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpIHtcblx0XHRcdFx0JHNjb3BlLm11bHRpcGxlU2VsZWN0ID0ge1xuXHRcdFx0XHRcdHRpdGxlOiAkYXR0cnMudGl0bGUgfHwgXCJTZWxlY3QgT3B0aW9uc1wiLFxuXHRcdFx0XHRcdHRlbXBPcHRpb25zOiBbXSxcblx0XHRcdFx0XHRrZXlQcm9wZXJ0eTogJGF0dHJzLmtleVByb3BlcnR5IHx8IFwiaWRcIixcblx0XHRcdFx0XHR2YWx1ZVByb3BlcnR5OiAkYXR0cnMudmFsdWVQcm9wZXJ0eSB8fCBcInZhbHVlXCIsXG5cdFx0XHRcdFx0c2VsZWN0ZWRQcm9wZXJ0eTogJGF0dHJzLnNlbGVjdGVkUHJvcGVydHkgfHwgXCJzZWxlY3RlZFwiLFxuXHRcdFx0XHRcdHRlbXBsYXRlVXJsOiAkYXR0cnMudGVtcGxhdGVVcmwgfHwgJ3RlbXBsYXRlcy9tdWx0aXBsZVNlbGVjdC5odG1sJyxcblx0XHRcdFx0XHRyZW5kZXJDaGVja2JveDogJGF0dHJzLnJlbmRlckNoZWNrYm94ID8gJGF0dHJzLnJlbmRlckNoZWNrYm94ID09IFwidHJ1ZVwiIDogdHJ1ZSxcblx0XHRcdFx0XHRhbmltYXRpb246ICRhdHRycy5hbmltYXRpb24gfHwgJ3NsaWRlLWluLXVwJ1xuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdCRzY29wZS5PcGVuTW9kYWxGcm9tVGVtcGxhdGUgPSBmdW5jdGlvbiAodGVtcGxhdGVVcmwpIHtcblx0XHRcdFx0XHQkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwodGVtcGxhdGVVcmwsIHtcblx0XHRcdFx0XHRcdHNjb3BlOiAkc2NvcGUsXG5cdFx0XHRcdFx0XHRhbmltYXRpb246ICRzY29wZS5tdWx0aXBsZVNlbGVjdC5hbmltYXRpb25cblx0XHRcdFx0XHR9KS50aGVuKGZ1bmN0aW9uIChtb2RhbCkge1xuXHRcdFx0XHRcdFx0JHNjb3BlLm1vZGFsID0gbW9kYWw7XG5cdFx0XHRcdFx0XHQkc2NvcGUubW9kYWwuc2hvdygpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdCRpb25pY0dlc3R1cmUub24oJ3RhcCcsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0JHNjb3BlLm11bHRpcGxlU2VsZWN0LnRlbXBPcHRpb25zID0gJHNjb3BlLm9wdGlvbnMubWFwKGZ1bmN0aW9uIChvcHRpb24pIHtcblx0XHRcdFx0XHRcdHZhciB0ZW1wT3B0aW9uID0ge307XG5cdFx0XHRcdFx0XHR0ZW1wT3B0aW9uWyRzY29wZS5tdWx0aXBsZVNlbGVjdC5rZXlQcm9wZXJ0eV0gPSBvcHRpb25bJHNjb3BlLm11bHRpcGxlU2VsZWN0LmtleVByb3BlcnR5XTtcblx0XHRcdFx0XHRcdHRlbXBPcHRpb25bJHNjb3BlLm11bHRpcGxlU2VsZWN0LnZhbHVlUHJvcGVydHldID0gb3B0aW9uWyRzY29wZS5tdWx0aXBsZVNlbGVjdC52YWx1ZVByb3BlcnR5XTtcblx0XHRcdFx0XHRcdHRlbXBPcHRpb25bJHNjb3BlLm11bHRpcGxlU2VsZWN0LnNlbGVjdGVkUHJvcGVydHldID0gb3B0aW9uWyRzY29wZS5tdWx0aXBsZVNlbGVjdC5zZWxlY3RlZFByb3BlcnR5XTtcblxuXHRcdFx0XHRcdFx0cmV0dXJuIHRlbXBPcHRpb247XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0JHNjb3BlLk9wZW5Nb2RhbEZyb21UZW1wbGF0ZSgkc2NvcGUubXVsdGlwbGVTZWxlY3QudGVtcGxhdGVVcmwpO1xuXHRcdFx0XHR9LCAkZWxlbWVudCk7XG5cblx0XHRcdFx0JHNjb3BlLnNhdmVPcHRpb25zID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgJHNjb3BlLm11bHRpcGxlU2VsZWN0LnRlbXBPcHRpb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHR2YXIgdGVtcE9wdGlvbiA9ICRzY29wZS5tdWx0aXBsZVNlbGVjdC50ZW1wT3B0aW9uc1tpXTtcblx0XHRcdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgJHNjb3BlLm9wdGlvbnMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0XHRcdFx0dmFyIG9wdGlvbiA9ICRzY29wZS5vcHRpb25zW2pdO1xuXHRcdFx0XHRcdFx0XHRpZiAodGVtcE9wdGlvblskc2NvcGUubXVsdGlwbGVTZWxlY3Qua2V5UHJvcGVydHldID09IG9wdGlvblskc2NvcGUubXVsdGlwbGVTZWxlY3Qua2V5UHJvcGVydHldKSB7XG5cdFx0XHRcdFx0XHRcdFx0b3B0aW9uWyRzY29wZS5tdWx0aXBsZVNlbGVjdC5zZWxlY3RlZFByb3BlcnR5XSA9IHRlbXBPcHRpb25bJHNjb3BlLm11bHRpcGxlU2VsZWN0LnNlbGVjdGVkUHJvcGVydHldO1xuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdCRzY29wZS5jbG9zZU1vZGFsKCk7XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0JHNjb3BlLmNsb3NlTW9kYWwgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0JHNjb3BlLm1vZGFsLnJlbW92ZSgpO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHQkc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRpZiAoJHNjb3BlLm1vZGFsKSB7XG5cdFx0XHRcdFx0XHQkc2NvcGUubW9kYWwucmVtb3ZlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9O1xuXHR9XG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyXG5cdFx0Lm1vZHVsZSgnQXBwJylcblx0XHQuZGlyZWN0aXZlKCdpb25TZWFyY2hTZWxlY3QnLCBpb25TZWFyY2hTZWxlY3QpO1xuXG5cdGlvblNlYXJjaFNlbGVjdC4kaW5qZWN0ID0gWyckaW9uaWNNb2RhbCcsICckaW9uaWNHZXN0dXJlJ107XG5cdGZ1bmN0aW9uIGlvblNlYXJjaFNlbGVjdCgkaW9uaWNNb2RhbCwgJGlvbmljR2VzdHVyZSkge1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHJlc3RyaWN0OiAnRScsXG5cdFx0XHRzY29wZToge1xuXHRcdFx0XHRvcHRpb25zOiBcIj1cIixcblx0XHRcdFx0b3B0aW9uU2VsZWN0ZWQ6IFwiPVwiXG5cdFx0XHR9LFxuXHRcdFx0Y29udHJvbGxlcjogZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykge1xuXHRcdFx0XHQkc2NvcGUuc2VhcmNoU2VsZWN0ID0ge1xuXHRcdFx0XHRcdHRpdGxlOiAkYXR0cnMudGl0bGUgfHwgXCJTZWFyY2hcIixcblx0XHRcdFx0XHRrZXlQcm9wZXJ0eTogJGF0dHJzLmtleVByb3BlcnR5LFxuXHRcdFx0XHRcdHZhbHVlUHJvcGVydHk6ICRhdHRycy52YWx1ZVByb3BlcnR5LFxuXHRcdFx0XHRcdHRlbXBsYXRlVXJsOiAkYXR0cnMudGVtcGxhdGVVcmwgfHwgJ3RlbXBsYXRlcy9zZWFyY2hTZWxlY3QuaHRtbCcsXG5cdFx0XHRcdFx0YW5pbWF0aW9uOiAkYXR0cnMuYW5pbWF0aW9uIHx8ICdzbGlkZS1pbi11cCcsXG5cdFx0XHRcdFx0b3B0aW9uOiBudWxsLFxuXHRcdFx0XHRcdHNlYXJjaHZhbHVlOiBcIlwiLFxuXHRcdFx0XHRcdGVuYWJsZVNlYXJjaDogJGF0dHJzLmVuYWJsZVNlYXJjaCA/ICRhdHRycy5lbmFibGVTZWFyY2ggPT0gXCJ0cnVlXCIgOiB0cnVlXG5cdFx0XHRcdH07XG5cblx0XHRcdFx0JGlvbmljR2VzdHVyZS5vbigndGFwJywgZnVuY3Rpb24gKGUpIHtcblxuXHRcdFx0XHRcdGlmICghISRzY29wZS5zZWFyY2hTZWxlY3Qua2V5UHJvcGVydHkgJiYgISEkc2NvcGUuc2VhcmNoU2VsZWN0LnZhbHVlUHJvcGVydHkpIHtcblx0XHRcdFx0XHRcdGlmICgkc2NvcGUub3B0aW9uU2VsZWN0ZWQpIHtcblx0XHRcdFx0XHRcdFx0JHNjb3BlLnNlYXJjaFNlbGVjdC5vcHRpb24gPSAkc2NvcGUub3B0aW9uU2VsZWN0ZWRbJHNjb3BlLnNlYXJjaFNlbGVjdC5rZXlQcm9wZXJ0eV07XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0JHNjb3BlLnNlYXJjaFNlbGVjdC5vcHRpb24gPSAkc2NvcGUub3B0aW9uU2VsZWN0ZWQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdCRzY29wZS5PcGVuTW9kYWxGcm9tVGVtcGxhdGUoJHNjb3BlLnNlYXJjaFNlbGVjdC50ZW1wbGF0ZVVybCk7XG5cdFx0XHRcdH0sICRlbGVtZW50KTtcblxuXHRcdFx0XHQkc2NvcGUuc2F2ZU9wdGlvbiA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRpZiAoISEkc2NvcGUuc2VhcmNoU2VsZWN0LmtleVByb3BlcnR5ICYmICEhJHNjb3BlLnNlYXJjaFNlbGVjdC52YWx1ZVByb3BlcnR5KSB7XG5cdFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8ICRzY29wZS5vcHRpb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdHZhciBjdXJyZW50T3B0aW9uID0gJHNjb3BlLm9wdGlvbnNbaV07XG5cdFx0XHRcdFx0XHRcdGlmIChjdXJyZW50T3B0aW9uWyRzY29wZS5zZWFyY2hTZWxlY3Qua2V5UHJvcGVydHldID09ICRzY29wZS5zZWFyY2hTZWxlY3Qub3B0aW9uKSB7XG5cdFx0XHRcdFx0XHRcdFx0JHNjb3BlLm9wdGlvblNlbGVjdGVkID0gY3VycmVudE9wdGlvbjtcblx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdCRzY29wZS5vcHRpb25TZWxlY3RlZCA9ICRzY29wZS5zZWFyY2hTZWxlY3Qub3B0aW9uO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQkc2NvcGUuc2VhcmNoU2VsZWN0LnNlYXJjaHZhbHVlID0gXCJcIjtcblx0XHRcdFx0XHQkc2NvcGUubW9kYWwucmVtb3ZlKCk7XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0JHNjb3BlLmNsZWFyU2VhcmNoID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdCRzY29wZS5zZWFyY2hTZWxlY3Quc2VhcmNodmFsdWUgPSBcIlwiO1xuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdCRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdCRzY29wZS5tb2RhbC5yZW1vdmUoKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0JHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0aWYgKCRzY29wZS5tb2RhbCkge1xuXHRcdFx0XHRcdFx0JHNjb3BlLm1vZGFsLnJlbW92ZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0JHNjb3BlLk9wZW5Nb2RhbEZyb21UZW1wbGF0ZSA9IGZ1bmN0aW9uICh0ZW1wbGF0ZVVybCkge1xuXHRcdFx0XHRcdCRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCh0ZW1wbGF0ZVVybCwge1xuXHRcdFx0XHRcdFx0c2NvcGU6ICRzY29wZSxcblx0XHRcdFx0XHRcdGFuaW1hdGlvbjogJHNjb3BlLnNlYXJjaFNlbGVjdC5hbmltYXRpb25cblx0XHRcdFx0XHR9KS50aGVuKGZ1bmN0aW9uIChtb2RhbCkge1xuXHRcdFx0XHRcdFx0JHNjb3BlLm1vZGFsID0gbW9kYWw7XG5cdFx0XHRcdFx0XHQkc2NvcGUubW9kYWwuc2hvdygpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdH07XG5cdH1cbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXJcblx0XHQubW9kdWxlKCdBcHAnKVxuXHRcdC5mYWN0b3J5KCdNb2RhbHMnLCBNb2RhbHMpO1xuXG5cdE1vZGFscy4kaW5qZWN0ID0gWyckaW9uaWNNb2RhbCddO1xuXHRmdW5jdGlvbiBNb2RhbHMoJGlvbmljTW9kYWwpIHtcblxuXHRcdHZhciBtb2RhbHMgPSBbXTtcblxuXHRcdHZhciBfb3Blbk1vZGFsID0gZnVuY3Rpb24gKCRzY29wZSwgdGVtcGxhdGVVcmwsIGFuaW1hdGlvbikge1xuXHRcdFx0cmV0dXJuICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCh0ZW1wbGF0ZVVybCwge1xuXHRcdFx0XHRzY29wZTogJHNjb3BlLFxuXHRcdFx0XHRhbmltYXRpb246IGFuaW1hdGlvbiB8fCAnc2xpZGUtaW4tdXAnLFxuXHRcdFx0XHRiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2Vcblx0XHRcdH0pLnRoZW4oZnVuY3Rpb24gKG1vZGFsKSB7XG5cdFx0XHRcdG1vZGFscy5wdXNoKG1vZGFsKTtcblx0XHRcdFx0bW9kYWwuc2hvdygpO1xuXHRcdFx0fSk7XG5cdFx0fTtcblxuXHRcdHZhciBfY2xvc2VNb2RhbCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBjdXJyZW50TW9kYWwgPSBtb2RhbHMuc3BsaWNlKC0xLCAxKVswXTtcblx0XHRcdGN1cnJlbnRNb2RhbC5yZW1vdmUoKTtcblx0XHR9O1xuXG5cdFx0dmFyIF9jbG9zZUFsbE1vZGFscyA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdG1vZGFscy5tYXAoZnVuY3Rpb24gKG1vZGFsKSB7XG5cdFx0XHRcdG1vZGFsLnJlbW92ZSgpO1xuXHRcdFx0fSk7XG5cdFx0XHRtb2RhbHMgPSBbXTtcblx0XHR9O1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdG9wZW5Nb2RhbDogX29wZW5Nb2RhbCxcblx0XHRcdGNsb3NlTW9kYWw6IF9jbG9zZU1vZGFsLFxuXHRcdFx0Y2xvc2VBbGxNb2RhbHM6IF9jbG9zZUFsbE1vZGFsc1xuXHRcdH07XG5cdH1cbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXJcblx0XHQubW9kdWxlKCdBcHAnKVxuXHRcdC5mYWN0b3J5KCdNb2RlbCcsIE1vZGVsKTtcblxuXHRNb2RlbC4kaW5qZWN0ID0gWydVc2VycyddO1xuXHRmdW5jdGlvbiBNb2RlbChVc2Vycykge1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdFVzZXJzOiBVc2Vyc1xuXHRcdH07XG5cdH1cbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXJcblx0XHQubW9kdWxlKCdBcHAnKVxuXHRcdC5mYWN0b3J5KCdSZXN1bHRzJywgUmVzdWx0cyk7XG5cblx0UmVzdWx0cy4kaW5qZWN0ID0gWyckaHR0cCcsICckcScsJ0FQSSddO1xuXHRmdW5jdGlvbiBSZXN1bHRzKCRodHRwLCRxLCBBUEkpIHtcblxuICAgIHJldHVybiB7XG4gICAgICBnZXRSZXN1bHRzOmZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBkZWZlcmVkID0gJHEuZGVmZXIoKTtcbiAgICAgICAgdmFyIHByb21pc2UgPSBkZWZlcmVkLnByb21pc2U7XG5cbiAgICAgICAgJGh0dHAuZ2V0KEFQSSsnL2dldF9wcm9kdWN0b19pZC8nKyc0JylcbiAgICBcdFx0LnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XG4gICAgXHRcdFx0ZGVmZXJlZC5yZXNvbHZlKGRhdGEpO1xuICAgIFx0XHR9KVxuICAgIFx0XHQuZXJyb3IoZnVuY3Rpb24oZXJyKXtcbiAgICBcdFx0XHRkZWZlcmVkLnJlamVjdChlcnIpXG4gICAgXHRcdH0pO1xuXG4gICAgXHRcdHJldHVybiBwcm9taXNlO1xuICAgICAgfVxuICAgIH07XG5cblx0fVxufSkoKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
