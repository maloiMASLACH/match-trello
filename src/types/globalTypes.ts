export interface TaskType {
  taskName: string;
  completed: boolean;
  date: string;
  id: number;
}
export interface ColumnType {
  tasks: TaskType[];
  columnName: string;
  id: number;
}
export interface DeskType{
  columns: ColumnType[];
  id: number;
  deskName: string;
}

export interface UserType {
  mail: string;
  name: string;
  uid: string;
  desks: DeskType[];
}
