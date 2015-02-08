---
layout: post
title: "NCURSES Terminal Text Editor Tutorial Part 1"
date: "2015-02-01 08:28"
categories: tutorial c++
tags: [tutorial,c++,ncurses,editor]
---


{% include ncurses-tut-nav.html %}

Introduction
------------

I am using vim right now, and a few days ago, I thought to myself:

> If they can make a terminal text editor, why can't I try?

So I set out to create a small TE that is just a proof-of-concept. I am here to share my findings with the Internet. You may find
the complete source code (with all of the small-to-big bugs) [here][1].

We are going to make a small text editor with basic saving, editing, and exiting features. You may expand it however you like.


Prerequisites
-------------

This tutorial assumes adequate fluency in the C++ language, and a bit of understanding of the ncurses library.


So Let's Start, Shall We?
-------------------------

Let's start with how the text editor is structured.

We are just going to have a while-loop accepting keyboard input and then updating the screen accordingly.

Keeping that in mind, lets start with the most important file: `Main.cpp`

``` c++
#include <ncurses.h>
#include <string>

using namespace std;

void curses_init()
{
    initscr();                      // Start ncurses mode
    noecho();                       // Don't echo keystrokes
    cbreak();                       // Disable line buffering
    keypad(stdscr, true);           // Enable special keys to be recorded
}

int main(int argc, char* argv[])
{
    string fn = "";
    if(argc > 1)
    {
        fn = argv[1];               // Set the filename
    }

    curses_init();                  // Initialize ncurses

    refresh();                      // Refresh display
    endwin();                       // End ncurses mode
    return 0;
}
```

To compile, do:

``` sh
g++ -c Main.c -o Main.o
g++ Main.o -lncurses -o editor
```

Or just put it in a `Makefile`.

We are going to add other things to this file later so don't lose it.


The Buffer Class
----------------

The Buffer class is going to represent a buffer of text. I'm going to use a vector of strings. It provides easy methods to insert,
append, as well as delete lines. One string is a line of text. Create `Buffer.h`.

``` c++
#ifndef BUFFER_H
#define BUFFER_H

#include <string>
#include <vector>

using namespace std;

class Buffer
{
public:
    Buffer();

    vector<string> lines;

    /* Some helper functions */
    void insertLine(string, int);
    void appendLine(string);
    void removeLine(int);

    /* Substitutes all tabs in string for 4 spaces, so that
     * the tabs won't screw everything up */
    string remTabs(string);
};

#endif
```


The Editor Class
----------------

I don't like to put too many things in my `Main.cpp` file, so I put everything in other files. Create your `Editor.h`. It will be used to
handle the keyboard inputs that we send it. It is also there to refresh the display. It will also contain a buffer.

``` c++
#ifndef EDITOR_H
#define EDITOR_H

#include <ncurses.h>

#include "Buffer.h"

class Editor
{
private:
    int x, y;
    char mode;
    Buffer* buff;
    string status, filename;

    /* For those of you who do not have -std=c++11 in g++ */
    string tos(int);

    // Cursor movement
    void moveUp();
    void moveDown();
    void moveLeft();
    void moveRight();

    void deleteLine();                  // Deletes current line
    void deleteLine(int);               // Deletes line <int>

    void saveFile();                    // Saves buffer into the file

public:
    Editor();                           // Normal constructor
    Editor(string);                     // Constructor accepting filename

    char getMode() {return mode;}

    void handleInput(int);              // Handles keyboard input
    void printBuff();
    void printStatusLine();             // Prints the status line (like vim!!!)
    void updateStatus();                // Updates the status line (text, not display)
};

#endif
```

The `int x, y;` is just for the x and y positions on screen. The `string status` will be displayed at the bottom (or that is our
goal).


Putting Things Together
-----------------------

Now, after all this prototyping, and even though we haven't implemented anything (much), lets edit our `Main.cpp` to reflect the
changes.

First, include the necessary header file.

``` c++
#include "Editor.h"
```

Then, add this to the start of your `main` function.

``` c++
Editor ed;
```

Remember the if-statements that we use to check for a filename?

``` c++
if(argc > 1)
{
    fn = string(argv[1]);
    ed = Editor(fn);
}
else
{
    ed = Editor();
}
```

We will later implement the constructors. For now, that will do.

Now lets add the main while-loop. After `curses_init()`, add this.

``` c++
while(ed.getMode() != 'x')
{
    ed.updateStatus();
    ed.printStatusLine();
    ed.printBuff();
    int input = getch();                // Blocking until input
    ed.handleInput(input);
}
```

A small explanation: `Editor::getMode()` returns a char representing a mode. There are (currently) 3 modes.

- `x`: Exit mode
- `n`: Normal mode
- `i`: Insert mode

Exit mode exits the program by quitting the while loop. Normal mode lets you enter commands. Insert mode lets you type text and
interact with the editor's internal buffer.

Okay, we are done the basic skeleton of the TE! Over the course of the other tutorials, you will be filling in the gaps -
implementing every function that was declared here. You are now ready for Part 2!

{% include ncurses-tut-nav.html %}

[1]: https://github.com/cheukyin699/ceditor-test/
