export interface Arecepcion{
    id_acta_recepcion:string;
    num_acta_ar:string;
    fecha_ar:string;
    hora_ar:string;
    id_tipo_atencion:string;
    nom_tipo_atencion:string;
    id_ldfe_municipio:string;
    nom_mun:string;
    nom_ldfe_barrio_ar:string;
    nom_ldfecalle_ar:string;
    num_ldfe_casa_ar:string;

    id_lpd_municipio:string;
    nom_ldp_barrio_ar:string;
    nom_ldp_calle_ar:string;
    nom_ldp_empresa_ar:string;
    nombre_ldp_area_ar:string;
    
    nombre_u:string;
    ci_u:string;
    firma_u:string;
    nombreC:string;
    cedula:string;
    telefono:string;
    firma:string;

    id_animal_silvestre:string;
    nom_especies:string;
    nom_cientifico:string;
    nom_comun:string;
    nom_edad:string;
    nom_sexo:string;
    observaciones_rec:string;
}