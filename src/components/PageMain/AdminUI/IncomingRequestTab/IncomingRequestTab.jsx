import { useStudentList } from "../../../../context/StudentListContext";
import IncomingCard from "./IncomingCard/IncomingCard";
import style from "./IncomingRequestTab.module.css";

function IncomingRequestTab() {
  const { studentList } = useStudentList();

  console.log(studentList);

  return (
    <section className={style["incoming-request__section"]}>
      <h2>Incoming Requests</h2>

      <div className={style["incoming-request__request-list"]}>
        {studentList.map((student) => {
          return student.requestedDocuments
            .filter((request) => {
              if (request.status === "PENDING") {
                return request;
              }
            })
            .map((request) => {
              return (
                <IncomingCard
                  key={request.id}
                  student={student}
                  request={request}
                />
              );
            });
        })}
      </div>
    </section>
  );
}

export default IncomingRequestTab;
