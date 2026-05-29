export interface Project {
  id: string;
  title: string;
  slug: string;
  region: string;
  year: string;
  image: string;
  description: string;
  fullStory: string;
  materials: string[];
  size: string;
}

export interface Inquiry {
  id: string;
  clientName: string;
  email: string;
  projectType: string;
  message: string;
  estimatedPrice?: number;
  estimatedTimeline?: string;
  status: 'Chờ xử lý' | 'Đã liên hệ';
  createdAt: string;
}

export interface Service {
  id: string;
  index: string;
  title: string;
  description: string;
  fullDetail: string;
}
