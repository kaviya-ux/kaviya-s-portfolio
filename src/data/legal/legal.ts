export const legalPaths = {
  legal: '/legal',
  privacy: '/privacy',
} as const

export type LegalPage = keyof typeof legalPaths

export const publisher = {
  name: 'Kaviya S',
  location: 'Chennai, Tamil Nadu, India',
  email: 'kaviyas.tech@gmail.com',
} as const

type LegalText = {
  legalTitle: string
  privacyTitle: string
  updated: string
  publisher: string
  status: string
  locationLabel: string
  sources: string
  sections: { title: string; paragraphs: string[] }[]
}

export const legalCopy: LegalText = {
  legalTitle: 'Legal notice',
  privacyTitle: 'Privacy and cookies',
  updated: 'Last updated: 21 November 2026.',
  publisher:
    'This website is published and owned by Kaviya S, who is also responsible for its content and for any personal data collected through it.',
  status:
    'It is a personal portfolio for presenting my work and receiving enquiries from recruiters and collaborators. No orders or payments are processed here.',
  locationLabel: 'Based in',
  sources: 'Provider privacy policies',
  sections: [
    {
      title: 'What this website collects',
      paragraphs: [
        'The website does not use advertising or audience-tracking tools. The only information it stores in your browser is your light or dark theme preference, kept in local storage until you clear it in your browser settings.',
        'The company that hosts the website may process technical information such as your IP address and browser type in its server logs, in order to deliver and secure the site.',
      ],
    },
    {
      title: 'Contact by email or phone',
      paragraphs: [
        'If you email, call or message me on WhatsApp, I use your details only to read and reply to your message. I do not add them to a mailing list or use them for unsolicited marketing.',
      ],
    },
    {
      title: 'Contact form (when enabled)',
      paragraphs: [
        'When the contact form is enabled, it collects your name (optional), your email address and your message. Please do not include sensitive data or confidential documents.',
        'The form sends your message through Web3Forms, which forwards it to my Gmail mailbox and may receive technical data such as your IP address. Web3Forms and Gmail apply their own retention rules; their policies are linked below. I keep enquiries only as long as I need them to reply and follow up.',
        'The form uses the hCaptcha anti-spam check. It loads only after you allow it on the page. It may analyse your IP address, browser and device characteristics, and your interactions, and it may set cookies. Allowing it is optional: you can decline and email me directly instead. Withdrawing your permission reloads the page and clears your draft; it does not delete cookies already set, which you can remove in your browser settings.',
      ],
    },
    {
      title: 'Links to other websites',
      paragraphs: [
        'Links to GitHub, LinkedIn, the live demos of my projects and other sites are plain links. Opening them takes you to those websites, which have their own privacy policies.',
      ],
    },
    {
      title: 'Your requests',
      paragraphs: [
        'To ask me to access, correct or delete the personal data I hold about you, email kaviyas.tech@gmail.com. I will reply as soon as I can.',
      ],
    },
  ],
}

export const privacySources = [
  { label: 'Web3Forms', href: 'https://web3forms.com/privacy' },
  { label: 'hCaptcha', href: 'https://www.hcaptcha.com/privacy' },
  { label: 'Google (Gmail)', href: 'https://policies.google.com/privacy' },
]
