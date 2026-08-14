import { useRef, useState } from "react";
import {
  LoaderCircle,
  User,
  FileText,
  AlertCircle,
  Check,
  X,
  Circle,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { DocumentRequest, documentStatusLabel } from "@/types/documentRequest";
import RejectRequestDialog from "../RejectRequestDialog/RejectRequestDialog";
import { yearLevelLabel } from "@/types/user";

const rejectionReasons = [
  "Incomplete requirements",
  "Incorrect information",
  "Invalid document request",
  "Duplicate request",
  "Outstanding balance",
];

const statusStyles: Record<DocumentRequest["status"], string> = {
  PENDING: "bg-yellow-100 text-yellow-700 border-yellow-300",
  ACCEPTED_PROCESSING: "bg-blue-100 text-blue-700 border-blue-300",
  READY_FOR_PICKUP: "bg-green-100 text-green-700 border-green-300",
  COMPLETED: "bg-green-50 text-green-600 border-green-200",
  REJECTED: "bg-red-100 text-red-700 border-red-300",
};

interface IncomingRequestCardProps {
  request: DocumentRequest;
  loading: boolean;
  activeRejectPanel: string | null;
  setActiveRejectPanel: (id: string | null) => void;
  handleRequestAcceptance: (id: string) => void;
  handleRequestRejection: (remarks: DocumentRequest["remarks"]) => void;
  setRequestID: (id: string) => void;
}

function IncomingRequestCard({
  request,
  loading,
  activeRejectPanel,
  setActiveRejectPanel,
  handleRequestAcceptance,
  handleRequestRejection,
  setRequestID,
}: IncomingRequestCardProps) {
  const rejectionDialogRef = useRef<HTMLDialogElement | null>(null);
  const [remarks, setRemarks] = useState<string[]>([]);

  const isRejectPanelOpen = activeRejectPanel === request.id;

  function handleReasonToggle(reason: string) {
    setRemarks((prev) =>
      prev.includes(reason)
        ? prev.filter((r) => r !== reason)
        : [...prev, reason],
    );
  }

  function handleReject() {
    // handle rejection
    handleRequestRejection(remarks);

    // reset display
    setRemarks([]);
    setActiveRejectPanel(null);
    rejectionDialogRef.current?.close();
  }
  console.log(request);
  return (
    <>
      <Card className="w-full shrink-0 overflow-hidden border shadow-sm gap-0 p-0">
        {/* Card Header */}
        <CardHeader className="flex items-center justify-between p-4 border-b ">
          <div className="flex items-center gap-2 ">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <FileText className="h-3.5 w-3.5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wide ">
              Request Review
            </span>
          </div>
        </CardHeader>

        <CardContent className="p-4 space-y-4">
          <div className="flex flex-col lg:gap-10 lg:flex-row space-y-4">
            {/* Student Information */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest">
                <User className="h-3 w-3" strokeWidth={2.5} />
                <span className="ml-1">Student Information</span>
              </div>

              <div className="grid sm:grid-cols-[auto_1fr] ml-4 gap-x-15 gap-y-1 text-sm pl-1">
                {/* name */}

                <span className="text-muted-foreground pt-3 sm:pt-0">Name</span>
                <span className="font-medium">
                  {request.student
                    ? `${request.student.lastName}, ${request.student.firstName}${request.student.middleName ? ` ${request.student.middleName}` : ""}${request.student.suffix ? ` ${request.student.suffix}` : ""}`
                    : "—"}
                </span>

                {/* id number */}
                <span className="text-muted-foreground pt-3 sm:pt-0">
                  ID Number
                </span>
                <span className="font-medium">
                  {request.student?.idNumber ?? "—"}
                </span>

                {/* year level */}
                <span className="text-muted-foreground pt-3 sm:pt-0">
                  Year Level
                </span>
                <span className="font-medium">
                  {request.student?.yearLevel
                    ? yearLevelLabel(request.student.yearLevel)
                    : "—"}
                </span>

                {/* course */}
                <span className="text-muted-foreground pt-3 sm:pt-0">
                  Course
                </span>
                <span className="font-medium">
                  {request.student?.course ? request.student.course : "—"}
                </span>
              </div>
            </div>

            {/* Mobile */}
            <Separator orientation="horizontal" className="lg:hidden" />

            {/* Desktop */}
            <Separator orientation="vertical" className="hidden lg:block " />

            {/* Request Details */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest ">
                <FileText size={13} />
                <span className="ml-1">Request Details</span>
              </div>
              <div className="grid sm:grid-cols-[auto_1fr] ml-4.5 gap-x-6 gap-y-1 text-sm pl-1">
                <span className="text-muted-foreground pt-3 sm:pt-0">
                  Document
                </span>
                <span className="font-medium">{request.document}</span>
                <span className="text-muted-foreground pt-3 sm:pt-0">
                  Purpose
                </span>
                <span className="font-medium">{request.purpose}</span>
                <span className="text-muted-foreground pt-3 sm:pt-0">
                  Date Requested
                </span>
                <span className="font-medium">{request.date}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Actions */}
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Actions
            </p>
            <div className="flex flex-col sm:flex-row  gap-2">
              <Button
                disabled={loading}
                variant="default"
                className="flex-1 h-fit p-2 gap-2"
                onClick={() => handleRequestAcceptance(request.id)}
              >
                {loading ? (
                  <LoaderCircle size={14} className="animate-spin" />
                ) : (
                  <>
                    <Check size={14} />
                    Accept
                  </>
                )}
              </Button>
              <Button
                disabled={loading}
                variant="outline"
                className="flex-1 h-fit p-2 gap-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                onClick={() => {
                  setActiveRejectPanel(isRejectPanelOpen ? null : request.id);
                  setRequestID(request.id);
                }}
              >
                {loading ? (
                  <LoaderCircle size={14} className="animate-spin" />
                ) : (
                  <>
                    <X size={14} />
                    Reject
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Rejection Panel */}
          {isRejectPanelOpen && (
            <div className="space-y-4 rounded-lg border border-destructive/40 bg-destructive/5 p-4">
              {/* Header */}
              <div className="flex items-center gap-2">
                <AlertCircle size={16} className="text-destructive shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-destructive uppercase tracking-wide">
                    Reason for Rejection
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Select one or more reasons.
                  </p>
                </div>
              </div>

              {/* Checkboxes — 2 column grid */}
              <div className="grid sm:grid-cols-2 gap-x-4 gap-y-3">
                {rejectionReasons.map((reason) => (
                  <div key={reason} className="flex items-center gap-2">
                    <Checkbox
                      id={`${request.id}-${reason}`}
                      checked={remarks.includes(reason)}
                      onCheckedChange={() => handleReasonToggle(reason)}
                    />
                    <Label
                      htmlFor={`${request.id}-${reason}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {reason}
                    </Label>
                  </div>
                ))}
              </div>

              {/* Panel Actions */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 h-fit p-2"
                  onClick={() => {
                    setActiveRejectPanel(null);
                    setRemarks([]);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1 h-fit p-2"
                  disabled={remarks.length === 0}
                  onClick={() => rejectionDialogRef.current?.showModal()}
                >
                  Continue
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <RejectRequestDialog
        ref={rejectionDialogRef}
        onRejection={handleReject}
      />
    </>
  );
}

export default IncomingRequestCard;
