"use client";

import Script from 'next/script';

export function AdBanner() {
  return (
    <>
      <div id="container-1105d8e39f67f85e9c9d56c6aea750da" className="flex justify-center items-center w-full"></div>
      <Script
        id="adsterra-native-banner"
        strategy="afterInteractive"
        src="//pl28147881.effectivegatecpm.com/1105d8e39f67f85e9c9d56c6aea750da/invoke.js"
        data-cfasync="false"
        async
      />
    </>
  );
}
