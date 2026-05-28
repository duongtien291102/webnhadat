import Image from 'next/image';
import styles from './BimSolutions.module.css';

export default function BimSolutions() {
  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        {/* SECTION 1 */}
        <div className={styles.heroSection}>
          <div className={styles.heroLeft}>
            <span className={styles.badge}>ĐỘ CHÍNH XÁC KỸ THUẬT</span>
            <h1 className={styles.title}>
              KIẾN TẠO CẤU TRÚC -<br />ĐỊNH HÌNH TƯƠNG LAI
            </h1>
            <p className={styles.description}>
              Giải pháp BIM tiên tiến cho các công trình kiến trúc phức tạp. 
              Trải nghiệm sự toàn vẹn của cấu trúc thông qua dữ liệu hình ảnh 
              độ phân giải cao và sự hợp tác trong thời gian thực.
            </p>
            <div className={styles.buttonGroup}>
              <button className={styles.btnPrimary}>
                KHÁM PHÁ NGAY <span>&rarr;</span>
              </button>
              <button className={styles.btnSecondary}>XEM MÔ HÌNH 3D</button>
            </div>
            <div className={styles.statsRow}>
              <div className={styles.statItem}>
                <span className={styles.statValue}>128+</span>
                <span className={styles.statLabel}>DỰ ÁN ĐANG THỰC HIỆN</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>99.9%</span>
                <span className={styles.statLabel}>TỶ LỆ CHÍNH XÁC</span>
              </div>
            </div>
          </div>
          <div className={styles.heroRight}>
            <div className={styles.heroImageContainer}>
              <Image 
                src="/asset/structural_building_model.png" 
                alt="3D Building Model" 
                width={600}
                height={400}
                className={styles.heroImage}
                style={{ width: '100%', height: 'auto' }}
              />
              <div className={styles.imageOverlay1}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b7280', fontSize: '0.65rem' }}>
                  <div className={styles.dotBlue}></div>
                  HVAC LAYER
                </div>
                <div style={{ color: '#9ca3af', fontSize: '0.65rem', marginTop: '4px' }}>COORDINATES: X:220 Y:435</div>
              </div>
              <div className={styles.imageOverlay2}>
                <div className={styles.dotRed}></div>
                STRUCTURAL INTEGRITY
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2 */}
        <div className={styles.section2}>
          <h2 className={styles.section2Title}>NỀN TẢNG ĐẤU THẦU & GIẢI PHÁP</h2>
          <p className={styles.section2Desc}>
            Việc thiết lập sự toàn vẹn cấu trúc của mọi dự án bắt đầu bằng sự chính xác trong đấu thầu 
            và tuân thủ pháp lý kiên định. Phương pháp luận dựa trên dữ liệu của chúng tôi đảm bảo 
            sự minh bạch, giảm thiểu rủi ro và lập kế hoạch chiến lược tối ưu chi phí cho sự xuất sắc trong kiến trúc.
          </p>

          <div className={styles.grid}>
            {/* Card 1 */}
            <div className={`${styles.card} ${styles.card1}`}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}>
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                  </svg>
                </div>
                <h3 className={styles.cardTitle}>LẬP KẾ HOẠCH CHIẾN LƯỢC & DỰ BÁO</h3>
              </div>
              <div className={styles.card1Stats}>
                <div className={styles.card1StatCol}>
                  <span className={styles.card1Label}>ĐỘ CHÍNH XÁC DỰ ÁN</span>
                  <span className={styles.card1Value}>99.8%</span>
                </div>
                <div className={styles.card1StatCol}>
                  <span className={styles.card1Label}>GIẢM THIỂU RỦI RO</span>
                  <span className={styles.card1Value}>Cao</span>
                </div>
                <div className={styles.card1StatCol}>
                  <span className={styles.card1Label}>CẤP ĐỘ BIM</span>
                  <span className={styles.card1Value}>03</span>
                </div>
              </div>
              <div className={styles.chartMock}>
                <div className={styles.bar} style={{ height: '50%' }}></div>
                <div className={styles.bar} style={{ height: '40%' }}></div>
                <div className={styles.bar} style={{ height: '30%' }}></div>
                <div className={styles.bar} style={{ height: '70%' }}></div>
                <div className={styles.bar} style={{ height: '45%' }}></div>
                <div className={styles.bar} style={{ height: '90%' }}></div>
              </div>
            </div>

            {/* Card 2 */}
            <div className={`${styles.cardDark} ${styles.card2}`}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapperDark}>
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <h3 className={styles.cardTitle}>TUÂN THỦ PHÁP LÝ & QUẢN TRỊ</h3>
              </div>
              <p className={styles.darkDesc}>
                Tuân thủ hoàn toàn các tiêu chuẩn BIM quốc tế và quy chuẩn xây dựng địa phương. 
                Các giao thức kiểm toán tự động đảm bảo sự đồng bộ pháp lý liên tục.
              </p>
              <ul className={styles.checklist}>
                <li className={styles.checklistItem}>
                  <span className={styles.checkIcon}>
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                  </span>
                  CHỨNG NHẬN ISO 19650
                </li>
                <li className={styles.checklistItem}>
                  <span className={styles.checkIcon}>
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                  </span>
                  ĐÃ PHÊ DUYỆT CƠ CHẾ THỬ NGHIỆM
                </li>
                <li className={styles.checklistItem}>
                  <span className={styles.checkIcon}>
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                  </span>
                  KIỂM TOÁN MÔI TRƯỜNG 2026
                </li>
              </ul>
            </div>

            {/* Bottom Row */}
            <div className={styles.bottomRow}>
              {/* Card 3 */}
              <div className={`${styles.card} ${styles.card3}`}>
                <div className={styles.cardHeader}>
                  <div className={styles.iconWrapper}>
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                  </div>
                  <h3 className={styles.cardTitle}>TỐI ƯU HÓA CHI PHÍ</h3>
                </div>
                <p className={styles.card3Desc}>
                  Các thuật toán độc quyền của chúng tôi xác định các dư thừa cấu trúc để giảm lãng phí vật liệu từ 15-20% mà không ảnh hưởng đến sự toàn vẹn.
                </p>
                <div>
                  <div className={styles.progressBarLabel}>
                    <span style={{ color: '#4b5563' }}>HIỆU SUẤT HIỆN TẠI</span>
                    <span style={{ color: '#0a4282' }}>+32.5%</span>
                  </div>
                  <div className={styles.progressBarTrack}>
                    <div className={styles.progressBarFill}></div>
                  </div>
                </div>
              </div>

              {/* Card 4 */}
              <div className={`${styles.card} ${styles.card4}`}>
                <div className={styles.card4HeaderRow}>
                  <h3 className={styles.card4Title}>HẠ TẦNG MINH BẠCH</h3>
                  <button className={styles.btnSmall}>XEM NHẬT KÝ KIỂM TOÁN</button>
                </div>
                <p className={styles.card4Desc}>
                  Sổ cái thời gian thực về các tương tác đấu thầu và sửa đổi thiết kế.
                </p>
                <div className={styles.statusGrid}>
                  <div className={styles.statusBlock}>
                    <span className={styles.statusLabel}>Gói thầu mã hóa</span>
                    <div className={styles.statusBadge}>
                      <div className={styles.dotBlue}></div>
                      ĐANG HOẠT ĐỘNG
                    </div>
                  </div>
                  <div className={styles.statusBlock}>
                    <span className={styles.statusLabel}>Hệ thống thẩm định</span>
                    <div className={styles.statusBadge}>
                      <div className={styles.dotBlue}></div>
                      BẢO MẬT
                    </div>
                  </div>
                  <div className={styles.statusBlock}>
                    <span className={styles.statusLabel}>Mã băm pháp lý</span>
                    <div className={styles.statusBadge}>
                      <div className={styles.dotBlue}></div>
                      ĐÃ XÁC MINH
                    </div>
                  </div>
                  <div className={styles.statusBlock}>
                    <span className={styles.statusLabel}>Khóa hợp đồng</span>
                    <div className={styles.statusBadge}>
                      <div className={styles.dotBlue}></div>
                      ĐÃ HOÀN TẤT
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3 */}
          <div className={styles.section3}>
            {/* Card 1 */}
            <div className={styles.cardWhite}>
              <div style={{ zIndex: 1, position: 'relative', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <h3 className={styles.cardWhiteTitle}>Trực quan hóa Kỹ thuật Chính xác</h3>
                <p className={styles.cardWhiteDesc}>
                  Các công cụ phân tích 3D chi tiết cho phép kiến trúc sư kiểm tra các thành phần cấu trúc, hệ thống kỹ thuật và vật liệu hoàn thiện một cách độc lập.
                </p>
                <button className={styles.linkButton}>MỞ TRÌNH XEM</button>
              </div>
              <div className={styles.archImageContainer}>
                <Image 
                  src="/asset/abstract_architecture.png" 
                  alt="Architecture abstract" 
                  layout="fill"
                  className={styles.archImage}
                />
              </div>
            </div>

            {/* Card 2 */}
            <div className={styles.cardLightBlue}>
              <h3 className={styles.cardBlueTitle}>Tuân thủ BIM</h3>
              <p className={styles.cardBlueDesc}>
                Đảm bảo tuân thủ 100% các tiêu chuẩn xây dựng quốc tế.
              </p>
              <div className={styles.docIcon}></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
