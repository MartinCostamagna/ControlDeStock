import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1777322632585 implements MigrationInterface {
    name = 'Initial1777322632585'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "marcas" ("idMarca" SERIAL NOT NULL, "nombre" character varying NOT NULL, CONSTRAINT "PK_22e5739d2009ed5dc08fff0a8e4" PRIMARY KEY ("idMarca"))`);
        await queryRunner.query(`CREATE TABLE "paises" ("idPais" SERIAL NOT NULL, "nombre" character varying NOT NULL, CONSTRAINT "PK_93e288f0198b459fd0f5c0f3f53" PRIMARY KEY ("idPais"))`);
        await queryRunner.query(`CREATE TABLE "provincias" ("idProvincia" SERIAL NOT NULL, "nombre" character varying NOT NULL, "latitud" double precision NOT NULL, "longitud" double precision NOT NULL, "idPais" integer NOT NULL, CONSTRAINT "PK_152206ea8b569d2e2c80abfa8fb" PRIMARY KEY ("idProvincia"))`);
        await queryRunner.query(`CREATE TABLE "ciudades" ("idCiudad" SERIAL NOT NULL, "nombre" character varying NOT NULL, "latitud" double precision NOT NULL, "longitud" double precision NOT NULL, "idProvincia" integer NOT NULL, CONSTRAINT "PK_5466d3caa6db8609e27afb1bf10" PRIMARY KEY ("idCiudad"))`);
        await queryRunner.query(`CREATE TABLE "detallesDePedido" ("idDetallePedido" SERIAL NOT NULL, "cantidad" integer NOT NULL, "idPedido" integer, "idProducto" character varying(15), CONSTRAINT "PK_34e3ad743a6f7b6f09190788448" PRIMARY KEY ("idDetallePedido"))`);
        await queryRunner.query(`CREATE TABLE "pedidos" ("idPedido" SERIAL NOT NULL, "fecha" date NOT NULL, "idProveedor" integer, CONSTRAINT "PK_46dbf556ac662a97b1117dc798c" PRIMARY KEY ("idPedido"))`);
        await queryRunner.query(`CREATE TABLE "proveedores" ("idProveedor" SERIAL NOT NULL, "nombre" character varying NOT NULL, "direccion" character varying NOT NULL, "telefono" character varying NOT NULL, "email" character varying NOT NULL, "idCiudad" integer NOT NULL, CONSTRAINT "PK_6f03df7c372556e4fdb69400e24" PRIMARY KEY ("idProveedor"))`);
        await queryRunner.query(`CREATE TABLE "entradas" ("idEntrada" SERIAL NOT NULL, "fecha" date NOT NULL, CONSTRAINT "PK_62550c1cec0a0256a3d0a2f1f0a" PRIMARY KEY ("idEntrada"))`);
        await queryRunner.query(`CREATE TABLE "detallesDeEntrada" ("idDetalleEntrada" SERIAL NOT NULL, "cantidad" integer NOT NULL, "idEntrada" integer NOT NULL, "idProducto" character varying(15) NOT NULL, CONSTRAINT "PK_3904bb0e1588308db2212a1b91b" PRIMARY KEY ("idDetalleEntrada"))`);
        await queryRunner.query(`CREATE TABLE "salidas" ("idSalida" SERIAL NOT NULL, "fecha" date NOT NULL, "motivo" character varying(50) NOT NULL, CONSTRAINT "PK_fbf07339044de33cd2f0dab27c7" PRIMARY KEY ("idSalida"))`);
        await queryRunner.query(`CREATE TABLE "detallesDeSalida" ("idDetalleSalida" SERIAL NOT NULL, "cantidad" integer NOT NULL, "idSalida" integer NOT NULL, "idProducto" character varying(15) NOT NULL, CONSTRAINT "PK_9debd94beff81b5605470fa11d5" PRIMARY KEY ("idDetalleSalida"))`);
        await queryRunner.query(`CREATE TABLE "ventas" ("idVenta" SERIAL NOT NULL, "fecha" date NOT NULL, CONSTRAINT "PK_cb09128c86f01e1f15fb6280d10" PRIMARY KEY ("idVenta"))`);
        await queryRunner.query(`CREATE TABLE "detallesVenta" ("idDetalleVenta" SERIAL NOT NULL, "cantidad" numeric NOT NULL, "precioUnitario" numeric NOT NULL, "subtotal" numeric NOT NULL, "idVenta" integer, "codigoDeBarras" character varying(15), CONSTRAINT "PK_7088c7e1565e6167499c337abf6" PRIMARY KEY ("idDetalleVenta"))`);
        await queryRunner.query(`CREATE TABLE "productos" ("codigoDeBarras" character varying(15) NOT NULL, "descripcion" character varying NOT NULL, "precioCosto" numeric(10,2) NOT NULL, "porcentajeGanancia" integer NOT NULL, "stock" integer NOT NULL DEFAULT '0', "stockMinimo" integer NOT NULL, "idMarca" integer NOT NULL, "idCategoria" integer NOT NULL, "idProveedor" integer NOT NULL, CONSTRAINT "PK_6e4674b9dad218e8773d35cb4eb" PRIMARY KEY ("codigoDeBarras"))`);
        await queryRunner.query(`CREATE TABLE "categorias" ("idCategoria" SERIAL NOT NULL, "nombre" character varying NOT NULL, CONSTRAINT "PK_96820aa72955b18d906d10270cd" PRIMARY KEY ("idCategoria"))`);
        await queryRunner.query(`CREATE TYPE "public"."notificaciones_estado_enum" AS ENUM('enviada', 'vista', 'eliminada')`);
        await queryRunner.query(`CREATE TABLE "notificaciones" ("idNotificacion" SERIAL NOT NULL, "estado" "public"."notificaciones_estado_enum" NOT NULL DEFAULT 'enviada', "mensaje" character varying NOT NULL, "fechaHora" TIMESTAMP NOT NULL DEFAULT now(), "codigoDeBarras" character varying(15) NOT NULL, CONSTRAINT "PK_1875785d2647e7c4c9b76c8a7f6" PRIMARY KEY ("idNotificacion"))`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("idUsuario" SERIAL NOT NULL, "nombre" character varying NOT NULL, "apellido" character varying NOT NULL, "email" character varying NOT NULL, "contraseña" character varying NOT NULL, "idCiudad" integer NOT NULL, CONSTRAINT "PK_23e41f215fc91d01207123f74af" PRIMARY KEY ("idUsuario"))`);
        await queryRunner.query(`ALTER TABLE "provincias" ADD CONSTRAINT "FK_d094b94d423d5a606cdfea0b6ea" FOREIGN KEY ("idPais") REFERENCES "paises"("idPais") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ciudades" ADD CONSTRAINT "FK_d6154610fb0ded6dd4a102ea937" FOREIGN KEY ("idProvincia") REFERENCES "provincias"("idProvincia") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "detallesDePedido" ADD CONSTRAINT "FK_5de7b7d02fdae5bd30d217dbc5e" FOREIGN KEY ("idPedido") REFERENCES "pedidos"("idPedido") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "detallesDePedido" ADD CONSTRAINT "FK_8ceefcd4dc1de760fa1bfc32472" FOREIGN KEY ("idProducto") REFERENCES "productos"("codigoDeBarras") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD CONSTRAINT "FK_1236ae753b99f47e00edac21f0e" FOREIGN KEY ("idProveedor") REFERENCES "proveedores"("idProveedor") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proveedores" ADD CONSTRAINT "FK_77f6abc0329ad352b26cfdcdc86" FOREIGN KEY ("idCiudad") REFERENCES "ciudades"("idCiudad") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "detallesDeEntrada" ADD CONSTRAINT "FK_e69f1032fc14be30f033c5c60f9" FOREIGN KEY ("idEntrada") REFERENCES "entradas"("idEntrada") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "detallesDeEntrada" ADD CONSTRAINT "FK_196070ea9cbb80a5024afbc7c10" FOREIGN KEY ("idProducto") REFERENCES "productos"("codigoDeBarras") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "detallesDeSalida" ADD CONSTRAINT "FK_18201ec9eceffdcb1a3b6c25a29" FOREIGN KEY ("idSalida") REFERENCES "salidas"("idSalida") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "detallesDeSalida" ADD CONSTRAINT "FK_3499debe558c4714b5291bec088" FOREIGN KEY ("idProducto") REFERENCES "productos"("codigoDeBarras") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "detallesVenta" ADD CONSTRAINT "FK_f26d7c250628428373bf7153b2c" FOREIGN KEY ("idVenta") REFERENCES "ventas"("idVenta") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "detallesVenta" ADD CONSTRAINT "FK_32bc5f4e09d00d489243ed43bb6" FOREIGN KEY ("codigoDeBarras") REFERENCES "productos"("codigoDeBarras") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "productos" ADD CONSTRAINT "FK_df8a9db77febfc4c12f372deb53" FOREIGN KEY ("idMarca") REFERENCES "marcas"("idMarca") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "productos" ADD CONSTRAINT "FK_0913b9c08a8472ad2df8579e910" FOREIGN KEY ("idCategoria") REFERENCES "categorias"("idCategoria") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "productos" ADD CONSTRAINT "FK_efcd30fa53eda687d8c6e694d8d" FOREIGN KEY ("idProveedor") REFERENCES "proveedores"("idProveedor") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notificaciones" ADD CONSTRAINT "FK_91522e08747cd2905cfeef4719b" FOREIGN KEY ("codigoDeBarras") REFERENCES "productos"("codigoDeBarras") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD CONSTRAINT "FK_fdbaef8b83e0e02c9d8635df6fd" FOREIGN KEY ("idCiudad") REFERENCES "ciudades"("idCiudad") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP CONSTRAINT "FK_fdbaef8b83e0e02c9d8635df6fd"`);
        await queryRunner.query(`ALTER TABLE "notificaciones" DROP CONSTRAINT "FK_91522e08747cd2905cfeef4719b"`);
        await queryRunner.query(`ALTER TABLE "productos" DROP CONSTRAINT "FK_efcd30fa53eda687d8c6e694d8d"`);
        await queryRunner.query(`ALTER TABLE "productos" DROP CONSTRAINT "FK_0913b9c08a8472ad2df8579e910"`);
        await queryRunner.query(`ALTER TABLE "productos" DROP CONSTRAINT "FK_df8a9db77febfc4c12f372deb53"`);
        await queryRunner.query(`ALTER TABLE "detallesVenta" DROP CONSTRAINT "FK_32bc5f4e09d00d489243ed43bb6"`);
        await queryRunner.query(`ALTER TABLE "detallesVenta" DROP CONSTRAINT "FK_f26d7c250628428373bf7153b2c"`);
        await queryRunner.query(`ALTER TABLE "detallesDeSalida" DROP CONSTRAINT "FK_3499debe558c4714b5291bec088"`);
        await queryRunner.query(`ALTER TABLE "detallesDeSalida" DROP CONSTRAINT "FK_18201ec9eceffdcb1a3b6c25a29"`);
        await queryRunner.query(`ALTER TABLE "detallesDeEntrada" DROP CONSTRAINT "FK_196070ea9cbb80a5024afbc7c10"`);
        await queryRunner.query(`ALTER TABLE "detallesDeEntrada" DROP CONSTRAINT "FK_e69f1032fc14be30f033c5c60f9"`);
        await queryRunner.query(`ALTER TABLE "proveedores" DROP CONSTRAINT "FK_77f6abc0329ad352b26cfdcdc86"`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP CONSTRAINT "FK_1236ae753b99f47e00edac21f0e"`);
        await queryRunner.query(`ALTER TABLE "detallesDePedido" DROP CONSTRAINT "FK_8ceefcd4dc1de760fa1bfc32472"`);
        await queryRunner.query(`ALTER TABLE "detallesDePedido" DROP CONSTRAINT "FK_5de7b7d02fdae5bd30d217dbc5e"`);
        await queryRunner.query(`ALTER TABLE "ciudades" DROP CONSTRAINT "FK_d6154610fb0ded6dd4a102ea937"`);
        await queryRunner.query(`ALTER TABLE "provincias" DROP CONSTRAINT "FK_d094b94d423d5a606cdfea0b6ea"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TABLE "notificaciones"`);
        await queryRunner.query(`DROP TYPE "public"."notificaciones_estado_enum"`);
        await queryRunner.query(`DROP TABLE "categorias"`);
        await queryRunner.query(`DROP TABLE "productos"`);
        await queryRunner.query(`DROP TABLE "detallesVenta"`);
        await queryRunner.query(`DROP TABLE "ventas"`);
        await queryRunner.query(`DROP TABLE "detallesDeSalida"`);
        await queryRunner.query(`DROP TABLE "salidas"`);
        await queryRunner.query(`DROP TABLE "detallesDeEntrada"`);
        await queryRunner.query(`DROP TABLE "entradas"`);
        await queryRunner.query(`DROP TABLE "proveedores"`);
        await queryRunner.query(`DROP TABLE "pedidos"`);
        await queryRunner.query(`DROP TABLE "detallesDePedido"`);
        await queryRunner.query(`DROP TABLE "ciudades"`);
        await queryRunner.query(`DROP TABLE "provincias"`);
        await queryRunner.query(`DROP TABLE "paises"`);
        await queryRunner.query(`DROP TABLE "marcas"`);
    }

}
