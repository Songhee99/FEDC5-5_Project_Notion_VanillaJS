export default function ContentEditor({ $target, initialValue, onEdit }) {
  const $editor = document.createElement("textarea");
  $editor.name = "content";
  $editor.placeholder = "내용을 입력하세요 🧚🏻‍♀️";
  $editor.spellcheck = false;
  $editor.value = initialValue;

  $target.appendChild($editor);

  let currentContent = initialValue;

  $editor.addEventListener("keyup", (e) => {
    currentContent = e.target.value;
    onEdit(currentContent);
  });

  this.updateContent = (newContent) => {
    if (newContent !== currentContent) {
      $editor.value = newContent;
      currentContent = newContent;
    }
  };
}
