---
title: "Stealthcopter CTF Primer - TryHackMe"
author: Ludovic COULON
date: 2020-05-30
hero: ./images/hero.jpeg
excerpt: "Writeup for the Stealthcopter CTF Primer on TryHackMe"
---

[TryHackMe | Stealthcopter CTF Primer](https://tryhackme.com/room/stealthcopterctfprimer1)

## Web

The web challenges are in the web folder inside the attached

---

### #1 w.01

```bash
➜  web cat w.01.html
<!DOCTYPE html>
<html>
<body>

<h2>Login Form</h2>

<form>
  Username:<br>
  <input type="text" name="username" value="">
  <br>
  Password:<br>
  <input type="text" name="password" value="">
    <!-- password is FLAG{check_the_comments_lol}-->
  <br><br>
  <input type="submit" value="Submit">
</form>

<p></p>

</body>
</html>
```

### #2 w.02

```bash
➜  web cat _w.02.js
c=[70,76,65,71,123,106,52,118,52,115,99,114,49,112,116,95,49,115,95,52,108,115,48,95,98,52,100,125];
var s = '';
for (var i = 0; i < c.length; i++) {
    s+=String.fromCharCode(c[i])
}
console.log(s);
```

```bash
FLAG{j4v4scr1pt_1s_4ls0_b4d}
```

### #3 w.03

<div className="Image__Medium">
  <img src="https://imgur.com/b3h3awg.png" alt="blog_image" />
</div>

```bash
FLAG{h4ck_t1m3}
```

### #4 w.04

```bash
<?php function _d5ff17c4(){$_e8b7be43=base64_decode('RkxBR3s=');$_71beeff9=base64_decode('fQ==');$_6b9df6f=0x61;$_29d6a3e8=chr(95%96);$_856a5aa8=2**2;echo $_e8b7be43.base64_decode('cGhw').$_29d6a3e8.base64_decode('aXM=').$_29d6a3e8.chr($_6b9df6f).$_29d6a3e8.chr($_6b9df6f+1).$_856a5aa8.base64_decode('ZA==').$_29d6a3e8.base64_decode('bA==').$_856a5aa8.base64_decode('bmd1').$_856a5aa8.base64_decode('ZzM=').$_71beeff9;}//_d5ff17c4(0);?>
```

```bash
FLAG{php_is_a_b4d_l4ngu4g3}
```

### #5 w.05

```php
<?php

/*
 This is a little hack so that if we run this script from commandline
 the arguments can be passed to $_GET
 To run this in a console we'd call something like:
 php w.05.php 'key=test'
 */
if (!isset($_SERVER["HTTP_HOST"])) {
  parse_str($argv[1], $_GET);
}

function encrypt($plainText, $secret_key) {
    $output = false;
    $encrypt_method = "AES-256-CBC";
    $key = hash( 'sha256', $secret_key );
    $iv = substr( hash( 'sha256', 'my_simple_secret_iv' ), 0, 16 );
    $output = base64_encode( openssl_encrypt( $plainText, $encrypt_method, $key, 0, $iv ) );
    return $output;
}

function decrypt($cipherText, $secret_key) {
    $output = false;
    $encrypt_method = "AES-256-CBC";
    $key = hash( 'sha256', $secret_key );
    $iv = substr( hash( 'sha256', 'my_simple_secret_iv' ), 0, 16 );
    $output = openssl_decrypt( base64_decode( $cipherText ), $encrypt_method, $key, 0, $iv );
    return $output;
}

if (!isset($_GET['key'])){
    die("Error: Key is not set! I know it was a single digit number, but I can't remember which one!!!");
}

$key=$_GET['key'];

echo "Key entered: $key"."\n";

$ct =  "T3FiSXVlOFYvVTJCRHRnRFdTRUZOeHplNVZpK0pQZUVUbWNmTHNCZUt5RT0=";

echo "CipherText: $ct\n";

$pt =  decrypt($ct, $key);

echo "PlainText: $pt \n";

?>
```

```php
FLAG{n0t_s0_t0ugh}
```

### #6 w.06

```bash
 call the function callme()
FLAG{c4n_y0u_s33_m3_n0w}
```

### #7 w.07

```bash
for try in $(seq 0000 9999); do
	php w.07.php "key=$try" | grep FLAG
done
```

```bash
PlainText: FLAG{4_l1ttl3_b4t_h4rd3r}
```

### #8 w.08

```bash
{
  "id": 1234,
  "username": "admin",
  "password": "FLAG{jwt_t0k3ns_ar3_c00l_b34nz}"
}
```

### #9 w.09

```bash
{
  "id": 1337,
  "username": "admin",
  "hint": "the flag is FLAG{xxxxxxx_d1ct10n4ry_4tt4ck} where xxxxxxx is the password used to sign this token"
}
```

```bash
 Bruteforce the jwt and ou have the thing
FLAG{rockyou_d1ct10n4ry_4tt4ck}
```

### #10 w.10

```bash
FLAG{1_h0p3_y0u_d1dnt_brut3f0rc3_m3...LINE_16}
```

## Cryptography

The cryptograph challenges are in the crypto folder inside the attached [zip file](https://drive.google.com/file/d/1Ll54__gHQYIEbc9zJIhhpxlDtwbtqN2P/view?usp=sharing).

### #1 c.01

```bash
➜  crypto cat c.01
RkxBR3sxc3RfdGltZV9sdWNreX0=
```

```bash
 Base64 decode
FLAG{1st_time_lucky}
```

### #2 c.02

<div className="Image__Medium">
  <img src="https://imgur.com/hgQMl4S.png" alt="blog_image" />
</div>

```bash
FLAG{3rd_times_a_charm}
```

### #3 c.03

<div className="Image__Medium">
  <img src="https://imgur.com/6hFXzxc.png" alt="blog_image" />
</div>

```bash
FLAG{stabbed_in_the_back}
```

### #4 c.04

<div className="Image__Medium">
  <img src="https://imgur.com/8m0d236.png" alt="blog_image" />
</div>

```bash
FLAG{a_little_bit_more_tricky}
```

### #5 c.05

[](https://github.com/hellman/xortool)

```bash
FLAG{xor_is_super_secure}
```

### #6 c.06

[Vigenère Cipher - Decoder, Encoder, Solver, Translator](https://www.dcode.fr/vigenere-cipher)

```bash
FLAG{chocolate_eclaire}
```

### #7 c.07

```bash
Use openSSL to decode
```

```bash
FLAG{encrypt_all_the_things}
```

### #8 c.08

<div className="Image__Medium">
  <img src="https://imgur.com/eqPjg9x.png" alt="blog_image" />
</div>

```bash
 Replace the l and the O by A OR B
# Decode it and you will get the flag
```

```bash
WELL DONE THE FLAG IS BACONANDEGGSANDWICH
```

### #9 c.09

<div className="Image__Medium">
  <img src="https://imgur.com/uATw64w.png" alt="blog_image" />
</div>

```bash
FLAG{EASY_AS_ABC_123}
```

### #10 c.10

<div className="Image__Medium">
  <img src="https://imgur.com/NSlGOS8.png" alt="blog_image" />
</div>

<div className="Image__Small">
  <img src="https://imgur.com/ozJJ0vb.png" alt="blog_image" />
</div>

```bash
FLAGSEANDROIDANDIOS
FLAG{preandroidandios}
```

## Forensics

The forensics challenges are in the forensics folder inside the attached [zip file](https://drive.google.com/file/d/1Ll54__gHQYIEbc9zJIhhpxlDtwbtqN2P/view?usp=sharing).

---

### #1 f.01

```bash
➜  forensics cat f.01 | grep {
FLAG{here_i_am}
```

### #2 f.02

<div className="Image__Medium">
  <img src="https://imgur.com/1K4WiBm.png" alt="blog_image" />
</div>

```bash
FLAG{MORSE CODE FTW}
```

### #3 f.03

```bash
➜  forensics strings f.03.jpg | grep FLAG
```

```bash
FLAG{strings_and_things}
```

### #4 f.04

```bash
 Just cat the file ..
FLAG{stealth_mode_engaged}
```

### #5 f.05

```bash
➜  forensics binwalk -e f.05.png

DECIMAL       HEXADECIMAL     DESCRIPTION
--------------------------------------------------------------------------------
0             0x0             PNG image, 1406 x 800, 8-bit/color RGB, non-interlaced
99            0x63            Zlib compressed data, default compression
2093725       0x1FF29D        Zip archive data, at least v2.0 to extract, compressed size: 44, uncompressed size: 400, name: flag.txt
2093913       0x1FF359        End of Zip archive, footer length: 22

➜  forensics cat flag.txt
cat: flag.txt: No such file or directory

➜  forensics l
total 33M
drwxr-xr-x  3 kali kali 4.0K May 29 14:20 .
drwxr-xr-x 10 kali kali 4.0K May 29 03:11 ..
-rw-r--r--  1 kali kali  29M Oct 26  2019 f.01
-rw-r--r--  1 kali kali 395K Oct 26  2019 f.02.wav
-rw-r--r--  1 kali kali 104K Oct 26  2019 f.03.jpg
-rw-r--r--  1 kali kali   27 Oct 26  2019 _f.04
-rw-r--r--  1 kali kali 2.0M Oct 26  2019 f.05.png
drwxr-xr-x  2 kali kali 4.0K May 29 14:20 _f.05.png.extracted
-rw-r--r--  1 kali kali 940K Oct 26  2019 f.06.png
-rw-r--r--  1 kali kali  212 Oct 26  2019 f.07.zip
-rw-r--r--  1 kali kali  17K Oct 26  2019 f.08
-rw-r--r--  1 kali kali  278 Oct 26  2019 f.09
-rw-r--r--  1 kali kali  347 Oct 26  2019 f.10

➜  forensics cd _f.05.png.extracted

➜  _f.05.png.extracted ls
1FF29D.zip  63  63.zlib  flag.txt

➜  _f.05.png.extracted cat flag.txt
flag{this_is_another_one_of_them_flags}
```

### #6 f.06

<div className="Image__Small">
  <img src="https://imgur.com/K0ausym.png" alt="blog_image" />
</div>

```bash
 Change the header of the file put PNG tou can use ghex or something like that.
FLAG{n0_m0r3_c0rrupt10n}
```

### #7 f.07

```bash
➜  forensics sudo zip2john f.07.zip
ver 2.0 efh 5455 efh 7875 f.07.zip/flag.txt PKZIP Encr: 2b chk, TS_chk, cmplen=30, decmplen=24, crc=CEA2ED5E
f.07.zip/flag.txt:$pkzip2$1*2*2*0*1e*18*cea2ed5e*0*42*8*1e*cea2*a638*dcc1a049f0ab48b7a811c7b59c86ed493ca5029a5acd0792f53b42baef8d*$/pkzip2$:flag.txt:f.07.zip::f.07.zip

➜  forensics cat > zipCrack
$pkzip2$1*2*2*0*1e*18*cea2ed5e*0*42*8*1e*cea2*a638*dcc1a049f0ab48b7a811c7b59c86ed493ca5029a5acd0792f53b42baef8d*$/pkzip2$
^C

➜  forensics sudo john zipCrack
Using default input encoding: UTF-8
Loaded 1 password hash (PKZIP [32/64])
Will run 2 OpenMP threads
Proceeding with single, rules:Single
Press 'q' or Ctrl-C to abort, almost any other key for status
Almost done: Processing the remaining buffered candidate passwords, if any.
Proceeding with wordlist:/usr/share/john/password.lst, rules:Wordlist
password1        (?)
1g 0:00:00:00 DONE 2/3 (2020-05-29 14:32) 100.0g/s 409600p/s 409600c/s 409600C/s 123456..Peter
Use the "--show" option to display all of the cracked passwords reliably
Session completed

➜  forensics unzip f.07.zip
Archive:  f.07.zip
[f.07.zip] flag.txt password:
  inflating: flag.txt

➜  forensics cat flag.txt
FLAG{zippy_zip_zip_zip}
```

### #8 f.08

```bash
gdb ./f.08
```

```bash
FLAG{incorrect}
```

### #9 f.09

<div className="Image__Medium">
  <img src="https://imgur.com/pi6k3rE.png" alt="blog_image" />
</div>

```bash
FLAG{SECURE_PASSWORD_HASH}
```

### #10 f.10

<div className="Image__Medium">
  <img src="https://imgur.com/KkgaMk5.png" alt="blog_image" />
</div>

```bash
FLAG{esoteric_lanaguages_are_cool}
```

## Networking

The networking challenges are in the networking folder inside the attached [zip file](https://drive.google.com/file/d/1Ll54__gHQYIEbc9zJIhhpxlDtwbtqN2P/view?usp=sharing).

---

### #1 n.01

<div className="Image__Medium">
  <img src="https://imgur.com/rFISts2.png" alt="blog_image" />
</div>

```bash
FLAG{n0w_y0ur_g3tt1ng_1t}
```

### #2 n.02

<div className="Image__Medium">
  <img src="https://imgur.com/DUpDifk.png" alt="blog_image" />
</div>

```bash
FLAG{1_am_th3_p0stm4n}
```

### #3 n.03

<div className="Image__Medium">
  <img src="https://imgur.com/teKTBrH.png" alt="blog_image" />
</div>

```bash
FLAG{s3cr3t_ag3nt}
```

### #4 n.04

<div className="Image__Medium">
  <img src="https://imgur.com/udB5VWw.png" alt="blog_image" />
</div>

```bash
FLAG{h3r3_1_am}
```

### #5 n.05

<div className="Image__Medium">
  <img src="https://imgur.com/QNzeG23.png" alt="blog_image" />
</div>

```bash
➜  networking tar -xf %5csrvsvc
➜  networking l
total 3.4M
drwxr-xr-x  2 kali kali 4.0K May 29 15:06 .
drwxr-xr-x 10 kali kali 4.0K May 29 03:11 ..
-rw-r--r--  1 kali kali  219 May 29 14:58 %2f
-rw-r--r--  1 kali kali  160 May 29 15:05 %5csrvsvc
-rw-r--r--  1 kali kali   30 Oct 27  2019 flag.txt
-rw-r--r--  1 kali kali 110K May 29 15:02 hack.jpg
-rw-r--r--  1 kali kali   14 May 29 14:58 help.php
-rw-r--r--  1 kali kali 5.7K Oct 26  2019 n.01.pcap
-rw-r--r--  1 kali kali 5.6K Oct 26  2019 n.02.pcap
-rw-r--r--  1 kali kali 8.7K Oct 26  2019 n.03.pcap
-rw-r--r--  1 kali kali 2.9M Oct 26  2019 n.04.pcap
-rw-r--r--  1 kali kali  23K Oct 27  2019 n.05.pcap
-rw-r--r--  1 kali kali 8.8K Oct 27  2019 n.06.pcap
-rw-r--r--  1 kali kali 267K Oct 27  2019 n.07.pcap
-rw-r--r--  1 kali kali  24K Oct 26  2019 n.08.pcap
-rw-r--r--  1 kali kali 3.1K Oct 27  2019 n.09
-rw-r--r--  1 kali kali 5.1K Oct 27  2019 n.10.pcap
-rw-r--r--  1 kali kali 3.7K Oct 27  2019 n.10.ssl.log
➜  networking cat flag.txt
FLAG{smb_smb_smb_smb_smb_smb}
```

### #6 n.06

<div className="Image__Medium">
  <img src="https://imgur.com/7uTcUoe.png" alt="blog_image" />
</div>

```bash
FLAG{1n3s3cur3_
```

<div className="Image__Medium">
  <img src="https://imgur.com/lxMAHg9.png" alt="blog_image" />
</div>

```bash
Npr0t0c0ls}
```

```bash
FLAG{1n3s3cur3_Npr0t0c0ls}
```

### #7 n.07

<div className="Image__Medium">
  <img src="https://imgur.com/9f0XzwD.png" alt="blog_image" />
</div>

```bash
0x46 0x4c 0x41 0x47 0x7b 0x64 0x6e 0x73 0x5f 0x33 0x78 0x66 0x31 0x6c 0c74 0x72 0x34 0x74 0x30 0x72 0x7d
```

<div className="Image__Medium">
  <img src="https://imgur.com/w9iIOFa.png" alt="blog_image" />
</div>

```bash
FLAG{dns_3xf1ltr4t0r}
```

### #8 n.08

```bash
Wireshark filter : tcp and data
```

<div className="Image__Medium">
  <img src="https://imgur.com/cx42s5z.png" alt="blog_image" />
</div>

```bash
 Get the last data and you will get the flag
FLAG{this_is_a_hidden_flag}
```

<center>
  <a href="https://tryhackme.com/p/boperXD" target="_blank">
    <img src="https://tryhackme-badges.s3.amazonaws.com/boperXD.png" alt="TryhackMeProfile" />
  </a>
</center>
