---
title: "The Impossible Challenge - TryHackMe"
author: Ludovic COULON
date: 2020-07-19
hero: ./images/hero.png
excerpt: "Writeup for the The Impossible Challenge room"
---

[TryHackMe | The Impossible Challenge](https://tryhackme.com/room/theimpossiblechallenge)

Download the file, and find the Flag!

qo qt q`r6 ro su pn s_ rn r6 p6 s_ q2 ps qq rs rp ps rt r4 pu pt qn r4 rq pt q` so pu ps r4 sq pu ps q2 su rn on oq o\_ pu ps ou r5 pu pt r4 sr rp qt pu rs q2 qt r4 r4 ro su pq o5

Let's download the file to see if there is some kind of help ?

![https://i.imgur.com/yjvNp4i.png](https://i.imgur.com/yjvNp4i.png)

Err, we need a password let's see if we can decode the hidden message that the creator of the room tell us.

![https://i.imgur.com/ap2H90U.png](https://i.imgur.com/ap2H90U.png)

```
ROT13 > ROT47 > HEX > Base64
--
It's inside the text, in front of your eyes!
```

Hmm well, there is something hidden in front of my eyes 👀 Let's find it !

![https://i.imgur.com/GjqBC5j.png](https://i.imgur.com/GjqBC5j.png)

When you hover the description message on the room you can see there is something odd, let's see if we can decode it !

This is unicode steganography with Zero-With Characters

[Unicode Steganography with Zero-Width Characters](https://330k.github.io/misc_tools/unicode_steganography.html)

![https://i.imgur.com/aXK0yTK.png](https://i.imgur.com/aXK0yTK.png)

```
Password to decode the archive : hahaezpz
```

![https://i.imgur.com/8PEL4sW.png](https://i.imgur.com/8PEL4sW.png)

```
THM{Zero_Width_Characters_EZPZ}
```

<center>
  <a href="https://tryhackme.com/p/boperXD" target="_blank">
    <img src="https://i.imgur.com/kUD3W5P.png" alt="TryhackMeProfile" />
  </a>
</center>
