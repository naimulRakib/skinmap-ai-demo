import Link from "next/link";

export default function MorePage() {
  const links = [
    { href: "/bn/sensor", label: "সেন্সর (সিমুলেটেড)" },
    { href: "/bn/expert", label: "বিশেষজ্ঞ" },
    { href: "/bn/assistant", label: "স্কিন সহকারী" },
    { href: "/bn/decision", label: "কেন এই সিদ্ধান্ত?" },
    { href: "/bn/privacy", label: "গোপনীয়তা" },
    { href: "/bn/profile", label: "প্রোফাইল" },
  ];
  return (
    <div className="p-6">
      <h1 className="font-display text-2xl font-bold text-navy-DEFAULT mb-6">আরও</h1>
      <div className="space-y-2">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-shadow"
          >
            <span className="text-navy-DEFAULT font-medium">{l.label}</span>
            <span className="text-navy-300">›</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
