import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "cart-column-header",
    width: 90
  },
  {
    field: "name",
    headerName: "Product name",
    headerClassName: "cart-column-header",
    width: 150,
    editable: false
  },
  {
    field: "price",
    headerName: "Price",
    type: "number",
    headerClassName: "cart-column-header",
    width: 110,
    editable: false
  }
];

const CartList = (props) => {
  let rows = [];

  props.items.map((item, index) =>
    rows.push({ id: index, name: item.name, price: item.price })
  );

  return (
    <div>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        autoHeight
        autoWidth
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
};

export default CartList;
