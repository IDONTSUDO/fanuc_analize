import {
  StorageScreen,
  StorageScreenPath,
} from "../../features/storage/storage_screen";

import type { IRouter } from "./routers";

export const privateRouters: IRouter[] = [
  { path: StorageScreenPath, element: <StorageScreen /> },
];
