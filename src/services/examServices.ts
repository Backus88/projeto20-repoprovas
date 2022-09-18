import {
    insertTest,
    findCategoryById,
    findCategoryByName,
    findTeacherById,
    findByTeacherAndDiscipline,
    findDisciplineByName,
    findTeacherByName,
    findAllTerms,
    findByCategories,
    findByTerms,
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

export async function getTestsByTeacherId() {
    const data = await findAllTerms();
    let id = null;
    let category;
    let tests;
    for (const v of data) {
        if (v.disciplines.length > 0) {
            for (const z of v.disciplines) {
                id = z.teacherDiscipline[0].id;
                category = z.teacherDiscipline[0].test;
                if (z.teacherDiscipline[0].test.length > 0) {
                    for (let index = 0; index < category.length; index++) {
                        tests = category[index].category.tests;
                        for (let j = 0; j < tests.length; j++) {
                            if (id !== tests[j].teacherDisciplineId) {
                                tests.splice(j, 1);
                                j--;
                            }
                        }
                    }
                }
            }
        }
    }
    return data;
}
