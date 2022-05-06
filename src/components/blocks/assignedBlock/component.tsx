import React, { useState } from 'react';
import { AssignedBlockProps } from '../../../types';
import OpenedAssignBlock from './component/openedBlock';
import OpenedHead from './component/openedHead';
import './styles.css';

const AssignedBlock = (props: AssignedBlockProps) => {
  const { isActive, handleActive, assignments } = props;

  const [isOpen, setOpenColumn] = useState<boolean>(false);

  let taskCount = 0;

  if (assignments) {
    taskCount = Object.values(assignments).reduce(
      (acc, curr) => acc + Object.keys(curr.tasks || []).length,
      0,
    );
  }

  const handleOpen = () => {
    setOpenColumn((prevState) => !prevState);
    handleActive();
  };

  return !isOpen ? (
    <div className={`assignedBlock ${isActive && 'active'}`}>
      <div className="deskHead">
        <h4>Assignments</h4>
        <i
          className="fa fa-eye table"
          aria-hidden="true"
          onClick={handleOpen}
        />
      </div>
      <p>{`${taskCount} tasks`}</p>
    </div>
  ) : (
    <>
      <OpenedHead handleOpen={handleOpen} />
      <OpenedAssignBlock assignments={assignments} />
    </>
  );
};

export default AssignedBlock;
