/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import {
  Button,
  Form,
  InlineNotification,
  PasswordInput,
  TextInput,
} from '../../app/carbon';
import { euros } from './format';

export function PaymentScreen({ grandTotal, onPay }) {
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [cardName, setCardName] = useState('María García López');
  const [expiry, setExpiry] = useState('04/28');
  const [cvc, setCvc] = useState('424');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const handlePay = () => {
    if (!cardNumber.replace(/\s/g, '') || !cardName || !expiry || !cvc) {
      setError('Every payment field needs a value before Pay.');
      return;
    }
    setError('');
    setProcessing(true);
    window.setTimeout(() => {
      setProcessing(false);
      onPay();
    }, 1200);
  };

  return (
    <>
      <h1>Confirm and pay</h1>
      <p>Prototype card only. The concierge cannot press this button.</p>
      {error ? (
        <InlineNotification
          kind="error"
          lowContrast
          title="Cannot pay yet"
          subtitle={error}
          onClose={() => setError('')}
        />
      ) : null}
      <Form>
        <TextInput
          id="card-name"
          labelText="Name on card"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
        />
        <TextInput
          id="card-number"
          labelText="Card number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        <TextInput
          id="card-exp"
          labelText="Expiry"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
        />
        <PasswordInput
          id="card-cvc"
          labelText="Security code"
          value={cvc}
          onChange={(e) => setCvc(e.target.value)}
        />
      </Form>
      <p>
        Amount due: <strong>{euros(grandTotal)}</strong>
      </p>
      <Button
        kind="primary"
        size="lg"
        disabled={processing}
        onClick={handlePay}>
        {processing ? 'Processing…' : `Pay ${euros(grandTotal)}`}
      </Button>
    </>
  );
}
