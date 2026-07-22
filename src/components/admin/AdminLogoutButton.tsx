'use client';

import { useState } from 'react';
import { Button, Spinner } from '@fluentui/react-components';
import { SignOut24Regular } from '@fluentui/react-icons';

export default function AdminLogoutButton() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function logout() {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        credentials: 'same-origin',
      });
    } finally {
      window.location.replace('/admin/dang-nhap');
    }
  }

  return (
    <Button
      appearance="subtle"
      icon={isSubmitting ? <Spinner size="tiny" /> : <SignOut24Regular />}
      onClick={logout}
      disabled={isSubmitting}
    >
      Đăng xuất
    </Button>
  );
}
