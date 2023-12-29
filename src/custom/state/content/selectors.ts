import { appContent } from "./types";

export namespace ContentSelectors {
    export const getHiglights = (state: any) => (state.content as appContent).highlights;
}