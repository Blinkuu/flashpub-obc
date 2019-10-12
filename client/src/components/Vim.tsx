import * as React from "react";
import { useState, useCallback } from "react";
import { VimWasm } from "vim-wasm";
import { Vim, checkVimWasmIsAvailable } from "react-vim-wasm";

import Axios from "axios";
import { withRouter } from "react-router-dom"
import firebase from "firebase";

const VIM_WASM_AVAILABLITY_MESSAGE = checkVimWasmIsAvailable();
const DOT_VIM_DIRS = ["/home/web_user/.vim"];

const VimEditor = withRouter((props: any) => {
  const [vim, setVim] = useState<VimWasm | null>(null);
  const onVim = useCallback(v => {
    setVim(v);
  }, []);
  const onError = useCallback((e: Error) => {
    console.log(`Error! ${e.message}`);
  }, []);
  const onVimExit = useCallback(async (status: number, props: any) => {
    console.log(`Vim exited with status ${status}`);
    await firebase
      .app()
      .auth()
      .signOut();
      props.history.push("/");
  }, []);

  const onVimExport = async (fullpath: string, contents: ArrayBuffer, props: any) => {
    const dec = new TextDecoder("utf-8");
    const content = dec.decode(contents);
    await Axios.post("/api/secret", { data: { uuid: props.user.uuid, content: content } })
    props.updateContent(content);
  };

  if (VIM_WASM_AVAILABLITY_MESSAGE !== undefined) {
    const style = { color: "red", fontWeight: "bold" } as const;
    return <div style={style}>{VIM_WASM_AVAILABLITY_MESSAGE}</div>;
  }

  return (
    <>
      <div className="screen-wrapper">
        <Vim
          worker={process.env.PUBLIC_URL + "/vim-wasm/vim.js"}
          className="vim-screen"
          persistentDirs={DOT_VIM_DIRS}
          onVimExit={(status: number) => { onVimExit(status, props) }}
          onFileExport={(fullpath: string, contents: ArrayBuffer) => { onVimExport(fullpath, contents, props) }}
          readClipboard={navigator.clipboard && navigator.clipboard.readText}
          onWriteClipboard={navigator.clipboard && navigator.clipboard.writeText }
          onError={onError}
          onVimCreated={onVim}
        />
      </div>
    </>
  );
})

export default VimEditor;
