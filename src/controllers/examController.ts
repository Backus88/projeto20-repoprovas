import { Request, Response } from 'express';
import { Body, testsInsertType } from '../types/types';
import {
    categoryExists,
    disciplineExists,
    teacherExists,
    teacherAndDisciplineExists,
    createTest,
    getTestsByTerms,
    getTestsByTeacher,
} from '../services/examServices';

export async function controlExamCreation(req: Request, res: Response) {
    const exam: Body = req.body;
    const category = await categoryExists(exam.category);
    const discipline = await disciplineExists(exam.discipline);
    const teacher = await teacherExists(exam.teacher);
    const relation = await teacherAndDisciplineExists(
        teacher.id,
        discipline.id
    );
    console.log(relation);
    const newExam: testsInsertType = {
        name: exam.name,
        pdfUrl: exam.pdfUrl,
        categoryId: category.id,
        teacherDisciplineId: relation[0].id,
    };
    console.log(newExam);
    await createTest(newExam);
    res.sendStatus(201);
    return;
}

export async function controlGetExams(req: Request, res: Response) {
    const data = await getTestsByTerms();
    res.send(data).status(200);
}

export async function controlExamsTeachers(req: Request, res: Response) {
    const data = await getTestsByTeacher();
    res.send(data).status(200);
}
