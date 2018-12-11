---
layout: post
title: "Tiny BASIC Development - Timeline"
date: "2016-04-17"
excerpt: "Timeline of building a Tiny BASIC interpretor"
category: c++
tags: [c++,basic,TinyBASIC,interpretor,tokenizer]
timeline: true
---

- [Day 1][d1]
- [Day 2][d2]
- [Day 3][d3]
- [Day 4][d4]
- [Day 5][d5]
- [Day 6][d6]
- [Day 7][d7]
- [Day 8][d8]
- [Day 9][d9]

# Day 1

Hi there! You may be wondering:

> Why is there no Day 0???

Well. On day 0, I didn't know if this project had any hope or not, so I didn't
document anything on that day. Unfortunately, Day 0 consists of around 7 days in
"real world time". So we'll start from Day 1

My goal is to understand how interpretors work, by making one, of course. Here,
I will document all of my findings and shortcomings for both me and the program.

## Features

I would like this interpretor to have the following features:

- basic text editing capabilities
- ability to interpret Tiny BASIC source and execute it

While looking around at other people's projects, I found a ~400 line python Tiny
BASIC interpretor that also can compile the source into C code. That would be
nice to have, but we'll see when we finish the interpretor, first.

## Highlights and Thoughts

The tokenizer sometimes relies on spaces and commas to delimit different tokens.
For example, it would report errors on the following `A>B` just because there is
no space between the operator and the variables. This is only an issue with the
variables and (binary) operators, not with numbers in general. You could do `1+2
* 3` and it would parse it just fine.

I may omit the subroutines `STOP`, `PEEK`, `POKE`, `INP`, `OUT`, `WAIT`, `USR`
because they may be a bit tricky to implement.  In general, I don't think I'd
want to deal with parentheses.  We'll see.

On another hand, I finally 'modularized' the `handleInput` function. I split the
commands into their corresponding functions, if they were too long, of course.
There is a general rule I've heard about, stating functions are only good if
they are short and fit onto 1 page.

Here is a [link][day1link] to the furthest I've worked on at that time.

# Day 2

I have completely rewritten the tokenizer :tada: :confetti_ball:! It currently
parses `A>B` correctly into `A`, `>`, and `B`, due to the greedy algorithm I
used. It basically takes the whole string and checks if it is a token, then
takes a substring (size-1) and checks if it is a token, and so on, until you hit
a substring of size 1 (normally meaning binary operator or variable). If it
isn't a token, throw an error.  Unfortunately, this greedy algorithm ups the
complexity of the function to `O(n!), n = len(line)`, making it fairly
inefficient. But hey, there is more correctness, and that's something! It will
be optimized later.

Here is a [link][day2link] to the furthest I've worked on at that time.

# Day 3

This is the day I worked on small bug fixes and a feature implementation. I
added a very concise help-screen which functions more or less like a
minimalistic cheat-sheet, and added another include statement for the (school)
computer I was working on. I also removed some `std::endl`s here and there.
Another command I added was the `edit` command, allowing you to overwrite the
current line with a new one.

I still need to work on optimizations for the tokenizer - if it takes that long,
the interpreting would take **FOREVER**.

Here is a [link][day3link] to the furthest I've worked on at that time.

# Day 4

A test was finally added to help me in testing. It is written in C++ such that
it needs to be compiled into an executable before using. Thus, a new make rule
was created to satisfy such a need. Plans are to have a test for every
component, and to compare the results of consecutive tests to a file.

Here is a [link][day4link] to the furthest I've worked on at that time.

# Day 5

Today, I did it. I did some optimizations for the tokenizer!  Further
optimizations are probably needed, but I have 2 of them down for the count! The
change also set up the playing field for future optimizations. It now checks if
the first letter of the given line is a number, and if it is, it takes all
numerical characters from that point onwards till the next non-numeric character
and converts them all into a number with `string::substr`. It is the same with
all the strings, though I used the `string::find` to get the exact position of
the next quotation mark. The function returns 0 if it uses up the whole line, or
the length of the line it used up. I plan to make it so that if it cannot find
anything of interest, it defaults to returning the length of the smallest
keyword (because why would you want to iterate through so much stuff if it isn't
going to be included anyway). That's the plan, anyway.

I forsee the project finishing by the middle of April, if there aren't too many
unforeseen circumstances that just happen: I'm trying to plan projects with a
fixed deadline in mind - it is 1 month X 1.5. I'm going to adjust that factor
over time, though.

The next thing that I should be working on (after the obvious optimization of
course) is the parser - the thing that turns the list of tokens the tokenizer
outputs, into an Abstract Syntax Tree. Hopefully, I'll know enough about this
that the conversion would go smoothly. If not, well, I've got some quick
learning to do.

Here is a [link][day5link] to the furthest I've worked on at that time.

# Day 6

I finished up the optimizations. Now, after checking for numbers and strings, we
have ruled out everything but the keywords and variables. We know that keywords
are supposed to be at most 6 characters at length, so I added that as a
constant, and made it so that after the inital first check, if it couldn't find
anything, it will reduce the size of the string it is looking at to start
looking for the keyword, and afterwards, binary operators, and finally
variables.

Here is a [link][day6link] to the furthest I've worked on at that time.

# Day 7

> Eagle-eyed viewers may notice that I have actually skipped a day - the WIP day
> in-between this and the last. My reasoning: it is WIP, and the rest was done
> this day - today.

Since it is spring break, I decided to finish up the parser. Well, I did just
that. Unfortunately, there are bugs. One of them is that if you type multiple
commas side-by-side, it will cause the computer to stack overflow, triggering a
segmentation fault. That isn't the biggest of my concerns: I am getting memory
leaks while parsing through everything. The things I'm testing is small enough
that it won't be much of an issue for me. How I set this up makes it, in theory,
to leak exponentially more memory as the input increases because of recursion.
In retrospect, I spent a few hours working on the parser, all to no avail. I
managed to find some other memory-related bugs, but the underlying problem is
still there. This whole project is turning out to be solely a learning
experience than a program I'll come back to and use.

This parser parses tokens recursively, which is probably the issue. It's the
classic solution of breaking down a problem into smaller problems (which is how
all the grammar is working out), and solve the tiny problems, in which case
you've solved the big problem. For this, it first checks if the first token is a
statement, and what kind it is - say a "PRINT" token - and then calls another
function to parse the list of expressions, which, in turn calls the function to
parse a single expression, and so on.

Since it turned out to be a learning experience, I'm planning to go straight
ahead and write the interpreter, even though there is a known bug AND a memory
leak issue.

Here is a [link][day7link] to the furthest I've worked on at that time.

# Day 8

Wow, the interpreter is finished, and from preliminary testing, it works fine!
There probably are more things that I'll have to test because manual testing can
only get you to some places, but it seems to work out nicely. The memory leak
issue is still there, lurking. I spent another hour of my time trying to wring
the leak out, which also didn't work out.

This interpreter goes through the list of parsed Statements and executes them,
much like the parser, in a recursive fashion (well, we are dealing with trees
here). There is a map of global variables [A-Z], and each must be initialized
lest an `std::out_of_range` exception be thrown. Because of the `GOSUB`
statement, I also had to add a stack for all the return statements.  Anyways,
this one took me a lot less time to implement, and a bit less time to think
through, too.

Next, I can either work on small bug fixes and adding more tests, or jump ahead
to the C compiler.  I think I have time for both. At least if I get the compiler
working, there won't be that many memory leaks, right?

Here is a [link][day8link] to the furthest I've worked on at that time.

# Day 9

I considered for a while, and decided to end my project due to a lack of
interest and/or contentment.  All necessary features were implemented (just not
thoroughly tested).

I may add to it from time to time, and you could find the latest updates to this
project by clicking [this link][day9link].

[d1]: #day-1
[d2]: #day-2
[d3]: #day-3
[d4]: #day-4
[d5]: #day-5
[d6]: #day-6
[d7]: #day-7
[d8]: #day-8
[d9]: #day-9

[day1link]: https://github.com/cheukyin699/tinybasic/tree/2c0dd49ce8e9ba0adcabd3b41826f07c80ee4542
[day2link]: https://github.com/cheukyin699/tinybasic/tree/f53901673056ea5dccff79a4da038bb9600c701e
[day3link]: https://github.com/cheukyin699/tinybasic/tree/3879340675819559ba8f954a002db06ad572beda
[day4link]: https://github.com/cheukyin699/tinybasic/tree/2b7c228e2682cc4830e38b0d4655516146afd4df
[day5link]: https://github.com/cheukyin699/tinybasic/tree/008bf20699e3d134373e0595dabcfcb7192d5aca
[day6link]: https://github.com/cheukyin699/tinybasic/tree/0b1471f6488095a07fa615abc5b8f159ee8eac9c
[day7link]: https://github.com/cheukyin699/tinybasic/tree/20bf409279e429f82eaea5a1d705489e998a7412
[day8link]: https://github.com/cheukyin699/tinybasic/tree/b969b3ec20c7b944a85cbebdd22212dd8e4415ff
[day9link]: https://github.com/cheukyin699/tinybasic
