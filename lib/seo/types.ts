export interface WebAppSchemaProps {
  name: string;
  url: string;
  description: string;
  applicationCategory?: string;
}

export interface HowToStepProps {
  name: string;
  text: string;
}

export interface HowToSchemaProps {
  name: string;
  description: string;
  steps: HowToStepProps[];
}

export interface FAQItemProps {
  question: string;
  answer: string;
}

export function generateWebAppSchema({
  name,
  url,
  description,
  applicationCategory = 'MultimediaApplication',
}: WebAppSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    url,
    description,
    applicationCategory,
    operatingSystem: 'All',
    browserRequirements: 'Requires HTML5 Canvas support',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };
}

export function generateHowToSchema({ name, description, steps }: HowToSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((step, idx) => ({
      '@type': 'HowToStep',
      position: idx + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

export function generateFAQSchema(faqs: FAQItemProps[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
