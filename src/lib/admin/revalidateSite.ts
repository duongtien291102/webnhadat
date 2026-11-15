import 'server-only';

import { revalidatePath } from 'next/cache';

export function revalidatePublicSite(projectId?: string) {
  revalidatePath('/');
  revalidatePath('/about');
  revalidatePath('/style/[id]', 'page');
  revalidatePath('/project/[id]', 'page');
  if (projectId) {
    revalidatePath(`/project/${projectId}`);
  }
  revalidatePath('/sitemap.xml');
}
