---
title: "Advent of Cyber Day 7 Skilling Up"
author: Ludovic COULON
date: 2020-05-08
hero: ./images/hero.png
excerpt: "Advent of Cyber Day 7 Skilling Up"
secret: true
---

[TryHackMe | Advent of Cyber](https://tryhackme.com/room/25daysofchristmas)

Previously, we saw mcsysadmin learning the basics of Linux. With the on-going crisis, McElferson has been very impressed and is looking to push mcsysadmin to the security team. One of the first things they have to do is look at some strange machines that they found on their network.

Check out the supporting material [here](https://docs.google.com/document/d/1q0FziVZM3zCWhcgtPpljVPzkBX0fMAh6ebrXVM5rg08/edit?usp=sharing).

### **#1 How many TCP ports under 1000 are open?**

```bash
sudo nmap -sT -p-1000 10.10.199.156
"3" ports
```

### **#2 What is the name of the OS of the host?**

```bash
sudo nmap -A -p- -vv -oN nmapScanSkillingUp.txt 10.10.199.156
cat nmapScanSkillingUp.txt | grep "OS"
"linux"
```

### **#3 What version of SSH is running?**

```bash
sudo nmap -A -p- -vv -oN nmapScanSkillingUp.txt 10.10.199.156
cat nmapScanSkillingUp.txt | grep "SSH"
Host is up (0.065s latency).
Not shown: 65531 closed ports
PORT      STATE SERVICE VERSION
22/tcp    open  ssh     "OpenSSH 7.4" (protocol 2.0)
111/tcp   open  rpcbind 2-4 (RPC #100000)
999/tcp   open  http    SimpleHTTPServer 0.6 (Python 3.6.8)
39239/tcp open  status  1 (RPC #100024)
```

### **#4 What is the name of the file that is accessible on the server you found running?**

```bash
sudo nmap -sT -p-1000  10.10.199.156
Starting Nmap 7.80 ( https://nmap.org ) at 2020-05-05 17:17 EDT
Nmap scan report for 10.10.199.156
Host is up (0.097s latency).
Not shown: 997 closed ports
PORT    STATE SERVICE
22/tcp  open  ssh
111/tcp open  rpcbind
999/tcp open  garcon

wget http://10.10.199.156:999
"interesting.file"
```
