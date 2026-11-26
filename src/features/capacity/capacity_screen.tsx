import { observer } from "mobx-react-lite";
import { useStore } from "../../core/helper/use_store";
import { CrudPage } from "../../core/ui/page/crud_page";
import { CapacityModel } from "./capacity_model";
import { CapacityStore } from "./capacity_store";
import { InputV3 } from "../../core/ui/input/input_v3";
import { Button } from "../../core/ui/button/Button";
import { SelectV3 } from "../../core/ui/select/select_v3";

export const CapacityScreenPath = "/capacity";

export const resourceTypes = [
  { label: "оборудование", value: "оборудование" },
  { label: "персонал", value: "персонал" },
];

const toNumber = (text: string) => (text.trim() === "" ? undefined : Number(text.replace(",", ".")));

export const CapacityScreen = observer(() => {
  const store = useStore(CapacityStore);
  return (
    <CrudPage
      pageName="Мощности"
      isEditable={true}
      instanceModel={CapacityModel}
      missingKey={["id"]}
      store={store}
      modalStyle={{ width: "100%", maxWidth: "500px", minWidth: "200px" }}
      replacedColumns={[
        { name: "name", replace: "название" },
        { name: "resourceType", replace: "тип ресурса" },
        { name: "count", replace: "количество" },
        { name: "hoursPerShift", replace: "часов в смене" },
        { name: "shiftsPerDay", replace: "смен в день" },
        { name: "costPerHour", replace: "₽ за час" },
      ]}
      editableComponent={
        <>
          <InputV3
            placeholder={"название (например, экструдер)"}
            initialValue={store.viewModel?.name}
            onChange={(text) => store.updateForm({ name: text })}
          />
          <div style={{ height: 10 }} />
          <SelectV3
            label="тип ресурса"
            value={store.viewModel?.resourceType}
            options={resourceTypes}
            onChange={(value) => store.updateForm({ resourceType: value })}
          />
          <div style={{ height: 10 }} />
          <InputV3
            placeholder={"количество единиц (станков, рабочих)"}
            initialValue={store.viewModel?.count?.toString()}
            onChange={(text) => store.updateForm({ count: toNumber(text) })}
          />
          <div style={{ height: 10 }} />
          <InputV3
            placeholder={"длительность смены, часов"}
            initialValue={store.viewModel?.hoursPerShift?.toString()}
            onChange={(text) => store.updateForm({ hoursPerShift: toNumber(text) })}
          />
          <div style={{ height: 10 }} />
          <InputV3
            placeholder={"смен в день"}
            initialValue={store.viewModel?.shiftsPerDay?.toString()}
            onChange={(text) => store.updateForm({ shiftsPerDay: toNumber(text) })}
          />
          <div style={{ height: 10 }} />
          <InputV3
            placeholder={"стоимость часа одной единицы, ₽ (для персонала — с налогами на ЗП)"}
            initialValue={store.viewModel?.costPerHour?.toString()}
            onChange={(text) => store.updateForm({ costPerHour: toNumber(text) })}
          />
          <div style={{ height: 10 }} />
          <Button text="ок" onClick={() => store.createOrUpdate()} />
        </>
      }
      feature={"capacity"}
    />
  );
});
