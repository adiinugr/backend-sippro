export const lessonYears = [
  {
    id: 1,
    name: '2023-2024',
    subjectGroups: [
      {
        id: 1,
        name: 'Umum',
        grade: {
          id: 1,
          name: 'X',
        },
        subject: [
          {
            id: 1,
            code: 'PAI',
            name: 'Pendidikan Agama Islam',
          },
          {
            id: 2,
            code: 'BIN',
            name: 'Bahasa Indonesia',
          },
        ],
        student: [
          {
            id: 1,
            name: 'Anwar',
            classrom: {
              id: 1,
              name: 'X-A',
            },
          },
          {
            id: 2,
            name: 'Joko',
            classrom: {
              id: 1,
              name: 'X-B',
            },
          },
        ],
      },
    ],
  },
];

export const students = [
  {
    id: 1,
    name: 'Joko',
    subjectGroup: [
      {
        id: 1,
        name: 'Umum',
        lessonYear: {
          id: 1,
          name: '2024-2025',
        },
        subject: [
          {
            id: 1,
            code: 'PAI',
            name: 'Pendidikan Agama Islam',
          },
        ],
      },
    ],
  },
];
