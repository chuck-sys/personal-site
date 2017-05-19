var ghBase = "https://api.github.com";
var repoName = "cheukyin699.github.io";

angular.module("CommentsApp", [], function($interpolateProvider) {
    $interpolateProvider.startSymbol('//');
    $interpolateProvider.endSymbol('//');
})
.controller("CommentsCtrl", function($scope, $http) {
    $scope.comments = [];

    $scope.getComments = function(id) {
        $http.get(ghBase + '/repos/cheukyin699/' + repoName + '/issues/' + id + '/comments')
        .then(function(res) {
            // Success
            $scope.comments = res.data;
        }, function(err) {
            // Error
            $scope.error = err.data.error;
        });
        console.log(id);
    };
});
