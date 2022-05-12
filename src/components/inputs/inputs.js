function Input({
    className, type, placeholder, onChange, value, name}){
    return (
      <input
        className={className}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        name={name}
      />
    );
  }
  
  export default Input;