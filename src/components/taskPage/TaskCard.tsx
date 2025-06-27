import { Task } from "../../utils/typedefs"
import { formatDate } from "../../utils/utils";

import './TaskCard.css';

// TaskCard Functional Component
export const TaskCard: React.FC<{ task: Task }> = ({ task }) => {
  const isComplete = task.complete;

  return (
    <div
      className={`task-card ${isComplete ? 'is-complete' : ''}`}
    >
      {/* Left section: Title and Description */}
      <div className="task-card-left">
        <h3
          className={`task-card-title ${isComplete ? 'is-complete' : ''}`}
        >
          {task.title}
        </h3>
        <p
          className={`task-card-description ${isComplete ? 'is-complete' : ''}`}
        >
          {task.desc || 'No description provided.'}
        </p>
      </div>

      {/* Right section: Due Date and Completion Status */}
      <div className="task-card-right">
        <div className="task-card-due-date">
          Due: <span>{formatDate(task.dueDate)}</span>
        </div>
        <div
          className={`task-card-status-badge ${isComplete ? 'is-complete' : ''}`}
        >
          {isComplete ? 'Completed' : 'Pending'}
        </div>
      </div>
    </div>
  );
};
