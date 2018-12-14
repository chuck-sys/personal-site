---
---

rocket2Duration = ->
    diff = Date.now() - new Date(2018, 9, 29)
    months = diff / 2629800000 + 0.5

    document
        .getElementById 'rocket2-months'
        .innerHTML = Math.round months

rocket2Duration()
