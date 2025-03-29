import React, { useState } from "react";
import { ethers } from "ethers";
import { createEvent, connectWallet, uploadFileToIPFS } from "../blockchain";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function ShowLister() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    price: "",
    description: "",
    maxTickets: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = (evt) => {
        setPreviewImage(evt.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div>
              <label htmlFor="title" className="block text-white font-medium mb-2">
                Event Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="E.g., Coldplay Concert"
                className="w-full bg-transparent text-white border border-gray-500 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div>
              <label htmlFor="date" className="block text-white font-medium mb-2">
                Event Date
              </label>
              <input
                type="date"
                name="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full bg-transparent text-white border border-gray-500 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />

              <style>{`
                input[type="date"]::-webkit-calendar-picker-indicator {
                  filter: invert(1);
                }
              `}</style>
            </div>
            <div>
              <label htmlFor="location" className="block text-white font-medium mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="E.g., Madison Square Garden"
                className="w-full bg-transparent text-white border border-gray-500 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div>
              <label htmlFor="imageFile" className="block text-white font-medium mb-2">
                Event Image Upload
              </label>
              <input
                type="file"
                name="imageFile"
                id="imageFile"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full bg-gray-700 text-white border border-gray-500 rounded px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div>
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Event Preview"
                  className="w-full h-48 object-cover rounded-lg border border-gray-500"
                />
              ) : (
                <div className="w-full h-48 bg-gray-600 flex items-center justify-center text-gray-300 rounded-lg border border-gray-500">
                  No Image Selected
                </div>
              )}
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div>
              <label htmlFor="price" className="block text-white font-medium mb-2">
                Ticket Price (in ETH)
              </label>
              <input
                type="number"
                name="price"
                id="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="E.g., 0.01"
                className="w-full bg-transparent text-white border border-gray-500 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                step="any"
                required
              />
            </div>
            <div>
              <label htmlFor="maxTickets" className="block text-white font-medium mb-2">
                Max Tickets
              </label>
              <input
                type="number"
                name="maxTickets"
                id="maxTickets"
                value={formData.maxTickets}
                onChange={handleChange}
                placeholder="E.g., 100"
                className="w-full bg-transparent text-white border border-gray-500 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
          </>
        );
      case 4:
        return (
          <div>
            <label htmlFor="description" className="block text-white font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell us about your event..."
              rows="4"
              className="w-full bg-transparent text-white border border-gray-500 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            ></textarea>
          </div>
        );
      default:
        return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const signer = await connectWallet();
      const ticketPriceWei = ethers.parseEther(formData.price);

      let imageUrl = uploadedImageUrl;
      if (imageFile && !uploadedImageUrl) {
        imageUrl = await uploadFileToIPFS(imageFile);
        setUploadedImageUrl(imageUrl);
      }

      // Build the metadata URI using a placeholder IPFS hash with query parameters.
      const metadataURI = `https://ipfs.io/ipfs/bafkreie7otemlkqhhemy2ul7z2bcgrdm3v4l4n7ewmyul7rnpt3nchqljy?title=${encodeURIComponent(
        formData.title
      )}&desc=${encodeURIComponent(
        formData.description
      )}&date=${encodeURIComponent(
        formData.date
      )}&location=${encodeURIComponent(
        formData.location
      )}&image=${encodeURIComponent(imageUrl)}`;

      const eventId = await createEvent(
        signer,
        metadataURI,
        ticketPriceWei,
        formData.maxTickets
      );

      toast.success("Event listed successfully! Event ID: " + eventId);

      // Reset the form and step
      setFormData({
        title: "",
        date: "",
        location: "",
        price: "",
        description: "",
        maxTickets: "",
      });
      setImageFile(null);
      setUploadedImageUrl("");
      setPreviewImage("");
      setStep(1);
      navigate("/findshows");
    } catch (error) {
      console.error("Error listing event:", error);
      toast.error("Error listing event. Check console for details.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-20 bg-black/90 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-white pt-8">
          Host Your Event with <span className="text-orange-500">Tiktr</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column: Multistep Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-black/40 rounded-lg shadow-lg p-8 space-y-6 transform transition duration-200 hover:shadow-2xl"
          >
            {renderStep()}
            <div className="flex justify-between">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-700 text-white font-medium py-2 px-4 rounded hover:bg-gray-600 transition-colors"
                >
                  Back
                </button>
              )}
              {step < 4 && (
                <button
                  type="button"
                  onClick={nextStep}
                  className="ml-auto bg-orange-700 text-white font-medium py-2 px-4 rounded hover:bg-orange-800 transition-colors"
                >
                  Next
                </button>
              )}
              {step === 4 && (
                <button
                  type="submit"
                  disabled={loading}
                  className="ml-auto bg-orange-700 text-white font-bold py-2 px-6 rounded hover:bg-orange-800 transition-colors"
                >
                  {loading ? "Listing Event..." : "List Event"}
                </button>
              )}
            </div>
          </form>

          {/* Right Column: Live Preview */}
          <div className="flex flex-col justify-center items-center text-white space-y-4">
            <h2 className="text-2xl font-bold mb-2">Live Preview</h2>
            <div className="bg-gray-800 w-full max-w-sm rounded-lg shadow-lg p-4 transition duration-200 hover:shadow-2xl">
              <div className="overflow-hidden rounded-lg mb-4">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Event Preview"
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-600 flex items-center justify-center text-gray-300">
                    No Image Selected
                  </div>
                )}
              </div>
              <h3 className="text-xl font-bold mb-1">
                {formData.title || "Event Title"}
              </h3>
              <p className="text-gray-400 text-sm mb-1">
                📅 {formData.date || "YYYY-MM-DD"}
              </p>
              <p className="text-gray-400 text-sm mb-1">
                📍 {formData.location || "Location TBD"}
              </p>
              <p className="text-gray-400 text-sm mb-3">
                Price: {formData.price || "0.0"} ETH
              </p>
              <p className="text-sm text-gray-300">
                {formData.description
                  ? formData.description.slice(0, 100) +
                    (formData.description.length > 100 ? "..." : "")
                  : "Event description preview..."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowLister;
