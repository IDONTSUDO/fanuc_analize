import { useEffect, useState } from "react";
import type { IPagination } from "../../model/pagination";
import { Icon, IconType } from "../icon/icon";
import { TextV2 } from "../text/text";
import { CrudFormStore } from "../../store/base_store";

export const Pagination: React.FC<{
  store: CrudFormStore<any, any>;
}> = ({ store }) => {
  return (
    <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
      <div
        onClick={() => {
          if (store.page?.currentPage === 1) {
            return;
          }
          store.prevPage();
        }}
        style={{
          display: store.page?.totalPages === 0 ? "none" : "flex",
          alignItems: "center",
          cursor: "pointer",
          position: "relative",
          top: 2,
        }}
      >
        <Icon type={IconType.chevronDown} size={14} />
      </div>
      <div style={{ width: 10 }} />

      <div style={{ display: "flex" }}>
        <TextV2
          text={
            (store.page?.currentPage?.toString() ?? "0") +
            "  /  " +
            (store.page?.totalPages?.toString() ?? "0")
          }
          style={{ fontSize: 16 }}
          color="#64748B"
        />
      </div>

      <div style={{ width: 10 }} />

      <div
        onClick={() => {
          if (store.page?.currentPage !== store.page?.totalPages) {
            store.nextPage?.();
          }
        }}
        style={{
          display: store.page?.totalPages === 0 ? "none" : "flex",
          alignItems: "center",
          cursor: "pointer",
          position: "relative",
          top: 2,
        }}
      >
        <Icon type={IconType.chevronUp} size={14} />
      </div>
    </div>
  );
};
