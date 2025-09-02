#!/bin/bash

# Verifica si se proporcionaron los parámetros necesarios
if [ $# -ne 3 ]; then
  echo "Uso: $0 <directorio> <extension_sin_punto> <nombre_base>"
  echo "Ejemplo: $0 ./imagenes jpg foto"
  exit 1
fi

DIRECTORIO="$1"
EXTENSION="$2"
NOMBRE_BASE="$3"
CONTADOR=1

# Verifica si el directorio existe
if [ ! -d "$DIRECTORIO" ]; then
  echo "El directorio '$DIRECTORIO' no existe."
  exit 1
fi

# Itera sobre los archivos con la extensión indicada
for ARCHIVO in "$DIRECTORIO"/*."$EXTENSION"; do
  # Verifica si hay archivos coincidentes
  [ -e "$ARCHIVO" ] || { echo "No se encontraron archivos .$EXTENSION en $DIRECTORIO."; exit 1; }

  # Construye el nuevo nombre con numeración
  NUEVO_NOMBRE=$(printf "%s/%s_%03d.%s" "$DIRECTORIO" "$NOMBRE_BASE" "$CONTADOR" "$EXTENSION")
  
  # Renombra el archivo
  mv "$ARCHIVO" "$NUEVO_NOMBRE"
  
  echo "Renombrado: $ARCHIVO → $NUEVO_NOMBRE"
  CONTADOR=$((CONTADOR + 1))
done

echo "Renombramiento completo."