---
title: "The find / command"
author: Ludovic COULON
date: 2020-05-11
hero: ./images/hero.jpg
excerpt: "Course on TryHackMe about the find command"
---

[TryHackMe | The find command](https://tryhackme.com/room/thefindcommand)

[Unix Permissions and Lookup](http://permissions-calculator.org/)

Most of the time, you won’t be looking for something in your working directory. The first argument of your `find` command should be the directory you want to search. The command will search in that directory and in all its sub-directories. So, if you want to search the whole filesystem, your command should begin with `find /`.

Two very useful flags are the `-type` and `-name` flags. With `-type`, you can use `d` to only
find directories, and `f` to only find files. The `-name` flag is used to specify a name or pattern to look for. You can type the whole name, or use wildcards to specify only part(s) of the name. If you use
wildcards, you need to enclose your pattern in quotes, otherwise the command won't work as intended. It is useful to know that you can also use the `-iname` flag; same as `-name`,
but case insensitive.

### #1 Find all files whose name ends with ".xml"

```bash
find / -type f -name '*.xml'
```

### #2 Find all files in the /home directory (recursive) whose name is "user.txt" (case insensitive)

```bash
find /home -type f -iname "user.txt"
```

### #3 Find all directories whose name contains the word "exploits"

```bash
find / -type f -name "*exploits"
```

### Know exactly what you're looking for

In some situations, specifying just the name of a file will not be enough. You can also specify the owner, the size, the permissions, and the time the file was last accessed/modified as well.

The username of the **owner** of a file is specified with the `-user` flag.

The **size** of a file is specified with the `-size` flag. When using numerical values, the formats `-n`, `+n`, and `n` can be used, where n is a number. `-n` matches values lesser than n, `+n` matches values greater than n, and `n` matches values exactly n. To specify a size, you also need a suffix. `c` is the suffix for bytes, `k` for KiB’s, and `M` for MiB’s.

So, if you want to specify a size less than 30 bytes, the argument `-30c` should be used.

The `-perm` flag is used to specify **permissions**, either in octal form (ex. `644`) or in symbolic form (ex. `u=r`). See [here](https://www.oreilly.com/library/view/linux-pocket-guide/9780596806347/re44.html) for a short reference. If you specify the permission mode as shown above (ex. `644` or `u=r`), then `find` will only return files with those permissions **exactly**.

You can use the `–` or `/` prefix to make your search more inclusive. Using the `–` prefix will return files with **at least** the permissions you specify; this means that the `-444` mode will match files that are readable by **everyone**, even if someone also has write and/or execute permissions. Using the `/` prefix will return files that match **any** of the permissions you have set; this means that the `/666` mode will match files that are readable and writeable by **at least one** of the groups (owner, group,
or others).

Lastly, **time-related** searches will be covered. These are more complex but may prove useful.

The flag consists of a word and a prefix. The words are `min` and `time`, for minutes and days,
respectively. The prefixes are `a`, `m`, and `c`, and are used to specify when a file was last **accessed**, **modified**, or had its status **changed**.

As for the numerical values, the same rules of the `-size` flag apply, except there is no suffix. To put it all together: in order to specify that a file was last accessed more than 30 minutes ago, the option `-amin +30` is used. To specify that it was modified less than 7 days ago, the option `-mtime -7` is used.

(Note: when you want to specify that a file was modified within the last 24 hours, the option `-mtime 0` is used.)

### #1 Find all files owned by the user "kittycat"

```bash
find / -type f -user "kittycat"
```

### #2 Find all files that are exactly 150 bytes in size

```bash
find / -type f -size 150
```

### #3 Find all files in the /home directory (recursive) with size less than 2 KiB’s and extension ".txt"

```bash
find /home -type f -size -2k -name "*.txt"
```

### #4 Find all files that are exactly readable and writeable by the owner, and

readable by everyone else (use octal format)

```bash
find / -type f -perm 644
```

### #5 Find all files that are **only** readable by anyone (use octal format)

```bash
find / -type f -perm /444
```

### #6 Find all files with write permission for the group "others", regardless of any other permissions, with extension ".sh" (use symbolic format)

```bash
find / -type f -perm -o=w -name "*.sh"
```

### #7 Find all files in the /usr/bin directory (recursive) that are owned by root and have at least the SUID permission (use symbolic format)

```bash
find /usr/bin -type f -user root -perm -u=s
```

### #8 Find all files that were not accessed in the last 10 days with extension ".png"

```bash
find / -type f -time +10 -name "*.png"
```

### #9 Find all files in the /usr/bin directory (recursive) that have been modified within the last 2 hours

```bash
find /usr/bin -type f -mmin -120
```

<center>
  <a href="https://tryhackme.com/p/boperXD" target="_blank">
    <img src="https://i.imgur.com/hejzVWP.png" alt="TryhackMeProfile" />
  </a>
</center>
