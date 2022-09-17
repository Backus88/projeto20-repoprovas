import {
    insertTest,
    findCategoryById,
    findCategoryByName,
    findTeacherById,
    findByTeacherAndDiscipline,
    findDisciplineByName,
    findTeacherByName,
} from '../repositories/examRepository';
import { testsInsertType } from '../types/types';
import { notFoundError } from '../utils/errorMessages';

export async function categoryExists(name: string) {
    const data = await findCategoryByName(name);
    if (!data) {
        throw notFoundError('category doesnt exist!!');
    }
    return data;
}

export async function disciplineExists(name: string) {
    const data = await findDisciplineByName(name);
    if (!data) {
        throw notFoundError('discipline doesnt exist!!');
    }
    return data;
}

export async function teacherExists(name: string) {
    const data = await findTeacherByName(name);
    if (!data) {
        throw notFoundError('teacher doesnt exist!!');
    }
    return data;
}

export async function teacherAndDisciplineExists(
    teacherId: number,
    disciplineId: number
) {
    const data = await findByTeacherAndDiscipline(teacherId, disciplineId);
    if (data.length === 0) {
        throw notFoundError('this teacher doesnt minister this discipline!!');
    }
    return data;
}

export async function createTest(test: testsInsertType) {
    await insertTest(test);
}
