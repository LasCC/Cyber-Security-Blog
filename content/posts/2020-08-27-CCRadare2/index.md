---
title: "Radare2 - TryHackMe"
author: Ludovic COULON
date: 2020-08-27
hero: ./images/hero.png
excerpt: "An in-depth crash course on Radare2"
---

[TryHackMe | Basic Malware RE](https://tryhackme.com/room/ccradare2)

This room assumes that you have basic x86 assembly knowledge. If you do not I highly recommend doing the [Intro to x86-64](https://tryhackme.com/room/introtox8664) room before completing this done.

This room is also not designed to be a 100% teach everything on radare2. It is designed to teach you how some of the more common things in radare2 are used.

The included zip file has all the binaries you will need for this exercise.

With that out of the way let's get started!

---

**1 - Command Line Options**

A quick intro to some of the commonly used command line flags for radare2, some of these flags will be extremely useful for later tasks. Include all parts of the flag including the -. All flags can be found in the help menu

---

### 1 What flag to you set to analyze the binary upon entering the r2 console (equivalent to running aaa once your inside the console)

```bash
-a
```

<div className="Image__Medium">
	<img src="https://i.imgur.com/7haC5nE.png" alt="blog_image" />
</div>

### 2 How do you enable the debugger ?

```bash
-d
```

<div className="Image__Medium">
	<img src="https://i.imgur.com/gt4AtIo.png" alt="blog_image" />
</div>

### 3 How do you open the file in write mode ?

```bash
-w
```

<div className="Image__Medium">
	<img src="https://i.imgur.com/zxAqOTe.png" alt="blog_image" />
</div>

### 4 How do you enter the console without opening a file

```bash
-
```

<div className="Image__Medium">
	<img src="https://i.imgur.com/16NQrXN.png" alt="blog_image" />
</div>

**2 - Analyzation**

Once inside the radare console you have a myriad of options to analyze your binary. Generally all analyzation commands start with the letter a. If you want to list all possible commands that can be done with your starting letter(s) you add a question mark to the end.

For example **a?** would output **ab,aa,ac** along with a description on what each command does.

---

### 1 What command "Analyzes Everything" (all functions and their arguments: Same as running with radare with -A)

```bash
aaa
```

<div className="Image__Medium">
	<img src="https://i.imgur.com/N1DPFCn.png" alt="blog_image" />
</div>

### 2 What command does basic analysis on functions?

```bash
af
```

<div className="Image__Medium">
	<img src="https://i.imgur.com/1X3paLq.png" alt="blog_image" />
</div>

### 3 How do you list all functions?

```bash
afl
```

<div className="Image__Medium">
	<img src="https://i.imgur.com/C2yBUrj.png" alt="blog_image" />
</div>

### 4 How many functions are in the example1 binary?

```bash
12
```

<div className="Image__Medium">
	<img src="https://i.imgur.com/ondV9OQ.png" alt="blog_image" />
</div>

### 5 What is the name of the secret function in the example1 binary?

```bash
secret_func
```

<div className="Image__Medium">
	<img src="https://i.imgur.com/OG5LVTx.png" alt="blog_image" />
</div>

**3 - Information**

**i** is a command that shows general information of the binary. Like **a** it has many sub commands each with varying degrees of specificity.

---

### 1 What command shows all the information about the file that you're in?

```bash
iA
```

<div className="Image__Medium">
	<img src="https://i.imgur.com/PqkU1EA.png" alt="blog_image" />
</div>

### 2 How do you get every string that is present in the binary?

```bash
izz
```

<div className="Image__Medium">
	<img src="https://i.imgur.com/yecra9n.png" alt="blog_image" />
</div>

### 3 What if you want the address of the main function?

```bash
iM
```

<div className="Image__Medium">
	<img src="https://i.imgur.com/JDDbDk9.png" alt="blog_image" />
</div>

### 4 What character do you add to the end of every command to get the output in JSON format?

```bash
j
```

<div className="Image__Medium">
	<img src="https://i.imgur.com/BqxEMXb.png" alt="blog_image" />
</div>

### 5 How do you get the entrypoint of the file?

```bash
ie
```

<div className="Image__Medium">
	<img src="https://i.imgur.com/9p5n8A1.png" alt="blog_image" />
</div>

### 6 What is the secret string hidden in the example2 binary?

```bash
# r2 -f example2
# then type izz to list all the strings

goodjob
```

<div className="Image__Medium">
	<img src="https://i.imgur.com/OJiYZbr.png" alt="blog_image" />
</div>

**4 - Navigating Through Memory**

**s** is the command that is used to navigate through the memory of your binary. With it and its variations you can you can get information about where you are in the binary as well as move to different points in the binary.

Note: For user created functions that aren't main, you will have to add sym. before them for example sym.user_func

---

### 1 How do you print out the the current memory address your located at in the binary?

```bash
s
```

<div className="Image__Medium">
	<img src="https://i.imgur.com/WszjdkM.png" alt="blog_image" />
</div>

### 2 What command do you use to go to a specific point in memory with the syntax?

```bash
s
```

<div className="Image__Medium">
	<img src="https://i.imgur.com/JFS2Xsb.png" alt="blog_image" />
</div>

### 3 What command would you run to go 5 bytes forward?

```bash
s+ 5
```

<div className="Image__Medium">
	<img src="https://i.imgur.com/DRhfPIZ.png" alt="blog_image" />
</div>

### 4 What about 12 bytes backward?

```bash
s- 12
```

<div className="Image__Medium">
	<img src="https://i.imgur.com/k6wvBUB.png" alt="blog_image" />
</div>

### 5 How do you undo the previous seek?

```bash
s-
```

<div className="Image__Medium">
	<img src="https://i.imgur.com/MGaBPV9.png" alt="blog_image" />
</div>

### 6 How would go to the memory address of the main function?

```bash
# s = Print current address -> print the main function
s main
```

### 7 What if you wanted to go to the address of the rax register?

```bash
sr rax
```

<div className="Image__Medium">
	<img src="https://i.imgur.com/sCeKNdK.png" alt="blog_image" />
</div>

**5 - Printing**

**p**is a command that shows data in a myriad of formats. The command is useful for when you want to get information about what is happening in memory, and get some of the data that's contained in memory as well. With the p command it is also useful to know about the **@** symbol in radare. The **@** symbol is used to specify that something is an address in memory, for example if you wanted to specify you were talking about the memory address of the main function you would use

---

### 1 How would you print the hex output of where you currently are in memory?

```bash
px
```

<div className="Image__Medium">
	<img src="https://i.imgur.com/PmU80TA.png" alt="blog_image" />
</div>

### 2 How would you print the disassembly of where you're currently at in memory?

```bash
pd
```

<div className="Image__Medium">
	<img src="https://i.imgur.com/O1nwT0V.png" alt="blog_image" />
</div>

### 3 What if you wanted the disassembly of the main function?

```bash
# pd = **disassembly; f = function; main = the name of the function**
pd f main
```

### 4 What command prints out the emoji hexdump? (this is not useful at all I just find it funny)

```bash
# Found it on google (wierd one)
pxe
```

<div className="Image__Medium">
	<img src="https://i.imgur.com/EHNEwqb.png" alt="blog_image" />
</div>

### 5 What if you decided you were too good for rows and you wanted the disassembly in column format?

```bash
pC
```

<div className="Image__Medium">
	<img src="https://i.imgur.com/9kldiMl.png" alt="blog_image" />
</div>

### 6 What is the value of the first variable in the main function for the example 3 binary?

```bash
# scan before the pdf main (aaaa)
1
```

<div className="Image__Medium">
	<img src="https://i.imgur.com/ZlCaWaL.png" alt="blog_image" />
</div>

### 7 What about the second variable?

```bash
5
```

<div className="Image__Medium">
	<img src="https://i.imgur.com/jGlmAZj.png" alt="blog_image" />
</div>

**6 - The Mid-term**

Congrats on getting to this point, you now know enough to pass the mid-term exam. The questions in this task will all be related to commands that were in previous tasks so if you skipped one, I recommend going back and doing it. As you probably guessed from the file name all exercises in this task will be done using the midterm binary file.

---

### 1 How many functions are in the binary?

```bash
13
```

<div className="Image__Medium">
	<img src="https://i.imgur.com/0NMZaHm.png" alt="blog_image" />
</div>

### 2 What is the value of the hidden string?

```bash
# izz command to list all the strings
you_found_me
```

<div className="Image__Medium">
	<img src="https://i.imgur.com/k02vFOL.png" alt="blog_image" />
</div>

### 3 What is the return value of secret_func()?

```bash
4
```

<div className="Image__Medium">
	<img src="https://i.imgur.com/g4br8yR.png" alt="blog_image" />
</div>

### 4 What is the value of the first variable set in the main function(in decimal format)?

```bash
0xc = 12
```

<div className="Image__Medium">
	<img src="https://i.imgur.com/qs730Je.png" alt="blog_image" />
</div>

### 5 What about the second one(also in decimal format)?

```bash
0xc0 = 192
```

<div className="Image__Medium">
	<img src="https://i.imgur.com/H1XWKNe.png" alt="blog_image" />
</div>

### 6 What is the next function in memory after the main function?

```bash
midterm_func
```

<div className="Image__Medium">
	<img src="https://i.imgur.com/f0VbgSl.png" alt="blog_image" />
</div>

### 7 How do you get a hexdump of four bytes of the memory address your currently at?

```bash
# px = print the hex output of where you currently are in memory and 2 for the row
px 2
```

<div className="Image__Medium">
	<img src="https://i.imgur.com/mPMxSuM.png" alt="blog_image" />
</div>

**7 - Debugging**

Recall that in the task "Command Line Options" you learned that the -d flag has radare enter debug mode. Debug mode allows you to set breakpoints and offers a lot of options to not only navigate through your binary, but to analyze the data that goes in and out of the registers as well.

---

### 1 How do you set a breakpoint?

```bash
db
```

<div className="Image__Medium">
	<img src="https://i.imgur.com/9jpVS6i.png" alt="blog_image" />
</div>

### 2 What command is used to print out the values of all the registers?

```bash
dr
```

<div className="Image__Medium">
	<img src="https://i.imgur.com/o2RjJbj.png" alt="blog_image" />
</div>

### 3 How do you run through the program until the program either ends or you hit the next breakpoint?

```bash
dc
```

<div className="Image__Medium">
	<img src="https://i.imgur.com/cE48C8E.png" alt="blog_image" />
</div>

### 4 What if you want to step through the binary one line at a time?

```bash
ds
```

<div className="Image__Medium">
	<img src="https://i.imgur.com/vtiYqnQ.png" alt="blog_image" />
</div>

### 5 How do you go forth 2 lines in the binary?

```bash
ds 2
```

### 6 How do you list out the indexes and memory addresses of all breakpoints?

```bash
dbi
```

<div className="Image__Medium">
	<img src="https://i.imgur.com/gI5iK6r.png" alt="blog_image" />
</div>

**8 - Write Mode**

Occasionally you might end up in a situation where a task is impossible to solve with the current instructions. For example take this code

```c
int val = 4;

if ( val == 5 ) {
	printf("%s","You win!");
}
```

You will never be able to get it to print out You win! because under normal circumstances val will never be set equal to 5. This is where write mode comes in, it allows you to change instructions so you can get certain conditions to execute. All commands involving write mode start with **w**

---

### 1 How do you write a string to the current memory address.

```bash
w
```

<div className="Image__Medium">
	<img src="https://i.imgur.com/9OEz9T5.png" alt="blog_image" />
</div>

### 2 What command lists all write changes?

```bash
wc
```

<div className="Image__Medium">
	<img src="https://i.imgur.com/6OyA6r6.png" alt="blog_image" />
</div>

### 3 What command modifies an instruction at the current memory address?

```bash
wa
```

<div className="Image__Medium">
	<img src="https://i.imgur.com/EmXqgsv.png" alt="blog_image" />
</div>


