import { observer } from "mobx-react-lite";
import { useStore } from "../../core/helper/use_store";
import { CrudPage } from "../../core/ui/page/crud_page";
import { {{ name.pascalCase() }}Model } from "./{{name.snakeCase()}}_model";
import { {{ name.pascalCase() }}Store } from "./{{name.snakeCase()}}_store";

export const {{ name.pascalCase() }}ScreenPath = "todo";

export const {{ name.pascalCase() }}Screen = observer(() => {
  const store = useStore({{ name.pascalCase() }}Store);
  return (
    <>
      <CrudPage
        pageName="todo"
        isEditable={true}
        instanceModel={{{ name.pascalCase() }}Model}
        missingKey={[]}
        store={store}
        replacedColumns={[{ name: "description", replace: "описание" }]}
        editableComponent={<> </>}
        feature={"{{name.snakeCase()}}"}
      />
    </>
  );
});
