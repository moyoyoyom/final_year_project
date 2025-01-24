import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const Icons = {};

const ReturnIcon = ({ color, size }) => (
  <Ionicons name="chevron-back" size={size} color={color} />
);
const MenuOptionsIcon = ({ color, size }) => (
  <Ionicons name="options-outline" size={size} color={color} />
);
const CameraIcon = ({ color, size }) => (
  <Ionicons name="camera-outline" size={size} color={color} />
);

const SortAscending = ({ color, size }) => (
  <MaterialCommunityIcons name="sort-ascending" size={size} color={color} />
);

//Compose
Icons.ReturnIcon = ReturnIcon;
Icons.MenuOptionsIcon = MenuOptionsIcon;
Icons.CameraIcon = CameraIcon;
Icons.SortAscending = SortAscending;

export default Icons;
