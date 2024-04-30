import { request } from "../../utils/request.js";
import { push } from "../../utils/router.js";
import DocumentList from "./DocumentList.js";

export default function DocumentBox({ $target }) {
  const $documentBox = document.createElement("div");
  $documentBox.className = "document-box";
  $target.appendChild($documentBox);

  const reSizeHandle = document.createElement("div");
  reSizeHandle.className = "reSize-handle";
  $documentBox.appendChild(reSizeHandle);

  const documentList = new DocumentList({
    $target: $documentBox,
    initialState: { document: [], selectedDocument: new Set() },

    onCreate: async ({ parent, title }) => {
      await request("/documents", {
        method: "POST",
        body: JSON.stringify({ parent, title }),
      });
      this.fetchDocuments();
    },

    onDelete: async ({ id }) => {
      await request(`/documents/${id}`, {
        method: "DELETE",
      });
      push("/");
      this.fetchDocuments();
    },
  });

  this.fetchDocuments = async () => {
    const documents = await request("/documents");
    documentList.setState({ document: documents });
  };

  let isReSizing = false;
  reSizeHandle.addEventListener("mousedown", function (e) {
    isReSizing = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", stopReSize);
  });

  function handleMouseMove(e) {
    if (!isReSizing) return;
    const newWidth = e.clientX;
    $documentBox.style.width = `${newWidth}px`;
  }

  function stopReSize(e) {
    isReSizing = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", stopReSize);
  }
}
