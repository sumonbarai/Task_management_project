import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
import { getTaskByStatusThunk } from "../../redux/features/task/taskSlice";
import { useEffect } from "react";
import Loader from "../Loader/Loader";

const Completed = () => {
  const { isLoading, completed } = useSelector((state) => state.task);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTaskByStatusThunk("completed"));
  }, [dispatch]);

  return (
    <div className="container-fluid pt-3">
      <div className="row row-cols-1 row-cols-md-2 row-cols-xxl-3 g-3">
        {completed.length > 0 &&
          completed.map((item) => {
            const { _id, createdAt, description, status, title } = item;
            return (
              <div key={_id} className="col">
                <Card
                  _id={_id}
                  title={title}
                  description={description}
                  date={createdAt}
                  status={status}
                />
              </div>
            );
          })}

        {completed.length === 0 && isLoading === false && <p>No task found</p>}
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default Completed;
