---
layout: page
title: 'Portfolio'
permalink: /portfolio/
notitle: true
---

<style>
h1 {
	margin-top: 50vh;
}

h1:first-of-type {
	margin-top: 0;
}
</style>

# Jump To

[![Github][mygh-img]][mygh]
[![Gitlab][mygl-img]][mygl]
[![Sourcerer.io][mysc-img]][mysc]

[![Linkedin][myld-img]][myld]

In reverse chronological order:

- [2Pic Gallery](#2pic-gallery)
- [Rocket 2](#rocket-2)
- [Jeopardy](#jeopardy)
- [Graph Visualizer](#graph-visualizer)
- [Tom's Parable](#toms-parable)
- [Chip-8 Toolset](#chip-8-toolset)
- [Tinybasic](#tinybasic)
- [Tower Defense](#tower-defense)

[mygh-img]: https://img.shields.io/badge/github-cheukyin699-lightgrey.svg?style=for-the-badge
[mygl-img]: https://img.shields.io/badge/gitlab-chucksys-orange.svg?style=for-the-badge
[mysc-img]: https://img.shields.io/badge/sourcerer-cheukyin699-green.svg?style=for-the-badge
[myld-img]: https://img.shields.io/badge/linkedin-cheukyin-blue.svg?style=for-the-badge

[mygh]: https://github.com/cheukyin699
[mygl]: https://gitlab.com/chucksys
[myld]: https://www.linkedin.com/in/cheukyin
[mysc]: https://sourcerer.io/cheukyin699

# 2Pic Gallery

[![Github][2g-gh-img]][2g-gh]

Or what was previously known as the *Vaccine Passport* app. A simple Android app that toggles between 2
images when you tap the image (or the volume button, whichever is more convenient). Created so that I
would just need to open an app to show my ID and vaccine passport, instead of opening the gallery and
scrolling a bunch. Uses Java.

Decently popular with friends. Apparently they are quite lazy as well.

<a href='https://play.google.com/store/apps/details?id=ca.cheuksblog.twopicgallery&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>
<img height="80" alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'/>
</a>

[2g-gh-img]: https://img.shields.io/badge/github-2pic_gallery-green.svg?style=for-the-badge

[2g-gh]: https://github.com/cheukyin699/2pic-gallery

# Rocket 2

[![Github][r2-gh-img]][r2-gh]
[![codecov][r2-codecov-img]][r2-codecov]

[![Inertia][r2-inertia-img]][r2-inertia]
[![Documentation Status][r2-rtd-img]][r2-rtd]

Rocket 2 is a slack bot management utility used for dealing with UBC Launch Pad.
This project was a group effort by a team of people over a few months of the
school year. We have spent 18 months on it. It basically functions as an
all-in-one command line that relays commands directed at our slack bot to our
servers.

I helped in designing and implementing our database backend, creating and
automating documentation deployment, automating testing on our database, and
just helping around whereever I could.

I also had the pleasure of deploying the project for our club's use, which gave
me a bit of experience in the things that happen when you deploy a project,
such as finding bugs that you would never expect to find, and trying to fix
the broken things as quickly as possible.

For this project, we made sure to include as much documentation as possible, and
the end result was a docs page that was nice to look at.

Technologies used:

- Python 3.8 with pipenv
- Amazon DynamoDB
- Slack and Github libraries
- Lots of linting and `mypy`, a static type checker
- Inertia
- Docker and Docker compose

[Link to in-depth article on the project][r2-medium].

[r2-gh-img]: https://img.shields.io/badge/github-rocket_2-green.svg?style=for-the-badge
[r2-gh]: https://github.com/ubclaunchpad/rocket2/
[r2-ghactions-img]: https://github.com/ubclaunchpad/rocket2/workflows/Python%20build%20and%20test/badge.svg
[r2-ghactions]: https://github.com/ubclaunchpad/rocket2/actions
[r2-codecov-img]: https://img.shields.io/codecov/c/github/ubclaunchpad/rocket2.svg?style=for-the-badge
[r2-codecov]: https://codecov.io/gh/ubclaunchpad/rocket2
[r2-inertia-img]: https://img.shields.io/badge/deploying%20with-inertia-blue.svg?style=for-the-badge
[r2-inertia]: https://github.com/ubclaunchpad/inertia
[r2-rtd-img]: https://img.shields.io/readthedocs/rocket2.svg?style=for-the-badge
[r2-rtd]: https://rocket2.readthedocs.io/en/latest/?badge=latest
[r2-medium]: https://medium.com/ubc-launch-pad-software-engineering-blog/rocket-2-and-the-importance-of-good-software-development-practices-documentation-and-testing-fe6b7236fce0

# Jeopardy

[![Gitlab][jpd-gl-img]][jpd-gl]
[![Website][jpd-web-img]][jpd-web]
[![Youtube][jpd-yt-img]][jpd-yt]

During COVID-19 quarantine, we played games with friends/fellowship over Zoom.
I had my first game of Jeopardy over Zoom. It went adequately well, and the
game was presented over PowerPoint. But that got me thinking: what if there was
a more efficient way to create, share, and present Jeopardy-style games? And
that's how this little project was born. Seeing that there was no good Jeopardy
editor/player, I decided to make my own.

Technologies used:

- VueJS
- Typescript

I wanted the tool to be simple and cross-platform so that everyone could easily
use it, which is why I made it a web-based serverless app. I placed heavy
emphasis on the user experience, which is why I took strides to have a few
people (who have also made Jeopardy games) test it out without help and gather
feedback. The feedback proved to be extremely valuable in improving the
ease-of-use of the app.

[jpd-gl-img]: https://img.shields.io/badge/gitlab-graph--visualizer-green.svg?style=for-the-badge
[jpd-gl]: https://gitlab.com/chucksys/jeopardy-vue
[jpd-web-img]: https://img.shields.io/website?style=for-the-badge&url=https%3A%2f%2Fjeopardy.cheuksblog.ca
[jpd-web]: https://jeopardy.cheuksblog.ca
[jpd-yt-img]: https://img.shields.io/badge/video-youtube-red?style=for-the-badge
[jpd-yt]: https://youtu.be/RnRrs5neEMo

# Graph Visualizer

[![Github][gv-gh-img]][gv-gh]
[![Website][gv-web-img]][gv-web]

A small project that spiralled to a medium-sized project. Spawned from the idea
of trying to draw the mutual friendships between my Facebook friends. Seeing
that there were no good and free online graphing tools available, I decided to
make my own.

This project makes use of 2 libraries: p5js to draw the graphs, and matterjs
for physics. I chose to strap a physics engine to this project because it made
allocating space and handling collision for the nodes and edges of a graph
trivial.

The minor amount of DOM manipulation is done with pure JavaScript instead of
other external libraries to decrease bloat.

I experimented with UX by adding tutorials that trigger when you do certain
actions. For example, a tutorial would trigger when you delete a node, telling
you how to delete edges; the tutorial won't trigger if you have already deleted
an edge.

[![A small graph][gv-small-thumb]][gv-small-img]
[![A bigger graph][gv-big-thumb]][gv-big-img]

[gv-gh-img]: https://img.shields.io/badge/github-graph--visualizer-green.svg?style=for-the-badge
[gv-gh]: https://github.com/cheukyin699/graph-viz-js
[gv-web-img]: https://img.shields.io/website?style=for-the-badge&url=https%3A%2f%2Fgraphviz.cheuksblog.ca
[gv-web]: https://graphviz.cheuksblog.ca

[gv-small-thumb]: /res/images/portfolio/thumb/gv-small.png
[gv-small-img]: /res/images/portfolio/gv-small.png
[gv-big-thumb]: /res/images/portfolio/thumb/gv-big.png
[gv-big-img]: /res/images/portfolio/gv-big.png

# Tom's Parable

[![Github][tp-gh-img]][tp-gh]
[![Youtube trailer][tp-trailer-img]][tp-trailer]

This is, to this point, the only group programming project consisting of 4
people that I'm proud of. Tom's Parable is a game where you investigate a
murder mystery within a university similar to Trinity Western. The game was
made almost completely from scratch in Unity (apart from a JSON deserializer
from the internet). I was the only programmer in the project, and thus designed
the architecture, mechanics, and most of the experience.

This project is fairly modular in that all the dialog is handled with JSON
files. This means that you can easily change the story by adding or subtracting
dialog from the corresponding JSON files. A basic control system is also
implemented with the JSON, so one could add new rooms and the dialog for the
rooms separately.

Feel free to [download][tp-downloadexe] the latest (and only usable) release
and play around with it a little. Windows only.

[![Tom's Parable title screen][tp-title-thumb]][tp-title-img]
[![Tom's Parable title screen][tp-room-thumb]][tp-room-img]
[![Tom's Parable title screen][tp-dead-thumb]][tp-dead-img]

[tp-gh-img]: https://img.shields.io/badge/github-operation--omega-green.svg?style=for-the-badge
[tp-gh]: https://github.com/cheukyin699/operation-omega/
[tp-trailer-img]: https://img.shields.io/badge/trailer-youtube-red?style=for-the-badge
[tp-trailer]: https://youtu.be/LoFFHOdB3xo
[tp-downloadexe]: https://github.com/cheukyin699/operation-omega/releases/tag/v1.0.0
[tp-title-thumb]: /res/images/portfolio/thumb/tp-titlescreen.png
[tp-room-thumb]: /res/images/portfolio/thumb/tp-room.png
[tp-dead-thumb]: /res/images/portfolio/thumb/tp-dead.png
[tp-title-img]: /res/images/portfolio/tp-titlescreen.png
[tp-room-img]: /res/images/portfolio/tp-room.png
[tp-dead-img]: /res/images/portfolio/tp-dead.png

# Chip-8 Toolset

[![Github][c8-gh-img]][c8-gh]
[![Travis][c8-travis-img]][c8-travis]
[![Codecov][c8-codecov-img]][c8-codecov]

I created the Chip-8 Toolset to learn more about emulation and interpreting.
Inside is an emulator that runs Chip-8 binaries, a disassembler to disassemble
binaries into assembler code, and an assembler to build binaries yourself, if
you so choose.

I built this program with C++ on top of SFML. The disassembler was made because
I wanted a reliable way to debug the emulator. I didn't plan on making the
assembler because I thought that it was too complex, but since at the time I had
already built the disassembler, I thought "why not", and went ahead doing it
anyway.

In addition to being able to turn mnemonics into opcodes, the assembler can also
handle symbols/labels by storing their positions and bringing them up if needed.

[![Blinker Program][c8-gal-t1]][c8-gal-1]
[![Tetris Program][c8-gal-t2]][c8-gal-2]
[![Pong Program][c8-gal-t3]][c8-gal-3]
[![Brix Program][c8-gal-t4]][c8-gal-4]

[c8-gh-img]: https://img.shields.io/badge/github-chip--8--tools-green.svg?style=for-the-badge
[c8-gh]: https://github.com/cheukyin699/chip-8-tools
[c8-travis-img]: https://img.shields.io/travis/cheukyin699/chip-8-tools.svg?style=for-the-badge
[c8-travis]: https://travis-ci.org/cheukyin699/chip-8-tools
[c8-codecov-img]: https://img.shields.io/codecov/c/github/cheukyin699/chip-8-tools.svg?style=for-the-badge
[c8-codecov]: https://codecov.io/gh/cheukyin699/chip-8-tools
[c8-gal-t1]: /res/images/portfolio/thumb/blinker.png
[c8-gal-t2]: /res/images/portfolio/thumb/tetris.png
[c8-gal-t3]: /res/images/portfolio/thumb/pong.png
[c8-gal-t4]: /res/images/portfolio/thumb/brix.jpg
[c8-gal-1]: /res/images/portfolio/blinker.png
[c8-gal-2]: /res/images/portfolio/tetris.png
[c8-gal-3]: /res/images/portfolio/pong.png
[c8-gal-4]: /res/images/portfolio/brix.jpg

# Tinybasic

[![Github][tb-gh-img]][tb-gh]

tinybasic was made because I wanted to learn a bit about parsing. I didn't use
lexing libraries for obvious reasons. I wanted to get a better feel of how
interpreters (and compilers) work under the hood. I chose the (arguably) easiest
language to implement, and just read up a bit on parsing.

The idea is to use recursion to turn a string into a list of tokens, parse
through the list of tokens and turn that into an abstract syntax tree, and
execute it.

I have to admit that it isn't perfect, and that it sometimes seg. faults while
running (probably need more tests). But it runs most of the time, and that's
what counts. And besides, this was just a teaching tool.

[![Tinybasic Prompt][tb-gal-t1]][tb-gal-1]

[tb-gh-img]: https://img.shields.io/badge/github-tinybasic-green.svg?style=for-the-badge
[tb-gh]: https://github.com/cheukyin699/tinybasic
[tb-gal-t1]: /res/images/portfolio/thumb/tbasic_pmpt.jpg
[tb-gal-1]: /res/images/portfolio/tbasic_pmpt.jpg

# Tower Defense

[![Github][td-gh-img]][td-gh]

Tower Defense is my attempt at cloning a modern tower defense game.
I made it as a kind of 'proof of concept', which is why most things
are implemented, but not extended. It is written in Python and pygame.

This game heavily relies on JSON configuration files for all of it's
sprites, enemy informations, and user preferences. I wrote it with
modularity in mind, so that you could easily extend on game features
such as enemies, towers, sprites, and even maps.

One of the things I had to do was to implement an event handling
system because of buttons. The implementation ended up looking a lot
like pyFLTK's.

[![Main Menu][td-gal-t1]][td-gal-1]
[![Sandbox Mode][td-gal-t2]][td-gal-2]
[![Sandbox Mode][td-gal-t3]][td-gal-3]
[![Sandbox Mode][td-gal-t4]][td-gal-4]
[![Freeplay Mode][td-gal-t5]][td-gal-5]

[td-gh-img]: https://img.shields.io/badge/github-tower--defence-green.svg?style=for-the-badge
[td-gh]: https://github.com/cheukyin699/tower-defence
[td-gal-t1]: /res/images/portfolio/thumb/td-menu.png
[td-gal-t2]: /res/images/portfolio/thumb/td-sandbox.jpg
[td-gal-t3]: /res/images/portfolio/thumb/td-sandboxplay1.jpg
[td-gal-t4]: /res/images/portfolio/thumb/td-sandboxplay2.jpg
[td-gal-t5]: /res/images/portfolio/thumb/td-fpplaying.jpg
[td-gal-1]: /res/images/portfolio/td-menu.png
[td-gal-2]: /res/images/portfolio/td-sandbox.jpg
[td-gal-3]: /res/images/portfolio/td-sandboxplay1.jpg
[td-gal-4]: /res/images/portfolio/td-sandboxplay2.jpg
[td-gal-5]: /res/images/portfolio/td-fpplaying.jpg
