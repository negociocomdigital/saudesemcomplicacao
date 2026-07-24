"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "cookie-consent";

type Consent = "granted" | "denied";

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

function pushConsentUpdate(consent: Consent) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push([
    "consent",
    "update",
    {
      ad_storage: consent,
      analytics_storage: consent,
      ad_user_data: consent,
      ad_personalization: consent,
    },
  ]);
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) setVisible(true);
  }, []);

  function responder(consent: Consent) {
    window.localStorage.setItem(STORAGE_KEY, consent);
    pushConsentUpdate(consent);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-bege/95 px-4 py-3 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-center text-xs text-chumbo-claro sm:text-left">
          Usamos cookies para melhorar sua experiência no site.{" "}
          <Link
            href="/politica-de-privacidade"
            className="underline underline-offset-2 hover:text-salvia-escuro"
          >
            Saiba mais
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => responder("denied")}
            className="rounded-pill px-3 py-1.5 text-xs font-semibold text-chumbo-claro hover:bg-black/5"
          >
            Recusar
          </button>
          <button
            onClick={() => responder("granted")}
            className="rounded-pill bg-salvia-escuro px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:brightness-110"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}
