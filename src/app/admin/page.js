"use client"
import React, { useState } from 'react'
import './style.css'

const Admin = () => {
  const [selectValues, setSelectValues] = useState({})

  const sendForm = async (values) => {
    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
      if (response.ok) {
        console.log('Formulario enviado con éxito')
      }
    } catch (error) {
      console.error('Error al enviar el formulario', error)
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const values = Object.fromEntries(new FormData(e.target))
    console.log('Formulario enviado', values)
    sendForm(values)
    e.target.reset()
  }

  const getMockStyle = (property) => {
    return !selectValues[property] ? 'text-[#9ca3af]' : ''
  }

  const onSelect = (e, property) => {
    setSelectValues((prevState) => {
      return {
        ...prevState,
        [property]: e.target.value
      }
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      
      <h1 className="text-3xl font-extrabold text-gray-900 leading-tight text-center pt-12">
      Publica una vacante y  encuentra el  
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
              talento ideal para tu negocio
              </span>
            </h1>
      <p className='mt-4 text-lg text-gray-600 md:text-xl text-center max-w-xl mx-auto'>
        Zunida te conecta con profesionales  de la belleza que buscan oportunidades como la
        que ofreces. Publicar tu vacante  es rápido, fácil y totalmente gratis.
      </p>
      <form onSubmit={onSubmit} className="max-w-md mx-auto pt-6 pb-6 md:pb-32">
        <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
          Nombre del puesto
        </label>
        <div className="mb-5">
          <input
            id='title'
            type="text"
            name="title"
            required
            placeholder="Ej: maquillador Senior"
            className="w-full pl-4 pr-4 py-2 border border-gray-200 rounded-md color-black"
          />
        </div>
        <div className="mb-5">
        <label htmlFor="company" className="block text-gray-700 font-medium mb-2">
          Nombre de la empresa
        </label>
          <input
            id='company' 
            type="text"
            name="company"
            required
            placeholder="Ej: Beauty Salón"
            className="w-full pl-4 pr-4 py-2 border border-gray-200 rounded-md color-black"
          />
        </div>
        

        <div className="mb-5">
          <label htmlFor="contactNumber" className="block text-gray-700 font-medium mb-2">
          Número de contacto
          </label>
          <input 
            id='contactNumber'
            type="number"
            pattern='\d*'
            name="contactNumber"
            required
            placeholder="999 888 777"
            className="w-full pl-4 pr-4 py-2 border border-gray-200 rounded-md color-black"
          />
          <p className="text-gray-500 font-medium mt-2 mb-5">El número proporcionado es para contactarte</p>

        </div>
        <div className="mb-5">
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
          Descripción del puesto
          </label>
          <textarea
          name='description'
            id="description"
            rows="4"
            maxLength={250}
            placeholder="Ingresa el detalle o requerimientos del puesto"
            className="w-full pl-4 pr-4 py-2 border border-gray-200 rounded-md color-black"

          ></textarea>
        </div>

        <div className='flex gap-4'>

          <div className='flex-1'>
          <label htmlFor="state" className="block text-gray-700 font-medium mb-2">
            Departamento
          </label>
            <div className="mb-5 flex-1 relative">
              
                <select
                name='state'
                  onChange={(value) => onSelect(value, 'state')}
                  defaultValue=''
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm appearance-none bg-white ${getMockStyle('state')}`}
                >

                  <option value="" disabled>Departamento</option>
                  <option value="Lima">Lima</option>
                  <option value="Ica">Ica</option>
                  <option value="Junin">Junin</option>
                  <option value="Piura">Piura</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                      />
                  </svg>
                </div>
            </div>
          </div>

          <div className='flex-1'>
            <label htmlFor="city" className="block text-gray-700 font-medium mb-2">
              Ciudad
            </label>
            <div className="mb-5 flex-1 relative">
              <select
                name='city'
                onChange={(value) => onSelect(value, 'city')}
                defaultValue=''
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm appearance-none bg-white ${getMockStyle('city')}`}
              >
                <option value="" disabled >Ciudad</option>
                <option value="lima">Lima</option>
                <option value="Huacho">Huacho</option>
                <option value="Cañete">Cañete</option>
                <option value="Barranca">Barranca</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="distric" className="block text-gray-700 font-medium mb-2">
            Distrito
          </label>
          <div className="mb-5 flex-1 relative">
            
              <select
                name='distric'
                onChange={(value) => onSelect(value, 'district')}
                defaultValue=''
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm appearance-none bg-white ${getMockStyle('district')}`}
              >
                <option value="" disabled>Distrito</option>
                <option value="miraflores">Miraflores</option>
                <option value="san-isidro">San Isidro</option>
                <option value="surco">Surco</option>
                <option value="la-molina">La Molina</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                    />
                </svg>
              </div>
          </div>
        </div>

       
        <div>
          <label htmlFor="businessHour" className="block text-gray-700 font-medium mb-2">
            Jornada
          </label>
          <div className="mb-5 flex-1 relative">
              <select
              name='businessHour'
                onChange={(value) => onSelect(value, 'jornada')}
                defaultValue=''
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm appearance-none bg-white ${getMockStyle('jornada')}`}
              >
                <option value="" disabled>Selecciona la jornada laboral</option>
                <option value="Part-time">Part time</option>
                <option value="Full-time">Full time</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
              Categoría
            </label>
            <div className="mb-5 flex-1 relative">
              <select
                name='category'
                onChange={(value) => onSelect(value, 'category')}
                defaultValue=''
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm appearance-none bg-white ${getMockStyle('category')}`}
              >
                <option value="" disabled className='text-red-900'>Ingresa la categoría de este puesto</option>
                <option value="Estilista">Estilista</option>
                <option value="Maquillador">Maquillador</option>
                <option value="Barbero">Barbero</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
          


          <div className="space-y-4">
  


  
</div>

        
        <div>
          <label htmlFor="number" className="block text-gray-700 font-medium mb-2">
            Salario
          </label>
          <div className="mb-5">
            <input 
              type="number"
              pattern='\d*'
              name="salary"
              required
              placeholder="Ingresa el salario mensualSalario"
              className="w-full pl-4 pr-4 py-2 border border-gray-200 rounded-md color-black"
            />
          </div>
        </div>
        <div>
          <label htmlFor="salary" className="block text-gray-700 font-medium mb-2">
            Experiencia
          </label>
          <div className="mb-5">
            <input 
              type="number"
              pattern='\d*'
              name="experience"
              required
              placeholder="Ingresa los años de experienciaExperiencia"
              className="w-full pl-4 pr-4 py-2 border border-gray-200 rounded-md color-black"
            />
          </div>
        </div>
      

        <div className="mb-5">
          <p className="text-gray-700 font-medium mb-4">Comision</p>

          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="options"
                value="Opción 1"
                className="text-pink-600"
              />
              <span>Con Comision</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="options"
                value="Opción 2"
                className="text-pink-600"
              />
              <span>Sin Comision</span>
            </label>
          </div>
          <p className="text-gray-500 font-medium  my-4">indica si tu negocio ofrece comision</p>
        </div>

        
       
        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Guardar</button>
      </form>
    </div>
  )
}

export default Admin
