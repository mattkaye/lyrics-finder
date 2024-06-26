export const SearchField = ({
  name,
  placeholder,
  required,
}: {
  name: string;
  placeholder: string;
  required?: boolean;
}) => {
  return (
    <>
      <label className="sr-only" htmlFor={name}>
        {name}
      </label>
      <input
        className="border-slate-300 rounded-xl p-4 border-2 w-full text-2xl"
        id={name}
        required={required}
        type="text"
        name={name}
        placeholder={placeholder}
      />
    </>
  );
};
