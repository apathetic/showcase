Demo here: [http://apathetic.github.io/showcase/](http://apathetic.github.io/showcase/)

Showcase
=========

A repo to house documentation and examples for all our internal components

  - Come up with an awesome idea
  - Code said idea
  - Show it off in this here Showcase

Version
----

0.3.0


Tech
-----------

The Huge showcase makes use of a number of technologies:

* [Grow.io](http://grow.io/) - awesome static site generator
* [Rollup](http://rollupjs.org/) - compiles ES6 JS assets

It is also assumed that you have both [git](https://git-scm.com/) and [npm](https://www.npmjs.com/) installed.


Installation
--------------

You will need these here things:

```sh
$ curl https://install.growsdk.org | bash
$ git clone git@github.com:hugeinc/showcase.git
$ npm install
```


Run Locally
--------------

```
$ npm start
```


Adding your own Component(s)
-----------

### Content
First, create a ```yaml``` file for your component that will contain various meta-data, description, dates, etc. about your component. Save this in _content/components_. Feel free to copy / paste an existing file for reference i.e. to see which fields are available, etc.

### Template
Next, create the HTML template that will showcase your component. Simply make a ```<component>.html``` page in ```views/components/``` that contains documentation and perhaps a demo.  It should extend the base component.html template. Again, feel free to copy / paste an existing page.


Deploying
--------------

To build and push to apathetic.github.io/showcase:

```sh
$ grow deploy wes
```


License
----

MIT
