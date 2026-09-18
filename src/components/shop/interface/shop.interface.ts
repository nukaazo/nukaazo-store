export interface BusinessHour {
  day: string;
  openTime: string;
  closeTime: string;
  open: boolean;
}

export interface Feature {
  icon: string;
  title: string;
  subtitle: string;
}

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface Category {
  id: string;
  categoryName: string;
  imageUrl?: string;
  description?: string;
}

export interface BankAccountDetails {
  upiId: string;
}

export interface ShopAddress {
  line1: string;
  line2: string;
  mapsUrl?: string;
}

export interface ShopContact {
  phone: string;
  email: string;
  alternatePhone?: string;
}

export interface ShopDetail {
  about: string;
  hours: BusinessHour[];
  address: ShopAddress;
  contact?: ShopContact;
  gallery: string[];
  features: Feature[];
  bankAccountDetails: BankAccountDetails;
}

export interface ShopExtendedAttributes {
  verified: boolean;
  logoImage: string;
  bannerImage: string;
  established: string;
  openUntil: string;
  detail: ShopDetail;
  sortOptions?: { id: string; label: string }[];
  tagOptions?: { id: string; label: string }[];
}

export interface ShopData {
  id?: string;
  userId?: string;
  shopName: string;
  isOpen: boolean;
  isActive: boolean;
  h3CellId?: number;
  coordinates: Coordinates;
  extendedAttributes: ShopExtendedAttributes;
  categories: { id: string; name: string }[];
}

export interface ShopProfilePayload {
  id?: string;
  userId?: string;
  shopName: string;
  isOpen: boolean;
  isActive: boolean;
  coordinates: Coordinates;
  categories: { id: string }[];
  extendedAttributes: {
    bannerImage: string;
    logoImage: string;
    established: string;
    openUntil: string;
    detail: {
      about: string;
      address: {
        line1: string;
        line2: string;
        mapsUrl?: string;
      };
      hours: BusinessHour[];
      features: Feature[];
      gallery: string[];
      bankAccountDetails: {
        upiId: string;
      };
    };
    sortOptions?: { id: string; label: string }[];
    tagOptions?: { id: string; label: string }[];
    verified?: boolean;
  };
}
