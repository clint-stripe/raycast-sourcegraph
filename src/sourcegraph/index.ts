import { getPreferenceValues } from "@raycast/api";

export interface Sourcegraph {
  instance: string;
  token?: string;
  defaultContext?: string;
}

const cloudURL = "https://sourcegraph.com";

export function isCloud(instance: string) {
  return instance === cloudURL;
}

export function instanceName(src: Sourcegraph) {
  return `${isCloud(src.instance) ? "Sourcegraph Cloud" : new URL(src.instance).hostname}`;
}

interface Preferences {
  cloudToken?: string;
  cloudDefaultContext?: string;

  customInstance?: string;
  customInstanceToken?: string;
  customInstanceDefaultContext?: string;
}

// sourcegraphCloud returns configuration for connecting to Sourcegraph Cloud.
export function sourcegraphCloud(): Sourcegraph {
  const prefs: Preferences = getPreferenceValues();
  return {
    instance: cloudURL,
    token: prefs.cloudToken,
    defaultContext: prefs.cloudDefaultContext,
  };
}

// sourcegraphSelfHosted returns the configured Sourcegraph instance.
export function sourcegraphSelfHosted(): Sourcegraph | null {
  const prefs: Preferences = getPreferenceValues();
  if (prefs.customInstance) {
    return {
      instance: prefs.customInstance.replace(/\/$/, ""),
      token: prefs.customInstanceToken,
      defaultContext: prefs.customInstanceDefaultContext,
    };
  }
  return null;
}
