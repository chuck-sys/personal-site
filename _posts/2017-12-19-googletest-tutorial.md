---
layout: post
title: Google Test Basic Tutorial
date: 2017-12-19 15:50
excerpt: "A google test tutorial/example."
category: tutorial
tags: [tutorial,c++,testing]
---

## Goal

The goal of this tutorial is to get you up and running with Google Test through
the examples given. This will be more of a walkthrough integrating Google Test
into your project.

## Pre-requisites

- Some basic proficiency in C++
- Some basic understanding of CMake
- Some understanding of [git][git] and [github][ghub]

## Google Test

[**Have this tab open for documentation**][gtest]. You'll need it.

## Getting Started

We will want the following directory structure:

```
.
├── CMakeLists.txt
├── include
│   └── inc.h
├── libs
│   ├── CMakeLists.txt
│   └── googletest
├── src
│   ├── CMakeLists.txt
│   └── lib.cc
└── tests
    ├── CMakeLists.txt
    ├── Main.cc
    └── TestAbs.cc
```

### Populating the files

Create your directories `include`, `libs`, `src`, and `tests`. Then populate
them with the following:

`CMakeLists.txt`

``` cmake
cmake_minimum_required(VERSION 3.1)
project(simple-lib)

enable_testing()

add_subdirectory(src)
```

The library that we will be making with be very simple, consisting only of a
single absolute value generic function. Because of good practice, we will
enclose said function inside of an aptly named namespace.

`include/inc.h`

``` cpp
#ifndef INC_H
#define INC_H

namespace lib {
    template<typename T>
    T abs(T);
}

#endif
```

`src/lib.cc`

``` cpp
#include "inc.h"

namespace lib {
    template<typename T>
    T abs (T v) {
        return v < 0? -v: v;
    }
}
```

`src/CMakeLists.txt`

``` cmake
set(src
    lib.cc)

include_directories(${simple-lib_SOURCE_DIR}/include)

add_library(slib ${src})
```

Now, let's add Google Test as a git submodule. Change directory to `libs`, and
execute the following:

``` sh
git submodule add git@github.com:google/googletest.git googletest
git submodule update --init --recursive
```

After adding it as a submodule, we will need to link it to our existing project.
Add to your root CMakeLists.txt file:

``` cmake
add_subdirectory(libs)
```

Insert the following into `libs/CMakeLists.txt`:

``` cmake
add_subdirectory(googletest)
```

## Writing Tests

Let's start with the `tests/CMakeLists.txt`:

``` cmake
set(src
    Main.cc
    TestAbs.cc)

add_executable(slib_test ${src})

include_directories("${simple-lib_SOURCE_DIR}/include")

# Link with google test libraries as well as simple-lib
target_link_libraries(slib_test gtest)
target_link_libraries(slib_test gtest_main)
target_link_libraries(slib_test slib)

# Your milage may vary with the COMMAND
add_test(
    NAME atest
    COMMAND build/tests/slib_test
    WORKING_DIRECTORY ${simple-lib_SOURCE_DIR})
```

For all this to work, we will need to use `add_subdirectory` in the
main `CMakeLists.txt` file, so make sure you do that.

``` cmake
add_subdirectory(tests)
```

For your `tests/Main.cc`, it will basically be the same, since we are using
Google Test. According to the documentation, you should have the following in
that file:

``` cpp
#include "gtest/gtest.h"

int main(int argc, char** argv) {
    ::testing::InitGoogleTest(&argc, argv);

    return RUN_ALL_TESTS();
}
```

To test the single function that this library provides, we create and populate
`tests/TestAbs.cc` with the following:

``` cpp
#include "gtest/gtest.h"
#include "inc.h"

using lib::abs;

TEST(AbsFunction, Functionality) {
    ASSERT_EQ(abs(50), 50);
    ASSERT_EQ(abs(-50), 50);
    ASSERT_EQ(abs(0), 0);
}
```

Other tests are set as an exercise to the reader.

## Linking and Compiling and Running

CMake projects are easy to link, compile, and run, given you have done your
`CMakeLists.txt` files correctly.

``` sh
mkdir build
cd build/

cmake ..
make
make test
```

And there you go! Since we are running the tests through CMake, it only shows up
as one test. If one would wish to see more detailed results of tests, you would
have to run the test executable directly.

``` sh
build/tests/slib_test
```

Which would (hopefully) give the output:

```
[==========] Running 2 tests from 1 test case.
[----------] Global test environment set-up.
[----------] 2 tests from AbsFunction
[ RUN      ] AbsFunction.Functionality
[       OK ] AbsFunction.Functionality (0 ms)
[ RUN      ] AbsFunction.DifferentTypes
[       OK ] AbsFunction.DifferentTypes (0 ms)
[----------] 2 tests from AbsFunction (0 ms total)

[----------] Global test environment tear-down
[==========] 2 tests from 1 test case ran. (0 ms total)
[  PASSED  ] 2 tests.
```

Extra test added, of course.

In my opinion, it gives much prettier output. Though, if you have other methods
of testing, `make test` would work nicely as well.

## Ending

[Here][sample-project] is a link to the tested project. Have a look!


[git]: https://git-scm.com/
[ghub]: https://github.com/
[gtest]: https://github.com/google/googletest
[sample-project]: https://github.com/cheukyin699/simple-library

