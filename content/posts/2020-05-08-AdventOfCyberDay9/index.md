---
title: "Advent of Cyber Day 9 Requests"
author: Ludovic COULON
date: 2020-05-08
hero: ./images/hero.png
excerpt: "Advent of Cyber Day 9 Requests"
secret: true
---

[TryHackMe | Advent of Cyber](https://tryhackme.com/room/25daysofchristmas)

McSkidy has been going keeping inventory of all the infrastructure
but he finds a random web server running on port 3000. All he receives
when accessing '/' is

```
{"value":"s","next":"f"}
```

McSkidy needs to access the next page at /f(which is the value received from the data above) and keep track of the value at each step(in this case 's'). McSkidy needs to do this until the 'value' and 'next' data have the value equal to 'end'.

You can access the machines at the following IP:

- **10.10.169.100**

Things to note about this challenge:

- The JSON object retrieved will need to be converted from unicode to ASCII(as shown in the supporting material)
- All the values retrieved until the 'end' will be the flag(end is not included in the flag)

Check out the supporting material [here](https://docs.google.com/document/d/1FyAnxlQpzh0Cy17cKLsUZYCYqUA3eHu2hm0snilaPL0/edit?usp=sharing).

First you need to scan the ip address.

```bash
"nmap -sV -vv 10.10.169.100"

Discovered open port 111/tcp on 10.10.169.100
Discovered open port 22/tcp on 10.10.169.100
Discovered open port "3000/tcp on 10.10.169.100"
```

As you can see, the port 3000 is open, you can test the result with curl

```bash
curl 10.10.169.100:3000
{"value":"s","next":"f"}
```

Now we can develop our own python script to get the flag

```python
import requests

path="/" # Path for the web application
host="http://10.10.169.100:3000" # Url of the target box
values=[] # All the values will be stored there

while path != "/end":
	response = requests.get(host+path)
	json_response = response.json()
	path = "/" + json_response["next"]
	if path != "/end":
		values.append(json_response["value"]) # While the path is not /end the script will iterate again and again

print("".join(values)) # Print the final value (flag)
```

```python
sCrIPtKiDd # flag
```
