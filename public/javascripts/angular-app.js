var taskerApp = angular.module('tasker', []);

taskerApp.controller('LoadingPanelCtrl', function($scope, $http) {

  // show an item!
  // theoretically we could make an AJAX call here
  // some stuff would happen
  // we'd be given a message, right?

  $scope.message = 'We are currently loading...';
  // event to trigger when loading
  $scope.showLoading = function() {
    $('#loading-message').html($scope.message);
  }
  // event to trigger when done
  $scope.showDone = function() {
    $scope.message = "Hey, welcome back :)";
    $('#loading-message').html($scope.message);
  }
  // event to trigger when error occurs
  $scope.showError = function() {
    $scope.message = "Womp womp... Wrong user/password?";
    $('#loading-message').html($scope.message);
  }

  // once something is done ... hide it
  $scope.showLoading();
  $('#login-btn').on('click', function() {
    $http.get('/api/tasks').success($scope.showDone).error($scope.showError);
  });

});

taskerApp.controller('TaskListCtrl', function($scope, $http) {

  // perform some pre-rendering jQuery magic

  //this.fetch = ....
  //this.tasks = data....
  $scope.fetch = function() {
    $http.get('/api/tasks').success(function(data) {
      console.log('We got it, Andrew');
      $scope.tasks = data;
      // log data from the server
      console.log($scope.tasks);
    });
  };

  //$(dom).data('task');
  //$(dom).data('task', 'newValue');

  $scope.createTask = function(name, description) {
    $http.post("/api/tasks", {
      name: name,
      description: description
    }).success(function(data, status) {
      $scope.fetch();
    });
  };

  $scope.completeTask = function(task) {
    console.log(task);
    var answer = confirm('Are you sura ya wanna complete it?');
    if (answer == true) {
      $http.delete('/api/tasks/' + task["_id"]).success(function() {
        $scope.fetch();
      });
    }
  };

  $scope.fetch();

  // now, perform jQuery magic :)

});
