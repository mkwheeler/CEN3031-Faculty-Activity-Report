'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User');

/**
 * Globals
 */
var user, user2;

/**
 * Unit tests
 */
describe('User Model Unit Tests:', function() {
	before(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password',
			provider: 'local'
		});
		user2 = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password',
			provider: 'local'
		});

		done();
	});

	describe('Method Save', function() {
		it('should begin with no users', function(done) {
			User.find({}, function(err, users) {
				users.should.have.length(0); //can someone explain this to me?
				done();
			});
		});

		it('should be able to save without problems', function(done) {
			user.save(done);
		});

		it('should fail to save an existing user again', function(done) {
			user.save();
			return user2.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without first name', function(done) {
			user.firstName = '';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
			
		it('should be able to show an error when using try to save with too short password', function(done) {
			user.password = '1'
			return user.save(function(err) {
				should.exist(err);
				done;
		});
	});
	
		it('should be able to show an error when DisplayName does not equal firstName lastName', function(done) {
			user.firstName = "Gandolf";
			user.lastName = "theGrey";
			user.DisplayName = "Aberforth Dumbledore";
			return user.save(function(err) {
				should.exist(err);//this part might not be right.
				done();//just trying to follow the other tests
			});			
		});
	

	after(function(done) {
		User.remove().exec();
		done();
	});
});