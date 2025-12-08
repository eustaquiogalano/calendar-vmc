import style from "./HourCard.module.css";

function HourCard({ time, eventList }) {
  return (
    <div className={style["hour-card"]}>
      <h3>{time}</h3>
      <div className={style["hour-card__event-list"]}>
        <ul>
          {eventList.map((event) => {
            return <li className={style["hour-card__event"]}>{event}</li>;
          })}
        </ul>
      </div>
      <br />
      <hr />
    </div>
  );
}

export default HourCard;
