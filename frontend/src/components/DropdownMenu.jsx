export default function DropdownMenu({ options }) {
  return (
    <div className="select">
      <div
        className="selected"
        data-default="All"
        data-one="option-1"
        data-two="option-2"
        data-three="option-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 512 512"
          className="arrow"
        >
          <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path>
        </svg>
      </div>
      <div className="options">
        <div title="all">
          <input id="all" name="option" type="radio" checked="" />
          <label className="option" htmlFor="all" data-txt="Wybierz"></label>
        </div>
        {options.map((option, index) => (
          <div key={index} title={`${option}`} className="">
            <input id={`option-${index + 1}`} name="option" type="radio" />
            <label
              className="option"
              htmlFor={`option-${index + 1}`}
              data-txt={`${option}`}
            ></label>
          </div>
        ))}
      </div>
    </div>
  );
}
