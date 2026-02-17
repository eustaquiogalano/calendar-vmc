import { useUser } from "../../../../../context/UserContext";
import style from "./IncomingCard.module.css";

function IncomingCard({ request, student }) {
  const { updateRequestStatus } = useUser();

  return (
    <div className={style["incoming-card"]}>
      <div className={style["incoming-card__details"]}>
        <p>
          Student: <span>{student.name}</span>
        </p>
        <p>
          Document: <span>{request.document}</span>{" "}
        </p>
        <p>
          Purpose: <span>{request.purpose}</span>
        </p>
        <p>
          Date: <span>{request.date}</span>
        </p>
      </div>
      <div className={style["incoming-card__div--buttons"]}>
        <button
          onClick={() =>
            updateRequestStatus(student, request.id, "ACCEPTED", request)
          }
        >
          Accept
        </button>
        <button
          onClick={() =>
            updateRequestStatus(student, request.id, "REJECTED", request)
          }
        >
          Reject
        </button>
      </div>
    </div>
  );
}

export default IncomingCard;
