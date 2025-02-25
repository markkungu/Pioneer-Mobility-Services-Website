import { useState } from "react";

const Blog = () => {
  const [search, setSearch] = useState("");
  const categories = ["NEMT News", "Safety", "Healthcare Access", "Insurance Policies"];

  const articles = [
    {
      id: 1,
      title: "How Non-Emergency Medical Transport Improves Healthcare Access",
      category: "Healthcare Access",
      date: "Feb 24, 2025",
      summary: "Learn how NEMT services help patients reach medical facilities on time, improving overall healthcare accessibility.",
    },
    {
      id: 2,
      title: "Top Safety Measures for Medical Transportation Drivers",
      category: "Safety",
      date: "Feb 18, 2025",
      summary: "Explore essential safety measures every NEMT driver should follow to ensure a smooth patient journey.",
    },
    {
      id: 3,
      title: "Understanding Medicaid Coverage for NEMT Services",
      category: "Insurance Policies",
      date: "Feb 10, 2025",
      summary: "A guide on Medicaid's coverage for NEMT services and how patients can access benefits.",
    },
  ];

  return (
    <section className="bg-gray-100 py-16 px-6">
      <div className="container mx-auto max-w-5xl">
        {/* Title */}
        <h2 className="text-3xl font-bold text-[#0B3D5A] text-center mb-6">Latest Articles</h2>

        {/* Search & Categories */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search articles..."
            className="border p-3 rounded-lg w-full md:w-1/2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Category Filters */}
          <div className="flex space-x-3 mt-4 md:mt-0">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 bg-[#128178] text-white rounded-lg hover:bg-[#0B3D5A] transition"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Articles List */}
        <div className="grid md:grid-cols-2 gap-6">
          {articles
            .filter((article) =>
              article.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((article) => (
              <div key={article.id} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-[#0B3D5A] mb-2">{article.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{article.date} | {article.category}</p>
                <p className="text-gray-700 mb-4">{article.summary}</p>
                <button className="bg-[#0B3D5A] text-white px-4 py-2 rounded-lg hover:bg-[#128178] transition">
                  Read More
                </button>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;

