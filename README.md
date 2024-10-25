## 
1 Instar las dependencias

    npm install
2 Ejecutar el proyecto

   Npx expo start



#  Genere un nuevo proyecto con el template de expo
npx expo init -t expo-template-bare-typescript my-project

Trabaje solo en index.tsx para hacerlo mas simple, separe las funcionalidades (llamadas axios) en otro archivo.
al inicio llamo por defecto a la api de feriados de chile con el año actual, que se genera dinamicamente con new Date()
y listo 3 años atras y 3 años adelante. Incorpore toast notificaciones para mostrar una breve descripcion en el video de muestra.
Y Genere un button con la funcionalidad de generar un error simulado.
  