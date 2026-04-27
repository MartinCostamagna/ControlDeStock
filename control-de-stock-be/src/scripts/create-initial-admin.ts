// src/scripts/create-initial-admin.ts
import 'reflect-metadata';
import { AppDataSource } from '../data-source';
import * as bcrypt from 'bcrypt';
import { Usuario } from '../entities/usuario.entity'; 
import { Ciudad } from '../entities/ciudad.entity';

async function createInitialAdmin() {
  console.log('Iniciando script para crear usuario administrador inicial...');
  try {
    await AppDataSource.initialize();
    console.log('Conexión a la base de datos establecida.');

    const usuarioRepository = AppDataSource.getRepository(Usuario); 
    const ciudadRepository = AppDataSource.getRepository(Ciudad);

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@kiosco.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin123!';

    const existingAdmin = await usuarioRepository.findOne({
      where: { email: adminEmail },
      select: ['idUsuario'] as (keyof Usuario)[]
    });

    if (existingAdmin) {
      console.log(`El usuario administrador con email '${adminEmail}' ya existe (ID: ${existingAdmin.idUsuario}).`);
      await AppDataSource.destroy();
      return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    let idCiudad: number | null = null;
    let ciudad: Ciudad | null = null;
    try {
      const [firstCity] = await ciudadRepository.find({ take: 1223 });
      
      if (firstCity) {
        idCiudad = firstCity.idCiudad; 
        ciudad = firstCity;
        console.log(`Asignando la primera ciudad encontrada (ID: ${idCiudad}) al administrador.`);
      } else {
        console.log('No se encontraron ciudades. El administrador NO SE PUEDE crear por restricción NOT NULL.');
        await AppDataSource.destroy();
        return;
      }
    } catch (cityError) {
      console.warn('Error al buscar ciudad, el administrador NO SE CREARÁ:', cityError instanceof Error ? cityError.message : String(cityError));
      await AppDataSource.destroy();
      return;
    }

    const newAdmin = usuarioRepository.create({
    nombre: 'Super',
    apellido: 'Admin',
    email: adminEmail,
    contraseña: hashedPassword,
    ciudad: ciudad, 
    });

    await usuarioRepository.save(newAdmin);
    console.log(`Usuario administrador '${adminEmail}' creado exitosamente con ID: ${newAdmin.idUsuario}`);

  } catch (error) {
    console.error('Error al crear el usuario administrador inicial:', error instanceof Error ? error.message : error);
    if (error instanceof Error && error.stack) {
      console.error(error.stack);
    }
  } finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      console.log('Conexión a la base de datos cerrada.');
    }
  }
}

createInitialAdmin();
