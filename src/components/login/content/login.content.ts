export interface LoginContent {
  welcomeTitleStart: string;
  welcomeTitleHighlight: string;
  detailsTitleStart: string;
  detailsTitleHighlight: string;
  detailsSubtitle: string;

  // Phone login content
  phoneLabel: string;
  phonePlaceholder: string;
  phoneInvalidError: string;
  phoneSubtitle: string;
  signInButtonText: string;
  sendingOtpButtonText: string;

  // Email login content (commented out in current flow)
  emailLabel: string;
  emailPlaceholder: string;
  continueButtonText: string;
  dividerText: string;
  googleButtonText: string;

  termsMessage: string;
  termsHighlights: string[];

  otpTitle: string;
  otpSubtitlePrefix: string;

  fullNameLabel: string;
  fullNamePlaceholder: string;
  sendOtpButtonText: string;
}

export const loginContent: LoginContent = {
  welcomeTitleStart: "Welcome to",
  welcomeTitleHighlight: "Nukaazo",
  detailsTitleStart: "Almost",
  detailsTitleHighlight: "There!",
  detailsSubtitle: "Please fill in the missing information to continue.",

  // Phone login content
  phoneLabel: "Phone Number",
  phonePlaceholder: "Enter 10-digit mobile number",
  phoneInvalidError: "Please enter a valid phone number.",
  phoneSubtitle: "Enter your phone number to access your account.",
  signInButtonText: "Sign In",
  sendingOtpButtonText: "Sending OTP...",

  // Email login content (commented out in current flow)
  emailLabel: "Email Address",
  emailPlaceholder: "name@example.com",
  continueButtonText: "Continue",
  dividerText: "or",
  googleButtonText: "Continue with Google",

  termsMessage: "By continuing, you agree to Nukaazo's Terms of Service and Privacy Policy.",
  termsHighlights: ["Terms of Service", "Privacy Policy"],

  otpTitle: "Enter Verification Code",
  otpSubtitlePrefix: "We've sent a 6-digit code to",

  fullNameLabel: "Full Name",
  fullNamePlaceholder: "Enter your full name",
  sendOtpButtonText: "Send OTP",
};

export default loginContent;
