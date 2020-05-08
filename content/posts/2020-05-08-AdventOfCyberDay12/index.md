---
title: "Advent of Cyber Day 12 Elfcryption"
author: Ludovic COULON
date: 2020-05-08
hero: ./images/hero.png
excerpt: "Advent of Cyber Day 12 Elfcryption"
secret: true
---

[TryHackMe | Advent of Cyber](https://tryhackme.com/room/25daysofchristmas)

You think the
Christmas Monster is intercepting and reading your messages! Elf Alice
has sent you an encrypted message. Its your job to go and decrypt it!

Read the supporting materials [here](https://docs.google.com/document/d/1xUOtEZOTS_L8u_S5Fbs1Wof7mdpWQrj2NkgWLV9tqns/edit?usp=sharing).

### #1 What is the md5 hashsum of the encrypted note1 file?

```bash
kali@kali:~/Downloads$ md5sum note1.txt.gpg
"24cf615e2a4f42718f2ff36b35614f8f"  note1.txt.gpg
```

### #2 Where was elf Bob told to meet Alice?

```bash
gpg key is 25daysofchristmas # Hint provided by tryhackme
```

```bash
kali@kali:~/Downloads$ gpg -d note1.txt.gpg
gpg: AES encrypted data
gpg: encrypted with 1 passphrase
I will meet you outside "Santa's Grotto" at 5pm!
```

### #3 Decrypt note2 and obtain the flag!

Now, if we use our private key, we can decrypt the file and get the original message:

```bash
openssl rsautl -decrypt -inkey private.key -in encrypted.txt -out plaintext.txt
```

```bash
kali@kali:~/Downloads$ openssl rsautl -decrypt -inkey private.key -in note2_encrypted.txt -out note2.txt
Enter pass phrase for private.key: hello # private password is hello (**Hint provided by tryhackme)**
```

```bash
kali@kali:~/Downloads$ cat note2.txt
"THM{ed9ccb6802c5d0f905ea747a310bba23}"
```
