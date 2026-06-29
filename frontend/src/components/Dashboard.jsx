import { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/api/companies/getAll');
        if (response.data.success) setCompanies(response.data.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  return (
    <div>
      <h2>Target Companies Dashboard</h2>

      {isLoading ? (
        <p>Loading database records...</p>
      ) : companies.length === 0 ? (
        <p>No companies saved yet. Go to the Add tab to create one!</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>HR Contacts</th>
              <th>Date Added</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company._id}>
                <td>
                  <strong>{company.name}</strong>
                  <div className="subtext">{company.note || 'No notes'}</div>
                </td>
                <td>
                  {company.hr_contacts.length > 0 ? (
                    company.hr_contacts.map((hr, idx) => (
                      <div key={idx} style={{ marginBottom: '4px' }}>
                        👤 {hr.name || 'Unknown'} - {hr.email || 'No email'} {hr.phone && `(${hr.phone})`}
                      </div>
                    ))
                  ) : (
                    <span style={{ color: 'var(--danger)' }}>0 Contacts Saved</span>
                  )}
                </td>
                <td>{new Date(company.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;