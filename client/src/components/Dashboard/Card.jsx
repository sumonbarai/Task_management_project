import { MdDateRange } from "react-icons/md";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { DeleteAlert, updateAlert } from "../../utilities/SweetAleartHelper";

const Card = ({ _id, title, count, description, date, status }) => {
  return (
    <div className="card shadow p-2">
      <div className="card-body ">
        <h5 className="card-title text-capitalize animate__animated animate__fadeInUp ">
          {title}
        </h5>
        {description && (
          <p className="card-text text-muted fw-medium animate__animated animate__fadeInUp ">
            {description}
          </p>
        )}
        {count && (
          <p className="card-text text-muted fw-medium animate__animated animate__fadeInUp ">
            {count}
          </p>
        )}
        {date && (
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center justify-content-between">
              <span>
                <span className="pe-2">
                  <MdDateRange />
                </span>
                {date}
              </span>
              <span
                className="px-2"
                role="button"
                style={{ color: "#b315f2" }}
                onClick={() => updateAlert(_id, status)}
              >
                <AiOutlineEdit />
              </span>
              <span
                className="px-2"
                role="button"
                style={{ color: "#b315f2" }}
                onClick={() => DeleteAlert(_id, status)}
              >
                <AiOutlineDelete />
              </span>
            </div>
            <div>
              <span className="badge" style={{ background: "#D980FA" }}>
                {status}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
