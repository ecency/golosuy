'use strict';

angular.module('golosuy.polls', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/polls', {
    templateUrl: 'polls/polls.html',
    controller: 'PollsCtrl'
  });
}])

.controller('PollsCtrl', function($scope) {

  //console.log('polls');

  steem.api.getDiscussionsByBlog({tag:"golosuy", limit:30}, function(err, response) {
    //console.log(err, response);
    if (err) {
      alert('Проблема подключения, пожалуйста, перезагрузите страницу!');
    }
    if(response) {
      angular.forEach(response, function(v,k){
        v.json_metadata = v.json_metadata?angular.fromJson(v.json_metadata):v.json_metadata;
      });
      $scope.list = response;
      if (!$scope.$$phase){
        $scope.$apply();
      }
    }
  });

});
