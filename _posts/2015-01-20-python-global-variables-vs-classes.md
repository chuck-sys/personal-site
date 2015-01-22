---
layout: post
title: Python global variables vs classes
date: 2015-01-20 18:30
categories: python testing
tags: [python, testing, question]
---

In programming class, the guys sitting next to me found this amazing thing, where you could setup a
static class, put variables into it, and treat it as a normal variables, so that in functions, you
do not need to call it via `global` keyword. Example:

``` python
# The 'global' class
class glo:
    val = 0

def addone(): return glo.val+1

glo.val = addone()

print glo.val
```

Outputs:

```
1
```

I decided to test to see if using the static class as a 'global variable' really was more efficient
than using global variables in functions.

``` python
import time

# Static 'global' class
class glo:
    val = 0

gloval = 0          # A global variable

# For timing
classacctime = 0
gloacctime = 0

# For testing
trytimes = 100
upto = int(1e4)

def addoneclass():
    # Adds one to glo.val
    glo.val += 1

def addonevar():
    # Adds one to gloval
    global gloval
    gloval += 1

# Begin testing for class variable
for trys in xrange(trytimes):
    begintime = time.time()
    for i in xrange(upto):
        addoneclass()
    glo.val = 0             # Reset
    classacctime += time.time()-begintime

# Begin testing for global variable
for trys in xrange(trytimes):
    begintime = time.time()
    for i in xrange(upto):
        addonevar()
    gloval = 0              # Reset
    gloacctime += time.time()-begintime

# Print results
print "Class Test: ave: %fs, total: %fs" % (classacctime/trytimes, classacctime)
print "Variables Test: ave: %fs, total: %fs" % (gloacctime/trytimes, gloacctime)
```

The above code gave me the output:

```
Class Test: ave: 0.009418s, total: 0.941771s
Variables Test: ave: 0.007923s, total: 0.792300s
```

### Conclusion

Don't listen to everything your friends have to say. Test first.
