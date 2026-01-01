import { forwardRef } from "react";
import style from "./ConfirmationDialog.module.css";

const ConfirmationDialog = forwardRef(function ConfirmationDialog(
  { onConfirm },
  ref
) {
  return (
    <dialog className={style["confirmation-dialog"]} ref={ref}>
      <p>Do you want to delete the request?</p>

      <div className={style["confirmation-dialog__button-container"]}>
        <button
          className={style["confirmation-dialog__button"]}
          onClick={() => {
            onConfirm();
            ref.current.close();
          }}
        >
          Delete
        </button>
        <button
          className={style["confirmation-dialog__button"]}
          onClick={() => ref.current.close()}
        >
          Cancel
        </button>
      </div>
    </dialog>
  );
});

export default ConfirmationDialog;
