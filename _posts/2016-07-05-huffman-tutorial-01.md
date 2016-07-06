---
layout: series
title: Huffman Tutorial Part 1
date: "2016-07-05 20:41"
excerpt: Basic setup, user stories (what we want it to do), and file reading.
comments: true
categories: Huffman
group: huffman-tutorial
shortname: Part 1
tags: [c++,Huffman,encoder,compression,io]
---

## Setup

Let's start off with a basic setup, which includes a nice directory structure
and a neat `Makefile`. *What are you looking at me for?* Alright, here is my
setup:

~~~ sh
huffman/                        # Root directory
├── dec/                        # Source for decoder
├── enc/                        # Source for encoder
├── obj/                        # Object files
└── texts/                      # Test files for encoding
    └── t8.shakespeare.txt      # Shakespeare :)
├── Makefile
├── README.md
~~~

Pretty straight-forward. Just make it easier for yourself.


## Features

Here are some user stories for the project:

- the user can compress ASCII files into Huffman binaries
- the user can decompress Huffman binaries into ASCII files
- the user can compress and decompress files of large sizes (not unlimited)
- the compression and decompression process should be reasonably quick
- compression and decompression is split into 2 binary executables


## File Reading

You know that that's one of the prerequisites, right? Here is the gist of it.

~~~ cpp
#include <fstream>

using namespace std;

int main() {
    ifstream ifile("infile.txt");

    if (ifile.good()) {
        char tmp;
        while (ifile.read(&tmp, 1)) {
            // Do something
        }
    }

    ifile.close();
    return 0;
}
~~~

> Disclaimer: The above code is just a snippet, and is not guaranteed to work.


## Assignment for This Part

- set up the file/directory structure for the project
- set up appropriate Makefile/CMakeLists.txt/AutoTools/Command Line Kung Fu
- set up the bare-bones, starting with the `main` function
- set up the skeleton so that the project compiles

(:star: denotes a challenging task. :star2: denotes an even more challenging
    task.)
