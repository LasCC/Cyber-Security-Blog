---
title: "Basic XSS - Google"
author: Ludovic COULON
date: 2020-11-27
hero: ./images/hero.jpg
excerpt: "This room aims towards helping everyone learn about the basics of xss"
---

[ XSS-Game Website ](https://xss-game.appspot.com/level1)

# Level 1: Hello, world of XSS

## Mission Description

This level demonstrates a common cause of cross-site scripting where user input is directly included in the page without proper escaping.
Interact with the vulnerable application window below and find a way to make it execute JavaScript of your choosing. You can take actions inside the vulnerable window or directly edit its URL bar.

## Mission Objective

Inject a script to pop up a JavaScript alert() in the frame below.
Once you show the alert you will be able to advance to the next level.

<div className="Image__Small">
	<img src="https://i.imgur.com/3fn414G.png" alt="blog_image"/>
</div>

For the first one, this is pretty simple you just need to put some basic script tags with an alert() in it.

```javascript
	<script>alert("1")</script> 
```

<div className="Image__Small">
	<img src="https://i.imgur.com/g1iQGRh.png" alt="blog_image"/>
</div>

And there you go ! Your first challenge is done 👍

# Level 2: Persistence is key

## Mission Description

Web applications often keep user data in server-side and, increasingly, client-side databases and later display it to users. No matter where such user-controlled data comes from, it should be handled carefully.
This level shows how easily XSS bugs can be introduced in complex apps.

## Mission Objective

Inject a script to pop up an alert() in the context of the application.
Note: the application saves your posts so if you sneak in code to execute the alert, this level will be solved every time you reload it

<div className="Image__Small">
	<img src="https://i.imgur.com/oIs0vI9.png" alt="blog_image"/>
</div>

So, for this one you need to put some kind of alert in the comment section.

Let's do that ! 🥳

```javascript
	"><img src=x onerror=alert("XSS");>
```

Well, this not javascript? isn’t it? 
At the first glance that’s true but let me explain this sorcery 👀

Basically, this command escape from the attribute and from the tag (then you will be in the raw HTML) and create a new HTML tag to abuse ```"><img src=x onerror ...```

<div className="Image__Small">
	<img src="https://i.imgur.com/LaPftUq.png" alt="blog_image"/>
</div>

Nice ! Let's continue with the third challenge 🙌

# Level 3: That sinking feeling...

## Mission Description

As you've seen in the previous level, some common JS functions are execution sinks which means that they will cause the browser to execute any scripts that appear in their input. Sometimes this fact is hidden by higher-level APIs which use one of these functions under the hood.

The application on this level is using one such hidden sink.

## Mission Objective

As before, inject a script to pop up a JavaScript alert() in the app.

Since you can't enter your payload anywhere in the application, you will have to manually edit the address in the URL bar below.

<div className="Image__Small">
	<img src="https://i.imgur.com/9zAcV05.png" alt="blog_image"/>
</div>

For this one this is pretty mutch the same as the last one exept this time there is an alert.

```javascript
	1'><script>alert("XSS")</script>
```

This command escape the following HTML 

```html
	<div class="tab" id="tab1" onclick="chooseTab('1')">Image 1</div>
```

If we add the command at the end il will escape the ```'1'``` 

With : 
```'1''><script>alert("XSS")</script>```
and the alert will show up ! 🥳

<div className="Image__Small">
	<img src="https://i.imgur.com/ujbTkDu.png" alt="blog_image"/>
</div>

# Level 4: Context matters

## Mission Description

Every bit of user-supplied data must be correctly escaped for the context of the page in which it will appear. This level shows why.

## Mission Objective

Inject a script to pop up a JavaScript alert() in the application.

<div className="Image__Small">
	<img src="https://i.imgur.com/xUGG7Uz.png" alt="blog_image"/>
</div>

This one is a little bit tricky let me explain step by step

First, we can try to break the onload function with a simple quote exemple 

<div className="Image__Small">
	<img src="https://i.imgur.com/swwONYS.png" alt="blog_image"/>
</div>

As you can see on the javascript console, we create our first error ( that's great don't worry 🥴 )

Now that we create the error, what we gonna do now ?

Let's have a look at the source code here : 
```html
	<img onload="startTimer('300');" src="/static/loading.gif"></img>
```
https://xss-game.appspot.com/level4/frame?timer=3

Like the challenges before we can escape the startTime funtion with our own funtion let's try that !

```javascript
	3') || alert ('
``` 
You can found alot of xss payload on differents website 

```text
https://github.com/LasCC/Hack-Tools
https://owasp.org/www-community/xss-filter-evasion-cheatsheet
https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html
https://portswigger.net/web-security/cross-site-scripting/cheat-sheet
https://gist.github.com/kurobeats/9a613c9ab68914312cbb415134795b45
https://edu.heibai.org/XSS-Cheat-Sheet-2019-Edition-2.pdf
```

<div className="Image__Small">
	<img src="https://i.imgur.com/4fmxxQ7.png" alt="blog_image"/>
</div>

<center>
  <a href="https://tryhackme.com/p/boperXD" target="_blank">
    <img src="https://tryhackme-badges.s3.amazonaws.com/boperXD.png" alt="TryhackMeProfile" />
  </a>
</center>