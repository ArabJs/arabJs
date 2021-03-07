import { EditorState, EditorView, basicSetup } from "@codemirror/basic-setup"
import { oneDark } from "@codemirror/theme-one-dark"
import { useEffect, useRef } from "react"
import { StreamLanguage } from "@codemirror/stream-parser"
import { arabJsMode } from "./arabJs/arabJsMode"
import { tagExtension } from "@codemirror/state"


export default function EditorNext({ code }) {
    const editorRef = useRef(null);
    let editableTagltr = Symbol();

    useEffect(() => {
      new EditorView({
            state: EditorState.create({
                doc: code,
                extensions: [
                    oneDark,
                    basicSetup,
                    StreamLanguage.define(arabJsMode),
                    tagExtension( editableTagltr, EditorView.editable.of(false))
                ],

            }),
            parent: editorRef.current,
        })
    }, [])

    return (
        <div ref={editorRef} style={{ height: "350px" }} dir={"ltr"}></div>
    )
}