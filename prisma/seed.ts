import client from '../src/config/database';
import {
    terms,
    categories,
    teachers,
    disciplines,
    teachersDisciplines,
} from '../factory/intialDataFactory';
import {
    createTerms,
    createCategories,
    createTeachers,
    createDisciplines,
    createTeachersDisciplines,
} from '../src/repositories/seedRepository';

export async function main() {
    await client.$executeRaw`TRUNCATE TABLE "tests", "categories","teachersDisciplines","teachers","disciplines","terms" RESTART IDENTITY`;

    await createTerms(terms);
    await createCategories(categories);
    await createTeachers(teachers);
    await createDisciplines(disciplines);
    await createTeachersDisciplines(teachersDisciplines);
}

main()
    .catch((e) => {
        console.log(e);
        process.exit(1);
    })
    .finally(() => {
        client.$disconnect();
    });
