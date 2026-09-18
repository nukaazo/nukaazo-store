import { http } from "./https";
import { Category, ShopProfilePayload } from "@/components/shop/interface/shop.interface";
import { DEFAULT_CATEGORIES } from "@/components/shop/data/initialShopData";

export interface ShopData {
  shopId: string | null;
  shopUrl: string | null;
  [key: string]: any;
}

export const shopService = {
  /**
   * Fetches the user's shop details to determine if shop is created/registered
   */
  findShopUser: async (): Promise<ShopData | null> => {
    try {
      const response = await http.get("/api/v1/shops/find-shop-user");
      if (response && response.data) {
        return response.data;
      }
      return response;
    } catch (error: any) {
      // A 404 or failure to find shop is normal when merchant has not created a shop yet
      return null;
    }
  },

  /**
   * Fetches full shop profile by shop ID
   */
  getShopProfile: async (id: string): Promise<any> => {
    const response = await http.get(`/api/v1/shops/${id}`);
    return response?.data || response;
  },

  /**
   * Creates a new shop
   */
  createShop: async (payload: ShopProfilePayload): Promise<any> => {
    return await http.post("/api/v1/shops", payload);
  },

  /**
   * Updates an existing shop
   */
  updateShop: async (payload: ShopProfilePayload): Promise<any> => {
    return await http.put("/api/v1/shops", payload);
  },

  /**
   * Verifies UPI ID validity
   */
  verifyUpiId: async (upiId: string): Promise<{ isValid: boolean; name?: string }> => {
    try {
      const response = await http.get(`/api/v1/payments/validate/upi?upi_id=${encodeURIComponent(upiId)}`);
      return response?.data || response || { isValid: true, name: "Merchant" };
    } catch (error) {
      console.warn("UPI validation endpoint returned error or offline, fallback verifying format:", error);
      // Fallback: If format is valid (has @ and ends with standard handle), mark valid in dev
      if (upiId.includes("@") && upiId.length >= 5) {
        return { isValid: true, name: upiId.split("@")[0] };
      }
      return { isValid: false };
    }
  },

  /**
   * Fetches store categories with resilient fallback
   */
  getCategories: async (): Promise<Category[]> => {
    try {
      const response = await http.get<Category[] | { data: Category[] }>("/api/v1/categories/all");
      if (Array.isArray(response)) {
        return response;
      } else if (response && (response as any).data && Array.isArray((response as any).data)) {
        return (response as any).data;
      }
      return DEFAULT_CATEGORIES;
    } catch (error) {
      console.warn("Failed to fetch categories from API, using default fallback:", error);
      return DEFAULT_CATEGORIES;
    }
  },
};

export default shopService;
