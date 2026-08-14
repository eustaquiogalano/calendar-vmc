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
import { ChevronDownIcon, LoaderPinwheel, LucideIcon } from "lucide-react";

import DeleteRequestDialog from "@/components/DeleteEventDialog/DeleteEventDialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EventType } from "@/types/schoolEvent";
import EventCard from "@/components/EventCard/EventCard";

function CreateEvent() {
  const { events, addEvent, deleteEvent, loading } = useEvent();

  const [name, setName] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [eventType, setEventType] = useState<EventType>("Other");
  const [eventID, setEventID] = useState("");

  const deleteDialogRef = useRef<HTMLDialogElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    addEvent({
      announcementType: "event",
      name,
      date: date ? format(date, "yyyy-MM-dd") : "",
      startTime: startTime || null,
      endTime: endTime || null,
      type: eventType,
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
    setDate(undefined);
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
                    />
                  </Field>
                </FieldGroup>

                <FieldGroup className="flex md:flex-row">
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
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
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

                  <Field>
                    <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                      Type:
                    </FieldLabel>
                    <Select
                      onValueChange={(value) =>
                        setEventType(value as EventType)
                      }
                      value={eventType}
                      name="eventType"
                      required
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Holiday" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="Academic">Academic</SelectItem>
                          <SelectItem value="Holiday">Holiday</SelectItem>
                          <SelectItem value="School Activity">
                            School Activity
                          </SelectItem>
                          <SelectItem value="Administrative">
                            Administrative
                          </SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                </FieldGroup>
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
                <EventCard
                  key={event.id}
                  event={event}
                  onDelete={(id) => {
                    setEventID(id);
                    deleteDialogRef.current?.showModal();
                  }}
                  DetailRow={DetailRow}
                />
              );
            })}
        </div>
        <DeleteRequestDialog ref={deleteDialogRef} onDeletion={handleDelete} />
      </section>
    </>
  );
}

interface DetailRowProps {
  label: string;
  icon: LucideIcon;
  value: string | undefined | number;
}

function DetailRow({ label, icon: Icon, value }: DetailRowProps) {
  return (
    <div className="flex flex-col md:flex-row items-start gap-2 justify-between px-4 py-3">
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <Icon className="h-3.5 w-3.5 text-blue-500" />
        {label}
      </div>

      <span className="text-sm font-semibold">{value}</span>
    </div>
  );
}

export default CreateEvent;
