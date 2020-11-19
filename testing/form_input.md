---
layout: default
title: 입력란(input)
excerpt: 
---

<h2>입력란(input)</h2>

<p>
	<label for="name">이름</label><br>
	<input type="text" id="name">
</p>
<p>
	<label for="user_id">아이디</label><br>
	<input type="text" id="user_id">
</p>
<p>
	<label for="user_pw">비밀번호</label><br>
	<input type="password" id="user_pw">
</p>
<p>
	<label for="email">이메일</label><br>
	<input type="email" id="email">
</p>
<p>
	<span id="phone">전화번호</span><br>
	<input type="text" size="3" title="첫번째 자리" aria-describedby="phone"> - 
	<input type="text" size="4" title="두번째 자리" aria-describedby="phone"> - 
	<input type="text" size="4" title="세번째 자리" aria-describedby="phone">
</p>

<p><a href="#" onclick="history.back(-1);">← 이전 페이지</a></p>
