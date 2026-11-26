import { useNavigate } from "react-router-dom";
import { IconType } from "../icon/icon";
import { NavIcon } from "../icon/nav_icon";
import { TextV2 } from "../text/text";
import { MachineToolsScreenPath } from "../../../features/machine_tools/p";

const pages: { icon: IconType; name: string; path?: string; fn?: Function }[] =
  [
    // { icon: IconType.order, name: "Заказы", path: "" },

    { icon: IconType.report, name: "Отчеты", path: "" },
    {
      icon: IconType.machineTools,
      name: "Станки",
      path: MachineToolsScreenPath,
    },
    // { icon: IconType.warehouse, name: "Склад", path: StorageScreenPath },
  ];
export const Page: React.FC<{ pageName: string }> = ({ pageName }) => {
  const n = useNavigate();

  return (
    <>
      <div
        style={{
          display: "flex",
          paddingLeft: 9,
          borderBottom: "1px solid oklch(92.9% 0.013 255.508)",
        }}
      >
        {pages.map((el) => (
          <div
            onClick={() => {
              if (el.fn !== undefined) {
                el.fn();
              }
              if (el.path !== undefined) {
                n(el.path);
              }
            }}
            key={el.name}
            style={{
              flex: "0 0 120px",
              boxSizing: "border-box",
              paddingTop: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <NavIcon
              color={
                pageName === el.name ? "oklch(20.8% 0.042 265.755)" : "#8fa1b9"
              }
              type={el.icon}
              size={24}
              style={{ marginBottom: 4 }}
            />
            <TextV2
              color={pageName === el.name ? undefined : "#8fa1b9"}
              text={el.name}
            />
            <div style={{ height: 5 }}></div>
            <div
              style={{
                alignSelf: "stretch",
                borderBottom:
                  pageName !== el.name
                    ? undefined
                    : "2px solid oklch(20.8% 0.042 265.755)",
              }}
            ></div>
          </div>
        ))}
      </div>
    </>
  );
};
