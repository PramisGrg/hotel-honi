import { useDropzone } from "react-dropzone";

interface ReusableDropzoneProps {
  onFileSelected: (files: File[]) => void;
  selectedFiles: File[];
}

const ReusableDropzone: React.FC<ReusableDropzoneProps> = ({
  onFileSelected,
  selectedFiles,
}) => {
  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      onFileSelected(acceptedFiles);
    },
    accept: {
      "image/*": [".jpeg", ".png", ".jpg"],
    },
    multiple: false,
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className={`dropzone border-2 border-dashed border-gray-400 p-6 rounded-lg cursor-pointer text-center ${
          isDragActive ? "bg-gray-100" : ""
        } relative h-64`}
      >
        <input {...getInputProps()} />
        {selectedFiles.length === 0 ? (
          <div className="text-gray-500 ">
            Drag & drop an image here, or click to select an image
          </div>
        ) : (
          <div className="absolute inset-0">
            {selectedFiles.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReusableDropzone;
