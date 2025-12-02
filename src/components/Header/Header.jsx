import vmcIcon from "../../assets/vmc-icon.png";
import "./Header.css";

function PageHeader() {
  return (
    <header>
      <img src={vmcIcon} alt="" />
      <h1>Calendar</h1>
    </header>
  );
}

export { PageHeader };
