// src/components/ProjectCard.jsx
const ProjectCard = ({ project }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Project Image */}
      <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-400">
        {project.imageUrl ? (
          <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
        ) : (
          <span>No Image</span>
        )}
      </div>
      
      {/* Project Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{project.description}</p>
        
        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack?.map((tech, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
              {tech}
            </span>
          ))}
        </div>
        
        {/* Links */}
        <div className="flex space-x-4">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" className="text-blue-600 hover:underline text-sm">
              Live Demo
            </a>
          )}
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" className="text-gray-600 hover:underline text-sm">
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;