import { useState } from "react";
import { useUser } from "../../../../context/UserContext";
import AcceptedRequestCard from "./AcceptedRequestCard/AcceptedRequestCard";
import style from "./ManageRequestTab.module.css";

function ManageRequestTab() {
  const { students, updateRequestStatus } = useUser();
  const [selectedRequest, setSelectedRequest] = useState(undefined);
  const { student, request } = selectedRequest || {};

  return (
    <>
      <section
        className={`${style["manage-request__section"]} ${style["manage-request__section--full-view"]}`}
      >
        <h2>Request View</h2>
        <div className={style["manage-request__display-box"]}>
          {selectedRequest ? (
            <div className={style["manage-request__selected-container"]}>
              <div className={style["manage-request__selected--student"]}>
                <h4>Student: </h4>
                <p>
                  Name: <span>{student.firstName}</span>
                </p>
                <p>
                  ID#: <span>{student.idNumber}</span>
                </p>
                <p>
                  Year Level: <span>{student.yearLevel}</span>
                </p>
                <p>
                  e-mail: <span>{student.email}</span>
                </p>
              </div>

              <div className={style["manage-request__selected--request"]}>
                <h4>Requesting for:</h4>
                <p>
                  Document: <span>{request.document}</span>
                </p>
                <p>
                  Purpose: <span>{request.purpose}</span>
                </p>
                <p>
                  Claim Date: <span>{request.date}</span>
                </p>
                <p>
                  Status: <span>{request.status}</span>
                </p>
              </div>
              <div className={style["manage-request__container-button"]}>
                <button
                  onClick={() => {
                    updateRequestStatus(
                      student,
                      request.id,
                      "DOCUMENT READY",
                      request
                    );
                  }}
                  className={style["manage-request__button--document-ready"]}
                >
                  Document Ready
                </button>
              </div>
            </div>
          ) : (
            <p>Select a request to view here</p>
          )}
        </div>
      </section>

      <section
        className={`${style["manage-request__section"]} ${style["manage-request__section--request-list"]}`}
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
                console.log(request);

                return (
                  <AcceptedRequestCard
                    key={request.id}
                    request={request}
                    student={student}
                    setSelectedRequest={setSelectedRequest}
                  />
                );
              });
          })}
        </div>
      </section>
    </>
  );
}

export default ManageRequestTab;
