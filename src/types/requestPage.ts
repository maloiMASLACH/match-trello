export interface RequestType {
  taskName: string;
  completed: boolean;
  date: string;
  description: string,
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

export interface RequestListProps{
  uid: string;
  requester: RequestGroupType;
}

export interface SenderListProps{
  uid: string;
  requester: SenderGroupType;
}

export interface RequestPageWithUserProps {
  userId:string;
}

export interface RequestSendFormProps {
  uid: string
  userMail: string;
  userKey: string
}

export interface RequestTaskProps{
  uid: string;
  task: RequestType;
  received: boolean;
}

export interface ChangeRequestTaskProps{
  uid: string;
  task: RequestType;
  received: boolean
  handleChanging: () => void;
}
