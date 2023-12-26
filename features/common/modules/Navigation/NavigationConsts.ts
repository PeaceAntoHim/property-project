import { HiCube, HiNewspaper, HiPhoneArrowUpRight } from "react-icons/hi2";
import { IconType } from "react-icons/lib";
import { TbLogin } from "react-icons/tb";

export type navigationLink = {
  title: string;
  link: string;
  icon: IconType;
};

export const navigationLinks: Array<navigationLink> = [
  { title: "Properties", link: "/properties", icon: HiCube },
  { title: "Contact", link: "/contact", icon: HiNewspaper },
  {
    title: "(+62) 815-3249-5059",
    link: "tel: (+62) 815 3249 5059",
    icon: HiPhoneArrowUpRight,
  },
  { title: "Login", link: "/login", icon: TbLogin },
];
