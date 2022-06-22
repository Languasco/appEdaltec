using Entidades.Procesos;
using Negocio.Resultados;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Negocio.Procesos
{
    public class ProgramacionOT_BL
    {

        public object get_programacionOT_cab(string idCliente, string fechaInicial, string fechaFinal, string idEstado)
        {
            Resultado res = new Resultado();

            List<ProgramacionOT_E> obj_List = new List<ProgramacionOT_E>();

            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_PROGRAMACION_OT_CAB", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@idCliente", SqlDbType.VarChar).Value = idCliente;
                        cmd.Parameters.Add("@fechaInicial", SqlDbType.VarChar).Value = fechaInicial;
                        cmd.Parameters.Add("@fechaFinal", SqlDbType.VarChar).Value = fechaFinal;
                        cmd.Parameters.Add("@idEstado", SqlDbType.VarChar).Value = idEstado; 

                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                ProgramacionOT_E Entidad = new ProgramacionOT_E();

                                //Entidad.id_OrdenProgramacion = Convert.ToInt32(dr["id_OrdenProgramacion"].ToString()); 
                                Entidad.id_Cliente = Convert.ToInt32(dr["id_Cliente"].ToString());
                                Entidad.nombre_Cliente = dr["nombre_Cliente"].ToString();
                                Entidad.fechaProgramacion = dr["fechaProgramacion"].ToString();
                                Entidad.ges_Empl_DNI_JefeCuadrilla = dr["ges_Empl_DNI_JefeCuadrilla"].ToString();
                                Entidad.jefeCuadrilla = dr["jefeCuadrilla"].ToString();
                                Entidad.cantidadOrdenes = dr["cantidadOrdenes"].ToString();
                                Entidad.id_Estado = dr["id_Estado"].ToString();
                                Entidad.descripcion_estado = dr["descripcion_estado"].ToString();
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

        public object set_anularProgramacionOT(int id_Vehiculo, string idUsuario)
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_MANT_VEHICULO_ANULAR", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@id_Vehiculo", SqlDbType.Int).Value = id_Vehiculo;
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


        public DataTable get_buscarVehiculo_placa(string nroPlaca)
        {
            DataTable dt_detalle = new DataTable();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_PROGRAMACION_OT_BUSCAR_VEHICULO", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@nroPlaca", SqlDbType.VarChar).Value = nroPlaca;

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


        public DataTable get_validarProgramacionOT(int id_Cliente,string fechaProgramacion, string dniCoordinador)
        {
            DataTable dt_detalle = new DataTable();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_PROGRAMACION_OT_VALIDAR", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@id_Cliente", SqlDbType.VarChar).Value = id_Cliente;
                        cmd.Parameters.Add("@fechaProgramacion", SqlDbType.VarChar).Value = fechaProgramacion;
                        cmd.Parameters.Add("@dniCoordinador", SqlDbType.VarChar).Value = dniCoordinador;

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



        public DataTable get_ProgramacionOT_cliente(int id_Cliente)
        {
            DataTable dt_detalle = new DataTable();
            try
            {
                using (SqlConnection cn = new SqlConnection(Conexion.bdConexion.cadenaBDcx()))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_PROGRAMACION_OT_AGRUPADO_CLIENTE", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@id_Cliente", SqlDbType.VarChar).Value = id_Cliente;
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
 

    }
}
