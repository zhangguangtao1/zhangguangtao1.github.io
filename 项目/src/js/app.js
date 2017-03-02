var app = angular.module("ydapp",["ngRoute","ngAnimate"])
					.controller("ydCtrl",["$scope","$http",function($scope,$http){
						$scope.page={pageNum:1};
						
					}])
					.config(["$routeProvider",function($routeProvider){
						$routeProvider
						.when("/home",{templateUrl:"templates/pages/home.html"})
						.when("/regist",{templateUrl:"templates/pages/regist.html"})
						.when("/search",{templateUrl:"templates/pages/search.html"})
						.when("/stadium/:id",{templateUrl:"templates/pages/stadium.html"})
						.otherwise({redirectTo:"/home"})
					}])
					.controller("homeCtrl",["$scope","$http","$location","$ydsearch",function($scope,$http,$location,$ydsearch){
						$scope.page.pageNum=1;
						$scope.gosearch = function(id){
							$ydsearch.category_id=id;
							$location.path("/search");
						}
	
					}])
					.controller("searchCtrl",["$scope","$http","$ydsearch",function($scope,$http,$ydsearch){
						$scope.page.pageNum=2;
						$http.get("http://platform-api.1yd.me/api/meta-data/cities")
							.success(function(res){
								$scope.selectobj = {$:''};
								$scope.province = res.provinces;
								$scope.citys = [];
								$scope.searchinfo = {
									city_id:'',
									district_id:'',
									start:0,
									sort:'1',
									start_dates:'',
									start_time:'' ,
									category_id:'',
									cbd_id:'',
									facility_id:'',
									keyword:''
									};
								$scope.searchinfo = angular.extend($scope.searchinfo,$ydsearch)
								$scope.searchoptions = {};
								$scope.stadium = [];
								$scope.currentcity = {};
								for(var i = 0;i < $scope.province.length;i++){
									for(var j = 0;j < $scope.province[i].citys.length;j++){
										$scope.citys.push($scope.province[i].citys[j])
									}
								}
								$scope.currentcity = $scope.citys[0];
								$scope.getsearchoptions();
								$scope.getstadium();
								$scope.setcurrentcity($scope.currentcity);
							})
							$scope.setcurrentcity = function (item){
//								console.log('123456')
								$scope.currentcity = item;
								$scope.searchinfo.city_id = item.city_id;
								$scope.getsearchoptions();
								$scope.getstadium();
							}
							$scope.getsearchoptions = function(){
									$http.get("http://platform-api.1yd.me/api/meta-data/"+$scope.searchinfo.city_id)
									.success(function(res){
//										console.log(res);
										$scope.searchoptions = res;
									})
								}
							$scope.getstadium = function(){
										$http.get("http://platform-api.1yd.me/api/stadium_resources?"+$.param($scope.searchinfo))	
									.success(function(res){
										$scope.stadium = res;
//										console.log($scope.stadium)
									})
									}
							$scope.loadmorestadium = function(){
								$scope.searchinfo.start+=10;
								$http.get("http://platform-api.1yd.me/api/stadium_resources?"+$.param($scope.searchinfo))	
									.success(function(res){
										$scope.stadium = $scope.stadium.concat(res);
//										console.log($scope.stadium)
									})
							}
					}])
					.controller("registCtrl",["$scope","$http",function($scope,$http){
						$scope.page.pageNum=3;
					}])
					.controller("stadiumCtrl",["$scope","$http","$routeParams","$filter",function($scope,$http,$routeParams,$filter){
						$scope.page.pageNum=2;
						$scope.stadiumid = $routeParams.id;
						$scope.stadiuminfo = null;
						$scope.today = new Date();
						$scope.currentday = $scope.today;
						$scope.datelist = [];
						$scope.stadiumfield = null;
						$scope.selectfield = [];
						
						
						$scope.getstadiuminfo = function(){
							$http.get("http://platform-api.1yd.me/api/stadiums/"+$scope.stadiumid)
								.success(function(res){
									$scope.stadiuminfo = res;
//									console.log($scope.stadiuminfo)
								})
						}
						$scope.getdatelist = function(){
							var arr = ['星期天','星期一','星期二','星期三','星期四','星期五','星期六',]
							for(var i = 0;i < 7;i++){
								var obj = {};
								obj.d = new Date($scope.today.getFullYear(),$scope.today.getMonth(),$scope.today.getDate()+i);
								obj.w = arr[obj.d.getDay()];
								$scope.datelist.push(obj);
							}
							$scope.currentday = $scope.datelist[0];
						}
						$scope.getstadiumfield = function(){
							var d = $filter('date')($scope.currentday.d,'yyyy-MM-dd');
							$http.get('http://platform-api.1yd.me/api/stadiums/'+$scope.stadiumid+'/field_resources?date='+d)
								.success(function(res){
									$scope.stadiumfield = res;
									console.log($scope.stadiumfield);
								})
						}
						$scope.$watch("stadiumfield",function(){
							$scope.selectedfield = [];
							for(var i = 0;i < $scope.stadiumfield.length;i++){
								for(var k = 0;k < $scope.stadiumfield[i].field_resource.length;k++){
									if($scope.stadiumfield[i].field_resource[k].resource_status=='selected'){
										$scope.selectedfield.push($scope.stadiumfield[i].field_resource[k]);
									}
								}
							}
						},true)
						$scope.setstatus = function(col){
							if(col.resource_status=='ordered'){
								return;
							}
							if(col.resource_status=='selected'){
								col.resource_status='free';
							}else{
								col.resource_status='selected';
							}
						}
						$scope.getstadiuminfo();
						$scope.getdatelist();
						$scope.getstadiumfield();
					}])
					.factory("$ydsearch",[function(){
						return {
							category_id:''
						}
					}])
					.directive("star",[function(){
						return {
							restrict:"ECMA",
							template:'<span class=" glyphicon " ng-class="{\'glyphicon-star\':item.type==1,\'glyphicon-star-empty\':item.type==0}" ng-repeat="item in stars track by $index" ng-mouseout="setStar(score)" ng-mouseover="setStar($index+1)" ng-click="setScore($index+1)"></span>',
							
							link:function(scope,elem,attrs){
								
								scope.setStar = function(num){
									scope.stars=[];
									for(var i = 1;i <= 5; i++ ){
									var star = {};
									if(i<=num){
										star.type=1;
									}else{
										star.type=0;
									}
									scope.stars.push(star);
									
								}
								
								}
								scope.setStar(scope.score);
								scope.setScore = function(num){
									scope.score = num;
									
								}
							},
							scope:{
								score:"="
							}
						}
					}])
					
					