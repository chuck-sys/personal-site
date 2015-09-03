---
layout: post
title: "Fun with QBasic"
date: "2015-02-23 19:43"
categories: qbasic
comments: true
tags: [qbasic, fun, dosbox, music]
---

So I had a rough day with windows (I can no longer use it without safe mode, would fix later), so I wanted to have some fun, so I went
with a qbasic tutorial and made this colorful thing:

``` basic
' FILE: MUSIC.BAS
CLS
SCREEN 13
PLAY "MB"
PLAY "T255" 'TEMPO: 255

MUSIC1$ = "O2 F8 F8 F+8 F8 G+8 G+8 F+8 F4 F8 F+8 F8 O3 C#8 C#8 O2 B8 A#8"
MUSIC2$ = "O2 F8 F8 F+8 F8 G+8 G+8 F+8 F4 F8 F+8 F8 O3 F8 F8 D#8 C#8"

' FLAG FOR WHICH STRING OF NOTES TO PLAY
MFLAG = 2
' FLAG FOR GRAPHICS
FLAG = 1

PLAY MUSIC1$
PLAY ON

' (SOMEWHAT) MAIN LOOP
DO
    KEY$ = INKEY$
    IF KEY$ <> "" THEN EXIT DO
    ON PLAY(1) GOSUB PLAYMUSIC

    IF FLAG = 4 THEN FLAG = 1

    ' GRAPHICS DISPLAY
    IF FLAG = 1 THEN
        LINE (INT(RND * 319) + 1, INT(RND * 200) + 1)-(INT(RND * 319) + 1, INT(RND * 200) + 1), PLAY(1), BF
    END IF
    IF FLAG = 2 THEN
        CIRCLE (INT(RND * 319) + 1, INT(RND*200) + 1), PLAY(1), INT(RND * 15) + 1)
    END IF
    IF FLAG = 3 THEN
        LINE (INT(RND * 319) + 1, INT(RND * 200) + 1)-(INT(RND * 319) + 1, INT(RND * 200) + 1), PLAY(1), B
    END IF
LOOP
END

' SUBROUTINE THAT DEALS WITH PLAYING THE MUSIC
PLAYMUSIC:
    IF MFLAG = 1 THEN
        PLAY MUSIC1$
        MFLAG = 2
        CLS
        FLAG = FLAG + 1
        RETURN
    END IF
    IF MFLAG = 2 THEN
        PLAY MUSIC2$
        MFLAG = 1
        CLS
        FLAG = FLAG + 1
        RETURN
    END IF
RETURN
```

***Ah, how I just love vim's `gU`...***

But I'm getting sidetracked right now. What we have now is an
epilepsy-enducing program that gets terminated only if you press any key.

![Screenshot 1][1]

![Screenshot 2][2]

[1]: http://i.imgur.com/huy9h27.png?1
[2]: http://i.imgur.com/gklGeDl.png?1
