app.directive('create', function () {
  return {
    restrict: 'EA',
    templateUrl: './js/templates/create-auction.html',
    controller: 'biddingController'
    // link: function (scope, iElement, iAttrs) {
      
    // }
  };
})