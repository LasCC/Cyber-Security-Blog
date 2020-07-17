---
title: "Cicada-3301 Vol-1 - TryHackMe"
author: Ludovic COULON
date: 2020-05-17
hero: ./images/hero.jpeg
excerpt: "Writeup for the Cicada-3301 Vol-1 room on TryHackMe"
---

[TryHackMe | Cicada-3301 Vol-1](https://tryhackme.com/room/cicada3301vol1)

Web Browsers are useless here

Welcome.

Good Luck

-3301

### #1 What is the link inside of the audio?

<div className="Image__Medium">
  <img src="https://imgur.com/nLyQPoI.png" alt="blog_image" />
</div>

```bash
https://pastebin.com/wphPq0Aa
```

---

Welcome.

Good Luck.

-3301

Use various encryption methods and ciphers to decode the passphrase and access the metadata of Welcome.jpg

### #1 Find and Decrypt the passphrase and key

```bash
No answer needed
```

### #2 What is the decrypted passphrase?

```bash
Passphrase: SG01Ul80X1A0NTVtaHA0NTMh
Key: Q2ljYWRh
```

```bash
❯ echo SG01Ul80X1A0NTVtaHA0NTMh | base64 -d
Hm5R_4_P455mhp453!%
```

### #3 What is the decrypted key?

```bash
❯ echo Q2ljYWRh | base64 -d
Cicada
```

### #4 Still looks funny? Find and use a cipher along with the key to decipher the passphrase

```bash
No answer needed
```

### #5 What is the final passphrase

<div className="Image__Small">
  <img src="https://imgur.com/GQp9XWZ.png" alt="blog_image" />
</div>

```bash
Ju5T_4_P455phr453!
```

---

Good Luck

-3301

Use Steganography tools to gather metadata from Welcome.jpg as well as find the hidden message inside of the image file.

### #1 Using the found passphrase along with Stego tools find the secret message

```bash
No answser needed
```

### #2 What link is given?

```bash
➜  TryHackMe steghide extract -sf welcome.jpg
Enter passphrase:
wrote extracted data to "invitation.txt".
➜  TryHackMe cat invitation.txt
https://imgur.com/a/c0ZSZga
➜  TryHackMe
```

---

I am surprised you have made it this far...

I doubt you will make it any further.

-3301

Use Stego tools to find the hidden files inside of the image

[https://github.com/crorvick/outguess](https://github.com/crorvick/outguess)

### #1 Using stego tools find the hidden file inside of the image

```bash
No answser needed
```

### #2 What tool did you use to find the hidden file

```bash
➜  TryHackMe outguess -r 8S8OaQw.jpg bope
Reading 8S8OaQw.jpg....
Extracting usable bits:   29035 bits
Steg retrieve: seed: 38, len: 1351
➜  TryHackMe cat bope
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA1

Welcome again.

Here is a book code.  To find the book, break this hash:

b6a233fb9b2d8772b636ab581169b58c98bd4b8df25e452911ef75561df649edc8852846e81837136840f3aa453e83d86323082d5b6002a16bc20c1560828348

I:1:6
I:2:15
I:3:26
I:5:4
I:6:15
I:10:26
/
/
I:13:5
I:13:1
I:14:7
I:3:29
I:19:8
I:22:25
/
I:23:-1
I:19:-1
I:2:21
I:5:9
I:24:-2
I:22:1
I:38:1

Good luck.

3301

-----BEGIN PGP SIGNATURE-----
Version: GnuPG v1.4.11 (GNU/Linux)

iQIcBAEBAgAGBQJQ5QoZAAoJEBgfAeV6NQkPf2IQAKWgwI5EC33Hzje+YfeaLf6m
sLKjpc2Go98BWGReikDLS4PpkjX962L4Q3TZyzGenjJSUAEcyoHVINbqvK1sMvE5
9lBPmsdBMDPreA8oAZ3cbwtI3QuOFi3tY2qI5sJ7GSfUgiuI6FVVYTU/iXhXbHtL
boY4Sql5y7GaZ65cmH0eA6/418d9KL3Qq3qkTcM/tRAHhOZFMZfT42nsbcvZ2sWi
YyrAT5C+gs53YhODxEY0T9M2fam5AgUIWrMQa3oTRHSoNAefrDuOE7YtPy40j7kk
5/5RztmAzeEdRd8QS1ktHMezXEhdDP/DEdIJCLT5eA27VnTY4+x1Ag9tsDFuitY4
2kEaVtCrf/36JAAwEcwOg2B/stdjXe10RHFStY0N9wQdReW3yAOBohvtOubicbYY
mSCS1Bx91z7uYOo2QwtRaxNs69beSSy+oWBef4uTir8Q6WmgJpmzgmeG7ttEHquj
69CLSOWOm6Yc6qixsZy7ZkYDrSVrPwpAZdEXip7OHST5QE/Rd1M8RWCOODba16Lu
URKvgl0/nZumrPQYbB1roxAaCMtlMoIOvwcyldO0iOQ/2iD4Y0L4sTL7ojq2UYwX
bCotrhYv1srzBIOh+8vuBhV9ROnf/gab4tJII063EmztkBJ+HLfst0qZFAPHQG22
41kaNgYIYeikTrweFqSK
=Ybd6
-----END PGP SIGNATURE-----
➜  TryHackMe
```

---

We have one last challenge to find our individuals

Find the last clue, crack the hash, decipher the message

Good Luck

-3301

Use Hash cracking tools to reveal the text to the text

Use methods like Cicada to decipher the message

[Hash sha512: b6a233fb9b2d8772b636ab581169b58c98bd4b8df25e452911e](https://md5hashing.net/hash/sha512/b6a233fb9b2d8772b636ab581169b58c98bd4b8df25e452911ef75561df649edc8852846e81837136840f3aa453e83d86323082d5b6002a16bc20c1560828348)

### #1 Crack the Hash

```bash
No answser needed
```

### #2 What is the Hash type?

```bash
➜  TryHackMe hash-identifier
   #########################################################################
   #     __  __                     __           ______    _____           #
   #    /\ \/\ \                   /\ \         /\__  _\  /\  _ `\         #
   #    \ \ \_\ \     __      ____ \ \ \___     \/_/\ \/  \ \ \/\ \        #
   #     \ \  _  \  /'__`\   / ,__\ \ \  _ `\      \ \ \   \ \ \ \ \       #
   #      \ \ \ \ \/\ \_\ \_/\__, `\ \ \ \ \ \      \_\ \__ \ \ \_\ \      #
   #       \ \_\ \_\ \___ \_\/\____/  \ \_\ \_\     /\_____\ \ \____/      #
   #        \/_/\/_/\/__/\/_/\/___/    \/_/\/_/     \/_____/  \/___/  v1.2 #
   #                                                             By Zion3R #
   #                                                    www.Blackploit.com #
   #                                                   Root@Blackploit.com #
   #########################################################################
--------------------------------------------------
 HASH: b6a233fb9b2d8772b636ab581169b58c98bd4b8df25e452911ef75561df649edc8852846e81837136840f3aa453e83d86323082d5b6002a16bc20c1560828348

Possible Hashs:
[+] SHA-512
[+] Whirlpool

Least Possible Hashs:
[+] SHA-512(HMAC)
[+] Whirlpool(HMAC)
```

### #3 What is the Link from the hash?

<div className="Image__Medium">
  <img src="https://imgur.com/9mTiHvr.png" alt="blog_image" />
</div>

```bash
https://pastebin.com/6FNiVLh5
```

### #4 Decipher the message

```bash
No answser needed
```

### #5 What is the link?

For this response its a bit tricky to find out, the fist number is equal to the number on the paste-bin and the second one is for the number of the character on the line

```bash
https://pastebin.com/raw/6FNiVLh5 # The paste-bin decoded before

I:1:6 = h # Exemple = Number 1, character number 6
I:2:15 = t
I:3:26 = t
I:5:4 = p
I:6:15 = s
I:10:26 = :
/ = /
/ = /
I:13:5 = b
I:13:1 = i
I:14:7 = t
I:3:29 = .
I:19:8 = l
I:22:25 = y
/ = /
I:23:-1 = 3
I:19:-1 = 9
I:2:21 = p
I:5:9 = w
I:24:-2 = 2
I:22:1 = N
I:38:1 = H
```

```bash
https://bit.ly/39pw2NH
https://soundcloud.com/user-984804993/the-instar-emergence
```

---

We have found the individuals we sought

-3301

[SoundCloud Downloader](https://sclouddownloader.net/)

### #1 What is the song linked?

<div className="Image__Medium">
  <img src="https://imgur.com/FBagj7q.png" alt="blog_image" />
</div>

```bash
The Instar Emergence
```

<center>
  <a href="https://tryhackme.com/p/boperXD" target="_blank">
    <img src="https://i.imgur.com/hejzVWP.png" alt="TryhackMeProfile" />
  </a>
</center>
