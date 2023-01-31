---
layout: post
title: "lambda lambda - angstrom 2021"
date: "2021-04-07 12:06"
category: writeup
tags: [ctf, writeup, python, racket, lambda]
---

> **lambda lambda** [rev 130 points]
>
> lambda lambda lambda.... [lambda](/res/ctf-static/angstrom2021-lambda.py)?
>
> `2692665569775536810618960607010822800159298089096272924`
>
> hint: Ever hear about lambda calculus?

With my 2 semesters worth of experience in programming languages and compiler construction in Racket, I
thought I had the necessary skills to take this on. Here are the 2 approaches I took:

1. **[Analysis](#analysis).** By analyzing the lambdas in the code, I hoped to gain some understanding of
   what the code actually did. [Static](#analysis) and [Dynamic](#dynamic-analysis) were used.
2. **[Brute force](#brute-force).** By guessing what the lambdas did, I treated the code as an oracle and
   brute-forced a byte-by-byte decryption.

## Analysis

There are 2 types of analysis you can do on this code: static analysis and dynamic analysis. For static
analysis, I used Racket library `python` to parse the syntax and isolate the lambdas. I translated these
from the library's format into actual lambdas and did pattern matching on the terms. For instance, if we
encounter the pattern `(lambda (x) x)`, we identify it as the `identity` function. Another example would
be the Y-combinator, which does recursion by what I learned as "just-in-time" environment substitution.
Here's the function for this kind of pattern recognition:

```racket
;; Do pattern matching on the program
(define (optimize-lambdas x)
  (define (-opt x)
    (match x
      [`(λ (,a) ,a) 'identity]
      [`(λ (,a) (+ ,a 1)) 'add1]
      [`(λ (,a) (λ (,b) (,b ,a))) 'reverse-args]
      [`(λ (,a) (λ (,b) ,a)) 'sel1]
      [`(λ (,a) (λ (,b) ,b)) 'sel2]
      [`(λ (,n) (λ (,a) (λ (,b) ,b))) 'sel3]
      [`(λ (,g) (λ (,a) (λ (,b) (,a ((,g ,a) ,b))))) 'X]
      [`(λ (,a) (λ (,b) ((,a X) ,b))) 'aXb]
      [`(λ (,a) (λ (,b) (λ (,g) (,a (,b ,g))))) 'abg]
      [`(λ (,g) (λ (,e) (λ (,f) (((,g (λ (,p) (λ (,q) (,q (,p ,e))))) (λ (,n) ,f)) identity))))
        'fun1]
      [`(λ (,a) (λ (,b) ((,b fun1) ,a))) 'fun2]
      [`(λ (,a) ((,a sel3) sel1)) 'fun31]
      [`(λ (,a) ((,a sel2) sel1)) 'fun21]
      [`(λ (,a) (λ (,b) (fun31 ((fun2 (X ,a)) ,b)))) 'fun4]
      [`(λ (,f)
           ((λ (,x1) (,f (λ (,x2) ((,x1 ,x1) ,x2))))
            (λ (,x3) (,f (λ (,x4) ((,x3 ,x3) ,x4))))))
        'Y]
      [`(λ (,f)
           (λ (,x)
              (,f (,f (,f (,f (,f (,f (,f (,f (,f (,f (,f (,f (,f (,f (,f (,f ,x))))))))))))))))))
        'apply-16-times]
      [`(λ (,f) (λ (,x) (,f (,f ,x))))
        'apply-2-times]

      [`((reverse-args apply-2-times) ,x)
        `(,x apply-2-times)]
      [`((sel1 ,a) ,b) a]
      [`((sel2 ,a) ,b) b]
      [`(((sel3 ,n) ,a) ,b) b]

      [`(λ (,file)
           ((Y (λ (,f) (λ (,t) ((λ (,not-cond) (if (not ,not-cond) ,t (,f (X ,t))))
                                       (read ,file 1000)))))
            sel2))
        'read-1000]
      [`(λ (,x)
           ((Y (λ (,f-f) (λ (,X-F)
                                (if (eq? ((λ (,f) ((,f add1) 0)) ,X-F) ,x)
                                  ,X-F
                                  (,f-f (X ,X-F))))))
            identity))
        'main]

      [`((get-field read ,x) ,num) #:when (number? num) `(read ,x ,num)]
      [exprs #:when (list? exprs) (map -opt exprs)]
      [else x]))

  (-opt (-opt (-opt (-opt (-opt x))))))
```

Output (click [here](#end-of-output) to skip to the bottom of the output):

```lisp
(((((λ (g176)
      (λ (g177)
        (λ (g178)
          (λ (g179)
            (((Y
               (λ (g185)
                 (λ (g186)
                   (λ (g187)
                     (((λ (g188)
                         (λ (g189)
                           (if (not g188)
                             g186
                             ((g185
                               (+
                                (* g186 256)
                                ((λ (g190) ((g190 add1) 0))
                                 ((aXb g178)
                                  ((λ (g197)
                                     ((aXb
                                       ((abg
                                         (((Y
                                            (λ (g211)
                                              (λ (g212)
                                                (λ (g213)
                                                  (((((fun4 g212) g213)
                                                     (λ (g234) g212))
                                                    (λ (g235)
                                                      ((g211
                                                        ((fun2 g212) g213))
                                                       g213)))
                                                   sel2)))))
                                           g197)
                                          apply-16-times))
                                        apply-16-times))
                                      (((Y
                                         (λ (g256)
                                           (λ (g257)
                                             (λ (g258)
                                               (((((fun4 g257) g258) sel3)
                                                 (λ (g282)
                                                   (X
                                                    ((g256 ((fun2 g257) g258))
                                                     g258))))
                                                sel2)))))
                                        g197)
                                       apply-16-times)))
                                   (((λ (g299)
                                       (λ (g300)
                                         (((λ (g301)
                                             (λ (g302)
                                               (((((Y
                                                    (λ (g308)
                                                      (λ (g309)
                                                        (λ (g310)
                                                          (λ (g311)
                                                            (λ (g312)
                                                              ((((((λ (g313)
                                                                     (λ (g314)
                                                                       ((g313
                                                                         sel1)
                                                                        g314)))
                                                                   (g301
                                                                    g310))
                                                                  (g301 g311))
                                                                 (λ (g317)
                                                                   (((g301
                                                                      g310)
                                                                     ((aXb
                                                                       g309)
                                                                      ((g302
                                                                        g311)
                                                                       (g312
                                                                        apply-2-times))))
                                                                    ((aXb
                                                                      g309)
                                                                     ((g302
                                                                       g310)
                                                                      (g312
                                                                       apply-2-times))))))
                                                                (λ (g336)
                                                                  ((((g308
                                                                      ((aXb
                                                                        g309)
                                                                       ((g302
                                                                         (g312
                                                                          apply-2-times))
                                                                        (((λ (g346)
                                                                            (λ (g347)
                                                                              (((((λ (g348)
                                                                                    (λ (g349)
                                                                                      ((g348
                                                                                        sel1)
                                                                                       g349)))
                                                                                  (((λ (g352)
                                                                                      (λ (g353)
                                                                                        ((g352
                                                                                          g353)
                                                                                         sel2)))
                                                                                    (g301
                                                                                     g346))
                                                                                   (fun21
                                                                                    (g301
                                                                                     g347))))
                                                                                 (((λ (g361)
                                                                                     (λ (g362)
                                                                                       ((g361
                                                                                         g362)
                                                                                        sel2)))
                                                                                   (g301
                                                                                    g347))
                                                                                  (fun21
                                                                                   (g301
                                                                                    g346))))
                                                                                identity)
                                                                               sel2)))
                                                                          (((Y
                                                                             (λ (g378)
                                                                               (λ (g379)
                                                                                 (λ (g380)
                                                                                   (((((fun4
                                                                                        g379)
                                                                                       g380)
                                                                                      (λ (g401)
                                                                                        g379))
                                                                                     (λ (g402)
                                                                                       ((g378
                                                                                         ((fun2
                                                                                           g379)
                                                                                          g380))
                                                                                        g380)))
                                                                                    sel2)))))
                                                                            g310)
                                                                           apply-2-times))
                                                                         (((Y
                                                                            (λ (g421)
                                                                              (λ (g422)
                                                                                (λ (g423)
                                                                                  (((((fun4
                                                                                       g422)
                                                                                      g423)
                                                                                     (λ (g444)
                                                                                       g422))
                                                                                    (λ (g445)
                                                                                      ((g421
                                                                                        ((fun2
                                                                                          g422)
                                                                                         g423))
                                                                                       g423)))
                                                                                   sel2)))))
                                                                           g311)
                                                                          apply-2-times)))))
                                                                     (((Y
                                                                        (λ (g464)
                                                                          (λ (g465)
                                                                            (λ (g466)
                                                                              (((((fun4
                                                                                   g465)
                                                                                  g466)
                                                                                 sel3)
                                                                                (λ (g490)
                                                                                  (X
                                                                                   ((g464
                                                                                     ((fun2
                                                                                       g465)
                                                                                      g466))
                                                                                    g466))))
                                                                               sel2)))))
                                                                       g310)
                                                                      apply-2-times))
                                                                    (((Y
                                                                       (λ (g512)
                                                                         (λ (g513)
                                                                           (λ (g514)
                                                                             (((((fun4
                                                                                  g513)
                                                                                 g514)
                                                                                sel3)
                                                                               (λ (g538)
                                                                                 (X
                                                                                  ((g512
                                                                                    ((fun2
                                                                                      g513)
                                                                                     g514))
                                                                                   g514))))
                                                                              sel2)))))
                                                                      g311)
                                                                     apply-2-times))
                                                                   (X g312))))
                                                               sel2)))))))
                                                   sel2)
                                                  g299)
                                                 g300)
                                                sel2)))
                                           fun31)
                                          abg)))
                                     (g179 (ord g188)))
                                    (g179 (ord g189))))))))
                              (X g187)))))
                       (read g176 1))
                      (read g177 1))))))
              0)
             sel2)))))
    (open "./flag.txt"))
   (open __file__))
  (read-1000 (open __file__)))
 main)
```

<a name="end-of-output"></a>As you can see, even with all of this pattern matching, we don't have much in
terms of readable code. We see that we are reading `lambda.py` (which is `__file__`) and `flag.txt`
character by character (note that parameters `g176` and `g177` refer to `./flag.txt` and `lambda.py`
respectively if you follow the lambdas). We do addition and multiplication with some numbers and get some
result somehow, but not much else is known.

### Dynamic analysis

Here comes dynamic analysis to the rescue! We know that `lambda.py` outputs a number, and by changing
`flag.txt`, we change the output. Maybe by knowing the arguments given to the arithmetic operations, we
can hope to glean some information on what the program actually does.

So I added `printf` statements in the Python interpreter. I downloaded Python 3.5.10 source and made a few
modifications. The first thing to do was to find where addition and multiplication were implemented.
Python is special in that there is no limit to the size of `long` integers, so I know that addition and
multiplication are not trivially implemented.

After a bit of searching, I find what I'm looking for in `Objects/longobject.c` in functions `long_mul(a,
b)` and `long_add(a, b)`. I add the following lines:

```c
// Addition
printf("DEBUG: (+ %lu %lu) = %lu\n",
       MEDIUM_VALUE(a), MEDIUM_VALUE(b),
       MEDIUM_VALUE(a) + MEDIUM_VALUE(b));
// Multiplication
printf("DEBUG: (* %lu %lu) = %lu\n",
       MEDIUM_VALUE(a), MEDIUM_VALUE(b),
       MEDIUM_VALUE(a) * MEDIUM_VALUE(b));
```

They are added within the "fast multiplication"/"fast addition" if statements.

Also note that we call the `ord` function, so we add a `printf` in `Python/bltinmodules.c`
`builtin_ord(module, c)`:

```c
ord = (long)((unsigned char)*PyBytes_AS_STRING(c));
// Add following line after above line
printf("DEBUG: ORD('%c') = %d\n", *PyBytes_AS_STRING(c), ord);
```

We build this new interpreter and run `python lambda.py` yet again. And for brevity's sake I'm not going
to include console output because it is 6k lines long.

Unfortunately I didn't find the output to be too useful. There was just too much noise. And the fact that
the program only ever added 1 in addition (as far as I tested) probably didn't help.

## Brute force

After a while, [someone in the ctf team I'm in](https://twitter.com/nneonneo) uploaded their work in
pattern matching, only it was in python. They weren't done yet, but I noticed something interesting in the
main function:

```python
a = open('./flag.txt')
b = open('lambda.py')
def main(g, h):
    k = a.read(1)
    m = b.read(1)
    if not k:
        return g
    else:
        return main(g*256+(lambda g: g('insert more lambdas here')), X(h))
```

Did you catch it? The variable `g` functions as an accumulator. Each time we iterate, we shift `g` to the
left by 8 bits and add some result from a function that contains a character from `flag.txt` and
`lambda.py`. This suggests that each byte of `g` is independent of any other byte. Thus we can brute force
each byte. To make things faster, we test bytes against the first 24 bytes of `lambda.py`, since that's
what `open('lambda.py', 'r').read(1)` does. The script for my solution is as follows:

```python
import subprocess as sub

ENCRYPTED_FLAG = 2692665569775536810618960607010822800159298089096272924
ENCRYPTED_FLAG = bytes.fromhex('{:x}'.format(ENCRYPTED_FLAG))

FLAG_FILE = 'flag.txt'
LAMBDA_PY = 'lambda.py'         # we will be overwrite this file
COPY_LAMBDA = 'lambda.py.bak'   # backup file for copying and pasting each character

WHAT_WE_HAVE = 'actf{3p1c_0n'   # the script runs pretty slowly; don't want to wait that much
# actf{3p1c_0n3_l1n3r_95}

print('solved: %s' % WHAT_WE_HAVE)

with open(COPY_LAMBDA, 'r') as f:
    PLAINTEXT = f.read(len(ENCRYPTED_FLAG))

for i in range(len(WHAT_WE_HAVE), len(ENCRYPTED_FLAG)):
    solved = False

    with open(LAMBDA_PY, 'wb') as f:
        f.write(bytes([ord(PLAINTEXT[i])]))

    # try most sensible ascii values (zero doesn't work and errors out)
    for flag_i in range(1, 128):
        with open(FLAG_FILE, 'wb') as f:
            f.write(bytes([flag_i]))

        res = sub.run(['python', 'lambda-annotated.py'], capture_output=True)

        if int(res.stdout.decode('ascii')) == ENCRYPTED_FLAG[i]:
            if flag_i > 126 or flag_i < 32:
                print('0x{:x}'.format(flag_i))
            else:
                print(chr(flag_i))
            solved = True
            break

    if not solved:
        print('Could not solve this character. Skipping.')

print()
```

A slight issue occured where the character `3` in `0n3` was output as `0x3`, and the character next to it
couldn't be solved, leading me to guess those characters.
