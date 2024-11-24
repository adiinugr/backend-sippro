import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { faker } from '@faker-js/faker';

import * as schema from './schema/schema';

import 'dotenv/config';

const classroomArray = [
  { name: 'X-A' },
  { name: 'X-B' },
  { name: 'X-C' },
  { name: 'X-D' },
  { name: 'XI-A' },
  { name: 'XI-B' },
  { name: 'XI-C' },
  { name: 'XI-D' },
  { name: 'XII-A' },
  { name: 'XII-B' },
  { name: 'XII-C' },
  { name: 'XII-D' },
];

const subjectArray = [
  {
    code: 'PAI',
    name: 'Pendidikan Agama Islam',
  },
  {
    code: 'PP',
    name: 'Pendidikan Pancasila',
  },
  {
    code: 'BIN',
    name: 'Bahasa Indonesia',
  },
  {
    code: 'BING',
    name: 'Bahasa Inggris',
  },
  {
    code: 'MAT',
    name: 'Matematika',
  },
  {
    code: 'FIS',
    name: 'Fisika',
  },
  {
    code: 'KIM',
    name: 'Kimia',
  },
];

const lessonYearArray = [
  {
    name: '2023-2024',
  },
  {
    name: '2024-2025',
  },
  {
    name: '2025-2026',
  },
];

const gradeArray = [
  {
    name: 'X',
  },
  {
    name: 'XI',
  },
  {
    name: 'XII',
  },
];

const subjectGroupArray = ['Kelompok 1', 'Kelompok 2', 'Kelompok 3'];

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

const db = drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;

// async function deleteAll() {
//   await db.delete();
// }

async function main() {
  const insertedClassrooms = await db
    .insert(schema.classrooms)
    .values(classroomArray)
    .returning();

  const classroomIds = insertedClassrooms.map((classroom) => classroom.id);

  const insertedLessonYears = await db
    .insert(schema.lessonYears)
    .values(lessonYearArray)
    .returning();

  const lessonYearIds = insertedLessonYears.map((lessonYear) => lessonYear.id);

  const insertedGrades = await db
    .insert(schema.grades)
    .values(gradeArray)
    .returning();

  const gradeIds = insertedGrades.map((grade) => grade.id);

  // const insertedSubjects = await db
  //   .insert(schema.subjects)
  //   .values(subjectArray)
  //   .returning();

  // const subjectIds = insertedSubjects.map((subject) => subject.id);

  const studentIds = await Promise.all(
    Array(50)
      .fill('')
      .map(async () => {
        const student = await db
          .insert(schema.students)
          .values({
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: '',
          })
          .returning();

        return student[0].id;
      }),
  );

  // const subjectGroupIds = await Promise.all(
  //   Array(10)
  //     .fill('')
  //     .map(async () => {
  //       const subjectGroup = await db
  //         .insert(schema.subjectGroups)
  //         .values({
  //           name: faker.helpers.arrayElement(subjectGroupArray),
  //           lessonYearId: faker.helpers.arrayElement(lessonYearIds),
  //         })
  //         .returning();

  //       return subjectGroup[0].id;
  //     }),
  // );

  // await Promise.all(
  //   studentIds.map(async (studentId) => {
  //     return await db
  //       .insert(schema.studentsToSubjectGroups)
  //       .values({
  //         studentId,
  //         subjectGroupId: faker.helpers.arrayElement(subjectGroupIds),
  //       })
  //       .returning();
  //   }),
  // );

  // await Promise.all(
  //   subjectIds.map(async (subjectId) => {
  //     return await db
  //       .insert(schema.subjectsToSubjectGroups)
  //       .values({
  //         subjectId,
  //         subjectGroupId: faker.helpers.arrayElement(subjectGroupIds),
  //       })
  //       .returning();
  //   }),
  // );

  // await Promise.all(
  //   gradeIds.map(async (gradeId) => {
  //     return await db
  //       .insert(schema.gradesToSubjectGroups)
  //       .values({
  //         gradeId,
  //         subjectGroupId: faker.helpers.arrayElement(subjectGroupIds),
  //       })
  //       .returning();
  //   }),
  // );

  // await Promise.all(
  //   lessonYearIds.map(async (lessonYearId) => {
  //     return await db
  //       .insert(schema.classroomsToLessonYears)
  //       .values({
  //         lessonYearId,
  //         classroomId: faker.helpers.arrayElement(classroomIds),
  //       })
  //       .returning();
  //   }),
  // );
}

// main()
//   .then()
//   .catch((err) => {
//     console.log(err);
//     process.exit(0);
//   });
