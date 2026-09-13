import { http } from "./https";

export interface OtpResponse {
  verification_id: string;
}

export interface SignInResponse {
  token: string;
  user?: any;
}

export const authService = {
  /**
   * Generates an OTP for authentication.
   * @param type The channel of OTP: "EMAIL" or "PHONE"
   * @param value The value of email address or phone number
   * @returns Verification ID of generated OTP
   */
  loginViaOtp: async (type: "EMAIL" | "PHONE", value: string): Promise<OtpResponse> => {
    return await http.post<OtpResponse>("/api/v1/auth/generate-otp", { type, value });
  },

  /**
   * Exchanges Google ID Token with backend to authenticate user.
   * @param googleToken The ID token (JWT) returned from Google Sign-In SDK
   * @returns Auth token and user profile data
   */
  loginViaGoogle: async (googleToken: string): Promise<SignInResponse> => {
    return await http.get<SignInResponse>("/api/v1/auth/exchange/google", { token: googleToken });
  },

  /**
   * Verifies the OTP code and completes the sign in process.
   * @param otp The 6-digit OTP code input by user
   * @param verificationId The verification ID received during generate OTP phase
   * @returns Auth token and user profile data
   */
  verifyViaOtp: async (otp: string, verificationId: string): Promise<SignInResponse> => {
    return await http.post<SignInResponse>("/api/v1/auth/signin", { otp, verificationId });
  }
};

export default authService;
