using Entidades.Procesos;
using Negocio.Resultados;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.IO;
using System.Threading;
using System.Web;
using Excel = OfficeOpenXml;
using Style = OfficeOpenXml.Style;

namespace Negocio.Procesos
{
    public class RegistroOT_BL
    {
        public object get_registroOrdenes(string idCliente, string nroOT, string tipoTrabajo, string inspeccionado, string fechaelectrica, string fechaEjecucion)
        {
            Resultado res = new Resultado();

            List<RegistroOTNew_W> obj_List = new List<RegistroOTNew_W>();

            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_CAB", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@idCliente", SqlDbType.VarChar).Value = idCliente;
                        cmd.Parameters.Add("@nroOT", SqlDbType.VarChar).Value = nroOT;
                        cmd.Parameters.Add("@tipoTrabajo", SqlDbType.VarChar).Value = tipoTrabajo;
                        cmd.Parameters.Add("@inspeccionado", SqlDbType.VarChar).Value = inspeccionado;
                        cmd.Parameters.Add("@fechaelectrica", SqlDbType.VarChar).Value = fechaelectrica;
                        cmd.Parameters.Add("@fechaEjecucion", SqlDbType.VarChar).Value = fechaEjecucion;

                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                RegistroOTNew_W Entidad = new RegistroOTNew_W();

                                Entidad.id_OT = Convert.ToInt32(dr["id_OT"].ToString()); 
                                Entidad.nroFolio = dr["nroFolio"].ToString();
                                Entidad.nroOrden = dr["nroOrden"].ToString();
                                Entidad.nroCliente = dr["nroCliente"].ToString();
                                Entidad.fechaElectrica = dr["fechaElectrica"].ToString();

                                Entidad.fechaEjecucion = dr["fechaEjecucion"].ToString();
                                Entidad.tipoTrabajo = dr["tipoTrabajo"].ToString();
                                Entidad.fecha = dr["fecha"].ToString();
                                Entidad.distrito = dr["distrito"].ToString();
                                Entidad.descripcionEstado = dr["descripcionEstado"].ToString();

                                obj_List.Add(Entidad);
                            }

                            res.ok = true;
                            res.data = obj_List;
                        }
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

        public DataTable get_clientes()
        {
            DataTable dt_detalle = new DataTable();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_COMBO_CLIENTES", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_detalle);
                        }
                    }
                }
                return dt_detalle;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public DataTable get_inspeccionado()
        {
            DataTable dt_detalle = new DataTable();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_COMBO_INSPECCIONADOS", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_detalle);
                        }
                    }
                }
                return dt_detalle;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public DataTable get_cecos()
        {
            DataTable dt_detalle = new DataTable();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_COMBO_CECOS", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_detalle);
                        }
                    }
                }
                return dt_detalle;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public DataTable get_distritos()
        {
            DataTable dt_detalle = new DataTable();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_COMBO_DISTRITOS", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_detalle);
                        }
                    }
                }
                return dt_detalle;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public DataTable get_tiposActividad()
        {
            DataTable dt_detalle = new DataTable();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_COMBO_TIPO_ACTIVIDAD", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_detalle);
                        }
                    }
                }
                return dt_detalle;
            }
            catch (Exception)
            {
                throw;
            }
        }
        
        public DataTable get_inspectoresEnel()
        {
            DataTable dt_detalle = new DataTable();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_COMBO_INSPECTORES_ENEL", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_detalle);
                        }
                    }
                }
                return dt_detalle;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public DataTable get_editCargaInicial(int idOT)
        {
            DataTable dt_detalle = new DataTable();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_EDICION_CAB", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@idOT", SqlDbType.Int).Value = idOT;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_detalle);
                        }
                    }
                }
                return dt_detalle;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public DataTable get_ocurrencias(int idOT)
        {
            DataTable dt_detalle = new DataTable();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_OCURRENCIAS", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@idOT", SqlDbType.Int).Value = idOT;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_detalle);
                        }
                    }
                }
                return dt_detalle;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public DataTable get_mostrarTiposReparacionMontos(int idOT)
        {
            DataTable dt_detalle = new DataTable();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_TIPOS_REPARACION_MONTOS", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@idOT", SqlDbType.Int).Value = idOT;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_detalle);
                        }
                    }
                }
                return dt_detalle;
            }
            catch (Exception)
            {
                throw;
            }
        }


        public DataTable get_mostrarTiposReparacionMultipleOT(int idOT)
        {
            DataTable dt_detalle = new DataTable();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_TIPOS_REPARACION_MULTIPLEOT", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@idOT", SqlDbType.Int).Value = idOT;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_detalle);
                        }
                    }
                }
                return dt_detalle;
            }
            catch (Exception)
            {
                throw;
            }
        }





        public DataTable get_tipoTrabajos()
        {
            DataTable dt_detalle = new DataTable();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_COMBO_TIPO_TRABAJOS", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_detalle);
                        }
                    }
                }
                return dt_detalle;
            }
            catch (Exception)
            {
                throw;
            }
        }
               
        public DataTable get_procesos()
        {
            DataTable dt_detalle = new DataTable();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_COMBO_PROCESO", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_detalle);
                        }
                    }
                }
                return dt_detalle;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public DataTable get_zona()
        {
            DataTable dt_detalle = new DataTable();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_COMBO_ZONA", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_detalle);
                        }
                    }
                }
                return dt_detalle;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public DataTable get_SubActividad()
        {
            DataTable dt_detalle = new DataTable();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_COMBO_SUB_ACTIVIDAD", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_detalle);
                        }
                    }
                }
                return dt_detalle;
            }
            catch (Exception)
            {
                throw;
            }
        }
        
        public DataTable get_supervisorEdaltec()
        {
            DataTable dt_detalle = new DataTable();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_COMBO_SUPERVISOR_EDALTEC", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_detalle);
                        }
                    }
                }
                return dt_detalle;
            }
            catch (Exception)
            {
                throw;
            }
        }


        public object GenerarReporte_mttoCaliente(int id_OT, string idUsuario)
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_EXCEL_MTTO_CALIENTE", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@idOt", SqlDbType.Int ).Value = id_OT;
                        cmd.Parameters.Add("@idUsuario", SqlDbType.VarChar).Value = idUsuario;

                        DataTable dt_detalle = new DataTable();
                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_detalle);
                            if (dt_detalle.Rows.Count <= 0)
                            {
                                res.ok = false;
                                res.data = "0|No hay informacion disponible";
                            }
                            else
                            {
                                res.ok = true;
                                res.data = generarExcel_mttoCaliente(dt_detalle, idUsuario);
                            }
                        }
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

        public string generarExcel_mttoCaliente(DataTable listParteDiario,string idUsuario)
        {
            string Res = "";
            string FileRuta = "";
            string FileExcel = "";
            int _fila = 1;
            int pos = 1;
            int[] fil;
            int[] col;

            try
            {
                var guid = Guid.NewGuid();
                var guidB = guid.ToString("B");
                var nombreFile = idUsuario + "_Descarga_Formato_mttoCaliente_" + Guid.Parse(guidB) + ".xlsx";

                FileRuta = System.Web.Hosting.HostingEnvironment.MapPath("~/Archivos/Excel/" + nombreFile);
                FileExcel = ConfigurationManager.AppSettings["ServerFilesReporte"] + nombreFile;

                FileInfo _file = new FileInfo(FileRuta);

                using (Excel.ExcelPackage oEx = new Excel.ExcelPackage(_file))
                {
                    Excel.ExcelWorksheet oWs = oEx.Workbook.Worksheets.Add("mttoCaliente");
                    oWs.Cells.Style.Font.SetFromFont(new Font("Tahoma", 8));

                    oWs.Cells[_fila, 1, _fila, 6].Merge = true;  // combinar celdaS dt
                    oWs.Cells[_fila, 1].Value = "ITEM SUPER. AREA. FECHA";
                    oWs.Cells[_fila, 1].Style.Font.Size = 11; //letra tamaño  
                    oWs.Cells[_fila, 1].Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                    oWs.Cells[_fila, 1].Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;

                    oWs.Cells[_fila, 7, _fila, 18].Merge = true;  // combinar celdaS dt
                    oWs.Cells[_fila, 7].Value = "DATOS DE ESTRUCTURAS";
                    oWs.Cells[_fila, 7].Style.Font.Size = 11; //letra tamaño  
                    oWs.Cells[_fila, 7].Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                    oWs.Cells[_fila, 7].Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;

                    oWs.Cells[_fila, 19, _fila, 28].Merge = true;  // combinar celdaS dt
                    oWs.Cells[_fila, 19].Value = "DEFICIENCIA CRIT OBSERVACIONES UBICACIÓN REAL DE LA ESTRUCTURA";
                    oWs.Cells[_fila, 19].Style.Font.Size = 11; //letra tamaño  
                    oWs.Cells[_fila, 19].Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                    oWs.Cells[_fila, 19].Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;

                    oWs.Cells[_fila, 29, _fila, 35].Merge = true;  // combinar celdaS dt
                    oWs.Cells[_fila, 29].Value = "TAM. MATER. ACCESOS SUPERF. RED TELECOM ";
                    oWs.Cells[_fila, 29].Style.Font.Size = 15; //letra tamaño  
                    oWs.Cells[_fila, 29].Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                    oWs.Cells[_fila, 29].Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;

                    oWs.Cells[_fila, 36, _fila, 36].Merge = true;  // combinar celdaS dt
                    oWs.Cells[_fila, 36].Value = "IMÁGENES DE LAS DEFICIENCIA ENCONTRADAS ";
                    oWs.Cells[_fila, 36].Style.Font.Size = 11; //letra tamaño  
                    oWs.Cells[_fila, 36].Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                    oWs.Cells[_fila, 36].Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;


                    oWs.Cells[_fila, 37, _fila, 40].Merge = true;  // combinar celdaS dt
                    oWs.Cells[_fila, 37].Value = "UBICACIÓN DE CARPETA ";
                    oWs.Cells[_fila, 37].Style.Font.Size = 15; //letra tamaño  
                    oWs.Cells[_fila, 37].Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                    oWs.Cells[_fila, 37].Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;

                    oWs.Cells[_fila, 41, _fila, 45].Merge = true;  // combinar celdaS dt
                    oWs.Cells[_fila, 41].Value = "DATOS INTERNO EDALTEC ";
                    oWs.Cells[_fila, 41].Style.Font.Size = 11; //letra tamaño  
                    oWs.Cells[_fila, 41].Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                    oWs.Cells[_fila, 41].Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;

                    oWs.Cells[_fila, 46, _fila, 46].Merge = true;  // combinar celdaS dt
                    oWs.Cells[_fila, 46].Value = "MC";
                    oWs.Cells[_fila, 46].Style.Font.Size = 15; //letra tamaño  
                    oWs.Cells[_fila, 46].Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                    oWs.Cells[_fila, 46].Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;

                    oWs.Cells[_fila, 47, _fila, 50].Merge = true;  // combinar celdaS dt
                    oWs.Cells[_fila, 47].Value = "";
                    oWs.Cells[_fila, 47].Style.Font.Size = 11; //letra tamaño  
                    oWs.Cells[_fila, 47].Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                    oWs.Cells[_fila, 47].Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;

                    oWs.Cells[_fila, 51, _fila, 53].Merge = true;  // combinar celdaS dt
                    oWs.Cells[_fila, 51].Value = "TRANSFORMADOR";
                    oWs.Cells[_fila, 51].Style.Font.Size = 11; //letra tamaño  
                    oWs.Cells[_fila, 51].Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                    oWs.Cells[_fila, 51].Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;

                    oWs.Cells[_fila, 54, _fila, 62].Merge = true;  // combinar celdaS dt
                    oWs.Cells[_fila, 54].Value = "";
                    oWs.Cells[_fila, 54].Style.Font.Size = 11; //letra tamaño  
                    oWs.Cells[_fila, 54].Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                    oWs.Cells[_fila, 54].Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;


                    oWs.Cells[_fila, 63, _fila, 68].Merge = true;  // combinar celdaS dt
                    oWs.Cells[_fila, 63].Value = "TERMOVISION (ºc )";
                    oWs.Cells[_fila, 63].Style.Font.Size = 11; //letra tamaño  
                    oWs.Cells[_fila, 63].Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                    oWs.Cells[_fila, 63].Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;


                    oWs.Cells[_fila, 69, _fila, 79].Merge = true;  // combinar celdaS dt
                    oWs.Cells[_fila, 69].Value = "";
                    oWs.Cells[_fila, 69].Style.Font.Size = 11; //letra tamaño  
                    oWs.Cells[_fila, 69].Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                    oWs.Cells[_fila, 69].Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;


                    oWs.Cells[_fila, 80, _fila, 80].Merge = true;  // combinar celdaS dt
                    oWs.Cells[_fila, 80].Value = "ZONIFICACIÓN";
                    oWs.Cells[_fila, 80].Style.Font.Size = 11; //letra tamaño  
                    oWs.Cells[_fila, 80].Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                    oWs.Cells[_fila, 80].Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;

                    _fila += 1;
                    pos = 1;

                    oWs.Cells[_fila, pos].Value = "CAK"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "ITEM"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "CONTRA"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "AREA SERVICIO"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "SUPER CONTRA"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "FECHA INSPECC"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "CODIGO"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "SUB CODIGO PF PSRC"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "SUB TIPO ESTRUC"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "TIPO ARMADO"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "POSTE INICIO DMS"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "POSTE FINAL DMS"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "MT MC BTAP"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "SED"; pos += 1;

                    oWs.Cells[_fila, pos].Value = "ALIMENTAD "; pos += 1;
                    oWs.Cells[_fila, pos].Value = "ALIMENTAD "; pos += 1;
                    oWs.Cells[_fila, pos].Value = "CIRCUITO"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "TIPO ANOMALIA"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "DEFICIENCIA ENEL"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "CATEGORIA"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "SUB-FAMILIA"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "ALCANCE"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "CRITICIDAD"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "CONCATENADO"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "OBSERVACIONES INSPECCION"; pos += 1;

                    oWs.Cells[_fila, pos].Value = "UBICACIÓN REAL ESTRUCTURA DISTRITO"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "ZONA"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "RESPONSABLE ENEL"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "TAM POSTE"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "MAT PST"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "ACCESO VEHICUL"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "SUPERF"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "REDES TELEC"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "EQUIPO TELEC"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "ZOCALO DADO"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "COD ID"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "OT"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "CARPETA FECHA SUPERV"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "DISTRITO BASE POSTES"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "CARPETA FOTOS"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "ESTADO INTERNO"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "PERIODO_ RABAJO"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "DATO LIQ"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "MES"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "AÑIO"; pos += 1;

                    oWs.Cells[_fila, pos].Value = "MANT CAL SCB"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "REGIS CARG"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "MED POZO TIER"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "INSP SCB"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "TERMOVISION"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "POTENCIA DEL TRANFO"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "MARCA"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "KARDEX TRANSFO"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "MT"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "BT"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "HORA TOMA"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "TERNA S C.C"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "SECCION CABLE COMUNICACION"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "TIPO CABLE"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "R"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "S"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "T"; pos += 1;

                    oWs.Cells[_fila, pos].Value = "HORA TOMA"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "R "; pos += 1;
                    oWs.Cells[_fila, pos].Value = "S "; pos += 1;
                    oWs.Cells[_fila, pos].Value = "T "; pos += 1;
                    oWs.Cells[_fila, pos].Value = "CARCASA °C MAX"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "TABLERO BT °C MAX"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "TABLERO"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "LLAVE BT"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "TERNA"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "SECCION"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "MATERIAL"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "TIPO"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "FUSIBLE"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "CAP"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "R"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "S"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "T"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "TIPO ZONA"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "OBSERVACIONES"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "CONCATENADO"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "DIGITADOR"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "FECHA"; pos += 1;



                    _fila += 1;

                    foreach (DataRow item in listParteDiario.Rows)
                    {

                        pos = 1;
                        oWs.Cells[_fila, pos].Value = item["cak"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["item"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["contra"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["area_servicio"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["super_contra"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["fecha_inspecc"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["codigo"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["sub_codigo_pf_ps_rc"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["sub_tipo_estruc"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["tipo_armado"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["poste_inicio_dms"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["poste_final_dms"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["mt_mc_bt_ap"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["sed"].ToString(); pos += 1;

                        oWs.Cells[_fila, pos].Value = item["alimentad1"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["alimentad2"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["circuito"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["tipo_anomalia"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["deficiencia_enel"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["categoria"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["sub_familia"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["alcance"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["criticidad"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["concatenado"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["observaciones_inspeccion"].ToString(); pos += 1;

                        oWs.Cells[_fila, pos].Value = item["ubicacion_real_estructura_distrito"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["zona"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["responsable_enel"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["tam_poste"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["mat_pst"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["acceso_vehicul"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["superf"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["redes_telec"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["equipo_telec"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["zocalo_dado"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["cod_id"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["ot"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["carpeta_fecha_superv"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["distrito_base_postes"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["carpeta_fotos"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["estado_interno"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["periodo_trabajo"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["dato_liq"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["mes"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["anio"].ToString(); pos += 1;

                        oWs.Cells[_fila, pos].Value = item["mant_cal_scb"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["regis_carg"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["med_pozo_tier"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["insp_scb"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["termovision"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["potencia_del_tranfo"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["marca"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["kardex_transfo"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["mt"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["bt"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["hora_toma"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["terna_s_c_c"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["seccion_cable_comunicacion"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["tipo_cable"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["r"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["s"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["t"].ToString(); pos += 1;

                        oWs.Cells[_fila, pos].Value = item["hora_toma2"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["r2"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["s2"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["t2"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["carcasa_max"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["tablero_bt_max"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["tablero"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["llave_bt"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["terna"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["seccion"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["material"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["tipo"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["fusible"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["cap"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["r3"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["s3"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["t3"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["tipo_zona"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["observaciones"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["concatenado2"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["digitador"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["fecha"].ToString(); pos += 1;

                        _fila++;
                    }
                    for (int i = 1; i <= 2; i++)
                    {
                        oWs.Row(i).Style.Font.Bold = true;
                        oWs.Row(i).Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                        oWs.Row(i).Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;
                    }


                    for (int k = 1; k <= 84; k++)
                    {
                        oWs.Column(k).AutoFit();
                    }

                    oEx.Save();
                    Res = FileExcel;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return Res;
        }
                     
        public object GenerarReporte_termovision(int id_OT, string idUsuario)
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_EXCEL_TERMOVISION", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@idOt", SqlDbType.Int).Value = id_OT;
                        cmd.Parameters.Add("@idUsuario", SqlDbType.VarChar).Value = idUsuario;

                        DataTable dt_detalle = new DataTable();
                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_detalle);
                            if (dt_detalle.Rows.Count <= 0)
                            {
                                res.ok = false;
                                res.data = "0|No hay informacion disponible";
                            }
                            else
                            {
                                res.ok = true;
                                res.data = generarExcel_termovision(dt_detalle, idUsuario);
                            }
                        }
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

        public string generarExcel_termovision(DataTable listParteDiario, string idUsuario)
        {
            string Res = "";
            string FileRuta = "";
            string FileExcel = "";
            int _fila = 1;
            int pos = 1;
            int[] fil;
            int[] col;

            try
            {
                var guid = Guid.NewGuid();
                var guidB = guid.ToString("B");
                var nombreFile = idUsuario + "_Descarga_Formato_termovision_" + Guid.Parse(guidB) + ".xlsx";

                FileRuta = System.Web.Hosting.HostingEnvironment.MapPath("~/Archivos/Excel/" + nombreFile);
                FileExcel = ConfigurationManager.AppSettings["ServerFilesReporte"] + nombreFile;

                FileInfo _file = new FileInfo(FileRuta);

                using (Excel.ExcelPackage oEx = new Excel.ExcelPackage(_file))
                {
                    Excel.ExcelWorksheet oWs = oEx.Workbook.Worksheets.Add("termovision");
                    oWs.Cells.Style.Font.SetFromFont(new Font("Tahoma", 8));

                    oWs.Cells[_fila, 1, _fila, 6].Merge = true;  // combinar celdaS dt
                    oWs.Cells[_fila, 1].Value = "ITEM SUPER. AREA. FECHA";
                    oWs.Cells[_fila, 1].Style.Font.Size = 10; //letra tamaño  
                    oWs.Cells[_fila, 1].Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                    oWs.Cells[_fila, 1].Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;

                    oWs.Cells[_fila, 7, _fila, 17].Merge = true;  // combinar celdaS dt
                    oWs.Cells[_fila, 7].Value = "DATOS DE ESTRUCTURAS";
                    oWs.Cells[_fila, 7].Style.Font.Size = 10; //letra tamaño  
                    oWs.Cells[_fila, 7].Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                    oWs.Cells[_fila, 7].Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;

                    oWs.Cells[_fila, 18, _fila, 27].Merge = true;  // combinar celdaS dt
                    oWs.Cells[_fila, 18].Value = " DEFICIENCIA CRIT OBSERVACIONES UBICACIÓN REAL DE LA ESTRUCTURA ";
                    oWs.Cells[_fila, 18].Style.Font.Size = 10; //letra tamaño  
                    oWs.Cells[_fila, 18].Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                    oWs.Cells[_fila, 18].Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;

                    oWs.Cells[_fila, 28, _fila, 34].Merge = true;  // combinar celdaS dt
                    oWs.Cells[_fila, 28].Value = " TAM. MATER. ACCESOS SUPERF. RED TELECOM  ";
                    oWs.Cells[_fila, 28].Style.Font.Size = 10; //letra tamaño  
                    oWs.Cells[_fila, 28].Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                    oWs.Cells[_fila, 28].Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;

                    oWs.Cells[_fila, 35, _fila, 35].Merge = true;  // combinar celdaS dt
                    oWs.Cells[_fila, 35].Value = " IMÁGENES DE LAS DEFICIENCIA ENCONTRADAS  ";
                    oWs.Cells[_fila, 35].Style.Font.Size = 10; //letra tamaño  
                    oWs.Cells[_fila, 35].Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                    oWs.Cells[_fila, 35].Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;

                    oWs.Cells[_fila, 36, _fila, 39].Merge = true;  // combinar celdaS dt
                    oWs.Cells[_fila, 36].Value = " UBICACIÓN DE CARPETA ";
                    oWs.Cells[_fila, 36].Style.Font.Size = 10; //letra tamaño  
                    oWs.Cells[_fila, 36].Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                    oWs.Cells[_fila, 36].Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;

                    oWs.Cells[_fila, 40, _fila, 44].Merge = true;  // combinar celdaS dt
                    oWs.Cells[_fila, 40].Value = " DATOS INTERNO EDALTECA ";
                    oWs.Cells[_fila, 40].Style.Font.Size = 10; //letra tamaño  
                    oWs.Cells[_fila, 40].Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                    oWs.Cells[_fila, 40].Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;

                    oWs.Cells[_fila, 45, _fila, 51].Merge = true;  // combinar celdaS dt
                    oWs.Cells[_fila, 45].Value = "";
                    oWs.Cells[_fila, 45].Style.Font.Size = 10; //letra tamaño  
                    oWs.Cells[_fila, 45].Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                    oWs.Cells[_fila, 45].Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;


                    oWs.Cells[_fila, 52, _fila, 54].Merge = true;  // combinar celdaS dt
                    oWs.Cells[_fila, 52].Value = "TRANSFORMADOR";
                    oWs.Cells[_fila, 52].Style.Font.Size = 10; //letra tamaño  
                    oWs.Cells[_fila, 52].Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                    oWs.Cells[_fila, 52].Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;
                    
                    oWs.Cells[_fila, 55, _fila, 57].Merge = true;  // combinar celdaS dt
                    oWs.Cells[_fila, 55].Value = "TRANSFORMADOR";
                    oWs.Cells[_fila, 55].Style.Font.Size = 10; //letra tamaño  
                    oWs.Cells[_fila, 55].Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                    oWs.Cells[_fila, 55].Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;

                    oWs.Cells[_fila, 58, _fila, 59].Merge = true;  // combinar celdaS dt
                    oWs.Cells[_fila, 58].Value = "MEDICIÓN POZO TIERRA";
                    oWs.Cells[_fila, 58].Style.Font.Size = 10; //letra tamaño  
                    oWs.Cells[_fila, 58].Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                    oWs.Cells[_fila, 58].Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;

                    oWs.Cells[_fila, 60, _fila, 65].Merge = true;  // combinar celdaS dt
                    oWs.Cells[_fila, 60].Value = "TERMOVISION (ºc )";
                    oWs.Cells[_fila, 60].Style.Font.Size = 10; //letra tamaño  
                    oWs.Cells[_fila, 60].Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                    oWs.Cells[_fila, 60].Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;

                    oWs.Cells[_fila, 66, _fila, 75].Merge = true;  // combinar celdaS dt
                    oWs.Cells[_fila, 66].Value = "TOMA DE CARGA BT(A)";
                    oWs.Cells[_fila, 66].Style.Font.Size = 10; //letra tamaño  
                    oWs.Cells[_fila, 66].Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                    oWs.Cells[_fila, 66].Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;

                    oWs.Cells[_fila, 76, _fila, 76].Merge = true;  // combinar celdaS dt
                    oWs.Cells[_fila, 76].Value = "ZONIFICACIÓN";
                    oWs.Cells[_fila, 76].Style.Font.Size = 10; //letra tamaño  
                    oWs.Cells[_fila, 76].Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                    oWs.Cells[_fila, 76].Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;

                    _fila += 1;
                    pos = 1;

                    oWs.Cells[_fila, pos].Value = "CAK"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "ITEM"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "CONTRA"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "AREA SERVICIO"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "SUPER CONTRA"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "FECHA INSPECC"; pos += 1;

                    oWs.Cells[_fila, pos].Value = "CODIGO ESTRUCTURA"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "SUB CODIGO PF PS RC"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "SUB TIPO ESTRUC"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "TIPO ARMADO"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "POSTE INICIO DMS"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "POSTE FINAL DMS"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "MT MC BT AP"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "SEET"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "ALIM"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "CIRCUITO"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "TIPO ANOMALIA"; pos += 1;  /// 17

                    oWs.Cells[_fila, pos].Value = "DEFICIENCIA ENEL"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "CATEGORIA"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "SUB-FAMILIA"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "ALCANCE"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "CRITICIDAD"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "CONCATENADO"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "OBSERVACIONES INSPECCION"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "UBICACION REAL ESTRUCTURA DISTRITO"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "ZONA"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "RESPONSABLE ENEL"; pos += 1; // -27
                    oWs.Cells[_fila, pos].Value = "TAM POSTE"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "MAT PST"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "ACCESOVEHICUL"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "SUPERF"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "REDES TELEC"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "EQUIPO TELEC"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "ZOCALO DADO"; pos += 1; // 34

                    oWs.Cells[_fila, pos].Value = "COD ID"; pos += 1; // 35
                    oWs.Cells[_fila, pos].Value = "OT"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "CARPETA FECHA SUPERV"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "DISTRITO BASE POSTES"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "CARPETA FOTOS"; pos += 1; /// 39

                    oWs.Cells[_fila, pos].Value = "ESTADO INTERNO"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "PERIODO TRABAJO"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "DATO LIQ"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "MES"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "ANIO"; pos += 1; /// 44

                    oWs.Cells[_fila, pos].Value = "MANT CAL SCB"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "REGIS CARG"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "MED POZO TIER"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "INSP SCB"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "TERMOVISIÓN"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "INS CAM TAPA PAT"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "TRAB ESP"; pos += 1; // 51

                    oWs.Cells[_fila, pos].Value = "POTENCIA TRANFO"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "MARCA"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "KARDEX TRANSFO"; pos += 1; //54

                    oWs.Cells[_fila, pos].Value = "MT"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "BT"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "HORA TOMA"; pos += 1; // 57

                    oWs.Cells[_fila, pos].Value = "TERNAS"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "CABLE CC"; pos += 1;  // 59

                    oWs.Cells[_fila, pos].Value = "HORA TOMA2"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "R1"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "S1"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "T1"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "CARCASA °C MAX"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "TABLERO BT °C MAX"; pos += 1; //65

                    oWs.Cells[_fila, pos].Value = "TIPO"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "R"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "S"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "T"; pos += 1;

                    oWs.Cells[_fila, pos].Value = "TABLERO"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "LLAVE BT"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "TERNA"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "SECCION"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "MATERIAL"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "TIPO "; pos += 1; //75

                    oWs.Cells[_fila, pos].Value = "FUSIBLE"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "CAP"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "R"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "S"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "T"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "DIGITADOR"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "FECHA DIGITACION"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "SUPER CONTRA"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "FECHA INSPECC"; pos += 1;


                    _fila += 1;

                    foreach (DataRow item in listParteDiario.Rows)
                    {

                        pos = 1;
                        oWs.Cells[_fila, pos].Value = item["cak"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["item"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["contra"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["area_servicio"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["super_contra"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["fecha_inspecc"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["codigo_estructura"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["sub_codigo_pf_ps_rc"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["sub_tipo_estruc"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["tipo_armado"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["poste_inicio_dms"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["poste_final_dms"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["mt_mc_bt_ap"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["seet"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["alim"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["circuito"].ToString(); pos += 1;

                        oWs.Cells[_fila, pos].Value = item["tipo_anomalia"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["deficiencia_enel"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["categoria"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["sub_familia"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["alcance"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["criticidad"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["concatenado"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["observaciones_inspeccion"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["ubicacion_real_estructura_distrito"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["zona"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["responsable_enel"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["tam_poste"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["mat_pst"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["acceso_vehicul"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["superf"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["redes_telec"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["equipo_telec"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["zocalo_dado"].ToString(); pos += 1;

                        oWs.Cells[_fila, pos].Value = item["cod_id"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["ot"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["carpeta_fecha_superv"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["distrito_base_postes"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["carpeta_fotos"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["estado_interno"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["periodo_trabajo"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["dato_liq"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["mes"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["anio"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["mant_cal_scb"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["regis_carg"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["med_pozo_tier"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["insp_scb"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["termovision"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["ins_cam_tapa_pat"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["trab_esp"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["potencia_tranfo"].ToString(); pos += 1;

                        oWs.Cells[_fila, pos].Value = item["marca"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["kardex_transfo"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["mt"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["bt"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["hora_toma"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["ternas"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["cable_cc"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["hora_toma2"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["r1"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["s1"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["t1"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["carcasa_c_max"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["tablero_bt_c_max"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["tipo"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["r2"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["s2"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["t2"].ToString(); pos += 1;

                        oWs.Cells[_fila, pos].Value = item["tablero"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["llave_bt"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["terna"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["seccion"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["material"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["tipo2"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["fusible"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["cap"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["r3"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["s3"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["t3"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["digitador"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["fecha_digitacion"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["super_contra2"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["fecha_inspecc2"].ToString(); pos += 1;

                        _fila++;
                    }
                    for (int i = 1; i <= 2; i++)
                    {
                        oWs.Row(i).Style.Font.Bold = true;
                        oWs.Row(i).Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                        oWs.Row(i).Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;
                    }


                    for (int k = 1; k <= 84; k++)
                    {
                        oWs.Column(k).AutoFit();
                    }

                    oEx.Save();
                    Res = FileExcel;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return Res;
        }
        
        public object GenerarReporte_inspecciones(int id_OT, string idUsuario)
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_EXCEL_INSPECCIONES", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@idOt", SqlDbType.Int).Value = id_OT;
                        cmd.Parameters.Add("@idUsuario", SqlDbType.VarChar).Value = idUsuario;

                        DataTable dt_detalle = new DataTable();
                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_detalle);
                            if (dt_detalle.Rows.Count <= 0)
                            {
                                res.ok = false;
                                res.data = "0|No hay informacion disponible";
                            }
                            else
                            {
                                res.ok = true;
                                res.data = generarExcel_inspecciones(dt_detalle, idUsuario);
                            }
                        }
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

        public string generarExcel_inspecciones(DataTable listParteDiario, string idUsuario)
        {
            string Res = "";
            string FileRuta = "";
            string FileExcel = "";
            int _fila = 1;
            int pos = 1;
            int[] fil;
            int[] col;

            try
            {
                var guid = Guid.NewGuid();
                var guidB = guid.ToString("B");
                var nombreFile = idUsuario + "_Descarga_Formato_inspecciones_" + Guid.Parse(guidB) + ".xlsx";

                FileRuta = System.Web.Hosting.HostingEnvironment.MapPath("~/Archivos/Excel/" + nombreFile);
                FileExcel = ConfigurationManager.AppSettings["ServerFilesReporte"] + nombreFile;

                FileInfo _file = new FileInfo(FileRuta);

                using (Excel.ExcelPackage oEx = new Excel.ExcelPackage(_file))
                {
                    Excel.ExcelWorksheet oWs = oEx.Workbook.Worksheets.Add("inspecciones");
                    oWs.Cells.Style.Font.SetFromFont(new Font("Tahoma", 8));

                    oWs.Cells[_fila, 1, _fila, 6].Merge = true;  // combinar celdaS dt
                    oWs.Cells[_fila, 1].Value = "ITEM SUPER. AREA. FECHA";
                    oWs.Cells[_fila, 1].Style.Font.Size = 10; //letra tamaño  
                    oWs.Cells[_fila, 1].Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                    oWs.Cells[_fila, 1].Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;

                    oWs.Cells[_fila, 7, _fila, 17].Merge = true;  // combinar celdaS dt
                    oWs.Cells[_fila, 7].Value = "DATOS DE ESTRUCTURAS";
                    oWs.Cells[_fila, 7].Style.Font.Size = 10; //letra tamaño  
                    oWs.Cells[_fila, 7].Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                    oWs.Cells[_fila, 7].Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;

                    oWs.Cells[_fila, 18, _fila, 27].Merge = true;  // combinar celdaS dt
                    oWs.Cells[_fila, 18].Value = " DEFICIENCIA CRIT OBSERVACIONES UBICACIÓN REAL DE LA ESTRUCTURA ";
                    oWs.Cells[_fila, 18].Style.Font.Size = 10; //letra tamaño  
                    oWs.Cells[_fila, 18].Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                    oWs.Cells[_fila, 18].Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;



                    oWs.Cells[_fila, 28, _fila, 34].Merge = true;  // combinar celdaS dt
                    oWs.Cells[_fila, 28].Value = " TAM. MATER. ACCESOS SUPERF. RED TELECOM   ";
                    oWs.Cells[_fila, 28].Style.Font.Size = 10; //letra tamaño  
                    oWs.Cells[_fila, 28].Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                    oWs.Cells[_fila, 28].Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;

                    oWs.Cells[_fila, 35, _fila, 35].Merge = true;  // combinar celdaS dt
                    oWs.Cells[_fila, 35].Value = " IMÁGENES DE LAS DEFICIENCIA ENCONTRADAS  ";
                    oWs.Cells[_fila, 35].Style.Font.Size = 10; //letra tamaño  
                    oWs.Cells[_fila, 35].Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                    oWs.Cells[_fila, 35].Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;

                    oWs.Cells[_fila, 36, _fila, 39].Merge = true;  // combinar celdaS dt
                    oWs.Cells[_fila, 36].Value = " UBICACIÓN DE CARPETA ";
                    oWs.Cells[_fila, 36].Style.Font.Size = 10; //letra tamaño  
                    oWs.Cells[_fila, 36].Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                    oWs.Cells[_fila, 36].Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;

                    oWs.Cells[_fila, 40, _fila, 44].Merge = true;  // combinar celdaS dt
                    oWs.Cells[_fila, 40].Value = " DATOS INTERNO EDALTECA ";
                    oWs.Cells[_fila, 40].Style.Font.Size = 10; //letra tamaño  
                    oWs.Cells[_fila, 40].Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                    oWs.Cells[_fila, 40].Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;

                    oWs.Cells[_fila, 45, _fila, 51].Merge = true;  // combinar celdaS dt
                    oWs.Cells[_fila, 45].Value = "";
                    oWs.Cells[_fila, 45].Style.Font.Size = 10; //letra tamaño  
                    oWs.Cells[_fila, 45].Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                    oWs.Cells[_fila, 45].Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;


                    oWs.Cells[_fila, 52, _fila, 54].Merge = true;  // combinar celdaS dt
                    oWs.Cells[_fila, 52].Value = "TRANSFORMADOR";
                    oWs.Cells[_fila, 52].Style.Font.Size = 10; //letra tamaño  
                    oWs.Cells[_fila, 52].Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                    oWs.Cells[_fila, 52].Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;

                    oWs.Cells[_fila, 55, _fila, 56].Merge = true;  // combinar celdaS dt
                    oWs.Cells[_fila, 55].Value = "";
                    oWs.Cells[_fila, 55].Style.Font.Size = 10; //letra tamaño  
                    oWs.Cells[_fila, 55].Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                    oWs.Cells[_fila, 55].Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;

                    oWs.Cells[_fila, 57, _fila, 58].Merge = true;  // combinar celdaS dt
                    oWs.Cells[_fila, 57].Value = "MEDICIÓN POZO TIERRA";
                    oWs.Cells[_fila, 57].Style.Font.Size = 10; //letra tamaño  
                    oWs.Cells[_fila, 57].Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                    oWs.Cells[_fila, 57].Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;

                    oWs.Cells[_fila, 59, _fila, 64].Merge = true;  // combinar celdaS dt
                    oWs.Cells[_fila, 59].Value = "TERMOVISION (ºc )";
                    oWs.Cells[_fila, 59].Style.Font.Size = 10; //letra tamaño  
                    oWs.Cells[_fila, 59].Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                    oWs.Cells[_fila, 59].Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;

                    oWs.Cells[_fila, 65, _fila, 75].Merge = true;  // combinar celdaS dt
                    oWs.Cells[_fila, 65].Value = "TOMA DE CARGA BT(A)";
                    oWs.Cells[_fila, 65].Style.Font.Size = 10; //letra tamaño  
                    oWs.Cells[_fila, 65].Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                    oWs.Cells[_fila, 65].Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;

                    oWs.Cells[_fila, 76, _fila, 76].Merge = true;  // combinar celdaS dt
                    oWs.Cells[_fila, 76].Value = "ZONIFICACIÓN";
                    oWs.Cells[_fila, 76].Style.Font.Size = 10; //letra tamaño  
                    oWs.Cells[_fila, 76].Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                    oWs.Cells[_fila, 76].Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;

                    _fila += 1;
                    pos = 1;
                    

                    oWs.Cells[_fila, pos].Value = "CAK"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "ITEM"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "CONTRA"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "AREA SERVICIO"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "SUPER CONTRA"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "FECHA INSPECC"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "CODIGO ESTRUCTURA"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "SUB CODIGO PF PS RC"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "SUB TIPO ESTRUC"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "TIPO ARMADO"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "POSTE INICIO DMS"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "POSTE_FINAL DMS"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "MT MC BT AP"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "SED CERCANA"; pos += 1;

                    oWs.Cells[_fila, pos].Value = "ALIMENTADOR"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "CIRCUITO"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "TIPO ANOMALIA"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "DEFICIENCIA ENEL"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "CATEGORIA"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "SUB-FAMILIA"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "ALCANCE"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "CRITICIDAD"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "CONCATENADO"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "OBSERVACIONES INSPECCION"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "UBICACION REAL ESTRUCTURA DISTRITO"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "ZONA"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "RESPONSABLE ENEL"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "TAM POSTE"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "MAT PST"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "ACCESO VEHICUL"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "SUPERF"; pos += 1;

                    oWs.Cells[_fila, pos].Value = "REDES TELEC"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "EQUIPO TELEC"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "ZOCALO DADO"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "COD ID"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "OT"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "CARPETA FECHA SUPERV"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "DISTRITO BASE POSTES"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "CARPETA FOTOS"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "ESTADO INTERNO"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "PERIODO TRABAJO"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "DATO LIQ"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "MES"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "ANIO"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "MANT CAL SCB"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "REGIS CARG"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "MED POZO TIER"; pos += 1;

                    oWs.Cells[_fila, pos].Value = "INSP SCB"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "TERMOVISION"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "INS CAM TAPA PAT"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "TRAB ESP"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "POTENCIA TRANFO"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "MARCA"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "KARDEX TRANSFO"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "CABLE COMUNC"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "TIENE"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "MT"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "BT"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "HORA TOMA "; pos += 1;
                    oWs.Cells[_fila, pos].Value = "R "; pos += 1;
                    oWs.Cells[_fila, pos].Value = "S "; pos += 1;
                    oWs.Cells[_fila, pos].Value = "T"; pos += 1;

                    oWs.Cells[_fila, pos].Value = "CARCASA °C MAX"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "TABLERO BT °C MAX"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "HORA TOMA"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "LLAVE BT"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "SECCION"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "MATERIAL"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "TIPO"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "FUSIBLE"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "CAP"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "R"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "S"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "T"; pos += 1;

                    oWs.Cells[_fila, pos].Value = "TIPO ZONA"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "OBSERVACIONES"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "METRADO VEREDAS"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "TOTAL VEREDA"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "CONCATENADO "; pos += 1;
                    oWs.Cells[_fila, pos].Value = "DIGITADOR"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "FECHA DIGITACION"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "SUPER CONTRA"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "FECHA INSPECC"; pos += 1;

                    _fila += 1;

                    foreach (DataRow item in listParteDiario.Rows)
                    {

                        pos = 1;
                        oWs.Cells[_fila, pos].Value = item["cak"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["item"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["contra"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["area_servicio"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["super_contra1"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["fecha_inspecc1"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["codigo_estructura"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["sub_codigo_pf_ps_rc"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["sub_tipo_estruc"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["tipo_armado"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["poste_inicio_dms"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["poste_final_dms"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["mt_mc_bt_ap"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["sed_cercana"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["alimentador"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["circuito"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["tipo_anomalia"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["deficiencia_enel"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["categoria"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["sub_familia"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["alcance"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["criticidad"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["concatenado"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["observaciones_inspeccion"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["ubicacion_real_estructura_distrito"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["zona"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["responsable_enel"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["tam_poste"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["mat_pst"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["acceso_vehicul"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["superf"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["redes_telec"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["equipo_telec"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["zocalo_dado"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["cod_id"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["ot"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["carpeta_fecha_superv"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["distrito_base_postes"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["carpeta_fotos"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["estado_interno"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["periodo_trabajo"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["dato_liq"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["mes"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["anio"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["mant_cal_scb"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["regis_carg"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["med_pozo_tier"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["insp_scb"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["termovision"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["ins_cam_tapa_pat"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["trab_esp"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["potencia_tranfo"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["marca"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["kardex_transfo"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["cable_comunc"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["tiene"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["mt"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["bt"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["hora_toma1"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["r1"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["s1"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["t1"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["carcasa_c_max"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["tablero_bt_c_max"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["hora_toma2"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["llave_bt"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["seccion"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["material"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["tipo"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["fusible"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["cap"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["r2"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["s2"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["t2"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["tipo_zona"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["observaciones"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["metrado_veredas"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["total_vereda"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["concatenado2"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["digitador"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["fecha_digitacion"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["super_contra2"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["fecha_inspecc2"].ToString(); pos += 1;

                        _fila++;
                    }
                    for (int i = 1; i <= 2; i++)
                    {
                        oWs.Row(i).Style.Font.Bold = true;
                        oWs.Row(i).Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                        oWs.Row(i).Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;
                    }


                    for (int k = 1; k <= 83; k++)
                    {
                        oWs.Column(k).AutoFit();
                    }

                    oEx.Save();
                    Res = FileExcel;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return Res;
        }

        public DataTable get_buscarContrato( string nroContrato )
        {
            DataTable dt_detalle = new DataTable();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_BUSCAR_CONTRATO", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@nroContrato", SqlDbType.VarChar).Value = nroContrato;


                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_detalle);
                        }
                    }
                }
                return dt_detalle;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public object set_guardarOcurrencia(int idOT, int idOcurrencia , string ocurrencia, string idUsuario)
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_GRABAR_OCURRENCIAS", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@idOT", SqlDbType.Int).Value = idOT;
                        cmd.Parameters.Add("@idOcurrencia", SqlDbType.Int).Value = idOcurrencia;

                        cmd.Parameters.Add("@ocurrencia", SqlDbType.VarChar).Value = ocurrencia;
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

        public object set_enviarLiquidar(int idOT, string fechaLiquidacion, string idUsuario)
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_ENVIAR_LIQUIDAR", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@idOT", SqlDbType.Int).Value = idOT;
                        cmd.Parameters.Add("@fechaLiquidacion", SqlDbType.VarChar).Value = fechaLiquidacion;
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
        
        public object get_registrosBasesCab(int idOT, int idTipoTrabajo, string idUsuario)
        {
            Resultado res = new Resultado();

            List<RegistroBases_E> obj_List = new List<RegistroBases_E>();

            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_REGISTRO_BASE_CAB", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@idOT", SqlDbType.Int).Value = idOT; 
                        cmd.Parameters.Add("@idTipoTrabajo", SqlDbType.Int).Value = idTipoTrabajo;
                        cmd.Parameters.Add("@idUsuario", SqlDbType.VarChar).Value = idUsuario;
                        
                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                RegistroBases_E Entidad = new RegistroBases_E();

                                Entidad.id_Ot_Det = Convert.ToInt32(dr["id_Ot_Det"].ToString());
                                Entidad.codigoEstructura = dr["codigoEstructura"].ToString();
                                Entidad.subTipoEstructura = dr["subTipoEstructura"].ToString();
                                Entidad.deficienciaEnel = dr["deficienciaEnel"].ToString();
                                Entidad.categoria = dr["categoria"].ToString();
                                Entidad.observaciones = dr["observaciones"].ToString();

                                obj_List.Add(Entidad);
                            }

                            res.ok = true;
                            res.data = obj_List;
                        }
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
               
        public DataTable get_areas()
        {
            DataTable dt_detalle = new DataTable();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_COMBO_AREA", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_detalle);
                        }
                    }
                }
                return dt_detalle;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public DataTable get_supervisorContratista()
        {
            DataTable dt_detalle = new DataTable();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_COMBO_SUPERVISOR_CONTRATISTA", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_detalle);
                        }
                    }
                }
                return dt_detalle;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public DataTable get_tiposTableros()
        {
            DataTable dt_detalle = new DataTable();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_COMBO_TIPOS_TABLERO", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_detalle);
                        }
                    }
                }
                return dt_detalle;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public DataTable get_tiposAnomalias()
        {
            DataTable dt_detalle = new DataTable();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_COMBO_TIPOS_ANOMALIAS", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_detalle);
                        }
                    }
                }
                return dt_detalle;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public DataTable get_ubicaciones()
        {
            DataTable dt_detalle = new DataTable();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_COMBO_UBICACIONES", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_detalle);
                        }
                    }
                }
                return dt_detalle;
            }
            catch (Exception)
            {
                throw;
            }
        }
        
        public DataTable get_materialPoste()
        {
            DataTable dt_detalle = new DataTable();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_COMBO_MATERIAL_POSTE", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_detalle);
                        }
                    }
                }
                return dt_detalle;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public DataTable get_superficies()
        {
            DataTable dt_detalle = new DataTable();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_COMBO_SUPERFICIES", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_detalle);
                        }
                    }
                }
                return dt_detalle;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public DataTable get_redesTelecomunicacion()
        {
            DataTable dt_detalle = new DataTable();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_COMBO_REDES_TELECOMUNICACIONES", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_detalle);
                        }
                    }
                }
                return dt_detalle;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public DataTable get_equiposTelecomunicacion()
        {
            DataTable dt_detalle = new DataTable();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_COMBO_EQUIPOS_TELECOMUNICACIONES", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_detalle);
                        }
                    }
                }
                return dt_detalle;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public DataTable get_materialesCaliente()
        {
            DataTable dt_detalle = new DataTable();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_COMBO_MATERIALES_CALIENTES", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_detalle);
                        }
                    }
                }
                return dt_detalle;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public DataTable get_tiposCables()
        {
            DataTable dt_detalle = new DataTable();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_COMBO_TIPOS_CABLES", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_detalle);
                        }
                    }
                }
                return dt_detalle;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public DataTable get_registroBaseManual_Det( int id_Ot_Det, string idUsuario)
        {
            DataTable dt_detalle = new DataTable();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_REGISTRO_BASE_DET", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@id_Ot_Det", SqlDbType.Int).Value = id_Ot_Det;
                        cmd.Parameters.Add("@idUsuario", SqlDbType.VarChar).Value = idUsuario;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_detalle);
                        }
                    }
                }
                return dt_detalle;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public DataTable get_tiposReparacion()
        {
            DataTable dt_detalle = new DataTable();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_COMBO_TIPO_REPARACION", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_detalle);
                        }
                    }
                }
                return dt_detalle;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public DataTable get_estados()
        {
            DataTable dt_detalle = new DataTable();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_COMBO_ESTADOS", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_detalle);
                        }
                    }
                }
                return dt_detalle;
            }
            catch (Exception)
            {
                throw;
            }
        }


        public object save_update_tiposReparacionMultiple(int idOT, string tiposReparacionMultiple)
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_SAVE_UPDATE_TIPO_REPARACION_MULTIPLE", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@idOT", SqlDbType.Int).Value = idOT;
                        cmd.Parameters.Add("@idtiposReparacionMultiple", SqlDbType.VarChar).Value = tiposReparacionMultiple;      

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


        public object GenerarReporte_ocurrencias(int id_OT)
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_OCURRENCIAS_EXCEL", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@idOt", SqlDbType.Int).Value = id_OT;

                        DataTable dt_detalle = new DataTable();
                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_detalle);
                            if (dt_detalle.Rows.Count <= 0)
                            {
                                res.ok = false;
                                res.data = "0|No hay informacion disponible";
                            }
                            else
                            {
                                res.ok = true;
                                res.data = GenerarExcel_ocurrencias(dt_detalle);
                            }
                        }
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


        public string GenerarExcel_ocurrencias(DataTable listParteDiario)
        {
            string Res = "";
            string FileRuta = "";
            string FileExcel = "";
            int _fila = 1;
            int pos = 1;
            int[] fil;
            int[] col;

            try
            {
                var guid = Guid.NewGuid();
                var guidB = guid.ToString("B");
                var nombreFile = "Ocurrencias_" + Guid.Parse(guidB) + ".xlsx";

                FileRuta = System.Web.Hosting.HostingEnvironment.MapPath("~/Archivos/Excel/" + nombreFile);
                FileExcel = ConfigurationManager.AppSettings["ServerFilesReporte"] + nombreFile;

                FileInfo _file = new FileInfo(FileRuta);

                using (Excel.ExcelPackage oEx = new Excel.ExcelPackage(_file))
                {
                    Excel.ExcelWorksheet oWs = oEx.Workbook.Worksheets.Add("listadoOcurrencias");
                    oWs.Cells.Style.Font.SetFromFont(new Font("Tahoma", 8));                  

                    oWs.Cells[_fila, pos].Value = "CODIGO ORDEN"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "ITEM"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "DESCRIPCION"; pos += 1;

                    _fila += 1;

                    foreach (DataRow item in listParteDiario.Rows)
                    {

                        pos = 1;
                        oWs.Cells[_fila, pos].Value = item["codigoOrden"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["item"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["descripcion"].ToString(); pos += 1;                    

                        _fila++;
                    }
 
                    oWs.Row(1).Style.Font.Bold = true;
                    oWs.Row(1).Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                    oWs.Row(1).Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;
    
                    for (int k = 1; k <= 3; k++)
                    {
                        oWs.Column(k).AutoFit();
                    }

                    oEx.Save();
                    Res = FileExcel;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return Res;
        }

        public DataTable get_archivosCargadosEvidencias(int idOT)
        {
            DataTable dt_detalle = new DataTable();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_ARCHIVOS_EVIDENCIAS", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@idOT", SqlDbType.Int).Value = idOT;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_detalle);
                        }
                    }
                }
                return dt_detalle;
            }
            catch (Exception)
            {
                throw;
            }
        }


        public object set_anular_archivosCargadosEvidencias(int id_OrdenTrabajo_Archivos, string idUsuario)
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_ARCHIVO_EVIDENCIAS_ANULAR", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@id_OrdenTrabajo_Archivos", SqlDbType.Int).Value = id_OrdenTrabajo_Archivos;
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


        public object set_guardarActualizarMetrados(int idOt, int id_OrdenTrabajo_Metrado, int  idTipoReparacion, string largo, string ancho, string espesor, string id_usuario)
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_GRABAR_METRADOS", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@idOT", SqlDbType.Int).Value = idOt;
                        cmd.Parameters.Add("@id_OrdenTrabajo_Metrado", SqlDbType.Int).Value = id_OrdenTrabajo_Metrado;
                        cmd.Parameters.Add("@idTipoReparacion", SqlDbType.Int).Value = idTipoReparacion;

                        cmd.Parameters.Add("@largo", SqlDbType.VarChar).Value = largo;
                        cmd.Parameters.Add("@ancho", SqlDbType.VarChar).Value = ancho;
                        cmd.Parameters.Add("@espesor", SqlDbType.VarChar).Value = espesor;
                        cmd.Parameters.Add("@id_usuario", SqlDbType.VarChar).Value = id_usuario;

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

        public DataTable get_metrados(int idOT)
        {
            DataTable dt_detalle = new DataTable();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_METRADOS", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@idOT", SqlDbType.Int).Value = idOT;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_detalle);
                        }
                    }
                }
                return dt_detalle;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public object set_anularMetrados(int id_OrdenTrabajo_Metrado, string idUsuario)
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_METRADO_ANULAR", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@id_OrdenTrabajo_Metrado", SqlDbType.Int).Value = id_OrdenTrabajo_Metrado;
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

        public DataTable get_fotosTab4(int idOT)
        {
            DataTable dt_detalle = new DataTable();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_FOTOS", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@idOT", SqlDbType.Int).Value = idOT;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_detalle);
                        }
                    }
                }
                return dt_detalle;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public object set_anularFotoTab4(int id_OrdenTrabajo_Foto, string idUsuario)
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_FOTO_ANULAR", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@id_OrdenTrabajo_Foto", SqlDbType.Int).Value = id_OrdenTrabajo_Foto;
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


        public class download
        {
            public string ubicacion { get; set; }
        }

        public string get_descargar_Todos_fotosOT(int idOt, string idUsuario)
        {
            DataTable dt_detalle = new DataTable();
            List<download> list_files = new List<download>();
            string pathfile = "";
            string ruta_descarga = "";

            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_DESCARGAR_FOTO_TODOS", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@idOT", SqlDbType.Int).Value = idOt;
                        cmd.Parameters.Add("@idUsuario", SqlDbType.VarChar).Value = idUsuario;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_detalle);
                            pathfile = HttpContext.Current.Server.MapPath("~/Archivos/OT/Fotos/");

                            foreach (DataRow Fila in dt_detalle.Rows)
                            {
                                download obj_entidad = new download();
                                obj_entidad.ubicacion = pathfile + Fila["Url_Foto_Ubicacion"].ToString();
                                list_files.Add(obj_entidad);
                            }

                            //////restaurando el archivo...
                            //foreach (download item in list_files)
                            //{
                            //    nombreArchivoReal = "";
                            //    nombreArchivoReal = item.nombreBd.Replace(item.nombreBd, item.nombreFile);

                            //    rutaOrig = System.Web.Hosting.HostingEnvironment.MapPath("~/Archivos/OT/Fotos/" + item.nombreBd);
                            //    rutaDest = System.Web.Hosting.HostingEnvironment.MapPath("~/Archivos/OT/Fotos/Descargas/" + nombreArchivoReal);

                            //    if (System.IO.File.Exists(rutaDest)) //--- borrando restaurarlo
                            //    {
                            //        System.IO.File.Delete(rutaDest);
                            //        System.IO.File.Copy(rutaOrig, rutaDest);
                            //    }
                            //    else //--- restaurandolo
                            //    {
                            //        System.IO.File.Copy(rutaOrig, rutaDest);
                            //    }
                            //    Thread.Sleep(1000);
                            //}


                            if (list_files.Count > 0)
                            { 
                                ruta_descarga = comprimir_Files(list_files, idUsuario);          
                            }
                            else
                            {
                               throw new System.InvalidOperationException("No hay archivo para Descargar");
                            }
                        }
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
            return ruta_descarga;
        }

        public string comprimir_Files(List<download> list_download, string usuario_creacion)
        {
            string resultado = "";
            try
            {
                string ruta_destino = "";
                string ruta_descarga = "";
                string pathFoto = "";

                ruta_destino = System.Web.Hosting.HostingEnvironment.MapPath("~/Archivos/OT/Descargas/Fotos_OT" + usuario_creacion + "Descarga.zip");
                ruta_descarga = ConfigurationManager.AppSettings["Archivos"] + "OT/Descargas/Fotos_OT" + usuario_creacion + "Descarga.zip";

                if (File.Exists(ruta_destino)) /// verificando si existe el archivo zip
                {
                    System.IO.File.Delete(ruta_destino);
                }
                using (Ionic.Zip.ZipFile zip = new Ionic.Zip.ZipFile())
                {
                    foreach (download item in list_download)
                    {
                        pathFoto = item.ubicacion;
                        if (System.IO.File.Exists(pathFoto))
                        {
                            zip.AddFile(pathFoto, "");
                        }
                    }
                    // Guardando el archivo zip 
                    zip.Save(ruta_destino);
                }
                Thread.Sleep(2000);

                if (File.Exists(ruta_destino))
                {
                    resultado = ruta_descarga;
                }
                else
                {
                    throw new System.InvalidOperationException("No se pudo generar la Descarga del Archivo");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return resultado;
        }

 
        public object get_reportePDF_ot(int id_OT)
        {
            Resultado res = new Resultado();

            DataTable dt_reportePdf = new DataTable();
            DataTable dt_reportePdf_ocurrencia = new DataTable();
            DataTable dt_reportePdf_metrados = new DataTable();


            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_REPORTE_PDF", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@idOt", SqlDbType.Int).Value = id_OT;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_reportePdf);
                        }
                    }

                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_OCURRENCIAS", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@idOt", SqlDbType.Int).Value = id_OT;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_reportePdf_ocurrencia);
                        }
                    }
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_METRADOS", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@idOt", SqlDbType.Int).Value = id_OT;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_reportePdf_metrados);
                        }
                    }

                    var reportePdf = new
                    {
                        dt_reportePdf,
                        dt_reportePdf_ocurrencia,
                        dt_reportePdf_metrados
                    };


                    res.ok = true;
                    res.data = reportePdf;
                }
            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;
            }
            return res;
        }

        public object get_reporteReporte_ot(int id_OT)
        {
            Resultado res = new Resultado();

            DataTable dt_reportePdf = new DataTable();
            DataTable dt_reportePdf_ocurrencia = new DataTable();
            DataTable dt_reportePdf_metrados = new DataTable();

            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_REPORTE", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@idOt", SqlDbType.Int).Value = id_OT;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_reportePdf);
                        }
                    }

                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_OCURRENCIAS", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@idOt", SqlDbType.Int).Value = id_OT;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_reportePdf_ocurrencia);
                        }
                    }
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_METRADOS", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@idOt", SqlDbType.Int).Value = id_OT;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_reportePdf_metrados);
                        }
                    }

                    var reportePdf = new
                    {
                        dt_reportePdf,
                        dt_reportePdf_ocurrencia,
                        dt_reportePdf_metrados
                    };


                    res.ok = true;
                    res.data = reportePdf;
                }
            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;
            }
            return res;
        }

        public object GenerarReporte_registrosOT(string idCliente, string nroOT, string tipoTrabajo, string inspeccionado, string fechaelectrica, string fechaEjecucion)
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_DESCARGAR_GRILLA_EXCEL", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@idCliente", SqlDbType.VarChar).Value = idCliente;
                        cmd.Parameters.Add("@nroOT", SqlDbType.VarChar).Value = nroOT;
                        cmd.Parameters.Add("@tipoTrabajo", SqlDbType.VarChar).Value = tipoTrabajo;
                        cmd.Parameters.Add("@inspeccionado", SqlDbType.VarChar).Value = inspeccionado;
                        cmd.Parameters.Add("@fechaelectrica", SqlDbType.VarChar).Value = fechaelectrica;
                        cmd.Parameters.Add("@fechaEjecucion", SqlDbType.VarChar).Value = fechaEjecucion;

                        DataTable dt_detalle = new DataTable();
                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_detalle);
                            if (dt_detalle.Rows.Count <= 0)
                            {
                                res.ok = false;
                                res.data = "0|No hay informacion disponible";
                            }
                            else
                            {
                                res.ok = true;
                                res.data = GenerarExcel_registroOrdenes(dt_detalle);
                            }
                        }
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


        public string GenerarExcel_registroOrdenes(DataTable listParteDiario)
        {
            string Res = "";
            string FileRuta = "";
            string FileExcel = "";
            int _fila = 1;
            int pos = 1;
            int[] fil;
            int[] col;

            try
            {
                var guid = Guid.NewGuid();
                var guidB = guid.ToString("B");
                var nombreFile = "ReporteOrdenes_" + Guid.Parse(guidB) + ".xlsx";

                FileRuta = System.Web.Hosting.HostingEnvironment.MapPath("~/Archivos/Excel/" + nombreFile);
                FileExcel = ConfigurationManager.AppSettings["ServerFilesReporte"] + nombreFile;

                FileInfo _file = new FileInfo(FileRuta);

                using (Excel.ExcelPackage oEx = new Excel.ExcelPackage(_file))
                {
                    Excel.ExcelWorksheet oWs = oEx.Workbook.Worksheets.Add("reporteGeneralOrdenes");
                    oWs.Cells.Style.Font.SetFromFont(new Font("Tahoma", 8));

                    oWs.Cells[_fila, pos].Value = "ITEM"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "NRO FOLIO"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "AREA"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "FECHA CORREO	"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "FECHA ELECTRICA"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "FECHA ASIGNADA"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "CONC"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "TIPO DE TRABAJO	"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "ORDEN"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "DISTRITO	"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "DIRECCION"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "NRO CLIENTE"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "CLIENTE"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "SED"; pos += 1;

                    oWs.Cells[_fila, pos].Value = "MES"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "SUPERVISOR	"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "SUPERVISOR 2	"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "CANTIDAD REPARAR	"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "CAPATAZ	"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "FECHA DE CAMPO	"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "FECHA PROGRAMADA	"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "FECHA ELIMINACION DESMONTE"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "FECHA EJECUCION"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "ESTADO"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "TIPO REPARACION	"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "OCURRENCIAS	"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "CANTIDAD	"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "METRADOS"; pos += 1;

                    oWs.Cells[_fila, pos].Value = "VEREDA	"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "GRASS"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "ADOQUIN	"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "MAYOLICA	"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "PIEDRA LAJA	"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "LOSETA"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "CONCRETO"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "ASFALTO"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "PISO_ESPECIAL"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "EXTENSION"; pos += 1;

                    oWs.Cells[_fila, pos].Value = "Costo Vereda"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "Costo Gras"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "Costo Especial"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "Costo Concreto"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "Costo P Asfal"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "Total Edif"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "Retraso Dominion"; pos += 1;

                    oWs.Cells[_fila, pos].Value = "Retraso Edaltec"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "Horas Retrasadas Edaltec"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "Horas Retrasadas Dominion"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "Demora ejecucion"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "Horas demoras ejecucion"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "Mes asignacion"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "Mes ejecucion"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "Falat entrega"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "Demora entrega"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "Periodo"; pos += 1;

                    _fila += 1;

                    foreach (DataRow item in listParteDiario.Rows)
                    {

                        pos = 1;
                        oWs.Cells[_fila, pos].Value = item["item"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["area"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["nroFolio"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["fechacorreo"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["fechaelectrica"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["fechaasignada"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["conc"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["tipodetrabajo"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["orden"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["distrito"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["direccion"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["nrocliente"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["cliente"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["sed"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["mes"].ToString(); pos += 1;

                        oWs.Cells[_fila, pos].Value = item["supervisor"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["supervisor2"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["cantidadreparar"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["capataz"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["fechadecampo"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["fechaprogramada"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["fechaeliminaciondesmonte"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["fechaejecucion"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["estado"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["tiporeparacion"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["ocurrencias"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["cantidad"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["metrados"].ToString(); pos += 1;

                        oWs.Cells[_fila, pos].Value = item["vereda"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["grass"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["adoquin"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["mayolica"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["piedralaja"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["loseta"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["concreto"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["asfalto"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["piso_especial"].ToString(); pos += 1;

                        oWs.Cells[_fila, pos].Value = item["extension"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["costovereda"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["costogras"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["costoespecial"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["costoconcreto"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["costopasfal"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["totaledif"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["retrasodominion"].ToString(); pos += 1;

                        oWs.Cells[_fila, pos].Value = item["retrasoedaltec"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["horasretrasadasedaltec"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["horasretrasadasdominion"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["demoraejecucion"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["horasdemorasejecucion"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["mesasignacion"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["mesejecucion"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["falatentrega"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["demoraentrega"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = item["periodo"].ToString(); pos += 1;

                        _fila++;
                    }

                    oWs.Row(1).Style.Font.Bold = true;
                    oWs.Row(1).Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                    oWs.Row(1).Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;

                    for (int k = 1; k <= 53; k++)
                    {
                        oWs.Column(k).AutoFit();
                    }

                    oEx.Save();
                    Res = FileExcel;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return Res;
        }


    }
}
