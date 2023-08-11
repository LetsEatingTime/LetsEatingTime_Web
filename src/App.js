import "./App.css";
import { BrowserRouter } from "react-router-dom";

import Router from "./router";

function App() {
  console.log(
    "%cSTOP MODIFY",
    "color: red; background-color: white; padding: 4px; border-radius: 4px; font-size:50px"
  );
  console.log(
    `
%c       ██╗██╗███╗   ██╗███████╗ ██████╗  ██████╗ 
%c       ██║██║████╗  ██║██╔════╝██╔═══██╗██╔═══██╗
%c       ██║██║██╔██╗ ██║███████╗██║   ██║██║   ██║
%c ██    ██║██║██║╚██╗██║╚════██║██║   ██║██║   ██║
%c  ╚█████╔╝██║██║ ╚████║███████║╚██████╔╝╚██████╔╝
%c   ╚════╝ ╚═╝╚═╝  ╚═══╝╚══════╝ ╚═════╝  ╚═════╝ 
`,
    "color:#22577A",
    "color:#38A3A5",
    "color:#57CC99",
    "color:#80ED99",
    "color:#99FFED",
    "color:#FFFFFF"
  );
  return (
    <div className="App">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
