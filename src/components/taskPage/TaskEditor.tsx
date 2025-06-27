import React, { useEffect, useState } from "react";
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

  const { initialTask, onClose, onSave } = props;
  const [editedTask, setEditedTask] = useState<Task>(
    initialTask || {
      id: "",
      title: "",
      desc: "",
      dateAdded: new Date(),
      completionDate: new Date(),
      dueDate: new Date(),
      complete: false,
    },
  );

  // Initialize or reset editedTask when initialTask prop changes
  useEffect(() => {
    if (initialTask) {
      setEditedTask({
        ...initialTask,
        dateAdded: new Date(initialTask.dateAdded),
        completionDate: initialTask.completionDate
          ? new Date(initialTask.completionDate)
          : new Date(),
        dueDate: initialTask.dueDate
          ? new Date(initialTask.dueDate)
          : new Date(),
      });
    } else {
      setEditedTask({
        id: "",
        title: "",
        desc: "",
        dateAdded: new Date(),
        completionDate: new Date(),
        dueDate: new Date(),
        complete: false,
      });
    }
  }, [initialTask]);

  const handleChange = (
    e: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >,
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    setEditedTask((prevTask) => {
      let updatedValue: any = value;

      if (type === "checkbox") {
        updatedValue = checked;
      } else if (type === "date") {
        updatedValue = value ? new Date(value) : new Date();
      }

      return {
        ...prevTask,
        [name]: updatedValue,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload

    // **Simply call the onSave prop with the current editedTask**
    if (onSave) {
      onSave(editedTask);
    }
    // Also close the popup
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>{initialTask ? "Edit Task" : "Add Your New Task"}</h2>
        <form onSubmit={handleSubmit}>
          {/* Form fields as before */}
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
              value={
                editedTask.dueDate
                  ? editedTask.dueDate.toISOString().split("T")[0]
                  : ""
              }
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
            <button type="button" onClick={onClose} className="cancel-button">
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
