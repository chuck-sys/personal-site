{:title "Huffman Tutorial Part 3"
 :layout :post
 :tags  ["c++" "Huffman" "encoder" "compression" "headers" "data"]
 :toc true}

In this part, we'll figure out how to sketch headers for **your** Huffman
program!

## Huffman Headers

> Ha! Alliteration!

There are 2 options for storing the tree information:

1. Use character frequencies
2. Use the actual tree

If you use character frequencies, the header should be smaller than the other
option, which is the actual tree. Of course, you would have to completely
regenerate the tree from the character frequencies when you decode it. *This is
an example of sacrificing speed for space.*

If you use the actual tree, the header should be a lot bigger, since there are
lots of nodes (branches, leaves) on the tree. On the other hand, you won't need
to regenerate the tree. *This is an example of sacrificing space for speed.*

For the headers, you won't want them to be too big - they are already big
enough and take up 70-80% of small, compressed files. You also don't want them
to be too small - it would limit you. Which is why I chose option #1.

### Header Format

Here is the header format that I use:

Name | Size         | Note
-----|--------------|----------------------------
Size | 2 bytes      | The total size of the remaining header
Data | ????         | The character and frequencies

Here is the format for an entry in the data:

Name | Size (bytes) | Note
-----|--------------|----------------------------
Character | 1       |
Frequency | 4       | The number of times a character appears

The total size of one entry is 5 bytes.

#### Limitations

Because I set the letter frequency to be 4 bytes in length, this system can
safely handle ~4GB of any character. According to the standard distribution of
the English language, having the letter 'e' appear 12.702% means that the
average maximum file size this program can handle is ~31GB. That, of course, is
not accounting for the space (` `) character, which appears more often.
Counting spaces, the system can handle ~21GB of plain-text.

> Now, where can I find a 21GB plain-text file to test it on?


## Assignment for This Part

- :star: find/create a header format that best suits your purpose
- document said format with tons of details
- implement said format (no need for the binary data, just the header) by
  writing the header to a file
- check the correctness of the format using binary/hex viewing tools such as
  `xxd` (debugging, basically)

(:star: denotes a challenging task. :star2: denotes an even more challenging
  task.)
