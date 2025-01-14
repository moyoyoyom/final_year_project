import { Ionicons } from "@expo/vector-icons";

const Icons = {};

const ReturnIcon = () => <Ionicons name="chevron-back" size={30} />;
const MenuOptionsIcon = () => <Ionicons name="options-outline" size={30} />;
const CameraIcon = () => <Ionicons name="camera-outline" size={30} />;

//Compose
Icons.ReturnIcon = ReturnIcon;
Icons.MenuOptionsIcon = MenuOptionsIcon;
Icons.CameraIcon = CameraIcon;

export default Icons;
