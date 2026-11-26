import { observer } from "mobx-react-lite";
import { useStore } from "../../core/helper/use_store";
import { CrudPage } from "../../core/ui/page/crud_page";
import { MainModel } from "./main_model";
import { MainStore } from "./main_store";
import { Page } from "../../core/ui/page/Page";

export const MainScreenPath = "/";

export const MainScreen = observer(() => {
  const store = useStore(MainStore);
  return (
    <>
      <Page pageName="main" />
      <div>Основной экран</div>
    </>
  );
});
