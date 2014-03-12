Huge Showcase
=========

A repo to house documentation and examples for all our internal components

  - Come up with an awesome idea
  - Code said idea
  - Show it off in the Huge Showcase
  - Lean back with a sense of smug self satisfaction

Version
----

1.0

Tech
-----------

Huge showcase makes use of a number of technologies:

* [Jekyll] - awesome static blogging
* [Yeoman] - project scaffolding and generators


Installation
--------------

### Before we get started

#### Homebrew

Do you not have [homebrew] yet? Why not? Go get it before we get started. Also if you do have homebrew make sure to go ahead and run 

```sh
$ brew doctor
```

Before we get started to make sure everything is on the up and up.

#### Rvm

Okay, unfortunately this project is going to require ruby which can get nasty. To be safe we're going to go ahead and use [rvm] to ensure we have a walled off version of ruby that's >=1.9.2 and won't be affected by OSX updates or other packages.

```sh
$ \curl -sSL https://get.rvm.io | bash -s stable
```

***
HERE BE DRAGONS
***
Some people *cough* Tim *cough* have had isues with rvm, if for some reason this explodes give the non-gcc version of the install a go

```sh
rvm install 1.9.3 --with-gcc=clang
```

After all that is done, we're going to need the bundler gem

```sh
$ gem install bundler
```

### Okay, now we're ready

```sh
$ ssh://git@stash.hugeinc.com:7999/bower/huge.showcase.git
$ cd huge.showcase
$ bundle install
$ npm i -d
$ bower install
```

### Everything good? Great, let's go

```sh
$ grunt serve
```

### Generating posts

We're going to need my subgenerator to generate post scaffolding

```sh
$ npm install -g jdivock/generator-jekyllrb
```

#### To generate a post
From the project root

```sh
$ yo jekyllrb:post
```

Then just follow the prompts

License
----

MIT


**Free Software, Hell Yeah!**

[Jekyll]:http://jekyllrb.com/
[Yeoman]:http://yeoman.io/
[rvm]:http://rvm.io/
[homebrew]:http://brew.sh
    