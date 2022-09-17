import client from '../config/database';
import { testsInsertType } from '../types/types';

export async function insertTest(test: testsInsertType) {
    await client.tests.create({ data: test });
}

export async function findCategoryByName(name: string) {
    return await client.categories.findUnique({
        where: {
            name: name,
        },
    });
}

export async function findCategoryById(id: number) {
    return await client.categories.findUnique({
        where: {
            id: id,
        },
    });
}

export async function findTeacherById(id: number) {
    return await client.teachers.findUnique({
        where: {
            id: id,
        },
    });
}

export async function findTeacherByName(name: string) {
    return await client.teachers.findUnique({
        where: {
            name: name,
        },
    });
}

export async function findDisciplineByName(name: string) {
    return await client.disciplines.findUnique({
        where: {
            name: name,
        },
    });
}

export async function findByTeacherAndDiscipline(
    teacherId: number,
    disciplineId: number
) {
    return await client.teacherDisciplines.findMany({
        where: {
            teacherId: teacherId,
            disciplineId: disciplineId,
        },
    });
}
