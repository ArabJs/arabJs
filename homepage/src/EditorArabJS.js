import { EditorState, EditorView, basicSetup } from "@codemirror/basic-setup"
import { oneDark } from "@codemirror/theme-one-dark"
import { useEffect, useRef } from "react"
import { StreamLanguage } from "@codemirror/stream-parser"
import { arabJsMode } from "./arabJs/arabJsMode"
import { tagExtension } from "@codemirror/state"


export default function Editor({ code, editor }) {
    const editorRef = useRef(null);
    let editableTagrtl = Symbol()

    useEffect(() => {
        editor.current = new EditorView({
            state: EditorState.create({
                doc: code,
                extensions: [
                    oneDark,
                    basicSetup,
                    StreamLanguage.define(arabJsMode),
                    tagExtension(editableTagrtl, EditorView.editable.of(true))
                ],

            }),
            parent: editorRef.current,
        })
    }, [])

    return (
        <div ref={editorRef} style={{ height: "350px" }} dir={"rtl"}></div>
    )
}