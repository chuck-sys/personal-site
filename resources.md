---
layout: page
title: "Resources"
group: 'navigation'
permalink: /resources/
---

Some links to useful resources.


## Tutorials

- ncurses Editor Tutorial
<ul class="nav nav-pills">
    {% assign group = 'ncurses-editor-tutorial' %}
    {% include page_list.html %}
</ul>

- Scrabble Tutorial
<ul class='nav nav-pills'>
    {% assign group = 'scrabble-tut' %}
    {% include page_list.html %}
</ul>

- Huffman Tutorial
<ul class='nav nav-pills'>
    {% assign group = 'huffman-tutorial' %}
    {% include page_list.html %}
</ul>


## Series

- Arch Linux Series
<ul class="nav nav-pills">
    {% assign pages_list = site.posts | reverse %}
    {% assign group = 'arch-days' %}
    {% include page_list.html %}
</ul>
- [10 Minute Story Challenge][10chal] -
I did this because I was getting stressed out preparing for exams and such.
I was enjoying my resting times too much, and couldn't control myself as well.
With this 10 minute story challenge, I am to come up with a story in 10
minutes, written up. Since I enjoy writing, this isn't considered too
stressful, but actually relaxing. It also helps me learn to write under
pressure, which is a very useful skill to have in exams.




[hs]: http://www.seas.upenn.edu/~cis194/
[clj]: http://iloveponies.github.io/120-hour-epic-sax-marathon/index.html
[ml]: http://www.cs.princeton.edu/courses/archive/fall14/cos326/
[10chal]: /10-min-challenge/
