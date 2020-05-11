---
title: Vulnversity - TryHackMe
author: Ludovic COULON
date: 2020-05-08
hero: ./images/hero.png
excerpt: Vulnversity - TryHackMe writeup
---

[TryHackMe | Vulnversity](https://tryhackme.com/room/vulnversity)

# Setup / Scan

```
sudo nmap -sC -O -p- 10.10.51.145
```

Gather information about this machine using a network scanning tool called nmap.

Don't have a Linux machine with nmap on? Deploy your own Kali machine and control it with your browser.

#1
Scan this box: nmap -sV

### 2# Scan the box, how many ports are open?

```
6
```

### 3# What version of the squid proxy is running on the machine?

```
3.5.12
```

### 4# How many ports will nmap scan if the flag -p-400 was used?

```
400
```

### 5# Using the nmap flag -n what will it not resolve?

```
DNS
```

### 6# What is the most likely operating system this machine is running?

```
Ubuntu
```

### 7# What port is the web server running on?

```
3333
```

Using a fast directory discovery tool called GoBuster you will locate a directory that you can use to upload a shell to.

### 2# What is the directory that has an upload form page?

```
/internal/
```

Now you have found a form to upload files, we can leverage this to upload and execute our payload that will lead to compromising the web server.

### 1# Try upload a few file types to the server, what common extension seems to be blocked?

```
php
```

### 3# We're going to use Intruder (used for automating customised attacks).

To begin, make a wordlist with the following extensions in:

Now make sure BurpSuite is configured to intercept all your browser traffic. Upload a file, once this request is captured, send it to the Intruder. Click on "Payloads" and select the "Sniper" attack type.

Click the "Positions" tab now, find the filename and "Add §" to the extension. It should look like so:

Run this attack, what extension is allowed?

```
.phtml
```

### 5# What user was running the web server?

```
bill
```

### 6# What is the user flag?

```
8bd7992fbe8a6ad22a63361004cfcedb
```

Now you have compromised this machine, we are going to escalate our privileges and become the superuser (root).

### 1# In Linux, SUID (set owner userId upon execution) is a special type of file permission given to a file. SUID gives temporary permissions to a user to run the program/file with the permission of the file owner (rather than the user who runs it).

For example, the binary file to change your password has the SUID bit set on it (/usr/bin/passwd). This is because to change your password, it will need to write to the shadowers file that you do not have access to, root does, so it has root privileges to make the right changes.

On the system, search for all SUID files. What file stands out?

```
/bin/systemctl
```

### 2# Its challenge time! We have guided you through this far, are you able to exploit this system further to escalate your privileges and get the final answer?

Become root and get the last flag (/root/root.txt)

```
a58ff8579f0a9270368d33a9966c7fd5
```
