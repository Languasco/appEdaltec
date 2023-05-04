using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using Datos;
using Entidades.Acceso;
using Microsoft.VisualBasic;
using Negocio.Resultados;

namespace WebApi_Edaltec.Controllers.Acceso
{
    [EnableCors("*", "*", "*")]
    public class loginController : ApiController
    {
        private MFSoft_Base_EdaltecEntities db = new MFSoft_Base_EdaltecEntities();

        public object GetLogin(int opcion, string filtro)
        {
            Resultado res = new Resultado();
            object resul = null;
            try
            {
                if (opcion == 1)
                {
                    string[] parametros = filtro.Split('|');
                    string login = parametros[0].ToString();
                    string contra = parametros[1].ToString();

                    string claveEncriptada = EncriptarClave(contra, true);

                    var flagLogin = db.Pub_Usuarios.Count(e => e.Pub_Usua_Login == login && e.Pub_Usua_Clave == claveEncriptada);

                    if (flagLogin == 0)
                    {
                        res.ok = false;
                        res.data = "El usuario y/o contraseña no son correctos, verifique ";
                        resul = res;
                    }
                    else
                    { 
                        var Parents = new string[] { "1" };
                        Pub_Usuarios objUsuario = db.Pub_Usuarios.Where(p => p.Pub_Usua_Login == login && p.Pub_Usua_Clave == claveEncriptada).SingleOrDefault();

                        Menu listamenu = new Menu();
                        List<MenuPermisos> listaAccesos = new List<MenuPermisos>();

                        var listaMenu = (from w in db.tbl_Aceesos_Evento
                                         join od in db.tbl_Definicion_Opciones on w.id_Opcion equals od.id_opcion
                                         join u in db.Pub_Usuarios on w.id_Usuario equals u.Pub_Usua_Codigo
                                         where u.Pub_Usua_Codigo == objUsuario.Pub_Usua_Codigo && Parents.Contains(od.parentID.ToString()) && od.estado == 1
                                         orderby od.orden_Opcion ascending
                                         select new
                                         {
                                             id_opcion = w.id_Opcion,
                                             id_usuarios = w.id_Usuario,
                                             nombre_principal = od.nombre_opcion,
                                             parent_id_principal = od.parentID,
                                             urlmagene_principal = od.urlImagen_Opcion,




                                         }).Distinct();

                        foreach (var item in listaMenu)
                        {
                            MenuPermisos listaJsonObj = new MenuPermisos();

                            listaJsonObj.id_opcion = Convert.ToInt32(item.id_opcion);
                            listaJsonObj.id_usuarios = Convert.ToInt32(item.id_usuarios);
                            listaJsonObj.nombre_principal = item.nombre_principal;
                            listaJsonObj.parent_id_principal = Convert.ToInt32(item.parent_id_principal);
                            listaJsonObj.urlmagene_principal = item.urlmagene_principal;
                            listaJsonObj.listMenu = (from w in db.tbl_Aceesos_Evento
                                                     join od in db.tbl_Definicion_Opciones on w.id_Opcion equals od.id_opcion
                                                     join u in db.Pub_Usuarios on w.id_Usuario equals u.Pub_Usua_Codigo
                                                     where u.Pub_Usua_Codigo == objUsuario.Pub_Usua_Codigo && od.parentID == item.id_opcion && od.estado == 1 && od.TipoInterface == "W"
                                                     orderby od.orden_Opcion ascending
                                                     select new
                                                     {
                                                         nombre_page = od.nombre_opcion,
                                                         url_page = od.url_opcion,
                                                         orden = od.orden_Opcion
                                                     })
                                            //.Distinct()
                                            .ToList()
                                            .Distinct();

                            listaAccesos.Add(listaJsonObj);
                        }

                        listamenu.menuPermisos = listaAccesos;
                        //listamenu.menuEventos = get_AccesoEventos(objUsuario.id_Usuario);
                        listamenu.id_usuario = objUsuario.Pub_Usua_Codigo;
                        listamenu.nombre_usuario = objUsuario.Pub_Usua_Nombre;
                        //listamenu.id_perfil = objUsuario.id_Perfil;

                        res.ok = true;
                        res.data = listamenu;
   

                        resul = res;




                    }
                }

                else
                {
                    resul = "Opcion seleccionada invalida";
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

        public static string EncriptarClave(string cExpresion, bool bEncriptarCadena)
        {
            string cResult = "";
            string cPatron = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwwyz";
            string cEncrip = "^çºªæÆöûÿø£Ø×ƒ¬½¼¡«»ÄÅÉêèï7485912360^çºªæÆöûÿø£Ø×ƒ¬½¼¡«»ÄÅÉêèï";


            if (bEncriptarCadena == true)
            {
                cResult = CHRTRAN(cExpresion, cPatron, cEncrip);
            }
            else
            {
                cResult = CHRTRAN(cExpresion, cEncrip, cPatron);
            }

            return cResult;

        }

        public static string CHRTRAN(string cExpresion, string cPatronBase, string cPatronReemplazo)
        {
            string cResult = "";

            int rgChar;
            int nPosReplace;

            for (rgChar = 1; rgChar <= Strings.Len(cExpresion); rgChar++)
            {
                nPosReplace = Strings.InStr(1, cPatronBase, Strings.Mid(cExpresion, rgChar, 1));

                if (nPosReplace == 0)
                {
                    nPosReplace = rgChar;
                    cResult = cResult + Strings.Mid(cExpresion, nPosReplace, 1);
                }
                else
                {
                    if (nPosReplace > cPatronReemplazo.Length)
                    {
                        nPosReplace = rgChar;
                        cResult = cResult + Strings.Mid(cExpresion, nPosReplace, 1);
                    }
                    else
                    {
                        cResult = cResult + Strings.Mid(cPatronReemplazo, nPosReplace, 1);
                    }
                }
            }
            return cResult;
        }

    }
}
