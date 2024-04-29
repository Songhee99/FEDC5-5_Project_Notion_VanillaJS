import { push } from "../../utils/router.js";

export default function DocumentList({
  $target,
  initialState,
  onCreate,
  onDelete,
}) {
  const $documentListContainer = document.createElement("div");
  $documentListContainer.className = "document-list-container"; // 스크롤을 위한 컨테이너
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
            return `<li class="item" data-id=${doc.id}>
              <span name="item-content">${
                doc.title.trim() === "" ? "제목 없음" : doc.title
              }</span>
              <div data-group-id=${doc.id} class="button-group">
                <button name="addButton">+</button>
                <button name="deleteButton">-</button>
              </div>
            </li>
            ${
              doc.documents && doc.documents.length > 0
                ? this.setDepth(
                    doc.documents,
                    !this.state.selectedDocument.has(`${doc.id}`)
                  )
                : ""
            }
            `;
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
    const id = $li?.dataset.id;

    switch (target.getAttribute("name")) {
      case "addButton":
        this.setState({
          selectedDocument: this.state.selectedDocument.add(id),
        });
        onCreate({ parent: id || null, title: "제목 없음" });
        break;
      case "deleteButton":
        onDelete({ id });
        break;
      case "item-content":
        const selectedDocument = this.state.selectedDocument;
        if (selectedDocument.has(id)) {
          selectedDocument.delete(id);
        } else {
          selectedDocument.add(id);
        }
        this.setState({ selectedDocument });
        push(`/documents/${id}`);
        break;
      default:
        break;
    }
  });
}
