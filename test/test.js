/*jshint esversion: 6 */
(function() {
	"use strict";

	let Supertest = require('supertest');
	let Should = require('should');

	let Server = Supertest.agent('http://localhost:3000');

	describe('API Unit Test',function() {
		it('Get data from API',function(done) {
			Server
				.get('/api/meetups')
				.expect('Content-type',/json/)
				.expect(200)
				.end(function(err, response) {
					response.status.should.equal(200);
					done();
				});
		});
	});


})();