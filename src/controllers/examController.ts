import { Request, Response } from 'express';
import { Body, testsInsertType } from '../types/types';
import {
    categoryExists,
    disciplineExists,
    teacherExists,
    teacherAndDisciplineExists,
    createTest,
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
}
