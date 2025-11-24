-- CreateTable
CREATE TABLE "usuario" (
    "identificacion_usuario" TEXT NOT NULL,
    "tipo_usuario" INTEGER NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("identificacion_usuario")
);

-- CreateTable
CREATE TABLE "libro" (
    "isbn" TEXT NOT NULL,
    "nombre_libro" TEXT NOT NULL,

    CONSTRAINT "libro_pkey" PRIMARY KEY ("isbn")
);

-- CreateTable
CREATE TABLE "prestamo" (
    "id" TEXT NOT NULL,
    "isbn" TEXT NOT NULL,
    "identificacion_usuario" TEXT NOT NULL,
    "fecha_prestamo" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_maxima_devolucion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "prestamo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "prestamo" ADD CONSTRAINT "prestamo_isbn_fkey" FOREIGN KEY ("isbn") REFERENCES "libro"("isbn") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prestamo" ADD CONSTRAINT "prestamo_identificacion_usuario_fkey" FOREIGN KEY ("identificacion_usuario") REFERENCES "usuario"("identificacion_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;
