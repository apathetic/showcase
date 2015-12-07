var ejs = require('ejs');
var fs = require('fs');
var noodle = require('noodlejs');
var config = JSON.parse(fs.readFileSync('harp.json', 'utf8'));
var components = config.globals.components;
var path = 'public/components';


/**
 * Deletes all files in the components/ directory
 * @return {void}
 */
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


/**
 * Generates Component pages from JSON data (harp.json)
 * @return {[type]} [description]
 */
function build() {
	console.log('Building new component files...');
	var filename = __dirname + '/public/_partials/component.ejs';
	var template = fs.readFileSync(filename, 'UTF-8');

	for (var component in components) {

		var data = components[component];

		if (data.demo){
			(function(component){
				var content = fs.readFileSync(__dirname + '/components/' + component + '/' + data.demo, 'UTF-8');

				noodle.html.select(content, {
					selector: 'main',
					extract: 'text'
				})
				.then(function(scraped) {
					console.log(scraped);

					try {
						var page = ejs.render(template, {
							prev_page: false,
							next_page: 'a',
							title: data.title,
							content: content,
							filename: filename		// provides context for includes
						});
						fs.writeFile(path + '/' + component, page);
					} catch(e) {
						console.log('Error: missing or incorrect Component data in JSON file', e);
					}
				});
			})(component);
		}
	}

}


module.exports = {
	clean: clean,
	build: build
};
