'use client';

import { useState } from 'react';
import { Button, Field, Input, Spinner } from '@fluentui/react-components';
import {
  Eye24Regular,
  EyeOff24Regular,
  LockClosed24Regular,
  Person24Regular,
} from '@fluentui/react-icons';

export default function AdminLoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ username, password }),
      });
      const result = await response.json() as { success?: boolean; error?: string };

      if (!response.ok || !result.success) {
        setError(result.error || 'Không thể đăng nhập. Vui lòng thử lại.');
        return;
      }

      window.location.replace('/admin/lien-he');
    } catch {
      setError('Không thể kết nối hệ thống quản trị. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <Field label="Tài khoản" required>
        <Input
          value={username}
          onChange={(_, data) => setUsername(data.value)}
          contentBefore={<Person24Regular aria-hidden />}
          autoComplete="username"
          name="username"
          size="large"
          required
        />
      </Field>

      <Field label="Mật khẩu" required>
        <Input
          value={password}
          onChange={(_, data) => setPassword(data.value)}
          contentBefore={<LockClosed24Regular aria-hidden />}
          contentAfter={(
            <Button
              type="button"
              appearance="subtle"
              size="small"
              icon={showPassword ? <EyeOff24Regular /> : <Eye24Regular />}
              aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              onClick={() => setShowPassword((current) => !current)}
            />
          )}
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          name="password"
          size="large"
          required
        />
      </Field>

      {error && (
        <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-800">
          {error}
        </p>
      )}

      <Button
        type="submit"
        appearance="primary"
        size="large"
        className="!w-full"
        disabled={isSubmitting || !username.trim() || !password}
      >
        {isSubmitting ? <Spinner size="tiny" label="Đang đăng nhập" /> : 'Đăng nhập'}
      </Button>
    </form>
  );
}
