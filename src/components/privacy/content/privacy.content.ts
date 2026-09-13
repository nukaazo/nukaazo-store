export const privacyContent = {
  title: 'Privacy Policy',
  lastUpdated: 'Last Updated: May 5, 2026',
  hero: {
    title: 'Your Data, Protected',
    subtitle:
      'We are committed to protecting your privacy. Read how we collect, use, and safeguard your information.',
  },
  intro:
    'At Nukaazo, we value your trust and are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or mobile application.',
  consentNote:
    'By using the Platform, you consent to the data practices described in this policy. If you do not agree, please do not access the Platform.',

  sections: [
    {
      id: '1',
      number: '1',
      title: 'Information We Collect',
      body: 'We collect information that you provide directly to us, as well as information that is automatically collected when you use our Platform.',
      bullets: [],
      subsections: [
        {
          id: '1.1',
          title: '1.1 Personal Information',
          body: 'Information you provide when creating an account or placing an order:',
          bullets: [
            { label: 'Identity Data', text: 'Name, phone number, and email address.' },
            { label: 'Address Data', text: 'Delivery address and location coordinates for accurate shipping.' },
            { label: 'Payment Data', text: 'Transaction details (processed via secure third-party payment gateways).' },
          ],
        },
        {
          id: '1.2',
          title: '1.2 Automatically Collected Information',
          body: '',
          bullets: [
            { label: 'Device Data', text: 'IP address, browser type, device model, and operating system.' },
            { label: 'Usage Data', text: 'Pages visited, time spent, and interaction with products/stores.' },
            { label: 'Location Data', text: 'Real-time location information to facilitate hyperlocal delivery (with your permission).' },
          ],
        },
      ],
    },
    {
      id: '2',
      number: '2',
      title: 'How We Use Your Information',
      body: 'We use the collected information for various purposes, including:',
      bullets: [
        { label: 'Service Delivery', text: 'To process orders, arrange deliveries, and manage your account.' },
        { label: 'Communication', text: 'To send order updates, security alerts, and support messages.' },
        { label: 'Personalization', text: 'To provide tailored product recommendations and localized store listings.' },
        { label: 'Security', text: 'To detect and prevent fraudulent transactions and unauthorized access.' },
      ],
      subsections: [],
    },
    {
      id: '3',
      number: '3',
      title: 'Sharing of Information',
      body: 'We do not sell your personal data. We only share information in the following circumstances:',
      bullets: [
        { label: 'Partner Shops', text: 'To fulfill your orders (name, address, and items ordered).' },
        { label: 'Delivery Partners', text: 'To ensure successful delivery of your goods.' },
        { label: 'Service Providers', text: 'With third-party vendors who provide payment processing, data analysis, and marketing assistance.' },
        { label: 'Legal Requirements', text: 'If required by law, subpoena, or to protect the rights and safety of Nukaazo and its users.' },
      ],
      subsections: [],
    },
    {
      id: '4',
      number: '4',
      title: 'Data Security',
      body: 'We implement industry-standard security measures, including encryption and secure socket layers (SSL), to protect your data.\n\nHowever, no method of transmission over the internet is 100% secure. While we strive to protect your personal information, we cannot guarantee its absolute security.',
      bullets: [],
      subsections: [],
    },
    {
      id: '5',
      number: '5',
      title: 'Your Privacy Rights',
      body: 'Under Indian law, you have specific rights regarding your personal data:',
      bullets: [
        { label: 'Access & Correction', text: 'You can view and update your profile information at any time within the app.' },
        { label: 'Data Deletion', text: 'You may request the deletion of your account and associated data by contacting support.' },
        { label: 'Consent Withdrawal', text: 'You can withdraw your consent for location tracking or marketing at any time through device settings.' },
      ],
      subsections: [],
    },
    {
      id: '6',
      number: '6',
      title: 'Cookies and Tracking',
      body: 'We use cookies and similar tracking technologies to track the activity on our Platform and hold certain information.\n\nCookies help us remember your preferences and improve your overall experience. You can instruct your browser to refuse all cookies, but some parts of our Platform may not function correctly.',
      bullets: [],
      subsections: [],
    },
    {
      id: '7',
      number: '7',
      title: 'Grievance Redressal',
      body: 'If you have any questions or complaints regarding this Privacy Policy or our data practices, please contact our Grievance Officer:',
      bullets: [],
      subsections: [],
      grievanceOfficer: {
        name: 'Yadnyesh Khotre',
        email: 'business.nukaazo@gmail.com',
        address: 'Gat No 276, Tal. Maval, S.NO 64,65, Indira College Road, Parandwadi, Maharashtra 410506',
      },
    },
  ],

  footerNote:
    'By continuing to use Nukaazo, you acknowledge that you have read and understood this Privacy Policy.',
};

// Dummy default export to satisfy Expo Router / TSC if needed
export default function Ignore() { return null; }
