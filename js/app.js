const app = angular.module('app', [])

.controller('ResizeController', function($scope) {
    

    $scope.welcome = "wrapper";

    $scope.reset = function() {
        $scope.section1  = "section1";
        $scope.topLeft   = "left1";
        $scope.topRight  = "right1";
        $scope.section2  = "section2";
        $scope.botLeft   = "left2";
        $scope.botRight  = "right2";
        $scope.about     = false;
        $scope.skills    = false;
        $scope.projects  = false;
        $scope.contactme = false;
    }


    $scope.expandLeft1= function() {
        if ($scope.topLeft === "left1") {
            $scope.reset();
        $scope.topLeft     = "left1Expand";
        $scope.section1    = "section1Expand"
        $scope.about       = true;
        } else {
        $scope.topLeft     = "left1";
        $scope.section1    = "section1"
        $scope.about       = false;
        }
    }

    $scope.expandRight1 = function() {
        if ($scope.topRight === "right1") {
            $scope.reset();
            $scope.topRight = "right1Expand";
            $scope.section1 = "section1Expand"
            $scope.skills = true;
        } else {
            $scope.topRight = "right1";
            $scope.section1 = "section1"
            $scope.skills = false;
        }
    }

    $scope.expandLeft2= function() {
        if ($scope.botLeft === "left2") {
            $scope.reset();
            $scope.botLeft = "left2Expand";
            $scope.section2 = "section2Expand"
            $scope.projects = true;
        } else {
            $scope.botLeft = "left2";
            $scope.section2 = "section2"
            $scope.projects = false;
        }
    }

    $scope.expandRight2 = function() {
        if ($scope.botRight === "right2") {
            $scope.reset();
            $scope.botRight = "right2Expand";
            $scope.section2 = "section2Expand"
            $scope.contactme = true;
        } else {
            $scope.botRight = "right2";
            $scope.section2 = "section2"
            $scope.contactme = false;
        }
    }

});