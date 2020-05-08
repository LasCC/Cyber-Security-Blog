---
title: "Advent of Cyber Day 6 Data Elf-iltration"
author: Ludovic COULON
date: 2020-05-08
hero: ./images/hero.png
excerpt: "Advent of Cyber Day 6 Data Elf-iltration"
secret: true
---

[TryHackMe | Advent of Cyber](https://tryhackme.com/room/25daysofchristmas)

"**McElferson! McElferson! Come quickly!**" yelled Elf-ministrator.

"**What is it Elf-ministrator?**" McElferson replies.

"**Data has been stolen off of our servers!**" Elf-ministrator says!

"**What was stolen?**" She replied.

"**I... I'm not sure... They hid it very well, all I know is something is missing**" they replied.

"**I know just who to call**" said McElferson...

Check out the supporting material [here](https://docs.google.com/document/d/17vU134ZfKiiE-DgiynrO0MySo4_VCGCpw2YJV_Kp3Pk/edit?usp=sharing).

Challenge and supporting material created by *[Sq00ky](https://twitter.com/MrS1n1st3r).*

### 1# **What data was exfiltrated via DNS?**

```bash
"Candy Cane Serial Number 8491"
# Go to the wireshark dump, search for AAAA ####(hash)
# Then use the following command to decode it.
echo 43616e64792043616e652053657269616c204e756d6265722038343931 | xxd -r -p
```

### **#2 What did Little Timmy want to be for Christmas?**

```bash
PenTester
# Wireshark -> File -> Export -> HTTP
# Now crack the password with a wordlist
fcrackzip -b --method 2 -D -p /usr/share/wordlists/rockyou.txt -v christmaslists.zip
cat christmaslisttimmy.txt
Dear Santa,
For Christmas I would like to be a "PenTester"! Not the Bic kind!
Thank you,
Little Timmy.
```

### **#3 What was hidden within the file?**

```bash
steghide extract -sf TryHackMe.jpg
# There is no password for the extract
cat christmasmonster.txt
                              ARPAWOCKY
                               "RFC527" <-

                    Twas brillig, and the Protocols
                         Did USER-SERVER in the wabe.
                    All mimsey was the FTP,
                         And the RJE outgrabe,

                    Beware the ARPANET, my son;
                         The bits that byte, the heads that scratch;
                    Beware the NCP, and shun
                         the frumious system patch,

                    He took his coding pad in hand;
                         Long time the Echo-plex he sought.
                    When his HOST-to-IMP began to limp
                         he stood a while in thought,

                    And while he stood, in uffish thought,
                         The ARPANET, with IMPish bent,
                    Sent packets through conditioned lines,
                         And checked them as they went,

                    One-two, one-two, and through and through
                         The IMP-to-IMP went ACK and NACK,
                    When the RFNM came, he said "I'm game",
                         And sent the answer back,

                    Then hast thou joined the ARPANET?
                         Oh come to me, my bankrupt boy!
                    Quick, call the NIC! Send RFCs!
                         He chortled in his joy.

                    Twas brillig, and the Protocols
                         Did USER-SERVER in the wabe.
                    All mimsey was the FTP,
                         And the RJE outgrabe.

                                                            D.L. COVILL
                                                            May 1973
```
