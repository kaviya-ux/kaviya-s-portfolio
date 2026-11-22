export type LinkItem = {
  label: string
  href: string
  kind: 'social' | 'email'
}

export const links: LinkItem[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/kaviya-ux',
    kind: 'social',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/kaviya-ux/',
    kind: 'social',
  },
  {
    label: 'Email',
    href: 'mailto:kaviyas.tech@gmail.com',
    kind: 'email',
  },
]

// Opens in Google Drive's viewer, where visitors can also download the PDF.
export const resume = {
  href: 'https://drive.google.com/file/d/1Rnkq4fLyU9r3YIBp5msgW6d9qCXM20ho/view',
} as const

export const contactDetails = {
  phoneLabel: '+91 63800 53398',
  phoneHref: 'tel:+916380053398',
  location: 'Chennai, Tamil Nadu, India (Open to Relocation & Remote)',
} as const
