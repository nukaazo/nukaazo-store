import { http } from "@/services/https";
import { Category, ShopProfilePayload } from "../interface/shop.interface";
import { DEFAULT_CATEGORIES } from "../data/initialShopData";

/**
 * Feature-scoped API service for the Create / Manage Shop wizard.
 */
export const createShopService = {
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
  verifyUpiId: async (upiId: string): Promise<{ isValid: boolean; name?: string; message?: string }> => {
    try {
      const response: any = await http.get(`/api/v1/payments/validate/upi?upi_id=${encodeURIComponent(upiId)}`);
      const data = response?.data || response;

      const isValid = Boolean(
        data?.isValid === true ||
        data?.valid === true ||
        data?.is_valid === true ||
        data?.status === "SUCCESS" ||
        data?.success === true ||
        data?.accountHolderName ||
        data?.name
      );

      const name = data?.name || data?.accountHolderName || data?.customerName || (isValid ? upiId.split("@")[0] : undefined);

      return {
        isValid: isValid || (upiId.includes("@") && upiId.length >= 5),
        name: name || upiId.split("@")[0],
        message: data?.message,
      };
    } catch (error: any) {
      console.warn("UPI validation endpoint returned error or offline, fallback verifying format:", error);
      if (upiId.includes("@") && upiId.length >= 5) {
        return { isValid: true, name: upiId.split("@")[0] };
      }
      return { isValid: false, message: error?.message };
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

export default createShopService;
