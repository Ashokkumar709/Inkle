import { useState } from "react";
import { FaFilter } from "react-icons/fa";

const CountryFilter = () => {
  const [open, setOpen] = useState(false);
  const countries = ["India", "US", "UK"];

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{ display: "flex", gap: 8, cursor: "pointer" }}
        onClick={() => setOpen(!open)}
      >
        Country <FaFilter />
      </div>

      {open && (
        <div
          style={{
            position: "absolute",
            top: 28,
            right: 0,
            background: "#fff",
            border: "1px solid #E8E8F0",
            borderRadius: 8,
            boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
          }}
        >
          {countries.map(c => (
            <label
              key={c}
              style={{
                display: "flex",
                gap: 8,
                padding: 12
              }}
            >
              <input type="checkbox" />
              {c}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default CountryFilter;
