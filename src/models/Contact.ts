import mongoose, { Schema, Document } from 'mongoose';

export interface IContact extends Document {
  name: string;
  phone: string;
  area?: string;
  location?: string;
  message?: string;
  createdAt: Date;
}

const ContactSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Vui lòng nhập họ và tên'],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Vui lòng nhập số điện thoại'],
    match: [/^0(3|5|7|8|9)[0-9]{8}$/, 'Số điện thoại không hợp lệ'],
    trim: true,
  },
  area: {
    type: String,
    required: [true, 'Vui lòng nhập diện tích'],
    trim: true,
  },
  location: {
    type: String,
    required: [true, 'Vui lòng nhập tỉnh/thành phố'],
    trim: true,
  },
  message: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);
