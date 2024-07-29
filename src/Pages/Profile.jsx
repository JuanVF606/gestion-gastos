import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/containers/Layouts/Layout';
import { FaPhone, FaCalendar, FaBriefcase, FaMoneyBillWave, FaEnvelope, FaEdit } from 'react-icons/fa';
import getCookie from '../utils/cookie';

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    age: '',
    profession: '',
    salary: '',
    work: '',
    phone: '',
    profile_image: null
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/userprofile/profile/view/', {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    })
      .then(response => {
        setProfile(response.data);
        setFormData({
          email: response.data.user || '',
          age: response.data.age || '',
          profession: response.data.profession || '',
          salary: response.data.salary || '',
          work: response.data.work || '',
          phone: response.data.phone || '',
          profile_image: response.data.thumbnail || null
        });
        setImagePreview(response.data.thumbnail || null);
      })
      .catch(error => console.error('Error fetching profile:', error));
  }, []);

  const handleChange = (e) => {
    if (e.target.name === 'profile_image') {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        profile_image: file
      });
      setImagePreview(URL.createObjectURL(file));
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    const token = localStorage.getItem('access'); // Asumiendo que almacenas el token en el localStorage
    axios.post('http://localhost:8000/api/v1/userprofile/profile/update/', formDataToSend, {
      headers: {
        'Authorization': `JWT ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        setProfile(response.data);
        setIsEditing(false);
        alert('Perfil actualizado correctamente.');
      })
      .catch(error => console.error('Error updating profile:', error));
  };

  if (!profile) {
    return (
      <Layout>
        <div className="bg-white p-6 rounded-lg shadow-lg space-y-6 animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Cargando perfil...</h2>
          </div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-white p-8 rounded-lg shadow-lg space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Perfil del Usuario</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center hover:bg-blue-700 transition duration-300"
          >
            <FaEdit className="mr-2" /> {isEditing ? 'Cancelar' : 'Editar'}
          </button>
        </div>
        <div className="flex items-center mb-6">
          <div className="relative">
            <img
              src={imagePreview || '/path/to/default-profile-image.png'}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-gray-300 object-cover"
            />
            {isEditing && (
              <input
                type="file"
                name="profile_image"
                onChange={handleChange}
                className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer"
              />
            )}
          </div>
        </div>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 text-lg font-medium mb-2">Correo Electrónico</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Correo Electrónico"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-lg font-medium mb-2">Edad</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="border rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Edad"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-lg font-medium mb-2">Profesión</label>
              <input
                type="text"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                className="border rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Profesión"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-lg font-medium mb-2">Sueldo</label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="border rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Sueldo"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-lg font-medium mb-2">Trabajo</label>
              <input
                type="text"
                name="work"
                value={formData.work}
                onChange={handleChange}
                className="border rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Trabajo"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-lg font-medium mb-2">Teléfono</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="border rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Teléfono"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Guardar Cambios
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-700 text-lg"><FaEnvelope className="inline mr-2 text-blue-600" /> Correo Electrónico: <span className="font-medium">{profile.email || 'No disponible'}</span></p>
            <p className="text-gray-700 text-lg"><FaCalendar className="inline mr-2 text-blue-600" /> Edad: <span className="font-medium">{profile.age || 'No disponible'}</span></p>
            <p className="text-gray-700 text-lg"><FaBriefcase className="inline mr-2 text-blue-600" /> Profesión: <span className="font-medium">{profile.profession || 'No disponible'}</span></p>
            <p className="text-gray-700 text-lg"><FaMoneyBillWave className="inline mr-2 text-blue-600" /> Sueldo: CLP <span className="font-medium">{profile.salary || 'No disponible'}</span></p>
            <p className="text-gray-700 text-lg"><FaBriefcase className="inline mr-2 text-blue-600" /> Trabajo: <span className="font-medium">{profile.work || 'No disponible'}</span></p>
            <p className="text-gray-700 text-lg"><FaPhone className="inline mr-2 text-blue-600" /> Teléfono: <span className="font-medium">{profile.phone || 'No disponible'}</span></p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UserProfile;
