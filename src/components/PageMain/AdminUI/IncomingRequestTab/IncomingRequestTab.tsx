import style from "./IncomingRequestTab.module.css";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import RejectRequestDialog from "@/components/RejectRequestDialog/RejectRequestDialog";
import { useRef, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { useDocumentRequest } from "@/context/DocumentRequestContext";

function IncomingRequestTab() {
  const { requests, updateRequestStatus, loading } = useDocumentRequest();
  const rejectionDialogRef = useRef<HTMLDialogElement | null>(null);
  const [student, setStudent] = useState();
  const [requestID, setRequestID] = useState("");

  const handleRequestRejection = async () => {
    await updateRequestStatus(requestID, "REJECTED");
  };

  const handleRequestAcceptance = async (requestID: string) => {
    await updateRequestStatus(requestID, "ACCEPTED_PROCESSING");
  };

  return (
    <section
      className={`${style["incoming-request__section"]} text-xl font-bold`}
    >
      <h2>Incoming Requests</h2>

      <div className={style["incoming-request__request-list"]}>
        {requests
          .filter((request) => {
            if (
              request.status !== "ACCEPTED_PROCESSING" &&
              request.status !== "READY_FOR_PICKUP" &&
              request.status !== "REJECTED"
            ) {
              return request;
            }
          })
          .map((request) => {
            return (
              <Card
                key={request.id}
                className="border-2 shrink-0 flex flex-col justify-between"
              >
                <CardHeader className="p3">
                  <CardTitle>{request.studentName}</CardTitle>
                </CardHeader>
                <CardContent className="p-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Document:</span>
                    <span>{request.document}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Purpose:</span>
                    <span>{request.purpose}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span>{request.date}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between gap-2">
                  <Button
                    disabled={loading}
                    variant="default"
                    className="w-[50%] h-fit p-2"
                    onClick={() => {
                      handleRequestAcceptance(request.id);
                    }}
                  >
                    {loading ? (
                      <LoaderCircle className="animate-spin" />
                    ) : (
                      "Accept"
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-[50%] h-fit p-2"
                    onClick={() => {
                      setStudent(student);
                      setRequestID(request.id);
                      rejectionDialogRef.current?.showModal();
                    }}
                  >
                    {loading ? (
                      <LoaderCircle className="animate-spin" />
                    ) : (
                      "Reject"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
      </div>

      <RejectRequestDialog
        ref={rejectionDialogRef}
        onRejection={handleRequestRejection}
      />
    </section>
  );
}

export default IncomingRequestTab;
