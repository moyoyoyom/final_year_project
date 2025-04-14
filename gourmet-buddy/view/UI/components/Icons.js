import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const Icons = {};

const ReturnIcon = ({ color, size, onPress }) => (
  <Ionicons name="chevron-back" size={size} color={color} onPress={onPress} />
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

const SortDescending = ({ color, size }) => (
  <MaterialCommunityIcons name="sort-descending" size={size} color={color} />
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

const LikeIcon = ({ color, size, onPress }) => (
  <Ionicons name="heart-outline" size={size} color={color} onPress={onPress} />
);

const BuyIcon = ({ color, size, onPress }) => (
  <Ionicons name="cart-outline" size={size} color={color} onPress={onPress} />
);

const FilledHeartIcon = ({ color, size, onPress }) => (
  <Ionicons name="heart-sharp" size={size} color={color} onPress={onPress} />
);

const SaveIcon = ({ color, size, onPress }) => (
  <Ionicons
    name="bookmark-outline"
    size={size}
    color={color}
    onPress={onPress}
  />
);

const SettingsIcon = ({ color, size }) => (
  <Ionicons name="cog" size={size} color={color} />
);

const FilledSaveIcon = ({ color, size, onPress }) => (
  <Ionicons name="bookmark" size={size} color={color} onPress={onPress} />
);

const FoodIcon = ({ color, size }) => (
  <Ionicons name="fast-food-outline" size={size} color={color} />
);

//Compose
Icons.ReturnIcon = ReturnIcon;
Icons.ForwardIcon = ForwardIcon;
Icons.MenuOptionsIcon = MenuOptionsIcon;
Icons.CameraIcon = CameraIcon;
Icons.SortAscending = SortAscending;
Icons.SortDescending = SortDescending;
Icons.DefaultImage = DefaultImage;
Icons.ExploreIcon = ExploreIcon;
Icons.SearchIcon = SearchIcon;
Icons.ProfileIcon = ProfileIcon;
Icons.AddIcon = AddIcon;
Icons.LikeIcon = LikeIcon;
Icons.BuyIcon = BuyIcon;
Icons.SaveIcon = SaveIcon;
Icons.FilledHeartIcon = FilledHeartIcon;
Icons.FilledSaveIcon = FilledSaveIcon;
Icons.SettingsIcon = SettingsIcon;
Icons.FoodIcon = FoodIcon;

export default Icons;
