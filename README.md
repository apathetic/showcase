Showcase
=========

A repo to house documentation and examples for all our internal components

  - Come up with an awesome idea
  - Code said idea
  - Show it off in this here Showcase


TODO
----


Version
----

0.2.0


Tech
-----------

Huge showcase makes use of a number of technologies:

* [Grow.io] - awesome static site generator
* [Rollup] - compiles ES6 JS assets


Installation
--------------

### Quick Version

You will need pip and npm:

```sh
$ pip install grow
$ ssh://git@stash.hugeinc.com:7999/cmpts/showcase.git
$ npm install
$ npm run watch
$ grow run
```


Adding your own Component
-----------

First, add an entry for your component into the data.json file. Then, create your page... it may be
easiest to copy / paste and existing page for reference.

### Save it
Simply make your own <component>.html page in public/components/


Updating the Showcase Website
--------------

```sh
$ grow deploy showcase
```

...this builds and pushes to showcase.hugeops.com.


```sh
$ grow deploy github
```

...will build and push to hugeinc.github.io/showcase



License
----

MIT
