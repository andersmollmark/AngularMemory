'use strict';

/**
 * @ngdoc overview
 * @name angularMemoryApp
 * @description
 * # angularMemoryApp
 *
 * Main module of the application.
 */
angular
  .module('angularMemoryApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/memory.html',
        controller: 'MemoryController',
        controllerAs: 'self'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
