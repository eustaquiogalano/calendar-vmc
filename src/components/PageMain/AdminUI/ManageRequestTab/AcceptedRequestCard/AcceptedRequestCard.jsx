import style from "./AcceptedRequestCard.module.css";

function AcceptedRequestCard({ student, request }) {
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
      </div>
      <button>View</button>
    </div>
  );
}

export default AcceptedRequestCard;
