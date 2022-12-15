import moment from "moment";
import { SearchOutlined } from "@ant-design/icons";
import UserOrdersDateFilter from "../../../components/Table/OrdersTable/components/DateFIlter";

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
    title: "Kupac",
    dataIndex: "ime_i_prezime",
    key: "ime_i_prezime",
    fixed: "left",
  },
  {
    title: "Broj telefona",
    dataIndex: "telefon",
    key: "telefon",
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
