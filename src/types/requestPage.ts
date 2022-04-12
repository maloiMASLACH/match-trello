export interface RequestType {
  taskName: string;
  completed: boolean;
  date: string;
  description: string;
  id: number;
}

export interface RequestsType {
  sended: { [key: number]: SenderGroupType };
  received: { [key: string]: RequestGroupType };
}

export interface RequestGroupType {
  sender: SenderType;
  tasks: { [key: number]: RequestType };
}

export interface SenderGroupType {
  sender: SenderType;
  tasks: { [key: number]: string };
}

export interface SenderType {
  key: string;
  mail: string;
}

export interface TaskListProps {
  tasks: { [key: number]: string } | { [key: number]: RequestType };
  currentId: string;
  received: boolean;
}

export interface RequestListProps {
  currentId: string;
  requester: RequestGroupType | SenderGroupType;
}

export interface RequestPageWithUserProps {
  currentId: string;
}

export interface RequestSendFormProps {
  currentId: string;
  userMail: string;
  userKey: string;
}

export interface RequestTaskProps {
  currentId: string;
  task: RequestType;
  received: boolean;
}

export interface ChangeRequestTaskProps {
  currentId: string;
  task: RequestType;
  received: boolean;
  handleChanging: () => void;
}
