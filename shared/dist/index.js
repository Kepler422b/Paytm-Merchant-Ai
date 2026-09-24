"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForecastKind = exports.CampaignStatus = exports.InsightStatus = exports.InsightSeverity = exports.InsightType = exports.TransactionStatus = exports.PaymentMode = exports.CampaignGenerateSchema = exports.UpdateProfileSchema = exports.VerifyOtpSchema = exports.RequestOtpSchema = void 0;
const zod_1 = require("zod");
exports.RequestOtpSchema = zod_1.z.object({
    phone: zod_1.z.string().regex(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
});
exports.VerifyOtpSchema = zod_1.z.object({
    phone: zod_1.z.string().regex(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
    code: zod_1.z.string().length(6, 'OTP must be 6 digits'),
});
exports.UpdateProfileSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    shopName: zod_1.z.string().optional(),
    businessType: zod_1.z.string().optional(),
    city: zod_1.z.string().optional(),
});
exports.CampaignGenerateSchema = zod_1.z.object({
    recommendationId: zod_1.z.string().optional(),
    productName: zod_1.z.string().optional(),
    objective: zod_1.z.string().optional(),
});
// Common enums and types
var PaymentMode;
(function (PaymentMode) {
    PaymentMode["UPI"] = "UPI";
    PaymentMode["CARD"] = "CARD";
    PaymentMode["WALLET"] = "WALLET";
    PaymentMode["CASH"] = "CASH";
})(PaymentMode || (exports.PaymentMode = PaymentMode = {}));
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["SUCCESS"] = "SUCCESS";
    TransactionStatus["FAILED"] = "FAILED";
    TransactionStatus["PENDING"] = "PENDING";
})(TransactionStatus || (exports.TransactionStatus = TransactionStatus = {}));
var InsightType;
(function (InsightType) {
    InsightType["SALES_DROP"] = "SALES_DROP";
    InsightType["SALES_SPIKE"] = "SALES_SPIKE";
    InsightType["CASHFLOW_WARNING"] = "CASHFLOW_WARNING";
    InsightType["PRODUCT_PERFORMANCE"] = "PRODUCT_PERFORMANCE";
})(InsightType || (exports.InsightType = InsightType = {}));
var InsightSeverity;
(function (InsightSeverity) {
    InsightSeverity["LOW"] = "LOW";
    InsightSeverity["MEDIUM"] = "MEDIUM";
    InsightSeverity["HIGH"] = "HIGH";
})(InsightSeverity || (exports.InsightSeverity = InsightSeverity = {}));
var InsightStatus;
(function (InsightStatus) {
    InsightStatus["NEW"] = "NEW";
    InsightStatus["VIEWED"] = "VIEWED";
    InsightStatus["ACTIONED"] = "ACTIONED";
})(InsightStatus || (exports.InsightStatus = InsightStatus = {}));
var CampaignStatus;
(function (CampaignStatus) {
    CampaignStatus["DRAFT"] = "DRAFT";
    CampaignStatus["LIVE"] = "LIVE";
    CampaignStatus["COMPLETED"] = "COMPLETED";
    CampaignStatus["CANCELLED"] = "CANCELLED";
})(CampaignStatus || (exports.CampaignStatus = CampaignStatus = {}));
var ForecastKind;
(function (ForecastKind) {
    ForecastKind["SALES"] = "SALES";
    ForecastKind["CASHFLOW"] = "CASHFLOW";
})(ForecastKind || (exports.ForecastKind = ForecastKind = {}));
