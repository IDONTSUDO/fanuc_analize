import { MachineToolsScreen } from "../../features/machine_tools/machine_tools_screen";
import { MachineToolsScreenPath } from "../../features/machine_tools/p";
import { MainScreen } from "../../features/main/main_screen";
import type { IRouter } from "./routers";

export const publicRouters: IRouter[] = [
  { path: "/", element: <MainScreen /> },
  { path: MachineToolsScreenPath, element: <MachineToolsScreen /> },
];
