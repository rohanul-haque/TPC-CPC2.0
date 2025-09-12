import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AppContext } from "@/contexts/AppContext";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import Quill from "quill";
import { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export const AddBlogPage = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const { backendUrl } = useContext(AppContext);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image);

      const { data } = await axios.post(`${backendUrl}/blog/post`, formData, {
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        toast.success(data.message || "Blog uploaded successfully ✅");
        setTitle("");
        setDescription("");
        setImage(null);
        if (quillRef.current) {
          quillRef.current.root.innerHTML = "";
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write blog description here...",
      });

      quillRef.current.on("text-change", () => {
        const html = quillRef.current.root.innerHTML;
        setDescription(html);
      });
    }
  }, []);

  return (
    <section className="mb-3">
      <form
        onSubmit={formSubmitHandler}
        className="space-y-5 w-full lg:max-w-xl lg:pl-1"
      >
        <div className="space-y-2">
          <Label>Blog Title</Label>
          <Input
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Blog Image</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <div>
          <Label className="mb-2">Blog Description</Label>
          <div ref={editorRef} style={{ minHeight: "150px" }} />
        </div>

        <Button
          disabled={loading}
          type="submit"
          className="flex items-center gap-2"
        >
          {loading ? (
            <>
              <LoaderCircle className="animate-spin w-4 h-4" />
              <span>Uploading Blog...</span>
            </>
          ) : (
            "Upload Blog"
          )}
        </Button>
      </form>
    </section>
  );
};

export default AddBlogPage;
