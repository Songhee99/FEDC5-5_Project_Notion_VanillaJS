import ContentEditor from "./ContentEditor.js";

export default function EditorPage({ $target, initialState, onEdit }) {
  const $editorPage = document.createElement("div");
  $target.appendChild($editorPage);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    $editorPage.querySelector("[name=title]").value = this.state.title;
    if (this.contentEditor) {
      this.contentEditor.updateContent(this.state.content);
    }
  };

  this.render = () => {
    $editorPage.innerHTML = `<input type="text" name="title" placeholder="제목을 입력하세요 😚" spellcheck="false"></input>`;
    this.contentEditor = new ContentEditor({
      $target: $editorPage,
      initialValue: this.state.content,
      onEdit: (content) => {
        this.setState({ ...this.state, content });
        onEdit({ ...this.state, content });
      },
    });
  };

  this.render();
  $editorPage.addEventListener("keyup", (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      const editedDocument = { ...this.state, title: value };
      this.setState(editedDocument);
      onEdit(editedDocument);
    }
  });
}
