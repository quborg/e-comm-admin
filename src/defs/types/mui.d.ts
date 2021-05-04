import { ComponentNameToClassKey } from '@material-ui/core/styles/overrides';

declare module '@material-ui/core/styles/overrides' {
  interface ComponentNameToClassKey {
    MUIDataTable?: {
      paper?: {
        maxHeight: string;
        overflow: string;
        display: string;
        flexDirection: string;
      };
    };
  }
}

declare module '@material-ui/core/styles/createPalette' {
  interface CommonColors {
    light: string;
    dark: string;
    gray: string;
    grayDark: string;
    blue: string;
    indigo: string;
    purple: string;
    pink: string;
    red: string;
    orange: string;
    yellow: string;
    green: string;
    teal: string;
    cyan: string;
  }
}
