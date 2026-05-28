import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.brandSection}>
            <div className={styles.logoTitle}>
              <div className={styles.logoIcon}>...</div>
              NOU ARCHITECTS
            </div>
            <p className={styles.brandDesc}>
              Phát triển tương lai của hồ sơ kiến trúc và quy hoạch cấu trúc thông qua công nghệ bản sao kỹ thuật số.
            </p>
            <div className={styles.socialIcons}>
              <div className={styles.socialIcon}>
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </div>
              <div className={styles.socialIcon}>
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </div>
              <div className={styles.socialIcon}>
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm6.623 7.928l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.928h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.866l5.6-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/></svg>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className={styles.colTitle}>TÀI NGUYÊN</h4>
            <ul className={styles.linkList}>
              <li className={styles.linkItem}>Tiêu chuẩn BIM</li>
              <li className={styles.linkItem}>Hỗ trợ khách hàng</li>
              <li className={styles.linkItem}>Tài liệu kỹ thuật</li>
            </ul>
          </div>

          <div>
            <h4 className={styles.colTitle}>CÔNG TY</h4>
            <ul className={styles.linkList}>
              <li className={styles.linkItem}>Tuân thủ pháp lý</li>
              <li className={styles.linkItem}>Chính sách bảo mật</li>
              <li className={styles.linkItem}>Tuyển dụng</li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <div className={styles.fab}>
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
        </svg>
      </div>
    </>
  );
}
