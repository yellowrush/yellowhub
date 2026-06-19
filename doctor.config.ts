import type { ReactDoctorConfig } from 'react-doctor';

/**
 * react-doctor config for yellowhub
 *
 * CI behaviour (npm run doctor):
 *  - --blocking warning → fails on any warning or error
 *  - categories Bugs & Security → warn  (block CI)
 *  - categories Performance & Maintainability → off  (advisory only)
 *
 * Usage:
 *   npm run doctor        # CI check – fails on Bugs/Security issues
 *   npm run doctor:all     # show ALL issues (no blocking)
 */
const config: ReactDoctorConfig = {
  categories: {
    Bugs: "warn",
    Security: "warn",
    Performance: "off",
    Maintainability: "off"
  },

  rules: {
    "react-doctor/react-in-jsx-scope": "off",
    "react-doctor/no-initialize-state": "off"
  }
};

export default config;