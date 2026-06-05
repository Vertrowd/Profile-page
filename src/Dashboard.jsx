import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from './config';
import './Dashboard.css';

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        firstName: '',
        lastName: '',
        bio: '',
        phone: '',
    });
    const [newImage, setNewImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [updatingImage, setUpdatingImage] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            const response = await axios.get(API_ENDPOINTS.GET_PROFILE, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setUser(response.data.user);
            setEditForm({
                firstName: response.data.user.firstName || '',
                lastName: response.data.user.lastName || '',
                bio: response.data.user.bio || '',
                phone: response.data.user.phone || '',
            });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch user data');
            // Clear invalid token
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/login');
        } finally {
            setLoading(false);
        }
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setError('Image size must be less than 5MB');
                return;
            }
            setNewImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(API_ENDPOINTS.UPDATE_PROFILE, editForm, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setUser(response.data.user);
            setIsEditing(false);
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update profile');
        }
    };

    const handleUploadImage = async () => {
        if (!newImage) {
            setError('Please select an image');
            return;
        }

        try {
            setUpdatingImage(true);
            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('profileImage', newImage);

            const response = await axios.put(API_ENDPOINTS.UPDATE_PROFILE_IMAGE, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            setUser(response.data.user);
            setNewImage(null);
            setImagePreview(null);
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update image');
        } finally {
            setUpdatingImage(false);
        }
    };

    const handleDeleteImage = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(API_ENDPOINTS.DELETE_PROFILE_IMAGE, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setUser(response.data.user);
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete image');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="dashboard-container">
                <div className="loading">Loading...</div>
            </div>
        );
    }

    if (error && !user) {
        return (
            <div className="dashboard-container">
                <div className="error-message">{error}</div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-card">
                <div className="dashboard-header">
                    <h1>Welcome, {user?.username}!</h1>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>

                {error && <div className="error-message">{error}</div>}

                <div className="profile-section">
                    <div className="profile-image-section">
                        <h3>Profile Picture</h3>
                        {user?.profileImage ? (
                            <img src={`${API_BASE_URL}${user.profileImage}`} alt="Profile" className="profile-image" />
                        ) : (
                            <div className="profile-image-placeholder">
                                <span>No Image</span>
                            </div>
                        )}

                        <div className="image-upload-section">
                            {imagePreview && (
                                <div className="image-preview-new">
                                    <p>Preview:</p>
                                    <img src={imagePreview} alt="New Preview" />
                                </div>
                            )}
                            <input
                                type="file"
                                id="profileImageInput"
                                onChange={handleImageChange}
                                accept="image/*"
                                className="file-input"
                            />
                            {newImage && (
                                <button onClick={handleUploadImage} disabled={updatingImage} className="btn-primary">
                                    {updatingImage ? 'Uploading...' : 'Upload New Image'}
                                </button>
                            )}
                            {user?.profileImage && (
                                <button onClick={handleDeleteImage} className="btn-danger">
                                    Delete Image
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="profile-info-section">
                        <h2>Your Profile</h2>

                        {!isEditing ? (
                            <div className="user-info">
                                <div className="info-item">
                                    <label>Username:</label>
                                    <p>{user?.username}</p>
                                </div>
                                <div className="info-item">
                                    <label>Email:</label>
                                    <p>{user?.email}</p>
                                </div>
                                <div className="info-item">
                                    <label>First Name:</label>
                                    <p>{user?.firstName || 'Not set'}</p>
                                </div>
                                <div className="info-item">
                                    <label>Last Name:</label>
                                    <p>{user?.lastName || 'Not set'}</p>
                                </div>
                                <div className="info-item">
                                    <label>Bio:</label>
                                    <p>{user?.bio || 'No bio added'}</p>
                                </div>
                                <div className="info-item">
                                    <label>Phone:</label>
                                    <p>{user?.phone || 'Not set'}</p>
                                </div>
                                <div className="info-item">
                                    <label>Member Since:</label>
                                    <p>{new Date(user?.createdAt).toLocaleDateString()}</p>
                                </div>
                                <button onClick={() => setIsEditing(true)} className="btn-primary">
                                    Edit Profile
                                </button>
                            </div>
                        ) : (
                            <div className="edit-form">
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={editForm.firstName}
                                        onChange={handleEditChange}
                                        placeholder="Enter first name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={editForm.lastName}
                                        onChange={handleEditChange}
                                        placeholder="Enter last name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Bio</label>
                                    <textarea
                                        name="bio"
                                        value={editForm.bio}
                                        onChange={handleEditChange}
                                        placeholder="Tell us about yourself"
                                        rows="4"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={editForm.phone}
                                        onChange={handleEditChange}
                                        placeholder="Enter phone number"
                                    />
                                </div>
                                <div className="button-group">
                                    <button onClick={handleSaveProfile} className="btn-primary">
                                        Save Changes
                                    </button>
                                    <button 
                                        onClick={() => {
                                            setIsEditing(false);
                                            setEditForm({
                                                firstName: user?.firstName || '',
                                                lastName: user?.lastName || '',
                                                bio: user?.bio || '',
                                                phone: user?.phone || '',
                                            });
                                        }} 
                                        className="btn-secondary"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
