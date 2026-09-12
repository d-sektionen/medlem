import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import request, { options } from "../request";
import { Button } from "../ui/buttons";
import AutoInput from "./input";

const AutoForm = ({
  endpoint,
  method = "POST",
  customFetcher = null,
  onSubmit = () => {},
  defaults = {},
}) => {
  const [fields, setFields] = useState();
  const [values, setValues] = useState(defaults);
  const [errors, setErrors] = useState({});

  const setValue = (field, value) => {
    setValues((old) => ({ ...old, [field]: value }));
  };

  useEffect(() => {
    // request endpoint info from server
    options(endpoint)
      .then((res) => {
        const raw = res.data.actions.POST;

        // object to array
        const arrayified = Object.keys(raw).map((key) => ({
          key,
          ...raw[key],
        }));
        const editable = arrayified.filter((f) => !f.read_only);

        setFields(editable);
      })
      .catch((_err) => {});
  }, [endpoint]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
        if (customFetcher) {
          customFetcher(values).catch((err) => {
            if (err.response) {
              setErrors(err.response.data);
            }
          });
        } else {
          request({ endpoint, method, data: values });
        }
      }}
    >
      {fields?.map((field) => (
          <React.Fragment key={field.key}>
            <AutoInput
              {...field}
              onChange={(newValue) => {
                setValue(field.key, newValue);
              }}
              value={values[field.key]}
            />
            {Object.hasOwn(errors, field.key) && (
              <div>{errors[field.key].join(", ")}</div>
            )}
          </React.Fragment>
        ))}
      <Button type="submit" onClick={() => {}}>
        Submit
      </Button>
    </form>
  );
};

AutoForm.propTypes = {
  method: PropTypes.string,
  endpoint: PropTypes.string.isRequired,
  customFetcher: PropTypes.func,
  onSubmit: PropTypes.func,
  defaults: PropTypes.object,
};

export default AutoForm;
