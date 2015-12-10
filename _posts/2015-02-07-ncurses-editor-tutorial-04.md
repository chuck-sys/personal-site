---
layout: ncurses-ed-tut-post
title: "NCURSES Terminal Text Editor Tutorial Part 4"
date: "2015-02-07 15:50"
categories: tutorial c++
comments: true
group: "ncurses-editor-tutorial"
shortname: 'Part 4'
tags: [tutorial,c++,ncurses,editor]
---


Salutations!
------------

Just gonna apologize for the weird intros - I'm starting to run out of phrases to start the intro. Last time we left off, we
finished a bunch of implementations such as the input handler, moving directions, etc. Now, we are going to finish up everything!


Printing the Buffer
-------------------

Printing the buffer is a somewhat easy task **if you don't what a scrolling feature**. I know how to do it but I can't implement
it without it going wrong with a ton of bugs. This one here will just be a simple for-loop with no scrolling feature.

``` c++
void Editor::printBuff()
{
    for(int i=0; i<LINES-1; i++)
    {
        if(i >= buff->lines.size())
        {
            move(i, 0);
            clrtoeol();
        }
        else
        {
            mvprintw(i, 0, buff->lines[i].c_str());
        }
        clrtoeol();
    }
    move(y, x);
}
```

Note that this will only be good with files that have lines less than the number of lines your terminal could display on your
screen.


Printing the Status Line
------------------------

I like my status line on the last line of the terminal (***just like ... oh whatever, you get the drift***). You could put it
somewhere else, if you like.

``` c++
void Editor::printStatusLine()
{
    attron(A_REVERSE);
    mvprintw(LINES-1, 0, status.c_str());
    clrtoeol();
    attroff(A_REVERSE);
}
```


Finishing up
------------

Okay! We are almost done! Three simple functions stand in our way: the 2 variations of the `Editor::deleteLine` function, and the
most important `Editor::saveFile()` function!

``` c++
void Editor::deleteLine()
{
    buff->removeLine(y);
}

void Editor::deleteLine(int i)
{
    buff->removeLine(i);
}
```

The `Editor::saveFile()` function:

``` c++
void Editor::saveFile()
{
    if(filename == "")
    {
        // Set filename to untitled
        filename = "untitled";
    }

    ofstream f(filename.c_str());
    if(f.is_open())
    {
        for(int i=0; i<buff->lines.size(); i++)
        {
            f << buff->lines[i] << endl;
        }
        status = "Saved to file!";
    }
    else
    {
        status = "Error: Cannot open file for writing!";
    }
    f.close();
}
```


Afterthoughts
-------------

That was fun, wasn't it? Some ideas for other features to add to this editor:

- ***Scrolling***
- Syntax highlighting for some language
- Deleting line(s) and other features that were included in vim


Source Code
-----------

The sources to this **EXACT TUTORIAL** (as well as the Makefile) may be found in this tar file [here][1].


[1]: /res/tutorials/ncurses-ced-tut.tar.gz
