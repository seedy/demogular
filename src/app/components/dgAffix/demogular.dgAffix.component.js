(function(){
'use strict';

angular.module('app').component('dgAffix', {
	/* @ngInject */
	templateUrl: 'app/components/dgAffix/demogular.dgAffix.html',
	transclude: true,
	bindings: {
		parentSelector: '@',
		config: '<',
		triggers: '<',
		events: '<'
	},
	controller: function($scope, $element, $attrs, $q){
		var vm = this;
		
		//lifecycle hooks
		vm.$onInit = initialize;

		function initialize(){
			if(vm.config){
				if(vm.parentSelector){
					return getParent(vm.parentSelector)
					.then(function(element){
						setupAffix(element, vm.config);
					});
				} else {
					setupAffix(null, vm.config);
				}

				// watch triggers and reset offset on change
				vm.triggers.forEach(function(trigger){
					$scope.$watch(trigger, function(){
						setOffset(vm.config);
					});
				});

				// on events reset offset
				vm.events.forEach(function(event){
					$scope.$on(event, function(){
						setOffset(vm.config);
					});
				});
			}
		}



		// private functions

		// get parent selector
		function getParent(selector){
			var deferred = $q.defer();
			angular.element(document).ready(function(){
				deferred.resolve($($element).parents(selector));
			});
			return deferred.promise;
		}

		function setupAffix(selector, config){
			setOffset(selector, config);
			if(selector){
				selector.on("scroll", function(){
					setOffset(selector, config);
				});
			}
		}

		function setOffset(selector, config){
			var start;
			if(vm.config.top){
				start = parseInt(vm.config.top, 10);
				$element.css({"top": start + selector.scrollTop()});
			}
			if(vm.config.bottom){
				start = parseInt(vm.config.bottom, 10);
				$element.css({"bottom": start - selector.scrollTop()});
			}
			if(vm.config.left){
				start = parseInt(vm.config.left, 10);
				$element.css({"left": start + selector.scrollLeft()});
			}
			if(vm.config.right){
				start = parseInt(vm.config.right, 10);
				$element.css({"right": start - selector.scrollLeft()});
			}
		}
	}
});



})();