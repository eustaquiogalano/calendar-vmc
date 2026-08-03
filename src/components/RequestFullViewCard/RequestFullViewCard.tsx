import {
  Activity,
  Calendar,
  Clock3,
  FileCheck,
  FileText,
  GraduationCap,
  IdCard,
  LoaderCircle,
  LucideIcon,
  Mail,
  Phone,
  Target,
  User,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DocumentRequest,
  documentStatusLabel,
  toDocumentRequest,
} from "@/types/documentRequest";
import { IoWarningOutline } from "react-icons/io5";
import { useRef } from "react";
import { yearLevelLabel } from "@/types/user";

const statusStyles: Record<DocumentRequest["status"], string> = {
  PENDING: "bg-yellow-100 text-yellow-700 border-yellow-300",
  ACCEPTED_PROCESSING: "bg-blue-100 text-blue-700 border-blue-300",
  READY_FOR_PICKUP: "bg-green-100 text-green-700 border-green-300",
  COMPLETED: "bg-green-50 text-green-600 border-green-200",
  REJECTED: "bg-red-100 text-red-700 border-red-300",
};
interface RequestViewProps {
  request: DocumentRequest;
  loading: boolean;
  handleUpdateStatus(
    id: string,
    statusLabel: DocumentRequest["status"],
  ): void | Promise<void>;
}

export default function RequestFullView({
  loading,
  request,
  handleUpdateStatus,
}: RequestViewProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  return (
    <Card className="relative shadow-sm border w-full">
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
            <FileText className="h-5 w-5" />
          </div>

          <div>
            <CardTitle className="text-sm font-bold uppercase tracking-wide ">
              Request View
            </CardTitle>
            <CardDescription className="text-xs">
              Detailed information
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <section className="rounded-xl border overflow-hidden">
          <div className="flex items-center gap-3 border-b bg-muted/30 px-4 py-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100">
              <FileText className="h-3.5 w-3.5" />
            </div>

            <h2 className="text-md font-semibold">
              {request.student?.firstName}
            </h2>
          </div>

          <div className="divide-y">
            {/* ID number */}
            <DetailRow
              icon={IdCard}
              label="ID#"
              value={request.student?.idNumber}
            />

            {/* Year level */}
            <DetailRow
              icon={GraduationCap}
              label="Year Level"
              value={yearLevelLabel(request.student!.yearLevel)}
            />

            {/* Contact number */}
            <DetailRow
              icon={Phone}
              label="Contact Number"
              value={request.student?.contactNumber}
            />

            {/* email */}
            <DetailRow
              icon={Mail}
              label="Email"
              value={request.student?.email}
            />
          </div>
        </section>

        {/* ================= Request Details ================= */}

        <section className="rounded-xl border overflow-hidden">
          <div className="flex items-center gap-3 border-b bg-muted/30 px-4 py-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100">
              <FileText className="h-3.5 w-3.5" />
            </div>

            <h2 className="text-md font-semibold">Request Details</h2>
          </div>

          <div className="divide-y">
            {/* Document */}
            <DetailRow
              icon={FileText}
              label="Document"
              value={request.document}
            />

            {/* Purpose */}
            <DetailRow icon={Target} label="Purpose" value={request.purpose} />

            {/* date */}
            <DetailRow icon={Calendar} label="Date" value={request.date} />

            {/* status */}
            <DetailRow
              icon={Activity}
              label="Status"
              value={` ${documentStatusLabel[request.status]}`}
            />
          </div>
        </section>

        {/* ================= Action ================= */}
      </CardContent>
      <CardFooter>
        {/* <Button
            disabled={request.status === "COMPLETED"}
            className="h-12 w-full text-sm"
            onClick={() => {
              let label: DocumentRequest["status"] =
                request.status === "READY_FOR_PICKUP"
                  ? "COMPLETED"
                  : "READY_FOR_PICKUP";
              handleUpdateStatus(request.id, label);
            }}
          >
            {loading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <>
                <FileCheck className="mr-2 h-5 w-5" />

                {request.status === "COMPLETED"
                  ? "Claimed"
                  : "Mark as Ready to Claim"}
              </>
            )}
          </Button> */}

        <Button
          disabled={request.status === "COMPLETED" || loading}
          className="h-12 w-full text-sm font-semibold md:text-base"
          onClick={() => {
            dialogRef.current?.showModal();
          }}
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <FileCheck className="mr-2 h-5 w-5" />
              {request.status === "ACCEPTED_PROCESSING"
                ? "Mark as Ready to Claim"
                : request.status === "READY_FOR_PICKUP"
                  ? "Mark as Claimed"
                  : "Claimed"}
            </>
          )}
        </Button>
      </CardFooter>

      <dialog
        className={
          " hidden open:flex fixed inset-0 w-screen h-screen bg-transparent p-4 backdrop:bg-black/50 flex items-center justify-center"
        }
        ref={dialogRef}
      >
        <Card className="border-2 border-2 w-fit">
          <CardHeader className="flex flex-col items-center px-5 space-y-2">
            <IoWarningOutline size={30} className="text-primary " />
            <CardTitle className="text-center text-lg font-semibold">
              Confirm Status Update
            </CardTitle>
          </CardHeader>

          <CardContent className="px-5 text-sm text-muted-foreground">
            <p>Do you want to update the status of the request?</p>
          </CardContent>

          <CardFooter className="flex justify-between gap-2 px-5 ">
            <Button
              variant="default"
              className=" w-[50%] h-fit p-2 font-semibold"
              onClick={() => {
                const nextStatus: DocumentRequest["status"] =
                  request.status === "ACCEPTED_PROCESSING"
                    ? "READY_FOR_PICKUP"
                    : "COMPLETED";
                handleUpdateStatus(request.id, nextStatus);
                dialogRef.current?.close();
              }}
            >
              Yes, update it
            </Button>
            <Button
              variant="outline"
              className="w-[50%] h-fit p-2"
              onClick={() => dialogRef.current?.close()}
            >
              Cancel
            </Button>
          </CardFooter>
        </Card>
      </dialog>
    </Card>
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
