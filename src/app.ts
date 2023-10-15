import { Application } from "pixi.js";

export const app = new Application();

const appContainer = document.getElementById("app");

// Resize app to main body container
// @ts-ignore
appContainer?.appendChild(app.view);
// @ts-ignore
app.resizeTo = appContainer;
