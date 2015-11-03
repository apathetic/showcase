var ejs = require('ejs');
var fs = require('fs');
var osmosis = require('osmosis');

var config = JSON.parse(fs.readFileSync('harp.json', 'utf8'));
var components = config.globals.components;
var path = 'public/component';

function clean() {
	// First remove everything in components/
	try { var files = fs.readdirSync(path); }
	catch(e) { console.log('Component pages: nothing to clean'); return; }

	console.log('Cleaning old component files...');
	files.forEach(function(file) {
		var filePath = path + '/' + file;
		if (fs.statSync(filePath).isFile()) {
			fs.unlinkSync(filePath);
		}
	});
}

function build() {

	// Then, generate anew:
	console.log('Building new component files...');
	for (var component in components) {

		var data = components[component];
		var template = fs.readFileSync('public/_partials/component.ejs', 'UTF-8');

		noodle.html.select(data, {
			selector: 'main',
			extract: 'text'
		})
		.then(function (content) {

			var page = ejs.render(template, {
				prev_page: false,
				next_page: 'a',
				title: 'asdf',
				content: content
			});

			title = 'wes';
			content = 'test';

			fs.writeFile(path + '/' + component, page);
		});
	}

}


module.exports = {
	clean: clean,
	build: build
}