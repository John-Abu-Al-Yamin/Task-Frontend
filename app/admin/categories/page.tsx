"use client";

import { useState } from "react";
import Loading from "@/app/src/components/Loading";
import { useGetCategoriesQuery } from "@/app/src/services/api";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Tag, Star, Search, Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Categories = () => {
  const { data, isLoading, error } = useGetCategoriesQuery();
  const [search, setSearch] = useState("");

  if (isLoading) return <Loading />;

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error loading categories
      </div>
    );

  const categories = Array.isArray(data) ? data : [];

  // filter by search
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f0c] via-[#0f1611] to-[#0a0f0c] p-6">
      <h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-[#38e07b] to-[#29d65c] bg-clip-text text-transparent">
        Categories
      </h1>

      {/* Search Input */}
      <div className="max-w-md mx-auto relative mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9eb7a8] w-5 h-5" />
        <Input
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#0a0f0c]/60 border border-[#29382f] rounded-lg py-2 pl-10 pr-4 text-white placeholder-[#9eb7a8] focus:outline-none focus:ring-2 focus:ring-[#38e07b]/50"
        />
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((cat) => (
            <Card
              key={cat.id}
              className="group relative overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl bg-[#0a0f0c]/80 border-[#29382f] hover:border-[#38e07b]/50 backdrop-blur-sm"
            >
              <CardContent className="p-6 flex flex-col h-full">
                {/* Category Icon + Name */}
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mr-3 transition-all duration-300 group-hover:scale-110 bg-[#38e07b]/20 group-hover:bg-[#38e07b]/30">
                    <Star className="w-6 h-6 text-[#38e07b]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white truncate mb-1">
                      {cat.name}
                    </h3>
                    <div className="flex items-center text-xs text-[#9eb7a8]">
                      Category ID: {cat.id}
                    </div>
                  </div>
                </div>

                {/* Rates Info */}
                <div className="grid grid-cols-2 gap-3 text-sm text-[#9eb7a8] mb-6">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-400" />
                    Normal:{" "}
                    <span className="text-white font-medium">
                      {cat.rateNormal}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-yellow-400" />
                    Special:{" "}
                    <span className="text-white font-medium">
                      {cat.rateSpecial}
                    </span>
                  </div>
                </div>

                {/* Edit Button */}
                <div className="mt-auto">
                  <Link href={`/admin/categories/${cat.id}`}>
                    <Button
                      variant="outline"
                      className="w-full flex items-center gap-2 border-[#38e07b]/40 text-[#38e07b] hover:bg-[#38e07b]/20 hover:text-white"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit Category
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <Star className="w-16 h-16 text-[#9eb7a8] mx-auto mb-4 opacity-50" />
            <p className="text-xl text-white mb-2">No categories found</p>
            <p className="text-sm text-[#9eb7a8]">
              Try searching with a different name
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
