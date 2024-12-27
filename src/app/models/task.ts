export enum Status {
    COMPLETED = 'COMPLETED',
    IN_PROGRESS = 'IN_PROGRESS',
    TODO = 'TODO'
  }
  
  export enum Priority {
    HIGH = 'HIGH',
    MEDIUM = 'MEDIUM',
    LOW = 'LOW'
  }
  
  export interface Task {
    id: string;
    name: string;
    description: string;
    dueDate: string;
    priority: Priority;
    status: Status;
    createdAt: string;
    categoryId?: string;
  } 