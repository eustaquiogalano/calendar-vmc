import style from "./InputField.module.css";

function InputField({
  htmlFor,
  text,
  type = "text",
  name,
  id,
  placeholder = "",
  onValueChange,
  value,
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
        value={value}
        placeholder={placeholder}
        onChange={onValueChange}
      />
    </div>
  );
}

export default InputField;
