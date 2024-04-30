import { push } from "../../utils/router.js";

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
    const depth = `
      <ul class=${hide ? "hidden" : ""}>
        ${documentList
          .map((doc) => {
            const hasChildren = doc.documents && doc.documents.length > 0;
            const isSelected = this.state.selectedDocumentId === doc.id;
            return `<li class="item" data-id=${doc.id}>
              <button name="toggleButton" data-id=${
                doc.id
              } class="toggle-button${
              hasChildren ? " has-children" : " no-children"
            }"></button>
              <span name="item-content" class="${
                isSelected ? "selected-item" : ""
              }">${doc.title.trim() === "" ? "제목 없음" : doc.title}</span>
              <div data-group-id=${doc.id} class="button-group">
                <button name="addButton">+</button>
                <button name="deleteButton">-</button>
              </div>
              ${
                hasChildren
                  ? this.setDepth(
                      doc.documents,
                      !this.state.selectedDocument.has(String(doc.id))
                    )
                  : ""
              }
            </li>`;
          })
          .join("")}
      </ul>
    `;
    return depth;
  };

  this.render = () => {
    $documentList.innerHTML = "";
    if (this.state.document && this.state.document.length > 0) {
      $documentList.innerHTML =
        this.setDepth(this.state.document) +
        `<button name="addButton" id="newPage">새 페이지 만들기</button>`;
    } else {
      $documentList.innerHTML = `
        <span id="emptyPage">페이지가 없어요 😢</span>
        <button name="addButton" id="newPage">새 페이지 만들기</button>
      `;
    }
  };

  $documentList.addEventListener("click", (e) => {
    const { target } = e;
    const $li = target.closest("li");
    const id = parseInt($li?.dataset.id, 10);

    switch (target.getAttribute("name")) {
      case "addButton":
        this.setState({
          selectedDocument: this.state.selectedDocument.add(String(id)),
          selectedDocumentId: id,
        });
        onCreate({ parent: id || null, title: "제목 없음" });
        break;
      case "deleteButton":
        onDelete({ id });
        this.setState({
          selectedDocumentId: null,
        });
        break;
      case "item-content":
        push(`/documents/${id}`);
        this.setState({
          selectedDocumentId: id,
        });
        break;
      case "toggleButton":
        const selectedDocument = this.state.selectedDocument;
        if (selectedDocument.has(String(id))) {
          selectedDocument.delete(String(id));
        } else {
          selectedDocument.add(String(id));
        }
        this.setState({ selectedDocument, selectedDocumentId: id });
        break;
      default:
        break;
    }
  });
}
