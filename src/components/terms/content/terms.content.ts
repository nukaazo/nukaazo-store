export const termsContent = {
  title: 'Terms & Conditions',
  lastUpdated: 'Last Updated: May 5, 2026',
  hero: {
    title: 'Legal Agreement',
    subtitle:
      'Please read these Terms & Conditions carefully before using the Nukaazo platform.',
  },
  intro:
    'Welcome to Nukaazo. These Terms & Conditions govern your use of our website, mobile applications, and services. By accessing or using Nukaazo, you agree to be bound by these Terms and our Privacy Policy.',
  companyNote:
    'Nukaazo registered office is in Maharashtra, India. These Terms constitute a binding legal agreement between you and Nukaazo.',

  sections: [
    {
      id: '1',
      number: '1',
      title: 'Acceptance of Terms',
      body: 'By creating an account, downloading the app, or browsing the website, you represent that you are at least 18 years of age and possess the legal authority to enter into this agreement.\n\nIf you are using the Platform on behalf of a business entity, you represent that you have the authority to bind that entity to these Terms.',
      bullets: [],
    },
    {
      id: '2',
      number: '2',
      title: 'Nukaazo as an Intermediary',
      body: "Nukaazo operates as an 'Intermediary' as defined under Section 2(1)(w) of the Information Technology Act, 2000.\n\nOur Platform facilitates the sale of goods between third-party vendors (partner shops) and consumers. Nukaazo does not own the inventory, nor does it control the pricing or quality of the goods listed by vendors.",
      bullets: [
        {
          label: 'Vendor Responsibility',
          text: 'The contract for sale is strictly between you and the partner shop. Nukaazo is not a party to such contracts.',
        },
        {
          label: 'Product Accuracy',
          text: 'While we strive for accuracy, the descriptions, images, and pricing are provided by vendors. We are not liable for discrepancies in product information.',
        },
      ],
    },
    {
      id: '3',
      number: '3',
      title: 'User Accounts & Security',
      body: 'You are responsible for maintaining the confidentiality of your account credentials. All activities occurring under your account are your sole responsibility.',
      bullets: [
        {
          label: 'Accurate Information',
          text: 'You agree to provide true, accurate, and current information during registration.',
        },
        {
          label: 'Unauthorized Access',
          text: 'You must immediately notify Nukaazo of any unauthorized use of your account or security breach.',
        },
      ],
    },
    {
      id: '4',
      number: '4',
      title: 'Payments, Pricing & Taxes',
      body: 'All prices listed on the Platform are inclusive of applicable taxes (GST) unless stated otherwise. Delivery fees and platform service fees may be applied at checkout.',
      bullets: [
        {
          label: 'Payment Methods',
          text: 'We accept various payment methods including UPI, Credit/Debit Cards, and Net Banking through secured payment gateways.',
        },
        {
          label: 'Order Confirmation',
          text: 'An order is considered confirmed only after the payment is successfully processed and the partner shop accepts the order.',
        },
      ],
    },
    {
      id: '5',
      number: '5',
      title: 'Prohibited Activities',
      body: 'You agree not to use the Platform for any illegal or unauthorized purposes. Prohibited activities include, but are not limited to:',
      bullets: [
        {
          label: 'Legal Compliance',
          text: 'Violating any local, state, or national laws of India.',
        },
        {
          label: 'False Identity',
          text: 'Impersonating any person or entity or providing false, inaccurate, or misleading information.',
        },
        {
          label: 'System Security',
          text: "Interfering with, disrupting, or attempting to gain unauthorized access to the Platform's security systems, servers, or networks.",
        },
        {
          label: 'Inappropriate Content',
          text: 'Posting, transmitting, or sharing content that is defamatory, obscene, offensive, or infringes on intellectual property rights.',
        },
        {
          label: 'Fraudulent Behavior',
          text: "Engaging in fraudulent transactions, exploiting promotional offers, or abusing the platform's features for personal gain.",
        },
      ],
    },
    {
      id: '6',
      number: '6',
      title: 'Intellectual Property Rights',
      body: 'All content on the Platform, including logos, text, graphics, and software, is the property of Nukaazo or its licensors and is protected by Indian copyright and trademark laws.\n\nYou are granted a limited, non-exclusive license to access the Platform for personal, non-commercial use only.',
      bullets: [],
    },
    {
      id: '7',
      number: '7',
      title: 'Limitation of Liability',
      body: 'To the maximum extent permitted by law, Nukaazo shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Platform.',
      bullets: [
        {
          label: 'Third-Party Content',
          text: 'We are not responsible for the acts or omissions of delivery partners, partner shops, or other third-party service providers.',
        },
        {
          label: 'Platform Availability',
          text: "The Platform is provided on an 'as-is' and 'as-available' basis. We do not guarantee uninterrupted access or error-free performance.",
        },
      ],
    },
    {
      id: '8',
      number: '8',
      title: 'Governing Law & Jurisdiction',
      body: 'These Terms shall be governed by and construed in accordance with the laws of India.\n\nAny disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in Pune, Maharashtra.',
      bullets: [],
    },
    {
      id: '9',
      number: '9',
      title: 'Grievance Redressal',
      body: 'In accordance with the Information Technology Act 2000 and the Consumer Protection (E-Commerce) Rules 2020, the contact details of the Grievance Officer are provided below:',
      bullets: [],
      grievanceOfficer: {
        name: 'Yadnyesh Khotre',
        email: 'business.nukaazo@gmail.com',
        address:
          'Gat No 276, Tal. Maval, S.NO 64,65, Indira College Road, Parandwadi, Maharashtra 410506',
      },
    },
  ],

  footerNote:
    'Nukaazo reserves the right to modify these Terms at any time. Continued use of the Platform after such changes constitutes acceptance of the new Terms.',
};

// Dummy default export to satisfy Expo Router / TSC if needed
export default function Ignore() { return null; }
