import style from "./DocumentRequestTab.module.css";

function DocumentRequestTab() {
  return (
    <>
      <section
        className={`${style["document-request-tab__section"]} ${style["document-request-tab__create-request"]}`}
      >
        <h2>Create Request</h2>
        <div className={style["document-request-tab__request-form-container"]}>
          <div className={style["document-request-tab__div"]}>
            <label htmlFor="document">Document Requested:</label>
            <select name="document" id="document">
              <option value="" selected disabled></option>
              <option value="diploma">Diploma</option>
              <option value="ctc-reg-form">CTC Registration Form</option>
              <option value="tor">Transcript of Records</option>
            </select>
          </div>

          <div className={style["document-request-tab__div"]}>
            <label htmlFor="purpose"> Documents's Purpose:</label>
            <input type="text" name="purpose" id="purpose" />
          </div>

          <div className={style["document-request-tab__div"]}>
            <label htmlFor="claim-date">Preferred Ready Date:</label>
            <input type="date" name="claim-date" id="claim-date" />
          </div>
        </div>
      </section>

      <section
        className={`${style["document-request-tab__section"]} ${style["document-request-tab__pending-request"]}`}
      >
        <h2>Pending</h2>
      </section>
    </>
  );
}

export default DocumentRequestTab;
