---
title: "Easy Steganography - TryHackMe"
category: "THM"
pubDate: 2020-05-15
description: "Writeup for the Easy Steganography room on TryHackMe"
---
[TryHackMe | Easy Steganography](https://tryhackme.com/room/easysteganography)

Download the zip file and start the hunt. Good luck!

### #1 Flag 1

```
➜  TryHackMe zsteg -a flag1.jpeg
[!] #<ZPNG::NotSupported: Unsupported header "\xFF\xD8\xFF\xE1\x00\x18Ex" in #<File:flag1.jpeg>>
```

As you can see there is something wrong with this image let's see the hex code of it

![](https://imgur.com/ASD7OKz.png)

```
➜  TryHackMe strings flag1.jpeg | grep "St"
D`St
St3g4n0
```

```
St3g4n0
```

### #2 Flag 2

```
➜  TryHackMe stegoveritas flag2.jpeg
```

![](https://imgur.com/ecLbV9Q.png)

```
Algorithm
```

### #3 Flag 3

```
➜  TryHackMe stegoveritas flag3.jpeg
```

```
comment: "The passphrase to this challenge is Math"
```

### #4 Flag 4

```
➜  TryHackMe strings flag4.jpeg
```

![](https://imgur.com/VRHCURv.png)

```
TryHardered
```


