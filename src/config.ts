import type { Socials } from "./types";

export const SITE_URL = "https://ludovic-coulon.com";
export const SITE_TITLE = "Ludovic COULON - Cybersecurity blog";
export const SITE_DESCRIPTION =
  "Ludovic COULON - Cybersecurity blog | Blog that brings together various articles on IT security and writeup about challenges I have achieved.";
export const SITE_LOGO = "/logo.svg";

export const SOCIALS: Socials = [
  {
    name: "Github",
    href: "https://github.com/LasCC",
    linkTitle: ` ${SITE_TITLE} on Github`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/ludovic-coulon/",
    linkTitle: `${SITE_TITLE} on LinkedIn`,
    active: true,
  },
];
