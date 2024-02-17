---
title: "RP Web Scanning - TryHackMe"
category: "THM"
pubDate: 2020-06-19
description: "Writeup for the RP Web Scanning challenge"
---
[TryHackMe | RP: Web Scanning](https://tryhackme.com/room/rpwebscanning)

A short quiz over the various switches used with Nikto as well as a quick scan against our target. All you'll need for this is the help menu for nikto. Include all parts of the switch unless otherwise specified.

---

### #1 First and foremost, what switch do we use to set the target host?

```
-h
```

![](https://imgur.com/PSZSL2E.png)

### #2 Websites don't always properly redirect to their secure transport port and can sometimes have different issues depending on the manner in which they are scanned. How do we disable secure transport?

```
-nossl
```

![](https://imgur.com/uv9VtgE.png)

### #3 How about the opposite, how do we force secure transport?

```
-ssl
```

![](https://imgur.com/onlbrJL.png)

### #4 What if we want to set a specific port to scan?

```
-p
```

![](https://imgur.com/BWc33ta.png)

### #5 As the web is constantly evolving, so is Nikto. A database of

vulnerabilities represents a core component to this web scanner, how do
we verify that this database is working and free from error?

```
-dbcheck
```

![](https://imgur.com/MCdgB7b.png)

### #6 If instructed to, Nitko will attempt to guess and test both files within

directories as well as usernames. Which switch and numerical value do we use to set Nikto to enumerate usernames in Apache? Keep in mind, this option is deprecated in favor of plugins, however, it's still a great
option to be aware of for situational usage.

```
-mutate 3
```

![](https://imgur.com/d3bHgpa.png)

### #7 Suppose we know the username and password for a web forum, how do we set Nikto to do a credentialed check? Suppose the username is admin and the password is PrettyAwesomePassword1234

```
-i admin:PrettyAwesomePassword1234
```

![](https://imgur.com/nzo8Qsi.png)

### #8 Let's scan our target machine, what web server do we discover and what version is it?

```
Apache/2.4.7
```

![](https://imgur.com/T6kn7p7.png)

### #9 This box is vulnerable to very poor directory control due to it's web server version, what directory is indexed that really shouldn't be?

```
config
```

![](https://imgur.com/0ThZXh1.png)

### #10 Nikto scans can take a while to fully complete, which switch do we set in order to limit the scan to end at a certain time?

```
-until
```

![](https://imgur.com/Jecp0D4.png)

### #11 But wait, there's more! How do we list all of the plugins are available?

```
-list-plugin
```

![](https://imgur.com/76zbgL7.png)

### #12 On the flip-side of the database, plugins represent another core component to Nikto. Which switch do we use to instruct Nikto to use plugin checks to find out of date software on the target host? Keep in mind that when testing this command we need to specify the host we intend to run this against. For submitting your answer, use only the base command with the out of date option.

```
-plugin outated
```

![](https://imgur.com/kWA0cZ6.png)

### #13 Finally, what if we'd like to use our plugins to run a series of standard tests against the target host?

```
-plugin tests
```

![](https://imgur.com/b9bY8DX.png)

---

A brief quiz and tutorial over using the OWASP Zap Scanner

### #1 Let's start simple and launch zap. This can be done in a number of ways (Commands: owasp-zap, zaproxy) or through launching it in the Kali GUI.

```
No awnser needed
```

### #2 Launch ZAP, what option to we set in order to specify what we are attacking?

```
Url to attack
```

![](https://imgur.com/kNmCXtC.png)

### #3 Launch the attack against our target! Throughout the course of this attack you may notice this is very similar to Nikto. Similar to Nessus vs.

OpenVAS, Nikto and ZAP and both offer different perspectives on a host
and, as such, it's useful to know how to leverage both scanning tools in order to maximize your own visibility in a situation wherein 'noise'
doesn't particularly matter.

```
No awnser needed
```

### #4 ZAP will discover a file that typically contains pages which well-behaved web indexing engines will read in order to know which sections of a site to avoid. What is the name of this file? (Lucky for us, our scanner isn't what we would call 'well-behaved'!)

```
/robots.txt
```

![](https://imgur.com/NubBOtV.png)

### #5 One entry is included in the disallow section of this file, what is it?

```
/
```

![](https://imgur.com/KdHnPBX.png)

### #6 ZAP will find a directory that contains images for our application, what is the path for that directory? (This is what will follows the name/ip of

the website)

```
/dvwa/images
```

![](https://imgur.com/To9An3c.png)

### #7 This website doesn't force a secure connection by default and ZAP isn't pleased with it. Which related cookie is ZAP upset about?

```
httpOnly
```

![](https://imgur.com/A3rJmu1.png)

### #8 Featured in various rooms on TryHackMe, Cross-Site Scripting is a vicious attack that is becoming ever more common on the open web. What Alert does ZAP produce to let us know that this site is vulnerable to XSS? Note, there are often a couple warnings produced for this, look for one more so directly related to the web client.

```
Web Browser XSS Protection Not Enabled
```

### #9 The ZAP proxy spider represents the component responsible for 'crawling' the site. What site is found to be out of scope?

![](https://imgur.com/tvDsmRF.png)

```
http://www.dvwa.co.uk/
```

### #10 ZAP will use primarily two methods in order to scan a website, which of these two HTTP methods requests content?

```
GET (logic)
```

### #11 Which option attempts to submit content to the website?

```
POST
```


