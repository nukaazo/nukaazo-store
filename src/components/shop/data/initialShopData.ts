import { Category, ShopData } from "../interface/shop.interface";

export const DEFAULT_CATEGORIES: Category[] = [
  {
    id: "DAIRY_BREAD_EGGS",
    categoryName: "Dairy, Bread & Eggs",
    description: "25+ Stores",
  },
  {
    id: "COLD_DRINKS_JUICES",
    categoryName: "Cold Drinks & Juices",
    description: "20+ Stores",
  },
  {
    id: "FRESH_FRUITS_VEGETABLES",
    categoryName: "Fresh Fruits & Vegetables",
    description: "30+ Stores",
  },
  {
    id: "DAILY_KITCHEN_NEEDS",
    categoryName: "Daily Kitchen Needs",
    description: "40+ Stores",
  },
  {
    id: "BEAUTY_COSMETICS",
    categoryName: "Beauty & Cosmetics",
    description: "15+ Stores",
  },
  {
    id: "HOME_OFFICE_ESSENTIALS",
    categoryName: "Home & Office Essentials",
    description: "18+ Stores",
  },
  {
    id: "COOKED_FOOD_MEALS",
    categoryName: "Cooked Food & Meals",
    description: "50+ Stores",
  },
];

export const CITY_COORDINATES_PRESETS = [
  { name: "Delhi NCR", lat: 28.6139, lon: 77.2090 },
  { name: "Gurugram", lat: 28.4595, lon: 77.0266 },
  { name: "Noida", lat: 28.5355, lon: 77.3910 },
  { name: "Bengaluru", lat: 12.9716, lon: 77.5946 },
  { name: "Mumbai", lat: 19.0760, lon: 72.8777 },
  { name: "Hyderabad", lat: 17.3850, lon: 78.4867 },
  { name: "Pune", lat: 18.5204, lon: 73.8567 },
  { name: "Kolkata", lat: 22.5726, lon: 88.3639 },
];

export const INITIAL_SHOP_DATA: ShopData = {
  shopName: "",
  isOpen: true,
  isActive: true,
  coordinates: {
    lat: 28.4595,
    lon: 77.0266,
  },
  extendedAttributes: {
    verified: false,
    bannerImage: "",
    logoImage: "",
    established: `${new Date().getFullYear()}`,
    openUntil: "21:00",
    detail: {
      about: "",
      address: {
        line1: "",
        line2: "",
        mapsUrl: "",
      },
      contact: {
        phone: "",
        email: "",
        alternatePhone: "",
      },
      hours: [
        { day: "Monday", openTime: "09:00", closeTime: "21:00", open: true },
        { day: "Tuesday", openTime: "09:00", closeTime: "21:00", open: true },
        { day: "Wednesday", openTime: "09:00", closeTime: "21:00", open: true },
        { day: "Thursday", openTime: "09:00", closeTime: "21:00", open: true },
        { day: "Friday", openTime: "09:00", closeTime: "21:00", open: true },
        { day: "Saturday", openTime: "09:00", closeTime: "21:00", open: true },
        { day: "Sunday", openTime: "09:00", closeTime: "21:00", open: true },
      ],
      features: [
        { icon: "bicycle-outline", title: "Fast Local Delivery", subtitle: "Within 30-45 minutes" },
        { icon: "card-outline", title: "Accepts UPI & Cash", subtitle: "Instant zero fee payments" },
      ],
      gallery: [],
      bankAccountDetails: {
        upiId: "",
      },
    },
  },
  categories: [],
};
