import { useState } from 'react';
import axios from 'axios';

function AddCompany() {
  const [formData, setFormData] = useState({
    companyName: '', note: '', hrContacts: [{ name: '', email: '', phone: '' }, { name: '', email: '', phone: '' }, { name: '', email: '', phone: '' }]
  });
  const [message, setMessage] = useState('');

  const handleBasicChange = (event) => setFormData({ ...formData, [event.target.name]: event.target.value });
  
  const handleHrChange = (index, event) => {
    const updatedHrContacts = [...formData.hrContacts];
    updatedHrContacts[index][event.target.name] = event.target.value;
    setFormData({ ...formData, hrContacts: updatedHrContacts });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('Saving...');
    const validHrContacts = formData.hrContacts.filter((hr) => hr.name.trim() !== '' || hr.email.trim() !== '' || hr.phone.trim() !== '');
    try {
      await axios.post('http://localhost:3000/api/companies/createCompany', {
        name: formData.companyName, note: formData.note, hr_contacts: validHrContacts 
      });
      setMessage('✅ Company saved successfully!');
      setFormData({ companyName: '', note: '', hrContacts: [{ name: '', email: '', phone: '' }, { name: '', email: '', phone: '' }, { name: '', email: '', phone: '' }] });
    } catch (error) {
      setMessage('❌ Error saving company.');
    }
  };

  return (
    <div>
      <h2>Add New Target</h2>
      <form onSubmit={handleSubmit}>
        
        <div className="card">
          <h3>Company Details</h3>
          <input type="text" name="companyName" placeholder="Company Name *" value={formData.companyName} onChange={handleBasicChange} required className="form-input" style={{ marginBottom: '10px' }} />
          <textarea name="note" placeholder="Notes (optional)" value={formData.note} onChange={handleBasicChange} className="form-input" style={{ minHeight: '60px' }} />
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '5px' }}>HR Contacts (Optional)</h3>
          <p className="subtext" style={{ marginBottom: '15px' }}>Leave blank if unknown.</p>
          
          {formData.hrContacts.map((hr, index) => (
            <div key={index} className="flex-row">
              <input type="text" name="name" placeholder={`HR ${index + 1} Name`} value={hr.name} onChange={(e) => handleHrChange(index, e)} className="form-input flex-input" />
              <input type="email" name="email" placeholder={`HR ${index + 1} Email`} value={hr.email} onChange={(e) => handleHrChange(index, e)} className="form-input flex-input" />
              <input type="tel" name="phone" placeholder={`HR ${index + 1} Phone`} value={hr.phone} onChange={(e) => handleHrChange(index, e)} className="form-input flex-input" />
            </div>
          ))}
        </div>
        
        <button type="submit" className="btn btn-primary">Save Company</button>
      </form>
      
      {message && <p style={{ marginTop: '20px', fontWeight: 'bold' }}>{message}</p>}
    </div>
  );
}

export default AddCompany;