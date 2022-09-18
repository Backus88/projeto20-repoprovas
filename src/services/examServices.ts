import {
    insertTest,
    findCategoryByName,
    findByTeacherAndDiscipline,
    findDisciplineByName,
    findTeacherByName,
    findAllTerms,
    findByTeacher,
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

export async function getTestsByTerms() {
    const data: any = await findAllTerms();
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
                            tests[j].teacherName =
                                tests[j].teacher.teacher.name;
                            delete tests[j].teacher;
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

export async function getTestsByTeacher() {
    let id = null;
    let desciplineName = null;
    const data: any = await findByTeacher();
    for (const v of data) {
        for (const z of v.teacherDiscipline) {
            id = z.id;
            desciplineName = z.discipline.name;
            delete z.discipline;
            if (z.test.length > 0) {
                for (const y of z.test) {
                    for (
                        let index = 0;
                        index < y.category.tests.length;
                        index++
                    ) {
                        y.category.tests[index].discipline = desciplineName;
                        if (
                            id !== y.category.tests[index].teacherDisciplineId
                        ) {
                            y.category.tests.splice(index, 1);
                            index--;
                        }
                    }
                }
            }
        }
    }

    return data;
}
