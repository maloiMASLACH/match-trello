export interface ChangeDeskNameProps {
  handleChanging: () => void;
}

export interface ChangeColumnProps {
  uid: string;
  deskObjName: string;
  handleChanging: () => void;
}

export interface ChangeTaskProps {
  uid: string;
  columnObjName: string;
  deskObjName: string;
  handleChanging: () => void;
}
