import FindNotebooksCommand from "./components/FindNotebooksCommand";
import SelfHostedCommand from "./components/SelfHostedCommand";

export default function FindNotebooksSelfHosted() {
  return <SelfHostedCommand command={(src) => FindNotebooksCommand(src)} />;
}
