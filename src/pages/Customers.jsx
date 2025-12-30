import { useEffect, useState } from "react";
import { fetchTaxes } from "../api/taxes";
import TaxTable from "../components/TaxTable";
import EditCustomerModal from "../components/EditCustomerModal";

const Customers = () => {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    fetchTaxes().then(setData);
  }, []);

  const handleUpdate = (updatedRow) => {
    setData(prev =>
      prev.map(row =>
        row.id === updatedRow.id ? updatedRow : row
      )
    );
    setSelectedRow(null);
  };

  return (
    <div style={{ padding: 32 }}>
      <TaxTable data={data} onEdit={setSelectedRow} />

      {selectedRow && (
        <EditCustomerModal
          row={selectedRow}
          onClose={() => setSelectedRow(null)}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
};

export default Customers;
