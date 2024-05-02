import { request } from "../../utils/request.js";
import { push } from "../../utils/router.js";
import DocumentList from "./DocumentList.js";
import ResizeHandle from "./ResizeHandle.js";

export default function DocumentBox({ $target }) {
  const $documentBox = document.createElement("div");
  $documentBox.className = "document-box";
  $target.appendChild($documentBox);

  new ResizeHandle({
    $target: $documentBox,
    onResize: (newWidth) => {
      $documentBox.style.width = `${newWidth * 0.0625}rem`;
    },
  });

  const documentList = new DocumentList({
    $target: $documentBox,
    initialState: {
      document: [],
      selectedDocument: new Set(),
      selectedDocumentId: null,
    },

    onCreate: async ({ parent, title }) => {
      const newDoc = await request("/documents", {
        method: "POST",
        body: JSON.stringify({ parent, title }),
      });
      this.fetchDocuments();
      if (newDoc && newDoc.id) {
        documentList.setState({ selectedDocumentId: newDoc.id });
        push(`/documents/${newDoc.id}`);
      }
      return newDoc;
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
}
