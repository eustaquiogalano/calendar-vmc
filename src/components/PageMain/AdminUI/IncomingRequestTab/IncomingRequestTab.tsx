import style from "./IncomingRequestTab.module.css";

import { useState } from "react";
import { useDocumentRequest } from "@/context/DocumentRequestContext";

import IncomingRequestCard from "@/components/IncomingRequestCard/IncomingRequestCard";
import { DocumentRequest } from "@/types/documentRequest";

function IncomingRequestTab() {
  const { requests, updateRequestStatus, loading } = useDocumentRequest();
  const [requestID, setRequestID] = useState("");
  const [activeRejectPanel, setActiveRejectPanel] = useState<string | null>(
    null,
  );
  const handleRequestRejection = async (
    remarks: DocumentRequest["remarks"],
  ) => {
    await updateRequestStatus(requestID, "REJECTED", remarks);
  };

  const handleRequestAcceptance = async (requestID: string) => {
    await updateRequestStatus(requestID, "ACCEPTED_PROCESSING", []);
  };

  return (
    <section
      className={`${style["incoming-request__section"]} gap-[.5rem] text:sm md:text-2xl font-bold`}
    >
      <h2>Incoming Requests</h2>

      <div className={`${style["incoming-request__request-list"]} md:p-[1rem]`}>
        {requests
          .filter((request) => {
            if (
              request.status !== "ACCEPTED_PROCESSING" &&
              request.status !== "READY_FOR_PICKUP" &&
              request.status !== "REJECTED" &&
              request.status !== "COMPLETED"
            ) {
              return request;
            }
          })
          .map((request) => {
            return (
              <IncomingRequestCard
                key={request.id}
                request={request}
                loading={loading}
                activeRejectPanel={activeRejectPanel}
                setActiveRejectPanel={setActiveRejectPanel}
                handleRequestAcceptance={handleRequestAcceptance}
                handleRequestRejection={handleRequestRejection}
                setRequestID={setRequestID}
              />
            );
          })}
      </div>
    </section>
  );
}

export default IncomingRequestTab;
