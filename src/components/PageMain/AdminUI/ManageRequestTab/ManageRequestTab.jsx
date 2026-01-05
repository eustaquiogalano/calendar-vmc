import { useStudentList } from "../../../../context/StudentListContext";
import AcceptedRequestCard from "./AcceptedRequestCard/AcceptedRequestCard";
import style from "./ManageRequestTab.module.css";

function ManageRequestTab() {
  const { studentList } = useStudentList();

  return (
    <>
      <section className={style["manage-request__section"]}>
        <h2>Request View</h2>
        <div className={style["manage-request__display-box"]}>
          <p>Select a request to view here</p>
        </div>
      </section>

      <section
        className={`${style["manage-request__section"]} ${style["manage-request__section--request-list"]}`}
      >
        <h2>Request List</h2>
        <div className={style["manage-request__container--request-list"]}>
          {studentList.map((student) => {
            return student.requestedDocuments
              .filter((request) => {
                if (request.status === "ACCEPTED") {
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
