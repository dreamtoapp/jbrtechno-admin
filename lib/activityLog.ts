'use server';

import { prisma } from '@/lib/prisma';

export type ActivityType =
  | 'USER_LOGIN'
  | 'USER_LOGOUT'
  | 'USER_CREATED'
  | 'USER_UPDATED'
  | 'USER_DELETED'
  | 'USER_ACTIVATED'
  | 'USER_DEACTIVATED'
  | 'STAFF_CREATED'
  | 'STAFF_UPDATED'
  | 'STAFF_DELETED'
  | 'NOTE_CREATED'
  | 'NOTE_UPDATED'
  | 'NOTE_DELETED'
  | 'NOTE_READ'
  | 'TASK_CREATED'
  | 'TASK_UPDATED'
  | 'TASK_COMPLETED'
  | 'PERMISSION_UPDATED'
  | 'OTHER';

export interface ActivityLogEntry {
  userId: string;
  type: ActivityType;
  description: string;
  metadata?: Record<string, unknown>;
}

export async function logActivity(entry: ActivityLogEntry): Promise<void> {
  try {
    // Store activity log in database
    // Note: You may want to create an ActivityLog model in Prisma schema for production
    // For now, we'll use console logging and can extend to database storage
    
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${entry.type} - User: ${entry.userId} - ${entry.description}`;
    
    // In production, you might want to:
    // 1. Create an ActivityLog model in Prisma
    // 2. Store logs in database
    // 3. Implement log rotation/archival
    
    // For now, log to console (can be replaced with database storage)
    if (process.env.NODE_ENV === 'development') {
      console.log(logMessage, entry.metadata || '');
    }

    // TODO: Implement database storage when ActivityLog model is added to schema
    // await prisma.activityLog.create({
    //   data: {
    //     userId: entry.userId,
    //     type: entry.type,
    //     description: entry.description,
    //     metadata: entry.metadata || {},
    //   },
    // });
  } catch (error) {
    // Don't throw - activity logging should not break the main flow
    console.error('Error logging activity:', error);
  }
}

export async function getUserActivityLogs(
  userId: string,
  limit: number = 50
): Promise<ActivityLogEntry[]> {
  try {
    // TODO: Implement when ActivityLog model is added
    // return await prisma.activityLog.findMany({
    //   where: { userId },
    //   orderBy: { createdAt: 'desc' },
    //   take: limit,
    // });
    
    return [];
  } catch (error) {
    console.error('Error fetching activity logs:', error);
    return [];
  }
}





