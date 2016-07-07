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
        })
        .state('app.user-profile', {
            url: "/user-profile",
            cache: false,
            views: {
                viewContent: {
                    templateUrl: "templates/user-profile.html"
                }
            }
        })
        .state('app.change-password', {
            url: "/change-password",
            cache: false,
            views: {
                viewContent: {
                    templateUrl: "templates/change-password.html"
                }
            }
        })
        .state('app.contacto', {
            url: "/contacto",
            cache: false,
            views: {
                viewContent: {
                    templateUrl: "templates/contacto.html"
                }
            }
        })
        .state('app.settings', {
            url: "/settings",
            cache: false,
            views: {
                viewContent: {
                    templateUrl: "templates/settings.html"
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
        $state.go("app.settings");
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImlzc3Vlcy5qcyIsImNvbnRyb2xsZXJzL2FwcC5qcyIsImNvbnRyb2xsZXJzL21hcC5qcyIsImNvbnRyb2xsZXJzL3Jlc3VsdHMuanMiLCJkaXJlY3RpdmVzL2hvbGRMaXN0LmpzIiwiZGlyZWN0aXZlcy9tdWx0aXBsZVNlbGVjdC5qcyIsImRpcmVjdGl2ZXMvc2VhcmNoU2VsZWN0LmpzIiwic2VydmljZXMvbW9kYWxzLmpzIiwic2VydmljZXMvbW9kZWwuanMiLCJzZXJ2aWNlcy9yZXN1bHRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIElvbmljIFN0YXJ0ZXIgQXBwXG5cbi8vIGFuZ3VsYXIubW9kdWxlIGlzIGEgZ2xvYmFsIHBsYWNlIGZvciBjcmVhdGluZywgcmVnaXN0ZXJpbmcgYW5kIHJldHJpZXZpbmcgQW5ndWxhciBtb2R1bGVzXG4vLyAnQXBwJyBpcyB0aGUgbmFtZSBvZiB0aGlzIGFuZ3VsYXIgbW9kdWxlIGV4YW1wbGUgKGFsc28gc2V0IGluIGEgPGJvZHk+IGF0dHJpYnV0ZSBpbiBpbmRleC5odG1sKVxuLy8gdGhlIDJuZCBwYXJhbWV0ZXIgaXMgYW4gYXJyYXkgb2YgJ3JlcXVpcmVzJ1xuYW5ndWxhci5tb2R1bGUoJ0FwcCcsIFsnaW9uaWMnLCAnbmdDb3Jkb3ZhJywgJ25nQW5pbWF0ZSddKVxuXG4vL0FQSVxuLmNvbnN0YW50KCdBUEknLCAnaHR0cDovLzE5Mi4xNjguMS43Mi9MZW9uQWdlbmNpZXMvYWRtaW5fcXFydXEvYXBpJykgLy9kZXZcbi8vYXBwLmNvbnN0YW50KCdBUElfVVJMJywgJ2h0dHA6Ly9xcXJ1cS5jb20vcGFuZWwvYXBpJykgLy9wcm9kXG5cbi5ydW4oWyckaW9uaWNQbGF0Zm9ybScsXG4gICAgICBmdW5jdGlvbigkaW9uaWNQbGF0Zm9ybSkge1xuICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICBpZih3aW5kb3cuY29yZG92YSAmJiB3aW5kb3cuY29yZG92YS5wbHVnaW5zLktleWJvYXJkKSB7XG4gICAgICAvLyBIaWRlIHRoZSBhY2Nlc3NvcnkgYmFyIGJ5IGRlZmF1bHQgKHJlbW92ZSB0aGlzIHRvIHNob3cgdGhlIGFjY2Vzc29yeSBiYXIgYWJvdmUgdGhlIGtleWJvYXJkXG4gICAgICAvLyBmb3IgZm9ybSBpbnB1dHMpXG4gICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyKHRydWUpO1xuXG4gICAgICAvLyBEb24ndCByZW1vdmUgdGhpcyBsaW5lIHVubGVzcyB5b3Uga25vdyB3aGF0IHlvdSBhcmUgZG9pbmcuIEl0IHN0b3BzIHRoZSB2aWV3cG9ydFxuICAgICAgLy8gZnJvbSBzbmFwcGluZyB3aGVuIHRleHQgaW5wdXRzIGFyZSBmb2N1c2VkLiBJb25pYyBoYW5kbGVzIHRoaXMgaW50ZXJuYWxseSBmb3JcbiAgICAgIC8vIGEgbXVjaCBuaWNlciBrZXlib2FyZCBleHBlcmllbmNlLlxuICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmRpc2FibGVTY3JvbGwodHJ1ZSk7XG4gICAgfVxuICAgIGlmKHdpbmRvdy5TdGF0dXNCYXIpIHtcbiAgICAgIFN0YXR1c0Jhci5zdHlsZURlZmF1bHQoKTtcbiAgICB9XG5cbiAgfSk7XG59XSlcblxuXG5cbi5jb25maWcoWyckc3RhdGVQcm92aWRlcicsXG4gICAgICAgICAnJHVybFJvdXRlclByb3ZpZGVyJyxcbiAgICAgICAgICckaW9uaWNDb25maWdQcm92aWRlcicsXG4gICAgICAgICAnJGNvbXBpbGVQcm92aWRlcicsXG4gICAgICAgICBmdW5jdGlvbiAoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlciwgJGlvbmljQ29uZmlnUHJvdmlkZXIsICRjb21waWxlUHJvdmlkZXIpIHtcblxuICAgICRjb21waWxlUHJvdmlkZXIuaW1nU3JjU2FuaXRpemF0aW9uV2hpdGVsaXN0KC9eXFxzKihodHRwcz98ZnRwfGZpbGV8YmxvYnxjb250ZW50fG1zLWFwcHh8eC13bWFwcDApOnxkYXRhOmltYWdlXFwvfGltZ1xcLy8pO1xuICAgICRjb21waWxlUHJvdmlkZXIuYUhyZWZTYW5pdGl6YXRpb25XaGl0ZWxpc3QoL15cXHMqKGh0dHBzP3xmdHB8bWFpbHRvfGZpbGV8Z2h0dHBzP3xtcy1hcHB4fHgtd21hcHAwKTovKTtcblxuICAgICRpb25pY0NvbmZpZ1Byb3ZpZGVyLnNjcm9sbGluZy5qc1Njcm9sbGluZyhpb25pYy5QbGF0Zm9ybS5pc0lPUygpKTtcblxuICAgICRzdGF0ZVByb3ZpZGVyXG5cdFx0XHRcdC5zdGF0ZSgnYXBwJywge1xuXHRcdFx0XHRcdFx0dXJsOiAnL2FwcCcsXG5cdFx0XHRcdFx0XHRhYnN0cmFjdDogdHJ1ZSxcblx0XHRcdFx0XHRcdGNvbnRyb2xsZXI6ICdBcHBDb250cm9sbGVyJyxcblx0XHRcdFx0XHRcdHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL21lbnUuaHRtbCdcblx0XHRcdFx0fSlcbiAgICAgICAgLnN0YXRlKCd0YWInLCB7XG4gICAgICAgICAgdXJsOiAnL3RhYicsXG4gICAgICAgICAgYWJzdHJhY3Q6IHRydWUsXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvdGFicy5odG1sJ1xuICAgICAgICB9KVxuXG5cdFx0XHRcdC5zdGF0ZSgnYXBwLnNjcmVlbicsIHtcblx0XHRcdFx0XHRcdHVybDogXCIvc2NyZWVuXCIsXG5cdFx0XHRcdFx0XHRjYWNoZTogZmFsc2UsXG5cdFx0XHRcdFx0XHR2aWV3czoge1xuXHRcdFx0XHRcdFx0XHRcdHZpZXdDb250ZW50OiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRlbXBsYXRlVXJsOiBcInRlbXBsYXRlcy9zY3JlZW4uaHRtbFwiXG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuICAgICAgICAuc3RhdGUoJ2FwcC5yZXN1bHRzJywge1xuICAgICAgICAgICAgdXJsOiBcIi9yZXN1bHRzXCIsXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgIHZpZXdDb250ZW50OiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcInRlbXBsYXRlcy9yZXN1bHRzLmh0bWxcIixcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ1Jlc3VsdHNDb250cm9sbGVyJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblx0XHRcdFx0LnN0YXRlKCdhcHAubWFwJywge1xuICAgICAgICAgICAgdXJsOiBcIi9tYXBcIixcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgdmlld0NvbnRlbnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwidGVtcGxhdGVzL21hcC5odG1sXCIsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdNYXBDb250cm9sbGVyJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnN0YXRlKCdhcHAubm8tcmVzdWx0cycsIHtcbiAgICAgICAgICAgIHVybDogXCIvbm8tcmVzdWx0c1wiLFxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICB2aWV3Q29udGVudDoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJ0ZW1wbGF0ZXMvbm8tcmVzdWx0cy5odG1sXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5zdGF0ZSgnYXBwLmZpbHRlcicsIHtcbiAgICAgICAgICAgIHVybDogXCIvZmlsdGVyXCIsXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgIHZpZXdDb250ZW50OiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcInRlbXBsYXRlcy9maWx0ZXIuaHRtbFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuc3RhdGUoJ2FwcC5yZXN0YXVyYW50LWRldGFpbHMnLCB7XG4gICAgICAgICAgICB1cmw6IFwiL3Jlc3RhdXJhbnQtZGV0YWlsc1wiLFxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICB2aWV3Q29udGVudDoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJ0ZW1wbGF0ZXMvcmVzdGF1cmFudC1kZXRhaWxzLmh0bWxcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnN0YXRlKCdhcHAuY291cG9ucycsIHtcbiAgICAgICAgICAgIHVybDogXCIvY291cG9uc1wiLFxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICB2aWV3Q29udGVudDoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJ0ZW1wbGF0ZXMvY291cG9ucy5odG1sXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5zdGF0ZSgnYXBwLnJlZGVlbScsIHtcbiAgICAgICAgICAgIHVybDogXCIvcmVkZWVtXCIsXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgIHZpZXdDb250ZW50OiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcInRlbXBsYXRlcy9yZWRlZW0uaHRtbFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuc3RhdGUoJ2FwcC5hZGQtcmVzdGF1cmFudCcsIHtcbiAgICAgICAgICAgIHVybDogXCIvYWRkLXJlc3RhdXJhbnRcIixcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgdmlld0NvbnRlbnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwidGVtcGxhdGVzL2FkZC1yZXN0YXVyYW50Lmh0bWxcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnN0YXRlKCdhcHAucGhvdG9zJywge1xuICAgICAgICAgICAgdXJsOiBcIi9waG90b3NcIixcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgdmlld0NvbnRlbnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwidGVtcGxhdGVzL3Bob3Rvcy5odG1sXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5zdGF0ZSgnYXBwLnJldmlld3MnLCB7XG4gICAgICAgICAgICB1cmw6IFwiL3Jldmlld3NcIixcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgdmlld0NvbnRlbnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwidGVtcGxhdGVzL3Jldmlld3MuaHRtbFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuc3RhdGUoJ2FwcC5jb21tZW50Jywge1xuICAgICAgICAgICAgdXJsOiBcIi9jb21tZW50XCIsXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgIHZpZXdDb250ZW50OiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcInRlbXBsYXRlcy9jb21tZW50Lmh0bWxcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnN0YXRlKCdhcHAuc2lnbmluJywge1xuICAgICAgICAgICAgdXJsOiBcIi9zaWduaW5cIixcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgdmlld0NvbnRlbnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwidGVtcGxhdGVzL3NpZ25pbi5odG1sXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5zdGF0ZSgnYXBwLnNpZ25pbi1tYWlsJywge1xuICAgICAgICAgICAgdXJsOiBcIi9zaWduaW4tbWFpbFwiLFxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICB2aWV3Q29udGVudDoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJ0ZW1wbGF0ZXMvc2lnbmluLW1haWwuaHRtbFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuc3RhdGUoJ2FwcC5yZWNvdmVyeS1wYXNzJywge1xuICAgICAgICAgICAgdXJsOiBcIi9yZWNvdmVyeS1wYXNzXCIsXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgIHZpZXdDb250ZW50OiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcInRlbXBsYXRlcy9yZWNvdmVyeS1wYXNzLmh0bWxcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnN0YXRlKCdhcHAudXNlci1wcm9maWxlJywge1xuICAgICAgICAgICAgdXJsOiBcIi91c2VyLXByb2ZpbGVcIixcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgdmlld0NvbnRlbnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwidGVtcGxhdGVzL3VzZXItcHJvZmlsZS5odG1sXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5zdGF0ZSgnYXBwLmNoYW5nZS1wYXNzd29yZCcsIHtcbiAgICAgICAgICAgIHVybDogXCIvY2hhbmdlLXBhc3N3b3JkXCIsXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgIHZpZXdDb250ZW50OiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcInRlbXBsYXRlcy9jaGFuZ2UtcGFzc3dvcmQuaHRtbFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuc3RhdGUoJ2FwcC5jb250YWN0bycsIHtcbiAgICAgICAgICAgIHVybDogXCIvY29udGFjdG9cIixcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgdmlld0NvbnRlbnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwidGVtcGxhdGVzL2NvbnRhY3RvLmh0bWxcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnN0YXRlKCdhcHAuc2V0dGluZ3MnLCB7XG4gICAgICAgICAgICB1cmw6IFwiL3NldHRpbmdzXCIsXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgIHZpZXdDb250ZW50OiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcInRlbXBsYXRlcy9zZXR0aW5ncy5odG1sXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG5cblxuXG4gICAgICAgIC8vIC5zdGF0ZSgnYXBwLml0ZW0nLCB7XG4gICAgICAgIC8vICAgICB1cmw6IFwiL2l0ZW0ve3RpdGxlfVwiLFxuICAgICAgICAvLyAgICAgcGFyYW1zOiB7XG4gICAgICAgIC8vICAgICAgICAgY29sb3I6IG51bGwsXG4gICAgICAgIC8vICAgICAgICAgaWNvbjogbnVsbFxuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgLy8gICAgIHZpZXdzOiB7XG4gICAgICAgIC8vICAgICAgICAgdmlld0NvbnRlbnQ6IHtcbiAgICAgICAgLy8gICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwidGVtcGxhdGVzL2l0ZW0uaHRtbFwiLFxuICAgICAgICAvLyAgICAgICAgICAgICBjb250cm9sbGVyOiAnSXRlbUNvbnRyb2xsZXInXG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9KTtcblxuICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoZnVuY3Rpb24gKCRpbmplY3RvciwgJGxvY2F0aW9uKSB7XG4gICAgICAgIHZhciAkc3RhdGUgPSAkaW5qZWN0b3IuZ2V0KFwiJHN0YXRlXCIpO1xuICAgICAgICAkc3RhdGUuZ28oXCJhcHAuc2V0dGluZ3NcIik7XG4gICAgfSk7XG59XSk7XG4iLCIvKiBnbG9iYWwgaW9uaWMgKi9cbihmdW5jdGlvbiAoYW5ndWxhciwgaW9uaWMpIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0aW9uaWMuUGxhdGZvcm0uaXNJRSA9IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gaW9uaWMuUGxhdGZvcm0udWEudG9Mb3dlckNhc2UoKS5pbmRleE9mKCd0cmlkZW50JykgPiAtMTtcblx0fVxuXG5cdGlmIChpb25pYy5QbGF0Zm9ybS5pc0lFKCkpIHtcblx0XHRhbmd1bGFyLm1vZHVsZSgnaW9uaWMnKVxuXHRcdFx0LmZhY3RvcnkoJyRpb25pY05nQ2xpY2snLCBbJyRwYXJzZScsICckdGltZW91dCcsIGZ1bmN0aW9uICgkcGFyc2UsICR0aW1lb3V0KSB7XG5cdFx0XHRcdHJldHVybiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGNsaWNrRXhwcikge1xuXHRcdFx0XHRcdHZhciBjbGlja0hhbmRsZXIgPSBhbmd1bGFyLmlzRnVuY3Rpb24oY2xpY2tFeHByKSA/IGNsaWNrRXhwciA6ICRwYXJzZShjbGlja0V4cHIpO1xuXG5cdFx0XHRcdFx0ZWxlbWVudC5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdFx0XHRcdHNjb3BlLiRhcHBseShmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChzY29wZS5jbGlja3RpbWVyKSByZXR1cm47IC8vIFNlY29uZCBjYWxsXG5cdFx0XHRcdFx0XHRcdGNsaWNrSGFuZGxlcihzY29wZSwgeyAkZXZlbnQ6IChldmVudCkgfSk7XG5cdFx0XHRcdFx0XHRcdHNjb3BlLmNsaWNrdGltZXIgPSAkdGltZW91dChmdW5jdGlvbiAoKSB7IGRlbGV0ZSBzY29wZS5jbGlja3RpbWVyOyB9LCAxLCBmYWxzZSk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdC8vIEhhY2sgZm9yIGlPUyBTYWZhcmkncyBiZW5lZml0LiBJdCBnb2VzIHNlYXJjaGluZyBmb3Igb25jbGljayBoYW5kbGVycyBhbmQgaXMgbGlhYmxlIHRvIGNsaWNrXG5cdFx0XHRcdFx0Ly8gc29tZXRoaW5nIGVsc2UgbmVhcmJ5LlxuXHRcdFx0XHRcdGVsZW1lbnQub25jbGljayA9IGZ1bmN0aW9uIChldmVudCkgeyB9O1xuXHRcdFx0XHR9O1xuXHRcdFx0fV0pO1xuXHR9XG5cblx0ZnVuY3Rpb24gU2VsZWN0RGlyZWN0aXZlKCkge1xuXHRcdCd1c2Ugc3RyaWN0JztcblxuXHRcdHJldHVybiB7XG5cdFx0XHRyZXN0cmljdDogJ0UnLFxuXHRcdFx0cmVwbGFjZTogZmFsc2UsXG5cdFx0XHRsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQpIHtcblx0XHRcdFx0aWYgKGlvbmljLlBsYXRmb3JtICYmIChpb25pYy5QbGF0Zm9ybS5pc1dpbmRvd3NQaG9uZSgpIHx8IGlvbmljLlBsYXRmb3JtLmlzSUUoKSB8fCBpb25pYy5QbGF0Zm9ybS5wbGF0Zm9ybSgpID09PSBcImVkZ2VcIikpIHtcblx0XHRcdFx0XHRlbGVtZW50LmF0dHIoJ2RhdGEtdGFwLWRpc2FibGVkJywgJ3RydWUnKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cdH1cblxuXHRhbmd1bGFyLm1vZHVsZSgnaW9uaWMnKVxuICAgIC5kaXJlY3RpdmUoJ3NlbGVjdCcsIFNlbGVjdERpcmVjdGl2ZSk7XG5cblx0Lyphbmd1bGFyLm1vZHVsZSgnaW9uaWMtZGF0ZXBpY2tlcicpXG5cdC5kaXJlY3RpdmUoJ3NlbGVjdCcsIFNlbGVjdERpcmVjdGl2ZSk7Ki9cblxufSkoYW5ndWxhciwgaW9uaWMpOyIsIihmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdBcHAnKVxuICAgICAgICAuY29udHJvbGxlcignQXBwQ29udHJvbGxlcicsIEFwcENvbnRyb2xsZXIpO1xuXG4gICAgQXBwQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGlvbmljUG9wb3ZlciddO1xuICAgIGZ1bmN0aW9uIEFwcENvbnRyb2xsZXIoJHNjb3BlLCAkaW9uaWNQb3BvdmVyKSB7XG5cbiAgICAgICAgJHNjb3BlLml0ZW1zID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNvbG9yOiBcIiNmZmZcIixcbiAgICAgICAgICAgICAgICBpY29uOiBcImlvbi1pb25pY1wiLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIlRpZW5kYVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNvbG9yOiBcIiNmZmZcIixcbiAgICAgICAgICAgICAgICBpY29uOiBcImlvbi1zb2NpYWwtaHRtbDVcIixcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJQcm9kdWN0b3NcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb2xvcjogXCIjZmZmXCIsXG4gICAgICAgICAgICAgICAgaWNvbjogXCJpb24tc29jaWFsLWphdmFzY3JpcHRcIixcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJDYXJyaXRvXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY29sb3I6IFwiI2ZmZlwiLFxuICAgICAgICAgICAgICAgIGljb246IFwiaW9uLXNvY2lhbC1zYXNzXCIsXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiTWkgcGVyZmlsXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY29sb3I6IFwiI2ZmZlwiLFxuICAgICAgICAgICAgICAgIGljb246IFwiaW9uLXNvY2lhbC1jc3MzXCIsXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiQ29udGFjdG9cIlxuICAgICAgICAgICAgfVxuICAgICAgICBdO1xuXG4gICAgICAgICRzY29wZS5leGl0QXBwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaW9uaWMuUGxhdGZvcm0uZXhpdEFwcCgpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRpb25pY1BvcG92ZXIuZnJvbVRlbXBsYXRlVXJsKCd0ZW1wbGF0ZXMvbW9kYWxzL3BvcG92ZXIuaHRtbCcsIHtcbiAgICAgICAgICAgIHNjb3BlOiAkc2NvcGVcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocG9wb3Zlcikge1xuICAgICAgICAgICAgJHNjb3BlLnBvcG92ZXIgPSBwb3BvdmVyO1xuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUub3BlblBvcG92ZXIgPSBmdW5jdGlvbiAoJGV2ZW50KSB7XG4gICAgICAgICAgICAkc2NvcGUucG9wb3Zlci5zaG93KCRldmVudCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRzY29wZS5wb3BvdmVyLnJlbW92ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdBcHAnKVxuICAgICAgICAuY29udHJvbGxlcignTWFwQ29udHJvbGxlcicsIE1hcENvbnRyb2xsZXIpO1xuXG4gICAgTWFwQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJHN0YXRlJywgJ1Jlc3VsdHMnLCckY29yZG92YUdlb2xvY2F0aW9uJ107XG4gICAgZnVuY3Rpb24gTWFwQ29udHJvbGxlcigkc2NvcGUsICRzdGF0ZSxSZXN1bHRzLCRjb3Jkb3ZhR2VvbG9jYXRpb24pIHtcblxuICAgICAgLy8gdmFyIG9wdGlvbnMgPSB7dGltZW91dDogMTAwMDAsIGVuYWJsZUhpZ2hBY2N1cmFjeTogdHJ1ZX07XG4gICAgICAvL1xuICAgICAgLy8gJGNvcmRvdmFHZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24ob3B0aW9ucykudGhlbihmdW5jdGlvbihwb3NpdGlvbil7XG4gICAgICAvL1xuICAgICAgLy8gICB2YXIgbGF0TG5nID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUsIHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGUpO1xuICAgICAgLy9cbiAgICAgIC8vICAgdmFyIG1hcE9wdGlvbnMgPSB7XG4gICAgICAvLyAgICAgY2VudGVyOiBsYXRMbmcsXG4gICAgICAvLyAgICAgem9vbTogMTUsXG4gICAgICAvLyAgICAgbWFwVHlwZUlkOiBnb29nbGUubWFwcy5NYXBUeXBlSWQuUk9BRE1BUFxuICAgICAgLy8gICB9O1xuICAgICAgLy9cbiAgICAgIC8vICAgJHNjb3BlLm1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYXBcIiksIG1hcE9wdGlvbnMpO1xuICAgICAgLy9cbiAgICAgIC8vIH0sIGZ1bmN0aW9uKGVycm9yKXtcbiAgICAgIC8vICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgLy8gfSk7XG5cbiAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZERvbUxpc3RlbmVyKHdpbmRvdywgJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG15TGF0bG5nID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZygzNy4zMDAwLCAtMTIwLjQ4MzMpO1xuXG4gICAgICAgIHZhciBtYXBPcHRpb25zID0ge1xuICAgICAgICAgICAgY2VudGVyOiBteUxhdGxuZyxcbiAgICAgICAgICAgIHpvb206IDE2LFxuICAgICAgICAgICAgbWFwVHlwZUlkOiBnb29nbGUubWFwcy5NYXBUeXBlSWQuUk9BRE1BUFxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFwXCIpLCBtYXBPcHRpb25zKTtcblxuICAgICAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKGZ1bmN0aW9uKHBvcykge1xuICAgICAgICAgICAgbWFwLnNldENlbnRlcihuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKHBvcy5jb29yZHMubGF0aXR1ZGUsIHBvcy5jb29yZHMubG9uZ2l0dWRlKSk7XG4gICAgICAgICAgICB2YXIgbXlMb2NhdGlvbiA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKHBvcy5jb29yZHMubGF0aXR1ZGUsIHBvcy5jb29yZHMubG9uZ2l0dWRlKSxcbiAgICAgICAgICAgICAgICBtYXA6IG1hcCxcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJNeSBMb2NhdGlvblwiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLm1hcCA9IG1hcDtcbiAgICB9KTtcblxuICAgIH1cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ0FwcCcpXG4gICAgICAgIC5jb250cm9sbGVyKCdSZXN1bHRzQ29udHJvbGxlcicsIFJlc3VsdHNDb250cm9sbGVyKTtcblxuICAgIFJlc3VsdHNDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckc3RhdGUnLCAnUmVzdWx0cyddO1xuICAgIGZ1bmN0aW9uIFJlc3VsdHNDb250cm9sbGVyKCRzY29wZSwgJHN0YXRlLFJlc3VsdHMpIHtcblxuICAgICAgLy90cmFpZ28gbG9zIHBsYXRvc1xuICAgICAgLy8gUmVzdWx0cy5nZXRSZXN1bHRzKCkudGhlbihmdW5jdGlvbihkYXRhKXtcbiAgICAgIC8vICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAvLyAgICRzY29wZS5wbGF0b3MgPSBkYXRhO1xuICAgICAgLy8gfSlcbiAgICAgIC8vIC5jYXRjaChmdW5jdGlvbihlcnIpe1xuICAgICAgLy8gICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgLy8gfSlcbiAgICB9XG59KSgpO1xuIiwiKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXJcblx0XHQubW9kdWxlKCdBcHAnKVxuXHRcdC5kaXJlY3RpdmUoJ2hvbGRMaXN0JywgaG9sZExpc3QpO1xuXG5cdGhvbGRMaXN0LiRpbmplY3QgPSBbJyRpb25pY0dlc3R1cmUnXTtcblx0ZnVuY3Rpb24gaG9sZExpc3QoJGlvbmljR2VzdHVyZSkge1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHJlc3RyaWN0OiAnQScsXG5cdFx0XHRsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG5cdFx0XHRcdCRpb25pY0dlc3R1cmUub24oJ2hvbGQnLCBmdW5jdGlvbiAoZSkge1xuXG5cdFx0XHRcdFx0dmFyIGNvbnRlbnQgPSBlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJy5pdGVtLWNvbnRlbnQnKTtcblxuXHRcdFx0XHRcdHZhciBidXR0b25zID0gZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcuaXRlbS1vcHRpb25zJyk7XG5cdFx0XHRcdFx0dmFyIGJ1dHRvbnNXaWR0aCA9IGJ1dHRvbnMub2Zmc2V0V2lkdGg7XG5cblx0XHRcdFx0XHRpb25pYy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0Y29udGVudC5zdHlsZVtpb25pYy5DU1MuVFJBTlNJVElPTl0gPSAnYWxsIGVhc2Utb3V0IC4yNXMnO1xuXG5cdFx0XHRcdFx0XHRpZiAoIWJ1dHRvbnMuY2xhc3NMaXN0LmNvbnRhaW5zKCdpbnZpc2libGUnKSkge1xuXHRcdFx0XHRcdFx0XHRjb250ZW50LnN0eWxlW2lvbmljLkNTUy5UUkFOU0ZPUk1dID0gJyc7XG5cdFx0XHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0XHRcdGJ1dHRvbnMuY2xhc3NMaXN0LmFkZCgnaW52aXNpYmxlJyk7XG5cdFx0XHRcdFx0XHRcdH0sIDI1MCk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRidXR0b25zLmNsYXNzTGlzdC5yZW1vdmUoJ2ludmlzaWJsZScpO1xuXHRcdFx0XHRcdFx0XHRjb250ZW50LnN0eWxlW2lvbmljLkNTUy5UUkFOU0ZPUk1dID0gJ3RyYW5zbGF0ZTNkKC0nICsgYnV0dG9uc1dpZHRoICsgJ3B4LCAwLCAwKSc7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cblxuXHRcdFx0XHR9LCBlbGVtZW50KTtcblx0XHRcdH1cblx0XHR9O1xuXHR9XG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyXG5cdFx0Lm1vZHVsZSgnQXBwJylcblx0XHQuZGlyZWN0aXZlKCdpb25NdWx0aXBsZVNlbGVjdCcsIGlvbk11bHRpcGxlU2VsZWN0KTtcblxuXHRpb25NdWx0aXBsZVNlbGVjdC4kaW5qZWN0ID0gWyckaW9uaWNNb2RhbCcsICckaW9uaWNHZXN0dXJlJ107XG5cdGZ1bmN0aW9uIGlvbk11bHRpcGxlU2VsZWN0KCRpb25pY01vZGFsLCAkaW9uaWNHZXN0dXJlKSB7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0cmVzdHJpY3Q6ICdFJyxcblx0XHRcdHNjb3BlOiB7XG5cdFx0XHRcdG9wdGlvbnM6IFwiPVwiXG5cdFx0XHR9LFxuXHRcdFx0Y29udHJvbGxlcjogZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykge1xuXHRcdFx0XHQkc2NvcGUubXVsdGlwbGVTZWxlY3QgPSB7XG5cdFx0XHRcdFx0dGl0bGU6ICRhdHRycy50aXRsZSB8fCBcIlNlbGVjdCBPcHRpb25zXCIsXG5cdFx0XHRcdFx0dGVtcE9wdGlvbnM6IFtdLFxuXHRcdFx0XHRcdGtleVByb3BlcnR5OiAkYXR0cnMua2V5UHJvcGVydHkgfHwgXCJpZFwiLFxuXHRcdFx0XHRcdHZhbHVlUHJvcGVydHk6ICRhdHRycy52YWx1ZVByb3BlcnR5IHx8IFwidmFsdWVcIixcblx0XHRcdFx0XHRzZWxlY3RlZFByb3BlcnR5OiAkYXR0cnMuc2VsZWN0ZWRQcm9wZXJ0eSB8fCBcInNlbGVjdGVkXCIsXG5cdFx0XHRcdFx0dGVtcGxhdGVVcmw6ICRhdHRycy50ZW1wbGF0ZVVybCB8fCAndGVtcGxhdGVzL211bHRpcGxlU2VsZWN0Lmh0bWwnLFxuXHRcdFx0XHRcdHJlbmRlckNoZWNrYm94OiAkYXR0cnMucmVuZGVyQ2hlY2tib3ggPyAkYXR0cnMucmVuZGVyQ2hlY2tib3ggPT0gXCJ0cnVlXCIgOiB0cnVlLFxuXHRcdFx0XHRcdGFuaW1hdGlvbjogJGF0dHJzLmFuaW1hdGlvbiB8fCAnc2xpZGUtaW4tdXAnXG5cdFx0XHRcdH07XG5cblx0XHRcdFx0JHNjb3BlLk9wZW5Nb2RhbEZyb21UZW1wbGF0ZSA9IGZ1bmN0aW9uICh0ZW1wbGF0ZVVybCkge1xuXHRcdFx0XHRcdCRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCh0ZW1wbGF0ZVVybCwge1xuXHRcdFx0XHRcdFx0c2NvcGU6ICRzY29wZSxcblx0XHRcdFx0XHRcdGFuaW1hdGlvbjogJHNjb3BlLm11bHRpcGxlU2VsZWN0LmFuaW1hdGlvblxuXHRcdFx0XHRcdH0pLnRoZW4oZnVuY3Rpb24gKG1vZGFsKSB7XG5cdFx0XHRcdFx0XHQkc2NvcGUubW9kYWwgPSBtb2RhbDtcblx0XHRcdFx0XHRcdCRzY29wZS5tb2RhbC5zaG93KCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0JGlvbmljR2VzdHVyZS5vbigndGFwJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHQkc2NvcGUubXVsdGlwbGVTZWxlY3QudGVtcE9wdGlvbnMgPSAkc2NvcGUub3B0aW9ucy5tYXAoZnVuY3Rpb24gKG9wdGlvbikge1xuXHRcdFx0XHRcdFx0dmFyIHRlbXBPcHRpb24gPSB7fTtcblx0XHRcdFx0XHRcdHRlbXBPcHRpb25bJHNjb3BlLm11bHRpcGxlU2VsZWN0LmtleVByb3BlcnR5XSA9IG9wdGlvblskc2NvcGUubXVsdGlwbGVTZWxlY3Qua2V5UHJvcGVydHldO1xuXHRcdFx0XHRcdFx0dGVtcE9wdGlvblskc2NvcGUubXVsdGlwbGVTZWxlY3QudmFsdWVQcm9wZXJ0eV0gPSBvcHRpb25bJHNjb3BlLm11bHRpcGxlU2VsZWN0LnZhbHVlUHJvcGVydHldO1xuXHRcdFx0XHRcdFx0dGVtcE9wdGlvblskc2NvcGUubXVsdGlwbGVTZWxlY3Quc2VsZWN0ZWRQcm9wZXJ0eV0gPSBvcHRpb25bJHNjb3BlLm11bHRpcGxlU2VsZWN0LnNlbGVjdGVkUHJvcGVydHldO1xuXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGVtcE9wdGlvbjtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHQkc2NvcGUuT3Blbk1vZGFsRnJvbVRlbXBsYXRlKCRzY29wZS5tdWx0aXBsZVNlbGVjdC50ZW1wbGF0ZVVybCk7XG5cdFx0XHRcdH0sICRlbGVtZW50KTtcblxuXHRcdFx0XHQkc2NvcGUuc2F2ZU9wdGlvbnMgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAkc2NvcGUubXVsdGlwbGVTZWxlY3QudGVtcE9wdGlvbnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdHZhciB0ZW1wT3B0aW9uID0gJHNjb3BlLm11bHRpcGxlU2VsZWN0LnRlbXBPcHRpb25zW2ldO1xuXHRcdFx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCAkc2NvcGUub3B0aW9ucy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRcdFx0XHR2YXIgb3B0aW9uID0gJHNjb3BlLm9wdGlvbnNbal07XG5cdFx0XHRcdFx0XHRcdGlmICh0ZW1wT3B0aW9uWyRzY29wZS5tdWx0aXBsZVNlbGVjdC5rZXlQcm9wZXJ0eV0gPT0gb3B0aW9uWyRzY29wZS5tdWx0aXBsZVNlbGVjdC5rZXlQcm9wZXJ0eV0pIHtcblx0XHRcdFx0XHRcdFx0XHRvcHRpb25bJHNjb3BlLm11bHRpcGxlU2VsZWN0LnNlbGVjdGVkUHJvcGVydHldID0gdGVtcE9wdGlvblskc2NvcGUubXVsdGlwbGVTZWxlY3Quc2VsZWN0ZWRQcm9wZXJ0eV07XG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0JHNjb3BlLmNsb3NlTW9kYWwoKTtcblx0XHRcdFx0fTtcblxuXHRcdFx0XHQkc2NvcGUuY2xvc2VNb2RhbCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHQkc2NvcGUubW9kYWwucmVtb3ZlKCk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdCRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGlmICgkc2NvcGUubW9kYWwpIHtcblx0XHRcdFx0XHRcdCRzY29wZS5tb2RhbC5yZW1vdmUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH07XG5cdH1cbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXJcblx0XHQubW9kdWxlKCdBcHAnKVxuXHRcdC5kaXJlY3RpdmUoJ2lvblNlYXJjaFNlbGVjdCcsIGlvblNlYXJjaFNlbGVjdCk7XG5cblx0aW9uU2VhcmNoU2VsZWN0LiRpbmplY3QgPSBbJyRpb25pY01vZGFsJywgJyRpb25pY0dlc3R1cmUnXTtcblx0ZnVuY3Rpb24gaW9uU2VhcmNoU2VsZWN0KCRpb25pY01vZGFsLCAkaW9uaWNHZXN0dXJlKSB7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0cmVzdHJpY3Q6ICdFJyxcblx0XHRcdHNjb3BlOiB7XG5cdFx0XHRcdG9wdGlvbnM6IFwiPVwiLFxuXHRcdFx0XHRvcHRpb25TZWxlY3RlZDogXCI9XCJcblx0XHRcdH0sXG5cdFx0XHRjb250cm9sbGVyOiBmdW5jdGlvbiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSB7XG5cdFx0XHRcdCRzY29wZS5zZWFyY2hTZWxlY3QgPSB7XG5cdFx0XHRcdFx0dGl0bGU6ICRhdHRycy50aXRsZSB8fCBcIlNlYXJjaFwiLFxuXHRcdFx0XHRcdGtleVByb3BlcnR5OiAkYXR0cnMua2V5UHJvcGVydHksXG5cdFx0XHRcdFx0dmFsdWVQcm9wZXJ0eTogJGF0dHJzLnZhbHVlUHJvcGVydHksXG5cdFx0XHRcdFx0dGVtcGxhdGVVcmw6ICRhdHRycy50ZW1wbGF0ZVVybCB8fCAndGVtcGxhdGVzL3NlYXJjaFNlbGVjdC5odG1sJyxcblx0XHRcdFx0XHRhbmltYXRpb246ICRhdHRycy5hbmltYXRpb24gfHwgJ3NsaWRlLWluLXVwJyxcblx0XHRcdFx0XHRvcHRpb246IG51bGwsXG5cdFx0XHRcdFx0c2VhcmNodmFsdWU6IFwiXCIsXG5cdFx0XHRcdFx0ZW5hYmxlU2VhcmNoOiAkYXR0cnMuZW5hYmxlU2VhcmNoID8gJGF0dHJzLmVuYWJsZVNlYXJjaCA9PSBcInRydWVcIiA6IHRydWVcblx0XHRcdFx0fTtcblxuXHRcdFx0XHQkaW9uaWNHZXN0dXJlLm9uKCd0YXAnLCBmdW5jdGlvbiAoZSkge1xuXG5cdFx0XHRcdFx0aWYgKCEhJHNjb3BlLnNlYXJjaFNlbGVjdC5rZXlQcm9wZXJ0eSAmJiAhISRzY29wZS5zZWFyY2hTZWxlY3QudmFsdWVQcm9wZXJ0eSkge1xuXHRcdFx0XHRcdFx0aWYgKCRzY29wZS5vcHRpb25TZWxlY3RlZCkge1xuXHRcdFx0XHRcdFx0XHQkc2NvcGUuc2VhcmNoU2VsZWN0Lm9wdGlvbiA9ICRzY29wZS5vcHRpb25TZWxlY3RlZFskc2NvcGUuc2VhcmNoU2VsZWN0LmtleVByb3BlcnR5XTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHQkc2NvcGUuc2VhcmNoU2VsZWN0Lm9wdGlvbiA9ICRzY29wZS5vcHRpb25TZWxlY3RlZDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0JHNjb3BlLk9wZW5Nb2RhbEZyb21UZW1wbGF0ZSgkc2NvcGUuc2VhcmNoU2VsZWN0LnRlbXBsYXRlVXJsKTtcblx0XHRcdFx0fSwgJGVsZW1lbnQpO1xuXG5cdFx0XHRcdCRzY29wZS5zYXZlT3B0aW9uID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGlmICghISRzY29wZS5zZWFyY2hTZWxlY3Qua2V5UHJvcGVydHkgJiYgISEkc2NvcGUuc2VhcmNoU2VsZWN0LnZhbHVlUHJvcGVydHkpIHtcblx0XHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgJHNjb3BlLm9wdGlvbnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0dmFyIGN1cnJlbnRPcHRpb24gPSAkc2NvcGUub3B0aW9uc1tpXTtcblx0XHRcdFx0XHRcdFx0aWYgKGN1cnJlbnRPcHRpb25bJHNjb3BlLnNlYXJjaFNlbGVjdC5rZXlQcm9wZXJ0eV0gPT0gJHNjb3BlLnNlYXJjaFNlbGVjdC5vcHRpb24pIHtcblx0XHRcdFx0XHRcdFx0XHQkc2NvcGUub3B0aW9uU2VsZWN0ZWQgPSBjdXJyZW50T3B0aW9uO1xuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0JHNjb3BlLm9wdGlvblNlbGVjdGVkID0gJHNjb3BlLnNlYXJjaFNlbGVjdC5vcHRpb247XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdCRzY29wZS5zZWFyY2hTZWxlY3Quc2VhcmNodmFsdWUgPSBcIlwiO1xuXHRcdFx0XHRcdCRzY29wZS5tb2RhbC5yZW1vdmUoKTtcblx0XHRcdFx0fTtcblxuXHRcdFx0XHQkc2NvcGUuY2xlYXJTZWFyY2ggPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0JHNjb3BlLnNlYXJjaFNlbGVjdC5zZWFyY2h2YWx1ZSA9IFwiXCI7XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0JHNjb3BlLmNsb3NlTW9kYWwgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0JHNjb3BlLm1vZGFsLnJlbW92ZSgpO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHQkc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRpZiAoJHNjb3BlLm1vZGFsKSB7XG5cdFx0XHRcdFx0XHQkc2NvcGUubW9kYWwucmVtb3ZlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQkc2NvcGUuT3Blbk1vZGFsRnJvbVRlbXBsYXRlID0gZnVuY3Rpb24gKHRlbXBsYXRlVXJsKSB7XG5cdFx0XHRcdFx0JGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKHRlbXBsYXRlVXJsLCB7XG5cdFx0XHRcdFx0XHRzY29wZTogJHNjb3BlLFxuXHRcdFx0XHRcdFx0YW5pbWF0aW9uOiAkc2NvcGUuc2VhcmNoU2VsZWN0LmFuaW1hdGlvblxuXHRcdFx0XHRcdH0pLnRoZW4oZnVuY3Rpb24gKG1vZGFsKSB7XG5cdFx0XHRcdFx0XHQkc2NvcGUubW9kYWwgPSBtb2RhbDtcblx0XHRcdFx0XHRcdCRzY29wZS5tb2RhbC5zaG93KCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhclxuXHRcdC5tb2R1bGUoJ0FwcCcpXG5cdFx0LmZhY3RvcnkoJ01vZGFscycsIE1vZGFscyk7XG5cblx0TW9kYWxzLiRpbmplY3QgPSBbJyRpb25pY01vZGFsJ107XG5cdGZ1bmN0aW9uIE1vZGFscygkaW9uaWNNb2RhbCkge1xuXG5cdFx0dmFyIG1vZGFscyA9IFtdO1xuXG5cdFx0dmFyIF9vcGVuTW9kYWwgPSBmdW5jdGlvbiAoJHNjb3BlLCB0ZW1wbGF0ZVVybCwgYW5pbWF0aW9uKSB7XG5cdFx0XHRyZXR1cm4gJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKHRlbXBsYXRlVXJsLCB7XG5cdFx0XHRcdHNjb3BlOiAkc2NvcGUsXG5cdFx0XHRcdGFuaW1hdGlvbjogYW5pbWF0aW9uIHx8ICdzbGlkZS1pbi11cCcsXG5cdFx0XHRcdGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZVxuXHRcdFx0fSkudGhlbihmdW5jdGlvbiAobW9kYWwpIHtcblx0XHRcdFx0bW9kYWxzLnB1c2gobW9kYWwpO1xuXHRcdFx0XHRtb2RhbC5zaG93KCk7XG5cdFx0XHR9KTtcblx0XHR9O1xuXG5cdFx0dmFyIF9jbG9zZU1vZGFsID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIGN1cnJlbnRNb2RhbCA9IG1vZGFscy5zcGxpY2UoLTEsIDEpWzBdO1xuXHRcdFx0Y3VycmVudE1vZGFsLnJlbW92ZSgpO1xuXHRcdH07XG5cblx0XHR2YXIgX2Nsb3NlQWxsTW9kYWxzID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0bW9kYWxzLm1hcChmdW5jdGlvbiAobW9kYWwpIHtcblx0XHRcdFx0bW9kYWwucmVtb3ZlKCk7XG5cdFx0XHR9KTtcblx0XHRcdG1vZGFscyA9IFtdO1xuXHRcdH07XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0b3Blbk1vZGFsOiBfb3Blbk1vZGFsLFxuXHRcdFx0Y2xvc2VNb2RhbDogX2Nsb3NlTW9kYWwsXG5cdFx0XHRjbG9zZUFsbE1vZGFsczogX2Nsb3NlQWxsTW9kYWxzXG5cdFx0fTtcblx0fVxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhclxuXHRcdC5tb2R1bGUoJ0FwcCcpXG5cdFx0LmZhY3RvcnkoJ01vZGVsJywgTW9kZWwpO1xuXG5cdE1vZGVsLiRpbmplY3QgPSBbJ1VzZXJzJ107XG5cdGZ1bmN0aW9uIE1vZGVsKFVzZXJzKSB7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0VXNlcnM6IFVzZXJzXG5cdFx0fTtcblx0fVxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhclxuXHRcdC5tb2R1bGUoJ0FwcCcpXG5cdFx0LmZhY3RvcnkoJ1Jlc3VsdHMnLCBSZXN1bHRzKTtcblxuXHRSZXN1bHRzLiRpbmplY3QgPSBbJyRodHRwJywgJyRxJywnQVBJJ107XG5cdGZ1bmN0aW9uIFJlc3VsdHMoJGh0dHAsJHEsIEFQSSkge1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGdldFJlc3VsdHM6ZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIGRlZmVyZWQgPSAkcS5kZWZlcigpO1xuICAgICAgICB2YXIgcHJvbWlzZSA9IGRlZmVyZWQucHJvbWlzZTtcblxuICAgICAgICAkaHR0cC5nZXQoQVBJKycvZ2V0X3Byb2R1Y3RvX2lkLycrJzQnKVxuICAgIFx0XHQuc3VjY2VzcyhmdW5jdGlvbihkYXRhKXtcbiAgICBcdFx0XHRkZWZlcmVkLnJlc29sdmUoZGF0YSk7XG4gICAgXHRcdH0pXG4gICAgXHRcdC5lcnJvcihmdW5jdGlvbihlcnIpe1xuICAgIFx0XHRcdGRlZmVyZWQucmVqZWN0KGVycilcbiAgICBcdFx0fSk7XG5cbiAgICBcdFx0cmV0dXJuIHByb21pc2U7XG4gICAgICB9XG4gICAgfTtcblxuXHR9XG59KSgpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
