---
layout: default
title: Testing
---

## Testing

<ul>
  {% for post in site.categories.['testing'] %}
    <li><a href="{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>