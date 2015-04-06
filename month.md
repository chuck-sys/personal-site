---
layout: default
permalink: /archives/month/
---

Go on, and click a month...

{% for post in site.posts %}

{% capture current_month %}{{ post.date | date: "%Y-%m" }}{% endcapture %}
{% capture next_month %}{{ post.next.date | date: "%Y-%m" }}{% endcapture %}

{% if current_month != next_month %}
<a href="/archives/month/{{ current_month }}">{{ post.date | date: "%b %Y" }}</a>
{% endif %}


{% endfor %}
