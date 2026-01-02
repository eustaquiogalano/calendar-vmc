import IncomingCard from "./IncomingCard/IncomingCard";
import style from "./IncomingRequestTab.module.css";

function IncomingRequestTab() {
  return (
    <section className={style["incoming-request__section"]}>
      <h2>Incoming Requests</h2>
      <div className={style["incoming-request__request-list"]}></div>
    </section>
  );
}

export default IncomingRequestTab;
