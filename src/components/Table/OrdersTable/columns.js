import moment from "moment";
import { SearchOutlined } from "@ant-design/icons";
import UserOrdersDateFilter from "./components/DateFIlter";

export const orderColumns = [
  {
    key: "id",
    title: "ID",
    dataIndex: "id",
    fixed: "left",
  },
  {
    title: "Adresa",
    dataIndex: "adresa",
    key: "adresa",
    fixed: "left",
  },
  {
    title: "Grad",
    dataIndex: "grad",
    key: "grad",
    fixed: "left",
  },
  {
    title: "Datum narudzbe",
    dataIndex: "datum_narudzbe",
    key: "datum_narudzbe",
    fixed: "left",
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    filterDropdown: ({ confirm }) => <UserOrdersDateFilter confirm={confirm} />,
    render: (text) => moment(text).format("DD.MM.YYYY hh:mm"),
  },
  {
    key: "ukupna_cijena",
    title: "Cijena",
    dataIndex: "ukupna_cijena",
    fixed: "left",
    render: (text) => text + " KM",
  },
];

export const articlesColumns = [
  {
    title: "Naziv artikla",
    dataIndex: "naziv",
    key: "naziv",
    fixed: "left",
  },
  {
    title: "Kolicina",
    dataIndex: "kolicina",
    key: "kolicina",
    fixed: "left",
  },
  {
    title: "Cijena",
    dataIndex: "cijena",
    key: "cijena",
    fixed: "left",
    render: (text) => text + " KM",
  },
];
