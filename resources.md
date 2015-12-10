---
layout: page
title: "Resources"
permalink: /resources/
---

Some links to useful resources.

## Courses

- [Introduction to Haskell (CIS 194)][hs]
- [Functional Programming in Clojure][clj]
- [Functional Programming with OCaml (COS 326)][ml]


## Tutorials

- ncurses Editor Tutorial
<div>
    <ul class="nav nav-pills">
        {% assign pages_list = site.posts %}
        {% assign group = 'ncurses-editor-tutorial' %}
        {% include page_list %}
    </ul>
</div>
- Scrabble Tutorial
<div>
    <ul class='nav nav-pills'>
        {% assign pages_list = site.posts %}
        {% assign group = 'scrabble-tut' %}
        {% include page_list %}
    </ul>
</div>




[hs]: http://www.seas.upenn.edu/~cis194/
[clj]: http://iloveponies.github.io/120-hour-epic-sax-marathon/index.html
[ml]: http://www.cs.princeton.edu/courses/archive/fall14/cos326/
