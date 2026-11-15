export async function uploadAdminImages(
  files: FileList | File[],
  folder: string,
): Promise<string[]> {
  const fileArray = Array.from(files);
  if (fileArray.length === 0) return [];

  const CHUNK_SIZE = 8;
  const uploadedUrls: string[] = [];

  for (let start = 0; start < fileArray.length; start += CHUNK_SIZE) {
    const chunk = fileArray.slice(start, start + CHUNK_SIZE);
    const formData = new FormData();
    formData.append('folder', folder);
    for (const file of chunk) {
      formData.append('files', file);
    }

    const response = await fetch('/api/admin/upload', {
      method: 'POST',
      credentials: 'same-origin',
      body: formData,
    });

    const result = (await response.json().catch(() => ({}))) as {
      success?: boolean;
      urls?: string[];
      error?: string;
    };

    if (!response.ok || !result.success || !Array.isArray(result.urls)) {
      throw new Error(result.error || 'Không thể tải ảnh lên máy chủ. Vui lòng thử lại.');
    }

    uploadedUrls.push(...result.urls);
  }

  return uploadedUrls;
}
