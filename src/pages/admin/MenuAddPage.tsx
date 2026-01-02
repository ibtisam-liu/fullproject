import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MenuAddPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!image) {
      alert("Please choose an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("image", image);

    try {
      const res = await axios.post("http://localhost:5000/api/menu/add", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert(res.data.message);
      navigate("/admin");

    } catch (error: any) {
      console.log("Error uploading:", error.response?.data || error);
      alert("Failed to add menu item");
    }
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files?.[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-md rounded-lg mt-20">
      <h1 className="text-2xl font-bold mb-6 text-center text-orange-500">
        Add Menu Item
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Name</label>
          <input
            className="w-full border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Description</label>
          <input
            className="w-full border p-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label>Price ($)</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Category</label>
          <input
            className="w-full border p-2 rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Choose Image</label>
          <input
            type="file"
            accept="image/*"
            className="w-full border p-2 rounded"
            onChange={handleImageChange}
            required
          />
        </div>

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-md border"
          />
        )}

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 mt-4"
        >
          Add Item
        </button>
      </form>
    </div>
  );
};

export default MenuAddPage;
