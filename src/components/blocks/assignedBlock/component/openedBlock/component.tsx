import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import RouterLinks from '../../../../../constants/routerLinks';
import { AssignedBlockProps } from '../../../../../types/assignmentPage';
import './styles.css';

const OpenedAssignBlock = (props: AssignedBlockProps) => {
  const { assignments } = props;

  const [isOpen, setOpenColumn] = useState<boolean>(true);

  const handleActive = () => {
    setOpenColumn((prevState) => !prevState);
  };

  return (
    <>
      {Object.values(assignments || {}).map(
        (appointee) => appointee.tasks && (
        <div key={appointee.from} className="appointee">
          <div className="appointeeHead">
            <h4>{appointee.from}</h4>
            <p>{Object.keys(appointee.tasks || {}).length}</p>
            <i
              className="fa fa-eye table"
              aria-hidden="true"
              onClick={handleActive}
            />
          </div>

          <div className="assignTasks">
            {isOpen
                  && Object.values(appointee.tasks || {}).map((task) => (
                    <NavLink
                      key={task.id}
                      to={`${RouterLinks.App}${task.fromUser}`}
                      className="assignedTask"
                    >
                      <p>{task.taskName}</p>
                      <p>{task.date}</p>
                    </NavLink>
                  ))}
          </div>
        </div>
        ),
      )}
    </>
  );
};

export default OpenedAssignBlock;
