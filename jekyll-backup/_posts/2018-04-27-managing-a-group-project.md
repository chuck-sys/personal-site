---
layout: post
title: "On Managing a Group Project"
date: "2018-04-27 13:58"
excerpt: "Stuff I learnt from my experience with a group project."
category: project
tags: [programming,group,unity,project]
---

The semester ended, and I just finished a reasonably large group project on
Virtual Reality (link [here][github]; teaser [here][teaser]). Let's talk about
what I learned.

## Stay Silent

Group projects require good communication with members to succeed. One of our
difficulties was getting everyone on a common platform to make communication
less of an issue. One member did not own a Facebook account, our defacto method
of communication, so we couldn't just create a new chat group. He did, however,
prefer texting, which would in theory make communicating much more
instantaneous, but also make it complicated for us when we use a computer (very
few messaging apps also have a computer-friendly interface). Thus, I opened a
Slack group. This would've been great, except that everyone was new to Slack.

One thing about effective communication is that the medium must always be
convenient. The members should all be very familiar with the intricacies of
whatever medium you use to communicate, or at least, have been using it for a
while such that it becomes a natural habit to check (see email). Since none of
us have used Slack before, we wouldn't check it often, which kills the platform.
I tried to get around this by asking everyone to pin a Slack tab on their
browser, but to no avail. The group still suffered from painfully slow reply
times, often spanning hours to days. Later in the project, I decided to scrap
Slack and just message each member individually. This worked slightly better,
with less-than-an-hour reply time. The downside is that it promotes information
asymmetry.

Sometimes, even though the medium used to communicate is new to the members,
everything still works out. Our group used Trello to organize the project, which
was new to us. We would assign parts of the project to others; everything would
be submitted via Trello. Trello is an online pin board, so members don't have to
check it too often. It also, by default, emails you about cards you are
assigned, so there is often no escape.

Projects need a constant stream of communication. A haphazard update post just
wouldn't do. Every member needs to be aware of the direction the project is
going in, what everyone is actively working on, and how everyone is contributing
to the final product. If you have to ask the question: "Did I
message/update/notify them enough?", then you may have to reconsider your
communication system.

## Do Everything Yourself

Group projects should be done as a group. Or at the very least, the entire group
should be fairly involved in it's processes (see above on communication). Nobody
likes to be the one who has to do a disproportionately large/small amount of
work, especially if they don't know what they are contributing towards. One of
our issues include resource management and planning.

Our group had almost zero project experience, and only around a year of
programming experience. They were very quick to learn the new things taught in
this class, but only because they had to in order to survive. Out of the group,
I was the one who had the most of both, if only in theory. I helped come up with
the idea of the game, which meant that I created content for the game itself.
The only thing I could delegate as a task was the model and animation creation,
which I happily assigned to my group.

I cannot fault my group - they were going through school too. I couldn't expect
them to put many hours into a project that they (I think) cared less about (they
were neutral about it - not too passionate) than me (who's enthusiasm fluctuated
violently).

This left me with writing all the content (dialog, storyline, plot), programming
the game, implementing mechanics (1 of which was scrapped), and fiddling with
other bits and pieces that nobody else did.

I would blame only myself on this, since I based the entire idea of the project
on my own skill sets - what I was capable of doing. I had a general idea of how
the project was going to be finished while I had the project idea in my head. I
heard that good project managers must have a vision for the project, and this is
no exception. I had to figure out how the entire project would go down before
almost any work went into it, **and** have confidence knowing that everyone
would be able to finish it in the allocated time. Let me tell you: It's hard
to see into the future.

## Work Only When You Have To

Don't procrastinate. Have a good, solid, fixed timeline so that your team can
follow it and be on schedule... is what I would do if I were smarter, more
motivated and less distracted. Unfortunately for me and my group, I wasn't. For
the first month, I basically put the entire project on the back-burner and did
other things. This isn't really a project-specific idea, but a life tip in
general: don't procrastinate; don't wait till the last moment. The way our
teacher got to know our progress was through stages - we submitted reports,
files and models every few weeks for our professor to gauge our progress; those
counted for marks, and were basically assignments. The week before they were
due, we would just work our asses off at school (or perhaps, I would). There
were a couple of instances (last 2 months) where I practically lived in the
school computer lab (more than I already did - I normally would never leave that
place unless I needed to go to classes). I took classes at 8 AM, and left when
security kicks us all out, at 9 PM, a full 13 hours of work time, or 15 hours
away from home.

![line graph on week number vs hours worked][graph1]

The above graph shows the number of hours I worked every week. This project was
big enough that I decided to start doing time tracking, just for fun (the
spreadsheet took me 2 hours to tweak). You can see the days where I do next to
nothing. Also notice the spike due to a "check-up" assignment. In total, I
worked 85 hours, or 2 weeks, full time.

![pie chart on different categories I've worked][graph2]

I used most of my time on the programming portion, where I tried to implement 2
game mechanics - the dialog system (reads a specially formatted json file that I
designed) and object interaction system (scrapped; originally highlighted the
object you were looking at with a yellow glow, but with the side effect of
removing the original texture on the object, rendering it useless). The rest of
the time was spent on testing and bug fixing my code.

I needed to delegate more of game programming to my group. But here's the thing:
Unity is such a git-hostile environment that, even if my group was experienced
in git, we would still be having trouble with it. I need to learn to assign
tasks to the group better, and learn to trust them more.

[github]: https://github.com/cheukyin699/operation-omega
[teaser]: https://youtu.be/LoFFHOdB3xo
[graph1]: /res/images/time-week.png
[graph2]: /res/images/total-spent.png
