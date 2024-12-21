import React, { useState, useCallback, useEffect } from 'react';
import { Book, Calculator, Code, DollarSign, BrainCircuit, Atom, ChevronDown, ChevronUp, Youtube, Twitter, Mail, Share2 } from 'lucide-react';
import _ from 'lodash';

export default function TutoringWebsite() {
  const [expandedCategories, setExpandedCategories] = useState(new Set(['Business & Economics']));
  const [expandedSection, setExpandedSection] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const toggleCategory = useCallback(
    _.debounce((category) => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        setExpandedCategories(prev => {
          const newSet = new Set(prev);
          if (newSet.has(category)) {
            newSet.delete(category);
          } else {
            newSet.add(category);
          }
          return newSet;
        });
        setTimeout(() => setIsTransitioning(false), 300);
      }
    }, 200, { leading: true, trailing: false }),
    [isTransitioning]
  );

  const toggleSection = useCallback(
    _.debounce((section) => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        setExpandedSection(currentSection => currentSection === section ? null : section);
        setTimeout(() => setIsTransitioning(false), 300);
      }
    }, 200, { leading: true, trailing: false }),
    [isTransitioning, expandedSection]
  );

  const subjectCategories = [
    {
      category: 'Business & Economics',
      subjects: [
        { name: 'Accounting', icon: DollarSign, description: 'Master fundamental accounting principles and financial statements' },
        { name: 'Economics', icon: Book, description: 'Understand micro and macroeconomic concepts and their real-world applications' },
        { name: 'Finance', icon: DollarSign, description: 'Learn financial analysis, investment strategies, and market principles' }
      ]
    },
    {
      category: 'Science',
      subjects: [
        { name: 'Physics', icon: Atom, description: 'Classical mechanics, electromagnetism, and modern physics concepts' },
        { name: 'Computer Science', icon: Code, description: 'Programming fundamentals, algorithms, and software development' }
      ]
    },
    {
      category: 'Technology',
      subjects: [
        { name: 'Using AI Responsibly', icon: BrainCircuit, description: 'Learn to leverage AI tools effectively and ethically' }
      ]
    },
    {
      category: 'Mathematics',
      subjects: [
        { name: 'Mathematics', icon: Calculator, description: 'Comprehensive mathematics tutoring from basic concepts to advanced topics' },
        { name: 'Calculus', icon: Calculator, description: 'Master derivatives, integrals, and advanced mathematical concepts' },
        { name: 'Statistics', icon: Calculator, description: 'Statistical analysis, probability theory, and data interpretation' },
        { name: 'Algebra', icon: Calculator, description: 'From basic equations to advanced algebraic concepts' },
        { name: 'Trigonometry', icon: Calculator, description: 'Understanding angles, functions, and geometric relationships' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Palm Beach Virtual Tutoring
        </h1>
        <p className="text-xl text-white mb-8">
          Expert group tutoring sessions in STEM and business subjects
        </p>
        <a href="#apply" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg">
          Apply Now
        </a>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Subjects</h2>
        
        <div className="mb-12">
          {subjectCategories.map((category) => (
            <div key={category.category} className="mb-4">
              <button
                onClick={() => toggleCategory(category.category)}
                disabled={isTransitioning}
                className={`w-full bg-white p-4 rounded-lg shadow-md transition-all duration-300 flex justify-between items-center border-l-4 border-blue-600
                  ${isTransitioning ? 'cursor-wait' : 'hover:shadow-lg'}
                  ${expandedCategories.has(category.category) ? 'bg-blue-50' : ''}`}
              >
                <h3 className="text-xl font-bold text-gray-900">{category.category}</h3>
                <div className={`transform transition-transform duration-300 ${expandedCategories.has(category.category) ? 'rotate-180' : ''}`}>
                  <ChevronDown className="w-6 h-6 text-blue-600" />
                </div>
              </button>
              
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pl-4 transition-all duration-300
                ${expandedCategories.has(category.category) ? 'opacity-100 max-h-[2000px]' : 'opacity-0 max-h-0 overflow-hidden'}`}
              >
                {category.subjects.map((subject) => (
                  <div key={`${category.category}-${subject.name}`}
                       className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                    <div className="flex items-center mb-4">
                      <subject.icon className="w-6 h-6 text-blue-600 mr-3" />
                      <h4 className="text-lg font-semibold text-gray-900">{subject.name}</h4>
                    </div>
                    <p className="text-gray-600">{subject.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <button
            onClick={() => toggleSection('group')}
            disabled={isTransitioning}
            className={`w-full bg-white p-6 rounded-lg shadow-md transition-all duration-300 text-left border border-gray-200
              ${isTransitioning ? 'cursor-wait' : 'hover:shadow-lg'}
              ${expandedSection === 'group' ? 'bg-blue-50' : ''}`}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">Why Group Tutoring?</h3>
              <div className={`transform transition-transform duration-300 ${expandedSection === 'group' ? 'rotate-180' : ''}`}>
                <ChevronDown className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className={`transition-all duration-300 ${expandedSection === 'group' ? 'opacity-100 max-h-[1000px] mt-4' : 'opacity-0 max-h-0 overflow-hidden'}`}>
              <p className="text-gray-600">Research shows students in group settings retain 70% more information through peer discussion and shared problem-solving.</p>
              <ul className="list-disc pl-5 text-gray-600 mt-4">
                <li>Enhanced learning through peer discussion</li>
                <li>Increased motivation and accountability</li>
                <li>Cost-effective learning solution</li>
                <li>Exposure to diverse problem-solving approaches</li>
              </ul>
            </div>
          </button>

          <button
            onClick={() => toggleSection('us')}
            disabled={isTransitioning}
            className={`w-full bg-white p-6 rounded-lg shadow-md transition-all duration-300 text-left border border-gray-200
              ${isTransitioning ? 'cursor-wait' : 'hover:shadow-lg'}
              ${expandedSection === 'us' ? 'bg-blue-50' : ''}`}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">Why Choose Us?</h3>
              <div className={`transform transition-transform duration-300 ${expandedSection === 'us' ? 'rotate-180' : ''}`}>
                <ChevronDown className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className={`transition-all duration-300 ${expandedSection === 'us' ? 'opacity-100 max-h-[1000px] mt-4' : 'opacity-0 max-h-0 overflow-hidden'}`}>
              <p className="text-gray-600">Our tutors bring elite credentials and proven track records of student success.</p>
              <ul className="list-disc pl-5 text-gray-600 mt-4">
                <li>Advanced degrees from top-tier institutions</li>
                <li>8+ years average teaching experience</li>
                <li>Active industry professionals</li>
                <li>Rigorous vetting process</li>
              </ul>
            </div>
          </button>
        </div>
      </main>

      <section id="apply" className="bg-blue-600 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Excel?</h2>
          <p className="text-lg mb-8">Join our virtual group sessions and enhance your knowledge with expert tutors.</p>
          <a
            href="https://forms.example.com/pbvt-application"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
          >
            Apply Now
          </a>
        </div>
      </section>

      <footer className="bg-gray-50 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center space-x-8 mb-6">
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors">
              <Youtube className="w-6 h-6" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="https://bsky.app" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors">
              <Share2 className="w-6 h-6" />
            </a>
            <a href="#newsletter" className="text-gray-600 hover:text-blue-600 transition-colors">
              <Mail className="w-6 h-6" />
            </a>
          </div>
          <div className="flex justify-center space-x-6 mb-4">
            <a href="/terms.pdf" className="text-blue-600 hover:text-blue-700">Terms of Service</a>
            <a href="/privacy.pdf" className="text-blue-600 hover:text-blue-700">Privacy Policy</a>
          </div>
          <p className="text-gray-600">© 2024 Palm Beach Virtual Tutoring. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}