/**
 * Created by Danny Schreiber on 1/25/2015.
 */

(function(env){ 'use strict';
    env.TESTMODE = true;

    angular.module('danny.mocks', []);

    jasmine.getJSONFixtures().fixturesPath = 'base/public/fixtures/';

})(window);
