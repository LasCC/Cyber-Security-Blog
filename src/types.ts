import type socialIcons from "./socialicons";

export type Socials = {
  name: keyof typeof socialIcons;
  href: string;
  active: boolean;
  linkTitle: string;
}[];
