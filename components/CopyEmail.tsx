'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { site } from '@/lib/site';

// Copies the public email address and confirms it, with a clipboard fallback for older browsers.
export default function CopyEmail() {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');

  const copy = async () => {
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(site.email);
      else {
        const t = document.createElement('textarea'); t.value = site.email; t.setAttribute('readonly', ''); t.style.position = 'fixed'; t.style.opacity = '0';
        document.body.appendChild(t); t.select(); const ok = document.execCommand('copy'); document.body.removeChild(t);
        if (!ok) throw new Error('copy failed');
      }
      setState('copied');
    } catch { setState('failed'); }
    setTimeout(() => setState('idle'), 2000);
  };

  return (
    <button type="button" onClick={copy} className="icon-btn !h-9 !w-9 shrink-0" aria-label="Copy email address">
      {state === 'copied' ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
      <span className="sr-only" role="status">{state === 'copied' ? 'Email address copied' : state === 'failed' ? 'Could not copy. Select the address manually.' : ''}</span>
    </button>
  );
}
