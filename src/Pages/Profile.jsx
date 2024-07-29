import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/containers/Layouts/Layout';
import { FaPhone, FaCalendar, FaBriefcase, FaMoneyBillWave, FaEdit, FaEnvelope } from 'react-icons/fa';
import  getCookie  from '../utils/cookie';
const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    age: '',
    profession: '',
    salary: '',
    work: '',
    phone: ''
  });

  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/userprofile/profile/view/', {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
        Authorization: `JWT ${localStorage.getItem("access")} `,
      },
    })
      .then(response => {
        setProfile(response.data);
        setFormData({
          email: response.data.email || '',
          age: response.data.age || '',
          profession: response.data.profession || '',
          salary: response.data.salary || '',
          work: response.data.work || '',
          phone: response.data.phone || ''
        });
      })
      .catch(error => console.error('Error fetching profile:', error));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Asumiendo que almacenas el token en el localStorage
    axios.post('/api/v1/userprofile/profile/update/', formData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setProfile(response.data);
        setIsEditing(false);
        alert('Perfil actualizado correctamente.');
      })
      .catch(error => console.error('Error updating profile:', error));
  };

  if (!profile) return (
    <Layout>
      <div className="bg-white p-6 rounded-lg shadow-lg space-y-6 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Cargando perfil...</h2>
        </div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        </div>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Perfil del Usuario</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center"
          >
            <FaEdit className="mr-2" /> {isEditing ? 'Cancelar' : 'Editar'}
          </button>
        </div>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Correo Electrónico</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border rounded-lg py-2 px-4 w-full"
                placeholder="Correo Electrónico"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Edad</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="border rounded-lg py-2 px-4 w-full"
                placeholder="Edad"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Profesión</label>
              <input
                type="text"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                className="border rounded-lg py-2 px-4 w-full"
                placeholder="Profesión"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Sueldo</label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="border rounded-lg py-2 px-4 w-full"
                placeholder="Sueldo"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Trabajo</label>
              <input
                type="text"
                name="work"
                value={formData.work}
                onChange={handleChange}
                className="border rounded-lg py-2 px-4 w-full"
                placeholder="Trabajo"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Teléfono</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="border rounded-lg py-2 px-4 w-full"
                placeholder="Teléfono"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg"
            >
              Guardar Cambios
            </button>
          </form>
        ) : (
          <div>
            <div className="mb-4">
              <p className="text-gray-700"><FaEnvelope className="inline mr-2" /> Correo Electrónico: {profile.email}</p>
              <p className="text-gray-700"><FaCalendar className="inline mr-2" /> Edad: {profile.age || 'No disponible'}</p>
              <p className="text-gray-700"><FaBriefcase className="inline mr-2" /> Profesión: {profile.profession || 'No disponible'}</p>
              <p className="text-gray-700"><FaMoneyBillWave className="inline mr-2" /> Sueldo: CLP {profile.salary.toLocaleString() || 'No disponible'}</p>
              <p className="text-gray-700"><FaBriefcase className="inline mr-2" /> Trabajo: {profile.work || 'No disponible'}</p>
              <p className="text-gray-700"><FaPhone className="inline mr-2" /> Teléfono: {profile.phone || 'No disponible'}</p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UserProfile;
