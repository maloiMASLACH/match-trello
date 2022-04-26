import { ColumnType, DeskType, TaskType } from '../../types/globalTypes';

export const desksChecker = (desks: DeskType[], userMail: string) => {
  desks.forEach((desk) => {
    let isMatch = false;

    Object.values(desk.columns || []).forEach((column) => {
      Object.values(column.tasks || []).forEach((task) => {
        if (task.forUser === userMail) {
          isMatch = true;
        }
      });
    });

    if (!isMatch) {
      desks.splice(desks.indexOf(desk), 1);
    }
  });

  return (desks);
};

export const columnChecker = (columns: ColumnType[], userMail: string) => {
  columns.forEach((column) => {
    let isMatch = false;

    Object.values(column.tasks || []).forEach((task) => {
      if (task.forUser === userMail) {
        isMatch = true;
      }
    });

    if (!isMatch) {
      columns.splice(columns.indexOf(column), 1);
    }
  });

  return (columns);
};

export const taskChecker = (tasks: TaskType[], userMail: string) => {
  tasks.forEach((task) => {
    let isMatch = false;

    if (task.forUser === userMail) {
      isMatch = true;
    }

    if (!isMatch) {
      tasks.splice(tasks.indexOf(task), 1);
    }
  });

  return (tasks);
};
