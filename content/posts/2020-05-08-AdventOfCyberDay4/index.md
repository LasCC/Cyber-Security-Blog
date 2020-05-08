---
title: "Advent of Cyber Day 4 Training"
author: Ludovic COULON
date: 2020-05-08
hero: ./images/hero.png
excerpt: "Advent of Cyber Day 4 Training"
secret: true
---

[TryHackMe | Advent of Cyber](https://tryhackme.com/room/25daysofchristmas)

With the entire incident, McElferson has been very stressed.

We need all hands on deck now

To help resolve things faster, she has asked you to help the new intern(mcsysadmin) get familiar with Linux. Access the machine via SSH on port 22 using the command

## Setup

**ssh mcsysadmin@[your-machines-ip]**

username: **mcsysadmin**

password: **bestelf1234**

Check out the supporting material [here](https://docs.google.com/document/d/1CpwM_MdHgRqlPSe4eCC_-rVgi8F1xh88PKOySTRSkxU/edit?usp=sharing)

**#1 How many visible files are there in the home directory(excluding ./ and ../)?**

```bash
8
(ls -la)
```

#2 What is the content of file5 ?

```bash
cat file5 -> recipies
```

#3 Which file contains the string ‘password’?

```bash
grep "password" *
file6:passwordHpKRQfdxzZocwg5O0RsiyLSVQon72CjFmsV4ZLGjxI8tXYo1NhLsEply
```

#4 What is the IP address in a file in the home folder?

```bash
grep -E -o "([0-9]{1,3}[\.]){3}[0-9]{1,3}" *
file2:10.0.0.05
```

#5 How many users can log into the machine?

```bash
cat /etc/passwd
3 (root, and the other users)
```

#6 What is the sha1 hash of file8?

```bash
sha1sum file8
fa67ee594358d83becdd2cb6c466b25320fd2835  file8
```

#7 What is mcsysadmin’s password hash?

```bash
cd /var/
cat shadow.bak
$6$jbosYsU/$qOYToX/hnKGjT0EscuUIiIqF8GHgokHdy/Rg/DaB.RgkrbeBXPdzpHdMLI6cQJLdFlS4gkBMzilDBYcQvu2ro/
```
