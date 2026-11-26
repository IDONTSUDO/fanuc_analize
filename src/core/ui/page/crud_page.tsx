import { CrudFormStore, CrudMode } from "../../store/base_store";
import { TextV2 } from "../text/text";
import { Loader } from "../loader/loader";
import { observer } from "mobx-react-lite";
import { CoreTable } from "../table/table";
import { ModalV2 } from "../modal/modal";
import { Pagination } from "../pagination/pagination";
import { Button, ButtonType } from "../button/Button";
import type { ClassConstructor } from "class-transformer";
import { Select } from "../select/select";
import React, { useEffect } from "react";
import { NavIcon } from "../icon/nav_icon";
import { useNavigate } from "react-router-dom";
import { InputV3 } from "../input/input_v3";
import { Page } from "./Page";

export const CrudPage: React.FC<{
  feature: string;
  isNeedHttpError: boolean;
  isNeedTable?: boolean;
  body?: React.ReactNode;
  store: CrudFormStore<any, any>;
  missingKey?: string[];
  pageName?: string;
  instanceModel?: object;
  isEditable?: boolean;
  // клик по строке без выбранного режима сразу открывает редактирование
  editOnRowClick?: boolean;
  editableComponent?: React.ReactNode;
  createButton?: boolean;
  searchByField?: { [key: string]: () => React.ReactNode };
  isNeedDelete?: boolean;
  modalStyle?: React.CSSProperties;
  addingColumns?: { name: string; jsx: (el: any) => React.ReactNode }[];
  mappedColumns?: {
    name: string;
    mapper: (date: any) => React.ReactNode;
  }[];
  replacedJSXColumns?: { name: string; jsx: (p: any) => React.ReactNode }[];
  replacedColumns?:
    | {
        name: string;
        replace: string;
      }[]
    | undefined;
}> = observer(
  ({
    store,
    missingKey,
    replacedColumns,
    isEditable = true,
    editOnRowClick = false,
    searchByField = {},
    editableComponent,
    instanceModel,
    isNeedDelete,
    pageName,
    mappedColumns,
    modalStyle,
    replacedJSXColumns,
    addingColumns,
    feature,
    isNeedTable = true,
    body,
    isNeedHttpError = true,
  }) => {
    const n = useNavigate();
    const fieldReplace = searchByField[store.searchByField ?? ""];
    useEffect(() => {
      store.feature = feature;
    }, []);
    return (
      <div style={{ height: "100%" }}>
        <div
          style={{
            display: "flex",
            paddingLeft: 9,
            borderBottom: "1px solid oklch(92.9% 0.013 255.508)",
          }}
        >
          <Page pageName={pageName ?? ""} />
        </div>
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            paddingLeft: 20,
            paddingRight: 20,
            // justifyContent: "space-between",
          }}
        >
          <div style={{ height: 10 }} />
          <TextV2 style={{ fontSize: "1.5rem" }} text={pageName ?? ""} />
          <div style={{ height: 10 }} />

          {isNeedTable ? (
            <>
              <div style={{ display: "flex", width: "100%" }}>
                <div
                  style={{
                    display: "flex",
                    gap: "calc(0.25rem * 2)",
                    width: "100%",
                  }}
                >
                  {fieldReplace !== undefined ? (
                    <>{fieldReplace()}</>
                  ) : (
                    <>
                      <InputV3
                        style={{ width: "100%" }}
                        placeHolderType=""
                        placeholder="Поиск по полю"
                        onChange={(text) => store.findBy(text)}
                      />
                    </>
                  )}

                  <Button
                    text="Поиск"
                    type={ButtonType.gray}
                    // color="cornflowerblue"
                    onClick={() => store.onClickFindButton()}
                  />
                  <Select
                    options={Object.keys(store.models()?.at(0) ?? {})
                      .filter((el) => !missingKey?.includes(el))
                      .map((el) => {
                        return {
                          value: el,
                          label:
                            replacedColumns
                              ?.rFind<{
                                name: string;
                                replace: string;
                              }>((element) => element.name === el)
                              .fold(
                                (s) => s.replace,
                                (_) => el,
                              ) ?? "",
                        };
                      })}
                    value={store.searchByField ?? ""}
                    onChange={function (value: string): void {
                      store.searchByField = value;
                    }}
                    label={""}
                  />
                </div>
                <div
                  style={{
                    width: 20,
                    textAlign: "center",
                    justifyItems: "center",
                    alignContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: 1.5,
                      backgroundColor: "oklch(92.9% 0.013 255.508)",
                      height: 18,
                    }}
                  ></div>
                </div>
                <div style={{ display: "flex", gap: "calc(0.25rem * 2)" }}>
                  <div
                    onClick={() => {
                      // store.setMode(CrudMode.create);
                      // store.loadClassInstance(
                      //   instanceModel as ClassConstructor<any>,
                      //   {}
                      // );

                      store.modalShow();
                    }}
                  >
                    <div style={{ width: "100%" }}>
                      <Button text="Создать" width={100} />
                    </div>
                  </div>
                  {isNeedDelete === undefined || isNeedDelete ? (
                    <div onClick={() => store.setMode(CrudMode.delete)}>
                      <Button
                        text="Удалить"
                        type={ButtonType.delete}
                        width={100}
                        color={
                          store.currentMode === CrudMode.delete
                            ? "rgb(28 29 38)"
                            : undefined
                        }
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                  {isEditable ? (
                    <>
                      <div onClick={() => store.setMode(CrudMode.edit)}>
                        <Button
                          text="Редактировать"
                          width={130}
                          color={
                            store.currentMode === CrudMode.edit
                              ? "rgb(28 29 38)"
                              : undefined
                          }
                        />
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </>
          ) : (
            <> </>
          )}
          {isNeedHttpError ? (
            <>
              {" "}
              <div>
                {store.error !== undefined ? (
                  <div>Ошибка {store.error} </div>
                ) : (
                  <></>
                )}
              </div>
            </>
          ) : (
            <></>
          )}

          <div style={{ height: "100%" }}>
            {store.isLoading &&
            store.models !== undefined &&
            store.models()?.at(0) !== undefined ? (
              <Loader />
            ) : (
              <>
                {isNeedTable ? (
                  <>
                    <div style={{ height: 20 }}></div>
                    <CoreTable
                      addingColumns={addingColumns}
                      replacedJSXColumns={replacedJSXColumns}
                      missingKey={missingKey}
                      replacedColumns={replacedColumns}
                      mappedColumns={mappedColumns}
                      onClick={(index) => {
                        if (
                          store.currentMode === CrudMode.edit ||
                          (editOnRowClick && store.currentMode === undefined)
                        ) {
                          store.loadClassInstance(
                            instanceModel as ClassConstructor<any>,
                            store.models()!.at(index),
                          );
                          // if(this.viewModel)
                          if (Object.hasOwn(store.viewModel, "fromServer")) {
                            store.viewModel.fromServer();
                          }
                          store.modalShow();
                        }
                        if (store.currentMode === CrudMode.delete) {
                          store.delete(store.models()!.at(index).id);
                        }
                      }}
                      columns={Object.keys(store.models()?.at(0) ?? {}).filter(
                        (el) => !missingKey?.includes(el),
                      )}
                      source={store.models() ?? []}
                    />
                    <Pagination store={store} />
                  </>
                ) : (
                  <>{body}</>
                )}
              </>
            )}
          </div>
        </div>

        <ModalV2
          style={modalStyle}
          isOpen={store.isModalOpen}
          onClose={() => {
            // @ts-expect-error
            store.viewModel = new instanceModel();
            store.modalCancel();
          }}
          children={<>{editableComponent}</>}
        />
      </div>
    );
  },
);
