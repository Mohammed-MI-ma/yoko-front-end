import { MdOutlineContactSupport, MdOutlineFindReplace } from "react-icons/md";
import { IoShareSocial } from "react-icons/io5";

// Define the menu structure
const menuItems = [
  {
    icon: <MdOutlineContactSupport></MdOutlineContactSupport>,
    title: "contact us",
    submenus: ["contact us"],
  },

  {
    icon: <MdOutlineFindReplace></MdOutlineFindReplace>,

    title: "Discover our yoko",
    submenus: [
      "YOKO Eat",
      "YOKO Market",
      "Dilevery Boy",
      "Program Guidance",
      "Traditional Food",
    ],
  },

  {
    icon: <IoShareSocial></IoShareSocial>,
    title: "follow us",
    submenus: ["How2CreateAccount", "Simulation"],
  },
];

// Function to reverse submenus for Arabic language
export function reverseSubmenusForArabic(menuItems, isArabicLanguage) {
  if (isArabicLanguage) {
    return menuItems
      .map((item) => ({
        ...item,
        submenus: item.submenus.reverse(),
      }))
      .reverse();
  }
  return menuItems;
}

export default menuItems;
