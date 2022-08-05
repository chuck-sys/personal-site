---
layout: series
title: Huffman Tutorial Part 4
date: "2016-07-05 20:44"
excerpt: Bit manipulation and writing to file
category: Huffman
group: huffman-tutorial
shortname: Part 4
tags: [c++,Huffman,encoder,compression,bits]
---

Ah! Here is the fun part! Actually writing each individual bit into a file! So,
how does one go about doing it?


#### You Don't

As mentioned before, you can't do that.


## Bit Manipulation

That's why you need to manipulate the bits inside a byte! What you have to do
is this: push every 8 bits into a byte (`char`), and write said byte into a
file.

If you are very familiar with bitwise operators, you can just
[go right ahead](#skipper). For those who aren't, here is a refresher.

Note that I'll refer to logic gates as 'gates', and bitwise operators as
'operators'. Gates typically have 2 inputs and 1 output (either `0` or `1`,
which is 1 bit). Operators are just gates, only they are for bytes. They apply
the gate to each individual bit in the byte.

There are a few basic bitwise operators you need to know: `AND`, `OR`, `NOT`,
`XOR` come into mind.

---

### AND

An `AND` gate only outputs `1` if all of it's inputs are `1`. Otherwise, it
outputs `0`. Here is a truth table:

a | b | out
--|---|----
0 | 0 | 0
0 | 1 | 0
1 | 0 | 0
1 | 1 | 1

Similarly, the `AND` operator applies an `AND` gate to each individual bit of
the inputs, and spitting it in it's place in the output. This is exactly the
same for all the other ones, so it won't be brought up again.


### OR

An `OR` gate outputs `1` if at least 1 of the inputs are `1`.

a | b | out
--|---|----
0 | 0 | 0
0 | 1 | 1
1 | 0 | 1
1 | 1 | 1

### NOT

A `NOT` gate outputs a `1` if the input is a `0`, and vice versa.

{:.table}
a | out
--|----
0 | 1
1 | 0


### XOR

An `XOR` gate (exclusive `OR`) outputs `1` if 1 and only 1 of the inputs are
`1`.

{:.table}
a | b | out
--|---|----
0 | 0 | 0
0 | 1 | 1
1 | 0 | 1
1 | 1 | 0

---
<a name="skipper"></a>
Back to bit manipulation. Assuming you have a long `string` of binary ones and
zeros, you will need to take every 8 bits, and shove them into a byte. Here is
how it should go:

1. Iterate through all binary digits
2. Is digit a 1?
    1. Use `OR` operation to place `1` into temporary variable (`byte`)
3. Increment counter (for which bit you are in the temporary variable)
4. Repeat until all binary digits are exhausted

Now, the question becomes *how* can you do that. You shift the `1` by whatever
the counter is. ***Note that you may have to tinker around with how much you
shift by.***

``` cpp
string bs = "01001100";
char byte = 0;
for (unsigned i = 0; i < 8; i++) {
    if (bs[i] == '1') byte |= 1 << i;
}
```

That was a small snippet of how it is done. I didn't use `std::string`, and
instead opted to use a vector of bits (`bool`). For some systems, a
`std::vector<bool>` is a "space efficient specialization of `std::vector`" [^1].

Technically, you didn't need to know most of the gates written above. So yeah.
Made you look.


## Writing to File

Well, that's easy, now that you have an array/vector of bytes. You can just
iterate through all of them and write them all to a file.


## Assignment for This Part

- iterate through input file and convert the chars into bits with the
  map created in [the last part][p3]
- :star: iterate through the bits and convert them into bytes
- iterate through bytes and write them to file, after writing the header
- *close the file(s)*

(:star: denotes a challenging task. :star2: denotes an even more challenging
  task.)



[p3]: /huffman/2016/07/05/huffman-tutorial-03.html

[^1]: https://en.cppreference.com/w/cpp/container/vector_bool
