import React, { useState } from 'react';
import { AssignedBlockProps } from '../../../types/assignedTask';
import OpenedAssignBlock from './component/openedBlock';
import './styles.css';

const AssignedBlock = (props: AssignedBlockProps) => {
  const { assignments } = props;

  const [isOpen, setOpenColumn] = useState<boolean>(false);

  let taskCount = 0;

  if (assignments) {
    taskCount = Object.values(assignments).reduce(
      (acc, curr) => acc + Object.keys(curr.tasks || []).length,
      0,
    );
  }

  const handleActive = () => {
    setOpenColumn((prevState) => !prevState);
  };

  return (
    <div className="assignedBlock">
      <div className="deskHead">
        <h3>Assignments</h3>
        <i
          className="fa fa-eye table"
          aria-hidden="true"
          onClick={handleActive}
        />
      </div>
      {isOpen ? assignments && <OpenedAssignBlock assignments={assignments} /> : <p>{`${taskCount} tasks`}</p>}
    </div>
  );
};

export default AssignedBlock;
