var app = angular.module('story_challenge', [], function($interpolateProvider) {
    $interpolateProvider.startSymbol('//');
    $interpolateProvider.endSymbol('//');
});
var baseUrl = "/10-min-challenge/";

app.controller('indexController', function($scope, $http, $sce) {
    $scope.current = 1;
    $scope.next = $scope.current + 1;
    $scope.previous = $scope.current - 1;
    $scope.no_stories = 3;

    $scope.goto = function(i) {
        if (i == -1) {
            t = $scope.current;
            while ($scope.current == t) {
                t = Math.floor(Math.random() * $scope.no_stories + 1);
            }
            i = t;
        }
        $http.get(baseUrl + i + '.html')
             .then(function(res) {
                $scope.story = $sce.trustAsHtml(res.data);
                $scope.current = i;
                $scope.next = $scope.current + 1;
                $scope.previous = $scope.current - 1;
                $scope.error = "";
             }, function(res) {
                $scope.error = "Error! There is no story #" + i;
             });
    };

    $scope.goto($scope.current);
});
