const config = {
	debug: true,
  serviceHost: the_host,
  defaultParam: {
		"roleType": "law",
		"terminalType": "pc",
		"parseType": "api",
		"authType": "acl"
  },
	page_size: 15,
	status: {
		success: [ '0' ],
		fail: [ '0', '001006' ],
		expires: [ '001006' ]
	},
	qiniuUploadUrl: "//upload-z1.qiniu.com"
}

export default config
