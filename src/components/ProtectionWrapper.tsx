"use client";

import { useEffect } from "react";

export default function ProtectionWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 1. Chống click chuột phải (Context menu)
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;
      e.preventDefault();
    };

    // 2. Chống copy và cắt (Copy, Cut)
    const handleCopyCut = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;
      e.preventDefault();
    };

    // 3. Chống kéo thả ảnh (Drag images)
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "IMG" || target.tagName === "A") {
        e.preventDefault();
      }
    };

    // 4. Chống phím tắt F12, Ctrl+U, Ctrl+S, Ctrl+P, Ctrl+Shift+I, Ctrl+Shift+C
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      // Cho phép copy/paste/gõ bình thường nếu đang ở trong form nhập liệu
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && e.key === "I") ||
        (e.ctrlKey && e.shiftKey && e.key === "J") ||
        (e.ctrlKey && e.shiftKey && e.key === "C") ||
        (e.ctrlKey && e.key === "U") ||
        (e.ctrlKey && e.key === "S") ||
        (e.ctrlKey && e.key === "P") ||
        (e.metaKey && e.altKey && e.key === "I") || // Mac: Cmd+Opt+I
        (e.metaKey && e.altKey && e.key === "J") || // Mac: Cmd+Opt+J
        (e.metaKey && e.altKey && e.key === "C") || // Mac: Cmd+Opt+C
        (e.metaKey && e.key === "U") ||             // Mac: Cmd+U
        (e.metaKey && e.key === "S") ||             // Mac: Cmd+S
        (e.metaKey && e.key === "P")                // Mac: Cmd+P
      ) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // Đăng ký sự kiện
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("copy", handleCopyCut);
    document.addEventListener("cut", handleCopyCut);
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      // Hủy đăng ký khi unmount
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("copy", handleCopyCut);
      document.removeEventListener("cut", handleCopyCut);
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    // Thêm class select-none để chống bôi đen văn bản trên toàn trang
    <div className="select-none pointer-events-auto" style={{ WebkitUserSelect: "none", userSelect: "none" }}>
      {children}
    </div>
  );
}
