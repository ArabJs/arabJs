import React, { useEffect, useState } from "react";
import { Console, Hook, Unhook } from 'console-feed'




export default function JsConsole() {
    const [logs, setLogs] = useState([])

    useEffect(() => {
        Hook(window.console, log => setLogs(currLogs => [...currLogs, log]), false);
        return () => Unhook(window.console)
    }, []);


    return (
        <div style={{ backgroundColor: "#242424" }}>
            <Console filter={["log", "table", "clear", "info"]} logs={logs} variant="dark"  />
        </div>
    )


}

