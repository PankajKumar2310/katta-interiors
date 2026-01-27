import React from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const projectData: { [key: string]: {
    title: string;
    images: string[];
    description: string;
    materials: string[];
    category: string;
}} = {
  '1': {
    title: 'Modern Kitchen Renovation',
    images: ['https://via.placeholder.com/800x500/teal/white?text=Kitchen+1', 'https://via.placeholder.com/800x500/teal/white?text=Kitchen+2'],
    description: 'Transformed a traditional kitchen into a sleek modern space using premium Sunmica laminates for cabinets and countertops. The gloss finish adds a luxurious touch while maintaining functionality.',
    materials: ['Kridha 1mm Gloss Finish', 'Thermoluxe 1.3mm Premium'],
    category: 'Sunmica',
  },
  '2': {
    title: 'Office Louver Design',
    images: ['https://via.placeholder.com/800x500/gray/white?text=Office+1', 'https://via.placeholder.com/800x500/gray/white?text=Office+2'],
    description: 'Custom aluminum louvers installed for natural light control and privacy in a corporate office. The anodized finish complements the modern architecture.',
    materials: ['Aluminum Louvers Modern'],
    category: 'Panels',
  },
  // Add more as needed
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = id ? projectData[id] : undefined;

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="min-h-screen bg-white font-poppins">
      <Navigation />
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Link to="/projects" className="flex items-center mb-8 text-teal-600 hover:text-teal-700">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Projects
          </Link>

          <h1 className="text-4xl font-playfair font-bold text-gray-900 mb-8">{project.title}</h1>

          {/* Images Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {project.images.map((img, idx) => (
              <img key={idx} src={img} alt={`${project.title} ${idx + 1}`} className="w-full h-64 object-cover rounded-2xl shadow-lg" />
            ))}
          </div>

          {/* Description */}
          <div className="prose max-w-none mb-8">
            <p className="text-lg text-gray-700 leading-relaxed font-poppins">{project.description}</p>
          </div>

          {/* Materials Used */}
          <div className="mb-8">
            <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-4">Materials Used</h2>
            <div className="flex flex-wrap gap-2">
              {project.materials.map((material, idx) => (
                <Button key={idx} variant="outline" className="rounded-full">
                  {material}
                </Button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mb-12">
            <Link to="/shop">
              <Button className="px-8 py-4 text-lg bg-teal-600 hover:bg-teal-700 rounded-full">
                Shop Similar Materials
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProjectDetail;