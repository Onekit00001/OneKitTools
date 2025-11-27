"use client";

// This component is no longer used for the global ad strategy
// but is kept in case of future specific ad placements.
// You can safely remove this file if you do not intend to use it elsewhere.

import Script from 'next/script';

export function AdBanner() {
  return (
    <div className="w-full flex justify-center my-8">
      {/* Container for the ad */}
      <div id="container-1105d8e39f67f85e9c9d56c6aea750da" className="text-center" />
      <Script
        id="adsterra-native-banner"
        strategy="afterInteractive"
        src="//pl28147881.effectivegatecpm.com/1105d8e39f67f85e9c9d56c6aea750da/invoke.js"
        data-cfasync="false"
        async
      />
    </div>
  );
}
