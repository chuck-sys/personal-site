---
layout: series
title: "NCURSES Terminal Text Editor Tutorial Part 2"
date: "2015-02-01 12:17"
categories: tutorial c++
comments: true
group: "ncurses-editor-tutorial"
shortname: 'Part 2'
tags: [tutorial,c++,ncurses,editor]
---


Welcome Back
------------

Last time, we finished the basic skeleton, and now it is time to implement some functions! Let's do some easy ones
first.


The Buffer Class
----------------

Create a file `Buffer.cpp`. This all should be fairly straightforward and easy to understand. We'll set up first.

~~~ cpp
#include "Buffer.h"

Buffer::Buffer() {}
~~~

Let's have fun with recursion now, and do the `remTabs(string)` function!

~~~ cpp
string Buffer::remTabs(string line)
{
    int tab = line.find("\t");
    if(tab == line.npos)
        return line;
    else
        return remTabs(line.replace(tab, 1, "    "));
}
~~~

Keep in mind that there are 4 spaces in the string. This function recursively finds a tab in a line. When a tab is found, it goes again
until no more tabs could be found, then returns the line.

Now for some helper functions for line operations. These are not really necessary but are asthetically pleasing should you use
them in your `Editor.cpp` file (which you will). It makes your code there more readable (I think).

~~~ cpp
void Buffer::insertLine(string line, int n)
{
    line = remTabs(line);                   // Conversion (happens every time)
    lines.insert(lines.begin()+n, line);
}

void Buffer::appendLine(string line)
{
    line = remTabs(line);
    lines.push_back(line);
}

void Buffer::removeLine(int n)
{
    lines.erase(lines.begin()+n);
}
~~~


An Abrupt End
-------------

And that's it till next time! You are ready for Part 3!
