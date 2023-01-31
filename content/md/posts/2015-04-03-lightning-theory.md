{:title "Basic Lightning Theory"
 :layout :post
 :tags  ["lightning" "theory" "visual" "python" "pygame"]
 :toc true}

Introduction
============

Every good game needs good visual effects. Here is how to do basic lightning.
This only covers 2D lightning, but you could easily extend this to 3D.

The Good Stuff
==============

Define 2 points, A and B.

<svg width="400" height="100">
    <circle cx="6" cy="6" r="5" stroke-width="0" stroke="black" fill="black" />
    <circle cx="390" cy="80" r="5" stroke-width="0" stroke="black" fill="black" />
    <text fill="#000" x="0" y="26">A</text>
    <text fill="#000" x="385" y="70">B</text>
    Sorry, your browser does not support inline SVG.
</svg>

Draw a line to link the 2 points up.

<svg width="400" height="100">
    <circle cx="6" cy="6" r="5" stroke-width="0" fill="black" />
    <circle cx="390" cy="80" r="5" stroke-width="0" fill="black" />
    <line x1="6" y1="6" x2="390" y2="80" stroke-width="1" stroke="black" />
    <text fill="#000" x="0" y="26">A</text>
    <text fill="#000" x="385" y="70">B</text>
    Sorry, your browser does not support inline SVG.
</svg>

Find the middle of the line AB, and mark it (M).

<svg width="400" height="100">
    <circle cx="6" cy="6" r="5" stroke-width="0" fill="black" />
    <circle cx="390" cy="80" r="5" stroke-width="0" fill="black" />
    <circle cx="198" cy="43" r="5" stroke-width="0" fill="black" />
    <line x1="6" y1="6" x2="390" y2="80" stroke-width="1" stroke="black" />
    <text fill="#000" x="0" y="26">A</text>
    <text fill="#000" x="385" y="70">B</text>
    <text fill="#000" x="191" y="62">M</text>
    Sorry, your browser does not support inline SVG.
</svg>

Add a displacement to the coordinates of M (should be random), then link AM and MB together. In this case, M is displaced
(-18, -13) to create M'.

<svg width="400" height="100">
    <circle cx="6" cy="6" r="5" stroke-width="0" fill="black" />
    <circle cx="390" cy="80" r="5" stroke-width="0" fill="black" />
    <circle cx="198" cy="43" r="5" stroke-width="0" fill="black" />
    <circle cx="170" cy="30" r="5" stroke-width="0" fill="black" />
    <line x1="6" y1="6" x2="170" y2="30" stroke-width="1" stroke="black" />
    <line x1="170" y1="30" x2="390" y2="80" stroke-width="1" stroke="black" />
    <line x1="6" y1="6" x2="390" y2="80" stroke-dasharray="5,5" stroke-width="1" stroke="black" />
    <text fill="#000" x="0" y="26">A</text>
    <text fill="#000" x="385" y="70">B</text>
    <text fill="#000" x="191" y="62">M</text>
    <text fill="#000" x="164" y="48">M'</text>
    Sorry, your browser does not support inline SVG.
</svg>

Are You Done?
=============

Congratulations! You've got the basics! Now, just rinse and repeat with your new
lines AM' and M'B! Recursion works wonders, doesn't it! Here is an
implementation of this basic lightning thingy in Python and pygame!

<script src="https://gist.github.com/cheukyin699/f73c0bf96304ffb18d38.js"></script>

This little thing has the lightning originate from the middle of the window and
arc out to attack your cursor if you click on the screen. I made this to test
the lightning concept for a tower defense game that I was inspired to create.
