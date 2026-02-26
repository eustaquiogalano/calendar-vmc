import { useState } from "react";
import { useEvent } from "../../../../context/EventsContext";
import style from "./CreateEventTab.module.css";
import { addEvent } from "../../../../utils/storage";

function CreateEvent() {
  const { events, setEvents } = useEvent();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const updatedEvents = await addEvent({ name, time, date });
    setEvents(updatedEvents);
    resetState();
    console.log("submit");
  }

  function resetState() {
    setTime("");
    setName("");
    setDate("");
  }

  console.log(Array.isArray(events));

  return (
    <>
      <section className={style["create-event__section"]}>
        <h2>Create Event</h2>
        <form onSubmit={handleSubmit} className={style["create-event__form"]}>
          <div>
            <label htmlFor="event-name">Event Name:</label>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              id="event-name"
            />
          </div>
          <div>
            <label htmlFor="event-time">Time:</label>
            <input
              onChange={(e) => {
                setTime(e.target.value);
              }}
              value={time}
              type="time"
              id="event-time"
            />
          </div>
          <div>
            <label htmlFor="event-date">Date:</label>
            <input
              onChange={(e) => {
                setDate(e.target.value);
              }}
              value={date}
              type="date"
              id="event-date"
            />
          </div>
          <div>
            <button type="submit">Create</button>
          </div>
        </form>
      </section>
      <section
        className={`${style["create-event__section"]} ${style["create-event__section--event-list"]}`}
      >
        <h2>Event List</h2>
        <div className={style["create-event__container--event-list"]}>
          {events &&
            events.map((event) => {
              console.log(event);

              return (
                <div className={style["create-event__event-card"]}>
                  <p>
                    Event Name: <span>{event.name}</span>
                  </p>
                  <p>
                    Time: <span>{event.time}</span>
                  </p>
                  <p>
                    Date: <span>{event.date}</span>
                  </p>
                  <div>
                    <button>Delete</button>
                  </div>
                </div>
              );
            })}
        </div>
      </section>
      ;
    </>
  );
}

export default CreateEvent;
