import style from "./CalendarTab.module.css";
import Calendar from "./Calender/Calendar";
import { useUser } from "../../../../context/UserContext";
import { useState } from "react";
import { useEvent } from "../../../../context/EventsContext";
import { useDocumentRequest } from "@/context/DocumentRequestContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, CalendarDay } from "react-day-picker";
import {
  Calendar1Icon,
  CalendarDays,
  LucideIcon,
  Tag,
  Timer,
} from "lucide-react";

function CalendarTab() {
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    undefined,
  );
  const { currentUser } = useUser();
  const { events } = useEvent();
  const { requests } = useDocumentRequest();
  const announcements = [...requests, ...events];

  console.log(announcements);
  return (
    <>
      <section
        className={`${style["calendar-tab__section"]} ${style["calendar-tab__section--calendar"]}`}
      >
        <h2 className="text-xl font-bold">Calendar</h2>
        <div className={`${style["calendar-tab__calendar"]} `}>
          <Calendar setSelectedDate={setSelectedDate} />
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
                  // <Card
                  //   key={announcement.id}
                  //   className="border-2 h-fit shrink-0"
                  // >
                  //   <CardHeader>
                  //     <CardTitle>
                  //       {announcement.announcementType === "request"
                  //         ? announcement.document
                  //         : announcement.name}
                  //     </CardTitle>
                  //     <CardDescription>
                  //       {announcement.announcementType === "request"
                  //         ? "Document Request"
                  //         : "Event"}
                  //     </CardDescription>
                  //   </CardHeader>
                  //   <CardContent>
                  //     <div className="flex justify-between">
                  //       <span className="text-muted-foreground">
                  //         Start Time:
                  //       </span>
                  //       <span>
                  //         {announcement.announcementType === "event"
                  //           ? announcement.startTime || "08:00"
                  //           : "-"}
                  //       </span>
                  //     </div>
                  //     <div className="flex justify-between">
                  //       <span className="text-muted-foreground">End Time:</span>
                  //       <span>
                  //         {announcement.announcementType === "event"
                  //           ? announcement.endTime || "17:00"
                  //           : "-"}
                  //       </span>
                  //     </div>
                  //     <div className="flex justify-between">
                  //       <span className="text-muted-foreground">Date:</span>
                  //       <span>{announcement.date}</span>
                  //     </div>
                  //   </CardContent>
                  // </Card>

                  <Card
                    key={announcement.id}
                    className="relative shadow-sm border w-full shrink-0"
                  >
                    <CardHeader className="space-y-1">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                          <CalendarDays className="h-5 w-5" />
                        </div>

                        <div>
                          <CardTitle className="text-sm font-bold uppercase tracking-wide ">
                            {announcement.announcementType === "request"
                              ? announcement.document
                              : announcement.name}
                          </CardTitle>

                          <CardDescription className="text-xs">
                            {announcement.announcementType === "request"
                              ? "Document Request"
                              : "Event"}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      <section className="rounded-xl border overflow-hidden">
                        <div className="divide-y">
                          {/* type */}
                          <DetailRow
                            icon={Tag}
                            label="Type"
                            value={
                              announcement.announcementType === "request"
                                ? ""
                                : announcement.type
                            }
                          />

                          {/* date */}
                          <DetailRow
                            icon={Calendar1Icon}
                            label="Date"
                            value={
                              announcement.announcementType === "request"
                                ? announcement.date
                                : announcement.date
                            }
                          />

                          {/* time */}
                          <DetailRow
                            icon={Timer}
                            label="Time"
                            value={
                              announcement.announcementType === "request"
                                ? `--:--`
                                : `${announcement.startTime ?? "Tentative"} - ${announcement.endTime ?? "Tentative"}`
                            }
                          />
                        </div>
                      </section>

                      {/* ================= Action ================= */}
                    </CardContent>
                    {/* <CardFooter>
                      <Button
                        // disabled={request.status === "COMPLETED" || loading}
                        className="h-12 w-full text-sm font-semibold md:text-base"
                        onClick={() => {
                          setEventID(event.id);
                          deleteDialogRef.current?.showModal();
                        }}
                      >
                        {loading ? (
                          <LoaderCircle className="animate-spin" />
                        ) : (
                          <>
                            <Delete className="mr-2 h-5 w-5" />
                            Delete
                          </>
                        )}
                      </Button>
                    </CardFooter> */}
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

export default CalendarTab;
