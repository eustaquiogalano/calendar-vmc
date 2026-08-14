import { useState } from "react";

import style from "./ManageRequestTab.module.css";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Activity, Calendar, FileText, Goal, User } from "lucide-react";
import { useDocumentRequest } from "@/context/DocumentRequestContext";
import { DocumentRequest } from "@/types/documentRequest";
import RequestFullView from "@/components/RequestFullViewCard/RequestFullViewCard";
import { StatusStepper } from "@/components/StatusStepper/StatusStepper";

const statusStyles: Record<DocumentRequest["status"], string> = {
  PENDING: "bg-yellow-100 text-yellow-700 border-yellow-300",
  ACCEPTED_PROCESSING: "bg-blue-100 text-blue-700 border-blue-300",
  READY_FOR_PICKUP: "bg-green-100 text-green-700 border-green-300",
  COMPLETED: "bg-green-50 text-green-600 border-green-200",
  REJECTED: "bg-red-100 text-red-700 border-red-300",
};

function ManageRequestTab() {
  const { updateRequestStatus, requests, loading } = useDocumentRequest();
  const [selectedRequestId, setSelectedRequestId] = useState("");

  const selectedRequest = requests.find(
    (request) => request.id === selectedRequestId,
  );

  const handleUpdateStatus = async (
    id: string,
    statusLabel: DocumentRequest["status"],
  ) => {
    await updateRequestStatus(id, statusLabel, []);
  };

  return (
    <>
      <section
        className={`${style["manage-request__section"]} ${style["manage-request__section--full-view"]} text-xl font-bold`}
      >
        <h2>Request View</h2>
        <div className={style["manage-request__display-box"]}>
          {selectedRequest ? (
            <RequestFullView
              loading={loading}
              request={selectedRequest}
              handleUpdateStatus={handleUpdateStatus}
            />
          ) : (
            <p>Select a request to view here</p>
          )}
        </div>
      </section>

      <section
        className={`${style["manage-request__section"]} ${style["manage-request__section--request-list"]} text-xl font-bold`}
      >
        <h2>Request List</h2>
        <div className={style["manage-request__container--request-list"]}>
          {requests
            .filter((request) => {
              if (
                request.status === "ACCEPTED_PROCESSING" ||
                request.status === "READY_FOR_PICKUP" ||
                request.status === "COMPLETED"
              ) {
                return request;
              }
            })
            .map((request) => (
              <Card
                key={request.id}
                className="border-2 h-fit shrink-0 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <CardHeader className="flex items-center gap-4 border-b">
                  <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-secondary">
                    <User className="h-3.5 w-3.5" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-base font-semibold">
                      {request.student?.firstName} {request.student?.lastName}
                    </h3>

                    <p className="text-sm text-muted-foreground">Student</p>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 py-4">
                  <div className="flex gap-4">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary">
                      <FileText className="h-3.5 w-3.5" />
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Document</p>

                      <p className="font-medium">{request.document}</p>
                    </div>
                  </div>

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
                      <p className="text-sm text-muted-foreground">
                        Date Requested
                      </p>

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

                      <StatusStepper request={request} />
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="border-t">
                  <Button
                    variant="default"
                    className="w-full h-fit p-2"
                    onClick={() => {
                      setSelectedRequestId(request.id);
                    }}
                  >
                    View Full Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>
      </section>
    </>
  );
}

export default ManageRequestTab;
