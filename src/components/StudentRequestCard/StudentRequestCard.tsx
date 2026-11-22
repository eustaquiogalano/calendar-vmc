import {
  Activity,
  Calendar,
  ChevronDown,
  FileText,
  Goal,
  Trash2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { DocumentRequest, documentStatusLabel } from "@/types/documentRequest";
import { useRef, useState } from "react";
import ConfirmationDialog from "../PageMain/StudentUI/DocumentRequestTab/ConfirmationDialog/ConfirmationDialog";
import { StatusStepper } from "../StatusStepper/StatusStepper";

const statusStyles: Record<DocumentRequest["status"], string> = {
  PENDING: "bg-yellow-100 text-yellow-700 border-yellow-300",
  ACCEPTED_PROCESSING: "bg-blue-100 text-blue-700 border-blue-300",
  READY_FOR_PICKUP: "bg-green-100 text-green-700 border-green-300",
  COMPLETED: "bg-green-50 text-green-600 border-green-200",
  REJECTED: "bg-red-100 text-red-700 border-red-300",
};

interface RequestCardProps {
  request: DocumentRequest;
  handleDelete: () => void;
  setDeletionID: (id: string) => void;
}

export default function StudentRequestCard({
  request,
  handleDelete,
  setDeletionID,
}: RequestCardProps) {
  const deletionDialogRef = useRef<HTMLDialogElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card
      className={`border-2 h-fit shrink-0 overflow-hidden shadow-sm hover:shadow-md transition-shadow`}
    >
      {/* Header — always visible, acts as the toggle */}
      <CardHeader className={`${isOpen ? "border-b" : "pb-4"} `}>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          className="flex w-full items-center gap-4 text-left"
        >
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-secondary">
            <FileText className="h-3.5 w-3.5" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold truncate">
              {request.document}
            </h3>
            <p className="text-sm text-muted-foreground">Document</p>
            {!isOpen && (
              <Badge
                variant="outline"
                className={`inline-flex items-center gap-2 ${statusStyles[request.status]}`}
              >
                <span className="size-2 rounded-full bg-current" />
                {documentStatusLabel[request.status]}
              </Badge>
            )}
          </div>

          <ChevronDown
            className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </CardHeader>

      {/* Body + footer — only when open */}
      {isOpen && (
        <>
          <CardContent className="space-y-4 py-4">
            {/* purpose */}
            <div className="flex gap-4">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary">
                <Goal className="h-3.5 w-3.5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Purpose</p>
                <p className="font-medium">{request.purpose}</p>
              </div>
            </div>

            {/* date */}
            <div className="flex gap-4">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary">
                <Calendar className="h-3.5 w-3.5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Date Requested
                </p>
                <p className="font-medium">{request.date}</p>
              </div>
            </div>

            {/* status */}
            <div className="flex gap-4">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary">
                <Activity className="h-3.5 w-3.5" />
              </div>
              <div className="w-full">
                <p className="text-sm text-muted-foreground mb-2">Status</p>
                <StatusStepper request={request} />
              </div>
            </div>
          </CardContent>

          <CardFooter className="border-t">
            <Button
              variant="destructive"
              className="w-full h-10 md:h-13 hover:bg-destructive hover:text-white"
              onClick={() => {
                setDeletionID(request.id);
                deletionDialogRef.current?.showModal();
              }}
              disabled={request.status !== "PENDING"}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Request
            </Button>
          </CardFooter>
        </>
      )}

      {/* Always rendered so the ref stays valid even if the card is collapsed */}
      <ConfirmationDialog ref={deletionDialogRef} onConfirm={handleDelete} />
    </Card>
  );
}
