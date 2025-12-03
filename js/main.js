//to make gh pages happy
var pref ="/rae/"

var app = angular.module('template',[ 'ngSanitize', 'ngAnimate']);



app.controller('ctrl', function($scope, $window, $http) {



  $scope.model = {data:[{name:"Paradigm", curr:null, icon:"fa-brain", colour:"#1f77b4"}, {name:"Methodology", curr:null, icon:"fa-book", colour:"#ff7f0e"}, {name:"Method", curr:null, icon:"fa-flask", colour:"#2ca02c"}, {name:"Outcome", curr:null, icon:"fa-poll", colour:"#9467bd"}], overlay:false};
  for(let i=0;i<$scope.model.data.length; i++) {
    $http.get(pref + "data/" + $scope.model.data[i]["name"].toLowerCase() + ".csv").then(function(d){
      let lines = d["data"].split("\n")
      lines.pop()
      let res = lines.map(function(l) {
        let parts= l.split("|")
        return {"name": parts[0].trim(), "desc":parts[1].trim()}
      })
      $scope.model.data[i]["options"] = res
    })
  }
  $scope.draw = function(){
    for(let i=0;i<$scope.model.data.length; i++){
      $scope.model.data[i].curr =  Math.floor(Math.random() * $scope.model.data[i].options.length)
    }
  }

  $scope.toggle_overlay = function(){
    $scope.model.overlay = !$scope.model.overlay
  }


})
