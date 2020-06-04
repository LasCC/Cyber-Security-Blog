---
title: "Password Cracking - TryHackMe"
author: Ludovic COULON
date: 2020-06-04
hero: ./images/hero.jpeg
excerpt: "Writeup for the Password Cracking room on TryHackMe"
---

[TryHackMe | Password Cracking](https://tryhackme.com/room/passwordcracking)

This section you will need to use Hashcat to **bruteforce** the hash by using the given **password format**.

---

### #1 Password format: "TRY-HACK-ME-" followed by 3 digits.

[Hashcat Tutorial - The basics of cracking passwords with hashcat - Laconic Wolf](https://laconicwolf.com/2018/09/29/hashcat-tutorial-the-basics-of-cracking-passwords-with-hashcat/)

```bash
hashcat -a 3 -m 0 md5bop.txt "TRY-HACK-ME-?d?d?d" --force
```

```bash
eedb694a362f8ab2effbad5e4c8fa095:TRY-HACK-ME-452
```

### #2 Password format: "TRY-HACK-ME-" followed by 4 digits.

```bash
hashcat -a 3 -m 0 md5bop.txt "TRY-HACK-ME-?d?d?d?d" --force
```

```bash
19b489d1c4220946b38d65a7fce24372:TRY-HACK-ME-7163
```

### #3 Password format: "TRY-HACK-ME-" followed by 5 digits.

```bash
hashcat -a 3 -m 0 md5bop.txt "TRY-HACK-ME-?d?d?d?d?d" --force
```

```bash
7353d3b528592ecd12139fba62c43287:TRY-HACK-ME-54350
```

---

This section you will need to create wordlist and combine them then use combination attacks in **hashcat**. For creating all possible n length of digits, check out **crunch**. For combining wordlists, check out **combinator** from hashcat-utils.

Here the wordlist you need to for all the questions.

### #1 Password format: a united states city followed by 2 digits (all lowercase).

```bash
hashcat -a 6 -m 0 combi-md5.txt us-city.txt "?d?d" --force
```

```bash
0f8e6ad80411e27fc85ba1f79153dd8f:pennsylvania46
```

### #2 Password format: a united states city followed by a simple color, followed by 3 digits (all lowercase).

[How To Perform a Combinator Attack Using Hashcat](https://www.4armed.com/blog/hashcat-combinator-attack/)

```bash
# Since this challenge needs to have two worlist in one let's use combinator (hashcat utils)
/usr/share/hashcat-utils/combinator.bin us-city.txt color.txt > combi-city-color.txt
```

```bash
hashcat -a 6 -m 0 combi-md5.txt combi-city-color.txt "?d?d?d" --force
```

```bash
fbd527693aceda78b30a978d7d3b9abb:phoenixpurple585
```

### #3 Password format: a simple color followed by a country, followed by 4 digits (all lowercase).a4131ef4610be60c0c6a3656b00dd763

```bash
/usr/share/hashcat-utils/combinator.bin color.txt contry.txt > combi-color-country.txt
```

```bash
hashcat -a 6 -m 0 combi-md5.txt combi-color-country.txt "?d?d?d?d" --force
```

```bash
a4131ef4610be60c0c6a3656b00dd763:blueiceland7926
```

---

This section is you will learn how to use **rainbow tables** to crack hash. The rainbow table(**just need XP special to get all hash**) can be found **[here](http://ophcrack.sourceforge.net/tables.php)**, you will need to use **[Ophcrack](http://ophcrack.sourceforge.net/download.php)** to load the table and crack the hash.

<div className="Image__Medium">
  <img src="https://imgur.com/zS0lftk.png" alt="blog_image" />
</div>

[Ophcrack](https://ophcrack.sourceforge.io/tables.php)

### #1

```bash
?+$!^W@?+$!^W@NTLMForTheWin
```

### #2

```bash
WinP@$$w0rd3Z
```

### #3

```bash
]?+$!^W@
```
