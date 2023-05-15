export const InfoTooltip = ({ isOpen, onClose, message, image }) => {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <form className={`popup__container `}>
        <button
          className="popup__close-button button"
          type="button"
          onClick={onClose}
        ></button>
        <img className="InfoTooltip__image" src={image} alt="Успех" />
        <h1 className="InfoTooltip__title">{message}</h1>
      </form>
    </div>
  );
};