import React  from 'react';
import { Table  } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export const TipoReparacionMontosOT = () => {        
    //----usando el hook  redux
    const { tiposReparacionesMontos  } = useSelector(state => state.proceso_registroOT);    

  return ( 
    <div className="p-2"> 
        <div className ="tableFixHead"> 
            <Table   bordered >
            <thead className="theadTableModal" >
                    <tr>
                        <th className='text-center'> TIPO REPARACION </th>
                        <th className='text-right'> TOTAL </th>
                    </tr>
                </thead>
                <tbody>
                        {
                            tiposReparacionesMontos.map((item, index)=>{
                                return <tr key={item.id}>  
                                    <td>  
                                        {item.descripcion}              
                                    </td>
                                    <td className='text-right'>
                                        { item.total  }       
                                    </td>
                                </tr>
                            })
                        } 
                </tbody>
            </Table>      
        </div>  
    </div>    
  )
}

