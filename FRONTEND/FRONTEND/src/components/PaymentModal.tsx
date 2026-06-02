import { useState } from 'react';
import './PaymentModal.css';

interface PaymentModalProps {
  amountCoins: number;
  onCancel: () => void;
  onConfirm: (method: 'paypal' | 'tarjeta', cardLast4?: string) => void;
}

export default function PaymentModal({ amountCoins, onCancel, onConfirm }: PaymentModalProps) {
  const [method, setMethod] = useState<'paypal' | 'tarjeta' | ''>('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const canConfirm = method === 'paypal' || method === 'tarjeta';

  const handleConfirm = () => {
    if (!canConfirm) return;
    const last4 = method === 'tarjeta' ? cardNumber.replace(/\s+/g, '').slice(-4) : undefined;
    onConfirm(method as 'paypal' | 'tarjeta', last4);
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Método de pago</h3>
          <button onClick={onCancel} className="close-button">&times;</button>
        </div>
        <div className="payment-body">
          <p>Recargar {amountCoins.toLocaleString()} monedas</p>
          <div className="method-options">
            <button className={method === 'paypal' ? 'selected' : ''} onClick={() => setMethod('paypal')}>PayPal</button>
            <button className={method === 'tarjeta' ? 'selected' : ''} onClick={() => setMethod('tarjeta')}>Tarjeta</button>
          </div>
          {method === 'tarjeta' && (
            <div className="card-form">
              <input type="text" placeholder="Número de tarjeta" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
              <input type="text" placeholder="MM/AA" value={expiry} onChange={(e) => setExpiry(e.target.value)} />
              <input type="password" placeholder="CVV" value={cvv} onChange={(e) => setCvv(e.target.value)} />
            </div>
          )}
          <div className="actions">
            <button onClick={onCancel} className="cancel">Cancelar</button>
            <button onClick={handleConfirm} disabled={!canConfirm} className="confirm">Pagar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
