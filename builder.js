var ejs = require('ejs');
var fs = require('fs');
var noodle = require('noodlejs');
var config = JSON.parse(fs.readFileSync('harp.json', 'utf8'));
var components = config.globals.components;
var path = 'public/component';


// First remove everything in components/
function clean() {
	console.log('Cleaning old component files...');
	var files;

	try { files = fs.readdirSync(path); }
	catch(e) { console.log('Error: nothing to clean'); return; }

	files.forEach(function(file) {
		var filePath = path + '/' + file;
		if (fs.statSync(filePath).isFile()) {
			fs.unlinkSync(filePath);
		}
	});
}



// Then, generate anew:
function build() {
	console.log('Building new component files...');
	var template = fs.readFileSync('public/_partials/component.ejs', 'UTF-8');

	for (var component in components) {

		var data = components[component];

		noodle.html.select(data.demofiles.index, {
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
};