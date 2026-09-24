import { describe, it, expect, vi } from 'vitest';
import { analyticsService } from '../analyticsService';
import { prisma } from '../../utils/prisma';

vi.mock('../../utils/prisma', () => ({
  prisma: {
    transaction: {
      aggregate: vi.fn(),
      findMany: vi.fn(),
    }
  }
}));

describe('AnalyticsService', () => {
  it('should calculate KPIs correctly', async () => {
    // Mock the aggregation to return dummy data
    (prisma.transaction.aggregate as any).mockResolvedValueOnce({
      _sum: { amount: 10000 },
      _count: { id: 100 }
    }).mockResolvedValueOnce({
      _sum: { amount: 8000 },
      _count: { id: 80 }
    });

    const kpis = await analyticsService.getKPIs('test_merchant', 'today');
    
    expect(kpis.sales.value).toBe(10000);
    expect(kpis.sales.change).toBe(25); // (10000 - 8000) / 8000 * 100
    
    expect(kpis.transactions.value).toBe(100);
    expect(kpis.transactions.change).toBe(25);
    
    expect(kpis.avgBill.value).toBe(100);
    expect(kpis.avgBill.change).toBe(0); // 100 vs 100
  });
});
