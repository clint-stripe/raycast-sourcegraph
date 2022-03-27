import { ApolloProvider } from "@apollo/client";
import { ActionPanel, Detail, Action } from "@raycast/api";
import { useEffect } from "react";

import checkAuthEffect from "../hooks/checkAuthEffect";
import { sourcegraphSelfHosted, Sourcegraph } from "../sourcegraph";
import { newApolloClient } from "../sourcegraph/gql/apollo";

/**
 * SelfHostedCommand wraps the given command with the configuration for a self-hosted
 * Sourcegraph instance.
 */
export default function SelfHostedCommand({ Command }: { Command: React.FunctionComponent<{ src: Sourcegraph }> }) {
  const tryCloudMessage = "Alternatively, you can try the Sourcegraph Cloud version of this command first.";

  const helpActions = (
    <ActionPanel>
      <Action.OpenInBrowser
        title="Open Setup Guide"
        url="https://github.com/raycast/extensions/tree/main/extensions/sourcegraph#setup"
      />
    </ActionPanel>
  );

  const src = sourcegraphSelfHosted();
  if (!src) {
    return (
      <Detail
        navigationTitle="No Sourcegraph Self-Hosted instance configured"
        markdown={`**⚠️ No Sourcegraph Sourcegraph Self-Hosted instance configured** - set one up in the extension preferences!\n\n${tryCloudMessage}`}
        actions={helpActions}
      />
    );
  }
  try {
    new URL(src.instance);
  } catch (e) {
    return (
      <Detail
        navigationTitle="Invalid Sourcegraph Self-Hosted URL"
        markdown={`**⚠️ Sourcegraph Self-Hosted URL '${src.instance}' is invalid:** ${e}\n\nUpdate it in the extension preferences!\n\n${tryCloudMessage}`}
        actions={helpActions}
      />
    );
  }
  if (!src.token) {
    return (
      <Detail
        navigationTitle="Invalid Sourcegraph Self-Hosted access token"
        markdown={`**⚠️ A token is required for Sourcegraph Self-Hosted instance '${src.instance}'** - add an access token for Sourcegraph Self-Hosted in the extension preferences!\n\n${tryCloudMessage}`}
        actions={helpActions}
      />
    );
  }

  useEffect(checkAuthEffect(src));

  return (
    <ApolloProvider client={newApolloClient(src)}>
      <Command src={src} />
    </ApolloProvider>
  );
}
