var ghBase = "https://api.github.com";
var repoName = "cheukyin699.github.io";

angular.module("CommentsApp", [], function($interpolateProvider) {
    $interpolateProvider.startSymbol('//');
    $interpolateProvider.endSymbol('//');
})
.controller("CommentsCtrl", function($scope, $http, $sce) {
    $scope.comments = [];
    $scope.trustAsHtml = $sce.trustAsHtml;

    $scope.getComments = function(id) {
        $http.get(ghBase + '/repos/cheukyin699/' + repoName + '/issues/' + id + '/comments',
            {headers: {Accept: "application/vnd.github.full+json"}})
        .then(function(res) {
            // Success
            $scope.comments = res.data;
        }, function(err) {
            // Error
            $scope.error = err.data.error;
        });
    };
});
