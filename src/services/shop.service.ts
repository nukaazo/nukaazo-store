import { http } from "./https";

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
    } catch (error) {
      console.error("Failed to find shop user:", error);
      throw error;
    }
  },
};

export default shopService;
