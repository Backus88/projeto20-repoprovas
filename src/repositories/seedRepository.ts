import client from '../config/database';

export async function createTerms(terms: any[]) {
    await client.terms.createMany({ data: terms });
}

export async function createCategories(categories: any[]) {
    await client.categories.createMany({ data: categories });
}

export async function createTeachers(teachers: any[]) {
    await client.teachers.createMany({ data: teachers });
}

export async function createDisciplines(disciplines: any) {
    await client.disciplines.createMany({ data: disciplines });
}

export async function createTeachersDisciplines(teachersDisciplines: any[]) {
    await client.teacherDisciplines.createMany({ data: teachersDisciplines });
}
