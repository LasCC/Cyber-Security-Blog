---
title: "Easy Steganography - TryHackMe"
author: Ludovic COULON
date: 2020-05-15
hero: ./images/hero.png
excerpt: "Writeup for the Easy Steganography room on TryHackMe"
---

[TryHackMe | Easy Steganography](https://tryhackme.com/room/easysteganography)

Download the zip file and start the hunt. Good luck!

### #1 Flag 1

```bash
➜  TryHackMe zsteg -a flag1.jpeg
[!] #<ZPNG::NotSupported: Unsupported header "\xFF\xD8\xFF\xE1\x00\x18Ex" in #<File:flag1.jpeg>>
```

As you can see there is something wrong with this image let's see the hex code of it

<div className="Image__Small">
  <img src="https://imgur.com/ASD7OKz.png" alt="blog_image"/>
</div>

```bash
➜  TryHackMe strings flag1.jpeg | grep "St"
D`St
St3g4n0
```

```bash
St3g4n0
```

### #2 Flag 2

```bash
➜  TryHackMe stegoveritas flag2.jpeg
```

<div className="Image__Medium">
  <img src="https://imgur.com/ecLbV9Q.png" alt="blog_image"/>
</div>

```bash
Algorithm
```

### #3 Flag 3

```bash
➜  TryHackMe stegoveritas flag3.jpeg
```

```bash
comment: "The passphrase to this challenge is Math"
```

### #4 Flag 4

```bash
➜  TryHackMe strings flag4.jpeg
```

<div className="Image__Medium">
  <img src="https://imgur.com/VRHCURv.png" alt="blog_image"/>
</div>

```bash
TryHardered
```

<center>
  <a href="https://tryhackme.com/p/boperXD" target="_blank">
    <img src="https://i.imgur.com/tpmhPhO.png" alt="TryhackMeProfile" />
  </a>
</center>
