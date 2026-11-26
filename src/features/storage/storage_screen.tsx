import { observer } from "mobx-react-lite";
import { useStore } from "../../core/helper/use_store";
import { CrudPage } from "../../core/ui/page/crud_page";
import { StorageModel } from "./storage_model";
import { StorageStore } from "./storage_store";
import { InputV3 } from "../../core/ui/input/input_v3";
import { Button } from "../../core/ui/button/Button";
import { SelectV3 } from "../../core/ui/select/select_v3";

export const StorageScreenPath = "/storage";

export const StorageScreen = observer(() => {
  const store = useStore(StorageStore);
  return (
    <>
      <CrudPage
        pageName="Склад"
        isEditable={true}
        instanceModel={StorageModel}
        missingKey={["id"]}
        store={store}
        modalStyle={{ width: "100%", maxWidth: "500px", minWidth: "200px" }}
        replacedColumns={[
          { name: "currentBalance", replace: "текущий баланс" },
          { name: "actualBalance", replace: "актуальный баланс" },
          { name: "name", replace: "название" },
          { name: "unitCost", replace: "себе стоймость" },
          { name: "unitsOfMeasurement", replace: "единица измерения" },
        ]}
        editableComponent={
          <>
            <InputV3
              placeholder={"Текущий баланс"}
              initialValue={store.viewModel?.currentBalance?.toString()}
              onChange={(text) =>
                store.updateForm({ currentBalance: Number(text) })
              }
            />
            <div style={{ height: 10 }} />
            <InputV3
              placeholder={"Актуальный баланс"}
              initialValue={store.viewModel?.actualBalance?.toString()}
              onChange={(text) =>
                store.updateForm({ actualBalance: Number(text) })
              }
            />
            <div style={{ height: 10 }} />
            <InputV3
              placeholder={"название"}
              initialValue={store.viewModel?.name?.toString()}
              onChange={(text) => store.updateForm({ name: text })}
            />
            <div style={{ height: 10 }} />
            <SelectV3
              label="единица измерения"
              value={store.viewModel?.unitsOfMeasurement}
              options={[
                { label: "штуки", value: "штуки" },
                { label: "литры", value: "литры" },
                { label: "миллилитры", value: "миллилитры" },
                { label: "граммы", value: "граммы" },
              ]}
              onChange={(value) =>
                store.updateForm({ unitsOfMeasurement: value })
              }
            />
            <div style={{ height: 10 }} />
            <InputV3
              placeholder={"Себе стоймость за единицу"}
              initialValue={store.viewModel?.unitCost?.toString()}
              onChange={(text) => store.updateForm({ unitCost: Number(text) })}
            />
            <div style={{ height: 10 }} />
            <Button text="ок" onClick={() => store.createOrUpdate()} />
          </>
        }
        feature={"storage"}
      />
    </>
  );
});
