import { useState } from "react";

import style from "./ManageRequestTab.module.css";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useDocumentRequest } from "@/context/DocumentRequestContext";
import { documentStatusLabel } from "@/types/documentRequest";

function ManageRequestTab() {
  const { updateRequestStatus, requests, loading } = useDocumentRequest();
  const [selectedRequestId, setSelectedRequestId] = useState("");

  const selectedRequest = requests.find(
    (request) => request.id === selectedRequestId,
  );

  const handleUpdateStatus = async (id: string) => {
    await updateRequestStatus(id, "READY_FOR_PICKUP");
  };

  return (
    <>
      <section
        className={`${style["manage-request__section"]} ${style["manage-request__section--full-view"]} text-xl font-bold`}
      >
        <h2>Request View</h2>
        <div className={style["manage-request__display-box"]}>
          {selectedRequest ? (
            <Card className="w-full">
              <CardHeader>
                <CardTitle>
                  {selectedRequest.student
                    ? `${selectedRequest.student.firstName} ${selectedRequest.student.lastName}`
                    : "Unknown Student"}
                </CardTitle>
                <CardDescription>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ID#:</span>
                    <span>{selectedRequest.student?.idNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Year Level:</span>
                    <span>{selectedRequest.student?.yearLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span>{selectedRequest.student?.email}</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Document:</span>
                  <span>{selectedRequest.document}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Purpose:</span>
                  <span>{selectedRequest.purpose}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span>{selectedRequest.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span>{documentStatusLabel[selectedRequest.status]}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  disabled={loading}
                  variant="default"
                  className="w-full h-fit p-2"
                  onClick={async () => {
                    await handleUpdateStatus(selectedRequestId);
                  }}
                >
                  {loading ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    "Mark as Document Ready"
                  )}
                </Button>
              </CardFooter>
            </Card>
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
                request.status === "READY_FOR_PICKUP"
              ) {
                return request;
              }
            })
            .map((request) => (
              <Card key={request.id} className="border-2 h-fit shrink-0">
                <CardHeader>
                  <CardTitle>
                    {request.student
                      ? `${request.student.firstName} ${request.student.lastName}`
                      : "Unknown Student"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
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
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span>{documentStatusLabel[request.status]}</span>
                  </div>
                </CardContent>
                <CardFooter>
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
