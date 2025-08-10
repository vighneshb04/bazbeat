import React from 'react';
import { Music } from 'lucide-react';

export default function Header() {
  return (
    <header className="header">
      <h2>
        <Music size={24} style={{ marginRight: '0.5rem' }} />
        BazBeat
      </h2>
    </header>
  );
}