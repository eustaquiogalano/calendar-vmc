import { useUser } from "../../../../context/UserContext";
import IncomingCard from "./IncomingCard/IncomingCard";
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

function IncomingRequestTab() {
  const { students, updateRequestStatus } = useUser();
  const rejectionDialogRef = useRef();
  const [student, setStudent] = useState();
  const [requestID, setRequestID] = useState();
  const [request, setRequest] = useState();

  const handleRequestRejection = () => {
    updateRequestStatus(student, requestID, "REJECTED", request);
  };

  return (
    <section
      className={`${style["incoming-request__section"]} text-xl font-bold`}
    >
      <h2>Incoming Requests</h2>

      <div className={style["incoming-request__request-list"]}>
        {students.map((student) => {
          return student.requestedDocuments
            .filter((request) => {
              if (request.status === "PENDING") {
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
                    <CardTitle>
                      {`${student.firstName} ${student.lastName}`}
                    </CardTitle>
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
                      variant="default"
                      className="w-[50%] h-fit p-2"
                      onClick={() =>
                        updateRequestStatus(
                          student,
                          request.id,
                          "ACCEPTED",
                          request,
                        )
                      }
                    >
                      Accept
                    </Button>
                    <Button
                      variant="outline"
                      className="w-[50%] h-fit p-2"
                      onClick={() => {
                        setStudent(student);
                        setRequestID(request.id);
                        setRequest(request);
                        rejectionDialogRef.current.showModal();
                      }}
                    >
                      Reject
                    </Button>
                  </CardFooter>
                </Card>
              );
            });
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
