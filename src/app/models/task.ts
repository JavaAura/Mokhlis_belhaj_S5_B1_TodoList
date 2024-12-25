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
    title: string;
    description?: string;
    priority: Priority;
    status: Status;
    dueDate: Date;
    createdAt: Date;
  } 