export default function EditorPage({ $target, initialState, onEdit }) {
  const $editorPage = document.createElement("div");
  $target.appendChild($editorPage);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    $editorPage.querySelector("[name=title]").value = this.state.title;
    $editorPage.querySelector("[name=content]").value = this.state.content;
  };

  this.render = () => {
    $editorPage.innerHTML = `
      <input type="text" name="title" placeholder="제목을 입력하세요 😚" ></input>
      <textarea name="content" placeholder="내용을 입력해보세요 🧚🏻‍♀️"></textarea>
    `;
  };

  this.render();
  $editorPage.addEventListener("keyup", (e) => {
    const { target } = e;
    const { name } = target;
    const editedDocument = {
      ...this.state,
      [name]: target.value,
    };

    this.setState(editedDocument);
    onEdit(editedDocument);
  });
}
