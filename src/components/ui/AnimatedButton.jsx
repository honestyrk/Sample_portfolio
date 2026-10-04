import './AnimatedButton.css';

const ArrowSVG = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
  </svg>
);

export default function AnimatedButton({ text = 'Click This', onClick }) {
  return (
    <button className="animated-button" onClick={onClick}>
      {/* arr-2: enters from left on hover */}
      <ArrowSVG className="ab-arr-2" />
      <span className="animated-button__text">{text}</span>
      <span className="animated-button__circle" />
      {/* arr-1: sits on right, exits right on hover */}
      <ArrowSVG className="ab-arr-1" />
    </button>
  );
}
