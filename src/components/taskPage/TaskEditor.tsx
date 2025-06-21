import React from "react";
import { Task } from "../../utils/typedefs";

import "./TaskEditor.css";

export interface TaskEditorPopupProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSave?: (task: Task) => void;
  initialTask?: Task | null;
}

export const TaskEditorPopup: React.FC<TaskEditorPopupProps> = (
  props: TaskEditorPopupProps,
) => {
  let editedTask: Task = {
    id: "",
    title: "",
    desc: "",
    dateAdded: new Date(),
    completionDate: new Date(),
    dueDate: new Date(),
    complete: false,
  };

  function handleChange() {
    // NOTE: place holder
  }
  function handleSubmit() {
    // NOTE: place holder
  }

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Add Your New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={editedTask.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="desc">Description:</label>
            <textarea
              id="desc"
              name="desc"
              value={editedTask.desc}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">Due Date:</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={editedTask.dueDate.toISOString() || ""} // Handle undefined for empty input
              onChange={handleChange}
            />
          </div>

          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="complete"
              name="complete"
              checked={editedTask.complete}
              onChange={handleChange}
            />
            <label htmlFor="complete">Completed</label>
          </div>

          <div className="popup-actions">
            <button
              type="button"
              onClick={props.onClose}
              className="cancel-button"
            >
              Cancel
            </button>
            <button type="submit" className="save-button">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
