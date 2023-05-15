export default function ImagePopup({ card, onClose, isOpen }) {
  return (
    <div className={`popup popup_zoom ${isOpen ? "popup_opened" : ""}`}>
      <form className="popup__container-zoom">
        <img src={card.link} alt={card.name} className="popup__zoom-img" />
        <figcaption className="popup__img-caption">{card.name}</figcaption>
        <button
          className="popup__close-button popup__close-button-zoom button"
          type="button"
          onClick={onClose}
        ></button>
      </form>
    </div>
  );
}
