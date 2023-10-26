import axios from "axios";
import Swal from "sweetalert2";
import { errorNotification } from "./NotificationHelper";
import store from "../redux/store/store";
import { deleteTask, updateTask } from "../redux/features/task/taskSlice";

const DeleteAlert = (_id, status) => {
  Swal.fire({
    title: "Are you sure?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#D980FA",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      const response = await axios.delete(`/deleteTask/${_id}`);
      if (response.status === 200) {
        Swal.fire("Deleted!", "Your Task has been deleted.", "success");
        // update redux store
        store.dispatch(deleteTask({ _id, status }));
      } else {
        errorNotification("something went wrong");
        console.log(response);
      }
    }
  });
};
const updateAlert = (_id, status) => {
  Swal.fire({
    title: "Change Status",
    input: "select",
    inputOptions: {
      new: "new",
      completed: "completed",
      pending: "pending",
      canceled: "canceled",
    },
    inputValue: status,
  }).then(async (result) => {
    if (result) {
      const response = await axios.patch(
        `updateTaskByStatus/${_id}/${result.value}`,
        {}
      );
      if (response.status === 200) {
        Swal.fire("Updated!", "Your Task has been Updated.", "success");

        if (response?.data?.data?.status !== status) {
          // update redux store
          store.dispatch(
            updateTask({ _id, data: response.data.data, status: status })
          );
        }
      } else {
        errorNotification("something went wrong");
        console.log(response);
      }
    }
  });
};

export { DeleteAlert, updateAlert };
