---
layout: default
permalink: /archives/category/
---

Go on, and click a category...

{% capture categories %}
{% for cat in site.categories %}
{{ cat[0] }}
{% endfor %}
{% endcapture %}

{% assign sortedcats = categories | split: ' ' | sort %}

{% for scat in sortedcats %}
<a href="/archives/tag/{{ scat }}">{{ scat }}</a><br>
{% endfor %}
