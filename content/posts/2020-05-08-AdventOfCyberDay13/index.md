---
title: "Advent of Cyber Day 13 Accumulate"
author: Ludovic COULON
date: 2020-05-08
hero: ./images/hero.png
excerpt: "Advent of Cyber Day 13 Accumulate"
secret: true
---

[TryHackMe | Advent of Cyber](https://tryhackme.com/room/25daysofchristmas)

Mcsysadmin has been super excited with their new security role, but
wants to learn even more. In an attempt to show their l33t skills, they
have found a new box to play with.

This challenge accumulates all the things you've learnt from the previous challenges(that being said,
it may be a little more difficult than the previous challenges). Here's
the general way to attempt exploitation when just given an IP address:

- Start out with an NMAP scan to see what services are running
- Enumerate these services and try exploit them
- use these exploited services to get an initial access to the host machine
- enumerate the host machine to elevate privileges

Credit to [DarkStar7471](https://tryhackme.com/p/DarkStar7471) for creating this challenge! Not all tasks will include supporting material!

### Setup

```bash
gobuster dir -u  http://10.10.98.16 -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
```

```bash
gobuster dir -u  http://10.10.98.16 -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
===============================================================
Gobuster v3.0.1
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@_FireFart_)
===============================================================
[+] Url:            http://10.10.98.16
[+] Threads:        10
[+] Wordlist:       /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
[+] Status codes:   200,204,301,302,307,401,403
[+] User Agent:     gobuster/3.0.1
[+] Timeout:        10s
===============================================================
2020/05/08 16:24:29 Starting gobuster
===============================================================
**/retro (Status: 301)**
```

![https://i.imgur.com/TnYgs1a.png](https://i.imgur.com/TnYgs1a.png)

[http://10.10.98.16/retro/index.php/2019/12/09/ready-player-one/](http://10.10.98.16/retro/index.php/2019/12/09/ready-player-one/)

### One Comment on “Ready Player One”

1. **Wade** [December 9, 2019](http://10.10.98.16/retro/index.php/2019/12/09/ready-player-one/#comment-2)

   Leaving myself a note here just in case I forget how to spell it: **parzival**

Now we can try to log to the wordpress admin with the creds given by the user

```bash
username : Wade
password : parzival
```

[http://10.10.98.16/retro/wp-login.php](http://10.10.98.16/retro/wp-login.php)

After trying many attempts to get a reverse shell working with WordPress, i'm going to try an another attack.

With the nmap scan we discover the port 3389

```bash
80/tcp   open  http          syn-ack Microsoft IIS httpd 10.0
| http-methods:
|   Supported Methods: OPTIONS TRACE GET HEAD POST
|_  Potentially risky methods: TRACE
|_http-server-header: Microsoft-IIS/10.0
|_http-title: IIS Windows Server
3389/tcp open  ms-wbt-server syn-ack Microsoft Terminal Services
| rdp-ntlm-info:
|   Target_Name: RETROWEB
|   NetBIOS_Domain_Name: RETROWEB
|   **NetBIOS_Computer_Name: RETROWEB**
|   DNS_Domain_Name: RetroWeb
|   DNS_Computer_Name: RetroWeb
|   Product_Version: 10.0.14393
|_  **System_Time: 2020-05-08T20:33:08+00:00**
| ssl-cert: Subject: commonName=RetroWeb
| Issuer: commonName=RetroWeb
| Public Key type: rsa
| Public Key bits: 2048
| Signature Algorithm: sha256WithRSAEncryption
| Not valid before: 2020-05-07T20:02:50
| Not valid after:  2020-11-06T20:02:50
| MD5:   9b6b 0322 e36d 74e5 9334 0313 35dd 81b7
| SHA-1: 410c 8275 4f20 c2f8 b943 1927 40b8 de27 af29 f8bf
| -----BEGIN CERTIFICATE-----
| MIIC1DCCAbygAwIBAgIQKUOrPeP7+aVM6j6diuzmUDANBgkqhkiG9w0BAQsFADAT
| MREwDwYDVQQDEwhSZXRyb1dlYjAeFw0yMDA1MDcyMDAyNTBaFw0yMDExMDYyMDAy
| NTBaMBMxETAPBgNVBAMTCFJldHJvV2ViMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A
| MIIBCgKCAQEAoRk88D0fxMB6g1Dn+Jv1eJ1Xa7SDi8/T77KlhNRH7bpWKIRupqyr
| JW0LeS48uUjfgGhqpaPgsdkNHjU7r+kyco6wSzYPt4AsHVW2/M/9lqxZ9JjXxjnF
| DCtV1LmZe6l9Oi1q/DTU8o57wLpgXCRTSZMYD8DWCq4o/NCQgKF36b19g/Q8IOzB
| mVSPEgHRzzf09idzVTTWYMg5f36ZQufnsGEAQB06/tjZs20PngSYj9o+m+Idobri
| w+AFqxOB2OomuveSDXHawgWNoKGEqHEgkCNO4OR6onFo+gOVkI5Wn5ppZw86BtwQ
| /qg1VrdRQlDvxPSwEUMywjHhJD7dTjKp8QIDAQABoyQwIjATBgNVHSUEDDAKBggr
| BgEFBQcDATALBgNVHQ8EBAMCBDAwDQYJKoZIhvcNAQELBQADggEBAJ8A3kLh+U1n
| MjAGFIdOU/aoX5tKVAOGQI7NhCStR4V8rt1jzl83t5LYDRgu4BvwJmzpqTu2jlBM
| ORPnyaa+UfQmsA/P8itYmDRuGEWBnVAwWgfykfKlxDvxowhsIGQvulgUF4BuH+6I
| LEeZNSNPh3U7cCdQelEp5Uf+NikhEOnyAwbcABdJMm/QRazFtbnvV0vI6bWuudj8
| ykqlasuZ/rFn9AXbEL4uHEZH9OmvOkZj4jPxrcxE9zN1SFcuEa6wBV8S7j9Ryvka
| VG1J8q2FsO4kouO23MCi3IN8aeFA9fKOAO2co+1VGiunpjC1p/Wsi5gRzzdw0J6u
| nJ82sCcskO0=
|_-----END CERTIFICATE-----
|_ssl-date: 2020-05-08T20:33:09+00:00; +4s from scanner time.
Service Info: OS: Windows; CPE: cpe:/o:microsoft:windows
```

As you can see with the output, you can validate that there is a "Computer Name" and we can maybe try to access it with the previous creds that we have.

[How to connect to a remote desktop from Linux](https://opensource.com/article/18/6/linux-remote-desktop)

```bash
sudo apt-get install -y remmina
```

### #1 A web server is running on the target. What is the hidden directory which the website lives on?

```bash
/retro
```

### #2 Gain initial access and read the contents of user.txt

![https://i.imgur.com/bOh3bTq.png](https://i.imgur.com/bOh3bTq.png)

![https://imgur.com/aZijGff.png](https://imgur.com/aZijGff.png)

```bash
3b99fbdc6d430bfb51c72c651a261927
```

### #3 [Optional] Elevate privileges and read the content of root.txt

![https://imgur.com/nFCPL8x.png](https://imgur.com/nFCPL8x.png)

As you can see, there is a bookmark on the google chrome session, let's try it !

[NVD - CVE-2019-1388](https://nvd.nist.gov/vuln/detail/CVE-2019-1388)

[https://www.youtube.com/watch?v=3BQKpPNlTSo](https://www.youtube.com/watch?v=3BQKpPNlTSo)

![https://imgur.com/uuJaz67.png](https://imgur.com/uuJaz67.png)

![https://imgur.com/HnLtmbZ.png](https://imgur.com/HnLtmbZ.png)

```bash
C:\Windows\System32\*.*
```

![https://imgur.com/vmDZgOv.png](https://imgur.com/vmDZgOv.png)

![https://imgur.com/RPs7HQW.png](https://imgur.com/RPs7HQW.png)

![https://i.imgur.com/7vRL2nJ.png](https://i.imgur.com/7vRL2nJ.png)

```bash
7958b569565d7bd88d10c6f22d1c4063 # root flag
```
