import { useState } from "react";
import {
  CalendarDays,
  Tag,
  Calendar1Icon,
  Timer,
  Delete,
  Pencil,
  X,
  Check,
  LoaderCircle,
  LucideIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SchoolEvent, EventType, NewSchoolEvent } from "@/types/schoolEvent";
import { useEvent } from "@/context/EventsContext";

const eventTypes: EventType[] = [
  "Academic",
  "Holiday",
  "School Activity",
  "Administrative",
  "Other",
];

interface EventCardProps {
  event: SchoolEvent;
  onDelete: (id: string) => void;
  DetailRow: React.FC<{
    icon: LucideIcon;
    label: string;
    value: string;
  }>;
}

function EventCard({ event, onDelete, DetailRow }: EventCardProps) {
  const { updateEvent, loading } = useEvent();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(event.name);
  const [type, setType] = useState<EventType>(event.type);
  const [date, setDate] = useState(event.date);
  const [startTime, setStartTime] = useState(event.startTime);
  const [endTime, setEndTime] = useState(event.endTime ?? "");

  function handleCancel() {
    setName(event.name);
    setType(event.type);
    setDate(event.date);
    setStartTime(event.startTime);
    setEndTime(event.endTime ?? "");
    setIsEditing(false);
  }

  async function handleSave() {
    const update: Partial<NewSchoolEvent> = {
      name,
      type,
      date,
      startTime,
      endTime: endTime || undefined,
    };

    await updateEvent(event.id, update);
    setIsEditing(false);
  }

  return (
    <Card className="relative shadow-sm border w-full shrink-0">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
              <CalendarDays className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-sm font-bold uppercase tracking-wide">
                {event.name}
              </CardTitle>
              <CardDescription className="text-xs">
                Detailed information
              </CardDescription>
            </div>
          </div>

          {/* Edit / Cancel toggle button */}
          {!isEditing ? (
            <Button
              variant="ghost"
              size="sm"
              className="h-fit p-2 gap-1 text-muted-foreground"
              onClick={() => setIsEditing(true)}
            >
              <Pencil size={14} />
              Edit
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="h-fit p-2 gap-1 text-muted-foreground"
              onClick={handleCancel}
            >
              <X size={14} />
              Cancel
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* View mode */}
        {!isEditing ? (
          <section className="rounded-xl border overflow-hidden">
            <div className="divide-y">
              <DetailRow icon={Tag} label="Type" value={event.type} />
              <DetailRow icon={Calendar1Icon} label="Date" value={event.date} />
              <DetailRow
                icon={Timer}
                label="Time"
                value={`${event.startTime ?? "Tentative"} - ${event.endTime ?? "Tentative"}`}
              />
            </div>
          </section>
        ) : (
          /* Edit mode */
          <div className="space-y-3 rounded-xl border p-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Edit Event
            </p>

            <div className="space-y-1.5">
              <Label className="text-xs">Event Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Event name"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Type</Label>
              <Select
                value={type}
                onValueChange={(value) => setType(value as EventType)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {eventTypes.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Date</Label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Start Time</Label>
                <Input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">End Time (Optional)</Label>
                <Input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>

            <Button
              className="w-full h-fit p-2 gap-2"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? (
                <LoaderCircle size={14} className="animate-spin" />
              ) : (
                <>
                  <Check size={14} />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>

      {/* Footer — only show delete when not editing */}
      {!isEditing && (
        <CardFooter>
          <Button
            variant="destructive"
            className="h-12 w-full text-sm font-semibold md:text-base"
            onClick={() => onDelete(event.id)}
            disabled={loading}
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
        </CardFooter>
      )}
    </Card>
  );
}

export default EventCard;
