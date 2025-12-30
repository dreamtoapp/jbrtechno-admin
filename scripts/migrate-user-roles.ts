import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Starting user role migration...');

  try {
    // Use raw MongoDB query to find users with ADMIN role
    const result = await prisma.$runCommandRaw({
      find: 'User',
      filter: { role: 'ADMIN' },
    }) as any;

    const usersWithAdminRole = result?.cursor?.firstBatch || [];

    if (usersWithAdminRole.length === 0) {
      console.log('✅ No users with ADMIN role found. Migration not needed.');
      return;
    }

    console.log(`Found ${usersWithAdminRole.length} user(s) with ADMIN role. Migrating to SUPER_ADMIN...`);

    // Update all ADMIN users to SUPER_ADMIN using raw MongoDB update
    for (const user of usersWithAdminRole) {
      try {
        await prisma.$runCommandRaw({
          update: 'User',
          updates: [
            {
              q: { _id: user._id },
              u: { $set: { role: 'SUPER_ADMIN' } },
            },
          ],
        });
        console.log(`✅ Updated user ${user.email || user._id} from ADMIN to SUPER_ADMIN`);
      } catch (error) {
        console.error(`❌ Failed to update user ${user.email || user._id}:`, error);
      }
    }

    console.log('✅ User role migration completed!');
  } catch (error: any) {
    if (error.message?.includes('User') || error.message?.includes('collection')) {
      console.log('⚠️  User collection might not exist or is not accessible.');
      return;
    }
    console.error('❌ Migration failed:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('❌ Migration failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

