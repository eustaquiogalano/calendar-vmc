import vmcIcon from "../../assets/images/vmc-icon.png";
import style from "./PageHeader.module.css";

function PageHeader() {
  return (
    <header className={style["page-header"]}>
      <img className={style["page-header__img"]} src={vmcIcon} alt="" />
      <h1 className={style["page-header__h1"]}>Calendar</h1>
    </header>
  );
}

export { PageHeader };
