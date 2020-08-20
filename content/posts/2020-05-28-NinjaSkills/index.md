---
title: "Ninja Skills - TryHackMe"
author: Ludovic COULON
date: 2020-05-28
hero: ./images/hero.png
excerpt: "Writeup for the Ninja Skills on TryHackMe"
---

[TryHackMe | Ninja Skills](https://tryhackme.com/room/ninjaskills)

<div className="Image__Small">
  <img src="https://i.imgur.com/JbCoSfv.png" alt="blog_image" />
</div>

Let's have some fun with Linux. Deploy the machine and get started.

**This machine may take up to 3 minutes to configure.**

(If you prefer to SSH into the machine, use the credentials new-user as the username and password)

Answer the questions about the following files:

- 8V2L
- bny0
- c4ZX
- D8B3
- FHl1
- oiMO
- PFbD
- rmfX
- SRSq
- uqyw
- v2Vb
- X1Uy

The aim is to answer the questions as efficiently as possible.

### #1 Which of the above files are owned by the best-group group(enter the answer separated by spaces in alphabetical order)

```bash
[new-user@ip-10-10-208-44 ~]$ find / -group best-group 2>/dev/null
/mnt/D8B3
/home/v2Vb
```

### #2 Which of these files contain an IP address?

[RegEx: Find IP Addresses in a File Using Grep - ShellHacks](https://www.shellhacks.com/regex-find-ip-addresses-file-grep/)

```bash
find / -type f -name "8V2L" 2>/dev/null
```

```bash
grep -E -o "(25[0–5]|2[0–4][0–9]|[01]?[0–9][0–9]?)\.(25[0–5]|2[0–4][0–9]|[01]?[0–9][0–9]?)\.(25[0–5]|2[0–4][0–9]|[01]?[0–9][0–9]?)\.(25[0–5]|2[0–4][0–9]|[01]?[0–9][0–9]?)" *
```

```bash
[new-user@ip-10-10-208-44 ~]$ find / -type f -name "oiMO" 2>/dev/null
/opt/oiMO
[new-user@ip-10-10-208-44 ssh]$ cd /opt/
[new-user@ip-10-10-208-44 opt]$ grep -E -o "(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)" oiMO
1.1.1.1
```

### #3 Which file has the SHA1 hash of 9d54da7584015647ba052173b84d45e8007eba94

[Search file with known sha1 sum](https://askubuntu.com/questions/932694/search-file-with-known-sha1-sum)

```bash
for f in *; do echo '9d54da7584015647ba052173b84d45e8007eba94 '$f | sha1sum -c; done | grep OK
```

```bash
[new-user@ip-10-10-208-44 ssh]$ find / -type f -name "D8B3" 2>/dev/null
/mnt/D8B3
[new-user@ip-10-10-208-44 ssh]$ cd /mnt/
[new-user@ip-10-10-208-44 mnt]$ for f in *; do echo '9d54da7584015647ba052173b84d45e8007eba94 '$f | sha1sum -c; done | grep OK
c4ZX: OK
```

### #4 Which file contains 230 lines?

```bash
wc -l * | grep 230
```

```bash
bny0
```

### #5 Which file's owner has an ID of 502?

```bash
[new-user@ip-10-10-208-44 /]$ find / -type f -name "X1Uy" 2>/dev/null
/X1Uy
[new-user@ip-10-10-208-44 /]$ cd /
[new-user@ip-10-10-208-44 /]$ ls -n
-rw-rw-r--  1 "502" 501 13545 Oct 23  2019 X1Uy
```

### #6 Which file is executable by everyone?

```bash
[new-user@ip-10-10-208-44 ssh]$ find / -type f -name "8V2L" 2>/dev/null
/etc/8V2L
[new-user@ip-10-10-208-44 ssh]$ cd /etc/
[new-user@ip-10-10-208-44 etc]$ ls -la
total 1400
drwxr-xr-x 78 root     root       4096 May 28 16:18 .
dr-xr-xr-x 25 root     root       4096 May 28 16:18 ..
-rwxrwxr-x  1 new-user new-user  13545 Oct 23  2019 8V2L
```

<center>
  <a href="https://tryhackme.com/p/boperXD" target="_blank">
    <img src="https://i.imgur.com/p0h00A1.png" alt="TryhackMeProfile" />
  </a>
</center>
