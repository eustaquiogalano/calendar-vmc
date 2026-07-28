import {
  Activity,
  Calendar,
  CircleDot,
  FileText,
  Goal,
  Target,
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
import { useRef } from "react";
import ConfirmationDialog from "../PageMain/StudentUI/DocumentRequestTab/ConfirmationDialog/ConfirmationDialog";

const statusStyles: Record<DocumentRequest["status"], string> = {
  PENDING: "bg-orange-100 text-orange-700 border-orange-300",
  ACCEPTED_PROCESSING: "bg-blue-100 text-blue-700 border-blue-300",
  READY_FOR_PICKUP: "bg-purple-100 text-purple-700 border-purple-300",
  COMPLETED: "bg-green-100 text-green-700 border-green-300",
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

  return (
    <Card className="border-2 h-fit shrink-0 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="flex items-center gap-4 border-b">
        <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-secondary">
          <FileText className="h-3.5 w-3.5" />
        </div>

        <div className="flex-1">
          <h3 className="text-base font-semibold">{request.document}</h3>

          <p className="text-sm text-muted-foreground">Document</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 py-4">
        {/* <div className="flex gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
            <FileText className="h-5 w-5 text-blue-600" />
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Document</p>

            <p className="font-medium">{request.document}</p>
          </div>
        </div> */}

        <div className="flex gap-4">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary">
            <Goal className="h-3.5 w-3.5" />
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Purpose</p>

            <p className="font-medium">{request.purpose}</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary ">
            <Calendar className="h-3.5 w-3.5" />
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Date Requested</p>

            <p className="font-medium">{request.date}</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div
            className={`flex h-7 w-7 items-center justify-center rounded-full bg-secondary`}
          >
            <Activity className="h3.5 w-3.5" />
          </div>

          <div className="w-full">
            <p className="text-sm text-muted-foreground">Status</p>

            <Badge
              variant="outline"
              className={`mt-1 inline-flex items-center gap-2 ${
                statusStyles[request.status]
              }`}
            >
              <span className="size-2 rounded-full bg-current" />

              {documentStatusLabel[request.status]}
            </Badge>

            {request.status === "REJECTED" && request.remarks.length > 0 && (
              <div className=" mt-3 rounded-md border border-destructive/20 bg-destructive/5 p-3">
                <p className="text-sm font-medium text-destructive">
                  Reason{request.remarks.length > 1 ? "s" : ""} for Rejection
                </p>

                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                  {request.remarks.map((remark, index) => (
                    <li key={index}>{remark}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t">
        <Button
          variant="destructive"
          className="w-full h-10 md:h-13 hover:bg-destructive hover:text-white
          "
          onClick={() => {
            setDeletionID(request.id);
            deletionDialogRef.current?.showModal();
          }}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Request
        </Button>
      </CardFooter>

      <ConfirmationDialog ref={deletionDialogRef} onConfirm={handleDelete} />
    </Card>
  );
}
