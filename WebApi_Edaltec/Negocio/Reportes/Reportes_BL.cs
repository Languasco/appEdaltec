using Entidades.Reportes;
using Negocio.Resultados;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.IO;
using Excel = OfficeOpenXml;
using Style = OfficeOpenXml.Style;


namespace Negocio.Reportes
{
    public class Reportes_BL
    {
        public object get_asistenciaCab(string fechaini, string fechafin, int opcionReporte)
        {
            Resultado res = new Resultado();
            List<Asistencia_E> obj_List = new List<Asistencia_E>();

            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REPORTE_ASISTENCIA_CAB", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@fechaini", SqlDbType.VarChar).Value = fechaini;
                        cmd.Parameters.Add("@fechafin", SqlDbType.VarChar).Value = fechafin;
                        cmd.Parameters.Add("@opcionReporte", SqlDbType.Int).Value = opcionReporte; 

                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                Asistencia_E Entidad = new Asistencia_E();

                                if (opcionReporte == 1)
                                {
                                    Entidad.id_Asistencia = Convert.ToInt32(dr["id_Asistencia"]);
                                    Entidad.fechaAsistencia = dr["fechaAsistencia"].ToString();
                                    Entidad.placa = dr["placa"].ToString();
                                    Entidad.supervisor = dr["supervisor"].ToString();
                                    Entidad.personal = dr["personal"].ToString();

                                    Entidad.foto = dr["foto"].ToString();
                                    Entidad.fotoGrupal = dr["fotoGrupal"].ToString();
                                    Entidad.latitud = dr["latitud"].ToString();
                                    Entidad.longitud = dr["longitud"].ToString();
                                }
                                if (opcionReporte == 2)
                                {
                                    Entidad.cargo = dr["cargo"].ToString();
                                    Entidad.nombrePersonal = dr["nombrePersonal"].ToString();
                                    Entidad.diasTrabajo = dr["diasTrabajo"].ToString();
                                }

                                obj_List.Add(Entidad);
                            }
                            dr.Close();

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

        public object GenerarReporte_asistencia(string fechaini, string fechafin, int opcionReporte)
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REPORTE_ASISTENCIA_CAB", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@fechaini", SqlDbType.VarChar).Value = fechaini;
                        cmd.Parameters.Add("@fechafin", SqlDbType.VarChar).Value = fechafin;
                        cmd.Parameters.Add("@opcionReporte", SqlDbType.Int).Value = opcionReporte;

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
                                res.data = GenerarExcel_asistencia(dt_detalle, opcionReporte);
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



        public string GenerarExcel_asistencia(DataTable listDetalle, int opcionReporte)
        {
            string Res = "";
            string FileRuta = "";
            string FileExcel = "";
            int _fila = 1;
            int pos = 1;
            int ac = 0;

            try
            {
                var guid = Guid.NewGuid();
                var guidB = guid.ToString("B");
                var nombreFile = opcionReporte == 1 ? "AsistenciaListaDetallada_" + Guid.Parse(guidB) + ".xlsx" : "AsistenciaListaResumen_" + Guid.Parse(guidB) + ".xlsx";
                var nombreHoja = opcionReporte == 1 ? "reporte Asistencia Detallada" : "reporte Asistencia Resumen";

                FileRuta = System.Web.Hosting.HostingEnvironment.MapPath("~/Archivos/Excel/" + nombreFile);
                FileExcel = ConfigurationManager.AppSettings["ServerFilesReporte"] + nombreFile;

                FileInfo _file = new FileInfo(FileRuta);

                using (Excel.ExcelPackage oEx = new Excel.ExcelPackage(_file))
                {
                    Excel.ExcelWorksheet oWs = oEx.Workbook.Worksheets.Add(nombreHoja);
                    oWs.Cells.Style.Font.SetFromFont(new Font("Tahoma", 8));

                    if (opcionReporte == 1)
                    {
                        oWs.Cells[_fila, pos].Value = "ITEM"; pos += 1;
                        oWs.Cells[_fila, pos].Value = "FECHA ASISTENCIA"; pos += 1;
                        oWs.Cells[_fila, pos].Value = "PLACA"; pos += 1;
                        oWs.Cells[_fila, pos].Value = "SUPERVISOR"; pos += 1;
                        oWs.Cells[_fila, pos].Value = "PERSONAL"; pos += 1;

                        _fila += 1;

                        foreach (DataRow item in listDetalle.Rows)
                        {
                            pos = 1;
                            ac += 1;

                            oWs.Cells[_fila, pos].Value = ac; pos += 1;
                            oWs.Cells[_fila, pos].Value = item["fechaAsistencia"].ToString(); pos += 1;
                            oWs.Cells[_fila, pos].Value = item["placa"].ToString(); pos += 1;
                            oWs.Cells[_fila, pos].Value = item["supervisor"].ToString(); pos += 1;
                            oWs.Cells[_fila, pos].Value = item["personal"].ToString(); pos += 1;

                            _fila++;
                        }

                        for (int k = 1; k <= 5; k++)
                        {
                            oWs.Column(k).AutoFit();
                        }
                    }
                    else {

                        oWs.Cells[_fila, pos].Value = "ITEM"; pos += 1;
                        oWs.Cells[_fila, pos].Value = "CARGO"; pos += 1;
                        oWs.Cells[_fila, pos].Value = "NOMBRE PERSONAL "; pos += 1;
                        oWs.Cells[_fila, pos].Value = "DIAS TRABAJO"; pos += 1;

                        _fila += 1;

                        foreach (DataRow item in listDetalle.Rows)
                        {
                            pos = 1;
                            ac += 1;

                            oWs.Cells[_fila, pos].Value = ac; pos += 1;
                            oWs.Cells[_fila, pos].Value = item["cargo"].ToString(); pos += 1;
                            oWs.Cells[_fila, pos].Value = item["nombrePersonal"].ToString(); pos += 1;
                            oWs.Cells[_fila, pos].Value = item["diasTrabajo"].ToString(); pos += 1;
                            oWs.Cells[_fila, pos].Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Right;
                            _fila++;
                        }

                        for (int k = 1; k <= 4; k++)
                        {
                            oWs.Column(k).AutoFit();
                        }

                    }

                    oWs.Row(1).Style.Font.Bold = true;
                    oWs.Row(1).Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                    oWs.Row(1).Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;

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
