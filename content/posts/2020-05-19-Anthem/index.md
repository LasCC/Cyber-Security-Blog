---
title: "Anthem - TryHackMe"
author: Ludovic COULON
date: 2020-05-19
hero: ./images/hero.png
excerpt: "Writeup for the Anthem on TryHackMe"
---

[TryHackMe | Anthem](https://tryhackme.com/room/Anthem)

This task involves you, paying attention to details and finding the 'keys to the castle'.

This room is designed for beginners, however, everyone is welcomed to try it out!

Enjoy the Anthem.

In this room, you don't need to brute force any login page. Just your preferred browser and Remote Desktop.

### #1 Let's run nmap and check what ports are open.

```bash
➜  TryHackMe nmap -sV -sC -A -vv 10.10.128.241
```

```bash
24/tcp   filtered priv-mail     no-response

80/tcp   open     http          syn-ack     Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)
| http-methods:
|_  Supported Methods: OPTIONS

135/tcp  open     msrpc         syn-ack     Microsoft Windows RPC

139/tcp  open     netbios-ssn   syn-ack     Microsoft Windows netbios-ssn

445/tcp  open     microsoft-ds? syn-ack

3389/tcp open     ms-wbt-server syn-ack     Microsoft Terminal Services
| rdp-ntlm-info:
|   Target_Name: WIN-LU09299160F
|   NetBIOS_Domain_Name: WIN-LU09299160F
|   NetBIOS_Computer_Name: WIN-LU09299160F
|   DNS_Domain_Name: WIN-LU09299160F
|   DNS_Computer_Name: WIN-LU09299160F
|   Product_Version: 10.0.17763
|_  System_Time: 2020-05-17T20:55:06+00:00
| ssl-cert: Subject: commonName=WIN-LU09299160F
| Issuer: commonName=WIN-LU09299160F
| Public Key type: rsa
| Public Key bits: 2048
| Signature Algorithm: sha256WithRSAEncryption
| Not valid before: 2020-04-04T22:56:38
| Not valid after:  2020-10-04T22:56:38
| MD5:   2814 61de 95b7 e9b5 4789 3027 7f1f 60d2
| SHA-1: d47d 2a8f 6143 b820 936e 4120 cdd1 9ddc 5385 d285
| -----BEGIN CERTIFICATE-----
| MIIC4jCCAcqgAwIBAgIQObhN9c8QnIVGx+ZslzEOmzANBgkqhkiG9w0BAQsFADAa
| MRgwFgYDVQQDEw9XSU4tTFUwOTI5OTE2MEYwHhcNMjAwNDA0MjI1NjM4WhcNMjAx
| MDA0MjI1NjM4WjAaMRgwFgYDVQQDEw9XSU4tTFUwOTI5OTE2MEYwggEiMA0GCSqG
| SIb3DQEBAQUAA4IBDwAwggEKAoIBAQDA4MPIi4yCYJlBv6vwXF5lu5NbQCPQxk4q
| 7lJsJSvTRSIFi2fVl3l+rWTr69mutnVqo+bMilJorN2B6DqsCJBV+7pITFSICM6b
| +G/sOEblVust2tUU8NLbAiBH9oXhF0P5dIhMzRC4pcZjhCRR+IcOjnABTCkdAchD
| Mf4XQJx6GZOXBCBMXGW/vCKZ0q8gti7Hxs36W1ctbj8/i5obd0k0BonMlvRwKxvi
| 7SS+3NrBpc4XivD23YIqCNzErOB19DV3JqZMvbE+NhLEQA51Au2svYwgoJcIIyEC
| HBuINXeFBB+p5dMwp4wppkHN0CuquUyCBZvIPlDW8SAOAc5tgUOJAgMBAAGjJDAi
| MBMGA1UdJQQMMAoGCCsGAQUFBwMBMAsGA1UdDwQEAwIEMDANBgkqhkiG9w0BAQsF
| AAOCAQEAAziR6P3nN9/EKLhZqJKgkWP9FyNr9CusD78wem1C5fn9h7SjS1PQEhn1
| Gi50rlcUmII4E8Bnv6g/1QZnZIsPtVzO3bokQfbhTEzWOQ8RScB3ZQ+Tg7xM4duA
| NZdzR1/hjOOmPBV4ih3+AKmbEZ63V3PuJOn2+0/NsGXzGKhaNhlAof58lXkXrt9x
| DvmpyfER7oq/3+kPQhXlNK7VZ/dp26BLFQT12be1yyeVck2n/90pXTxV/COaIdsF
| q7RJPVO+4FCua77sUUSV9E5CL3oOFJT5MjkAMEkoKsU9InWHhA5w+ndQqDgXIb40
| 7b3pD6AiS/ZEvSpzCyeVnDprZxVIaQ==
|_-----END CERTIFICATE-----
|_ssl-date: 2020-05-17T20:55:54+00:00; +2s from scanner time.
Service Info: OS: Windows; CPE: cpe:/o:microsoft:windows

Host script results:
|_clock-skew: mean: 1s, deviation: 0s, median: 0s
| p2p-conficker:
|   Checking for Conficker.C or higher...
|   Check 1 (port 8918/tcp): CLEAN (Couldn t connect)
|   Check 2 (port 27612/tcp): CLEAN (Couldn t connect)
|   Check 3 (port 8570/udp): CLEAN (Failed to receive data)
|   Check 4 (port 26852/udp): CLEAN (Timeout)
|_  0/4 checks are positive: Host is CLEAN or ports are blocked
| smb2-security-mode:
|   2.02:
|_    Message signing enabled but not required
| smb2-time:
|   date: 2020-05-17T20:55:09
|_  start_date: N/A
```

### #2 What port is for the web server?

```bash
80/tcp   open     http          syn-ack     Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)
| http-methods:
|_  Supported Methods: OPTIONS
```

### #3 What port is for remote desktop service?

```bash
3389/tcp open     ms-wbt-server syn-ack     Microsoft Terminal Services
| rdp-ntlm-info:
|   Target_Name: WIN-LU09299160F
|   NetBIOS_Domain_Name: WIN-LU09299160F
|   NetBIOS_Computer_Name: WIN-LU09299160F
|   DNS_Domain_Name: WIN-LU09299160F
|   DNS_Computer_Name: WIN-LU09299160F
|   Product_Version: 10.0.17763
|_  System_Time: 2020-05-17T20:55:06+00:00

```

### #4 What is a possible password in one of the pages web crawlers check for?

<div className="Image__Medium">
  <img src="https://imgur.com/8qHBf4I.png" alt="blog_image" />>
</div>

```bash
UmbracoIsTheBest!
```

### #5 What CMS is the website using?

<div className="Image__Medium">
  <img src="https://imgur.com/tO0uPGK.png" alt="blog_image" />
</div>

```bash
Umbraco
```

### #6 What is the domain of the website?

<div className="Image__Medium">
  <img src="https://imgur.com/Uv84TYU.png" alt="blog_image" />
</div>

```bash
Anthem.com
```

### #7 What's the name of the Administrator

<div className="Image__Medium">
  <img src="https://imgur.com/5L9VyBz.png" alt="blog_image" />
</div>

```bash
Solomon Grundy
```

### #8 Can we find find the email address of the administrator?

<div className="Image__Medium">
  <img src="https://imgur.com/VQAVV6P.png" alt="blog_image" />
</div>

The pattern of the email address is the first letter of the firstname and the lastname

```bash
Solomon Grundy
SG@anthem.com
```

---

Our beloved admin left some flags behind that we require to gather before we proceed to the next task..

### #1 What is flag 1?

<div className="Image__Medium">
  <img src="https://imgur.com/KkA9LOL.png" alt="blog_image" />
</div>

```bash
THM{L0L_WH0_US3S_M3T4}
```

### #2 What is flag 2?

<div className="Image__Medium">
  <img src="https://imgur.com/55tHmK6.png" alt="blog_image" />
</div>

```bash
THM{G!T_G00D}
```

### #3 What is flag 3?

<div className="Image__Medium">
  <img src="https://imgur.com/YvwnqzM.png" alt="blog_image" />
</div>

```bash
THM{L0L_WH0_D15}
```

### #4 What is flag 4?

<div className="Image__Medium">
  <img src="https://imgur.com/2ENt53z.png" alt="blog_image" />
</div>

```bash
THM{AN0TH3R_M3TA}
```

---

Let's get into the box using the intel we gathered.

### #1 Let's figure out the username and password to log in to the box.(The box is not on a domain)

```bash
No awnser is needed
```

### #2 Gain initial access to the machine, what is the contents of user.txt?

Let's use remmina desktop and connect to the VM

<div className="Image__Small">
  <img src="https://imgur.com/fYSDTzv.png" alt="blog_image" />
</div>

```bash
login : SG
password : UmbracoIsTheBest!
```

<div className="Image__Small">
  <img src="https://imgur.com/i2RqrfL.png" alt="blog_image" />
</div>

```bash
THM{N00T_NO0T}
```

### #3 Can we spot the admin password?

```bash
I tried this
dir *.txt /s /p
But nothing came out sadly.. :(
```

Let's try something else..

This one is a little bit tricky but very simple to execute.

First step :

Show all the hidden files

<div className="Image__Small">
  <img src="https://imgur.com/q7LCXUf.png" alt="blog_image" />
</div>

Second step :

Go to the C: Drive and as you can see there is a backup hidden folder

Right click on it and go to the proprieties uncheck the "hidden" square

<div className="Image__Small">
  <img src="https://imgur.com/Y9ojzwm.png" alt="blog_image" />
</div>

Third and final step :

Add SG (the user) to have the permission to see the file

Right click → Security tab → Advanced → Add

<div className="Image__Medium">
  <img src="https://imgur.com/tJWUQxo.png" alt="blog_image" />
</div>

And finally click on the Check Names button and then allow all permissions to the file

<div className="Image__Medium">
  <img src="https://imgur.com/IUKzcKh.png" alt="blog_image" />
</div>

<div className="Image__Medium">
  <img src="https://imgur.com/pFneQcx.png" alt="blog_image" />
</div>

```bash
ChangeMeBaby1MoreTime
```

### #4 Escalate your privileges to root, what is the contents of root.txt?

You have two possibilities here..

You can relaunch the remmina app and log with the Administrator account

Or you can stay with the SG's account and go to the following path

```bash
C:\Users\Administrator\Desktop
```

The Administrator's password is :

```bash
ChangeMeBaby1MoreTime
```

<div className="Image__Medium">
  <img src="https://imgur.com/NsIeOts.png" alt="blog_image" />
</div>

```bash
THM{Y0U_4R3_1337}
```

<center>
  <a href="https://tryhackme.com/p/boperXD" target="_blank">
    <img src="https://i.imgur.com/hejzVWP.png" alt="TryhackMeProfile" />
  </a>
</center>
