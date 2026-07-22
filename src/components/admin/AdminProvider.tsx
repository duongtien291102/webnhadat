'use client';

import { FluentProvider, webLightTheme } from '@fluentui/react-components';

const nouAdminTheme = {
  ...webLightTheme,
  colorBrandBackground: '#20201f',
  colorBrandBackgroundHover: '#0f0f0f',
  colorBrandBackgroundPressed: '#30302e',
  colorBrandForeground1: '#20201f',
  colorBrandStroke1: '#20201f',
  borderRadiusMedium: '8px',
  borderRadiusLarge: '12px',
};

export default function AdminProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <FluentProvider
      theme={nouAdminTheme}
      className="min-h-[100dvh] bg-[#f4f4f1] text-[#20201f]"
      style={{ WebkitUserSelect: 'text', userSelect: 'text' }}
    >
      {children}
    </FluentProvider>
  );
}
