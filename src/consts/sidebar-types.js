import { IoIosExit } from "react-icons/io";
import { FaUserLarge } from "react-icons/fa6";
import { RiMessage2Fill } from "react-icons/ri";

import { v4 as uuidv4 } from "uuid";

const sidebarTypes = [
    {
        id: uuidv4(),
        type: "accounts",
        icon: <FaUserLarge size={16} />
    },
    {
        id: uuidv4(),
        type: "rooms",
        icon: <RiMessage2Fill size={18} />
    },
    {
        id: uuidv4(),
        type: "sign-out",
        icon: <IoIosExit size={18} />
    }
];

export default sidebarTypes;