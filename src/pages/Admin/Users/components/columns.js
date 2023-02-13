export const usersColumns = [
  {
    key: "id",
    title: "ID",
    dataIndex: "id",
    fixed: "left",
  },
  {
    title: "Photo",
    dataIndex: "slika",
    key: "slika",
    fixed: "left",
    render: (photo) => {
      return <img width={50} height={50} src={photo} alt="slika usera" />;
    },
  },
  {
    title: "User",
    dataIndex: "ime_i_prezime",
    key: "ime_i_prezime",
    fixed: "left",
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
    fixed: "left",
  },
  {
    title: "City",
    dataIndex: "grad",
    key: "grad",
    fixed: "left",
  },
  {
    title: "Telephone",
    dataIndex: "telefon",
    key: "telefon",
    fixed: "left",
  },
  {
    title: "Spendings",
    dataIndex: "potrosen_novac",
    key: "potrosen_novac",
    fixed: "left",
    render: (text) => {
      return <span>{text} KM</span>;
    },
  },
];
