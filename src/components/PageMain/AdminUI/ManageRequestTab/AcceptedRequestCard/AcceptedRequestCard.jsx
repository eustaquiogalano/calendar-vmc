import style from "./AcceptedRequestCard.module.css";

function AcceptedRequestCard({ student, request, setSelectedRequest }) {
  return (
    <div className={style["accepted-request"]}>
      <div className={style["accepted-request__request-details"]}>
        <p>
          Student: <span>{student.name}</span>
        </p>
        <p>
          Document: <span>{request.document}</span>
        </p>
        <p>
          Purpose: <span>{request.purpose}</span>
        </p>
        <p>
          Date: <span>{request.date}</span>
        </p>
        <p>
          Status: <span>{request.status}</span>
        </p>
      </div>
      <button
        className={style["accepted-request__button--view"]}
        onClick={() => setSelectedRequest({ student, request })}
      >
        View Full Details
      </button>
    </div>
  );
}

export default AcceptedRequestCard;
