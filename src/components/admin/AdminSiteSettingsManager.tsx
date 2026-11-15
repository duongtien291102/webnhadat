'use client';

import { useState } from 'react';
import {
  Badge,
  Button,
  Card,
  Field,
  Input,
  Select,
  Spinner,
  Tab,
  TabList,
  Textarea,
} from '@fluentui/react-components';
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  Plus,
  Save,
  Trash2,
} from 'lucide-react';
import type { FounderMember, HeroSlide, Material, SiteSettingsData } from '@/types';
import AdminImageField from './AdminImageField';
import AdminNavHeader from './AdminNavHeader';

interface AdminSiteSettingsManagerProps {
  initialSettings: SiteSettingsData;
}

type SettingsTab = 'hero' | 'intro' | 'materials' | 'about';

function moveItem<T>(list: T[], index: number, direction: -1 | 1): T[] {
  const target = index + direction;
  if (target < 0 || target >= list.length) return list;
  const copy = [...list];
  const temp = copy[index];
  copy[index] = copy[target];
  copy[target] = temp;
  return copy;
}

export default function AdminSiteSettingsManager({ initialSettings }: AdminSiteSettingsManagerProps) {
  const [settings, setSettings] = useState<SiteSettingsData>(initialSettings);
  const [activeTab, setActiveTab] = useState<SettingsTab>('hero');
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  function updateSettings(updater: (prev: SiteSettingsData) => SiteSettingsData) {
    setSettings((prev) => updater(prev));
    setIsDirty(true);
    setStatusMessage(null);
  }

  async function handleSave(event?: React.FormEvent) {
    event?.preventDefault();
    if (isSaving) return;

    setIsSaving(true);
    setStatusMessage(null);

    try {
      const response = await fetch('/api/admin/site-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify(settings),
      });

      const result = (await response.json().catch(() => ({}))) as {
        success?: boolean;
        settings?: SiteSettingsData;
        error?: string;
      };

      if (!response.ok || !result.success || !result.settings) {
        setStatusMessage({
          type: 'error',
          text: result.error || 'Không thể lưu cấu hình giao diện.',
        });
        return;
      }

      setSettings(result.settings);
      setIsDirty(false);
      setStatusMessage({
        type: 'success',
        text: 'Đã lưu toàn bộ ảnh & nội dung giao diện lên website.',
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

  function addHeroSlide() {
    const newSlide: HeroSlide = {
      id: `slide-${Date.now()}`,
      title: 'DỰ ÁN MỚI',
      tagline: 'Không gian sống tinh tế và đầy cảm hứng.',
      image: settings.heroSlides[0]?.image || '',
      meta: 'NỘI THẤT • HÀ NỘI',
      href: '/style/all',
    };
    updateSettings((prev) => ({
      ...prev,
      heroSlides: [...prev.heroSlides, newSlide],
    }));
  }

  function addMaterial() {
    const newMaterial: Material = {
      id: `material-${Date.now()}`,
      name: 'NEW MATERIAL',
      vietnameseName: 'Vật liệu mới',
      image: settings.materials[0]?.image || '',
      description: 'Mô tả ngắn về vật liệu.',
      details: 'Chi tiết đặc tính và ứng dụng của vật liệu.',
      highlights: ['Bền bỉ', 'Thẩm mỹ tự nhiên'],
    };
    updateSettings((prev) => ({
      ...prev,
      materials: [...prev.materials, newMaterial],
    }));
  }

  function addFounder() {
    const newFounder: FounderMember = {
      id: `founder-${Date.now()}`,
      name: 'Thành viên mới',
      role: 'Kiến trúc sư',
      bio: 'Giới thiệu ngắn về vai trò và triết lý thiết kế.',
      image: settings.about.founders[0]?.image || '',
    };
    updateSettings((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        founders: [...prev.about.founders, newFounder],
      },
    }));
  }

  return (
    <main
      className="min-h-[100dvh] bg-[#f4f4f1] text-[#20201f]"
      data-allow-copy="true"
      style={{ WebkitUserSelect: 'text', userSelect: 'text' }}
    >
      <AdminNavHeader />

      <form onSubmit={handleSave} className="mx-auto max-w-[1440px] space-y-6 px-4 py-6 md:px-8 md:py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-semibold tracking-tight text-neutral-950 md:text-3xl">
                Ảnh Trang chủ &amp; Giới thiệu
              </h1>
              {isDirty && <Badge appearance="tint" color="warning">Chưa lưu</Badge>}
            </div>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-600">
              Thay đổi ảnh Banner đầu trang chủ, ảnh so sánh Bản vẽ &amp; Thực tế, ảnh Triết lý, Vật liệu và Đội ngũ tại trang Giới thiệu.
            </p>
          </div>
          <Button
            type="submit"
            appearance="primary"
            size="large"
            icon={isSaving ? <Spinner size="tiny" /> : <Save size={18} />}
            disabled={isSaving}
          >
            {isSaving ? 'Đang lưu...' : 'Lưu thay đổi'}
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

        <Card appearance="outline" className="!rounded-xl !border-neutral-200 !bg-white !p-2">
          <TabList
            selectedValue={activeTab}
            onTabSelect={(_, data) => setActiveTab(data.value as SettingsTab)}
            className="flex-wrap"
          >
            <Tab value="hero">1. Banner đầu trang ({settings.heroSlides.length})</Tab>
            <Tab value="intro">2. So sánh &amp; Triết lý</Tab>
            <Tab value="materials">3. Vật liệu tuyển chọn ({settings.materials.length})</Tab>
            <Tab value="about">4. Trang Giới thiệu &amp; Đội ngũ</Tab>
          </TabList>
        </Card>

        {activeTab === 'hero' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-neutral-900">Các slide Banner đầu Trang chủ</h2>
              <Button type="button" appearance="secondary" icon={<Plus size={16} />} onClick={addHeroSlide}>
                Thêm slide mới
              </Button>
            </div>

            {settings.heroSlides.map((slide, index) => (
              <Card key={slide.id} appearance="outline" className="!rounded-xl !border-neutral-200 !bg-white !p-5">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 pb-3">
                  <span className="text-sm font-semibold text-neutral-900">Slide #{index + 1}</span>
                  <div className="flex items-center gap-1">
                    <Button
                      type="button"
                      size="small"
                      appearance="subtle"
                      icon={<ArrowUp size={14} />}
                      disabled={index === 0}
                      onClick={() => updateSettings((prev) => ({
                        ...prev,
                        heroSlides: moveItem(prev.heroSlides, index, -1),
                      }))}
                    />
                    <Button
                      type="button"
                      size="small"
                      appearance="subtle"
                      icon={<ArrowDown size={14} />}
                      disabled={index === settings.heroSlides.length - 1}
                      onClick={() => updateSettings((prev) => ({
                        ...prev,
                        heroSlides: moveItem(prev.heroSlides, index, 1),
                      }))}
                    />
                    <Button
                      type="button"
                      size="small"
                      appearance="subtle"
                      icon={<Trash2 size={14} className="text-red-600" />}
                      disabled={settings.heroSlides.length <= 1}
                      onClick={() => updateSettings((prev) => ({
                        ...prev,
                        heroSlides: prev.heroSlides.filter((_, idx) => idx !== index),
                      }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[380px_minmax(0,1fr)]">
                  <AdminImageField
                    label="Ảnh nền Slide"
                    value={slide.image}
                    folder="hero"
                    onChange={(newUrl) => updateSettings((prev) => ({
                      ...prev,
                      heroSlides: prev.heroSlides.map((item, idx) => (idx === index ? { ...item, image: newUrl } : item)),
                    }))}
                  />

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Field label="Tiêu đề lớn">
                      <Input
                        value={slide.title}
                        onChange={(_, data) => updateSettings((prev) => ({
                          ...prev,
                          heroSlides: prev.heroSlides.map((item, idx) => (idx === index ? { ...item, title: data.value } : item)),
                        }))}
                      />
                    </Field>
                    <Field label="Đường dẫn nút XEM DỰ ÁN">
                      <Input
                        value={slide.href}
                        onChange={(_, data) => updateSettings((prev) => ({
                          ...prev,
                          heroSlides: prev.heroSlides.map((item, idx) => (idx === index ? { ...item, href: data.value } : item)),
                        }))}
                        placeholder="/project/ten-du-an hoặc /style/HIEN_DAI"
                      />
                    </Field>
                    <Field label="Nhãn thông số phụ (meta)" className="md:col-span-2">
                      <Input
                        value={slide.meta}
                        onChange={(_, data) => updateSettings((prev) => ({
                          ...prev,
                          heroSlides: prev.heroSlides.map((item, idx) => (idx === index ? { ...item, meta: data.value } : item)),
                        }))}
                      />
                    </Field>
                    <Field label="Mô tả ngắn dưới tiêu đề" className="md:col-span-2">
                      <Textarea
                        value={slide.tagline}
                        rows={3}
                        onChange={(_, data) => updateSettings((prev) => ({
                          ...prev,
                          heroSlides: prev.heroSlides.map((item, idx) => (idx === index ? { ...item, tagline: data.value } : item)),
                        }))}
                      />
                    </Field>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'intro' && (
          <div className="space-y-6">
            <Card appearance="outline" className="!rounded-xl !border-neutral-200 !bg-white !p-5 md:!p-6">
              <h2 className="border-b border-neutral-200 pb-3 text-base font-semibold text-neutral-900">
                Thanh kéo so sánh: Bản vẽ &amp; Thực tế bàn giao
              </h2>
              <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <AdminImageField
                    label="Ảnh TRƯỚC (Bản vẽ / Hiện trạng)"
                    value={settings.introduction.beforeImage}
                    folder="intro"
                    onChange={(newUrl) => updateSettings((prev) => ({
                      ...prev,
                      introduction: { ...prev.introduction, beforeImage: newUrl },
                    }))}
                  />
                  <Field label="Nhãn góc trái">
                    <Input
                      value={settings.introduction.beforeLabel}
                      onChange={(_, data) => updateSettings((prev) => ({
                        ...prev,
                        introduction: { ...prev.introduction, beforeLabel: data.value },
                      }))}
                    />
                  </Field>
                </div>

                <div className="space-y-4">
                  <AdminImageField
                    label="Ảnh SAU (Không gian hoàn thiện)"
                    value={settings.introduction.afterImage}
                    folder="intro"
                    onChange={(newUrl) => updateSettings((prev) => ({
                      ...prev,
                      introduction: { ...prev.introduction, afterImage: newUrl },
                    }))}
                  />
                  <Field label="Nhãn góc phải">
                    <Input
                      value={settings.introduction.afterLabel}
                      onChange={(_, data) => updateSettings((prev) => ({
                        ...prev,
                        introduction: { ...prev.introduction, afterLabel: data.value },
                      }))}
                    />
                  </Field>
                </div>
              </div>
            </Card>

            <Card appearance="outline" className="!rounded-xl !border-neutral-200 !bg-white !p-5 md:!p-6">
              <h2 className="border-b border-neutral-200 pb-3 text-base font-semibold text-neutral-900">
                3 Thẻ Triết lý thiết kế (Cân bằng &amp; Tinh tế)
              </h2>
              <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-3">
                {settings.introduction.philosophyCards.map((card, index) => (
                  <div key={`${card.iconName}-${index}`} className="space-y-4 rounded-xl border border-neutral-200 p-4">
                    <AdminImageField
                      label={`Ảnh thẻ #${index + 1}`}
                      value={card.image}
                      folder="intro"
                      aspectClass="aspect-[4/3]"
                      onChange={(newUrl) => updateSettings((prev) => ({
                        ...prev,
                        introduction: {
                          ...prev.introduction,
                          philosophyCards: prev.introduction.philosophyCards.map((item, idx) => (
                            idx === index ? { ...item, image: newUrl } : item
                          )),
                        },
                      }))}
                    />
                    <Field label="Tiêu đề">
                      <Input
                        value={card.title}
                        onChange={(_, data) => updateSettings((prev) => ({
                          ...prev,
                          introduction: {
                            ...prev.introduction,
                            philosophyCards: prev.introduction.philosophyCards.map((item, idx) => (
                              idx === index ? { ...item, title: data.value } : item
                            )),
                          },
                        }))}
                      />
                    </Field>
                    <Field label="Biểu tượng">
                      <Select
                        value={card.iconName}
                        onChange={(_, data) => updateSettings((prev) => ({
                          ...prev,
                          introduction: {
                            ...prev.introduction,
                            philosophyCards: prev.introduction.philosophyCards.map((item, idx) => (
                              idx === index ? { ...item, iconName: data.value } : item
                            )),
                          },
                        }))}
                      >
                        <option value="compass">La bàn (Vật liệu thật)</option>
                        <option value="sun">Mặt trời (Ánh sáng)</option>
                        <option value="home">Ngôi nhà (Sự sống)</option>
                      </Select>
                    </Field>
                    <Field label="Mô tả">
                      <Textarea
                        value={card.description}
                        rows={3}
                        onChange={(_, data) => updateSettings((prev) => ({
                          ...prev,
                          introduction: {
                            ...prev.introduction,
                            philosophyCards: prev.introduction.philosophyCards.map((item, idx) => (
                              idx === index ? { ...item, description: data.value } : item
                            )),
                          },
                        }))}
                      />
                    </Field>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'materials' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-neutral-900">Mục Vật liệu tuyển chọn (Trang chủ)</h2>
              <Button type="button" appearance="secondary" icon={<Plus size={16} />} onClick={addMaterial}>
                Thêm vật liệu
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {settings.materials.map((material, index) => (
                <Card key={material.id} appearance="outline" className="!rounded-xl !border-neutral-200 !bg-white !p-5">
                  <div className="mb-4 flex items-center justify-between border-b border-neutral-100 pb-3">
                    <span className="text-sm font-semibold text-neutral-900">
                      Vật liệu #{index + 1}: {material.vietnameseName}
                    </span>
                    <Button
                      type="button"
                      size="small"
                      appearance="subtle"
                      icon={<Trash2 size={14} className="text-red-600" />}
                      disabled={settings.materials.length <= 1}
                      onClick={() => updateSettings((prev) => ({
                        ...prev,
                        materials: prev.materials.filter((_, idx) => idx !== index),
                      }))}
                    />
                  </div>

                  <div className="space-y-4">
                    <AdminImageField
                      label="Ảnh mẫu vật liệu"
                      value={material.image}
                      folder="materials"
                      aspectClass="aspect-[16/9]"
                      onChange={(newUrl) => updateSettings((prev) => ({
                        ...prev,
                        materials: prev.materials.map((item, idx) => (idx === index ? { ...item, image: newUrl } : item)),
                      }))}
                    />
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <Field label="Tên tiếng Anh (in hoa)">
                        <Input
                          value={material.name}
                          onChange={(_, data) => updateSettings((prev) => ({
                            ...prev,
                            materials: prev.materials.map((item, idx) => (idx === index ? { ...item, name: data.value } : item)),
                          }))}
                        />
                      </Field>
                      <Field label="Tên tiếng Việt">
                        <Input
                          value={material.vietnameseName}
                          onChange={(_, data) => updateSettings((prev) => ({
                            ...prev,
                            materials: prev.materials.map((item, idx) => (idx === index ? { ...item, vietnameseName: data.value } : item)),
                          }))}
                        />
                      </Field>
                    </div>
                    <Field label="Mô tả ngắn">
                      <Textarea
                        value={material.description}
                        rows={2}
                        onChange={(_, data) => updateSettings((prev) => ({
                          ...prev,
                          materials: prev.materials.map((item, idx) => (idx === index ? { ...item, description: data.value } : item)),
                        }))}
                      />
                    </Field>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="space-y-6">
            <Card appearance="outline" className="!rounded-xl !border-neutral-200 !bg-white !p-5 md:!p-6">
              <h2 className="border-b border-neutral-200 pb-3 text-base font-semibold text-neutral-900">
                Ảnh minh họa phần &quot;Câu chuyện của chúng tôi&quot; (/about)
              </h2>
              <div className="mt-5 max-w-md">
                <AdminImageField
                  label="Ảnh không gian nội thất trang Giới thiệu"
                  value={settings.about.storyImage}
                  folder="about"
                  aspectClass="aspect-[4/5]"
                  onChange={(newUrl) => updateSettings((prev) => ({
                    ...prev,
                    about: { ...prev.about, storyImage: newUrl },
                  }))}
                />
              </div>
            </Card>

            <Card appearance="outline" className="!rounded-xl !border-neutral-200 !bg-white !p-5 md:!p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200 pb-3">
                <h2 className="text-base font-semibold text-neutral-900">
                  Đội ngũ sáng lập &amp; Chủ chốt ({settings.about.founders.length})
                </h2>
                <Button type="button" appearance="secondary" size="small" icon={<Plus size={15} />} onClick={addFounder}>
                  Thêm thành viên
                </Button>
              </div>

              <div className="mt-5 space-y-5">
                {settings.about.founders.map((founder, index) => (
                  <div key={founder.id} className="rounded-xl border border-neutral-200 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-sm font-semibold text-neutral-900">Thành viên #{index + 1}</span>
                      <div className="flex items-center gap-1">
                        <Button
                          type="button"
                          size="small"
                          appearance="subtle"
                          icon={<ArrowUp size={14} />}
                          disabled={index === 0}
                          onClick={() => updateSettings((prev) => ({
                            ...prev,
                            about: { ...prev.about, founders: moveItem(prev.about.founders, index, -1) },
                          }))}
                        />
                        <Button
                          type="button"
                          size="small"
                          appearance="subtle"
                          icon={<ArrowDown size={14} />}
                          disabled={index === settings.about.founders.length - 1}
                          onClick={() => updateSettings((prev) => ({
                            ...prev,
                            about: { ...prev.about, founders: moveItem(prev.about.founders, index, 1) },
                          }))}
                        />
                        <Button
                          type="button"
                          size="small"
                          appearance="subtle"
                          icon={<Trash2 size={14} className="text-red-600" />}
                          disabled={settings.about.founders.length <= 1}
                          onClick={() => updateSettings((prev) => ({
                            ...prev,
                            about: {
                              ...prev.about,
                              founders: prev.about.founders.filter((_, idx) => idx !== index),
                            },
                          }))}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-[240px_minmax(0,1fr)]">
                      <AdminImageField
                        label="Ảnh chân dung"
                        value={founder.image}
                        folder="team"
                        aspectClass="aspect-[3/4]"
                        onChange={(newUrl) => updateSettings((prev) => ({
                          ...prev,
                          about: {
                            ...prev.about,
                            founders: prev.about.founders.map((item, idx) => (
                              idx === index ? { ...item, image: newUrl } : item
                            )),
                          },
                        }))}
                      />

                      <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <Field label="Họ và tên">
                            <Input
                              value={founder.name}
                              onChange={(_, data) => updateSettings((prev) => ({
                                ...prev,
                                about: {
                                  ...prev.about,
                                  founders: prev.about.founders.map((item, idx) => (
                                    idx === index ? { ...item, name: data.value } : item
                                  )),
                                },
                              }))}
                            />
                          </Field>
                          <Field label="Chức vụ">
                            <Input
                              value={founder.role}
                              onChange={(_, data) => updateSettings((prev) => ({
                                ...prev,
                                about: {
                                  ...prev.about,
                                  founders: prev.about.founders.map((item, idx) => (
                                    idx === index ? { ...item, role: data.value } : item
                                  )),
                                },
                              }))}
                            />
                          </Field>
                        </div>

                        <Field label="Lời giới thiệu">
                          <Textarea
                            value={founder.bio}
                            rows={4}
                            onChange={(_, data) => updateSettings((prev) => ({
                              ...prev,
                              about: {
                                ...prev.about,
                                founders: prev.about.founders.map((item, idx) => (
                                  idx === index ? { ...item, bio: data.value } : item
                                )),
                              },
                            }))}
                          />
                        </Field>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card appearance="outline" className="!rounded-xl !border-neutral-200 !bg-white !p-5 md:!p-6">
              <h2 className="border-b border-neutral-200 pb-3 text-base font-semibold text-neutral-900">
                Ảnh tập thể đội ngũ (Cuối trang /about)
              </h2>
              <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-2">
                <AdminImageField
                  label="Ảnh tập thể kiến trúc sư &amp; cộng sự"
                  value={settings.about.teamGroupImage}
                  folder="team"
                  aspectClass="aspect-[16/9]"
                  onChange={(newUrl) => updateSettings((prev) => ({
                    ...prev,
                    about: { ...prev.about, teamGroupImage: newUrl },
                  }))}
                />
                <div className="space-y-4">
                  <Field label="Tiêu đề">
                    <Input
                      value={settings.about.teamGroupTitle}
                      onChange={(_, data) => updateSettings((prev) => ({
                        ...prev,
                        about: { ...prev.about, teamGroupTitle: data.value },
                      }))}
                    />
                  </Field>
                  <Field label="Mô tả">
                    <Textarea
                      value={settings.about.teamGroupDescription}
                      rows={4}
                      onChange={(_, data) => updateSettings((prev) => ({
                        ...prev,
                        about: { ...prev.about, teamGroupDescription: data.value },
                      }))}
                    />
                  </Field>
                </div>
              </div>
            </Card>
          </div>
        )}

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            appearance="primary"
            size="large"
            icon={isSaving ? <Spinner size="tiny" /> : <Save size={18} />}
            disabled={isSaving}
          >
            {isSaving ? 'Đang lưu...' : 'Lưu thay đổi'}
          </Button>
        </div>
      </form>
    </main>
  );
}
