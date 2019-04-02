---
layout: page
title: 'Portfolio'
permalink: /portfolio/
portfolio: true
notitle: true
---

# Rocket2

[![Github][r2-gh-img]][r2-gh]
[![Build Status][r2-travis-img]][r2-travis]
[![codecov][r2-codecov-img]][r2-codecov]

[![Documentation Status][r2-rtd-img]][r2-rtd]
[![Deployed with Inertia][r2-inertia-img]][r2-inertia]

Rocket2 is a slack bot management utility used for dealing with UBC Launch Pad.
This project was a group effort by a team of people over a few months of the
school year. We have spent <span id="rocket2-months"></span> months on it. It
basically functions as an all-in-one command line that relays commands directed
at our slack bot to our servers.

I helped in designing and implementing our database backend, creating and
automating documentation deployment, automating testing on our database, and
just helping around whereever I could.

For this project, I made sure to include as much documentation as possible, and
the end result was a docs page that was nice to look at.

Technologies used:

- Python 3.7 with pipenv
- Amazon DynamoDB
- Slack
- Docker
- Inertia, an in-house continuous deployment system by UBC Launch Pad

[r2-gh-img]: https://img.shields.io/badge/github-rocket2-green.svg?style=for-the-badge
[r2-gh]: https://github.com/ubclaunchpad/rocket2/
[r2-travis-img]: https://img.shields.io/travis/ubclaunchpad/rocket2.svg?style=for-the-badge
[r2-travis]: https://travis-ci.org/ubclaunchpad/rocket2
[r2-codecov-img]: https://img.shields.io/codecov/c/github/ubclaunchpad/rocket2.svg?style=for-the-badge
[r2-codecov]: https://codecov.io/gh/ubclaunchpad/rocket2
[r2-inertia-img]: https://img.shields.io/badge/deploying%20with-inertia-blue.svg?style=for-the-badge
[r2-inertia]: https://github.com/ubclaunchpad/inertia
[r2-rtd-img]: https://img.shields.io/readthedocs/rocket2.svg?style=for-the-badge
[r2-rtd]: https://rocket2.readthedocs.io/en/latest/?badge=latest

# Y86 Disassembler

[![Github][y86-gh-img]][y86-gh]

This Y86 disassembler was created for the sole purpose of making [one of my labs
more readable][cpsc121-lab]. Y86 is a super-simple CPU with a set of
super-simple instructions that you could probably easily(ish) implement as a
student with "basic(ish)" logic gates. Since reading machine code (even in
hexadecimal format) is extremely tedious, I created this disassembler to help
turn them all into slightly better abstractions.

This was written in Rust because I didn't want many students to be able to mooch
off of my work.

Output for sample file:

```
00: MOV rf & r2 <= 00000001
06: MOV rf & r1 <= 00000005
0c: MOV rf & r0 <= 00000000
12: AND r1, r1
14: JLE 00000022
19: ADD r1, r0
1b: SUB r2, r1
1d: JMP 00000012
22: HALT
```

[y86-gh-img]: https://img.shields.io/badge/github-cpsc121--decomp-green.svg?style=for-the-badge
[y86-gh]: https://github.com/cheukyin699/cpsc121-decomp
[cpsc121-lab]: https://www.ugrad.cs.ubc.ca/~cs121/2018W1/Labs/Lab%209/lab9.pdf

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

# Cellular Automata

[![Github][ca-gh-img]][ca-gh]

Cellular Automata was originally started when my teacher asked me to create a
Game of Life game with Python and pyFLTK. So of course I wanted to extend it. I
actually made 2 - one in Python and another in C++ with FLTK and lua. This is
the one in C++.

Cellular Automata allows you to play around with different types of cellular
automata, such as Game of Life, HighLife, Maze, etc.. You can even make your own
rules and experiment with them yourself.  It can save and load stamps, and even
supports lua scripting to make it easier to generate structures and configure
preferences and settings.

By cross compiling, I generated a Windows executable for windows users so they
can use it too.

[![Smiley Face][ca-gal-t1]][ca-gal-1]
[![Maze][ca-gal-t2]][ca-gal-2]
[![Lua Scripting][ca-gal-t3]][ca-gal-3]

[ca-gh-img]: https://img.shields.io/badge/github-Cellular_Automata-green.svg?style=for-the-badge
[ca-gh]: https://github.com/cheukyin699/Cellular_Automata
[ca-gal-t1]: /res/images/portfolio/thumb/casmiley.png
[ca-gal-t2]: /res/images/portfolio/thumb/maze.png
[ca-gal-t3]: /res/images/portfolio/thumb/lua.png
[ca-gal-1]: /res/images/portfolio/casmiley.png
[ca-gal-2]: /res/images/portfolio/maze.png
[ca-gal-3]: /res/images/portfolio/lua.png

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

# Websites I've Worked on

- [El-Rayes Foundation][web-erf]
- [H.R. Mental Wellness Center][web-hrmwc]

[web-erf]: http://elrayesfoundation.org/
[web-hrmwc]: http://mentalwellnessbc.ca/
