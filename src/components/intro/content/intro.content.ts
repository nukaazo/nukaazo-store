export interface IntroFeature {
  icon: string;
  label: string;
}

export interface IntroContent {
  titleParts: {
    text: string;
    highlight: boolean;
  }[];
  subtitle: string;
  description: string;
  features: IntroFeature[];
  buttonText: string;
  footerText: string;
}

export const introContent: IntroContent = {
  titleParts: [
    { text: "Manage Your Store,\n", highlight: false },
    { text: "Grow Your Business!", highlight: true },
  ],
  subtitle: "Nukaazo Store Partner",
  description:
    "Accept orders, manage your catalog & inventory, and reach local customers effortlessly with real-time order tracking.",
  features: [
    { icon: "flash", label: "Instant orders" },
    { icon: "shield-checkmark", label: "Safe & verified" },
    { icon: "trending-up", label: "Boost sales" },
  ],
  buttonText: "Get Started",
  footerText: "Welcome to Nukaazo Store Partner",
};

export default introContent;
