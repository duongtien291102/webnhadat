'use client';

import { useId, useRef, useState } from 'react';
import { Button, Input, Spinner } from '@fluentui/react-components';
import { Check, Copy, Image as ImageIcon, Upload } from 'lucide-react';
import { uploadAdminImages } from './uploadClient';

interface AdminImageFieldProps {
  label: string;
  value: string;
  folder: string;
  onChange: (url: string) => void;
  hint?: string;
  aspectClass?: string;
}

export default function AdminImageField({
  label,
  value,
  folder,
  onChange,
  hint,
  aspectClass = 'aspect-[16/10]',
}: AdminImageFieldProps) {
  const inputId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  async function handleCopyUrl() {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setError('Không thể sao chép đường dẫn.');
    }
  }

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setError('');

    try {
      const [uploadedUrl] = await uploadAdminImages([files[0]], folder);
      if (uploadedUrl) {
        onChange(uploadedUrl);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể tải ảnh lên.');
    } finally {
      setIsUploading(false);
      event.target.value = '';
    }
  }

  return (
    <div className="space-y-2.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label htmlFor={inputId} className="text-sm font-semibold text-neutral-900">
          {label}
        </label>
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={isUploading}
          />
          <Button
            type="button"
            appearance="secondary"
            size="small"
            icon={isUploading ? <Spinner size="tiny" /> : <Upload size={14} />}
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            {isUploading ? 'Đang nén & tải...' : value ? 'Thay ảnh mới' : 'Tải ảnh lên'}
          </Button>
        </div>
      </div>

      <div className={`relative w-full overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100 ${aspectClass}`}>
        {value ? (
          <img
            src={value}
            alt={label}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-neutral-400">
            <ImageIcon size={28} />
            <span className="text-xs">Chưa có hình ảnh</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Input
          id={inputId}
          value={value}
          readOnly
          onFocus={(event) => event.target.select()}
          placeholder="Chưa có đường dẫn ảnh"
          size="small"
          className="!flex-1 !bg-neutral-50 !text-neutral-600"
        />
        <Button
          type="button"
          appearance="secondary"
          size="small"
          icon={copied ? <Check size={14} /> : <Copy size={14} />}
          onClick={handleCopyUrl}
          disabled={!value}
        >
          {copied ? 'Đã copy' : 'Copy'}
        </Button>
      </div>

      {hint && <p className="text-xs text-neutral-500">{hint}</p>}
      {error && (
        <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
