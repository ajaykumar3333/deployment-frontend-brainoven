import React from 'react';

const FloatingWhatsAppButton = () => {
  const containerStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 1000,
  };

  const buttonStyle = {
    backgroundColor: '#25D366',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    height: '60px',
    width: '60px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const redirectToWhatsApp = () => {
    const phoneNumber = '919390244319';
    const message = encodeURIComponent('I want to inquire about your service.');
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, '_blank');
  };

  return (
    <div style={containerStyle}>
      <button
        style={buttonStyle}
        onClick={redirectToWhatsApp}
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        {/* WhatsApp Icon SVG */}
        <svg height="32px" width="32px" viewBox="0 0 32 32" fill="white">
          <path d="M16.027 3.003c-7.156 0-12.983 5.82-12.983 12.98 0 2.285.597 4.518 1.735 6.497l-1.844 6.73 6.91-1.81c1.91 1.04 4.055 1.59 6.24 1.59h.005c7.155 0 12.982-5.82 12.982-12.982 0-3.467-1.35-6.727-3.803-9.18-2.452-2.45-5.712-3.825-9.18-3.825zm0 23.7h-.004c-1.962 0-3.89-.53-5.57-1.527l-.4-.237-4.1 1.072 1.094-3.99-.26-.41c-1.067-1.68-1.63-3.613-1.63-5.61 0-5.81 4.727-10.534 10.536-10.534 2.813 0 5.458 1.096 7.448 3.085 1.99 1.99 3.087 4.64 3.087 7.453 0 5.81-4.726 10.527-10.535 10.527zm6.077-7.902c-.33-.165-1.958-.96-2.26-1.07-.302-.11-.52-.165-.738.165-.22.33-.847 1.07-1.038 1.29-.193.22-.385.247-.715.082-.33-.165-1.393-.513-2.655-1.635-.98-.875-1.64-1.957-1.833-2.287-.193-.33-.02-.508.145-.673.15-.148.33-.385.495-.577.165-.193.22-.33.33-.55.11-.22.055-.412-.028-.577-.083-.165-.738-1.78-1.01-2.438-.265-.637-.535-.55-.738-.56-.193-.008-.412-.01-.63-.01-.22 0-.577.083-.877.412-.302.33-1.155 1.13-1.155 2.743 0 1.613 1.183 3.174 1.347 3.393.165.22 2.322 3.553 5.625 4.973.787.34 1.4.543 1.88.694.79.253 1.507.217 2.074.132.632-.094 1.958-.8 2.235-1.572.275-.77.275-1.43.193-1.572-.083-.14-.303-.22-.632-.385z"/>
        </svg>
      </button>
    </div>
  );
};

export default FloatingWhatsAppButton;
