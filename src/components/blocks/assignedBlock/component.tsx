import React from 'react';
import LocalStorageKeys from '../../../constants/localStorageKeys';
import { AssignedBlockProps } from '../../../types/assignmentPage';
import OpenedAssignBlock from './component/openedBlock';
import './styles.css';

const AssignedBlock = (props: AssignedBlockProps) => {
  const { assignments } = props;

  let taskCount = 0;

  if (assignments) {
    taskCount = Object.values(assignments).reduce(
      (acc, curr) => acc + Object.keys(curr.tasks || []).length,
      0,
    );
  }

  localStorage.setItem(LocalStorageKeys.Assignments, `${taskCount}`);

  return (
    <div className="assignedBlock">
      <div className="deskHead">
        <h3>Assignments</h3>
        <p>{`${taskCount} task(s)`}</p>
      </div>
      {assignments && <OpenedAssignBlock assignments={assignments} />}
    </div>
  );
};

export default AssignedBlock;
