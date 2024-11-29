import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ToDo from "./ToDo";
import { getAllToDo } from "../redux/Slice/toDoSlice.jsx";

export default function ToDoListing() {
  const {toDos} = useSelector((state) => state.ToDo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllToDo());
  }, [dispatch]);

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h4 className="mb-3">ToDo List</h4>
        </div>
        <div className="card-body">
          <div className="row" id="toDoListing">
            {toDos?.map((todo, index) => (
              <ToDo
                key={index}
                title={todo.title}
                desc={todo.description}
                completed={todo.completed}
                id={todo._id}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
