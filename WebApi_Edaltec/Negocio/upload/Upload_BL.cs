using Negocio.Conexion;
using Negocio.Resultados;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.OleDb;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Excel = OfficeOpenXml;
using Style = OfficeOpenXml.Style;

namespace Negocio.upload
{
    public class Upload_BL
    {
        OleDbConnection cn;

        public string setAlmacenandoFile_Excel(string fileLocation, string nombreArchivo, string fechaImportacion, string idUsuario)
        {
            string resultado = "";
            DataTable dt = new DataTable();

            try
            {

                dt = ListaExcel(fileLocation);

                using (SqlConnection con = new SqlConnection(bdConexion.cadenaBDcx()))
                {
                    con.Open();

                    //eliminando registros del usuario
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_TEMPORAL_ORDENES_DELETE", con))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@id_usuario", SqlDbType.VarChar).Value = idUsuario;
                        cmd.ExecuteNonQuery();
                    }

                    //guardando al informacion de la importacion
                    using (SqlBulkCopy bulkCopy = new SqlBulkCopy(con))
                    {

                        bulkCopy.BatchSize = 500;
                        bulkCopy.NotifyAfter = 1000;
                        bulkCopy.DestinationTableName = "TEMPORAL_ORDENES";
                        bulkCopy.WriteToServer(dt);

                        //Actualizando campos 

                        string Sql = "UPDATE TEMPORAL_ORDENES SET nombreArchivo='" + nombreArchivo + "',   fecha_importacion ='" + fechaImportacion + "' , usuario_importacion='" + idUsuario + "', fechaBD=getdate()   WHERE usuario_importacion IS NULL    ";

                        using (SqlCommand cmd = new SqlCommand(Sql, con))
                        {
                            cmd.CommandTimeout = 0;
                            cmd.CommandType = CommandType.Text;
                            cmd.ExecuteNonQuery();
                        }
                    }
                    resultado = "OK";
                }
            }
            catch (Exception)
            {
                throw;
            }
            return resultado;
         }

        private OleDbConnection ConectarExcel(string rutaExcel)
        {
            cn = new OleDbConnection();
            try
            {
                //cn.ConnectionString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + nomExcel + ";Extended Properties='Excel 12.0 Xml;HDR=Yes'";
                cn.ConnectionString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + rutaExcel + ";Extended Properties=\"Excel 12.0;HDR=Yes;IMEX=2\"";
                ///---podria funcionar
               // cn.ConnectionString = "Microsoft.ACE.OLEDB.12.0; Data Source =" + rutaExcel + "; Extended Properties ='Excel 12.0 Xml;HDR=YES;IMEX=1'";


                cn.Open();
                return cn;
            }
            catch (Exception)
            {
                cn.Close();
                throw;
            }
        }

        public DataTable ListaExcel(string fileLocation)
        {
            DataTable dt = new DataTable();
            try
            {
                string sql = "SELECT *FROM [Importar$]";

                OleDbDataAdapter da = new OleDbDataAdapter(sql, ConectarExcel(fileLocation));
                da.SelectCommand.CommandType = CommandType.Text;
                da.Fill(dt);
                cn.Close();
            }
            catch (Exception)
            {
                cn.Close();
                throw;
            }
            return dt;
        }
               
        public DataTable get_datosCargados(string id_usuario, string fechaImportacion)
        {
            DataTable dt_detalle = new DataTable();
            try
            {
                using (SqlConnection cn = new SqlConnection(bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_IMPORTAR_EXCEL_LISTAR", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@id_usuario", SqlDbType.VarChar).Value = id_usuario;
                        cmd.Parameters.Add("@fecha_importa", SqlDbType.VarChar).Value = fechaImportacion;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_detalle);
                        }
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
            return dt_detalle;
        }
                     
        public string generarExcelResumenOperario(DataTable listReporteGeneral, string fechaini, string imgBase)
        {
            string Res = "";
            string _servidor;

            string FileRuta = "";
            string FileExcel = "";

            try
            {
                _servidor = String.Format("{0:ddMMyyyy_hhmmss}.xlsx", DateTime.Now);
                FileRuta = System.Web.Hosting.HostingEnvironment.MapPath("~/ArchivosExcel/" + "RESUMEN_OPERARIO" + _servidor);
                string rutaServer = ConfigurationManager.AppSettings["servidor_archivos"];

                FileExcel = rutaServer + "RESUMEN_OPERARIO" + _servidor;
                FileInfo _file = new FileInfo(FileRuta);
                if (_file.Exists)
                {
                    _file.Delete();
                    _file = new FileInfo(FileRuta);
                }


                if (listReporteGeneral.Rows.Count <= 0)
                {
                    Res = "0|No hay informacion disponible";
                    return Res;
                }



                using (Excel.ExcelPackage oEx = new Excel.ExcelPackage(_file))
                {
                    Excel.ExcelWorksheet oWs = oEx.Workbook.Worksheets.Add("reporte");


                    oWs.Cells[1, 1].Value = "RESUMEN POR OPERARIO: ";
                    oWs.Cells[1, 1].Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center; // alinear texto  
                    oWs.Cells[1, 1, 1, 18].Merge = true;  // combinar celdaS 
                    oWs.Cells[1, 1].Style.Font.Size = 15; //letra tamaño   

                    int _ultimaRow = 6;
                    int count = 0;

                    foreach (DataRow item in listReporteGeneral.Rows)
                    {
                        count = 0;
                        foreach (DataColumn col in listReporteGeneral.Columns)
                        {
                            count++;
                            string field = col.ToString();
                            oWs.Cells[_ultimaRow, count].Value = item[field];
                            oWs.Cells[_ultimaRow, count].Style.Font.Size = 8; //letra tamaño   
                            oWs.Cells[_ultimaRow, count].Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                        }
                        _ultimaRow++;
                    }
 
                    oEx.Save();
                    Res = "1|" + FileExcel;
                }
            }
            catch (Exception ex)
            {
                Res = "0|" + ex.Message;
            }
            return Res;
        }
                
        public int crear_archivoAcronimo(int idOt, int idformato, int idUsuario, string nombreArchivo, int opcionModal, string codCad)
        {
            int resultado = 0;
            try
            {
                using (SqlConnection cn = new SqlConnection(bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_SEGUIMIENTO_ORDENES_FILE_ACRONIMOS_OT", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@id_Ot", SqlDbType.Int).Value = idOt;
                        cmd.Parameters.Add("@id_formato", SqlDbType.Int).Value = idformato;
                        cmd.Parameters.Add("@id_usuario", SqlDbType.Int).Value = idUsuario;
                        cmd.Parameters.Add("@nombre_archivo", SqlDbType.VarChar).Value = nombreArchivo;
                        cmd.Parameters.Add("@opcion_importacion", SqlDbType.Int).Value = opcionModal;
                        cmd.Parameters.Add("@codCad", SqlDbType.VarChar).Value = codCad;
                        cmd.Parameters.Add("@name_bd", SqlDbType.Int).Direction = ParameterDirection.Output;

                        cmd.ExecuteNonQuery(); 
                        resultado = Convert.ToInt32(cmd.Parameters["@name_bd"].Value);
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
            return resultado;
        }
        
        public string setAlmacenandoFile_Excel_registroOT(string fileLocation, string nombreArchivo, int idOT , int id_tipoTrabajo, string idUsuario)
        {
            string resultado = "";
            string nombreProcDelete = "";
            string nombreTablaTemporal = "";
            string nombreProcGuardar = "";

            DataTable dt = new DataTable();

            try
            {
                dt = ListaExcel(fileLocation);

                using (SqlConnection con = new SqlConnection(bdConexion.cadenaBDcx()))
                {
                    con.Open();

                    if (id_tipoTrabajo == 822) //---MTTO CALIENTE
                    {
                        nombreProcDelete = "DSIGE_PROY_W_REGISTRO_OT_TEMPORAL_MTTO_CALIENTE_DELETE";
                        nombreTablaTemporal = "TEMPORAL_MTTO_CALIENTE";
                        nombreProcGuardar = "DSIGE_PROY_W_REGISTRO_OT_TEMPORAL_MTTO_CALIENTE_GRABAR";
                    }
                    if (id_tipoTrabajo == 823) //--- TERMOVISION
                    {
                        nombreProcDelete = "DSIGE_PROY_W_REGISTRO_OT_TEMPORAL_TERMOVISION_DELETE";
                        nombreTablaTemporal = "TEMPORAL_TERMOVISION";
                        nombreProcGuardar = "DSIGE_PROY_W_REGISTRO_OT_TEMPORAL_TERMOVISION_GRABAR";
                    }
                    if (id_tipoTrabajo == 824)//--- INSPECCIONES MT
                    {
                        nombreProcDelete = "DSIGE_PROY_W_REGISTRO_OT_TEMPORAL_INSPECCIONES_MT_DELETE";
                        nombreTablaTemporal = "TEMPORAL_INSPECCIONES_MT";
                        nombreProcGuardar = "DSIGE_PROY_W_REGISTRO_OT_TEMPORAL_INSPECCIONES_MT_GRABAR";
                    }


                    //eliminando registros del usuario
                    using (SqlCommand cmd = new SqlCommand(nombreProcDelete, con))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@id_usuario", SqlDbType.VarChar).Value = idUsuario;
                        cmd.ExecuteNonQuery();
                    }

                    //guardando al informacion de la importacion
                    using (SqlBulkCopy bulkCopy = new SqlBulkCopy(con))
                    {
                        bulkCopy.BatchSize = 500;
                        bulkCopy.NotifyAfter = 1000;
                        bulkCopy.DestinationTableName = nombreTablaTemporal; 
                        bulkCopy.WriteToServer(dt);

                        //Actualizando campos 

                        string Sql = "UPDATE " + nombreTablaTemporal + " SET nombreArchivo='" + nombreArchivo + "',  usuario_importacion='" + idUsuario + "', fechaBD=getdate() , idOT_importacion='" + idOT + "' , idTipoTrabajo_importacion='" + id_tipoTrabajo + "'  WHERE usuario_importacion IS NULL    ";

                        using (SqlCommand cmd = new SqlCommand(Sql, con))
                        {
                            cmd.CommandTimeout = 0;
                            cmd.CommandType = CommandType.Text;
                            cmd.ExecuteNonQuery();
                        }

                        // update en la tabla Lecturas
                        using (SqlCommand cmd = new SqlCommand(nombreProcGuardar, con))
                        {
                            cmd.CommandTimeout = 0;
                            cmd.CommandType = CommandType.StoredProcedure;    
                            cmd.Parameters.Add("@idOT", SqlDbType.Int).Value = idOT;
                            cmd.Parameters.Add("@id_usuario", SqlDbType.VarChar).Value = idUsuario;
                            cmd.Parameters.Add("@idCantReg", SqlDbType.Int).Direction = ParameterDirection.Output;

                            cmd.ExecuteNonQuery();
                            resultado =  cmd.Parameters["@idCantReg"].Value.ToString();
                        }

                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
            return resultado;
        }

        public DataTable get_datosCargados_personal(int id_usuario)
        {
            DataTable dt_detalle = new DataTable();
            try
            {
                using (SqlConnection cn = new SqlConnection(bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_MANT_PERSONAL_TEMPORAL_PERSONAL_LISTAR", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@id_usuario", SqlDbType.Int).Value = id_usuario; 

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_detalle);
                        }
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
            return dt_detalle;
        }


        public object setAlmacenandoFile_Excel_importacionDetalleOT(string fileLocation, string nombreArchivo, int id_tipoTrabajo, string idUsuario)
        {
            object resultado = "";
            string nombreProcDelete = "";
            string nombreTablaTemporal = "";
            string nombreProcGuardar = "";
            string nombreProcListar = "";


            DataTable dt = new DataTable();
            DataTable dt_detalle = new DataTable();

            

            try
            {
                dt = ListaExcel(fileLocation);

                using (SqlConnection con = new SqlConnection(bdConexion.cadenaBDcx()))
                {
                    con.Open();

                    if (id_tipoTrabajo == 822) //---MTTO CALIENTE
                    {
                        nombreProcDelete = "DSIGE_PROY_W_IMPORTACION_OT_TEMPORAL_DETALLE_OT_MTTO_CALIENTE_DELETE";
                        nombreTablaTemporal = "TEMPORAL_DETALLE_OT_MTTO_CALIENTE";
                        nombreProcGuardar = "DSIGE_PROY_W_IMPORTACION_OT_TEMPORAL_DETALLE_OT_MTTO_CALIENTE_GRABAR";
                        nombreProcListar = "DSIGE_PROY_W_IMPORTACION_OT_MTTO_CALIENTE_LISTAR";
                    }
                    if (id_tipoTrabajo == 823) //--- TERMOVISION
                    {
                        nombreProcDelete = "DSIGE_PROY_W_IMPORTACION_OT_TEMPORAL_DETALLE_OT_TERMOVISION_DELETE";
                        nombreTablaTemporal = "TEMPORAL_DETALLE_OT_TERMOVISION";
                        nombreProcGuardar = "DSIGE_PROY_W_IMPORTACION_OT_TEMPORAL_DETALLE_OT_TERMOVISION_GRABAR";
                        nombreProcListar = "DSIGE_PROY_W_IMPORTACION_OT_TERMOVISION_LISTAR";
                    }
                    if (id_tipoTrabajo == 824)//--- INSPECCIONES MT
                    {
                        nombreProcDelete = "DSIGE_PROY_W_IMPORTACION_OT_TEMPORAL_DETALLE_INSPECCIONES_MT_DELETE";
                        nombreTablaTemporal = "TEMPORAL_DETALLE_INSPECCIONES_MT";
                        nombreProcGuardar = "DSIGE_PROY_W_IMPORTACION_OT_TEMPORAL_DETALLE_INSPECCIONES_MT_GRABAR";
                        nombreProcListar = "DSIGE_PROY_W_IMPORTACION_OT_INSPECCIONES_MT_LISTAR";
                    }


                    //eliminando registros del usuario
                    using (SqlCommand cmd = new SqlCommand(nombreProcDelete, con))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@id_usuario", SqlDbType.VarChar).Value = idUsuario;
                        cmd.ExecuteNonQuery();
                    }

                    //guardando al informacion de la importacion
                    using (SqlBulkCopy bulkCopy = new SqlBulkCopy(con))
                    {
                        bulkCopy.BatchSize = 500;
                        bulkCopy.NotifyAfter = 1000;
                        bulkCopy.DestinationTableName = nombreTablaTemporal;
                        bulkCopy.WriteToServer(dt);

                        //Actualizando campos 

                        string Sql = "UPDATE " + nombreTablaTemporal + " SET nombreArchivo='" + nombreArchivo + "',  usuario_importacion='" + idUsuario + "', fechaBD=getdate() , idTipoTrabajo_importacion='" + id_tipoTrabajo + "'  WHERE usuario_importacion IS NULL    ";

                        using (SqlCommand cmd = new SqlCommand(Sql, con))
                        {
                            cmd.CommandTimeout = 0;
                            cmd.CommandType = CommandType.Text;
                            cmd.ExecuteNonQuery();
                        }

                        // update en la tabla Lecturas
                        using (SqlCommand cmd = new SqlCommand(nombreProcGuardar, con))
                        {
                            cmd.CommandTimeout = 0;
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.Parameters.Add("@id_usuario", SqlDbType.VarChar).Value = idUsuario;
                            cmd.ExecuteNonQuery();
                        }

                        //--- obteniendo los registros ----
                        using (SqlCommand cmd = new SqlCommand(nombreProcListar, con))
                        {
                            cmd.CommandTimeout = 0;
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.Parameters.Add("@id_usuario", SqlDbType.VarChar).Value = idUsuario;

                            using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                            {
                                da.Fill(dt_detalle);
                            }
                        }

                        resultado = dt_detalle;

                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
            return resultado;
        }
 


        public object set_almacenandoEvidencias(string FileName, string nombreFileServer, string idOT, string idUsuario, string idTipoDocumento )
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_EVIDENCIA_SAVE_FILE", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@nombreArchivo", SqlDbType.VarChar).Value = FileName;
                        cmd.Parameters.Add("@nombreArchivoServidor", SqlDbType.VarChar).Value = nombreFileServer;
                        cmd.Parameters.Add("@idOT", SqlDbType.Int).Value = idOT;
                        cmd.Parameters.Add("@idUsuario", SqlDbType.VarChar).Value = idUsuario;
                        cmd.Parameters.Add("@idTipoDocumento", SqlDbType.Int).Value = idTipoDocumento;

                        cmd.ExecuteNonQuery();
                        res.ok = true;
                        res.data = "OK";
                    }
                }
            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;
            }
            return res;
        }


        public object set_almacenandoFotosTab4(string FileName, string nombreFileServer, string idOT, string idUsuario)
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_SAVE_FOTOS", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@nombreArchivo", SqlDbType.VarChar).Value = FileName;
                        cmd.Parameters.Add("@nombreArchivoServidor", SqlDbType.VarChar).Value = nombreFileServer;
                        cmd.Parameters.Add("@idOT", SqlDbType.Int).Value = idOT;
                        cmd.Parameters.Add("@idUsuario", SqlDbType.VarChar).Value = idUsuario;

                        cmd.ExecuteNonQuery();
                        res.ok = true;
                        res.data = "OK";
                    }
                }
            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;
            }
            return res;
        }

        public object set_almacenandoImagenCliente(string FileName, string nombreFileServer, string idCliente, string idUsuario)
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_MANT_CLIENTE_SAVE_IMAGEN", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@nombreArchivo", SqlDbType.VarChar).Value = FileName;
                        cmd.Parameters.Add("@nombreArchivoServidor", SqlDbType.VarChar).Value = nombreFileServer;
                        cmd.Parameters.Add("@idCliente", SqlDbType.Int).Value = idCliente;
                        cmd.Parameters.Add("@idUsuario", SqlDbType.VarChar).Value = idUsuario;

                        cmd.ExecuteNonQuery();
                        res.ok = true;
                        res.data = "OK";
                    }
                }
            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;
            }
            return res;
        }




    }
}
