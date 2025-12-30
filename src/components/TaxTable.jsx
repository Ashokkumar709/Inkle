import {
  useReactTable,
  getCoreRowModel,
  flexRender
} from "@tanstack/react-table";
import { FaEdit, FaFilter } from "react-icons/fa";
import { useState } from "react";

/* ---------------- COUNTRY FILTER HEADER ---------------- */

const CountryFilterHeader = () => {
  const [open, setOpen] = useState(false);

  const countries = ["India", "US", "UK"];

  return (
    <div style={{ position: "relative" }}>
      <div
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          cursor: "pointer"
        }}
      >
        <span>Country</span>
        <FaFilter size={14} color="#5B3DF5" />
      </div>

      {open && (
        <div
          style={{
            position: "absolute",
            top: 36,
            right: 0,
            width: 180,
            background: "#fff",
            borderRadius: 12,
            border: "1px solid #E8E8F0",
            boxShadow: "0px 12px 32px rgba(16,24,40,0.12)",
            padding: "8px 0",
            zIndex: 20
          }}
        >
          {countries.map((c) => (
            <label
              key={c}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 16px",
                cursor: "pointer"
              }}
            >
              <input
                type="checkbox"
                style={{
                  width: 18,
                  height: 18,
                  accentColor: "#5B3DF5"
                }}
              />
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 500,
                  color: "#1F1F2E"
                }}
              >
                {c}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

/* ---------------- MAIN TABLE ---------------- */

const TaxTable = ({ data, onEdit }) => {
  const columns = [
    {
      id: "entity",
      header: "Entity",
      accessorKey: "name",
      cell: (info) => (
        <span
          style={{
            fontSize: 15,
            fontWeight: 500,
            color: "#4F46E5",
            cursor: "pointer"
          }}
        >
          {info.getValue()}
        </span>
      )
    },
    {
      id: "gender",
      header: "Gender",
      accessorKey: "gender",
      cell: (info) => {
        const value = info.getValue().toUpperCase()[0] + info.getValue().slice(1).toLowerCase();
        const isMale = value === "Male";

        return (
          <span
            style={{
              padding: "6px 14px",
              fontSize: 14,
              fontWeight: 500,
              borderRadius: 999,
              background: isMale ? "#FDECEC" : "#E8F3FD",
              color: isMale ? "#D92D20" : "#1570EF"
            }}
          >
            {value}
          </span>
        );
      }
    },
    {
      id: "requestDate",
      header: "Request date",
      accessorKey: "requestDate",
      cell: (info) => (
        <span
          style={{
            fontSize: 15,
            fontWeight: 500,
            color: "#3F3F5F"
          }}
        >
          {new Date(info.getValue()).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric"
          })}
        </span>
      )
    },
    {
      id: "country",
      header: () => <CountryFilterHeader />,
      accessorKey: "country",
      cell: (info) => (
        <span
          style={{
            fontSize: 15,
            fontWeight: 500,
            color: "#1F1F2E"
          }}
        >
          {info.getValue()}
        </span>
      )
    },
    {
      id: "actions",
      header: "",
      cell: ({ allowEdit = true, row }) => (
        <FaEdit
          size={16}
          color="#667085"
          style={{ cursor: "pointer" }}
          onClick={() => onEdit(row.original)}
        />
      )
    }
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        border: "1px solid #E8E8F0",
        overflow: "hidden"
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#7A7A9D",
                    padding: "18px 24px",
                    textAlign: "left",
                    borderBottom: "1px solid #E8E8F0"
                  }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              style={{
                height: 64,
                borderBottom: "1px solid #F0F0F6"
              }}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  style={{
                    padding: "16px 24px",
                    verticalAlign: "middle"
                  }}
                >
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaxTable;
