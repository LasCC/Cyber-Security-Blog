---
title: "Geolocating Images - TryHackMe"
author: Ludovic COULON
date: 2020-05-24
hero: ./images/hero.jpeg
excerpt: "Writeup for the Geolocating Images on TryHackMe"
---

[TryHackMe | Geolocating Images](https://tryhackme.com/room/geolocatingimages)

Where is image 1?

(Use Google Reverse Search and revel in all the airplanes it shows you, which by the way, isn't the right answer).

Try Yandex Reverse Image search. Look at the differences!

### #1 Where in the world is image 1? The answer is the country name.

<div className="Image__Medium">
  <img src="https://imgur.com/9QUIrGj.png" alt="blog_image" />
</div>

<div className="Image__Medium">
  <img src="https://imgur.com/1fkczwe.png" alt="blog_image" />
</div>

```bash
China
```

---

Where was image 2 taken? Specifically, I'm looking for the name of the place that has likely set up the webcam. You'll know it when you see it!

### #2 Where was image 2 taken?

<div className="Image__Medium">
  <img src="https://imgur.com/56Zh3s3.png" alt="blog_image" />
</div>

```bash
Wrigleyville Sports
```

---

Please do not try to use reverse image searches for this one! Pay close attention to what is in the image.

I want you to answer with the name of the place the webcam is facing.

Note: the name of this location on Google Maps is not the right answer. If you take that location name and paste it back into search, you'll find out there's about a million of them. To make this harder, I'm looking for the name that specifically identifies this location. When you enter this name, it'll be the only one that turns up on Google Maps.

### #3 Where was image 3 taken?

[Webcamtaxi Search Engine of Live World Webcams](https://www.webcamtaxi.com/en/search.html?searchword=paris&searchphrase=all)

<div className="Image__Medium">
  <img src="https://imgur.com/Vful2V0.png" alt="blog_image" />
</div>

<div className="Image__Medium">
  <img src="https://imgur.com/eiWDGhl.png" alt="blog_image" />
</div>

```bash
Meudon Observatory
```

---

Look at image 4. What do you see? What can you observe?

### #4 Where is image 4 taken?

This is a easy one the is a popular cross way in London

[Abbey Road](https://www.visitlondon.com/things-to-do/place/35809687-abbey-road)

```bash
Abbey Road
```
