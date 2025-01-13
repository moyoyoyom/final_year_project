import { Ionicons } from "@expo/vector-icons";

const Icons = {};

const ReturnIcon = () => <Ionicons name="chevron-back" size={16} />;
const MenuOptionsIcon = () => <Ionicons name="options-outline" size={16} />;

//Compose
Icons.ReturnIcon = ReturnIcon;
Icons.MenuOptionsIcon = MenuOptionsIcon;

export default Icons;
