---
layout: default
permalink: /archives/year/
---

Go on, and click a year...

{% for post in site.posts %}

{% capture current_year %}{{ post.date | date: "%Y" }}{% endcapture %}
{% capture next_year %}{{ post.next.date | date: "%Y" }}{% endcapture %}

{% if current_year != next_year %}
<a href="/archives/year/{{ current_year }}">{{ current_year }}</a>
{% endif %}


{% endfor %}
