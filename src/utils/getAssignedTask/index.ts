import { UserType, AppointeeType, TaskType } from '../../types';

const getAssignedTasks = (users: { [key: string]: UserType }, userID: string) => {
  const columns:AppointeeType[] = [];

  Object.values(users).map((user) => {
    const taskObj:TaskType[] = [];

    Object.values(user.desks || []).map((desk) => (
      Object.values(desk.columns || []).map((column) => (
        Object.values(column.tasks || []).map((task) => (
          task.forUserId.slice(1) === userID && taskObj.push(task)
        ))
      ))
    ));

    const userObj:AppointeeType = {
      user: user.mail,
      userId: user.uid,
      tasks: taskObj,
    };

    return (taskObj.length && columns.push(userObj));
  });

  return columns;
};

export default getAssignedTasks;
