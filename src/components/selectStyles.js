const dot = (color = "transparent") => ({
  alignItems: "center",
  display: "flex",
  color: "white",
  padding: "5px",
  height: "46px",
  borderRadius: "100px",

  ":before": {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: "block",
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

const colourStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "black",
    borderRadius: "100px",
    borderStyle: "none",
  }),
  option: (styles, { isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? "#00F068"
        : isFocused
        ? "white"
        : undefined,
      color: isDisabled
        ? "gray"
        : isSelected
        ? // eslint-disable-next-line no-constant-condition
          "white"
          ? "black"
          : "black"
        : // eslint-disable-next-line no-constant-condition
        "white"
        ? isFocused
          ? "black"
          : "white"
        : "white",
      cursor: isDisabled ? "not-allowed" : "default",
    };
  },
  menu: (provided) => ({
    ...provided,
    background: "black",
    borderRadius: '8px'
  }),
  input: (styles) => ({ ...styles, ...dot("") }),
  placeholder: (styles) => ({ ...styles, ...dot("#ccc") }),
  singleValue: (styles, { data }) => ({
    ...styles,
    ...dot(data.color),
    color: "white",
  }),
};

export default colourStyles;
