'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var PostGenerator = module.exports = function Generator(args, options) {

  yeoman.generators.Base.apply(this, arguments);

};

util.inherits(PostGenerator, yeoman.generators.Base);

PostGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  var prompts = [{
      name: 'widgetName',
      message: 'What do you want to call your widget?'
    }, {
      name: 'widgetType',
      type: 'list',
      message: 'What type of widget is this?',
      choices: ['Full Screen', 'Component', 'SASS Mixin']
    }
    /* Maybe later */
    // , {
    //   type: 'checkbox',
    //   name: 'features',
    //   message: 'Which libraries would you like?',
    //   choices: [{
    //     name: 'jQuery',
    //     value: 'includeJQuery',
    //     checked: true
    //   }, {
    //     name: 'Lodash',
    //     value: 'includeLodash',
    //     checked: false
    //   }, {
    //     name: 'Modernizr',
    //     value: 'includeModernizr',
    //     checked: false
    //   }]
    // }
  ];

  this.prompt(prompts, function(props) {
    // var features = answers.features;

    this.widgetName = props.widgetName;
    this.widgetType = props.widgetType;

    // manually deal with the response, get back and store the results.
    // we change a bit this way of doing to automatically do this in the self.prompt() method.
    // this.compassBootstrap = features.indexOf('compassBootstrap') !== -1;
    // this.includeRequireJS = features.indexOf('includeRequireJS') !== -1;
    // this.autoprefixer = features.indexOf('autoprefixer') !== -1;

    cb();
  }.bind(this));

};

PostGenerator.prototype.html = function html() {
  var today = new Date();
  var prefix = today.getFullYear();

  prefix += '-' + ('0' + (today.getUTCMonth() + 1)).slice(-2);
  prefix += '-' + ('0' + today.getDate()).slice(-2);

  this.widgetName = this.widgetName.replace(/ /g, '-');

  if (this.widgetType === 'Full Screen') {

    this.template('conditional/fullPage/_fullPage.html', 'app/_posts/' + prefix + '-' + this.widgetName + '.html');


    this.mkdir('app/js/' + this.widgetName);
    this.mkdir('app/_scss/' + this.widgetName);


    this.copy('conditional/fullPage/_fullPage.js', 'app/js/' + this.widgetName + '/main.js');
    this.copy('conditional/fullPage/_fullPage.scss', 'app/_scss/' + this.widgetName + '/main.scss');

  } else if (this.widgetType === 'Component') {
    this.template('conditional/component/_component.html', 'app/_posts/' + prefix + '-' + this.widgetName + '.html');


    this.mkdir('app/js/' + this.widgetName);
    this.mkdir('app/_scss/' + this.widgetName);


    this.copy('conditional/component/_component.js', 'app/js/' + this.widgetName + '/main.js');
    this.copy('conditional/component/_component.scss', 'app/_scss/' + this.widgetName + '/main.scss');

  } else {
    console.log('Oops, I haven\'t gotten around to implementing this one yet');
  }


};
