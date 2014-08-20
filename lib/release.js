/*
 * Author: z.w(weger)
 * Email: lovexctk@gmail.com
 * Data: 2014-02-28
 * It's distributed under the MIT license(http://mit-license.org).
 */

var exec = require('child_process').exec,
    child;

module.exports = release;

function release(name){
	child = exec('node build/r.js -o build/config.js',
	  function (error, stdout, stderr) {
	    console.log('stdout: ' + stdout);
	    if (error !== null) {
	      console.log('exec error: ' + error);
	    }
	});
}