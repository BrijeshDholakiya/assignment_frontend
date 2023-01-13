import { OutlinedInput } from "@mui/material";
import { forwardRef } from "react";

import "../modals/style.css";

export const capitalize = (str) => str[0]?.toUpperCase?.() + str?.slice?.(1);

export const BaseInputItem = forwardRef(
  ({ id, title, error, element, autoComplete, ...props }, ref) => {
    const InputElement = element || OutlinedInput;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          margin: "5px",
        }}
      >
        <Label title={capitalize(title)} htmlFor={id} />
        <InputElement
          placeholder={capitalize(title)}
          className={`form__input ${error ? "form__input_invalid" : ""}`}
          type={"text"}
          id={id}
          {...props}
          ref={ref}
        />
        <ErrorMessage error={error} />
      </div>
    );
  }
);

export const InputItem = forwardRef(
  (
    {
      name,
      title = capitalize(name),
      form,
      element,
      autoComplete,
      required,
      onInput,
      initialValue,
      ...inputProps
    },
    ref
  ) => {
    const { errors } = form.formState;
    const registerOpts = initialValue ? { value: initialValue } : {};
    return (
      <BaseInputItem
        id={name}
        title={title}
        error={errors[name]}
        element={element}
        onInput={onInput}
        {...inputProps}
        {...form.register(name, registerOpts)}
      />
    );
  }
);

export const ErrorMessage = ({ error, className }) => {
  return (
    error && (
      <div
        className={`form__msg form__msg_invalid ${className || ""} ${
          error ? "form__msg_visible" : ""
        }`}
        style={{
          fontSize: "12px",
          fontWeight: "500",
        }}
      >
        {error && error?.message && (
          <span style={{ color: "red" }}>{error.message}</span>
        )}
      </div>
    )
  );
};

export const HeaderTitle = ({ title, variant, className }) => {
  const Header = variant || "h1";
  return (
    <Header
      className={`modal__title ${className || ""}`}
      style={{ display: "block", margin: "auto 0" }}
    >
      {title}
    </Header>
  );
};

export const Label = ({ title, htmlFor }) => {
  return (
    <label className="form__label" htmlFor={htmlFor}>
      {title}
    </label>
  );
};

export const FormColumn = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "100%",
      }}
    >
      {children}
    </div>
  );
};

export const FormRow = ({ children }) => {
  return <div style={{ display: "flex", gap: "20px" }}>{children}</div>;
};
