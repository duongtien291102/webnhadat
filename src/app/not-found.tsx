import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-[100dvh] px-6 flex items-center justify-center bg-background">
      <div className="max-w-xl text-center">
        <p className="text-xs font-semibold tracking-[0.18em] text-neutral-500 dark:text-neutral-400 mb-5">404</p>
        <h1 className="text-4xl md:text-5xl font-serif text-neutral-950 dark:text-neutral-50">Không tìm thấy trang</h1>
        <p className="mt-5 text-sm leading-7 text-neutral-600 dark:text-neutral-300">
          Nội dung bạn đang tìm có thể đã được di chuyển hoặc không còn tồn tại.
        </p>
        <Link
          href="/"
          className="inline-flex mt-8 px-6 py-3 bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 text-sm font-semibold"
        >
          Về trang chủ
        </Link>
      </div>
    </main>
  );
}
