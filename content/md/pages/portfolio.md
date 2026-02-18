{:title "Portfolio"
 :home? true
 :layout :page}

# Links

- [Github](https://github.com/chuck-sys)
- [LinkedIn](https://www.linkedin.com/in/cheukyin)

# Projects

**[scrabble-checker](https://github.com/chuck-sys/scrabble-checker-android)** in Kotlin. I first wrote
this app around 7 years ago following Android 4 best practices, which is extremely outdated. The current
version uses Jetpack Compose. It maps a custom binary file into memory and does lookups using it (binary
format is in the README), which is a performance improvement since the original trie implementation has
a whole bunch of memory overhead on startup because we create the nodes at startup. This also means we are
working with a 1.0 MB binary file memory footprint instead of the 2.8 MB text file we read and other
garbage collection overhead. A nice example of optimizing the hell out of a small thing.

**[pls](https://github.com/chuck-sys/pls)** in *Rust*. This is yet another PHP language server. It uses
the `tree-sitter` framework for parsing text into AST. Currently, it only has basic diagnostic features,
such as syntax checking, undefined variables, duplicate namespaces. Other features such as context-aware
auto-complete, diagnostics based on a strong type system, intelligent hover text, will be added at a later
time. I wrote this because other PHP language servers were pretty slow in indexing my files, and usually
caused noticeable slowdowns whenever I requested any auto-complete. After a few updates, they usually had
weird quirks such as highlighting large swaths of template files as errors. `pls` is different in that,
even though there are issues, they are understandable, and they are *my* issues, and therefore I don't
complain as much about them.

**[nlclc-stats](https://github.com/NLCLC-CM/stats)** via custom site generation in *Clojure*. This is
a client-based web app that shows statistics around worship service in our church. This is an experiment
in the amount of framework you need to build a website, without just typing everything in HTML. Thus, the
entire site can be viewed without any *Javascript* (though having Javascript would improve functionality).

**[superdiff](https://github.com/chuck-sys/superdiff)** in *Rust*. This is a CLI app that can find
similarities in file(s). It is mainly used to check for copy-pasted code. We don't use treesitter here
because I wanted it to be language-agnostic. Instead, we use edit distance to determine similarity.
Supports multi-threading and is pretty darn fast.

**[Rocket 2](https://github.com/ubclaunchpad/rocket2)** in *Python* with *mypy* type-checking, hosted with
auto ci/cd with *Inertia* and *docker-compose*. This is a web app that provided HR tools for the UBC
Launch Pad engineering club.

**[Jeopardy](https://gitlab.com/chucksys/jeopardy-vue)** in *Typescript* and *vue.js*. This is
a client-based web app that allows you to play Jeopardy-type games. This game is intended to be used in
screen-share software or on some projector.

**[Graph Visualizer](https://github.com/chuck-sys/graph-viz-js)** in *Javascript*.

**[Tom's Parable](https://github.com/chuck-sys/operation-omega)** in *C#* with *Unity*. This is
a short Windows-only 3D FPS game where you play the role of a detective. This game was created as a group
project for the TWU CS course "Intro to VR".

# Publications

Tsang, H. T., Zhong, Y., **Ng, C. Y.**, Otchie, O. W., & Chu, K. W. S. (2025). Scoping Review for Research
on AI-robotic Pets for Seniors. Proceedings of the ICGAL 2025 Meeting: Multidisciplinary Research and
Practice in the Age of GenAI, Budapest, Hungary.
