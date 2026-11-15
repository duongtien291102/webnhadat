'use client';

import { useMemo, useRef, useState } from 'react';
import {
  Badge,
  Button,
  Card,
  Checkbox,
  Field,
  Input,
  Select,
  Spinner,
  Switch,
  Textarea,
} from '@fluentui/react-components';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  ImagePlus,
  Plus,
  RefreshCw,
  Save,
  Search,
  Star,
  Trash2,
} from 'lucide-react';
import { getProjectCardImage } from '@/lib/projectImages';
import { styleLabels, type Project } from '@/types';
import AdminImageField from './AdminImageField';
import AdminNavHeader from './AdminNavHeader';
import AdminStatusPopup from './AdminStatusPopup';
import { uploadAdminImages } from './uploadClient';

interface AdminProjectsManagerProps {
  initialProjects: Project[];
}

const STYLE_OPTIONS = [
  { value: 'HIEN_DAI', label: 'Hiện đại' },
  { value: 'JAPANDI', label: 'Japandi' },
  { value: 'WABISABI', label: 'Wabi-sabi' },
  { value: 'THUONG_MAI', label: 'Thương mại' },
] as const;

function createEmptyProjectDraft(nextIndex: number): Project {
  return {
    id: '',
    index: String(nextIndex).padStart(2, '0'),
    title: '',
    tagline: '',
    description: '',
    bullets: [
      'Không gian được tối ưu hóa để phù hợp với nhu cầu sinh hoạt của gia chủ.',
      'Sử dụng tông màu và vật liệu đặc trưng theo định hướng thiết kế.',
      'Mỗi chi tiết nội thất đều được lựa chọn kỹ lưỡng để tạo nên tổng thể hài hòa.',
    ],
    highlightsHeader: 'THÔNG TIN DỰ ÁN:',
    highlights: [
      'Loại hình: Nhà ở',
      'Địa điểm: Hà Nội',
      'Diện tích: Liên hệ',
      'Thiết kế & thi công: NOU.Design',
    ],
    mainImage: '',
    cardImage: '',
    gallery: [],
    area: '',
    location: 'Hà Nội',
    style: 'HIEN_DAI',
    featuredOnHome: false,
    sortOrder: 0,
  };
}

function linesToArray(value: string) {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

export default function AdminProjectsManager({ initialProjects }: AdminProjectsManagerProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [selectedId, setSelectedId] = useState<string>(initialProjects[0]?.id || '');
  const [isCreating, setIsCreating] = useState(initialProjects.length === 0);
  const [draft, setDraft] = useState<Project>(
    () => initialProjects[0] ?? createEmptyProjectDraft(1),
  );
  const [syncCardWithMain, setSyncCardWithMain] = useState<boolean>(
    () => !initialProjects[0]?.cardImage || initialProjects[0].cardImage === initialProjects[0].mainImage,
  );
  const [isDirty, setIsDirty] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [styleFilter, setStyleFilter] = useState('ALL');
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);
  const [replacingIndex, setReplacingIndex] = useState<number | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const galleryInputRef = useRef<HTMLInputElement>(null);
  const replaceInputRef = useRef<HTMLInputElement>(null);
  const pendingReplaceIndexRef = useRef<number | null>(null);

  const filteredProjects = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return projects.filter((project) => {
      if (styleFilter !== 'ALL' && project.style !== styleFilter) return false;
      if (!q) return true;
      return (
        project.title.toLowerCase().includes(q)
        || project.location.toLowerCase().includes(q)
        || project.id.toLowerCase().includes(q)
      );
    });
  }, [projects, searchQuery, styleFilter]);

  function updateDraft(updater: (prev: Project) => Project) {
    setDraft((prev) => updater(prev));
    setIsDirty(true);
    setStatusMessage(null);
  }

  function confirmDiscardChanges() {
    if (!isDirty) return true;
    return window.confirm('Bạn có thay đổi chưa lưu ở dự án hiện tại. Chuyển sang thao tác khác và bỏ thay đổi?');
  }

  function handleSelectProject(project: Project) {
    if (!isCreating && project.id === selectedId) return;
    if (!confirmDiscardChanges()) return;

    setIsCreating(false);
    setSelectedId(project.id);
    setDraft(project);
    setSyncCardWithMain(!project.cardImage || project.cardImage === project.mainImage);
    setIsDirty(false);
    setStatusMessage(null);
  }

  function handleStartCreate() {
    if (!confirmDiscardChanges()) return;

    setIsCreating(true);
    setSelectedId('');
    setDraft(createEmptyProjectDraft(projects.length + 1));
    setSyncCardWithMain(true);
    setIsDirty(false);
    setStatusMessage(null);
  }

  function handleMainImageChange(newUrl: string) {
    updateDraft((prev) => {
      const nextGallery = newUrl && !prev.gallery.includes(newUrl)
        ? [newUrl, ...prev.gallery]
        : prev.gallery;

      return {
        ...prev,
        mainImage: newUrl,
        cardImage: syncCardWithMain ? newUrl : prev.cardImage,
        gallery: nextGallery,
      };
    });
  }

  async function handleAddGalleryImages(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploadingGallery(true);
    setStatusMessage(null);

    try {
      const uploadedUrls = await uploadAdminImages(files, 'projects');
      if (uploadedUrls.length > 0) {
        updateDraft((prev) => {
          const mergedGallery = Array.from(new Set([...prev.gallery, ...uploadedUrls]));
          const nextMain = prev.mainImage || uploadedUrls[0];
          const nextCard = syncCardWithMain ? nextMain : (prev.cardImage || nextMain);
          return {
            ...prev,
            mainImage: nextMain,
            cardImage: nextCard,
            gallery: mergedGallery,
          };
        });
        setStatusMessage({
          type: 'success',
          text: `Đã tải lên và nén ${uploadedUrls.length} ảnh (.webp). Nhớ bấm "Lưu thay đổi" để cập nhật lên website.`,
        });
      }
    } catch (error) {
      setStatusMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Không thể tải ảnh vào album.',
      });
    } finally {
      setIsUploadingGallery(false);
      event.target.value = '';
    }
  }

  function triggerReplaceGalleryImage(index: number) {
    pendingReplaceIndexRef.current = index;
    replaceInputRef.current?.click();
  }

  async function handleReplaceGalleryImage(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    const targetIndex = pendingReplaceIndexRef.current;
    if (!files || files.length === 0 || targetIndex === null) return;

    setReplacingIndex(targetIndex);
    setStatusMessage(null);

    try {
      const [newUrl] = await uploadAdminImages([files[0]], 'projects');
      if (newUrl) {
        updateDraft((prev) => {
          const oldUrl = prev.gallery[targetIndex];
          const nextGallery = prev.gallery.map((img, idx) => (idx === targetIndex ? newUrl : img));
          const nextMain = prev.mainImage === oldUrl ? newUrl : prev.mainImage;
          const nextCard = prev.cardImage === oldUrl
            ? newUrl
            : (syncCardWithMain ? nextMain : prev.cardImage);
          return {
            ...prev,
            mainImage: nextMain,
            cardImage: nextCard,
            gallery: nextGallery,
          };
        });
        setStatusMessage({
          type: 'success',
          text: 'Đã thay thế ảnh mới. Nhớ bấm "Lưu thay đổi" để cập nhật lên website.',
        });
      }
    } catch (error) {
      setStatusMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Không thể thay thế ảnh.',
      });
    } finally {
      setReplacingIndex(null);
      pendingReplaceIndexRef.current = null;
      event.target.value = '';
    }
  }

  function handleMoveGalleryImage(index: number, direction: -1 | 1) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= draft.gallery.length) return;

    updateDraft((prev) => {
      const next = [...prev.gallery];
      const temp = next[index];
      next[index] = next[targetIndex];
      next[targetIndex] = temp;
      return { ...prev, gallery: next };
    });
  }

  function handleRemoveGalleryImage(index: number) {
    const targetUrl = draft.gallery[index];
    updateDraft((prev) => {
      const nextGallery = prev.gallery.filter((_, idx) => idx !== index);
      let nextMain = prev.mainImage;
      if (prev.mainImage === targetUrl) {
        nextMain = nextGallery[0] || '';
      }
      const nextCard = syncCardWithMain
        ? nextMain
        : (prev.cardImage === targetUrl ? nextMain : prev.cardImage);

      return {
        ...prev,
        mainImage: nextMain,
        cardImage: nextCard,
        gallery: nextGallery,
      };
    });
  }

  function handleSetCoverFromGallery(imageUrl: string) {
    updateDraft((prev) => ({
      ...prev,
      mainImage: imageUrl,
      cardImage: syncCardWithMain ? imageUrl : prev.cardImage,
    }));
  }

  async function handleSaveProject(event: React.FormEvent) {
    event.preventDefault();
    if (isSaving) return;

    if (!draft.title.trim()) {
      setStatusMessage({ type: 'error', text: 'Vui lòng nhập tên dự án.' });
      return;
    }

    const effectiveMainImage = draft.mainImage || draft.gallery[0] || '';
    if (!effectiveMainImage) {
      setStatusMessage({ type: 'error', text: 'Vui lòng tải lên ít nhất 1 ảnh cho dự án.' });
      return;
    }

    setIsSaving(true);
    setStatusMessage(null);

    const payload = {
      ...draft,
      mainImage: effectiveMainImage,
      cardImage: syncCardWithMain ? effectiveMainImage : (draft.cardImage || effectiveMainImage),
      gallery: draft.gallery.length > 0 ? draft.gallery : [effectiveMainImage],
    };

    try {
      const endpoint = isCreating
        ? '/api/admin/projects'
        : `/api/admin/projects/${encodeURIComponent(selectedId)}`;
      const method = isCreating ? 'POST' : 'PUT';

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => ({}))) as {
        success?: boolean;
        project?: Project;
        error?: string;
      };

      if (!response.ok || !result.success || !result.project) {
        setStatusMessage({
          type: 'error',
          text: result.error || 'Không thể lưu dự án. Vui lòng thử lại.',
        });
        return;
      }

      const savedProject = result.project;
      if (isCreating) {
        setProjects((prev) => [savedProject, ...prev]);
        setIsCreating(false);
        setSelectedId(savedProject.id);
      } else {
        setProjects((prev) => prev.map((item) => (item.id === savedProject.id ? savedProject : item)));
      }

      setDraft(savedProject);
      setSyncCardWithMain(!savedProject.cardImage || savedProject.cardImage === savedProject.mainImage);
      setIsDirty(false);
      setStatusMessage({
        type: 'success',
        text: isCreating
          ? `Đã tạo dự án "${savedProject.title}" và đăng lên website.`
          : `Đã lưu thay đổi dự án "${savedProject.title}" lên website.`,
      });
    } catch {
      setStatusMessage({
        type: 'error',
        text: 'Không thể kết nối máy chủ quản trị. Vui lòng thử lại.',
      });
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDeleteProject() {
    if (isCreating || !selectedId || isDeleting) return;
    if (!window.confirm(`Bạn có chắc muốn xóa dự án "${draft.title}"? Thao tác này không thể hoàn tác.`)) {
      return;
    }

    setIsDeleting(true);
    setStatusMessage(null);

    try {
      const response = await fetch(`/api/admin/projects/${encodeURIComponent(selectedId)}`, {
        method: 'DELETE',
        credentials: 'same-origin',
      });
      const result = (await response.json().catch(() => ({}))) as {
        success?: boolean;
        error?: string;
      };

      if (!response.ok || !result.success) {
        setStatusMessage({
          type: 'error',
          text: result.error || 'Không thể xóa dự án.',
        });
        return;
      }

      const remaining = projects.filter((item) => item.id !== selectedId);
      setProjects(remaining);
      setIsDirty(false);

      if (remaining.length > 0) {
        setSelectedId(remaining[0].id);
        setDraft(remaining[0]);
        setSyncCardWithMain(!remaining[0].cardImage || remaining[0].cardImage === remaining[0].mainImage);
        setIsCreating(false);
      } else {
        setIsCreating(true);
        setSelectedId('');
        setDraft(createEmptyProjectDraft(1));
      }

      setStatusMessage({
        type: 'success',
        text: `Đã xóa dự án "${draft.title}".`,
      });
    } catch {
      setStatusMessage({
        type: 'error',
        text: 'Không thể kết nối máy chủ khi xóa dự án.',
      });
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <main
      className="min-h-[100dvh] bg-[#f4f4f1] text-[#20201f]"
      data-allow-copy="true"
      style={{ WebkitUserSelect: 'text', userSelect: 'text' }}
    >
      <AdminNavHeader />

      <div className="mx-auto max-w-[1440px] space-y-6 px-4 py-6 md:px-8 md:py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-neutral-950 md:text-3xl">
              Quản lý Dự án &amp; Hình ảnh
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-600">
              Thêm dự án mới, thay ảnh bìa, thêm hoặc thay thế từng ảnh trong album. Ảnh tải lên (JPG, PNG...) được tự động nén sang WebP tối ưu tốc độ tải trang.
            </p>
          </div>
          <Button
            appearance="primary"
            size="large"
            icon={<Plus size={18} />}
            onClick={handleStartCreate}
          >
            Thêm dự án mới
          </Button>
        </div>

        {statusMessage && (
          <div
            role="status"
            className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium ${
              statusMessage.type === 'success'
                ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                : 'border-red-200 bg-red-50 text-red-900'
            }`}
          >
            {statusMessage.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span>{statusMessage.text}</span>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[350px_minmax(0,1fr)] lg:items-start">
          {/* Left Column: Project Selector */}
          <Card appearance="outline" className="!rounded-xl !border-neutral-200 !bg-white !p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-neutral-900">
                  Danh sách dự án ({filteredProjects.length})
                </h2>
                <Badge appearance="tint" color="informative">{projects.length} tổng</Badge>
              </div>

              <Input
                value={searchQuery}
                onChange={(_, data) => setSearchQuery(data.value)}
                placeholder="Tìm tên, địa điểm dự án..."
                contentBefore={<Search size={16} className="text-neutral-500" />}
                className="!w-full"
              />

              <Select
                value={styleFilter}
                onChange={(_, data) => setStyleFilter(data.value)}
                className="!w-full"
              >
                <option value="ALL">Tất cả phong cách</option>
                {STYLE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </Select>

              <div className="max-h-[68vh] space-y-2 overflow-y-auto pr-1">
                {filteredProjects.map((project) => {
                  const active = !isCreating && project.id === selectedId;
                  const thumb = getProjectCardImage(project);
                  return (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() => handleSelectProject(project)}
                      className={`flex w-full items-center gap-3 rounded-lg border p-2.5 text-left transition-all cursor-pointer ${
                        active
                          ? 'border-[#20201f] bg-neutral-900 text-white shadow-sm'
                          : 'border-neutral-200 bg-white hover:border-neutral-400 hover:bg-neutral-50'
                      }`}
                    >
                      <div className="h-14 w-16 shrink-0 overflow-hidden rounded-md bg-neutral-200">
                        {thumb && (
                          <img
                            src={thumb}
                            alt={project.title}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">
                          {project.title}
                        </p>
                        <div className={`mt-1 flex flex-wrap items-center gap-1.5 text-[11px] ${active ? 'text-neutral-300' : 'text-neutral-500'}`}>
                          <span>{styleLabels[project.style] || project.style}</span>
                          <span>•</span>
                          <span>{project.gallery.length} ảnh</span>
                          {project.featuredOnHome && (
                            <span className={`inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 font-semibold ${active ? 'bg-amber-400/20 text-amber-200' : 'bg-amber-100 text-amber-800'}`}>
                              <Star size={10} /> Trang chủ
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
                {filteredProjects.length === 0 && (
                  <p className="py-8 text-center text-xs text-neutral-500">
                    Không có dự án nào khớp bộ lọc.
                  </p>
                )}
              </div>
            </div>
          </Card>

          {/* Right Column: Project Editor */}
          <form onSubmit={handleSaveProject} className="space-y-6">
            <Card appearance="outline" className="!rounded-xl !border-neutral-200 !bg-white !p-5 md:!p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold text-neutral-950">
                      {isCreating ? 'Tạo dự án mới' : draft.title || 'Chỉnh sửa dự án'}
                    </h2>
                    {isDirty && (
                      <Badge appearance="tint" color="warning">Chưa lưu</Badge>
                    )}
                  </div>
                  {!isCreating && (
                    <a
                      href={`https://noudesign.vn/project/${draft.id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-flex items-center gap-1 text-xs text-neutral-500 underline-offset-4 hover:text-neutral-900 hover:underline"
                    >
                      <span>Xem trên web: /project/{draft.id}</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {!isCreating && (
                    <Button
                      type="button"
                      appearance="secondary"
                      icon={isDeleting ? <Spinner size="tiny" /> : <Trash2 size={16} />}
                      onClick={handleDeleteProject}
                      disabled={isDeleting || isSaving}
                    >
                      Xóa dự án
                    </Button>
                  )}
                  <Button
                    type="submit"
                    appearance="primary"
                    icon={isSaving ? <Spinner size="tiny" /> : <Save size={16} />}
                    disabled={isSaving}
                  >
                    {isSaving ? 'Đang lưu...' : isCreating ? 'Đăng dự án mới' : 'Lưu thay đổi'}
                  </Button>
                </div>
              </div>

              {/* Cover Images */}
              <div className="mt-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-base font-semibold text-neutral-900">1. Ảnh bìa &amp; Ảnh đại diện</h3>
                  <Checkbox
                    checked={syncCardWithMain}
                    onChange={(_, data) => {
                      const checked = Boolean(data.checked);
                      setSyncCardWithMain(checked);
                      if (checked) {
                        updateDraft((prev) => ({ ...prev, cardImage: prev.mainImage }));
                      }
                    }}
                    label="Dùng ảnh bìa chính làm ảnh thẻ danh sách"
                  />
                </div>

                <div className={`grid grid-cols-1 gap-5 ${syncCardWithMain ? 'md:grid-cols-1 max-w-xl' : 'md:grid-cols-2'}`}>
                  <AdminImageField
                    label="Ảnh bìa chính (hiển thị đầu trang dự án)"
                    value={draft.mainImage}
                    folder="projects"
                    onChange={handleMainImageChange}
                    hint="Ảnh này hiển thị ở đầu trang chi tiết dự án và làm ảnh đầu tiên của slider."
                  />
                  {!syncCardWithMain && (
                    <AdminImageField
                      label="Ảnh thẻ danh sách (hiển thị ở mục Phong cách)"
                      value={draft.cardImage || ''}
                      folder="projects"
                      onChange={(newUrl) => updateDraft((prev) => ({ ...prev, cardImage: newUrl }))}
                      hint="Ảnh riêng cho thẻ dự án khi xem bộ sưu tập."
                    />
                  )}
                </div>
              </div>
            </Card>

            {/* Gallery Manager */}
            <Card appearance="outline" className="!rounded-xl !border-neutral-200 !bg-white !p-5 md:!p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 pb-4">
                <div>
                  <h3 className="text-base font-semibold text-neutral-900">
                    2. Album hình ảnh dự án ({draft.gallery.length} ảnh)
                  </h3>
                  <p className="mt-1 text-xs text-neutral-500">
                    Thêm nhiều ảnh mới cùng lúc, bấm &quot;Thay ảnh&quot; để đè ảnh mới vào vị trí cũ, hoặc đổi thứ tự hiển thị.
                  </p>
                </div>

                <div>
                  <input
                    ref={galleryInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleAddGalleryImages}
                    disabled={isUploadingGallery}
                  />
                  <input
                    ref={replaceInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleReplaceGalleryImage}
                    disabled={replacingIndex !== null}
                  />
                  <Button
                    type="button"
                    appearance="primary"
                    icon={isUploadingGallery ? <Spinner size="tiny" /> : <ImagePlus size={16} />}
                    onClick={() => galleryInputRef.current?.click()}
                    disabled={isUploadingGallery}
                  >
                    {isUploadingGallery ? 'Đang tải & nén ảnh...' : 'Thêm ảnh vào album'}
                  </Button>
                </div>
              </div>

              {draft.gallery.length === 0 ? (
                <div className="my-6 rounded-xl border border-dashed border-neutral-300 bg-neutral-50 px-6 py-12 text-center">
                  <p className="text-sm font-medium text-neutral-700">Album ảnh đang trống</p>
                  <p className="mt-1 text-xs text-neutral-500">
                    Bấm nút &quot;Thêm ảnh vào album&quot; để chọn nhiều ảnh từ máy tính hoặc điện thoại.
                  </p>
                </div>
              ) : (
                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {draft.gallery.map((imageUrl, idx) => {
                    const isCover = imageUrl === draft.mainImage;
                    const isReplacingThis = replacingIndex === idx;

                    return (
                      <div
                        key={`${imageUrl}-${idx}`}
                        className={`overflow-hidden rounded-xl border bg-white transition-all ${
                          isCover ? 'border-[#20201f] ring-1 ring-[#20201f]' : 'border-neutral-200'
                        }`}
                      >
                        <div className="relative aspect-[4/3] bg-neutral-100">
                          <img
                            src={imageUrl}
                            alt={`${draft.title || 'Dự án'} - ảnh ${idx + 1}`}
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute left-2 top-2 flex items-center gap-1.5">
                            <span className="rounded bg-black/75 px-2 py-0.5 text-[11px] font-semibold text-white">
                              #{idx + 1}
                            </span>
                            {isCover && (
                              <span className="inline-flex items-center gap-1 rounded bg-amber-500 px-2 py-0.5 text-[11px] font-semibold text-white">
                                <Star size={11} /> Ảnh bìa
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-1.5 border-t border-neutral-100 bg-neutral-50/70 p-2.5">
                          <div className="flex items-center gap-1">
                            <Button
                              type="button"
                              size="small"
                              appearance="secondary"
                              icon={isReplacingThis ? <Spinner size="tiny" /> : <RefreshCw size={13} />}
                              onClick={() => triggerReplaceGalleryImage(idx)}
                              disabled={replacingIndex !== null}
                            >
                              Thay ảnh
                            </Button>
                            {!isCover && (
                              <Button
                                type="button"
                                size="small"
                                appearance="subtle"
                                icon={<Star size={13} />}
                                onClick={() => handleSetCoverFromGallery(imageUrl)}
                                title="Đặt làm ảnh bìa chính"
                              >
                                Đặt bìa
                              </Button>
                            )}
                          </div>

                          <div className="flex items-center gap-1">
                            <Button
                              type="button"
                              size="small"
                              appearance="subtle"
                              icon={<ArrowLeft size={13} />}
                              onClick={() => handleMoveGalleryImage(idx, -1)}
                              disabled={idx === 0}
                              aria-label="Đưa ảnh lên trước"
                            />
                            <Button
                              type="button"
                              size="small"
                              appearance="subtle"
                              icon={<ArrowRight size={13} />}
                              onClick={() => handleMoveGalleryImage(idx, 1)}
                              disabled={idx === draft.gallery.length - 1}
                              aria-label="Đưa ảnh xuống sau"
                            />
                            <Button
                              type="button"
                              size="small"
                              appearance="subtle"
                              icon={<Trash2 size={13} className="text-red-600" />}
                              onClick={() => handleRemoveGalleryImage(idx)}
                              aria-label="Xóa ảnh khỏi album"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>

            {/* Project Info */}
            <Card appearance="outline" className="!rounded-xl !border-neutral-200 !bg-white !p-5 md:!p-6">
              <h3 className="border-b border-neutral-200 pb-4 text-base font-semibold text-neutral-900">
                3. Thông tin chi tiết dự án
              </h3>

              <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field label="Tên dự án" required className="md:col-span-2">
                  <Input
                    value={draft.title}
                    onChange={(_, data) => updateDraft((prev) => ({ ...prev, title: data.value }))}
                    placeholder="VD: CHUNG CƯ MATRIX ONE 125m²"
                    size="large"
                  />
                </Field>

                <Field label="Phong cách thiết kế" required>
                  <Select
                    value={draft.style}
                    onChange={(_, data) => updateDraft((prev) => ({ ...prev, style: data.value }))}
                    size="large"
                  >
                    {STYLE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </Select>
                </Field>

                <Field label="Địa điểm">
                  <Input
                    value={draft.location}
                    onChange={(_, data) => updateDraft((prev) => ({ ...prev, location: data.value }))}
                    placeholder="Hà Nội"
                    size="large"
                  />
                </Field>

                <Field label="Diện tích">
                  <Input
                    value={draft.area}
                    onChange={(_, data) => updateDraft((prev) => ({ ...prev, area: data.value }))}
                    placeholder="125 m²"
                    size="large"
                  />
                </Field>

                <Field label="Thứ tự ưu tiên (số nhỏ xếp trước)">
                  <Input
                    type="number"
                    value={String(draft.sortOrder ?? 0)}
                    onChange={(_, data) => updateDraft((prev) => ({ ...prev, sortOrder: Number(data.value) || 0 }))}
                    size="large"
                  />
                </Field>

                <div className="flex items-center pt-2 md:col-span-2">
                  <Switch
                    checked={Boolean(draft.featuredOnHome)}
                    onChange={(_, data) => updateDraft((prev) => ({ ...prev, featuredOnHome: data.checked }))}
                    label="Hiển thị nổi bật tại Trang chủ (mục Phong cách tiêu biểu)"
                  />
                </div>

                <Field label="Thuyết minh thiết kế" className="md:col-span-2">
                  <Textarea
                    value={draft.description}
                    onChange={(_, data) => updateDraft((prev) => ({ ...prev, description: data.value }))}
                    rows={4}
                    resize="vertical"
                    placeholder="Mô tả ý tưởng, vật liệu và công năng của dự án..."
                  />
                </Field>

                <Field
                  label="Điểm nổi bật ngắn (mỗi dòng 1 ý)"
                  hint="Hiển thị dạng danh sách gạch đầu dòng khi dự án xuất hiện trên trang chủ."
                >
                  <Textarea
                    value={draft.bullets.join('\n')}
                    onChange={(_, data) => updateDraft((prev) => ({ ...prev, bullets: linesToArray(data.value) }))}
                    rows={4}
                    resize="vertical"
                  />
                </Field>

                <Field
                  label="Thông số dự án (mỗi dòng 1 mục)"
                  hint="Hiển thị trong khung thông tin chi tiết."
                >
                  <Textarea
                    value={draft.highlights.join('\n')}
                    onChange={(_, data) => updateDraft((prev) => ({ ...prev, highlights: linesToArray(data.value) }))}
                    rows={4}
                    resize="vertical"
                  />
                </Field>
              </div>

              <div className="mt-6 flex items-center justify-end gap-3 border-t border-neutral-200 pt-4">
                <Button
                  type="submit"
                  appearance="primary"
                  size="large"
                  icon={isSaving ? <Spinner size="tiny" /> : <Save size={16} />}
                  disabled={isSaving}
                >
                  {isSaving ? 'Đang lưu...' : isCreating ? 'Đăng dự án mới' : 'Lưu thay đổi'}
                </Button>
              </div>
            </Card>
          </form>
        </div>
      </div>

      <AdminStatusPopup status={statusMessage} onClose={() => setStatusMessage(null)} />
    </main>
  );
}
