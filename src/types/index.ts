import { UsersListProps } from './blocks/adminPage';
import { AppPageProps } from './blocks/appPage';
import {
  AppointeeType,
  AssignedBlockProps,
  OpenedHeadProps,
  OpenedAssignedBlockProps,
} from './blocks/assignedTask';
import { DeskWithInfoProps } from './blocks/deskWithInfo';
import { ErrorBLockProps } from './blocks/errorBlock';
import { NavBarProps } from './blocks/navBar';
import { NewColumnProps, NewColumnAddProps } from './blocks/newColumn';
import { NewTaskProps, NewTaskAddProps } from './blocks/newTask';
import { OpenedColumnProps } from './blocks/openedColumn';
import { ColumnProps } from './blocks/openedDesk';
import { CheckIsCorrectProps } from './blocks/passwordReset';
import { TaskProps } from './blocks/taskBlock';
import { TextAreaProps } from './blocks/textAreaBlock';
import { PageWithUserProps, UserPageProps } from './blocks/userPage';
import { StartButtonProps } from './controls/button';
import {
  ChangeDeskNameProps,
  ChangeColumnProps,
  ChangeTaskProps,
} from './controls/changeInput';
import { InputBlockProps } from './controls/input';
import { ChangeLinkProps } from './controls/passwordChangeLink';
import { SelectProps } from './controls/select';
import { HandleChanging, HandleActive, HandleOpened } from './controls/toggle';
import { ActiveImgProps } from './controls/activeImg';
import { DropProps } from './utils/dragAndDrop';
import {
  TaskType,
  ColumnType,
  DeskType,
  UserType,
  AuthUserType,
} from './utils/globalTypes';

export type {
  UsersListProps,
  AppPageProps,
  AppointeeType,
  AssignedBlockProps,
  OpenedHeadProps,
  OpenedAssignedBlockProps,
  DeskWithInfoProps,
  ErrorBLockProps,
  NavBarProps,
  NewColumnProps,
  NewColumnAddProps,
  NewTaskProps,
  NewTaskAddProps,
  OpenedColumnProps,
  ColumnProps,
  CheckIsCorrectProps,
  TaskProps,
  TextAreaProps,
  PageWithUserProps,
  UserPageProps,
  StartButtonProps,
  ChangeDeskNameProps,
  ChangeColumnProps,
  ChangeTaskProps,
  InputBlockProps,
  ChangeLinkProps,
  SelectProps,
  HandleChanging,
  HandleActive,
  HandleOpened,
  ActiveImgProps,
  DropProps,
  TaskType,
  ColumnType,
  DeskType,
  UserType,
  AuthUserType,
};
