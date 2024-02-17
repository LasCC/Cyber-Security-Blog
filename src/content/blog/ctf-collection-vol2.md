---
title: "CTF collection Vol.2 - TryHackMe"
category: "THM"
pubDate: 2020-06-21
description: "Writeup for the CTF collection Vol.2 challenge"
---

[TryHackMe | CTF collection Vol.2](https://tryhackme.com/room/ctfcollectionvol2)
>
![](https://i.ibb.co/d6BKFcJ)

Welcome, welcome and welcome to another CTF collection. This is the second installment of the CTF collection series. For your information, the second serious focuses on the web-based challenge. There are a total of 20 easter eggs a.k.a flags can be found within the box. Let see how good is your CTF skill.

Warning: The challenge contains seizure images and background. If you feeling
uncomfortable, try removing the background on style tag.

Note: All the challenges flag are formatted as `THM{flag}`, unless stated otherwise

---

Submit all your easter egg right here. Gonna find it all!

### Setup

```
➜  TryHackMe nmap -A -vv 10.10.101.183
```

```
22/tcp open  ssh     syn-ack OpenSSH 5.9p1 Debian 5ubuntu1.10 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey:
|   1024 1b:c2:b6:2d:fb:32:cc:11:68:61:ab:31:5b:45:5c:f4 (DSA)
| ssh-dss AAAAB3NzaC1kc3MAAACBAICZbLNIOa6Xx8zj7A1bZmQnqMwS+4k/eDqPTSxUAfkGU7k0UVOhHQDvcfBAmggbjC7zm0gHX5RQvn3gxbzsV/SeRAjp+DXhg4uLkTkFAwDssFn8lOQjEOk1XUHvFFwWXQCNqWxZ+rM7mIZIntYbjdQybCUp0pZgA3+spPXGdVWvAAAAFQDsrnpTlNjNb7iBzNAS6BuKnTqqnQAAAIBd9xpY8kXVLnAAQCKH4BhoUxgQNtyci+g//rI8jPuGQigyYBrqBlpCXwS+eDqtr1nXJBvJrUlqPpXPS+x0FtNcf/je24sallrIb5X5T44LIPHHO+u8yqRcKlbd3Ze8Tu6paXbVCI9sxh8Sf2Rj8oD1iVTbWCGBDl+Y0im9fkl1+QAAAIBiaJ1Ce3Xho/l3hVFLBQExyMx9sAjNC2cbZZCPvIvq6849baYcfb7bQE0IWtSaJSVLIBQAlZ+RYDxQWsdQQkyQl/0KOTojEt83/OteWa16veZhmG8EYIlJ1pxkKttBZbeePB61y0XmYsyOfXqbFztBkS4wKbgkZaPlZyg+q2Vb9g==
|   2048 8d:88:65:9d:31:ff:b4:62:f9:28:f2:7d:42:07:89:58 (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCUAD22WKbNzRInAbbqdU8lcwDS6237CJZYlln/DGVYvlTBkcNCUCZ45vqb1Hnt+0hbdroxtfKrtScpHQVBMDmxhhc7QojK1WYMdaab1kcClcU0huEOIWgUFD18nlbij9TDk/v8B6H1IQ9UCpXdmmypxwu65g5EZm2H6+b4YLk28wZyU3Pt6DaSeO5JFc5ojg21f5g8RjGO1vJF4RiEHIs/Fq/ErAo3VmhoF/Wr5b1yTbZXgF4+1kXrt5EqsfmQrhm12Vnv4fjsIt4lxlLyypxx2LWDviEBcYiyD57HcLXo50CVvJaufpVGxGa5U/SrE2QeRdy8W/+jg519aNdQoyDT
|   256 40:2e:b0:ed:2a:5a:9d:83:6a:6e:59:31:db:09:4c:cb (ECDSA)
|_ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBMRZRUQkFhSMJkWs8Gb6yKlWOCWtuKh73fLtH2az3J9+D6+OtBTEbZmfvyaQrog0KjJinQEOh4FQpf/WWiBIR0g=

80/tcp open  http    syn-ack Apache httpd 2.2.22 ((Ubuntu))
| http-methods:
|_  Supported Methods: GET HEAD POST OPTIONS
| http-robots.txt: 1 disallowed entry
|_/VlNCcElFSWdTQ0JKSUVZZ1dTQm5JR1VnYVNCQ0lGUWdTU0JFSUVrZ1p5QldJR2tnUWlCNklFa2dSaUJuSUdjZ1RTQjVJRUlnVHlCSklFY2dkeUJuSUZjZ1V5QkJJSG9nU1NCRklHOGdaeUJpSUVNZ1FpQnJJRWtnUlNCWklHY2dUeUJUSUVJZ2NDQkpJRVlnYXlCbklGY2dReUJDSUU4Z1NTQkhJSGNnUFElM0QlM0Q=
|_http-server-header: Apache/2.2.22 (Ubuntu)
|_http-title: 360 No Scope!
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

![](https://imgur.com/ycAsL02.png)

```
➜  TryHackMe dirb http://10.10.101.183

-----------------
DIRB v2.22
By The Dark Raver
-----------------

START_TIME: Sat Jun 20 17:34:38 2020
URL_BASE: http://10.10.101.183/
WORDLIST_FILES: /usr/share/dirb/wordlists/common.txt

-----------------

GENERATED WORDS: 4612

---- Scanning URL: http://10.10.101.183/ ----
+ http://10.10.101.183/button (CODE:200|SIZE:39148)
+ http://10.10.101.183/cat (CODE:200|SIZE:62048)
+ http://10.10.101.183/cgi-bin/ (CODE:403|SIZE:289)
+ http://10.10.101.183/index (CODE:200|SIZE:94328)
+ http://10.10.101.183/index.php (CODE:200|SIZE:94328)
+ http://10.10.101.183/iphone (CODE:200|SIZE:19867)
==> DIRECTORY: http://10.10.101.183/login/
+ http://10.10.101.183/robots (CODE:200|SIZE:430)
+ http://10.10.101.183/robots.txt (CODE:200|SIZE:430)
+ http://10.10.101.183/server-status (CODE:403|SIZE:294)
+ http://10.10.101.183/small (CODE:200|SIZE:689)
+ http://10.10.101.183/static (CODE:200|SIZE:253890)
+ http://10.10.101.183/who (CODE:200|SIZE:3847428)

---- Entering directory: http://10.10.101.183/login/ ----
+ http://10.10.101.183/login/index (CODE:200|SIZE:782)
+ http://10.10.101.183/login/index.php (CODE:200|SIZE:782)
```

### #1 Easter 1

![](https://imgur.com/K1bQWup.png)

![](https://imgur.com/K96VPuF.png)

```
THM{4u70b07_r0ll_0u7}
```

### #2 Easter 2

![](https://imgur.com/LOXFSnC.png)

![](https://imgur.com/Sd8wEre.png)

Base64 decode all the result and you will get the final message, copy the message and copy it on the website

![](https://imgur.com/hk8qiR5.png)

![](https://imgur.com/jYIDXcR.png)

```
THM{f4ll3n_b453}
```

### #3 Easter 3

![](https://imgur.com/aF764UN.png)

![](https://imgur.com/mvQNftX.png)

```
THM{y0u_c4n'7_533_m3}
```

### #4 Easter 4

```
➜  ~ sqlmap -r export.txt --dbs
# You can create an export with burpsuite
```

![](https://imgur.com/tm9Z0K7.png)

```
➜  ~ sqlmap -r export.txt --dump
# Now we dump all the tables
```

![](https://imgur.com/jeHfgr6.png)

```sql
Table : user
+----------+------------------------------------------+
| username | password                                 |
+----------+------------------------------------------+
| DesKel   | 05f3672ba34409136aa71b8d00070d1b (cutie) |
| Skidy    | He is a nice guy, say hello for me       |
+----------+------------------------------------------+
```

![](https://imgur.com/OIUuquP.png)

```sql
Table: nothing_inside
[1 entry]
+-------------------------+
| Easter_4                |
+-------------------------+
| THM{1nj3c7_l1k3_4_b055} |
+-------------------------+
```

### #5 Easter 5

```sql
Table : user
+----------+------------------------------------------+
| username | password                                 |
+----------+------------------------------------------+
| DesKel   | 05f3672ba34409136aa71b8d00070d1b (cutie) |
| Skidy    | He is a nice guy, say hello for me       |
+----------+------------------------------------------+
```

![](https://imgur.com/oPS50zp.png)

```
THM{wh47_d1d_17_c057_70_cr4ck_7h3_5ql}
```

### #6 Easter 6

![](https://imgur.com/onTmj9x.png)

```
THM{l37'5_p4r7y_h4rd}
```

### #7 Easter 7

![](https://imgur.com/ASNvJJx.png)

As we can see there is the value "Invited" and the value is 0 let's see if we can change that 🤤

![](https://imgur.com/DnRT1z8.png)

![](https://imgur.com/4oXnATT.png)

```
THM{w3lc0m3!_4nd_w3lc0m3}
```

### #8 Easter 8

![](https://imgur.com/PxfIfO3.png)

Well, we need to change our user agent to see the hidden flag let's do that 😞

![](https://imgur.com/igrKz73.png)

```
THM{h3y_r1ch3r_wh3r3_15_my_k1dn3y}
```

### #9 Easter 9

![](https://imgur.com/vIHZUet.png)

![](https://imgur.com/nnc4Ko6.png)

```
THM{60nn4_60_f457}
```

### #10 Easter 10

![](https://imgur.com/XNHTk6K.png)

![](https://imgur.com/l5ZEL1q.png)

```
Referrer : tryhackme.com
```

```
THM{50rry_dud3}
```

### #11 Easter 11

![](https://imgur.com/51e2fc7.png)

![](https://imgur.com/nWeaLrO.png)

```
THM{366y_b4k3y}
```

### #12 Easter 12

Fake jquery plugin

![](https://imgur.com/UqOJxgv.png)

![](https://imgur.com/mxI3tzz.png)

```
Easter 12 is THM{h1dd3n_j5_f1l3}
```

### #13 Easter 13

![](https://imgur.com/sWMFrNS.png)

For some reason this page appears

```
THM{1_c4n'7_b3l13v3_17}
```

### #14 Easter 14

![](https://imgur.com/UXZUfT5.png)

![](https://imgur.com/OobGnCL.png)

```
THM{d1r3c7_3mb3d}
```

### #15 Easter 15

[ASCII Table](https://www.garykessler.net/library/ascii.html)

![](https://imgur.com/1aI0UDc.png)

![](https://imgur.com/cElw6aY.png)

Convert all the hex values to ASCII and type it in the input

```text
Didn't find it :(
```

### #16 Easter 16

![](https://imgur.com/jjoDA4w.png)

![](https://imgur.com/jiq9Vix.png)

![](https://imgur.com/7jfQSFo.png)

```
THM{73mp3r_7h3_h7ml}
```

### #17 Easter 17

![](https://imgur.com/aYFE8h8.png)

![](https://imgur.com/Nfndkdf.png)

![](https://imgur.com/Z20MjIL.png)

![](https://imgur.com/ZrocFqZ.png)

```
Easter 17: THM{j5_j5_k3p_d3c0d3}
```

### #18 Easter 18

![](https://imgur.com/bASkgM2.png)

![](https://imgur.com/iK0CYHm.png)

```
Easter 18: THM{70ny_r0ll_7h3_366}
```

### #19 Easter 19

![](https://imgur.com/T98i31M.png)

![](https://imgur.com/e6OY9cY.png)

```
THM{700_5m4l_3yy}
```

### #20 Easter 20

![](https://imgur.com/bnomyys.png)

![](https://imgur.com/FodoR41.png)

```
Easter 20: THM{17_w45_m3_4ll_4l0n6}
```