import { http } from "./https";

export interface GenerateOtpResponse {
  verificationId: string;
  message: string;
}

export interface ProfileUpdateResponse {
  success: boolean;
  message: string;
  user?: any;
}

export const profileService = {
  /**
   * Fetches the user's profile
   */
  getProfile: async (): Promise<any> => {
    return http.get("/api/v1/auth/profile");
  },

  /**
   * Generates an OTP for a unique field (PHONE or EMAIL)
   */
  generateOtp: async (type: "PHONE" | "EMAIL", value: string): Promise<GenerateOtpResponse> => {
    return http.post<GenerateOtpResponse>("/api/v1/auth/update/generate-otp", { type, value });
  },

  /**
   * Verifies the OTP and updates the unique profile field
   */
  verifyUniqueProfile: async (verificationId: string, otp: string): Promise<ProfileUpdateResponse> => {
    return http.put<ProfileUpdateResponse>("/api/v1/auth/update/unique/profile", { verificationId, otp });
  },

  /**
   * Updates non-unique profile fields (e.g., name)
   */
  updateNonUniqueProfile: async (data: { name: string }): Promise<ProfileUpdateResponse> => {
    return http.put<ProfileUpdateResponse>("/api/v1/auth/update/nonunique/profile", data);
  },
};

export default profileService;
