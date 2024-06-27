export const SearchField = ({
  name,
  placeholder,
  required,
  classes,
}: {
  name: string;
  placeholder: string;
  required?: boolean;
  classes?: string;
}) => {
  return (
    <>
      <label className="sr-only" htmlFor={name}>
        {name}
      </label>
      <input
        className={classes}
        id={name}
        required={required}
        type="text"
        name={name}
        placeholder={placeholder}
      />
    </>
  );
};
