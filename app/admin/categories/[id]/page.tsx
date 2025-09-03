"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from "@/app/src/services/api";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Star, DollarSign, Tag } from "lucide-react";
import Loading from "@/app/src/components/Loading";
import { toast } from "sonner";
import {
  categorySchema,
  CategoryFormData,
} from "@/app/src/validations/adminSchema";
import { ZodError } from "zod";

const EditCategoryPage = () => {
  const router = useRouter();
  const params = useParams();
  const categoryId = params?.id as string;

  const { data: categories, isLoading, error } = useGetCategoriesQuery();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();

  const [formData, setFormData] = useState<CategoryFormData>({
    name: "",
    rateNormal: 0,
    rateSpecial: 0,
  });

  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof CategoryFormData, string>>
  >({});

  useEffect(() => {
    if (categories) {
      const cat = categories.find((c) => c.id === categoryId);
      if (cat) {
        setFormData({
          name: cat.name || "",
          rateNormal: cat.rateNormal || 0,
          rateSpecial: cat.rateSpecial || 0,
        });
      }
    }
  }, [categories, categoryId]);

  if (isLoading) return <Loading />;
  if (error) return <p className="text-red-500">Error loading category</p>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name.includes("rate") ? Number(value) : value,
    }));
    setFormErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async () => {
    try {
      const parsedData = categorySchema.parse(formData);
      setFormErrors({});
      await updateCategory({ id: categoryId, data: parsedData }).unwrap();
      toast.success("Category updated successfully!");
      router.push("/admin/categories");
    } catch (err: any) {
      if (err instanceof ZodError) {
        const errors: Partial<Record<keyof CategoryFormData, string>> = {};
        err.issues.forEach((issue) => {
          const key = issue.path[0] as keyof CategoryFormData;
          errors[key] = issue.message;
        });
        setFormErrors(errors);
      } else {
        const errorMessage =
          err?.data?.message || err?.message || "Failed to update category";
        toast.error(errorMessage);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f0c] via-[#0f1611] to-[#0a0f0c] p-6 flex justify-center items-start">
      <Card className="w-full max-w-lg bg-[#0a0f0c]/80 border border-[#29382f] backdrop-blur-sm">
        <CardContent className="p-6 flex flex-col gap-4">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mr-3 bg-[#38e07b]/20">
              <Star className="w-6 h-6 text-[#38e07b]" />
            </div>
            <h2 className="text-xl font-bold text-white">Edit Category</h2>
          </div>

          <div>
            <label className="block mb-1 text-[#9eb7a8]">Name</label>
            <Input name="name" value={formData.name} onChange={handleChange} />
            {formErrors.name && (
              <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-[#9eb7a8]">Normal Rate</label>
            <Input
              name="rateNormal"
              type="number"
              value={formData.rateNormal}
              onChange={handleChange}
            />
            {formErrors.rateNormal && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.rateNormal}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-1 text-[#9eb7a8]">Special Rate</label>
            <Input
              name="rateSpecial"
              type="number"
              value={formData.rateSpecial}
              onChange={handleChange}
            />
            {formErrors.rateSpecial && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.rateSpecial}
              </p>
            )}
          </div>

          <Button
            onClick={handleSubmit}
            disabled={isUpdating}
            variant="outline"
            className="w-full flex items-center gap-2 border-[#38e07b]/40 text-[#38e07b] hover:bg-[#38e07b]/20 hover:text-white"
          >
            {isUpdating ? "Updating..." : "Update Category"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditCategoryPage;
