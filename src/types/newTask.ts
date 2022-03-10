export interface NewTaskProps {
  uid: string;
  deskObjName: string;
}

export interface NewTaskAddProps {
  uid: string;
  deskObjName: string;
  handleActive: () => void;
}
