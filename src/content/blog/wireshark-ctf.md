---
title: "Wireshark CTF - TryHackMe"
category: "THM"
pubDate: "2020-06-07"
description: "Writeup for the Wireshark CTF room on TryHackMe"
---
[TryHackMe | Wireshark CTF](https://tryhackme.com/room/wirectf)

A CTF challenge set by csaw. During this task, you will be have to inspect a pcap file (using programs such as tshark and wireshark). You will analysis the file and release something has been "transferred".

---

### #1 Download and look through the pcap file to analyse the traffic in order to find the flag.

![](https://imgur.com/G0W0wNx.png)

```python
import string
import random
from base64 import b64encode, b64decode

FLAG = 'flag{xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx}'

enc_ciphers = ['rot13', 'b64e', 'caesar']
# dec_ciphers = ['rot13', 'b64d', 'caesard']

def rot13(s):
	_rot13 = string.maketrans(
    	"ABCDEFGHIJKLMabcdefghijklmNOPQRSTUVWXYZnopqrstuvwxyz",
    	"NOPQRSTUVWXYZnopqrstuvwxyzABCDEFGHIJKLMabcdefghijklm")
	return string.translate(s, _rot13)

def b64e(s):
	return b64encode(s)

def caesar(plaintext, shift=3):
    alphabet = string.ascii_lowercase
    shifted_alphabet = alphabet[shift:] + alphabet[:shift]
    table = string.maketrans(alphabet, shifted_alphabet)
    return plaintext.translate(table)

def encode(pt, cnt=50):
	tmp = '2{}'.format(b64encode(pt))
	for cnt in xrange(cnt):
		c = random.choice(enc_ciphers)
		i = enc_ciphers.index(c) + 1
		_tmp = globals()[c](tmp)
		tmp = '{}{}'.format(i, _tmp)

	return tmp

if __name__ == '__main__':
	print encode(FLAG, cnt=50)
```

---

In this challenge you will be analysing a pcap file using Wireshark, looking for 5 hidden "pumpkins".

This challenge was credit by [cloudshark](http://cloudshark.org/)

### #1 When you find the first (most obvious) ascii pumpkin, what was the destination IP address?

![](https://imgur.com/s1D6Wkk.png)

```
175.187.69.163
```

### #2 Download all images found in the pcap file. What is the name of the pumpkin image?

![](https://imgur.com/l07xZYy.png)

### #3 Find the pumpkin that on TCP port 666. Whats the main character that makes the pumpkin up?

```
tcp.port == 666
```

![](https://imgur.com/foOFVUm.png)

```
$
```

### #4 Find the pre-master token and decrypt the traffic. What the file data size of this next pumpkin (in bytes)?

```
tcp.port == 25
```

![](https://imgur.com/v3IfjWP.png)

```
CLIENT RANDOM = 4CD4ADF90628A9AFB29D50F093A5FAD4FC09CCF3F173E52F7B2390573989659F E8AC4AFFCDAD005F5ED4E29D2625A49378A25E7D5B85D5418AC51C1D0CC50B52B39DB3998C606202339178C1EA441CE0
```

With the client random you will decrypt the ssl message (TLS protocol)

To import the client random you need the copy all the line with client random and import it in wireshark to do that you need to go to the edit button then preference, protocols and search the TLS protocol

![](https://imgur.com/dsuXpIb.png)

```
➜  TryHackMe cat client_random.txt
CLIENT_RANDOM 4CD4ADF90628A9AFB29D50F093A5FAD4FC09CCF3F173E52F7B2390573989659F E8AC4AFFCDAD005F5ED4E29D2625A49378A25E7D5B85D5418AC51C1D0CC50B52B39DB3998C606202339178C1EA441CE0
```

![](https://imgur.com/h0B1a9m.png)

```
Content-encoded entity body (gzip): 222 bytes -> 711 bytes
```

### #5 Extract the RTP stream. What is the audio file from?

With the default tools in wireshark (Telephony RTP) there is no data found..

After some time I tried to isolate two communication on the UDP port 1313

The command to isolate is :

```
ip.addr == 114.226.7.182 && udp.port == 51393 && ip.addr == 184.66.140.88 && udp.port == 1313
```

![](https://imgur.com/s1Vz5pN.png)

Once you type the filter you need to click on the first and right click then "decode as"

![](https://imgur.com/8M8gMOw.png)

Then click on the "current" and select the RTP protocol 👍

After that we can analyse the RTP communication with the tools on wireshark

![](https://imgur.com/6x6FARF.png)

![](https://imgur.com/X0XGMGK.png)

To answer the last question you need to listen the audio file


