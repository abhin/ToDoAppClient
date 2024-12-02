import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../redux/Slice/toDoSlice";
import { showError } from "../Functions/utils";

export default function AddTodo() {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.ToDo);
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTodo({ title, description }));
    setTitle("");
    setDesc("");
  };

  useEffect(() => {
    if (error) showError(error);
  }, [error]);

  return (
    <div className="card">
      <div className="card-header">
        <h4>Add Todo</h4>
      </div>
      <div className="card-body">
        <form id="todoForm" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              placeholder="Enter title"
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              value={description}
              placeholder="Enter description"
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Add Todo
          </button>
        </form>
      </div>
    </div>
  );
}
