// src/utils/skillIcons.js
export const getSkillIcon = (skillName) => {
  const icons = {
    // Languages
    'javascript': '🟨',
    'js': '🟨',
    'java script': '🟨',
    'typescript': '🔷',
    'python': '🐍',
    'java': '☕',
    'c++': '⚙️',
    'c#': '🎯',
    'go': '🐹',
    'rust': '🦀',
    'php': '🐘',
    'ruby': '💎',
    'swift': '🦅',
    'kotlin': '📱',
    
    // Frameworks & Libraries
    'react': '⚛️',
    'vue': '🟢',
    'angular': '🔴',
    'node': '🟩',
    'node.js': '🟩',
    'django': '🎸',
    'flask': '🌶️',
    'spring': '🌱',
    'laravel': '🪶',
    'rails': '🚂',
    'express': '🚂',
    
    // Databases
    'mongodb': '🍃',
    'postgresql': '🐘',
    'postgres': '🐘',
    'mysql': '🐬',
    'sqlite': '🗄️',
    'redis': '🔴',
    'firebase': '🔥',
    'supabase': '🟣',
    
    // DevOps & Tools
    'docker': '🐳',
    'kubernetes': '☸️',
    'aws': '☁️',
    'azure': '🔵',
    'gcp': '🟢',
    'git': '🐙',
    'github': '🐙',
    'gitlab': '🦊',
    'jenkins': '👨‍🔧',
    'terraform': '🏗️',
    
    // Frontend
    'html': '🌐',
    'css': '🎨',
    'tailwind': '🎨',
    'tailwind css': '🎨',
    'sass': '💅',
    'bootstrap': '📐',
    'material ui': '📦',
    'mui': '📦',
    
    // Backend
    'graphql': '📊',
    'rest api': '🔗',
    'rest': '🔗',
    'api': '🔗',
    
    // Mobile
    'react native': '📱',
    'flutter': '🦋',
    'android': '🤖',
    'ios': '🍎',
    
    // AI/ML
    'tensorflow': '🧠',
    'pytorch': '🔥',
    'keras': '🧬',
    'scikit-learn': '📈',
    
    // Other
    'wordpress': '📝',
    'shopify': '🛍️',
    'webpack': '📦',
    'vite': '⚡',
    'jest': '🧪',
    'cypress': '🎯',
  };

  const key = skillName.toLowerCase().trim();
  return icons[key] || '💻'; // Default icon
};