export enum Language {
  ENGLISH = "EN"
}

export interface LocaleDefinition {
  hostname: string;
  ipAddress: string;
  storeName: string;
  [key: string]: string;
}

interface LocaleAvailable {
  [key: string]: LocaleDefinition;
}


const Translation:LocaleAvailable = {
  "EN": {
      "hostname": "Hostname",
      "ipAddress": "IP Address",
      "storeName": "Store Name"
  }
}

const defaultLanguage = Language.ENGLISH;

export const getTranslator = (lang:string) => {
  const translator = Translation[lang];
  return translator;
}
