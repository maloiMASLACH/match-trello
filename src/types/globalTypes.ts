export interface TaskType {
  taskName: string;
  completed: boolean;
  date: string;
  id: number;
}
export interface ColumnType {
  tasks: TaskType[] | null[];
  columnName: string;
  id: number;
}
export interface DeskType{
  columns: ColumnType[] | null[];
  id: number;
  deskName: string;
}

export interface UserType {
  mail: string;
  name: string;
  uid: string;
  desks: DeskType[] | null[];
}
