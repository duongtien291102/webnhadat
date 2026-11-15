export interface Material {
  id: string;
  name: string;
  vietnameseName: string;
  image: string;
  description: string;
  details: string;
  highlights: string[];
}

export interface Project {
  id: string;
  index: string;
  title: string;
  tagline: string;
  description: string;
  bullets: string[];
  highlightsHeader: string;
  highlights: string[];
  mainImage: string;
  cardImage?: string;
  gallery: string[];
  area: string;
  location: string;
  style: string;
  featuredOnHome?: boolean;
  sortOrder?: number;
}

export interface Step {
  number: string;
  title: string;
  description: string;
}

export interface PhilosophyCard {
  title: string;
  iconName: string;
  description: string;
  image: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  tagline: string;
  image: string;
  meta: string;
  href: string;
}

export interface FounderMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface SiteSettingsData {
  heroSlides: HeroSlide[];
  introduction: {
    beforeImage: string;
    beforeLabel: string;
    afterImage: string;
    afterLabel: string;
    philosophyCards: PhilosophyCard[];
  };
  materials: Material[];
  about: {
    storyImage: string;
    founders: FounderMember[];
    teamGroupTitle: string;
    teamGroupDescription: string;
    teamGroupImage: string;
  };
}

export const styleLabels: Record<string, string> = {
  'HIEN_DAI': 'Hiện đại',
  'JAPANDI': 'Japandi',
  'WABISABI': 'Wabi-sabi',
  'THUONG_MAI': 'Thương mại'
};
