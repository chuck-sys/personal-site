---
layout: post
title: Basic Ray Casting Tutorial
date: 2017-05-10 21:28
excerpt: "A light ray casting tutorial for the enthusiast"
category: tutorial
commentID: 1
tags: [tutorial,c++,ray casting,graphics]
---

## Goal

This tutorial's goal is to get you acquainted with the idea of ray casting. We
will focus on the most basic method for ray casting: using a combination of unit
vectors, vector addition, and lots and lots of iteration. Sounds fun? Let's dive
in.

If you wanna see the finished product, scroll all the way to the bottom of the
screen, or press the <kbd>End</kbd> key on your keyboard.

## Pre-requisites

- Some proficiency in C++
- Some knowledge of the event-driven paradigm (if you know what the term is, you
  are golden)
- Some knowledge of what a vector is, in mathematical terms
  (not just `#include <vector>`)

## General Idea

In this tutorial, you will build a small program that projects a beam of light
from the center of the canvas in the direction of your cursor. Any objects
placed in the way of the beam will be blocked, just as light (in normal
circumstances) is blocked when you place something in front of the source.

The objects will be placed by a simple click on the canvas.

The idea behind the ray casting is that we will first grab the vector going from
the middle of the canvas towards the cursor, and change it into a unit vector.
Then, we iteratively add the unit vectors onto the position vector of the middle
of the canvas, until we come across an object. If we hit an object, we draw a
line from the middle to the point it hit the object. If we don't, we just draw a
line from the middle to the edge of the screen.

## The Code

Let's start off with the basics.

### Basic Setup

``` cpp
#include <SFML/Graphics.hpp>

using namespace sf;

int main() {
    RenderWindow w(VideoMode(500, 500), "Raycast Thingy", Style::Close);
    Event evt;

    while (w.isOpen()) {
        while (w.pollEvent(evt)) {
            switch (evt.type) {
            case Event::Closed:
                w.close();
                break;
            default:
                break;
            }
        }

        w.clear();

        w.display();
    }
}
```

This is just, you know, your standard main loop. We will be working with
[SFML][sfml].

If you are not sure how to compile this, please check out [these
tutorials][thattut].

Let's add a feature where circles will appear on click, so that we could add
objects dynamically. Right after `Event evt`, initialize the following:

``` cpp
CircleShape c;
bool hasDrawn = false;
std::vector<decltype(Mouse::getPosition())> cpos;
```

We will be using the same `CircleShape` for drawing onto the window. The
`std::vector` is for saving all the cursor positions, again, for drawing onto
the window. Don't forget to include it!

Add another case in the `switch`.

``` cpp
case Event::MouseButtonReleased:
    cpos.push_back(Mouse::getPosition() - w.getPosition());
    break;
```

The reason why we have to subtract the window position from the mouse position
is that the mouse position is relative to the monitor/screen, and not the
canvas.

Now, in-between the `w.clear()` and `w.display()`, we are gonna start drawing
the circles.

``` cpp
for (auto p : cpos) {
    c.setPosition(p.x, p.y);
    w.draw(c);
}
```

Remember to initialize the `CircleShape`, lest you won't be able to actually see
it, even if you click a whole bunch.

``` cpp
c.setFillColor(Color::White);
c.setRadius(10);
```

For more documentation on what aspects of the circle you can change, [consult
the documentation][circledocs].

At this stage, you should be able to click on the canvas, and a circle should
appear on the screen.

### Ray Casting Logic

Okay. You are done with all the basics. Now, how do we implement it? Let's just
have an `sf::VertexArray` that handles the 2 points. Our first vertex is
`start`, the center of the canvas. The second point will involve ray casting.
Since we need to know where to start, and what direction we should go, it makes
sense that the `start` and mouse position should be parameters. But what's
`img`?

`img` is the entire canvas, as a buffered array of pixels. Since we will need to
add unit vectors to our current starting position, we will need to know when we
hit the circles. The most pixel-perfect way to do it would be to use an array
look-up.

``` cpp
// Draw line with raycasting
VertexArray vs(Lines, 2);
vs[0].position = start;
vs[1].position = raycast(start,
                    (Vector2f) (Mouse::getPosition() - w.getPosition()),
                    img);
vs[0].color = Color::Red;
vs[1].color = Color::Red;
w.draw(vs);
```

Let's actually create the `raycast` function.

``` cpp
Vector2f raycast(Vector2f start, Vector2f mouse, Image img) {
}
```

First, we will get the vector that goes from the start to the mouse, and
normalize it.

``` cpp
Vector2f u = mouse - start;
u /= v2fNorm(u);
```

The function `float v2fNorm(Vector2f)` grabs the norm of the vector, and will
be left as an exercise to the reader (this is sounding like one of them
textbooks already).

We will use `sf::Rect<float>` to check if the point (and the points after it)
is within the bounds of the canvas.

``` cpp
Rect<float> r(Vector2f(0, 0), (Vector2f) img.getSize());
while (r.contains(start.x, start.y)) {
    if (img.getPixel(start.x, start.y) != Color::Black &&
        img.getPixel(start.x, start.y) != Color::Red) {
        // We've hit it!
        return start;
    }

    start += u;
}
```

The code above checks to see if the pixel is neither black nor red. In this
example, the canvas has a black background, and the line is drawn in red, hence
anything that isn't either of these colours should be an obstacle. We are using
the vector `start` as a counter: every time we go through the loop, we add the
unit vector to it again to update the counter.

The `img.getPixel()` grabs the colour of the pixel at the specified x and y
coordinates.

We are almost done. What we need now, is to return the side if it doesn't find
anything. This is easy, since the while-loop terminates if `start` goes out of
bounds; `start` keeps it's value, and we can return that.

### Getting the Image

Obtaining the entire image buffer of the canvas can be extremely time-consuming;
it is proportionate to the size of the canvas. Let's add a few more variables
to the start of `int main()`.

``` cpp
Texture wt;
Image img;
```

And we initialize them.

``` cpp
wt.create(w.getSize().x, w.getSize().y);
wt.update(w);
img = wt.copyToImage();
```

This is just how they do things in SFML. First, you create an `sf::Texture` to
hold the graphics displayed on the canvas. Then, you convert the texture to an
`sf::Image`. From the docs, this is an extremely time-consuming operation, which
is why the texture is updated if and only if a new obstacle is placed on the
canvas.

Now, we just need code to update the texture and the image whenever an obstacle
is placed onto the canvas. This task will be left as another exercise to the
reader.

## Result

And here are the results!

![raycast][r01]

![raycast][r02]

## Epilogue

If you are still a bit stuck, [here][code] is my code. It's just a single source
file, coupled with a Makefile for easy compilation.

Anyways, that's it! Think about all the other things you can do with it! If you
can draw one line, why not draw tons of lines, and have the source `start` start
moving?

[sfml]: https://www.sfml-dev.org/
[thattut]: https://www.sfml-dev.org/tutorials/2.4/
[circledocs]: https://www.sfml-dev.org/documentation/2.4.2/classsf_1_1CircleShape.php
[r01]: /res/images/raycasting-1.png
[r02]: /res/images/raycasting-2.png
[code]: https://github.com/cheukyin699/raycasting-tutorial1
