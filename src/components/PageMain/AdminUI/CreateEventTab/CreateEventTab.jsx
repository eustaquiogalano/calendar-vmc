import { useRef, useState } from "react";
import { useEvent } from "../../../../context/EventsContext";
import style from "./CreateEventTab.module.css";

import {
  Field,
  FieldGroup,
  FieldLabel,
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
import { ChevronDownIcon, LoaderPinwheel } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DeleteRequestDialog from "@/components/DeleteEventDialog/DeleteEventDialog";

function CreateEvent() {
  const { events, addEvent, deleteEvent, loading } = useEvent();

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [eventID, setEventID] = useState("");
  const deleteDialogRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();

    addEvent({
      name,
      date,
      startTime,
      endTime,
      type: "Other", // add event type input
    });

    resetState();
  }

  async function handleDelete() {
    deleteEvent(eventID);
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
              <Button
                disabled={loading}
                className="w-full h-fit p-2"
                type="submit"
              >
                {loading ? (
                  <LoaderPinwheel className="animate-spin" />
                ) : (
                  "Create Event"
                )}
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
                <Card key={event.id} className="border-2 h-fit shrink-0">
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
                      disabled={loading}
                      variant="default"
                      className="w-full h-fit p-2"
                      onClick={() => {
                        setEventID(event.id);
                        deleteDialogRef.current.showModal();
                      }}
                    >
                      {loading ? (
                        <LoaderPinwheel className="animate-spin" />
                      ) : (
                        "Delete"
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
        </div>
        <DeleteRequestDialog ref={deleteDialogRef} onDeletion={handleDelete} />
      </section>
    </>
  );
}

export default CreateEvent;
