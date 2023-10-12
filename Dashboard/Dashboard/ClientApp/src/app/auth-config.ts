import { LogLevel, Configuration, BrowserCacheLocation } from '@azure/msal-browser';

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

export const b2cPolicies = {
  names: {
    signUpSignIn: "b2c_1_fitfriendzy_signupsignin",
    editProfile: "b2c_1_fitfriendzy_edit_profile"
  },
  authorities: {
    signUpSignIn: {
      authority: "https://fitfriendzy.b2clogin.com/fitfriendzy.onmicrosoft.com/b2c_1_fitfriendzy_signupsignin",
    },
    editProfile: {
      authority: "https://fitfriendzy.b2clogin.com/fitfriendzy.onmicrosoft.com/b2c_1_fitfriendzy_edit_profile"
    }
  },
  authorityDomain: "fitfriendzy.b2clogin.com"
};


export const msalConfig: Configuration = {
  auth: {
    clientId: '3a97f5a9-46bd-4cb2-8c9f-5f8f423be6c0',
    authority: b2cPolicies.authorities.signUpSignIn.authority,
    knownAuthorities: [b2cPolicies.authorityDomain],
    redirectUri: '/',
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage,
    storeAuthStateInCookie: isIE,
  },
  system: {
    loggerOptions: {
      loggerCallback: (logLevel, message, containsPii) => {
        console.log(message);
      },
      logLevel: LogLevel.Verbose,
      piiLoggingEnabled: false
    }
  }
}

export const protectedResources = {
  userApi: {
    endpoint: "https://fitfriendzy.azurewebsites.net/api/user",
    scopes: ["https://fitfriendzy.onmicrosoft.com/ff-api/tasks.read"],
  },
}
export const loginRequest = {
  scopes: []
};
