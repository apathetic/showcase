Huge Showcase
=========

A repo to house documentation and examples for all our internal components

  - Come up with an awesome idea
  - Code said idea
  - Show it off in the Huge Showcase
  - Lean back with a sense of smug self satisfaction


TODO
----
- add todos

Version
----

0.2.0


Tech
-----------

Huge showcase makes use of a number of technologies:

* [HarpJS] - awesome static site generator


Installation
--------------

### Quick Version

```sh
$ ssh://git@stash.hugeinc.com:7999/cmpts/showcase.git
$ npm install
$ npm run server
```


Adding your own Component
-----------

There are two ways to go about it: generate you page from some JSON and a pre-existing repo, or create your own.

### A) Component-Page Generator

- First, put your fancy component into its own repo and commit it.
- Add a demo page to your repo showcasing all the whirlygigs and fizzbangers of your component
- Add your component repo here, as a submodule. To wit:

```sh
$ cd components
$ git submodule add <your_repo_url>
```

**IMPORTANT** There is some opinionation on how things need to be structured: you must wrap the salient bits in ```<main>```, which will get ripped out and glued into each generated page herein, so make sure your documentation, demo, etc. are all with this element.


Next, update all component demo pages by running the following command. This will clean previously generated items and recreate them anew. It uses data from harp.json to do so, so make sure the JSON for your component is up to date.

```sh
$ npm run build
```


Recap:
- wrap documentation + demo in <main>
- use data-nav on each section
- put any scripts, etc. in <body> (not <head>, as they won't get scraped there).


##### Notes

The default Showcase styles and JS are used, which includes the stickyNav component (if you'd like to use it); it'll look for data-nav attributes on each section and programmatically generate a navigation for you.

Have a look at some of the other submodules if there is any confusion, or ping me directly: whatch@hugeinc.com.

**The generator uses native Promises, so you must use a version of node greater than 0.11.13 to leverage it.**


### B) Roll your own
Simply make your own <component>.html page in public/components/


Updating the Showcase Website
--------------

Simply:

```sh
$ npm run deploy
```

The builds and pushes to showcase.hugeops.com as well as hugeinc.github.io/showcase


Miscellany
----------------------

- ...


License
----

MIT
