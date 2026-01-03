import style from "./IncomingCard.module.css";

function IncomingCard({ request }) {
  return (
    <div className={style["incoming-card"]}>
      <div className={style["incoming-card__details"]}>
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
          onClick={() => updateRequestStatus(studentID, request.id, "ACCEPTED")}
        >
          Accept
        </button>
        <button
          onClick={() => updateRequestStatus(studentID, request.id, "REJECTED")}
        >
          Reject
        </button>
      </div>
    </div>
  );
}

export default IncomingCard;
