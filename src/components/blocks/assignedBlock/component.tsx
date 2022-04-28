import React, { useState } from 'react';
import {
  AssignedBlockProps,
  OpenedHeadProps,
} from '../../../types/assignedTask';
import BackImg from '../../controls/images/back/component';
import OpenedAssignBlock from './component/openedBlock';
import './styles.css';

const OpenedHead = (props: OpenedHeadProps) => {
  const { handleOpen, handleActive } = props;

  return (
    <div className="openedHead">
      <BackImg
        className="back"
        onClick={() => {
          handleOpen();
          handleActive();
        }}
      />
      <h4>Assignments</h4>
    </div>
  );
};

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
  };

  return assignments.length ? (
    !isOpen ? (
      <div className={`assignedBlock ${isActive && 'active'}`}>
        <div className="deskHead">
          <h3>Assignments</h3>
          <i
            className="fa fa-eye table"
            aria-hidden="true"
            onClick={() => {
              handleActive();
              handleOpen();
            }}
          />
        </div>
        <p>{`${taskCount} tasks`}</p>
      </div>
    ) : (
      <>
        <OpenedHead handleActive={handleActive} handleOpen={handleOpen} />
        <OpenedAssignBlock assignments={assignments} />
      </>
    )
  ) : isOpen ? (
    <OpenedHead handleActive={handleActive} handleOpen={handleOpen} />
  ) : null;
};

export default AssignedBlock;
