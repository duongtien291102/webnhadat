import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import connectToDatabase from '@/lib/db';
import Contact from '@/models/Contact';

export async function POST(req: Request) {
  try {
    const { name, phone, message } = await req.json();

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Vui lòng cung cấp đầy đủ Tên và Số điện thoại' },
        { status: 400 }
      );
    }

    // 1. Lưu vào MongoDB
    await connectToDatabase();
    const newContact = await Contact.create({
      name,
      phone,
      message,
    });

    // 2. Gửi Email thông báo qua Nodemailer
    // Cấu hình Transporter dựa trên biến môi trường .env
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Tạo nội dung Email HTML
    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #0a0a0a; color: white; padding: 24px; text-align: center;">
          <h2 style="margin: 0; font-weight: 500; letter-spacing: 2px;">NOU.Design</h2>
          <p style="margin: 8px 0 0; color: #a3a3a3; font-size: 14px;">YÊU CẦU TƯ VẤN MỚI</p>
        </div>
        <div style="padding: 32px 24px; background-color: #fcfbf9;">
          <p style="margin-top: 0;">Chào Admin,</p>
          <p>Hệ thống vừa ghi nhận một yêu cầu đặt lịch tư vấn mới từ khách hàng với thông tin sau:</p>
          
          <div style="background-color: white; border: 1px solid #e5e7eb; border-radius: 4px; padding: 16px; margin: 24px 0;">
            <p style="margin: 0 0 12px;"><strong>Họ và tên:</strong> ${name}</p>
            <p style="margin: 0 0 12px;"><strong>Số điện thoại:</strong> <span style="color: #0284c7;">${phone}</span></p>
            <p style="margin: 0;"><strong>Ghi chú:</strong> ${message ? message.replace(/\n/g, '<br/>') : '<em>(Không có)</em>'}</p>
          </div>

          <p style="font-size: 14px; color: #525252;">Hãy liên hệ với khách hàng trong thời gian sớm nhất nhé.</p>
        </div>
        <div style="background-color: #f5f5f5; padding: 16px; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="margin: 0; font-size: 12px; color: #737373;">Email tự động gửi từ website NOU.Design</p>
        </div>
      </div>
    `;

    // Thiết lập tùy chọn Email
    const mailOptions = {
      from: `"NOU System" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.SMTP_USER, // Gửi tới mail Admin hoặc tự gửi cho chính mình
      subject: `[NOU] Khách hàng mới: ${name} - ${phone}`,
      html: htmlContent,
    };

    // Thử gửi Email (Không throw error nếu fail để vẫn trả về success cho người dùng do DB đã lưu)
    try {
      // Chỉ gửi khi có cấu hình SMTP hợp lệ
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        await transporter.sendMail(mailOptions);
        console.log('✅ Đã gửi email thông báo thành công tới:', mailOptions.to);
      } else {
        console.warn('⚠️ Bỏ qua gửi email do chưa cấu hình SMTP_USER và SMTP_PASS trong .env');
      }
    } catch (emailError) {
      console.error('❌ Lỗi khi gửi email:', emailError);
    }

    return NextResponse.json(
      { success: true, data: newContact },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('API Contact Error:', error);
    return NextResponse.json(
      { error: error.message || 'Lỗi hệ thống khi xử lý yêu cầu' },
      { status: 500 }
    );
  }
}
