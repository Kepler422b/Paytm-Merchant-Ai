import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clean up existing data
  await prisma.merchant.deleteMany();
  // (Cascade deletes will handle the rest)

  // 1. Create Demo Merchant
  const merchant = await prisma.merchant.create({
    data: {
      phone: '9999999999',
      name: 'Rahul Sharma',
      shopName: 'Sharma Kirana Store',
      businessType: 'Retail',
      city: 'Mumbai',
    },
  });

  // 2. Create Products
  const categories = ['Dairy', 'Snacks', 'Beverages', 'Staples', 'Personal Care'];
  const productsData = Array.from({ length: 40 }).map((_, i) => ({
    merchantId: merchant.id,
    name: `Product ${i + 1}`,
    category: categories[i % categories.length],
    price: Math.floor(Math.random() * 200) + 20,
    cost: Math.floor(Math.random() * 100) + 10,
  }));
  
  await prisma.product.createMany({ data: productsData });
  const products = await prisma.product.findMany({ where: { merchantId: merchant.id } });

  // 3. Create Customers
  const customersData = Array.from({ length: 800 }).map((_, i) => ({
    merchantId: merchant.id,
    phoneHash: `hash_${i}`,
    firstSeenAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 90 days ago
  }));

  await prisma.customer.createMany({ data: customersData });
  const customers = await prisma.customer.findMany({ where: { merchantId: merchant.id } });

  // 4. Generate 90 days of Transactions
  console.log('Generating 90 days of transactions...');
  const transactions = [];
  const now = new Date();
  
  for (let d = 90; d >= 0; d--) {
    const date = new Date(now);
    date.setDate(date.getDate() - d);
    date.setHours(0, 0, 0, 0);

    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    let baseTxns = isWeekend ? 150 : 100;
    
    // Add some noise
    baseTxns += Math.floor(Math.random() * 40) - 20;

    for (let i = 0; i < baseTxns; i++) {
      // Realistic hour distribution: peaks in evening (17-20) and morning (9-11)
      let hour = Math.floor(Math.random() * 24);
      const r = Math.random();
      if (r < 0.4) {
        hour = 17 + Math.floor(Math.random() * 4); // 17-20
      } else if (r < 0.7) {
        hour = 9 + Math.floor(Math.random() * 3); // 9-11
      }

      const txDate = new Date(date);
      txDate.setHours(hour, Math.floor(Math.random() * 60), Math.floor(Math.random() * 60));

      const product = products[Math.floor(Math.random() * products.length)];
      const customer = customers[Math.floor(Math.random() * customers.length)];
      const paymentModes = ['UPI', 'UPI', 'UPI', 'CARD', 'CASH']; // Mostly UPI

      transactions.push({
        merchantId: merchant.id,
        customerId: customer.id,
        productId: product.id,
        amount: product.price * (Math.floor(Math.random() * 3) + 1), // 1-3 items
        paymentMode: paymentModes[Math.floor(Math.random() * paymentModes.length)],
        status: 'SUCCESS',
        createdAt: txDate,
      });
    }
  }

  // Insert transactions in chunks to avoid SQLite limits
  const chunkSize = 5000;
  for (let i = 0; i < transactions.length; i += chunkSize) {
    await prisma.transaction.createMany({
      data: transactions.slice(i, i + chunkSize),
    });
    console.log(`Inserted ${Math.min(i + chunkSize, transactions.length)} / ${transactions.length} transactions`);
  }

  // 5. Create past Campaigns
  const rec1 = await prisma.recommendation.create({
    data: {
      insight: {
        create: {
          merchantId: merchant.id,
          type: 'SALES_DROP',
          severity: 'MEDIUM',
          title: 'Weekend Sales Dip',
          cause: 'Lower footfall on Sunday mornings',
          metricDelta: -15.5,
          confidence: 0.85,
          status: 'ACTIONED',
          createdAt: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000),
        }
      },
      title: 'Sunday Morning Special',
      description: 'Offer flat ₹50 off on orders above ₹300',
      estUpliftRupees: 1500,
      estExtraOrders: 20,
      confidence: 0.78,
    }
  });

  await prisma.campaign.create({
    data: {
      merchantId: merchant.id,
      recommendationId: rec1.id,
      name: 'Sunday Special',
      offerText: '₹50 OFF on ₹300',
      discountValue: 50,
      minOrderValue: 300,
      startHour: 8,
      endHour: 12,
      audience: 'All Customers',
      status: 'COMPLETED',
      startedAt: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000),
      endedAt: new Date(now.getTime() - 13 * 24 * 60 * 60 * 1000),
      results: {
        create: {
          date: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000),
          redemptions: 18,
          extraRevenue: 1350,
        }
      }
    }
  });

  // 6. Initial Growth Score
  await prisma.growthScore.create({
    data: {
      merchantId: merchant.id,
      score: 72,
      breakdown: JSON.stringify({
        salesGrowth: 75,
        retention: 60,
        peakUtilization: 80,
        digitalAdoption: 90,
        cashFlow: 65,
      }),
      createdAt: now,
    }
  });

  console.log('Seeding complete! Merchant phone: 9999999999 (OTP: 123456)');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
