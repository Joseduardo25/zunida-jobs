"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import { 
  Search, MapPin, Briefcase, Clock, 
  ChevronDown, ChevronUp, DollarSign, 
  PlusCircle, Building2, Users, Star, 
  Palette, Scissors, SparklesIcon, Layers, CheckCircle
} from 'lucide-react';
import CategoryButton from "../components/CategoryButton";
import JobCard from "../components/JobCard";
import axios from "axios";
import './zunida-landing.css'

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedJobs, setExpandedJobs] = useState({});

  const [jobs, setJobs] = useState([])
  const [categories, setCategories] = useState([])

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleJobDescription = (jobId) => {
    setExpandedJobs(prev => ({
      ...prev,
      [jobId]: !prev[jobId]
    }));
  };

  const getJobs = async () => {
    try {
      const response = await axios.get('/api/jobs')
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  const getCategories = async () => {
    try {
      const response = await axios.get('/api/categories')
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  const loadData = async () => {
    try {
      const [jobsResponse, categoriesResponse] = await Promise.all([getJobs(), getCategories()])
      setJobs(jobsResponse)
      setCategories(categoriesResponse)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadData()
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
              <SparklesIcon className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold text-gray-800">Zunida</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-pink-600 transition-colors">
              Explorar Empleos
            </button>
            <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-full hover:opacity-90 transition-opacity flex items-center gap-2">
              <PlusCircle className="w-5 h-5" />
              Publicar Vacante
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-purple-50 opacity-50 -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-6 items-center relative">
          {/* Left Content */}
          <div className="space-y-8 text-center">
            <div className="inline-flex items-center bg-pink-100 text-pink-700 px-4 py-2 rounded-full">
              <CheckCircle className="w-5 h-5 mr-2 text-pink-500" />
              Impulsa tu Carrera en Belleza
            </div>
            
            <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
              Descubre tu 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                Próximo Trabajo Ideal
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-md mx-auto">
              Conectamos profesionales de belleza con las mejores oportunidades. Tu talento, nuestro compromiso.
            </p>
            
            <div className="space-y-6">
              {/* <div className="relative shadow-lg">
                <input 
                  type="text"
                  placeholder="Busca empleos de belleza..."
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-4 top-4 text-gray-400 w-6 h-6" />
                <button className="absolute right-1 top-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity">
                  Buscar
                </button>
              </div> */}
              
              <div className="flex flex-wrap gap-6 pt-4 justify-center">
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-pink-500" />
                  <div>
                    <div className="font-bold text-gray-800">5,000+</div>
                    <div className="text-xs text-gray-500">Profesionales</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Layers className="w-6 h-6 text-purple-500" />
                  <div>
                    <div className="font-bold text-gray-800">500+</div>
                    <div className="text-xs text-gray-500">Empresas</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="w-6 h-6 text-yellow-500" />
                  <div>
                    <div className="font-bold text-gray-800">98%</div>
                    <div className="text-xs text-gray-500">Satisfacción</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Job Preview Card */}

          {/* card first block*/}
          {/* <div className="hidden md:block relative">
            <div className="absolute -top-12 -right-12 w-80 h-80 bg-pink-100 rounded-full blur-3xl opacity-50 -z-10"></div>
            
            <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-6 transform hover:scale-105 transition-transform">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-purple-600 rounded-xl flex items-center justify-center">
                  <Palette className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Maquillista Senior</h3>
                  <p className="text-gray-500">Estudio Glamour</p>
                </div>
              </div>
              
              <div className="space-y-3 text-gray-600 mb-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-pink-500" />
                  <span>Lima, Perú</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Briefcase className="w-5 h-5 text-purple-500" />
                  <span>Tiempo Completo</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-green-500" />
                  <span>S/ 3,500 - S/ 5,000</span>
                </div>
              </div>
              
              <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg hover:opacity-90 transition-opacity">
                Ver Detalles
              </button>
            </div>
          </div> */}
        </div>
      </div>

      {/* Category Selection */}
      {/* <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4 overflow-x-auto">
            <span className="text-gray-600 font-medium whitespace-nowrap">Explorar:</span>
            {categories.map(category => (
              <CategoryButton
                key={category._id}
                id={category._id}
                name={category.name}
                isSelected={selectedCategory === category._id}
                onClick={setSelectedCategory}
              />
            ))}
          </div>
        </div>
      </div> */}

      {/* Job Listings */}
      <div className="bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="space-y-6">
            {filteredJobs.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No se encontraron empleos que coincidan con tu búsqueda
              </div>
            ) : (
              filteredJobs.map(job => (
                <JobCard
                  key={job._id}
                  job={job}
                  isExpanded={expandedJobs[job._id]}
                  onToggleExpand={() => toggleJobDescription(job._id)}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-br from-pink-500 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold leading-tight">
                Gestiona tu Salón de Belleza con Zunida
              </h2>
              <p className="text-lg text-pink-100">
                Optimiza tus reservas, gestiona tu equipo y haz crecer tu negocio con nuestra plataforma todo en uno para salones de belleza.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-pink-300" />
                  <span>Sistema de reservas en línea 24/7</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-pink-300" />
                  <span>Gestión de agenda y recordatorios automáticos</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-pink-300" />
                  <span>Control de inventario y punto de venta</span>
                </li>
              </ul>
              <div className="pt-4">
                <button className="bg-white text-pink-600 px-8 py-4 rounded-xl font-semibold hover:bg-pink-50 transition-colors">
                  Conoce Más Sobre Zunida
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-500 rounded-3xl transform rotate-3"></div>
              <div className="relative bg-white p-8 rounded-3xl shadow-xl">
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-6 border-b">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Hoy</h3>
                      <p className="text-sm text-gray-500">8 citas programadas</p>
                    </div>
                    <span className="text-2xl font-bold text-pink-600">80%</span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                          <Scissors className="w-5 h-5 text-pink-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">Corte y Color</p>
                          <p className="text-sm text-gray-500">10:00 AM - María G.</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                        Confirmado
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <Palette className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">Maquillaje Profesional</p>
                          <p className="text-sm text-gray-500">11:30 AM - Ana R.</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        En Proceso
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Producto</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-pink-400 transition-colors">Características</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Precios</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Integraciones</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Testimonios</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Recursos</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-pink-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Guías</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Eventos</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Ayuda</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Compañía</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-pink-400 transition-colors">Acerca de</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Empleos</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Prensa</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Contacto</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-pink-400 transition-colors">Privacidad</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Términos</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Seguridad</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 mt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                <SparklesIcon className="text-white w-5 h-5" />
              </div>
              <span className="text-white font-bold">Zunida</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2025 Zunida. Todos los derechos reservados.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-pink-400 transition-colors">Instagram</a>
              <a href="#" className="hover:text-pink-400 transition-colors">Twitter</a>
              <a href="#" className="hover:text-pink-400 transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer> */}
      <footer
      className="bg-slate-900  px-4 lg:px-5 pb-6 md:pb-10 relative md:pt-[4%]"
    >
      {/* <!-- bg card cta --> */}
      {/* <img
        src="/assets/footer/gradient-bg.svg"
        alt="gradiend bg"
        class="absolute z-10 bottom-full left-1/2 -translate-x-1/2 w-full max-h-64 object-cover object-top"
      /> */}
      {/* <!-- card cta --> */}
      {/* <div class="footer-card--cta">
        <div class="md:w-[44%] border-slate-900">
          <img
            src="/assets/footer/cta.png"
            alt="cta"
            class="w-full h-full object-cover rounded-2xl"
          />
        </div>
        <div class="flex-1 flex items-center">
          <div 
          class="min-w-[300px] md:max-w-482"
          >
            <div class="relative min-w-2xs">
              <p
                class="hidden md:block text-2xl md:text-3xl font-montse font-semibold"
              >
                Descubre si Zunida es lo que
                <span class="font-extrabold block">tu negocio necesita</span>
              </p>
              <p
                class="md:hidden text-2xl md:text-3xl max-w-3xs font-montse font-semibold"
              >
                Descubre si Zunida es lo <br/>
                que 
                <span class="font-extrabold">
                tu negocio <br/> necesita</span>
              </p>
              <img
                src="/assets/footer/siloes.svg"
                alt="siloes"
                class="absolute bottom-0 right-0 max-w-[140px] md:max-w-full"
              />
            </div>
            <p class="text-base md:text-lg text-slate-800 my-6">
              Prueba nuestra herramienta y descubre cómo simplificar la gestión
              de tu negocio mientras aumentas tus ingresos. ¡Empieza una prueba
              gratis hoy mismo!
            </p>
            <div
              class="flex gap-6 flex-col md:flex-row items-center justify-center md:justify-start"
            >
              <a
                href="https://wa.me/+51904626406?text=¡Hola! Me gustaría saber más sobre Zunida y cómo puede ayudarme a gestionar mi negocio."
                target="_blank"
                rel="noopener noreferrer"
                class="w-fit"
              >
                <button
                  class="rounded-4xl py-4 px-6 bg-indigo-600 text-white font-bold"
                >
                  ¡Contáctanos!
                </button>
              </a>
              <button
                id="footerCTA"
                class="flex gap-2 font-montse"
                onclick="openModal()"
              >
                <img
                  src="assets/play.svg"
                  alt="logo play"
                  width="24"
                  height="24"
                />
                Mira nuestra demo
              </button>
            </div>
          </div>
        </div>
      </div> */}
      {/* <!-- grid bg --> */}
      {/* <img
        src="/assets/footer/grid-calendar.svg"
        alt="grid"
        class="w-full min-h-96 md:min-h-0 h-auto object-cover md:max-w-1200 mx-auto pt-[60px] pb-0  md:py-0"
      /> */}
      {/* <!-- zunida sector --> */}
      <div
        className="bg-[#16213A] py-8 md:p-8 flex flex-col md:flex-row md:justify-between gap-6 md:gap-0 items-center rounded-3xl"
      >
        <h2 className="text-lg font-montse font-semibold flex gap-2 text-white">
          <img src="assets/logo.svg" alt="logo zunida" width="28" height="28" />
          Zunida
        </h2>
        <div className="flex items-center justify-center gap-6">
          <a href="https://facebook.com/zunida.software/" target="_blank">
            <img src="/assets/network/fb.svg" alt="fb" width="32" height="32" />
          </a>
          <a href="https://www.instagram.com/zunida.software/" target="_blank">
            <img src="/assets/network/ig.svg" alt="ig" width="32" height="32" />
          </a>
          <img
            src="/assets/network/tiktok.svg"
            alt="tiktok"
            width="32"
            height="32"
          />
        </div>
        <a
          href="https://kc7mvl2q3hp.typeform.com/to/wPSnhzgJ"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button
            className="rounded-3xl py-2 px-4 bg-indigo-600 text-white font-semibold"
          >
            Contáctanos
          </button>
        </a>
      </div>
      {/* <!-- prologue sector --> */}
      <div className="mt-4 md:mt-6">
        <p className="text-slate-300 text-lg text-center">
          Automatiza tus reservas en WhatsApp, sin complicaciones
        </p>
        <img src="assets/line-footer.svg" alt="line-footer" className="mx-auto" />
      </div>
    </footer>
    </div>
  );
}
