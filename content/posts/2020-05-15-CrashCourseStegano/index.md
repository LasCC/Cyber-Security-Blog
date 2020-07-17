---
title: "Crash Course - Steganography"
author: Ludovic COULON
date: 2020-05-15
hero: ./images/hero.jpeg
excerpt: "Writeup for the Crash Course Steganography on TryHackMe"
---

[TryHackMe | CC: Steganography](https://tryhackme.com/room/ccstego)

Steghide is one of the most famous steganography tools, and for good reason. It's a classic method, hiding a message inside an image, and steghide does it effectively and efficiently. A downside of steghide is that it only works on jpgs; however, that means that if you believe there is a hidden message inside a jpg, then steghide is a probable option.

One of the greatest benefits of stegohide, is that it can encrypt data with a passphrase. Meaning that if they don't have the password then they can't extract any data.

steghide can be installed with the command `sudo apt install steghide`

### #1 What argument allows you to embed data(such as files) into other files?

<div className="Image__Medium">
  <img src="https://imgur.com/vihaEYB.png" alt="blog_image"/>
</div>

```bash
embed
```

### #2 What flag let's you set the file to embed?

<div className="Image__Medium">
  <img src="https://imgur.com/KF6XrJK.png" alt="blog_image"/>
</div>

```bash
-ef
```

### #3 What flag allows you to set the "cover file"?(i.e the jpg)

<div className="Image__Medium">
  <img src="https://imgur.com/owGIGv2.png" alt="blog_image"/>
</div>

```bash
-cf
```

### #4 How do you set the password to use for the cover file?

<div className="Image__Medium">
  <img src="https://imgur.com/US9nyaI.png" alt="blog_image"/>
</div>

```bash
-p
```

### #5 What argument allows you to extract data from files?

```bash
extract
```

### #6 How do you select the file that you want to extract data from?

<div className="Image__Medium">
  <img src="https://imgur.com/pSEhmql.png" alt="blog_image"/>
</div>

```bash
-sf
```

### #7 Given the passphrase "password123", what is the hidden message in the included "jpeg1" file.

```bash
➜  spect steghide extract -sf jpeg1.jpeg
Enter passphrase: password123
wrote extracted data to "a.txt".
➜  spect cat a.txt
pinguftw
```

---

zsteg is to png's what steghide is to jpg's. It supports various techniques to extract any and all data from png files.

Note: zsteg also supports BMP files, but it is primarily used for png's.

zsteg can be installed by using ruby with the command `gem install zsteg`

### #1 How do you specify that the least significant bit comes first

<div className="Image__Medium">
  <img src="https://imgur.com/UldF59l.png" alt="blog_image"/>
</div>

```bash
--lsb
```

### #2 What about the most significant bit?

<div className="Image__Medium">
  <img src="https://imgur.com/wLXHoiB.png" alt="blog_image"/>
</div>

```bash
--msb
```

### #3 How do you specify verbose mode?

<div className="Image__Medium">
  <img src="https://imgur.com/IWDRmQV.png" alt="blog_image"/>
</div>

```bash
-v
```

### #4 How do you extract the data from a specific payload?

<div className="Image__Medium">
  <img src="https://imgur.com/7V5kLt7.png" alt="blog_image"/>
</div>

```bash
-E
```

### #5 In the included file "png1" what is the hidden message?

```bash
➜  spect zsteg --lsb png1.png
imagedata           .. file: DOS 2.0 backup id file, sequence 48
b1,r,lsb,xy         .. file: dBase III DBT, version number 0, next free block index 3234843654
b1,bgr,lsb,xy       .. text: "nootnoot$"
b2,r,lsb,xy         .. file: MacBinary, Mon Feb  6 01:28:16 2040 INVALID date, modified Mon Feb  6 01:28:16 2040 "PPPUP"
b4,r,lsb,xy         .. text: "DETUDUDUDUUUDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD"
b4,g,lsb,xy         .. text: "\"\"#33223#2#2#33333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333"
b4,b,lsb,xy         .. text: "\"23\"333\"333#\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\""
b4,rgb,lsb,xy       .. text: "\"B$\"B5\"R43S%2C43S5#C4#S%2B43S5#R53S%#B$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C$2C"
b4,bgr,lsb,xy       .. text: "$\"B$2B%2S4#R53C43S%3C$#R52C43S%2S5#S%\"B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#B4#"
```

```bash
nootnoot$
```

### #6 What about the payload used to encrypt it.

```bash
b1,bgr,lsb,xy
```

---

Exiftool is a tool that allows you to view and edit image metadata.
While this in itself is not a stego tool, I would be remiss not to include at least a footnote on it as one of the most popular forms of image stego is to hide messages in the metadata.

Exiftool can be installed with `sudo apt install exiftool`

### #1 In the included jpeg3 file, what is the document name

```bash
➜  spect exiftool jpeg3.jpeg
ExifTool Version Number         : 11.98
File Name                       : jpeg3.jpeg
Directory                       : .
File Size                       : 8.3 kB
File Modification Date/Time     : 2020:01:06 16:09:44-05:00
File Access Date/Time           : 2020:01:06 16:09:46-05:00
File Inode Change Date/Time     : 2020:05:14 14:58:15-04:00
File Permissions                : rw-r--r--
File Type                       : JPEG
File Type Extension             : jpg
MIME Type                       : image/jpeg
JFIF Version                    : 1.01
Exif Byte Order                 : Big-endian (Motorola, MM)
"Document Name                   : Hello :)"
X Resolution                    : 1
Y Resolution                    : 1
Resolution Unit                 : None
Y Cb Cr Positioning             : Centered
Image Width                     : 213
Image Height                    : 160
Encoding Process                : Baseline DCT, Huffman coding
Bits Per Sample                 : 8
Color Components                : 3
Y Cb Cr Sub Sampling            : YCbCr4:2:0 (2 2)
Image Size                      : 213x160
Megapixels                      : 0.034
```

---

Personally this is one of my favorite image stego tools. It supports just about every image file, and is able to extract all types of data from it. It is an incredibly useful tool if you don't know exactly what
you're looking for, as it has a myriad of built in tests to extract any and all data.

Note: Stegoveritas has other features as well such as color correcting images

Stegoveritas can be installed by running these two commands:

`pip3 install stegoveritas`

`stegoveritas_install_deps`

### #1 How do you check the file for metadata?

```bash
-meta
```

### #2 How do you check for steghide hidden information

```bash
-steghide
```

### #3 What flag allows you to extract LSB data from the image?

```bash
-extractLSB
```

### #4 In the included image jpeg2 what is the hidden message?

```bash
➜  spect stegoveritas jpeg2.jpeg
Running Module: SVImage
+------------------+------+
|   Image Format   | Mode |
+------------------+------+
| JPEG (ISO 10918) | RGB  |
+------------------+------+
Found something with StegHide: /home/kali/Desktop/TryHackMe/spect/results/steghide_3f881161a4026a959044950815948f75.bin

➜  spect cat /home/kali/Desktop/TryHackMe/spect/results/steghide_3f881161a4026a959044950815948f75.bin
kekekekek
```

Spectrogram stegonography is the art of hiding hidden an image inside in an audio file's pectogram.

Therefore when ever dealing with audio stego it is always worth analyzing the spectrogram of the audio. To do this task we will be using [Sonic Visualizer.](https://www.sonicvisualiser.org/download.html)

Note: This introduction will be done using the included wav1 file.

When you open Sonic Visualizer you should see this screen:

<div className="Image__Medium">
  <img src="https://imgur.com/CKHI4le.png" alt="blog_image"/>
</div>

From there click File-> Open and then select the included wav1 file and you should see a screen similar to this:

<div className="Image__Medium">
  <img src="https://imgur.com/8TexIob.png" alt="blog_image"/>
</div>

From there click Layer -> Add Spectrogram and you should see this:

<div className="Image__Medium">
  <img src="https://imgur.com/wHSr0NM.png" alt="blog_image"/>
</div>

And that's it!

### #1 What is the hidden text in the included wav2 file?

<div className="Image__Medium">
  <img src="https://imgur.com/10Cj2FM.png" alt="blog_image"/>
</div>

```bash
Google
```

---

## The Final Exam

Good luck and have fun!

### #1 What is key 1?

```bash
➜  spect exiftool exam1.jpeg
ExifTool Version Number         : 11.98
File Name                       : exam1.jpeg
Directory                       : .
File Size                       : 8.6 kB
File Modification Date/Time     : 2020:01:06 20:13:27-05:00
File Access Date/Time           : 2020:05:14 15:56:29-04:00
File Inode Change Date/Time     : 2020:05:14 15:56:29-04:00
File Permissions                : rw-r--r--
File Type                       : JPEG
File Type Extension             : jpg
MIME Type                       : image/jpeg
JFIF Version                    : 1.01
Exif Byte Order                 : Big-endian (Motorola, MM)
Document Name                   : "password=admin"
X Resolution                    : 1
Y Resolution                    : 1
Resolution Unit                 : None
Y Cb Cr Positioning             : Centered
Image Width                     : 213
Image Height                    : 160
Encoding Process                : Baseline DCT, Huffman coding
Bits Per Sample                 : 8
Color Components                : 3
Y Cb Cr Sub Sampling            : YCbCr4:2:0 (2 2)
Image Size                      : 213x160
Megapixels                      : 0.034

➜  spect steghide extract -sf exam1.jpeg
Enter passphrase: "admin"
the file "a.txt" does already exist. overwrite ? (y/n) y
wrote extracted data to "a.txt".

➜  spect cat a.txt
the key is: "superkeykey"
```

### #2 What is key 2?

<div className="Image__Medium">
  <img src="https://imgur.com/84IQBZf.png" alt="blog_image"/>
</div>

```bash
https://imgur.com/KTrtNI5
```

```bash
spect zsteg --lsb KTrtNI5.png
imagedata           .. text: ")))xxxLMO"
b1,bgr,lsb,xy       .. text: "\rKey: fatality"
b2,rgb,lsb,xy       .. file: SoftQuad DESC or font file binary
b2,bgr,lsb,xy       .. file: SoftQuad DESC or font file binary
```

### #3 What is key 3?

```bash
➜  spect stegoveritas qrcode.png
```

<div className="Image__Medium">
  <img src="https://imgur.com/3sQi2lu.png" alt="blog_image"/>
</div>

<div className="Image__Small">
  <img src="https://imgur.com/CY15St2.png" alt="blog_image"/>
</div>

Scan result :

```bash
key=killshot
```

<center>
  <a href="https://tryhackme.com/p/boperXD" target="_blank">
    <img src="https://i.imgur.com/hejzVWP.png" alt="TryhackMeProfile" />
  </a>
</center>
