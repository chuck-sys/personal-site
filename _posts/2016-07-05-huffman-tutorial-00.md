---
layout: series
title: Huffman Tutorial Part 0
date: "2016-07-05 20:40"
excerpt: The goals and flow for the Huffman project.
comments: true
categories: Huffman
group: huffman-tutorial
shortname: Part 0
tags: [c++,Huffman,encoder,decoder,compression]
---

## Introduction

Are you curious in how compression systems work? Do you want to know how to
compress and decompress files? Has your high school teacher assigned you the
oh-so-complicated Huffman compression project? If you answer yes to any of these
questions, good for you!

Through this tutorial series, you will learn the theory behind implementing a
Huffman compressor/decompressor. Why only theory? That's because my high school
teacher asked me not to post assignments online; to stop students from ripping
it off github, and using it as their own work.

The most code I'll give would be snippets to demonstrate concepts and theory and
examples; they are based off of my original project. If this disclaimer doesn't
discourage you, and you are still reading this, well, we're getting to the good
part.


## What We'll be Building

This tutorial is designed to guide you in the right direction - through my
thought process in implementing this whole monstrosity that is the Huffman
project. At the end of each part, there will be an assignments section for the
reader to complete. It will involve building a working Huffman encoder.
Obviously, it is completely optional, but it does help the process of
understanding. And of course, you have to write one if your teacher gives this
to you as an assignment.


## Prerequisites

An understanding of C++ syntax would be helpful in understanding the snippets
of code presented. An understanding of linked lists and trees are also helpful.
What this means is that you could probably get the gist of how trees work by
reading the tutorial, but there is no guarantee. **You can skip those parts.**


## Flow

Here is what parts of the project we'll be focusing on in the next few parts:

#### Huffman Encoder

1. [basic setup, user stories, and file reading][p1]
2. [tree creation and character frequencies][p2]
3. [custom Huffman headers and data formats][p3]
4. [bit manipulation and file writing][p4]

#### Huffman Decoder

1. [code reuse and final words][p5]


## How Huffman Compression Works

[Here][huffwiki] is a helpful wikipedia article to help you on that.
[Here][huffvideo] is a helpful video that explains it nicely. <s>If you are
still stuck, well, I'll try my best to explain.</s> We'll just talk about
important points that need to be solved.

What people have trouble in is how Huffman compression recognizes the end of
file. When a file is compressed via Huffman compression, the output is a stream
of bits. The problem comes when you try to write the bits to a file - it doesn't
work. Computers do memory in bytes. It would be really nice if the number of
bytes you are trying to write to a file is a multiple of 8, but that isn't
usually the case. Thus, solutions have been proposed, and here are the 2 that
I've heard of:

1. Specify the number of extra bits so that the program ignores them
2. Have specific "pseudo end-of-file" character that is appended onto every
   binary such that the program ignores any bits after said character

The 2nd choice seemed to make more sense; the 1st one would have me thinking
about where I should put the number. I can just append the character to the
character frequencies part of my header. It takes up slightly more space, but I
wasn't optimizing **that** much. We'll go into this more in [part 2][p2].


## Assignment for This Part

- know how huffman compression/decompression works
- know how to break the program into tiny bits

(:star: denotes a challenging task. :star2: denotes an even more challenging
    task.)



[p1]: #
[p2]: #
[p3]: #
[p4]: #
[p5]: #

[huffwiki]: https://en.wikipedia.org/wiki/Huffman_coding
[huffvideo]: https://www.youtube.com/watch?v=ZdooBTdW5bM
