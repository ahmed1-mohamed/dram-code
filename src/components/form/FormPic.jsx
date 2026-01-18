export default function FormPic({ label, type, onChange }) {
  return (
    <div className="flex flex-col items-start space-y-4">

      <label className="text-lg font-semibold text-gray-700">{label}</label>


      <label className=" px-8 py-2 bg-red-300 text-white font-medium text-xl rounded-lg shadow-lg cursor-pointer hover:bg-pink-600 transition-all duration-300">
        <span>Upload Image</span>
        <input
          type={type}
          accept="image/*"
          onChange={onChange}
          className="hidden"
        />
      </label>


    </div>
  );
}
