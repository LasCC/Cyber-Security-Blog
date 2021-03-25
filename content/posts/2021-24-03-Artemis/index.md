---
title: "Artemis"
author: Ludovic COULON
date: 2021-03-24
hero: ./images/hero.jpg
excerpt: "French writeup for the Artemis custom box"
---

### Setup recon

```bash
nmap -A -vv -p- 172.16.232.7 -oN nmap_result_arthemis
```

```bash
 Nmap 7.91 scan initiated Wed Mar 24 10:57:43 2021 as: nmap -A -vv -p- -oN nmap_result_arthemis 172.16.232.7
 Nmap scan report for 172.16.232.7
 Host is up, received syn-ack (0.10s latency).
 Scanned at 2021-03-24 10:57:43 CET for 3040s
 Not shown: 65532 closed ports
 Reason: 65532 conn-refused
 PORT      STATE SERVICE REASON  VERSION
 
 80/tcp    open  http    syn-ack Apache httpd 2.4.29 ((Ubuntu))
 |_http-generator: TYPO3 4.5 CMS
 | http-methods:
 |_  Supported Methods: GET POST OPTIONS HEAD
 |_http-server-header: Apache/2.4.29 (Ubuntu)
 |_http-title:  LESGI, la grande \xC3\xA9cole informatique \xC3\xA0 Paris de Bac \xC3\xA0 Bac+5
 
 25452/tcp open  ssh     syn-ack OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
 | ssh-hostkey:
 |   2048 e4:e4:c3:c7:4f:8b:0e:a3:53:bc:7a:a6:0f:43:19:61 (RSA)
 | ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDRoHQ7NA7HaqoRdkAt0ZyNXzLnAWENkdFDG64opLvKnsHNP7qFCHFXnT/3fV6TOFXpNiyNL4GTSkcDYIdurBFkohB0H0xunvpn1jSN3hGx+E2 J1A0g9AbqptfHFwRmSJ+zx+GfCoD7RYI0Oy4D3SdVihSzCzSZu93Wr1OGoo3UQ85wfdEowcttBazickYTsSLv0bWIXWh77920Ivw83RJG3LdHoj8a85h+hPkcd9lbaru2tSMHHjxVC2do/JB1aGae KCLqRMCBZLP4efC0rvp2pSTIRhcQgyKa1IvA0vdcye+ASnJKWYOaMht4KJLFfWNj0gjjdHy7UdrAar086xHT
 |   256 62:af:ab:21:35:75:f6:8f:99:3d:d5:eb:19:fe:43:0e (ECDSA)
 | ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBDq9V7se1L0s8qp+Y+zdxk5qBioiJPHaQ8amDWgNmUJ0/bu9RteeRjVimsdV7yUUcjnct6WNvZG 9PBGFmacOpbI=
 |   256 4a:3c:bb:38:8c:ef:4a:dd:19:26:47:67:11:04:60:fa (ED25519)
 |_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIKr91sYv9fRa/QyISfvb1p6EgaPGJrelLa4HktQRznHK
 
 61337/tcp open  ftp     syn-ack vsftpd 2.0.8 or later
 | ftp-anon: Anonymous FTP login allowed (FTP code 230)
 | -rw-r--r--    1 0        0             207 Mar 22 23:05 letters.txt
 |_drwxr-xr-x    2 0        0            4096 Mar 23 01:15 logs
 | ftp-syst:
 |   STAT:
 | FTP server status:
 |      Connected to ::ffff:172.16.232.1
 |      Logged in as ftp
 |      TYPE: ASCII
 |      No session bandwidth limit
 |      Session timeout in seconds is 300
 |      Control connection is plain text
 |      Data connections will be plain text
 |      At session startup, client count was 4
 |      vsFTPd 3.0.3 - secure, fast, stable
 |_End of status
 Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

 Read data files from: /usr/local/bin/../share/nmap
 Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
```

Comme nous pouvons le voir, plusieurs ports sont ouverts dont le dernier le port **61337** qui cache un petit service ftp avec une connexion Anonymous autorisé.

---

### Accès FTP

![./images/Untitled01.png](./images/Untitled01.png)

Credentials : 

```txt
Username : anonymous
Password : aucun
```

Je vais utiliser la commande `mget *` pour récupérer  tous les fichiers présents sur le FTP

Une fois les fichiers extraits, je vais `grep` les fichiers de log pour récupérer uniquement les code 200 en HTTP

```bash
❯ cat access.log | grep 200 > access.log.filtered
```

```bash
192.168.204.133 - - [22/Mar/2021:22:16:43 +0300] "GET / HTTP/1.0" 200 433 "-" "-"
192.168.204.133 - - [22/Mar/2021:22:16:45 +0300] "GET / HTTP/1.0" 200 433 "-" "-"
192.168.204.133 - - [22/Mar/2021:22:16:50 +0300] "GET / HTTP/1.0" 200 433 "-" "-"
192.168.204.133 - - [22/Mar/2021:22:16:50 +0300] "GET / HTTP/1.1" 200 414 "-" "-"
192.168.204.133 - - [22/Mar/2021:22:23:49 +0300] "GET / HTTP/1.1" 200 446 "-" "Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0"
192.168.204.133 - - [22/Mar/2021:22:37:16 +0300] "GET / HTTP/1.1" 200 24301 "-" "Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0 "
192.168.204.133 - - [22/Mar/2021:22:37:17 +0300] "GET / HTTP/1.1" 200 24301 "-" "Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0 "
192.168.204.133 - - [22/Mar/2021:22:39:16 +0300] "GET / HTTP/1.1" 200 8704 "-" "Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0" 
192.168.204.133 - - [22/Mar/2021:22:42:42 +0300] "GET / HTTP/1.1" 200 8704 "-" "Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0" 
192.168.204.133 - - [22/Mar/2021:22:56:00 +0300] "GET /**0cdb312366ecf1f493bc83f0fb56adda28125498762f28f1cc40c320300125ce/** HTTP/1.1" 200 444 "-" "Mozil la/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0"
192.168.204.133 - - [22/Mar/2021:22:44:32 +0300] "GET / HTTP/1.1" 200 11082 "-" "Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0 "
192.168.204.133 - - [22/Mar/2021:22:44:34 +0300] "GET / HTTP/1.1" 200 11081 "-" "Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0 "
```

![./images/Untitled1.png](./images/Untitled1.png)

### **LFI TO RCE**

Comme vous pouvez le constater, nous avons une url pas commune pour un site internet.

Je vais lancer un scan de bruteforce de répertoire

```bash
# Personnellement j'utilise feroxbuster c'est un outil identique à gobuster ou dirb
feroxbuster --url http://172.16.232.7/0cdb312366ecf1f493bc83f0fb56adda28125498762f28f1cc40c320300125ce/ --extensions cgi,py,bak,php,pdf,asp,html,xml,json,txt,js -o export_feroxbuster_path_zarb
```

![./images/Untitled2.png](./images/Untitled2.png)

```bash
/uploads
/upload.php
/upload.html
/language.php
/index.html
/
/.php
/.html
**/uploads/**
/uploads/.php
/uploads/.html
/uploads
**/upload.php**
/upload.html
/index.html
**/language.php**
```

Allons jeter un petit coup d'œil pour voir les paths intéressent 👀

![./images/Untitled3.png](./images/Untitled3.png)

Un upload, qui va peut-être nous servir pour atteindre la machine 👀

![./images/Untitled4.png](./images/Untitled4.png)

Le répertoire d'upload

![./images/Untitled5.png](./images/Untitled5.png)

Un bouton language

![./images/Untitled6.png](./images/Untitled6.png)

Je vais lancer `burp suite` pour tenter d'upload quelques shells

![./images/Untitled7.png](./images/Untitled7.png)

Après avoir intercepté la connexion avec burp je l'ai envoyé dans `Reapter` pour éviter de retaper la requête à chaque essaie.

Comme vous pouvez le voir ici j'ai utilisé un reverse shell "*classique*" avec l'aide de [mon extension chrome](https://github.com/LasCC/Hack-Tools) **#AD**

![./images/Untitled8.png](./images/Untitled8.png)

![./images/Untitled9.png](./images/Untitled9.png)

Malheureusement, l'application possède un filtre qui check les extensions et nous envoie une erreur dès qu'un fichier uploader n'a pas un `.jpg, .png, .jpeg`

L'erreur en question

![./images/Untitled10.png](./images/Untitled10.png)

Essayons de bypasser le filtre en ajoutant un `.jpg` 

Et voilà! 🤌  Le filtre a bien été bypasser comme prévu.

![./images/Untitled11.png](./images/Untitled11.png)

Allons voir dans le path `/uploads` si notre backdoor a bien été placé dans le bon dossier.

Et comme vous pouvez le constaté, notre backdoor est bien présente

*(Ne faites pas attention aux autres fichiers, j'ai testé plusieurs méthodes de bypass de filtre)*

![./images/Untitled12.png](./images/Untitled12.png)

Lorsque l'on clique sur notre backdoor rien ne ce passe, ce qui est tout à fait logique parce que le serveur apache pense que notre backdoor est une image (d'où le `.jpg` à la fin du fichier uploader)

Revenons maintenant sur le bouton langage que nous avons vu précédemment.

À première vu, rien de spéciale, mais quelque chose ce cache derrière ce petit bouton.

![./images/Untitled13.png](./images/Untitled13.png)

Je vais intercepter la connexion avec burp suite pour vous expliquer comme j'ai fait pour avoir un `LFI` que j'ai transformé en `RCE`

Comme vous pouvez le voir, nous avons accès à une variable que nous pouvons exploiter dans l'url, plus précisément la variable `?lang=`

![./images/Untitled14.png](./images/Untitled14.png)

Maintenant, je vais utiliser un payload qui est présent sur [mon extension](https://github.com/LasCC/Hack-Tools) **#AD2** qui va nous permettre de faire du `Directory traversal`

![./images/Untitled15.png](./images/Untitled15.png)

![./images/Untitled16.png](./images/Untitled16.png)

Prenons un moment pour analyser la situation de notre pentest

- Nous avons upload notre `backdoor en php` mais qui n'est pas encore exécutable par le serveur
- Nous avons accès à un Directory Traversal avec le fichier `language.php`

Si nous combinons les deux méthodes d'accès, nous pouvons essayer d'exécuter notre propre `backdoor` depuis le `LFI` découvert plus tôt.

### RCE (Accès à la machine depuis le www-data)

Avec la combinaison de nos deux méthodes, comme prévu, nous avons réussi à exécuter notre backdoor et donc avoir notre premier accès à la machine 🙌

![./images/Untitled17.png](./images/Untitled17.png)

```
# Vu que nous sommes dans le même répertoire, il suffira de remonter sur le répertoire d'upload et de sélectionner notre backdoor" **./uploads/reverseShellA.php5.jpg"**
GET /0cdb312366ecf1f493bc83f0fb56adda28125498762f28f1cc40c320300125ce/language.php?lang=**./uploads/reverseShellA.php5.jpg** HTTP/1.1
```

![./images/Untitled18.png](./images/Untitled18.png)

Pour ma santé mentale, je vais vous montrer comment upgrade un shell TTY classique en shell qui fonctionne parfaitement avec autocomplétion.

Pour rappel, cette méthode est disponible directement sur [mon extension chrome](https://github.com/LasCC/Hack-Tools) *#AD3 (promis j'arrête)*

![./images/Untitled19.png](./images/Untitled19.png)

Et voilà! Nous avons un shell qui fonctionne parfaitement, nous pouvons commencer sur de bonnes bases pour trouver un accès sur un autre utilisateur.

![./images/Untitled20.png](./images/Untitled20.png)

Une fois rendu dans le dossier `/var/www/html` on peut apercevoir un dossier `backups-4e45a234079C45bc326b12ce453` qui n'apparait pas sur le fichier de log que nous avons exfiltré du FTP de tout à l'heure.

Après quelques minutes à chercher dans chaque petits dossiers et fichiers du répertoire, j'ai attentivement regarder le fichier `users.sql`

![./images/Untitled21.png](./images/Untitled21.png)

Et comme vous pouvez le voir sur la ligne surlignée, nous avons notre compte utilisateur `eguillemot` avec un hash `B38E48ED65DF090D475F5F25E030D183BC140ECD`

![./images/Untitled22.png](./images/Untitled22.png)

Pour cracker le hash il existe plusieurs méthodes / outils comme `hashcat` `john` et pleins d'autres encore. 

Mais pour ma part, j'ai utilisé l'utilitaire `crackstation` qui est disponible en ligne.

![./images/Untitled23.png](./images/Untitled23.png)

Et voilà ! Nous avons accès à notre premier utilisateur passant de `www-data` à l'utilisateur `eguillemot`

```
Identifiant ssh
Username : eguillemot
Password : esgi
```

### Connexion à l'utilisateur eguillemot

```
# Pour rappel, la connexion SSH est sur le port 25452
❯ ssh eguillemot@172.16.232.7 -p 25452
```

![./images/Untitled24.png](./images/Untitled24.png)

### Premier flag user

![./images/Untitled25.png](./images/Untitled25.png)

```
eguillemot@artemis:~$ cat user.txt
CEH{Wh4t_4_w0nd3rfUl_w3bs1t3}
```

Maintenant que nous sommes sur l'utilisateur eguillemot, nous devons trouver un moyen d'accéder à l'utilisateur khenno 

Pour ce faire, je vais utiliser un utilitaire très sympathique qui me permet de m'afficher toutes les configurations / fichiers présents sur la machine qui pourrait être compromettant pour un autre utilisateur.

L'outil `LinEnum` ⬇️

[rebootuser/LinEnum](https://github.com/rebootuser/LinEnum/blob/master/LinEnum.sh)

Pour éviter des erreurs d'écritures je place le script `LinEnum` dans le répertoire `/dev/shm` c'est un répertoire de développement qui contient normalement de la `shared memory` donc pas de problème d'écriture dans ce type de répertoire.

![./images/Untitled26.png](./images/Untitled26.png)

Comme vous pouvez le voir sur le script `LinEnum` nous avons un binaire qui n'est pas normalement présent sur les machines Linux, surtout que le binaire en question à des accès avec l'utilisateur que nous voulons compromettre. 

### Reverse engineering

Nous allons nous concentrer maintenant à la partie reverse engineering, pour cet exercice je vais utiliser l'utilitaire `gdb`avec le plugin `peda`

Mais avant de commencer, j'ai utiliser `Ghidra`pour qu'il me génère un pseudo-code de l'application me permettant d'avoir un aperçu du fonctionnement.

![./images/Untitled27.png](./images/Untitled27.png)

```c
{
  __uid_t __euid;
  __uid_t __ruid;
  undefined8 local_34;
  undefined4 local_2c;
  char local_28 [12]; // Tableau de 12 char max
  int local_1c; 
  
  local_34 = 0x5e415d415d415d5b; // String
  local_2c = 0x415f41; // Non utilisé
  fgets(local_28,0xc,stdin); // Input de l'application
  local_1c = strcmp(local_28,(char *)&local_34); // Comparaison 
  if (local_1c == 0) { // Si la comparaison est true on passe bash
    __euid = geteuid();
    __ruid = geteuid();
    setreuid(__ruid,__euid);
    system("/bin/bash");
  }
  return 0;
}
```

Maintenant que nous une idée sur le comportement de l'application, je vais vous expliquer comment reverse le binaire avec `gdb`

![./images/Untitled28.png](./images/Untitled28.png)

Premièrement nous allons commencer avec un `disass main` puis nous allons placer un breakpoint.

Nous voilà dans la stack ! 🥴

![./images/Untitled29.png](./images/Untitled29.png)

Je vais vous éviter toutes les informations futiles et passer directement dans le vif du sujet.

Nous sommes, dans le moment de la stack ou le programme nous demande d'entrer une valeur, pour le test je vais mettre volontairement des AAAA.

![./images/Untitled30.png](./images/Untitled30.png)

![./images/Untitled31.png](./images/Untitled31.png)

Nous arrivons maintenant au moment de la comparaison

![./images/Untitled32.png](./images/Untitled32.png)

Et comme vous pouvez le voir le programme viens de jumper vers une fonction de leave, ce qui nous prouve que la comparaison a échoué 

![./images/Untitled33.png](./images/Untitled33.png)

Mais comme vous pouvez le voir, il compare le string `[]A]A]A^A_A` avec nos `AAAA`entré manuellement.

![./images/Untitled34.png](./images/Untitled34.png)

### Exploitation du binaire

Comme vu précédemment, nous avons trouvé un string `[]A]A]A^A_A`, nous allons l'essayer sur la machine utilisateur pour essayer de faire spawn un shell avec l'utilisateur `khennou`

Et voilà ! Nous venons d'exploiter le binaire passant de `www-data` → `eguillemot` → `khennou`

![./images/Untitled35.png](./images/Untitled35.png)

Une fois sur le dernier utilisateur il suffira de faire un petit `sudo -l` pour voir s'il fait partie des `sudoers`

![./images/Untitled36.png](./images/Untitled36.png)

C'est parfait, nous avons accès au root avec la commande suivante en `nopasswd`

```bash
sudo su
```

### Rooted

```bash
root@artemis:~> cat root.txt
CEH{B4ckd0or3d_3SG1????}
```

![./images/Untitled37.png](./images/Untitled37.png)