import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { memo, useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "https://689c2b7a58a27b18087d1a25.mockapi.io",
});

const About = () => {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    birthdate: "",
    avatar: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["students"],
    queryFn: () => api.get("/student").then((res) => res.data),
  });

  const createMutation = useMutation({
    mutationFn: (newData: any) => api.post("/student", newData),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["students"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/student/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["students"] }),
  });

  const updateMutation = useMutation({
    mutationFn: (updated: any) =>
      api.put(`/student/${updated.id}`, updated.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["students"] }),
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.address || !form.birthdate) return;

    if (editingId) {
      updateMutation.mutate({
        id: editingId,
        data: form,
      });
      setEditingId(null);
    } else {
      createMutation.mutate({ ...form, createdAt: new Date().toISOString() });
    }

    setForm({ name: "", email: "", address: "", birthdate: "", avatar: "" });
  };

  if (isLoading) {
    return <p className="text-center mt-10 text-lg">Yuklanmoqda...</p>;
  }

  if (isError) {
    return (
      <p className="text-center mt-10 text-red-500 font-medium">
        {error.message}
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Student CRUD
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 grid grid-cols-1 md:grid-cols-5 gap-4 max-w-5xl mx-auto mb-10"
      >
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          type="text"
          placeholder="Name"
        />
        <input
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          type="email"
          placeholder="Email"
        />
        <input
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          type="text"
          placeholder="Address"
        />
        <input
          value={form.birthdate}
          onChange={(e) => setForm({ ...form, birthdate: e.target.value })}
          className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          type="date"
        />
        <input
          value={form.avatar}
          onChange={(e) => setForm({ ...form, avatar: e.target.value })}
          className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          type="text"
          placeholder="Avatar URL"
        />
        <button className="col-span-full bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition-all">
          {editingId ? "Update" : "Submit"}
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.map((item: any) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-5 flex flex-col justify-between"
          >
            <div>
              <img
                src={item.avatar}
                alt={item.name}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {item.name}
              </h3>
              <p className="text-gray-600">{item.email}</p>
              <p className="text-gray-600">{item.address}</p>
              <p className="text-gray-500">
                {new Date(item.birthdate).toLocaleDateString()}
              </p>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => deleteMutation.mutate(item.id)}
                className="flex-1 border border-red-400 text-red-500 rounded-lg px-3 py-2 hover:bg-red-50 transition-all"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setForm({
                    name: item.name,
                    email: item.email,
                    address: item.address,
                    birthdate: item.birthdate,
                    avatar: item.avatar,
                  });
                  setEditingId(item.id);
                }}
                className="flex-1 border border-yellow-400 text-yellow-500 rounded-lg px-3 py-2 hover:bg-yellow-50 transition-all"
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(About);
