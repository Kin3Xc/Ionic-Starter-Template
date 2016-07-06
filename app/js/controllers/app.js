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
