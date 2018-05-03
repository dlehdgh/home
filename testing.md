---
layout: default
title: Testing
---

## 최근 게시글

<ul>
  {% for post in site.categories.['testing'] %}
    <li><a href="{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>