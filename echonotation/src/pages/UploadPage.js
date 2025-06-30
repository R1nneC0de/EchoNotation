// src/pages/UploadPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    if (!auth.user?.access_token) {
      alert("You are not authenticated.");
      return;
    }

    const formData = new FormData();
    formData.append("recording", file);

    setUploading(true);
    try {
      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth.user.access_token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Upload failed: ${errText}`);
      }

      const data = await res.json();
      console.log("Upload success:", data);

      // Redirect to the simulate page
      navigate("/simulate");
    } catch (err) {
      console.error("Upload error:", err.message);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 px-4">
      <h1 className="text-3xl font-semibold mb-6">Upload Meeting Recording</h1>

      <input
        type="file"
        accept="audio/*,video/*"
        onChange={handleFileChange}
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload and Continue"}
      </button>
    </div>
  );
};

export default UploadPage;
