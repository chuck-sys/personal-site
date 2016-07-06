---
layout: post
title: "Chip-8 is Great, Mate!"
date: "2015-08-10 12:21"
category: status
tags: [status,c++,chip8,assembler,emulator]
---

Rhyming scheme aside, I'm finally somewhat finished the Chip-8 emulator package
that I was working on. Interested people can find the code [here][0]. This
includes:

- the interpreter
- the disassembler
- the assembler

The funny thing is that the assembler's binary size is bigger that the
interpreter's.

This is how I structure the interpreter:

~~~
+------------+          +--------------+            +------------------+
|            |          |   GET AND    |            |                  |
|  READ FILE |  ______\ |   INTERPRET  |  ______\   |  UPDATE TIMERS   |
|            |        / |   OPCODE     |        /   |                  |
+------------+          +--------------+            +------------------+
                                                             |
                              /|\                            |
                               |                             |
                               |                            \|/
                               |                    +-------------------+
                               |                    |                   |
                               \_________________   |  UPDATE DISPLAY   |
                                                    |  ACCORDINGLY      |
                                                    |                   |
                                                    +-------------------+
~~~

Nice ASCII, huh?

This is how I structure the assembler:

~~~
+------------+          +----------------------+           +------------------+
|            |          |   GET AND            |           |  GENERATE OPCODES|
|  OPEN FILE |  ______\ |   PARSE CHARACTERS   |  ______\  | BASED ON THE     |
|            |        / |   INTO TOKENS        |        /  |    TOKENS        |
+------------+          +----------------------+           +------------------+
~~~

The disassembler is basically the interpreter, but rather than execute commands,
it just prints out the mnemonics.

I can say that I am happy with how this turned out. This is the first successful
attempt of me writing an "emulator" as well as an assembler/"compiler".

I am currently working on my second emulation project: The Game Boy. It has
significantly more instructions than the Chip-8 (8-bit instruction set compared
to 2-bit fixed size opcode). I am still working on the LR35902 CPU (because it is the
most straight-forward of them all). Tutorials on the subject of general
emulation may come out at a later date, most likely when I finish the
implementation of major functions of the Game Boy (probable, but unlikely).



[0]: http://github.com/cheukyin699/chip-8-tools/
