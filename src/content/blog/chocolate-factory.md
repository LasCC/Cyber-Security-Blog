---
title: "Chocolate Factory - TryHackMe"
category: "THM"
pubDate: 2021-01-22
description: "This room was designed so that hackers can revisit the Willy Wonka's Chocolate Factory and meet Oompa Loompa"
---
[TryHackMe | Chocolate Factory](https://tryhackme.com/room/chocolatefactory)


**Welcome to Willy Wonka's Chocolate Factory!**

![https://i.pinimg.com/originals/01/86/9e/01869e0b2238d8307020d2c4503cec51.jpg](https://i.pinimg.com/originals/01/86/9e/01869e0b2238d8307020d2c4503cec51.jpg)

This room was designed so that hackers can revisit the Willy Wonka's Chocolate Factory and meet Oompa Loompa

This is a beginner friendly room!

If you have any issues / queries you can reach us through [Discord](https://discord.gg/AC2Enww) or [Twitter.](https://twitter.com/andyinfosec_?lang=en)

( Created by [AndyInfosec](https://andyinfosec.com/) team for the community! )

---

# Setup

```
TryHackMe/chocolate_factory » nmap -A --vv 10.10.239.0
```

```
21/tcp  open  ftp        syn-ack vsftpd 3.0.3
|_auth-owners: ERROR: Script execution failed (use -d to debug)
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
|_-rw-rw-r--    1 1000     1000       208838 Sep 30 14:31 gum_room.jpg
| ftp-syst:
|   STAT:
| FTP server status:
|      Connected to ::ffff:10.14.6.119
|      Logged in as ftp
|      TYPE: ASCII
|      No session bandwidth limit
|      Session timeout in seconds is 300
|      Control connection is plain text
|      Data connections will be plain text
|      At session startup, client count was 4
|      vsFTPd 3.0.3 - secure, fast, stable
|_End of status

22/tcp  open  ssh        syn-ack OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
|_auth-owners: ERROR: Script execution failed (use -d to debug)
| ssh-hostkey:
|   2048 16:31:bb:b5:1f:cc:cc:12:14:8f:f0:d8:33:b0:08:9b (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCuEAWoQHbW+vehIUZLTiJyXKjUAAJP0sgW/P0LHVaf4C5+1oEBXcDBBZC7SoL6MTMYn8zlEfhCbjQb7A/Yf2IxLzU5f35yuhEbWEvYmuP4PmBB04CJdDItU0xwAbGsufyzZ6td6LKm+oim8xJn/lVTeykVZTASF9iuY9tqwA933AfjqKlNByj82TAmlVkQ93bq+e7Gu/pRkSn++RkIUd4f8ogmLLusEh+vbGkZDj4UdwTIZbOSeuS4oz/umpkJPhekGVoyzjPMRIq9cwdeKIVRwUNbp4BoJjYKjbCC9YY8u/7O6lhtwo4uAp7Q9PfRRCiCpVimm6kIgBmgqqKbueDl
|   256 e7:1f:c9:db:3e:aa:44:b6:72:10:3c:ee:db:1d:33:90 (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBAYfNs0w6oOdzMM4B2JyB5pWr1qq9oB+xF0Voyn4gBYEGPC9+dqPudYagioH1ArjIHZFF0G24rt7L/6x1OPJSts=
|   256 b4:45:02:b6:24:8e:a9:06:5f:6c:79:44:8a:06:55:5e (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIAwurtl1AFxJU7cHOfbCNr34YoTmAVnVUIXt4QHPD1B2

80/tcp  open  http       syn-ack Apache httpd 2.4.29 ((Ubuntu))
|_auth-owners: ERROR: Script execution failed (use -d to debug)
| http-methods:
|_  Supported Methods: OPTIONS HEAD GET POST
|_http-server-header: Apache/2.4.29 (Ubuntu)
|_http-title: Site doesnt have a title (text/html).
100/tcp open  newacct?   syn-ack
|_auth-owners: ERROR: Script execution failed (use -d to debug)
| fingerprint-strings:
|   GenericLines, NULL:
|     Welcome to chocolate room!!
|     small hint from Mr.Wonka : Look somewhere else, its not here! ;)
|_    hope you wont drown Augustus
```

Nice, we can see that there is a lot of ports open in that room, let's in the FTP with the anonymous login to see if there is something hidden in there 👀

![https://i.imgur.com/HmslKMI.png](https://i.imgur.com/HmslKMI.png)

Well, as you can see there is a jpg file in the FTP server let's see if there is some kind of password in there.

Well, I think this is a rabbit hole, let's continue with the website.

```
TryHackMe/chocolate_factory » gobuster -u http://10.10.239.0/ -w /opt/directory-list-2.3-medium.txt -x php
```

```
Gobuster v1.3                OJ Reeves (@TheColonial)
=====================================================
[+] Mode         : dir
[+] Url/Domain   : http://10.10.239.0/
[+] Threads      : 10
[+] Wordlist     : /opt/directory-list-2.3-medium.txt
[+] Status codes : 302,307,200,204,301
[+] Extensions   : .php
=====================================================
/home.php (Status: 200)
```

With the `-x php` we can tell at gobuster that we want only the .php extension and as you can see it worked!

![https://i.imgur.com/yNlNwIt.jpg](https://i.imgur.com/yNlNwIt.jpg)

And of-course the only input contain an RCE 👍

![https://i.imgur.com/iiWEYxK.png](https://i.imgur.com/iiWEYxK.png)

Let's create a reverse shell on the remote server.

![https://i.imgur.com/MMWbLfw.png](https://i.imgur.com/MMWbLfw.png)

#AD this is actually my own chrome extension to generate reverse-shells and many more cool things 😎

![https://i.imgur.com/IQ2eaE3.png](https://i.imgur.com/IQ2eaE3.png)

And voilà! we have a reverse shell 🙌

# Enter the key you found!

```
b'-VkgXhFf6sAEcAwrC6YR-SZbiuSb8ABXeQuvhcGSQzY='
```

![https://i.imgur.com/FlUXUYi.png](https://i.imgur.com/FlUXUYi.png)

# What is Charlie's password?

```
cn7824
```

![https://i.imgur.com/3o4JOjA.png](https://i.imgur.com/3o4JOjA.png)

# Enter the user flag

Unfortunately with the basic reverse shell I cannot su to the Charlie's account so I looked on the `/home/charlie` folder and i found a private SSH key

![https://i.imgur.com/24wrKP2.png](https://i.imgur.com/24wrKP2.png)

![https://i.imgur.com/1eChcjq.png](https://i.imgur.com/1eChcjq.png)

![https://i.imgur.com/5qcdkLc.png](https://i.imgur.com/5qcdkLc.png)

And there you go! We have the access to the Charlie's account! 

```
chmod 600 [id_rsa]
ssh -i id_rsa charlie@[ip]
```

```
# Please reproduce the challenge its not that hard 👀
flag{cd*********************d2e}
```

# Enter the root flag

![https://i.imgur.com/ce7yIjK.png](https://i.imgur.com/ce7yIjK.png)

As you can see charlie can use sudo with VI let's see if there is a privesc in gtfobin 🥴

![https://i.imgur.com/ce7yIjK.png](https://i.imgur.com/ce7yIjK.png)

![https://i.imgur.com/VJLH9LZ.png](https://i.imgur.com/VJLH9LZ.png)

![https://i.imgur.com/P3FH1Dp.png](https://i.imgur.com/P3FH1Dp.png)

```
flag{cec*****************2124}
```

