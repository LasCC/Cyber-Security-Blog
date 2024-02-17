---
title: "Biohazard - TryHackMe"
category: "THM"
pubDate: 2020-07-06
description: "Writeup for the Biohazard CTF challenge"
---
[TryHackMe | Biohazard](https://tryhackme.com/room/biohazard)

Welcome to Biohazard room, a puzzle-style CTF. Collecting the item, solving the puzzle and escaping the nightmare is your top priority.

Can you survive until the end?If you have any question, do not hesitate to DM me on the discord channel.

---

### Setup

```
➜  TryHackMe nmap -A -vv 10.10.211.65
```

```
21/tcp open  ftp     syn-ack vsftpd 3.0.3

22/tcp open  ssh     syn-ack OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey:
|   2048 c9:03:aa:aa:ea:a9:f1:f4:09:79:c0:47:41:16:f1:9b (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDM1/tmq8Lrur25evbyyI7/+nxDlhbVbMMiRfz5a0eI7Sq9yODJGCVNMPJGKOwtgA/BlPi7V3TKyYJVeH1QOzP8mPLVgfYom6ovelJiLiR6VrO4dqxx+G3ir+tj/OOSc4MpmdnqCvQKtAeJ4e5bbWakFihXyy14yi++oOzqp2VDlqMNN+d2k0uSAx1rDbngwP3UvRfE1E1TaSYhljnb9kvWRxBABhpdkUjbcRLwxBAQFBm9Vm+yQYPurC9YJ1BUlJzOFesYnbS27bG1vVCcuPQN3YjcljVCXBdd0qIvZdYlez4+mVUcJJh1iWl83sfgo+wZRmfHsedjdL1eWNrkt+ed
|   256 2e:1d:83:11:65:03:b4:78:e9:6d:94:d1:3b:db:f4:d6 (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBNy83txF27peDYxMhrPqfipXwZtBNY9H4fww7f2FRCkt09tEcp5f5BKhOE4cNo033XYpmaowy1r4qgFpIqKjf64=
|   256 91:3d:e4:4f:ab:aa:e2:9e:44:af:d3:57:86:70:bc:39 (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIMhTmk6F06eyLfM0j07nUcnqMqGdgOfFqsp3eLdbwwn0

80/tcp open  http    syn-ack Apache httpd 2.4.29 ((Ubuntu))
| http-methods:
|_  Supported Methods: POST OPTIONS HEAD GET
|_http-server-header: Apache/2.4.29 (Ubuntu)
|_http-title: Beginning of the end
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel
```

### #1 How many open ports?

```
There is 3 ports open
21 - FTP
22 - SSH
80 - HTTP
```

### #2 What is the team name in operation

![](https://imgur.com/d5jScnD.png)

```
STARS alpha team
```

---

Collect all necessary items and advanced to the next level. The format of the Item flag:

**Item_name{32 character}**

Some of the doors are locked. Use the item flag to unlock the door.

Tips: It is better to record down all the information inside a notepad

### #1 What is the emblem flag

![](https://imgur.com/IGhvxU9.png)

![](https://imgur.com/wGDhKYb.png)

![](https://imgur.com/JctEHzT.png)

![](https://imgur.com/hCQDGv9.png)

![](https://imgur.com/GpFFfxI.png)

```
emblem{fec832623ea498e20bf4fe1821d58727}
```

### #2 What is the lock pick flag

![](https://imgur.com/OPLNgon.png)

![](https://imgur.com/74y263Q.png)

Well if you input the emblem flag that doesn't work let's try something else..

![](https://imgur.com/i7LXRAC.png)

Its seems that this is some base64 encoding let's decode the message

![](https://imgur.com/ucKLHzB.png)

![](https://imgur.com/dP5782Y.png)

```
lock_pick{037b35e2ff90916a9abf99129c8e1837}
```

### #3 What is the music sheet flag

![](https://imgur.com/qK0HVoB.png)

![](https://imgur.com/7WMuE9r.png)

![](https://imgur.com/Faj3moq.png)

```
Location:

/diningRoom/
/teaRoom/
/artRoom/
/barRoom/
/diningRoom2F/
/tigerStatusRoom/
/galleryRoom/
/studyRoom/
/armorRoom/
/attic/
```

![](https://imgur.com/MqoabEL.png)

![](https://imgur.com/LsOvAi7.png)

![](https://imgur.com/7LVLM8b.png)

![](https://imgur.com/ym6sZiE.png)

```
music_sheet{362d72deaf65f5bdc63daece6a1f676e}
```

### #4 What is the gold emblem flag

![](https://imgur.com/OQ5Gb1L.png)

![](https://imgur.com/cYZCBrB.png)

![](https://imgur.com/TGn7fRQ.png)

```
gold_emblem{58a8c41a9d08b8a4e38d02a4d7ff4843}
```

### #6 What is the blue gem flag

![](https://imgur.com/WQwhKC7.png)

[CyberChef](<https://gchq.github.io/CyberChef/#recipe=ROT13(true,true,13)&input=TGJoIHRyZyBndXIgb3lociB0cnogb2wgY2hmdXZhdCBndXIgZmduZ2hmIGdiIGd1ciB5YmpyZSBzeWJiZS4gR3VyIHRyeiB2ZiBiYSBndXIgcXZhdmF0RWJieiBzdmVmZyBzeWJiZS4gSXZmdmcgZm5jY3V2ZXIudWd6eQ>)

![](https://imgur.com/rjZl5US.png)

![](https://imgur.com/RgE73r1.png)

```
blue_jewel{e1d457e96cac640f863ec7bc475d48aa}
```

---

### Crests puzzle

### Crest 1 :

![](https://imgur.com/6e4rKlA.png)

![](https://imgur.com/MycuGad.png)

```
crest 1:
S0pXRkVVS0pKQkxIVVdTWUpFM0VTUlk9
Hint 1: Crest 1 has been encoded twice
Hint 2: Crest 1 contanis 14 letters
Note: You need to collect all 4 crests, combine and decode to reavel another path
The combination should be crest 1 + crest 2 + crest 3 + crest 4. Also, the combination is a type of encoded base and you need to decode it
```

![](https://imgur.com/npQdzgT.png)

[CyberChef](<https://gchq.github.io/CyberChef/#recipe=From_Base64('A-Za-z0-9%2B/%3D',true)From_Base32('A-Z2-7%3D',false)>)

```
RlRQIHVzZXI6IG # 11 letters
```

### Crest 2 :

![](https://imgur.com/C1BwN2x.png)

```
crest 2:
GVFWK5KHK5WTGTCILE4DKY3DNN4GQQRTM5AVCTKE
Hint 1: Crest 2 has been encoded twice
Hint 2: Crest 2 contanis 18 letters
Note: You need to collect all 4 crests, combine and decode to reavel another path
The combination should be crest 1 + crest 2 + crest 3 + crest 4. Also, the combination is a type of encoded base and you need to decode it
```

![](https://imgur.com/Blz0aA4.png)

[CyberChef](<https://gchq.github.io/CyberChef/#recipe=From_Base32('A-Z2-7%3D',false)From_Base58('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',false)>)

```
h1bnRlciwgRlRQIHBh # 18 letters
```

### Crest 3 :

![](https://imgur.com/kmOSpaG.png)

![](https://imgur.com/Bs07MQI.png)

```
crest 3:
MDAxMTAxMTAgMDAxMTAwMTEgMDAxMDAwMDAgMDAxMTAwMTEgMDAxMTAwMTEgMDAxMDAwMDAgMDAxMTAxMDAgMDExMDAxMDAgMDAxMDAwMDAgMDAxMTAwMTEgMDAxMTAxMTAgMDAxMDAwMDAgMDAxMTAxMDAgMDAxMTEwMDEgMDAxMDAwMDAgMDAxMTAxMDAgMDAxMTEwMDAgMDAxMDAwMDAgMDAxMTAxMTAgMDExMDAwMTEgMDAxMDAwMDAgMDAxMTAxMTEgMDAxMTAxMTAgMDAxMDAwMDAgMDAxMTAxMTAgMDAxMTAxMDAgMDAxMDAwMDAgMDAxMTAxMDEgMDAxMTAxMTAgMDAxMDAwMDAgMDAxMTAwMTEgMDAxMTEwMDEgMDAxMDAwMDAgMDAxMTAxMTAgMDExMDAwMDEgMDAxMDAwMDAgMDAxMTAxMDEgMDAxMTEwMDEgMDAxMDAwMDAgMDAxMTAxMDEgMDAxMTAxMTEgMDAxMDAwMDAgMDAxMTAwMTEgMDAxMTAxMDEgMDAxMDAwMDAgMDAxMTAwMTEgMDAxMTAwMDAgMDAxMDAwMDAgMDAxMTAxMDEgMDAxMTEwMDAgMDAxMDAwMDAgMDAxMTAwMTEgMDAxMTAwMTAgMDAxMDAwMDAgMDAxMTAxMTAgMDAxMTEwMDA=
Hint 1: Crest 3 has been encoded three times
Hint 2: Crest 3 contanis 19 letters
Note: You need to collect all 4 crests, combine and decode to reavel another path
The combination should be crest 1 + crest 2 + crest 3 + crest 4. Also, the combination is a type of encoded base and you need to decode it
```

![](https://imgur.com/Ti9LKRV.png)

[CyberChef](<https://gchq.github.io/CyberChef/#recipe=From_Base64('A-Za-z0-9%2B/%3D',true)From_Binary('Space')From_Hex('Space')>)

```
c3M6IHlvdV9jYW50X2h
```

### Crest 4 :

![](https://imgur.com/ttwPvx5.png)

![](https://imgur.com/vULNGd0.png)

```
crest 4:
gSUERauVpvKzRpyPpuYz66JDmRTbJubaoArM6CAQsnVwte6zF9J4GGYyun3k5qM9ma4s
Hint 1: Crest 2 has been encoded twice
Hint 2: Crest 2 contanis 17 characters
Note: You need to collect all 4 crests, combine and decode to reavel another path
The combination should be crest 1 + crest 2 + crest 3 + crest 4. Also, the combination is a type of encoded base and you need to decode it
```

![](https://imgur.com/2lRUORc.png)

[CyberChef](<https://gchq.github.io/CyberChef/#recipe=From_Base58('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',false)From_Hex('Space')>)

```
pZGVfZm9yZXZlcg==
```

### Resolution of the puzzle :

Concatenate all the crests and you will get the final decoded message 😎

```
RlRQIHVzZXI6IGh1bnRlciwgRlRQIHBhc3M6IHlvdV9jYW50X2hpZGVfZm9yZXZlcg==
```

![](https://imgur.com/C0T1rjC.png)

---

### #7 What is the FTP username

```
Username : hunter
```

### #8 What is the FTP password

```
Password : you_cant_hide_forever
```

---

After gaining access to the FTP server, you need to solve another puzzle.

### #1 Where is the hidden directory mentioned by Barry

![](https://imgur.com/7iWX4oJ.png)

![](https://imgur.com/J9nnFIo.png)

```
/hidden_closet/
```

### #2 Password for the encrypted file

```
➜  TryHackMe steghide extract -sf 001-key.jpg
Enter passphrase:
wrote extracted data to "key-001.txt".

➜  TryHackMe cat key-001.txt
cGxhbnQ0Ml9jYW

----

➜  TryHackMe exiftool 002-key.jpg

Comment                         : 5fYmVfZGVzdHJveV9

----

➜  TryHackMe binwalk -e 003-key.jpg

DECIMAL       HEXADECIMAL     DESCRIPTION
--------------------------------------------------------------------------------
0             0x0             JPEG image data, JFIF standard 1.01
1930          0x78A           Zip archive data, at least v2.0 to extract, uncompressed size: 14, name: key-003.txt
2124          0x84C           End of Zip archive, footer length: 22

➜  _003-key.jpg.extracted cat key-003.txt
3aXRoX3Zqb2x0
```

Concatenate all the key and you will get the flag 😈

```
cGxhbnQ0Ml9jYW5fYmVfZGVzdHJveV93aXRoX3Zqb2x0
```

![](https://imgur.com/zfDPvLp.png)

[CyberChef](<https://gchq.github.io/CyberChef/#recipe=From_Base64('A-Za-z0-9%2B/%3D',true)>)

```
plant42_can_be_destroy_with_vjolt
```

### #3 What is the helmet key flag

Decode the gpg file with the password that we decode earlier.

```
➜  TryHackMe gpg --decrypt helmet_key.txt.gpg
gpg: AES256 encrypted data
gpg: encrypted with 1 passphrase
helmet_key{458493193501d2b94bbab2e727f8db4b}
```

---

Done with the puzzle?

There are places you have explored before but yet to access.

### #1 What is the SSH login username

![](https://imgur.com/pUCmLhq.png)

![](https://imgur.com/P6H3aDL.png)

```
wpbwbxr wpkzg pltwnhro, txrks_xfqsxrd_bvv_fy_rvmexa_ajk
```

Well after some times, its seems that we don't have the key to decode the vigenère encoded message let's see if there is other hidden directory on the website.

![](https://imgur.com/HXJ0QTj.png)

![](https://imgur.com/lpcByhC.png)

![](https://imgur.com/Sb5iBjE.png)

```
➜  TryHackMe tar -xf doom.tar.gz

➜  TryHackMe cat eagle_medal.txt
SSH user: umbrella_guest
```

### #2 What is the SSH login password

![](https://imgur.com/OUQQ5Pn.png)

```
SSH password: T_virus_rules
```

### #3 Who the STARS bravo team leader

![](https://imgur.com/un2MA5J.png)

```
Enrico
```

---

Time for the final showdown. Can you escape the nightmare?

### #1 Where you found Chris

![](https://imgur.com/C3fCz9k.png)

```
jailcell
```

### #2 Who is the traitor

![](https://imgur.com/bYtXUxU.png)

```
Weasker
```

### #3 The login password for the traitor

![](https://imgur.com/kbvK4Qv.png)

![](https://imgur.com/15t4Cg1.png)

[CyberChef](<https://gchq.github.io/CyberChef/#recipe=Vigen%C3%A8re_Decode('albert')&input=d3Bid2J4ciB3cGt6ZyBwbHR3bmhybywgdHhya3NfeGZxc3hyZF9idnZfZnlfcnZtZXhhX2Fqaw>)

```
weasker login password, stars_members_are_my_guinea_pig
```

### #4 The name of the ultimate form

![](https://imgur.com/0P4gEhd.png)

```
Tyrant
```

### #5 The root flag

![](https://imgur.com/ZhJSh1f.png)

```
flag: 3c5794a00dc56c35f2bf096571edf3bf
```


