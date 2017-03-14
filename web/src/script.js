var app = angular.module('app',['ngRoute']);

app.config(function($routeProvider){
	$routeProvider.when('/',{
		templateUrl : 'pages/home.html',
		controller : 'mainController'
	}).when('/loadtests', {
		templateUrl: 'pages/loadtests.html',
		controller : 'loadtestsController'
	}).when('/configurations', {
		templateUrl: 'pages/configurations.html',
		controller : 'configurationsController'
	}).otherwise({
		redirectTo: '/'
	});
});


// Services
app.service('loadtestsService', function($http, $q){
	var getTests = function() {
			sample_data = {
					"tests" : [
						{"type": "xyz", "date": "21/21/2002", "id": "qwe123", "notes": "some note"},
						{"type": "xxx", "date": "21/21/2002", "id": "asd123", "notes": "other note"}
					]
				};

		return $q(function(resolve, reject){

			resolve(sample_data.tests);

			// TODO: Call to API
			/*
			$http.get().then(function(data){
				resolve(data);
			},function(error){
				reject(error);
			});
			*/
		});
	};

	var getTest = function(testId) {
		sample_data = {};

		return $q(function(resolve, reject){
			resolve(sample_data);

			// TODO: Call to API
			/*
			$http.get().then(function(data){
				resolve(data);
			}, function(error) {
				reject(error);
			});
			*/
		});
	}

	return {
		getTests: getTests,
		getTest: getTest
	};
});

// Controllers
app.controller('mainController', function($scope){
	console.log('main controller');
});

app.controller('loadtestsController', function($location, $scope, loadtestsService){

	loadtestsService.getTests().then(function(data){
		console.log("here")
		$scope.tests = data;
	});

	$scope.loadPost = function(postFileName){
		loadtestsService.getTest(testId).then(function(res){
			$scope.$parent.loaded_test = res.data;
			$location.path('test');
		}, function(error){
			$scope.$parent.loaded_test = '';
			console.log(error);
		});
	}
});

app.controller('configurationsController', function($scope){
	console.log('configurations controller');
});
