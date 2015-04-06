---
layout: default
permalink: /archives/tag/
---

Go on, and click a tag...

{% capture tags %}
{% for tag in site.tags %}
{{ tag[0] }}
{% endfor %}
{% endcapture %}

{% assign sortedtags = tags | split: ' ' | sort %}

{% for stag in sortedtags %}
<a href="/archives/tag/{{ stag }}">{{ stag }}</a><br>
{% endfor %}
