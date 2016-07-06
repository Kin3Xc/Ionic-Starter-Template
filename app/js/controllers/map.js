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
