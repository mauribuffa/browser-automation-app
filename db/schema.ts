import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

// Example table — replace with your own schema.
export const demoUsers = pgTable('demo_users', {
  id: serial('id').primaryKey(),
  name: text('name'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
