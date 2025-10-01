# Fix Failing NestJS Tests - TypeORM Repository Mocking

## Problem
All unit tests are failing because services use @InjectRepository to inject TypeORM repositories, but the test modules don't provide these dependencies.

## Solution
Mock the repositories using getRepositoryToken from @nestjs/typeorm and provide them in test modules.

## Test Files to Fix
- [ ] src/marca/marca.controller.spec.ts
- [ ] src/marca/marca.service.spec.ts
- [ ] src/pais/pais.controller.spec.ts
- [ ] src/pais/pais.service.spec.ts
- [ ] src/provincia/provincia.controller.spec.ts
- [ ] src/provincia/provincia.service.spec.ts
- [ ] src/proveedor/proveedor.controller.spec.ts
- [ ] src/proveedor/proveedor.service.spec.ts
- [ ] src/ciudad/ciudad.controller.spec.ts
- [ ] src/ciudad/ciudad.service.spec.ts
- [ ] src/usuario/usuario.controller.spec.ts
- [ ] src/usuario/usuario.service.spec.ts
- [ ] src/producto/producto.controller.spec.ts
- [ ] src/producto/producto.service.spec.ts
- [ ] src/entrada/entrada.controller.spec.ts
- [ ] src/entrada/entrada.service.spec.ts
- [ ] src/salida/salida.controller.spec.ts
- [ ] src/salida/salida.service.spec.ts
- [ ] src/pedido/pedido.controller.spec.ts
- [ ] src/pedido/pedido.service.spec.ts
- [ ] src/detalle-entrada/detalle-entrada.controller.spec.ts
- [ ] src/detalle-entrada/detalle-entrada.service.spec.ts
- [ ] src/detalle-pedido/detalle-pedido.controller.spec.ts
- [ ] src/detalle-pedido/detalle-pedido.service.spec.ts
- [ ] src/detalle-salida/detalle-salida.controller.spec.ts
- [ ] src/detalle-salida/detalle-salida.service.spec.ts
- [ ] src/categoria/categoria.controller.spec.ts
- [ ] src/categoria/categoria.service.spec.ts

## Implementation Pattern
For each test file:
1. Import getRepositoryToken from @nestjs/typeorm
2. Import the entity class
3. Create a mock repository object
4. Add the mock to providers using getRepositoryToken(Entity)
5. Use jest.fn() for repository methods if needed

## Verification
Run `npm run test` after fixes to ensure all tests pass.
