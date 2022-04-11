export interface ChangeDeskNameProps {
  handleChanging: () => void;
}

export interface ChangeColumnProps {
  uid: string;
  deskObjId: number;
  handleChanging: () => void;
}

export interface ChangeTaskProps {
  uid: string;
  columnObjId: number;
  deskObjId: number;
  handleChanging: () => void;
}
