import { Users, Tests } from '@prisma/client';

export type userInsertType = Omit<Users, 'id'>;
export type testsInsertType = Omit<Tests, 'id'>;
export interface Body {
    name: string;
    pdfUrl: string;
    category: string;
    discipline: string;
    teacher: string;
}
