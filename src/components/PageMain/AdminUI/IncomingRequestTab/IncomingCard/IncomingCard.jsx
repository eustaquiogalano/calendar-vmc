import style from "./IncomingCard.module.css";

function IncomingCard() {
  return (
    <div className={style["incoming-card"]}>
      <div className={style["incoming-card__details"]}>
        <p>
          Student: <span></span>
        </p>
        <p>
          Document: <span></span>
        </p>
        <p>
          Purpose: <span></span>
        </p>
        <p>
          Date: <span></span>
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
