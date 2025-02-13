const InputForm = ({ value, setValue, textLabel, placeholder, type, id }) => {
  return (
    <>
      <label htmlFor={id}>{textLabel}</label>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        id={id}
        type={type}
        placeholder={placeholder}
        className="placeholder:text-sm pl-3 py-2 placeholder:text-black font-medium rounded-xl bg-white mb-3 focus:outline-none border-2 border-stone-400 focus:ring-zinc-400 focus:ring-1"
      />
    </>
  );
};

export default InputForm;
