import style from "./CalendarTab.module.css";
import HourCard from "./Calender/HourCard/HourCard";
import Calendar from "./Calender/Calendar";
import { useUser } from "../../../../context/UserContext";
import { useState } from "react";
import { useEvent } from "../../../../context/EventsContext";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function CalendarTab() {
  const [selectedDate, setSelectedDate] = useState();
  const { currentUser } = useUser();
  const { events } = useEvent();
  const requests = currentUser.requestedDocuments;
  const announcements = [...requests, ...events];

  return (
    <>
      <section
        className={`${style["calendar-tab__section"]} ${style["calendar-tab__section--calendar"]}`}
      >
        <h2 className="text-xl font-bold">Calendar</h2>
        <div className={`${style["calendar-tab__calendar"]} `}>
          <Calendar requests={requests} setSelectedDate={setSelectedDate} />
        </div>
      </section>

      <section
        className={`${style["calendar-tab__section"]} ${style["calendar-tab__section--events"]}`}
      >
        <h2 className="text-xl font-bold">Events</h2>
        {/* <div className={`${style["calendar-tab__events"]} `}> */}
        <div className={style["calendar-tab__request-list"]}>
          {announcements &&
            announcements.map((announcement) => {
              console.log(announcement);

              if (announcement.date === selectedDate) {
                return (
                  <Card
                    key={announcement.id}
                    className="border-2 h-fit shrink-0"
                  >
                    <CardHeader>
                      <CardTitle>
                        {announcement.type === "request"
                          ? announcement.document
                          : announcement.name}
                      </CardTitle>
                      <CardDescription>
                        {announcement.type === "request"
                          ? "Document Request"
                          : "Event"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Start Time:
                        </span>
                        <span>{announcement.startTime || "08:00"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">End Time:</span>
                        <span>{announcement.endTime || "17:00"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date:</span>
                        <span>{announcement.date}</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              }
            })}
        </div>
        {/* </div> */}
      </section>
    </>
  );
}

export default CalendarTab;
