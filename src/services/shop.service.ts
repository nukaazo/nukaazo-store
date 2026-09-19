import { http } from "./https";

export interface ShopData {
  shopId: string | null;
  shopUrl: string | null;
  [key: string]: any;
}

/**
 * Global shop service for app-wide shop session, authentication, and context lookup.
 */
export const shopService = {
  /**
   * Fetches the user's shop details to determine if a shop is already registered
   */
  findShopUser: async (): Promise<ShopData | null> => {
    try {
      const response = await http.get("/api/v1/shops/find-shop-user");
      if (response && response.data) {
        return response.data;
      }
      return response;
    } catch (error: any) {
      // 404 or failure to find shop is normal when merchant has not created a shop yet
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
};

export default shopService;
