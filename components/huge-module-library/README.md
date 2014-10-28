# Huge Reusable Code Repo Constructs and guidelines

## Purpose
Build a library of reusable components that developers can pull into their projects and leverage as necessary. The components should be library/framework agnostic, be DOM agnostic, have minimal dependencies and simple enough to use with minimal efforrt.

## Constructs
There are two main types of core objects currently under consideration. Additional objects can be created when necessary and added to the core constructs.

### Modules
Modules contain the core functionality (behaviors) required by the component. The API should be simple and only provides methods for triggering the component functionality. For example if a component has functionality that changes a classname on an element, the function to change the classname should exist within the module, but any DOM event binding should happen outside the module. The module does not care about how the UI interacts with its behaviors. Any DOM elements used by the module should be passed in explicitely rather than getting retrieved within the module code. This approach allows the DOM structure to be completely flexible.

Each module should inherit methods and properties from the base Module object. This will attach a new mediator (pubsub) object that will provide hooks into module functionality.

### UI Bridges
UI Bridges connect a Module with a given UI. UiBridges are coupled directly to a given module, but this coupling is one way. While the UI Bridge uses the Module it should never augment the module in any way.

UI Bridges receive the module instance as the first, sometimes only argument. Similar to Modules UI Bridges should strive to be as decoupled from the DOM strucutre as possible, but within reason. For example, the UI bridge should now traverse the DOM to find specific elements on which to bind events. Instead individual elements should be passed in for binding or a root element should receive the binding and classnames used for delegation.

### Generic objects
Regular JavaScript object can also be constructed for specific functionality, but should follow the principals described above.


## Development of new Objects
New modules should be created using the core constructs of Modules and UI Bridges. We should use prototypes to allow for easier inheritance, unit testing and end to end testing. JS Hint will keep our code style consistent across all components. As mentioned We will test the shit out of all components to minimize the impact on QA and developers using the modules in their project. In addition to testing we'll need to fully document the object, methods and properties so developers fully understand what is going on inside.

After Modules and UI Bridges ave been developed, tested and documented, we will create a corresponding documentation page that will live on github. These pages will provide all the necessary information for others to use our modules in their projects. Page structure recommendations and styleguide are forthcoming.

### Code Guidelines
TBD.


## Usage
"I have a project that I'd like to use these modules on. How do I do that?"

### Option 1 - [basic usage](demo-basic.html)

1. Include the repo in your project (@TODO: 2)
2. Create a new instance of the included Module.
3. Add DOM listeners and/or hooks into the functionality.

#### Carousel HTML
    <ul class="carousel carousel-2">
      <li class="slide"><img src="http://placehold.it/300x250/f00/000"></li>
      <li class="slide"><img src="http://placehold.it/300x250/0f0/000"></li>
      <li class="slide"><img src="http://placehold.it/300x250/00f/fff"></li>
      <li class="slide"><img src="http://placehold.it/300x250/a00/fff"></li>
      <li class="slide"><img src="http://placehold.it/300x250/00a/fff"></li>
    </ul>

#### Navigation HTML
    <div class="navigation">
      <span class="button cnav-prev">Previous</span>
      <span class="button cnav-next">Next</span>
    </div>

#### CSS
    .carousel {
      height: auto;
      overflow: hidden;
      padding: 0 0 83.3333%;
      position: relative;
      width: 100%;
    }

    .carousel li {
      list-style: none;
      margin: 0;
    }

    .carousel .slide {
      position: absolute;
      top: 0;
      width: 100%;
      -webkit-transition: -webkit-transform 1s;
    }

    .carousel img {
      height: auto;
      width: 100%;
    }

    .carousel .active {
      -webkit-transform: translate3d(0, 0, 0);
      z-index: 10;
    }

    .carousel .prev {
      -webkit-transform: translate3d(-100%, 0, 0);
    }

    .carousel .next {
      -webkit-transform: translate3d(100%, 0, 0);
    }

#### JS
    // get the necessary DOM elements
    var carouselElement = document.getElementsByClassName('carousel')[0];
    var prevButtonElement = document.getElementsByClassName('cnav-prev')[0];
    var nextButtonElement = document.getElementsByClassName('cnav-next')[0];

    // instantiate the carousel
    var carousel = new Carousel(carouselElement);

    // attach listeners to DOM elements to allow manipulation of hte carousel
    prevButtonElement.addEventListener('click', function(e) {
      carousel.previous();
    });
    nextButtonElement.addEventListener('click', function(e) {
      carousel.next();
    });


### Option 2 - [basic usage with a ui bridge](demo-basic-with-bridge.html)

1. Include the repo in your project (@TODO: 2)
2. Create a new instance of the included Module.
3. Create new instances on the DOM bridge(s) as necessary.

#### Carousel HTML (Same as Option 1)
    <ul class="carousel carousel-2">
      <li class="slide"><img src="http://placehold.it/300x250/f00/000"></li>
      <li class="slide"><img src="http://placehold.it/300x250/0f0/000"></li>
      <li class="slide"><img src="http://placehold.it/300x250/00f/fff"></li>
      <li class="slide"><img src="http://placehold.it/300x250/a00/fff"></li>
      <li class="slide"><img src="http://placehold.it/300x250/00a/fff"></li>
    </ul>

#### Navigation HTML (Same as Option 1)
    <div class="navigation">
      <span class="button cnav-prev">Previous</span>
      <span class="button cnav-next">Next</span>
    </div>

#### Navigation HTML
    <div class="pagination">
      <span class="button goto" data-slide-id="0">1</span>
      <span class="button goto" data-slide-id="1">2</span>
      <span class="button goto" data-slide-id="2">3</span>
      <span class="button goto" data-slide-id="3">4</span>
      <span class="button goto" data-slide-id="4">5</span>
    </div>

#### CSS (Same as Option 1)
    .carousel {
      height: auto;
      overflow: hidden;
      padding: 0 0 83.3333%;
      position: relative;
      width: 100%;
    }

    .carousel li {
      list-style: none;
      margin: 0;
    }

    .carousel .slide {
      position: absolute;
      top: 0;
      width: 100%;
      -webkit-transition: -webkit-transform 1s;
    }

    .carousel img {
      height: auto;
      width: 100%;
    }

    .carousel .active {
      -webkit-transform: translate3d(0, 0, 0);
      z-index: 10;
    }

    .carousel .prev {
      -webkit-transform: translate3d(-100%, 0, 0);
    }

    .carousel .next {
      -webkit-transform: translate3d(100%, 0, 0);
    }

#### JS
    // get the necessary DOM elements
    var carouselElement = document.getElementsByClassName('carousel')[0];
    var navigationContainerElement = document.getElementsByClassName('navigation')[0];
    var paginationContainerElement = document.getElementsByClassName('pagination')[0];

    // instantiate the carousel & UI Bridges
    var carousel = new Carousel(carouselElement);
    var carouselNavigation = new Navigation(carousel, navigationContainerElement, 'cnav-prev', 'cnav-next');
    var carouselPagination = new Pagination(carousel, paginationContainerElement, 'goto', 'data-slide-id');


### Option 3 - [Inherit Huge objects for your project](demo-inheritance.html)

1. Include the repo in your project (@TODO: 2)
2. Inherit the Huge Carousel and add custom extensions as necessary.
3. Create new instances of your project carousel as necessary.

#### Carousel HTML (Same as Option 1 & 2)
    <ul class="carousel carousel-2">
      <li class="slide"><img src="http://placehold.it/300x250/f00/000"></li>
      <li class="slide"><img src="http://placehold.it/300x250/0f0/000"></li>
      <li class="slide"><img src="http://placehold.it/300x250/00f/fff"></li>
      <li class="slide"><img src="http://placehold.it/300x250/a00/fff"></li>
      <li class="slide"><img src="http://placehold.it/300x250/00a/fff"></li>
    </ul>

#### Navigation HTML (Same as Option 1 & 2)
    <div class="navigation">
      <span class="button cnav-prev">Previous</span>
      <span class="button cnav-next">Next</span>
    </div>

#### Navigation HTML (Same as Option 2)
    <div class="pagination">
      <span class="button goto" data-slide-id="0">1</span>
      <span class="button goto" data-slide-id="1">2</span>
      <span class="button goto" data-slide-id="2">3</span>
      <span class="button goto" data-slide-id="3">4</span>
      <span class="button goto" data-slide-id="4">5</span>
    </div>

#### Addition interface html
    <span class="button jump-to-center">jump to center slide</span>

#### CSS (Same as Option 1 & 2)
    .carousel {
      height: auto;
      overflow: hidden;
      padding: 0 0 83.3333%;
      position: relative;
      width: 100%;
    }

    .carousel li {
      list-style: none;
      margin: 0;
    }

    .carousel .slide {
      position: absolute;
      top: 0;
      width: 100%;
      -webkit-transition: -webkit-transform 1s;
    }

    .carousel img {
      height: auto;
      width: 100%;
    }

    .carousel .active {
      -webkit-transform: translate3d(0, 0, 0);
      z-index: 10;
    }

    .carousel .prev {
      -webkit-transform: translate3d(-100%, 0, 0);
    }

    .carousel .next {
      -webkit-transform: translate3d(100%, 0, 0);
    }

#### JS
    // Extend the Huge Carousel
    var MyProjectCarousel = function(rootElem) {
      Huge.parent(this, rootElem, 'li.slide');

      this.myCarouselProperty = 'awesome';
    }
    Huge.inherit(MyProjectCarousel, Carousel);

    MyProjectCarousel.prototype.next = function() {
      console.log('i added new functionality to the next method!');
      Huge.parent(this, 'next');
    };

    MyProjectCarousel.prototype.jumpToCenterSlide = function() {
      // do something
      this.goTo(Math.floor((carousel.slides.length - 1)/2));
    }

    // instantiate the carousel
    var carousel = new MyProjectCarousel(document.querySelector('.carousel-wrapper'));
    var carouselNavigation = new Navigation(carousel, carousel.rootElem, 'cnav-prev', 'cnav-next');
    var carouselPagination = new Pagination(carousel, carousel.rootElem, 'goto', 'data-slide-id');

    var centerTrigger = carousel.rootElem.querySelector('.jump-to-center')
    centerTrigger.addEventListener('click', function(e) {
      carousel.jumpToCenterSlide();
    });

### Option 4 - [Create a project object composed of a Huge object and custom code](demo-composition.html)

1. Include the repo in your project (@TODO: 2)
2. Construct a new object which uses the Huge object.
3. Add custom methods to your object
4. Create new instances of your project carousel as necessary.

#### Carousel HTML (Same as Option 1 & 2 & 3)
    <ul class="carousel carousel-2">
      <li class="slide"><img src="http://placehold.it/300x250/f00/000"></li>
      <li class="slide"><img src="http://placehold.it/300x250/0f0/000"></li>
      <li class="slide"><img src="http://placehold.it/300x250/00f/fff"></li>
      <li class="slide"><img src="http://placehold.it/300x250/a00/fff"></li>
      <li class="slide"><img src="http://placehold.it/300x250/00a/fff"></li>
    </ul>

#### Navigation HTML (Same as Option 1 & 2 & 3)
    <div class="navigation">
      <span class="button cnav-prev">Previous</span>
      <span class="button cnav-next">Next</span>
    </div>

#### Navigation HTML (Same as Option 2 & 3)
    <div class="pagination">
      <span class="button goto" data-slide-id="0">1</span>
      <span class="button goto" data-slide-id="1">2</span>
      <span class="button goto" data-slide-id="2">3</span>
      <span class="button goto" data-slide-id="3">4</span>
      <span class="button goto" data-slide-id="4">5</span>
    </div>

#### Addition interface html (Same as Option 3)
    <span class="button jump-to-center">jump to center slide</span>

#### CSS (Same as Option 1 & 2)
    .carousel {
      height: auto;
      overflow: hidden;
      padding: 0 0 83.3333%;
      position: relative;
      width: 100%;
    }

    .carousel li {
      list-style: none;
      margin: 0;
    }

    .carousel .slide {
      position: absolute;
      top: 0;
      width: 100%;
      -webkit-transition: -webkit-transform 1s;
    }

    .carousel img {
      height: auto;
      width: 100%;
    }

    .carousel .active {
      -webkit-transform: translate3d(0, 0, 0);
      z-index: 10;
    }

    .carousel .prev {
      -webkit-transform: translate3d(-100%, 0, 0);
    }

    .carousel .next {
      -webkit-transform: translate3d(100%, 0, 0);
    }

#### JS
    // Create a new object for your project that instantiates the carousel and interfaces
    var MyProjectCarousel = function(container) {
      var carousel, carouselNavigation, carouselPagination;

      carousel = new Carousel(container, 'li.slide');

      // augment functionality via hooks
      carousel.mediator.subscribe('beforeNext', function(carousel) {
        console.log('i added new functionality to the next method!');
      });

      this.rootElem = carousel.rootElem;

      this.next = function() {
        carousel.next();
      };

      this.previous = function() {
        carousel.previous();
      };

      this.goTo = function(index) {
        carousel.goTo(index);
      };

      // add custom methods
      this.jumpToCenterSlide = function() {
        this.goTo(Math.floor((carousel.slides.length - 1)/2));
      };
    };

    // instantiate the carousel
    var carousel = new MyProjectCarousel(document.querySelector('.carousel-wrapper'));
    var carouselNavigation = new Navigation(carousel, carousel.rootElem, 'cnav-prev', 'cnav-next');
    var carouselPagination = new Pagination(carousel, carousel.rootElem, 'goto', 'data-slide-id');

    var centerTrigger = carousel.rootElem.querySelector('.jump-to-center')
    centerTrigger.addEventListener('click', function(e) {
      carousel.jumpToCenterSlide();
    });

### Option 5 - [jQuery plugin](demo-jquery.html)

1. Include the repo in your project (@TODO: 2)
2. Create a jQuery plugin wrapper
3. Inside the each iterator instantiate the plugin and interfaces with appropriate options
4. Apply the plugin to a jQuery element collection.

#### Carousel HTML (Same as Option 1 & 2 & 3 & 4)
    <ul class="carousel carousel-2">
      <li class="slide"><img src="http://placehold.it/300x250/f00/000"></li>
      <li class="slide"><img src="http://placehold.it/300x250/0f0/000"></li>
      <li class="slide"><img src="http://placehold.it/300x250/00f/fff"></li>
      <li class="slide"><img src="http://placehold.it/300x250/a00/fff"></li>
      <li class="slide"><img src="http://placehold.it/300x250/00a/fff"></li>
    </ul>

#### Navigation HTML (Same as Option 1 & 2 & 3 & 4)
    <div class="navigation">
      <span class="button cnav-prev">Previous</span>
      <span class="button cnav-next">Next</span>
    </div>

#### Navigation HTML (Same as Option 2 & 3 & 4)
    <div class="pagination">
      <span class="button goto" data-slide-id="0">1</span>
      <span class="button goto" data-slide-id="1">2</span>
      <span class="button goto" data-slide-id="2">3</span>
      <span class="button goto" data-slide-id="3">4</span>
      <span class="button goto" data-slide-id="4">5</span>
    </div>

#### CSS (Same as Option 1 & 2)
    .carousel {
      height: auto;
      overflow: hidden;
      padding: 0 0 83.3333%;
      position: relative;
      width: 100%;
    }

    .carousel li {
      list-style: none;
      margin: 0;
    }

    .carousel .slide {
      position: absolute;
      top: 0;
      width: 100%;
      -webkit-transition: -webkit-transform 1s;
    }

    .carousel img {
      height: auto;
      width: 100%;
    }

    .carousel .active {
      -webkit-transform: translate3d(0, 0, 0);
      z-index: 10;
    }

    .carousel .prev {
      -webkit-transform: translate3d(-100%, 0, 0);
    }

    .carousel .next {
      -webkit-transform: translate3d(100%, 0, 0);
    }

#### JS
    // wrap the constructor in the plugin framework
    $.fn.myProjectCarousel = function(options) {

      // set defaults
      var defaults = {
        slidesSelector: '.slide',
        nextButtonClassName: 'cnav-next',
        prevButtonClassName: 'cnav-prev',
        gotoButtonClassName: 'goto',
        gotoSlideIdAttribute: 'data-slide-id'
      };

      // extend defaults with options
      var config = $.extend(defaults, options);

      return this.each(function() {
        // instantiate the object for each element
        var carousel = new Carousel(this, config.slidesSelector);
        var carouselNavigation = new Navigation(carousel, carousel.rootElem, config.prevButtonClassName,
            config.nextButtonClassName);
        var carouselPagination = new Pagination(carousel, carousel.rootElem, config.gotoButtonClassName,
            config.gotoSlideIdAttribute);
      });
    };

    // Apply the plugin to a jQuery collection
    $('.carousel-wrapper').myProjectCarousel();


## Publishing
Modules should be published first to Stash where we can develop the initial module and spread it around the company. After the module is deemed stable (by the sr devs?) it will be published up to GitHub for public consumption.


## Roadmap
1. Create a Yeoman (or similar) generator for the component boilerplate
2. Add a build system that generates UMD compliant files (AMD, CommonJS, Globals) and solves issues for dependency management & configuration when using RequireJS.
