import { useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";

import { useUser } from "../../../../context/UserContext";

import style from "./DocumentRequestTab.module.css";

import ConfirmationDialog from "./ConfirmationDialog/ConfirmationDialog";

function DocumentRequestTab() {
  const { addRequest, deleteRequest } = useUser();
  const { currentUser } = useOutletContext();
  const [deleteionID, setDeletionID] = useState();
  const [document, setDocument] = useState("");
  const [purpose, setPurpose] = useState("");
  const [date, setDate] = useState("");
  const { setLoading } = useUser();
  const dialogRef = useRef();

  async function submitRequest(e) {
    e.preventDefault();

    if (!e.target.checkValidity()) {
      e.target.reportValidity();
      return;
    }

    await addRequest({
      status: "PENDING",
      id: crypto.randomUUID(),
      document,
      purpose,
      date,
    });

    resetStates();
  }

  async function handleDeleteRequest() {
    await deleteRequest(currentUser, deleteionID);
    setLoading((prev) => ++prev);
    setDeletionID("");
  }

  function resetStates() {
    setDocument("");
    setPurpose("");
    setDate("");
  }

  return (
    <>
      <section
        className={`${style["document-request-tab__section"]} ${style["document-request-tab__create-request"]}`}
      >
        <h2>Create Request</h2>
        <form
          onSubmit={submitRequest}
          className={style["document-request-tab__request-form"]}
        >
          <div className={style["document-request-tab__form-field"]}>
            <label htmlFor="document">Document Requested:</label>
            <select
              required
              onChange={(e) => {
                setDocument(e.target.value);
              }}
              value={document}
              name="document"
              id="document"
            >
              <option value="" disabled>
                Select a document
              </option>
              <option value="diploma">Diploma</option>
              <option value="ctc-reg-form">CTC Registration Form</option>
              <option value="tor">Transcript of Records</option>
            </select>
          </div>

          <div className={style["document-request-tab__form-field"]}>
            <label htmlFor="purpose"> Documents's Purpose:</label>
            <input
              required
              onChange={(e) => {
                setPurpose(e.target.value);
              }}
              value={purpose}
              type="text"
              name="purpose"
              id="purpose"
            />
          </div>

          <div className={`${style["document-request-tab__form-field"]} `}>
            <label htmlFor="claim-date">Preferred Ready Date:</label>
            <input
              required
              onChange={(e) => {
                setDate(e.target.value);
              }}
              value={date}
              type="date"
              name="claim-date"
              id="claim-date"
            />
          </div>

          <div
            className={`${style["document-request-tab__div"]} ${style["document-request-tab__div--button-container"]}`}
          >
            <button
              className={style["document-request-tab__button--submit"]}
              type="submit"
            >
              Submit Request
            </button>
          </div>
        </form>
      </section>

      <section
        className={`${style["document-request-tab__section"]} ${style["document-request-tab__pending-request"]}`}
      >
        <h2>Request List</h2>

        <div className={style["document-request-tab__pending-list"]}>
          {currentUser &&
            currentUser.requestedDocuments.map((request) => {
              return (
                <div
                  key={request.id}
                  className={style["document-request-tab__div--pending"]}
                >
                  <p>
                    Document: <span>{request.document}</span>
                  </p>
                  <p>
                    Purpose: <span>{request.purpose}</span>
                  </p>
                  <p>
                    Date: <span>{request.date}</span>
                  </p>
                  <p>
                    Status: <span>{request.status}</span>
                  </p>
                  <button
                    className={
                      style["document-request-tab__button--delete-request"]
                    }
                    onClick={() => {
                      setDeletionID(request.id);
                      dialogRef.current.showModal();
                    }}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
        </div>

        <ConfirmationDialog ref={dialogRef} onConfirm={handleDeleteRequest} />
      </section>
    </>
  );
}

export default DocumentRequestTab;
