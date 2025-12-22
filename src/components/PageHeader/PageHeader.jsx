import vmcIcon from "../../assets/images/vmc-icon.png";
import style from "./PageHeader.module.css";
import Icon from "./../../assets/icons/menu.svg?react";
import { useMenu } from "../../context/MenuContext";

function PageHeader() {
  const { menuButtonVisibility, toggleMenuBody } = useMenu();

  return (
    <header className={style["page-header"]}>
      <img className={style["page-header__img"]} src={vmcIcon} alt="" />
      <h1 className={style["page-header__h1"]}>Services</h1>
      <button
        onClick={toggleMenuBody}
        className={`${style["studentUI__menu"]} ${style["studentUI__button"]} ${
          menuButtonVisibility ? "" : style["studentUI__menu--hide"]
        }`}
      >
        <Icon className={style["studentUI__menu-icon"]} />
      </button>
    </header>
  );
}

export { PageHeader };
