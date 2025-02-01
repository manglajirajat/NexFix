export default function SanitaryPage() {
  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <NavigationMenu />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Sanitary Products</h1>
        {/* Add sanitary products content here */}
      </div>
      <Footer />
    </div>
  );
}