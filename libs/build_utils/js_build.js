// * ———————————————————————————————————————————————————————— * //
// * 	JS build
// *	Random set of helper functions used all around
// * ———————————————————————————————————————————————————————— * //

var js_build = function () {};

var Promise = require('bluebird')
var rjs = require('requirejs')
var enduro_helpers = require('../flat_utilities/enduro_helpers')
var kiskaLogger = require('../kiska_logger')

// Creates all subdirectories neccessary to create the file in filepath
js_build.prototype.build_js = function(config_name) {

	!config_name
		? config_name = ''
		: config_name = '_' + config_name

	var configpath = cmd_folder + '/assets/js/main' + config_name + '.js'

	if(!enduro_helpers.fileExists(configpath)){
		return kiskaLogger.errBlock('No config file named main' + config_name + '.js')
	}

	return new Promise(function(resolve, reject){
		config = {
			mainConfigFile: configpath,
			baseUrl: cmd_folder + '/assets/',
			name: 'js/main',
			out: cmd_folder + '/_src/assets/js/main_dist.js',
			include: ["vendor/requirejs/require"],
		};

		rjs.optimize(config, function(buildResponse){
			console.log(buildResponse)
			cb()
			resolve();
		}, function(err){
			console.log(err)
			reject();
		});
	})
}

module.exports = new js_build()