---
layout: page
title: "Resources"
group: 'navigation'
permalink: /resources/
---

Some links to useful resources.

## Courses

- [Introduction to Haskell (CIS 194)][hs]
- [Functional Programming in Clojure][clj]
- [Functional Programming with OCaml (COS 326)][ml]


## Tutorials

- ncurses Editor Tutorial
<ul class="nav nav-pills">
    {% assign pages_list = site.posts | reverse %}
    {% assign group = 'ncurses-editor-tutorial' %}
    {% include page_list %}
</ul>

- Scrabble Tutorial
<ul class='nav nav-pills'>
    {% assign pages_list = site.posts | reverse %}
    {% assign group = 'scrabble-tut' %}
    {% include page_list %}
</ul>





[hs]: http://www.seas.upenn.edu/~cis194/
[clj]: http://iloveponies.github.io/120-hour-epic-sax-marathon/index.html
[ml]: http://www.cs.princeton.edu/courses/archive/fall14/cos326/
