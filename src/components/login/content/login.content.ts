export interface LoginContent {
  welcomeTitleStart: string;
  welcomeTitleHighlight: string;
  detailsTitleStart: string;
  detailsTitleHighlight: string;
  detailsSubtitle: string;

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
  phoneLabel: string;
  phonePlaceholder: string;
  sendOtpButtonText: string;
}

export const loginContent: LoginContent = {
  welcomeTitleStart: "Welcome to",
  welcomeTitleHighlight: "Nukaazo",
  detailsTitleStart: "Almost",
  detailsTitleHighlight: "There!",
  detailsSubtitle: "Please fill in the missing information to continue.",

  emailLabel: "Email Address",
  emailPlaceholder: "name@example.com",
  continueButtonText: "Continue",
  dividerText: "or",
  googleButtonText: "Continue with Google",
  termsMessage: "By continuing, you agree to Nukaazo's Terms of Service and Privacy Policy.",
  termsHighlights: ["Terms of Service", "Privacy Policy"],

  otpTitle: "Enter 6-digit Verification Code",
  otpSubtitlePrefix: "Code sent to",

  fullNameLabel: "Full Name",
  fullNamePlaceholder: "Enter your full name",
  phoneLabel: "Phone Number",
  phonePlaceholder: "+1 000 000 0000",
  sendOtpButtonText: "Send OTP",
};

export default loginContent;
