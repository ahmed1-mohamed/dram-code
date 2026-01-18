import { useEffect, useState } from 'react';
import { ArrowLeft, Eye, EyeOff, ZoomIn, ZoomOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, updateUser } from '../../../../store/slices/loggedUserSlice';
import FormText from '../../../../components/form/FormText';
import FormEmail from '../../../../components/form/FormEmail';
import FormPic from '../../../../components/form/FormPic';
import { toast, ToastContainer } from 'react-toastify';

export default function UpdateSettings() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        name: '',
        password: '',
        confirmPassword: '',
        image: '',
        imagePreview: '',
        CurrentPassword: '',
    });
    const [zoomLevel, setZoomLevel] = useState(1);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            setFormData((prevData) => ({
                ...prevData,
                email: user.email || '',
                username: user.username || '',
                name: user.name || '',
                image: user.image ? `http://localhost:3020/images/users/${user.image}` : '',
                imagePreview: user.image ? `http://localhost:3020/images/users/${user.image}` : '',
            }));
        }
    }, [user]);

    const handleGetBack = () => {
        navigate(`${import.meta.env.VITE_PUBLIC_URL}/main`);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prevData) => ({
                    ...prevData,
                    imagePreview: reader.result,
                    image: file,
                }));
            };
            reader.readAsDataURL(file);
        }
    };


    const handleUserInfoSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        const formDataObj = new FormData();
        formDataObj.append("email", formData.email);
        formDataObj.append("name", formData.name);
        formDataObj.append("username", formData.username);

        if (formData.image && formData.image instanceof File) {
            formDataObj.append("image", formData.image);
        }

        try {
            await dispatch(updateUser(formDataObj)).unwrap().then(() => {
                toast.success("User updated successfully!");
                setTimeout(() => navigate(-1), 2000);

            })
                .catch((error) => {
                    console.error("Error updating User:", error);
                    toast.error("Failed to update User.");
                });
            dispatch(fetchUser());
        } catch (error) {
            console.error("Error updating user info:", error);
        } finally {
            setLoading(false);
        }
    };



    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            await dispatch(updateUser({ password: formData.password })).unwrap().then(() => {
                toast.success("User updated successfully!");
            })
                .catch((error) => {
                    console.error("Error updating User:", error);
                    toast.error("Failed to update User.");
                });
            setFormData((prevData) => ({
                ...prevData,
                password: '',
                confirmPassword: '',
                CurrentPassword: '',
            }));
        } catch (error) {
            console.error("Error updating password:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const zoomIn = () => {
        setZoomLevel((prevZoom) => Math.min(prevZoom + 0.1, 3));
    };

    const zoomOut = () => {
        setZoomLevel((prevZoom) => Math.max(prevZoom - 0.1, 1));
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <ToastContainer />
            <div className="bg-white shadow-2xl rounded-xl p-6 max-w-3xl w-full">
                <header className="flex items-center mb-5">
                    <button className="text-pink-500 hover:bg-pink-100 p-2 rounded-full transition" onClick={handleGetBack}>
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <h1 className="text-4xl font-extrabold text-gray-800 text-center flex-grow">Settings</h1>
                </header>
                <main>
                    <form className="space-y-4" onSubmit={handleUserInfoSubmit}>
                        <FormText
                            label="Username"
                            name="username"
                            value={formData.username}
                            placeholder="Username"
                            readOnly
                            required
                            onChange={handleChange}
                            className="transition-all duration-200 hover:shadow-lg focus:shadow-lg"
                        />
                        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
                            <FormText
                                label="Name"
                                name="name"
                                value={formData.name}
                                placeholder="Name"
                                required
                                onChange={handleChange}
                                className="transition-all duration-200 hover:shadow-lg focus:shadow-lg"
                            />
                            <FormEmail
                                label="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="user@example.com"
                                required
                                className="transition-all duration-200 hover:shadow-lg focus:shadow-lg"
                            />
                        </div>

                        <div className="flex justify-between items-end space-x-8">
                            <div className="relative flex flex-col py-6 w-1/2 border-2 border-gray-200 rounded-3xl shadow-lg space-y-4 bg-white">
                                <div className="flex justify-around items-center">
                                    <img
                                        src={formData.imagePreview || 'https://via.placeholder.com/150'} // Fallback to placeholder
                                        alt="Avatar"
                                        className="w-36 h-36 rounded-full object-cover shadow-md border-4 border-pink-200"
                                        style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.3s ease' }}
                                    />
                                    <div className="flex items-center gap-3 flex-col">
                                        <button
                                            type="button"
                                            className="p-2 bg-white rounded-full shadow-md hover:bg-pink-100 transition-colors"
                                            onClick={zoomIn}
                                        >
                                            <ZoomIn className="w-6 h-6 text-[#FE9798]" />
                                        </button>
                                        <button
                                            type="button"
                                            className="p-2 bg-white rounded-full shadow-md hover:bg-pink-100 transition-colors"
                                            onClick={zoomOut}
                                        >
                                            <ZoomOut className="w-6 h-6 text-[#FE9798]" />
                                        </button>
                                        <a
                                            href={formData.imagePreview || 'https://via.placeholder.com/150'} // Use imagePreview for download
                                            download="avatar.png"
                                            className="p-2 bg-white rounded-full shadow-md hover:bg-pink-100 transition-colors"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 text-[#FE9798]"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M12 4v12m8-8l-8 8-8-8"
                                                />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                                <div className="relative flex justify-center">
                                    <FormPic type="file" onChange={handleFileChange} />
                                </div>
                            </div>

                            <button
                                type="submit"
                                onClick={handleUserInfoSubmit}
                                className="px-8 py-3 bg-[#FE9798] text-white rounded-full font-bold hover:shadow-2xl  transition-all duration-300 shadow-lg"
                            >
                                {loading ? 'loading ...' : "Save Info"}

                            </button>
                        </div>

                    </form>

                    <form className="space-y-6 mt-10" onSubmit={handlePasswordSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="relative">
                                <FormText
                                    label="Current Password"
                                    name="CurrentPassword"
                                    value={formData.CurrentPassword}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your current password"
                                    required
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 px-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                                </button>
                            </div>
                            <div className="relative">
                                <FormText
                                    label="New Password"
                                    name="password"
                                    value={formData.password}
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Enter new password"
                                    required
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 px-3 flex items-center"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                                </button>
                            </div>
                            <FormText
                                label="Confirm Password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                type="password"
                                placeholder="Confirm new password"
                                required
                                onChange={handleChange}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#FE9798] text-white font-bold py-3 rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg"
                        >
                            {loading ? 'loading ...' : "Change Password"}

                        </button>
                    </form>
                </main>
            </div>
        </div>
    );
}