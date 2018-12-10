---
layout: series
title: "NCURSES Terminal Text Editor Tutorial Part 3"
date: "2015-02-04 20:48"
categories: tutorial c++
group: "ncurses-editor-tutorial"
shortname: 'Part 3'
tags: [tutorial,c++,ncurses,editor]
---


Welcome Back
------------

Last time we left off, we finished the `Buffer` class. Here comes the fun stuff: Doing the functions for the `Editor` class! What
fun! We will start immediately!


Implementing the Editor class
-----------------------------

Create file `Editor.cpp`. Add some includes.

``` cpp
#include "Editor.h"

#include <fstream>
#include <iostream>
#include <sstream>          // If you are not using C++11; We'll get to that later!
```

Let's start off with the default constructor. For me, I want the default constructor to initialize the x and y coordinates, and
also the mode to normal `'n'`. I will want the status to be `'Normal Mode'` and the filename to be `'untitled'`. I also need to
initialize the `Buffer` variable.

``` cpp
Editor::Editor()
{
    x=0;y=0;mode='n';
    status = "Normal Mode";
    filename = "untitled";

    /* Initializes buffer and appends line to
        prevent seg. faults */
    buff = new Buffer();
    buff->appendLine("");
}
```

If they give it a filename, read it into the buffer.

``` cpp
Editor::Editor(string fn)
{
    x=0;y=0;mode='n';
    status = "Normal Mode";
    filename = fn;

    buff = new Buffer();

    ifstream infile(fn.c_str());
    if(infile.is_open())
    {
        while(!infile.eof())
        {
            string temp;
            getline(infile, temp);
            buff->appendLine(temp);
        }
    }
    else
    {
        cerr << "Cannot open file: '" << fn << "'\n";
        buff->appendLine("");
    }
}
```

Now that we have done all that, it is time for us to get on with the core functions, starting with `Editor::updateStatus()`.

``` cpp
void Editor::updateStatus()
{
    switch(mode)
    {
    case 'n':
        // Normal mode
        status = "Normal Mode";
        break;
    case 'i':
        // Insert mode
        status = "Insert Mode";
        break;
    case 'x':
        // Exiting
        status = "Exiting";
        break;
    }
    status += "\tCOL: " + tos(x) + "\tROW: " + tos(y);
}
```

> Wait! We haven't defined `tos(int)` yet!!!

Just use stringstream!

``` cpp
string Editor::tos(int i)
{
    stringstream ss;
    ss << i;
    return ss.str();
}
```

Note that this isn't necessary if you have C++11 - you just use `std::to_string(int)`. My school doesn't have it so I had to
compensate.


Basic Input Handling
--------------------

My input handler handles all inputs in normal mode as well as insert mode (but not exit mode, because you are exiting the
program). This may be confusing because there are a bunch of switches, and you may be right. You could separate the input handler
into two different functions - one for handling inputs in normal mode, the other handling inputs in insert mode.

``` cpp
void Editor::handleInput(int c)
{
    switch(c)
    {
    case KEY_LEFT:
        moveLeft();
        return;
    case KEY_RIGHT:
        moveRight();
        return;
    case KEY_UP:
        moveUp();
        return;
    case KEY_DOWN:
        moveDown();
        return;
    }
    switch(mode)
    {
    case 'n':
        switch(c)
        {
        case 'x':
            // Press 'x' to exit
            mode = 'x';
            break;
        case 'i':
            // Press 'i' to enter insert mode
            mode = 'i';
            break;
        case 's':
            // Press 's' to save the current file
            saveFile();
            break;
        }
        break;
    case 'i':
        switch(c)
        {
        case 27:
            // The Escape/Alt key
            mode = 'n';
            break;
        case 127:
        case KEY_BACKSPACE:
            // The Backspace key
            if(x == 0 && y > 0)
            {
                x = buff->lines[y-1].length();
                // Bring the line down
                buff->lines[y-1] += buff->lines[y];
                // Delete the current line
                deleteLine();
                moveUp();
            }
            else
            {
                // Removes a character
                buff->lines[y].erase(--x, 1);
            }
            break;
        case KEY_DC:
            // The Delete key
            if(x == buff->lines[y].length() && y != buff->lines.size() - 1)
            {
                // Bring the line down
                buff->lines[y] += buff->lines[y+1];
                // Delete the line
                deleteLine(y+1);
            }
            else
            {
                buff->lines[y].erase(x, 1);
            }
            break;
        case KEY_ENTER:
        case 10:
            // The Enter key
            // Bring the rest of the line down
            if(x < buff->lines[y].length())
            {
                // Put the rest of the line on a new line
                buff->insertLine(buff->lines[y].substr(x, buff->lines[y].length() - x), y + 1);
                // Remove that part of the line
                buff->lines[y].erase(x, buff->lines[y].length() - x);
            }
            else
            {
                buff->insertLine("", y+1);
            }
            x = 0;
            moveDown();
            break;
        case KEY_BTAB:
        case KEY_CTAB:
        case KEY_STAB:
        case KEY_CATAB:
        case 9:
            // The Tab key
            buff->lines[y].insert(x, 4, ' ');
            x += 4;
            break;
        default:
            // Any other character
            buff->lines[y].insert(x, 1, char(c));
            x++;
            break;
        }
        break;
    }
}
```

Whew! That sure was a lot of code! There is still a lot of stuff to implement! Let's do the `move<Direction>()` code first!


Moving it x2
------------

``` cpp
void Editor::moveLeft()
{
    if(x-1 >= 0)
    {
        x--;
        move(y, x);
    }
}

void Editor::moveRight()
{
    if(x+1 < COLS && x+1 <= buff->lines[y].length())
    {
        x++;
        move(y, x);
    }
}

void Editor::moveUp()
{
    if(y-1 >= 0)
        y--;
    if(x >= buff->lines[y].length())
        x = buff->lines[y].length();
    move(y, x);
}

void Editor::moveDown()
{
    if(y+1 < LINES-1 && y+1 < buff->lines.size())
        y++;
    if(x >= buff->lines[y].length())
        x = buff->lines[y].length();
    move(y, x);
}
```

Pretty straight forward, although I think I need to do a bit of explaining on the `if(x >= buff->lines[y].length())` part. You
see, if it didn't have that, then when the user goes up or down, if the current line of text was longer than the one above/below
it, then the cursor would be 'dangling in midair', so to speak. This little if-statement snaps the cursor to the end of the
next/previous line if it were to be shorter than the current one.


Time to Wrap it up
------------------

Ha! You thought that I would do all of this in only a three-parter :trollface: ? There are still more to implement, though we are past the
half-way point already. We still need the most important function: `Editor::printBuff()`, which is the function that actually lets
you see the buffered text! I hope I will see you in **Part 4**!
