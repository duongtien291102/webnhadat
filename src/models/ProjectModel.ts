import mongoose, { Document, Schema } from 'mongoose';

export interface IProjectDocument extends Document {
  id: string;
  sortOrder: number;
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
  featuredOnHome: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProjectDocument>({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true,
  },
  sortOrder: {
    type: Number,
    default: 0,
    index: true,
  },
  index: {
    type: String,
    default: '01',
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  tagline: {
    type: String,
    default: '',
    trim: true,
  },
  description: {
    type: String,
    default: '',
    trim: true,
  },
  bullets: {
    type: [String],
    default: [],
  },
  highlightsHeader: {
    type: String,
    default: 'THÔNG TIN DỰ ÁN:',
    trim: true,
  },
  highlights: {
    type: [String],
    default: [],
  },
  mainImage: {
    type: String,
    required: true,
    trim: true,
  },
  cardImage: {
    type: String,
    default: '',
    trim: true,
  },
  gallery: {
    type: [String],
    default: [],
  },
  area: {
    type: String,
    default: 'Liên hệ',
    trim: true,
  },
  location: {
    type: String,
    default: 'Hà Nội',
    trim: true,
  },
  style: {
    type: String,
    default: 'HIEN_DAI',
    trim: true,
    index: true,
  },
  featuredOnHome: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
  versionKey: false,
});

ProjectSchema.index({ sortOrder: 1, createdAt: -1 });

export default mongoose.models.Project
  || mongoose.model<IProjectDocument>('Project', ProjectSchema);
