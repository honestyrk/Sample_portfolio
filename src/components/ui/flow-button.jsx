import { ArrowRight } from 'lucide-react';

export function FlowButton({ text = 'Modern Button', onClick, variant = 'dark' }) {
  return (
    <button
      className={`flow-btn flow-btn--${variant}`}
      onClick={onClick}
    >
      <ArrowRight className="flow-btn__arrow flow-btn__arrow--left" aria-hidden="true" />
      <span className="flow-btn__text">{text}</span>
      <span className="flow-btn__circle" aria-hidden="true" />
      <ArrowRight className="flow-btn__arrow flow-btn__arrow--right" aria-hidden="true" />
    </button>
  );
}