---
layout: post
title: "screen_rest: The Simplest Passive Program to Get Off the Computer"
date: "2015-07-06 15:44"
category: c++
tags: [c++,computer,rest]
---

The program that I've been waiting for, has now come/been made!

For the past ... years, my dad has been telling me that after every hour I'm on
the computer, I should commit 15 minutes to doing something else strictly
___NOT___ computer related. I now have finally created a program to help me:
[screen_rest][1].

The great thing about it: it is less than 15kB in size (the binary on linux) and
it just works! You input the number of minutes that you want it to wait/cycle
through (for me it's one hour, built in), then specify the number of minutes
that you want your break to last. You run it, and it plays some music to remind
you after your computing session. Of course, you can choose to ignore it, or
exit out of the program entirely, but for me, it's just enough.

This program uses the `sleep` function in SFML, so it doesn't use that much CPU
power. I originally had it play not music, but a sine wave, which got irritating
after testing it for 3 times. Music, is a whole lot better.

[1]: http://github.com/cheukyin699/screen-rest
