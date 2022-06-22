using Datos;
using Negocio.Resultados;
using Negocio.upload;
using System;
using System.IO;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

 
namespace WebApi_Edaltec.Controllers.upload
{
    [EnableCors("*", "*", "*")]
    public class UploadsController : ApiController
    {
        //private Proyecto_3REntities1 db = new Proyecto_3REntities1();

        [HttpPost]
        [Route("api/Uploads/post_archivoExcel")]
        public object post_archivoExcel(string filtros)
        {
            Resultado res = new Resultado();
            var nombreFile = "";
            string sPath = "";

            try
            {
                //--- obteniendo los parametros que vienen por el FormData

                var file = HttpContext.Current.Request.Files["file"];
                //--- obteniendo los parametros que vienen por el FormData
                string extension = Path.GetExtension(file.FileName);

                string[] parametros = filtros.Split('|');
                string fechaImportacion = parametros[0].ToString();
                string idUsuario = parametros[1].ToString();

                //nombreFile = "Impotacion_Excels" + "_" + idUsuario + extension;

                //-----generando clave unica---
                var guid = Guid.NewGuid();
                var guidB = guid.ToString("B");
                nombreFile = idUsuario + "_Importacion_Excel_" + Guid.Parse(guidB) + extension;

                //-------almacenando la archivo---
                sPath = HttpContext.Current.Server.MapPath("~/Archivos/Excel/" + nombreFile);
                //if (System.IO.File.Exists(sPath))
                //{
                //    System.IO.File.Delete(sPath);
                //}
                file.SaveAs(sPath);

                //-------almacenando la archivo---
                if (File.Exists(sPath))
                {
                    Upload_BL obj_negocio = new Upload_BL();
                    string valor = obj_negocio.setAlmacenandoFile_Excel(sPath, file.FileName, fechaImportacion, idUsuario);
                    if (valor == "OK")
                    {
                        res.ok = true;
                        res.data = obj_negocio.get_datosCargados(idUsuario, fechaImportacion);
 
                    }
                }
                else
                {
                    res.ok = false;
                    res.data = "No se pudo almacenar el archivo en el servidor";
 
                }
            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;
 
            }
            return res;
        }
        
        [HttpPost]
        [Route("api/Uploads/post_archivosAcronimos")]
        public object post_archivosAcronimos(string filtros)
        {
            Resultado res = new Resultado();
            int nombreFileBD;
            string sPath = "";

            try
            {
                //--- obteniendo los parametros que vienen por el FormData

                var file = HttpContext.Current.Request.Files["file"];
                //--- obteniendo los parametros que vienen por el FormData
                string extension = Path.GetExtension(file.FileName);

                string[] parametros = filtros.Split('|');
                int idOt = Convert.ToInt32(parametros[0].ToString());
                int idFormato = Convert.ToInt32(parametros[1].ToString());
                int idUsuario = Convert.ToInt32(parametros[2].ToString());
                int opcionModal = Convert.ToInt32(parametros[3].ToString());
                string codCad =  parametros[4].ToString();
 


                Upload_BL obj_negocios = new Upload_BL();
                nombreFileBD = obj_negocios.crear_archivoAcronimo(idOt, idFormato, idUsuario, file.FileName, opcionModal, codCad);
                
                //-------almacenando la archivo---
                sPath = HttpContext.Current.Server.MapPath("~/Archivos/Acronimos/" + nombreFileBD);
                file.SaveAs(sPath);

                //-------almacenando la archivo---
                if (File.Exists(sPath))
                {
                    res.ok = true;
                    res.data = "OK";
 
                }
                else
                {
                    res.ok = false;
                    res.data = "No se pudo almacenar el archivo en el servidor";
 
                }
            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;
 
            }
            return res;
        }
        
        [HttpPost]
        [Route("api/Uploads/post_archivoExcel_registroOT")]
        public object post_archivoExcel_registroOT(string filtros)
        {
            Resultado res = new Resultado();
            var nombreFile = "";
            string sPath = "";

            try
            {
                //--- obteniendo los parametros que vienen por el FormData

                var file = HttpContext.Current.Request.Files["file"];
                //--- obteniendo los parametros que vienen por el FormData
                string extension = Path.GetExtension(file.FileName);

                string[] parametros = filtros.Split('|');
                int idOt = Convert.ToInt32(parametros[0].ToString());
                int id_tipoTrabajo = Convert.ToInt32(parametros[1].ToString());
                string idusuario = parametros[2].ToString();

                //nombreFile = "Impotacion_Excels" + "_" + idUsuario + extension;

                //-----generando clave unica---
                var guid = Guid.NewGuid();
                var guidB = guid.ToString("B");

                if (id_tipoTrabajo == 822) //---MTTO CALIENTE
                {
                    nombreFile = idusuario + "_Importacion_Excel_mttoCaliente" + Guid.Parse(guidB) + extension;
                }
                if (id_tipoTrabajo == 823) //--- TERMOVISION
                {
                    nombreFile = idusuario + "_Importacion_Excel_termovision" + Guid.Parse(guidB) + extension;
                }
                if (id_tipoTrabajo == 824)//--- INSPECCIONES MT
                {
                    nombreFile = idusuario + "_Importacion_Excel_inspeccionesMT" + Guid.Parse(guidB) + extension;
                }

                //-------almacenando la archivo---
                sPath = HttpContext.Current.Server.MapPath("~/Archivos/Excel/" + nombreFile);
                //if (System.IO.File.Exists(sPath))
                //{
                //    System.IO.File.Delete(sPath);
                //}
                file.SaveAs(sPath);

                //-------almacenando la archivo---
                if (File.Exists(sPath))
                {
                    Upload_BL obj_negocio = new Upload_BL();

                    res.ok = true;
                    res.data = obj_negocio.setAlmacenandoFile_Excel_registroOT(sPath, file.FileName, idOt, id_tipoTrabajo, idusuario);
                }
                else
                {
                    res.ok = false;
                    res.data = "No se pudo almacenar el archivo en el servidor";
 
                }
            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;
 
            }
            return res;
        }


        [HttpPost]
        [Route("api/Uploads/post_archivoExcel_detalleImportacionOT")]
        public object post_archivoExcel_detalleImportacionOT(string filtros)
        {
            Resultado res = new Resultado();
            var nombreFile = "";
            string sPath = "";

            try
            {
                //--- obteniendo los parametros que vienen por el FormData

                var file = HttpContext.Current.Request.Files["file"];
                //--- obteniendo los parametros que vienen por el FormData
                string extension = Path.GetExtension(file.FileName);

                string[] parametros = filtros.Split('|');
                int id_tipoTrabajo = Convert.ToInt32(parametros[0].ToString());
                string idusuario = parametros[1].ToString();

                //nombreFile = "Impotacion_Excels" + "_" + idUsuario + extension;

                //-----generando clave unica---
                var guid = Guid.NewGuid();
                var guidB = guid.ToString("B");

                if (id_tipoTrabajo == 822) //---MTTO CALIENTE
                {
                    nombreFile = idusuario + "_detalleOT_mttoCaliente" + Guid.Parse(guidB) + extension;
                }
                if (id_tipoTrabajo == 823) //--- TERMOVISION
                {
                    nombreFile = idusuario + "_detalleOT_termovision" + Guid.Parse(guidB) + extension;
                }
                if (id_tipoTrabajo == 824)//--- INSPECCIONES MT
                {
                    nombreFile = idusuario + "_detalleOT_inspeccionesMT" + Guid.Parse(guidB) + extension;
                }

                //-------almacenando la archivo---
                sPath = HttpContext.Current.Server.MapPath("~/Archivos/Excel/" + nombreFile);
                //if (System.IO.File.Exists(sPath))
                //{
                //    System.IO.File.Delete(sPath);
                //}
                file.SaveAs(sPath);

                //-------almacenando la archivo---
                if (File.Exists(sPath))
                {
                    Upload_BL obj_negocio = new Upload_BL();

                    res.ok = true;
                    res.data = obj_negocio.setAlmacenandoFile_Excel_importacionDetalleOT(sPath, file.FileName, id_tipoTrabajo, idusuario);
                }
                else
                {
                    res.ok = false;
                    res.data = "No se pudo almacenar el archivo en el servidor";

                }
            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;

            }
            return res;
        }

        [HttpPost]
        [Route("api/Uploads/post_archivosEvidencias")]
        public object post_archivosEvidencias(string filtros)
        {
            Resultado res = new Resultado();
            object resul = null;

            var nombreFileServer = "";
            string sPath = "";

            try
            {
                //--- obteniendo los parametros que vienen por el FormData
                var file = HttpContext.Current.Request.Files["file"];
                //--- obteniendo los parametros que vienen por el FormData
                string extension = Path.GetExtension(file.FileName);

                string[] parametros = filtros.Split('|');
                string idOT = parametros[0].ToString();
                string idUsuario = parametros[1].ToString();
                string tipoCarga = parametros[2].ToString();

                //-----generando clave unica---
                var guid = Guid.NewGuid();
                var guidB = guid.ToString("B");
                nombreFileServer = "Evidencia_" + Guid.Parse(guidB) + extension;

                //-------almacenando la archivo---
                sPath = HttpContext.Current.Server.MapPath("~/Archivos/OT/Evidencia/" + nombreFileServer);
                file.SaveAs(sPath);

                //-------almacenando la archivo---
                if (File.Exists(sPath))
                {
                    Upload_BL obj_negocio = new Upload_BL();
                    resul = obj_negocio.set_almacenandoEvidencias(file.FileName ,  nombreFileServer,  idOT, idUsuario, tipoCarga);
                }
                else
                {
                    res.ok = false;
                    res.data = "No se pudo almacenar el archivo en el servidor";
                    resul = res;
                }
            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;
                resul = res;
            }
            return resul;
        }


        [HttpPost]
        [Route("api/Uploads/post_FotosTab4")]
        public object post_FotosTab4(string filtros)
        {
            Resultado res = new Resultado();
            object resul = null;

            var nombreFileServer = "";
            string sPath = "";
            try
            {
                //--- obteniendo los parametros que vienen por el FormData
                var file = HttpContext.Current.Request.Files["file"];
                //--- obteniendo los parametros que vienen por el FormData
                string extension = Path.GetExtension(file.FileName);

                string[] parametros = filtros.Split('|');
                string idOT = parametros[0].ToString();
                string idUsuario = parametros[1].ToString();

                //-----generando clave unica---
                var guid = Guid.NewGuid();
                var guidB = guid.ToString("B");
                nombreFileServer = "Fotos_" + Guid.Parse(guidB) + extension;

                //-------almacenando la archivo---
                sPath = HttpContext.Current.Server.MapPath("~/Archivos/OT/Fotos/" + nombreFileServer);
                file.SaveAs(sPath);

                //-------almacenando la archivo---
                if (File.Exists(sPath))
                {
                    Upload_BL obj_negocio = new Upload_BL();
                    resul = obj_negocio.set_almacenandoFotosTab4(file.FileName, nombreFileServer, idOT, idUsuario);
                }
                else
                {
                    res.ok = false;
                    res.data = "No se pudo almacenar el archivo en el servidor";
                    resul = res;
                }
            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;
                resul = res;
            }
            return resul;
        }


        [HttpPost]
        [Route("api/Uploads/post_imagenCliente")]
        public object post_imagenCliente(string filtros)
        {
            Resultado res = new Resultado();
            object resul = null;

            var nombreFileServer = "";
            string sPath = "";
            try
            {
                //--- obteniendo los parametros que vienen por el FormData
                var file = HttpContext.Current.Request.Files["file"];
                //--- obteniendo los parametros que vienen por el FormData
                string extension = Path.GetExtension(file.FileName);

                string[] parametros = filtros.Split('|');
                string idCliente = parametros[0].ToString();
                string idUsuario = parametros[1].ToString();

                //-----generando clave unica---
                var guid = Guid.NewGuid();
                var guidB = guid.ToString("B");
                nombreFileServer = "imageCliente_" + Guid.Parse(guidB) + extension;

                //-------almacenando la archivo---
                sPath = HttpContext.Current.Server.MapPath("~/Archivos/Fotos/" + nombreFileServer);
                file.SaveAs(sPath);

                //-------almacenando la archivo---
                if (File.Exists(sPath))
                {
                    Upload_BL obj_negocio = new Upload_BL();
                    resul = obj_negocio.set_almacenandoImagenCliente(file.FileName, nombreFileServer, idCliente, idUsuario);
                }
                else
                {
                    res.ok = false;
                    res.data = "No se pudo almacenar el archivo en el servidor";
                    resul = res;
                }
            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;
                resul = res;
            }
            return resul;
        }




    }
}
