import Swal from 'sweetalert2'
export const Swal_alert = (tipoIcon, mensaje) => {

    // success	 
    // error	
    // warning	
    // info	
    // question
      
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: tipoIcon,
        title: mensaje
      })
 
}

export const  Swal_Question = (titulo, mensaje )=>{
  const question = Swal.fire({
      title: titulo,
      text: mensaje,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }) 
    return question;
}

export const  Swal_Success=(mensaje)=>{
    Swal.fire(
      'Sistemas',
       mensaje,
      'success'
    )
}
  



 