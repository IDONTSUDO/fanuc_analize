import { observer } from "mobx-react-lite";
import { useStore } from "../../core/helper/use_store";
import { CrudPage } from "../../core/ui/page/crud_page";
import { MachineToolsModel } from "./machine_tools_model";
import { MachineToolsStore } from "./machine_tools_store";
import { Input } from "../../core/ui/input/input";
import { Button } from "../../core/ui/button/Button";

export const MachineToolsScreen = observer(() => {
  const store = useStore(MachineToolsStore);
  return (
    <>
      <CrudPage
        pageName="Станки"
        isEditable={true}
        instanceModel={MachineToolsModel}
        missingKey={[]}
        store={store}
        replacedColumns={[{ name: "description", replace: "описание" }]}
        editableComponent={
          <>
            <Input label="IP для подключения" />
            <Button text="попробывать" onClick={() => {}} />
          </>
        }
        feature={"machine_tools"}
        isNeedHttpError={false}
      />
    </>
  );
});
