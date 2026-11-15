import mongoose, { Document, Schema } from 'mongoose';
import type { SiteSettingsData } from '@/types';

export interface ISiteSettingsDocument extends Document, SiteSettingsData {
  key: string;
  createdAt: Date;
  updatedAt: Date;
}

const HeroSlideSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, default: '' },
  tagline: { type: String, default: '' },
  image: { type: String, required: true },
  meta: { type: String, default: '' },
  href: { type: String, default: '/style/all' },
}, { _id: false });

const PhilosophyCardSchema = new Schema({
  title: { type: String, default: '' },
  iconName: { type: String, default: 'compass' },
  description: { type: String, default: '' },
  image: { type: String, required: true },
}, { _id: false });

const MaterialSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, default: '' },
  vietnameseName: { type: String, default: '' },
  image: { type: String, required: true },
  description: { type: String, default: '' },
  details: { type: String, default: '' },
  highlights: { type: [String], default: [] },
}, { _id: false });

const FounderMemberSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, default: '' },
  role: { type: String, default: '' },
  bio: { type: String, default: '' },
  image: { type: String, required: true },
}, { _id: false });

const SiteSettingsSchema = new Schema<ISiteSettingsDocument>({
  key: {
    type: String,
    required: true,
    unique: true,
    default: 'main',
  },
  heroSlides: {
    type: [HeroSlideSchema],
    default: [],
  },
  introduction: {
    beforeImage: { type: String, default: '' },
    beforeLabel: { type: String, default: 'SKETCH • BẢN VẼ SƠ PHÁC' },
    afterImage: { type: String, default: '' },
    afterLabel: { type: String, default: 'REALITY • KHÔNG GIAN BÀN GIAO' },
    philosophyCards: { type: [PhilosophyCardSchema], default: [] },
  },
  materials: {
    type: [MaterialSchema],
    default: [],
  },
  about: {
    storyImage: { type: String, default: '' },
    founders: { type: [FounderMemberSchema], default: [] },
    teamGroupTitle: { type: String, default: '' },
    teamGroupDescription: { type: String, default: '' },
    teamGroupImage: { type: String, default: '' },
  },
}, {
  timestamps: true,
  versionKey: false,
});

export default mongoose.models.SiteSettings
  || mongoose.model<ISiteSettingsDocument>('SiteSettings', SiteSettingsSchema);
