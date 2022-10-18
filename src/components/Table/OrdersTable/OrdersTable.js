import React, { useEffect, useState } from "react";
import { Table } from "antd";
import "./OrdersTable.css";
import { orderColumns, articlesColumns } from "./columns";

const OrdersTable = (props) => {
  return (
    <Table
      columns={orderColumns}
      expandable={{
        expandedRowRender: (record) => (
          <Table
            columns={articlesColumns}
            dataSource={record.artikli}
            rowKey="id"
            size="small"
            pagination={false}
          />
        ),
      }}
      dataSource={props.data}
      rowKey="id"
      loading={props.isLoading || props.isFetching}
      pagination={{
        current: props.page,
        pageSize: props.rowsLimit,
        total: props.total,
        onChange: (page) => props.setPage(page),
        pageSizeOptions: ["10", "20", "50"],
        showSizeChanger: true,
        onShowSizeChange: (current, size) => props.setRowsLimit(size),
        showTotal: () =>
          `${(props.page - 1) * props.rowsLimit + 1} -  ${
            props.total > props.page * props.rowsLimit
              ? props.page * props.rowsLimit
              : props.total
          } od ukupno ${props.total}`,
      }}
    />
  );
};

export default OrdersTable;
