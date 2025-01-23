import { push } from "../../utils/router.js";

function AddButton({ $target, docId, onCreate }) {
  const $addButton = document.createElement("button");
  $addButton.name = "addButton";
  $addButton.textContent = "➕";
  $target.appendChild($addButton);

  $addButton.addEventListener("click", async (event) => {
    event.stopPropagation();
    const newDoc = await onCreate({ parent: docId, title: "제목 없음" });
    if (newDoc && newDoc.id) {
      push(`/documents/${newDoc.id}`);
    }
  });
}

function DeleteButton({ $target }) {
  const $deleteButton = document.createElement("button");
  $deleteButton.name = "deleteButton";
  $deleteButton.textContent = "➖";

  $target.appendChild($deleteButton);
}

function ToggleButton({ $target, docId, hasChildren, onToggle }) {
  const $toggleButton = document.createElement("button");
  $toggleButton.name = "toggleButton";
  $toggleButton.dataset.id = docId;
  $toggleButton.className =
    "toggle-button" + (hasChildren ? " has-children" : "");
  $toggleButton.textContent = hasChildren ? "📂" : "📄";

  $toggleButton.addEventListener("click", (e) => {
    e.stopPropagation();
    onToggle(docId);
  });

  $target.appendChild($toggleButton);
}

function NewPageButton({ $target, onCreate }) {
  const $newPageButton = document.createElement("button");
  $newPageButton.textContent = "새 페이지 만들기";
  $newPageButton.id = "newPage";
  $newPageButton.name = "addButton";

  $target.appendChild($newPageButton);

  $newPageButton.addEventListener("click", async (e) => {
    e.stopPropagation();
    const newDoc = await onCreate({ parent: null, title: "제목 없음" });
    if (newDoc && newDoc.id) {
      push(`/documents/${newDoc.id}`);
    }
  });
}

export { AddButton, DeleteButton, ToggleButton, NewPageButton };
