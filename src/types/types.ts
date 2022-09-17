import { Users } from '@prisma/client';

export type userInsertType = Omit<Users, 'id'>;
