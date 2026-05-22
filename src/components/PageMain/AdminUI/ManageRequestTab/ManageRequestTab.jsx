import { useState } from "react";
import { useUser } from "../../../../context/UserContext";
import AcceptedRequestCard from "./AcceptedRequestCard/AcceptedRequestCard";
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

function ManageRequestTab() {
  const { students, updateRequestStatus, loading, setLoading } = useUser();
  const [selectedRequest, setSelectedRequest] = useState(undefined);
  const { student, request } = selectedRequest || {};

  console.log(selectedRequest);

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
                <CardTitle>{`${student.firstName} ${student.lastName}`}</CardTitle>
                <CardDescription>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ID#:</span>
                    <span>{student.idNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Year Level:</span>
                    <span>{student.yearLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span>{student.email}</span>
                  </div>
                </CardDescription>
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
                  <span>{request.status}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  disabled={loading}
                  variant="default"
                  className="w-full h-fit p-2"
                  onClick={async () => {
                    setLoading(true);
                    await updateRequestStatus(
                      student,
                      request.id,
                      "DOCUMENT READY",
                      request,
                    );
                    setSelectedRequest({
                      student,
                      request: { ...request, status: "DOCUMENT READY" },
                    });
                    console.log(selectedRequest);

                    setLoading(false);
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
          {students.map((student) => {
            return student.requestedDocuments
              .filter((request) => {
                if (
                  request.status === "ACCEPTED" ||
                  request.status === "DOCUMENT READY"
                ) {
                  return request;
                }
              })
              .map((request) => {
                return (
                  <Card key={request.id} className="border-2 h-fit shrink-0">
                    <CardHeader>
                      <CardTitle>{`${student.firstName} ${student.lastName}`}</CardTitle>
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
                        <span>{request.status}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="default"
                        className="w-full h-fit p-2"
                        onClick={() => setSelectedRequest({ student, request })}
                      >
                        View Full Details
                      </Button>
                    </CardFooter>
                  </Card>
                );
              });
          })}
        </div>
      </section>
    </>
  );
}

export default ManageRequestTab;
