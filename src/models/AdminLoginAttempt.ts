import mongoose, { Document, Schema } from 'mongoose';

export interface IAdminLoginAttempt extends Document {
  key: string;
  attempts: number;
  windowStartedAt: Date;
  blockedUntil?: Date;
  expiresAt: Date;
}

const AdminLoginAttemptSchema = new Schema<IAdminLoginAttempt>({
  key: { type: String, required: true, unique: true },
  attempts: { type: Number, required: true, default: 0 },
  windowStartedAt: { type: Date, required: true },
  blockedUntil: Date,
  expiresAt: { type: Date, required: true, expires: 0 },
}, {
  versionKey: false,
});

export default mongoose.models.AdminLoginAttempt
  || mongoose.model<IAdminLoginAttempt>('AdminLoginAttempt', AdminLoginAttemptSchema);
