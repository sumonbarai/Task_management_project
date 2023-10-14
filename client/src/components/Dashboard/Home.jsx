import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
import { useEffect } from "react";
import { taskByStatusCountThank } from "../../redux/features/task/taskSlice";

import Loader from "../Loader/Loader";

const Home = () => {
  const { isLoading, task } = useSelector((state) => state.task);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(taskByStatusCountThank());
  }, [dispatch]);

  return (
    <div className="container-fluid pt-3">
      <div className="row row-cols-1 row-cols-md-3 row-cols-xxl-4 g-3">
        {task.map((item, index) => {
          const { _id, total } = item;
          return (
            <div key={index} className="col">
              <Card title={_id} count={total} />
            </div>
          );
        })}

        {task.length === 0 && isLoading === false && <p>No task found</p>}
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default Home;
