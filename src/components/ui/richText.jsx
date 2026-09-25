import "../../scss/richText.module.scss";

import Image from "@tiptap/extension-image";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import {
  FiBold,
  FiCode,
  FiCornerUpLeft,
  FiCornerUpRight,
  FiImage,
  FiItalic,
  FiLink,
  FiList,
  FiMessageSquare,
  FiMinus,
  FiUnderline,
  FiFile
} from "react-icons/fi";
import { MdStrikethroughS } from "react-icons/md";

import {
  editorContent,
  toolbar,
  toolbarButton,
  toolbarButtonActive,
  toolbarButtonText,
  toolbarDivider,
  wrapper,
} from "../../scss/richText.module.scss";

const HEADING_LEVELS = [1, 2, 3];

// Defined outside of the component so the extensions (and with them the whole
// schema) are only created once instead of on every render.
const extensions = [
  StarterKit.configure({
    heading: { levels: HEADING_LEVELS },
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
  HEADING_LEVELS.find((level) => editor?.isActive("heading", { level })) ?? 0;

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

// Feather has no glyph for heading levels or numbered lists, so those buttons
// carry the same short text labels other editors use.
const ToolbarText = ({ children }) => (
  <span className={toolbarButtonText}>{children}</span>
);

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
          <ToolbarText>H1</ToolbarText>
        </ToolbarButton>
        <ToolbarButton
          label="Rubrik 2"
          isActive={state.heading === 2}
          onClick={() => setHeading(2)}
        >
          <ToolbarText>H2</ToolbarText>
        </ToolbarButton>
        <ToolbarButton
          label="Rubrik 3"
          isActive={state.heading === 3}
          onClick={() => setHeading(3)}
        >
          <ToolbarText>H3</ToolbarText>
        </ToolbarButton>

        <ToolbarDivider />

        <ToolbarButton
          label="Fet"
          isActive={state.bold}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <FiBold />
        </ToolbarButton>
        <ToolbarButton
          label="Kursiv"
          isActive={state.italic}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <FiItalic />
        </ToolbarButton>
        <ToolbarButton
          label="Understruken"
          isActive={state.underline}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <FiUnderline />
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
          <FiMessageSquare />
        </ToolbarButton>
        <ToolbarButton
          label="Kodblock"
          isActive={state.codeBlock}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          <FiCode />
        </ToolbarButton>

        <ToolbarDivider />

        <ToolbarButton
          label="Punktlista"
          isActive={state.bulletList}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <FiList />
        </ToolbarButton>
        <ToolbarButton
          label="Numrerad lista"
          isActive={state.orderedList}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ToolbarText>1.</ToolbarText>
        </ToolbarButton>

        <ToolbarDivider />

        <ToolbarButton label="Länk" isActive={state.link} onClick={promptLink}>
          <FiLink />
        </ToolbarButton>
        <ToolbarButton label="Bild" onClick={promptImage}>
          <FiImage />
        </ToolbarButton>
        <ToolbarButton
          label="Horisontell linje"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <FiMinus />
        </ToolbarButton>

        <ToolbarDivider />

        <ToolbarButton
          label="Ångra"
          disabled={!state.canUndo}
          onClick={() => editor.chain().focus().undo().run()}
        >
          <FiCornerUpLeft />
        </ToolbarButton>
        <ToolbarButton
          label="Gör om"
          disabled={!state.canRedo}
          onClick={() => editor.chain().focus().redo().run()}
        >
          <FiCornerUpRight />
        </ToolbarButton>

        <ToolbarDivider />

        <ToolbarButton label="Rensa formatering" onClick={clearFormatting}>
          <FiFile />
        </ToolbarButton>
      </div>

      <EditorContent editor={editor} className={editorContent} />
    </div>
  );
};

export default RichText;
