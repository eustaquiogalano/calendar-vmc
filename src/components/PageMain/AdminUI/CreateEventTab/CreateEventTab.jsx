import { useState } from "react";
import { useEvent } from "../../../../context/EventsContext";
import style from "./CreateEventTab.module.css";
import { addEvent, deleteEvent } from "../../../../utils/storage/storage.js";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function CreateEvent() {
  const { events, setEvents } = useEvent();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  console.log(date);

  async function handleSubmit(e) {
    e.preventDefault();

    const updatedEvents = await addEvent({
      id: crypto.randomUUID(),
      name,
      startTime,
      endTime,
      date: format(date, "yyyy-MM-dd"),
      type: "event",
    });
    setEvents(updatedEvents);
    resetState();
  }

  async function handleDelete(eventID) {
    const updatedEvents = await deleteEvent(eventID);

    setEvents(updatedEvents);
  }

  function resetState() {
    setStartTime("");
    setEndTime("");
    setName("");
    setDate("");
  }

  return (
    <>
      <section
        className={`${style["create-event__section"]} ${style["create-event__section--event-form"]} text-xl font-bold`}
      >
        <h2>Create Event</h2>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                    Event Name:
                  </FieldLabel>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="checkout-7j9-card-name-43j"
                    placeholder="Basketball"
                    required
                  />
                </Field>

                <FieldGroup className="flex flex-row">
                  <Field>
                    <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                      Start Time:
                    </FieldLabel>
                    <Input
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      type="time"
                      id="checkout-7j9-card-number-uw1"
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                      End Time:
                    </FieldLabel>
                    <Input
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      type="time"
                      id="checkout-7j9-card-number-uw1"
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </Field>
                </FieldGroup>

                <Field>
                  <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                    Date:
                  </FieldLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        data-empty={!date}
                        className="w-[212px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                      >
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        defaultMonth={date}
                      />
                    </PopoverContent>
                  </Popover>
                </Field>
              </FieldGroup>
            </FieldSet>
            <FieldSeparator></FieldSeparator>
            <Field>
              <Button className="w-full h-fit p-2" type="submit">
                Create Event
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </section>

      <section
        className={`${style["create-event__section"]} ${style["create-event__section--event-list"]} text-xl font-bold `}
      >
        <h2>Event List</h2>
        <div className={style["create-event__container--event-list"]}>
          {events &&
            events.map((event) => {
              return (
                // <div className={style["create-event__event-card"]}>
                //   <p>
                //     Event Name: <span>{event.name}</span>
                //   </p>
                //   <p>
                //     Time: <span>{event.endTime}</span>
                //   </p>
                //   <p>
                //     Time: <span>{event.startTime}</span>
                //   </p>
                //   <p>
                //     Date: <span>{event.date}</span>
                //   </p>
                //   <div>
                //     <button onClick={() => handleDelete(event.id)}>
                //       Delete
                //     </button>
                //   </div>
                // </div>
                <Card className="border-2 h-fit shrink-0">
                  <CardHeader>
                    <CardTitle>{event.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Start Time:</span>
                      <span>{event.startTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">End Time:</span>
                      <span>{event.endTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span>{event.date}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="default"
                      className="w-full h-fit p-2"
                      onClick={() => handleDelete(event.id)}
                    >
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
        </div>
      </section>
    </>
  );
}

export default CreateEvent;
