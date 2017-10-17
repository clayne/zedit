import { remote, ipcRenderer, clipboard } from 'electron';
import jetpack from 'fs-jetpack';
import './polyfills';
import './color';
import fh from './helpers/fileHelpers';
import env from './env';
import './xelib';
import buildModuleService from './helpers/moduleService';

// initialize xelib when application starts
xelib.Initialize();

// set up angular application
const ngapp = angular.module('zedit', [
    'ui.router', 'ct.ui.router.extras', 'angularSpinner', 'vs-repeat',
    'mp.colorPicker', 'puElasticInput', 'hc.marked'
]);

//this allows urls with and without trailing slashes to go to the same state
ngapp.config(function($urlMatcherFactoryProvider) {
    $urlMatcherFactoryProvider.strictMode(false);
});

// state redirects
ngapp.run(['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function (e, toState, params) {
        if (toState.redirectTo) {
            e.preventDefault();
            $state.go(toState.redirectTo, params, {location: 'replace'});
        }
    });
}]);

//== begin angular files ==
//=include Directives/*.js
//=include Factories/*.js
//=include Filters/*.js
//=include Services/*.js
//=include Views/**/*.js
//== end angular files ==

// load modules
const moduleService = buildModuleService(ngapp, fh);
moduleService.loadModules();
ngapp.run(() => moduleService.loadDeferredModules());
