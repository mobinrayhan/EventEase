import { PHASE_DEVELOPMENT_SERVER } from "next/dist/shared/lib/constants";

import { NextConfig } from "next";

const nextConfig = (phase: string): NextConfig => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        API_URL: `http://localhost:3002`,
      },
    };
  }

  return {
    env: {
      API_URL: `http://localhost:3002`,
    },
  };
};

export default nextConfig;
