import React, { useState, useRef } from 'react';
import arabJs from "arabjs";
import CodeSnippets from "./CodeSnippets";
import EditorArabJS from "./EditorArabJS";
import EditorJS from "./EditorJS";
import PlayArrow from '@material-ui/icons/PlayArrow';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import JsConsole from "./JsConsole"
import "./App.css";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    backgroundColor: "green",
    color: "white",
    '&:hover': {
      color: "black",
      backgroundColor: "green",
    },
  },

}));

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);
export default function App() {

  const classes = useStyles();

  const [arabJSCode, setArabJsCode] = useState(`اطبع.نص("اهلاً بالعالم")`);
  const [JScode, setJSCode] = useState(`console.log("اهلاً بالعالم")`);

  const [target, setTarget] = useState("console");
  const editor = useRef(null);
  const [loadingText, setLoadingText] = useState("");
  const [isArabJSCode, setIsArabJsCode] = useState(true);

  const execute = (finalCode) => {
    finalCode = isArabJSCode ? finalCode : arabJSCode;
    try {
      if (target === "console") {
        console.log(arabJs.run(finalCode));


      }
      else if (target === "DOM") {
        arabJs.run(finalCode);
        setLoadingText("أنتظر قليلأ...")

      }
      setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 100);
    } catch (error) {
      console.info(error)
    }
  }
  const runCode = () => {
    const finalCode = editor.current.state.doc.toString();
    execute(finalCode);
  }
  const targetRender = () => {
    return (
      <div key={arabJSCode}>
        <JsConsole> </JsConsole>
        <div className="myChart" width="400" height="400">
          {loadingText}
        </div>
      </div>
    );
  }
  const changeEditorContent = (finalCode) => {
    editor.current.dispatch(editor.current.state.update(
      {
        changes: { from: 0, to: editor.current.state.doc.length, insert: finalCode }
      }));
  }
  return (
    <div className="App">
      <div className="hero">
        <div className="title">عرب.جس</div>
        <div className="subTitle"> برمج جافا سكربت باللغة العربية</div>
        <div className="npm">
          <div>للتحميل</div>
          <code className="code"> npm i arabjs </code>
        </div>
      </div>
      <div className="controls" >
        <div className="oneControl">
          <CodeSnippets onCodeChange={(finalCode, target) => { changeEditorContent(finalCode); setArabJsCode(finalCode); setTarget(target); setLoadingText(""); }}></CodeSnippets>
        </div>
        <div className="secondoneControl">
          <Typography component="div">
            <Grid component="label" container alignItems="center" spacing={1}>
              <Grid item>ArabJs</Grid>
              <Grid item>
                <AntSwitch checked={isArabJSCode} onChange={() => {
                  if (isArabJSCode) {
                    let localCode = editor.current.state.doc.toString();
                    setArabJsCode(localCode);
                    try {
                      setJSCode(arabJs.transpile(localCode));
                    } catch (erro) {
                      setJSCode(`*/Invalid ArabJs code!*/`);

                      console.error(erro)
                    }
                  }
                  setIsArabJsCode(!isArabJSCode);
                }
                } name="checkedC" />
              </Grid>
              <Grid item>JavaScript</Grid>
            </Grid>
          </Typography>
        </div>
        <div className= "thirdoneControl">
          <Button
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<PlayArrow />}
            onClick={runCode}
          >
            نفذ البرنامج
      </Button>
        </div>
      </div>
      {isArabJSCode ?
        <EditorArabJS code={arabJSCode} editor={editor} ></EditorArabJS> :
        <EditorJS code={JScode}  ></EditorJS>}

      <br />

      {targetRender()}
    </div>

  );
}
