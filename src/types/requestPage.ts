interface TaskType {
  taskName: string;
  completed: boolean;
  date: string;
  description: string,
  id: number;
}

export interface RequestsType {
  sended: { [key: number]: SenderGroupType };
  received: { [key: number]: RequestGroupType };
}

export interface RequestGroupType {
  sender: SenderType;
  tasks: { [key: number]: TaskType };
}

export interface SenderGroupType {
  sender: SenderType;
  tasks: { [key: number]: string };
}

export interface SenderType {
  key: string;
  mail: string;
}

export interface RequestListProps{
  requester: RequestGroupType;
}

export interface SenderListProps{
  requester: SenderGroupType;
}

export interface RequestPageWithUserProps {
  userId:string;
}

export interface RequestSendFormProps {
  userMail: string;
  userKey: string
}

export interface RequestTaskProps{
  task: TaskType;
  received: boolean;
}

export interface ChangeRequestTaskProps{
  task: TaskType;
  received: boolean
  handleChanging: () => void;
}
