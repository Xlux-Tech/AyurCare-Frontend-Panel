import { useEffect, useState } from 'react';
import { getAppointments, updateAppointment, deleteAppointment } from '../api';

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    getAppointments().then(({ data }) => setAppointments(data));
  }, []);

  const handleStatus = async (id, status) => {
    const { data } = await updateAppointment(id, { status });
    setAppointments(appointments.map((a) => (a._id === id ? data : a)));
  };

  const handleDelete = async (id) => {
    await deleteAppointment(id);
    setAppointments(appointments.filter((a) => a._id !== id));
  };

  return (
    <div>
      <h2>Appointments</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr><th>User</th><th>Doctor</th><th>Date</th><th>Status</th><th>Action</th></tr>
        </thead>
        <tbody>
          {appointments.map((a) => (
            <tr key={a._id}>
              <td>{a.user?.name}</td>
              <td>{a.doctor}</td>
              <td>{new Date(a.date).toLocaleDateString()}</td>
              <td>
                <select value={a.status} onChange={(e) => handleStatus(a._id, e.target.value)}>
                  <option>pending</option>
                  <option>confirmed</option>
                  <option>cancelled</option>
                </select>
              </td>
              <td><button onClick={() => handleDelete(a._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
