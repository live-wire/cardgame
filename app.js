(function(){
angular.module("cardGame",[]);

angular.module("cardGame").controller("CardCtrl",["$scope","$timeout",function($scope,$timeout){

	$scope.game=false;
	$scope.allCards = [];
	$scope.buffer = null;
	$scope.Card = function(color){
		this.color = color;
		this.state = "opened";
		this.visible = "yes";
	};
	$scope.shuffle = function(array) {
	  var currentIndex = array.length, temporaryValue, randomIndex;

	  // While there remain elements to shuffle...
	  while (0 !== currentIndex) {

	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;

	    // And swap it with the current element.
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
		}

  	return array;
	};
	$scope.populateAllCards = (function(){
		var i = 4;
		while(i>0){
		var temp = new $scope.Card("red");
		$scope.allCards.push(temp);
		temp = new $scope.Card("blue");
		$scope.allCards.push(temp);
		temp = new $scope.Card("yellow");
		$scope.allCards.push(temp);
		temp = new $scope.Card("green");
		$scope.allCards.push(temp);
		i--;
		}

		$scope.allCards = $scope.shuffle($scope.allCards);
		$scope.gridParams = [{a:0,b:4},{a:4,b:8},{a:8,b:12},{a:12,b:16}];
		$scope.cardCount = $scope.allCards.length;

		}());

	$scope.cardClicked=function(card)
	{
		if(!$scope.clickBlocked){
		if(card == $scope.buffer)
		{
			if(card.state=="closed")
				{card.state="opened";}
			else
				{card.state="closed";}
			$scope.buffer = null;
		}
		else if(card.state=="closed")
		{

			card.state = "opened";
			var pp = 0;
			if($scope.buffer && $scope.buffer.color == card.color)
			{
				$scope.clickBlocked = true;
				document.body.style.backgroundColor = "#dcefdc";
				$timeout(function(){
				$scope.buffer.visible="no";
				card.visible = "no";
				$scope.cardCount = $scope.cardCount - 2;
				$scope.endGame = $scope.cardCount==0?true:false;
				},500).then(function(){$scope.clickBlocked = false;
				$scope.buffer = null;
				document.body.style.backgroundColor = "#efefef";
				});
				pp = 1;
			}
			else if($scope.buffer && $scope.buffer.color != card.color){
				$scope.clickBlocked = true;
				document.body.style.backgroundColor = "#f6d6d5";
				$timeout(function(){
				$scope.buffer.state="closed";
				card.state = "closed";
				},500).then(function(){$scope.clickBlocked = false;
				$scope.buffer = null;
				document.body.style.backgroundColor = "#efefef";
				});
				pp = 1;
			}
			if(pp==0){
			$scope.buffer = card;
			}
		}
	};
	};
	$scope.closeCard=function(card){
		for(var i=0;i<$scope.allCards.length;i++)
		{
			if(card == $scope.allCards[i]){
			$scope.allCards[i].state="closed";
			}
		}

	};
	$scope.gameplay = function(){
		$timeout(function(){
			$scope.closeAllCards();
		},5000).then($scope.scoreCount);
	};
	$scope.timer = 5;
	$scope.startTimer = function(){
		$timeout(function(){
			if($scope.timer>0)
			{
				$scope.clickBlocked=true;
				$scope.timer = $scope.timer-1;
				$scope.startTimer();
			}
			else
			{
				$scope.clickBlocked=false;
			}
		},1000);
	};
	$scope.score = 0;
	$scope.endGame = false;
	$scope.scoreCount = function(){
		$timeout(function(){
			if(!$scope.endGame)
			{
				$scope.score = $scope.score + 0.5;
				$scope.scoreCount();
			}
			else
			{
				$scope.score = "Time Consumed -- "+$scope.score+" seconds";
			}
		},500);
	};

	$scope.closeAllCards= function(){

		for(var i=0;i<$scope.allCards.length;i++)
		{
			$scope.allCards[i].state="closed";
		}
	};



}]);


}());