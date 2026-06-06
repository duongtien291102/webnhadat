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
  gallery: string[];
  area: string;
  location: string;
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
