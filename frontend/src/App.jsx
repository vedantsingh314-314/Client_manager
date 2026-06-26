import { useState } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    companyName: '',
    note: '',
    hrContacts: [
      { name: '', email: '', phone: '' },
      { name: '', email: '', phone: '' },
      { name: '', email: '', phone: '' }
    ]
  });

  const [message, setMessage] = useState('');
  const handleBasicChange = (event) => {
     setFormData({
      ...formData,
      [event.target.name] : event.target.value
     })
  };
  const handleHrChange = (index, event) => {
  const updatedHrContacts = [...formData.hrContacts];

  updatedHrContacts[index][event.target.name] = event.target.value;

  setFormData({
    ...formData,
    hrContacts: updatedHrContacts
  });
};

  const handleSubmit = async(event) => {
    event.preventDefault();
    setMessage("Saving...");
    const validHrContacts=formData.hrContacts.filter((hr)=>{
        return (
          hr.name.trim() !=='' ||
          hr.email.trim() !== '' ||
          hr.phone.trim() !== ''
        )
    });


    const response = await axios.post(
        "http://localhost:3000/api/companies/createCompany",
        {
            name: formData.companyName,
            note: formData.note,
            hr_contacts: validHrContacts
        }
    );
    setMessage("Saved succesfully ✅")
    console.log(response.data)
    setFormData({
        companyName: "",
        note: "",
        hrContacts: [
            { name: "", email: "", phone: "" },
            { name: "", email: "", phone: "" },
            { name: "", email: "", phone: "" }
        ]
    });
  };

  return (
    <div
      style={{
        padding: '20px',
        maxWidth: '600px',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      <h2 style={{ color: '#1a237e' }}>Add Company</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
      >
        <div
          style={{
            border: '1px solid #ccc',
            padding: '15px',
            borderRadius: '8px',
            backgroundColor: '#ffffff'
          }}
        >
          <h3 style={{ marginTop: '0' }}>Company Details</h3>

          <input
            type="text"
            name="companyName"
            placeholder="Company Name *"
            value={formData.companyName}
            onChange={handleBasicChange}
            required
            style={{
              padding: '10px',
              width: '100%',
              marginBottom: '10px',
              boxSizing: 'border-box'
            }}
          />

          <textarea
            name="note"
            placeholder="Notes (optional)"
            value={formData.note}
            onChange={handleBasicChange}
            style={{
              padding: '10px',
              width: '100%',
              minHeight: '60px',
              boxSizing: 'border-box',
              fontFamily: 'inherit'
            }}
          />
        </div>

        <div
          style={{
            border: '1px solid #ccc',
            padding: '15px',
            borderRadius: '8px',
            backgroundColor: '#f9f9fc'
          }}
        >
          <h3 style={{ marginTop: '0', marginBottom: '5px' }}>
            HR Contacts (Optional)
          </h3>

          <p
            style={{
              fontSize: '12px',
              color: '#666',
              marginTop: '0',
              marginBottom: '15px'
            }}
          >
            Leave blank if unknown. You can add these later from the Dashboard.
          </p>

          {formData.hrContacts.map((hr, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
                marginBottom: '10px',
                padding: '10px',
                backgroundColor: '#ffffff',
                border: '1px solid #e0e0e0',
                borderRadius: '5px'
              }}
            >
              <input
                type="text"
                name="name"
                placeholder={`HR ${index + 1} Name`}
                value={hr.name}
                onChange={(e) => handleHrChange(index, e)}
                style={{
                  padding: '8px',
                  flex: '1 1 140px',
                  boxSizing: 'border-box'
                }}
              />

              <input
                type="email"
                name="email"
                placeholder={`HR ${index + 1} Email`}
                value={hr.email}
                onChange={(e) => handleHrChange(index, e)}
                style={{
                  padding: '8px',
                  flex: '1 1 140px',
                  boxSizing: 'border-box'
                }}
              />

              <input
                type="tel"
                name="phone"
                placeholder={`HR ${index + 1} Phone`}
                value={hr.phone}
                onChange={(e) => handleHrChange(index, e)}
                style={{
                  padding: '8px',
                  flex: '1 1 140px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          style={{
            padding: '15px',
            backgroundColor: '#1a237e',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          Save Company
        </button>
      </form>

      {message && (
        <div
          style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: message.includes('✅')
              ? '#e8f5e9'
              : '#ffebee',
            borderLeft: `5px solid ${
              message.includes('✅') ? '#4caf50' : '#f44336'
            }`
          }}
        >
          <p style={{ margin: '0', fontWeight: 'bold' }}>{message}</p>
        </div>
      )}
    </div>
  );
}

export default App;