import DocumentBox from "./components/Documents/DocumentBox.js";
import EditorBox from "./components/Editor/EditorBox.js";
import { init } from "./utils/router.js";

export default function App({ $target }) {
  const documentBox = new DocumentBox({
    $target,
  });

  const editorBox = new EditorBox({
    $target,
    onChange: () => {
      documentBox.fetchDocuments();
    },
  });

  this.route = async () => {
    const path = window.location.hash.replace("#", "");
    const [, , documentId] = path.split("/");

    documentBox.fetchDocuments();

    if (path === "" || path === "/") {
      editorBox.setState();
    } else if (path.indexOf("/documents/") === 0) {
      editorBox.setState({ id: documentId });
    }
  };

  this.route();

  init(this.route);
}
