import { useEffect, useId, useState } from "react";
import DateTimePicker from "./dateTimePicker";

const AutoInput = ({
  value,
  onChange,
  type,
  label,
  required,
  min_value,
  max_value,
  min_length,
  max_length,
}) => {
  const [initialOptions, setInitialOptions] = useState([]);

  // Set the initial options based on the first value received
  // biome-ignore lint/correctness/useExhaustiveDependencies: <Run only once, when the component mounts>
  useEffect(() => {
    if (value) {
      setInitialOptions(value);
    }
  }, []);

  const change = (e) => {
    onChange(e.target.value);
  };

  const id = useId();

  const optionElementsCollection = initialOptions?.map((item) => (
    <option key={item.id} value={item.id}>
      {item.name}
    </option>
  ));

  const map = {
    datetime: (
      <DateTimePicker required={required} value={value} onChange={onChange} />
    ),
    date: (
      <input
        type="date"
        id={id}
        required={required}
        value={value}
        onChange={change}
      />
    ),
    boolean: (
      <input
        type="checkbox"
        id={id}
        required={required}
        checked={value}
        onChange={(e) => {
          onChange(e.target.checked);
        }}
      />
    ),
    integer: (
      <input
        type="number"
        id={id}
        required={required}
        value={value}
        onChange={change}
        max={max_value}
        min={min_value}
      />
    ),
    field: (
      <select
        multiple
        required={required}
        value={value}
        id={id}
        onChange={(e) =>
          onChange(
            Array.from(e.target.selectedOptions, (option) => option.value),
          )
        }
      >
        {optionElementsCollection}
      </select>
    ),
  };

  const component = Object.hasOwn(map, type) ? (
    map[type]
  ) : (
    <input
      id={id}
      value={value}
      onChange={change}
      maxLength={max_length}
      minLength={min_length}
    />
  );

  let htmlFor = id;
  if (["datetime"].contains(type)) {
    // DateTime does not support id
    htmlFor = undefined;
  }

  return (
    <label htmlFor={htmlFor}>
      {`${label}`}
      {required && <span>*</span>}
      <div>{component}</div>
    </label>
  );
};
export default AutoInput;
