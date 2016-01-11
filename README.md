Huge Showcase
=========

A repo to house documentation and examples for all our internal components

  - Come up with an awesome idea
  - Code said idea
  - Show it off in the Huge Showcase


TODO
----
- update webpack to pull images from each component

Version
----

0.2.0


Tech
-----------

Huge showcase makes use of a number of technologies:

* [HarpJS] - awesome static site generator
* [webpack] - compiles assets


Installation
--------------

### Quick Version

```sh
$ ssh://git@stash.hugeinc.com:7999/cmpts/showcase.git
$ npm install
$ npm start
```


Adding your own Component
-----------

First, add an entry for your component into the harp.json file.

Next, there are two ways forward: generate your page from a pre-existing repo, or create your own HTML from scratch.

### A) Component-Page Generator

- First, put your fancy component into its own repo and commit it.
- Add a demo page to your repo showcasing all the whirlygigs and fizzbangers of your component
- Add your component repo here, as a submodule. To wit:

```sh
$ cd components
$ git submodule add <your_repo_url>
```

- Lastly, generate a page in the Showcase using the following command. (This will clean previously generated items and recreate them anew. It uses data from harp.json to do so, so make sure the JSON for your component is up to date.)

```sh
$ npm run build
```

**IMPORTANT** There is some opinion-ation on how things need to be structured: you must wrap the salient bits of your demo and documentation in ```<main>```, which will get ripped out and glued the generated page herein, so make sure everything is within this element. Likewise, any Javascript (i.e. DOM ready stuff, inlined demo-specific code, etc.) needs to be within the ```<body>```.


#### Recap:
- ceate demo page in your repo, placing documentation + demo in ```<main>``` element
- use data-nav on each section
- put any Javascript in ```<body>``` (not ```<head>```, as it won't get scraped there).


#### Notes

The default Showcase styles and JS are used, which includes the stickyNav component (if you'd like to use it); it'll look for data-nav attributes on each section and programmatically generate a navigation for you.

Have a look at some of the other submodules if there is any confusion, or ping me directly: whatch@hugeinc.com.

**The generator uses native Promises, so you must use a version of node greater than 0.11.13 to leverage it.**


### B) Roll your own
Simply make your own <component>.html page in public/components/


Updating the Showcase Website
--------------

```sh
$ npm run deploy
```

The builds and pushes to showcase.hugeops.com as well as hugeinc.github.io/showcase



License
----

MIT
