import { useStudentList } from "../../../../context/StudentListContext";
import IncomingCard from "./IncomingCard/IncomingCard";
import style from "./IncomingRequestTab.module.css";

function IncomingRequestTab() {
  const { studentList } = useStudentList();

  return (
    <section className={style["incoming-request__section"]}>
      <h2>Incoming Requests</h2>
      <div className={style["incoming-request__request-list"]}>
        {studentList.map((student) => {
          return (
            <div key={student.idNumber}>
              <p>
                Name: <span>{student.name}</span>
              </p>
              <div>
                {student.requestedDocuments.map((request) => {
                  return <IncomingCard key={request.id} request={request} />;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default IncomingRequestTab;
