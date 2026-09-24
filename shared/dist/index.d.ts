import { z } from 'zod';
export declare const RequestOtpSchema: z.ZodObject<{
    phone: z.ZodString;
}, "strip", z.ZodTypeAny, {
    phone: string;
}, {
    phone: string;
}>;
export type RequestOtpDto = z.infer<typeof RequestOtpSchema>;
export declare const VerifyOtpSchema: z.ZodObject<{
    phone: z.ZodString;
    code: z.ZodString;
}, "strip", z.ZodTypeAny, {
    phone: string;
    code: string;
}, {
    phone: string;
    code: string;
}>;
export type VerifyOtpDto = z.infer<typeof VerifyOtpSchema>;
export declare const UpdateProfileSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    shopName: z.ZodOptional<z.ZodString>;
    businessType: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    shopName?: string | undefined;
    businessType?: string | undefined;
    city?: string | undefined;
}, {
    name?: string | undefined;
    shopName?: string | undefined;
    businessType?: string | undefined;
    city?: string | undefined;
}>;
export type UpdateProfileDto = z.infer<typeof UpdateProfileSchema>;
export declare const CampaignGenerateSchema: z.ZodObject<{
    recommendationId: z.ZodOptional<z.ZodString>;
    productName: z.ZodOptional<z.ZodString>;
    objective: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    recommendationId?: string | undefined;
    productName?: string | undefined;
    objective?: string | undefined;
}, {
    recommendationId?: string | undefined;
    productName?: string | undefined;
    objective?: string | undefined;
}>;
export type CampaignGenerateDto = z.infer<typeof CampaignGenerateSchema>;
export declare enum PaymentMode {
    UPI = "UPI",
    CARD = "CARD",
    WALLET = "WALLET",
    CASH = "CASH"
}
export declare enum TransactionStatus {
    SUCCESS = "SUCCESS",
    FAILED = "FAILED",
    PENDING = "PENDING"
}
export declare enum InsightType {
    SALES_DROP = "SALES_DROP",
    SALES_SPIKE = "SALES_SPIKE",
    CASHFLOW_WARNING = "CASHFLOW_WARNING",
    PRODUCT_PERFORMANCE = "PRODUCT_PERFORMANCE"
}
export declare enum InsightSeverity {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH"
}
export declare enum InsightStatus {
    NEW = "NEW",
    VIEWED = "VIEWED",
    ACTIONED = "ACTIONED"
}
export declare enum CampaignStatus {
    DRAFT = "DRAFT",
    LIVE = "LIVE",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED"
}
export declare enum ForecastKind {
    SALES = "SALES",
    CASHFLOW = "CASHFLOW"
}
