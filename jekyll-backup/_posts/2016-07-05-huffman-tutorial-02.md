---
layout: series
title: Huffman Tutorial Part 2
date: "2016-07-05 20:42"
excerpt: Huffman tree creation with character frequencies
category: Huffman
group: huffman-tutorial
shortname: Part 2
tags: [c++,Huffman,encoder,decoder,compression]
---

What we are trying to do, is to take the character frequencies of the file, and
convert all of it into an easily traversable tree to look things up quickly.
Then, we are going to go through the whole tree, and construct a map to map
every character to a string of binary digits.

## Character Frequencies

There are 2 ways we can go about this. There are little differences between the
two.

1. Have a vector of Huffman trees of depth 1 - just to help with the storage
2. Have a map mapping a character to a number - a literal character frequency
   map

I went with choice 1 because I didn't want to convert maps into vectors, sort
said vectors, and start generating the tree. It is similar for both in that you
will still have to write a custom sorting function.

The `tree` that I'm talking about is actually a node with 2 children:

``` cpp
#include <string>

struct tree {
    std::string val;
    unsigned freq;

    tree* lhs;
    tree* rhs;
};
```

More specifically, a binary tree. Because of the nature of the Huffman tree,
either both of its children will be `nullptr`, or neither. That is because we
will be adding them by pairing them up.

### End of File

As mentioned in [Part 0][p0], there are 2 solutions that I know of to denote
the end of file prematurely. Of course, if you don't care about the program
reading the extra bits and interpreting them as garbage data, then go ahead,
don't do anything. If not, read on....

Of course, by putting it here, it means that it is for **option #2**, where you
have the pseudo end-of-file character. Obviously, this is the part where you
insert said character: after reading the file, and before creating the tree. For
me, I used `char(254)`, literally hard-coding it. But I did say that it is for
ASCII only, did I? For a more elegant solution, I suggest having a set of all
ASCII characters used in file subtracted from a set of all ASCII characters .
That way, you will be sure that the character the program chooses has to be
unique.

## Tree Creation

After sorting the character frequencies by one way or another, it will come time
to start reducing that vector of character frequencies to a tree! Here is an nice
overview of how you should do it:

1. Begin with vector of character frequencies (tree depth 1)
2. Is there only one item in the vector? *That item is the tree!*
3. Take the 2 smallest ones (smallest frequencies) and combine them
4. Erase the 2 smallest ones from the vector
5. Insert the combined one into the vector in the correct position such that the
   vector remains sorted
6. Go to step #2

By keeping the vector sorted by character frequency, you make it easier to take
the 2 smallest items from the vector (normally, just the first 2, depending on
which way you sort it). Inserting is also easy with a quick insertion sort.

## Map Construction

:confetti_ball: Congradulations! You now have a Huffman tree! :confetti_ball:

So. How much do you enjoy recursion?

I remember my Computer Programming teacher teaching me about trees: the only
way to traverse through them is by recursion.

The task at hand is not just recursion, but recursion with an accumulator. Just
a tad more difficult. Here is the algorithm that I've come up with:

1. Begin at root of the tree with a blank map and blank accumulator
2. Am I on a leaf node? If so...
    1. Map the value of accumulator to the character on leaf
    2. Return
3. If not...
    1. Recurse (step #2) onto left branch and add `0` to accumulator
    2. Recurse (step #2) onto right branch and add `1` to accumulator

Well, I did say I wasn't going into the code... much.

## Assignment for This Part

- take the character frequencies of characters in file and store them
- make a way to sort said frequencies
- append pseudo end-of-file character to character frequencies
- make the tree structure
- :star: reduce the character frequencies into a single tree and store it
- :star2: create a map associating specific characters with corresponding bit
  sequence

(:star: denotes a challenging task. :star2: denotes an even more challenging
    task.)

[p0]: /huffman/2016/07/05/huffman-tutorial-00.html
