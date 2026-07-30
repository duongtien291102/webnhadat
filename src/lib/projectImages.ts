import type { Project } from '../types';
import { newModernAndWabiProjectIds } from './newModernAndWabiProjects';

const USE_MAIN_IMAGE_AS_CARD = new Set([
  '10-cai-tao-nha-lao-cai-4-3x19',
  '12-biet-thu-oceanpark-hai-au-230m2',
  '13-oceanpark-r1-87m2',
  '26-biet-thu-gamuda',
  '34-chung-cu-6-element-110m2',
  '24-nha-dat-noi-that-8-2x11-4',
  '25-nha-dat-ngoc-thuy-6-8x10',
  '29-chung-cu-ct36-xuan-la',
  '35-chung-cu-ho-guom-plaza-140m2',
  '36-chung-cu-282-nguyen-huy-tuong',
  '41-nha-dat-long-bien-4x14',
  '44-nha-dat-6x22',
  '49-chung-cu-oceanpark-1',
]);

const PROJECTS_REQUIRING_NATURAL_ORDER = new Set([
  '10-cai-tao-nha-lao-cai-4-3x19',
  '12-biet-thu-oceanpark-hai-au-230m2',
  '13-oceanpark-r1-87m2',
]);

function isBathroomImage(projectId: string, image: string) {
  const normalized = image.toLowerCase();

  if (/(^|[-_/])(wc|toilet)([-_.\/]|$)/.test(normalized)) return true;

  return projectId === '10-cai-tao-nha-lao-cai-4-3x19'
    && (normalized.includes('/tang-3-') || normalized.endsWith('/master-8.webp'));
}

function compareNaturally(left: string, right: string) {
  return left.localeCompare(right, 'vi', { numeric: true, sensitivity: 'base' });
}

function getImagePriority(projectId: string, image: string) {
  if (isBathroomImage(projectId, image)) return 90;
  if (projectId !== '10-cai-tao-nha-lao-cai-4-3x19') return 20;

  const normalized = image.toLowerCase();
  if (normalized.includes('/tang-1-')) return 0;
  if (normalized.endsWith('/sanh.webp') || normalized.endsWith('/p-tho.webp')) return 10;
  if (normalized.includes('/tang-2-') || normalized.includes('/ngu-phu-')) return 30;
  return 20;
}

export function getOrderedProjectImages(project: Project) {
  const images = Array.from(new Set([project.mainImage, ...project.gallery].filter(Boolean)));

  if (!PROJECTS_REQUIRING_NATURAL_ORDER.has(project.id)) return images;

  const cover = project.mainImage;
  const remainingImages = images.filter((image) => image !== cover).sort((left, right) => {
    const priorityDifference = getImagePriority(project.id, left) - getImagePriority(project.id, right);
    return priorityDifference || compareNaturally(left, right);
  });

  return [cover, ...remainingImages];
}

export function getProjectCardImage(project: Project) {
  if (USE_MAIN_IMAGE_AS_CARD.has(project.id) || newModernAndWabiProjectIds.has(project.id)) {
    return project.mainImage;
  }
  return `/asset/project-thumbnails/${project.id}.webp`;
}
