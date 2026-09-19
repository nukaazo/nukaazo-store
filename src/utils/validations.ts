/**
 * Validates whether the given string is a correctly formatted email address.
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates whether the given string is a correctly formatted phone number.
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-()]{10,15}$/;
  return phoneRegex.test(phone);
};

/**
 * Validates whether the given string is a valid 6-digit OTP.
 */
export const isValidOTP = (otp: string): boolean => {
  const otpRegex = /^\d{6}$/;
  return otpRegex.test(otp);
};

/**
 * Validates whether the given string is a valid UPI ID format.
 */
export const isValidUpiId = (upiId: string): boolean => {
  if (!upiId || typeof upiId !== "string") return false;
  const trimmed = upiId.trim();
  const upiRegex = /^[\w.\-_]{2,256}@[a-zA-Z]{2,64}$/;
  return upiRegex.test(trimmed) || (trimmed.includes("@") && trimmed.length >= 5);
};

/**
 * Validates whether the given file size is within the allowed limit (in MB).
 */
export const isValidImageSize = (fileSizeInBytes: number, maxMb: number = 15): boolean => {
  const maxSizeInBytes = maxMb * 1024 * 1024;
  return fileSizeInBytes <= maxSizeInBytes;
};

/**
 * Validates whether the given file extension / mime is an allowed image type.
 */
export const isValidImageType = (mimeOrUri: string): boolean => {
  if (!mimeOrUri) return false;
  const lower = mimeOrUri.toLowerCase();
  const allowed = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml", "image/webp", ".png", ".jpg", ".jpeg", ".webp", ".svg"];
  return allowed.some((type) => lower.includes(type));
};

