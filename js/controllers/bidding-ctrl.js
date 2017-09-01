app.controller('biddingController', function($scope, stateFactory) {
  console.log('Bidding!');

  socket.on('create-listing', function(auctionItem) {
    console.log(auctionItem);
    $scope.$apply(function() {
      stateFactory.addListing(auctionItem);
      setupTimeRemainingField(auctionItem);

      if (auctionItem.submitter.id === stateFactory.me.id) {
        $scope.startAuctionForm.name = '';
        $scope.startAuctionForm.imageUrl = '';
        $scope.startAuctionForm.auctionDurationMins = '';
      }
    });
    // console.log('create-listing rec', data);
  });

  socket.on('auction-end', function(data) {
    $scope.$apply(function() {
      stateFactory.closeAuction(data.id);
    });
  })

  socket.on('create-bid', function(data) {
    $scope.$apply(function() {
      console.log("Makin a bid!")
      stateFactory.addBid(data);
    });
  });

  setInterval(function() {
    stateFactory.auction.forEach(function(auctionItem) {
      if (auctionItem.status === 'open' && auctionItem.timeRemaining > 0) {
        $scope.$apply(function() {
          auctionItem.timeRemaining--;
        })
      }
    })
  }, 1000);

  $scope.openListingsFilter = function(auctionItem) {
    return auctionItem.status === 'open';
  };

  $scope.closedListingsFilter = function(auctionItem) {
    return auctionItem.status === 'closed';
  }

  $scope.openAuctionsExist = function() {
    return _.some(stateFactory.auction, function(auctionItem) {
      return auctionItem.status === 'open';
    });
  };

  $scope.closedAuctionsExist = function() {
    return _.some(stateFactory.auction, function(auctionItem) {
      return auctionItem.status === 'closed';
    });
  };

  $scope.submitBid = function(listing){
    socket.emit('create-bid', {
      itemId  : listing.id,
      price   : listing.mybid
    });

    listing.mybid = '';
  };

  $scope.startAuction = function() {
    var auctionDurationMins = parseFloat($scope.startAuctionForm.auctionDurationMins);

    if (isNaN(auctionDurationMins)) {
      alert("Please enter a number for the auction duration!");
      return;
    }

    var auctionItem = {
      name: $scope.startAuctionForm.name,
      imageUrl: $scope.startAuctionForm.imageUrl,
      auctionDurationMins: auctionDurationMins
    };

    socket.emit('create-listing', auctionItem);
  }
})