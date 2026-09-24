import { z } from 'zod';

export const RequestOtpSchema = z.object({
  phone: z.string().regex(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
});
export type RequestOtpDto = z.infer<typeof RequestOtpSchema>;

export const VerifyOtpSchema = z.object({
  phone: z.string().regex(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  code: z.string().length(6, 'OTP must be 6 digits'),
});
export type VerifyOtpDto = z.infer<typeof VerifyOtpSchema>;

export const UpdateProfileSchema = z.object({
  name: z.string().optional(),
  shopName: z.string().optional(),
  businessType: z.string().optional(),
  city: z.string().optional(),
});
export type UpdateProfileDto = z.infer<typeof UpdateProfileSchema>;

export const CampaignGenerateSchema = z.object({
  recommendationId: z.string().optional(),
  productName: z.string().optional(),
  objective: z.string().optional(),
});
export type CampaignGenerateDto = z.infer<typeof CampaignGenerateSchema>;

// Common enums and types
export enum PaymentMode {
  UPI = 'UPI',
  CARD = 'CARD',
  WALLET = 'WALLET',
  CASH = 'CASH',
}

export enum TransactionStatus {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  PENDING = 'PENDING',
}

export enum InsightType {
  SALES_DROP = 'SALES_DROP',
  SALES_SPIKE = 'SALES_SPIKE',
  CASHFLOW_WARNING = 'CASHFLOW_WARNING',
  PRODUCT_PERFORMANCE = 'PRODUCT_PERFORMANCE',
}

export enum InsightSeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export enum InsightStatus {
  NEW = 'NEW',
  VIEWED = 'VIEWED',
  ACTIONED = 'ACTIONED',
}

export enum CampaignStatus {
  DRAFT = 'DRAFT',
  LIVE = 'LIVE',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum ForecastKind {
  SALES = 'SALES',
  CASHFLOW = 'CASHFLOW',
}
