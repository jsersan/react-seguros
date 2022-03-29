import { useState, createContext } from 'react'
import { obtenerDiferenciaYear, calcularMarca, calcularPlan, formatearDinero} from '../helpers'

const CotizadorContext = createContext()

const CotizadorProvider = ({ children }) => {

    const [ datos, setDatos ] = useState({
        marca: '',
        year: '',
        plan: ''
    })

    const [error, setError] =  useState('')
    const [resultado, setResultado] = useState(0)
    const [cargando,setCargando]=useState(false)

    const handleChangeDatos = e => {
        setDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }

    const cotizarSeguro = () =>{
        // Precio base

        let resultado = 200;

        // Diferencia en años: hay que restar el 3% por cada año
        
        const diferencia = obtenerDiferenciaYear(datos.year);

        resultado -= resultado*diferencia*0.03
        console.log(resultado)

        // Americano 15%
        // Europeo 30%
        // Asiático 5%

        resultado *= calcularMarca(datos.marca);
        console.log(resultado)

        // Básico 20%
        // Completo 50%

        resultado *= calcularPlan(datos.plan)

        // Formatear dinero

        resultado = formatearDinero(resultado);

        setCargando(true);

        setTimeout(()=>{
            setResultado(resultado)       
            setCargando(false)     
        }, 3000)



    }

    return(
        <CotizadorContext.Provider
          value={{
              datos,
              handleChangeDatos,
              error,
              setError,
              cotizarSeguro,
              resultado,
              cargando
           }}
          >
            {children}
        </CotizadorContext.Provider>     
    )
}

export {
    CotizadorProvider
}

export default CotizadorContext;