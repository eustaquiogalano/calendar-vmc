import { useState } from "react";
import { useRequest } from "../../../../context/RequestContext";
import style from "./DocumentRequestTab.module.css";

function DocumentRequestTab() {
  const { requestList, setRequestList } = useRequest();
  const [document, setDocument] = useState("");
  const [purpose, setPurpose] = useState("");
  const [date, setDate] = useState("");

  console.log(requestList);

  function submitRequest(e) {
    e.preventDefault();
    console.log(e.target);

    if (!e.target.checkValidity()) {
      e.target.reportValidity();
      return;
    }

    setRequestList([...requestList, { document, purpose, date }]);
    resetStates();
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
          className={style["document-request-tab__request-form-container"]}
        >
          <div className={style["document-request-tab__div"]}>
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

          <div className={style["document-request-tab__div"]}>
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

          <div className={`${style["document-request-tab__div"]} `}>
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
        <h2>Pending</h2>

        <div className={style["document-request-tab__pending-list"]}>
          {requestList.map((request) => {
            return (
              <div className={style["document-request-tab__div--pending"]}>
                <p>
                  Document: <span>{request.document}</span>
                </p>
                <p>
                  Purpose: <span>{request.purpose}</span>
                </p>
                <p>
                  Date: <span>{request.date}</span>
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default DocumentRequestTab;
