import { PrismaClient, UserRole, TaskStatus, TaskPriority, NoteType, TargetAudience } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Create default SUPER_ADMIN user
  const superAdmin = await prisma.user.upsert({
    where: { email: 'nadish' },
    update: {},
    create: {
      email: 'nadish',
      password: 'Leno_1972', // Plain text password
      role: UserRole.SUPER_ADMIN,
      name: 'Nadish',
      isActive: true,
    },
  });

  console.log('✅ Created SUPER_ADMIN user:', superAdmin.email);

  // Note: ADMIN role no longer exists, only SUPER_ADMIN and STAFF
  console.log('ℹ️  User roles: SUPER_ADMIN and STAFF only');

  // Migrate existing users to user-based permissions (if they don't have routes assigned yet)
  console.log('🔄 Ensuring STAFF users have route permissions...');
  const allStaffUsers = await prisma.user.findMany({
    where: {
      role: UserRole.STAFF,
    },
    include: {
      permissions: true,
    },
  });

  // Only assign routes to users who don't have any routes assigned yet
  let migratedCount = 0;
  for (const user of allStaffUsers) {
    // Skip if user already has permissions assigned
    if (user.permissions.length > 0) {
      continue;
    }

    // Default routes for new STAFF users (can be customized by SUPER_ADMIN later)
    const defaultStaffRoutes = [
      '/',
      '/applications',
      '/contact-messages',
      '/tasks/my-tasks',
      '/my-time',
      '/notes',
      '/settings',
    ];

    // Create UserRoutePermission records for default routes
    for (const route of defaultStaffRoutes) {
      await prisma.userRoutePermission.upsert({
        where: {
          userId_route: {
            userId: user.id,
            route,
          },
        },
        update: {},
        create: {
          userId: user.id,
          route,
        },
      });
    }

    migratedCount++;
    console.log(`  ✅ Assigned default routes to user: ${user.email} (${defaultStaffRoutes.length} routes)`);
  }

  if (migratedCount > 0) {
    console.log(`✅ Assigned default routes to ${migratedCount} STAFF user(s)`);
  } else {
    console.log('  ℹ️  All STAFF users already have routes assigned');
  }

  // Seed Tasks and ManagementNotes
  console.log('📝 Seeding tasks and management notes...');

  // Get or create a staff user for task assignment
  let staffUser = await prisma.user.findFirst({
    where: { role: UserRole.STAFF },
  });

  if (!staffUser) {
    staffUser = await prisma.user.create({
      data: {
        email: 'staff@example.com',
        password: 'password123',
        role: UserRole.STAFF,
        name: 'Test Staff',
        isActive: true,
      },
    });
    console.log('  ✅ Created test staff user for seeding');
  }

  // Get admin user (superAdmin) for creating tasks and notes
  const adminUser = superAdmin;

  // Create dummy tasks
  const taskTitles = [
    'Review and update documentation',
    'Implement new feature for dashboard',
    'Fix bug in authentication flow',
    'Prepare monthly report',
    'Update user interface components',
    'Optimize database queries',
    'Write unit tests for new module',
    'Code review for pull request',
  ];

  const taskDescriptions = [
    'Please review the current documentation and update any outdated information.',
    'Implement the new analytics feature as discussed in the meeting.',
    'There is a bug in the login flow that needs to be fixed urgently.',
    'Prepare the monthly performance report for management review.',
    'Update the UI components to match the new design system.',
    'Optimize slow database queries to improve performance.',
    'Write comprehensive unit tests for the new payment module.',
    'Review the code changes in PR #123 before merging.',
  ];

  const createdTasks = [];
  for (let i = 0; i < 8; i++) {
    const statuses: TaskStatus[] = [TaskStatus.PENDING, TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED];
    const priorities: TaskPriority[] = [TaskPriority.LOW, TaskPriority.MEDIUM, TaskPriority.HIGH];

    const task = await prisma.task.create({
      data: {
        title: taskTitles[i],
        description: taskDescriptions[i],
        status: statuses[i % statuses.length],
        priority: priorities[i % priorities.length],
        assignedToUserId: staffUser.id,
        createdByUserId: adminUser.id,
        dueDate: i % 2 === 0 ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) : null,
        completedAt: statuses[i % statuses.length] === TaskStatus.COMPLETED ? new Date() : null,
      },
    });
    createdTasks.push(task);
  }

  console.log(`  ✅ Created ${createdTasks.length} tasks`);

  // Create dummy management notes
  const notes = [
    {
      title: 'Welcome to the Team!',
      content: 'We are excited to have you on board. Please familiarize yourself with our processes and don\'t hesitate to ask questions.',
      type: NoteType.ANNOUNCEMENT,
      targetAudience: TargetAudience.ALL,
      isImportant: true,
    },
    {
      title: 'Excellent Work on the Project',
      content: 'Your dedication and attention to detail on the recent project was outstanding. Keep up the great work!',
      type: NoteType.TASK,
      targetAudience: TargetAudience.SPECIFIC_USER,
      targetUserId: staffUser.id,
      isImportant: false,
    },
    {
      title: 'Time Management Improvement Needed',
      content: 'Please work on improving time management skills. Try to prioritize tasks better and meet deadlines more consistently.',
      type: NoteType.GENERAL,
      targetAudience: TargetAudience.SPECIFIC_USER,
      targetUserId: staffUser.id,
      isImportant: false,
    },
    {
      title: 'Q4 Performance Bonus',
      content: 'Congratulations on your excellent performance this quarter! You have earned a performance bonus.',
      type: NoteType.REWARD,
      targetAudience: TargetAudience.SPECIFIC_USER,
      targetUserId: staffUser.id,
      rewardAmount: 5000,
      rewardCurrency: 'SAR',
      isImportant: true,
    },
    {
      title: 'Holiday Gift',
      content: 'As a token of appreciation, please accept this holiday gift. Thank you for your hard work throughout the year.',
      type: NoteType.REWARD,
      targetAudience: TargetAudience.STAFF,
      rewardAmount: 1000,
      rewardCurrency: 'SAR',
      isImportant: false,
    },
  ];

  const createdNotes = [];
  for (const noteData of notes) {
    const note = await prisma.managementNote.create({
      data: {
        ...noteData,
        createdByUserId: adminUser.id,
        readBy: [],
      },
    });
    createdNotes.push(note);
  }

  console.log(`  ✅ Created ${createdNotes.length} management notes`);
  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


