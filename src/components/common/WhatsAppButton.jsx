import "./WhatsAppButton.css";

const WHATSAPP_NUMBER = "918209978891";
const WHATSAPP_MESSAGE = "Hi Shape-360, I'm interested in your services.";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

const WhatsAppButton = () => {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noreferrer"
      className="whatsapp-fab-wrap"
      aria-label="Chat with Shape-360 on WhatsApp"
    >
      <span className="whatsapp-fab-tooltip">
        <strong>Chat on WhatsApp</strong>
        <span>+91 82099 78891</span>
      </span>

      <span className="whatsapp-fab">
        <span className="whatsapp-fab-ring" aria-hidden="true"></span>
        <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26" aria-hidden="true">
          <path d="M2.004 22l1.352-4.968A9.954 9.954 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.954 9.954 0 01-5.03-1.355L2.004 22zM8.391 7.308a.961.961 0 00-.371.1 1.293 1.293 0 00-.294.228c-.12.113-.188.211-.261.306A2.729 2.729 0 006.9 9.62c.002.49.13.967.33 1.413.409.902 1.082 1.857 1.971 2.742.214.213.423.427.648.626a9.448 9.448 0 003.84 2.046l.569.087c.185.01.37-.004.556-.013a1.99 1.99 0 00.833-.231 4.83 4.83 0 00.383-.22s.043-.028.125-.09c.135-.1.218-.171.33-.288.083-.086.155-.187.21-.302.078-.163.156-.474.188-.733.024-.198.017-.306.014-.373-.004-.107-.093-.218-.19-.265l-.582-.261s-.87-.379-1.401-.621a.498.498 0 00-.177-.041.482.482 0 00-.378.127v-.002c-.005 0-.072.057-.795.933a.35.35 0 01-.368.13 1.416 1.416 0 01-.191-.066l-.1-.049a6.842 6.842 0 01-1.7-1.098 7.07 7.07 0 01-.51-.51c-.346-.358-.636-.732-.871-1.073l-.057-.089a.96.96 0 01-.1-.183c-.026-.106.032-.2.032-.2s.193-.218.295-.34c.096-.116.182-.238.255-.365a.54.54 0 00.068-.438 38.108 38.108 0 00-.61-1.44c-.065-.155-.197-.256-.346-.3a1.375 1.375 0 00-.217-.033c-.108-.007-.221-.011-.338-.014z"/>
        </svg>
      </span>
    </a>
  );
};

export default WhatsAppButton;
