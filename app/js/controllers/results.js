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
