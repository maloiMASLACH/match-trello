export interface NewTaskProps {
  uid: string;
  deskObjId: number;
}

export interface NewTaskAddProps {
  uid: string;
  deskObjId: number;
  handleActive: () => void;
}
