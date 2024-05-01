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
  $toggleButton.className = "toggle-button";
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

  $newPageButton.addEventListener("click", (e) => {
    e.stopPropagation();
    onCreate({ parent: null, title: "제목 없음" });
  });
}

export { DeleteButton, ToggleButton, NewPageButton };
