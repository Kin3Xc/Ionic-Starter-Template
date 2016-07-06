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
