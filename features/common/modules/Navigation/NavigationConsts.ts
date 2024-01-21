import { FaHome, FaUsers } from "react-icons/fa";
import { GiFactory } from "react-icons/gi";
import { HiNewspaper, HiPhoneArrowUpRight } from "react-icons/hi2";
import { IconType } from "react-icons/lib";
import { TbLogin } from "react-icons/tb";

export type navigationLink = {
  title: string;
  link: string;
  icon: IconType;
};

export const navigationLinks: Array<navigationLink> = [
  { title: "Properties", link: "/properties", icon: FaHome },
  { title: "Contact", link: "/contact", icon: HiNewspaper },
  { title: "Facilities", link: "/facilities", icon: GiFactory },
  {
    title: "(+62) 815-3249-5059",
    link: "tel: (+62) 815 3249 5059",
    icon: HiPhoneArrowUpRight,
  },
  { title: "Login", link: "/login", icon: TbLogin },
];
