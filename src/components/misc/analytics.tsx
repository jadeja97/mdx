import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

import { getConfig } from "@/main";

import type { ReactElement } from "react";

/* ============================================================================================= */

const config = getConfig();

const { PROD } = config.constants;

/* ============================================================================================= */

export const GA4 = (): null | ReactElement => {
  //
  if (!(PROD && config.analytics?.google)) {
    return null;
  }

  return <GoogleAnalytics gaId={config.analytics.google} />;
};

/* ============================================================================================= */

export const MSClarity = (): null | ReactElement<HTMLScriptElement> => {
  //
  if (!(PROD && config.analytics?.msClarity)) {
    return null;
  }

  return (
    <Script id="ms-clarity" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){
          c[a] = c[a] || function() { (c[a].q = c[a].q || []).push(arguments) };
          t = l.createElement(r);
          t.async=1;
          t.src="https://www.clarity.ms/tag/"+i;
          y = l.getElementsByTagName(r)[0];
          y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", ${config.analytics.msClarity});
      `}
    </Script>
  );
};
