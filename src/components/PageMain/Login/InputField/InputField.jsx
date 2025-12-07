import style from "./InputField.module.css";

function InputField({
  htmlFor,
  text,
  type = "text",
  name,
  id,
  placeholder = "",
}) {
  return (
    <div className={style["input-field"]}>
      <label className={style["input-field__label"]} htmlFor={htmlFor}>
        {text}
      </label>
      <input
        className={style["input-field__input"]}
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
      />
    </div>
  );
}

export default InputField;
