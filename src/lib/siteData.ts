import 'server-only';

import connectToDatabase from '@/lib/db';
import { defaultSiteSettings } from '@/lib/defaultSiteSettings';
import { getOrderedProjectImages, getProjectCardImage } from '@/lib/projectImages';
import { projects as staticProjects } from '@/lib/projectsData';
import ProjectModel from '@/models/ProjectModel';
import SiteSettingsModel from '@/models/SiteSettingsModel';
import type { Project, SiteSettingsData } from '@/types';

let seedProjectsPromise: Promise<void> | null = null;
let seedSettingsPromise: Promise<void> | null = null;

function buildFallbackProjects(): Project[] {
  return staticProjects.map((project, index) => ({
    ...project,
    cardImage: getProjectCardImage(project),
    gallery: getOrderedProjectImages(project),
    featuredOnHome: index < 4,
    sortOrder: index,
  }));
}

export function toPlainProject(record: Record<string, unknown>): Project {
  return {
    id: String(record.id || ''),
    index: String(record.index || '01'),
    title: String(record.title || ''),
    tagline: String(record.tagline || ''),
    description: String(record.description || ''),
    bullets: Array.isArray(record.bullets) ? record.bullets.map(String) : [],
    highlightsHeader: String(record.highlightsHeader || 'THÔNG TIN DỰ ÁN:'),
    highlights: Array.isArray(record.highlights) ? record.highlights.map(String) : [],
    mainImage: String(record.mainImage || ''),
    cardImage: record.cardImage ? String(record.cardImage) : String(record.mainImage || ''),
    gallery: Array.isArray(record.gallery) ? record.gallery.map(String) : [],
    area: String(record.area || ''),
    location: String(record.location || ''),
    style: String(record.style || 'HIEN_DAI'),
    featuredOnHome: Boolean(record.featuredOnHome),
    sortOrder: typeof record.sortOrder === 'number' ? record.sortOrder : 0,
  };
}

export function toPlainSiteSettings(record: Record<string, unknown> | null | undefined): SiteSettingsData {
  if (!record) return defaultSiteSettings;

  const intro = (record.introduction as Record<string, unknown> | undefined) || {};
  const about = (record.about as Record<string, unknown> | undefined) || {};

  const heroSlides = Array.isArray(record.heroSlides) && record.heroSlides.length > 0
    ? record.heroSlides.map((slide: Record<string, unknown>, idx) => ({
        id: String(slide.id || `slide-${idx + 1}`),
        title: String(slide.title || ''),
        tagline: String(slide.tagline || ''),
        image: String(slide.image || ''),
        meta: String(slide.meta || ''),
        href: String(slide.href || '/style/all'),
      }))
    : defaultSiteSettings.heroSlides;

  const philosophyCards = Array.isArray(intro.philosophyCards) && intro.philosophyCards.length > 0
    ? intro.philosophyCards.map((card: Record<string, unknown>) => ({
        title: String(card.title || ''),
        iconName: String(card.iconName || 'compass'),
        description: String(card.description || ''),
        image: String(card.image || ''),
      }))
    : defaultSiteSettings.introduction.philosophyCards;

  const materials = Array.isArray(record.materials) && record.materials.length > 0
    ? record.materials.map((item: Record<string, unknown>, idx) => ({
        id: String(item.id || `material-${idx + 1}`),
        name: String(item.name || ''),
        vietnameseName: String(item.vietnameseName || ''),
        image: String(item.image || ''),
        description: String(item.description || ''),
        details: String(item.details || ''),
        highlights: Array.isArray(item.highlights) ? item.highlights.map(String) : [],
      }))
    : defaultSiteSettings.materials;

  const founders = Array.isArray(about.founders) && about.founders.length > 0
    ? about.founders.map((founder: Record<string, unknown>, idx) => ({
        id: String(founder.id || `founder-${idx + 1}`),
        name: String(founder.name || ''),
        role: String(founder.role || ''),
        bio: String(founder.bio || ''),
        image: String(founder.image || ''),
      }))
    : defaultSiteSettings.about.founders;

  return {
    heroSlides,
    introduction: {
      beforeImage: String(intro.beforeImage || defaultSiteSettings.introduction.beforeImage),
      beforeLabel: String(intro.beforeLabel || defaultSiteSettings.introduction.beforeLabel),
      afterImage: String(intro.afterImage || defaultSiteSettings.introduction.afterImage),
      afterLabel: String(intro.afterLabel || defaultSiteSettings.introduction.afterLabel),
      philosophyCards,
    },
    materials,
    about: {
      storyImage: String(about.storyImage || defaultSiteSettings.about.storyImage),
      founders,
      teamGroupTitle: String(about.teamGroupTitle || defaultSiteSettings.about.teamGroupTitle),
      teamGroupDescription: String(about.teamGroupDescription || defaultSiteSettings.about.teamGroupDescription),
      teamGroupImage: String(about.teamGroupImage || defaultSiteSettings.about.teamGroupImage),
    },
  };
}

export async function ensureProjectsSeeded() {
  if (seedProjectsPromise) return seedProjectsPromise;

  seedProjectsPromise = (async () => {
    await connectToDatabase();
    const count = await ProjectModel.countDocuments();
    if (count > 0) return;

    const docs = staticProjects.map((project, index) => ({
      ...project,
      cardImage: getProjectCardImage(project),
      gallery: getOrderedProjectImages(project),
      featuredOnHome: index < 4,
      sortOrder: index,
    }));

    try {
      await ProjectModel.insertMany(docs, { ordered: false });
    } catch (error) {
      if ((error as { code?: number }).code !== 11000) {
        throw error;
      }
    }
  })().finally(() => {
    seedProjectsPromise = null;
  });

  return seedProjectsPromise;
}

export async function ensureSiteSettingsSeeded() {
  if (seedSettingsPromise) return seedSettingsPromise;

  seedSettingsPromise = (async () => {
    await connectToDatabase();
    const existing = await SiteSettingsModel.findOne({ key: 'main' }).select('_id').lean();
    if (existing) return;

    try {
      await SiteSettingsModel.create({
        key: 'main',
        ...defaultSiteSettings,
      });
    } catch (error) {
      if ((error as { code?: number }).code !== 11000) {
        throw error;
      }
    }
  })().finally(() => {
    seedSettingsPromise = null;
  });

  return seedSettingsPromise;
}

export async function getProjectsData(options?: { throwOnError?: boolean }): Promise<Project[]> {
  try {
    await ensureProjectsSeeded();
    const records = await ProjectModel.find({})
      .sort({ sortOrder: 1, createdAt: -1 })
      .lean();

    if (records.length === 0) {
      return buildFallbackProjects();
    }

    return records.map((record) => toPlainProject(record as unknown as Record<string, unknown>));
  } catch (error) {
    if (options?.throwOnError) throw error;
    return buildFallbackProjects();
  }
}

export async function getProjectByIdData(id: string): Promise<Project | undefined> {
  try {
    await ensureProjectsSeeded();
    const record = await ProjectModel.findOne({ id }).lean();
    if (!record) return undefined;
    return toPlainProject(record as unknown as Record<string, unknown>);
  } catch {
    return buildFallbackProjects().find((project) => project.id === id);
  }
}

export async function getSiteSettingsData(options?: { throwOnError?: boolean }): Promise<SiteSettingsData> {
  try {
    await ensureSiteSettingsSeeded();
    const record = await SiteSettingsModel.findOne({ key: 'main' }).lean();
    return toPlainSiteSettings(record as unknown as Record<string, unknown> | null);
  } catch (error) {
    if (options?.throwOnError) throw error;
    return defaultSiteSettings;
  }
}
