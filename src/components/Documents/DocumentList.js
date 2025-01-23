import { push } from "../../utils/router.js";
import {
  AddButton,
  DeleteButton,
  ToggleButton,
  NewPageButton,
} from "./Buttons.js";

export default function DocumentList({
  $target,
  initialState,
  onCreate,
  onDelete,
}) {
  const $documentListContainer = document.createElement("div");
  $documentListContainer.className = "document-list-container";
  $target.appendChild($documentListContainer);

  const $documentList = document.createElement("div");
  $documentList.className = "document-list";
  $documentListContainer.appendChild($documentList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    this.render();
  };

  this.setDepth = (documentList, hide = false) => {
    const $ul = document.createElement("ul");
    $ul.className = hide ? "hidden" : "";

    documentList.forEach((doc) => {
      const $li = document.createElement("li");
      $li.className = "item";
      $li.dataset.id = doc.id;

      ToggleButton({
        $target: $li,
        docId: doc.id,
        hasChildren: doc.documents && doc.documents.length > 0,
        onToggle: (id) => this.handleToggle(id),
      });

      const $span = document.createElement("span");
      $span.name = "item-content";
      $span.className =
        "document-title" +
        (this.state.selectedDocumentId === doc.id ? " selected-item" : "");
      $span.textContent = doc.title.trim() === "" ? "제목 없음" : doc.title;
      $li.appendChild($span);

      const $buttonGroup = document.createElement("div");
      $buttonGroup.className = "button-group";
      $li.appendChild($buttonGroup);

      AddButton({
        $target: $buttonGroup,
        docId: doc.id,
        onCreate,
      });

      DeleteButton({
        $target: $buttonGroup,
        docId: doc.id,
        onDelete,
      });

      if (doc.documents && doc.documents.length > 0) {
        $li.appendChild(
          this.setDepth(
            doc.documents,
            !this.state.selectedDocument.has(String(doc.id))
          )
        );
      }

      $ul.appendChild($li);
    });

    return $ul;
  };

  this.handleToggle = (id) => {
    const selectedDocument = this.state.selectedDocument;
    if (selectedDocument.has(String(id))) {
      selectedDocument.delete(String(id));
    } else {
      selectedDocument.add(String(id));
    }
    this.setState({ selectedDocumentId: id });
  };

  this.render = () => {
    $documentList.innerHTML = "";
    if (this.state.document && this.state.document.length > 0) {
      $documentList.appendChild(this.setDepth(this.state.document));
    } else {
      $documentList.innerHTML = `<span id="emptyPage">페이지가 없어요 😢</span>`;
    }
    new NewPageButton({
      $target: $documentList,
      onCreate,
    });
  };

  $documentList.addEventListener("click", (e) => {
    const target = e.target;
    const $li = target.closest("li");
    const id = parseInt($li?.dataset.id, 10);

    switch (target.name) {
      case "addButton":
        onCreate({ parent: id || null, title: "제목 없음" });
        break;
      case "deleteButton":
        onDelete({ id });
        break;
      case "item-content":
        push(`/documents/${id}`);
        this.setState({ selectedDocumentId: id });
        break;
    }
  });
}
