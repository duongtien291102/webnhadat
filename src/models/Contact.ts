import mongoose, { Document, Schema } from 'mongoose';

export interface IContact extends Document {
  name: string;
  phone: string;
  area: string;
  location: string;
  material?: string;
  style?: string;
  message?: string;
  source?: string;
  emailSent: boolean;
  emailStatus: 'pending' | 'sent' | 'failed' | 'skipped';
  emailErrorCode?: string;
  emailLastAttemptAt?: Date;
  ipHash?: string;
  submissionKey?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema = new Schema<IContact>({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  phone: {
    type: String,
    required: true,
    match: /^0(3|5|7|8|9)[0-9]{8}$/,
    trim: true,
    index: true,
  },
  area: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20,
  },
  location: {
    type: String,
    required: true,
    trim: true,
    maxlength: 120,
  },
  material: { type: String, trim: true, maxlength: 80 },
  style: { type: String, trim: true, maxlength: 80 },
  message: { type: String, trim: true, maxlength: 2_000 },
  source: { type: String, trim: true, maxlength: 200 },
  emailSent: { type: Boolean, default: false },
  emailStatus: {
    type: String,
    enum: ['pending', 'sent', 'failed', 'skipped'],
    default: 'pending',
  },
  emailErrorCode: { type: String, maxlength: 80 },
  emailLastAttemptAt: Date,
  ipHash: { type: String, select: false, index: true },
  submissionKey: { type: String, select: false, unique: true, sparse: true },
}, {
  timestamps: true,
  versionKey: false,
});

ContactSchema.index({ ipHash: 1, createdAt: -1 });
ContactSchema.index({ phone: 1, createdAt: -1 });
ContactSchema.index({ createdAt: -1 });
ContactSchema.index({ emailStatus: 1, createdAt: -1 });

export default mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);
