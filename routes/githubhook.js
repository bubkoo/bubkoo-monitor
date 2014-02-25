var process = require('child_process');

// 处理 github 的 webhook 的 post 请求
exports.githubhook = function(req, res) {
	var payload;



	console.log('[deploy status] payload parse start');
	try {
		// 获取 payload 对象
		if (typeof req.body.payload === 'object') {
			payload = req.body.payload;
		} else {
			payload = JSON.parse(req.body.payload);
		}
	} catch (e) {
		console.log('[deploy status] payload parse error');
		return res.send('[deploy status] payload parse error');
	}

	console.log('[deploy status] payload parse end');

	if (payload && payload.ref && payload.ref.match('master')) {
		console.log('[deploy status] deploy server');
		res.send('[deploy status] deploy server');

		// 调用批处理从 github 上拉取最新代码
		// process.execFile('pull.bat', null, {}, function(error, stdout, stderr) {
		// 	if (error) {
		// 		console.log('[deploy error] ' + error);
		// 	}
		// 	if (stdout) {
		// 		console.log('[deploy stdout] ' + stdout);
		// 	}
		// 	if (stderr) {
		// 		console.log('[deploy stderr] ' + stderr);
		// 	}
		// });

		// 直接调用 git pull 命令
		process.exec('git pull', function(error, stdout, stderr) {
			if (error) {
				console.log('[deploy error] ' + error);
			}
			if (stdout) {
				console.log('[deploy stdout] ' + stdout);
			}
			if (stderr) {
				console.log('[deploy stderr] ' + stderr);
			}
		});

	} else {
		console.log('[deploy status] deploy server NOT in master branch');
		res.send('[deploy status] deploy server NOT in master branch');
	}
};