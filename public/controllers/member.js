function totalHours(events) {
	var total = 0;
	for(var i = 0; i < events.length; i++){
		total += events[i].hours;
	}
	return total;
}

angular.module('nhs')

.controller('memberList', ['$scope', "$state", "$rootScope", "User", function($scope, $state, $rootScope, User){
    User.all()
		.then(function(userList) {
			for(var i=0; i<userList.length; i++) {
				var m = userList[i], evts = m.events;
				m.totalHours = totalHours(evts);
				m.checked = !evts.filter(function(evt) {
					return !evt.checked;
				}).length;
			}
			$scope.members = userList;
		});

}])

.controller('singleMember', ['$scope', "$stateParams", "$rootScope", "User", "$q", "$state",
function($scope, $stateParams, $rootScope, User, $q, $state){
    $scope.events = [];

	User.get($stateParams.memberID)
		.then(function(user) {
			$scope.member = user;
		});

	User.getEvents($stateParams.memberID)
		.then(function(events) {
			$scope.events = events;
		});

	$scope.findTotal = function() {
        var total = 0;
        for(var i = 0; i < $scope.events.length; i++){
            total += $scope.events[i].hours;
        }
        return total;
    };

	$scope.saveChecks = function() {
		var promises = [];
		angular.forEach($scope.events, function(event) {
			if(event.justChecked) {
				promises.push(User.checkEvent($stateParams.memberID, event._id));
			}
		});

		$q.all(promises)
			.then(function() {
				$state.go("memberList");
			});
	};
}])

;
