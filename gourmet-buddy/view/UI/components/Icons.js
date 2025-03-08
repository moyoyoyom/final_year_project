import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const Icons = {};

const ReturnIcon = ({ color, size }) => (
  <Ionicons name="chevron-back" size={size} color={color} />
);

const ForwardIcon = ({ color, size }) => (
  <Ionicons name="chevron-forward" size={size} color={color} />
);

const MenuOptionsIcon = ({ color, size }) => (
  <Ionicons name="options-outline" size={size} color={color} />
);

const CameraIcon = ({ color, size }) => (
  <Ionicons name="camera-outline" size={size} color={color} />
);

const DefaultImage = ({ color, size }) => (
  <Ionicons name="image-outline" size={size} color={color} />
);

const SortAscending = ({ color, size }) => (
  <MaterialCommunityIcons name="sort-ascending" size={size} color={color} />
);

const ExploreIcon = ({ color, size }) => (
  <Ionicons name="compass-outline" size={size} color={color} />
);

const SearchIcon = ({ color, size }) => (
  <Ionicons name="search" size={size} color={color} />
);

const ProfileIcon = ({ color, size }) => (
  <Ionicons name="person-circle-outline" size={size} color={color} />
);

const AddIcon = ({ color, size }) => (
  <Ionicons name="add" size={size} color={color} />
);

const LikeIcon = ({ color, size }) => (
  <Ionicons name="heart-outline" size={size} color={color} />
);

const BuyIcon = ({ color, size }) => (
  <Ionicons name="cart-outline" size={size} color={color} />
);

const SaveIcon = ({ color, size }) => (
  <Ionicons name="bookmark-outline" size={size} color={color} />
);

//Compose
Icons.ReturnIcon = ReturnIcon;
Icons.ForwardIcon = ForwardIcon;
Icons.MenuOptionsIcon = MenuOptionsIcon;
Icons.CameraIcon = CameraIcon;
Icons.SortAscending = SortAscending;
Icons.DefaultImage = DefaultImage;
Icons.ExploreIcon = ExploreIcon;
Icons.SearchIcon = SearchIcon;
Icons.ProfileIcon = ProfileIcon;
Icons.AddIcon = AddIcon;
Icons.LikeIcon = LikeIcon;
Icons.BuyIcon = BuyIcon;
Icons.SaveIcon = SaveIcon;

export default Icons;
