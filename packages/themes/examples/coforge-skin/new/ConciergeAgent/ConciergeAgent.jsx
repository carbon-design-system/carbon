/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  HeaderPanel,
  InlineNotification,
  Tag,
  TextInput,
} from '../../app/carbon';

export function ConciergeAgent({
  open,
  screen,
  messages,
  toolChips,
  suggestedTools,
  onSend,
  onRunTool,
  onClose,
}) {
  const [draft, setDraft] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [messages, open]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }
    const onKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <HeaderPanel
      className="luma-concierge-agent"
      expanded={open}
      addFocusListeners={false}
      aria-hidden={!open}>
      <div className="luma-concierge-agent__body" id="luma-concierge">
        <div className="luma-concierge-agent__head">
          <p className="luma-job-door__meta">
            Travel concierge · MAD → KRK · 8 pax
          </p>
          <Button kind="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
        <p>
          I fill search, select flights, add a stay, and fill passengers. I
          never confirm Pay.
        </p>
        {suggestedTools?.length ? (
          <div className="luma-concierge-agent__chips">
            {suggestedTools.map((tool) => (
              <Button
                key={tool.id}
                kind="ghost"
                size="sm"
                onClick={() => onRunTool(tool.id, tool.args)}>
                {tool.label}
              </Button>
            ))}
          </div>
        ) : null}
        {toolChips?.length ? (
          <div className="luma-concierge-agent__chips">
            {toolChips.map((chip) => (
              <Tag key={chip} type="outline" size="sm">
                {chip}
              </Tag>
            ))}
          </div>
        ) : null}
        <ol className="luma-concierge-agent__log">
          {messages.map((msg) => (
            <li key={msg.id} data-role={msg.role}>
              <span>{msg.role === 'user' ? 'You' : 'Concierge'}</span>
              <p>{msg.text}</p>
            </li>
          ))}
        </ol>
        <div ref={endRef} />
        {screen === 'payment' ? (
          <InlineNotification
            kind="info"
            lowContrast
            hideCloseButton
            title="Pay stays on this screen"
            subtitle="I can walk you to Payment. Confirm with the Pay button."
          />
        ) : null}
        <form
          className="luma-concierge-agent__compose"
          onSubmit={(event) => {
            event.preventDefault();
            const text = draft.trim();
            if (!text) {
              return;
            }
            setDraft('');
            onSend(text);
          }}>
          <TextInput
            id="concierge-ask"
            labelText="Ask the concierge"
            placeholder="Madrid to Kraków, fill passengers…"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />
          <Button type="submit" kind="primary" size="lg">
            Send
          </Button>
        </form>
      </div>
    </HeaderPanel>
  );
}
