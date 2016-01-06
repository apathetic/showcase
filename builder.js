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

		if (data.useGenerator){
			scrape(component);
		}
	}


	/**
	 * [scrape description]
	 * @param  {[type]} component [description]
	 * @return {[type]}           [description]
	 */
	function scrape(component) {
		var content = fs.readFileSync(__dirname + '/components/' + component + '/' + data.assets.html, 'UTF-8');

		noodle.html.select(content, {
			selector: 'main',
			extract: 'html'
		})
		.then(function(scraped) {
			render(component, scraped.results[0]);
		});
	}


	/**
	 * Generate a Component page from the scraped markup
	 * @param  {String} component The name of the Component
	 * @param  {String} html The HTML to use in the Component demo page
	 * @return {void}
	 */
	function render(component, html) {
		try {
			var page = ejs.render(template, {
				title: data.title,
				// js: data.assets.js,
				// css: data.assets.css,
				content: html,
				filename: filename		// provides context for includes within the template
			});

			// console.log(page);
			// fs.writeFile(path + '/' + component, page);

		} catch(e) {
			console.log('Error: missing or incorrect Component data in JSON file', e);
		}
	}


}


// var argv = a...
// if (clean) {
// 	clean();
// }
//
build();


// module.exports = {
// 	clean: clean,
// 	build: build
// };
