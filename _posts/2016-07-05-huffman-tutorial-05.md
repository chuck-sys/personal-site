---
layout: series
title: Huffman Tutorial Part 5
date: "2016-07-05 20:45"
excerpt: >
    A quickie on the decoder part. And some final words. Those are important.
category: Huffman
group: huffman-tutorial
shortname: Part 5
tags: [c++,Huffman,decoder,decompression]
---

If you have arrived at this point, it is assumed that you have slaved through
the parts previous to this one in the series. You may have spent a lot of time -
ranging from a week to half a month - on this (rather large) endeavor. And if
you have made it through, :confetti_ball: **CONGRATULATIONS** :confetti_ball:!
Good work. Now, here is a way to test that your encoder works: by decoding it!

## Quick Run-Down of How it Works

Should be rather straightforward:

1. Read the binary
2. Take up the header information
3. Using the header information, (re)construct the Huffman tree
4. Using the Huffman tree, construct a map mapping the binary digits to a
   character
5. Using said map, iterate through the leftover binary data, and write
   the characters to stream (whether it be output or file)
6. Close the streams

Because of <abbr title="Don't Repeat Yourself">DRY</abbr> principles, you
should reuse the code you wrote in your Huffman compression program (in
`C/C++`'s case, use `#include` or something - try to avoid copying and
pasting). This goes for (most likely) steps #3-4.

## Testing

Should also be quite self-explanatory: you want to see if your Huffman
compressor/decompresser works, you run a plain-text file through the
compressor, producing a binary file. You run said binary file through the
decompresser, producing a plain-text file. You then proceed to check if the
plain-text file you produced is the same with the original file.

`valgrind` is your friend.

## Assignment for This Part

- :star: create Huffman decompresser with code reuse
- :star: finish Huffman compressor/decompresser

(:star: denotes a challenging task. :star2: denotes an even more challenging
  task.)

## Final Words

Wasn't that fun? This project teaches you about the applications of binary
trees, the recursion that comes with it, and a little bit of bit manipulation.

For some reason, I like it. In fact, I like doing things that involve
(low-level) bit manipulations (like Huffman and [Chip-8 emulators][c8]). Ha,
the only thing I seem to dislike about it is when I found out about
endianness - the differences between big and little endian. Some systems (like
mine) used little endian, meaning that some data-types (such as words) are
stored with the least significant byte in the smallest address:

```
Original Data: 0xABCDEF

LITTLE ENDIAN
-------------
Address: 0000 | 0001 | 0002
Data:      EF |   CD |   AB

BIG ENDIAN
----------
Address: 0000 | 0001 | 0002
Data:      AB |   CD |   EF
```

Hmmm... this sounds interesting. It is something that I know about, that I have
a little experience in. Looks like an idea for the next tutorial/walkthrough....

Anyways, I hope you had as much fun making this project as I did! Hopefully,
your teacher would award you properly, or, if not applicable, *you* would
reward yourself with a nice healthy burst of dopamine. *~Niiiiiicce*.

[c8]: https://github.com/cheukyin699/chip-8-tools
