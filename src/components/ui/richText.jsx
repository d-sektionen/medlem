import "../../scss/richText.module.scss";

import Image from "@tiptap/extension-image";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import {
  MdCode,
  MdFormatBold,
  MdFormatClear,
  MdFormatItalic,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatQuote,
  MdFormatUnderlined,
  MdHorizontalRule,
  MdImage,
  MdLink,
  MdLooks3,
  MdLooksOne,
  MdLooksTwo,
  MdRedo,
  MdStrikethroughS,
  MdUndo,
} from "react-icons/md";

import {
  editorContent,
  toolbar,
  toolbarButton,
  toolbarButtonActive,
  toolbarDivider,
  wrapper,
} from "../../scss/richText.module.scss";

// Defined outside of the component so the extensions (and with them the whole
// schema) are only created once instead of on every render.
const extensions = [
  StarterKit.configure({
    heading: { levels: [1, 2, 3] },
    link: {
      openOnClick: false,
      autolink: true,
      defaultProtocol: "https",
      HTMLAttributes: { rel: "noopener noreferrer nofollow", target: "_blank" },
    },
  }),
  Image.configure({ allowBase64: true }),
];

const headingLevel = (editor) =>
  [1, 2, 3].find((level) => editor?.isActive("heading", { level })) ?? 0;

const ToolbarButton = ({
  label,
  isActive = false,
  disabled = false,
  onClick,
  children,
}) => (
  <button
    type="button"
    className={`${toolbarButton}${isActive ? ` ${toolbarButtonActive}` : ""}`}
    title={label}
    aria-label={label}
    aria-pressed={isActive}
    disabled={disabled}
    // Keep the selection in the editor when a toolbar button is pressed.
    onMouseDown={(event) => event.preventDefault()}
    onClick={onClick}
  >
    {children}
  </button>
);

const ToolbarDivider = () => <span className={toolbarDivider} />;

const RichText = ({ value, onChange }) => {
  const html = value ?? "";

  const editor = useEditor({
    extensions,
    content: html,
    onUpdate: ({ editor: current }) => {
      onChange?.(current.getHTML());
    },
  });

  useEffect(() => {
    if (!editor || html === editor.getHTML()) return;
    editor.commands.setContent(html, { emitUpdate: false });
  }, [editor, html]);

  // useEditorState subscribes to the editor and re-renders the toolbar only
  // when one of the selected values actually changes.
  const state = useEditorState({
    editor,
    selector: ({ editor: current }) => ({
      heading: headingLevel(current),
      bold: Boolean(current?.isActive("bold")),
      italic: Boolean(current?.isActive("italic")),
      underline: Boolean(current?.isActive("underline")),
      strike: Boolean(current?.isActive("strike")),
      blockquote: Boolean(current?.isActive("blockquote")),
      codeBlock: Boolean(current?.isActive("codeBlock")),
      bulletList: Boolean(current?.isActive("bulletList")),
      orderedList: Boolean(current?.isActive("orderedList")),
      link: Boolean(current?.isActive("link")),
      canUndo: Boolean(current?.can().undo()),
      canRedo: Boolean(current?.can().redo()),
    }),
  });

  if (!editor) return null;

  const setHeading = (level) =>
    editor.chain().focus().toggleHeading({ level }).run();

  const promptLink = () => {
    const previousUrl = editor.getAttributes("link").href ?? "";
    const url = window.prompt(
      "Länkens adress (lämna tomt för att ta bort länken):",
      previousUrl || "https://",
    );
    if (url === null) return; // cancelled

    const trimmed = url.trim();
    if (trimmed === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: trimmed })
      .run();
  };

  const promptImage = () => {
    const src = window.prompt("Bildens adress (URL):", "https://");
    if (!src?.trim()) return;
    editor.chain().focus().setImage({ src: src.trim() }).run();
  };

  const clearFormatting = () =>
    editor.chain().focus().unsetAllMarks().clearNodes().run();

  return (
    <div className={wrapper}>
      <div className={toolbar} role="toolbar" aria-label="Textformatering">
        <ToolbarButton
          label="Rubrik 1"
          isActive={state.heading === 1}
          onClick={() => setHeading(1)}
        >
          <MdLooksOne />
        </ToolbarButton>
        <ToolbarButton
          label="Rubrik 2"
          isActive={state.heading === 2}
          onClick={() => setHeading(2)}
        >
          <MdLooksTwo />
        </ToolbarButton>
        <ToolbarButton
          label="Rubrik 3"
          isActive={state.heading === 3}
          onClick={() => setHeading(3)}
        >
          <MdLooks3 />
        </ToolbarButton>

        <ToolbarDivider />

        <ToolbarButton
          label="Fet"
          isActive={state.bold}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <MdFormatBold />
        </ToolbarButton>
        <ToolbarButton
          label="Kursiv"
          isActive={state.italic}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <MdFormatItalic />
        </ToolbarButton>
        <ToolbarButton
          label="Understruken"
          isActive={state.underline}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <MdFormatUnderlined />
        </ToolbarButton>
        <ToolbarButton
          label="Genomstruken"
          isActive={state.strike}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <MdStrikethroughS />
        </ToolbarButton>

        <ToolbarDivider />

        <ToolbarButton
          label="Citat"
          isActive={state.blockquote}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <MdFormatQuote />
        </ToolbarButton>
        <ToolbarButton
          label="Kodblock"
          isActive={state.codeBlock}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          <MdCode />
        </ToolbarButton>

        <ToolbarDivider />

        <ToolbarButton
          label="Punktlista"
          isActive={state.bulletList}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <MdFormatListBulleted />
        </ToolbarButton>
        <ToolbarButton
          label="Numrerad lista"
          isActive={state.orderedList}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <MdFormatListNumbered />
        </ToolbarButton>

        <ToolbarDivider />

        <ToolbarButton label="Länk" isActive={state.link} onClick={promptLink}>
          <MdLink />
        </ToolbarButton>
        <ToolbarButton label="Bild" onClick={promptImage}>
          <MdImage />
        </ToolbarButton>
        <ToolbarButton
          label="Horisontell linje"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <MdHorizontalRule />
        </ToolbarButton>

        <ToolbarDivider />

        <ToolbarButton
          label="Ångra"
          disabled={!state.canUndo}
          onClick={() => editor.chain().focus().undo().run()}
        >
          <MdUndo />
        </ToolbarButton>
        <ToolbarButton
          label="Gör om"
          disabled={!state.canRedo}
          onClick={() => editor.chain().focus().redo().run()}
        >
          <MdRedo />
        </ToolbarButton>

        <ToolbarDivider />

        <ToolbarButton label="Rensa formatering" onClick={clearFormatting}>
          <MdFormatClear />
        </ToolbarButton>
      </div>

      <EditorContent editor={editor} className={editorContent} />
    </div>
  );
};

export default RichText;
