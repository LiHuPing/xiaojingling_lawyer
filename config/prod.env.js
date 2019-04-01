'use strict'
module.exports = {
  testBuild: {
		'process.env': { 
			NODE_ENV: '"test-production"'
		},
		the_host: '"http://192.168.1.188:8053"'
	},
	preBuild: {
		'process.env': { 
			NODE_ENV: '"pre-production"'
		},
		the_host: '"http://xjlpcapi.ftmore.com"'
	},
	build: {
		'process.env': { 
			NODE_ENV: '"production"'
		},
		the_host: '"http://pcapi.51xjl.com"'
	}
}
