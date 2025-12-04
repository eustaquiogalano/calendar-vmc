import { StudentInterface } from "./StudentUI/StudentUI";
import "./Main.css";
import { LoginRegisterForm } from "./Section";

function PageMain() {
  return (
    <main>
      {/* <LoginRegisterForm /> */}
      <StudentInterface />
    </main>
  );
}

export { PageMain };
