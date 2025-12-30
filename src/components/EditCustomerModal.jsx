import { useEffect, useState } from "react";
import { fetchCountries } from "../api/countries";
import { updateTax } from "../api/taxes";

/* ---------- ICONS ---------- */

const EditIcon = ({ size = 15, color = "#9A9AAF" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M3 17.25V21h3.75L19.81 7.94l-3.75-3.75L3 17.25Z"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M14.06 4.19l3.75 3.75"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

const MapIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 22s7-5.33 7-11a7 7 0 1 0-14 0c0 5.67 7 11 7 11Z"
      stroke="#B0B0BF"
      strokeWidth="2"
    />
    <circle cx="12" cy="11" r="2.5" stroke="#B0B0BF" strokeWidth="2" />
  </svg>
);

/* ---------- COMPONENT ---------- */

const EditCustomerModal = ({ row, onClose, onSave }) => {
  const [name, setName] = useState(row.name || "");
  const [country, setCountry] = useState(row.country || "");
  const [countries, setCountries] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchCountries().then(setCountries);
  }, []);

  const handleSave = async () => {
    const updated = await updateTax(row.id, { ...row, name, country });
    onSave(updated);
  };

  return (
    <div style={overlay}>
      <div style={modal}>
        {/* Header */}
        <div style={header}>
          <h2 style={title}>Edit Customer</h2>
          <button onClick={onClose} style={closeBtn}>×</button>
        </div>

        <div style={divider} />

        {/* Name */}
        <label style={label}>
          Name <span style={{ color: "#E5484D" }}>*</span>
        </label>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          style={input}
        />

        {/* Country */}
        <label style={label}>Country</label>

        <div style={selectWrapper}>
          <div
            style={selectBox}
            onClick={() => setOpen(!open)}
          >
            <span>{country || "Select country"}</span>

            <div style={icons}>
              <EditIcon />
              <span style={{ fontSize: 13 }}>⌄</span>
            </div>
          </div>

          {/* 👇 RESERVED SPACE (KEY FIX) */}
          <div style={dropdownSpace}>
            {open && (
              <div style={dropdown}>
                {countries.map(c => (
                  <div
                    key={c.id}
                    style={option}
                    onClick={() => {
                      setCountry(c.name);
                      setOpen(false);
                    }}
                  >
                    <MapIcon />
                    <span>{c.name}</span>
                    <span style={optionEdit}>
                      <EditIcon color="#5B3DF5" />
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={footer}>
          <button onClick={onClose} style={cancelBtn}>
            Cancel
          </button>
          <button onClick={handleSave} style={saveBtn}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

/* ===================== STYLES ===================== */

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000
};

const modal = {
  width: "680px",
  background: "#fff",
  borderRadius: "12px",
  padding: "20px",
  boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const title = { margin: 0, fontSize: "18px", fontWeight: 600 };

const closeBtn = {
  background: "transparent",
  border: "none",
  fontSize: "20px",
  cursor: "pointer",
  color: "#6B6B80"
};

const divider = {
  height: 1,
  background: "#ECECF3",
  margin: "14px 0 16px"
};

const label = {
  display: "block",
  fontSize: "13px",
  color: "#6B6B80",
  marginBottom: "6px"
};

const input = {
  width: "96%",
  height: "40px",
  padding: "0 12px",
  borderRadius: "8px",
  border: "1px solid #E4E4EB",
  marginBottom: "14px",
  fontSize: "14px",
  fontWeight: 520
};

/* ---- Country Select ---- */

const selectWrapper = { width: "100%" };

const selectBox = {
  height: "40px",
  borderRadius: "8px",
  border: "1px solid #E4E4EB",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 12px",
  cursor: "pointer",
  background: "#fff"
};

const icons = {
  display: "flex",
  alignItems: "center",
  gap: "8px"
};

/* 👇 This keeps modal height stable */
const dropdownSpace = {
  minHeight: "150px",     // same as dropdown max height
  marginTop: "8px"
};

const dropdown = {
  width: "100%",
  maxHeight: "200px",
  overflowY: "auto",
  background: "#fff",
  border: "1px solid #E4E4EB",
  borderRadius: "8px"
};

const option = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "8px 12px",
  cursor: "pointer",
  fontSize: "14px"
};

const optionEdit = {
  marginLeft: "auto",
  display: "flex",
  alignItems: "center"
};

/* ---- Footer ---- */

const footer = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",
  borderTop: "1px solid #ECECF3",
  paddingTop: "14px"
};

const cancelBtn = {
  height: "36px",
  padding: "0 14px",
  borderRadius: "8px",
  border: "1px solid #E4E4EB",
  background: "#fff",
  fontSize: "14px",
  cursor: "pointer"
};

const saveBtn = {
  height: "36px",
  padding: "0 18px",
  borderRadius: "8px",
  border: "none",
  background: "#5B3DF5",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer"
};

export default EditCustomerModal;
