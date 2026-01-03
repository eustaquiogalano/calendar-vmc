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
        <button>Accept</button>
        <button>Reject</button>
      </div>
    </div>
  );
}

export default IncomingCard;
